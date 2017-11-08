pragma solidity ^0.4.11;

import './CrowdsaleToken.sol';

contract Procoin is CrowdsaleToken {
  using SafeMath for uint256;

  string public constant name = "Procoin";
  string public constant symbol = "PRO";

  event TokenPurchase(address indexed purchaser, uint256 amountWei, uint256 amountOut);

  function createSubtoken() returns (address token) {
      CrowdsaleToken newToken = new CrowdsaleToken(now + 60 minutes, 1000000 ether, msg.sender);
      return newToken;
  }
}
