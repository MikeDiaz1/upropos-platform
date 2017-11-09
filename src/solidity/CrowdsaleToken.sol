pragma solidity ^0.4.11;

import './BasicToken.sol';

contract CrowdsaleToken is BasicToken {
  using SafeMath for uint256;

  uint8 public constant decimals = 18;
  uint256 public rate;
  uint256 public startTime;
  uint256 public endTime;
  uint256 public weiRaised;
  uint256 public amountSold;

  event TokenPurchase(address indexed purchaser, uint256 amountWei, uint256 amountOut);

  //Can add startTime parameter if useful
  function CrowdsaleToken(uint256 _endTime, uint256 initialSupply, address _owner) {
      require(now < _endTime);
      startTime = now;
      endTime = _endTime;
      owner = _owner;
      _totalSupply = initialSupply;
      balances[owner] = initialSupply;
  }

  function () payable {
    buy();
  }

  function buy() payable {
    uint256 recieveAmount = validate(msg.sender);
    //Validated...
    amountSold = amountSold.add(recieveAmount);
    weiRaised = weiRaised.add(msg.value);
    //Accounted For...
    balances[owner] = balances[owner].sub(recieveAmount);
    balances[msg.sender] = balances[msg.sender].add(recieveAmount);
    owner.transfer(msg.value);
    //Finalized
    TokenPurchase(msg.sender, msg.value, recieveAmount);
  }

  function validate(address buyer) internal constant returns (uint256) {
    uint256 recieveAmount = msg.value.mul(rate);
    bool validAddress = buyer != 0x0;
    bool nonZeroPurchase = msg.value != 0;
    bool duringCrowdsale = now <= endTime;
    bool underHardCap = amountSold.add(recieveAmount) <= _totalSupply;
    bool haveTokens = balances[owner] >= recieveAmount;
    require(duringCrowdsale && nonZeroPurchase && validAddress && underHardCap && haveTokens);
    return recieveAmount;
  }
}
