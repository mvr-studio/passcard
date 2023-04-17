import React, { useState } from 'react'
import { Modal, Button } from '..'
import { StepWalletChoice } from './StepWalletChoice'
import { StepAddressChoice } from './StepAddressChoice'

export type ModalMode = 'wallet' | 'address'
type ModalStep = 'walletChoice' | 'addressChoice'

export type OnChosenPayload = {
  walletName: string
  address: string | null
}

interface ConnectWalletModalProps {
  isOpen: boolean
  mode?: ModalMode
  setIsOpen: (isOpen: boolean) => void
  onChosen: (payload: OnChosenPayload) => Promise<void>
  setIsLoading: (value: boolean) => void
}

export const ConnectWalletModal = ({
  isOpen,
  mode = 'wallet',
  setIsOpen,
  onChosen,
  setIsLoading
}: ConnectWalletModalProps) => {
  const [walletName, setWalletName] = useState<string | null>(null)
  const [step, setStep] = useState<ModalStep>('walletChoice')
  const [addresses, setAddresses] = useState<string[]>([])

  const fetchUsedAddresses = async ({ walletName }: { walletName: string }) => {
    const walletApi = await window.cardano[walletName as string].enable()
    return setAddresses(await walletApi.getUsedAddresses())
  }

  const handleWalletChosen = async (walletName: string) => {
    setIsLoading(true)
    setWalletName(walletName)
    if (mode === 'wallet') {
      onChosen({ walletName, address: null })
      setIsLoading(false)
      return setIsOpen(false)
    }
    await fetchUsedAddresses({ walletName })
    setIsLoading(false)
    return setStep('addressChoice')
  }

  const handleAddressChosen = async (address: string) => {
    setIsOpen(false)
    setStep('walletChoice')
    return onChosen({ walletName: walletName as string, address })
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
              𝗫
            </Button>
          </Modal.Close>
          {step === 'walletChoice' && (
            <StepWalletChoice onWalletChosen={handleWalletChosen} setAreWalletsLoading={setIsLoading} />
          )}
          {step === 'addressChoice' && (
            <StepAddressChoice onAddressChosen={handleAddressChosen} addresses={addresses} />
          )}
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  )
}
