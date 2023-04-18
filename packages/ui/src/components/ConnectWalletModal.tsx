import React, { useState } from 'react'
import { Modal, Button, Box } from '..'
import { StepWalletChoice } from './StepWalletChoice'
import { StepAddressChoice } from './StepAddressChoice'
import { iconX } from '../assets/icons'

export type ModalMode = 'wallet' | 'address'
type ModalStep = 'walletChoice' | 'addressChoice'

export type OnChosenPayload = {
  walletName: string
  address: string | null
  blockchain: string
}

interface ConnectWalletModalProps {
  isOpen: boolean
  mode?: ModalMode
  setIsOpen: (isOpen: boolean) => void
  onChosen: (payload: OnChosenPayload) => Promise<void>
  setIsLoading?: (value: boolean) => void
  allowedBlockchains?: string[]
}

export const ConnectWalletModal = ({
  isOpen,
  mode = 'wallet',
  setIsOpen,
  onChosen,
  setIsLoading,
  allowedBlockchains = ['cardano']
}: ConnectWalletModalProps) => {
  const [walletName, setWalletName] = useState<string | null>(null)
  const [blockchain, setBlockchain] = useState<string | null>(null)
  const [step, setStep] = useState<ModalStep>('walletChoice')
  const [addresses, setAddresses] = useState<string[]>([])

  const fetchUsedAddresses = async ({ walletName, blockchain }: Record<string, string>) => {
    switch (blockchain) {
      case 'cardano':
        const walletApi = await window.cardano[walletName as string].enable()
        return setAddresses(await walletApi.getUsedAddresses())
      case 'mina':
        return setAddresses(await (window as any).mina.requestAccounts())
      case 'solana':
        const { publicKey } = await (window as any).solana.connect()
        return setAddresses([publicKey.toString()])
      case 'ethereum':
        return setAddresses(await (window as any).ethereum.enable())
    }
  }

  const handleWalletChosen = async ({ walletName, blockchain }: Record<string, string>) => {
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
    return onChosen({ walletName: walletName as string, address, blockchain: blockchain as string })
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
