import { Box, Card, Container, Flex, Heading, SimpleGrid, Stack, Text } from '.'
import { BlurBackground } from './BlurBackground'

const Tile = ({ imgSrc, name }: Record<string, string>) => {
  return (
    <Card>
      <Box as="img" src={imgSrc} alt={name} css={{ width: '2.5rem' }} />
      <Text css={{ textAlign: 'center', fontWeight: '$semibold' }}>{name}</Text>
    </Card>
  )
}

export const HomeSupportedPlatforms = () => {
  return (
    <Container
      css={{
        position: 'relative',
        paddingTop: '6rem',
        paddingBottom: '6rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        overflow: 'none'
      }}
    >
      <BlurBackground left="-10%" bottom="0" />
      <Flex css={{ '@base': { flexDirection: 'column' }, '@md': { flexDirection: 'row' }, gap: '2rem' }}>
        <Heading as="h2" css={{ flex: 2, fontFamily: 'sora' }}>
          Supported Platforms
        </Heading>
        <SimpleGrid columns={{ '@base': 3, '@md': 4 }} css={{ flex: 3, gap: '1rem' }}>
          <Tile imgSrc="/lace.svg" name="Lace" />
          <Tile imgSrc="/yoroi.svg" name="Yoroi" />
          <Tile imgSrc="/metamask.svg" name="MetaMask" />
          <Tile imgSrc="/brave.svg" name="Brave Wallet" />
          <Tile imgSrc="/opera.svg" name="Opera Wallet" />
          <Tile imgSrc="/auro.svg" name="Auro Wallet" />
          <Tile imgSrc="/phantom.svg" name="Phantom" />
          <Tile imgSrc="/coinbase.svg" name="Coinbase" />
        </SimpleGrid>
      </Flex>
      <Text css={{ textAlign: 'right', marginTop: '2rem' }}>And many more</Text>
    </Container>
  )
}
