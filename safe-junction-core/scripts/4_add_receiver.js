const { ethers } = require('hardhat')

const DISPATCHER = '0xE278df8AD7589d9f6329D70E07958CD2c93090a1'
const RECEIVER = '0xC6870E36dC1b0b835fDDe33bC080156EeD9F2e0C'

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
