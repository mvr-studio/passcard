import React, { useEffect } from 'react'
import { useCardanoWallets } from '@mvr-studio/use-dapp-connector'
import { Modal, Button, Heading, Stack, SimpleGrid, WalletTile, Box } from '../../'

interface ConnectWalletModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  onWalletChosen: (walletName: string) => void
}

export const ConnectWalletModal = ({ isOpen, setIsOpen, onWalletChosen }: ConnectWalletModalProps) => {
  const { fetchWallets, wallets } = useCardanoWallets()

  useEffect(() => {
    setTimeout(() => fetchWallets(), 1000)
  }, [])

  return (
    <Modal.Root open={isOpen} onOpenChange={setIsOpen}>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content>
          <Stack css={{ gap: '1rem' }}>
            <Heading size="lg">Connect Wallet</Heading>
            {wallets.length > 0 ? (
              <SimpleGrid columns={{ '@base': 5 } as any} css={{ gap: '$sm' }}>
                {wallets.map((wallet) => (
                  <WalletTile
                    key={wallet.walletName}
                    name={wallet.name}
                    walletName={wallet.walletName}
                    icon={wallet.icon}
                    onClick={onWalletChosen}
                  />
                ))}
              </SimpleGrid>
            ) : (
              <Box>No compatible wallets found.</Box>
            )}
            <Modal.Close asChild css={{ position: 'absolute', top: '1rem', right: '1.5rem' }}>
              <Button aria-label="Close" size="sm" scheme="ghost" css={{ width: '2rem' }}>
                𝗫
              </Button>
            </Modal.Close>
          </Stack>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  )
}
