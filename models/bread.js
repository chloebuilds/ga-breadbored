import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const breadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  origin: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  addedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
})

breadSchema.plugin(mongooseUniqueValidator)

const Bread = mongoose.model('Bread', breadSchema)

export default Bread