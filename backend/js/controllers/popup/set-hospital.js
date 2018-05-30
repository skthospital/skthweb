function HospitalPopupCtrl($rootScope,$scope,$modalInstance,$http,$compile,$timeout,$location,$log,$modal,$window,params_hos) {
    $log.info('Enter HospitalPopupCtrl');

    console.log(params_hos);



    $http({
      url:'API/LISTOFVALUE/getHospital.php',
      method:'POST',
      data:{
        'hos':params_hos
      }
    }).then(function (resp){
      $scope.hospitalObj = resp.data
      console.log($scope.hospitalObj);
      $rootScope.criteria.hos_name = $scope.hospitalObj.lov_name
    })


    $scope.save = function (){
      $http({
        url:'API/LISTOFVALUE/updateHospital.php',
        method:'POST',
        data:{
          'hos':params_hos,
          'name':$rootScope.criteria.hos_name
        }
      }).then(function (resp){
        $scope.updated = resp.data
        console.log($scope.updated);
        if($scope.updated == 1){
          $scope.app.addAlert('gritter-success', 'บันทึกเรียบร้อย', 4000);
          $rootScope.criteria.renderHospital()
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
