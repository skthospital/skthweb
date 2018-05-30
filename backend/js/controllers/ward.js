angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/wards',{templateUrl: _.toHttpGetUrl('content/ward/list.html'),controller: WardListCtrl});
	$routeProvider.when('/ward/create/:page',{templateUrl: _.toHttpGetUrl('content/ward/create-detail.html'),controller: WardDetailCreateCtrl});
	$routeProvider.when('/ward/edit/:w_id',{templateUrl: _.toHttpGetUrl('content/ward/edit-detail.html'),controller: WardDetailEditCtrl});
} ]);

function WardListCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route,$modal,myFunction) {
	$log.info('Enter WardListCtrl');




		if (!$rootScope.paging) {
			$rootScope.paging = APP.DEFAULT_PAGING;
		}
		if ($rootScope.criteria) {
			$rootScope.criteria = {};
		}

  // table
  $scope.search = function (){
		angular.extend($rootScope.criteria, $rootScope.paging);
    $http({
      url:'API/WARDS/getAllWard.php',
      method:'POST',
			data:{
				'w_name':$rootScope.criteria.w_name,
				'w_build_name':$rootScope.criteria.w_build_name,
				'w_nick_name':$rootScope.criteria.w_nick_name,
				'page':$rootScope.paging.pageNumber
			}
    }).then(function (resp){
      $scope.wardList = resp.data;
      console.log($scope.wardList);


			$http({
				url:'API/WARDS/getAllWardTotal.php',
				method:'POST'
			}).success(function (data){
				$scope.wTotal = data;
				$rootScope.paging.totalItems = $scope.wTotal.total;
				$rootScope.paging.showing = _.getShowing($rootScope.paging.pageNumber, $rootScope.paging.limit, $scope.wTotal.total);
			})
    })
  }

  $scope.search()
	$scope.selectPage = function(page) {
		$rootScope.paging.pageNumber = page;
		$scope.search();
	};
	$scope.gotoCreate = function (){
		$location.path('/ward/create/schedule')
	}
	$scope.gotoEdit = function (w_id){
		$location.path('/ward/edit/'+w_id)
	}
	$scope.clear = function (){
		$rootScope.criteria = {};
		$scope.search()
	}
	$scope.delete = function (w_id){
		myFunction.confirmDeleteBox().result.then(function (ok){
			if(ok){
				$http({
					url:'API/WARDS/deleteWard.php',
					method:'POST',
					data:{
						'w_id':w_id
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

function WardDetailCreateCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route,$modal,myFunction,$routeParams) {
	$log.info('Enter WardDetailCreateCtrl');

	if (!$rootScope.paging) {
		$rootScope.paging = APP.DEFAULT_PAGING;
	}

	$scope.roles = [];
	//  console.log($scope.roles);


	 $scope.watch = function(){
	 console.log($scope.user)
	 console.log($scope.roles);
	 }

	// get Costcenter
	$http({
		url:'API/WARDS/getAllDepartment.php',
		method:'POST'
	}).then(function (resp){
		$scope.departmentList = resp.data
		$scope.searchList = resp.data
		angular.forEach($scope.departmentList,function (item){
			if(item.DIS_STATUS == 0){
				item.dis = false
			} else if (item.DIS_STATUS == 1){
				item.dis = true
			}
		})
		console.log($scope.departmentList);
	})

	$http({
		url:'API/WARDS/Personals.php',
		method:'GET'
	}).then(function (resp){
		$scope.getAllPersonal = resp.data;
		console.log($scope.getAllPersonal);
	})


	$scope.personalList = function (data){
		$scope.roles = [];
		$http({
			url:'API/WARDS/getPersonalByCostId.php',
			method:'POST',
			data:{
				cost_id:data
			}
		}).then(function (resp){
			$scope.userList = resp.data
			console.log($scope.userList);
			angular.forEach($scope.userList,function (item){
				$scope.roles.push(item)
				console.log(item);
			})
		})
	}
$scope.user = { roles: [] };
	// Header Table
	$scope.createTemplateUser = function (dep){


		angular.forEach($scope.user.roles,function (item){
			console.log("item=",item.roleId);
			$http({
				url:'API/WARDS/createTemplateUser.php',
				method:'POST',
				data:{
					'user_id':item.roleId,
					'dep' : dep
				}
			}).then(function (resp){
				console.log(resp.data);
			})
		})
	}


	$scope.create = function (){
		console.log($scope.user);
		console.log($scope.selectedItems);

		if($rootScope.criteria.dep == undefined){
			$scope.err = {}
			$scope.err.nameErr = true
		}else if($rootScope.criteria.w_build_name == undefined){
			$scope.err = {}
			$scope.err.buildNameErr = true
		}else if($rootScope.criteria.w_nick_name == undefined){
			$scope.err = {}
			$scope.err.nickErr = true
		}else{
			myFunction.confirmSaveBox().result.then(function (ok){
        // Call Backend
				$http({
					url:'API/WARDS/createWard.php',
					method:'POST',
					data:{
						'w_name':$rootScope.criteria.dep,
						'w_build_name':$rootScope.criteria.w_build_name,
						'w_nick_name':$rootScope.criteria.w_nick_name
					}
				}).then(function (resp){
					$scope.saved = resp.data;
					if($scope.saved == 1){
						$scope.createTemplateUser($rootScope.criteria.dep)
						$scope.app.addAlert('gritter-success', 'การบันทึกเสร็จสมบูรณ์', 4000);
						$location.path('/wards')

					}else{
						$scope.app.addAlert('gritter-error', 'การบันทึกเกิดข้อผิดพลาด', 4000);
					}
					console.log($scope.saved);
				})
			})
		}


	}
	// Case thows Mode


	$scope.back = function (){
		window.history.back()
	}


}

function WardDetailEditCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route,$modal,myFunction,$routeParams) {
	$log.info('Enter WardDetailEditCtrl');

	if (!$rootScope.paging) {
		$rootScope.paging = APP.DEFAULT_PAGING;
	}
	$rootScope.criteria = {};
	$scope.mode = $routeParams.mode

	$scope.roles = [];


	$http({
		url:'API/WARDS/getAllDepartment.php',
		method:'POST'
	}).then(function (resp){
		$scope.departmentList = resp.data
		$scope.searchList = resp.data

		console.log($scope.departmentList);
		angular.forEach($scope.departmentList,function (item){
			if(item.DIS_STATUS == 0){
				item.dis = false
			} else if (item.DIS_STATUS == 1){
				item.dis = true
			}
		})
	})


	$http({
		url:'API/WARDS/Personals.php',
		method:'GET'
	}).then(function (resp){
		$scope.getAllPersonal = resp.data;
		console.log($scope.getAllPersonal);
	})





	$scope.personalList = function (data){
		$scope.roles = [];
		$http({
			url:'API/WARDS/getPersonalByCostId.php',
			method:'POST',
			data:{
				cost_id:data
			}
		}).then(function (resp){
			$scope.userList = resp.data
			console.log($scope.userList);
			angular.forEach($scope.userList,function (item){
				$scope.roles.push(item)
				console.log(item);
			})
		})
	}
	$scope.user = { roles: [] };

	$scope.deleteTemplateUser = function (dep){
		console.log("roles=",$scope.roles);
		// delete
		let c = 0
		angular.forEach($scope.roles,function (item){
			console.log("item=",item.roleId);
			if (item.ID != null || item.ID != undefined) {
				$http({
					url:'API/WARDS/deleteTemplateUser.php',
					method:'POST',
					data:{
						'id':item.ID
					}
				}).then(function (resp){
					console.log(resp.data);
				})
			}
			c++
		})
		if(c == $scope.roles.length){
			//update
			angular.forEach($scope.user.roles,function (item){
				if(item.ID == null || item.ID == undefined){
					console.log("insert=",item);
					$http({
						url:'API/WARDS/createTemplateUser.php',
						method:'POST',
						data:{
							'user_id':item.roleId,
							'dep' : dep
						}
					}).then(function (resp){
						console.log(resp.data);
					})
				}
			})
		}



	}
	// Header Table
	$scope.err = {};
	$scope.w_id = $routeParams.w_id
		$http({
			url:'API/WARDS/getWardById.php',
			method:'POST',
			data:{
				'w_id':$scope.w_id
			}
		}).then(function (resp){
			$scope.wardObj = resp.data;
			// Set to criteria
			$rootScope.criteria.w_name = $scope.wardObj.w_name
			$rootScope.criteria.w_build_name = $scope.wardObj.w_build_name
			$rootScope.criteria.w_nick_name = $scope.wardObj.w_nick_name
			$http({
				url:'API/WARDS/getTemplateUser.php',
				method:'POST',
				data:{
					'cost_id':$rootScope.criteria.w_name
				}
			}).then(function (resp){
				$scope.userObj = resp.data
				console.log($scope.userObj);
				angular.forEach($scope.userObj,function (item){
					$scope.user.roles.push(item)
				})
			})
		})
		$scope.addUser = function (obj){
			console.log(JSON.parse(obj));
			let toJSON = JSON.parse(obj)
			let convName = toJSON.PRENAME+toJSON.FIRSTNAME+'  '+toJSON.LASTNAME + ' ['+ toJSON.LVLNAME + ']'
			let newObj = {roleId:toJSON.ID,roleName:convName}
			console.log(newObj);
			$scope.user.roles.push(newObj)

		}
	$scope.edit = function (){
		myFunction.confirmSaveBox().result.then(function(ok) {
			if (ok) {
				// Update Data
				$http({
					url:'API/WARDS/updateWardById.php',
					method:'POST',
					data:{
						'w_id':$scope.w_id,
						'w_name':$rootScope.criteria.w_name,
						'w_build_name':$rootScope.criteria.w_build_name,
						'w_nick_name':$rootScope.criteria.w_nick_name
					}
				}).then(function (resp){
					$scope.updateward = resp.data;
					if($scope.updateward == 1){
						// Success
						$scope.deleteTemplateUser($rootScope.criteria.w_name)
						$scope.app.addAlert('gritter-success', 'การแก้ไขเสร็จสมบูรณ์', 4000);
						 $location.path('/wards')
					}else{
            // Error
						$scope.app.addAlert('gritter-error', 'การแก้ไขเกิดข้อผิดพลาด', 4000);
					}
				})
			}
		});

	}

	// Case thows Mode


	$scope.back = function (){
		window.history.back()
	}


}
