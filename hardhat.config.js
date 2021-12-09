require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

const { MAIN_API_URL, ACCT_PRIVATE_KEY, KOVAN_API_URL, KOVAN_PRIVATE_KEY, API_KEY, RINKEBY_API_URL, RINKEBY_PRIVATE_KEY } = process.env;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.8",
  defaultNetwork: "rinkeby",
  networks: {
    hardhat: {},
    rinkeby: {
      url: `${RINKEBY_API_URL}`,
      accounts: [`0x${RINKEBY_PRIVATE_KEY}`]
    },
    kovan: {
      url: `${KOVAN_API_URL}`,
      accounts: [`0x${KOVAN_PRIVATE_KEY}`]
    },
    main: {
      url: `${MAIN_API_URL}`,
      accounts: [`0x${ACCT_PRIVATE_KEY}`]
    }

  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  etherscan: {
    apiKey: `${API_KEY}`
  }
};
