"use strict";


/*We need to manually start angular as we need to
wait for the google charting libs to be ready*/



google.load('visualization', '1',  { packages: ['corechart', 'table'] });




//var myApp = myApp || angular.module("myapp", ["googleChartWrap"]);

var myApp = angular.module("myapp", ["googleChartWrap"]);

myApp.factory('httpq', function ($http, $q) {
    return {
        get: function () {
            var deferred = $q.defer();
            $http.get.apply(null, arguments)
                .success(deferred.resolve)
                .error(deferred.resolve);
            return deferred.promise;
        }
    }
});



myApp.controller("IndexCtrl", function ($scope, $http) {
    

    

});


google.setOnLoadCallback(function () {
    angular.bootstrap(document.body, ['myapp', 'myAppCrud']);
});