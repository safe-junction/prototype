const { ethers } = require('hardhat')

const WDAI = '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d'
const SJ_ERC20_VAULT = '0x1E7e27Cb326D54961A65be2276f232b30F2EB428'
const USER = '0xD7Ea6f8Bc70CaFfA68b08E60a7B116DBC93Ff395'
const SJ_TOKEN = '0x79250c9d3aE65b9fD0CB8be2e67a27a86dB32FF4'

const main = async () => {
  const ERC20 = await ethers.getContractFactory('ERC20')
  const SJERC20Vault = await ethers.getContractFactory('SJERC20Vault')

  const wdai = await ERC20.attach(WDAI)
  const sjErc20Vault = await SJERC20Vault.attach(SJ_ERC20_VAULT)

  let tx
  const amount = '1'

  console.log('Approving ...')
  tx = await wdai.approve(SJ_ERC20_VAULT, amount)
  await tx.wait(1)

  console.log('Wrapping ...')
  tx = await sjErc20Vault.wrap(WDAI, amount, USER, 137, SJ_TOKEN)
  await tx.wait(1)

  //console.log("sjErc20Vault.sjDispatcher", (await sjErc20Vault.sjDispatcher()))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
