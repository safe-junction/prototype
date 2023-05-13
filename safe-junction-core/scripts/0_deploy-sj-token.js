const { ethers } = require('hardhat')

// polygon
const main = async () => {
  const SJToken = await ethers.getContractFactory('SJToken')
  const sjToken = await SJToken.deploy('SJ Dai', '*DAI')
  console.log('SJToken deeployed at', sjToken.address)
  // 0x05cac046134f9BdeCF9C35704118F5B98d967B2a
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
