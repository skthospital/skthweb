angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/schedules',{templateUrl: _.toHttpGetUrl('content/schedule/list.html'),controller: SchduleListCtrl});
	$routeProvider.when('/schedule/create',{templateUrl: _.toHttpGetUrl('content/schedule/create.html'),controller: SchduleCreateCtrl});
	$routeProvider.when('/schedule/draf/:id',{templateUrl: _.toHttpGetUrl('content/schedule/detail.html'),controller: SchduleDrafCtrl});
	$routeProvider.when('/schedule/ward/:cost_id',{templateUrl: _.toHttpGetUrl('content/schedule/ward.html'),controller: SchduleWardCtrl});
	$routeProvider.when('/schedule/create/data/:id/:ward_id',{templateUrl: _.toHttpGetUrl('content/schedule/createData.html'),controller: SchduleCreateDataCtrl});

} ]);

function SchduleListCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route,$modal,myFunction) {
	$log.info('Enter SchduleListCtrl');
	$(document.body).removeClass('sidebar-collapse');

	if (!$rootScope.paging) {
		$rootScope.paging = APP.DEFAULT_PAGING;
	}
	if (!$rootScope.criteria) {
		$rootScope.criteria = {};
	}

	$scope.search = function (){
	angular.extend($rootScope.criteria, $rootScope.paging);
	$http({
		url:'API/SCHEDULE/getScheduleMasterByCostId.php',
		method:'POST',
		data:{
			'page':$rootScope.paging.pageNumber
		}
	}).then(function (resp){
		$scope.scheduleList = resp.data;
		console.log($scope.scheduleList);
		$http({
			url:'API/SCHEDULE/getScheduleMasterByCostIdTotal.php',
			method:'POST'

		}).success(function (data){
			$scope.sTotal = data;
			$rootScope.paging.totalItems = $scope.sTotal.total;
			$rootScope.paging.showing = _.getShowing($rootScope.paging.pageNumber, $rootScope.paging.limit, $scope.sTotal.total);
		})
	})
}
	$scope.search()
	$scope.selectPage = function(page) {
		$rootScope.paging.pageNumber = page;
		$scope.search();
	};
	$scope.gotoCreate = function (){
		$location.path('/schedule/create')
	}
	$scope.gotoScheduleWard = function (id){
		$location.path('/schedule/ward/'+id)
	}
	$scope.gotoDraf = function (id){
		$location.path('schedule/draf/'+id)
	}
	$scope.delete = function (id){
		myFunction.confirmDeleteBox().result.then(function (ok){
			if(ok){
				$http({
					url:'API/SCHEDULE/delete.php',
					method:'POST',
					data:{
						'sch_id':id
					}
				}).then(function (resp){
					$scope.deleted = resp.data;
					console.log($scope.deleted);
					if($scope.deleted == 1){
						$scope.search()

					}
				})
			}

		})
	}



}
function SchduleCreateCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route,$modal,myFunction) {
	$log.info('Enter SchduleCreateCtrl');

	if (!$rootScope.paging) {
		$rootScope.paging = APP.DEFAULT_PAGING;
	}
	if (!$rootScope.criteria) {
		$rootScope.criteria = {};
	}

	// get wards
	$http({
		url:'API/LISTOFVALUE/getWards.php',
		method:'POST'
	}).then(function (resp){
		$scope.wardList = resp.data;
		console.log($scope.wardList);
	})
	// get Department List
	$http({
		url:'API/LISTOFVALUE/getAllDepartment.php',
		method:'POST'
	}).then(function (resp){
		$scope.departmentList = resp.data;
		console.log($scope.departmentList);
	})
	$scope.getPersonalWard = function (id){
		$http({
			url:'API/SCHEDULE/getPersonalByCostId.php',
			method:'POST',
			data:{
				'cost_id':id
			}
		}).then(function (resp){
			$scope.personalList = resp.data;
			console.log($scope.personalList);
		})
		// get Month List
		$http({
			url:'API/LISTOFVALUE/getAllMonth.php',
			method:'POST'
		}).then(function (resp){
			$scope.monthList = resp.data;
			angular.forEach($scope.monthList, function (item){
				$http({
					url:'API/SCHEDULE/getScheduleMasterGB.php',
					method:'POST',
					data:{
						'ward_id':id,
						'month_id':item.lov_value
					}
				}).then(function (resp){
					$scope.gb = resp.data;
					if($scope.gb.sch_status == 1){
						item.dis = true
					}else{
						item.dis = false
					}
					console.log($scope.gb);
				})
			})
			console.log($scope.monthList);
		})
	}
	$scope.selected = function (id){
		console.log("id="+id);
		//
		$http({
			url:'API/CREATETABLE/createPersonalTable.php',
			method:'POST',
			data:{
				'mem_id':String(id)
			}
		}).then(function (resp){
			$scope.createTable = resp.data;
			// insert to status
			if($scope.createTable == 1){
			}
			console.log($scope.createTable);
		})
	}
	$scope.officerList = function (){
		console.log($rootScope.criteria.dep_f);
		$http({
			url:'API/LISTOFVALUE/getPersonalByCostId.php',
			method:'POST',
			data:{
				'cost_id':$rootScope.criteria.dep_f
			}
		}).then(function (resp){
			$scope.officerFromList = resp.data;
			console.log($scope.officerFromList);
		})
	}
	$scope.createTable = function (mem_id,month_no,ward_id){
		if(APP.ENV == 'DEV') {
			alert("createTable function")
		}
		$http({
			url:'API/LISTOFVALUE/checkDataAvaliableInsert.php',
			method:'POST',
			data:{
				'user_id':mem_id
			}
		}).then(function (resp){
			$scope.checkData = resp.data;
			if($scope.checkData.length == 0){
				if(APP.ENV == 'DEV') {
	        alert("Table Log no have table")
	      }
				$http({
					url:'API/SCHEDULE/createTableLog.php',
					method:'POST',
					data:{
						'Mem_ID': mem_id
					}
				}).then(function (resp){
					$scope.createdLogTable = resp.data;
					if($scope.createdLogTable == 1){
						if(APP.ENV == 'DEV') {
			        alert("createTable Success")
			      }
						// Create table
						$http({
							url:'API/CREATETABLE/createPersonalTable.php',
							method:'POST',
							data:{
								'mem_id': mem_id
							}
						}).then(function (resp){
							$scope.createdTable = resp.data;
							if(APP.ENV == 'DEV') {
				        alert("drawdata ")
				      }
								$http({
									url:'API/CREATETABLE/drawdata.php',
									method:'POST',
									data:{
										'mem_id':mem_id,
										'month_no':month_no,
										'ward_id':ward_id
									}
								}).then(function (resp){
									$scope.drawdata = resp.data;
								})

						})

					}


				})
			} else {
				if(APP.ENV == 'DEV') {
					alert("Table Log have table")
				}
				$http({
					url:'API/CREATETABLE/checkMonthDataTable.php',
					method:'POST',
					data:{
						'user_id':mem_id,
						'month_id':month_no
					}
				}).then(function (resp){
					$scope.checkMonthTable = resp.data;
					console.log($scope.checkMonthTable);
					if($scope.checkMonthTable.length == 0){
						if(APP.ENV == 'DEV') {
							alert("no have this month")
						}

						$http({
							url:'API/CREATETABLE/drawdata.php',
							method:'POST',
							data:{
								'mem_id':mem_id,
								'month_no':month_no,
								'ward_id':ward_id
							}
						}).then(function (resp){
							$scope.drawdata = resp.data;
							if($scope.drawdata == 1){
								if(APP.ENV == 'DEV') {
									alert("drawdata Suiccess")
								}
							}
						})

					} else {
						if(APP.ENV == 'DEV') {
							alert("have this month")
						}


					}
				})




			}

		})


	}
	$scope.drawUserSchedule = function (mem_id,month_no,ward){
		$http({
			url:'API/SCHEDULE/drawUserScheduleDetail.php',
			method:'POST',
			data:{
				'mem_id':mem_id,
				'month_no':month_no,
				'ward_id':ward
			}
		})
	}
	$scope.create = function (){
		myFunction.confirmSaveBox().result.then(function (ok){
			if(ok){

				$http({
					url:'API/SCHEDULE/create.php',
					method:'POST',
					data:{
						'user_id':user_id,
						'ward_id':$rootScope.criteria.ward,
						'month':$rootScope.criteria.month
					}
				}).then(function (resp){
					$scope.saveSchedule = resp.data;

					console.log($scope.personalList);

					angular.forEach($scope.personalList,function (item){
						console.log("Mem_ID=",item.Mem_ID);
						// create log
						$scope.createTable(item.Mem_ID,$rootScope.criteria.month,$rootScope.criteria.ward);
						$scope.drawUserSchedule(item.Mem_ID,$rootScope.criteria.month,$rootScope.criteria.ward)
					})
					if($scope.saveSchedule == 1){
						$scope.app.addAlert('gritter-success', 'การสร้างตารางเวรสมบูรณ์', 4000);
						$location.path('/schedule/ward/'+$rootScope.criteria.ward)
					}
					console.log($scope.saveSchedule);
				})
			}

		})
	}
	$scope.td = function (d){
		alert("td work date is "+d)
	}
	$scope.back = function (){
		$location.path('/schedules')
	}
}

