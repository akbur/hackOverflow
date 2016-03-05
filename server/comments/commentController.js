var Comment = require('./commentModel');

module.exports = {
  getComments: function (req, res, next) {
    Comment.find({ 'post' : req.params.post }, function(err, comments) {
      if (err) {
        return next(err);
      }

      res.json(comments);
    });
  }, 

  newComment: function (req, res, next) {
    Comment.create({
      'post': req.body.post,
      'body': req.body.body,
      'author': req.body.author,
      'created': req.body.created,
      'answer': req.body.answer
    }, function(err, comment) {
      if (err) {
        return next(err);
      }

      res.json(comment);
    });
  },

  deleteComment: function (req, res, next) {
    res.end(console.log('deleting a comment'));
  }
};
