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

    function onMessage(
        uint256 sourceChainId,
        address sender,
        address sourceToken,
        string calldata sourceTokenSymbol,
        bytes calldata data
    ) external onlyYaru {
        if (sender != sjDispatcher) {
            revert NotSJDispatcher();
        }

        // FIXME: this is just a naive router implementation. Real one should be based on sourceToken and sourceSymbol
        // Moreover instead of calling directly the token (receiver in this case) we should use a Router contract
        // which will have the permission to mint the sjTokens
        address receiver = 0x22401aebBb8Fb4EF022CD0B3ff9638a86E38F949;

        (bool success, ) = address(receiver).call(data);
        if (!success) revert CallFailed();
    }
}
