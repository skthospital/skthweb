angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/redeem/:mem1/:date/:month/:year/:ward',
		{templateUrl: _.toHttpGetUrl('content/redeem/detail.html'),
		controller: RedeemCtrl});
} ]);

function RedeemCtrl($rootScope,$routeParams, $scope, $http, $compile, $timeout, $filter, $location, $log, $route,$modal,myFunction) {
	$log.info('Enter RedeemCtrl');

	$(document.body).removeClass('sidebar-collapse');

	console.log($routeParams.mem1);
	console.log($routeParams.date);
	console.log($routeParams.month);
	console.log($routeParams.year);
	$http({
		url:'API/LISTOFVALUE/getPersonalByMemId.php',
		method:'POST',
		data:{
			'mem_id':$routeParams.mem1
		}
	}).then(function (resp){
		$scope.mem1Obj = resp.data;
		$scope.fullNameMem1 = $scope.mem1Obj.Pre_name+$scope.mem1Obj.Mem_name+"  "+$scope.mem1Obj.Mem_lastname
		console.log($scope.mem1Obj);
	})



	$http({
		url:'API/LISTOFVALUE/getAllWorkList.php',
		method:'GET'
	}).then(function (resp){
		$scope.workList = resp.data;
		console.log($scope.workList);
	})

	$http({
		url:'API/LISTOFVALUE/getAllPersonal.php',
		method:'GET'
	}).then(function (resp){
		$scope.personals = resp.data;
		console.log($scope.personals);
	})

	console.log($rootScope.criteria.date_t);
	$scope.checkData = function (){
		alert("asdasd")
	}

	var str = $routeParams.year+"-"+$routeParams.month
	$scope.monthTotal = moment(str, "YYYY-MM").daysInMonth()
	$scope.objects = [];
	for (var x = 0; x < $scope.monthTotal; x++) {
  $scope.objects[x] = {date: x+1};
	}
	console.log("obj=",$scope.objects);
	console.log($scope.monthTotal);
  console.log($routeParams);



	// ######### STATE FUNCTION ######
	$scope.selectFri = function (){
		console.log($rootScope.criteria.fri);
		$http({
			url:'API/LISTOFVALUE/getPersonalByMemId.php',
			method:'POST',
			data:{
				'mem_id':$rootScope.criteria.fri
			}
		}).then(function (resp){
			$scope.personalObj = resp.data;
			console.log($scope.personalObj);
		})
	}




  $scope.back = function (){
		$rootScope.criteria.user = {}
		$rootScope.criteria.redeemList = []
    window.history.back();
  }
}
