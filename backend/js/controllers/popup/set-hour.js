function SetHourPopupCtrl($rootScope,$scope,$modalInstance,$http,$compile,$timeout,$location,$log,$modal,$window,params_user_id,params_month_id,params_year_id,params_ward_id,params_hr) {
    $log.info('Enter SetHourPopupCtrl');



    console.log(params_user_id);
    console.log(params_month_id);
    console.log(params_year_id);
    console.log(params_ward_id);
    console.log(params_hr);
    $http({
      url:'API/LISTOFVALUE/getScheduleHr.php',
      method:'POST',
      data:{
        'user_id':params_user_id,
        'month_id':params_month_id,
        'year_id':params_year_id
      }
    }).then(function (resp){
      $scope.scheduleObj = resp.data;
      console.log($scope.scheduleObj);
    })
    $http({
      url:'API/LISTOFVALUE/getPersonalByMemId.php',
      method:'POST',
      data:{
        'mem_id':params_user_id
      }
    }).then(function (resp){
      $scope.userObj = resp.data;
      console.log($scope.userObj);
      if(params_hr == 0) {
        $scope.txt = 'ชั่งโมงละ'
        $scope.total = parseInt($scope.userObj.Position_OTRate) / 8
      } else {
        $scope.txt = 'แก้ไขเป็น'
        $scope.total = params_hr
      }

    })


    $http({
      url:'API/LISTOFVALUE/getWardById.php',
      method:'POST',
      data:{
        'ward_id':params_ward_id
      }
    }).then(function (resp){
      $scope.wardObj = resp.data
      console.log($scope.wardObj);
    })

    $http({
      url:'API/LISTOFVALUE/getMonthById.php',
      method:'POST',
      data:{
        'month':params_month_id
      }
    }).then(function (resp){
      $scope.monthObj = resp.data;
      console.log($scope.monthObj);
    })
    $scope.year = parseInt(params_year_id)+543


    $scope.save = function (){
      $http({
        url:'API/LISTOFVALUE/updateScheduleHr.php',
        method:'POST',
        data:{
          'user_id':params_user_id,
          'month_id':params_month_id,
          'year_id':params_year_id,
          'ward_id':params_ward_id,
          'hr':$rootScope.criteria.hour
        }
      }).then(function (resp){
        $scope.updated = resp.data;
        console.log($scope.updated);
        if($scope.updated == 1){
          $scope.app.addAlert('gritter-success', 'ตั่งค่าเรียบร้อย', 4000);
          $rootScope.criteria.search()
          $scope.cancel()
        }
      })
    }

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
        $rootScope.criteria.user = {}
        $rootScope.criteria.redeemList = []
    };
}
