pragma solidity ^0.8.18;

import {IYaho} from "./interfaces/hashi/IYaho.sol";
import {Message} from "./interfaces/hashi/IMessage.sol";
import {IGovernance} from "./interfaces/IGovernance.sol";
import {ISJToken} from "./interfaces/ISJToken.sol";

error NotYaru();
error NotSJDispatcher();
error CallFailed();
error AlreadyProcessed();

contract SJReceiver {
    address public immutable yaru;
    address public immutable sjDispatcher;

    mapping(bytes32 => address) fastlaneExecutor;
    mapping(bytes32 => bool) alreadyExecuted;

    event AdvanceMessageProcessed(
        bytes32 messageId,
        address sourceToken,
        string sourceTokenSymbol,
        uint256 sourceTokenAmount,
        address recipient,
        address sender
    );

    event MessageProcessed(
        bytes32 messageId,
        address sourceToken,
        string sourceTokenSymbol,
        uint256 sourceTokenAmount,
        address recipient
    );

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

    function advanceMessage(
        bytes32 messageId,
        address sourceToken,
        string calldata sourceTokenSymbol,
        uint256 sourceTokenAmount,
        address recipient
    ) external {
        bytes32 msgHash = keccak256(abi.encodePacked(messageId, sourceToken, sourceTokenSymbol, recipient));
        if ((fastlaneExecutor[msgHash] != address(0x0)) || (alreadyExecuted[msgHash])) revert AlreadyProcessed();

        // address sjToken = create2Derivation(sourceChainId, sourceToken, sourceTokenSymbol);
        address sjToken = 0x05cac046134f9BdeCF9C35704118F5B98d967B2a;

        uint256 bpsFee = 10; //FIXME
        ISJToken(sjToken).transferFrom(msg.sender, recipient, (sourceTokenAmount * (10000 - bpsFee)) / 10000);

        fastlaneExecutor[msgHash] = msg.sender;

        emit AdvanceMessageProcessed(messageId, sourceToken, sourceTokenSymbol, sourceTokenAmount, recipient, msg.sender);
    }

    function onMessage(
        bytes32 messageId,
        uint256 sourceChainId,
        address sender,
        address sourceToken,
        string calldata sourceTokenSymbol,
        uint256 sourceTokenAmount,
        address recipient
    ) external onlyYaru {
        if (sender != sjDispatcher) {
            revert NotSJDispatcher();
        }

        bytes32 msgHash = keccak256(abi.encodePacked(messageId, sourceToken, sourceTokenSymbol, recipient));
        address executor = fastlaneExecutor[msgHash];
        if (executor != address(0x0)) {
            // this was advanced by a MM via the Fast Lane, finalizing...
            recipient = executor;
            delete fastlaneExecutor[msgHash];
        }

        // FIXME: this is just a naive router implementation. Real one should be based on sourceToken and sourceSymbol
        // Moreover instead of calling directly the token (receiver in this case) we should use a Router contract
        // which will have the permission to mint the sjTokens
        // address sjToken = create2Derivation(sourceChainId, sourceToken, sourceTokenSymbol);
        address sjToken = 0x05cac046134f9BdeCF9C35704118F5B98d967B2a;

        ISJToken(sjToken).mint(recipient, sourceTokenAmount);

        alreadyExecuted[msgHash] = true;

        emit MessageProcessed(messageId, sourceToken, sourceTokenSymbol, sourceTokenAmount, recipient); 
    }
}
