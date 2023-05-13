pragma solidity ^0.8.18;

import {IYaho} from "./interfaces/hashi/IYaho.sol";
import {Message} from "./interfaces/hashi/IMessage.sol";
import {IGovernance} from "./interfaces/IGovernance.sol";

error NotYaru();
error NotSJDispatcher();
error CallFailed();

contract SJReceiver {
    address public immutable yaru;
    address public immutable sjDispatcher;

    modifier onlyYaru() {
        if (msg.sender != yaru) {
            revert NotYaru();
        }

        _;
    }

    constructor(address yaru_, address sjDispatcher_) {
        yaru = yaru_;
        sjDispatcher = sjDispatcher_;
    }

    function onMessage(bytes calldata message) external onlyYaru {
        (uint256 chainId, address sender, address to, bytes memory data) = abi.decode(message, (uint256, address, address, bytes));

        if (sender != sjDispatcher) {
            revert NotSJDispatcher();
        }

        (bool success,) = address(to).call(data);
        if (!success) revert CallFailed();
    }
}
