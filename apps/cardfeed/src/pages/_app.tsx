import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import '@/assets/global.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/700.css'
import { Layout } from '@/components'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
