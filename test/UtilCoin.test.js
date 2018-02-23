const UtilCoin = artifacts.require("UtilCoin.sol")

const BigNumber = web3.BigNumber;

const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();



contract('UtilCoin', function(accounts) {
  
  const ERROR_MSG = 'VM Exception while processing transaction: revert';
  const deploying_account = accounts[0];
  const account1 = accounts[1];
  const account2 = accounts[2];
  const account3 = accounts[3];
  const account4 = accounts[4];

  beforeEach(async () => {
    this.utilCoin = await UtilCoin.deployed({from: deploying_account});
  }); 


  it('should exist', async() => {
      await this.utilCoin.should.exist;
  });

  it('should return the totalSupply: 1000000', async() => {
    const supply = await this.utilCoin.totalSupply();
    supply.toNumber().should.equal(1.e24)
  });

  it('should return the balance of owner: 1000000', async() => {
    const balance = await this.utilCoin.balanceOf(deploying_account);
    balance.toNumber().should.equal(1.e24)
  });

  it('should return balance of account1: 0', async() => {
    const balance = await this.utilCoin.balanceOf(account1);
    balance.toNumber().should.equal(0)
  });

  it('should transfer 100 tokens from deploying_account to account1', async() => {
    await this.utilCoin.transfer(account1, 100, {from: deploying_account});
    const balanceOfAccount1 = await this.utilCoin.balanceOf(account1);

    balanceOfAccount1.toNumber().should.equal(100);
  });

  it('should show 100 tokens less in the deploying account', async() => {
    const balance = await this.utilCoin.balanceOf(deploying_account);
    const totalSupply = await this.utilCoin.totalSupply();

    balance.toNumber().should.equal(totalSupply.toNumber() - 100);
  });

  it('should set approval of 10 tokens from account1 to account2', async() => {
    await this.utilCoin.approval(account2, 10, {from:account1});
    const allowance = await this.utilCoin.allowance(account1, account2);

    allowance.toNumber().should.equal(10);
  });

  it('should transfer tokens, using an allowance from account2 to account3, transferring 10 tokens', async() => {
    await this.utilCoin.transferFrom(account1, account3, 10, {from:account2});
    const allowance = await this.utilCoin.allowance(account1, account2);

    allowance.toNumber().should.equal(0);

    const balanceOfAccount3 = await this.utilCoin.balanceOf(account3);
    balanceOfAccount3.toNumber().should.equal(10);
  });

  it('should fail, throw a require(), since accounts2 cannot transfer anymore tokens from allowance', async() => {
    await this.utilCoin.transferFrom(account1, account3, 10, {from:account2}).should.be.rejectedWith(ERROR_MSG);
  });

  it('should fail, since accounts cannot transfer negative amounts', async() => {
    await this.utilCoin.transfer(account1, -10, {from:deploying_account}).should.be.rejectedWith(ERROR_MSG);
  });

  it('should transfer to 18 decimal place', async() => {
    await this.utilCoin.transfer(account2, 1.00000000000000000100000, {from:deploying_account});
  
    const balanceOfAccount2 = await this.utilCoin.balanceOf(account2);
    balanceOfAccount2.toNumber().should.equal(1.00000000000000000100000);
  });

  it('should show a balance greater then 0 Eth', async() => {
    const ethBalance = await web3.eth.getBalance(account4);
  
    web3.fromWei(ethBalance).toNumber().should.be.at.least(90.98231508365029)
  });

  it('should convert 1 eth to wei', async() => {
    one_wei = web3.toWei(1);

    web3.toBigNumber(one_wei).toNumber().should.equal(1.e+18);
  });

  it('should allocate 0.02 token to account', async() => {
    await this.utilCoin.sendTransaction({from:account4, value: web3.toWei(0.001)});
    
    const balanceOfAccount4 = await this.utilCoin.balanceOf(account4);
    web3.fromWei(balanceOfAccount4).toNumber().should.equal(0.02);
  });

  it('should allocate 100 tokens to account', async() => {
    await this.utilCoin.sendTransaction({from:account1, value: web3.toWei(5)});
    
    const balanceOfAccount1 = await this.utilCoin.balanceOf(account1);
    web3.fromWei(balanceOfAccount1).toNumber().should.equal(100);
  });

  it('should revert with an error messsage, as trying to send 0 eth', async() => {
    await this.utilCoin.sendTransaction({from:account1, value: web3.toWei(0)}).should.be.rejectedWith(ERROR_MSG);
  });

  it('should allocate to 20 tokens per 1 Eth', async() => {
    await this.utilCoin.sendTransaction({from:account2, value: web3.toWei(1)});
  
    const balanceOfAccount2 = await this.utilCoin.balanceOf(account2);
    web3.fromWei(balanceOfAccount2).toNumber().should.equal(20);
  });

  it('should be able to handle decimal places below 1 Ether', async() => {
    await this.utilCoin.sendTransaction({from:account3, value: web3.toWei(0.5)});
  
    const balanceOfAccount3 = await this.utilCoin.balanceOf(account3);
    web3.fromWei(balanceOfAccount3).toNumber().should.equal(10);
  });

  it('should be able to send 0.022347', async() => {
    await this.utilCoin.sendTransaction({from:account3, value: web3.toWei(0.022347)});
  
    const balanceOfAccount3 = await this.utilCoin.balanceOf(account3);
    web3.fromWei(balanceOfAccount3).toNumber().should.equal(10.44694);
  });

  it('should reduce the tokens owned by the owner of the contract by at least 140', async() => {
    const balanceOfOwner = await this.utilCoin.balanceOf(deploying_account);
    const totalSupply = await this.utilCoin.totalSupply();

    balanceInEth = web3.fromWei(balanceOfOwner).toNumber();
    totalSupplyInEth = web3.fromWei(totalSupply).toNumber();
    totalSupplyInEth = web3.toBigNumber(totalSupplyInEth).toNumber();

    web3.toBigNumber(balanceInEth).toNumber().should.be.at.least(totalSupplyInEth - 140);
  });

  
});
