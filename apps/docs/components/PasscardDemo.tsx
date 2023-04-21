import { ConnectWalletButton } from '@passcard/ui'
import { InteractivePlayground } from './InteractivePlayground'
import { Blockchain } from '@passcard/core'
import { Container, Heading, Stack } from '.'

export const PasscardDemo = () => {
  const initialCode = `
    () => {
      const handleChosen = async ({ walletName, address, blockchain }) => {
        logger.log({ walletName, address, blockchain })
      }
      return (
        <ConnectWalletButton mode="address" onChosen={handleChosen} allowedBlockchains={[Blockchain.Cardano, Blockchain.Mina, Blockchain.Ethereum, Blockchain.Solana]}>
          Connect Wallet
        </ConnectWalletButton>
      )
    }
  `
  const scope = { ConnectWalletButton, Blockchain }

  return (
    <Container css={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
      <Stack css={{ gap: '2rem' }}>
        <Heading as="h2">Hassle-free</Heading>
        <InteractivePlayground initialCode={initialCode} scope={scope} horizontal hideLogs />
      </Stack>
    </Container>
  )
}
