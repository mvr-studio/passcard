import { ConnectWalletButton } from '@passcard/ui'
import { InteractivePlayground } from './InteractivePlayground'

interface ExampleConnectWalletButtonProps {
  mode?: 'wallet' | 'address'
}

export const ExampleConnectWalletButton = ({ mode = 'wallet' }: ExampleConnectWalletButtonProps) => {
  const initialCode = `
    () => {
      const handleChosen = async ({ walletName, address }) => {
        const walletApi = await window.cardano[walletName].enable()
        const addresses = await walletApi.getUsedAddresses()
        logger.log({ address: addresses[0] })
      }
      return (
        <ConnectWalletButton mode="${mode}" onChosen={handleChosen}>
          Connect Wallet
        </ConnectWalletButton>
      )
    }
  `
  const scope = { ConnectWalletButton }

  return <InteractivePlayground initialCode={initialCode} scope={scope} />
}
