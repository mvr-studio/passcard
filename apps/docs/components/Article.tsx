import { Container, Heading, Stack, Content } from '.'

export const Article = ({ children, title }) => {
  return (
    <Container css={{ marginTop: '6rem', marginBottom: '8rem', maxWidth: '$containerMd' }}>
      <Stack css={{ gap: '1rem' }}>
        <Heading>{title}</Heading>
        <Content css={{ lineHeight: 2, textAlign: 'justify' }}>{children}</Content>
      </Stack>
    </Container>
  )
}
