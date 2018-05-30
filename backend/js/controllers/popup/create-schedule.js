function createSchedulePopup($rootScope, $scope, $modalInstance, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate, myFunction, $modal, $window) {
    $log.info('Enter createSchedulePopup');

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}
