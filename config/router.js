import express from 'express'
import breadController from '../controllers/breadsana.js'
import secureRoute from '../middleware/secureRoute.js'



const router = express.Router()


router.route('/breads')
  .get(breadController.index)
  .post(secureRoute, breadController.create)

router.route('/breads/search')
  .get(breadController.search)

router.route('/breads/:id')
  .get(breadController.show)
  .delete(secureRoute, breadController.remove)
  .put(secureRoute, breadController.update)

export default router