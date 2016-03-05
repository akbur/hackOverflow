var commentController = require('./commentController');

module.exports = function(app) {
  app.get('/', commentController.getComments);
  app.post('/', commentController.newComment);
  app.delete('/', commentController.deleteComment);
};