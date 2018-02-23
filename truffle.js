var HDWalletProvider = require("truffle-hdwallet-provider");

var infura_apikey = "NdbfPGaIiAGO2fm3Lp3x";
var mnemonic = "eyebrow echo noise shift violin deal exit empower cram kiwi notable force";

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
      provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/"+infura_apikey),
      network_id: 3,
      gas: 4712388,
    }	
  }, 
};
