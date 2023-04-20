import { Flex, Heading, Text, Container, Button, Stack, Box, SimpleGrid, Image } from './'
import NextLink from 'next/link'

export const HomeHero = () => {
  return (
    <Container
      css={{
        paddingTop: '8rem',
        paddingBottom: '8em',
        paddingLeft: '1rem',
        paddingRight: '1rem'
      }}
    >
      <SimpleGrid
        columns={{ '@base': 1, '@md': 2 }}
        css={{
          // justifyContent: 'center',
          // alignItems: 'center',
          gap: '4rem'
        }}
      >
        <Flex
          css={{
            flex: 2,
            flexDirection: 'column'
          }}
        >
          <Stack>
            <Heading css={{ '@base': { fontSize: '2rem' }, '@md': { fontSize: '3rem' }, fontFamily: 'sora' }}>
              Web3 Authentication
            </Heading>
            <Text css={{ fontFamily: 'sora' }}>Allow your users to sign in with their wallets.</Text>
            <Text css={{ fontFamily: 'sora' }}>
              Integrate Cardano, Mina, Ethereum and Solana auth under 30 minutes.
            </Text>
            <NextLink href="/docs">
              <Button size="lg" css={{ width: 'auto', marginTop: '1rem', borderRadius: '2rem' }}>
                Get started
              </Button>
            </NextLink>
          </Stack>
        </Flex>
        <Flex css={{ gap: '2rem' }}>
          <Box as="img" src="/lace.jpg" alt="Data signing" css={{ height: '28rem', width: '18rem' }} />
          <Box as="img" src="/metamask.jpg" alt="Data signing" css={{ height: '28rem', width: '18rem' }} />
        </Flex>
      </SimpleGrid>
    </Container>
  )
}
