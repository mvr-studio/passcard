import type { AppProps } from 'next/app'
import NextHead from 'next/head'
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
