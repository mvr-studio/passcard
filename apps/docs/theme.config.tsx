import { DocsThemeConfig } from 'nextra-theme-docs'
import NextImage from 'next/image'
import { Text } from './components'
import { useRouter } from 'next/router'

const year = new Date().getFullYear()

const config: DocsThemeConfig = {
  logo: <NextImage src="/logo.svg" alt="Logo" width={64} height={40} />,
  project: {
    link: 'https://github.com/mvr-studio/passcard'
  },
  docsRepositoryBase: 'https://github.com/mvr-studio/passcard/tree/main/apps/docs',
  footer: {
    text: (
      <Text css={{ textAlign: 'center' }}>
        © {year} Passcard. Created by&nbsp;
        <a href="https://mvr.studio" target="_blank" rel="noopener noreferrer">
          MVR Studio
        </a>
      </Text>
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
