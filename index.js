import express from 'express'
import router from './config/router.js'
import { connectToDb } from './db/helpers.js'
import logger from './lib/logger.js'
import errorHandler from './lib/errorHandler.js'
import { port } from './config/environment.js'
import cors from 'cors' 
import 'dotenv/config' 
// import path, { dirname } from 'path'
// import { fileURLToPath } from 'url'


const app = express()

app.use(express.json())
app.use(cors()) 
app.use('/', logger)
app.use('/api', router)
app.use(errorHandler)

// CONNECTING FRONT & BACK (for later :) )
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)
// app.use(express.static(path.join(__dirname, 'client', 'build')))
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
// })

async function startSever() {
  try {
    await connectToDb()
    console.log('🍞 Database connected')
    app.listen(port, () => console.log(`🥖 Listening on Port: ${port}`))
  } catch (err) {
    console.log('🥯 Oh no something went wrong')
    console.log(err)
  }
}

startSever()