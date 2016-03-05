var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  body: String,
  author: String, 
  answer: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Answer'
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  created: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Comment', CommentSchema);