angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/schedule/draf/:id',{templateUrl: _.toHttpGetUrl('content/schedule/detail.html'),controller: SchduleDrafCtrl});

} ]);


function SchduleDrafCtrl($rootScope,$routeParams, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $modal, myFunction, jet, backup) {
	$log.info('Enter SchduleDrafCtrl');


	$scope.sch_id = $routeParams.id
	// draw color
	$scope.colorNum = function (day,month,year){
		var makeDate = year+"-"+month+"-"+('0' + day).slice(-2)

		$http({
			url:'API/SCHEDULE/DRAF/getHoliday.php',
			method:'POST',
			data:{
				'date_val':makeDate
			}
		}).then(function (resp){
			$scope.holidayObj = resp.data;
			if(resp.data.length == 0){
				$scope.makeDate = year+"-"+month+"-"+day
				$scope.setColor = 'white'
			}else{
				$scope.makeDate = $scope.holidayObj.h_date
				$scope.setColor = 'rgba(243, 156, 18, 0.26)'
			}

			var d = new Date($scope.makeDate);
			var weekday = new Array(7);
			weekday[0] = "rgba(255, 187, 187, 0.77)";//sun
			weekday[1] = $scope.setColor;//mon
			weekday[2] = $scope.setColor;//tue
			weekday[3] = $scope.setColor;//wens
			weekday[4] = $scope.setColor;//tues
			weekday[5] = $scope.setColor;//fri
			weekday[6] = "rgba(209, 184, 224, 0.44)";//sat


			var n = weekday[d.getDay()];
			switch(day) {
	    case 1:
	        $scope.color1 = n
	        break;
	    case 2:
	        $scope.color2 = n
	        break;
	    case 3:
	        $scope.color3 = n
	        break;
			case 4:

					$scope.color4 = n
					break;
			case 5:

			    $scope.color5 = n
			    break;
			case 6:
			    $scope.color6 = n
					break;
			case 7:
			    $scope.color7 = n
			    break;
			case 8:
					$scope.color8 = n
					break;
			case 9:
			    $scope.color9 = n
			    break;
			case 10:
			    $scope.color10 = n
			    break;
			case 11:
			    $scope.color11 = n
			    break;
			case 12:
					$scope.color12 = n
					break;
			case 13:
			    $scope.color13 = n
			    break;
			case 14:
			    $scope.color14 = n
			    break;
			case 15:
			    $scope.color15 = n
			    break;
			case 16:
					$scope.color16 = n
					break;
			case 17:
			    $scope.color17 = n
			    break;
			case 18:
			    $scope.color18 = n
			    break;
			case 19:
			    $scope.color19 = n
			    break;
			case 20:
					$scope.color20 = n
					break;
			case 21:
			    $scope.color21 = n
			    break;
			case 22:
			    $scope.color22 = n
			    break;
			case 23:
			    $scope.color23 = n
			    break;
			case 24:
					$scope.color24 = n
					break;
			case 25:
			    $scope.color25 = n
			    break;
			case 26:
			    $scope.color26 = n
			    break;
			case 27:
			    $scope.color27 = n
			    break;
			case 28:
					$scope.color28 = n
					break;
			case 29:
					$scope.color29 = n
					break;
			case 30:
					$scope.color30 = n
					break;
			case 31:
					$scope.color31 = n
					break;
	    default:
	        text = "error";
					}
		})
	}
	$scope.cost = 100

	$scope.colorIcon = {}
	let c = 0;
	$rootScope.criteria.nameTrade = []
	$scope.setGreen = function (id){
		$rootScope.criteria.personalList[id].icon = "fa-calendar-check-o"
		$rootScope.criteria.personalList[id].colorIcon = "green"
	}
	$scope.setBlue = function (id){
		$rootScope.criteria.nameTrade = _.reject($rootScope.criteria.nameTrade, function(el) { return el.Mem_ID === $rootScope.criteria.personalList[id].Mem_ID; });
		$rootScope.criteria.personalList[id].icon = "fa-calendar-o"
		$rootScope.criteria.personalList[id].colorIcon = "blue"
	}
	$scope.resetIcon = function (id){
		c = 1
		$rootScope.criteria.personalList[id].icon = "fa-calendar-o"
		$rootScope.criteria.personalList[id].colorIcon = "blue"
		$rootScope.criteria.nameTrade = _.reject($rootScope.criteria.nameTrade, function(el) { return el.Mem_ID === $rootScope.criteria.personalList[id].Mem_ID; });
	}

	$scope.swop = function (mem_1st,mem_2nd){

		var modalInstance = $modal.open({
				templateUrl: 'content/schedule/popup/swop.html',
				controller: SwopPopupCtrl,
				backdrop: 'static',
				windowClass: 'large',
				keyboard: false,
				resolve: {
						params_mem_first: function () {
								return mem_1st;
						},
						params_mem_second: function (){
							return mem_2nd;
						},params_month: function (){
							return mem_2nd;
						}
				}
		});
		modalInstance.result.then(function (isClose) {
		}, function () {
				$log.info('Modal dismissed at: ' + new Date());
		});

	}



	$scope.trade = function  (id,color) {
		console.log($rootScope.criteria.nameTrade);
		if(color == 'blue'){
			$rootScope.criteria.nameTrade.push({Mem_ID:$rootScope.criteria.personalList[id].Mem_ID})
			c++
			$scope.setGreen(id)
			if(c == 2){
						$scope.swop($rootScope.criteria.nameTrade[0].Mem_ID,$rootScope.criteria.nameTrade[1].Mem_ID)
						c = 0
			}
		} else {
			c--
 			$rootScope.criteria.nameTrade = _.reject($rootScope.criteria.nameTrade, function(el) { return el.Mem_ID === $rootScope.criteria.personalList[id].Mem_ID; });
			$scope.setBlue(id)
		}

		console.log(c);

	}

	$rootScope.criteria.search = function (){

		$http({
			url:'API/SCHEDULE/DRAF/getScheduleMasterById.php',
			method:'POST',
			delay: 250,
			data:{
				'sch_id':$scope.sch_id
			}
		}).then(function (resp){
			$scope.schObj = resp.data
			console.log($scope.schObj);
			$(document.body).addClass('sidebar-collapse');
			$rootScope.criteria.popupMonth = $scope.schObj.MONTHNO
			$rootScope.criteria.popupYear = $scope.schObj.YEAR
			$rootScope.criteria.popupWard = $scope.schObj.COSTID
			$rootScope.criteria.head = $scope.schObj.H_PRE+$scope.schObj.H_FIRSTNAME+"  "+$scope.schObj.H_LASTNAME
			$rootScope.criteria.invest = $scope.schObj.I_PRE+$scope.schObj.I_FIRSTNAME+"  "+$scope.schObj.I_LASTNAME
			console.log($scope.schObj.H_FIRSTNAME);
			$rootScope.criteria.director = $scope.schObj.sch_director
			$scope.schObj.YEAR_B = parseInt($scope.schObj.YEAR) + 543
			$scope.checkBackup($scope.schObj.COSTID,$scope.schObj.MONTHNO,$scope.schObj.YEAR)
			$http({
				url:'API/SCHEDULE/DRAF/getScheduleDetailByCostId.php',
				method:'POST',
				data:{
					'ward_id':$scope.schObj.COSTID,
					'month':$scope.schObj.MONTHNO,
					'year':$scope.schObj.YEAR
				}
			}).then(function (resp){
				$rootScope.criteria.personalList = resp.data;
				console.log($rootScope.criteria.personalList);

				$rootScope.criteria.OTTotal = 0
				$rootScope.criteria.NMTotal = 0
				$rootScope.criteria.cStale = 0
				$rootScope.criteria.OTMoneyTotal = 0
				angular.forEach($rootScope.criteria.personalList,function (item){
								// checkBackup to swop work
								if($rootScope.criteria.chbackup == 0){
									item.icon = 'fa-calendar-o'
									item.colorIcon = 'red'
								}else {
									item.icon = 'fa-calendar-o'
									item.colorIcon = 'blue'
								}


								if (item.schd_d01_m != null) {
                  item.schd_d01_m = jet.getStatus(item.schd_d01_m)
                }
                if (item.schd_d01_a != null) {
                  item.schd_d01_a = jet.getStatus(item.schd_d01_a)
                }
                if (item.schd_d01_n != null) {
                  item.schd_d01_n = jet.getStatus(item.schd_d01_n)
                }


                if (item.schd_d02_m != null) {
                  item.schd_d02_m = jet.getStatus(item.schd_d02_m)
                }
                if (item.schd_d02_a != null) {
                  item.schd_d02_a = jet.getStatus(item.schd_d02_a)
                }
                if (item.schd_d02_n != null) {
                  item.schd_d02_n = jet.getStatus(item.schd_d02_n)
                }

                if (item.schd_d03_m != null) {
                  item.schd_d03_m = jet.getStatus(item.schd_d03_m)
                }
                if (item.schd_d03_a != null) {
                  item.schd_d03_a = jet.getStatus(item.schd_d03_a)
                }
                if (item.schd_d03_n != null) {
                  item.schd_d03_n = jet.getStatus(item.schd_d03_n)
                }

                if (item.schd_d04_m != null) {
                  item.schd_d04_m = jet.getStatus(item.schd_d04_m)
                }
                if (item.schd_d04_a != null) {
                  item.schd_d04_a = jet.getStatus(item.schd_d04_a)
                }
                if (item.schd_d04_n != null) {
                  item.schd_d04_n = jet.getStatus(item.schd_d04_n)
                }

                if (item.schd_d05_m != null) {
                  item.schd_d05_m = jet.getStatus(item.schd_d05_m)
                }
                if (item.schd_d05_a != null) {
                  item.schd_d05_a = jet.getStatus(item.schd_d05_a)
                }
                if (item.schd_d05_n != null) {
                  item.schd_d05_n = jet.getStatus(item.schd_d05_n)
                }

                if (item.schd_d06_m != null) {
                  item.schd_d06_m = jet.getStatus(item.schd_d06_m)
                }
                if (item.schd_d06_a != null) {
                  item.schd_d06_a = jet.getStatus(item.schd_d06_a)
                }
                if (item.schd_d06_n != null) {
                  item.schd_d06_n = jet.getStatus(item.schd_d06_n)
                }

                if (item.schd_d07_m != null) {
                  item.schd_d07_m = jet.getStatus(item.schd_d07_m)
                }
                if (item.schd_d07_a != null) {
                  item.schd_d07_a = jet.getStatus(item.schd_d07_a)
                }
                if (item.schd_d07_n != null) {
                  item.schd_d07_n = jet.getStatus(item.schd_d07_n)
                }

                if (item.schd_d08_m != null) {
                  item.schd_d08_m = jet.getStatus(item.schd_d08_m)
                }
                if (item.schd_d08_a != null) {
                  item.schd_d08_a = jet.getStatus(item.schd_d08_a)
                }
                if (item.schd_d08_n != null) {
                  item.schd_d08_n = jet.getStatus(item.schd_d08_n)
                }

                if (item.schd_d09_m != null) {
                  item.schd_d09_m = jet.getStatus(item.schd_d09_m)
                }
                if (item.schd_d09_a != null) {
                  item.schd_d09_a = jet.getStatus(item.schd_d09_a)
                }
                if (item.schd_d09_n != null) {
                  item.schd_d09_n = jet.getStatus(item.schd_d09_n)
                }

                if (item.schd_d10_m != null) {
                  item.schd_d10_m = jet.getStatus(item.schd_d10_m)
                }
                if (item.schd_d10_a != null) {
                  item.schd_d10_a = jet.getStatus(item.schd_d10_a)
                }
                if (item.schd_d10_n != null) {
                  item.schd_d10_n = jet.getStatus(item.schd_d10_n)
                }

                if (item.schd_d11_m != null) {
                  item.schd_d11_m = jet.getStatus(item.schd_d11_m)
                }
                if (item.schd_d11_a != null) {
                  item.schd_d11_a = jet.getStatus(item.schd_d11_a)
                }
                if (item.schd_d11_n != null) {
                  item.schd_d11_n = jet.getStatus(item.schd_d11_n)
                }

                if (item.schd_d12_m != null) {
                  item.schd_d12_m = jet.getStatus(item.schd_d12_m)
                }
                if (item.schd_d12_a != null) {
                  item.schd_d12_a = jet.getStatus(item.schd_d12_a)
                }
                if (item.schd_d12_n != null) {
                  item.schd_d12_n = jet.getStatus(item.schd_d12_n)
                }

                if (item.schd_d13_m != null) {
                  item.schd_d13_m = jet.getStatus(item.schd_d13_m)
                }
                if (item.schd_d13_a != null) {
                  item.schd_d13_a = jet.getStatus(item.schd_d13_a)
                }
                if (item.schd_d13_n != null) {
                  item.schd_d13_n = jet.getStatus(item.schd_d13_n)
                }


                if (item.schd_d14_m != null) {
                  item.schd_d14_m = jet.getStatus(item.schd_d14_m)
                }
                if (item.schd_d14_a != null) {
                  item.schd_d14_a = jet.getStatus(item.schd_d14_a)
                }
                if (item.schd_d14_n != null) {
                  item.schd_d14_n = jet.getStatus(item.schd_d14_n)
                }


                if (item.schd_d15_m != null) {
                  item.schd_d15_m = jet.getStatus(item.schd_d15_m)
                }
                if (item.schd_d15_a != null) {
                  item.schd_d15_a = jet.getStatus(item.schd_d15_a)
                }
                if (item.schd_d15_n != null) {
                  item.schd_d15_n = jet.getStatus(item.schd_d15_n)
                }


                if (item.schd_d16_m != null) {
                  item.schd_d16_m = jet.getStatus(item.schd_d16_m)
                }
                if (item.schd_d16_a != null) {
                  item.schd_d16_a = jet.getStatus(item.schd_d16_a)
                }
                if (item.schd_d16_n != null) {
                  item.schd_d16_n = jet.getStatus(item.schd_d16_n)
                }


                if (item.schd_d17_m != null) {
                  item.schd_d17_m = jet.getStatus(item.schd_d17_m)
                }
                if (item.schd_d17_a != null) {
                  item.schd_d17_a = jet.getStatus(item.schd_d17_a)
                }
                if (item.schd_d17_n != null) {
                  item.schd_d17_n = jet.getStatus(item.schd_d17_n)
                }


                if (item.schd_d18_m != null) {
                  item.schd_d18_m = jet.getStatus(item.schd_d18_m)
                }
                if (item.schd_d18_a != null) {
                  item.schd_d18_a = jet.getStatus(item.schd_d18_a)
                }
                if (item.schd_d18_n != null) {
                  item.schd_d18_n = jet.getStatus(item.schd_d18_n)
                }


                if (item.schd_d19_m != null) {
                  item.schd_d19_m = jet.getStatus(item.schd_d19_m)
                }
                if (item.schd_d19_a != null) {
                  item.schd_d19_a = jet.getStatus(item.schd_d19_a)
                }
                if (item.schd_d19_n != null) {
                  item.schd_d19_n = jet.getStatus(item.schd_d19_n)
                }


                if (item.schd_d20_m != null) {
                  item.schd_d20_m = jet.getStatus(item.schd_d20_m)
                }
                if (item.schd_d20_a != null) {
                  item.schd_d20_a = jet.getStatus(item.schd_d20_a)
                }
                if (item.schd_d20_n != null) {
                  item.schd_d20_n = jet.getStatus(item.schd_d20_n)
                }


                if (item.schd_d21_m != null) {
                  item.schd_d21_m = jet.getStatus(item.schd_d21_m)
                }
                if (item.schd_d21_a != null) {
                  item.schd_d21_a = jet.getStatus(item.schd_d21_a)
                }
                if (item.schd_d21_n != null) {
                  item.schd_d21_n = jet.getStatus(item.schd_d21_n)
                }


                if (item.schd_d22_m != null) {
                  item.schd_d22_m = jet.getStatus(item.schd_d22_m)
                }
                if (item.schd_d22_a != null) {
                  item.schd_d22_a = jet.getStatus(item.schd_d22_a)
                }
                if (item.schd_d22_n != null) {
                  item.schd_d22_n = jet.getStatus(item.schd_d22_n)
                }


                if (item.schd_d23_m != null) {
                  item.schd_d23_m = jet.getStatus(item.schd_d23_m)
                }
                if (item.schd_d23_a != null) {
                  item.schd_d23_a = jet.getStatus(item.schd_d23_a)
                }
                if (item.schd_d23_n != null) {
                  item.schd_d23_n = jet.getStatus(item.schd_d23_n)
                }


                if (item.schd_d24_m != null) {
                  item.schd_d24_m = jet.getStatus(item.schd_d24_m)
                }
                if (item.schd_d24_a != null) {
                  item.schd_d24_a = jet.getStatus(item.schd_d24_a)
                }
                if (item.schd_d24_n != null) {
                  item.schd_d24_n = jet.getStatus(item.schd_d24_n)
                }


                if (item.schd_d25_m != null) {
                  item.schd_d25_m = jet.getStatus(item.schd_d25_m)
                }
                if (item.schd_d25_a != null) {
                  item.schd_d25_a = jet.getStatus(item.schd_d25_a)
                }
                if (item.schd_d25_n != null) {
                  item.schd_d25_n = jet.getStatus(item.schd_d25_n)
                }


                if (item.schd_d26_m != null) {
                  item.schd_d26_m = jet.getStatus(item.schd_d26_m)
                }
                if (item.schd_d26_a != null) {
                  item.schd_d26_a = jet.getStatus(item.schd_d26_a)
                }
                if (item.schd_d26_n != null) {
                  item.schd_d26_n = jet.getStatus(item.schd_d26_n)
                }


                if (item.schd_d27_m != null) {
                  item.schd_d27_m = jet.getStatus(item.schd_d27_m)
                }
                if (item.schd_d27_a != null) {
                  item.schd_d27_a = jet.getStatus(item.schd_d27_a)
                }
                if (item.schd_d27_n != null) {
                  item.schd_d27_n = jet.getStatus(item.schd_d27_n)
                }


                if (item.schd_d28_m != null) {
                  item.schd_d28_m = jet.getStatus(item.schd_d28_m)
                }
                if (item.schd_d28_a != null) {
                  item.schd_d28_a = jet.getStatus(item.schd_d28_a)
                }
                if (item.schd_d28_n != null) {
                  item.schd_d28_n = jet.getStatus(item.schd_d28_n)
                }


                if (item.schd_d29_m != null) {
                  item.schd_d29_m = jet.getStatus(item.schd_d29_m)
                }
                if (item.schd_d29_a != null) {
                  item.schd_d29_a = jet.getStatus(item.schd_d29_a)
                }
                if (item.schd_d29_n != null) {
                  item.schd_d29_n = jet.getStatus(item.schd_d29_n)
                }


                if (item.schd_d30_m != null) {
                  item.schd_d30_m = jet.getStatus(item.schd_d30_m)
                }
                if (item.schd_d30_a != null) {
                  item.schd_d30_a = jet.getStatus(item.schd_d30_a)
                }
                if (item.schd_d30_n != null) {
                  item.schd_d30_n = jet.getStatus(item.schd_d30_n)
                }


                if (item.schd_d31_m != null) {
                  item.schd_d31_m = jet.getStatus(item.schd_d31_m)
                }
                if (item.schd_d31_a != null) {
                  item.schd_d31_a = jet.getStatus(item.schd_d31_a)
                }
                if (item.schd_d31_n != null) {
                  item.schd_d31_n = jet.getStatus(item.schd_d31_n)
                }






								// get ot
								// $http({
								// 	url:'API/LISTOFVALUE/sumDataTable.php',
								// 	method:'POST',
								// 	data:{
								// 		'user_id':item.Mem_ID,
								// 		'month_no':$scope.schObj.MONTHNO,
								// 		'year_no':$scope.schObj.YEAR,
								// 		'ward_no':$scope.schObj.COSTID
								// 	}
								// }).then(function (resp){
								// 	$scope.sumTotal = resp.data;

									$http({
										url:'API/DRAF/getUserSumOTData.php',
										method:'POST',
										data:{
											'user_id':item.Mem_ID,
											'month_id':$scope.schObj.MONTHNO,
											'year_id':$scope.schObj.YEAR,
											'ward_id':$scope.schObj.COSTID
										}
									}).then(function (resp){
										item.cTotal = resp.data;

										$scope.OTTotal = $scope.OTTotal + item.cTotal

										$rootScope.criteria.OTTotal = $rootScope.criteria.OTTotal + parseInt(item.cTotal)
									})
									$http({
										url:'API/DRAF/getUserSumHRData.php',
										method:'POST',
										data:{
											'user_id':item.Mem_ID,
											'month_id':$scope.schObj.MONTHNO,
											'year_id':$scope.schObj.YEAR,
											'ward_id':$scope.schObj.COSTID
										}
									}).then(function (resp){
										item.cHour = resp.data;
										if(item.schd_mphr == 0){
											item.cOT = parseInt(item.cHour)*(parseInt(item.Position_OTRate)/8)
										} else {
											item.cOT = parseInt(item.cHour)*(parseInt(item.schd_mphr))
										}
										item.cMoneyOT = Number(item.cOT.toFixed(1)).toLocaleString()
										$rootScope.criteria.OTMoneyTotal = $rootScope.criteria.OTMoneyTotal + parseInt(item.cOT)
										$rootScope.criteria.OTMoneyTotalStr = Number($rootScope.criteria.OTMoneyTotal.toFixed(1)).toLocaleString()
									})


								// })

								$http({
									url:'API/DRAF/getUserSumNMData.php',
									method:'POST',
									data:{
										'user_id':item.Mem_ID,
										'month_id':$scope.schObj.MONTHNO,
										'year_id':$scope.schObj.YEAR,
										'ward_id':$scope.schObj.COSTID
									}
								}).then(function (resp){
									item.sumNMTotal = resp.data
									$rootScope.criteria.NMTotal = $rootScope.criteria.NMTotal + parseInt(item.sumNMTotal)
								})




								// $http({
								// 	url:'API/LISTOFVALUE/sumNMDataTable.php',
								// 	method:'POST',
								// 	data:{
								// 		'user_id':item.Mem_ID,
								// 		'month_no':$scope.schObj.MONTHNO,
								// 		'year_no':$scope.schObj.YEAR,
								// 		'ward_no':$scope.schObj.COSTID
								// 	}
								// }).then(function (resp){
								// 	$scope.sumNMTotalObj = resp.data;
								// 		item.sumNMTotal = $scope.sumNMTotalObj.NM
								// 		$rootScope.criteria.NMTotal = $rootScope.criteria.NMTotal + item.sumNMTotal
								// })

								$http({
									url:'API/SCHEDULE/DRAF/getScheduleOffCount.php',
									method:'POST',
									data:{
										'user_id':item.Mem_ID
									}
								}).then(function (resp){
									$scope.countSch = resp.data;
									item.stale = parseInt($scope.countSch.stale)
									$rootScope.criteria.cStale = $rootScope.criteria.cStale + item.stale
								})

				})

				$scope.drawColorTable($scope.schObj.MONTHNO,$scope.schObj.YEAR)
			})
		})

	}

	$rootScope.criteria.search()

	$scope.drawColorTable = function (month,year){
		var str = year+"-"+month
		$scope.monthTotal = moment(str, "YYYY-MM").daysInMonth()
		$scope.monthTotalBtn = $scope.monthTotal + APP.TABLE_DRAF;
		var i = 1;
		while (i <= $scope.monthTotal) {
			$scope.colorNum(i,month,year)
    	i++;
		}
	}

	$scope.checkBackup = function (params_ward,params_month,params_year){
		$http({
			url:'API/SCHEDULE/DRAF/checkBackupHasData.php',
			method:'POST',
			data:{
				'ward_id':params_ward,
				'month_id':params_month,
				'year_id':params_year
			}
		}).then(function (resp){
			$scope.checkBackupObj = resp.data;
			$rootScope.criteria.chbackup = $scope.checkBackupObj.c
			if($scope.checkBackupObj.c > 0){
				$scope.setBackupColor = 'green'
				$scope.setBackupIcon = 'fa-check-circle'
				$scope.setBackupStatus = 'บันทึกแล้ว'
			} else {
				$scope.setBackupColor = 'yellow'
				$scope.setBackupIcon = 'fa-question-circle'
				$scope.setBackupStatus = 'ไม่มีการบันทึก'
			}
		})
	}








	$scope.saveSeq = function (){
		console.log($rootScope.criteria.personalList);
		// jet.getStatus(item.schd_d27_m).then(function (m27){item.schd_d27_m = m27})
		myFunction.confirmSaveBox().result.then(function(ok) {
			if (ok) {
				if (jet.saveSeqService($rootScope.criteria.personalList) == 1){
					$scope.app.addAlert('gritter-success', 'การบันทึกเสร็จสมบูรณ์', 4000);

				}
			}
		})
	}
	$scope.saveTemp = function (){
		myFunction.confirmSaveBox().result.then(function(ok) {
			if (ok) {
				backup.save($scope.schObj).then(function (resp){
					if(resp == 1){
						$scope.app.addAlert('gritter-success', 'การบันทึกเสร็จสมบูรณ์', 4000);
						$scope.checkBackup($scope.schObj.COSTID,$scope.schObj.MONTHNO,$scope.schObj.YEAR)
					}
				})


			}
		})
	}


	$scope.td = function (id,month,year,user_id,category){
		console.log(category);
		if(category == undefined){
			category = 0;
		}
		console.log(('0' + id).slice(-2));

		var modalInstance = $modal.open({
				templateUrl: 'content/schedule/popup/draf-work.html',
				controller: DrafWorkPopupCtrl,
				backdrop: 'static',
				windowClass: 'large',
				keyboard: false,
				resolve: {
						params_date: function () {
								return ('0' + id).slice(-2);
						},
						params_month: function (){
							return month;
						},
						params_year: function (){
							return year;
						},
						params_user_id: function (){
							return user_id;
						},
						params_ward_id: function (){
							return $scope.schObj.COSTID;
						},
						params_category: function (){
							return category;
						},
						params_seq: function (){
							return 0
						}
				}
		});
		modalInstance.result.then(function (isClose) {
		}, function () {
				$log.info('Modal dismissed at: ' + new Date());
		});

	}


	$scope.wk = function (id,month,year,user_id,category,seq){
		console.log("category=",category);
		if(category == undefined){
			category = 0;
		}
		console.log(('0' + id).slice(-2));

		var modalInstance = $modal.open({
				templateUrl: 'content/schedule/popup/draf-work.html',
				controller: DrafWorkPopupCtrl,
				backdrop: 'static',
				windowClass: 'large',
				keyboard: false,
				resolve: {
						params_date: function () {
								return ('0' + id).slice(-2);
						},
						params_month: function (){
							return month;
						},
						params_year: function (){
							return year;
						},
						params_user_id: function (){
							return user_id;
						},
						params_ward_id: function (){
							return $scope.schObj.COSTID;
						},
						params_category: function (){
							return category;
						},
						params_seq: function (){
							return seq;
						}
				}
		});
		modalInstance.result.then(function (isClose) {
		}, function () {
				$log.info('Modal dismissed at: ' + new Date());
		});

	}
	$scope.addUser = function (id,month,year,user_id){
		var modalInstance = $modal.open({
				templateUrl: 'content/schedule/popup/add-user.html',
				controller: AddUserPopupCtrl,
				backdrop: 'static',
				windowClass: 'large',
				keyboard: false,
				resolve: {
						params_date: function () {
								return id;
						},
						params_month: function (){
							return $scope.schObj.MONTHNO;
						},
						params_year: function (){
							return $scope.schObj.YEAR;
						},
						params_user_id: function (){
							return user_id;
						},
						params_ward_id: function (){
							return $scope.schObj.COSTID;
						}
				}
		});
		modalInstance.result.then(function (isClose) {
		}, function () {
				$log.info('Modal dismissed at: ' + new Date());
		});

	}


	// CREATE DATA
	$scope.createData = function (id,ward_id){
		$location.path("/draf/data/"+id+"/"+$scope.schObj.MONTHNO+"/"+ward_id+"/"+$scope.schObj.YEAR)
	}

	$scope.gotoReport = function (data){
		console.log(data);
		if($scope.schObj.H_FIRSTNAME == null || $scope.schObj.I_FIRSTNAME == null){
			$scope.gotoApprove()
		} else {
			window.open('./mpdf/report/rpt_Approve_Work.php?sch_id='+$scope.sch_id, '_blank');

		}
	}

	$scope.gotoEarly = function (){
		console.log($scope.checkBackupObj.c);
		if($scope.checkBackupObj.c == 0){
			$scope.app.addAlert('gritter-error', 'กรุณาบันทึกตารางเวร', 4000);
		} else {
			window.open('./mpdf/report/rpt_Approve_Work_EarlyMonth.php?sch_id='+$scope.sch_id, '_blank');
		}
	}


	// DELETE WHEN DB CLICK
	$scope.delete = function (mem_id){

		myFunction.confirmDeleteBox().result.then(function(ok) {
			if (ok) {
				$http({
					url:'API/SCHEDULE/DRAF/deletePersonalScheduleDetail.php',
					method:'POST',
					data:{
						'user_id':mem_id,
						'ward_id':$scope.schObj.COSTID,
						'month_id':$scope.schObj.MONTHNO,
						'year_id':$scope.schObj.YEAR
					}
				}).then(function (resp){
					$scope.deleteSchedMaster = resp.data;
					console.log($scope.deleteSchedMaster);
					if($scope.deleteSchedMaster == 1){
						$rootScope.criteria.search()
						$scope.app.addAlert('gritter-success', 'การลบผู้ปฏิบัติงานสมบูรณ์', 4000);
					}
				})
			}
		})
	}

	$scope.setHour = function (user_id,month_id,year_id,ward_id,hr){
		// goto Popup
		var modalInstance = $modal.open({
				templateUrl: 'content/schedule/popup/set-hour.html',
				controller: SetHourPopupCtrl,
				backdrop: 'static',
				windowClass: 'small',
				keyboard: false,
				resolve: {
						params_user_id: function () {
								return user_id
						},
						params_month_id: function (){
							 return month_id
						},
						params_year_id : function (){
							return year_id
						},
						params_ward_id: function (){
							return ward_id
						},
						params_hr: function (){
							return hr
						}
				}
		});
		modalInstance.result.then(function (isClose) {
		}, function () {
				$log.info('Modal dismissed at: ' + new Date());
		});
	}

	// PersonalList
	$http({
		url:'API/LISTOFVALUE/getHeadPersonal.php',
		method:'GET'
	}).then(function (resp){
		$scope.headList = resp.data
	})

	$http({
		url:'API/LISTOFVALUE/getAllPersonal.php',
		method:'GET'
	}).then(function (resp){
		$scope.allPersonalList = resp.data
	})

	$scope.gotoApprove = function (){
		var modalInstance = $modal.open({
				templateUrl: 'content/schedule/popup/approve.html',
				controller: ApprovePopupCtrl,
				backdrop: 'static',
				windowClass: 'large',
				keyboard: false,
				resolve: {
						params_schd_id: function (){
							return $scope.sch_id;
						}
				}
		});
	}


	$scope.saveHead = function (){
		$scope.type = 'head'
		$http({
			url:'API/LISTOFVALUE/updateSchduleMaster.php',
			method:'POST',
			data:{
				'val':$rootScope.criteria.head,
				'type':$scope.type,
				'sch_id':$scope.sch_id
			}
		}).then(function (resp){
			$scope.headRes = resp.data
			console.log($scope.headRes);
			if($scope.headRes == 1){
				$scope.app.addAlert('gritter-success', 'บันทึกชื่อหัวหน้ากลุ่มเรียบร้อย', 4000);
			}
		})
	}

	$scope.saveInvest = function (){
		$scope.type = 'invest'
		$http({
			url:'API/LISTOFVALUE/updateSchduleMaster.php',
			method:'POST',
			data:{
				'val':$rootScope.criteria.invest,
				'type':$scope.type,
				'sch_id':$scope.sch_id
			}
		}).then(function (resp){
			$scope.investRes = resp.data
			console.log($scope.headRes);
			if($scope.investRes == 1){
				$scope.app.addAlert('gritter-success', 'บันทึกชื่อผู้ตรวจสอบเรียบร้อย', 4000);
			}
		})
	}

	$scope.saveDirector = function (){
		$scope.type = 'director'

		$http({
			url:'API/LISTOFVALUE/updateSchduleMaster.php',
			method:'POST',
			data:{
				'val':$rootScope.criteria.director,
				'type':$scope.type,
				'sch_id':$scope.sch_id
			}
		}).then(function (resp){
			$scope.directorRes = resp.data
			console.log($scope.headRes);
			if($scope.directorRes == 1){
				$scope.app.addAlert('gritter-success', 'บันทึกชื่อผู้อำนวยการเรียบร้อย', 4000);
			}
		})

	}
	$scope.back = function (){
		window.history.back();
	}
}
