pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PaymentProcessor {
    address public admin;
    IERC20 public dai;

    event PaymentDone(
        address payer,
        uint256 amount,
        uint256 paymentId,
        uint256 date
    );

    constructor(address _admin, address _dai) public {
        admin = _admin;
        dai = IERC20(_dai);
    }

    function pay(uint256 _amount, uint256 _paymentid) external {
        dai.transferFrom(msg.sender, admin, _amount);
        emit PaymentDone(msg.sender, _amount, _paymentid, block.timestamp);
    }
}
