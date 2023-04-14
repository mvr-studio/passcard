import { Box, Container, Flex, Text } from '.'
import dynamic from 'next/dynamic'

const ConnectWalletButton = dynamic(() => import('@passcard/ui').then((mod) => mod.ConnectWalletButton), { ssr: false })

export const Navbar = () => {
  const handleWalletChosen = async (walletName: string) => {
    console.log(walletName)
  }

  return (
    <Box css={{ border: '1px solid', borderColor: '$gray200' }}>
      <Container>
        <Flex css={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Text css={{ fontSize: '1.25rem', fontWeight: '$semibold' }}>Cardfeed</Text>
          <ConnectWalletButton onWalletChosen={handleWalletChosen} buttonProps={{ css: { maxWidth: '12rem' } }} />
        </Flex>
      </Container>
    </Box>
  )
}
