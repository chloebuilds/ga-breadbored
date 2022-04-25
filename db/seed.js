import mongoose from 'mongoose'
import connectToDb from './connectToDb.js'
import Bread from '../models/bread.js'
import breadData from './data/breads.js'

async function seedDatabase() {
  try {
    await connectToDb()
    console.log('Successfully connected to mongo')

    await mongoose.connection.db.dropDatabase()
    console.log('Removed all bread 😭')

    const bread = await Bread.create(breadData)
    console.log(`🤖 ${bread.length} bread(s) baked!`) 
    const myComment = {
      text: 'My first comment',
      user: users[0]._id,
    }
  
    // Disconnect once finished..
    await mongoose.connection.close()
    console.log('🤖 Disconnected from mongo. !')
  } catch (e) {
    console.log('🤖 Something went wrong')
    console.log(e)
    await mongoose.connection.close()
  }
}

seedDatabase()


