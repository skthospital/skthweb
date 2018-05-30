angular.module('services.jet', [])
    .service('jet', ['$rootScope', '$route', '$translate', '$modal', '$http', function ($rootScope, $route, $translate, $modal, $http,$scope) {

        //######################################## [START] SWITCH LANGUAGE ########################################
        this.getStatus = function (val){
          let filteredGoal = _.findWhere($rootScope.workList.data, {wl_id: val});
          return filteredGoal
        }

        this.delete = function (d,category,seq,wl){

          console.log("wl=",wl);
          let obj = _.find($rootScope.criteria.personalList, function(obj) { return obj.Mem_ID == user_id })
          console.log(category);
          if(wl.wl_ot == 1){
            $rootScope.criteria.personalList[seq].cTotal--
            $rootScope.criteria.OTTotal--
            $rootScope.criteria.personalList[seq].cOT  = $rootScope.criteria.personalList[seq].cOT - wl.Position_OTRate
            console.log($rootScope.criteria.personalList[seq].cOT);
            $rootScope.criteria.personalList[seq].cMoneyOT = Number($rootScope.criteria.personalList[seq].cOT.toFixed(1)).toLocaleString()
            $rootScope.criteria.OTMoneyTotal = $rootScope.criteria.OTMoneyTotal - parseInt(wl.Position_OTRate)
            $rootScope.criteria.OTMoneyTotalStr = Number($rootScope.criteria.OTMoneyTotal.toFixed(1)).toLocaleString()
          }
          if(wl.wl_en == 1){
            $rootScope.criteria.personalList[seq].sumNMTotal--
            $rootScope.criteria.NMTotal--
          }
          switch(d) {
            case '01':
                switch (category) {
                    case 'm':
                              $rootScope.criteria.personalList[seq].schd_d01_m = null
                    break;
                    case 'a':
                              $rootScope.criteria.personalList[seq].schd_d01_a = null
                    case 'n':
                              $rootScope.criteria.personalList[seq].schd_d01_n = null
                    break;
                }
             break;
             case '02':
                 switch (category) {
                     case 'm':
                           $rootScope.criteria.personalList[seq].schd_d02_m = null
                     break;
                     case 'a':
                           $rootScope.criteria.personalList[seq].schd_d02_a = null
                     case 'n':
                           $rootScope.criteria.personalList[seq].schd_d02_n = null
                     break;
                   default:
                 }
              break;
              case '03':
                  switch (category) {
                      case 'm':
                            $rootScope.criteria.personalList[seq].schd_d03_m = null
                      break;
                      case 'a':
                            $rootScope.criteria.personalList[seq].schd_d03_a = null
                      case 'n':
                            $rootScope.criteria.personalList[seq].schd_d03_n = null
                      break;
                    default:
                  }
               break;
               case '04':
                   switch (category) {
                       case 'm':
                             $rootScope.criteria.personalList[seq].schd_d04_m = null
                       break;
                       case 'a':
                             $rootScope.criteria.personalList[seq].schd_d04_a = null
                       case 'n':
                             $rootScope.criteria.personalList[seq].schd_d04_n = null
                       break;
                     default:
                   }
                break;
                case '05':
                    switch (category) {
                        case 'm':
                              $rootScope.criteria.personalList[seq].schd_d05_m = null
                        break;
                        case 'a':
                              $rootScope.criteria.personalList[seq].schd_d05_a = null
                        case 'n':
                              $rootScope.criteria.personalList[seq].schd_d05_n = null
                        break;
                      default:
                    }
                 break;
                 case '06':
                     switch (category) {
                         case 'm':
                               $rootScope.criteria.personalList[seq].schd_d06_m = null
                         break;
                         case 'a':
                               $rootScope.criteria.personalList[seq].schd_d06_a = null
                         case 'n':
                               $rootScope.criteria.personalList[seq].schd_d06_n = null
                         break;
                       default:
                     }
                  break;
                  case '07':
                      switch (category) {
                          case 'm':
                                $rootScope.criteria.personalList[seq].schd_d07_m = null
                          break;
                          case 'a':
                                $rootScope.criteria.personalList[seq].schd_d07_a = null
                          case 'n':
                                $rootScope.criteria.personalList[seq].schd_d07_n = null
                          break;
                        default:
                      }
                   break;
                   case '08':
                       switch (category) {
                           case 'm':
                                 $rootScope.criteria.personalList[seq].schd_d08_m = null
                           break;
                           case 'a':
                                 $rootScope.criteria.personalList[seq].schd_d08_a = null
                           case 'n':
                                 $rootScope.criteria.personalList[seq].schd_d08_n = null
                           break;
                         default:
                       }
                    break;
                    case '09':
                        switch (category) {
                          case 'm':
                                $rootScope.criteria.personalList[seq].schd_d09_m = null
                          break;
                          case 'a':
                                $rootScope.criteria.personalList[seq].schd_d09_a = null
                          case 'n':
                                $rootScope.criteria.personalList[seq].schd_d09_n = null
                          break;
                          default:
                        }
                     break;
                     case '10':
                         switch (category) {
                           case 'm':
                                 $rootScope.criteria.personalList[seq].schd_d10_m = null
                           break;
                           case 'a':
                                 $rootScope.criteria.personalList[seq].schd_d10_a = null
                           case 'n':
                                 $rootScope.criteria.personalList[seq].schd_d10_n = null
                           break;
                           default:
                         }
                      break;
                      case '11':
                          switch (category) {
                            case 'm':
                                  $rootScope.criteria.personalList[seq].schd_d11_m = null
                            break;
                            case 'a':
                                  $rootScope.criteria.personalList[seq].schd_d11_a = null
                            case 'n':
                                  $rootScope.criteria.personalList[seq].schd_d11_n = null
                            break;
                            default:
                          }
                       break;
                       case '12':
                           switch (category) {
                             case 'm':
                                   $rootScope.criteria.personalList[seq].schd_d12_m = null
                             break;
                             case 'a':
                                   $rootScope.criteria.personalList[seq].schd_d12_a = null
                             case 'n':
                                   $rootScope.criteria.personalList[seq].schd_d12_n = null
                             break;
                             default:
                           }
                        break;
                        case '13':
                            switch (category) {
                              case 'm':
                                    $rootScope.criteria.personalList[seq].schd_d13_m = null
                              break;
                              case 'a':
                                    $rootScope.criteria.personalList[seq].schd_d13_a = null
                              case 'n':
                                    $rootScope.criteria.personalList[seq].schd_d13_n = null
                              break;
                              default:
                            }
                         break;
                         case '14':
                             switch (category) {
                               case 'm':
                                     $rootScope.criteria.personalList[seq].schd_d14_m = null
                               break;
                               case 'a':
                                     $rootScope.criteria.personalList[seq].schd_d14_a = null
                               case 'n':
                                     $rootScope.criteria.personalList[seq].schd_d14_n = null
                               break;
                               default:
                             }
                          break;
                          case '15':
                              switch (category) {
                                case 'm':
                                      $rootScope.criteria.personalList[seq].schd_d15_m = null
                                break;
                                case 'a':
                                      $rootScope.criteria.personalList[seq].schd_d15_a = null
                                case 'n':
                                      $rootScope.criteria.personalList[seq].schd_d15_n = null
                                break;
                                default:
                              }
                           break;
                           case '16':
                               switch (category) {
                                 case 'm':
                                       $rootScope.criteria.personalList[seq].schd_d16_m = null
                                 break;
                                 case 'a':
                                       $rootScope.criteria.personalList[seq].schd_d16_a = null
                                 case 'n':
                                       $rootScope.criteria.personalList[seq].schd_d16_n = null
                                 break;
                                 default:
                               }
                            break;
                            case '17':
                                switch (category) {
                                  case 'm':
                                        $rootScope.criteria.personalList[seq].schd_d17_m = null
                                  break;
                                  case 'a':
                                        $rootScope.criteria.personalList[seq].schd_d17_a = null
                                  case 'n':
                                        $rootScope.criteria.personalList[seq].schd_d17_n = null
                                  break;
                                  default:
                                }
                             break;
                             case '18':
                                 switch (category) {
                                   case 'm':
                                         $rootScope.criteria.personalList[seq].schd_d18_m = null
                                   break;
                                   case 'a':
                                         $rootScope.criteria.personalList[seq].schd_d18_a = null
                                   case 'n':
                                         $rootScope.criteria.personalList[seq].schd_d18_n = null
                                   break;
                                   default:
                                 }
                              break;
                              case '19':
                                  switch (category) {
                                    case 'm':
                                          $rootScope.criteria.personalList[seq].schd_d19_m = null
                                    break;
                                    case 'a':
                                          $rootScope.criteria.personalList[seq].schd_d19_a = null
                                    case 'n':
                                          $rootScope.criteria.personalList[seq].schd_d19_n = null
                                    break;
                                    default:
                                  }
                               break;
                               case '20':
                                   switch (category) {
                                     case 'm':
                                           $rootScope.criteria.personalList[seq].schd_d20_m = null
                                     break;
                                     case 'a':
                                           $rootScope.criteria.personalList[seq].schd_d20_a = null
                                     case 'n':
                                           $rootScope.criteria.personalList[seq].schd_d20_n = null
                                     break;
                                     default:
                                   }
                                break;
                                case '21':
                                    switch (category) {
                                      case 'm':
                                            $rootScope.criteria.personalList[seq].schd_d21_m = null
                                      break;
                                      case 'a':
                                            $rootScope.criteria.personalList[seq].schd_d21_a = null
                                      case 'n':
                                            $rootScope.criteria.personalList[seq].schd_d21_n = null
                                      break;
                                      default:
                                    }
                                 break;
                                 case '22':
                                     switch (category) {
                                       case 'm':
                                             $rootScope.criteria.personalList[seq].schd_d22_m = null
                                       break;
                                       case 'a':
                                             $rootScope.criteria.personalList[seq].schd_d22_a = null
                                       case 'n':
                                             $rootScope.criteria.personalList[seq].schd_d22_n = null
                                       break;
                                       default:
                                     }
                                  break;
                                  case '23':
                                      switch (category) {
                                        case 'm':
                                              $rootScope.criteria.personalList[seq].schd_d23_m = null
                                        break;
                                        case 'a':
                                              $rootScope.criteria.personalList[seq].schd_d23_a = null
                                        case 'n':
                                              $rootScope.criteria.personalList[seq].schd_d23_n = null
                                        break;
                                        default:
                                      }
                                   break;
                                   case '24':
                                       switch (category) {
                                         case 'm':
                                               $rootScope.criteria.personalList[seq].schd_d24_m = null
                                         break;
                                         case 'a':
                                               $rootScope.criteria.personalList[seq].schd_d24_a = null
                                         case 'n':
                                               $rootScope.criteria.personalList[seq].schd_d24_n = null
                                         break;
                                         default:
                                       }
                                    break;
                                    case '25':
                                        switch (category) {
                                          case 'm':
                                                $rootScope.criteria.personalList[seq].schd_d25_m = null
                                          break;
                                          case 'a':
                                                $rootScope.criteria.personalList[seq].schd_d25_a = null
                                          case 'n':
                                                $rootScope.criteria.personalList[seq].schd_d25_n = null
                                          break;
                                          default:
                                        }
                                     break;
                                     case '26':
                                         switch (category) {
                                           case 'm':
                                                 $rootScope.criteria.personalList[seq].schd_d26_m = null
                                           break;
                                           case 'a':
                                                 $rootScope.criteria.personalList[seq].schd_d26_a = null
                                           case 'n':
                                                 $rootScope.criteria.personalList[seq].schd_d26_n = null
                                           break;
                                           default:
                                         }
                                      break;
                                      case '27':
                                          switch (category) {
                                            case 'm':
                                                  $rootScope.criteria.personalList[seq].schd_d27_m = null
                                            break;
                                            case 'a':
                                                  $rootScope.criteria.personalList[seq].schd_d27_a = null
                                            case 'n':
                                                  $rootScope.criteria.personalList[seq].schd_d27_n = null
                                            break;
                                            default:
                                          }
                                       break;
                                       case '28':
                                           switch (category) {
                                             case 'm':
                                                   $rootScope.criteria.personalList[seq].schd_d28_m = null
                                             break;
                                             case 'a':
                                                   $rootScope.criteria.personalList[seq].schd_d28_a = null
                                             case 'n':
                                                   $rootScope.criteria.personalList[seq].schd_d28_n = null
                                             break;
                                             default:
                                           }
                                        break;
                                        case '29':
                                            switch (category) {
                                              case 'm':
                                                    $rootScope.criteria.personalList[seq].schd_d29_m = null
                                              break;
                                              case 'a':
                                                    $rootScope.criteria.personalList[seq].schd_d29_a = null
                                              case 'n':
                                                    $rootScope.criteria.personalList[seq].schd_d29_n = null
                                              break;
                                              default:
                                            }
                                         break;
                                         case '30':
                                             switch (category) {
                                               case 'm':
                                                     $rootScope.criteria.personalList[seq].schd_d30_m = null
                                               break;
                                               case 'a':
                                                     $rootScope.criteria.personalList[seq].schd_d30_a = null
                                               case 'n':
                                                     $rootScope.criteria.personalList[seq].schd_d30_n = null
                                               break;
                                               default:
                                             }
                                          break;
                                          case '31':
                                              switch (category) {
                                                case 'm':
                                                      $rootScope.criteria.personalList[seq].schd_d31_m = null
                                                break;
                                                case 'a':
                                                      $rootScope.criteria.personalList[seq].schd_d31_a = null
                                                case 'n':
                                                      $rootScope.criteria.personalList[seq].schd_d31_n = null
                                                break;
                                                default:
                                              }
                                           break;

          }

        }

        this.checkDataDrop = function (wl_id,period,date,user_id){
          return $http({
            url:'API/SERVICE/checkDrop.php',
            method:'POST',
            data:{
              'date'   :date,
              'user_id':user_id,
              'period' :period
            }
          }).then(function (resp){
            let responseObj = resp.data;
            return responseObj
          })
        }

        this.count = function (user_id){
          return $http({
            url:'API/SERVICE/count.php',
            method:'POST',
            data:{
              'user_id':user_id
            }
          }).then(function (resp){
            let responseObj = resp.data;
            return responseObj
          })
        }

        this.saveSeqService = function (data){
          let responseObj = {}
          let c = 0;
          let a = 0;
            angular.forEach(data,function (item){
              c++
              return $http({
                url:'API/SERVICE/updateSchdSeq.php',
                method:'POST',
                data:{
                  'user_id':item.schd_user_id,
                  'seq':c,
                  'month_id':item.schd_month,
                  'year_id':item.schd_year,
                  'ward_id':item.schd_ward_id
                }
              }).then(function (resp){
                responseObj = resp.data;
              })
            })


            if(c == data.length){
              return 1
            }

        }

        this.getPersonalList = function (){
          return $http({
        		url:'API/LISTOFVALUE/getAllPersonal.php',
        		method:'GET'
        	}).then(function (resp){
            let responseObj = resp.data;
            return responseObj
        	})
        }

        this.isOff = function (offObj){
          console.log(offObj);
          return $http({
        		url:'API/LISTOFVALUE/createScheduleOff.php',
        		method:'POST',
            data:{
              'user_id':offObj.user_id,
              'ward_id':offObj.ward_id,
              'date_id':offObj.date_id,
              'month_id': offObj.month_id,
              'year_id': offObj.year_id
            }
        	}).then(function (resp){
            let responseObj = resp.data;
            return responseObj
        	})
        }

        this.updateOff = function (dataObj){
          return $http({
            url:'API/LISTOFVALUE/getScheduleOffCurentId.php',
            method:'POST',
            data:{
              'user_id':dataObj.user_id,
              'status':dataObj.statusSearch
            }
          }).then(function (resp){
            let schOff = resp.data;
            console.log(schOff.off_id);
            $http({
              url:'API/SCHEDULE/DRAF/updateScheduleOff.php',
              method:'POST',
              data:{
                'off_id':schOff.off_id,
                'status':dataObj.status
              }
            }).then(function (resp){
              let responseObj = resp.data;
              return responseObj
            })
          })
        }

        this.saveScheduleDetailList = function (d,wl,user_id,type){
          let obj = _.find($rootScope.criteria.personalList, function(obj) { return obj.Mem_ID == user_id })
          console.log("obj = ",obj);
          console.log("d=",d);
          console.log("wl=",wl);
          console.log("type=",type);
          if(wl.wl_ot == 1){
            let chr = parseInt(obj.cHour)
            let wlhr = parseInt(wl.wl_hr)
            let merge = chr + wlhr
            obj.cHour = merge
            if(obj.schd_mphr == 0){
              obj.cOT = merge*(parseInt(obj.Position_OTRate)/8)
            } else {
              obj.cOT = merge*(parseInt(obj.schd_mphr))
            }
            obj.cMoneyOT = Number(obj.cOT.toFixed(1)).toLocaleString()
            obj.cTotal++
          }
          if(wl.wl_en == 1){
            obj.sumNMTotal++
          }
          if(wl.wl_off == 1){
            obj.stale++
          }
          if(type == '1'){
            obj.stale--
          }

          switch(d) {
            case '01':
                switch (wl.wl_category) {
                    case 'm':
                              obj.schd_d01_m = wl
                    break;
                    case 'a':
                              obj.schd_d01_a = wl
                    case 'n':
                            obj.schd_d01_n = wl
                    break;
                }
             break;
             case '02':
                 switch (wl.wl_category) {
                     case 'm':
                           obj.schd_d02_m = wl
                     break;
                     case 'a':
                           obj.schd_d02_a = wl
                     case 'n':
                           obj.schd_d02_n = wl
                     break;
                   default:
                 }
              break;
              case '03':
                  switch (wl.wl_category) {
                      case 'm':
                            obj.schd_d03_m = wl
                      break;
                      case 'a':
                            obj.schd_d03_a = wl
                      case 'n':
                            obj.schd_d03_n = wl
                      break;
                    default:
                  }
               break;
               case '04':
                   switch (wl.wl_category) {
                       case 'm':
                             obj.schd_d04_m = wl
                       break;
                       case 'a':
                             obj.schd_d04_a = wl
                       case 'n':
                             obj.schd_d04_n = wl
                       break;
                     default:
                   }
                break;
                case '05':
                    switch (wl.wl_category) {
                        case 'm':
                              obj.schd_d05_m = wl
                        break;
                        case 'a':
                              obj.schd_d05_a = wl
                        case 'n':
                              obj.schd_d05_n = wl
                        break;
                      default:
                    }
                 break;
                 case '06':
                     switch (wl.wl_category) {
                         case 'm':
                               obj.schd_d06_m = wl
                         break;
                         case 'a':
                               obj.schd_d06_a = wl
                         case 'n':
                               obj.schd_d06_n = wl
                         break;
                       default:
                     }
                  break;
                  case '07':
                      switch (wl.wl_category) {
                          case 'm':
                                obj.schd_d07_m = wl
                          break;
                          case 'a':
                                obj.schd_d07_a = wl
                          case 'n':
                                obj.schd_d07_n = wl
                          break;
                        default:
                      }
                   break;
                   case '08':
                       switch (wl.wl_category) {
                           case 'm':
                                 obj.schd_d08_m = wl
                           break;
                           case 'a':
                                 obj.schd_d08_a = wl
                           case 'n':
                                 obj.schd_d08_n = wl
                           break;
                         default:
                       }
                    break;
                    case '09':
                        switch (wl.wl_category) {
                            case 'm':
                                  obj.schd_d09_m = wl
                            break;
                            case 'a':
                                  obj.schd_d09_a = wl
                            case 'n':
                                  obj.schd_d09_n = wl
                            break;
                          default:
                        }
                     break;
                     case '10':
                         switch (wl.wl_category) {
                             case 'm':
                                   obj.schd_d10_m = wl
                             break;
                             case 'a':
                                   obj.schd_d10_a = wl
                             case 'n':
                                   obj.schd_d10_n = wl
                             break;
                           default:
                         }
                      break;
                      case '11':
                          switch (wl.wl_category) {
                              case 'm':
                                    obj.schd_d11_m = wl
                              break;
                              case 'a':
                                    obj.schd_d11_a = wl
                              case 'n':
                                    obj.schd_d11_n = wl
                              break;
                            default:
                          }
                       break;
                       case '12':
                           switch (wl.wl_category) {
                               case 'm':
                                     obj.schd_d12_m = wl
                               break;
                               case 'a':
                                     obj.schd_d12_a = wl
                               case 'n':
                                     obj.schd_d12_n = wl
                               break;
                             default:
                           }
                        break;
                        case '13':
                            switch (wl.wl_category) {
                                case 'm':
                                      obj.schd_d13_m = wl
                                break;
                                case 'a':
                                      obj.schd_d13_a = wl
                                case 'n':
                                      obj.schd_d13_n = wl
                                break;
                              default:
                            }
                         break;
                         case '14':
                             switch (wl.wl_category) {
                                 case 'm':
                                       obj.schd_d14_m = wl
                                 break;
                                 case 'a':
                                       obj.schd_d14_a = wl
                                 case 'n':
                                       obj.schd_d14_n = wl
                                 break;
                               default:
                             }
                          break;
                          case '15':
                              switch (wl.wl_category) {
                                  case 'm':
                                        obj.schd_d15_m = wl
                                  break;
                                  case 'a':
                                        obj.schd_d15_a = wl
                                  case 'n':
                                        obj.schd_d15_n = wl
                                  break;
                                default:
                              }
                           break;
                           case '16':
                               switch (wl.wl_category) {
                                   case 'm':
                                         obj.schd_d16_m = wl
                                   break;
                                   case 'a':
                                         obj.schd_d16_a = wl
                                   case 'n':
                                         obj.schd_d16_n = wl
                                   break;
                                 default:
                               }
                            break;
                            case '17':
                                switch (wl.wl_category) {
                                    case 'm':
                                          obj.schd_d17_m = wl
                                    break;
                                    case 'a':
                                          obj.schd_d17_a = wl
                                    case 'n':
                                          obj.schd_d17_n = wl
                                    break;
                                  default:
                                }
                             break;
                             case '18':
                                 switch (wl.wl_category) {
                                     case 'm':
                                           obj.schd_d18_m = wl
                                     break;
                                     case 'a':
                                           obj.schd_d18_a = wl
                                     case 'n':
                                           obj.schd_d18_n = wl
                                     break;
                                   default:
                                 }
                              break;
                              case '19':
                                  switch (wl.wl_category) {
                                      case 'm':
                                            obj.schd_d19_m = wl
                                      break;
                                      case 'a':
                                            obj.schd_d19_a = wl
                                      case 'n':
                                            obj.schd_d19_n = wl
                                      break;
                                    default:
                                  }
                               break;
                               case '20':
                                   switch (wl.wl_category) {
                                       case 'm':
                                             obj.schd_d20_m = wl
                                       break;
                                       case 'a':
                                             obj.schd_d20_a = wl
                                       case 'n':
                                             obj.schd_d20_n = wl
                                       break;
                                     default:
                                   }
                                break;
                                case '21':
                                    switch (wl.wl_category) {
                                        case 'm':
                                              obj.schd_d21_m = wl
                                        break;
                                        case 'a':
                                              obj.schd_d21_a = wl
                                        case 'n':
                                              obj.schd_d21_n = wl
                                        break;
                                      default:
                                    }
                                 break;
                                 case '22':
                                     switch (wl.wl_category) {
                                         case 'm':
                                               obj.schd_d22_m = wl
                                         break;
                                         case 'a':
                                               obj.schd_d22_a = wl
                                         case 'n':
                                               obj.schd_d22_n = wl
                                         break;
                                       default:
                                     }
                                  break;
                                  case '23':
                                      switch (wl.wl_category) {
                                          case 'm':
                                                obj.schd_d23_m = wl
                                          break;
                                          case 'a':
                                                obj.schd_d23_a = wl
                                          case 'n':
                                                obj.schd_d23_n = wl
                                          break;
                                        default:
                                      }
                                   break;
                                   case '24':
                                       switch (wl.wl_category) {
                                           case 'm':
                                                 obj.schd_d24_m = wl
                                           break;
                                           case 'a':
                                                 obj.schd_d24_a = wl
                                           case 'n':
                                                 obj.schd_d24_n = wl
                                           break;
                                         default:
                                       }
                                    break;
                                    case '25':
                                        switch (wl.wl_category) {
                                            case 'm':
                                                  obj.schd_d25_m = wl
                                            break;
                                            case 'a':
                                                  obj.schd_d25_a = wl
                                            case 'n':
                                                  obj.schd_d25_n = wl
                                            break;
                                          default:
                                        }
                                     break;
                                     case '26':
                                         switch (wl.wl_category) {
                                             case 'm':
                                                   obj.schd_d26_m = wl
                                             break;
                                             case 'a':
                                                   obj.schd_d26_a = wl
                                             case 'n':
                                                   obj.schd_d26_n = wl
                                             break;
                                           default:
                                         }
                                      break;
                                      case '27':
                                          switch (wl.wl_category) {
                                              case 'm':
                                                    obj.schd_d27_m = wl
                                              break;
                                              case 'a':
                                                    obj.schd_d27_a = wl
                                              case 'n':
                                                    obj.schd_d27_n = wl
                                              break;
                                            default:
                                          }
                                       break;
                                       case '28':
                                           switch (wl.wl_category) {
                                               case 'm':
                                                     obj.schd_d28_m = wl
                                               break;
                                               case 'a':
                                                     obj.schd_d28_a = wl
                                               case 'n':
                                                     obj.schd_d28_n = wl
                                               break;
                                             default:
                                           }
                                        break;
                                        case '29':
                                            switch (wl.wl_category) {
                                                case 'm':
                                                      obj.schd_d29_m = wl
                                                break;
                                                case 'a':
                                                      obj.schd_d29_a = wl
                                                case 'n':
                                                      obj.schd_d29_n = wl
                                                break;
                                              default:
                                            }
                                         break;
                                         case '30':
                                             switch (wl.wl_category) {
                                                 case 'm':
                                                       obj.schd_d30_m = wl
                                                 break;
                                                 case 'a':
                                                       obj.schd_d30_a = wl
                                                 case 'n':
                                                       obj.schd_d30_n = wl
                                                 break;
                                               default:
                                             }
                                          break;
                                          case '31':
                                              switch (wl.wl_category) {
                                                  case 'm':
                                                        obj.schd_d31_m = wl
                                                  break;
                                                  case 'a':
                                                        obj.schd_d31_a = wl
                                                  case 'n':
                                                        obj.schd_d31_n = wl
                                                  break;
                                                default:
                                              }
                                           break;

          }
          $rootScope.criteria.OTMoneyTotal = 0;
          $rootScope.criteria.OTTotal = 0;
          $rootScope.criteria.NMTotal = 0;
          $rootScope.criteria.cStale = 0;
          angular.forEach($rootScope.criteria.personalList,function (item){

            $rootScope.criteria.OTMoneyTotal = $rootScope.criteria.OTMoneyTotal + parseInt(item.cOT)
            $rootScope.criteria.OTMoneyTotalStr = Number($rootScope.criteria.OTMoneyTotal.toFixed(1)).toLocaleString()

            $rootScope.criteria.OTTotal = $rootScope.criteria.OTTotal + parseInt(item.cTotal)
            $rootScope.criteria.NMTotal = $rootScope.criteria.NMTotal + parseInt(item.sumNMTotal)

            $rootScope.criteria.cStale = $rootScope.criteria.cStale + parseInt(item.stale)

          })
          return 1;
        }


        this.checkSaveEarlyMonth = function (month_id,year_id,ward_id){
          return $http({
        		url:'API/SCHEDULE/getEarlyMonthGB.php',
        		method:'POST',
            data:{
              'ward_id':ward_id,
              'month_id': month_id,
              'year_id': year_id
            }
        	}).then(function (resp){
            let responseObj = resp.data;
            if(responseObj.c == 0){
              return false
            } else {
              return true
            }
        	})
        }

    }]);
