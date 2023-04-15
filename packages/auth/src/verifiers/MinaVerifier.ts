import MinaClient from 'mina-signer'

type SignatureJson = {
  field: string
  scalar: string
}

interface VerifyProps {
  data: string
  signature: SignatureJson
  publicKey: string
}

export const MinaVerifier = {
  verify({ data, signature, publicKey }: VerifyProps) {
    const client = new MinaClient({ network: 'mainnet' })
    return client.verifyMessage({ data, signature, publicKey })
  }
}
