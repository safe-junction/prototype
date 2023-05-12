pragma solidity ^0.8.18;

contract DummyOracle {
    event NewRequest(bytes request, uint256 chainId);

    function processRequest(bytes calldata request, uint256 chainId) external {
        emit NewRequest(request, chainId);
    }
}
