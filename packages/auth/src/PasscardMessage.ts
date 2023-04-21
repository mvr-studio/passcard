import { messageSchema } from './messageSchema'
import { Blockchain, PasscardMessageSignProps, PasscardMessageVerifyProps } from './types'
import { getBech32FromHex } from '.'
import { generateNonce } from './utils/generateNonce'
import { signMessage } from './utils/signMessage'
import { toOutputLiteral } from './utils/toOutputLiteral'
import { verifyMessage } from './utils/verifyMessage'
import { NJSON } from 'next-json'

export interface TMessage {
  /**
   * RFC 4501 DNS authority.
   */
  domain: string

  /**
   * Cardano, Mina, Ethereum, Solana
   */
  blockchain: string

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
      const messageJson = NJSON.parse(rawMessage)
      const parsedMessage = messageSchema.parse(messageJson) as TMessage
      this.message = parsedMessage
    } else {
      const parsedMessage = messageSchema.parse(rawMessage) as TMessage
      this.message = parsedMessage
    }
    this.message.nonce = this.message.nonce || generateNonce()
  }

  async verify({ signature }: PasscardMessageVerifyProps) {
    this.message = messageSchema.parse(this.message) as TMessage
    return verifyMessage({
      blockchain: this.message.blockchain as Blockchain,
      signature: signature,
      message: this.stringify()
    })
  }

  async sign({ walletName }: PasscardMessageSignProps) {
    return signMessage({
      walletName,
      blockchain: this.message.blockchain as Blockchain,
      address: this.message.address,
      message: this.stringify()
    })
  }

  getAddress() {
    return this.message.blockchain === Blockchain[Blockchain.Cardano]
      ? getBech32FromHex(this.message.address)
      : this.message.address
  }

  stringify() {
    const address =
      this.message.blockchain === Blockchain[Blockchain.Cardano]
        ? getBech32FromHex(this.message.address)
        : this.message.address
    return toOutputLiteral({ ...this.message, address })
  }
}
