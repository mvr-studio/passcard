import { SolanaVerifier } from './SolanaVerifier'
import correctSignatures from '../../test/mocks/correctSignatures.json'

const solanaSignature = {
  address: Uint8Array.from(correctSignatures.solana.signature.address),
  parsedMessage: Uint8Array.from(correctSignatures.solana.signature.parsedMessage),
  signature: Uint8Array.from(correctSignatures.solana.signature.payload)
}

const invalidMessage = Uint8Array.from([116, 101, 115, 115])

describe('SolanaVerifier', () => {
  it('verifies successfully', () => {
    const result = SolanaVerifier.verify({
      signature: {
        parsedMessage: solanaSignature.parsedMessage,
        payload: solanaSignature.signature,
        address: solanaSignature.address
      }
    })
    expect(result).toBeTruthy()
  })
  it('fails to verify', () => {
    const result = SolanaVerifier.verify({
      signature: {
        parsedMessage: invalidMessage,
        payload: solanaSignature.signature,
        address: solanaSignature.address
      }
    })
    expect(result).toBeFalsy()
  })
})
