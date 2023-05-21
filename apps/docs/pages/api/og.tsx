import { ImageResponse } from '@vercel/og'
import { RequestHandler } from 'next/dist/server/next'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge'
}

const fetchImage = () => fetch(new URL('../../assets/og.jpg', import.meta.url)).then((res) => res.arrayBuffer())

const handler: RequestHandler = async (req) => {
  const url = new URL(req.url)
  const title = url.searchParams.get('title')
  const imageData = await fetchImage()
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
      >
        <img
          src={imageData as unknown as string}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        />
        <h1
          style={{
            color: 'white',
            fontSize: '3rem',
            fontFamily: '"Sora"',
            fontWeight: 800,
            marginTop: '6rem',
            paddingLeft: '4rem',
            paddingRight: '4rem',
            textAlign: 'center'
          }}
        >
          {title}
        </h1>
      </div>
    ),
    {
      width: 1200,
      height: 600
    }
  ) as unknown as void
}

export default handler
