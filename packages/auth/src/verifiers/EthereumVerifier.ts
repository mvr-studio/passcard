import { verifyMessage } from 'ethers'
import { Signature } from '../types'

interface VerifyProps {
  message: string
  signature: Signature
}

export const EthereumVerifier = {
  verify({ message, signature }: VerifyProps) {
    return verifyMessage(message, signature.payload as string).toLowerCase() === signature.address
  }
}
