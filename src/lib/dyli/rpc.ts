import { createServerFn } from "@tanstack/react-start";

const RPC = "https://rpc.bohr.life";

const ALLOWED = new Set([
  "eth_call",
  "eth_chainId",
  "eth_gasPrice",
  "eth_estimateGas",
  "eth_getTransactionReceipt",
  "eth_getCode",
  "eth_blockNumber",
]);

export type TxReceipt = {
  status?: string;
  contractAddress?: string | null;
  blockNumber?: string;
};

export type RpcResult = string | TxReceipt | null;
export type RpcOk = { ok: true; result: RpcResult };
export type RpcFail = { ok: false; error: string };
export type RpcReply = RpcOk | RpcFail;

export const botRpc = createServerFn({ method: "POST" })
  .validator((input: { method: string; params?: unknown[] }) => {
    if (!input || typeof input.method !== "string" || !ALLOWED.has(input.method)) {
      throw new Error("RPC method not allowed");
    }
    return { method: input.method, params: Array.isArray(input.params) ? input.params : [] };
  })
  .handler(async ({ data }): Promise<RpcReply> => {
    try {
      const res = await fetch(RPC, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: data.method, params: data.params }),
      });
      if (!res.ok) return { ok: false, error: `BOT testnet RPC returned ${res.status}.` };
      const body = (await res.json()) as {
        result?: RpcResult;
        error?: { message?: string; data?: string };
      };
      if (body.error) {
        const data = typeof body.error.data === "string" ? ` ${body.error.data}` : "";
        return { ok: false, error: `${body.error.message || "RPC error"}${data}` };
      }
      return { ok: true, result: body.result ?? null };
    } catch {
      return { ok: false, error: "Could not reach the BOT testnet RPC." };
    }
  });
