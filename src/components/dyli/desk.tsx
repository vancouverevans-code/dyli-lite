import { useEffect, useState } from "react";
import { ThumbsUp, Wallet } from "lucide-react";
import { CREATION_BYTES, EIP170_LIMIT, RUNTIME_BYTES } from "@/lib/dyli/artifact";
import { ITEMS, type Item } from "@/lib/dyli/catalog";
import {
  CHAIN_ID,
  DEPLOYED_CONTRACT,
  EXPLORER,
  FAUCET_AMOUNT,
  FAUCET_COOLDOWN,
  FAUCET_URL,
  FEE_BPS,
  connectWallet,
  deployData,
  explainChain,
  getEth,
  readChain,
  sendTx,
  type ChainView,
  type Eip1193,
} from "@/lib/dyli/chain";
import { SELECTORS } from "@/lib/dyli/artifact";
import { encode, isZeroAddress } from "@/lib/dyli/codec";
import {
  SIDE_LABEL,
  apply,
  clearLedger,
  loadLedger,
  seed,
  type Ledger,
  type Side,
} from "@/lib/dyli/ledger";
import { formatCash, isAddress, parseCash, shortHash } from "@/lib/dyli/money";

type Mode = "demo" | "chain";
type Tab = "floor" | "vault" | "pay" | "deploy";
type Filter = "all" | "listed" | "open" | "yours";

type SlotView = {
  item: Item;
  ownerLabel: string | null;
  yours: boolean;
  open: boolean;
  price: bigint | null;
  redeemed: boolean;
};

const MODE_KEY = "dyli-lite-mode";
const CONTRACT_KEY = "dyli-lite-contract";

function labelFor(side: Side | null): string | null {
  if (!side) return null;
  return SIDE_LABEL[side];
}

