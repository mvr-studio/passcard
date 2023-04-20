import verifySignature from '@cardano-foundation/cardano-verify-datasignature'
import { getBech32FromHex } from '../utils/cardano'
import { Signature } from '../types'

interface CardanoVerifierProps {
  message: string
  signature: Signature
}

export const CardanoVerifier = {
  verify({ message, signature }: CardanoVerifierProps) {
    const bech32Address = getBech32FromHex(signature.address as string)
    const signaturePayload = signature.payload as Record<string, string>
    return verifySignature(signaturePayload.signature, signaturePayload.key, message, bech32Address)
  }
}
