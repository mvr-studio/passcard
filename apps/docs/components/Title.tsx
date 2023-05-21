import Head from 'next/head'
import { useRouter } from 'next/router'

interface TitleProps {
  children: string
  description?: string
}

export const Title = ({ children, description }: TitleProps) => {
  const router = useRouter()
  const ogImageUrl = `/api/og?title=${children.toString()}`
  const title = `${children} — Passcard`
  const fullPath = `https://passcard.dev${router.asPath}`
  return (
    <Head>
      <title>{title}</title>
      <meta name="og:title" property={title} />
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:url" content={ogImageUrl} />
      <meta property="twitter:image" content={ogImageUrl} />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <meta property="og:url" content={fullPath} />
    </Head>
  )
}
