import { ConnectWalletButton } from '@passcard/ui'
import { InteractivePlayground } from './InteractivePlayground'

export const ExampleConnectWalletButton = () => {
  const initialCode = `
    () => {
      const onWalletChosen = async (walletName: string) => {
        const walletApi = await window.cardano[walletName].enable()
        const addresses = await walletApi.getUsedAddresses()
        logger.log({ address: addresses[0] })
      }
      return (
        <ConnectWalletButton onWalletChosen={onWalletChosen}>
          Connect Wallet
        </ConnectWalletButton>
      )
    }
  `
  const scope = { ConnectWalletButton }

  return <InteractivePlayground initialCode={initialCode} scope={scope} />
}
