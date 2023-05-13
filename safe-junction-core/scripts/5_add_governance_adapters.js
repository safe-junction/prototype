const { ethers } = require('hardhat')

const GOVERNANCE = '0x2170f277747946B91361f92035eaF8cFa0D5690D'
const SOURCE_ADAPTER = '0x5528EcB4C7a3870aF6808646163C551Ea3F3B751' // gnosis
const DESTINATION_ADAPTER = '0x51AeceC718e98FdFc3a3c03D1Ab41bc842147DC3' // polygon

const main = async () => {
  const Governance = await ethers.getContractFactory('Governance')
  const governance = await Governance.attach(GOVERNANCE)

  console.log('Setting adapters ..')
  let tx = await governance.addSourceAdapter(SOURCE_ADAPTER)
  await tx.wait(1)
  tx = await governance.addDestinationAdapter(DESTINATION_ADAPTER)
  await tx.wait(1)
  console.log('Adapters set!')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
