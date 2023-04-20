import { ConnectWalletButton } from '@passcard/ui'
import { InteractivePlayground } from './InteractivePlayground'
import { Stack } from '.'
import { Blockchain } from '@passcard/auth'

export const ExampleConnectWalletButton = () => {
  const initialCode = `
    () => {
      const handleChosen = async ({ walletName, address, blockchain }) => {
        logger.log({ walletName, address, blockchain })
      }
      return (
        <Stack direction="horizontal">
          <ConnectWalletButton mode="wallet" onChosen={handleChosen} allowedBlockchains={[Blockchain.Cardano, Blockchain.Mina, Blockchain.Ethereum, Blockchain.Solana]}>
            Connect Wallet
          </ConnectWalletButton>
          <ConnectWalletButton mode="address" onChosen={handleChosen} allowedBlockchains={[Blockchain.Cardano, Blockchain.Mina, Blockchain.Ethereum, Blockchain.Solana]}>
            Connect Wallet + Select Address
          </ConnectWalletButton>
        </Stack>
      )
    }
  `
  const scope = { ConnectWalletButton, Stack, Blockchain }

  return <InteractivePlayground initialCode={initialCode} scope={scope} />
}
