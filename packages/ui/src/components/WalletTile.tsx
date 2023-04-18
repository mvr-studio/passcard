import React from 'react'
import { AspectRatio, Flex, Box, Text } from '..'

type WalletName = string

interface WalletTileProps {
  icon: string
  name: string
  walletName: WalletName
  blockchain: string
  onClick: ({ walletName, blockchain }: Record<string, string>) => void
}

export const WalletTile = ({ icon, name, walletName, blockchain, onClick }: WalletTileProps) => {
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
        onClick={() => onClick({ walletName, blockchain })}
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
