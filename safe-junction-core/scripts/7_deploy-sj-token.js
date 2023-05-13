const { ethers } = require('hardhat')

const SJ_RECEIVER = '0xA1aC899a0e4736948ea79fD4556405A1D94EAa92'

// polygon
const main = async () => {
  const SJToken = await ethers.getContractFactory('SJToken')
  const sjToken = await SJToken.deploy('SJ Dai', '*DAI', SJ_RECEIVER)
  console.log('SJToken deeployed at', sjToken.address)
  // 0x48Aa25C6D0474Add6893F2C8AC6B531091D4017a
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
