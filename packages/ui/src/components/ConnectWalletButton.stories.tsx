import React from 'react'
import type { Story, StoryDefault } from '@ladle/react'
import { ConnectWalletButton } from './ConnectWalletButton'
import type { OnChosenPayload } from './ConnectWalletModal'
import { Blockchain } from '@passcard/core'
// import { Transaction } from '@meshsdk/core'

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

// export const BuyMeACoffee: Story = () => {
//   const onChosen = async ({ walletName }: OnChosenPayload) => {
//     const walletApi = await window.cardano[walletName].enable()
//     const tx = new Transaction({ initiator: walletApi }).sendLovelace(
//       'addr1qxtsw4wqagpn9jqh5wqkhupyx9k6q58k7x0ql8pku63ttdmak7sjf0mypuy30hc5usq657rjk57maxt6h4zcrhghssnsml3qp9',
//       '5000000'
//     )
//     const unsignedTx = await tx.build()
//     const signedTx = await walletApi.signTx(unsignedTx)
//     const txHash = await walletApi.submitTx(signedTx)
//     console.log(txHash)
//   }

//   return (
//     <ConnectWalletButton onChosen={onChosen} allowedBlockchains={[Blockchain.Cardano]}>
//       Buy me a coffee
//     </ConnectWalletButton>
//   )
// }

export default {
  title: 'Components / Connect Wallet Button'
} satisfies StoryDefault
