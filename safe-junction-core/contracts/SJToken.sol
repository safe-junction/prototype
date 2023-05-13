pragma solidity ^0.8.18;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ISJDispatcher} from "./interfaces/ISJDispatcher.sol";

error NotSjReceiver();

contract SJToken is ERC20 {
    address public immutable sjReceiver;

    modifier onlySjReceiver() {
        if (msg.sender != sjReceiver) {
            revert NotSjReceiver();
        }

        _;
    }

    constructor(string memory name_, string memory symbol_, address sjReceiver_) ERC20(name_, symbol_) {
        sjReceiver = sjReceiver_;
    }

    function mint(address receiver, uint256 amount) external onlySjReceiver {
        _mint(receiver, amount);
    }
}
