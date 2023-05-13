const { ethers } = require('hardhat')

const YARU = '0x8D860837dF520923d28Bf4Cf0A559a3d5C28901e'
const DISPATCHER = '0xfdD33F06124214C3f645Dc46fe40634484E8Ff92'

// polygon
const main = async () => {
  const SJReceiver = await ethers.getContractFactory('SJReceiver')
  const sjReceiver = await SJReceiver.deploy(YARU, DISPATCHER)
  console.log('SJReceiver deployed at:', sjReceiver.address)
  // 0xA1aC899a0e4736948ea79fD4556405A1D94EAa92
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
