import { MinaVerifier } from './MinaVerifier'
import correctSignatures from '../../test/mocks/correctSignatures.json'

const minaSignature = correctSignatures.mina
const invalidMessage = 'test2'

describe('MinaVerifier', () => {
  it('verifies successfully', () => {
    const result = MinaVerifier.verify({
      message: minaSignature.message,
      signature: minaSignature.signature
    })
    expect(result).toBeTruthy()
  })
  it('fails', () => {
    const result = MinaVerifier.verify({
      message: minaSignature.message,
      signature: {
        ...minaSignature.signature,
        parsedMessage: invalidMessage
      }
    })
    expect(result).toBeFalsy()
  })
})
