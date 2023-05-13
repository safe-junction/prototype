# Safe Junction - TBD?

⚠️ The code is currently in the development phase and is not yet ready for production

## Overview

Safe Junction is an innovative protocol designed to facilitate seamless and secure cross-chain bridging of digital assets.

Unlike traditional bridging solutions, Safe Junction leverages the functionality of existing bridges, using them as oracles to authenticate, verify and execute cross-chain operations as instructed by users on different blockchains. 

This repository contains the first prototype of Safe Junction, which was designed and implemented at the ETHGlobal Lisbon hackathon. While the protocol is fundamentally blockchain agnostic, this specific implementation has been designed for EVM blockchains and is built on top of the Hashi EVM Hash Oracle aggregator. 

The system is designed to reach a majority consensus on a user's operation, using multiple oracles to verify the validity of cross-chain instructions.

The speed of the system is equivalent to the speed of the slowest oracle in the network. However, the innovative Fast Lane functionality overcomes this drawback and enables much higher speed: market makers can pre-process cross-chain trades, provide their liquidity in response to a user request, and then securely reclaim the liquidity (plus a service fee) once all oracles have processed the cross-chain request at their standard speed.

## Components

This repository includes several components:

1. Core Safe Junction protocol smart contracts for EVM: These contracts form the core of the Safe Junction protocol on EVM blockchains.

2. Dummy oracle: This is used to facilitate testing of Hashi during the hackathon.

3. Offchain node agent: This agent handles the correct execution of valid Safe Junction commit/reveal calls.

4. Fast Lane smart contracts: These contracts enable the Fast Lane functionality.

5. Off-chain Python agent for Fast Lane: This agent enables market makers to use the Fast Lane feature.
