import React from 'react'
import { Box, Container, Flex, Navbar } from '.'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Flex css={{ minHeight: '100vh', flexDirection: 'column' }}>
      <Navbar />
      <Container>{children}</Container>
    </Flex>
  )
}
