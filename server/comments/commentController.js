var Comment = require('./commentModel');

module.exports = {
  getComments: function (req, res, next) {
    Comment.find(function(err, comments) {
      if (err) {
        return next(err);
      }

      res.json(comments);
    });
  }, 

  newComment: function (req, res, next) {
    res.end(console.log('adding a comment'));
  }, 

  deleteComment: function (req, res, next) {
    res.end(console.log('deleting a comment'));
  }
};
