(function () {
    angular.module("AppModule")
            .service("planingService", function ($http, systemConfig) {

                this.findAllPlans = function () {
                    return $http.get(systemConfig.apiUrl + "/api/sun-queen/master/plans/find-all-plans");
                };
                
                this.findAllOrders = function () {
                    return $http.get(systemConfig.apiUrl + "/api/sun-queen/master/order/find-all-order");
                };

                this.savePlans = function (plan) {
                    return $http.post(systemConfig.apiUrl + "/api/sun-queen/master/plans/save-plans",plan);
                };
                
                this.deletePlans = function (indexNo) {
                    return $http.delete(systemConfig.apiUrl + "/api/care-point/transaction/job-card/delete-category-detail/" + indexNo);
                };

            });
}());