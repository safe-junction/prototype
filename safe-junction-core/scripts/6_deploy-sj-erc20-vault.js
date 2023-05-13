const { ethers } = require('hardhat')

const DISPATCHER = '0xc02a29297F7C125CF73FaE770A0887C8E186C0A6' // gnosis

const main = async () => {
  const SJERC20Vault = await ethers.getContractFactory('SJERC20Vault')
  const sjErc20Vault = await SJERC20Vault.deploy(DISPATCHER)
  console.log('SJERC20Vault deployed at', sjErc20Vault.address)
  // 0xdCa441457Efcbf6C22FC911Dd723B9415D25e07a
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
