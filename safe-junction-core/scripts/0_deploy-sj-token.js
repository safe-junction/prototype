const { ethers } = require('hardhat')

// polygon
const main = async () => {
  const SJToken = await ethers.getContractFactory('SJToken')
  const sjToken = await SJToken.deploy('SJ Dai', '*DAI')
  console.log('SJToken deeployed at', sjToken.address)
  // 0x6DF4c6FF00dAD4Dd029be658E30422c0694e695d
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
