'use strict';

angular.module('CarRentalApp').controller('CarListCtrl', CarListCtrl);


function CarListCtrl($scope, CarListService, AuthenticationService, $modal) {
    $scope.cars = {};

    CarListService.getAll().then(function (response) {
        $scope.cars = response.data;
    });


    $scope.rentNow = function () {
        if (!AuthenticationService.isLoggedIn()) {
            $modal.open({
                templateUrl: 'scripts/user/login-form.html',
                controller: 'UserCtrl',
                backdrop: 'static',
                size: 'sm'
            });
        }
    };
}