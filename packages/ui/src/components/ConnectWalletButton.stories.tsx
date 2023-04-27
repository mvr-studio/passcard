import React from 'react'
import type { Story, StoryDefault } from '@ladle/react'
import { ConnectWalletButton } from './ConnectWalletButton'
import type { OnChosenPayload } from './ConnectWalletModal'
import { Blockchain } from '@passcard/core'
import {
  Address,
  BigNum,
  LinearFee,
  Transaction,
  TransactionBuilder,
  TransactionBuilderConfigBuilder,
  TransactionOutput,
  TransactionUnspentOutput,
  TransactionUnspentOutputs,
  TransactionWitnessSet,
  Value,
  hash_transaction
} from '@emurgo/cardano-serialization-lib-browser'
import { Buffer } from 'buffer'

export const Basic: Story = () => {
  const onChosen = async ({ walletName }: OnChosenPayload) => {
    console.log(walletName)
  }

  return <ConnectWalletButton onChosen={onChosen} />
}

export const AddressChoice: Story = () => {
  const onChosen = async ({ walletName, address }: OnChosenPayload) => {
    console.log(walletName, address)
  }

  return <ConnectWalletButton mode="address" onChosen={onChosen} />
}

export const AllowBlockchains: Story = () => {
  const onChosen = async ({ walletName, address }: OnChosenPayload) => {
    console.log(walletName, address)
  }

  return (
    <ConnectWalletButton
      mode="address"
      onChosen={onChosen}
      allowedBlockchains={[Blockchain.Cardano, Blockchain.Ethereum, Blockchain.Mina, Blockchain.Solana]}
    />
  )
}

export const BuyMeACoffee: Story = () => {
  const getProtocolParameters = async () => {
    const request = await fetch('https://passcard-functions.mvr.studio/trpc/protocolParameters')
    const { result } = await request.json()
    return result.data.protocolParameters
  }

  const onChosen = async ({ walletName }: OnChosenPayload) => {
    const protocolParams = await getProtocolParameters()
    const wallet = await window.cardano[walletName].enable()
    const txBuilder = TransactionBuilder.new(
      TransactionBuilderConfigBuilder.new()
        .fee_algo(
          LinearFee.new(
            BigNum.from_str(String(protocolParams.minFeeA)),
            BigNum.from_str(String(protocolParams.minFeeA))
          )
        )
        .pool_deposit(BigNum.from_str(protocolParams.poolDeposit))
        .key_deposit(BigNum.from_str(protocolParams.keyDeposit))
        .coins_per_utxo_word(BigNum.from_str(protocolParams.coinsPerUtxoSize))
        .max_value_size(protocolParams.maxValSize)
        .max_tx_size(protocolParams.maxTxSize)
        .prefer_pure_change(true)
        .build()
    )
    const shelleyOutputAddress = Address.from_bech32(
      'addr_test1qr9w8ltymsap0ywfakmk8ul5640xgjg0r7jhfrdgy5lcfp3788ju4ghs46frm952wp2wahlel8lqkszndejgdxelt40sjw89e4'
    )
    txBuilder.add_output(TransactionOutput.new(shelleyOutputAddress, Value.new(BigNum.from_str('5000000'))))
    const rawUtxos = await wallet.getUtxos()
    const txUnspentOutputs = rawUtxos?.reduce((acc, utxo) => {
      const fromBytes = TransactionUnspentOutput.from_bytes(Buffer.from(utxo, 'hex'))
      acc.add(fromBytes)
      return acc
    }, TransactionUnspentOutputs.new())
    txUnspentOutputs && txBuilder.add_inputs_from(txUnspentOutputs, 2)
    txBuilder.add_change_if_needed(shelleyOutputAddress)
    const txBody = txBuilder.build()
    const transactionWitnessSet = TransactionWitnessSet.new()
    const tx = Transaction.new(txBody, TransactionWitnessSet.from_bytes(transactionWitnessSet.to_bytes()))
    const hashedBody = Buffer.from(tx.to_bytes()).toString('hex')
    const signedTx = await wallet.signTx(hashedBody, true)
    const txVkeyWitnesses = TransactionWitnessSet.from_bytes(Buffer.from(signedTx, 'hex'))
    transactionWitnessSet.set_vkeys(txVkeyWitnesses.vkeys()!)
    const signedTxBody = Transaction.new(tx.body(), transactionWitnessSet)
    const submittedTx = await wallet.submitTx(Buffer.from(signedTxBody.to_bytes()).toString('hex'))
    console.log(submittedTx)
  }

  return (
    <ConnectWalletButton onChosen={onChosen} allowedBlockchains={[Blockchain.Cardano]}>
      Buy me a coffee
    </ConnectWalletButton>
  )
}

export default {
  title: 'Components / Connect Wallet Button'
} satisfies StoryDefault
