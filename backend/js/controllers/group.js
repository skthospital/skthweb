angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/groups/defult',{templateUrl: _.toHttpGetUrl('content/group/list.html'),controller: GroupListCtrl});
	$routeProvider.when('/group/create/:pageBy',{templateUrl: _.toHttpGetUrl('content/group/create-detail.html'),controller: GroupDetailCreateCtrl});
	$routeProvider.when('/group/:mode/:id',{templateUrl: _.toHttpGetUrl('content/group/edit-detail.html'),controller: GroupDetailEditCtrl});
} ]);

function GroupListCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route,$modal,myFunction) {
	$log.info('Enter GroupListCtrl');
  $scope.pageName = 'กลุ่มงาน'


	if (!$rootScope.paging) {
		$rootScope.paging = APP.DEFAULT_PAGING;
	}
	if (!$rootScope.criteria) {
		$rootScope.criteria = {};
	}

  // table
  $scope.search = function (){
		console.log($rootScope.paging.pageNumber);
		if($rootScope.criteria.name == undefined){
			$rootScope.criteria.name = ''
		}

		angular.extend($rootScope.criteria, $rootScope.paging);
    $http({
      url:'API/GROUP/getAllGroup.php',
      method:'POST',
			data:{
				'name':$rootScope.criteria.name,
				'page':$rootScope.paging.pageNumber
			}
    }).then(function (resp){

      $scope.groupList = resp.data;
      console.log($scope.groupList);

			$http({
				url:'API/GROUP/getAllGroupTotal.php',
				method:'POST'
			}).success(function (data){
				$scope.gTotal = data;
				$rootScope.paging.totalItems = $scope.gTotal.total;
				$rootScope.paging.showing = _.getShowing($rootScope.paging.pageNumber, $rootScope.paging.limit, $scope.gTotal.total);
			})

    })
  }

  $scope.search()
	$scope.selectPage = function(page) {
		$rootScope.paging.pageNumber = page;
		$scope.search();
	};
	$scope.gotoCreate = function (){
		$location.path('/group/create/defult')
	}
	$scope.gotoEdit = function (id){
		$location.path('/group/edit/'+id)
	}
	$scope.clear = function (){
		$rootScope.criteria = {};
		$scope.search()
	}
	$scope.delete = function (id){
		myFunction.confirmDeleteBox().result.then(function (ok){
			if(ok){
				$http({
					url:'API/GROUP/deleteGroupById.php',
					method:'POST',
					data:{
						'id':id
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

function GroupDetailCreateCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route,$modal,myFunction,$routeParams) {
	$log.info('Enter GroupDetailCreateCtrl');
  $scope.pageName = 'กลุ่มงาน'
	if (!$rootScope.paging) {
		$rootScope.paging = APP.DEFAULT_PAGING;
	}

		$rootScope.criteria = {};

	console.log($routeParams.pageBy);
	$scope.mode = "create"
	console.log($scope.mode);

	// Header Table

	$scope.create = function (){
		if($rootScope.criteria.name == undefined){
			$scope.err = {}
			$scope.err.nameErr = true
		}else if($rootScope.criteria.detail == undefined){
			$scope.err = {}
			$scope.err.detailErr = true
		}else{
			myFunction.confirmSaveBox().result.then(function (ok){
				if(ok){
					$http({
						url:'API/GROUP/createGroup.php',
						method:'POST',
						data:{
							'name':$rootScope.criteria.name,
							'detail':$rootScope.criteria.detail
						}
					}).then(function (resp){
						$scope.saved = resp.data;
						if($scope.saved == 1){
							$scope.app.addAlert('gritter-success', 'การบันทึกเสร็จสมบูรณ์', 4000);


							if($routeParams.pageBy == 'defult'){
								$rootScope.criteria = {};
								$location.path('/groups/defult')
							} else if ($routeParams.pageBy == 'schedule'){

								$location.path('/schedule/create')
							}

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
    $rootScope.criteria = {};
		window.history.back();

	}


}


function GroupDetailEditCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route,$modal,myFunction,$routeParams) {
  	$log.info('Enter GroupDetailEditCtrl');
    $scope.pageName = 'กลุ่มงาน'


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
			url:'API/GROUP/getGroupById.php',
			method:'POST',
			data:{
				'id':$scope.id
			}
		}).then(function (resp){
			$scope.groupObj = resp.data;
			console.log($scope.groupObj);
			// Set to criteria
			$rootScope.criteria.name = $scope.groupObj.g_name
			$rootScope.criteria.detail = $scope.groupObj.g_desc
		})

	$scope.edit = function (){
		myFunction.confirmSaveBox().result.then(function(ok) {
			if (ok) {
				// Update Data
				$http({
					url:'API/GROUP/updateGroupById.php',
					method:'POST',
					data:{
						'id':$scope.id,
						'name':$rootScope.criteria.name,
						'detail':$rootScope.criteria.detail
					}
				}).then(function (resp){
					$scope.updateGroup = resp.data;
					if($scope.updateGroup == 1){
						// Success
						$scope.app.addAlert('gritter-success', 'การแก้ไขเสร็จสมบูรณ์', 4000);

						$scope.back()
					}else{
						$scope.app.addAlert('gritter-error', 'การแก้ไขเกิดข้อผิดพลาด', 4000);
					}
				})

			}
		});

	}

	// Case thows Mode


	$scope.back = function (){
    $rootScope.criteria = {};
		$location.path('/groups/defult')
	}


}
