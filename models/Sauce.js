const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
  name: {type: String, required: false},
  manufacturer: {type: String, required: false},
  description: {type: String, required: false},
  heat: {type: Number, required: false},
  likes: {type: Number, required: false, default: 0},
  dislikes: {type: Number, required: false, default: 0},
  imageUrl: {type: String, required: true},
  mainPepper: {type: String, required: false},
  usersLiked: {type: Array, required: false, default: []},
  usersDisliked: {type: Array, required: false, default: []},
  userId: {type: String, required: false}
});

module.exports = mongoose.model('Sauce', sauceSchema);
