(function () {
    //index module
    angular.module("AppModule", [
        "ngRoute",
        "ui.bootstrap",
        'ngAnimate',
        'ngSanitize',
        "branchModule",
        "customerModule",
//        "planingModule",
        "orderModule"
//        "productionModule"
    ]);

    //constants
    angular.module("AppModule")
            .constant("systemConfig", {
                apiUrl:
                        location.hostname === 'localhost'
                        ? "http://localhost:8080"
                        : location.protocol + "//" + location.hostname
            });
    //constants

    //route config
    angular.module("AppModule")
            .config(function ($routeProvider) {
                $routeProvider
                        //system
                        .when("/", {
                            templateUrl: "app/master/planing/planing/planing.html",
                            controller: "customerController"
                        })
                        .when("/master/customer/customer", {
                            templateUrl: "app/master/customer/customer.html",
                            controller: "customerController"
                        })
                        .when("/master/planing/planing", {
                            templateUrl: "app/master/planing/planing.html",
                            controller: "planingController"
                        })
                        .when("/master/order/order-summary", {
                            templateUrl: "app/master/order/order-summary.html",
                            controller: "orderController"
                        })
                        .when("/master/main/main", {
                            templateUrl: "app/master/main/main.html",
                            controller: "mainController"
                        })
                        .when("/master/calander/calander", {
                            templateUrl: "app/master/calander/calander.html",
                            controller: "calanderController"
                        })
                        .when("/master/production/production", {
                            templateUrl: "app/master/production/production.html",
                            controller: "productionController"
                        })

//                        .when("/master/branch/branch", {
//                            templateUrl: "app/master/branch/branch.html",
//                            controller: "branchController"
//                        })
                        .otherwise({
                            redirectTo: "master/planing/planing"
                        });
            });
}());
