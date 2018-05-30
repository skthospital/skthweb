angular.module('security.authorization', [])

//.factory('authorization', ['$http', '$q', '$location', function($http, $q, $location) {
//	console.log('init authorization');
//  // The public API of the service
//  var service = {
//
//    // Attempt to authenticate a user by the given email and password
//    login: function(email, password) {
//      var request = $http.post('/login', {email: email, password: password});
//      return request.then(function(response) {
//        service.currentUser = response.data.user;
//        if ( service.isAuthenticated() ) {
//          closeLoginDialog(true);
//        }
//      });
//    },
//
//    // Give up trying to login and clear the retry queue
//    cancelLogin: function() {
//      closeLoginDialog(false);
//      redirect();
//    },
//
//    // Logout the current user and redirect
//    logout: function(redirectTo) {
//      $http.post('/logout').then(function() {
//        service.currentUser = null;
//        redirect(redirectTo);
//      });
//    },
//
//    // Ask the backend to see if a user is already authenticated - this may be from a previous session.
//    requestCurrentUser: function() {
//    	console.log('service.isAuthenticated() = '+ service.isAuthenticated());
//      if ( service.isAuthenticated() ) {
//        return $q.when(service.currentUser);
//      } else {
//        return $http.get('api/user/getUserInfo').then(function(response) {
//          service.currentUser = response.data.user;
//          console.log('authorization return currentUser');
//          return service.currentUser;
//        });
//      }
//    },
//
//    // Information about the current user
//    currentUser: null,
//
//    // Is the current user authenticated?
//    isAuthenticated: function(){
//      return !!service.currentUser;
//    },
//    
//    // Is the current user an adminstrator?
//    isAdmin: function() {
//      return !!(service.currentUser && service.currentUser.admin);
//    }
//  };
//
//  return service;
//}])


.service('authorization', [ '$http', '$rootScope', function($http, $rootScope) {
	
	var self = this;
	var permit = 'A';
	this.currentUser = null;
	
	this.requestCurrentUser = function() {
		$http.get('api/user/getUserInfo').success(function(data) {
			self.currentUser = data;
			$http.defaults.headers.common = angular.extend({'PIM-Login-User': self.currentUser.userCode}, $http.defaults.headers.common);
			
			// change after reset
			if (self.currentUser.errorCode == 2) {
				$rootScope.$broadcast("PASSWORD_MUST_CHANGE", "CHANGE_AFTER_RESET");
			}
			
			// grace logins remaining
			else if (self.currentUser.graceLoginsRemaining > -1) {
				$rootScope.$broadcast("PASSWORD_MUST_CHANGE", "GRACE_LOGINS_REMAINING");
			}
			
			// success
			$rootScope.$broadcast("REQUEST_CURRENT_USER_SUCCESS", "REQUEST_CURRENT_USER_SUCCESS");
		});
	};
	
	this.isAuthenticated = function() {
		return self.currentUser == null;
	};
    
    this.getCurrentUserCode = function() {
    	return self.currentUser.userCode;
    };
    
    this.isPermit = function(func) {
//    	console.log(func);
//    	console.log(self.currentUser.userFunction[func]);
//    	console.log(self.currentUser.userFunction[func] === permit);
    	if (self.currentUser == null) {
    		return false;
    	}
    	return self.currentUser.userFunction[func] === permit;
    };
    
    // TODO : implement canList, canEdit, ... function

} ]);
