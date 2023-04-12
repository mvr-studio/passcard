import React from 'react'
import { Button, ConnectWalletModal, useDisclosure } from '../../'

interface ConnectWalletButtonProps {
  buttonProps?: React.ComponentProps<typeof Button>
  children?: React.ReactNode
  onWalletChosen: (walletName: string) => void
}

export const ConnectWalletButton = (props: ConnectWalletButtonProps) => {
  const { isOpen, onOpen, setIsOpen } = useDisclosure()
  return (
    <>
      <ConnectWalletModal isOpen={isOpen} setIsOpen={setIsOpen} onWalletChosen={props.onWalletChosen} />
      <Button onClick={onOpen} {...props.buttonProps}>
        {props.children || 'Connect Wallet'}
      </Button>
    </>
  )
}
