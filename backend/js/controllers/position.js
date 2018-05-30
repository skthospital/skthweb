angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/positions',{templateUrl: _.toHttpGetUrl('content/position/list.html'),controller: PositionListCtrl});
	$routeProvider.when('/position/create',{templateUrl: _.toHttpGetUrl('content/position/create-detail.html'),controller: PositionDetailCreateCtrl});
	$routeProvider.when('/position/:mode/:id',{templateUrl: _.toHttpGetUrl('content/position/edit-detail.html'),controller: PositionDetailEditCtrl});
} ]);

function PositionListCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route,$modal,myFunction) {
	$log.info('Enter PositionListCtrl');



	if (!$rootScope.paging) {
		$rootScope.paging = APP.DEFAULT_PAGING;
	}
	if (!$rootScope.criteria) {
		$rootScope.criteria = {};
	}


  // table
  $scope.search = function (){
		console.log($rootScope.paging.pageNumber);
		if($rootScope.criteria.full_name == undefined){
			$rootScope.criteria.full_name = ''
		}
		if ($rootScope.criteria.initials == undefined){
			$rootScope.criteria.initials = ''
		}
		if($rootScope.criteria.code == undefined){
			$rootScope.criteria.code = ''
		}

		console.log($rootScope.criteria.full_name);
		console.log($rootScope.criteria.initials);
		angular.extend($rootScope.criteria, $rootScope.paging);
    $http({
      url:'API/POSITION/getAllPosition.php',
      method:'POST',
			data:{
				'initials':$rootScope.criteria.initials,
				'full_name':$rootScope.criteria.full_name,
				'code':$rootScope.criteria.code,
				'page':$rootScope.paging.pageNumber
			}
    }).then(function (resp){

      $scope.positionList = resp.data;
      console.log($scope.positionList);


			$http({
				url:'API/POSITION/getAllPositionTotal.php',
				method:'POST'
			}).success(function (data){
				$scope.pTotal = data;
				$rootScope.paging.totalItems = $scope.pTotal.total;
				$rootScope.paging.showing = _.getShowing($rootScope.paging.pageNumber, $rootScope.paging.limit, $scope.pTotal.total);
			})

    })
  }

  $scope.search()
	$scope.selectPage = function(page) {
		$rootScope.paging.pageNumber = page;
		$scope.search();
	};
	$scope.gotoCreate = function (){
		$location.path('/position/create')
	}
	$scope.gotoEdit = function (id){
		$location.path('/position/edit/'+id)
	}
	$scope.clear = function (){
		$rootScope.criteria = {};
		$scope.search()
	}
	$scope.delete = function (pst_id){
		myFunction.confirmDeleteBox().result.then(function (ok){
			if(ok){
				$http({
					url:'API/POSITION/deletePositionById.php',
					method:'POST',
					data:{
						'pst_id':pst_id
					}
				}).then(function (resp){
					$scope.deleted = resp.data;
					if($scope.deleted == 1){
						$scope.app.addAlert('gritter-success', 'การลบเสร็จสมบูรณ์', 4000);
						$scope.search()
					}else{
						$scope.app.addAlert('gritter-error', 'การลบข้อผิดพลาด', 4000);
					}
				})
			}

		})
	}


}

function PositionDetailCreateCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route,$modal,myFunction,$routeParams) {
	$log.info('Enter PositionDetailCreateCtrl');

	if (!$rootScope.paging) {
		$rootScope.paging = APP.DEFAULT_PAGING;
	}

		$rootScope.criteria = {};


	$scope.mode = "create"
	console.log($scope.mode);

	// Header Table

	$scope.create = function (){
		if($rootScope.criteria.Position_Initals == undefined){
			$scope.err = {}
			$scope.err.shortNameErr = true
		}else if($rootScope.criteria.Position_Name == undefined){
			$scope.err = {}
			$scope.err.longNameErr = true
		}else if($rootScope.criteria.Position_Code == undefined){
			$scope.err = {}
			$scope.err.codeErr = true
		}else if ($rootScope.criteria.Position_NRate == undefined){
			$scope.err = {}
			$scope.err.overNErr = true
		}else if ($rootScope.criteria.Position_OTRate == undefined){
			$scope.err = {}
			$scope.err.overOTErr = true
		}else{
			myFunction.confirmSaveBox().result.then(function (ok){
				if(ok){
					$http({
						url:'API/POSITION/createPosition.php',
						method:'POST',
						data:{
							'Position_Initals':$rootScope.criteria.Position_Initals,
							'Position_Name':$rootScope.criteria.Position_Name,
							'Position_Code':$rootScope.criteria.Position_Code,
							'Position_NRate':$rootScope.criteria.Position_NRate,
							'Position_OTRate':$rootScope.criteria.Position_OTRate
						}
					}).then(function (resp){
						$scope.saved = resp.data;
						if($scope.saved == 1){
							$scope.app.addAlert('gritter-success', 'การบันทึกเสร็จสมบูรณ์', 4000);
							$location.path('/positions')
						}else{
							$scope.app.addAlert('gritter-error', 'การบันทึกเกิดข้อผิดพลาด', 4000);
						}
						console.log($scope.saved);
					})
				}
			})
		}


	}
	// Case thows Mode


	$scope.back = function (){
		$location.path('/positions')
	}


}


function PositionDetailEditCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route,$modal,myFunction,$routeParams) {
	$log.info('Enter PositionDetailEditCtrl');

	if (!$rootScope.paging) {
		$rootScope.paging = APP.DEFAULT_PAGING;
	}

		$rootScope.criteria = {};


	$scope.mode = $routeParams.mode
	console.log($scope.mode);

	// Header Table
	$scope.err = {};
	$scope.id = $routeParams.id

		$http({
			url:'API/POSITION/getPositionById.php',
			method:'POST',
			data:{
				'pst_id':$scope.id
			}
		}).then(function (resp){
			$scope.positionObj = resp.data;
			console.log($scope.positionObj);
			// Set to criteria
			$rootScope.criteria.Position_Initals = $scope.positionObj.Position_Initals
			$rootScope.criteria.Position_Name = $scope.positionObj.Position_Name
			$rootScope.criteria.Position_Code = $scope.positionObj.Position_Code
			$rootScope.criteria.Position_NRate = $scope.positionObj.Position_NRate
			$rootScope.criteria.Position_OTRate = $scope.positionObj.Position_OTRate
		})

	$scope.edit = function (){
		myFunction.confirmSaveBox().result.then(function(ok) {
			if (ok) {
				// Update Data
				$http({
					url:'API/POSITION/updatePositionById.php',
					method:'POST',
					data:{
						'Position_ID':$scope.id,
						'Position_Initals':$rootScope.criteria.Position_Initals,
						'Position_Name':$rootScope.criteria.Position_Name,
						'Position_Code':$rootScope.criteria.Position_Code,
						'Position_NRate':$rootScope.criteria.Position_NRate,
						'Position_OTRate':$rootScope.criteria.Position_OTRate
					}
				}).then(function (resp){
					$scope.updatePosition = resp.data;
					if($scope.updatePosition == 1){
						// Success
						$scope.app.addAlert('gritter-success', 'การแก้ไขเสร็จสมบูรณ์', 4000);
						$location.path('/positions')
					}else{
						$scope.app.addAlert('gritter-error', 'การแก้ไขเกิดข้อผิดพลาด', 4000);
					}
				})

			}
		});

	}

	// Case thows Mode


	$scope.back = function (){
		$location.path('/positions')
	}


}
