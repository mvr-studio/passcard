import { Card, Container, Flex, Heading, SimpleGrid, Text } from '.'
import { BlurBackground } from './BlurBackground'
import NextImage from 'next/image'

const Tile = ({ imgSrc, name }: Record<string, string>) => {
  return (
    <Card>
      <NextImage src={imgSrc} width={32} height={32} alt={name} />
      <Text
        css={{
          textAlign: 'center',
          fontWeight: '$semibold',
          '@base': { fontSize: '0.75rem' },
          '@md': { fontSize: '1rem' }
        }}
      >
        {name}
      </Text>
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
        <Heading
          as="h2"
          css={{ flex: 2, fontFamily: 'sora', '@base': { fontSize: '1.5rem' }, '@md': { fontSize: '1.75rem' } }}
        >
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
