import verifySignature from '@cardano-foundation/cardano-verify-datasignature'

export const CardanoVerifier = {
  verify({ signature, key, message, address }: Record<string, string>) {
    return verifySignature(signature, key, message, address)
  }
}
