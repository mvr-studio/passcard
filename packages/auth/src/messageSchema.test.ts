import { messageSchema } from './messageSchema'
import correctMessage from '../test/mocks/correctMessage.json'

describe('messageSchema', () => {
  describe('parse', () => {
    it('parses the correct message', () => {
      const parsedMessage = messageSchema.parse(correctMessage)
      expect(parsedMessage.domain).toEqual('example.com')
    })
    it('throws on invalid message', () => {
      const invalidMessage = { ...correctMessage, networkId: 'Testnet' }
      try {
        messageSchema.parse(invalidMessage)
      } catch (error) {
        expect(error.issues[0].code).toEqual('invalid_enum_value')
      }
    })
  })
})
