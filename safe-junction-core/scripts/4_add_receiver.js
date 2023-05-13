const { ethers } = require('hardhat')

const DISPATCHER = '0xE29C46eFE782fD348420DBF081e5182c1198a901'
const RECEIVER = '0x7D35bb6677E950d9d4929eb88d3D49c6fb09E342'

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
