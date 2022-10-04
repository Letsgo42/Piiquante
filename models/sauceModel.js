const mongoose = require('mongoose');
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const sauceSchema = mongoose.Schema({
  name: {type: String, required: true},
  manufacturer: {type: String, required: true},
  description: {type: String, required: true},
  heat: {type: Number, required: true},
  likes: {type: Number, default: 0},
  dislikes: {type: Number, default: 0},
  imageUrl: {type: String, required: true},
  mainPepper: {type: String, required: true},
  usersLiked: {type: Array, default: []},
  usersDisliked: {type: Array, default: []},
  userId: {type: String, required: true}
});

sauceSchema.plugin(mongodbErrorHandler);
module.exports = mongoose.model('Sauce', sauceSchema);
