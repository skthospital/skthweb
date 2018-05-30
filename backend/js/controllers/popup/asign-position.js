function AsignPositionPopupCtrl($rootScope, $scope, $modalInstance, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate, myFunction, $modal, $window, params_mem_id) {
    $log.info('Enter AsignPositionPopupCtrl');
    $scope.mem_id = params_mem_id;
    $http({
      url:'API/LISTOFVALUE/getPositionList.php',
      method:'PSOT'
    }).then(function (resp){
      $scope.positionList = resp.data;
      console.log($scope.positionList);
    })

    $scope.save = function (){
      $http({
        url:'API/POPUP/updatePersonalPosition.php',
        method:'POST',
        data:{
          'Mem_ID':$scope.mem_id,
          'Position_ID':$rootScope.criteria.position
        }
      }).then(function (resp){
        $scope.updatePosition = resp.data;
        if($scope.updatePosition == 1){
          location.reload()
        }
        console.log($scope.updatePosition);
      })
    }

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}
