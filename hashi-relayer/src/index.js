require('dotenv').config()
const { ethers } = require('ethers')
const fs = require('fs')
const BigNumber = require('bignumber.js')

const YaruAbi = require('./utils/YaruAbi.json')
const YahoAbi = require('./utils/YahoAbi.json')
const Cache = require('../cache.json')

const main = async () => {
  const sourceProvider = new ethers.providers.JsonRpcProvider(process.env.SOURCE_NODE)
  const destinationProvider = new ethers.providers.JsonRpcProvider(process.env.DESTINATION_NODE)
  const signer = new ethers.Wallet(process.env.PK, destinationProvider)

  const yaho = new ethers.Contract(process.env.YAHO_ADDRESS, YahoAbi, sourceProvider)
  const yaru = new ethers.Contract(process.env.YARU_ADDRESS, YaruAbi, signer)

  const events = await yaho.queryFilter(yaho.filters.MessageDispatched())

  for (const { transactionHash, logIndex, ...event } of events) {
    const key = transactionHash + '-' + logIndex
    if (Cache[key]) continue

    console.log('Processing', key, '...')
    const { to, toChainId, data, messageId, from } = event.decode(event.data, event.topics)

    const tx = await yaru.executeMessages(
      [[to, toChainId, data]],
      [BigNumber(messageId).toNumber()],
      [from],
      ['0x51AeceC718e98FdFc3a3c03D1Ab41bc842147DC3'], // NOTE: hardcoding (for simplicity) the adapters since they are not present in the event above
      {
        gasPrice: 280e9,
        gasLimit: 700000
      }
    )
    await tx.wait(1)

    Cache[transactionHash + '-' + logIndex] = true
  }

  fs.writeFileSync('cache.json', JSON.stringify(Cache))
}

main()