function SchduleDrafCtrl($rootScope,$routeParams, $scope, $http, $compile, $timeout, $filter, $location, $log, $route,$modal,myFunction) {
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
			$scope.schObj.YEAR_B = parseInt($scope.schObj.YEAR) + 543
			$http({
				url:'API/SCHEDULE/DRAF/getScheduleDetailByCostId.php',
				method:'POST',
				data:{
					'ward_id':$scope.schObj.COSTID,
					'month':$scope.schObj.MONTHNO,
					'year':$scope.schObj.YEAR
				}
			}).then(function (resp){
				$scope.personalList = resp.data;
				console.log($scope.personalList);
				$scope.OTTotal = 0
				$scope.NMTotal = 0
				$scope.cStale = 0
				$scope.OTMoneyTotal = 0
				angular.forEach($scope.personalList,  function (item){
					$http({
						url:'API/LISTOFVALUE/sumDataTable.php',
						method:'POST',
						data:{
							'user_id':item.Mem_ID,
							'month_no':$scope.schObj.MONTHNO,
							'year_no':$scope.schObj.YEAR
						}
					}).then(function (resp){
						$scope.sumTotal = resp.data;
						item.cTotal = $scope.sumTotal.OT
						item.cOT = parseInt(item.cTotal)*parseInt(item.Position_OTRate)
						item.cMoneyOT = Number(item.cOT.toFixed(1)).toLocaleString()
						$scope.OTTotal = $scope.OTTotal + item.cTotal
						$scope.OTMoneyTotal = $scope.OTMoneyTotal + parseInt(item.cOT)
						$scope.OTMoneyTotalStr = Number($scope.OTMoneyTotal.toFixed(1)).toLocaleString()
					})

					$http({
						url:'API/LISTOFVALUE/sumNMDataTable.php',
						method:'POST',
						data:{
							'user_id':item.Mem_ID,
							'month_no':$scope.schObj.MONTHNO,
							'year_no':$scope.schObj.YEAR
						}
					}).then(function (resp){
						$scope.sumNMTotalObj = resp.data;

							item.sumNMTotal = $scope.sumNMTotalObj.NM
							$scope.NMTotal = $scope.NMTotal + item.sumNMTotal
					})

					$http({
						url:'API/SCHEDULE/DRAF/getScheduleOffCount.php',
						method:'POST',
						data:{
							'user_id':item.Mem_ID
						}
					}).then(function (resp){
						$scope.countSch = resp.data;
						item.stale = parseInt($scope.countSch.stale)
						$scope.cStale = $scope.cStale + item.stale
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
		$scope.monthTotalBtn = $scope.monthTotal + 6;

		var i = 1;
		while (i <= $scope.monthTotal) {
			$scope.colorNum(i,month,year)
    	i++;
		}
	}

	$rootScope.criteria.redeemList = []
	$scope.check = function(value, checked) {

		if(!checked){ // false
			$rootScope.criteria.redeemList = []
		} else { // true
			$rootScope.criteria.redeemList.push(value)
		}

		let redeem = _.union($rootScope.criteria.redeemList);
		if(redeem.length == 2){
			// $scope.redeemPopup(redeem[0],redeem[1],$scope.schObj.MONTHNO,$scope.schObj.YEAR,$scope.schObj.COSTID)
			$location.path('/redeem/'+redeem[0]+'/'+redeem[1]+'/'+$scope.schObj.MONTHNO+'/'+$scope.schObj.YEAR+'/'+$scope.schObj.COSTID)

		}

		console.log("checked =",checked);
		console.log("value = ",value);

		console.log("redeem is ",redeem);

};

$scope.redeemPopup = function (redeem1,redeem2,month_id,year_id,ward_id){

	var modalInstance = $modal.open({
			templateUrl: 'content/schedule/popup/redeem.html',
			controller: RedeemPopupCtrl,
			backdrop: 'static',
			windowClass: 'large',
			keyboard: false,
			resolve: {
					params_redeem1: function () {
							return redeem1;
					},
					params_redeem2: function (){
						return redeem2;
					},
					params_month: function (){
						return month_id;
					},
					params_year: function (){
						return year_id;
					},
					params_ward_id: function (){
						return ward_id;
					}
			}
	});
	modalInstance.result.then(function (isClose) {
	}, function () {
			$log.info('Modal dismissed at: ' + new Date());
	});

}

	$scope.td = function (id,month,year,user_id){
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
							return year;
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
						$http({
							url:'API/SCHEDULE/DRAF/deletePersonalData.php',
							method:'POST',
							data:{
								'user_id':mem_id,
								'ward_id':$scope.schObj.COSTID,
								'month_id':$scope.schObj.MONTHNO,
								'year_id':$scope.schObj.YEAR
							}
						}).then(function (resp){
							$scope.clearUserData = resp;
							console.log($scope.clearUserData);

						})
						$scope.app.addAlert('gritter-success', 'การลบผู้ปฏิบัติงานสมบูรณ์', 4000);
						$rootScope.criteria.search()
					}
				})
			}
		})
	}




	$scope.back = function (){
		window.history.back();
	}
}


