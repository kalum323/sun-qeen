(function () {
    var factory = function ($q, productionService, productionModelFactory) {
        function ProductionModel() {
            this.constructor();
        }

        ProductionModel.prototype = {
            
            
            constructor: function () {
               
                
            },
            findByLineNo : function (lineNo){
                var that = this;
                productionService.findByLineNo(lineNo)
                    .success(function (data) {
                            that.planDetail = data;
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
            }
           
        };
        return ProductionModel;
    };
    angular.module("AppModule")
            .factory("productionModel", factory);
}());