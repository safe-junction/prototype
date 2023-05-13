const { ethers } = require('hardhat')

const YARU = '0xfd4194F7715d8C49775beEa34ecc63d11297C746'
const DISPATCHER = '0xE278df8AD7589d9f6329D70E07958CD2c93090a1'

// polygon
const main = async () => {
  const SJReceiver = await ethers.getContractFactory('SJReceiver')
  const sjReceiver = await SJReceiver.deploy(YARU, DISPATCHER)
  console.log('SJReceiver deployed at:', sjReceiver.address)
  // 0xC6870E36dC1b0b835fDDe33bC080156EeD9F2e0C
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
