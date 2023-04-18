import Head from 'next/head'

interface TitleProps {
  children: string
}

const Title = ({ children }: TitleProps) => {
  const title = `${children} - Cardfeed`

  return (
    <Head>
      <title>{title}</title>
    </Head>
  )
}

export default Title
