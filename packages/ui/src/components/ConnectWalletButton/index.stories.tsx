import React from 'react'
import type { Story, StoryDefault } from '@ladle/react'
import { ConnectWalletButton } from '.'

export const Basic: Story = () => {
  const onWalletChosen = (walletName: string) => {
    console.log(walletName)
  }

  return <ConnectWalletButton onWalletChosen={onWalletChosen} />
}

export default {
  title: 'Components / Connect Wallet Button'
} satisfies StoryDefault
