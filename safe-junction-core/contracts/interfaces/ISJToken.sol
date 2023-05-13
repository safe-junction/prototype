pragma solidity ^0.8.18;

interface ISJToken{
    function mint(address recipient, uint256 amount) external;

    function transferFrom(address sender, address recipient, uint256 amount) external;
}
