pragma solidity ^0.8.18;

interface ISJDispatcher {
    function dispatch(
        uint256 chainId,
        bytes calldata data,
        address sourceToken,
        string memory sourceTokenSymbol
    ) external;

    function setSjReceiver(address sjReceiver_) external;
}
