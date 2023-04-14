import * as YAML from 'yaml'
import { MessageKeySanitizer } from './MessageKeySanitizer'
import { PasscardMessage } from '../PasscardMessage'

export const fromSanitizedMessage = (message: string) => {
  const messageObject = YAML.parse(message)
  const parsedMessage = MessageKeySanitizer.parse(messageObject)
  return new PasscardMessage(parsedMessage)
}
