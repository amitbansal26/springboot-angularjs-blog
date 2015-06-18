
var myApp = angular.module('myApp',['ui.router','ngResource','ngCookies']);


myApp.factory('responseObserver',
  function responseObserver($q, $window, $rootScope) {
    return function (promise) {
        return promise.then(function (successResponse) {
            return successResponse;
        }, function (errorResponse) {

        switch (errorResponse.status) {
        //If SessionId header is missing or invalid
        case 412:
        	var message = {type: 'error', 'msg':'Invalid Login Credentials or Session Expired.'};
        	$rootScope.$emit('NotificationEvent', message);
        	$rootScope.logout();
            break;
        //If unauthorized
        case 401:
        	var message = {type: 'error', 'msg':'Invalid Login Credentials or Session Expired.'};
        	$rootScope.$emit('NotificationEvent', message);
        	$rootScope.logout();
            break;
      
       }

       return $q.reject(errorResponse);
      });
    };
});



myApp.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
	$httpProvider.interceptors.push('responseObserver');
	
	$stateProvider
	.state('login', {
		url: '/login',
		templateUrl: 'views/login.html', 
  		controller: 'LoginController',
  		access: 'public'
	})
	.state('home', {
		url: '/home',
		templateUrl: 'views/home.html', 
  		controller: 'HomeController'
	})
	.state('newpost', {
		url: '/newpost',
		templateUrl: 'views/newpost.html', 
  		controller: 'NewPostController'
	})
	;
	
	$urlRouterProvider.otherwise('/login');
})

.run(['$rootScope', '$state', '$timeout','UserService', function ($rootScope, $state, $timeout, UserService) {
	
	$rootScope.$on('$stateChangeStart', function(evt, toState, toParams, fromState, fromParams) {
		//console.log(toState);
    	//console.log(toState.name);
		var access = toState.access;
    	if(access != 'public'){
    		if(UserService.isUserLoggedIn()){
    			$rootScope.currentNavLink=toState.name;
    		} else {
    			evt.preventDefault();
    			console.log('redirect to login');
    			$state.go("login");
    		}
    	}
		
    	//$rootScope.currentNavLink=toState.name;
	});
	
	$rootScope.$on('NotificationEvent', function (event, message) {
	  	  //console.log(message);
	  	  $rootScope.message = message;
	  	  $timeout(function(){
	  		  delete $rootScope.message;
	  	  }, 3000);
	 });
	
	$rootScope.isUserLoggedIn = function(){
        return UserService.isUserLoggedIn();
	}
 
	$rootScope.logout = function()
	{
		console.log('Logging out..');
		UserService.logout();
		$state.transitionTo("login");
	}
	    
}])
;

