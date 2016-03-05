var commentController = require('./commentController');

module.exports = function(app) {
  app.get('/:post/comments', commentController.getComments);
  app.post('/:post/comments', commentController.newComment);
  app.delete('/:post/comments/:comment', commentController.deleteComment);
};