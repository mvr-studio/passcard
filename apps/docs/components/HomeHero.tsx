import { Flex, Heading, Text, Container, Button, Stack, Box, SimpleGrid } from './'
import NextLink from 'next/link'
import { BlurBackground } from './BlurBackground'
import { useColorScheme } from '../hooks/useColorScheme'

export const HomeHero = () => {
  const { colorMode } = useColorScheme()
  const isDark = colorMode === 'dark'
  const boxShadow = `0 0.25rem 2rem rgba(0, 0, 0, ${isDark ? '0.5' : '0.2'})`

  return (
    <Container
      css={{
        paddingTop: '8rem',
        paddingBottom: '8em',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        position: 'relative'
      }}
    >
      <BlurBackground top="-20%" right="20%" />
      <SimpleGrid
        columns={{ '@base': 1, '@md': 2 }}
        css={{
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
            <Text>Allow your users to log in with their wallets.</Text>
            <Text css={{ lineHeight: 2.25 }}>
              Integrate Cardano, Mina, Ethereum and Solana Auth
              <br />
              in under 30 minutes.
            </Text>
            <NextLink href="/docs">
              <Button
                size="lg"
                css={{ width: 'auto', marginTop: '1rem', borderRadius: '2rem' }}
                data-umami-event="Landing:Get started clicked"
              >
                Get started
              </Button>
            </NextLink>
          </Stack>
        </Flex>
        <Flex css={{ gap: '2rem' }}>
          <Box
            as="img"
            src="/lace.jpg"
            alt="Data signing"
            css={{
              height: '28rem',
              width: '18rem',
              borderRadius: '$lg',
              overflow: 'none',
              boxShadow
            }}
          />
          <Box
            as="img"
            src="/metamask.jpg"
            alt="Data signing"
            css={{
              height: '28rem',
              width: '18rem',
              borderRadius: '$lg',
              overflow: 'none',
              boxShadow
            }}
          />
        </Flex>
      </SimpleGrid>
    </Container>
  )
}
