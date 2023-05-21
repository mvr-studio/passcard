import { ConnectWalletButton } from '@passcard/ui'
import { InteractivePlayground } from './InteractivePlayground'
import { Stack } from '.'
import { Blockchain } from '@passcard/core'

export const ExampleConnectWalletButtonSimple = () => {
  const initialCode = `
    () => {
      const handleChosen = async ({ walletName, address, blockchain }) => {
        logger.log({ walletName, address, blockchain })
      }
      return (
        <ConnectWalletButton mode="address" onChosen={handleChosen} allowedBlockchains={[Blockchain.Cardano, Blockchain.Mina, Blockchain.Ethereum, Blockchain.Solana]} />
      )
    }
  `
  const scope = { ConnectWalletButton, Stack, Blockchain }

  return <InteractivePlayground initialCode={initialCode} scope={scope} hideLogs />
}
