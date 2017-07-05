(function () {

    angular.module("AppModule")
            .controller("productionController", function ($scope, productionModel, $timeout, Notification) {
                //data models 
                $scope.model = new planingModel();
                //ui models
                $scope.ui = {};

                $scope.ui.new = function () {
                    $scope.ui.mode = "NEW";
                    $timeout(function () {
                        document.querySelectorAll("#text")[0].focus();
                    }, 10);
                };

                $scope.ui.load = function (lineNo, e) {
                    var code = e ? e.keyCode || e.which : 13;
                    if (code === 13) {
                        $scope.model.findByLineNo(lineNo);
                    }
                };
//
//                $scope.ui.save = function () {
//                    $scope.model.savePlans()
//                            .then(function (){
//                                $scope.model.plans= {};
//                                        Notification.success("plan added success;");
//                            },function (){
//                                Notification.error("plan added Fail;");
//                            });
//                };
//
//                $scope.ui.delete = function (indexNo, index) {
//                    $scope.model.deletePlans(indexNo, index);
//                };


                $scope.ui.init = function () {
                    //set ideal mode
                    $scope.ui.mode = "IDEAL";

                };
                $scope.ui.init();
            });
}());