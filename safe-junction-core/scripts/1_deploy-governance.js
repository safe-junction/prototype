const { ethers } = require('hardhat')

const main = async () => {
  const Governance = await ethers.getContractFactory('Governance')
  const governance = await Governance.deploy()
  console.log('Governance deployed at:', governance.address)
  // 0x2170f277747946B91361f92035eaF8cFa0D5690D
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
