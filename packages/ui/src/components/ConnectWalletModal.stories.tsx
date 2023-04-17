import React from 'react'
import { ConnectWalletModal } from './ConnectWalletModal'
import type { OnChosenPayload } from './ConnectWalletModal'
import type { Story, StoryDefault } from '@ladle/react'
import { Stack, Box, Switch, Label, useDisclosure } from '..'

export const Basic: Story = () => {
  const { isOpen, onToggle } = useDisclosure()
  const onChosen = async ({ walletName }: OnChosenPayload) => console.log(walletName)
  return (
    <Box>
      <Stack direction="horizontal" css={{ alignItems: 'center' }}>
        <Switch id="isOpen" checked={isOpen} onClick={onToggle} />
        <Label htmlFor="isOpen">Modal open</Label>
      </Stack>
      <ConnectWalletModal isOpen={isOpen} setIsOpen={onToggle} onChosen={onChosen} />
    </Box>
  )
}

export const AddressChoice: Story = () => {
  const { isOpen, onToggle } = useDisclosure()
  const onChosen = async ({ walletName, address }: OnChosenPayload) => console.log(walletName, address)
  return (
    <Box>
      <Stack direction="horizontal" css={{ alignItems: 'center' }}>
        <Switch id="isOpen" checked={isOpen} onClick={onToggle} />
        <Label htmlFor="isOpen">Modal open</Label>
      </Stack>
      <ConnectWalletModal mode="address" isOpen={isOpen} setIsOpen={onToggle} onChosen={onChosen} />
    </Box>
  )
}

export default {
  title: 'Components / Connect Wallet Modal'
} satisfies StoryDefault
