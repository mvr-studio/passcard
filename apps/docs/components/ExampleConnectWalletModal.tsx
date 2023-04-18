import { ConnectWalletModal } from '@passcard/ui'
import { InteractivePlayground } from './InteractivePlayground'
import { Stack, Switch, Label, useDisclosure, Box } from '.'

export const ExampleConnectWalletModal = () => {
  const initialCode = `
    () => {
      const { isOpen, onToggle } = useDisclosure()
      const handleChosen = async ({ walletName, address }) => {
        logger.log({ walletName, address })
      }
      return (
        <Box>
          <Stack direction="horizontal" css={{ alignItems: 'center' }}>
            <Switch id="isOpen" checked={isOpen} onClick={onToggle} />
            <Label htmlFor="isOpen">Modal open</Label>
          </Stack>
          <ConnectWalletModal mode="wallet" isOpen={isOpen} setIsOpen={onToggle} onChosen={handleChosen} allowedBlockchains={["cardano", "mina", "ethereum", "solana"]} />
        </Box>
      )
    }
  `
  const scope = { ConnectWalletModal, Box, Stack, Switch, Label, useDisclosure }

  return <InteractivePlayground initialCode={initialCode} scope={scope} />
}
