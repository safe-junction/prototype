const { ethers } = require('hardhat')

const DISPATCHER = '0x8D1B2a1DD4Fee44741d08f3839419390892A6438'
const RECEIVER = '0x4b637F7F59486fFE2e5e667cf5c797db716Fa5cb'

// gnosis
const main = async () => {
  const SJDispatcher = await ethers.getContractFactory('SJDispatcher')
  const sjDispatcher = await SJDispatcher.attach(DISPATCHER)
  await sjDispatcher.setSjReceiver(RECEIVER)
  console.log('SJReceiver set!')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
