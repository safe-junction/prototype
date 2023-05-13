const { ethers } = require('hardhat')

const YARU = '0xfd4194F7715d8C49775beEa34ecc63d11297C746'
const DISPATCHER = '0xaE12358d0747004CF06AA2B82AC15f07956763a4'

// polygon
const main = async () => {
  const SJReceiver = await ethers.getContractFactory('SJReceiver')
  const sjReceiver = await SJReceiver.deploy(YARU, DISPATCHER)
  console.log('SJReceiver deployed at:', sjReceiver.address)
  // 0x29854b82a1a8E7857131aa934Cff93144f399228
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
