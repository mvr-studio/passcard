import React from 'react'
import { Box, Heading, SimpleGrid, Stack, WalletTile } from '..'
import { useWallets } from '../hooks/useWallets'
import { Blockchain } from '@passcard/core'
import { OnWalletChosenProps } from './ConnectWalletModal'

interface StepWalletChoiceProps {
  onWalletChosen: ({ walletName, blockchain }: OnWalletChosenProps) => Promise<void>
  setAreWalletsLoading?: (value: boolean) => void
  allowedBlockchains: Blockchain[]
}

export const StepWalletChoice = ({
  onWalletChosen,
  setAreWalletsLoading,
  allowedBlockchains
}: StepWalletChoiceProps) => {
  const { wallets } = useWallets({ setAreWalletsLoading, allowedBlockchains })

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
              blockchain={wallet.blockchain}
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
