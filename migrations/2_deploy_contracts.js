var UtilCoin = artifacts.require("./UtilCoin.sol")

module.exports = function(deployer) {
    deployer.deploy(UtilCoin);
};
