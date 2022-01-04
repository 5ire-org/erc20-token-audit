// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract IRE is ERC20, ERC20Burnable, Pausable, AccessControl {
    bytes32 public constant PAUSER_ROLE = keccak256("pauserole.");
    bytes32 public constant MINTER_ROLE = keccak256("mintrole.");

    uint32 public constant VERSION = 1;
    uint8 private constant DECIMALS = 18;
    uint256 private constant TOKEN_WEI = 10**uint256(DECIMALS);
    uint256 private constant INITIAL_WHOLE_TOKENS = uint256(1.5 * (10**9));
    uint256 private constant INITIAL_SUPPLY =
        uint256(INITIAL_WHOLE_TOKENS) * uint256(TOKEN_WEI);

    mapping(address => bool) _isBlacklisted;
    event addToBlackListEvent(address indexed addresses);

    constructor() ERC20("5IRE Chain", "5IRE") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override whenNotPaused {
        //add the require statement into the transfer function
        require(
            !_isBlacklisted[from] && !_isBlacklisted[to],
            "This address is blacklisted"
        );
        super._beforeTokenTransfer(from, to, amount);
    }

    //Adding multiple addresses to the blacklist - Used to manually block
    function addToBlackList(address[] calldata addresses)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        for (uint256 i; i < addresses.length; ++i) {
            _isBlacklisted[addresses[i]] = true;
            emit addToBlackListEvent(addresses[i]);
        }
    }

    function removeFromBlackList(address[] calldata addresses)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        for (uint256 i; i < addresses.length; ++i) {
            _isBlacklisted[addresses[i]] = false;
        }
    }

    function isBlacklisted(address usrAddress) public view returns (bool) {
        return _isBlacklisted[usrAddress];
    }
}
