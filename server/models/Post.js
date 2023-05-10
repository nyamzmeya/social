const { Schema, model} = require('mongoose');

const postSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  content: String,
  image: {
    type: 'ObjectId',
    ref: 'Image'
  },
  author: {
    type: 'ObjectId',
    ref: 'User',
    required: true,
  }
});



module.exports = new model('Post', postSchema)