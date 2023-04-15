import { Buffer } from 'buffer'
import { bech32 } from 'bech32'

enum NetworkId {
  MAINNET = 1,
  TESTNET = 0
}

export const cardanoBech32FromHex = (hexAddress: string) => {
  hexAddress = hexAddress.toLowerCase()
  const networkId = Number(hexAddress.charAt(1)) as NetworkId
  const addressBytes = Buffer.from(hexAddress, 'hex')
  const words = bech32.toWords(addressBytes)
  let prefix

  if (networkId === NetworkId.MAINNET) {
    prefix = 'addr'
  } else if (networkId === NetworkId.TESTNET) {
    prefix = 'addr_test'
  } else {
    throw new TypeError('Unsupported network type')
  }

  return bech32.encode(prefix, words, 1000)
}
