import { ConnectWalletModal } from '@passcard/ui'
import { InteractivePlayground } from './InteractivePlayground'
import { Stack, Switch, Label, useDisclosure, Box } from '.'

export const ExampleConnectWalletModal = () => {
  const initialCode = `
    () => {
      const { isOpen, onToggle } = useDisclosure()
      const onWalletChosen = async (walletName: string) => {
        const walletApi = await window.cardano[walletName].enable()
        const addresses = await walletApi.getUsedAddresses()
        logger.log({ address: addresses[0] })
      }
      return (
        <Box css={{ padding: '$md' }}>
          <Stack direction="horizontal" css={{ alignItems: 'center' }}>
            <Switch id="isOpen" checked={isOpen} onClick={onToggle} />
            <Label htmlFor="isOpen">Modal open</Label>
          </Stack>
          <ConnectWalletModal isOpen={isOpen} setIsOpen={onToggle} onWalletChosen={onWalletChosen} />
        </Box>
      )
    }
  `
  const scope = { ConnectWalletModal, Box, Stack, Switch, Label, useDisclosure }

  return <InteractivePlayground initialCode={initialCode} scope={scope} />
}
