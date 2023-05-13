const { ethers } = require('hardhat')

const YARU = '0x8D860837dF520923d28Bf4Cf0A559a3d5C28901e'
const DISPATCHER = '0xE29C46eFE782fD348420DBF081e5182c1198a901'

const main = async () => {
  const SJReceiver = await ethers.getContractFactory('SJReceiver')
  const sjReceiver = await SJReceiver.deploy(YARU, DISPATCHER)
  console.log('SJReceiver deployed at:', sjReceiver.address)
  // 0x7D35bb6677E950d9d4929eb88d3D49c6fb09E342
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
