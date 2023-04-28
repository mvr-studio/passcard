import passport from 'passport'
import { parseSignature, fromSanitizedMessage } from '@passcard/auth'
import LocalStrategy from 'passport-local'
import { PrismaClient } from '@prisma/client'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'

const prisma = new PrismaClient()

passport.use(
  'passcard',
  new LocalStrategy({ session: false }, async (localMessage, localSignature, callback) => {
    const signature = parseSignature(localSignature)
    const message = fromSanitizedMessage(localMessage)
    const isValid = await message.verify({
      signature: signature
    })
    if (!isValid) return callback(null, false, { message: 'Invalid signature.' })
    const address = message.getAddress()
    const user = await prisma.user.upsert({ where: { address }, update: { address }, create: { address } })
    return callback(null, user)
  })
)

passport.use(
  'jwt',
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    },
    (jwtPayload, cb) => {
      return prisma.user
        .findUniqueOrThrow({ where: { address: jwtPayload.address } })
        .then((user) => {
          return cb(null, user)
        })
        .catch((err) => {
          return cb(err)
        })
    }
  )
)
