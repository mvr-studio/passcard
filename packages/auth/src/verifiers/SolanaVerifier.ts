import nacl from 'tweetnacl'
import { Signature } from '../types'

interface VerifyProps {
  signature: Signature
}

export const SolanaVerifier = {
  verify({ signature }: VerifyProps) {
    return nacl.sign.detached.verify(
      signature.parsedMessage as Uint8Array,
      signature.payload as Uint8Array,
      signature.address as Uint8Array
    )
  }
}
