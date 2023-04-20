import React from 'react'
import { Box, Button, Heading, Stack } from '..'
import { trimAddress, getBech32FromHex } from '@passcard/auth'
import { iconChevronRight } from '../assets/icons'

interface FormatCardanoAddressProps {
  address: string
  index: number
}

interface StepWalletChoiceProps {
  onAddressChosen: (address: string) => Promise<void>
  addresses: string[]
  blockchain: string
}

export const StepAddressChoice = ({ onAddressChosen, addresses, blockchain }: StepWalletChoiceProps) => {
  const formatAddress = ({ address, index }: FormatCardanoAddressProps) => {
    return (
      <>
        <Box as="img" src={iconChevronRight} css={{ width: '1.25rem', height: '1.25rem', filter: 'invert(0.5)' }} />{' '}
        {index + 1}: {trimAddress(address)}
      </>
    )
  }

  return (
    <Stack css={{ gap: '1rem' }}>
      <Heading size="lg">Select Address</Heading>
      {addresses.length > 0 ? (
        <Stack css={{ gap: '0.5rem' }}>
          {addresses.map((address, i) => (
            <Button
              key={address}
              onClick={() => onAddressChosen(address)}
              css={{ width: '100%', justifyContent: 'flex-start' }}
            >
              {blockchain === 'cardano'
                ? formatAddress({ address: getBech32FromHex(address), index: i })
                : formatAddress({ address, index: i })}
            </Button>
          ))}
        </Stack>
      ) : (
        <Box>No addresses found.</Box>
      )}
    </Stack>
  )
}
