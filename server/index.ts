import express, { Application, Request, Response } from 'express'
import { Server } from 'socket.io'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import path from 'path'
import compression from 'compression'

import { ListenToSocketEndPoints } from './socket.io/socket.io'
import authRoute from './routes/auth'
import { connect } from './services/mongoose'
import jwtStrategy from './services/passport'

const PORT = process.env.PORT || 5000

const app: Application = express()
const server = http.createServer(app)

app.use(cors())
app.use(compression())
passport.initialize()
passport.use('jwt', jwtStrategy)
app.use(bodyParser.json())
app.use(
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 })
)
app.use(cookieParser())

app.use(express.static(path.resolve('client/dist')))

app.get('/*', function (req: Request, res: Response) {
  res.redirect('/')
})

connect()

app.use('/api/auth', authRoute)

server.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
})

export const io = new Server(server, {
  cookie: false,
  serveClient: false,
  cors: {
    origin: '*',
  },
})

ListenToSocketEndPoints(io)
