angular.module('hackoverflow.comments', [
  'hackoverflow.services',
  'ui.router'
])

.config(function ($httpProvider, $urlRouterProvider, $stateProvider) {
})

.controller('CommentController', function($scope, $rootScope, $stateParams, $state, Comments, commentService) {
  $scope.postId = $stateParams.postId;

  $scope.comments = commentService.comments;
  $scope.$watch('comments', function() {
    commentService.comments = $scope.comments;
  });

  $scope.getComments = function() {
    Comments.getComments($scope.postId)
    .then(function(){
      $scope.comments = commentService.comments;
    });
  };

  $scope.getComments();
});