angular.module('services.backup', [])
    .service('backup', ['$rootScope', '$route', '$translate', '$modal', '$http', function ($rootScope, $route, $translate, $modal, $http,$scope) {

      this.save = function (data){
        console.log("data=",data);
        return $http({
          url:'API/SCHEDULE/DRAF/createScheduleDetailBackup.php',
          method:'POST',
          data:{
            'ward_id':data.sch_ward_id,
            'month_id': data.MONTHNO,
            'year_id': data.sch_year
          }
        }).then(function (resp){
          let responseObj = resp.data;
          return responseObj
        })
      }
    }]);
