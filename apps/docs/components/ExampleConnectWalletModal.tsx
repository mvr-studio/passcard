import { ConnectWalletModal } from '@passcard/ui'
import { InteractivePlayground } from './InteractivePlayground'
import { Stack, Switch, Label, useDisclosure, Box } from '.'
import { Blockchain } from '@passcard/core'

export const ExampleConnectWalletModal = () => {
  const initialCode = `
    () => {
      const { isOpen, onToggle } = useDisclosure()
      const handleChosen = async ({ walletName, address, blockchain }) => {
        logger.log({ walletName, address, blockchain })
      }
      return (
        <Box>
          <Stack direction="horizontal" css={{ alignItems: 'center' }}>
            <Switch id="isOpen" checked={isOpen} onClick={onToggle} />
            <Label htmlFor="isOpen">Modal open</Label>
          </Stack>
          <ConnectWalletModal mode="wallet" isOpen={isOpen} setIsOpen={onToggle} onChosen={handleChosen} allowedBlockchains={[Blockchain.Cardano, Blockchain.Mina, Blockchain.Ethereum, Blockchain.Solana]} />
        </Box>
      )
    }
  `
  const scope = { ConnectWalletModal, Box, Stack, Switch, Label, useDisclosure, Blockchain }

  return <InteractivePlayground initialCode={initialCode} scope={scope} />
}
