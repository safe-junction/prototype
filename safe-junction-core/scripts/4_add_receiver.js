const { ethers } = require('hardhat')

const DISPATCHER = '0x9F79E6c35b78a353cB57aACD226cc08f19a69cDA'
const RECEIVER = '0xA1aC899a0e4736948ea79fD4556405A1D94EAa92'

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
