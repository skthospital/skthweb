angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/holiday',{templateUrl: _.toHttpGetUrl('content/holiday/list.html'),controller: HolidayListCtrl});

} ]);

function HolidayListCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route,$modal,myFunction) {
	$log.info('Enter HolidayListCtrl');

	if (!$rootScope.paging) {
		$rootScope.paging = APP.DEFAULT_PAGING;
	}


  $scope.save = function (){
		myFunction.confirmSaveBox().result.then(function(ok) {
			if (ok) {
				$http({
					url:'API/HOLIDAY/create.php',
					method:'POST',
					data:{
						'name':$rootScope.criteria.name,
						'hl_date':$rootScope.criteria.hl_date
					}
				}).then(function (resp){
					$scope.saved = resp.data;
					console.log($scope.saved);
					if($scope.saved == 1){
						$scope.app.addAlert('gritter-success', 'บันทึกเรียบร้อย', 4000);
						$scope.search()
						$rootScope.criteria = {}
					}
				})
			}
		})



  }

	$scope.edit = function (id,name,hl_date){
		$scope.editBtn = true;
		$rootScope.criteria.id = id;
		$rootScope.criteria.name = name;
		$rootScope.criteria.hl_date = hl_date;
	}


	$scope.editSave = function (id,name,hl_date){

		myFunction.confirmDeleteBox().result.then(function(ok) {
			if (ok) {
				$http({
					url:'API/HOLIDAY/update.php',
					method:'POST',
					data:{
						'h_id':id,
						'h_name':name,
						'h_date':hl_date
					}
				}).then(function (resp){
					$scope.updated = resp.data;
					console.log($scope.updated);
					if($scope.updated == 1){
						$scope.app.addAlert('gritter-success', 'แก้ไขเรียบร้อย', 4000);
						$scope.search()
						$rootScope.criteria = {}
						$scope.editBtn = false;
					}
				})
			}
		})

	}
  $scope.delete = function (id){
    myFunction.confirmDeleteBox().result.then(function(ok) {
      if (ok) {
        $http({
          url:'API/HOLIDAY/delete.php',
          method:'POST',
          data:{
            'id':id
          }
        }).then(function (resp){
          $scope.deleted = resp.data;
          if($scope.deleted == 1){
            $scope.app.addAlert('gritter-success', 'ลบเรียบร้อย', 4000);
            $scope.search()
          }
        })
      }
    })
  }
  $scope.search = function (){
    $http({
      url:'API/HOLIDAY/holidays.php',
      method:'POST'

    }).then(function (resp){
      $scope.holidayList = resp.data;
      console.log($scope.holidayList);
    })
  }
  $scope.search()

}
