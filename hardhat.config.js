require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    matic:{
      url: "https://rpc-mumbai.maticvigil.com/",
      accounts: ["07265bb211e887adb7da587959f8f1508bd648e6f82b64aae85b8435b29f8976"]
    }
  }
};
