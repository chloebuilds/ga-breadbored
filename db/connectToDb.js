import mongoose from 'mongoose'
import { dbURL } from '../config/environment.js'

export default function connectToDb() {

  const options = {
    newUserParser: true,
    useCreate: true,
    useUnifiedTopology: true,
  }

  return mongoose.connect(dbURL, options)

}