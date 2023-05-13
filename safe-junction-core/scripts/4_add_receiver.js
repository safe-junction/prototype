const { ethers } = require('hardhat')

const DISPATCHER = '0xc02a29297F7C125CF73FaE770A0887C8E186C0A6'
const RECEIVER = '0x00f489a375df054070E817eE2E435ac4bFb48485'

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
