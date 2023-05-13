const { ethers } = require('hardhat')

const DISPATCHER = '0xaE12358d0747004CF06AA2B82AC15f07956763a4' // gnosis

const main = async () => {
  const SJERC20Vault = await ethers.getContractFactory('SJERC20Vault')
  const sjErc20Vault = await SJERC20Vault.deploy(DISPATCHER)
  console.log('SJERC20Vault deployed at', sjErc20Vault.address)
  // 0x5bf5c69810d56641a3CbdC494098cBEC647a6a8F
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
