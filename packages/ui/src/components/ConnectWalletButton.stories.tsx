import React from 'react'
import type { Story, StoryDefault } from '@ladle/react'
import { ConnectWalletButton } from './ConnectWalletButton'
import type { OnChosenPayload } from './ConnectWalletModal'

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

export default {
  title: 'Components / Connect Wallet Button'
} satisfies StoryDefault
