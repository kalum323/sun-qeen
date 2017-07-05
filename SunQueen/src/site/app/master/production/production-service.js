(function () {
    angular.module("AppModule")
            .service("productionService", function ($http, systemConfig) {

                this.findByLineNo = function (lineNo) {
                    return $http.get(systemConfig.apiUrl + "/api/sun-queen/master/plans/find-By-line-and-status/"+lineNo);
                };

            });
}());