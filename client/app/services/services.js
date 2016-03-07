angular.module('hackoverflow.services', [])

// --- POSTS ---

.factory('Posts', function($http) {

  var getForums = function() {
    return $http({
      method: 'GET',
      url: 'api/forum/'
    })
    .then(function ( response ){
      var forums = response.data.map(function(forum) {
        return forum.name;
      });
      return forums;
    });
  };

  var newForum = function(forumName) {
    var forum = {name: forumName};
    return $http({
      method: 'POST', 
      url: 'api/forum',
      data: forum
    })
    .then(function ( response ){
      return response;
    })
  }

  var getPosts = function(forum) {
    return $http({
      method: 'GET',
      url: '/api/post/' + forum
    })
    .then(function ( response ){
      return response;
      });
    };

  var createPost = function(title, body, forum, author, created, tags, votes) {
    var newPost = {
      title: title,
      body: body,
      forum: forum,
      author: author,
      created: created,
      tags: tags,
      votes: votes
    };
    console.log('create post: ', newPost);
    return $http({
      method: 'POST',
      url: '/api/post',
      data: newPost
    })
    .then(function(response) {
      return response;
    });
  };

  var editPost = function(postId, title, body,
    forum, author, created, tags, votes) {
    var editedPost = {
      postId: postId,
      title: title,
      body: body,
      forum: forum,
      author: author,
      created: created, 
      tags: tags,
      votes: votes
    };
    console.log('edited post: ', editedPost);
    return $http({
      method: 'PUT',
      url: '/api/post/' + postId,
      data: editedPost
    });
  };

  var deletePost = function(postId) {
    console.log(postId + ' is for deleting');
    return $http({
      method: 'DELETE',
      url: '/api/post/' + postId
    });
  };

  var alterVotes = function(vote, totalVotes, postId){
    if(vote) {
      totalVotes++;
    } else {
      totalVotes--;
    }
    var editedPost = {votes: totalVotes};
    return $http({
      method: 'PUT',
      url: '/api/post/' + postId + '/votes/',
      data: editedPost
    });
  }

  return {
    getForums: getForums,
    newForum: newForum,
    getPosts: getPosts,
    createPost: createPost,
    editPost: editPost,
    deletePost: deletePost,
    alterVotes: alterVotes
  };
})

// --- ANSWERS ---

.factory('Answers', function ( $http ) {

  var getAnswers = function(postId) {
    console.log(postId + " is postId");
    return $http({
      method: 'GET',
      url: '/api/post/' + postId + '/answers'
    })
    .then(function(response) {
      return response;
      });
    };

  var getNumberOfAnswers = function(postId) {
    return $http({
      method: 'GET',
      url: '/api/post/' + postId + '/answersNumber'
    })
    .then(function(response) {
      return response;
    });
  };

  var createAnswer = function(postId, body, author, created) {
    var newAnswer = {
      postId: postId,
      body: body,
      author: author,
      created: created
    };
    console.log('new answer: ', newAnswer);
    return $http({
      method: 'POST',
      url: '/api/post/' + postId + '/answers',
      data: newAnswer
    });
  };
  
  var editAnswer = function(postId, answer) {
    // var update = new Date();
    var editedAnswer = {
      answerId: answer._id,
      body: answer.body,
      updated: new Date()
    };
    // console.log('editedAnswer' + editedAnswer);
      return $http({
      method: 'PUT',
      url: '/api/post/' + postId + '/answers/' + editedAnswer.answerId,
      data: editedAnswer,
    });
  };

  var deleteAnswer = function(postId, answerId) {
    return $http({
      method: 'DELETE',
      url: '/api/post/' + postId + '/answers/' + answerId
    });
  };

  return {
    getAnswers: getAnswers,
    createAnswer: createAnswer,
    getNumberOfAnswers: getNumberOfAnswers,
    editAnswer: editAnswer,
    deleteAnswer: deleteAnswer
  };
})

// --- COMMENTS ---

.factory('Comments', function($http, commentService) {
  var getComments = function(postId) {
    return $http({
      method: 'GET',
      url: '/api/post/' + postId + '/comments'
    })
    .then(function(response) {
      console.log('COMMENTS', response.data);
      commentService.comments = response.data;
      return response.data;
    });
  };

  var newComment = function(body, author, answerId, postId, created) {
    var comment = {
      'body': body,
      'author': author,
      'answer': answerId,
      'post': postId, 
      'created': created
    };
    return $http({
      method: 'POST', 
      url: '/api/post' + postId + '/comments',
      data: comment
    })
    .then(function(response) {
      console.log('created comment', response.data);
    })
  };

  return {
    getComments: getComments,
    newComment: newComment
  };
})

.service('commentService', function() {
  this.comments = [];
})

.directive('commentDirective', function() {
  return {
    templateUrl: 'app/comments/comment-directive.html',
    replace: true,
    scope: {
      comment: '=',
      postId: '=',
      answer: '='
    }
  }
})

// --- AUTHENTICATION ---

.factory('Auth', function($http, $location, $window) {

  var getUser = function getUser() {
    return $http({
      method: 'GET',
      url: '/api/me/'
    })
    .then(function ( response ){
      return response;
      });
    };

  return {
    getUser: getUser
  };
})

.factory('TimeService', function() {

  var relativeDate = function(date) {
    return moment(date).fromNow();
  };

  return {
    relativeDate: relativeDate
  };

})

.factory('ForumService', ['$rootScope', function ($rootScope) {

  var currentForum = {

    model: {
      forum: 'Algorithms'
    },

    SaveState: function () {
      sessionStorage.ForumService = angular.toJson(currentForum.model);
    },

    RestoreState: function () {
      currentForum.model = angular.fromJson(sessionStorage.ForumService);
    }
  };

  $rootScope.$on("savestate", currentForum.SaveState);
  $rootScope.$on("restorestate", currentForum.RestoreState);

  return {
    currentForum: currentForum
  };
}]);
