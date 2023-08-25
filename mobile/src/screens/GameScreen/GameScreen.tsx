import React, { useEffect } from 'react'

import { ALCHEMY_API_KEY, ALCHEMY_API_HTTPS, ALCHEMY_API_WS } from '@env'
import { RlyMumbaiNetwork, getAccountPhrase } from '@rly-network/mobile-sdk'
import { GsnTransactionDetails } from '@rly-network/mobile-sdk/lib/typescript/gsnClient/utils'
import { Network, Alchemy, AlchemySubscription } from 'alchemy-sdk'
import { Display, Dice, GameBoard, Space, Background } from 'components'
import { ethers } from 'ethers'
import { useLeelaGame } from 'hooks'
import { useTranslation } from 'react-i18next'
import { useAccount } from 'store'

import LeelaGameABI from '/smart-contract/LeelaGameABI.json'

import { RlyNetwork } from '../../'

const settings = {
  apiKey: ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network: Network.MATIC_MAINNET, // Replace with your network.
}

const alchemy = new Alchemy(settings)
const contractAbi = LeelaGameABI

const GameScreen: React.FC = () => {
  const { currentPlayer, lastRoll, rollDice } = useLeelaGame()
  const { t } = useTranslation()
  const [account] = useAccount()

  useEffect(() => {
    const contractAddress = '0xb970373d091b3b60f1048036aDD1a72A2497256A'

    const getContract = async () => {
      try {
        const mnemonic = await getAccountPhrase()

        let privateKey
        if (mnemonic) {
          privateKey =
            ethers.Wallet.fromMnemonic(mnemonic)._signingKey().privateKey
        }

        const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_API_HTTPS)

        let wallet
        if (privateKey) {
          wallet = new ethers.Wallet(privateKey, provider)
        }

        const myContract = new ethers.Contract(
          contractAddress,
          contractAbi,
          wallet,
        )

        const tx = await myContract.populateTransaction.rollDice()
        console.log('tx', tx)

        const gas = await myContract.estimateGas.rollDice()
        console.log('gas', gas)
        const { maxFeePerGas, maxPriorityFeePerGas } =
          await provider.getFeeData()

        const gsnTx = {
          from: account,
          data: tx.data,
          to: tx.to,
          gasLimit: gas._hex,
          maxFeePerGas: maxFeePerGas?._hex,
          maxPriorityFeePerGas: maxPriorityFeePerGas?._hex,
        } as GsnTransactionDetails

        console.log('gsnTx', gsnTx)

        if (RlyNetwork.relay) {
          const relay = await RlyNetwork.relay(gsnTx)
          console.log('relay', relay)
        }
      } catch (error) {
        console.log('error', error)
      }
    }

    getContract()
  }, [])
  // const erc20TokenAddress = '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889' // Matic Mimbai Testnet
  // const balance = await RlyMumbaiNetwork.getBalance(erc20TokenAddress)
  // console.log('balance', balance)

  // const newBalance = await RlyNetwork.getBalance()
  // console.log('newBalance', newBalance)
  return (
    <Background>
      <Space height={20} />
      <Display title={t(`${currentPlayer?.message}`)} />
      <Space height={20} />
      <GameBoard players={[currentPlayer]} />
      <Space height={10} />
      <Dice rollDice={rollDice} lastRoll={lastRoll} size="medium" />
      <Space height={300} />
    </Background>
  )
}

export { GameScreen }
