import { PasscardMessage } from './PasscardMessage'
import correctMessage from '../test/mocks/correctMessage.json'
// @ts-ignore - Vite imports the raw contents correctly
import stringifiedMessage from '../test/mocks/stringifiedMessage.txt?raw'

describe('PasscardMessage', () => {
  describe('rawMessage as string', () => {
    it('creates instance from string', () => {
      const rawMessageString = JSON.stringify(correctMessage)
      const { message } = new PasscardMessage(rawMessageString)
      expect(message.domain).toEqual('example.com')
    })
    it('throws a validation error', () => {
      const invalidMessage = { ...correctMessage, networkId: 'Testnet' }
      try {
        new PasscardMessage(invalidMessage as any)
      } catch (error) {
        expect(error.issues[0].code).toEqual('invalid_enum_value')
      }
    })
  })
  describe('rawMessage as object', () => {
    it('creates instance from complete object', () => {
      const { message } = new PasscardMessage(correctMessage)
      expect(message.domain).toEqual('example.com')
    })
  })
  describe('.stringify()', () => {
    it('stringifies the message', async () => {
      const pMessage = new PasscardMessage(correctMessage)
      expect(pMessage.stringify()).toEqual(stringifiedMessage)
    })
  })
  describe('.verify()', () => {
    it('verifies the correct message', async () => {
      const pMessage = new PasscardMessage(correctMessage)
      pMessage.verify()
      expect(pMessage.message.domain).toEqual('example.com')
    })
  })
})
