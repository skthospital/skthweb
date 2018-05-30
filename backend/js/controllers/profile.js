angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/profile/:profile_id',
		{templateUrl: _.toHttpGetUrl('content/profile/detail.html'),
		controller: ProfileDetailCtrl});
} ]);

function ProfileDetailCtrl($rootScope,$routeParams, $scope, $http, $compile, $timeout, $filter, $location, $log, $route,$modal,myFunction) {
	$log.info('Enter ProfileDetailCtrl');

  $scope.profile_id = $routeParams.profile_id
  console.log($scope.profile_id);



	$scope.upload = function (){
		if($scope.userObj.pic_id == null){
			$scope.type = 'IN'
		} else {
			$scope.type = 'UP'
		}
		window.open('./jcrop?user_id='+$scope.profile_id+'&type_U='+$scope.type+'&pic_id='+$scope.userObj.pic_id,name,'width=660,height=540,toolbar=0,menubar=0,location=0');
	}


	$scope.asign = function (){
		// goto Popup
		var modalInstance = $modal.open({
				templateUrl: 'content/profile/popup/asign-position.html',
				controller: AsignPositionPopupCtrl,
				backdrop: 'static',
				windowClass: 'small',
				keyboard: false,
				resolve: {
						params_mem_id: function () {
								return $scope.profile_id;
						}
				}
		});
		modalInstance.result.then(function (isClose) {
		}, function () {
				$log.info('Modal dismissed at: ' + new Date());
		});

	}
  // User Object
}
