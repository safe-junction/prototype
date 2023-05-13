const { ethers } = require('hardhat')

// polygon
const main = async () => {
  const SJToken = await ethers.getContractFactory('SJToken')
  const sjToken = await SJToken.deploy('SJ Dai', '*DAI')
  console.log('SJToken deeployed at', sjToken.address)
  // 0x1C2596CfFeaFd1edcC6aD14754E0324C89154d71
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
