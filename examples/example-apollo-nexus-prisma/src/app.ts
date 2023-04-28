import { ApolloServer } from 'apollo-server'
import { context } from './context'
import { schema } from './schema'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'

export const server = new ApolloServer({ schema, context, plugins: [ApolloServerPluginLandingPageGraphQLPlayground()] })
