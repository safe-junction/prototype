const { ethers } = require('hardhat')

const YARU = '0x8D860837dF520923d28Bf4Cf0A559a3d5C28901e'
const DISPATCHER = '0x344b219599D8635c6f477a885b0464e91E3e3F64'

// polygon
const main = async () => {
  const SJReceiver = await ethers.getContractFactory('SJReceiver')
  const sjReceiver = await SJReceiver.deploy(YARU, DISPATCHER)
  console.log('SJReceiver deployed at:', sjReceiver.address)
  // 0x927D22Bd5BDeAa3752312A31Bd3ab1d29ffEaDd4
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
