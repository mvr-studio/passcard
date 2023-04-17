import React from 'react'
import { AspectRatio, Flex, Box, Text } from '..'

type WalletName = string

interface WalletTileProps {
  icon: string
  name: string
  walletName: WalletName
  onClick: (walletName: WalletName) => void
}

export const WalletTile = ({ icon, name, walletName, onClick }: WalletTileProps) => {
  return (
    <AspectRatio ratio={1}>
      <Flex
        css={{
          border: '1px solid',
          borderColor: 'var(--default-input-border-default)',
          cursor: 'pointer',
          height: '100%',
          borderRadius: '$md',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onClick={() => onClick(walletName)}
      >
        <Box as="img" src={icon} css={{ height: '2rem' }} />
        <Text
          css={{
            textAlign: 'center',
            textTransform: 'capitalize',
            marginTop: '$xs',
            fontSize: '$sm',
            fontWeight: '$semibold'
          }}
        >
          {name}
        </Text>
      </Flex>
    </AspectRatio>
  )
}
