const { ethers } = require('hardhat')

const DISPATCHER = '0x8D1B2a1DD4Fee44741d08f3839419390892A6438' // gnosis

const main = async () => {
  const SJERC20Vault = await ethers.getContractFactory('SJERC20Vault')
  const sjErc20Vault = await SJERC20Vault.deploy(DISPATCHER)
  console.log('SJERC20Vault deployed at', sjErc20Vault.address)
  // 0x4EacA60eB19C0A32d8Bd9E6AE8Bded374611eBb6
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