export function Desk() {
  const [mode, setMode] = useState<Mode>("demo");
  const [tab, setTab] = useState<Tab>("floor");
  const [filter, setFilter] = useState<Filter>("all");
  const [ledger, setLedger] = useState<Ledger>(() => seed());
  const [ready, setReady] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [contract, setContract] = useState("");
  const [draft, setDraft] = useState("");
  const [asks, setAsks] = useState<Record<number, string>>({});
  const [note, setNote] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [arm, setArm] = useState<number | null>(null);
  const [chain, setChain] = useState<ChainView | null>(null);
  const [chainError, setChainError] = useState<string | null>(null);

  useEffect(() => {
    setLedger(loadLedger());
    const saved = localStorage.getItem(CONTRACT_KEY);
    const initial = saved && saved.length > 0 ? saved : DEPLOYED_CONTRACT;
    setContract(initial);
    setDraft(initial);
    const stored = localStorage.getItem(MODE_KEY);
    if (stored === "chain" || stored === "demo") setMode(stored);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(MODE_KEY, mode);
  }, [mode, ready]);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem("dyli-lite-ledger-v1", JSON.stringify(ledger));
  }, [ledger, ready]);

  useEffect(() => {
    const eth = getEth();
    if (!eth?.on) return;
    const onAccounts = (value: unknown) => {
      const list = Array.isArray(value) ? (value as string[]) : [];
      setAccount(list[0] ?? null);
    };
    eth.on("accountsChanged", onAccounts);
    return () => eth.removeListener?.("accountsChanged", onAccounts);
  }, []);

  useEffect(() => {
    if (mode !== "chain" || !isAddress(contract)) return;
    let cancel = false;
    const pull = async () => {
      try {
        const view = await readChain(contract, account);
        if (!cancel) {
          setChain(view);
          setChainError(null);
        }
      } catch (error) {
        if (!cancel) setChainError(explainChain(error));
      }
    };
    void pull();
    const timer = setInterval(() => void pull(), 8000);
    return () => {
      cancel = true;
      clearInterval(timer);
    };
  }, [mode, contract, account]);

  const cash = mode === "demo" ? BigInt(ledger.cash.you) : (chain?.cash ?? 0n);
  const slots = buildSlots(mode, ledger, chain, account);

  async function refresh() {
    if (!isAddress(contract)) {
        setNote("Deploy or attach a contract first.");
        return;
      }
    const view = await readChain(contract, account);
    setChain(view);
  }

  async function wallet(): Promise<{ eth: Eip1193; account: string }> {
    const linked = await connectWallet();
    setAccount(linked.account);
    return linked;
  }

  async function run(key: string, fn: () => Promise<void> | void) {
    if (busy) return;
    setBusy(key);
    setNote(null);
    try {
      await fn();
    } catch (error) {
      setNote(explainChain(error));
    } finally {
      setBusy(null);
    }
  }

  function demo(action: Parameters<typeof apply>[1], ok: string) {
    const result = apply(ledger, action);
    if (result.error) {
      setNote(result.error);
      return;
    }
    setLedger(result.ledger);
    setNote(ok);
  }

  function onBuy(id: number) {
    if (mode === "demo") {
      demo({ type: "buy", id, by: "you" }, "Bought. The ticket moved. The object stayed put.");
      return;
    }
    void run(`buy-${id}`, async () => {
      if (!isAddress(contract)) {
        setNote("Deploy or attach a contract first.");
        return;
      }
      const linked = await wallet();
      const { hash } = await sendTx(linked.eth, linked.account, contract, encode(SELECTORS.buy, [BigInt(id)]));
      setNote(`Buy confirmed. ${shortHash(hash)}`);
      await refresh();
    });
  }

  function onClaim(id: number) {
    if (mode === "demo") {
      demo({ type: "claim", id, by: "you" }, "Intaked into your vault.");
      return;
    }
    void run(`claim-${id}`, async () => {
      if (!isAddress(contract)) {
        setNote("Deploy or attach a contract first.");
        return;
      }
      const linked = await wallet();
      const { hash } = await sendTx(
        linked.eth,
        linked.account,
        contract,
        encode(SELECTORS.claim, [BigInt(id)]),
      );
      setNote(`Intake confirmed. ${shortHash(hash)}`);
      await refresh();
    });
  }

  function onList(id: number) {
    const price = parseCash(asks[id] ?? "");
    if (!price) {
      setNote("Use a price like 24.00");
      return;
    }
    if (mode === "demo") {
      demo({ type: "list", id, by: "you", price: Number(price) }, "Listed.");
      return;
    }
    void run(`list-${id}`, async () => {
      if (!isAddress(contract)) {
        setNote("Deploy or attach a contract first.");
        return;
      }
      const linked = await wallet();
      const { hash } = await sendTx(
        linked.eth,
        linked.account,
        contract,
        encode(SELECTORS.list, [BigInt(id), price]),
      );
      setNote(`Listing confirmed. ${shortHash(hash)}`);
      await refresh();
    });
  }

  function onCancel(id: number) {
    if (mode === "demo") {
      demo({ type: "cancel", id, by: "you" }, "Listing pulled.");
      return;
    }
    void run(`cancel-${id}`, async () => {
      if (!isAddress(contract)) {
        setNote("Deploy or attach a contract first.");
        return;
      }
      const linked = await wallet();
      const { hash } = await sendTx(
        linked.eth,
        linked.account,
        contract,
        encode(SELECTORS.cancel, [BigInt(id)]),
      );
      setNote(`Cancel confirmed. ${shortHash(hash)}`);
      await refresh();
    });
  }

  function onRedeem(id: number) {
    if (arm !== id) {
      setArm(id);
      setNote("Redeem locks the ticket and clears the ask. Tap again to confirm.");
      return;
    }
    setArm(null);
    if (mode === "demo") {
      demo({ type: "redeem", id, by: "you" }, "Marked for shipment. It can no longer list.");
      return;
    }
    void run(`redeem-${id}`, async () => {
      if (!isAddress(contract)) {
        setNote("Deploy or attach a contract first.");
        return;
      }
      const linked = await wallet();
      const { hash } = await sendTx(
        linked.eth,
        linked.account,
        contract,
        encode(SELECTORS.redeem, [BigInt(id)]),
      );
      setNote(`Redeem confirmed. ${shortHash(hash)}`);
      await refresh();
    });
  }

  function onFaucet() {
    if (mode === "demo") {
      demo({ type: "faucet", by: "you" }, "Desk refilled 1,000.00 dUSDC.");
      return;
    }
    void run("faucet", async () => {
      if (!isAddress(contract)) {
        setNote("Deploy or attach a contract first.");
        return;
      }
      const linked = await wallet();
      const { hash } = await sendTx(linked.eth, linked.account, contract, encode(SELECTORS.faucet));
      setNote(`Faucet confirmed. ${shortHash(hash)}`);
      await refresh();
    });
  }

  function onDeploy() {
    void run("deploy", async () => {
      const linked = await wallet();
      const { hash, contractAddress } = await sendTx(linked.eth, linked.account, null, deployData());
      if (contractAddress) {
        setContract(contractAddress);
        setDraft(contractAddress);
        localStorage.setItem(CONTRACT_KEY, contractAddress);
        setMode("chain");
        setNote(`Deployed ${shortHash(contractAddress)}.`);
      } else {
        setNote(`Deploy sent ${shortHash(hash)}. Paste the contract address from the explorer if it is not filled in yet.`);
      }
    });
  }

  function saveContract() {
    const next = draft.trim();
    if (!isAddress(next)) {
      setNote("Contract address should be 0x and 40 hex characters.");
      return;
    }
    setContract(next);
    localStorage.setItem(CONTRACT_KEY, next);
    setMode("chain");
    setNote("Contract attached. The floor now reads chain state.");
  }

  const held = slots.filter((slot) => slot.yours).length;
  const listed = slots.filter((slot) => slot.price !== null && !slot.redeemed).length;
  const chainReady = mode === "demo" || isAddress(contract);
  const reading = mode === "chain" && isAddress(contract) && !chain && !chainError;

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="bg-ink text-paper">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 lg:px-6">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-2xl bg-gold text-gold-ink">
              <ThumbsUp className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-display text-2xl leading-none tracking-tight">
                DYLI <span className="text-gold">Lite</span>
              </p>
              <p className="mt-1 text-sm opacity-80">Vault, pay, resale. One contract.</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-paper/20 px-3 py-2 text-sm tabular-nums">
              BOT testnet · {CHAIN_ID}
            </span>
            <button
              type="button"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-paper px-4 text-sm font-medium text-ink"
              onClick={() => {
                if (account) return;
                void run("connect", async () => {
                  const linked = await connectWallet();
                  setAccount(linked.account);
                  setNote(`Connected ${shortHash(linked.account)} on BOT testnet.`);
                });
              }}
            >
              <Wallet className="size-4" aria-hidden="true" />
              {account ? shortHash(account) : "Connect wallet"}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-5 px-4 py-5 lg:grid-cols-[15.5rem_minmax(0,1fr)] lg:px-6">
        <aside className="flex flex-col gap-4 lg:sticky lg:top-4 lg:self-start">
          <div className="rounded-2xl border border-line bg-card p-4">
            <div className="grid grid-cols-2 gap-1 rounded-xl bg-paper p-1">
              <ModeButton active={mode === "demo"} onClick={() => setMode("demo")}>
                Demo
              </ModeButton>
              <ModeButton active={mode === "chain"} onClick={() => setMode("chain")}>
                Chain
              </ModeButton>
            </div>
            <p className="mt-4 text-xs tracking-wide text-mute uppercase">Your dUSDC</p>
            <p className="font-display text-4xl leading-none tabular-nums">{formatCash(cash)}</p>
            <p className="mt-2 text-sm text-mute">
              {held} in vault · {listed} listed · fee {FEE_BPS / 100}%
            </p>
            <button
              type="button"
              className="mt-4 min-h-11 w-full rounded-xl bg-gold px-3 text-sm font-medium text-gold-ink disabled:opacity-50"
              disabled={Boolean(busy)}
              onClick={onFaucet}
            >
              {busy === "faucet" ? "Filling…" : "Faucet 1,000.00"}
            </button>
          </div>
          <nav className="grid grid-cols-4 gap-1 lg:grid-cols-1" aria-label="Desk">
            {(
              [
                ["floor", "Floor"],
                ["vault", "Vault"],
                ["pay", "Pay"],
                ["deploy", "Deploy"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                className={
                  tab === id
                    ? "min-h-11 rounded-xl bg-ink px-3 text-sm font-medium text-paper"
                    : "min-h-11 rounded-xl border border-line bg-card px-3 text-sm text-ink"
                }
                onClick={() => setTab(id)}
              >
                {label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="min-w-0">
          {note ? (
            <p className="mb-4 rounded-2xl border border-line bg-card px-4 py-3 text-sm" role="status">
              {note}
            </p>
          ) : null}
          {mode === "chain" && chainError ? (
            <p className="mb-4 rounded-2xl border border-stamp bg-card px-4 py-3 text-sm text-stamp">
              {chainError}
            </p>
          ) : null}

          {tab === "floor" ? (
            <Floor
              slots={slots}
              filter={filter}
              setFilter={setFilter}
              cash={cash}
              busy={busy}
              chainReady={chainReady}
              reading={reading}
              onBuy={onBuy}
              onClaim={onClaim}
              onCancel={onCancel}
              onDeployTab={() => setTab("deploy")}
            />
          ) : null}
          {tab === "vault" ? (
            <Vault
              slots={slots}
              asks={asks}
              setAsks={setAsks}
              arm={arm}
              busy={busy}
              onList={onList}
              onCancel={onCancel}
              onRedeem={onRedeem}
            />
          ) : null}
          {tab === "pay" ? (
            <Pay
              cash={cash}
              fees={mode === "demo" ? BigInt(ledger.fees) : 0n}
              mode={mode}
              lastFaucet={chain?.lastFaucet ?? 0n}
              busy={busy === "faucet"}
              onFaucet={onFaucet}
              onReset={() => {
                clearLedger();
                setLedger(seed());
                setNote("Demo desk reset.");
              }}
            />
          ) : null}
          {tab === "deploy" ? (
            <Deploy
              draft={draft}
              setDraft={setDraft}
              contract={contract}
              busy={busy === "deploy"}
              feeTo={chain?.feeTo ?? null}
              onDeploy={onDeploy}
              onSave={saveContract}
            />
          ) : null}
        </main>
      </div>
    </div>
  );
}

function buildSlots(mode: Mode, ledger: Ledger, chain: ChainView | null, account: string | null): SlotView[] {
  return ITEMS.map((item) => {
    if (mode === "demo") {
      const owner = ledger.owner[item.id];
      const price = ledger.price[item.id];
      return {
        item,
        ownerLabel: labelFor(owner),
        yours: owner === "you",
        open: owner === null,
        price: price > 0 ? BigInt(price) : null,
        redeemed: ledger.redeemed[item.id],
      };
    }
    const slot = chain?.slots[item.id - 1];
    const owner = slot?.owner ?? "0x" + "0".repeat(40);
    const open = !slot || isZeroAddress(owner);
    const yours = account !== null && owner.toLowerCase() === account.toLowerCase();
    const price = slot && slot.price > 0n ? slot.price : null;
    return {
      item,
      ownerLabel: open ? null : yours ? "You" : shortHash(owner),
      yours,
      open,
      price,
      redeemed: slot?.redeemed ?? false,
    };
  });
}

function ModeButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      className={
        active
          ? "min-h-11 rounded-lg bg-ink text-sm font-medium text-paper"
          : "min-h-11 rounded-lg text-sm text-mute"
      }
      onClick={onClick}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}

function Floor({
  slots,
  filter,
  setFilter,
  cash,
  busy,
  chainReady,
  reading,
  onBuy,
  onClaim,
  onCancel,
  onDeployTab,
}: {
  slots: SlotView[];
  filter: Filter;
  setFilter: (filter: Filter) => void;
  cash: bigint;
  busy: string | null;
  chainReady: boolean;
  reading: boolean;
  onBuy: (id: number) => void;
  onClaim: (id: number) => void;
  onCancel: (id: number) => void;
  onDeployTab: () => void;
}) {
  const shown = slots.filter((slot) => {
    if (filter === "listed") return slot.price !== null && !slot.redeemed;
    if (filter === "open") return slot.open;
    if (filter === "yours") return slot.yours;
    return true;
  });

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl leading-none">Floor</h1>
          <p className="mt-2 max-w-xl text-sm text-mute">
            Ownership moves. The object stays vaulted until someone redeems it for shipment.
          </p>
        </div>
        <div className="flex flex-wrap gap-1" role="group" aria-label="Filter floor">
          {(
            [
              ["all", "All"],
              ["listed", "Listed"],
              ["open", "Open"],
              ["yours", "Yours"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={
                filter === id
                  ? "min-h-11 rounded-full bg-ink px-3 text-sm text-paper"
                  : "min-h-11 rounded-full border border-line bg-card px-3 text-sm"
              }
              onClick={() => setFilter(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {!chainReady ? (
        <div className="rounded-2xl border border-line bg-card p-5">
          <p className="font-display text-2xl">No contract on this desk yet.</p>
          <p className="mt-2 max-w-lg text-sm text-mute">
            Chain mode reads eight tickets with one call. Deploy the lite contract, or paste an address you already deployed.
          </p>
          <button
            type="button"
            className="mt-4 min-h-11 rounded-xl bg-gold px-4 text-sm font-medium text-gold-ink"
            onClick={onDeployTab}
          >
            Open deploy
          </button>
        </div>
      ) : reading ? (
        <p className="rounded-2xl border border-line bg-card p-5 text-sm">Reading the shelf from BOT testnet…</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          {shown.map((slot) => (
            <Piece
              key={slot.item.id}
              slot={slot}
              cash={cash}
              busy={busy}
              onBuy={onBuy}
              onClaim={onClaim}
              onCancel={onCancel}
            />
          ))}
        </div>
      )}
      {chainReady && shown.length === 0 ? (
        <p className="mt-4 text-sm text-mute">Nothing in this filter.</p>
      ) : null}
    </section>
  );
}

function Piece({
  slot,
  cash,
  busy,
  onBuy,
  onClaim,
  onCancel,
}: {
  slot: SlotView;
  cash: bigint;
  busy: string | null;
  onBuy: (id: number) => void;
  onClaim: (id: number) => void;
  onCancel: (id: number) => void;
}) {
  const { item, price, yours, open, redeemed, ownerLabel } = slot;
  const [broken, setBroken] = useState(false);
  const short = price !== null && cash < price;
  return (
    <article className="piece flex flex-col overflow-hidden rounded-2xl border border-line bg-card">
      <div className="relative">
        {broken ? (
          <div className="shot grid place-items-end p-3">
            <span className="font-display text-3xl">{String(item.id).padStart(2, "0")}</span>
          </div>
        ) : (
          <img
            className="shot"
            src={item.image}
            alt={item.name}
            onError={() => setBroken(true)}
          />
        )}
        {redeemed ? <span className="stamp">Ship</span> : null}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <p className="text-xs tracking-wide text-mute uppercase">
          {String(item.id).padStart(2, "0")} · {item.kind}
        </p>
        <h2 className="font-display text-xl leading-tight">{item.name}</h2>
        <p className="text-sm text-mute">{ownerLabel ? ownerLabel : "Open intake"}</p>
        <div className="mt-auto pt-2">
          {redeemed ? (
            <p className="text-sm">Marked for shipment.</p>
          ) : open ? (
            <button
              type="button"
              className="min-h-11 w-full rounded-xl bg-ink px-2 text-center text-sm leading-tight font-medium text-paper disabled:opacity-50"
              disabled={Boolean(busy)}
              onClick={() => onClaim(item.id)}
            >
              {busy === `claim-${item.id}` ? "Intaking…" : "Intake"}
            </button>
          ) : price !== null && !yours ? (
            <button
              type="button"
              className="min-h-11 w-full rounded-xl bg-gold px-2 text-center text-sm leading-tight font-medium text-gold-ink disabled:opacity-50"
              disabled={Boolean(busy) || short}
              onClick={() => onBuy(item.id)}
            >
              {busy === `buy-${item.id}` ? "Buying…" : short ? `Need ${formatCash(price)}` : `Buy ${formatCash(price)}`}
            </button>
          ) : price !== null && yours ? (
            <button
              type="button"
              className="min-h-11 w-full rounded-xl border border-line px-2 text-center text-sm leading-tight disabled:opacity-50"
              disabled={Boolean(busy)}
              onClick={() => onCancel(item.id)}
            >
              {busy === `cancel-${item.id}` ? "Pulling…" : `Pull ask ${formatCash(price)}`}
            </button>
          ) : (
            <p className="text-sm text-mute">{yours ? "In your vault" : "Held, not listed"}</p>
          )}
        </div>
      </div>
    </article>
  );
}

function Vault({
  slots,
  asks,
  setAsks,
  arm,
  busy,
  onList,
  onCancel,
  onRedeem,
}: {
  slots: SlotView[];
  asks: Record<number, string>;
  setAsks: (next: Record<number, string>) => void;
  arm: number | null;
  busy: string | null;
  onList: (id: number) => void;
  onCancel: (id: number) => void;
  onRedeem: (id: number) => void;
}) {
  const mine = slots.filter((slot) => slot.yours);
  return (
    <section>
      <h1 className="font-display text-3xl leading-none">Vault</h1>
      <p className="mt-2 max-w-xl text-sm text-mute">
        List from here. Redeem when you want the physical piece shipped. That flag clears the ask and stops resale.
      </p>
      {mine.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-line bg-card p-5 text-sm">
          Nothing in your vault. Intake an open ticket on the floor.
        </p>
      ) : (
        <ul className="mt-5 flex flex-col gap-3">
          {mine.map((slot) => (
            <li key={slot.item.id} className="rounded-2xl border border-line bg-card p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs tracking-wide text-mute uppercase">{slot.item.kind}</p>
                  <h2 className="font-display text-2xl leading-tight">{slot.item.name}</h2>
                  <p className="mt-1 text-sm text-mute">{slot.item.line}</p>
                </div>
                <p className="text-sm tabular-nums">
                  {slot.redeemed ? "Shipping" : slot.price !== null ? `Ask ${formatCash(slot.price)}` : "Not listed"}
                </p>
              </div>
              {slot.redeemed ? null : (
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <label className="min-w-0 flex-1 text-sm">
                    <span className="mb-1 block text-mute">Ask in dUSDC</span>
                    <input
                      className="min-h-11 w-full rounded-xl border border-line bg-paper px-3 tabular-nums"
                      inputMode="decimal"
                      placeholder="24.00"
                      value={asks[slot.item.id] ?? ""}
                      onChange={(event) =>
                        setAsks({ ...asks, [slot.item.id]: event.target.value })
                      }
                    />
                  </label>
                  <div className="flex gap-2 sm:items-end">
                    <button
                      type="button"
                      className="min-h-11 flex-1 rounded-xl bg-ink px-4 text-sm font-medium text-paper disabled:opacity-50 sm:flex-none"
                      disabled={Boolean(busy)}
                      onClick={() => onList(slot.item.id)}
                    >
                      {slot.price !== null ? "Update" : "List"}
                    </button>
                    {slot.price !== null ? (
                      <button
                        type="button"
                        className="min-h-11 rounded-xl border border-line px-4 text-sm disabled:opacity-50"
                        disabled={Boolean(busy)}
                        onClick={() => onCancel(slot.item.id)}
                      >
                        Pull
                      </button>
                    ) : null}
                    <button
                      type="button"
                      className="min-h-11 rounded-xl bg-stamp px-4 text-sm font-medium text-stamp-ink disabled:opacity-50"
                      disabled={Boolean(busy)}
                      onClick={() => onRedeem(slot.item.id)}
                    >
                      {arm === slot.item.id ? "Confirm ship" : "Redeem"}
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function Pay({
  cash,
  fees,
  mode,
  lastFaucet,
  busy,
  onFaucet,
  onReset,
}: {
  cash: bigint;
  fees: bigint;
  mode: Mode;
  lastFaucet: bigint;
  busy: boolean;
  onFaucet: () => void;
  onReset: () => void;
}) {
  const now = Math.floor(Date.now() / 1000);
  const next = Number(lastFaucet) + FAUCET_COOLDOWN;
  const wait = mode === "chain" && lastFaucet > 0n ? Math.max(0, next - now) : 0;
  return (
    <section className="max-w-2xl">
      <h1 className="font-display text-3xl leading-none">Pay</h1>
      <p className="mt-2 text-sm text-mute">
        Buys pull dUSDC inside the same contract. There is no separate token and no approve step.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-line bg-card p-4">
          <p className="text-xs tracking-wide text-mute uppercase">Balance</p>
          <p className="mt-2 font-display text-4xl tabular-nums">{formatCash(cash)}</p>
          <button
            type="button"
            className="mt-4 min-h-11 rounded-xl bg-gold px-4 text-sm font-medium text-gold-ink disabled:opacity-50"
            disabled={busy || wait > 0}
            onClick={onFaucet}
          >
            {busy ? "Filling…" : wait > 0 ? `Wait ${wait}s` : `Take ${formatCash(FAUCET_AMOUNT)}`}
          </button>
          <p className="mt-3 text-sm text-mute">
            {mode === "demo"
              ? "Demo refill is instant. On chain the faucet waits 60 seconds."
              : "Test cash only. This is not bridged USDT."}
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-card p-4">
          <p className="text-xs tracking-wide text-mute uppercase">Settlement</p>
          <ol className="mt-3 flex flex-col gap-2 text-sm">
            <li>1. Buyer pays the ask in full.</li>
            <li>2. Deployer keeps 2.5%.</li>
            <li>3. Seller receives the rest.</li>
            <li>4. Ticket owner updates. The object does not move.</li>
          </ol>
          {mode === "demo" ? (
            <p className="mt-3 text-sm tabular-nums text-mute">Fee pot {formatCash(fees)} dUSDC</p>
          ) : null}
        </div>
      </div>
      {mode === "demo" ? (
        <button type="button" className="mt-4 min-h-11 text-sm text-mute underline" onClick={onReset}>
          Reset demo desk
        </button>
      ) : null}
    </section>
  );
}

function Deploy({
  draft,
  setDraft,
  contract,
  busy,
  feeTo,
  onDeploy,
  onSave,
}: {
  draft: string;
  setDraft: (value: string) => void;
  contract: string;
  busy: boolean;
  feeTo: string | null;
  onDeploy: () => void;
  onSave: () => void;
}) {
  const share = Math.round((RUNTIME_BYTES / EIP170_LIMIT) * 1000) / 10;
  return (
    <section className="max-w-2xl">
      <h1 className="font-display text-3xl leading-none">Deploy</h1>
      <p className="mt-2 text-sm text-mute">
        Paris EVM bytecode, no proxy, no library. Sized for BOT Chain testnet so a normal wallet can deploy it.
      </p>
      <dl className="mt-5 grid grid-cols-2 gap-3">
        <Stat k="Runtime" v={`${RUNTIME_BYTES.toLocaleString()} bytes`} />
        <Stat k="Of 24KB cap" v={`${share}%`} />
        <Stat k="Creation" v={`${CREATION_BYTES.toLocaleString()} bytes`} />
        <Stat k="Chain" v={`${CHAIN_ID}`} />
      </dl>
      <div className="mt-4 rounded-2xl border border-line bg-card p-4 text-sm">
        <p className="font-medium">Left out, on purpose</p>
        <ul className="mt-2 flex flex-col gap-1 text-mute">
          <li>Packs, odds, and fair drops</li>
          <li>A second peer-trade contract</li>
          <li>Card checkout and shipping APIs</li>
          <li>An event indexer. The floor is one `shelf()` call</li>
        </ul>
      </div>
      <ol className="mt-4 flex flex-col gap-2 text-sm">
        <li>
          1. Get test BOT from{" "}
          <a className="underline" href={FAUCET_URL} target="_blank" rel="noreferrer">
            the faucet
          </a>
          .
        </li>
        <li>2. Connect a wallet and switch to chain {CHAIN_ID}.</li>
        <li>3. Deploy. You become the fee recipient.</li>
        <li>4. Faucet dUSDC, intake a ticket, list it, buy from another wallet.</li>
      </ol>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          className="min-h-11 rounded-xl bg-gold px-4 text-sm font-medium text-gold-ink disabled:opacity-50"
          disabled={busy}
          onClick={onDeploy}
        >
          {busy ? "Deploying…" : "Deploy on testnet"}
        </button>
        <button
          type="button"
          className="min-h-11 rounded-xl border border-line bg-card px-4 text-sm"
          onClick={() => {
            void navigator.clipboard.writeText(deployData());
          }}
        >
          Copy bytecode
        </button>
      </div>
      <label className="mt-5 block text-sm">
        <span className="mb-1 block text-mute">Or attach a deployed address</span>
        <input
          className="min-h-11 w-full rounded-xl border border-line bg-card px-3 font-mono text-sm"
          spellCheck={false}
          value={draft}
          placeholder="0x…"
          onChange={(event) => setDraft(event.target.value)}
        />
      </label>
      <button
        type="button"
        className="mt-2 min-h-11 rounded-xl bg-ink px-4 text-sm font-medium text-paper"
        onClick={onSave}
      >
        Use this contract
      </button>
      {isAddress(contract) ? (
        <p className="mt-3 text-sm">
          Live contract{" "}
          <a className="underline" href={`${EXPLORER}/address/${contract}`} target="_blank" rel="noreferrer">
            {shortHash(contract)}
          </a>
          {feeTo && !isZeroAddress(feeTo) ? ` · fees to ${shortHash(feeTo)}` : ""}
        </p>
      ) : (
        <p className="mt-3 text-sm text-mute">
          Explorer {EXPLORER.replace("https://", "")} · RPC rpc.bohr.life
        </p>
      )}
    </section>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-2xl border border-line bg-card p-3">
      <dt className="text-xs tracking-wide text-mute uppercase">{k}</dt>
      <dd className="mt-1 font-display text-2xl tabular-nums">{v}</dd>
    </div>
  );
}
