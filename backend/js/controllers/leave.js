angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/leaves',{templateUrl: _.toHttpGetUrl('content/leave/list.html'),controller: LeaveListCtrl});
	$routeProvider.when('/leave/detail',{templateUrl: _.toHttpGetUrl('content/leave/detail.html'),controller: LeaveDetailCtrl});

} ]);

function LeaveListCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route,$modal,myFunction) {
	$log.info('Enter LeaveListCtrl');



	if (!$rootScope.paging) {
		$rootScope.paging = APP.DEFAULT_PAGING;
	}
	if (!$rootScope.criteria) {
		$rootScope.criteria = {};
	}
}

function LeaveDetailCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route,$modal,myFunction) {
	$log.info('Enter LeaveDetailCtrl');



	if (!$rootScope.paging) {
		$rootScope.paging = APP.DEFAULT_PAGING;
	}
	if (!$rootScope.criteria) {
		$rootScope.criteria = {};
	}




}
