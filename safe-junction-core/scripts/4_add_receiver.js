const { ethers } = require('hardhat')

const DISPATCHER = '0x344b219599D8635c6f477a885b0464e91E3e3F64'
const RECEIVER = '0x927D22Bd5BDeAa3752312A31Bd3ab1d29ffEaDd4'

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
