angular.module('hackoverflow.comments', [
  'hackoverflow.services',
  'ui.router'
])

.config(function ($httpProvider, $urlRouterProvider, $stateProvider) {
})

.controller('CommentController', function($scope, $rootScope, $stateParams, $state, Comments, commentService) {
  $scope.postId = $stateParams.postId || '56da4a66155ea04b09b2496b';

  $scope.comments = commentService.comments;
  $scope.$watch('comments', function() {
    commentService.comments = $scope.comments;
    console.log('comments changed', commentService.comments, ' scope ', $scope.comments);
  });

  $scope.getComments = function() {
    Comments.getComments($scope.postId)
    .then(function(){
      $scope.comments = commentService.comments;
    });
  };

  $scope.newComment = function() {
  //Comments.newComment(body, author, answerId, postId, created);
  };

  $scope.getComments();
});