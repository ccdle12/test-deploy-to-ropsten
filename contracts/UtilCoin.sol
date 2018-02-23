pragma solidity ^0.4.18;

contract UtilCoin {
    string public constant symbol = "UTL";
    string public constant name = "Utility Coin";
    int public constant decimal = 18;
    uint _totalSupply;
    
    // Owner of this contract
    address public owner;
    
    // Balance for each account
    mapping(address => uint256) balances;
    
    // Owner of account approves the transfer of an amount to another account
    mapping(address => mapping(address => uint256)) allowed;
    
    // Constructor
    function UtilCoin() public {
        owner = msg.sender;
        _totalSupply = 1000000 * 10**uint(decimal);
        balances[owner] = _totalSupply;
    }
    

    /**
     * ERC20Interface Functions 
     */
    
    //Get the total Supply
    function totalSupply() public constant returns (uint) {
        return _totalSupply;
    }
    
    //Get the account balance according to address
    function balanceOf(address _owner) public constant returns (uint256 balance) {
        return balances[_owner];
    }
    
    //Send value amount of tokens to address _to
    function transfer(address _to, uint256 _value) public returns (bool success) {
        
        //Checks
        require(balances[msg.sender] >= _value);
        require(_value > 0.000000000000000000);
        
        // Overflow check, if we add more to the current balance of '_to'
        require(balances[_to] + _value > balances[_to]);
        
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        
        Transfer(msg.sender, _to, _value);
        
        return true;
    }
    function internalTransfer(address _to, uint256 _value) private returns (bool success) {
        require(balances[owner] >= _value);
        require(_value > 0);
        require(balances[_to] + _value > balances[_to]);
       
        balances[owner] -= _value;
        balances[_to] += _value;

        Transfer(owner, _to, _value);

        return true;
    }
    
    //Send value from an explicit address to another address _to
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        
        //Checks 
        require(balances[_from] >= _value);
        require(allowed[_from][msg.sender] >= _value);
        require(_value > 0);
        
        //Overflow check
        require(balances[_to] + _value > balances[_to]);
        
        balances[_from] -= _value;
        allowed[_from][msg.sender] -= _value;
        balances[_to] += _value;
        Transfer(_from, _to, _value);
        
        return true;
    }
    
    // Allows _spender to withdraw from your account, on your behalf up to an amount allowed
    function approval(address _spender, uint256 _amount) public returns (bool success) {
        allowed[msg.sender][_spender] = _amount;
        Approval(msg.sender, _spender, _amount);
        
        return true;
    }
    
    // Returns the amount which _spender is entitled to withdraw from an _owners account
    function allowance(address _owner, address _spender) public constant returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }

    function() payable {
        require(msg.value > 0);

        internalTransfer(msg.sender, msg.value * 20);
    }

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
}