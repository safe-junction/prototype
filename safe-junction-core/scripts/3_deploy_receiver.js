const { ethers } = require('hardhat')

const YARU = '0xfd4194F7715d8C49775beEa34ecc63d11297C746'
const DISPATCHER = '0xc02a29297F7C125CF73FaE770A0887C8E186C0A6'

// polygon
const main = async () => {
  const SJReceiver = await ethers.getContractFactory('SJReceiver')
  const sjReceiver = await SJReceiver.deploy(YARU, DISPATCHER)
  console.log('SJReceiver deployed at:', sjReceiver.address)
  // 0x00f489a375df054070E817eE2E435ac4bFb48485
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
