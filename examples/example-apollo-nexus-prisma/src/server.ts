import * as dotenv from 'dotenv'
dotenv.config()
import { server } from './app'

const PORT = process.env.PORT || 4000

server.listen({ port: PORT }).then(() => {
  console.log(`Listening on http://localhost:${PORT}`)
})
