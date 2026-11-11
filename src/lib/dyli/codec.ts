import { CAP } from "./catalog";
import { SELECTORS } from "./artifact";

export type ShelfSlot = {
  owner: string;
  price: bigint;
  redeemed: boolean;
};

const ZERO = "0x" + "0".repeat(40);

export function word(value: bigint): string {
  if (value < 0n) throw new Error("negative word");
  const hex = value.toString(16);
  if (hex.length > 64) throw new Error("word overflow");
  return hex.padStart(64, "0");
}

export function encode(selector: string, args: bigint[] = []): string {
  return selector + args.map(word).join("");
}

export function decodeUint(data: string): bigint {
  const hex = data.startsWith("0x") ? data.slice(2) : data;
  if (!hex) return 0n;
  return BigInt("0x" + hex);
}

export function decodeAddress(data: string): string {
  const hex = (data.startsWith("0x") ? data.slice(2) : data).padStart(64, "0");
  return "0x" + hex.slice(-40);
}

export function isZeroAddress(value: string): boolean {
  return BigInt(value) === 0n;
}

export function decodeShelf(data: string): ShelfSlot[] {
  const hex = data.startsWith("0x") ? data.slice(2) : data;
  if (hex.length < 64 * CAP * 3) throw new Error("Shelf reply was short.");
  const slots: ShelfSlot[] = [];
  for (let i = 0; i < CAP; i++) {
    const owner = "0x" + hex.slice(i * 64 + 24, (i + 1) * 64);
    const price = BigInt("0x" + hex.slice((CAP + i) * 64, (CAP + i + 1) * 64));
    const flag = BigInt("0x" + hex.slice((CAP * 2 + i) * 64, (CAP * 2 + i + 1) * 64));
    slots.push({ owner, price, redeemed: flag !== 0n });
  }
  return slots;
}

export const REVERTS: Record<string, string> = {
  "08e235ff": "That ticket id is not on this desk.",
  "30cd7471": "That ticket is not yours.",
  "7b2002ce": "Already in a vault.",
  "1b4e0c3c": "Already marked for shipment.",
  "665c1c57": "Not listed, or the price is empty.",
  "0f0e80e4": "Not enough dUSDC.",
  "3b334652": "Faucet needs a minute. Try again shortly.",
  "75a2aea0": "You already hold this listing.",
};

export function explain(error: unknown): string {
  const err = error as { code?: number; message?: string; data?: unknown };
  if (err?.code === 4001) return "Wallet closed the request.";
  const data = typeof err?.data === "string" ? err.data : "";
  const blob = `${err?.message ?? ""} ${data}`.toLowerCase();
  if (!blob.trim()) return "Something on the chain call failed.";
  if (blob.includes("user rejected") || blob.includes("user denied")) return "Wallet closed the request.";
  for (const [sel, text] of Object.entries(REVERTS)) {
    if (blob.includes(sel)) return text;
  }
  const message = err?.message?.replace(/^Error:\s*/, "");
  return message || "The chain rejected that.";
}

export function shelfCall(): string {
  return encode(SELECTORS.shelf);
}

export { ZERO };
