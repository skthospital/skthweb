function ChangeWorkPopupCtrl($rootScope,$scope,$modalInstance,$http,$compile,$timeout,$location,$log,$modal,$window,params_mem_first,work,jet) {
    $log.info('Enter ChangeWorkPopupCtrl');

    $scope.firstMember = params_mem_first

    $http({
      url:'API/USER/getUserNameByUserId.php',
      method:'POST',
      data:{
        'userId':$scope.firstMember
      }
    }).then(function (res){
      $scope.firstMemberObj = res.data;
    })


    $http({
      url:'API/USER/getUserNameByUserId.php',
      method:'POST',
      data:{
        'userId':$scope.secondMember
      }
    }).then(function (res){
      $scope.secondMemberObj = res.data;
    })
    let month = $rootScope.criteria.popupYear+"-"+$rootScope.criteria.popupMonth
    $scope.totalMonth = moment(month, "YYYY-MM").daysInMonth()



    $scope.dayFirstList = []

    let prepareFirstObj = {
      user_id:$scope.firstMember,
      month:$rootScope.criteria.popupMonth,
      year:$rootScope.criteria.popupYear,
      ward:$rootScope.criteria.popupWard
    }
    work.getScheduleDetail(prepareFirstObj).then(function (resp){
      $scope.firstDayList = resp
      let c = 0;

      angular.forEach($scope.firstDayList,function (item){

        var dt = moment(item.t_date, "YYYY-MM-DD HH:mm:ss")
        if(dt.format('dddd') == 'Monday'){
          $scope.dayText = 'จันทร์'
        }else if (dt.format('dddd') == 'Tuesday'){
          $scope.dayText = 'อังคาร'
        }else if (dt.format('dddd') == 'Wednesday'){
          $scope.dayText = 'พุธ'
        } else if (dt.format('dddd') == 'Thursday'){
          $scope.dayText = 'พฤหัสบดี'
        }else if (dt.format('dddd') == 'Friday'){
          $scope.dayText = 'ศุกร์'
        }else if (dt.format('dddd') == 'Saturday'){
          $scope.dayText = 'เสาร์'
        }else if (dt.format('dddd') == 'Sunday'){
          $scope.dayText = 'อาทิตย์'
        }

        $scope.dayFirstList.push({dt:$scope.dayText,data:item,day:item.t_day_no,dis:false,category:item.wl_category})

      })
    })

    $scope.daySecondList = []

    let prepareSecondObj = {
      user_id:$scope.secondMember,
      month:$rootScope.criteria.popupMonth,
      year:$rootScope.criteria.popupYear,
      ward:$rootScope.criteria.popupWard
    }
    work.getScheduleDetail(prepareSecondObj).then(function (resp){
      $scope.secondDayList = resp
      angular.forEach($scope.secondDayList,function (item){

        var dt = moment(item.t_date, "YYYY-MM-DD HH:mm:ss")
        if(dt.format('dddd') == 'Monday'){
          $scope.dayText = 'จันทร์'
        }else if (dt.format('dddd') == 'Tuesday'){
          $scope.dayText = 'อังคาร'
        }else if (dt.format('dddd') == 'Wednesday'){
          $scope.dayText = 'พุธ'
        } else if (dt.format('dddd') == 'Thursday'){
          $scope.dayText = 'พฤหัสบดี'
        }else if (dt.format('dddd') == 'Friday'){
          $scope.dayText = 'ศุกร์'
        }else if (dt.format('dddd') == 'Saturday'){
          $scope.dayText = 'เสาร์'
        }else if (dt.format('dddd') == 'Sunday'){
          $scope.dayText = 'อาทิตย์'
        }
        $scope.daySecondList.push({dt:$scope.dayText,data:item,day:item.t_day_no,dis:false,category:item.wl_category})
      })
    })



    $http({
      url:'API/LISTOFVALUE/getMonthById.php',
      method:'POST',
      data:{
        'month':$rootScope.criteria.popupMonth
      }
    }).then(function (resp){
      $scope.monthObj = resp.data;
    })

    $rootScope.criteria.swopWork = {}

    $scope.firstWork = function (){

      $scope.firstValue = JSON.parse($rootScope.criteria.day_first)
      // console.log($scope.firstValue);
      // let s = _.where($scope.daySecondList,{ day: $scope.firstValue.day})
      // console.log("s",s);
      // if(s == undefined){
      //   let f = _.where($scope.dayFirstList,{ day: $scope.firstValue.day})
      //   console.log("f=",f);
      // } else {
      //   angular.forEach(s,function (item){
      //     console.log(item);
      //     item.dis = true
      //   })
      // }

    }

    $scope.secondWork = function (){
      $scope.secondValue = JSON.parse($rootScope.criteria.day_second)

      // let f = _.where($scope.dayFirstList,{ day: $scope.secondValue.day})
      // console.log("f",f);
      // if(f == undefined){
      //   let s = _.where($scope.daySecondList,{ day: $scope.secondValue.day})
      //   console.log("s=",s);
      // } else {
      //   angular.forEach(f,function (item){
      //     console.log(item);
      //     item.dis = true
      //   })
      //
      // }
    }


    $scope.save = function (){


      console.log($scope.firstValue);
      let findFirstWorkSwop = _.findWhere($rootScope.workList.data,
        { wl_hr: $scope.firstValue.data.wl_hr,
          wl_category:$scope.firstValue.data.wl_category,
          wl_swop:1,
          wl_ot: $scope.firstValue.data.wl_ot
        }
      );
      console.log("first=",findFirstWorkSwop);

      console.log($scope.secondValue);
      let findSecondWorkSwop = _.findWhere($rootScope.workList.data,
        { wl_hr: $scope.secondValue.data.wl_hr,
          wl_category:$scope.secondValue.data.wl_category,
          wl_swop:1,
          wl_ot: $scope.secondValue.data.wl_ot
        }
      );
      console.log("sec=",findSecondWorkSwop);


      $http({
        url:'API/SCHEDULE/SWOP/updateFirstPerson.php',
        method:'POST',
        data:{
          day_id_st:$scope.firstValue.data.t_day_no,
          day_id_nd:$scope.secondValue.data.t_day_no,
          month_id:$scope.firstValue.data.t_month_no,
          year_id:$scope.firstValue.data.t_year_no,
          work_id:findSecondWorkSwop.wl_id,
          period:$scope.secondValue.data.wl_category,
          period_old:$scope.firstValue.data.wl_category,
          ward_id:$rootScope.criteria.popupWard,
          user_id:$scope.firstMember
        }
      }).then(function (resp){
        $scope.swopFirstPerson = resp.data;
        console.log($scope.swopFirstPerson);
        if($scope.swopFirstPerson == 1){

          $http({
            url:'API/SCHEDULE/SWOP/updateSecondPerson.php',
            method:'POST',
            data:{
              day_id_st:$scope.firstValue.data.t_day_no,
              day_id_nd:$scope.secondValue.data.t_day_no,
              month_id:$scope.secondValue.data.t_month_no,
              year_id:$scope.secondValue.data.t_year_no,
              work_id:findFirstWorkSwop.wl_id,
              period:$scope.firstValue.data.wl_category,
              period_old:$scope.secondValue.data.wl_category,
              ward_id:$rootScope.criteria.popupWard,
              user_id:$scope.secondMember
            }

          }).then(function (resp){
            $scope.swopSecondPerson = resp.data;
            console.log($scope.swopSecondPerson);
            if($scope.swopSecondPerson == 1){
              $scope.app.addAlert('gritter-success', 'บันทึกเรียบร้อย', 4000);
              $scope.cancel()
              $rootScope.criteria.search()


              $http({
                url:'API/SCHEDULE/SWOP/saveChangeWork.php',
                method:'POST',
                data:{
                  user_id_st:$scope.firstMember,
                  work_st:findFirstWorkSwop.wl_id,
                  date_st:$scope.firstValue.data.t_day_no,
                  month_st:$scope.firstValue.data.t_month_no,
                  year_st:$scope.firstValue.data.t_year_no,

                  user_id_nd:$scope.secondMember,
                  work_nd:findSecondWorkSwop.wl_id,
                  date_nd:$scope.secondValue.data.t_day_no,
                  month_nd:$scope.secondValue.data.t_month_no,
                  year_nd:$scope.secondValue.data.t_year_no,
                }
              }).then(function (resp){
                console.log("saveChangeWork=",resp);
              })


            }

          })
        }
      })







    }



    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}
