import { ConnectWalletButton } from '@passcard/ui'
import { InteractivePlayground } from './InteractivePlayground'

interface ExampleConnectWalletButtonProps {
  mode?: 'wallet' | 'address'
}

export const ExampleConnectWalletButton = ({ mode = 'wallet' }: ExampleConnectWalletButtonProps) => {
  const initialCode = `
    () => {
      const handleChosen = async ({ walletName, address }) => {
        logger.log({ walletName, address })
      }
      return (
        <ConnectWalletButton mode="${mode}" onChosen={handleChosen} allowedBlockchains={["cardano", "mina", "ethereum", "solana"]}>
          Connect Wallet
        </ConnectWalletButton>
      )
    }
  `
  const scope = { ConnectWalletButton }

  return <InteractivePlayground initialCode={initialCode} scope={scope} />
}
