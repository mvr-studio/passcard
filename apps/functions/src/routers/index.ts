import { mergeRouters } from '../trpc'
import { CardanoRouter } from './cardano'

export type AppRouter = typeof appRouter

export const appRouter = mergeRouters(CardanoRouter)
