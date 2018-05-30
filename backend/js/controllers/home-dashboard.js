angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/',{templateUrl: _.toHttpGetUrl('content/home/dashboard.html'),controller: DashboardCtrl});
	$routeProvider.when('/asign/position',{templateUrl: _.toHttpGetUrl('content/home/asign-position.html'),controller: AsignPositionCtrl});
} ]);

function DashboardCtrl($rootScope,$routeParams, $scope, $http, $compile, $timeout, $filter, $location, $log, $route,$modal,myFunction, uiCalendarConfig,work) {
	$log.info('Enter DashboardCtrl');
			$scope.events = [];
	$(document.body).removeClass('sidebar-collapse');

	if (!$rootScope.paging) {
		$rootScope.paging = APP.DEFAULT_PAGING;
	}
	if (!$rootScope.criteria) {
		$rootScope.criteria = {};
	}

	// save temp data

	$scope.user_id = $scope.userId;
	var date = new Date();
	var d = date.getDate();
	var m = ("0" + (date.getMonth() + 1)).slice(-2)
	var y = date.getFullYear();
	$scope.year = y;
	$scope.month_id = m

	let c = m
	let year = y
	$scope.callOT = function (v){

		if(v == 'p'){
			c--
			if(c == 0){
				c = 12
				year--
			}
		} else if (v == 'n'){
			c++
			if(c > 12){
				c = 1
				year++
			}
		}
		$scope.yearCallOT = parseInt(year)+543
		$scope.month_no = ("0" + (c)).slice(-2)

		$http({
			url:'API/LISTOFVALUE/getMonthById.php',
			method:'POST',
			data:{
				'month':$scope.month_no
			}
		}).then(function (resp){
			$scope.getMonthById = resp.data
		})

		$http({
			url:'API/DRAF/getUserSumOTHomeData.php',
			method:'POST',
			data:{
				'user_id':$scope.userId,
				'month_id':$scope.month_no,
				'year_id':$scope.year
			}
		}).then(function (resp){
			$scope.cOT = resp;
			if($scope.cOT.data == "null"){
				$scope.ot = 0
			}else {
				$scope.ot = $scope.cOT.data;
			}
		})

		$http({
			url:'API/USER/getDataCountNM.php',
			method:'POST',
			data:{
				'user_id':$scope.userId,
				'month_no':$scope.month_no,
				'year_no':$scope.year
			}
		}).then(function (resp){
			$scope.cNM = resp.data;
			if($scope.cNM.nm == null){
				$scope.cNM.nm = 0
			}
		})
		$http({
			url:'API/LISTOFVALUE/getScheduleOffByUserId.php',
			method:'POST',
			data:{
				'mem_id':$scope.userId
			}
		}).then(function (resp){
			$scope.cOffObj = resp.data;
		})
	}
	$scope.callOT()
	$('body').on('click', 'button.fc-prev-button', function(e) {
		$scope.c = 0;
		let v = 'p'
		$scope.callOT(v)
	});


	$('body').on('click', 'button.fc-next-button', function() {
		$scope.c = 0;
		let v = 'n'
		$scope.callOT(v)
	});

	$http({
		url:'API/LISTOFVALUE/getAllDepartment.php',
		method:'POST'
	}).then(function (resp){
		$scope.departmentList = resp.data
	})



	$scope.changeWork = function (mem_1st){

		var modalInstance = $modal.open({
				templateUrl: 'content/home/popup/change-work.html',
				controller: ChangeWorkPopupCtrl,
				backdrop: 'static',
				windowClass: 'large',
				keyboard: false,
				resolve: {
						params_mem_first: function () {
								return $scope.user_id;
						}
				}
		});
		modalInstance.result.then(function (isClose) {
		}, function () {
				$log.info('Modal dismissed at: ' + new Date());
		});

	}





	$scope.yearBdm = parseInt($scope.year) + 543
	$http({
		url:'API/DRAF/Month.php',
		method:'POST',
		data:{
			month_id:m
		}
	}).then(function (resp){
		$scope.monthObj = resp.data;
	})



		$scope.monthName = moment(date).format('MMMM')+' '+y

		function ini_events(ele) {
			$scope.ele = ele
			ele.each(function () {

				// create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
				// it doesn't need to have a start or end

				var eventObject = {
					title: $.trim($(this).text()), // use the element's text as the event title
					id: $(this).context.align
				};

				// store the Event Object in the DOM element so we can get to it later
				$(this).data('eventObject', eventObject);

				// make the event draggable using jQuery UI
				$(this).draggable({
					zIndex: 1070,
					revert: true, // will cause the event to go back to its
					revertDuration: 0  //  original position after the drag
				});

			});
		}
			ini_events($('#external-events div.external-event'));

			var paramsDate = $scope.year+'-'+$scope.month_id+'-'+'01'
			var date = new Date(paramsDate);
			var d = date.getDate(),
					m = date.getMonth(),
					y = date.getFullYear();
			$scope.eventObj = []
			$scope.c = 0;
			$scope.year = new Date().getFullYear()
		$('#calendar').fullCalendar(
			{
			header: {
				 left: 'prev,next',
				center: 'title',
				right: 'listYear'
			},
			defaultDate: moment(paramsDate),
			events: function(start, end, timezone, callback) {
				$rootScope.criteria.events = [
					{
						title: '',
						start: new Date(paramsDate),
						editable: false,
						backgroundColor: "rgba(255, 0, 0, 0)",
						borderColor:"rgba(255, 255, 255, 0)"
					}
				];
				var dateNow = new Date()
				var monthNow = ("0" + (dateNow.getMonth() + 1)).slice(-2)
				var monthParams = ("0" + (date.getMonth() + 1)).slice(-2)
			 //  if( monthParams == monthNow){
			 // 	 $rootScope.criteria.events.push({
			 // 		 title: '',
			 // 		 start: new Date(paramsDate),
			 // 		 editable: false,
			 // 		 backgroundColor: "rgba(255, 0, 0, 0)",
			 // 		 borderColor:"rgba(255, 255, 255, 0)"
			 // 	 })
			 //  }



					$http({
						url:'API/DRAF/getUserDataHomePage.php',
						method:'POST',
						data:{
							user_id : $scope.user_id
						}
					}).then(function (resp){

						$scope.getUserData = resp.data;
						$scope.idc = 1;
						angular.forEach($scope.getUserData, function (item){
							 if(item.wl_id != null){

								 if(item.wl_color == 'red'){
									 item.wl_color = '#dd4b39 '
								 }
								 if(item.wl_hr != 8 && item.wl_hr != 0 ){

									 item.title = item.wl_name+' ('+item.wl_hr+')'
								 } else {
									 if($scope.device == 'mobile'){
										 item.title = item.wl_mobile
									 } else {
										 item.title = item.wl_name
									 }
								 }
								 let dep = _.findWhere($scope.departmentList, {Cost_id:item.t_ward_no})
								 $rootScope.criteria.events.push({
														t_id : item.t_id,
														day : item.t_day_no,
														wl_id: item.wl_id,
														title: item.title,
														description: dep.Cost_name,
														start: new Date(item.t_date), // will be parsed
														hr: item.wl_hr,
														period:item.wl_category,
														backgroundColor: item.wl_color,
														borderColor:"rgb(255, 255, 255)",
														id : $scope.idc
												});
							 }
							$scope.idc++
						})

						callback($rootScope.criteria.events);
					})
		},
		dayClick: function(date, allDay, jsEvent, view) {
	let myDate = new Date();
	let d =  date._d.toISOString().slice(0, 10)
	},
			editable: false,
	 eventRender : function (event, element, view){

		 element.qtip({
            content: event.description
        });
		 if($scope.c == 0){
			 $http({
				url:'API/DRAF/getHolidays.php',
				method:'POST',
				data:{
					'year':$scope.year,
					'month':$scope.month_id
				}
			}).then(function (resp){
				$scope.holidayList = resp.data;
				angular.forEach($scope.holidayList, function (item){
					if($scope.device == 'mobile'){
						$(view.el[0]).find('.fc-day[data-date=' + item.h_date + ']')
															 .css('background-color', 'rgb(205, 222, 232)')
					} else {
						$(view.el[0]).find('.fc-day[data-date=' + item.h_date + ']')
															 .css('background-color', 'rgb(205, 222, 232)')
															 .append(item.h_name);
					}


				})
			})
		 }
		 $scope.c++
	 },
			droppable: true, // this allows things to be dropped onto the calendar !!!
		});


    /* event sources array*/
    $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
    $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];






		$scope.getYear = function (user){
			$http({
				url:'API/SCHEDULE/SWOP/getYearChangeWork.php',
				method:'POST',
				data:{
					user_id:user
				}
			}).then(function (resp){
				$scope.userYearList = resp.data
			})
		}
		$scope.getMonthSwop = function (user,year){
			$http({
				url:'API/SCHEDULE/SWOP/getMonthByUserID.php',
				method:'POST',
				data:{
					user_id:user,
					year_id:year
				}
			}).then(function (resp){
				$scope.userMonthList = resp.data

			})
		}
		$scope.getYear($scope.user_id)

		$http({
			url:'API/SCHEDULE/SWOP/getChangeUserWorkList.php',
			method:'POST',
			data:{
				user_id : $scope.user_id
			}
		}).then(function (resp){
			$scope.userChangeList = resp.data
			console.log($scope.userChangeList);
		})



		$scope.getChangeWorkList = function (){
			console.log("month=",$rootScope.swop.monthRequestSwop);
			$scope.dayFirstList = []
			$scope.month_no = JSON.parse($rootScope.swop.monthRequestSwop)
			console.log($scope.month_no.schd_month);
	    let prepareFirstObj = {
	      user_id:$scope.user_id,
				month_id:$scope.month_no.schd_month
	    }
	    work.getScheduleDetailUserSwop(prepareFirstObj).then(function (resp){
	      $scope.firstDayList = resp
				console.log($scope.firstDayList);


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
		}










		$http({
			url:'API/SCHEDULE/SWOP/getDepartmentProvide.php',
			method:'POST',
		}).then(function (resp){
			$scope.depProvideList = resp.data;
		})




		$scope.provide = function (user){
			$rootScope.swop.user_id_nd = user;
			$scope.userProvideYearList = {}
			$scope.userProvideMonthList = {}
			console.log(user);
			$http({
				url:'API/LISTOFVALUE/getPersonalByID.php',
				method:'POST',
				data:{
					owner:user
				}
			}).then(function (resp){
				$scope.userProvideObj = resp.data;
			})

				$http({
					url:'API/SCHEDULE/SWOP/getYearChangeWork.php',
					method:'POST',
					data:{
						user_id:user
					}
				}).then(function (resp){
					$scope.userProvideYearList = resp.data
					console.log($scope.userProvideYearList);
				})

				$scope.provideSelectYear = function (){
					$http({
						url:'API/SCHEDULE/SWOP/getMonthByUserID.php',
						method:'POST',
						data:{
							user_id:user,
							year_id:$rootScope.swop.yearProvide
						}
					}).then(function (resp){
						$scope.userProvideMonthList = resp.data
						console.log($scope.userProvideMonthList);
					})
				}

				$scope.provideSelectMonth = function (){
					console.log("select month");
					$scope.daySecondList = []

					$http({
			      url:'API/USER/getUserNameByUserId.php',
			      method:'POST',
			      data:{
			        'userId':user
			      }
			    }).then(function (res){
			      $scope.userSecondObj = res.data;
			    })

			    let prepareSecondObj = {
			      user_id:user,
						month_id:$rootScope.swop.monthProvide
			    }
			    work.getScheduleDetailUserSwop(prepareSecondObj).then(function (resp){
			      $scope.secondDayList = resp
						console.log($scope.secondDayList);
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
				}


		}
		$scope.provide()

		$scope.depProvide = function (d){

			$http({
				url:'API/USER/getChangeWorkUserList.php',
				method:'POST',
				data:{
					owner:$scope.user_id,
					ward_id:d
				}
			}).then(function (resp){
				$scope.changeWorkList = resp.data;
			})
		}
		$scope.depProvide()


		$scope.saveSwap = function (){
			console.log("user_id_st=",$scope.user_id);
			$scope.work_st = JSON.parse($rootScope.swop.dayFist)
			console.log("work_st=",$scope.work_st.data.wl_id);
			console.log("date_st=",$scope.work_st.data.t_day_no);
			$scope.month_st = JSON.parse($rootScope.swop.monthRequestSwop)
			console.log("month_st=",$scope.month_st.schd_month);
			console.log("year_st=",$rootScope.swop.yearRequestSwop);


			console.log("user_id_nd=",$rootScope.swop.user_id_nd);
			$scope.work_nd = JSON.parse($rootScope.swop.daySecond)
			console.log("work_nd=",$scope.work_nd.data.wl_id);
			console.log("date_nd=",$scope.work_nd.data.t_day_no);
			console.log("month_nd=",$rootScope.swop.monthProvide);
			console.log("year_nd=",$rootScope.swop.yearProvide);
			if($rootScope.swop.yearRequestSwop == undefined){
				$scope.app.addAlert('gritter-error', 'กรุณาเลือก', 4000);
			}
					myFunction.confirmSaveBox(d).result.then(function (ok){
						if(ok){
							$http({
								url:'API/SCHEDULE/SWOP/saveChangeWork.php',
								method:'POST',
								data:{
									user_id_st:$scope.user_id,
									work_st:$scope.work_st.data.wl_id,
									date_st:$scope.work_st.data.t_day_no,
									month_st:$scope.month_st.schd_month,
									year_st:$rootScope.swop.yearRequestSwop,

									user_id_nd:$rootScope.swop.user_id_nd,
									work_nd:$scope.work_nd.data.wl_id,
									date_nd:$scope.work_nd.data.t_day_no,
									month_nd:$rootScope.swop.monthProvide,
									year_nd:$rootScope.swop.yearProvide,

									reason:$rootScope.swop.reason
								}
							}).then(function (resp){
								$scope.swoped = resp.data;
								console.log($scope.swoped);
								if($scope.swoped == 1){
									$scope.app.addAlert('gritter-success', 'ส่งคำขอเรียบรอย', 4000);
									$rootScope.swop = {}
								}
							})
						}
					})
		}


}

function AsignPositionCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route,$modal,myFunction) {
	$log.info('Enter AsignPositionCtrl');

	if (!$rootScope.paging) {
		$rootScope.paging = APP.DEFAULT_PAGING;
	}

	if (!$rootScope.criteria) {
		$rootScope.criteria = {};

	}

}
