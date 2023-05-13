const { ethers } = require('hardhat')

const DISPATCHER = '0xE278df8AD7589d9f6329D70E07958CD2c93090a1' // gnosis

const main = async () => {
  const SJERC20Vault = await ethers.getContractFactory('SJERC20Vault')
  const sjErc20Vault = await SJERC20Vault.deploy(DISPATCHER)
  console.log('SJERC20Vault deployed at', sjErc20Vault.address)
  // 0xC7c9A6572024eB7b191070D78bb5F5FCa7eA4458
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
