angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/swop/:year_id/:month_id',{templateUrl: _.toHttpGetUrl('content/swop/calendar.html'),controller: SwopCtrl});
} ]);

function SwopCtrl($rootScope, $scope, $http, $compile,$routeParams, $timeout, $filter, $location, $log, $route,$modal,myFunction,uiCalendarConfig, jet, work) {
	$log.info('Enter SwopCtrl');
	$(document.body).addClass('sidebar-collapse');

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
			 $('#calendarFirst').fullCalendar(
				 {
	       header: {
	          left: false,
	         center: false,
	         right: 'title'
	       },
				 events: function(start, end, timezone, callback) {
					 $rootScope.criteria.events = [
						 {
							 title: 'test st',
							 start: new Date(),
							 editable: true
						 }
					 ];
					 	callback($rootScope.criteria.events);
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

	       editable: true,
				 eventDrop: function(event, delta, revertFunc) {
           console.log(event);
	    },

			eventRender : function (event, element, view){

			},
	       droppable: true, // this allows things to be dropped onto the calendar !!!
	       drop: function (date, allDay) { // this function is called when something is dropped
           console.log(date);

				$scope.prepareObj = {old:{},new:{},data:{}}

	         // we need to copy it, so that multiple events don't have a reference to the same object

	         // is the "remove after drop" checkbox checked?
	         if ($('#drop-remove').is(':checked')) {
	           // if so, remove the element from the "Draggable Events" list
	           $(this).remove();
	         }
	       }
	     });



       $('#calendarSecond').fullCalendar(
				 {
	       header: {
	          left: false,
	         center: false,
	         right: 'title'
	       },
				 events: function(start, end, timezone, callback) {
					 $rootScope.criteria.eventsS = [
						 {
							 title: 'testSec',
							 start: new Date(),
							 editable: true
						 }
					 ];
					 	callback($rootScope.criteria.eventsS);
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

	       editable: true,
				 eventDrop: function(event, delta, revertFunc) {
           console.log(event);
	    },

			eventRender : function (event, element, view){

			},
	       droppable: true, // this allows things to be dropped onto the calendar !!!
	       drop: function (date, allDay) { // this function is called when something is dropped
           console.log(date);

				$scope.prepareObj = {old:{},new:{},data:{}}

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
