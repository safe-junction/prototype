import { useState, useEffect } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Container, Row, Col, Navbar } from 'react-bootstrap'
import styled from 'styled-components'
import { useAccount, useContractWrite, usePrepareContractWrite, useContractEvent } from 'wagmi'
import { gnosis, polygon } from 'wagmi/chains'
import BigNumber from 'bignumber.js'
import { ProgressBar, Step } from 'react-step-progress-bar'

import SJERC20VaultAbi from './utils/SJERC20VaultAbi.json'
import SJReceiverAbi from './utils/SJReceiverAbi.json'
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
  font-size: 50px;
  font-weight: 700;
  margin-left: 20px;
`

const StepContent = styled.div`
  color: white;
  width: 20px;
  height: 20px;
  background-color: ${({ accomplished }) => (accomplished ? 'rgb(9 112 228)' : 'rgba(211, 211, 211, 0.8)')};
  border-radius: 50%;
`

const App = () => {
  const [status, setStatus] = useState(0)
  const [amount, setAmount] = useState('0')

  const { address } = useAccount()

  useContractEvent({
    address: '0xC6870E36dC1b0b835fDDe33bC080156EeD9F2e0C',
    abi: SJReceiverAbi,
    eventName: 'AdvanceMessageProcessed',
    listener(log) {
      setStatus(3)
    },
    chainId: polygon.id
  })

  const { config: wrapConfig } = usePrepareContractWrite({
    address: '0xC7c9A6572024eB7b191070D78bb5F5FCa7eA4458',
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

  const { write: wrap, data: wrapData } = useContractWrite(wrapConfig)

  useEffect(() => {
    if (wrapData) {
      toastifyTransaction(wrapData, () => {
        setStatus(1)

        setTimeout(() => {
          setStatus(2)
        }, 1000 * 5)
      })
    }
  }, [wrapData])

  return (
    <Global>
      <Navbar bg="light" variant="light">
        <Container className="d-flex justify-content-between">
          <Navbar.Brand href="#home"></Navbar.Brand>
          <ConnectButton />
        </Container>
      </Navbar>

      <Container>
        <Row>
          <Col className="d-flex align-items-center justify-content-center" style={{ marginTop: 50 }}>
            <img src="./assets/logo.png" style={{ height: 50, width: 50 }} alt="logo" />
            <Title>SAFE JUNCTION</Title>
          </Col>
        </Row>
        <Row className="d-flex align-items-center justify-content-center" style={{ marginTop: 150 }}>
          <Col xs={12} md={6}>
            <Row>
              <Col xs={5}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <img src="./assets/dai.png" height={50} width={50} alt="dai" />
                  <span style={{ marginTop: 5 }}>xDAI on Gnosis</span>
                </div>
              </Col>
              <Col xs={2} className="d-flex align-items-center justify-content-center">
                <img src="./assets/arrow-right.png" height={35} width={35} alt="arrow" />
              </Col>
              <Col xs={5}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <img src="./assets/_dai.png" height={50} width={50} alt="_dai"/>
                  <span style={{ marginTop: 5 }}>*DAI on Polygon</span>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="d-flex align-items-center justify-content-center" style={{ marginTop: 100 }}>
          <Col xs={12} lg={5}>
            <Input type="number" value={amount} onChange={(_e) => setAmount(_e.target.value)} />
            <StyledButton onClick={() => wrap?.()}>Send crosschain</StyledButton>
          </Col>
        </Row>

        <Row className="d-flex align-items-center justify-content-center" style={{ marginTop: 30 }}>
          <Col xs={12} lg={5}>
            <ProgressBar
              percent={status === 0 ? 0 : status === 1 ? 33 : status === 2 ? 66 : 100}
              hasStepZero={true}
              stepPositions={[0, 33, 66, 100]}
            >
              <Step transition="scale">
                {({ accomplished }) => <StepContent accomplished={accomplished}></StepContent>}
              </Step>
              <Step transition="scale">
                {({ accomplished }) => <StepContent accomplished={accomplished}></StepContent>}
              </Step>
              <Step transition="scale">
                {({ accomplished }) => <StepContent accomplished={accomplished}></StepContent>}
              </Step>
              <Step transition="scale">
                {({ accomplished }) => <StepContent accomplished={accomplished}></StepContent>}
              </Step>
            </ProgressBar>
          </Col>
        </Row>

        <Row className="d-flex align-items-center justify-content-center" style={{ marginTop: 20 }}>
          <Col xs={12} lg={5} className="text-center">
            {status > 0 && (
              <span>
                {status === 1 && 'Transaction confirmed. Waiting for finality ...'}
                {status === 2 && 'Waiting for cross chain event propagation ...'}
                {status === 3 && 'Fast lane detected!'}
              </span>
            )}
          </Col>
        </Row>
      </Container>
    </Global>
  )
}
export default App
