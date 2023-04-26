import { getCssText } from '../components'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
        <script async src="https://umami.mvr.studio/script.js" data-website-id="69299e5b-0ef5-4cd0-98f9-c59e9a02c33a" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
