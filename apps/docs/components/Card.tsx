import React from 'react'
import { Stack } from '.'
import { useColorScheme } from '../hooks/useColorScheme'

interface CardProps {
  children: React.ReactNode
  css?: any
}

export const Card = ({ children, css }: CardProps) => {
  const { colorMode } = useColorScheme()
  const isDark = colorMode === 'dark'
  return (
    <Stack
      css={{
        flexDirection: 'column',
        justifyContent: 'center',
        border: '1px solid',
        alignItems: 'center',
        borderColor: isDark ? '$gray700' : '$gray200',
        borderRadius: '$lg',
        padding: '$sm',
        ...css
      }}
    >
      {children}
    </Stack>
  )
}
