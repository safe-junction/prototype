const { ethers } = require('hardhat')

const SJ_RECEIVER = '0x29854b82a1a8E7857131aa934Cff93144f399228'

// polygon
const main = async () => {
  const SJToken = await ethers.getContractFactory('SJToken')
  const sjToken = await SJToken.deploy('SJ Dai', '*DAI', SJ_RECEIVER)
  console.log('SJToken deeployed at', sjToken.address)
  // 0x592E01F0d2E53e3355C65c90C0FDB668B2026C46
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
