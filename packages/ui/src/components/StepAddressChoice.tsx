import React from 'react'
import { Box, Button, Heading, Stack } from '..'
import { trimAddress } from '@passcard/auth'

interface StepWalletChoiceProps {
  onAddressChosen: (address: string) => Promise<void>
  addresses: string[]
}

export const StepAddressChoice = ({ onAddressChosen, addresses }: StepWalletChoiceProps) => {
  return (
    <Stack css={{ gap: '1rem' }}>
      <Heading size="lg">Select Address</Heading>
      {addresses.length > 0 ? (
        <Stack css={{ gap: '0.5rem' }}>
          {addresses.map((address) => (
            <Button key={address} scheme="ghost" onClick={() => onAddressChosen(address)} css={{ width: '100%' }}>
              {trimAddress(address)}
            </Button>
          ))}
        </Stack>
      ) : (
        <Box>No addresses found.</Box>
      )}
    </Stack>
  )
}
