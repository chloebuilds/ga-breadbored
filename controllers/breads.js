import Bread from '../models/bread.js'

async function breadIndex(_req, res, next) {
  try {
    const breads = await Bread.find()
    return res.status(200).json(breads)
  } catch (err) {
    next(err)
  }
}

export default {
  index: breadIndex
}