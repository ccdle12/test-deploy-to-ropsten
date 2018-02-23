const HDWalletProvider = require("truffle-hdwallet-provider");

const infura_apikey = "NdbfPGaIiAGO2fm3Lp3x";
const mnemonic = "eyebrow echo noise shift violin deal exit empower cram kiwi notable force";

const Web3 = require("web3");
const web3 = new Web3();

module.exports = {
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    },
  },
  networks: {
    development: {
      host: 'localhost',
      port: 9545,
      network_id: "*",
      gas: 4712388,
    },
    ropsten: {
      provider: function() { 
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/"+infura_apikey) 
      },
      network_id: 3,
      gas: 4698712,
      gasPrice: web3.toWei("20", "gwei"),
    }	
  }, 
};
