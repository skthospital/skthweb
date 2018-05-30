function AddUserPopupCtrl($rootScope, $scope, $modalInstance, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate, myFunction, $modal, $window,params_ward_id,params_month,params_year) {
    $log.info('Enter AddUserPopupCtrl');

    console.log(APP.ENV);
    $scope.month_id = params_month
    $scope.year = params_year;

    console.log($scope.year);

    $http({
      url:'API/LISTOFVALUE/getWardById.php',
      method:'POST',
      data:{
        'ward_id':params_ward_id
      }
    }).then(function (resp){
      $scope.wardObj = resp.data;
      console.log($scope.wardObj);
    })


    $http({
      url:'API/LISTOFVALUE/Personals.php',
      method:'POST',
      data:{
        'ward_id':params_ward_id,
        'month_id':$scope.month_id
      }
    }).then(function (resp){
      $scope.personalList = resp.data;
      console.log($scope.personalList);
      angular.forEach($scope.personalList,function (item){
        if(item.DISABLE_SCHD == '1'){
          if(item.MONTH_SCHD == $scope.month_id){
            item.disabledList = true
          }else{
            item.disabledList = false
          }
        } else {
          item.disabledList = false
        }
      })

    })


    $scope.save = function (){
      $http({
        url:'API/SCHEDULE/drawUserScheduleDetail.php',
        method:'POST',
        data:{
          'mem_id':$rootScope.criteria.personal,
          'month_no':$scope.month_id,
          'ward_id':params_ward_id,
          'year':$scope.year
        }
      }).then(function (resp){
        $scope.draw = resp.data;
        if($scope.draw == 1){

          $rootScope.criteria.search()
          $modalInstance.dismiss('cancel');
          $scope.app.addAlert('gritter-success', 'บันทึกเรียบร้อย', 4000);
        }
      })
    }
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}
