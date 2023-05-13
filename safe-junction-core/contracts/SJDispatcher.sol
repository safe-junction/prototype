pragma solidity ^0.8.18;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IYaho} from "./interfaces/hashi/IYaho.sol";
import {Message} from "./interfaces/hashi/IMessage.sol";
import {IGovernance} from "./interfaces/IGovernance.sol";



contract SJDispatcher is Ownable {
    address public yaho;
    address public governance;
    address public sjReceiver;

    event SJErc20Transfer(bytes32, uint256, address, string, uint256, address);

    constructor(address yaho_, address governance_) {
        yaho = yaho_;
        governance = governance_;
    }

    function dispatch(
        uint256 destinationChainid,
        address sourceToken,
        string memory sourceTokenSymbol,
        uint256 sourceTokenAmount,
        address recipient
    ) external {
        bytes32 messageId = keccak256(abi.encodePacked(blockhash(block.number-1), gasleft()));
        bytes memory sjData = abi.encodeWithSignature(
            "onMessage(bytes32,uint256,address,address,string,uint256,address)",
            messageId,
            block.chainid,
            address(this),
            sourceToken,
            sourceTokenSymbol,
            sourceTokenAmount,
            recipient
        );

        Message[] memory messages = new Message[](1);
        messages[0] = Message(sjReceiver, destinationChainid, sjData);

        address[] memory sadapters = new address[](1);
        sadapters[0] = 0x5528EcB4C7a3870aF6808646163C551Ea3F3B751;

        address[] memory dadapters = new address[](1);
        dadapters[0] = 0x51AeceC718e98FdFc3a3c03D1Ab41bc842147DC3;

        IYaho(yaho).dispatchMessagesToAdapters(
            messages,
            sadapters, //IGovernance(governance).sourceAdapters(),
            dadapters //IGovernance(governance).destinationAdapters()
        );

        emit SJErc20Transfer(messageId, block.chainid, sourceToken, sourceTokenSymbol, sourceTokenAmount, recipient);
    }

    function setSjReceiver(address sjReceiver_) external onlyOwner {
        sjReceiver = sjReceiver_;
    }
}
