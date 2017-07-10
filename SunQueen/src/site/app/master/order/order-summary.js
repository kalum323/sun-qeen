(function () {
    angular.module("AppModule")
            .factory("calanderFactory", function ($http, systemConfig) {
                var factory = {};
                factory.saveEventDetail = function (summary, callback, errorcallback) {
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
                factory.getAllMonthsData = function (month, year, callback, errorcallback) {
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
                factory.getOnlyMonthsData = function (month, year, callback, errorcallback) {
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
                $scope.model = {};
                $scope.ui = {};
                $scope.model.data = {
                    dateList: []
                };
                $scope.model.saveData = {
                    savelist: []
                };
                $scope.model.searchData = {
                    searchDataList: []
                };
                $scope.events = [];

                $scope.ui.saveEvent = function () {
                    $scope.dt;
                    var year = $filter('date')($scope.dt, 'yyyy');
                    var month = $filter('date')($scope.dt, 'MM');

                    calanderFactory.getOnlyMonthsData(month, year, function (data) {
                        $scope.model.searchData.searchDataList = data;
                        $scope.noOfDateInMonth = $scope.MonthDates(month, year);
                        console.log($scope.noOfDateInMonth);
                        if ($scope.model.searchData.searchDataList.length === 0) {
                            if ($scope.model.data.dateList.length === 0) {
                                console.log("if 2");
                                var date = 0;
                                for (var i = 1; i < $scope.noOfDateInMonth + 1; i++) {
                                    console.log("for loop 1");
                                    var element = {};
                                    element.date = new Date(year, month - 1, i);
                                    element.status = null;
                                    $scope.model.data.dateList.push(element);
                                }
                            } else {
                                console.log("else");
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
                                    $scope.model.saveData.savelist = $scope.model.data.dateList;
                                } else {
                                    Notification.error("sd");
                                }
                            }
                        } else {
                            console.log("else else");
                            var date = $scope.model.searchData.searchDataList[0].date;
                            var listYear = $filter('date')(date, 'yyyy');
                            var listMonth = $filter('date')(date, 'MM');
                            if (year === listYear && month === listMonth) {
                                Notification.success('Update');
                                angular.forEach($scope.model.searchData.searchDataList, function (value, $index) {
                                    if ($filter('date')(value.date, 'yyyy-MM-dd') === $filter('date')($scope.dt, 'yyyy-MM-dd')) {
                                        var object = {
                                            indexNo: null,
                                            date: null,
                                            status: "Workingday"
                                        };
                                        object.status = $scope.model.event.name;
                                        object.date = value.date;
                                        object.indexNo = value.indexNo;
                                        $scope.model.searchData.searchDataList.splice($index, 1);
                                        $scope.model.saveData.savelist.push(object);
                                    }
                                    $scope.events = $scope.model.saveData.savelist;
                                });
                            }
                        }
                    }, function () {
                        console.log("cal data not avalable");
                        console.log("cal data not avalable");
                        console.log("cal data not avalable");
                    });
                };

                $scope.ui.saveDetail = function () {
                    var saveList = $scope.model.saveData.savelist;
                    calanderFactory.saveEventDetail(saveList, function (data) {
                        Notification.success("saveeeeeeeee");
                    }, function () {

                    });
                };

                $scope.ui.getAllMonthsData = function () {
                    $scope.dt;
                    var year = $filter('date')($scope.dt, 'yyyy');
                    var month = $filter('date')($scope.dt, 'MM');
                    calanderFactory.getAllMonthsData(month, year, function (data) {
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

                $scope.ui.getSelectMonthsData = function () {
                    $scope.dt;
                    var year = $filter('date')($scope.dt, 'yyyy');
                    var month = $filter('date')($scope.dt, 'MM');

                    calanderFactory.getOnlyMonthsData(month, year, function (data) {
                        $scope.model.searchData.searchDataList = data;
                        console.log("$scope.model.searchData.searchDataList");
                        console.log($scope.model.searchData.searchDataList);
                    }, function () {

                    });
                };

//---------------------------- calander js function ------------------------------------

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

                $scope.MonthDates = function (month, year) {
                    return /8|3|5|10/.test(--month) ? 30 : month === 1 ? (!(year % 4) && year % 100) || !(year % 400) ? 29 : 28 : 31;
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

                $scope.ui.init = function () {
                    //set ideal mode
                    $scope.ui.mode = "IDEAL";
                    $scope.ui.getAllMonthsData();

                };
                $scope.ui.init();
            });
}());