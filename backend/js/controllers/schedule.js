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
	$scope.token = $scope.userObj.ENS_Token
	console.log($scope.token);
	$scope.search = function (){
	angular.extend($rootScope.criteria, $rootScope.paging);
	console.log($rootScope.paging.pageNumber);
	$http({
		url:'API/SCHEDULE/getScheduleMasterByCostId.php',
		method:'POST',
		data:{
			'token':$scope.token,
			'page':$rootScope.paging.pageNumber,
			'limit':$rootScope.paging.limit
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
		$rootScope.criteria = {};

		$scope.isSubmit = true;

	// get wards
	$http({
		url:'API/LISTOFVALUE/getWards.php',
		method:'POST'
	}).then(function (resp){
		$scope.wardList = resp.data;
		console.log($scope.wardList);
	})

	// get groups
	$http({
		url:'API/LISTOFVALUE/getAllGroup.php',
		method:'POST'
	}).then(function (resp){
		$scope.groupList = resp.data;
		console.log($scope.groupList);
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
		$scope.ward_id = id
				$http({
					url:'API/SCHEDULE/getTemplateUser.php',
					method:'POST',
					data:{
						'cost_id':id
					}
				}).then(function (resp){
					$scope.personalList = resp.data;
					console.log($scope.personalList);
				})

				$scope.getMonth = function (){
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
									'ward_id':$scope.ward_id,
									'month_id':item.lov_value,
									'year_id':$rootScope.criteria.year
								}
							}).then(function (resp){
								$scope.gb = resp.data;
								if($scope.gb.sch_status == 1){
									item.dis = true
								}else{
									item.dis = false
								}
							})
						})
						console.log($scope.monthList);
					})
				}
		  }
		// get Month List





		// get year
		let yn = new Date().getFullYear()
		let yb = yn+543
		let y = yb+1
		$scope.yearList = []
		for (var i = yb; i <= y; i++) {
			console.log(i);
			$scope.yearList.push({year:i,yearC:i-543})
		}
		console.log($scope.yearList);






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

	$scope.drawUserSchedule = function (mem_id,month_no,ward,year){
		console.log(year);
		$http({
			url:'API/SCHEDULE/drawUserScheduleDetail.php',
			method:'POST',
			data:{
				'mem_id':mem_id,
				'month_no':month_no,
				'ward_id':ward,
				'year':year
			}
		})
	}

	$scope.create = function (){
		if($rootScope.criteria.group == ''){
			$scope.app.addAlert('gritter-error', 'กรุณาเลือกกลุ่มงาน', 4000);
			$scope.err = {}
			$scope.err.groupErr = true
		} else if ($rootScope.criteria.ward == ''){
			$scope.app.addAlert('gritter-error', 'กรุณาเลือกสถานที่ปฏิบัติงาน', 4000);
			$scope.err = {}
			$scope.err.wardErr = true
		} else if($rootScope.criteria.year == ''){
			$scope.app.addAlert('gritter-error', 'กรุณาเลือกปี', 4000);
			$scope.err = {}
			$scope.err.yearErr = true
		} else if($rootScope.criteria.month == ''){
			$scope.app.addAlert('gritter-error', 'กรุณาเลือกเดือน', 4000);
			$scope.err = {}
			$scope.err.monthErr = true
		} else {
			myFunction.confirmSaveBox().result.then(function (ok){


				if(ok){

					$http({
						url:'API/SCHEDULE/create.php',
						method:'POST',
						data:{
							'user_id':user_id,
							'ward_id':$rootScope.criteria.ward,
							'month':$rootScope.criteria.month,
							'group_id':$rootScope.criteria.group,
							'year':$rootScope.criteria.year
						}
					}).then(function (resp){
						$scope.saveSchedule = resp.data;

						console.log($scope.personalList);

						angular.forEach($scope.personalList,function (item){
							console.log("Mem_ID=",item.Mem_ID);
							// create log
							$scope.drawUserSchedule(item.Mem_ID,$rootScope.criteria.month,$rootScope.criteria.ward,$rootScope.criteria.year)
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


	}

	$scope.newWard = function (){
		$location.path('/ward/create/schedule')
	}

	$scope.newGroup = function (){
		$location.path('/group/create/schedule')
	}

	$scope.td = function (d){
		alert("td work date is "+d)
	}
	$scope.back = function (){
		window.history.back()
	}
}




//////////

function SchduleWardCtrl($rootScope,$routeParams, $scope, $http, $compile, $timeout, $filter, $location, $log, $route,$modal,myFunction,work, jet) {
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
			'cost_id':$scope.cost_id,
			'limit':$rootScope.paging.limit
		}
	}).then(function (resp){
		$scope.scheduleList = resp.data;

		angular.forEach($scope.scheduleList,function (item){
			item.YEAR_TXT = parseInt(item.YEAR_NO)+543
			jet.checkSaveEarlyMonth(item.MONTH_NO,item.YEAR_NO,item.WARD_ID).then(function (resp){
				console.log("resp=",resp);
				item.early = resp
			})
			work.progress(item.MONTH_NO,item.YEAR_NO,item.WARD_ID).then(function (resp){
				item.progress = resp
				$scope.c = 0;
				if(item.progress.d_01 == 1){
					$scope.c++
				}
				if(item.progress.d_02 == 1){
					$scope.c++
				}
				if(item.progress.d_03 == 1){
					$scope.c++
				}
				if(item.progress.d_04 == 1){
					$scope.c++
				}
				if(item.progress.d_05 == 1){
					$scope.c++
				}
				if(item.progress.d_06 == 1){
					$scope.c++
				}
				if(item.progress.d_07 == 1){
					$scope.c++
				}
				if(item.progress.d_08 == 1){
					$scope.c++
				}
				if(item.progress.d_09 == 1){
					$scope.c++
				}
				if(item.progress.d_10 == 1){
					$scope.c++
				}
				if(item.progress.d_11 == 1){
					$scope.c++
				}
				if(item.progress.d_12 == 1){
					$scope.c++
				}
				if(item.progress.d_13 == 1){
					$scope.c++
				}
				if(item.progress.d_14 == 1){
					$scope.c++
				}
				if(item.progress.d_15 == 1){
					$scope.c++
				}
				if(item.progress.d_16 == 1){
					$scope.c++
				}
				if(item.progress.d_17 == 1){
					$scope.c++
				}
				if(item.progress.d_18 == 1){
					$scope.c++
				}
				if(item.progress.d_19 == 1){
					$scope.c++
				}
				if(item.progress.d_20 == 1){
					$scope.c++
				}
				if(item.progress.d_21 == 1){
					$scope.c++
				}
				if(item.progress.d_22 == 1){
					$scope.c++
				}
				if(item.progress.d_23 == 1){
					$scope.c++
				}
				if(item.progress.d_24 == 1){
					$scope.c++
				}
				if(item.progress.d_25 == 1){
					$scope.c++
				}
				if(item.progress.d_26 == 1){
					$scope.c++
				}
				if(item.progress.d_27 == 1){
					$scope.c++
				}
				if(item.progress.d_28 == 1){
					$scope.c++
				}
				let monthText = item.YEAR_NO+"-"+item.MONTH_NO
				let totalMonth = moment(monthText, "YYYY-MM").daysInMonth()
				if(totalMonth == 29){
					if(item.progress.d_29 == 1){
						$scope.c++
					}
				}else if (totalMonth == 30){
					if(item.progress.d_29 == 1){
						$scope.c++
					}
					if(item.progress.d_30 == 1){
						$scope.c++
					}
				}else if (totalMonth == 31){
					if(item.progress.d_29 == 1){
						$scope.c++
					}
					if(item.progress.d_30 == 1){
						$scope.c++
					}
					if(item.progress.d_31 == 1){
						$scope.c++
					}
				}





				item.count = $scope.c

				console.log(totalMonth);
				item.percent = parseFloat((item.count / totalMonth)*100).toFixed(2);
				item.perentWidth = item.percent+"%"
				if (parseInt(item.percent) <= 30){
					item.colorProcess = 'danger'
					item.colorPercent = 'red'
				} else if (parseInt(item.percent) > totalMonth && parseInt(item.percent) <= 80 ){
					item.colorProcess = 'yellow'
					item.colorPercent = 'yellow'
				} else {
					item.colorProcess = 'success'
					item.colorPercent = 'green'
				}

			})
		})
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
