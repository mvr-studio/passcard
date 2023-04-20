export enum Blockchain {
  Cardano = 'Cardano',
  Ethereum = 'Ethereum',
  Mina = 'Mina',
  Solana = 'Solana'
}

export type WalletAddress = string | Uint8Array

export type StringifiedMessage = string

export type MinaSignature = {
  field: string
  scalar: string
}

export type Signature = {
  parsedMessage: string | Uint8Array
  payload: string | Record<string, string> | MinaSignature | Uint8Array
  address: WalletAddress
}

export interface VerifyMessageProps {
  blockchain: Blockchain
  message: StringifiedMessage
  signature: Signature
}

export type PasscardMessageVerifyProps = {
  signature: Signature
  address?: WalletAddress
}

export interface SignMessageProps {
  blockchain: Blockchain
  walletName?: string
  message: string
  address: WalletAddress
}

export type PasscardMessageSignProps = Pick<SignMessageProps, 'walletName'>
