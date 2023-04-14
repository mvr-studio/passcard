// @ts-ignore - Vite imports the raw contents correctly
import stringifiedMessage from '../../test/mocks/stringifiedMessage.yaml?raw'
import { fromSanitizedMessage } from './fromSanitizedMessage'

describe('fromSanitizedMessage', () => {
  it('retrives the original message', () => {
    const { message } = fromSanitizedMessage(stringifiedMessage)
    expect(message.domain).toEqual('example.com')
  })
})
