import React from 'react'
import { Button, ConnectWalletModal, useDisclosure } from '..'
import { ModalMode, OnChosenPayload } from './ConnectWalletModal'

interface ConnectWalletButtonProps {
  mode?: ModalMode
  buttonProps?: React.ComponentProps<typeof Button>
  children?: React.ReactNode
  onChosen: (payload: OnChosenPayload) => Promise<void>
}

export const ConnectWalletButton = (props: ConnectWalletButtonProps) => {
  const { isOpen, onOpen, setIsOpen } = useDisclosure()
  return (
    <>
      <ConnectWalletModal mode={props.mode} isOpen={isOpen} setIsOpen={setIsOpen} onChosen={props.onChosen} />
      <Button onClick={onOpen} {...props.buttonProps}>
        {props.children || 'Connect Wallet'}
      </Button>
    </>
  )
}
