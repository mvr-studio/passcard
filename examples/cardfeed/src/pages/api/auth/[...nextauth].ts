import { CardanoVerifier, fromSanitizedMessage } from '@passcard/auth'
import { NextApiHandler } from 'next'
import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
const auth: NextApiHandler = async (req, res) => {
  const providers = [
    CredentialsProvider({
      name: 'Cardano',
      credentials: {
        message: {
          label: 'Message',
          type: 'text'
        },
        signature: {
          label: 'Signature',
          type: 'text'
        }
      },
      async authorize(credentials) {
        if (!credentials?.message) return null
        if (!credentials?.signature) return null
        const { key, signature } = JSON.parse(credentials.signature)
        const { message } = fromSanitizedMessage(credentials.message)
        const isValid = CardanoVerifier.verify({
          signature,
          key,
          message: credentials.message,
          address: message.address
        })
        if (isValid)
          return {
            id: message.address
          }
        return null
      }
    })
  ]
  const authOptions: AuthOptions = {
    providers,
    session: {
      strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async session({ session, token }: { session: any; token: any }) {
        session.user.address = token.sub
        session.user.name = token.sub
        session.user.image = 'https://www.fillmurray.com/128/128'
        return session
      }
    }
  }
  const isDefaultSigninPage = req.method === 'GET' && req.query.nextauth?.includes('signin')
  if (isDefaultSigninPage) {
    providers.pop()
  }
  return await NextAuth(req, res, authOptions)
}

export default auth
