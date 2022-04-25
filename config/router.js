import express from 'express'
import breadController from '../controllers/breads.js'
import secureRoute from '../lib/secureRoute.js'
import auth from '../controllers/auth.js'


const router = express.Router()


router.route('/breads')
  .get(breadController.index)

  router.post('/register', auth.register)
  router.post('/login', auth.login)


export default router

