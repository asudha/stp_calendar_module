angular.module('starter.controllers', []).controller('LoginCtrl', ['$scope', '$state', 'CONSTANTS', function($scope, $state, CONSTANTS) {
    $scope.calendarData = {}
    $scope.calendarData.monthFont = CONSTANTS.monthFont;
    $scope.calendarData.monthFontColor = CONSTANTS.monthFontColor;
    $scope.calendarData.monthFontSize = CONSTANTS.monthFontSize;
    $scope.calendarData.dayBackgroundColor = CONSTANTS.dayBackgroundColor;
    $scope.calendarData.dayFont = CONSTANTS.dayFont;
    $scope.calendarData.dayFontColor = CONSTANTS.dayFontColor;
    $scope.calendarData.dayFontSize = CONSTANTS.dayFontSize;
    $scope.calendarData.dateBackgroundColor = CONSTANTS.dateBackgroundColor;
    $scope.calendarData.dateFont = CONSTANTS.dateFont;
    $scope.calendarData.dateFontColor = CONSTANTS.dateFontColor;
    $scope.calendarData.dateFontSize = CONSTANTS.dateFontSize;
    $scope.calendarData.gridBorderColor = CONSTANTS.gridBorderColor;
    $scope.calendarData.homeGameCellColor = CONSTANTS.homeGameCellColor;
    $scope.calendarData.homeGameEventColor = CONSTANTS.homeGameEventColor;
    $scope.calendarData.awayGameCellColor = CONSTANTS.awayGameCellColor;
    $scope.calendarData.awayGameEventColor = CONSTANTS.awayGameEventColor;
    $scope.calendarData.isRssFeed = CONSTANTS.isRssFeed;
    $scope.calendarData.iconStyle = CONSTANTS.iconStyle;
    $scope.calendarData.isFlexibleCellSize = CONSTANTS.isFlexibleCellSize;
    $scope.calendarData.isGoogleCalendarData = CONSTANTS.isGoogleCalendarData;
    $scope.calendarData.pubCalId = CONSTANTS.pubCalId;
    $scope.fontsNames = CONSTANTS.fontsNames;
    $scope.fontsSizes = CONSTANTS.fontsSizes;
    $scope.submitHandler = function() {
        if (window.cordova && cordova.plugins && cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.close();
        }
        CONSTANTS.monthFont = $scope.calendarData.monthFont;
        CONSTANTS.monthFontColor = $scope.calendarData.monthFontColor;
        CONSTANTS.monthFontSize = $scope.calendarData.monthFontSize;
        CONSTANTS.dayBackgroundColor = $scope.calendarData.dayBackgroundColor;
        CONSTANTS.dayFont = $scope.calendarData.dayFont;
        CONSTANTS.dayFontColor = $scope.calendarData.dayFontColor;
        CONSTANTS.dayFontSize = $scope.calendarData.dayFontSize;
        CONSTANTS.dateBackgroundColor = $scope.calendarData.dateBackgroundColor;
        CONSTANTS.dateFont = $scope.calendarData.dateFont;
        CONSTANTS.dateFontColor = $scope.calendarData.dateFontColor;
        CONSTANTS.dateFontSize = $scope.calendarData.dateFontSize;
        CONSTANTS.gridBorderColor = $scope.calendarData.gridBorderColor;
        CONSTANTS.homeGameCellColor = $scope.calendarData.homeGameCellColor;
        CONSTANTS.homeGameEventColor = $scope.calendarData.homeGameEventColor;
        CONSTANTS.awayGameCellColor = $scope.calendarData.awayGameCellColor;
        CONSTANTS.awayGameEventColor = $scope.calendarData.awayGameEventColor;
        CONSTANTS.isRssFeed = $scope.calendarData.isRssFeed;
        CONSTANTS.iconStyle = $scope.calendarData.iconStyle;
        CONSTANTS.isFlexibleCellSize = $scope.calendarData.isFlexibleCellSize;
        CONSTANTS.isGoogleCalendarData = $scope.calendarData.isGoogleCalendarData;
        CONSTANTS.pubCalId = $scope.calendarData.pubCalId;
        $state.go('iomCalendar');
    };
    $scope.$watch('calendarData.monthFontSize', function(newValue, oldValue) {
        if (newValue != oldValue) {
            $("#gridBackgroundColor").css("background-color", "#" + newValue);
        }
    }, true);

    $scope.rssFeedValueChange = function(){
      $scope.calendarData.isGoogleCalendarData = !$scope.calendarData.isRssFeed;
    }
    $scope.googleCalendarFeedValueChange = function(){
      $scope.calendarData.isRssFeed = !$scope.calendarData.isGoogleCalendarData;
    }
    $scopeisRSSFeedShown = function(){
      return $scope.calendarData.isRssFeed;
    }
    $isGoogleCalendarFeedShown = function(){
      return $scope.calendarData.isGoogleCalendarData;
    }
}]).controller('IomCalendarCtrl', ['$scope', 'CONSTANTS', 'dataService', '$ionicModal', "$state", function($scope, CONSTANTS, dataService, $ionicModal, $state) {
    var eventsArray = [];
    $scope.homeColor = CONSTANTS.homeGameCellColor;
    $scope.awayColor = CONSTANTS.awayGameCellColor;
    $scope.selectedEvent = null;
    $scope.calendarGoBack = function() {
        $state.go("login");
    }

    function getEventDate(event) {
        var dateobj = event.start;
        var date = dateobj.get("year") + '-' + ((dateobj.get("month") < 9) ? ("0" + (dateobj.get("month") + 1)) : ((dateobj.get("month") + 1))) + '-' + ((dateobj.get("date") < 10) ? ("0" + dateobj.get("date")) : (dateobj.get("date")));
        return date;
    }
    $('#gCalendar').fullCalendar({
        contentHeight: "auto",
        height: "auto",
        fixedWeekCount: false,
        handleWindowResize: true,
        header: {
            //left: 'prev,next', //left: 'prev',       // key to move view previous month -- e.g april <- may
            //right: 'month,basicWeek', //basicDay',     //'next',   // key to move view next month -- e.g april -> may
            left: 'prev',
            right: 'next',
            center: 'title' // view month name -- e.g april 2015
        },
        theme: false, // set to true if you want to use customizable themes and not the default theme of full calendar .. refer to : http://fullcalendar.io/docs/display/theme/
        views: {
            agenda: {
                //eventLimit:0
                //eventLimit: (!CONSTANTS.isGoogleCalendarData)?((CONSTANTS.iconStyle == "Style_1")?0:(CONSTANTS.iconStyle == "Style_2")?1:2)):0 // limits event to 3 on a specific day in the calendar UI --   refer to : http://fullcalendar.io/docs/display/eventLimit/
            }
        },
        themeButtonIcons: { // left, right arrow icons for the month selection
            prev: 'left-arrow',
            next: 'right-arrow'
        },
        //eventLimit: (CONSTANTS.isFlexibleCellSize) ? 0 : 2,
        //eventLimit: (CONSTANTS.isFlexibleCellSize) ? 0 : 1,
        eventLimit: (!CONSTANTS.isGoogleCalendarData) ? ((CONSTANTS.iconStyle == "Style_1") ? 1 : (CONSTANTS.iconStyle == "Style_2") ? 2 : 0) : ((CONSTANTS.isFlexibleCellSize) ? 0 : 1),
        //eventLimit: 1,
        selectable: true,
        selectable: true,
        selectHelper: true,
        timezone: 'local',
        eventRender: function(event, element) {
            //var dataToFind = moment(event.start).format('YYYY-MM-DD');
            //$("td[data-date='" + dataToFind + "']").addClass('activeDay');
            //element.css("background-color", "#" + CONSTANTS.eventColor);
            if (event.isHomeGame) {
                $('.fc-day[data-date="' + getEventDate(event) + '"]').css("background-color", CONSTANTS.homeGameCellColor);
            } else {
                $('.fc-day[data-date="' + getEventDate(event) + '"]').css("background-color", CONSTANTS.awayGameCellColor);
            }
            //element.attr("href", "");
            /*$(element).html("");
            $(element).children().empty();*/
            if (event.imageUrl) {
                element.context.innerHTML = "";
                element.css("background-image", "url(" + event.imageUrl + ")");
                if (event.multipleEvents) {
                    if (element.hasClass("calanderThumbImage")) {
                        element.removeClass("calanderThumbImage");
                    }
                    if (event.eventOrder == 1) {
                        element.addClass("calanderThumbImage_one");
                    } else if (event.eventOrder == 2) {
                        element.addClass("calanderThumbImage_two");
                    } else if (event.eventOrder == 3) {
                        element.addClass("calanderThumbImage_three");
                    }
                } else {
                    if (element.hasClass("calanderThumbImage_one")) {
                        element.removeClass("calanderThumbImage_one");
                    }
                    if (element.hasClass("calanderThumbImage_two")) {
                        element.removeClass("calanderThumbImage_two");
                    }
                    if (element.hasClass("calanderThumbImage_three")) {
                        element.removeClass("calanderThumbImage_three");
                    }
                    element.addClass("calanderThumbImage");
                }
            } else if (CONSTANTS.isGoogleCalendarData) {
                element.css("background-color", CONSTANTS.awayGameEventColor);
            }
        },
        eventAfterAllRender: function() {
            $(".fc td, .fc th").css('border-color', CONSTANTS.gridBorderColor)
            $(".fc-toolbar .fc-center h2").css('font-family', CONSTANTS.monthFont);
            $(".fc-toolbar .fc-center h2").css('color', CONSTANTS.monthFontColor);
            $(".fc-toolbar .fc-center h2").css('font-size', CONSTANTS.monthFontSize);
            $(".fc-view-container .fc-head th").css('background-color', CONSTANTS.dayBackgroundColor);
            $(".fc-view-container .fc-head th").css('font-family', CONSTANTS.dayFont);
            $(".fc-view-container .fc-head th").css('color', CONSTANTS.dayFontColor);
            $(".fc-view-container .fc-head th").css('font-size', CONSTANTS.dayFontSize);
            // $(".fc-ltr .fc-basic-view .fc-day-number").css('background-color', CONSTANTS.dateBackgroundColor);
            $(".fc-ltr .fc-basic-view .fc-day-number").css('font-family', CONSTANTS.dateFont);
            $(".fc-ltr .fc-basic-view .fc-day-number").css('color', CONSTANTS.dateFontColor);
            $(".fc-ltr .fc-basic-view .fc-day-number").css('font-size', CONSTANTS.dateFontSize);
        },
        dayRender: function(date, cell) {
            cell.css("background-color", CONSTANTS.dateBackgroundColor);
        },
        dayMouseover: function(date, jsEvent, view) {
            /* alert('Clicked on: ' + date.format());

                        alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);

                        alert('Current view: ' + view.name);
*/
            // change the day's background color just for fun
            $(this).css('background-color', 'red');
        },
        dayClick: function(date, jsEvent, view, resourceObj) {
            alert('Date: ' + date.format());
        },
        googleCalendarApiKey: (CONSTANTS.isGoogleCalendarData) ? (CONSTANTS.gcApiKey) : "",
        events: (CONSTANTS.isGoogleCalendarData) ? (CONSTANTS.pubCalId + "@group.calendar.google.com") : function(start, end, timezone, callback) {
            //dataService.getCalendarData("https://gcvr.io-media.com/fc/data.json", callback, "");
            //dataService.getCalendarData("http://stp-demo-02.io-research.com/api/schedule", callback, "");
            dataService.getCalendarData("lib/data.json", callback, "");
        },
        // US Holidays
        //events: CONSTANTS.pubCalId,
        /*eventColor: CONSTANTS.gridColor,*/
        /*eventBackgroundColor: '#3b91ad',*/
        /* eventColor: '#3b91ad',*/
        /*color: '#3b91ad',   // an option!*/
        /* textColor: 'yellow', // an option!*/
        eventClick: function(event) {
            // opens events in a popup window
            //window.open(event.url, 'gcalevent', 'width=700,height=600');
            //return false;
            // console.log(event);
            $scope.selectedEvents = [event];
            showEventPopup();
        },
        eventLimitClick: function(cellInfo, jsEvent) {
            $scope.selectedEvents = dataService.getCalendarListEvents(moment(cellInfo.date).unix() * 1000);
            showEventPopup();
            console.log(cellInfo.date);
        },
        select: function(start, end) {
            //var title = prompt('Event Title:');
            var eventData;
            //if (title) {
            eventData = {
                // title: title,
                start: start,
                end: end
            };
            $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
            //}
            $('#calendar').fullCalendar('unselect');
            console.log("start date ", start);
        },
        loading: function(bool) {
                //$('#loading').toggle(bool);
                //alert(bool);
            }
            /*,
                            dayClick: function(date, jsEvent, view) {
                                    alert('Clicked on: ' + date.format());
                                    alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
                                    alert('Current view: ' + view.name);
                                    // change the day's background color just for fun
                                    $(this).css('background-color', 'red');
                            }*/
    });

    function hideMore() {
        if ($(".fc-more").html()) {
            $(".fc-more").html($(".fc-more").html().split(" ")[0])
        }
    }

    function showEventPopup() {
        $ionicModal.fromTemplateUrl('templates/calendarEventDetailsPopUp.html', function(_modal) {
            $scope.calenderEventDetailsPopUpModal = _modal;
            $scope.calenderEventDetailsPopUpModal.show();
        }, {
            scope: $scope,
            animation: 'slide-in-up',
            hardwareBackButtonClose: true
        });
    }
    $scope.closeCalendarEventDetailsPopUp = function() {
        $scope.calenderEventDetailsPopUpModal.remove();
    }
    $scope.isCalendarViewActivated = true;
    $scope.isListViewActivated = false;
    $scope.listViewData = null;
    $scope.monthClickHandler = function() {
        $scope.isCalendarViewActivated = true;
        $scope.isListViewActivated = false;
        if ($("#listClick").hasClass("active-view")) {
            $("#listClick").removeClass("active-view")
        }
        $("#monthClick").addClass("active-view");
    }
    $scope.listClickHandler = function() {
        $scope.isListViewActivated = true;
        $scope.isCalendarViewActivated = false;
        $scope.listViewData = dataService.getCalendarListEvents("all");
        if ($("#monthClick").hasClass("active-view")) {
            $("#monthClick").removeClass("active-view")
        }
        $("#listClick").addClass("active-view");
    }
}]).controller('CalendarEventDetailsPopUpController', ['$scope', '$state', 'CONSTANTS', function($scope, $state, CONSTANTS) {
    $scope.events = $scope.selectedEvents;
    $scope.calendarEventDetailsGoBack = function() {
        $scope.closeCalendarEventDetailsPopUp();
    }
}]).constant('CONSTANTS', {
    monthFont: "Arial Bold",
    monthFontColor: "#aa11ff",
    monthFontSize: 10,
    dayBackgroundColor: "#123456",
    dayFont: "Arial Bold",
    dayFontColor: "#aa11ff",
    dayFontSize: 10,
    dateBackgroundColor: "#123456",
    dateFont: "Arial Bold",
    dateFontColor: "#aa11ff",
    dateFontSize: 10,
    gridBorderColor: '#dddddd',
    homeGameCellColor: '#11c1f3',
    homeGameEventColor: '#d9704a',
    awayGameCellColor: '#d9704a',
    awayGameEventColor: '#11c1f3',
    isFlexibleCellSize: false,
    isGoogleCalendarData: false,
    iconStyle: "Style_1",
    isRssFeed:true,
    pubCalId: 'b0rqjogof4sibclm8cul5itsjs',
    gcApiKey: 'AIzaSyC8gxu5eEtOBjfkwcNy2QRvA0wVOpFDNd0',
    fontsNames: ["Arial", "TimesNewRoman", "Arial Bold", "Oswald"],
    fontsSizes: [10, 11, 12, 14, 18, 20, 22],
}).factory("dataService", ['$http', function($http) {
    var dataServices = {};
    var serviceData = null;
    var teamsObj = null;
    var eventsLists = null;
    var eventsInDays = null;

    function createTeamById() {
        teamsObj = {};
        serviceData.teams.forEach(function(element, index, array) {
            teamsObj[element.team_id] = array[index];
        })
    }

    function createEventByDay() {
        serviceData.schedule.sort(function(a, b) {
            if (a.timestamp > b.timestamp) {
                return 1;
            }
            if (a.timestamp < b.timestamp) {
                return -1;
            }
            return 0;
        });
        serviceData.schedule.forEach(function(element, index, array) {
            if ((index > 0) && (element.day == array[index - 1].day)) {
                serviceData.schedule[index].multipleEvents = true;
                if (!serviceData.schedule[index - 1].multipleEvents) {
                    serviceData.schedule[index - 1].multipleEvents = true;
                }
                serviceData.schedule[index].eventOrder = serviceData.schedule[index - 1].eventOrder + 1;
            } else {
                serviceData.schedule[index].eventOrder = 1;
                serviceData.schedule[index].multipleEvents = false;
            }
        })
    }
    dataServices.getCalendarData = function(pURL, onSuccessCallback, onErrorCallback) {
        $http({
            method: 'GET',
            /* headers: {
                 'Content-Type': 'application/x-www-form-urlencoded',
                 'Access-Control-Allow-Origin': '*'
             },*/
            url: pURL
        }).success(function(doc) {
            serviceData = doc;
            createTeamById();
            createEventByDay();
            var events = [];
            if (doc && doc.schedule) {
                doc.schedule.forEach(function(element, index, array) {
                    //getById(element.away_player_id)
                    events.push({
                        title: element.stadium,
                        start: moment(Number(element.timestamp) * 1000), // will be parsed
                        //imageUrl: (element.away_player_id ? ((serviceData.logo_url+ teamsObj[element.away_player_id].mobile_logo) ? element.other_team.calendar_logo : null) : null),
                        imageUrl: serviceData.logo_url + teamsObj[element.away_player_id].mobile_logo,
                        home_player_overlay_logo: serviceData.logo_url + teamsObj[element.home_player_id].overlay_logo,
                        away_player_overlay_logo: serviceData.logo_url + teamsObj[element.away_player_id].overlay_logo,
                        day: element.day,
                        time: element.time,
                        game_type: element.game_type,
                        isHomeGame: element.home_game,
                        sameDayEvents: null,
                        eventOrder: element.eventOrder,
                        multipleEvents: element.multipleEvents
                    });
                })
            }
            if (onSuccessCallback) {
                onSuccessCallback(events)
            };
        }).error(function(resp, status, headers, config) {
            if (onErrorCallback) {
                onErrorCallback(resp, status, headers, config);
            }
        });
    };
    dataServices.getCalendarListEvents = function(pTimestamp) {
        eventsLists = [];
        if (pTimestamp === "all") {
            serviceData.schedule.forEach(function(element, index, array) {
                eventsLists.push({
                    "day": element.day,
                    "time": element.time,
                    "timestamp": element.timestamp,
                    "game_type": element.game_type,
                    "isHomeGame": element.home_game,
                    "home_player_id": element.home_player_id,
                    "away_player_id": element.away_player_id,
                    "home_player_name": teamsObj[element.home_player_id].team_name,
                    "away_player_name": teamsObj[element.away_player_id].team_name,
                    "home_player_overlay_logo": serviceData.logo_url + teamsObj[element.home_player_id].overlay_logo,
                    "away_player_overlay_logo": serviceData.logo_url + teamsObj[element.away_player_id].overlay_logo,
                    "title": element.stadium,
                    "result": element.result,
                    "home_team_score": element.home_team_score,
                    "other_team_score": element.other_team_score,
                    "description": "There is no other extra information available in the RSS feed. Do we really need this detail?" //TODO: JVI- Needs to update 
                })
            });
        } else {
            serviceData.schedule.forEach(function(element, index, array) {
                //moment(1449340200000).isSame((1449424800*1000), "day")
                if ((moment(pTimestamp).isSame(element.timestamp * 1000, "day")) && (moment(pTimestamp).isSame(element.timestamp * 1000, "month")) && (moment(pTimestamp).isSame(element.timestamp * 1000, "year"))) {
                    eventsLists.push({
                        "day": element.day,
                        "time": element.time,
                        "timestamp": element.timestamp,
                        "game_type": element.game_type,
                        "isHomeGame": element.home_game,
                        "home_player_id": element.home_player_id,
                        "away_player_id": element.away_player_id,
                        "home_player_name": teamsObj[element.home_player_id].team_name,
                        "away_player_name": teamsObj[element.away_player_id].team_name,
                        "home_player_overlay_logo": serviceData.logo_url + teamsObj[element.home_player_id].overlay_logo,
                        "away_player_overlay_logo": serviceData.logo_url + teamsObj[element.away_player_id].overlay_logo,
                        "title": element.stadium,
                        "result": element.result,
                        "home_team_score": element.home_team_score,
                        "other_team_score": element.other_team_score,
                        "description": "There is no other extra information available in the RSS feed. Do we really need this detail?" //TODO: JVI- Needs to update 
                    })
                }
            });
        }
        return eventsLists;
    }
    return dataServices;
}]);