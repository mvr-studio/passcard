import { Blockchain } from '../types'
import { verifyMessage } from './verifyMessage'
import correctSignatures from '../../test/mocks/correctSignatures.json'

const solanaSignature = {
  address: Uint8Array.from(correctSignatures.solana.signature.address),
  parsedMessage: Uint8Array.from(correctSignatures.solana.signature.parsedMessage),
  signature: Uint8Array.from(correctSignatures.solana.signature.payload)
}

describe('verifyMessage', () => {
  it('verifies Cardano message successfully', () => {
    const result = verifyMessage({
      blockchain: Blockchain.Cardano,
      ...correctSignatures.cardano
    })
    expect(result).toBeTruthy()
  })
  it('verifies Mina message successfully', () => {
    const result = verifyMessage({
      blockchain: Blockchain.Mina,
      ...correctSignatures.mina
    })
    expect(result).toBeTruthy()
  })
  it('verifies Ethereum message successfully', () => {
    const result = verifyMessage({
      blockchain: Blockchain.Ethereum,
      ...correctSignatures.ethereum
    })
    expect(result).toBeTruthy()
  })
  it('verifies Solana message successfully', () => {
    const result = verifyMessage({
      blockchain: Blockchain.Solana,
      message: '',
      signature: {
        parsedMessage: solanaSignature.parsedMessage,
        payload: solanaSignature.signature,
        address: solanaSignature.address
      }
    })
    expect(result).toBeTruthy()
  })
})
