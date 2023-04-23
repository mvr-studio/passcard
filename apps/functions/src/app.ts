import express from 'express'
import cors from 'cors'
import * as trpcExpress from '@trpc/server/adapters/express'
import { appRouter } from './routers'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'

export const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({ req, res })
const swaggerDocument = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: '@passcard/functions',
      version: '0.0.1'
    }
  },
  apis: ['./src/routers/**/*.ts']
})

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
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

export default app
