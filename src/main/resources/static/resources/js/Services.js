var myApp = angular.module('myApp');

myApp.service('UserService',['$http', '$state', '$cookieStore', 
     function($http, $state, $cookieStore) {
  	
  		var self = this;
  			
  		self.setUser = function(aUser){
  			$cookieStore.put('authenticatedUser', aUser);
  		};
  		    
  	    self.getUser = function(){
  	    	return $cookieStore.get('authenticatedUser');
  	    };
  	    
  	    self.isUserLoggedIn = function() {
  	    	return $cookieStore.get('authenticatedUser') != null;
  	    };
  	    
  	    self.logout = function() {
  	    	$cookieStore.remove('authenticatedUser');
  	    	$http.post('logout')
  	    	.success(function(response){
  	    		console.log('Successfully logged out on server');
  	    	})
  	    };
  		
  	
  }]);