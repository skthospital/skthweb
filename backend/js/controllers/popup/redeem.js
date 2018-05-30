function RedeemPopupCtrl($rootScope,$scope,$modalInstance,$http,$compile,$timeout,$location,$log,$modal,$window,params_redeem1,params_redeem2,params_month,params_year,params_ward_id) {
    $log.info('Enter DrafWorkPopupCtrl');

    console.log(params_redeem1);
    console.log(params_redeem2);
    console.log(params_month);
    console.log(params_year);
    console.log(params_ward_id);

    $scope.user1 = params_redeem1;
    $scope.user2 = params_redeem2;

    $scope.save = function (){
      $rootScope.criteria.user = {}
    }

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
        $rootScope.criteria.user = {}
        $rootScope.criteria.redeemList = []
    };
}
