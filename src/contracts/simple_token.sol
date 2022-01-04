// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

contract Simple_Token is ERC20 {
    constructor(uint256 initialSupply) ERC20("Nates_Token", "NT") {
        _mint(msg.sender, initialSupply);
    }

    function decimals() public pure override returns (uint8) {
        return 2;
    }
}