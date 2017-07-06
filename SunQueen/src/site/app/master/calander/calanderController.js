(function () {
    angular.module("AppModule")
            .factory("calanderFactory", function ($http, systemConfig) {
                var factory = {};
                factory.saveEvent = function (summary, callback, errorcallback) {
                    var url = systemConfig.apiUrl + "/api/sun-queen/master/calander/save-events";
                    $http.post(url, summary)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {
                                if (errorcallback) {
                                    errorcallback(data);
                                }
                            });
                };
                factory.getMonthsDates = function (month, year, callback, errorcallback) {
                    var url = systemConfig.apiUrl + "/api/sun-queen/master/calander/find-by-month-and-year/" + month + "/" + year;
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {
                                if (errorcallback) {
                                    errorcallback(data);
                                }
                            });
                };
                factory.getMonthsDatas = function (month, year, callback, errorcallback) {
                    var url = systemConfig.apiUrl + "/api/sun-queen/master/calander/find-by-month-and-year-data/" + month + "/" + year;
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {
                                if (errorcallback) {
                                    errorcallback(data);
                                }
                            });
                };
                return factory;
            });

    angular.module("AppModule")
            .controller("calanderController", function ($scope, calanderFactory, $filter, Notification) {

                $scope.uimode = {};
                $scope.model = {};
                $scope.model.event = {};
                $scope.events = [];
                $scope.model.data = {
                    dateList: []
                };
                $scope.model.searchData = {
                    dateList: []
                };

                $scope.uimode.getMonthsDates = function () {
                    $scope.dt;
                    var year = $filter('date')($scope.dt, 'yyyy');
                    var month = $filter('date')($scope.dt, 'MM');
                    calanderFactory.getMonthsDates(month, year, function (data) {
                        angular.forEach(data, function (value) {
                            var object = {
                                date: null,
                                status: null
                            };
                            object.date = $filter('date')(value.date, 'yyyy-MM-dd');
                            object.status = value.status;

                            $scope.events.push(object);
                            //set currnt month
                            $scope.dt = new Date();
                        });
                        console.log($scope.events);
                    }, function (data) {
                        Notification.error(data.message);
                    });
                };

                $scope.noOfDateInMonth;
                $scope.uimode.save = function () {
                    $scope.dt;
                    var year = $filter('date')($scope.dt, 'yyyy');
                    var month = $filter('date')($scope.dt, 'MM');

                    $scope.noOfDateInMonth = $scope.MonthDates(month, year);
                    console.log($scope.noOfDateInMonth);
                    if ($scope.model.data.dateList.length === 0) {
                        var date = 0;
                        for (var i = 1; i < $scope.noOfDateInMonth + 1; i++) {
                            var element = {};
                            element.date = new Date(year, month - 1, i);
                            element.status = null;
                            $scope.model.data.dateList.push(element);
                        }
                    } else {
                        $scope.dt;
                        var date = $scope.model.data.dateList[0].date;
                        var listYear = $filter('date')(date, 'yyyy');
                        var listMonth = $filter('date')(date, 'MM');
                        if (year === listYear && month === listMonth) {
                            Notification.success('Update');
                            angular.forEach($scope.model.data.dateList, function (value, $index) {
                                if ($filter('date')(value.date, 'yyyy-MM-dd') === $filter('date')($scope.dt, 'yyyy-MM-dd')) {
                                    value.status = $scope.model.event.name;
                                    $scope.model.data.dateList.splice($index, 1);
                                    $scope.model.data.dateList.push(value);
                                }
                            });

                            $scope.events = $scope.model.data.dateList;

                        } else {
                            Notification.error("sd");
                        }
                    }


                };

//                $scope.serachAvalableDateInList = function () {
//                    $scope.dt;
//                    var year = $filter('date')($scope.dt, 'yyyy');
//                    var month = $filter('date')($scope.dt, 'MM');
//
//                    calanderFactory.getMonthsDatas(year, month, function (data) {
//                        $scope.model.searchData.list = data;
//                    }, function () {
//
//                    });
//
//                };

//
//                $scope.uimode.saves = function () {
//                    $scope.dt;
//                    var year = $filter('date')($scope.dt, 'yyyy');
//                    var month = $filter('date')($scope.dt, 'MM');
//
//                    $scope.noOfDateInMonth = $scope.MonthDates(month, year);
//                    console.log($scope.noOfDateInMonth);
//                    if ($scope.model.searchData.dateList.length === 0) {
//                        var date = 0;
//                        for (var i = 1; i < $scope.noOfDateInMonth + 1; i++) {
//                            var element = {};
//                            element.date = new Date(year, month - 1, i);
//                            element.status = null;
//                            $scope.model.data.dateList.push(element);
//                        }
//                    } else {
//                        angular.forEach($scope.model.searchData.dateList, function (searchDataValue) {
////                            value.date = $scope.model.data.dateList
//                            angular.forEach($scope.model.data.dateList, function (dataValue) {
//                                if (searchDataValue.date.equals(dataValue.date)) {
//                                    searchDataValue.status = dataValue.status;
//                                }
//                                
//                            });
//                        });
//                    }
//                };

                $scope.uimode.saveAllDetail = function () {
                    var eventsList = $scope.model.data.dateList;
                    calanderFactory.saveEvent(JSON.stringify(eventsList), function (data) {
//                            $scope.events = $scope.model.data.dateList;
                        angular.forEach(data, function (value) {
                            var object = {
                                date: null,
                                status: null
                            };
                            object.date = $filter('date')(value.date, 'yyyy-MM-dd');
                            object.status = value.status;

                            $scope.events.push(object);
                            //set currnt month
                            $scope.dt = object.date;
                        });
                        Notification.success("date save  success !!!");
                    }, function (data) {
                        Notification.error(data.message);
                    });
                };

                $scope.today = function () {
                    $scope.dt = new Date();
                };

                $scope.today();

                $scope.clear = function () {
                    $scope.dt = null;
                };

                $scope.options = {
                    customClass: getDayClass,
                    minDate: new Date(),
                    showWeeks: false
                };

                // Disable weekend selection
                function disabled(data) {
                    var date = data.date,
                            mode = data.mode;
                    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
                }

                $scope.toggleMin = function () {
                    $scope.options.minDate = $scope.options.minDate ? null : new Date();
                };

                $scope.toggleMin();

                $scope.setDate = function (year, month, day) {
                    $scope.dt = new Date(year, month, day);
                };



//                var current = new Date();
//                current.setDate(current.getDate() + 1);
//                var afterTomorrow = new Date(current);
//                afterTomorrow.setDate(current.getDate() + 1);
//
//                console.log("Year " + new Date("2017-01-20").getYear());
//                console.log("Month " + new Date("2017-01-20").getMonth() + 1);
//                console.log($scope.dt.getMonth() + 1);
//                console.log($scope.dt.getYear());
//                console.log($filter('date')(new Date(), 'yyyy'));

                $scope.MonthDates = function (month, year) {
                    return /8|3|5|10/.test(--month) ? 30 : month === 1 ? (!(year % 4) && year % 100) || !(year % 400) ? 29 : 28 : 31;
//                      months in JavaScript start at 0 so decrement by 1 e.g. 11 = Dec
//                    --m;
//                    console.log(m);
//                    console.log("month");
//                    console.log(y);
//                    console.log("year");
//
//                    // if month is Sept, Apr, Jun, Nov return 30 days
//                    if (/8|3|5|10/.test(m))
//                        return 30;
//
//                    // if month is not Feb return 31 days
//                    if (m !== 1)
//                        return 31;
//
//                    // To get this far month must be Feb ( 1 )
//                    // if the year is a leap year then Feb has 29 days
//                    if ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0)
//                        return 29;
//
//                    // Not a leap year. Feb has 28 days.
//                    return 28;
                };


                function getDayClass(data) {
                    var date = data.date,
                            mode = data.mode;
                    if (mode === 'day') {
                        var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                        for (var i = 0; i < $scope.events.length; i++) {
                            var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);
                            if (dayToCheck === currentDay) {
                                return $scope.events[i].status;
                            }
                        }
                    }

                    return '';
                }

                //data models 
//                $scope.model = new planingModel();
                //ui models
                $scope.ui = {};

                $scope.ui.init = function () {
                    //set ideal mode
                    $scope.ui.mode = "IDEAL";
                    $scope.uimode.getMonthsDates();

                };
                $scope.ui.init();
            });
}());