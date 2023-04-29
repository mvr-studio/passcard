import { Box, Container, Heading, SimpleGrid, Card, Text, Stack } from '.'
import NextLink from 'next/link'
import { TbSourceCode, TbCircleKey } from 'react-icons/tb'

export const HomePackages = () => {
  return (
    <Box css={{ backgroundColor: 'var(--background-e0)' }}>
      <Container css={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
        <Heading as="h2" css={{ fontFamily: 'sora', '@base': { fontSize: '1.5rem' }, '@md': { fontSize: '1.75rem' } }}>
          First Party Packages
        </Heading>
        <SimpleGrid columns={{ '@base': 1, '@md': 2 }} css={{ gap: '1rem', marginTop: '1rem' }}>
          <NextLink href="/docs">
            <Card css={{ padding: '1rem' }}>
              <Stack direction="horizontal">
                <TbSourceCode size="1.75rem" />
                <Heading size="lg" css={{ fontFamily: 'sora' }}>
                  Passcard UI
                </Heading>
              </Stack>
              <Text css={{ lineHeight: 2 }}>
                Composable React authentication component library with dark mode support.
              </Text>
            </Card>
          </NextLink>
          <NextLink href="/docs">
            <Card css={{ padding: '1rem' }}>
              <Stack direction="horizontal">
                <TbCircleKey size="1.75rem" />
                <Heading size="lg" css={{ fontFamily: 'sora' }}>
                  Passcard Auth
                </Heading>
              </Stack>
              <Text css={{ lineHeight: 2 }}>
                Build authentication messages and verify them on the server side. Includes support for NextAuth and
                Passport.js.
              </Text>
            </Card>
          </NextLink>
        </SimpleGrid>
      </Container>
    </Box>
  )
}
