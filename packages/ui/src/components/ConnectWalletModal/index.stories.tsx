import React from 'react'
import { ConnectWalletModal } from '.'
import type { Story, StoryDefault } from '@ladle/react'
import { Stack, Box, Switch, Label, useDisclosure } from '../..'

export const Basic: Story = () => {
  const { isOpen, onToggle } = useDisclosure()
  const onWalletChosen = (walletName: string) => console.log(walletName)
  return (
    <Box>
      <Stack direction="horizontal" css={{ alignItems: 'center' }}>
        <Switch id="isOpen" checked={isOpen} onClick={onToggle} />
        <Label htmlFor="isOpen">Modal open</Label>
      </Stack>
      <ConnectWalletModal isOpen={isOpen} setIsOpen={onToggle} onWalletChosen={onWalletChosen} />
    </Box>
  )
}

export default {
  title: 'Components / Connect Wallet Modal'
} satisfies StoryDefault
