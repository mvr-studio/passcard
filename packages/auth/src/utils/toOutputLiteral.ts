import dedent from 'dedent'
import { TMessage } from '../PasscardMessage'
import { MessageKeySanitizer } from '../utils/MessageKeySanitizer'
import * as YAML from 'yaml'

const getRequestingPartyLiteral = ({ domain, address, blockchain }: Record<string, string>) => dedent`
  ${domain} wants you to sign data with your ${blockchain} address:
  ${address}
`

export const toOutputLiteral = (data: TMessage) => {
  const sanitizedMessage = MessageKeySanitizer.stringify(data)
  const yamlProperties = YAML.stringify(sanitizedMessage, [
    'URI',
    'Version',
    'Network ID',
    'Nonce',
    'Issued At',
    'Expiration Time',
    'External ID'
  ])
  const requestingParty = getRequestingPartyLiteral({
    domain: data.domain,
    address: data.address,
    blockchain: data.blockchain
  })
  return dedent`
    ${requestingParty}

    ${data.statement}

    Meta:
    ${yamlProperties}
  `
}
