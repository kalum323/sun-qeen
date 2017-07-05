(function () {
    angular.module("AppModule")
            .factory("planingModelFactory", function () {
                var factory = {};

                factory.planingData = function () {
                    var data = {
                        "indexNo": null,
                        "line": null,
                        "endDate": null,
                        "startDate": null,
                        "productQty": null,
                        "totalQty": null,
                        "balanceQty": null,
                        "status": null,
                        "minutes": null,
                        "workers": null,
                        "orderDetail": {
                            "indexNo": null,
                            "poNo": null,
                            "colour": null,
                            "size": null,
                            "line": null,
                            "orderQty": null,
                            "deliverQty": null,
                            "productQty": null,
                            "balanceQty": null
                        }
                    };
                    return data;
                };
                
                factory.tempData = function () {
                    var tempData = {
                        "poNo" : null
                    };
                    return tempData;
                };
                
                return factory;
            });
}());
