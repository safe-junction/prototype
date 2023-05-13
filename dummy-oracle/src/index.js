require('dotenv').config()
const { ethers } = require('ethers')
const fs = require('fs')
const BigNumber = require('bignumber.js')

const DummyOracleAbi = require('./utils/DummyOracleAbi.json')
const DummyAdapterAbi = require('./utils/DummyAdapterAbi.json')
const YahoAbi = require('./utils/YahoAbi.json')
const Cache = require('../cache.json')

const main = async () => {
  const sourceProvider = new ethers.providers.JsonRpcProvider(process.env.SOURCE_NODE)
  const destinationProvider = new ethers.providers.JsonRpcProvider(process.env.DESTINATION_NODE)

  const signer = new ethers.Wallet(process.env.PK, destinationProvider)
  const { chainId: sourceChainId } = await sourceProvider.getNetwork()

  const dummyOracle = new ethers.Contract(process.env.DUMMY_ORACLE_ADDRESS, DummyOracleAbi, sourceProvider)
  const yaho = new ethers.Contract(process.env.YAHO_ADDRESS, YahoAbi, sourceProvider)

  const events = await dummyOracle.queryFilter(dummyOracle.filters.NewRequest())
  /*events.forEach(({ transactionHash, logIndex }) => {
    Cache[transactionHash + '-' + logIndex] = true
  })*/

  for (const { transactionHash, logIndex, ...event } of events) {
    const key = transactionHash + '-' + logIndex
    if (Cache[key]) continue

    console.log('Processing', key, '...')
    const { request } = event.decode(event.data, event.topics)

    const messageId = BigNumber(request.slice(0, request.length - 40)).toNumber()
    const adapterAddress = '0x' + request.slice(request.length - 40, request.length)
    const messageHash = await yaho.hashes(messageId)
    console.log(messageId, messageHash)

    const adapter = new ethers.Contract(adapterAddress, DummyAdapterAbi, signer)

    console.log('Storing the message ...')
    await adapter.storeMessage(sourceChainId, messageId, messageHash)

    // Cache[transactionHash + '-' + logIndex] = true
  }

  fs.writeFileSync('cache.json', JSON.stringify(Cache))
}

main()
