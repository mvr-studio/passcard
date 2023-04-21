import { Card, Container, Flex, Heading, SimpleGrid, Text } from '.'
import { TbTools, TbBrandGithub, TbPlugConnected } from 'react-icons/tb'

export const HomeSelectedFeatures = () => {
  return (
    <Container css={{ paddingTop: '6rem', paddingBottom: '6rem', paddingLeft: '1rem', paddingRight: '1rem' }}>
      <Heading as="h2" css={{ fontFamily: 'sora' }}>
        Selected Features
      </Heading>
      <SimpleGrid columns={{ '@base': 1, '@md': 3 }} css={{ marginTop: '1rem', gap: '1rem' }}>
        <Card css={{ padding: '1rem' }}>
          <Flex css={{ alignItems: 'center', gap: '1rem' }}>
            <TbTools size="1.5rem" />
            <Heading size="lg" css={{ fontFamily: 'sora' }}>
              UI Library
            </Heading>
          </Flex>
          <Text>Ready to help you get started.</Text>
        </Card>
        <Card css={{ padding: '1rem' }}>
          <Flex css={{ alignItems: 'center', gap: '1rem' }}>
            <TbBrandGithub size="1.5rem" />
            <Heading size="lg" css={{ fontFamily: 'sora' }}>
              Open-sourced
            </Heading>
          </Flex>
          <Text>So you know what you get.</Text>
        </Card>
        <Card css={{ padding: '1rem' }}>
          <Flex css={{ alignItems: 'center', gap: '1rem' }}>
            <TbPlugConnected size="1.5rem" />
            <Heading size="lg" css={{ fontFamily: 'sora' }}>
              Integrated
            </Heading>
          </Flex>
          <Text>With tools you actually use.</Text>
        </Card>
      </SimpleGrid>
    </Container>
  )
}
