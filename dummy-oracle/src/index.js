require('dotenv').config()
const { ethers } = require('ethers')
const fs = require('fs')
const BigNumber = require('bignumber.js')

const DummyOracleAbi = require('./utils/DummyOracleAbi.json')
const DummyAdapterAbi = require('./utils/DummyAdapterAbi.json')
const YahoAbi = require('./utils/YahoAbi.json')
const Cache = require('../cache.json')

const sleep = (_ms) => new Promise((_resolve) => setTimeout(() => _resolve(), _ms))

const main = async () => {
  const sourceProvider = new ethers.providers.JsonRpcProvider(process.env.SOURCE_NODE)
  const destinationProvider = new ethers.providers.JsonRpcProvider(process.env.DESTINATION_NODE)

  const signer = new ethers.Wallet(process.env.PK, destinationProvider)
  const { chainId: sourceChainId } = await sourceProvider.getNetwork()

  const dummyOracle = new ethers.Contract(process.env.DUMMY_ORACLE_ADDRESS, DummyOracleAbi, sourceProvider)
  const yaho = new ethers.Contract(process.env.YAHO_ADDRESS, YahoAbi, sourceProvider)

  while (true) {
    const Cache = require('../cache.json')

    console.log('Looking for events ...')
    const events = await dummyOracle.queryFilter(dummyOracle.filters.NewRequest())

    for (const { transactionHash, logIndex, ...event } of events) {
      const key = transactionHash + '-' + logIndex
      if (Cache[key]) continue

      console.log('Processing', key, '...')
      const { request } = event.decode(event.data, event.topics)

      const messageId = BigNumber(request.slice(0, request.length - 40)).toNumber()
      const adapterAddress = '0x' + request.slice(request.length - 40, request.length)

      // NOTE: this function should not be called here but it's an easy way to get the message hash given a message id but considering the time we have decided to use it
      const messageHash = await yaho.hashes(messageId)
      const adapter = new ethers.Contract(adapterAddress, DummyAdapterAbi, signer)

      console.log('Storing the message ...')
      const tx = await adapter.storeMessage(sourceChainId, messageId, messageHash, {
        gasPrice: 250e9
      })
      await tx.wait(1)

      Cache[transactionHash + '-' + logIndex] = true
    }

    fs.writeFileSync('cache.json', JSON.stringify(Cache))

    await sleep(1000 * 30)
  }
}

main()
