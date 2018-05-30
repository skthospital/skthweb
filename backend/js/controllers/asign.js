angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/asign',{templateUrl: _.toHttpGetUrl('content/asign/list.html'),controller: AsignListCtrl});
} ]);

function AsignListCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route,$modal,myFunction) {
	$log.info('Enter AsignListCtrl');



  	if (!$rootScope.paging) {
  		$rootScope.paging = APP.DEFAULT_PAGING;
  	}
  	if (!$rootScope.criteria) {
  		$rootScope.criteria = {};
  	}


    $http({
      url:'API/LISTOFVALUE/getAllDepartment.php',
      method:'POST',
    }).then(function (resp){
      $scope.departmentList = resp.data;
      console.log($scope.departmentList);
    })

    // table
    $scope.search = function (){
  		console.log($rootScope.paging.pageNumber);
  		if($rootScope.criteria.preName == undefined){
  			$rootScope.criteria.preName = ''
  		}
  		if ($rootScope.criteria.firstName == undefined){
  			$rootScope.criteria.firstName = ''
  		}
  		if($rootScope.criteria.lastName == undefined){
  			$rootScope.criteria.lastName = ''
  		}
      if($rootScope.criteria.costID == undefined){
  			$rootScope.criteria.costID = ''
  		}
      if($rootScope.criteria.positionName == undefined){
  			$rootScope.criteria.positionName = ''
  		}
			if($rootScope.criteria.role == undefined){
  			$rootScope.criteria.role = ''
  		}

  		console.log($rootScope.criteria.full_name);
  		console.log($rootScope.criteria.initials);
  		angular.extend($rootScope.criteria, $rootScope.paging);

      $http({
        url:'API/USER/getAllUser.php',
        method:'POST',
  			data:{
  				'preName':$rootScope.criteria.preName,
  				'firstName':$rootScope.criteria.firstName,
  				'lastName':$rootScope.criteria.lastName,
          'costID':$rootScope.criteria.costID,
          'positionName':$rootScope.criteria.positionName,
					'role':$rootScope.criteria.role,
  				'page':$rootScope.paging.pageNumber
  			}
      }).then(function (resp){

        $scope.userList = resp.data;
        console.log($scope.userList);


  			$http({
  				url:'API/USER/getUserTotal.php',
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




	$scope.gotoEdit = function (id){
		$location.path('/user/edit/'+id)
	}


	$scope.back = function (){
		window.history.back()
	}
}
