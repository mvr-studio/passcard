import { DocsThemeConfig } from 'nextra-theme-docs'
import NextImage from 'next/image'
import { Button, Stack, Text } from './components'
import { useRouter } from 'next/router'

const year = new Date().getFullYear()

const config: DocsThemeConfig = {
  logo: <NextImage src="/logo.svg" alt="Logo" width={64} height={40} />,
  head: '',
  chat: {
    link: 'https://discord.gg/5x7WHndvVE'
  },
  project: {
    link: 'https://github.com/mvr-studio/passcard'
  },
  docsRepositoryBase: 'https://github.com/mvr-studio/passcard/tree/main/apps/docs',
  footer: {
    text: (
      <Stack css={{ justifyContent: 'center', alignItems: 'center', gap: '1.5rem' }}>
        <a href="mailto:passcard@mvr.studio">passcard@mvr.studio</a>
        <Text css={{ textAlign: 'center' }}>
          © {year} Passcard. Created by&nbsp;
          <a href="https://mvr.studio" target="_blank" rel="noopener noreferrer">
            MVR Studio
          </a>
        </Text>
      </Stack>
    )
  },
  useNextSeoProps() {
    const { asPath } = useRouter()
    if (asPath !== '/') {
      return {
        titleTemplate: '%s — Passcard'
      }
    }
    return {
      titleTemplate: 'Web3 Authentication — Passcard'
    }
  }
}

export default config
