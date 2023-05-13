const { ethers } = require('hardhat')

const SJ_RECEIVER = '0x927D22Bd5BDeAa3752312A31Bd3ab1d29ffEaDd4'

// polygon
const main = async () => {
  const SJToken = await ethers.getContractFactory('SJToken')
  const sjToken = await SJToken.deploy('SJ Dai', '*DAI', SJ_RECEIVER)
  console.log('SJToken deeployed at', sjToken.address)
  // 0x0b81F2546A277b279358B08Ec43dDF7Fc178265A
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
