angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/users',{templateUrl: _.toHttpGetUrl('content/user/list.html'),controller: UserListCtrl});
	$routeProvider.when('/user/edit/:id',{templateUrl: _.toHttpGetUrl('content/user/edit.html'),controller: UserDetailCtrl});
	$routeProvider.when('/user-head',{templateUrl: _.toHttpGetUrl('content/user/head/list.html'),controller: HeadUserListCtrl});
	$routeProvider.when('/user-head/edit/:id',{templateUrl: _.toHttpGetUrl('content/user/head/edit.html'),controller: HeadUserDetailCtrl});



} ]);

function UserListCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route,$modal,myFunction) {
	$log.info('Enter UserListCtrl');



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
		$scope.gotoAsign = function (p,n,l,id){
			console.log($scope.userObj.ENS_Token);
			myFunction.confirmAsignBox(p,n,l,id).result.then(function (ok){
				if(ok){
					$http({
						url:'API/USER/asignUser.php',
						method:'POST',
						data:{
							'user_id':id,
							'token':$scope.userObj.ENS_Token
						}
					}).then(function (resp){
						$scope.asign = resp.data;
						if($scope.asign == 1){
							$scope.app.addAlert('gritter-success', 'การมอบหมายเสร็จสมบูรณ์', 4000);
							$scope.search()
						}else{
							$scope.app.addAlert('gritter-error', 'การลบข้อผิดพลาด', 4000);
						}
					})
				}

			})
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

function UserDetailCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route,$modal,myFunction,$routeParams) {
	$log.info('Enter UserDetailCtrl');

	$scope.id = $routeParams.id

	$http({
		url:'API/LISTOFVALUE/getAllDepartment.php',
		method:'POST',
	}).then(function (resp){
		$scope.departmentList = resp.data;
		console.log($scope.departmentList);
	})


	$http({
		url:'API/LISTOFVALUE/getPositionList.php',
		method:'POST',
	}).then(function (resp){
		$scope.positionList = resp.data;
		console.log($scope.positionList);
	})


	$http({
		url:'API/LISTOFVALUE/getAllRole.php',
		method:'POST',
	}).then(function (resp){
		$scope.roleList = resp.data;

		if (!$scope.userObj.Permiss_ENS == '1'){
			//substract third
			$scope.roleList = _.without($scope.roleList, _.findWhere($scope.roleList, {
				lov_value: "1"
			}));
		}
		console.log($scope.roleList);
	})

	$scope.search = function (){
		$http({
			url:'API/USER/getUserByID.php',
			method:'POST',
			data:{
				'user_id':$scope.id
			}
		}).then(function (resp){
			$scope.userObj = resp.data;
			console.log($scope.userObj);

			$rootScope.criteria.preName = $scope.userObj.Pre_name
			$rootScope.criteria.firstName = $scope.userObj.Mem_name
			$rootScope.criteria.lastName = $scope.userObj.Mem_lastname
			$rootScope.criteria.department = $scope.userObj.Cost_id
			$rootScope.criteria.role = $scope.userObj.Permiss_ENS
			$rootScope.criteria.position = $scope.userObj.Position_ID

		})
	}
	$scope.search()
	function returnHash(){
		abc = "abcdefghijklmnopqrstuvwxyz1234567890".split("");
		var token="";
		for(i=0;i<32;i++){
				 token += abc[Math.floor(Math.random()*abc.length)];
		}
		return token; //Will return a 32 bit "hash"
	}
	console.log(returnHash());
	$scope.edit = function (){
		myFunction.confirmSaveBox().result.then(function (ok){
			if(ok){
				$http({
					url:'API/USER/updateUserByID.php',
					method:'POST',
					data:{
						'preName':$rootScope.criteria.preName,
						'firstName':$rootScope.criteria.firstName,
						'lastName':$rootScope.criteria.lastName,
						'position':$rootScope.criteria.position,
						'role':$rootScope.criteria.role,
						'user_id':$scope.id,
						'token': returnHash()
					}
				}).then(function (resp){
					$scope.update = resp.data
					console.log($scope.update);
					if($scope.update == 1){
						$scope.app.addAlert('gritter-success', 'การแก้ไขเรียบร้อย', 4000);
						$scope.back()
					} else {
						$scope.app.addAlert('gritter-error', 'เกิดข้อผิดพลาด', 4000);
					}
				})
			}
		})
	}


	$scope.back = function (){
		$rootScope.criteria = {}
		$location.path('/users')
	}
}


function HeadUserListCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route,$modal,myFunction) {
	$log.info('Enter HeadUserListCtrl');



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
        url:'API/USER/getAllHeadUser.php',
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
  				url:'API/USER/getHeadUserTotal.php',
  				method:'POST'
  			}).success(function (data){
  				$scope.pTotal = data;
					console.log($scope.pTotal);
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
		$location.path('/user-head/edit/'+id)
	}


	$scope.back = function (){
		window.history.back()
	}
}

function HeadUserDetailCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route,$modal,myFunction,$routeParams) {
	$log.info('Enter HeadUserDetailCtrl');

	$scope.id = $routeParams.id

	$http({
		url:'API/LISTOFVALUE/getAllDepartment.php',
		method:'POST',
	}).then(function (resp){
		$scope.departmentList = resp.data;
		console.log($scope.departmentList);
	})



	$http({
		url:'API/LISTOFVALUE/getPositionList.php',
		method:'POST',
	}).then(function (resp){
		$scope.positionList = resp.data;
		console.log($scope.positionList);
	})


	$http({
		url:'API/LISTOFVALUE/getAllRole.php',
		method:'POST',
	}).then(function (resp){
		$scope.roleList = resp.data;
		console.log($scope.roleList);
	})

	$scope.search = function (){
		$http({
			url:'API/USER/getUserByID.php',
			method:'POST',
			data:{
				'user_id':$scope.id
			}
		}).then(function (resp){
			$scope.userObj = resp.data;
			console.log($scope.userObj);

			$rootScope.criteria.preName = $scope.userObj.Pre_name
			$rootScope.criteria.firstName = $scope.userObj.Mem_name
			$rootScope.criteria.lastName = $scope.userObj.Mem_lastname
			$rootScope.criteria.department = $scope.userObj.Cost_id
			$rootScope.criteria.role = $scope.userObj.Permiss_ENS
			$rootScope.criteria.position = $scope.userObj.Position_ID

		})
	}
	$scope.search()
	function returnHash(){
		abc = "abcdefghijklmnopqrstuvwxyz1234567890".split("");
		var token="";
		for(i=0;i<32;i++){
				 token += abc[Math.floor(Math.random()*abc.length)];
		}
		return token; //Will return a 32 bit "hash"
	}
	console.log(returnHash());
	$scope.edit = function (){
		myFunction.confirmSaveBox().result.then(function (ok){
			if(ok){
				$http({
					url:'API/USER/updateUserByID.php',
					method:'POST',
					data:{
						'preName':$rootScope.criteria.preName,
						'firstName':$rootScope.criteria.firstName,
						'lastName':$rootScope.criteria.lastName,
						'position':$rootScope.criteria.position,
						'role':$rootScope.criteria.role,
						'user_id':$scope.id,
						'token': returnHash()
					}
				}).then(function (resp){
					$scope.update = resp.data
					console.log($scope.update);
					if($scope.update == 1){
						$scope.app.addAlert('gritter-success', 'การแก้ไขเรียบร้อย', 4000);
						$scope.back()
					} else {
						$scope.app.addAlert('gritter-error', 'เกิดข้อผิดพลาด', 4000);
					}
				})
			}
		})
	}


	$scope.back = function (){
		$rootScope.criteria = {}
		$location.path('/user-head')
	}
}
