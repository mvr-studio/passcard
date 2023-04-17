import { DocsThemeConfig } from 'nextra-theme-docs'
import NextImage from 'next/image'

const config: DocsThemeConfig = {
  logo: <NextImage src="/logo.svg" alt="Logo" width={64} height={40} />,
  project: {
    link: 'https://github.com/mvr-studio/passcard'
  },
  docsRepositoryBase: 'https://github.com/mvr-studio/passcard/tree/main/apps/docs',
  footer: {
    text: 'Created by MVR Studio'
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s — Passcard'
    }
  }
}

export default config
