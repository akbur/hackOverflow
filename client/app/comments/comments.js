angular.module('hackoverflow.comments', [
  'hackoverflow.services',
  'ui.router'
])

.config(function ($httpProvider, $urlRouterProvider, $stateProvider) {
})

.controller('CommentController', function($scope, $rootScope, $stateParams, $state, Posts, Answers, Comments) {
  $scope.postId = $stateParams.postId;
  $scope.comments = [];

  $scope.getComments = function() {
    Comments.getComments($scope.postId);
    console.log('post id', $scope.postId);
  };

  $scope.newComment = function() {
  //Comments.newComment(body, author, answerId, postId, created);
  };

  $scope.getComments();
});