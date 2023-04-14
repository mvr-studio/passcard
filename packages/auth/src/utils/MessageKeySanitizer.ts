const KEY_MAP = {
  domain: 'Domain',
  address: 'Address',
  statement: 'Statement',
  version: 'Version',
  uri: 'URI',
  networkId: 'Network ID',
  nonce: 'Nonce',
  issuedAt: 'Issued At',
  expirationTime: 'Expiration Time',
  externalId: 'External ID'
}

const VALUE_MAP = Object.fromEntries(Object.entries(KEY_MAP).map(([key, value]) => [value, key]))

export const MessageKeySanitizer = {
  stringify(value: any) {
    return Object.fromEntries(Object.entries(value).map(([key, value]) => [KEY_MAP[key], value]))
  },
  parse(value: any) {
    return Object.fromEntries(Object.entries(value).map(([key, value]) => [VALUE_MAP[key], value]))
  }
}
