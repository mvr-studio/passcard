import { Flex, Heading, Text, Container, Button, Stack, Grid, Box, AspectRatio } from './'
import dynamic from 'next/dynamic'
import NextLink from 'next/link'
import { BlurBackground } from './BlurBackground'

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false })

export const HomeHero = () => {
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
      <Grid css={{ '@base': { gridTemplateColumns: '1fr' }, '@md': { gridTemplateColumns: '2fr 3fr' }, gap: '4rem' }}>
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
              Integrate Cardano, Mina, Ethereum
              <br />
              and Solana Auth in under 30 minutes.
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
        <Box
          css={{
            width: 'auto',
            height: 'auto'
          }}
        >
          <AspectRatio ratio={3} css={{ height: '20rem' }}>
            <ReactPlayer
              controls
              light="/light.png"
              playing
              url="/intro.mp4"
              style={{ borderRadius: '0.5rem', overflow: 'hidden' }}
              width="100%"
            />
          </AspectRatio>
        </Box>
      </Grid>
    </Container>
  )
}
