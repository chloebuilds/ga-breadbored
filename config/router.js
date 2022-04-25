import express from 'express'
import breadController from '../controllers/breads.js'
import secureRoute from '../lib/secureRoute.js'
import auth from '../controllers/auth.js'


const router = express.Router()


router.route('/breads')
  .get(breadController.index)
  .post(secureRoute, breadController.create)

router.route('/breads/:id')
  .get(breadController.show)
  .delete(secureRoute, breadController.delete)
  .put(secureRoute, breadController.update)

router.route('/breads/:breadId/comments')
  .post(secureRoute, breadController.commentCreate)

router.route('/bread/:breadId/comments/:commentId')
  .delete(secureRoute, breadController.commentDelete)

router.post('/register', auth.register)
router.post('/login', auth.login)


export default router

