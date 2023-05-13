const { ethers } = require('hardhat')

const main = async () => {
  const Governance = await ethers.getContractFactory('Governance')
  const governance = await Governance.deploy()
  console.log('Governance deployed at:', governance.address)
  // 0x329Cbe2a5548602a4Ba5801a306349D10d47D550
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
