/* eslint-disable no-console */

import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'

const START_SEVER = () => {
  const app = express()
  app.use(express.json())

  app.use('/v1', APIs_V1)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`3. Hello ${env.AUTHOR}, Back-end sever is running successfully at Host: ${env.APP_HOST} and Port:${env.APP_PORT}`)
  })

  // Thực hiện các tác vụ cleanup trước khi dừng server
  exitHook(() => {
    console.log('4. Server is shutting down...')
    CLOSE_DB()
    console.log('5. Disconnected from MongoDB Cloud Atlas. Bye!')
  })
}

// chỉ khi kết nối tới database thành công thì mới start sever backend lên.
// Immediately-invoked / Anonymus async function (IIFE)
(async () => {
  try {
    console.log('1. Connecting to MongoDB Cloud Atlas...')
    await CONNECT_DB()
    console.log('2. Connected to MongoDB Cloud Atlas!')
    START_SEVER()
  } catch (error) {
    console.log(error)
    process.exit(0)
  }
}) ()

// chỉ khi kết nối tới database thành công thì mới start sever backend lên.
// console.log('1. Connecting to MongoDB Cloud Atlas...')
// CONNECT_DB()
//   .then(() => console.log('2. Connected to MongoDB Cloud Atlas!'))
//   .then(() => START_SEVER())
//   .catch(error => {
//     console.log(error)
//     process.exit(0)
//   })
