pragma solidity ^0.8.18;

interface ISJDispatcher {
    function dispatch(
        uint256 chainId,
        address sourceToken,
        string memory sourceTokenSymbol,
        uint256 sourceTokenAmount,
        address recipient
    ) external;

    function setSjReceiver(address sjReceiver_) external;
}
