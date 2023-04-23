import { inferAsyncReturnType, initTRPC } from '@trpc/server'
import { createContext } from './app'

export type Context = inferAsyncReturnType<typeof createContext>

export const t = initTRPC.context<Context>().create()
export const router = t.router
export const publicProcedure = t.procedure
export const mergeRouters = t.mergeRouters
