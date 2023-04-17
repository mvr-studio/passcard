import React, { useEffect } from 'react'
import { Box, Heading, SimpleGrid, Stack, WalletTile } from '..'
import { useCardanoWallets } from '@mvr-studio/use-dapp-connector'

interface StepWalletChoiceProps {
  onWalletChosen: (walletName: string) => Promise<void>
  setAreWalletsLoading: (value: boolean) => void
}

export const StepWalletChoice = ({ onWalletChosen, setAreWalletsLoading }: StepWalletChoiceProps) => {
  const { fetchWallets, wallets } = useCardanoWallets()

  useEffect(() => {
    setAreWalletsLoading(true)
    setTimeout(() => {
      fetchWallets()
      setAreWalletsLoading(false)
    }, 1000)
  }, [])

  return (
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
    </Stack>
  )
}
