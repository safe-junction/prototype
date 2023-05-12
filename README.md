# Safe Junction - TBD?

## Overview

Safe Junction is a protocol designed to facilitate secure crosschain bridging of assets. Rather than being a bridge itself, Safe Junction leverages the functionality of existing bridges, using them as oracles to verify and carry out crosschain operations as instructed by users on different blockchains. 

This repository contains the first prototype of Safe Junction, which was implemented at the ETHGlobal Lisbon hackathon. While the protocol is fundamentally blockchain agnostic, this implementation is designed for EVM blockchains and is built on top of the Hashi EVM Hash Oracle aggregator. 

The system is designed to reach majority consensus on a user's operation using multiple oracles. The speed of the system is equivalent to the speed of the slowest oracle in the network. However, the fastlane functionality allows for much greater speed, enabling market makers to pre-process crosschain operations, advancing their liquidity in response to a user request, and then securely reclaiming the liquidity (plus a service fee) once all oracles have processed the crosschain request at their standard speed.

## Components

This repository comprises several components:

1. Core Safe Junction protocol smart contracts for EVM: These contracts form the heart of the Safe Junction protocol on EVM blockchains.

2. Dummy oracle: This gets used to simplify our testing needs of Hashi during the hackathon.

3. Offchain node agent: This agent is responsible for executing the correct dispatch(commit)/reveal calls of Safe Junction.

4. Fastlane smart contracts: These contracts facilitate the fastlane functionality.

5. Offchain python agent for Fastlane: This agent enables market makers to operate the Fastlane.

