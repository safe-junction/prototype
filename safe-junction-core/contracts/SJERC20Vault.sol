pragma solidity ^0.8.18;

import {IERC20Metadata} from "@openzeppelin/contracts/interfaces/IERC20Metadata.sol";
import {ISJDispatcher} from "./interfaces/ISJDispatcher.sol";

contract SJERC20Vault {
    address public immutable sjDispatcher;

    constructor(address sjDispatcher_) {
        sjDispatcher = sjDispatcher_;
    }

    function wrap(address sourceToken, uint256 amount, address receiver, uint256 destinationChainId) external {
        // NOTE: destinationToken should calculated differently since at the moment it's possible to mint any dest token with any source token
        IERC20Metadata(sourceToken).transferFrom(msg.sender, address(this), amount);
        bytes memory data = abi.encodeWithSignature("mint(address,uint256)", receiver, amount);
        ISJDispatcher(sjDispatcher).dispatch(
            destinationChainId,
            data,
            sourceToken,
            IERC20Metadata(sourceToken).symbol()
        );
    }
}
