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
        super._beforeTokenTransfer(from, to, amount);
    }
}
