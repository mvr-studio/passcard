import { PasscardMessage, generateNonce } from '@passcard/auth'
import { NextApiHandler } from 'next'
import { getCsrfToken } from 'next-auth/react'

const handler: NextApiHandler = async (req, res) => {
  const address = req.query.address as string
  const blockchain = req.query.blockchain as string
  try {
    if (!address) throw new Error('Wallet address is missing')
    if (!blockchain) throw new Error('Blockchain is missing')
    const nonce = (await getCsrfToken({ req })) || generateNonce()
    const { message } = new PasscardMessage({
      domain: 'cardfeed.netlify.app',
      address,
      blockchain,
      statement: 'Sign in',
      version: '0.0.1',
      uri: process.env.PASSCARD_URI,
      networkId: 0,
      nonce
    })
    res.json({ message })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export default handler
