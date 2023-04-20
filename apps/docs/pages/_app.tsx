import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import '@fontsource/sora/400.css'
import '@fontsource/sora/700.css'
import '../assets/global.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextHead>
        <link rel="shortcut icon" href="/favicon.svg" />
      </NextHead>
      <Component {...pageProps} />
    </>
  )
}
