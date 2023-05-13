import React from 'react'
import ReactDOM from 'react-dom/client'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { configureChains, createClient, WagmiConfig, createStorage } from 'wagmi'
import { polygon, gnosis } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { ToastContainer } from 'react-toastify'
import styled from 'styled-components'

import reportWebVitals from './reportWebVitals'

import App from './App'

import '@rainbow-me/rainbowkit/styles.css'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-step-progress-bar/styles.css'

window.Buffer = window.Buffer || require('buffer').Buffer

const { chains, provider } = configureChains(
  [gnosis, polygon],
  [
    jsonRpcProvider({ rpc: () => ({ http: 'https://rpc.ankr.com/gnosis' }) }),
    jsonRpcProvider({ rpc: () => ({ http: process.env.REACT_APP_POLYGON_NODE }) }),
    publicProvider()
  ]
)

const { connectors } = getDefaultWallets({
  appName: 'Safe Junction',
  chains
})

const wagmiClient = createClient({
  persister: null,
  storage: createStorage({ storage: window.localStorage }),
  autoConnect: true,
  connectors,
  provider
})

const StyledContainer = styled(ToastContainer)`
  &&&.Toastify__toast-container {
  }

  .Toastify__toast {
    border-radius: 100px;
    padding: 0.5rem 0.75rem;
  }

  .Toastify__toast--success {
    background-color: #4759654d !important;
    color: white;
  }

  .Toastify__toast--error {
    background-color: red !important;
    color: white;
  }

  .Toastify__toast-body {
  }

  .Toastify__progress-bar {
    display: none;
  }

  .Toastify__toast-icon {
    & > svg {
      fill: currentcolor;
    }
  }

  button[aria-label='close'] {
    opacity: 1;
    color: white;
  }
`

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <App />
        <StyledContainer position="bottom-right" autoClose={5000} />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
