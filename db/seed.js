import Bread from '../models/bread.js'
import User from '../models/user.js'
import { connectToDb, truncateDb, disconnectDb } from './helpers.js'
import breadData from './data/breads.js'

async function seed() {
  try {
    await connectToDb()
    console.log('🍞 Database Connected 🍞')

    await truncateDb()
    console.log('🫓 Database Dropped 🫓')

    const user = await User.create({
      username: 'admin',
      email: 'admin@email.com',
      password: 'pass',
      passwordConfirmation: 'pass',
      isAdmin: true,
    })

    console.log('🥖 Admin user created 🥖')

    breadData.forEach(bread => {
      bread.addedBy = user
    })

    const breads = await Bread.create(breadData)

    console.log(`🍞 ${breads.length} breads added to Database - nom nom 🍞`)

  } catch (err) {
    console.log('🥺 Something went wrong - we need carbs stat 🥺')
    console.log(err)
  }

  await disconnectDb()
  console.log('🥪  Bye bye 🥪 ')
}

seed()