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
            .when('/user-details', {
                templateUrl: 'scripts/user/user-details.html',
                controller: 'UserDetailsCtrl'
            })
            .otherwise({
                redirectTo: '/car-list'
            });
    });

var serviceModule = angular.module('carRentalServices', []);
