const { ethers } = require('hardhat')

const main = async () => {
  const Governance = await ethers.getContractFactory('Governance')
  const governance = await Governance.deploy()
  console.log('Governance deployed at:', governance.address)
  // 0x979B0fA15Af5784107d1c944aB4CDa125c437433
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
