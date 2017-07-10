(function () {
    angular.module("orderModule", ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ui-notification']);

    //http factory
    angular.module("orderModule")
            .factory("orderFactory", function ($http, systemConfig) {
                var factory = {};

                factory.findAllOrders = function (callback) {
                    var url = systemConfig.apiUrl + "/api/sun-queen/master/order/find-all-order";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, states, headers) {

                            });
                };
                factory.findByOrderNo = function (order, callback) {
                    var url = systemConfig.apiUrl + "/api/sun-queen/master/order/find-By-orderNo/" + order;
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, states, headers) {

                            });
                };

                factory.saveOrder = function (summary, callback, errorcallback) {
                    var url = systemConfig.apiUrl + "/api/sun-queen/master/order/save-order";
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

                factory.deleteOrder = function (indexNo, callback) {
                    var url = systemConfig.apiUrl + "/api/sun-queen/master/order/delete-order/" + indexNo;
                    $http.delete(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, states, headers) {

                            });
                };

                return factory;
            });


    angular.module("orderModule")
            .controller("orderController", function ($scope, customerfactory, orderFactory, Notification, $timeout, $filter) {
                //data models 
                $scope.model = {};
                //ui models
                $scope.ui = {};
                //http models
                $scope.http = {};

                $scope.model.customerList = [];

                $scope.model.order = {
                    "indexNo": null,
                    "orderNo": null,
                    "date": null,
                    "style": null,
                    "brand": null,
                    "qty": null,
                    "status": null,
                    "customer": null,
                    "transactionNo": null,
                    "orderDetail": []
                };

                $scope.model.temp = {
                    "indexNo": null,
                    "poNo": null,
                    "colour": null,
                    "size": null,
                    "line": null,
                    "orderQty": 0,
                    "deliverQty": 0,
                    "productQty": 0,
                    "balanceQty": 0
                };

                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";
                    $timeout(function () {
                        document.querySelectorAll("#pono")[0].focus();
                    }, 10);
                };

                $scope.ui.addDetail = function () {
                    $scope.model.order.orderDetail.push($scope.model.temp);
                    $scope.model.temp = {};
                };

                $scope.ui.edit = function (data, $index) {
                    $scope.model.temp = {};
                    $scope.model.temp = data;
                    $scope.model.order.orderDetail.splice($index, 1);
                };

                $scope.ui.load = function (orderNo, e) {
                    var code = e ? e.keyCode || e.which : 13;
                    if (code === 13) {
                        $scope.http.findByOrderNo(orderNo);
                    }
                };

                $scope.http.findByOrderNo = function (no) {
                    orderFactory.findByOrderNo(no, function (data) {
                        $scope.model.order = data;
                    }, function (data) {
                        Notification.error(data.message);
                    });

                };

                $scope.ui.save = function () {
                    $scope.http.saveOrder();
                };

                $scope.ui.delete = function (indexNo, $index) {
                    $scope.http.deleteOrder(indexNo, $index);
                };

                $scope.http.clearModel = function () {
                    $scope.model.order = null;
                };

                $scope.http.deleteOrder = function (indexNo, $index) {
                    orderFactory.deleteOrder(indexNo, function () {
                        Notification.success("Order Delete success !!!");
                        $scope.model.order.orderDetail.splice($index, 1);
                    }, function (data) {
                        Notification.error(data.message);
                    });

                };

                $scope.http.saveOrder = function () {
                    var detail = $scope.model.order;
                    console.log(detail);
                    var detailJSON = JSON.stringify(detail);
                    orderFactory.saveOrder(detailJSON, function (data) {
                        Notification.success("Order Added success !!!");
                        var dates = data.date;
                        data.date = $filter('date')(dates, 'yyyy-MM-dd');
                        $scope.model.orderList.push(data);
                        $scope.http.clearModel();
                    }, function (data) {
                        Notification.error(data.message);
                    });

                };

                $scope.model.customerLable = function (indexNo) {
                    var customer;
                    angular.forEach($scope.model.customerList, function (value) {
                        if (value.indexNo === parseInt(indexNo)) {
                            customer = value.indexNo + ' - ' + value.name;
                            return;
                        }
                    });
                    return customer;
                };

                $scope.ui.init = function () {
                    //set ideal mode
                    $scope.ui.mode = "IDEAL";
                    orderFactory.findAllOrders(function (data) {
                        $scope.model.orderList = data;

                    });
                    customerfactory.findAllCustomer(function (data) {
                        $scope.model.customerList = data;
                    });
                };

                $scope.ui.init();

            });
}());