import React, { useState } from 'react'
import { useView, Compiler, Editor, Error } from 'react-view'
import dedent from 'dedent'
import presetTypescript from '@babel/preset-typescript'
import vsDark from 'prism-react-renderer/themes/vsDark'
import vsLight from 'prism-react-renderer/themes/vsLight'
import { Box, Stack, Text } from '.'
import '@fontsource/jetbrains-mono'
import { useColorScheme } from '../hooks/useColorScheme'
import styles from './editor.module.css'

interface InteractivePlaygroundProps {
  initialCode: string
  scope: Record<string, React.FC<any>>
}

export const InteractivePlayground = ({ initialCode, scope }: InteractivePlaygroundProps) => {
  const [logs, setLogs] = useState<string[]>([])
  const { colorMode } = useColorScheme()
  const isDark = colorMode === 'dark'
  console.log(colorMode)

  const logger = {
    log: (entry: any) => setLogs([JSON.stringify(entry), ...logs])
  }

  const params = useView({
    initialCode: dedent(initialCode),
    scope: { logger, ...scope }
  })

  return (
    <Stack css={{ alignItems: 'stretch' }}>
      <Compiler {...params.compilerProps} presets={[presetTypescript]} />
      <Stack
        css={{
          overflowY: 'scroll',
          border: '1px solid',
          borderColor: isDark ? '$gray700' : '$gray200',
          padding: '$sm',
          borderRadius: '$md',
          height: '5rem'
        }}
      >
        <Text css={{ fontSize: '$sm', color: isDark ? '$gray100' : '$gray600' }}>Logs</Text>
        {logs.map((log, i) => (
          <Text key={i} css={{ fontSize: '$sm', color: isDark ? '$gray100' : '$gray600' }}>
            {log}
          </Text>
        ))}
      </Stack>
      <Box
        css={{
          outline: 0,
          fontFamily: '"JetBrains Mono"',
          border: '1px solid',
          borderColor: isDark ? '$gray700' : '$gray200',
          borderRadius: '$md',
          overflow: 'hidden'
        }}
      >
        <Editor
          {...params.editorProps}
          language="tsx"
          theme={isDark ? vsDark : vsLight}
          className={styles.editorOverrides}
        />
      </Box>
      <Error {...params.errorProps} />
    </Stack>
  )
}
