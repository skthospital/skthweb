angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/draf/data/:user_id/:month_id/:ward_id/:year_id',{templateUrl: _.toHttpGetUrl('content/draf/data.html'),controller: DrafDataCtrl});
} ]);

function DrafDataCtrl($rootScope, $scope, $http, $compile,$routeParams, $timeout, $filter, $location, $log, $route,$modal,myFunction,uiCalendarConfig, jet, work) {
	$log.info('Enter DrafDataCtrl');
	$(document.body).addClass('sidebar-collapse');
	$scope.user_id = $routeParams.user_id
	$scope.ward_id = $routeParams.ward_id;
	$scope.month_id = $routeParams.month_id;
	$scope.year_id = $routeParams.year_id;

	$scope.yearBdm = parseInt($routeParams.year_id) + 543
	$http({
		url:'API/DRAF/Month.php',
		method:'POST',
		data:{
			month_id:$scope.month_id
		}
	}).then(function (resp){
		$scope.monthObj = resp.data;
		console.log($scope.monthObj);
	})

	$scope.hur = 0;

	$scope.add = 0;
	$scope.edit = 1;
	$scope.hurH = 'danger';
	$scope.spin = null;
	$scope.setHur = function (val){
		if(val == 0){
			$scope.spin = null;
			$scope.hurH = 'danger';
		} else {
			$scope.spin = 'fa-spin';
			$scope.hurH = 'success';
		}
		$scope.hur = val;
		$http({
			url:'API/DRAF/getUserWorkList.php',
			method:'POST',
			data:{
				'ot':$scope.hur
			}
		}).then(function (resp){
			$scope.workList = resp.data;
		})
	}

$scope.setHur($scope.hur)
$scope.off = 0;

$scope.setUseOff = function (val){
	console.log("click");
	console.log(val);
	if(val == 0){
		$scope.spinOff = null;
		$scope.useOff = 'danger';
	} else {
		$scope.spinOff = 'fa-spin';
		$scope.useOff = 'success';
	}
	$scope.off = val;

}
$scope.setUseOff($scope.off)


$scope.setAdd = function (val){
	if(val == 1){
		$scope.add = 1;
		$scope.edit = 0
	} else if (val == 0){
		$scope.add = 0;

	}

}

$scope.setEdit = function (val){
	console.log("edit");
	console.log(val);
	if(val == 1){
		$scope.edit = 1;
		$scope.add = 0;
	} else if (val == 0){
		$scope.edit = 0;
	}

}

console.log($scope.hur);




	$http({
		url:'API/DRAF/getPersonalByMemId.php',
		method:'POST',
		data:{
			'mem_id':$scope.user_id
		}
	}).then(function (resp){
		$scope.userObj = resp.data;
	})




	$http({
		url:'API/DRAF/getUserWorkListSpecail.php',
		method:'GET'
	}).then(function (resp){
		$scope.workListSP = resp.data;
	})

	/* initialize the external events
	-----------------------------------------------------------------*/
	/* initialize the external events
      -----------------------------------------------------------------*/
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

     /* initialize the calendar
      -----------------------------------------------------------------*/
     //Date for the calendar events (dummy data)
		 var paramsDate = $routeParams.year_id+'-'+$routeParams.month_id+'-'+'01'
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
	          left: false,
	         center: false,
	         right: 'title'
	       },
				 defaultDate: moment(paramsDate),
				 events: function(start, end, timezone, callback) {
					 $rootScope.criteria.events = [
						//  {
						// 	 title: '',
						// 	 start: new Date(paramsDate),
						// 	 editable: false,
						// 	 backgroundColor: "rgba(255, 0, 0, 0)",
						// 	 borderColor:"rgba(255, 255, 255, 0)"
						//  }
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
						url:'API/DRAF/getUserData.php',
						method:'POST',
						data:{
							user_id : $scope.user_id,
							month_id : $scope.month_id,
							ward_id : $scope.ward_id,
							year_id : $scope.year_id
						}
					}).then(function (resp){
						console.log("resp=",resp.data);
						$scope.idc = 1;
						angular.forEach(resp.data,function (item){
							console.log(item);
										if(item.wl_id != null){

											if(item.wl_color == 'red'){
												item.wl_color = '#dd4b39 '
											}
											if(item.wl_hr != 8 && item.wl_hr != 0 ){

												item.title = item.wl_name+' ('+item.wl_hr+')'
											} else {
												item.title = item.wl_name
											}
							$rootScope.criteria.events.push({
												 t_id : item.t_id,
												 day : item.t_day_no,
												//  work_type : item.t_work_type,
												 wl_id: item.wl_id,
												 title: item.title,
												 start: new Date(item.t_date), // will be parsed
												 hr: item.wl_hr,
												 period:item.wl_category,
												 backgroundColor: item.wl_color,
												 borderColor:"rgb(255, 255, 255)",
												 id : $scope.idc
										 })
									}
								$scope.idc++
						})
						callback($rootScope.criteria.events);
					})

						//  $http({
						// 	 url:'API/DRAF/getUserData.php',
						// 	 method:'POST',
						// 	 data:{
						// 		 user_id : $scope.user_id,
						// 		 month_id :$scope.month_id
						// 	 }
						//  }).then(function (resp){
						 //
						// 	 $scope.getUserData = resp.data;
						// 	 console.log($scope.getUserData);
						// 	 $scope.idc = 1;
						// 	 angular.forEach($scope.getUserData, function (item){
						// 			if(item.wl_id != null){
						 //
						// 				if(item.wl_color == 'red'){
						// 					item.wl_color = '#dd4b39 '
						// 				}
						// 				if(item.wl_hr != 8 && item.wl_hr != 0 ){
						 //
						// 					item.title = item.wl_name+' ('+item.wl_hr+')'
						// 				} else {
						// 					item.title = item.wl_name
						// 				}
						// 				$rootScope.criteria.events.push({
						 //
						// 									 t_id : item.t_id,
						// 									 day : item.t_day_no,
						// 									 wl_id: item.wl_id,
						// 									 work_type : item.t_work_type,
						// 									 title: item.title,
						// 									 start: new Date(item.t_date), // will be parsed
						// 									 hr: item.wl_hr,
						// 									 period:item.wl_category,
						// 									 backgroundColor: item.wl_color,
						// 									 borderColor:"rgb(255, 255, 255)",
						// 									 id : $scope.idc
						// 							 });
						// 			}
						 //
						// 		 $scope.idc++
						// 	 })
						 //
						// 	//  callback($rootScope.criteria.events);
						//  })
	     },
			 dayClick: function(date, allDay, jsEvent, view) {
	   var myDate = new Date();
	   //How many days to add from today?
	   if (date._d < myDate) {
	       //TRUE Clicked date smaller than today + daysToadd
	       alert("You cannot book on this day!");
	   } else {
	       //FLASE Clicked date larger than today + daysToadd
	       alert("Excellent choice! We can book today..");
	   }

	},
	eventClick: function(event) {
		$scope.dDate = new Date(event.start._d)
		$scope.dD = ("0" + $scope.dDate.getDate()).slice(-2)
		$scope.dM = ("0" + ($scope.dDate.getMonth() + 1)).slice(-2)
		$scope.dY = $scope.dDate.getFullYear()
		console.log(event);
		console.log($rootScope.criteria.events);

		myFunction.confirmDeleteBox().result.then(function (ok){
			if(ok){
				$http({
					url:'API/DRAF/pastUpdateScheduleDetail.php',
					method:'POST',
					data:{
						'user_id' : $routeParams.user_id,
						'day_id'  : $scope.dD,
						'month_id': $scope.dM,
						'year_id' : $scope.dY,
						'ward_id' : $routeParams.ward_id,
						'period'  : event.period
					}
				}).then(function (resp){
					$scope.updatePastEvent = resp.data
					$('#calendar').fullCalendar('removeEvents', event.id);
					console.log($scope.updatePastEvent);
				})
			}
		})
},
	       editable: true,
				 eventDrop: function(event, delta, revertFunc) {

					 // future Date
					 $scope.fDate = new Date(event.start._d)
					 $scope.fD = ("0" + $scope.fDate.getDate()).slice(-2)
					 $scope.fM = ("0" + ($scope.fDate.getMonth() + 1)).slice(-2)
					 $scope.fY = $scope.fDate.getFullYear()
					 // past date
					 $scope.pDate = new Date(event.start._i)
					 $scope.pD = ("0" + $scope.pDate.getDate()).slice(-2)
					 $scope.pM = ("0" + ($scope.pDate.getMonth() + 1)).slice(-2)
					 $scope.pY = $scope.pDate.getFullYear()
					 $http({
						 url:'API/DRAF/updateScheduleDetail.php',
						 method:'POST',
						 data:{
							 'user_id' : $routeParams.user_id,
							 'day_id'  : $scope.fD,
							 'month_id': $scope.fM,
							 'year_id' : $scope.fY,
							 'ward_id' : $routeParams.ward_id,
							 'work_id' : event.wl_id
						 }
					 }).then(function (resp){
						 $scope.updateEvent = resp.data
						 if($scope.updateEvent == 1){
							 $scope.app.addAlert('gritter-success', 'เปลี่ยนแปลงเวรปฏิบัติงานเรียนร้อย', 4000);
						 } else {
							 $scope.app.addAlert('gritter-error', 'เกิดข้อผิดพลาดกรุณาติดต่อผู้พัฒนา', 4000);
						 }
					 })
	    },

			eventRender : function (event, element, view){
				if($scope.c == 0){
					$http({
	 				 url:'API/DRAF/getHolidays.php',
	 				 method:'POST',
					 data:{
						 'year':$scope.year,
						 'month':$routeParams.month_id
					 }
	 			 }).then(function (resp){
	 				 $scope.holidayList = resp.data;
	 				 angular.forEach($scope.holidayList, function (item){
	 					 $(view.el[0]).find('.fc-day[data-date=' + item.h_date + ']')
	 		 													.css('background-color', 'rgb(205, 222, 232)').append(item.h_name);

	 				 })
	 			 })
				}
				$scope.c++
			},
	       droppable: true, // this allows things to be dropped onto the calendar !!!
	       drop: function (date, allDay) { // this function is called when something is dropped
					//  console.log("jet return =",jet.generateStatus(1));
	         // retrieve the dropped element's stored Event Object
	        //  var originalEventObject = $(this).data('eventObject');

					 var originalEventObject = $(this).data('eventObject');

					 $scope.originalEventObject = originalEventObject
					 console.log("dropped =",$scope.originalEventObject);

					 $scope.eventObj.push($scope.originalEventObject.id)
					 $scope.dateDrag = new Date(date._d)
					 $scope.dDate = ("0" + $scope.dateDrag.getDate()).slice(-2)
					 $scope.dMonth = ("0" + ($scope.dateDrag.getMonth() + 1)).slice(-2)
					 $scope.dYear = $scope.dateDrag.getFullYear()

					 $scope.cTDate = $scope.dYear+'-'+$scope.dMonth+'-'+$scope.dDate
					 $scope.convertData = _.findWhere($scope.getUserData, {t_date: $scope.cTDate});
					 console.log($scope.originalEventObject);


					$scope.draw = function (val){
						 $http({
							 url:'API/DRAF/updateScheduleDetail.php',
							 method:'POST',
							 data:{
								 'user_id' : $routeParams.user_id,
								 'day_id'  : $scope.dDate,
								 'month_id': $scope.dMonth,
								 'year_id' : $scope.dYear,
								 'ward_id' : $scope.ward_id,
								 'work_id' : $scope.originalEventObject.wl_id,
								 'period'  : $scope.originalEventObject.period
							 }
						 }).then(function (resp){
							 $scope.updateEvent = resp.data
							 console.log($scope.updateEvent);
							 if($scope.updateEvent == 1){
								 $scope.app.addAlert('gritter-success', 'เปลี่ยนแปลงเวรปฏิบัติงานเรียนร้อย', 4000);
								 $scope.dropRender()
							 }

							 if ($scope.off == 1) {
								 console.log("off");
								 let updateUseOff = {
									 user_id : $routeParams.user_id,
									 ward_id : $routeParams.ward_id,
									 date_id : $scope.dD,
									 month_id : $scope.dM,
									 year_id : $scope.dY,
									 status : 2,
									 statusSearch : 1
								 }
							 	jet.updateOff(updateUseOff)
							 }
							 if($scope.originalEventObject.wl_id == 22){
								 let offObj = {
									 user_id : $routeParams.user_id,
									 ward_id : $scope.ward_id,
									 date_id : $scope.dDate,
									 month_id : $scope.dMonth,
									 year_id : $scope.dYear
								 }
								 jet.isOff(offObj)
							 }





						 })
						$scope.dropRender = function (){
							$scope.copiedEventObject = angular.extend(val);
							if($scope.copiedEventObject.bg == 'red'){
								$scope.copiedEventObject.bg = 'rgb(221, 75, 57)'
							}


							//  $scope.copiedEventObject.title = ''
							 if ($scope.copiedEventObject.st_hr < 8 ) {
								 $scope.copiedEventObject.title = $scope.originalEventObject.original +'( '+$scope.copiedEventObject.st_hr+' )'
							 }
							// assign it the date that was reported
							$scope.copiedEventObject.start = date;
							$scope.copiedEventObject.allDay = allDay;
							$scope.copiedEventObject.backgroundColor = $scope.copiedEventObject.bg;
							$scope.copiedEventObject.borderColor = "rgb(255, 255, 255)";
							$scope.copiedEventObject.work_type = $scope.off
							console.log($scope.copiedEventObject);


										 jet.count($scope.user_id).then(function (resp){
			 								console.log(resp);
			 								$scope.copiedEventObject.id = resp.no
											$('#calendar').fullCalendar('renderEvent', $scope.copiedEventObject, true);

											$rootScope.criteria.events.push({
																 wl_id: $scope.copiedEventObject.wl_id,
																 title: $scope.copiedEventObject.title,
																 start: new Date(date),
																 hr: $scope.copiedEventObject.wl_hr,
																 work_type : $scope.off,
																 period:$scope.copiedEventObject.period,
																 backgroundColor: $scope.copiedEventObject.bg,
																 borderColor:"rgb(255, 255, 255)",
																 id : $scope.copiedEventObject.id
														 });
			 	 					 	})


						}
						// render the event on the calendar
						// the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
					}

					if($scope.hur == 1){
					 //checked
					myFunction.dialogHurBox().result.then(function (ok){
						if(ok){
							$http({
								url:'API/DRAF/checkUserStatus.php',
								method:'POST',
								data:{
									'category':$scope.originalEventObject.period,
									'hour':$rootScope.criteria.hour,
								}
							}).then(function (resp){
								$scope.checkUserStatus = resp.data;
								$scope.originalEventObject.wl_id = $scope.checkUserStatus.wl_id
								$scope.originalEventObject.st_hr = $rootScope.criteria.hour
								if($scope.originalEventObject.wl_id != null){
									$scope.draw($scope.originalEventObject)
								}
							})
						}else{
							console.log("close");
						}
					})
				} else {
					$scope.draw($scope.originalEventObject)
				}


				$scope.prepareObj = {old:{},new:{},data:{}}
				// if($scope.add == 1){
				// 		$scope.prepareObj.old = $scope.convertData
				// 		$scope.prepareObj.new = $scope.originalEventObject
				// 		console.log($scope.prepareObj);
				// 		console.log("new=",$scope.originalEventObject);
				// 		console.log("old cover=",$scope.convertData);
				// 		// new
				// 		if($scope.convertData.wl_id == null){
				// 			$scope.draw($scope.originalEventObject)
				// 		} else {
				// 			jet.generateStatus($scope.prepareObj).then(function (works){
				// 				console.log("return = ",$scope.originalEventObject);
				// 				$scope.originalEventObject.st_id = works.wl_id
				// 				$scope.originalEventObject.period = works.wl_category
				// 				$scope.originalEventObject.title = works.wl_name
				// 				$scope.draw($scope.originalEventObject)
				// 			})
				// 		}

					// $scope.draw($scope.originalEventObject)
				// } else if ($scope.edit == 1){
				// 	$scope.draw($scope.originalEventObject)
				// }
	         // we need to copy it, so that multiple events don't have a reference to the same object

	         // is the "remove after drop" checkbox checked?
	         if ($('#drop-remove').is(':checked')) {
	           // if so, remove the element from the "Draggable Events" list
	           $(this).remove();
	         }
	       }
	     });


	$scope.back = function (){
		 window.history.back();
	}


}
