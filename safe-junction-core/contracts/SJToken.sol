pragma solidity ^0.8.18;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SJToken is ERC20 {
    constructor(string memory name_, string memory symbol_) ERC20(name_, symbol_) {}

    // function callable only by SJDispatcher
    function mint(address receiver, uint256 amount) external {
        _mint(receiver, amount);
    }
}
