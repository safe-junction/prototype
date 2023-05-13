pragma solidity ^0.8.18;

interface IGovernance {
    function addSourceAdapter(address adapter) external;

    function addDestinationAdapter(address adapter) external;

    function sourceAdapters() external returns (address[] memory);

    function destinationAdapters() external returns (address[] memory);
}
