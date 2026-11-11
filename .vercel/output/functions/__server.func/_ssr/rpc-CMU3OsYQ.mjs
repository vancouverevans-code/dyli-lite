import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/rpc-CMU3OsYQ.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var RPC = "https://rpc.bohr.life";
var ALLOWED = /* @__PURE__ */ new Set([
	"eth_call",
	"eth_chainId",
	"eth_gasPrice",
	"eth_estimateGas",
	"eth_getTransactionReceipt",
	"eth_getCode",
	"eth_blockNumber"
]);
var botRpc_createServerFn_handler = createServerRpc({
	id: "87bdc709528786c0e94e8f7d72b55b4a27ca2e4fe2810440d7e95950e48f06ff",
	name: "botRpc",
	filename: "src/lib/dyli/rpc.ts"
}, (opts) => botRpc.__executeServer(opts));
var botRpc = createServerFn({ method: "POST" }).validator((input) => {
	if (!input || typeof input.method !== "string" || !ALLOWED.has(input.method)) throw new Error("RPC method not allowed");
	return {
		method: input.method,
		params: Array.isArray(input.params) ? input.params : []
	};
}).handler(botRpc_createServerFn_handler, async ({ data }) => {
	try {
		const res = await fetch(RPC, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				jsonrpc: "2.0",
				id: 1,
				method: data.method,
				params: data.params
			})
		});
		if (!res.ok) return {
			ok: false,
			error: `BOT testnet RPC returned ${res.status}.`
		};
		const body = await res.json();
		if (body.error) {
			const data = typeof body.error.data === "string" ? ` ${body.error.data}` : "";
			return {
				ok: false,
				error: `${body.error.message || "RPC error"}${data}`
			};
		}
		return {
			ok: true,
			result: body.result ?? null
		};
	} catch {
		return {
			ok: false,
			error: "Could not reach the BOT testnet RPC."
		};
	}
});
//#endregion
export { botRpc_createServerFn_handler };
