const { ethers } = require('hardhat')

const DISPATCHER = '0xaE12358d0747004CF06AA2B82AC15f07956763a4'
const RECEIVER = '0x29854b82a1a8E7857131aa934Cff93144f399228'

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
