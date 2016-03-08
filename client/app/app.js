angular.module('hackoverflow', [
  'hackoverflow.services',
  'hackoverflow.forums',
  'hackoverflow.posts',
  'hackoverflow.add-post',
  'hackoverflow.edit-post',
  'hackoverflow.answers',
  'hackoverflow.signout',
  'hackoverflow.profile',
  'hackoverflow.comments',
  'ui.router',
  'ngRoute',
  'ngAnimate',
  'ngSanitize',
  'ngTagsInput',
  'satellizer',
  'hackoverflow.auth'
])

.run(function($rootScope, $auth, $location, $state, Auth) {

  $rootScope.$on("$routeChangeStart",
    function (event, next, current) {

    if (sessionStorage.restorestate == "true") {

      //let everything know we need to restore state
      $rootScope.$broadcast('restorestate');
      sessionStorage.restorestate = false;
    }
  });

  $rootScope.$on("$stateChangeStart", function (event, next, current) {
    // always add our userProfile data to the rootScope if it isn't already there
    if ($rootScope.userProfile === undefined) {
      Auth.getUser()
        .then(function(response){
          $rootScope.userProfile = {
            name: response.data.displayName,
            picture: response.data.picture
          }
        });
    }
  });

  //let everthing know that we need to save state now.
  window.onbeforeunload = function (event) {
    $rootScope.$broadcast('savestate');
  };
})

.controller('AppController', function($scope, $location, $auth) {

  // this ensures that application fully reboots and
  // defaults to main page if user reloads a page.
  // $location.path("/");
})

.config(function($httpProvider, $urlRouterProvider,
  $stateProvider, $locationProvider, $authProvider) {

  $authProvider.github({
    clientId: 'f052f1dfb8b8dceb5a69'
  });

  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('forums');
  $stateProvider
    .state('forums', {
      url: '/forums',
      templateUrl: 'app/forums/forums.html',
      controller: 'ForumsController',
      resolve: {loginRequired: loginRequired}
    })
      .state('forums.posts', {
        url: '/:forum',
        templateUrl: 'app/posts/posts.html',
        controller: 'PostsController',
        resolve: {loginRequired: loginRequired}
      })
    .state('post', {
      url: '/:forum/:postId',
      templateUrl: 'app/answers/answers.html',
      controller: 'AnswersController',
      resolve: {loginRequired: loginRequired}
    })
    .state('add-post', {
      url: '/add-post',
      templateUrl: 'app/posts/add-post.html',
      controller: 'AddPostController',
      resolve: {loginRequired: loginRequired}
    })
    .state('edit-post', {
      params: {'post': null},
      url: '/edit-post',
      templateUrl: 'app/posts/add-post.html',
      controller: 'EditPostController',
      resolve: {loginRequired: loginRequired}
    })
    .state('signin', {
      url: '/signin',
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController'
    })
    .state('signout', {
      url: '/signout',
      templateUrl: 'app/auth/signout.html',
      controller: 'SignoutController'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController'
    })
    .state('profile', {
      url: '/profile',
      templateUrl: 'app/profile/profile.html',
      controller: 'ProfileController',
      resolve: {loginRequired: loginRequired}
    });

    // https://github.com/sahat/satellizer/blob/master/examples%2Fclient%2Fapp.js#L99
    function loginRequired($q, $location, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.resolve();
      } else {
        $location.path('/signin');
      }
      return deferred.promise;
    }
});
