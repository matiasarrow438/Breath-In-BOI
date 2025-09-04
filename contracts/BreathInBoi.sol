// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title BreathInBoi
 * @dev The ultimate Spongebob memecoin - "breath in boi"
 * 
 * Tokenomics:
 * - Total Supply: 1,000,000,000 BREATHINBOI
 * - No taxes, no fees, just pure meme energy
 * - Liquidity locked forever
 * - Community owned and operated
 */
contract BreathInBoi is ERC20, Ownable, ReentrancyGuard {
    
    // Token details
    string private constant TOKEN_NAME = "Breath In Boi";
    string private constant TOKEN_SYMBOL = "BREATHINBOI";
    uint256 private constant TOTAL_SUPPLY = 1_000_000_000 * 10**18; // 1 billion tokens
    
    // Trading state
    bool public tradingEnabled = false;
    uint256 public tradingStartTime;
    
    // Anti-bot measures
    mapping(address => bool) public isBlacklisted;
    uint256 public maxWalletAmount = TOTAL_SUPPLY / 100; // 1% max wallet
    
    // Events
    event TradingEnabled(uint256 timestamp);
    event BlacklistUpdated(address indexed account, bool isBlacklisted);
    event MaxWalletUpdated(uint256 newMaxWallet);
    
    constructor() ERC20(TOKEN_NAME, TOKEN_SYMBOL) {
        _mint(msg.sender, TOTAL_SUPPLY);
    }
    
    /**
     * @dev Enable trading - can only be called once by owner
     */
    function enableTrading() external onlyOwner {
        require(!tradingEnabled, "Trading already enabled");
        tradingEnabled = true;
        tradingStartTime = block.timestamp;
        emit TradingEnabled(block.timestamp);
    }
    
    /**
     * @dev Override transfer to include anti-bot measures
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override {
        require(!isBlacklisted[from] && !isBlacklisted[to], "Address is blacklisted");
        
        if (tradingEnabled && from != owner() && to != owner()) {
            require(
                balanceOf(to) + amount <= maxWalletAmount,
                "Exceeds maximum wallet amount"
            );
        }
        
        super._beforeTokenTransfer(from, to, amount);
    }
    
    /**
     * @dev Update blacklist status
     */
    function updateBlacklist(address account, bool blacklisted) external onlyOwner {
        isBlacklisted[account] = blacklisted;
        emit BlacklistUpdated(account, blacklisted);
    }
    
    /**
     * @dev Update maximum wallet amount
     */
    function updateMaxWallet(uint256 newMaxWallet) external onlyOwner {
        require(newMaxWallet >= TOTAL_SUPPLY / 1000, "Max wallet too low"); // Min 0.1%
        maxWalletAmount = newMaxWallet;
        emit MaxWalletUpdated(newMaxWallet);
    }
    
    /**
     * @dev Renounce ownership after setup is complete
     */
    function renounceOwnership() public override onlyOwner {
        require(tradingEnabled, "Must enable trading first");
        super.renounceOwnership();
    }
    
    /**
     * @dev Get token metadata
     */
    function getTokenInfo() external pure returns (
        string memory name,
        string memory symbol,
        uint256 totalSupply,
        uint256 decimals
    ) {
        return (TOKEN_NAME, TOKEN_SYMBOL, TOTAL_SUPPLY, 18);
    }
}
