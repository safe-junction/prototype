pragma solidity ^0.8.18;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IYaho} from "./interfaces/hashi/IYaho.sol";
import {Message} from "./interfaces/hashi/IMessage.sol";
import {IGovernance} from "./interfaces/IGovernance.sol";

contract SJDispatcher is Ownable{
    address public yaho;
    address public governance;
    address public sjReceiver;

    constructor(address yaho_, address governance_) {
        yaho = yaho_;
        governance = governance_;
        
    }

    function dispatch(address to, uint256 chainId, bytes calldata data) external {
        bytes memory sjData = abi.encodeWithSignature("onMessage(bytes)", abi.encodePacked(chainId, address(this), to, data));

        Message[] memory messages = new Message[](1);
        messages[0] = Message(sjReceiver, chainId, sjData);

        IYaho(yaho).dispatchMessagesToAdapters(
            messages,
            IGovernance(governance).sourceAdapters(),
            IGovernance(governance).destinationAdapters()
        );
    }

    function setSjReceiver(address sjReceiver_) external onlyOwner{
        sjReceiver = sjReceiver_;
    }
}
