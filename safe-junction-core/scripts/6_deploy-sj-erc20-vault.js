const { ethers } = require('hardhat')

const DISPATCHER = '0x9F79E6c35b78a353cB57aACD226cc08f19a69cDA' // gnosis

const main = async () => {
  const SJERC20Vault = await ethers.getContractFactory('SJERC20Vault')
  const sjErc20Vault = await SJERC20Vault.deploy(DISPATCHER)
  console.log('SJERC20Vault deeployed at', sjErc20Vault.address)
  // 0x1E7e27Cb326D54961A65be2276f232b30F2EB428
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
