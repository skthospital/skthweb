angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/',{templateUrl: _.toHttpGetUrl('content/home/home.html'),controller: DashboardCtrl});
} ]);

function DashboardCtrl($rootScope,$routeParams, $scope, $http, $compile, $timeout, $filter, $location, $log, $route,$modal,myFunction) {
	$log.info('Enter DashboardCtrl');


}
