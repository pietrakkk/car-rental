'use strict';

angular.module('CarRentalApp').controller('RentSuggestionCtrl', RentSuggestionCtrl);


function RentSuggestionCtrl($scope, CarListService, AuthenticationService, $modal, RentSuggestionService) {

    $scope.suggestedOffers = {};

    RentSuggestionService.getSuggestedOffers().then(function (response) {
        $scope.suggestedOffers = response.data;
        console.log($scope.suggestedOffers);
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