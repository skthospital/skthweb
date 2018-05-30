angular.module('services.work', [])
    .service('work', ['$rootScope', '$route', '$translate', '$modal', '$http','jet', function ($rootScope, $route, $translate, $modal, $http, jet) {

        //######################################## [START] SWITCH LANGUAGE ########################################


        this.getStatus_m = function (val){
          return $http({
            url:'API/SCHEDULE/DRAF/getWorkStatus.php',
            method:'POST',
            data:{
              status:val
            }
          }).then(function (resp){
            let responseObj = resp.data;
            return responseObj
          })
        }

        this.getStatus_e = function (val){
          return $http({
            url:'API/SCHEDULE/DRAF/getWorkStatus.php',
            method:'POST',
            data:{
              status:val
            }
          }).then(function (resp){
            let responseObj = resp.data;
            return responseObj
          })
        }

        this.getStatus_n = function (val){
          return $http({
            url:'API/SCHEDULE/DRAF/getWorkStatus.php',
            method:'POST',
            data:{
              status:val
            }
          }).then(function (resp){
            let responseObj = resp.data;
            return responseObj
          })
        }



        this.progress = function (month,year,ward){
          return $http({
            url:'API/SCHEDULE/WARD/getScheduleProcess.php',
            method:'POST',
            data:{
              'month_no':month,
              'year_no':year,
              'ward_id':ward
            }
          }).then(function (resp){
            let responseObj = resp.data;
            return responseObj
          })
        }
        this.getScheduleDetailByDay = function (data){
          console.log(data);
          return $http({
            url:'API/SCHEDULE/DRAF/getWorkStatusUserByDay.php',
            method:'POST',
            data:{
              'user_id':data.user_id,
              'day':data.day,
              'month':data.month,
              'year':data.year,
              'ward_id':data.ward
            }
          }).then(function (resp){
            let responseObj = resp.data;
            return responseObj
          })
        }

        this.getScheduleDetail = function (data){
          return $http({
            url:'API/DRAF/getUserData.php',
            method:'POST',
            data:{
              'user_id':data.user_id,
              'month_id':data.month,
              'year_id':data.year,
              'ward_id':data.ward
            }
          }).then(function (resp){
            let responseObj = resp.data;
            return responseObj
          })
        }


        this.getScheduleDetailUser = function (data){
          return $http({
            url:'API/DRAF/getUserDataHomePage.php',
            method:'POST',
            data:{
              'user_id':data.user_id
            }
          }).then(function (resp){
            let responseObj = resp.data
            return responseObj
          })
        }

        this.getScheduleDetailUserSwop = function (data){
          console.log(data);
          return $http({
            url:'API/DRAF/getUserDataHomePageSwop.php',
            method:'POST',
            data:{
              'user_id':data.user_id,
              'month_id':data.month_id
            }
          }).then(function (resp){
            let responseObj = resp.data
            return responseObj
          })
        }


        this.makeObjList = function (data){
          let workObj = []
          return $http({
            url:'API/SCHEDULE/DRAF/getScheduleDetailByMemID.php',
            method:'POST',
            data:{
              'user_id':data.user_id,
              'month':data.month,
              'year':data.year,
              'ward_id':data.ward
            }
          }).then(function (resp){
            let responseObj = resp.data
            return responseObj;
          })
        }




    }]);
