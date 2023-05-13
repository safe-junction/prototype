const { ethers } = require('hardhat')

const DISPATCHER = '0x344b219599D8635c6f477a885b0464e91E3e3F64' // gnosis

const main = async () => {
  const SJERC20Vault = await ethers.getContractFactory('SJERC20Vault')
  const sjErc20Vault = await SJERC20Vault.deploy(DISPATCHER)
  console.log('SJERC20Vault deployed at', sjErc20Vault.address)
  // 0x75119Cc526c3678CD4314812E5bd338Ac6Cd08eB
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
