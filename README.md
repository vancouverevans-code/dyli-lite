# DYLI Lite

A small collectible desk and a matching on-chain listing contract. Eight pieces sit on a shelf. Claim one, list it, buy it, or mark it redeemed. The same rules run locally in the browser and on BOT Chain testnet.

No indexer. The desk reads the shelf with one `eth_call`.

## Two modes

**Demo** uses two local wallets, You and Them. Cash, asks, and redemptions live in the browser. Reset clears that ledger. Nothing is sent to a chain.

**On chain** talks to a wallet already in the browser (MetaMask or anything that exposes `window.ethereum`). It switches to BOT Chain testnet, deploys `DyliLite` from the desk, then claims, lists, buys, and redeems against that address.

| | |
|---|---|
| Chain | BOT Chain testnet, id `968` (`0x3c8`) |
| RPC | `https://rpc.bohr.life` |
| Explorer | [scan.bohr.life](https://scan.bohr.life) |
| Gas faucet | [faucet.botchain.ai/basic](https://faucet.botchain.ai/basic) |
| Cash | dUSDC, 6 decimals, minted by the contract faucet |
| Fee | 2.5% of the list price, paid to the deployer |
| Tickets | 8, ids 1 through 8, one owner each |

The contract faucet pays 1,000 dUSDC and then waits 60 seconds. Buying spends the buyer’s dUSDC balance inside the contract, so a purchase does not need a separate approve.

## The shelf

| Id | Piece | Kind |
|---|---|---|
| 1 | Night Market Rookie | Card |
| 2 | Brass Guardian | Figure |
| 3 | Clay Stamp | Stamp |
| 4 | Paper Plane Patch | Patch |
| 5 | Ink Wyrm | Pin |
| 6 | Vault Key | Charm |
| 7 | Signal Collar | Textile |
| 8 | Orbit Marble | Glass |

Photos live in `public/collectibles/`.

## Contract

Source: [`contracts/DyliLite.sol`](contracts/DyliLite.sol). Solidity `0.8.26`, MIT, no proxy and no library. The compiled creation code the desk deploys is in `src/lib/dyli/artifact.ts`.

```solidity
function shelf() external view returns (
    address[8] memory owners,
    uint128[8] memory prices,
    bool[8] memory flags
);
```

Slot `i` is ticket `i + 1`. A zero owner means unclaimed. A zero price means not listed. `flags[i]` means redeemed.

Other calls: `claim`, `list`, `cancel`, `buy`, `redeem`, `faucet`, plus a minimal dUSDC `transfer` / `approve` / `transferFrom`. `feeTo` is the deployer and cannot be changed.

Deploy from the **Deploy** tab after the wallet is on chain 968. Paste an existing address on that same tab to read a contract that is already out. The address stays in local storage.

## Run the desk

```bash
npm install
npm run dev
```

The app serves on port `8080`.

```bash
npm test
npm run typecheck
npm run build
```

`npm run build` also runs the database migrations the app shell expects. The collectible desk itself does not use that database.

## Layout

```
contracts/DyliLite.sol     listing contract
src/components/dyli/       the desk
src/lib/dyli/              catalog, ABI codec, RPC, demo ledger
public/collectibles/      shelf photos
```

Stack: React 19, TanStack Start, Vite, Tailwind. Chain calls go through a small codec in `src/lib/dyli/codec.ts`, not a web3 library.
