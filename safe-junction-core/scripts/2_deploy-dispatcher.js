const { ethers } = require('hardhat')

const YAHO = '0xA0E8D25D338b614FF8bA591AbB190F4Dee20A7Ff'
const GOVERNANCE = '0x979B0fA15Af5784107d1c944aB4CDa125c437433'

const main = async () => {
  const SJDispatcher = await ethers.getContractFactory('SJDispatcher')
  const sjDispatcher = await SJDispatcher.deploy(YAHO, GOVERNANCE)
  console.log('SJDispatcher deployed at:', sjDispatcher.address)
  // 0x8D1B2a1DD4Fee44741d08f3839419390892A6438
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
