import { SELECTORS } from "./artifact";
import { CREATION_BYTECODE } from "./artifact";
import { CAP } from "./catalog";
import { decodeAddress, decodeShelf, decodeUint, encode, explain, shelfCall, type ShelfSlot } from "./codec";
import { botRpc, type TxReceipt } from "./rpc";

export const CHAIN_ID = 968;
export const CHAIN_HEX = "0x3c8";
export const EXPLORER = "https://scan.bohr.life";
export const FAUCET_URL = "https://faucet.botchain.ai/basic";
export const FEE_BPS = 250;
export const FAUCET_AMOUNT = 1_000_000_000n;
export const FAUCET_COOLDOWN = 60;

export const BOT_TESTNET = {
  chainId: CHAIN_HEX,
  chainName: "BOT Chain Testnet",
  nativeCurrency: { name: "BOT", symbol: "BOT", decimals: 18 },
  rpcUrls: ["https://rpc.bohr.life"],
  blockExplorerUrls: [EXPLORER],
};

export type Eip1193 = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (event: string, fn: (...args: unknown[]) => void) => void;
  removeListener?: (event: string, fn: (...args: unknown[]) => void) => void;
};

export type ChainView = {
  slots: ShelfSlot[];
  cash: bigint;
  lastFaucet: bigint;
  feeTo: string;
};

export function getEth(): Eip1193 | null {
  if (typeof window === "undefined") return null;
  const eth = (window as unknown as { ethereum?: Eip1193 }).ethereum;
  return eth ?? null;
}

async function rpc(method: string, params: unknown[] = []) {
  const reply = await botRpc({ data: { method, params } });
  if (!reply.ok) throw new Error(reply.error);
  return reply.result;
}

export async function readChain(contract: string, account: string | null): Promise<ChainView> {
  const shelf = await rpc("eth_call", [{ to: contract, data: shelfCall() }, "latest"]);
  if (typeof shelf !== "string") throw new Error("Shelf call returned nothing.");
  const slots = decodeShelf(shelf);
  if (slots.length !== CAP) throw new Error("Shelf length mismatch.");

  const feeRaw = await rpc("eth_call", [{ to: contract, data: encode(SELECTORS.feeTo) }, "latest"]);
  const feeTo = typeof feeRaw === "string" ? decodeAddress(feeRaw) : "0x" + "0".repeat(40);

  let cash = 0n;
  let lastFaucet = 0n;
  if (account) {
    const bal = await rpc("eth_call", [
      { to: contract, data: encode(SELECTORS.balanceOf, [BigInt(account)]) },
      "latest",
    ]);
    const last = await rpc("eth_call", [
      { to: contract, data: encode(SELECTORS.lastFaucet, [BigInt(account)]) },
      "latest",
    ]);
    if (typeof bal === "string") cash = decodeUint(bal);
    if (typeof last === "string") lastFaucet = decodeUint(last);
  }

  return { slots, cash, lastFaucet, feeTo };
}

export async function connectWallet(): Promise<{ eth: Eip1193; account: string }> {
  const eth = getEth();
  if (!eth) throw new Error("No wallet in this browser. The demo desk still runs.");
  const accounts = (await eth.request({ method: "eth_requestAccounts" })) as string[];
  const account = accounts[0];
  if (!account) throw new Error("Wallet returned no account.");
  await ensureChain(eth);
  return { eth, account };
}

async function ensureChain(eth: Eip1193) {
  try {
    await eth.request({ method: "wallet_switchEthereumChain", params: [{ chainId: CHAIN_HEX }] });
  } catch (error) {
    const code = (error as { code?: number }).code;
    if (code === 4902 || code === -32603) {
      await eth.request({ method: "wallet_addEthereumChain", params: [BOT_TESTNET] });
      return;
    }
    throw error;
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function sendTx(
  eth: Eip1193,
  from: string,
  to: string | null,
  data: string,
): Promise<{ hash: string; contractAddress: string | null }> {
  const tx: Record<string, string> = { from, data };
  if (to) tx.to = to;
  try {
    const est = await rpc("eth_estimateGas", [tx]);
    if (typeof est === "string") {
      const buffered = (BigInt(est) * 13n) / 10n;
      tx.gas = "0x" + buffered.toString(16);
    }
  } catch (error) {
    if (!to) tx.gas = "0x16e360";
    else throw error;
  }

  const hash = (await eth.request({ method: "eth_sendTransaction", params: [tx] })) as string;
  for (let i = 0; i < 30; i++) {
    await sleep(1000);
    const receipt = await rpc("eth_getTransactionReceipt", [hash]);
    if (receipt && typeof receipt === "object") {
      const rec = receipt as TxReceipt;
      const status = rec.status ?? "0x1";
      if (status === "0x0" || status === "0x00") throw new Error("Transaction reverted.");
      return { hash, contractAddress: rec.contractAddress ?? null };
    }
  }
  return { hash, contractAddress: null };
}

export function deployData(): string {
  return CREATION_BYTECODE;
}

export function explainChain(error: unknown): string {
  return explain(error);
}
