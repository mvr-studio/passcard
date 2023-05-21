import { Container, Heading, Stack, Content, Box, Title } from '.'

export const Article = ({ children, icon, title, description }) => {
  return (
    <Container css={{ marginTop: '6rem', marginBottom: '8rem', maxWidth: '$containerMd' }}>
      <Title description={description}>{title}</Title>
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
