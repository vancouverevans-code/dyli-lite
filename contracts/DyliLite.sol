// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

/// @title DyliLite
/// @notice Vault tickets, test USDC, and a 2.5% listing desk in one contract.
///         No proxy, no library, no indexer: `shelf()` is one eth_call.
///         Cash and the market share storage, so a buy does not need approve.
///         Target: BOT Chain testnet (chain id 968). EVM Paris, under the 24KB limit.
contract DyliLite {
    uint256 public constant CAP = 8;
    uint256 public constant FEE_BPS = 250;
    uint256 public constant FAUCET_AMOUNT = 1_000_000_000; // 1,000 dUSDC
    uint256 public constant FAUCET_COOLDOWN = 60 seconds;

    string public constant name = "DYLI Test USDC";
    string public constant symbol = "dUSDC";
    uint8 public constant decimals = 6;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    mapping(address => uint256) public lastFaucet;
    uint256 public totalSupply;

    address public immutable feeTo;
    mapping(uint256 => address) public ownerOf;
    mapping(address => uint256) public held;
    mapping(uint256 => uint256) public listPrice;
    mapping(uint256 => bool) public redeemed;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event Ticket(address indexed from, address indexed to, uint256 indexed id);
    event Listed(uint256 indexed id, uint256 price);
    event Bought(uint256 indexed id, address indexed buyer, uint256 price, uint256 fee);
    event Redeemed(uint256 indexed id);

    error BadId();
    error NotOwner();
    error Taken();
    error AlreadyRedeemed();
    error NotListed();
    error Poor();
    error Early();
    error SelfBuy();

    constructor() {
        feeTo = msg.sender;
    }

    function claim(uint256 id) external {
        if (id == 0 || id > CAP) revert BadId();
        if (ownerOf[id] != address(0)) revert Taken();
        ownerOf[id] = msg.sender;
        held[msg.sender] += 1;
        emit Ticket(address(0), msg.sender, id);
    }

    function list(uint256 id, uint256 price) external {
        if (ownerOf[id] != msg.sender) revert NotOwner();
        if (redeemed[id]) revert AlreadyRedeemed();
        if (price == 0 || price > type(uint128).max) revert NotListed();
        listPrice[id] = price;
        emit Listed(id, price);
    }

    function cancel(uint256 id) external {
        if (ownerOf[id] != msg.sender) revert NotOwner();
        listPrice[id] = 0;
        emit Listed(id, 0);
    }

    function buy(uint256 id) external {
        address seller = ownerOf[id];
        uint256 price = listPrice[id];
        if (seller == address(0) || price == 0) revert NotListed();
        if (redeemed[id]) revert AlreadyRedeemed();
        if (seller == msg.sender) revert SelfBuy();

        uint256 fee = (price * FEE_BPS) / 10_000;
        _spend(msg.sender, seller, price - fee);
        if (fee != 0) _spend(msg.sender, feeTo, fee);

        held[seller] -= 1;
        held[msg.sender] += 1;
        ownerOf[id] = msg.sender;
        listPrice[id] = 0;
        emit Bought(id, msg.sender, price, fee);
        emit Ticket(seller, msg.sender, id);
    }

    function redeem(uint256 id) external {
        if (ownerOf[id] != msg.sender) revert NotOwner();
        if (redeemed[id]) revert AlreadyRedeemed();
        redeemed[id] = true;
        listPrice[id] = 0;
        emit Redeemed(id);
    }

    function faucet() external {
        if (block.timestamp < lastFaucet[msg.sender] + FAUCET_COOLDOWN) revert Early();
        lastFaucet[msg.sender] = block.timestamp;
        totalSupply += FAUCET_AMOUNT;
        balanceOf[msg.sender] += FAUCET_AMOUNT;
        emit Transfer(address(0), msg.sender, FAUCET_AMOUNT);
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        _spend(msg.sender, to, amount);
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        uint256 allowed = allowance[from][msg.sender];
        if (allowed != type(uint256).max) {
            if (allowed < amount) revert Poor();
            allowance[from][msg.sender] = allowed - amount;
        }
        _spend(from, to, amount);
        return true;
    }

    /// @dev owners[i], prices[i], flags[i] describe ticket id i+1.
    function shelf()
        external
        view
        returns (address[8] memory owners, uint128[8] memory prices, bool[8] memory flags)
    {
        for (uint256 i; i < CAP; ) {
            uint256 id = i + 1;
            owners[i] = ownerOf[id];
            prices[i] = uint128(listPrice[id]);
            flags[i] = redeemed[id];
            unchecked {
                ++i;
            }
        }
    }

    function _spend(address from, address to, uint256 amount) internal {
        uint256 bal = balanceOf[from];
        if (bal < amount || to == address(0)) revert Poor();
        unchecked {
            balanceOf[from] = bal - amount;
        }
        balanceOf[to] += amount;
        emit Transfer(from, to, amount);
    }
}
