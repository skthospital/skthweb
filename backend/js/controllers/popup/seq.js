function SeqPopupCtrl($rootScope,$scope,$modalInstance,$http,$compile,$timeout,$location,$log,$modal,$window,params_month,params_year,params_ward_id) {
    $log.info('Enter SeqPopupCtrl');

    console.log(params_month);
    console.log(params_year);
    console.log(params_ward_id);

$scope.list = ["one", "two", "thre", "four", "five", "six"];

    $scope.save = function (){
      $rootScope.criteria.user = {}
    }

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
        $rootScope.criteria.user = {}
        $rootScope.criteria.redeemList = []
    };
}
