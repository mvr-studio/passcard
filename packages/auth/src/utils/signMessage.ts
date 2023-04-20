import { Blockchain, SignMessageProps } from '../types'
import { toHexMessage } from './toHexMessage'

export const signMessage = async ({ blockchain, walletName, message, address }: SignMessageProps) => {
  if (typeof window === 'undefined') throw new Error('Window is not available.')
  const windowInstance = window as any
  switch (blockchain) {
    case Blockchain.Cardano:
      if (!walletName) throw new Error('walletName is required for Cardano.')
      const hexMessage = toHexMessage(message)
      const walletApi = await windowInstance.cardano[walletName].enable()
      return { payload: await walletApi.signData(address as string, hexMessage), address, parsedMessage: hexMessage }
    case Blockchain.Mina:
      await windowInstance.mina.requestAccounts()
      const minaResult = await windowInstance.mina.signMessage({ message })
      return { payload: minaResult.signature, address, parsedMessage: minaResult.data }
    case Blockchain.Ethereum:
      await windowInstance.ethereum.request({ method: 'eth_requestAccounts' })
      const ethMessage = `0x${toHexMessage(message)}`
      return {
        payload: await windowInstance.ethereum.request({
          method: 'personal_sign',
          params: [ethMessage, address]
        }),
        address,
        parsedMessage: ethMessage
      }
    case Blockchain.Solana:
      const solanaMessage = new TextEncoder().encode(message)
      const { publicKey } = await windowInstance.solana.connect()
      const solanaResult = await windowInstance.solana.signMessage(solanaMessage, 'utf8')
      return { payload: solanaResult.signature, address: publicKey.toBytes(), parsedMessage: solanaMessage }
  }
}
