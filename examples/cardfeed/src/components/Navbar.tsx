declare global {
  interface Window {
    cardano: Record<string, any>
  }
}

import { Blockchain, PasscardMessage, stringifySignature } from '@passcard/auth'
import { Box, Container, Flex, Text, Popover, Button } from '.'
import dynamic from 'next/dynamic'
import { signIn, useSession, signOut } from 'next-auth/react'
import { AddressTile, OnChosenPayload } from '@passcard/ui'
import { TbChevronDown } from 'react-icons/tb'

const ConnectWalletButton = dynamic(() => import('@passcard/ui').then((mod) => mod.ConnectWalletButton), { ssr: false })

export const Navbar = () => {
  const session = useSession()
  const address = session.data?.user.address

  const handleWalletChosen = async ({ walletName, address, blockchain }: OnChosenPayload) => {
    const messageRequest = await fetch(`/api/passcard?address=${address}&blockchain=${blockchain}`)
    const messageData = await messageRequest.json()
    const message = new PasscardMessage(messageData.message)
    const signature = await message.sign({ walletName })
    console.log('>>>MESSAGE', message.stringify())
    console.log('>>>SIGNATURE', stringifySignature(signature))
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
            <Flex css={{ width: 'auto', gap: '$sm' }}>
              <AddressTile address={address!} css={{ flex: 1 }} />
              <Popover content={<Button onClick={() => signOut()}>Sign Out</Button>}>
                <Button
                  scheme="outline"
                  css={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '100%',
                    width: '3.25rem',
                    padding: 0
                  }}
                >
                  <TbChevronDown size="1.5rem" />
                </Button>
              </Popover>
            </Flex>
          ) : (
            <ConnectWalletButton
              mode="address"
              onChosen={handleWalletChosen}
              buttonProps={{ scheme: 'outline', css: { width: 'auto', whiteSpace: 'nowrap' } }}
              allowedBlockchains={[Blockchain.Cardano, Blockchain.Ethereum, Blockchain.Mina, Blockchain.Solana]}
            />
          )}
        </Flex>
      </Container>
    </Box>
  )
}
