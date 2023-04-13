import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span>Passcard</span>,
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
