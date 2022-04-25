import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true, maxlength: 200 },
  addedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
},{
  timestamps: true,
}
)

const breadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  origin: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  comments: [commentSchema],
  addedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
})

breadSchema.plugin(mongooseUniqueValidator)

const Bread = mongoose.model('Bread', breadSchema)

export default Bread