//////////

function SchduleWardCtrl($rootScope,$routeParams, $scope, $http, $compile, $timeout, $filter, $location, $log, $route,$modal,myFunction) {
	$log.info('Enter SchduleWardCtrl');
	$(document.body).removeClass('sidebar-collapse');

	if (!$rootScope.paging) {
		$rootScope.paging = APP.DEFAULT_PAGING;
	}
	if (!$rootScope.criteria) {
		$rootScope.criteria = {};
	}
	$scope.cost_id = $routeParams.cost_id
	$http({
		url:'API/LISTOFVALUE/getCostNameById.php',
		method:'POST',
		data:{
			'cost_id':$scope.cost_id
		}
	}).then(function (resp){
		$scope.depObj = resp.data;
		console.log($scope.depObj);
	})
	$scope.search = function (){
	angular.extend($rootScope.criteria, $rootScope.paging);
	$http({
		url:'API/SCHEDULE/getScheduleMasters.php',
		method:'POST',
		data:{
			'page':$rootScope.paging.pageNumber,
			'cost_id':$scope.cost_id
		}
	}).then(function (resp){
		$scope.scheduleList = resp.data;
		console.log($scope.scheduleList);
		$http({
			url:'API/SCHEDULE/getScheduleMastersTotal.php',
			method:'POST',
			data:{
				'cost_id':$scope.cost_id
			}
		}).success(function (data){
			$scope.sTotal = data;
			$rootScope.paging.totalItems = $scope.sTotal.total;
			$rootScope.paging.showing = _.getShowing($rootScope.paging.pageNumber, $rootScope.paging.limit, $scope.sTotal.total);
		})
	})
}
	$scope.search()
	$scope.selectPage = function(page) {
		$rootScope.paging.pageNumber = page;
		$scope.search();
	};
	$scope.gotoCreate = function (){
		$location.path('/schedule/create')
	}
	$scope.gotoScheduleWard = function (id){
		$location.path('/schedule/ward/'+id)
	}
	$scope.gotoDraf = function (id){

		$location.path('schedule/draf/'+id)
	}
	$scope.delete = function (id,month_no,year_no){
		console.log($scope.depObj.Cost_id);
		console.log(month_no);
		myFunction.confirmDeleteBox().result.then(function (ok){
			if(ok){
				$http({
					url:'API/SCHEDULE/delete.php',
					method:'POST',
					data:{
						'sch_id':id
					}
				}).then(function (resp){
					$scope.deleted = resp.data;
					console.log($scope.deleted);
					if($scope.deleted == 1){
						$scope.search()
						$http({
							url:'API/SCHEDULE/getScheduleDetailForDeleteRef.php',
							method:'POST',
							data:{
								'month_id':month_no,
								'year_id':year_no,
								'ward_id':$scope.depObj.Cost_id
							}
						}).then(function (resp){
							$scope.deleteObj = resp.data;
							let ward_id = $scope.depObj.Cost_id;
							console.log($scope.deleteObj);
							angular.forEach($scope.deleteObj, function (item){
								let mem_id = item.schd_user_id
								$scope.deleteDetal(mem_id,month_no,year_no,ward_id)
							})
						})
					}
				})
			}

		})
	}

	$scope.deleteDetal = function (mem_id,month_id,year_id,ward_id){

				$http({
					url:'API/SCHEDULE/DRAF/deletePersonalScheduleDetail.php',
					method:'POST',
					data:{
						'user_id':mem_id,
						'ward_id':ward_id,
						'month_id':month_id,
						'year_id':year_id
					}
				}).then(function (resp){
					$scope.deleteSchedMaster = resp.data;
					console.log($scope.deleteSchedMaster);
					if($scope.deleteSchedMaster == 1){
						$http({
							url:'API/SCHEDULE/deletePersonalData.php',
							method:'POST',
							data:{
								'user_id':mem_id,
								'ward_id':ward_id,
								'month_id':month_id,
								'year_id':year_id
							}
						}).then(function (resp){
							$scope.clearUserData = resp;
							console.log($scope.clearUserData);

						})

					}
				})


	}

	$scope.gotoBack = function (){
		$location.path('/schedules')
	}

}



