const { ethers } = require('hardhat')

const YARU = '0xfd4194F7715d8C49775beEa34ecc63d11297C746'
const DISPATCHER = '0x8D1B2a1DD4Fee44741d08f3839419390892A6438'

// polygon
const main = async () => {
  const SJReceiver = await ethers.getContractFactory('SJReceiver')
  const sjReceiver = await SJReceiver.deploy(YARU, DISPATCHER)
  console.log('SJReceiver deployed at:', sjReceiver.address)
  // 0x4b637F7F59486fFE2e5e667cf5c797db716Fa5cb
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
