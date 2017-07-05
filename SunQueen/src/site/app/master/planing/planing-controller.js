(function () {

    angular.module("AppModule")
            .controller("planingController", function ($scope, planingModel, $timeout, Notification) {
                //data models 
                $scope.model = new planingModel();
                //ui models
                $scope.ui = {};

                $scope.ui.selectOrder = function (detail) {
                    $scope.model.orderDetailList = detail.orderDetail;

                };
                $scope.ui.selectDetail = function (detail) {
                    $scope.model.temp.poNo = detail.poNo;
                    $scope.model.plans.orderDetail = detail.indexNo;
                     $scope.ui.new();
                };

                $scope.ui.setEndDate = function (model,e) {
                    var code = e ? e.keyCode || e.which : 13;
                    if (code === 13) {
                        console.log(model);
                    }
                };

                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";
                    $timeout(function () {
                        document.querySelectorAll("#text")[0].focus();
                    }, 10);
                };

                $scope.ui.load = function (orderNo, e) {
                    var code = e ? e.keyCode || e.which : 13;
                    if (code === 13) {
                        $scope.model.findByOrderNo(orderNo);
                    }
                };

                $scope.ui.save = function () {
                    $scope.model.savePlans()
                            .then(function (){
                                $scope.model.plans= {};
                                        Notification.success("plan added success;");
                            },function (){
                                Notification.error("plan added Fail;");
                            });
                };

                $scope.ui.delete = function (indexNo, index) {
                    $scope.model.deletePlans(indexNo, index);
                };


                $scope.ui.init = function () {
                    //set ideal mode
                    $scope.ui.mode = "IDEAL";

                };
                $scope.ui.init();
            });
}());