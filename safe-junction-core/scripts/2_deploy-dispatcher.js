const { ethers } = require('hardhat')

const YAHO = '0xA0E8D25D338b614FF8bA591AbB190F4Dee20A7Ff'
const GOVERNANCE = '0x329Cbe2a5548602a4Ba5801a306349D10d47D550'

const main = async () => {
  const SJDispatcher = await ethers.getContractFactory('SJDispatcher')
  const sjDispatcher = await SJDispatcher.deploy(YAHO, GOVERNANCE)
  console.log('SJDispatcher deployed at:', sjDispatcher.address)
  // 0xfdD33F06124214C3f645Dc46fe40634484E8Ff92
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
