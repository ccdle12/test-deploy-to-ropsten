pragma solidity ^0.4.18;

contract ERC20Interface {
    
    //Get the total Supply
    function totalSupply() public constant returns (uint256);
    
    //Get the account balance according to address
    function balanceOf(address _owner) public constant returns (uint256 balance);
    
    //Send value amount of tokens to address _to
    function transfer(address _to, uint256 _value) public returns (bool success);
    
    //Send value from an explicit address to another address _to
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success);
    
    // Returns the amount which _spender is entitled to withdraw from an _owners account
    function allowance(address _owner, address _spender) public constant returns (uint256 remaining);
    
    //Event emitted when tokens are trasnferred
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    
    //Event emitted when approve function is called
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
}