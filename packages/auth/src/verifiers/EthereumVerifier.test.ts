import { EthereumVerifier } from './EthereumVerifier'
import correctSignatures from '../../test/mocks/correctSignatures.json'

const ethereumSignature = correctSignatures.ethereum
const invalidMessage = 'test2'

describe('EthereumVerifier', () => {
  it('verifies successfully', () => {
    const result = EthereumVerifier.verify({
      message: ethereumSignature.message,
      signature: ethereumSignature.signature
    })
    expect(result).toBeTruthy()
  })
  it('fails', () => {
    const result = EthereumVerifier.verify({
      message: invalidMessage,
      signature: {
        ...ethereumSignature.signature,
        parsedMessage: invalidMessage
      }
    })
    expect(result).toBeFalsy()
  })
})
