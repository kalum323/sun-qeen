(function () {
    var factory = function ($q, planingService, planingModelFactory) {
        function PlaningModel() {
            this.constructor();
        }

        PlaningModel.prototype = {
            plans : {},
            temp : {},
            plansList : [],
            orderList: [],
            orderDetailList: [],
            
            constructor: function () {
                var that = this;
                this.plans = planingModelFactory.planingData();
                this.temp = planingModelFactory.tempData();
                planingService.findAllPlans()
                        .success(function (data) {
                            that.plansList = data;
                        });
                planingService.findAllOrders()
                        .success(function (data) {
                            that.orderList = data;
                        });
            },
            clearModel: function () {

            },
            deletePlans: function (indexNo, index) {
                var that = this;
                planingService.deletePlans(indexNo)
                        .success(function (data) {
                            that.plansList.splice(index, 1);
                        })
                        .error(function (data) {
                            console.log("ERROR:" + data);
                        });
            },
            savePlans: function () {
                var that = this;
                var defer = $q.defer();
                console.log(this.plans);
                planingService.savePlans(JSON.stringify(this.plans))
                        .success(function (data) {
                            that.plansList.push = data;
                            defer.resolve(data);
                        })
                        .error(function (data) {
                            console.log("ERROR:" + data);
                            defer.reject();
                        });
                return defer.promise;
            },
            findByOrderNo : function(){
                planingService.findByOrderNo()
                    .success(function (data) {
                           this.orderDetailList =data;
                        })
                        .error(function (data) {
                            console.log("ERROR:" + data);
                        });
            }
            
//            OrderLable: function (indexNo) {
//                var order;
//                console.log("OrderLable");
//                angular.forEach(this.orderList, function (value) {
//                    if (value.indexNo === parseInt(indexNo)) {
//                        order = value.orderNo;
//                        this.orderDetailList = value.orderDetail;
//                        console.log(orderDetailList);
//                        return;
//                    }
//                });
//                return order;
//            },
//            OrderDetailLable: function (indexNo) {
//                var poNo;
//                console.log("OrderDetailLable");
//                console.log(indexNo);
//                angular.forEach(this.orderDetailList, function (value) {
//                    if (value.indexNo === parseInt(indexNo)) {
//                        console.log(value);
//                        poNo = value.poNo;
//                        return;
//                    }
//                });
//                return poNo;
//            }

        };
        return PlaningModel;
    };
    angular.module("AppModule")
            .factory("planingModel", factory);
}());