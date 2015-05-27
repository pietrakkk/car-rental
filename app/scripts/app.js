'use strict';

angular.module('CarRentalApp', [
    'carRentalServices',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/car-list', {
                templateUrl: 'scripts/cars-list/car-list.html',
                controller: 'CarListCtrl'
            })
            .otherwise({
                redirectTo: '/car-list'
            });
    });
