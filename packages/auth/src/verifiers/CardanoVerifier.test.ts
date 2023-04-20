import { CardanoVerifier } from './CardanoVerifier'
import correctSignatures from '../../test/mocks/correctSignatures.json'

const cardanoSignature = correctSignatures.cardano
const invalidMessage = 'test2'

describe('CardanoVerifier', () => {
  it('verifies successfully', () => {
    const result = CardanoVerifier.verify({
      signature: cardanoSignature.signature,
      message: cardanoSignature.message
    })
    expect(result).toBeTruthy()
  })
  it('fails', () => {
    const result = CardanoVerifier.verify({
      signature: cardanoSignature.signature,
      message: invalidMessage
    })
    expect(result).toBeFalsy()
  })
})
