import React, { useState } from 'react'
import { Modal, Button, Box } from '..'
import { StepWalletChoice } from './StepWalletChoice'
import { StepAddressChoice } from './StepAddressChoice'
import { iconX } from '../assets/icons'
import { Blockchain } from '@passcard/core'

export type ModalMode = 'wallet' | 'address'
type ModalStep = 'walletChoice' | 'addressChoice'

export type OnChosenPayload = {
  walletName: string
  address: string | null
  blockchain: Blockchain
}

interface FetchUsedAddressesProps {
  walletName: string
  blockchain: Blockchain
}

export interface OnWalletChosenProps {
  walletName: string
  blockchain: Blockchain
}

interface ConnectWalletModalProps {
  isOpen: boolean
  mode?: ModalMode
  setIsOpen: (isOpen: boolean) => void
  onChosen: (payload: OnChosenPayload) => Promise<void>
  isLoading?: boolean
  setIsLoading?: (value: boolean) => void
  allowedBlockchains?: Blockchain[]
}

export const ConnectWalletModal = ({
  isOpen,
  mode = 'wallet',
  setIsOpen,
  onChosen,
  isLoading = false,
  setIsLoading,
  allowedBlockchains = [Blockchain.Cardano]
}: ConnectWalletModalProps) => {
  const [walletName, setWalletName] = useState<string | null>(null)
  const [blockchain, setBlockchain] = useState<string | null>(null)
  const [step, setStep] = useState<ModalStep>('walletChoice')
  const [addresses, setAddresses] = useState<string[]>([])

  const fetchUsedAddresses = async ({ walletName, blockchain }: FetchUsedAddressesProps) => {
    switch (blockchain) {
      case Blockchain.Cardano:
        const walletApi = await window.cardano[walletName as string].enable()
        return setAddresses(await walletApi.getUsedAddresses())
      case Blockchain.Mina:
        return setAddresses(await (window as any).mina.requestAccounts())
      case Blockchain.Solana:
        const { publicKey } = await (window as any).solana.connect()
        return setAddresses([publicKey.toString()])
      case Blockchain.Ethereum:
        return setAddresses(await (window as any).ethereum.request({ method: 'eth_requestAccounts' }))
    }
  }

  const handleWalletChosen = async ({ walletName, blockchain }: OnWalletChosenProps) => {
    setIsLoading && setIsLoading(true)
    setWalletName(walletName)
    setBlockchain(blockchain)
    if (mode === 'wallet') {
      onChosen({ walletName, address: null, blockchain })
      setIsLoading && setIsLoading(false)
      return setIsOpen(false)
    }
    await fetchUsedAddresses({ walletName, blockchain })
    setIsLoading && setIsLoading(false)
    return setStep('addressChoice')
  }

  const handleAddressChosen = async (address: string) => {
    setIsOpen(false)
    setStep('walletChoice')
    return onChosen({ walletName: walletName as string, address, blockchain: blockchain as Blockchain })
  }

  const handleOpenChange = (nextValue: boolean) => {
    setStep('walletChoice')
    setIsOpen(nextValue)
  }

  return (
    <Modal.Root open={isOpen} onOpenChange={handleOpenChange}>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Close asChild css={{ position: 'absolute', top: '1rem', right: '1.5rem' }}>
            <Button aria-label="Close" size="sm" scheme="ghost" css={{ width: '2rem' }}>
              <Box as="img" src={iconX} css={{ filter: 'invert(0.5)', width: '1.25rem', height: '1.25rem' }} />
            </Button>
          </Modal.Close>
          {step === 'walletChoice' && (
            <StepWalletChoice
              onWalletChosen={handleWalletChosen}
              areWalletsLoading={isLoading}
              setAreWalletsLoading={setIsLoading}
              allowedBlockchains={allowedBlockchains}
            />
          )}
          {step === 'addressChoice' && (
            <StepAddressChoice
              onAddressChosen={handleAddressChosen}
              addresses={addresses}
              blockchain={blockchain as string}
            />
          )}
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  )
}
