var myApp = angular.module('myApp');


myApp.controller('LoginController',['$rootScope','$scope','$http','$state','UserService',
    function($rootScope, $scope, $http, $state, UserService){
	
	$scope.loginUser = { };
	
	$scope.authenticateUser = function()
	{
		$scope.loginFailed = false;
		$http({
		    method: 'POST',
		    url: 'authenticate',
		    data: $.param($scope.loginUser),
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
		
		.then(function(response) {
			//console.log('Data: '+response);
			UserService.setUser(response.data);
			$state.transitionTo('home');
		},function(response) {
			console.log('Login failed');
			$scope.loginFailed = true;
			var message = {type: 'error', 'msg':'Invalid Login Credentials.'};
        	$rootScope.$emit('NotificationEvent', message);
		});
		
	}	
	
}]);

myApp.controller('HomeController',['$rootScope','$scope','$http','$state',
     function($rootScope, $scope, $http, $state){
}]);

myApp.controller('NewPostController',['$rootScope','$scope','$http','$state',
  function($rootScope, $scope, $http, $state){
	
  }
]);