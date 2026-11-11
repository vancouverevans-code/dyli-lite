const SCALE = 1_000_000n;
const CENT = 10_000n;

export function formatCash(amount: bigint | number): string {
  const value = typeof amount === "bigint" ? amount : BigInt(Math.trunc(amount));
  const neg = value < 0n;
  const abs = neg ? -value : value;
  const whole = abs / SCALE;
  const cents = (abs / CENT) % 100n;
  const body = `${whole.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${cents.toString().padStart(2, "0")}`;
  return neg ? `-${body}` : body;
}

/** Accepts "12" or "12.5" or "12.50". Returns 6-decimal base units. */
export function parseCash(input: string): bigint | null {
  const text = input.trim();
  if (!/^\d+(\.\d{1,2})?$/.test(text)) return null;
  const [whole, frac = ""] = text.split(".");
  const cents = (frac + "00").slice(0, 2);
  const value = BigInt(whole) * SCALE + BigInt(cents) * CENT;
  if (value <= 0n) return null;
  return value;
}

export function shortHash(value: string): string {
  if (value.length < 12) return value;
  return `${value.slice(0, 6)}…${value.slice(-4)}`;
}

export function isAddress(value: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(value.trim());
}
