pragma solidity ^0.8.18;

error NotGovernance();

contract Governance {
    address[] public sourceAdapters;
    address[] public destinationAdapters;

    function addSourceAdapter(address adapter) external {
        sourceAdapters.push(adapter);
    }

    function addDestinationAdapter(address adapter) external {
        destinationAdapters.push(adapter);
    }
}
