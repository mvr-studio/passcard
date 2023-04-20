import MinaClient from 'mina-signer'
import { MinaSignature, Signature } from '../types'

interface VerifyProps {
  message: string
  signature: Signature
}

export const MinaVerifier = {
  verify({ signature }: VerifyProps) {
    const client = new MinaClient({ network: 'mainnet' })
    return client.verifyMessage({
      data: signature.parsedMessage as string,
      signature: signature.payload as MinaSignature,
      publicKey: signature.address as string
    })
  }
}
