import { parseSignature, stringifySignature } from './signature'
import correctSignatures from '../../test/mocks/correctSignatures.json'

const signature = correctSignatures.ethereum.signature
const stringified =
  '{"parsedMessage":"test","address":"0x5f7fb8c20e057b538c9619212fce825d768ea910","payload":"0xeb3845de9f423837f6b46fc7345986b0dd4d31c4d93a9f21bbae2025f02f4ad25bcfd213772b5f91699471a20d75bd332f2f06d4c0d6cd5848b09c6730be40041b"}'

describe('signature', () => {
  it('stringifies the payload', () => {
    const result = stringifySignature(correctSignatures.ethereum.signature)
    expect(result).toEqual(stringified)
  })
  it('parses the payload', () => {
    const result = parseSignature(stringified)
    expect(result).toEqual(signature)
  })
})
