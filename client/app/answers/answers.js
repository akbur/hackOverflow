angular.module('hackoverflow.answers', [
  'hackoverflow.services',
  'ui.router'
])

.config(function ($httpProvider, $urlRouterProvider, $stateProvider) {
})

.controller('AnswersController',
  function ($scope, $rootScope, $stateParams, $state, Answers, Posts, Comments, commentService, TimeService) {
  $scope.answers = [];
  $scope.post = {};
  $scope.postId = $stateParams.postId;
  $scope.newAnswerBody = '';
  $scope.newCommentBody = {};
  $scope.theUser = $rootScope.user;
  $scope.TimeService = TimeService;
  $scope.votes = $scope.post.votes;
  $scope.comments = commentService.comments;

  $scope.getData = function getData(postId) {
    Posts.getPosts(postId).then(function(result) {
      $scope.post = result.data;
      $scope.getAnswers();
    })
  };

  $scope.getAnswers = function getAnswers() {
    Answers.getAnswers($scope.post._id).then(function(result) {
      $scope.answers = result.data;
    });
  };

  $scope.editAnswer = function editAnswer(postId, answer) {
    Answers.editAnswer(postId, answer);
  };

  $scope.upVote = function upVote(postId, answer) {
    Answers.upVote(postId, answer);

  };

  $scope.downVote = function downVote(postId, answer) {
    Answers.downVote(postId, answer);

  };

  $scope.deleteAnswer = function deleteAnswer(postId, answerId) {
    Answers.deleteAnswer(postId, answerId);
    $scope.getAnswers();
  };

  $scope.deletePost = function deletePost(postId) {
    Posts.deletePost(postId);
    $state.go('forums.posts', {forum: $stateParams.forum});
  };

  $scope.submit = function () {
    Answers.createAnswer($scope.post._id, $scope.newAnswerBody, $rootScope.userProfile.name, new Date());
    $scope.newAnswerBody = '';
    $scope.getAnswers();
  };

  $scope.changeVote = function(vote, post) {
    Posts.alterVotes(vote, post);
  };

  $scope.getComments = function() {
    Comments.getComments($scope.postId)
    .then(function(){
      $scope.comments = commentService.comments;
    });
  };

  $scope.newComment = function(newCommentBody, answerId) {
    Comments.newComment(newCommentBody, $rootScope.userProfile.name, answerId, $scope.postId, new Date());
    $scope.newCommentBody[answerId] = '';
    $scope.getComments();
  };

  $scope.getData($scope.postId);
  $scope.getComments();
});