function SchduleCreateDataCtrl($rootScope,$routeParams, $scope, $http, $compile, $timeout, $filter, $location, $log, $route,$modal,myFunction) {
	$log.info('Enter SchduleCreateDataCtrl');
	$(document.body).removeClass('sidebar-collapse');

	if (!$rootScope.paging) {
		$rootScope.paging = APP.DEFAULT_PAGING;
	}

		$rootScope.criteria = {};

	$scope.error = {}




	$http({
		url:'API/LISTOFVALUE/getAllWorkList.php',
		method:'GET'
	}).then(function (resp){
		$scope.workList = resp.data;
		console.log($scope.workList);
	})

	$scope.user_id = $routeParams.id
	$scope.ward_id = $routeParams.ward_id
	$http({
		url:'API/LISTOFVALUE/getPersonalByMemId.php',
		method:'POST',
		data:{
			'mem_id':$scope.user_id
		}
	}).then(function (resp){
		$scope.userDraf = resp.data;
		console.log($scope.userDraf);

		$rootScope.criteria.fullName = $scope.userDraf.Pre_name+$scope.userDraf.Mem_name+ "  "+$scope.userDraf.Mem_lastname
	})
	console.log($scope.user_id);

	$scope.beforeSave = function (){
		if ($rootScope.criteria.workVal == undefined){
			$scope.app.addAlert('gritter-warning', 'กรุณาเลือกเวลาปฏิบัติงาน', 4000);
			$scope.error.errorWork = true
		}else if($rootScope.criteria.date_f == undefined){
			$scope.app.addAlert('gritter-warning', 'กรุณาเลือกวันที่เริ่มต้น', 4000);
			$scope.error = {}
			$scope.error.errorDateF = true
		}else if ($rootScope.criteria.date_t == undefined){
			$scope.app.addAlert('gritter-warning', 'กรุณาเลือกวันที่สิ้นสุด', 4000);
			$scope.error = {}
			$scope.error.errorDateT = true
		}else if ($rootScope.criteria.date_t < $rootScope.criteria.date_f){
			$scope.app.addAlert('gritter-warning', 'วันที่เริ่มต้นมากกว่าวันที่สิ้นสุดไม่ได้', 4000);
			$scope.error = {}
			$scope.error.errorDateF = true
			$scope.error.errorDateT = true
		}else {
			$scope.save()
		}
	}


	$scope.save = function () {

		console.log($rootScope.criteria.date_f);
		console.log($rootScope.criteria.date_t);
		let date1 = new Date($rootScope.criteria.date_f);
		let date2 = new Date($rootScope.criteria.date_t);
		let timeDiff = Math.abs(date2.getTime() - date1.getTime());
		let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

		let month_no = ("0" + (date1.getMonth() + 1)).slice(-2)
		console.log(month_no);
		let year_no = date1.getFullYear()
		let cD = diffDays + 1
		console.log("cDate = ",diffDays);
		let c = 1
		for (i = 0; i <= diffDays; i++) {
			console.log("c=",c);
			if(cD == c){
				$scope.app.addAlert('gritter-success', 'การบันทึกเสร็จสมบูรณ์', 4000);
				$scope.back()
			}
			let sched_date = date1.getDate()+i

				$http({
					url:'API/SCHEDULE/DRAF/updateScheduleDetail.php',
					method:'POST',
					data:{
						'user_id':$scope.user_id,
						'day_id':sched_date,
					  'month_id':month_no,
						'year_id':year_no,
						'ward_id':$scope.ward_id,
						'work_id':$rootScope.criteria.workVal
					}
				}).then(function (resp){
					$scope.createData = resp.data;
					if($scope.createData == 1){
						$http({
							url:'API/SCHEDULE/DRAF/updateUserTable.php',
							method:'POST',
							data:{
								'user_id':$scope.user_id,
								'day_id':sched_date,
							  'month_id':month_no,
								'year_id':year_no,
								'ward_id':$scope.ward_id,
								'work_id':$rootScope.criteria.workVal
							}
						})

					}

					console.log($scope.createData);
				})
				c++
		}
	}

	$scope.back = function (){
		window.history.back();
	}

}
