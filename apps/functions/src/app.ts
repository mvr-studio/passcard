import express from 'express'
import cors from 'cors'
import * as trpcExpress from '@trpc/server/adapters/express'
import { appRouter } from './routers'

export const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({ req, res })

const app = express()
app.use(express.json())
app.use(
  cors({
    credentials: true
  })
)
app.get('/health', (_req, res) => {
  return res.json({ ok: true })
})
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext
  })
)

export default app
