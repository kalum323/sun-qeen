(function () {
    angular.module("customerModule", ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ui-notification']);

    //http factory
    angular.module("customerModule")
            .factory("customerfactory", function ($http, systemConfig) {
                var factory = {};

                factory.findAllCustomer = function (callback) {
                    var url = systemConfig.apiUrl + "/api/sun-queen/master/customer/find-all-customer";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, states, headers) {

                            });
                };

                factory.saveCustomer = function (summary, callback, errorcallback) {
                    var url = systemConfig.apiUrl + "/api/sun-queen/master/customer/save-customer";
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

                factory.deleteCustomer = function (indexNo, callback) {
                    var url = systemConfig.apiUrl + "/api/sun-queen/master/customer/delete-customer/" + indexNo;
                    $http.delete(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, states, headers) {

                            });
                };

                return factory;
            });


    angular.module("customerModule")
            .controller("customerController", function ($scope, customerfactory, Notification, $timeout) {
                //data models 
                $scope.model = {};

                $scope.model.customer = {};

                //ui models
                $scope.ui = {};

                $scope.model.customerList = [];
                //http models
                $scope.http = {};

                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";
                    $timeout(function () {
                        document.querySelectorAll("#name")[0].focus();
                    }, 10);
                };

                $scope.ui.save = function () {
                    $scope.http.saveCustomer();
                };
                $scope.ui.delete = function (indexNo,index) {
                    $scope.http.deleteCustomer(indexNo,index);
                };

                $scope.http.clearModel = function () {
                    $scope.model.cutomer = null;
                };

                $scope.http.deleteCustomer = function (indexNo,index) {
                    customerfactory.deleteCustomer(indexNo, function () {
                        Notification.success("Customer Delete success !!!");
                        $scope.model.customerList.splice(index, 1);
                    }, function (data) {
                        Notification.error(data.message);
                    });

                };

                $scope.http.saveCustomer = function () {
                    var detail = $scope.model.customer;
                    var detailJSON = JSON.stringify(detail);
                    customerfactory.saveCustomer(detailJSON, function (data) {
                        Notification.success("Customer Added success !!!");
                        $scope.model.customerList.push(data);
                        $scope.http.clearModel();
                    }, function (data) {
                        Notification.error(data.message);
                    });

                };

                $scope.ui.init = function () {
                    //set ideal mode
                    $scope.ui.mode = "IDEAL";
                    customerfactory.findAllCustomer(function (data) {
                        $scope.model.customerList = data;
                    });
                };

                $scope.ui.init();

            });
}());