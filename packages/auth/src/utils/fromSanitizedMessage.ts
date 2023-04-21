import * as YAML from 'yaml'
import { MessageKeySanitizer } from './MessageKeySanitizer'
import { PasscardMessage } from '../PasscardMessage'
import dedent from 'dedent'
import { getHexFromBech32 } from '../'

const domainFromHeader = (header: string) => header.split(' wants')[0]

const parseHeader = (header: string) => {
  const [addressPart, ...rest] = header
    .split('your ')[1]
    .split('\n')
    .filter((el) => el.length)
  const [address] = addressPart.split(' address')
  return [address, ...rest]
}

const getHeaderMeta = ({ domain, blockchain, address, statement }: Record<string, string>) => {
  return dedent`
    Domain: ${domain}
    Blockchain: ${blockchain}
    Address: ${address}
    Statement: ${statement}
  `
}

export const fromSanitizedMessage = (message: string) => {
  const [header, metaDataString] = message.split('Meta:')
  const domain = domainFromHeader(header)
  const [blockchain, rawAddress, statement] = parseHeader(header)
  const headerMeta = getHeaderMeta({
    domain,
    blockchain,
    address: rawAddress,
    statement
  })
  const joinedMeta = [headerMeta, metaDataString].join('')
  const messageObject = YAML.parse(joinedMeta)
  const parsedMessage = MessageKeySanitizer.parse(messageObject)
  const address = parsedMessage.blockchain === 'Cardano' ? getHexFromBech32(rawAddress) : rawAddress
  return new PasscardMessage({ ...parsedMessage, address })
}
