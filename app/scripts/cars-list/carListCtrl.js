'use strict';

angular.module('CarRentalApp').controller('CarListCtrl', CarListCtrl);


function CarListCtrl($scope, CarListService, AuthenticationService, $modal) {
    $scope.cars = {};
    $scope.loading = true;

    CarListService.getAll().then(function (response) {
        $scope.cars = response.data;
        $scope.loading = false;
    });


    $scope.rentNow = function (car) {
        if (!AuthenticationService.isLoggedIn()) {
            $modal.open({
                templateUrl: 'scripts/user/login-form.html',
                controller: 'UserCtrl',
                backdrop: 'static',
                size: 'sm'
            });
            return;
        }
        CarListService.currentRentCar = car;

        $modal.open({
            templateUrl: 'scripts/rent/rent-form.html',
            controller: 'RentCtrl',
            backdrop: 'static'
        });
    };
}