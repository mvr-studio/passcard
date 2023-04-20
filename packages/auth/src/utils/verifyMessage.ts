import { MinaVerifier } from '../verifiers/MinaVerifier'
import { Blockchain, VerifyMessageProps } from '../types'
import { CardanoVerifier } from '../verifiers/CardanoVerifier'
import { EthereumVerifier } from '../verifiers/EthereumVerifier'
import { SolanaVerifier } from '../verifiers/SolanaVerifier'

export const verifyMessage = ({ blockchain, message, signature }: VerifyMessageProps) => {
  switch (blockchain) {
    case Blockchain.Cardano:
      return CardanoVerifier.verify({
        message,
        signature
      })
    case Blockchain.Mina:
      return MinaVerifier.verify({
        message,
        signature
      })
    case Blockchain.Ethereum:
      return EthereumVerifier.verify({
        message,
        signature
      })
    case Blockchain.Solana:
      return SolanaVerifier.verify({
        signature
      })
  }
}
