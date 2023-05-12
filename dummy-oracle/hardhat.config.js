require('dotenv').config()
require('@nomiclabs/hardhat-ethers')
require('@nomiclabs/hardhat-etherscan')
require('hardhat-gas-reporter')
require('@nomicfoundation/hardhat-chai-matchers')
//require('hardhat-spdx-license-identifier')
require('hardhat-log-remover')
require('solidity-coverage')
require('@nomicfoundation/hardhat-toolbox')

const getEnvironmentVariable = (_envVar) => process.env[_envVar] || ''

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: '0.8.18',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    hardhat: {},
    gnosis: {
      url: getEnvironmentVariable('GNOSIS_NODE'),
      accounts: [getEnvironmentVariable('PK')],
      gasPrice: 5e9
    }
  },
  gasReporter: {
    enabled: true
  },
  spdxLicenseIdentifier: {
    overwrite: false,
    runOnCompile: false
  },
  mocha: {
    timeout: 100000000
  }
}
