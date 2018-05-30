angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/options',{templateUrl: _.toHttpGetUrl('content/option/list.html'),controller: OptionListCtrl});

} ]);

function OptionListCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route,$modal,myFunction) {
	$log.info('Enter OptionListCtrl');

	if (!$rootScope.paging) {
		$rootScope.paging = APP.DEFAULT_PAGING;
	}
	if (!$rootScope.criteria) {
		$rootScope.criteria = {};
	}

  


}
