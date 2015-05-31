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
             .when('/rentals', {
                templateUrl: 'scripts/rent/renals-admin/rental-list.html',
                controller: 'RentalListCtrl'
            })
            .otherwise({
                redirectTo: '/car-list'
            });
    });

var serviceModule = angular.module('carRentalServices', []);
