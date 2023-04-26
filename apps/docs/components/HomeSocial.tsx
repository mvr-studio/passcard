import NextLink from 'next/link'
import { Box, Button, Card, Container, Heading, SimpleGrid, Stack, Text, Link } from '.'
import { TbBrandTwitter, TbBrandDiscord, TbBrandGithub, TbArticle } from 'react-icons/tb'

const SocialButton = ({ Icon, children, href }) => {
  return (
    <Box as="a" href={href} target="_blank" rel="noreferrer noopener">
      <Button scheme="ghost" css={{ gap: '0.5rem' }}>
        <Box css={{ width: 'auto' }}>
          <Icon size="1.25rem" />
        </Box>
        <Text css={{ width: 'auto' }}>{children}</Text>
      </Button>
    </Box>
  )
}

export const HomeSocial = () => {
  return (
    <Box css={{ backgroundColor: 'var(--background-e0)' }}>
      <Container css={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
        <Heading>Stay Connected</Heading>
        <SimpleGrid columns={{ '@base': 1, '@md': 2 }} css={{ marginTop: '1rem', gap: '1rem' }}>
          <Card css={{ padding: '1rem' }}>
            <Heading size="lg">Social</Heading>
            <Text>Get help and stay connected.</Text>
            <Stack direction="horizontal" css={{ marginTop: '1rem' }}>
              <SocialButton Icon={TbBrandTwitter} href="https://twitter.com/passcard_dev">
                Twitter
              </SocialButton>
              <SocialButton Icon={TbBrandDiscord} href="https://discord.gg/VuKGCB3g">
                Discord
              </SocialButton>
              <SocialButton Icon={TbBrandGithub} href="https://github.com/mvr-studio/passcard">
                GitHub
              </SocialButton>
            </Stack>
          </Card>
          <Card css={{ padding: '1rem' }}>
            <Heading size="lg">Resources</Heading>
            <Stack css={{ marginTop: '1rem' }}>
              <Link
                as={NextLink}
                href="learn/what-is-passcard"
                css={{ display: 'flex', ąlignItems: 'center', textDecoration: 'underline', gap: '0.5rem' }}
              >
                <TbArticle size="1.5rem" />
                <Text>What is Passcard?</Text>
              </Link>
              <Link
                as={NextLink}
                href="learn/caip-122-sign-in-with-x"
                css={{ display: 'flex', ąlignItems: 'center', textDecoration: 'underline', gap: '0.5rem' }}
              >
                <TbArticle size="1.5rem" />
                <Text>CAIP-122 Sign in with X</Text>
              </Link>
              <Link
                as={NextLink}
                href="learn/wallet-auth-importance"
                css={{ display: 'flex', ąlignItems: 'center', textDecoration: 'underline', gap: '0.5rem' }}
              >
                <TbArticle size="1.5rem" />
                <Text>The importance of Wallet based authentication</Text>
              </Link>
            </Stack>
          </Card>
        </SimpleGrid>
      </Container>
    </Box>
  )
}
