declare global {
  interface Window {
    cardano: Record<string, any>
  }
}

import { PasscardMessage } from '@passcard/auth'
import { Box, Button, Container, Flex, Text, Stack } from '.'
import dynamic from 'next/dynamic'
import { cardanoBech32FromHex } from '@passcard/auth'
import { toHexMessage } from '@passcard/auth'
import { signIn, useSession, signOut } from 'next-auth/react'

const ConnectWalletButton = dynamic(() => import('@passcard/ui').then((mod) => mod.ConnectWalletButton), { ssr: false })

export const Navbar = () => {
  const session = useSession()
  console.log(session)

  const handleWalletChosen = async (walletName: string) => {
    const walletApi = await window.cardano[walletName].enable()
    const addresses = await walletApi.getUsedAddresses()
    const bech32Address = cardanoBech32FromHex(addresses[0])
    const message = new PasscardMessage({
      domain: 'example.com',
      address: bech32Address,
      statement: 'Sign in',
      version: '0.0.1',
      uri: 'https://example.com/some-page?param=value',
      networkId: 0,
      nonce: 'asdf1234'
    })
    const stringifiedMessage = message.stringify()
    const hexMessage = toHexMessage(stringifiedMessage)
    const signedMessage = await walletApi.signData(addresses[0], hexMessage)
    await signIn('credentials', {
      message: stringifiedMessage,
      signature: JSON.stringify(signedMessage)
    })
  }

  return (
    <Box css={{ border: '1px solid', borderColor: '$gray200' }}>
      <Container>
        <Flex css={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Text css={{ fontSize: '1.25rem', fontWeight: '$semibold' }}>Cardfeed</Text>
          {session.data?.user ? (
            <Stack direction="horizontal">
              <Text>{session.data.user?.name}</Text>
              <Button onClick={() => signOut()}>Sign Out</Button>
            </Stack>
          ) : (
            <ConnectWalletButton onWalletChosen={handleWalletChosen} buttonProps={{ css: { maxWidth: '12rem' } }} />
          )}
        </Flex>
      </Container>
    </Box>
  )
}
