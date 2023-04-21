import React from 'react'
import { Card, Flex, Image, Text } from '..'
import { trimAddress } from '@passcard/core'

type CardProps = React.ComponentProps<typeof Card>

interface AddressTileProps extends CardProps {
  address: string
}

export const AddressTile = ({ address, ...rest }: AddressTileProps) => {
  return (
    <Card {...rest} css={{ ...rest.css, padding: '$sm', borderRadius: '2rem', maxWidth: '13rem' }}>
      <Flex css={{ alignItems: 'center', gap: '$md' }}>
        <Image gradient={address} css={{ width: '2rem', height: '2rem', borderRadius: '50%' }} />
        <Text css={{ flex: 1 }}>{trimAddress(address)}</Text>
      </Flex>
    </Card>
  )
}
