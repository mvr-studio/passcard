import { parseSignature, fromSanitizedMessage } from '@passcard/auth'
import { inputObjectType, objectType, queryType, mutationType, makeSchema } from 'nexus'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { ApolloError } from 'apollo-server'

const prisma = new PrismaClient()

const LoginInput = inputObjectType({
  name: 'LoginInput',
  definition(t) {
    t.nonNull.string('message')
    t.nonNull.string('signature')
  }
})

const Session = objectType({
  name: 'Session',
  definition(t) {
    t.nonNull.string('token')
    t.field('user', { type: User })
  }
})

const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('address')
    t.nonNull.string('createdAt')
    t.nonNull.string('updatedAt')
  }
})

const Query = queryType({
  definition(t) {
    t.field('me', {
      type: 'User',
      resolve: (_, __, context) => prisma.user.findUnique({ where: { address: context.address } })
    })
  }
})

const Mutation = mutationType({
  definition(t) {
    t.field('login', {
      type: 'Session',
      args: { data: LoginInput },
      resolve: async (_, args) => {
        const passcardSignature = parseSignature(args.data.signature)
        const passcardMessage = fromSanitizedMessage(args.data.message)
        const isValid = await passcardMessage.verify({
          signature: passcardSignature
        })
        if (!isValid) throw new ApolloError('Invalid signature')
        const address = passcardMessage.getAddress()
        const user = await prisma.user.upsert({
          where: { address },
          create: { address },
          update: { address }
        })
        const token = jwt.sign(
          {
            address
          },
          process.env.JWT_SECRET || ''
        )
        return {
          user,
          token
        }
      }
    })
  }
})

export const schema = makeSchema({
  types: [User, Session, Query, Mutation]
})
