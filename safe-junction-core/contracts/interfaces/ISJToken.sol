pragma solidity ^0.8.18;

interface ISJToken {
    function mint(uint256 amount, address recipient) external;

    function transferFrom(address sender, address recipient, uint256 amount) external;
}
