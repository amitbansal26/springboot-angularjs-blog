
var myApp = angular.module('myApp');

myApp.controller('LoginController', 
	[ '$rootScope','$scope', '$http', '$state','$location','$cookies', 'UserService','UtilService', 
     function ($rootScope, $scope,$http, $state, $location, $cookies, UserService, UtilService) {
		$scope.loginUser = {};
		
		$scope.authenticateUser = function(){
			
			$scope.loginFailed = false;
			$http({
			    method: 'POST',
			    url: 'authenticate',
			    data: $.param($scope.loginUser),
			    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
			
			.then(function(response) {
				//UtilService.notifyInfo('Login successful');
				UserService.setUser(response.data);
				$state.transitionTo('home');
			},function(response) {
				console.log('Login failed');
				$scope.loginFailed = true;
	        	UtilService.notifyError('Invalid Login Credentials');
			});
		};
		
	}
]);

myApp.controller('HomeController', 
   [ '$scope', '$rootScope', '$http', '$location','$sce', 'PostsService','UtilService',
   function ($scope, $rootScope, $http, $location, $sce,PostsService, UtilService) {

	$scope.loadPosts = function(page){
		var pageSize = 5;
		
		PostsService.loadPosts(page, pageSize)
			.then(
					function(data, status, headers, config){
						var posts = data.posts;
						angular.forEach(posts, function(post) {
							post.contentPreview = $sce.trustAsHtml(post.contentPreview);
						});
						$scope.posts = posts;
						$scope.postsPagination = {
								hasNextPage : data.hasNextPage,
								hasPrevPage: data.hasPrevPage,
								currentPage: data.currentPage
						};
					},
					function(data, status, headers, config){
						UtilService.notifyError('Problem in loading posts');
					}
			);
	};
	
	$scope.loadPosts(0);
	
}]);


myApp.controller('PostController', 
	[ '$scope','$http', '$state','$stateParams', '$location', '$sce','UtilService',
    function ($scope, $http, $state, $stateParams, $location,$sce, UtilService) {
	
	$scope.loadPost = function(){
		$http.get('api/posts/'+$stateParams.postId)
		.success(function(data, status, headers, config){
			$scope.post = data;
			$scope.post.content = $sce.trustAsHtml($scope.post.content);
			var comments = data.comments;
			angular.forEach(comments, function(comment){
				comment.content = $sce.trustAsHtml(comment.content);
			});
			$scope.post.comments=comments;
		})
		.error(function(data, status, headers, config){
			UtilService.notifyError('Problem in loading post details');
		})
		;
	}

	$scope.loadPost();
	$scope.newComment = {};
	
	$scope.createComment = function(){
		$scope.newComment.content = $('#contentEditor').code();
		$http.post('api/posts/'+$stateParams.postId+"/comments", $scope.newComment)
		.success(function(data, status, headers, config){
			UtilService.notifyInfo('Comment saved successfully');
			
			$scope.newComment = {};
			$('#contentEditor').code('');
			$scope.loadPost();
		})
		.error(function(data, status, headers, config){
			UtilService.notifyError('Problem in saving comment');
		})
		;
	};
}]);



myApp.controller('NewPostController', [ '$scope','$http', '$stateParams', '$location', 'UtilService',
    function ($scope, $http, $stateParams, $location, UtilService) {
	
	$scope.newPost = {};
	
	$scope.createPost = function(){
		$scope.newPost.content = $('#contentEditor').code();
		$http.post('api/posts/', $scope.newPost)
		.success(function(data, status, headers, config){
			UtilService.notifyInfo('Post saved successfully');
			$scope.newPost = {};
			$('#contentEditor').code('');
		})
		.error(function(data, status, headers, config){
			UtilService.notifyError('Problem in saving post');
		});
	}

}]);
