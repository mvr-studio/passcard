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

app.use((req, res, next) => {
  var err = new Error('Not Found')
  res.status(404).json(err)
})

app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500).json(err)
})

export default app
