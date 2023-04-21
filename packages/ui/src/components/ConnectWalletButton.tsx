import React, { useState } from 'react'
import { Button, ConnectWalletModal, useDisclosure, Spinner } from '..'
import { ModalMode, OnChosenPayload } from './ConnectWalletModal'
import { Blockchain } from '@passcard/core'

interface ConnectWalletButtonProps {
  mode?: ModalMode
  buttonProps?: React.ComponentProps<typeof Button>
  children?: React.ReactNode
  onChosen: (payload: OnChosenPayload) => Promise<void>
  allowedBlockchains?: Blockchain[]
}

export const ConnectWalletButton = (props: ConnectWalletButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { isOpen, onOpen, setIsOpen } = useDisclosure()
  return (
    <>
      <ConnectWalletModal
        mode={props.mode}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onChosen={props.onChosen}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        allowedBlockchains={props.allowedBlockchains}
      />
      <Button onClick={onOpen} {...props.buttonProps}>
        {isLoading ? (
          <Spinner css={{ width: '1.5rem', height: '1.5rem', '&:before': { borderWidth: '2px' } }} />
        ) : (
          props.children || 'Connect Wallet'
        )}
      </Button>
    </>
  )
}
