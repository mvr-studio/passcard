import React, { useState } from 'react'
import { useView, Compiler, Editor, Error } from 'react-view'
import dedent from 'dedent'
import presetTypescript from '@babel/preset-typescript'
import darkTheme from 'prism-react-renderer/themes/vsDark'
import lightTheme from 'prism-react-renderer/themes/vsLight'
import { Box, Stack, Text } from '.'
import '@fontsource/jetbrains-mono'
import { useColorScheme } from '../hooks/useColorScheme'
import styles from './editor.module.css'

interface InteractivePlaygroundProps {
  initialCode: string
  scope: Record<string, React.FC<any> | any>
  horizontal?: boolean
  hideLogs?: boolean
}

export const InteractivePlayground = ({
  initialCode,
  scope,
  horizontal = false,
  hideLogs = false
}: InteractivePlaygroundProps) => {
  const [logs, setLogs] = useState<string[]>([])
  const { colorMode } = useColorScheme()
  const isDark = colorMode === 'dark'

  const cardCss = {
    border: '1px solid',
    borderColor: isDark ? '$gray700' : '$gray200',
    padding: '$md',
    borderRadius: '$md'
  }

  const logger = {
    log: (entry: any) => setLogs([JSON.stringify(entry), ...logs])
  }

  const params = useView({
    initialCode: dedent(initialCode),
    scope: { logger, ...scope }
  })

  return (
    <Stack css={{ flexDirection: horizontal ? 'row' : 'column', alignItems: 'stretch', gap: '1rem' }}>
      <Box css={{ ...cardCss }}>
        <Compiler {...params.compilerProps} presets={[presetTypescript]} />
      </Box>
      {!hideLogs && (
        <Stack
          css={{
            ...cardCss,
            overflowY: 'scroll',
            minHeight: '5rem',
            maxHeight: '10rem'
          }}
        >
          <Text css={{ fontSize: '$sm', color: isDark ? '$gray100' : '$gray600' }}>Logs</Text>
          {logs.map((log, i) => (
            <Text key={i} css={{ fontSize: '$sm', color: isDark ? '$gray100' : '$gray600' }}>
              {log}
            </Text>
          ))}
        </Stack>
      )}
      <Box
        css={{
          ...cardCss,
          '@base': { display: 'none' },
          '@md': { display: 'block' },
          padding: 0,
          outline: 0,
          fontFamily: '"JetBrains Mono"',
          fontSize: '14px',
          overflow: 'hidden'
        }}
      >
        <Editor
          {...params.editorProps}
          language="tsx"
          theme={isDark ? darkTheme : lightTheme}
          className={styles.editorOverrides}
        />
      </Box>
      <Error {...params.errorProps} />
    </Stack>
  )
}
