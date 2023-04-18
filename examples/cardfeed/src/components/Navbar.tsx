declare global {
  interface Window {
    cardano: Record<string, any>
  }
}

import { PasscardMessage, trimAddress } from '@passcard/auth'
import { Box, Button, Container, Flex, Text, Stack } from '.'
import dynamic from 'next/dynamic'
import { cardanoBech32FromHex } from '@passcard/auth'
import { toHexMessage } from '@passcard/auth'
import { signIn, useSession, signOut } from 'next-auth/react'
import { useMemo } from 'react'
import { OnChosenPayload } from '@passcard/ui'

const ConnectWalletButton = dynamic(() => import('@passcard/ui').then((mod) => mod.ConnectWalletButton), { ssr: false })

export const Navbar = () => {
  const session = useSession()
  const address = session.data?.user.address

  const shortAddress = useMemo(() => trimAddress && trimAddress(address as string), [address])

  const handleWalletChosen = async ({ walletName, address, blockchain }: OnChosenPayload) => {
    if (blockchain !== 'cardano') return alert('Sorry, for now only Cardano works 😅')
    const walletApi = await window.cardano[walletName].enable()
    const bech32Address = cardanoBech32FromHex(address!)
    const message = new PasscardMessage({
      domain: 'cardfeed.netlify.app',
      address: bech32Address,
      statement: 'Sign in',
      version: '0.0.1',
      uri: 'https://example.com/some-page?param=value',
      networkId: 0,
      nonce: 'asdf1234'
    })
    const stringifiedMessage = message.stringify()
    const hexMessage = toHexMessage(stringifiedMessage)
    const signedMessage = await walletApi.signData(address, hexMessage)
    await signIn('credentials', {
      message: stringifiedMessage,
      signature: JSON.stringify(signedMessage)
    })
  }

  return (
    <Box css={{ border: '1px solid', borderColor: '$gray200' }}>
      <Container css={{ padding: '$sm' }}>
        <Flex css={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Text css={{ fontSize: '1.25rem', fontWeight: '$semibold' }}>Cardfeed</Text>
          {session.data?.user ? (
            <Stack direction="horizontal" css={{ alignItems: 'center' }}>
              <Text css={{ textAlign: 'right' }}>{shortAddress}</Text>
              <Button onClick={() => signOut()} css={{ width: 'auto', whiteSpace: 'nowrap' }}>
                Sign Out
              </Button>
            </Stack>
          ) : (
            <ConnectWalletButton
              mode="address"
              onChosen={handleWalletChosen}
              buttonProps={{ css: { width: 'auto', whiteSpace: 'nowrap' } }}
              allowedBlockchains={['cardano', 'ethereum', 'mina', 'solana']}
            />
          )}
        </Flex>
      </Container>
    </Box>
  )
}
