function DrafWorkPopupCtrl($rootScope,$scope,$modalInstance,$http,$compile,$timeout,$location,$log,$modal,$window,params_date,params_month,params_year,params_user_id,params_ward_id,params_category,params_seq,jet) {
    $log.info('Enter DrafWorkPopupCtrl');


    $scope.mw_n = 0;
    $scope.ew_n = 0;
    $scope.nw_n = 0;
    $scope.mw_o = 0;
    $scope.ew_o = 0;
    $scope.nw_o = 0;
    $scope.dayWork = params_date;
    $scope.category = params_category;
    $scope.ward_id = params_ward_id
    $scope.user_id = params_user_id
    $scope.seq = params_seq

    $scope.editType = 0;
    $scope.setEdit = function (val){
      console.log(val);
      $scope.editType = val;
    }
    $rootScope.criteria.workVal = {}
    $http({
      url:'API/LISTOFVALUE/getAllWorkList.php',
      method:'GET'
    }).then(function (resp){
      $scope.workList = resp.data;
      console.log($scope.workList);
    })

    let date_val = params_year+'-'+params_month+'-'+params_date
    console.log(date_val);
    $http({
      url:'API/POPUP/getHolidayByDate.php',
      method:'POST',
      data:{
        'date_val':date_val
      }
    }).then(function (resp){
      $scope.holidayObj = resp;
      console.log($scope.holidayObj.data.length);
    })



    // getData
    if($scope.category != 0){
      $http({
        url:'API/SCHEDULE/DRAF/getPersonalData.php',
        method:'POST',
        data:{
          'user_id':$scope.user_id,
          'day_id':params_date,
          'month_id':params_month,
          'year_id':params_year,
          'ward_id':$scope.ward_id,
          'period':$scope.category
        }
      }).then(function (resp){
        // Personal Data
        $scope.personalData = resp.data
        console.log($scope.personalData);
      })
    }

    $http({
      url:'API/LISTOFVALUE/getMonthById.php',
      method:'POST',
      data:{
        'month':params_month
      }
    }).then(function (resp){
      // Month Name TH
      $scope.monthWork = resp.data;
    })
    $http({
      url:'API/LISTOFVALUE/countOff.php',
      method:'POST',
      data:{
        'user_id' :params_user_id,
        'day_id'  :params_date,
        'month_no':params_month,
        'year_no' :params_year
      }
    }).then(function (resp){
      // Count Data
      $scope.countOff = resp.data;
      console.log($scope.countOff);

    })
    // end getData

    // yearWork function
    $scope.yearWork = parseInt(params_year) + 543;
          $http({
            url:'API/LISTOFVALUE/getPersonalByMemId.php',
            method:'POST',
            data:{
              'mem_id':params_user_id
            }
          }).then(function (resp){
            $scope.userObj = resp.data;
            console.log($scope.userObj);
            $scope.user_id = $scope.userObj.Pre_name+$scope.userObj.Mem_name+"  "+$scope.userObj.Mem_lastname
          })
    // End yearWork function

    // save function
    $scope.save = function (type){
      if(type == 1){
        $scope.type = 1;
      }else {
        $scope.type = 0;
      }
      $scope.value = JSON.parse($rootScope.criteria.workVal)
      console.log($scope.value.wl_id);
      console.log($scope.value.wl_category);

      $http({
        url:'API/SCHEDULE/DRAF/updateScheduleDetail.php',
        method:'POST',
        data:{
          'user_id':params_user_id,
          'work_id':$scope.value.wl_id,
          'day_id':$scope.dayWork,
          'month_id':params_month,
          'year_id':params_year,
          'ward_id':params_ward_id,
          'period':$scope.value.wl_category
        }
      }).then(function (resp){
        $scope.updateSche = resp.data;
        console.log("updateSche =",$scope.updateSche);
        if($scope.updateSche == 1){
          $modalInstance.dismiss('cancel');
          let saveResp = jet.saveScheduleDetailList(params_date,$scope.value,params_user_id,$scope.type)
          $scope.app.addAlert('gritter-success', 'บันทึกเรียบร้อย', 4000);
        }

        if($scope.value.wl_id == 22){
          let offObj = {
            user_id : params_user_id,
            ward_id : params_ward_id,
            date_id : $scope.dayWork,
            month_id : params_month,
            year_id : params_year
          }
          jet.isOff(offObj)
        }
      })

    } // End save function


    // saveOff function
    $scope.useOff = function (){
      $http({
        url:'API/LISTOFVALUE/getScheduleOffCurentId.php',
        method:'POST',
        data:{
          'user_id':params_user_id,
          'status':1
        }
      }).then(function (resp){
        $scope.schOff = resp.data;
        console.log($scope.schOff.off_id);
        $http({
          url:'API/SCHEDULE/DRAF/updateScheduleOff.php',
          method:'POST',
          data:{
            'off_id':$scope.schOff.off_id,
            'status':2
          }
        }).then(function (resp){
          $scope.updateOff = resp.data;
          if($scope.updateOff == 1){
            $scope.save(1)
          }
          console.log("useOff=",$scope.updateOff);
        })

      })


    }// End save function


    // off function
    $scope.off = function (){

      console.log($scope.personalData.wl_off_ref);

      $http({
        url:'API/SCHEDULE/DRAF/updateScheduleDetail.php',
        method:'POST',
        data:{
          'user_id':params_user_id,
          'work_id':$scope.personalData.wl_off_ref,
          'day_id':$scope.dayWork,
          'month_id':params_month,
          'year_id':params_year,
          'ward_id':params_ward_id
        }
      }).then(function (resp){
        $scope.updateSche = resp.data;
        if($scope.updateSche == 1){
          $http({
            url:'API/SCHEDULE/DRAF/updateUserTable.php',
            method:'POST',
            data:{
              'user_id':params_user_id,
              'work_id':$scope.offValue,
              'day_id':$scope.dayWork,
              'month_id':params_month,
              'year_id':params_year,
              'ward_id':params_ward_id
            }
            }).then(function (response){
            $scope.userTable = response.data;
            console.log($scope.userTable);
            if($scope.userTable == 1){
              $http({
                url:'API/SCHEDULE/DRAF/createScheduleOff.php',
                method:'POST',
                data:{
                  'user_id':params_user_id,
                  'ward_id':params_ward_id,
                  'day_id':params_date,
                  'month_id':params_month,
                  'year_id':params_year,
                  'status':'1'
                }
              }).then(function (resp){
                $scope.scheOff = resp.data;
               console.log($scope.scheOff);
              })
              let type = 'off'
              let saveResp = jet.saveScheduleDetailList(params_date,$scope.value,params_user_id,type)
              $modalInstance.dismiss('cancel');
              $scope.app.addAlert('gritter-success', 'บันทึกเรียบร้อย', 4000);
            }
          })
        }
      })
    }// End off function

    $scope.delete = function (){

      $http({
        url:'API/SCHEDULE/DRAF/updateScheduleDetailPopup.php',
        method:'POST',
        data:{
          'user_id':params_user_id,
          'work_id':0,
          'day_id':$scope.dayWork,
          'month_id':params_month,
          'year_id':params_year,
          'ward_id':params_ward_id,
          'period':$scope.personalData.wl_category
        }
      }).then(function (resp){
        $scope.updateSche = resp.data;
        console.log($scope.updateSche);
        if($scope.updateSche == 1){
          jet.delete(params_date,$scope.personalData.wl_category,$scope.seq,$scope.personalData)
          $modalInstance.dismiss('cancel');
          $scope.app.addAlert('gritter-success', 'บันทึกเรียบร้อย', 4000);
          // if($scope.personalData.t_work_type == 1){
          //   let updateUseOff = {
          //     user_id : params_user_id,
          //     ward_id : params_ward_id,
          //     date_id : $scope.dayWork,
          //     month_id : params_month,
          //     year_id : params_year,
          //     status : 1,
          //     statusSearch : 2
          //   }
          //   jet.updateOff(updateUseOff)
          // }

        }
      })
    }
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}
