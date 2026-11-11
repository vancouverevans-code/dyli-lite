import { i as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, q as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as ThumbsUp, t as Wallet } from "../_libs/lucide-react.mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DA1T3BnI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CREATION_BYTES = 4111;
var RUNTIME_BYTES = 4057;
var EIP170_LIMIT = 24576;
var SELECTORS = {
	"shelf": "0x479b9c6c",
	"claim": "0x379607f5",
	"list": "0x50fd7367",
	"cancel": "0x40e58ee5",
	"buy": "0xd96a094a",
	"redeem": "0xdb006a75",
	"faucet": "0xde5f72fd",
	"balanceOf": "0x70a08231",
	"lastFaucet": "0x4799e212",
	"feeTo": "0x017e7e58",
	"held": "0x32f750ff"
};
var CREATION_BYTECODE = "0x60a0604052348015600f57600080fd5b5033608052608051610fd961003660003960008181610198015261096e0152610fd96000f3fe608060405234801561001057600080fd5b506004361061018e5760003560e01c806370a08231116100de578063a9059cbb11610097578063db006a7511610071578063db006a75146103fb578063dd62ed3e1461040e578063de5f72fd14610439578063ec81b4831461044157600080fd5b8063a9059cbb146103cd578063bf333f2c146103e0578063d96a094a146103e857600080fd5b806370a082311461033357806376697640146103535780637d1d5d191461035e5780637ed0f1c11461036657806387d81f7c1461038957806395d89b41146103a957600080fd5b806332f750ff1161014b5780634799e212116101255780634799e212146102c0578063479b9c6c146102e057806350fd7367146102f75780636352211e1461030a57600080fd5b806332f750ff14610278578063379607f51461029857806340e58ee5146102ad57600080fd5b8063017e7e581461019357806306fdde03146101d7578063095ea7b31461021157806318160ddd1461023457806323b872dd1461024b578063313ce5671461025e575b600080fd5b6101ba7f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b0390911681526020015b60405180910390f35b6102046040518060400160405280600e81526020016d44594c492054657374205553444360901b81525081565b6040516101ce9190610d0d565b61022461021f366004610d77565b610449565b60405190151581526020016101ce565b61023d60035481565b6040519081526020016101ce565b610224610259366004610da1565b6104b6565b610266600681565b60405160ff90911681526020016101ce565b61023d610286366004610dde565b60056020526000908152604090205481565b6102ab6102a6366004610e00565b610549565b005b6102ab6102bb366004610e00565b61061f565b61023d6102ce366004610dde565b60026020526000908152604090205481565b6102e86106a4565b6040516101ce93929190610e44565b6102ab610305366004610ec3565b61078a565b6101ba610318366004610e00565b6004602052600090815260409020546001600160a01b031681565b61023d610341366004610dde565b60006020819052908152604090205481565b61023d633b9aca0081565b61023d603c81565b610224610374366004610e00565b60076020526000908152604090205460ff1681565b61023d610397366004610e00565b60066020526000908152604090205481565b61020460405180604001604052806005815260200164645553444360d81b81525081565b6102246103db366004610d77565b610873565b61023d60fa81565b6102ab6103f6366004610e00565b610889565b6102ab610409366004610e00565b610a8b565b61023d61041c366004610ee5565b600160209081526000928352604080842090915290825290205481565b6102ab610b42565b61023d600881565b3360008181526001602090815260408083206001600160a01b038716808552925280832085905551919290917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925906104a49086815260200190565b60405180910390a35060015b92915050565b6001600160a01b038316600090815260016020908152604080832033845290915281205460001981146105335782811015610504576040516303c3a03960e21b815260040160405180910390fd5b61050e8382610f2e565b6001600160a01b03861660009081526001602090815260408083203384529091529020555b61053e858585610c11565b506001949350505050565b8015806105565750600881115b15610574576040516308e235ff60e01b815260040160405180910390fd5b6000818152600460205260409020546001600160a01b0316156105aa57604051633d90016760e11b815260040160405180910390fd5b600081815260046020908152604080832080546001600160a01b031916339081179091558352600590915281208054600192906105e8908490610f41565b9091555050604051819033906000907f2dfc59b9e9e5771094f6925b759050ab02eabef8ae493af705510a8367495bb6908290a450565b6000818152600460205260409020546001600160a01b03163314610656576040516330cd747160e01b815260040160405180910390fd5b6000818152600660205260408082208290555182917f1ea45e30b31292f9d7c5d37d275b2feca555f13f47dce0fdea2f47e8852ecd789161069991815260200190565b60405180910390a250565b6106ac610cee565b6106b4610cee565b6106bc610cee565b60005b60088110156107845760006106d5826001610f41565b6000818152600460205260409020549091506001600160a01b031685836008811061070257610702610f54565b6001600160a01b039092166020928302919091015260008281526006909152604090205484836008811061073857610738610f54565b6001600160801b039092166020928302919091015260008281526007909152604090205460ff1683836008811061077157610771610f54565b91151560209092020152506001016106bf565b50909192565b6000828152600460205260409020546001600160a01b031633146107c1576040516330cd747160e01b815260040160405180910390fd5b60008281526007602052604090205460ff16156107f1576040516306d3830f60e21b815260040160405180910390fd5b80158061080457506001600160801b0381115b156108225760405163665c1c5760e01b815260040160405180910390fd5b600082815260066020526040908190208290555182907f1ea45e30b31292f9d7c5d37d275b2feca555f13f47dce0fdea2f47e8852ecd78906108679084815260200190565b60405180910390a25050565b6000610880338484610c11565b50600192915050565b6000818152600460209081526040808320546006909252909120546001600160a01b03909116908115806108bb575080155b156108d95760405163665c1c5760e01b815260040160405180910390fd5b60008381526007602052604090205460ff1615610909576040516306d3830f60e21b815260040160405180910390fd5b336001600160a01b03831603610932576040516303ad157560e51b815260040160405180910390fd5b600061271061094260fa84610f6a565b61094c9190610f81565b9050610962338461095d8486610f2e565b610c11565b801561099357610993337f000000000000000000000000000000000000000000000000000000000000000083610c11565b6001600160a01b03831660009081526005602052604081208054600192906109bc908490610f2e565b90915550503360009081526005602052604081208054600192906109e1908490610f41565b9091555050600084815260046020908152604080832080546001600160a01b031916339081179091556006835281842093909355805185815291820184905286917ffacd5cf4a59fb843cae84344ea28fde6a2663600d66798f530d16925c0da0073910160405180910390a3604051849033906001600160a01b038616907f2dfc59b9e9e5771094f6925b759050ab02eabef8ae493af705510a8367495bb690600090a450505050565b6000818152600460205260409020546001600160a01b03163314610ac2576040516330cd747160e01b815260040160405180910390fd5b60008181526007602052604090205460ff1615610af2576040516306d3830f60e21b815260040160405180910390fd5b6000818152600760209081526040808320805460ff1916600117905560069091528082208290555182917f82498456531a1065f689ba348ce20bda781238c424cf36748dd40bc282831e0391a250565b33600090815260026020526040902054610b5e90603c90610f41565b421015610b7e57604051631d99a32960e11b815260040160405180910390fd5b33600090815260026020526040812042905560038054633b9aca009290610ba6908490610f41565b90915550503360009081526020819052604081208054633b9aca009290610bce908490610f41565b9091555050604051633b9aca00815233906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a3565b6001600160a01b03831660009081526020819052604090205481811080610c3f57506001600160a01b038316155b15610c5d576040516303c3a03960e21b815260040160405180910390fd5b6001600160a01b03808516600090815260208190526040808220858503905591851681529081208054849290610c94908490610f41565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610ce091815260200190565b60405180910390a350505050565b6040518061010001604052806008906020820280368337509192915050565b602081526000825180602084015260005b81811015610d3b5760208186018101516040868401015201610d1e565b506000604082850101526040601f19601f83011684010191505092915050565b80356001600160a01b0381168114610d7257600080fd5b919050565b60008060408385031215610d8a57600080fd5b610d9383610d5b565b946020939093013593505050565b600080600060608486031215610db657600080fd5b610dbf84610d5b565b9250610dcd60208501610d5b565b929592945050506040919091013590565b600060208284031215610df057600080fd5b610df982610d5b565b9392505050565b600060208284031215610e1257600080fd5b5035919050565b8060005b6008811015610e3e5781511515845260209384019390910190600101610e1d565b50505050565b6103008101818560005b6008811015610e765781516001600160a01b0316835260209283019290910190600101610e4e565b50505061010082018460005b6008811015610eaa5781516001600160801b0316835260209283019290910190600101610e82565b505050610ebb610200830184610e19565b949350505050565b60008060408385031215610ed657600080fd5b50508035926020909101359150565b60008060408385031215610ef857600080fd5b610f0183610d5b565b9150610f0f60208401610d5b565b90509250929050565b634e487b7160e01b600052601160045260246000fd5b818103818111156104b0576104b0610f18565b808201808211156104b0576104b0610f18565b634e487b7160e01b600052603260045260246000fd5b80820281158282048414176104b0576104b0610f18565b600082610f9e57634e487b7160e01b600052601260045260246000fd5b50049056fea2646970667358221220930d344cdcd0392aed6ed681a50a9fec79b21ea9392679b2141c720a8db986ee64736f6c634300081a0033";
var ITEMS = [
	{
		id: 1,
		name: "Night Market Rookie",
		kind: "Card",
		line: "Foil sleeve. A rook and a lantern.",
		image: "/collectibles/01.jpg"
	},
	{
		id: 2,
		name: "Brass Guardian",
		kind: "Figure",
		line: "Small brass. Stays on the desk until you ship it.",
		image: "/collectibles/02.jpg"
	},
	{
		id: 3,
		name: "Clay Stamp",
		kind: "Stamp",
		line: "Terracotta seal with a blank face.",
		image: "/collectibles/03.jpg"
	},
	{
		id: 4,
		name: "Paper Plane Patch",
		kind: "Patch",
		line: "Linen ground, ink thread.",
		image: "/collectibles/04.jpg"
	},
	{
		id: 5,
		name: "Ink Wyrm",
		kind: "Pin",
		line: "Black enamel, gold rim.",
		image: "/collectibles/05.jpg"
	},
	{
		id: 6,
		name: "Vault Key",
		kind: "Charm",
		line: "Brass key on a short chain.",
		image: "/collectibles/06.jpg"
	},
	{
		id: 7,
		name: "Signal Collar",
		kind: "Textile",
		line: "Black fold, gold along the collar.",
		image: "/collectibles/07.jpg"
	},
	{
		id: 8,
		name: "Orbit Marble",
		kind: "Glass",
		line: "Amber swirl sitting in a tin.",
		image: "/collectibles/08.jpg"
	}
];
"" + "0".repeat(40);
function word(value) {
	if (value < 0n) throw new Error("negative word");
	const hex = value.toString(16);
	if (hex.length > 64) throw new Error("word overflow");
	return hex.padStart(64, "0");
}
function encode(selector, args = []) {
	return selector + args.map(word).join("");
}
function decodeUint(data) {
	const hex = data.startsWith("0x") ? data.slice(2) : data;
	if (!hex) return 0n;
	return BigInt("0x" + hex);
}
function decodeAddress(data) {
	return "0x" + (data.startsWith("0x") ? data.slice(2) : data).padStart(64, "0").slice(-40);
}
function isZeroAddress(value) {
	return BigInt(value) === 0n;
}
function decodeShelf(data) {
	const hex = data.startsWith("0x") ? data.slice(2) : data;
	if (hex.length < 1536) throw new Error("Shelf reply was short.");
	const slots = [];
	for (let i = 0; i < 8; i++) {
		const owner = "0x" + hex.slice(i * 64 + 24, (i + 1) * 64);
		const price = BigInt("0x" + hex.slice((8 + i) * 64, (8 + i + 1) * 64));
		const flag = BigInt("0x" + hex.slice((16 + i) * 64, (16 + i + 1) * 64));
		slots.push({
			owner,
			price,
			redeemed: flag !== 0n
		});
	}
	return slots;
}
var REVERTS = {
	"08e235ff": "That ticket id is not on this desk.",
	"30cd7471": "That ticket is not yours.",
	"7b2002ce": "Already in a vault.",
	"1b4e0c3c": "Already marked for shipment.",
	"665c1c57": "Not listed, or the price is empty.",
	"0f0e80e4": "Not enough dUSDC.",
	"3b334652": "Faucet needs a minute. Try again shortly.",
	"75a2aea0": "You already hold this listing."
};
function explain(error) {
	const err = error;
	if (err?.code === 4001) return "Wallet closed the request.";
	const data = typeof err?.data === "string" ? err.data : "";
	const blob = `${err?.message ?? ""} ${data}`.toLowerCase();
	if (!blob.trim()) return "Something on the chain call failed.";
	if (blob.includes("user rejected") || blob.includes("user denied")) return "Wallet closed the request.";
	for (const [sel, text] of Object.entries(REVERTS)) if (blob.includes(sel)) return text;
	return err?.message?.replace(/^Error:\s*/, "") || "The chain rejected that.";
}
function shelfCall() {
	return encode(SELECTORS.shelf);
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var ALLOWED = /* @__PURE__ */ new Set([
	"eth_call",
	"eth_chainId",
	"eth_gasPrice",
	"eth_estimateGas",
	"eth_getTransactionReceipt",
	"eth_getCode",
	"eth_blockNumber"
]);
var botRpc = createServerFn({ method: "POST" }).validator((input) => {
	if (!input || typeof input.method !== "string" || !ALLOWED.has(input.method)) throw new Error("RPC method not allowed");
	return {
		method: input.method,
		params: Array.isArray(input.params) ? input.params : []
	};
}).handler(createSsrRpc("87bdc709528786c0e94e8f7d72b55b4a27ca2e4fe2810440d7e95950e48f06ff"));
var CHAIN_HEX = "0x3c8";
var EXPLORER = "https://scan.bohr.life";
var FAUCET_URL = "https://faucet.botchain.ai/basic";
var FAUCET_AMOUNT$1 = 1000000000n;
var BOT_TESTNET = {
	chainId: CHAIN_HEX,
	chainName: "BOT Chain Testnet",
	nativeCurrency: {
		name: "BOT",
		symbol: "BOT",
		decimals: 18
	},
	rpcUrls: ["https://rpc.bohr.life"],
	blockExplorerUrls: [EXPLORER]
};
function getEth() {
	if (typeof window === "undefined") return null;
	return window.ethereum ?? null;
}
async function rpc(method, params = []) {
	const reply = await botRpc({ data: {
		method,
		params
	} });
	if (!reply.ok) throw new Error(reply.error);
	return reply.result;
}
async function readChain(contract, account) {
	const shelf = await rpc("eth_call", [{
		to: contract,
		data: shelfCall()
	}, "latest"]);
	if (typeof shelf !== "string") throw new Error("Shelf call returned nothing.");
	const slots = decodeShelf(shelf);
	if (slots.length !== 8) throw new Error("Shelf length mismatch.");
	const feeRaw = await rpc("eth_call", [{
		to: contract,
		data: encode(SELECTORS.feeTo)
	}, "latest"]);
	const feeTo = typeof feeRaw === "string" ? decodeAddress(feeRaw) : "0x" + "0".repeat(40);
	let cash = 0n;
	let lastFaucet = 0n;
	if (account) {
		const bal = await rpc("eth_call", [{
			to: contract,
			data: encode(SELECTORS.balanceOf, [BigInt(account)])
		}, "latest"]);
		const last = await rpc("eth_call", [{
			to: contract,
			data: encode(SELECTORS.lastFaucet, [BigInt(account)])
		}, "latest"]);
		if (typeof bal === "string") cash = decodeUint(bal);
		if (typeof last === "string") lastFaucet = decodeUint(last);
	}
	return {
		slots,
		cash,
		lastFaucet,
		feeTo
	};
}
async function connectWallet() {
	const eth = getEth();
	if (!eth) throw new Error("No wallet in this browser. The demo desk still runs.");
	const account = (await eth.request({ method: "eth_requestAccounts" }))[0];
	if (!account) throw new Error("Wallet returned no account.");
	await ensureChain(eth);
	return {
		eth,
		account
	};
}
async function ensureChain(eth) {
	try {
		await eth.request({
			method: "wallet_switchEthereumChain",
			params: [{ chainId: CHAIN_HEX }]
		});
	} catch (error) {
		const code = error.code;
		if (code === 4902 || code === -32603) {
			await eth.request({
				method: "wallet_addEthereumChain",
				params: [BOT_TESTNET]
			});
			return;
		}
		throw error;
	}
}
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
async function sendTx(eth, from, to, data) {
	const tx = {
		from,
		data
	};
	if (to) tx.to = to;
	try {
		const est = await rpc("eth_estimateGas", [tx]);
		if (typeof est === "string") tx.gas = "0x" + (BigInt(est) * 13n / 10n).toString(16);
	} catch (error) {
		if (!to) tx.gas = "0x16e360";
		else throw error;
	}
	const hash = await eth.request({
		method: "eth_sendTransaction",
		params: [tx]
	});
	for (let i = 0; i < 30; i++) {
		await sleep(1e3);
		const receipt = await rpc("eth_getTransactionReceipt", [hash]);
		if (receipt && typeof receipt === "object") {
			const rec = receipt;
			const status = rec.status ?? "0x1";
			if (status === "0x0" || status === "0x00") throw new Error("Transaction reverted.");
			return {
				hash,
				contractAddress: rec.contractAddress ?? null
			};
		}
	}
	return {
		hash,
		contractAddress: null
	};
}
function deployData() {
	return CREATION_BYTECODE;
}
function explainChain(error) {
	return explain(error);
}
var FAUCET_AMOUNT = 1e9;
var SIDES = [
	"you",
	"desk",
	"nia",
	"kal",
	"omar"
];
var SIDE_LABEL = {
	you: "You",
	desk: "Vault desk",
	nia: "Nia",
	kal: "Kal",
	omar: "Omar"
};
var KEY = "dyli-lite-ledger-v1";
function seed() {
	return {
		cash: {
			you: 25e7,
			desk: 2e9,
			nia: 4e8,
			kal: 4e8,
			omar: 1e8
		},
		owner: [
			null,
			"desk",
			"desk",
			"nia",
			"you",
			"you",
			"kal",
			"omar",
			null
		],
		price: [
			0,
			48e6,
			18e7,
			26e6,
			0,
			64e6,
			92e6,
			0,
			0
		],
		redeemed: [
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			true,
			false
		],
		fees: 0
	};
}
function isSide(value) {
	return typeof value === "string" && SIDES.includes(value);
}
function loadLedger() {
	if (typeof localStorage === "undefined") return seed();
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return seed();
		const parsed = JSON.parse(raw);
		if (!parsed?.cash || !isSide("you") || parsed.owner?.length !== 9) return seed();
		if (!isSide("you") || typeof parsed.cash.you !== "number") return seed();
		for (const side of SIDES) if (typeof parsed.cash[side] !== "number") return seed();
		return parsed;
	} catch {
		return seed();
	}
}
function clearLedger() {
	localStorage.removeItem(KEY);
}
function apply(ledger, action) {
	const next = {
		cash: { ...ledger.cash },
		owner: ledger.owner.slice(),
		price: ledger.price.slice(),
		redeemed: ledger.redeemed.slice(),
		fees: ledger.fees
	};
	const id = "id" in action ? action.id : 0;
	if (action.type !== "faucet" && (id < 1 || id > 8)) return {
		ledger,
		error: "That ticket id is not on this desk."
	};
	if (action.type === "faucet") {
		next.cash[action.by] += FAUCET_AMOUNT;
		return { ledger: next };
	}
	if (action.type === "claim") {
		if (next.owner[id]) return {
			ledger,
			error: "Already in a vault."
		};
		next.owner[id] = action.by;
		return { ledger: next };
	}
	const owner = next.owner[id];
	if (action.type === "list") {
		if (owner !== action.by) return {
			ledger,
			error: "That ticket is not yours."
		};
		if (next.redeemed[id]) return {
			ledger,
			error: "Already marked for shipment."
		};
		if (action.price <= 0) return {
			ledger,
			error: "Set a price above zero."
		};
		next.price[id] = action.price;
		return { ledger: next };
	}
	if (action.type === "cancel") {
		if (owner !== action.by) return {
			ledger,
			error: "That ticket is not yours."
		};
		next.price[id] = 0;
		return { ledger: next };
	}
	if (action.type === "redeem") {
		if (owner !== action.by) return {
			ledger,
			error: "That ticket is not yours."
		};
		if (next.redeemed[id]) return {
			ledger,
			error: "Already marked for shipment."
		};
		next.redeemed[id] = true;
		next.price[id] = 0;
		return { ledger: next };
	}
	const price = next.price[id];
	if (!owner || price <= 0) return {
		ledger,
		error: "Not listed."
	};
	if (next.redeemed[id]) return {
		ledger,
		error: "Already marked for shipment."
	};
	if (owner === action.by) return {
		ledger,
		error: "You already hold this listing."
	};
	if (next.cash[action.by] < price) return {
		ledger,
		error: "Not enough dUSDC. Refill on the Pay desk."
	};
	const fee = Math.floor(price * 250 / 1e4);
	next.cash[action.by] -= price;
	next.cash[owner] += price - fee;
	next.fees += fee;
	next.owner[id] = action.by;
	next.price[id] = 0;
	return { ledger: next };
}
var SCALE = 1000000n;
var CENT = 10000n;
function formatCash(amount) {
	const value = typeof amount === "bigint" ? amount : BigInt(Math.trunc(amount));
	const neg = value < 0n;
	const abs = neg ? -value : value;
	const whole = abs / SCALE;
	const cents = abs / CENT % 100n;
	const body = `${whole.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${cents.toString().padStart(2, "0")}`;
	return neg ? `-${body}` : body;
}
/** Accepts "12" or "12.5" or "12.50". Returns 6-decimal base units. */
function parseCash(input) {
	const text = input.trim();
	if (!/^\d+(\.\d{1,2})?$/.test(text)) return null;
	const [whole, frac = ""] = text.split(".");
	const cents = (frac + "00").slice(0, 2);
	const value = BigInt(whole) * SCALE + BigInt(cents) * CENT;
	if (value <= 0n) return null;
	return value;
}
function shortHash(value) {
	if (value.length < 12) return value;
	return `${value.slice(0, 6)}…${value.slice(-4)}`;
}
function isAddress(value) {
	return /^0x[a-fA-F0-9]{40}$/.test(value.trim());
}
var MODE_KEY = "dyli-lite-mode";
var CONTRACT_KEY = "dyli-lite-contract";
function labelFor(side) {
	if (!side) return null;
	return SIDE_LABEL[side];
}
function Desk() {
	const [mode, setMode] = (0, import_react.useState)("demo");
	const [tab, setTab] = (0, import_react.useState)("floor");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [ledger, setLedger] = (0, import_react.useState)(() => seed());
	const [ready, setReady] = (0, import_react.useState)(false);
	const [account, setAccount] = (0, import_react.useState)(null);
	const [contract, setContract] = (0, import_react.useState)("");
	const [draft, setDraft] = (0, import_react.useState)("");
	const [asks, setAsks] = (0, import_react.useState)({});
	const [note, setNote] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(null);
	const [arm, setArm] = (0, import_react.useState)(null);
	const [chain, setChain] = (0, import_react.useState)(null);
	const [chainError, setChainError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setLedger(loadLedger());
		const saved = localStorage.getItem(CONTRACT_KEY) ?? "";
		setContract(saved);
		setDraft(saved);
		const stored = localStorage.getItem(MODE_KEY);
		if (stored === "chain" || stored === "demo") setMode(stored);
		setReady(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		localStorage.setItem(MODE_KEY, mode);
	}, [mode, ready]);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		localStorage.setItem("dyli-lite-ledger-v1", JSON.stringify(ledger));
	}, [ledger, ready]);
	(0, import_react.useEffect)(() => {
		const eth = getEth();
		if (!eth?.on) return;
		const onAccounts = (value) => {
			setAccount((Array.isArray(value) ? value : [])[0] ?? null);
		};
		eth.on("accountsChanged", onAccounts);
		return () => eth.removeListener?.("accountsChanged", onAccounts);
	}, []);
	(0, import_react.useEffect)(() => {
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
		pull();
		const timer = setInterval(() => void pull(), 8e3);
		return () => {
			cancel = true;
			clearInterval(timer);
		};
	}, [
		mode,
		contract,
		account
	]);
	const cash = mode === "demo" ? BigInt(ledger.cash.you) : chain?.cash ?? 0n;
	const slots = buildSlots(mode, ledger, chain, account);
	async function refresh() {
		if (!isAddress(contract)) {
			setNote("Deploy or attach a contract first.");
			return;
		}
		const view = await readChain(contract, account);
		setChain(view);
	}
	async function wallet() {
		const linked = await connectWallet();
		setAccount(linked.account);
		return linked;
	}
	async function run(key, fn) {
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
	function demo(action, ok) {
		const result = apply(ledger, action);
		if (result.error) {
			setNote(result.error);
			return;
		}
		setLedger(result.ledger);
		setNote(ok);
	}
	function onBuy(id) {
		if (mode === "demo") {
			demo({
				type: "buy",
				id,
				by: "you"
			}, "Bought. The ticket moved. The object stayed put.");
			return;
		}
		run(`buy-${id}`, async () => {
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
	function onClaim(id) {
		if (mode === "demo") {
			demo({
				type: "claim",
				id,
				by: "you"
			}, "Intaked into your vault.");
			return;
		}
		run(`claim-${id}`, async () => {
			if (!isAddress(contract)) {
				setNote("Deploy or attach a contract first.");
				return;
			}
			const linked = await wallet();
			const { hash } = await sendTx(linked.eth, linked.account, contract, encode(SELECTORS.claim, [BigInt(id)]));
			setNote(`Intake confirmed. ${shortHash(hash)}`);
			await refresh();
		});
	}
	function onList(id) {
		const price = parseCash(asks[id] ?? "");
		if (!price) {
			setNote("Use a price like 24.00");
			return;
		}
		if (mode === "demo") {
			demo({
				type: "list",
				id,
				by: "you",
				price: Number(price)
			}, "Listed.");
			return;
		}
		run(`list-${id}`, async () => {
			if (!isAddress(contract)) {
				setNote("Deploy or attach a contract first.");
				return;
			}
			const linked = await wallet();
			const { hash } = await sendTx(linked.eth, linked.account, contract, encode(SELECTORS.list, [BigInt(id), price]));
			setNote(`Listing confirmed. ${shortHash(hash)}`);
			await refresh();
		});
	}
	function onCancel(id) {
		if (mode === "demo") {
			demo({
				type: "cancel",
				id,
				by: "you"
			}, "Listing pulled.");
			return;
		}
		run(`cancel-${id}`, async () => {
			if (!isAddress(contract)) {
				setNote("Deploy or attach a contract first.");
				return;
			}
			const linked = await wallet();
			const { hash } = await sendTx(linked.eth, linked.account, contract, encode(SELECTORS.cancel, [BigInt(id)]));
			setNote(`Cancel confirmed. ${shortHash(hash)}`);
			await refresh();
		});
	}
	function onRedeem(id) {
		if (arm !== id) {
			setArm(id);
			setNote("Redeem locks the ticket and clears the ask. Tap again to confirm.");
			return;
		}
		setArm(null);
		if (mode === "demo") {
			demo({
				type: "redeem",
				id,
				by: "you"
			}, "Marked for shipment. It can no longer list.");
			return;
		}
		run(`redeem-${id}`, async () => {
			if (!isAddress(contract)) {
				setNote("Deploy or attach a contract first.");
				return;
			}
			const linked = await wallet();
			const { hash } = await sendTx(linked.eth, linked.account, contract, encode(SELECTORS.redeem, [BigInt(id)]));
			setNote(`Redeem confirmed. ${shortHash(hash)}`);
			await refresh();
		});
	}
	function onFaucet() {
		if (mode === "demo") {
			demo({
				type: "faucet",
				by: "you"
			}, "Desk refilled 1,000.00 dUSDC.");
			return;
		}
		run("faucet", async () => {
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
		run("deploy", async () => {
			const linked = await wallet();
			const { hash, contractAddress } = await sendTx(linked.eth, linked.account, null, deployData());
			if (contractAddress) {
				setContract(contractAddress);
				setDraft(contractAddress);
				localStorage.setItem(CONTRACT_KEY, contractAddress);
				setMode("chain");
				setNote(`Deployed ${shortHash(contractAddress)}.`);
			} else setNote(`Deploy sent ${shortHash(hash)}. Paste the contract address from the explorer if it is not filled in yet.`);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-paper text-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "bg-ink text-paper",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 lg:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-11 place-items-center rounded-2xl bg-gold text-gold-ink",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbsUp, {
							className: "size-5",
							"aria-hidden": "true"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-2xl leading-none tracking-tight",
						children: ["DYLI ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-gold",
							children: "Lite"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm opacity-80",
						children: "Vault, pay, resale. One contract."
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded-full border border-paper/20 px-3 py-2 text-sm tabular-nums",
						children: ["BOT testnet · ", 968]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "inline-flex min-h-11 items-center gap-2 rounded-full bg-paper px-4 text-sm font-medium text-ink",
						onClick: () => {
							if (account) return;
							run("connect", async () => {
								const linked = await connectWallet();
								setAccount(linked.account);
								setNote(`Connected ${shortHash(linked.account)} on BOT testnet.`);
							});
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, {
							className: "size-4",
							"aria-hidden": "true"
						}), account ? shortHash(account) : "Connect wallet"]
					})]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-5 px-4 py-5 lg:grid-cols-[15.5rem_minmax(0,1fr)] lg:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "flex flex-col gap-4 lg:sticky lg:top-4 lg:self-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-line bg-card p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-1 rounded-xl bg-paper p-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeButton, {
								active: mode === "demo",
								onClick: () => setMode("demo"),
								children: "Demo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeButton, {
								active: mode === "chain",
								onClick: () => setMode("chain"),
								children: "Chain"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-xs tracking-wide text-mute uppercase",
							children: "Your dUSDC"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-4xl leading-none tabular-nums",
							children: formatCash(cash)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-mute",
							children: [
								held,
								" in vault · ",
								listed,
								" listed · fee ",
								250 / 100,
								"%"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-4 min-h-11 w-full rounded-xl bg-gold px-3 text-sm font-medium text-gold-ink disabled:opacity-50",
							disabled: Boolean(busy),
							onClick: onFaucet,
							children: busy === "faucet" ? "Filling…" : "Faucet 1,000.00"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "grid grid-cols-4 gap-1 lg:grid-cols-1",
					"aria-label": "Desk",
					children: [
						["floor", "Floor"],
						["vault", "Vault"],
						["pay", "Pay"],
						["deploy", "Deploy"]
					].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: tab === id ? "min-h-11 rounded-xl bg-ink px-3 text-sm font-medium text-paper" : "min-h-11 rounded-xl border border-line bg-card px-3 text-sm text-ink",
						onClick: () => setTab(id),
						children: label
					}, id))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "min-w-0",
				children: [
					note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-4 rounded-2xl border border-line bg-card px-4 py-3 text-sm",
						role: "status",
						children: note
					}) : null,
					mode === "chain" && chainError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-4 rounded-2xl border border-stamp bg-card px-4 py-3 text-sm text-stamp",
						children: chainError
					}) : null,
					tab === "floor" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Floor, {
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
						onDeployTab: () => setTab("deploy")
					}) : null,
					tab === "vault" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Vault, {
						slots,
						asks,
						setAsks,
						arm,
						busy,
						onList,
						onCancel,
						onRedeem
					}) : null,
					tab === "pay" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pay, {
						cash,
						fees: mode === "demo" ? BigInt(ledger.fees) : 0n,
						mode,
						lastFaucet: chain?.lastFaucet ?? 0n,
						busy: busy === "faucet",
						onFaucet,
						onReset: () => {
							clearLedger();
							setLedger(seed());
							setNote("Demo desk reset.");
						}
					}) : null,
					tab === "deploy" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Deploy, {
						draft,
						setDraft,
						contract,
						busy: busy === "deploy",
						feeTo: chain?.feeTo ?? null,
						onDeploy,
						onSave: saveContract
					}) : null
				]
			})]
		})]
	});
}
function buildSlots(mode, ledger, chain, account) {
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
				redeemed: ledger.redeemed[item.id]
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
			redeemed: slot?.redeemed ?? false
		};
	});
}
function ModeButton({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: active ? "min-h-11 rounded-lg bg-ink text-sm font-medium text-paper" : "min-h-11 rounded-lg text-sm text-mute",
		onClick,
		"aria-pressed": active,
		children
	});
}
function Floor({ slots, filter, setFilter, cash, busy, chainReady, reading, onBuy, onClaim, onCancel, onDeployTab }) {
	const shown = slots.filter((slot) => {
		if (filter === "listed") return slot.price !== null && !slot.redeemed;
		if (filter === "open") return slot.open;
		if (filter === "yours") return slot.yours;
		return true;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-wrap items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl leading-none",
				children: "Floor"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-xl text-sm text-mute",
				children: "Ownership moves. The object stays vaulted until someone redeems it for shipment."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1",
				role: "group",
				"aria-label": "Filter floor",
				children: [
					["all", "All"],
					["listed", "Listed"],
					["open", "Open"],
					["yours", "Yours"]
				].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: filter === id ? "min-h-11 rounded-full bg-ink px-3 text-sm text-paper" : "min-h-11 rounded-full border border-line bg-card px-3 text-sm",
					onClick: () => setFilter(id),
					children: label
				}, id))
			})]
		}),
		!chainReady ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl border border-line bg-card p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl",
					children: "No contract on this desk yet."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-lg text-sm text-mute",
					children: "Chain mode reads eight tickets with one call. Deploy the lite contract, or paste an address you already deployed."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "mt-4 min-h-11 rounded-xl bg-gold px-4 text-sm font-medium text-gold-ink",
					onClick: onDeployTab,
					children: "Open deploy"
				})
			]
		}) : reading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "rounded-2xl border border-line bg-card p-5 text-sm",
			children: "Reading the shelf from BOT testnet…"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-3 lg:grid-cols-3",
			children: shown.map((slot) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Piece, {
				slot,
				cash,
				busy,
				onBuy,
				onClaim,
				onCancel
			}, slot.item.id))
		}),
		chainReady && shown.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-sm text-mute",
			children: "Nothing in this filter."
		}) : null
	] });
}
function Piece({ slot, cash, busy, onBuy, onClaim, onCancel }) {
	const { item, price, yours, open, redeemed, ownerLabel } = slot;
	const [broken, setBroken] = (0, import_react.useState)(false);
	const short = price !== null && cash < price;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "piece flex flex-col overflow-hidden rounded-2xl border border-line bg-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [broken ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "shot grid place-items-end p-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-3xl",
					children: String(item.id).padStart(2, "0")
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				className: "shot",
				src: item.image,
				alt: item.name,
				onError: () => setBroken(true)
			}), redeemed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "stamp",
				children: "Ship"
			}) : null]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col gap-2 p-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs tracking-wide text-mute uppercase",
					children: [
						String(item.id).padStart(2, "0"),
						" · ",
						item.kind
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl leading-tight",
					children: item.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-mute",
					children: ownerLabel ? ownerLabel : "Open intake"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-auto pt-2",
					children: redeemed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: "Marked for shipment."
					}) : open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 w-full rounded-xl bg-ink px-2 text-center text-sm leading-tight font-medium text-paper disabled:opacity-50",
						disabled: Boolean(busy),
						onClick: () => onClaim(item.id),
						children: busy === `claim-${item.id}` ? "Intaking…" : "Intake"
					}) : price !== null && !yours ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 w-full rounded-xl bg-gold px-2 text-center text-sm leading-tight font-medium text-gold-ink disabled:opacity-50",
						disabled: Boolean(busy) || short,
						onClick: () => onBuy(item.id),
						children: busy === `buy-${item.id}` ? "Buying…" : short ? `Need ${formatCash(price)}` : `Buy ${formatCash(price)}`
					}) : price !== null && yours ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 w-full rounded-xl border border-line px-2 text-center text-sm leading-tight disabled:opacity-50",
						disabled: Boolean(busy),
						onClick: () => onCancel(item.id),
						children: busy === `cancel-${item.id}` ? "Pulling…" : `Pull ask ${formatCash(price)}`
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-mute",
						children: yours ? "In your vault" : "Held, not listed"
					})
				})
			]
		})]
	});
}
function Vault({ slots, asks, setAsks, arm, busy, onList, onCancel, onRedeem }) {
	const mine = slots.filter((slot) => slot.yours);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl leading-none",
			children: "Vault"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-xl text-sm text-mute",
			children: "List from here. Redeem when you want the physical piece shipped. That flag clears the ask and stops resale."
		}),
		mine.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 rounded-2xl border border-line bg-card p-5 text-sm",
			children: "Nothing in your vault. Intake an open ticket on the floor."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-5 flex flex-col gap-3",
			children: mine.map((slot) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-2xl border border-line bg-card p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-wide text-mute uppercase",
							children: slot.item.kind
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl leading-tight",
							children: slot.item.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-mute",
							children: slot.item.line
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm tabular-nums",
						children: slot.redeemed ? "Shipping" : slot.price !== null ? `Ask ${formatCash(slot.price)}` : "Not listed"
					})]
				}), slot.redeemed ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-col gap-2 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "min-w-0 flex-1 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-1 block text-mute",
							children: "Ask in dUSDC"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "min-h-11 w-full rounded-xl border border-line bg-paper px-3 tabular-nums",
							inputMode: "decimal",
							placeholder: "24.00",
							value: asks[slot.item.id] ?? "",
							onChange: (event) => setAsks({
								...asks,
								[slot.item.id]: event.target.value
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 sm:items-end",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "min-h-11 flex-1 rounded-xl bg-ink px-4 text-sm font-medium text-paper disabled:opacity-50 sm:flex-none",
								disabled: Boolean(busy),
								onClick: () => onList(slot.item.id),
								children: slot.price !== null ? "Update" : "List"
							}),
							slot.price !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "min-h-11 rounded-xl border border-line px-4 text-sm disabled:opacity-50",
								disabled: Boolean(busy),
								onClick: () => onCancel(slot.item.id),
								children: "Pull"
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "min-h-11 rounded-xl bg-stamp px-4 text-sm font-medium text-stamp-ink disabled:opacity-50",
								disabled: Boolean(busy),
								onClick: () => onRedeem(slot.item.id),
								children: arm === slot.item.id ? "Confirm ship" : "Redeem"
							})
						]
					})]
				})]
			}, slot.item.id))
		})
	] });
}
function Pay({ cash, fees, mode, lastFaucet, busy, onFaucet, onReset }) {
	const now = Math.floor(Date.now() / 1e3);
	const next = Number(lastFaucet) + 60;
	const wait = mode === "chain" && lastFaucet > 0n ? Math.max(0, next - now) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "max-w-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl leading-none",
				children: "Pay"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-mute",
				children: "Buys pull dUSDC inside the same contract. There is no separate token and no approve step."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-line bg-card p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-wide text-mute uppercase",
							children: "Balance"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-display text-4xl tabular-nums",
							children: formatCash(cash)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-4 min-h-11 rounded-xl bg-gold px-4 text-sm font-medium text-gold-ink disabled:opacity-50",
							disabled: busy || wait > 0,
							onClick: onFaucet,
							children: busy ? "Filling…" : wait > 0 ? `Wait ${wait}s` : `Take ${formatCash(FAUCET_AMOUNT$1)}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-mute",
							children: mode === "demo" ? "Demo refill is instant. On chain the faucet waits 60 seconds." : "Test cash only. This is not bridged USDT."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-line bg-card p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-wide text-mute uppercase",
							children: "Settlement"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
							className: "mt-3 flex flex-col gap-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "1. Buyer pays the ask in full." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "2. Deployer keeps 2.5%." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "3. Seller receives the rest." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "4. Ticket owner updates. The object does not move." })
							]
						}),
						mode === "demo" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-sm tabular-nums text-mute",
							children: [
								"Fee pot ",
								formatCash(fees),
								" dUSDC"
							]
						}) : null
					]
				})]
			}),
			mode === "demo" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-4 min-h-11 text-sm text-mute underline",
				onClick: onReset,
				children: "Reset demo desk"
			}) : null
		]
	});
}
function Deploy({ draft, setDraft, contract, busy, feeTo, onDeploy, onSave }) {
	const share = Math.round(RUNTIME_BYTES / EIP170_LIMIT * 1e3) / 10;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "max-w-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl leading-none",
				children: "Deploy"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-mute",
				children: "Paris EVM bytecode, no proxy, no library. Sized for BOT Chain testnet so a normal wallet can deploy it."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-5 grid grid-cols-2 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Runtime",
						v: `${RUNTIME_BYTES.toLocaleString()} bytes`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Of 24KB cap",
						v: `${share}%`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Creation",
						v: `${CREATION_BYTES.toLocaleString()} bytes`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Chain",
						v: `968`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 rounded-2xl border border-line bg-card p-4 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: "Left out, on purpose"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-2 flex flex-col gap-1 text-mute",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Packs, odds, and fair drops" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "A second peer-trade contract" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Card checkout and shipping APIs" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "An event indexer. The floor is one `shelf()` call" })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
				className: "mt-4 flex flex-col gap-2 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						"1. Get test BOT from",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "underline",
							href: FAUCET_URL,
							target: "_blank",
							rel: "noreferrer",
							children: "the faucet"
						}),
						"."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						"2. Connect a wallet and switch to chain ",
						968,
						"."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "3. Deploy. You become the fee recipient." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "4. Faucet dUSDC, intake a ticket, list it, buy from another wallet." })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-col gap-2 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "min-h-11 rounded-xl bg-gold px-4 text-sm font-medium text-gold-ink disabled:opacity-50",
					disabled: busy,
					onClick: onDeploy,
					children: busy ? "Deploying…" : "Deploy on testnet"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "min-h-11 rounded-xl border border-line bg-card px-4 text-sm",
					onClick: () => {
						navigator.clipboard.writeText(deployData());
					},
					children: "Copy bytecode"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-5 block text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mb-1 block text-mute",
					children: "Or attach a deployed address"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "min-h-11 w-full rounded-xl border border-line bg-card px-3 font-mono text-sm",
					spellCheck: false,
					value: draft,
					placeholder: "0x…",
					onChange: (event) => setDraft(event.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-2 min-h-11 rounded-xl bg-ink px-4 text-sm font-medium text-paper",
				onClick: onSave,
				children: "Use this contract"
			}),
			isAddress(contract) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm",
				children: [
					"Live contract",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "underline",
						href: `${EXPLORER}/address/${contract}`,
						target: "_blank",
						rel: "noreferrer",
						children: shortHash(contract)
					}),
					feeTo && !isZeroAddress(feeTo) ? ` · fees to ${shortHash(feeTo)}` : ""
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm text-mute",
				children: [
					"Explorer ",
					EXPLORER.replace("https://", ""),
					" · RPC rpc.bohr.life"
				]
			})
		]
	});
}
function Stat({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-line bg-card p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-xs tracking-wide text-mute uppercase",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-1 font-display text-2xl tabular-nums",
			children: v
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Desk, {});
}
//#endregion
export { Home as component };
