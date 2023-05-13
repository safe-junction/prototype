require('dotenv').config()
const { ethers, utils } = require('ethers')
const fs = require('fs')
const BigNumber = require('bignumber.js')

const SJReceiverAbi = require('./utils/SJReceiverAbi.json')
const SJDispatcherAbi = require('./utils/SJDispatcherAbi.json')

const sleep = (_ms) => new Promise((_resolve) => setTimeout(() => _resolve(), _ms))

const main = async () => {
  const sourceProvider = new ethers.providers.JsonRpcProvider(process.env.SOURCE_NODE)
  const destinationProvider = new ethers.providers.JsonRpcProvider(process.env.DESTINATION_NODE)
  const signer = new ethers.Wallet(process.env.PK, destinationProvider)

  const sjDispatcher = new ethers.Contract(process.env.SJ_DISPATCHER_ADDRESS, SJDispatcherAbi, sourceProvider)
  const sjReceiver = new ethers.Contract(process.env.SJ_RECEIVER_ADDRESS, SJReceiverAbi, signer)

  while (true) {
    const Cache = require('../cache.json')

    console.log('Looking for events ...')
    const events = await sjDispatcher.queryFilter(sjDispatcher.filters.SJErc20Transfer())

    for (const { transactionHash, logIndex, args } of events) {
      const key = transactionHash + '-' + logIndex
      if (Cache[key]) continue

      console.log('Processing', key, '...')
      const [messageId, , sourceTokenAddress, sourceTokenSymbol, sourceTokenAmount, recipient] = args

      try {
        const tx = await sjReceiver.advanceMessage(
          messageId,
          sourceTokenAddress,
          sourceTokenSymbol,
          sourceTokenAmount,
          recipient,
          {
            gasPrice: 280e9
          }
        )
        await tx.wait(1)
      } catch (_err) {
        console.error(_err)
      }

      Cache[transactionHash + '-' + logIndex] = true
    }

    fs.writeFileSync('cache.json', JSON.stringify(Cache))
    await sleep(1000 * 30)
  }
}

main()
