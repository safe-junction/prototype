import { useState, useEffect } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Container, Row, Col, Navbar } from 'react-bootstrap'
import styled from 'styled-components'
import { useAccount, useContractWrite, useWaitForTransaction, usePrepareContractWrite } from 'wagmi'
import { gnosis, polygon } from 'wagmi/chains'
import BigNumber from 'bignumber.js'

import SJERC20VaultAbi from './utils/SJERC20VaultAbi.json'
import { toastifyTransaction } from './utils'

const Global = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-family: 'Open Sans', sans-serif;
`

const StyledButton = styled.button`
  border: 0;
  padding: 0px 15px;
  background: #15c609;
  color: white;
  font-size: 20px;
  font-weight: 700;
  height: 60px;
  align-items: center;
  border-radius: 20px;
  width: 100%;
  justify-content: center;
  text-align: center;
  &:disabled {
    opacity: 0.4;
    &:hover {
      opacity: 0.4;
      background: #15c609;
    }
  }
  margin-top: 10px;
`

const Input = styled.input`
  width: 100%;
  height: 60px;
  margin-bottom: 10px;
  border-radius: 10px;
  font-size: 23px;
  padding-left: 10px;
  padding-right: 10px;
  border: 1px solid #4759654d;
`

const Title = styled.span`
  margin-top: 100px;
  font-size: 50px;
  font-weight: 700;
`

const App = () => {
  const [amount, setAmount] = useState('0')
  const { address } = useAccount()

  const { config: wrapConfig } = usePrepareContractWrite({
    address: '0x4EacA60eB19C0A32d8Bd9E6AE8Bded374611eBb6',
    abi: SJERC20VaultAbi,
    functionName: 'wrap',
    args: [
      '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d',
      BigNumber(amount)
        .multipliedBy(10 ** 18)
        .toFixed(),
      address,
      polygon.id
    ],
    enabled: address && amount.length > 0,
    chainId: gnosis.id
  })

  const { write: wrap, error: wrapError, data: wrapData } = useContractWrite(wrapConfig)

  useEffect(() => {
    if (wrapData) {
      toastifyTransaction(wrapData)
    }
  }, [wrapData])

  const { isLoading: isWrapping } = useWaitForTransaction({
    hash: wrapData?.hash,
    confirmations: 1
  })

  return (
    <Global>
      <Navbar bg="light" variant="light">
        <Container className="d-flex justify-content-between">
          <Navbar.Brand href="#home">
            <img src="./assets/logo.png" style={{ height: 50, width: 50 }} alt="logo" />
          </Navbar.Brand>
          <ConnectButton />
        </Container>
      </Navbar>

      <Container>
        <Row>
          <Col className="d-flex align-items-center justify-content-center">
            <Title>SAFE JUNCTION</Title>
          </Col>
        </Row>
        <Row className="d-flex align-items-center justify-content-center" style={{ marginTop: 200 }}>
          <Col xs={12} lg={5}>
            <Input type="number" value={amount} onChange={(_e) => setAmount(_e.target.value)} />
            <StyledButton onClick={() => wrap?.()}>Wrap</StyledButton>
          </Col>
        </Row>
      </Container>
    </Global>
  )
}
export default App
