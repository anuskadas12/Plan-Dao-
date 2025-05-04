// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PlanDao is ERC20 {
    // Constructor that initializes the ERC20 token with a name and symbol
    constructor() ERC20("PlanDao", "PLAN") {
        // Mint initial supply of tokens to the contract deployer's address
        // _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    // Function to mint new tokens, restricted to the contract owner
    function mint(address to) public {
        _mint(to, 25* 10**18);
    }

    // Custom function that uses _transfer internally
    function transfer(address to, uint256 amount) public override returns (bool) {
        _transfer(_msgSender(), to, amount* 10**18);
        return true;
    }

    // Function to donate tokens from one address to another
    function post(address from, address to, uint256 amount) public returns (bool) {
        require(balanceOf(from) >= amount, "Insufficient amount in donor's wallet");

        _transfer(from, to, 5* 10**18);
        return true;
    }

    function verify(address from, address to, uint256 amount) public returns (bool) {
        require(balanceOf(from) >= amount, "Insufficient amount in donor's wallet");

        _transfer(from, to, amount* 10**18);
        return true;
    }
}