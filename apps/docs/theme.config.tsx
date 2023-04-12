import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span>Passcard</span>,
  project: {
    link: 'https://github.com/shuding/nextra-docs-template'
  },
  docsRepositoryBase: 'https://github.com/shuding/nextra-docs-template',
  footer: {
    text: 'Created by MVR Studio'
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Passcard'
    }
  }
}

export default config
