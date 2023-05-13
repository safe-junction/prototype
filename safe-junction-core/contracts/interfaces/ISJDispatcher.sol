pragma solidity ^0.8.18;

interface ISJDispatcher {
    function dispatch(address to, uint256 chainId, bytes calldata data) external;

    function setSjReceiver(address sjReceiver_) external;
}
