function ApprovePopupCtrl($rootScope, $scope, $modalInstance, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate, myFunction, $modal, $window,params_schd_id) {
    $log.info('Enter ApprovePopupCtrl');

    console.log(params_schd_id);

    $scope.sch_id = params_schd_id;

    $http({
      url:'API/SCHEDULE/DRAF/getViewApprove.php',
      method:'POST',
      data:{
        id:$scope.sch_id
      }
    }).then(function (resp){
      $scope.sch = resp.data
      console.log($scope.sch);
      $rootScope.criteria.head_popup = $scope.sch.sch_head
      $rootScope.criteria.invest_popup = $scope.sch.sch_invest
    })




    $http({
  		url:'API/LISTOFVALUE/getHeadPersonal.php',
  		method:'GET'
  	}).then(function (resp){
  		$scope.headList = resp.data
  	})

    $http({
  		url:'API/LISTOFVALUE/getAllPersonal.php',
  		method:'GET'
  	}).then(function (resp){
  		$scope.allPersonalList = resp.data
  	})

    $scope.save = function (){

      $scope.h_value = JSON.parse($rootScope.criteria.head_popup)
      $scope.i_value = JSON.parse($rootScope.criteria.invest_popup)
      console.log($scope.h_value);
      console.log($scope.i_value);

      $http({
        url:'API/SCHEDULE/DRAF/updateScheduleMaster.php',
        method:'POST',
        data:{
          'sch_id':$scope.sch_id,
          'head':$scope.h_value.Mem_ID,
          'invest':$scope.i_value.Mem_ID
        }
      }).then(function (resp){
        $scope.updateSCHM = resp.data;
        console.log($scope.updateSCHM);
        if($scope.updateSCHM == 1){
          $rootScope.criteria.head = $scope.h_value.Pre_name+$scope.h_value.Mem_name+"  "+$scope.h_value.Mem_lastname
          $rootScope.criteria.invest = $scope.i_value.Pre_name+$scope.i_value.Mem_name+"  "+$scope.i_value.Mem_lastname
          $scope.app.addAlert('gritter-success', 'บันทึกเรียบร้อย', 4000);
          $scope.cancel()
        }
      })


    }
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}
