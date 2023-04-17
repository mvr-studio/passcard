import React from 'react'
import { Box, Flex } from '.'

interface ContainerProps {
  children: React.ReactNode
}

export const Container = ({ children }: ContainerProps) => {
  return (
    <Flex css={{ justifyContent: 'center' }}>
      <Box css={{ width: '100%', maxWidth: '80rem', padding: '$sm' }}>{children}</Box>
    </Flex>
  )
}
