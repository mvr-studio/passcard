import { ConnectWalletButton, AddressTile, AddressQrCode } from '@passcard/ui'
import { InteractivePlayground } from './InteractivePlayground'
import { Blockchain } from '@passcard/core'
import { Container, Heading, Stack } from '.'

export const PasscardDemo = () => {
  const initialCode = `
    () => {
      const [address, setAddress] = React.useState('')
      const handleChosen = async ({ walletName, address, blockchain }) => {
        setAddress(address)
      }
      return (
        <Stack css={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          {!address && <ConnectWalletButton mode="address" onChosen={handleChosen} allowedBlockchains={[Blockchain.Cardano, Blockchain.Mina, Blockchain.Ethereum, Blockchain.Solana]}>
            Connect Wallet
          </ConnectWalletButton>}
          {address && <AddressTile address={address} />}
          {address && <AddressQrCode address={address} css={{ maxWidth: '12rem' }} />}
        </Stack>
      )
    }
  `
  const scope = { ConnectWalletButton, Blockchain, Stack, AddressTile, AddressQrCode }

  return (
    <Container css={{ paddingLeft: '1rem', paddingRight: '1rem', paddingTop: '6rem', paddingBottom: '6rem' }}>
      <Stack css={{ gap: '2rem', height: '100%' }}>
        <Heading as="h2" css={{ fontFamily: 'sora' }}>
          Hassle-free
        </Heading>
        <InteractivePlayground initialCode={initialCode} scope={scope} horizontal hideLogs />
      </Stack>
    </Container>
  )
}
