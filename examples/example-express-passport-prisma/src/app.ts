declare global {
  namespace Express {
    interface User {
      address: string
    }
  }
}
import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import passport from 'passport'
import logger from 'morgan'
import './passport'
import authRouter from './routers/auth'
import usersRouter from './routers/users'

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use('/', authRouter)
app.use('/', passport.authenticate('jwt', { session: false }), usersRouter)

app.use((req, res) => {
  const error = new Error('Not Found')
  res.status(404).json({ error: error.message, status: 404 })
})

app.use((error, req, res) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? error : {}
  const status = error.status || 500
  res.status(status).json({
    error: err.message,
    status
  })
})

export default app
