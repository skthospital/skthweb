angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/',{templateUrl: _.toHttpGetUrl('content/home/home.html'),controller: HomeCtrl});
} ]);

function HomeCtrl($rootScope,$routeParams, $scope, $http, $compile, $timeout, $filter, $location, $log, $route,$modal,myFunction) {
	$log.info('Enter HomeCtrl');



	$http({
		url:'backend/API/USER/getUserByUsernamePassword.php',
		method:'POST',
		data:{
			'token':APP.TOKEN
		}
	}).then(function (resp){
		$scope.data = resp.data;
		console.log($scope.data);

	})
}
