import * as YAML from 'yaml'
import { MessageKeySanitizer } from './MessageKeySanitizer'
import { PasscardMessage } from '../PasscardMessage'
import dedent from 'dedent'

const domainFromHeader = (header: string) => header.split(' wants')[0]

const addressAndStatementFromHeader = (header: string) =>
  header
    .split('address:')[1]
    .split('\n')
    .filter((el) => el.length)

const getHeaderMeta = ({ domain, address, statement }: Record<string, string>) => {
  return dedent`
    Domain: ${domain}
    Address: ${address}
    Statement: ${statement}
  `
}

export const fromSanitizedMessage = (message: string) => {
  const [header, metaDataString] = message.split('Meta:')
  const domain = domainFromHeader(header)
  const [address, statement] = addressAndStatementFromHeader(header)
  const headerMeta = getHeaderMeta({
    domain,
    address,
    statement
  })
  const joinedMeta = [headerMeta, metaDataString].join('')
  const messageObject = YAML.parse(joinedMeta)
  const parsedMessage = MessageKeySanitizer.parse(messageObject)
  return new PasscardMessage(parsedMessage)
}
