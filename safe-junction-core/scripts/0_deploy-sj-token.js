const { ethers } = require('hardhat')

// polygon
const main = async () => {
  const SJToken = await ethers.getContractFactory('SJToken')
  const sjToken = await SJToken.deploy('SJ Dai', '*DAI')
  console.log('SJToken deeployed at', sjToken.address)
  // 0x65fe55d2238BE2E4029215bb49d5868574956937
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
