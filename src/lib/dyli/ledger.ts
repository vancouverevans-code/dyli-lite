import { CAP } from "./catalog";

export const FEE_BPS = 250;
export const FAUCET_AMOUNT = 1_000_000_000;

export const SIDES = ["you", "desk", "nia", "kal", "omar"] as const;
export type Side = (typeof SIDES)[number];

export const SIDE_LABEL: Record<Side, string> = {
  you: "You",
  desk: "Vault desk",
  nia: "Nia",
  kal: "Kal",
  omar: "Omar",
};

export type Ledger = {
  cash: Record<Side, number>;
  owner: (Side | null)[];
  price: number[];
  redeemed: boolean[];
  fees: number;
};

export type Action =
  | { type: "claim"; id: number; by: Side }
  | { type: "list"; id: number; by: Side; price: number }
  | { type: "cancel"; id: number; by: Side }
  | { type: "buy"; id: number; by: Side }
  | { type: "redeem"; id: number; by: Side }
  | { type: "faucet"; by: Side };

const KEY = "dyli-lite-ledger-v1";

export function seed(): Ledger {
  return {
    cash: {
      you: 250_000_000,
      desk: 2_000_000_000,
      nia: 400_000_000,
      kal: 400_000_000,
      omar: 100_000_000,
    },
    owner: [null, "desk", "desk", "nia", "you", "you", "kal", "omar", null],
    price: [0, 48_000_000, 180_000_000, 26_000_000, 0, 64_000_000, 92_000_000, 0, 0],
    redeemed: [false, false, false, false, false, false, false, true, false],
    fees: 0,
  };
}

function isSide(value: unknown): value is Side {
  return typeof value === "string" && (SIDES as readonly string[]).includes(value);
}

export function loadLedger(): Ledger {
  if (typeof localStorage === "undefined") return seed();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return seed();
    const parsed = JSON.parse(raw) as Ledger;
    if (!parsed?.cash || !isSide("you") || parsed.owner?.length !== CAP + 1) return seed();
    if (!isSide("you") || typeof parsed.cash.you !== "number") return seed();
    for (const side of SIDES) {
      if (typeof parsed.cash[side] !== "number") return seed();
    }
    return parsed;
  } catch {
    return seed();
  }
}

export function saveLedger(ledger: Ledger) {
  localStorage.setItem(KEY, JSON.stringify(ledger));
}

export function clearLedger() {
  localStorage.removeItem(KEY);
}

export function apply(ledger: Ledger, action: Action): { ledger: Ledger; error?: string } {
  const next: Ledger = {
    cash: { ...ledger.cash },
    owner: ledger.owner.slice(),
    price: ledger.price.slice(),
    redeemed: ledger.redeemed.slice(),
    fees: ledger.fees,
  };

  const id = "id" in action ? action.id : 0;
  if (action.type !== "faucet" && (id < 1 || id > CAP)) {
    return { ledger, error: "That ticket id is not on this desk." };
  }

  if (action.type === "faucet") {
    next.cash[action.by] += FAUCET_AMOUNT;
    return { ledger: next };
  }

  if (action.type === "claim") {
    if (next.owner[id]) return { ledger, error: "Already in a vault." };
    next.owner[id] = action.by;
    return { ledger: next };
  }

  const owner = next.owner[id];
  if (action.type === "list") {
    if (owner !== action.by) return { ledger, error: "That ticket is not yours." };
    if (next.redeemed[id]) return { ledger, error: "Already marked for shipment." };
    if (action.price <= 0) return { ledger, error: "Set a price above zero." };
    next.price[id] = action.price;
    return { ledger: next };
  }

  if (action.type === "cancel") {
    if (owner !== action.by) return { ledger, error: "That ticket is not yours." };
    next.price[id] = 0;
    return { ledger: next };
  }

  if (action.type === "redeem") {
    if (owner !== action.by) return { ledger, error: "That ticket is not yours." };
    if (next.redeemed[id]) return { ledger, error: "Already marked for shipment." };
    next.redeemed[id] = true;
    next.price[id] = 0;
    return { ledger: next };
  }

  const price = next.price[id];
  if (!owner || price <= 0) return { ledger, error: "Not listed." };
  if (next.redeemed[id]) return { ledger, error: "Already marked for shipment." };
  if (owner === action.by) return { ledger, error: "You already hold this listing." };
  if (next.cash[action.by] < price) return { ledger, error: "Not enough dUSDC. Refill on the Pay desk." };
  const fee = Math.floor((price * FEE_BPS) / 10_000);
  next.cash[action.by] -= price;
  next.cash[owner] += price - fee;
  next.fees += fee;
  next.owner[id] = action.by;
  next.price[id] = 0;
  return { ledger: next };
}
