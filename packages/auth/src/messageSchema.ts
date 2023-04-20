import { z } from 'zod'
import { Blockchain } from './types'

enum NetworkId {
  Mainnet = 1,
  Testnet = 0
}
const CURRENT_MESSAGE_VERSION = '0.0.1'
const URI_REGEX = /^(?:(?:[^:/?#]+):)?(?:\/\/[^/?#]*)?(?:[^?#]*)(?:\?[^#]*)?(?:#.*)?$/

export const messageSchema = z.object({
  domain: z.string().regex(/[^#?]*/),
  blockchain: z.nativeEnum(Blockchain),
  address: z.string(),
  statement: z.string().optional(),
  version: z.literal(CURRENT_MESSAGE_VERSION),
  uri: z.string().regex(URI_REGEX),
  networkId: z.nativeEnum(NetworkId),
  nonce: z.string().min(8),
  issuedAt: z.string().datetime().optional(),
  expirationTime: z.string().datetime().optional(),
  externalId: z.string().optional()
})
