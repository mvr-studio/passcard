import { Container, Heading, Stack, Content, Box } from '.'

export const Article = ({ children, icon, title }) => {
  return (
    <Container css={{ marginTop: '6rem', marginBottom: '8rem', maxWidth: '$containerMd' }}>
      <Stack css={{ gap: '1rem' }}>
        <Stack direction="horizontal" css={{ alignItems: 'center', gap: '1rem' }}>
          {icon && <Box as={icon} css={{ width: '2.5rem' }} size="2.5rem" />}
          <Heading>{title}</Heading>
        </Stack>
        <Content css={{ lineHeight: 2, textAlign: 'justify' }}>{children}</Content>
      </Stack>
    </Container>
  )
}
