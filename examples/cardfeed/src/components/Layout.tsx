import React from 'react'
import { Box, Container, Flex, Navbar, Text } from '.'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Flex css={{ minHeight: '100vh', flexDirection: 'column' }}>
      <Navbar />
      <Box css={{ flex: 1 }}>
        <Container css={{ marginTop: '1rem', padding: '$sm' }}>{children}</Container>
      </Box>
      <Text css={{ textAlign: 'center', padding: '$sm' }}>
        Example app of{' '}
        <a href="https://passcard.mvr.studio/" target="_blank" rel="noreferrer noopener">
          Passcard
        </a>
        .
      </Text>
    </Flex>
  )
}
