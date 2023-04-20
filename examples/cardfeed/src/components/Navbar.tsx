declare global {
  interface Window {
    cardano: Record<string, any>
  }
}

import { Blockchain, PasscardMessage, stringifySignature, trimAddress } from '@passcard/auth'
import { Box, Button, Container, Flex, Text, Stack } from '.'
import dynamic from 'next/dynamic'
import { signIn, useSession, signOut } from 'next-auth/react'
import { useMemo } from 'react'
import { OnChosenPayload } from '@passcard/ui'

const ConnectWalletButton = dynamic(() => import('@passcard/ui').then((mod) => mod.ConnectWalletButton), { ssr: false })

export const Navbar = () => {
  const session = useSession()
  const address = session.data?.user.address

  const shortAddress = useMemo(() => trimAddress && trimAddress(address as string), [address])

  const handleWalletChosen = async ({ walletName, address, blockchain }: OnChosenPayload) => {
    const messageRequest = await fetch(`/api/passcard?address=${address}&blockchain=${blockchain}`)
    const messageData = await messageRequest.json()
    const message = new PasscardMessage(messageData.message)
    const signature = await message.sign({ walletName })
    await signIn('credentials', {
      message: message.stringify(),
      signature: stringifySignature(signature)
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
              allowedBlockchains={[Blockchain.Cardano, Blockchain.Ethereum, Blockchain.Mina, Blockchain.Solana]}
            />
          )}
        </Flex>
      </Container>
    </Box>
  )
}
