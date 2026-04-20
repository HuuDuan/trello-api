/* eslint-disable no-console */

import express from 'express'
import cors from 'cors'
import { corsOptions } from '~/config/cors'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'
import cookieParser from 'cookie-parser'
import { Server } from 'socket.io'
import http from 'http'
import { inviteUserToBoardSocket } from './sockets/inviteUserToBoardSocket'

const START_SERVER = () => {
  const app = express()

  // fix cái Cache from disk của Expressjs
  app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
  })

  // cấu hình cookie parser
  app.use(cookieParser())

  // Xử lý cors
  app.use(cors(corsOptions))

  app.use(express.json())

  app.use('/v1', APIs_V1)

  // Middleware xử lý lỗi tập trung
  app.use(errorHandlingMiddleware)

  // Tạo HTTP server từ app Express TRƯỚC khi listen
  const server = http.createServer(app)

  // Gắn socket.io vào HTTP server
  const io = new Server(server, {
    cors: corsOptions
  })
  io.on('connection', (socket) => {
    inviteUserToBoardSocket(socket)
  })

  if (env.BUILD_MODE === 'production') {
    server.listen(process.env.PORT, () => {
      console.log(`3. Production: Hello ${env.AUTHOR}, Back-end server is running successfully at Port: ${process.env.PORT}`)
    })
  } else {
    server.listen(env.LOCAL_DEV_APP_PORT, env.LOCAL_DEV_APP_HOST, () => {
      console.log(`3. Local DEV: Hello ${env.AUTHOR}, Back-end server is running successfully at Host: ${env.LOCAL_DEV_APP_HOST} and Port: ${env.LOCAL_DEV_APP_PORT}`)
    })
  }
}

const exitHook = require('async-exit-hook')
exitHook(() => {
  console.log('4. Server is shutting down...')
  CLOSE_DB()
  console.log('5. Disconnected from MongoDB Cloud Atlas. Bye!')
}),

// chỉ khi kết nối tới database thành công thì mới start server backend lên.
(async () => {
  try {
    console.log('1. Connecting to MongoDB Cloud Atlas...')
    await CONNECT_DB()
    console.log('2. Connected to MongoDB Cloud Atlas!')
    START_SERVER()
  } catch (error) {
    console.log(error)
    process.exit(0)
  }
})()
