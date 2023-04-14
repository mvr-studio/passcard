import { messageSchema } from './messageSchema'
import { generateNonce } from './utils/generateNonce'
import { toOutputLiteral } from './utils/toOutputLiteral'

export interface TMessage {
  /**
   * RFC 4501 DNS authority.
   */
  domain: string

  /**
   * Wallet address
   * CIP-0008 compliant BECH32 (BIP-173)
   */
  address: string

  /**
   * Assertion that the user will sign.
   * Human readable string
   */
  statement?: string

  /**
   * Current version of the message user is signing.
   * Semantic versioning.
   */
  version: string

  /**
   * The subject of the signing.
   * RFC 3986 URI
   */
  uri: string

  /**
   * Cardano network ID
   * 0 or 1
   */
  networkId: number

  /**
   * Randomized token used to prevent replay attacks.
   * CSRF token
   */
  nonce: string

  /**
   * Datetime string of the current time
   * ISO 8601
   */
  issuedAt?: string

  /**
   * Datetime string that, if present, indicates when the signed authentication message is no longer valid
   * ISO 8601
   */
  expirationTime?: string

  /**
   * System-specific identifier that may be used to uniquely refer to the sign-in request
   */
  externalId?: string
}

export class PasscardMessage {
  message: TMessage

  constructor(rawMessage: string | Partial<TMessage>) {
    if (typeof rawMessage === 'string') {
      const messageJson = JSON.parse(rawMessage)
      const parsedMessage = messageSchema.parse(messageJson) as TMessage
      this.message = parsedMessage
    } else {
      const parsedMessage = messageSchema.parse(rawMessage) as TMessage
      this.message = parsedMessage
    }
    this.message.nonce = this.message.nonce || generateNonce()
  }

  verify() {
    this.message = messageSchema.parse(this.message) as TMessage
  }

  stringify() {
    return toOutputLiteral(this.message)
  }
}
