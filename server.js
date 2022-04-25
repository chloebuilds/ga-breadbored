import app from './app.js'
import connectToDb from './db/connectToDb.js'

const PORT = 4000

async function startApp() {
  try {
    await connectToDb()
    console.log('Database has connected!')
    app.listen(PORT, () => console.log('Now, we\'re baking!'))
  } catch (e) {
    console.log('Something went wrong starting app..')
    console.log(e)
  }
}

startApp()