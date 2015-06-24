'use strict';

angular.module('CarRentalApp').controller('SearcherCtrl', SearcherCtrl);


function SearcherCtrl($scope, $rootScope, SearcherService, AuthenticationService, $modal, CarListService) {
    var BASE_URL = 'http://localhost:9000/#';

    $scope.filteredCars = [];
    $scope.nullResponse = false;
    $scope.focused = true;
    $scope.emptyText = true;

    $scope.setFocused = function (focused) {
        $scope.focused = focused;
    };

    $scope.$watch('searchValue', function (newValue, oldValue) {
        $scope.emptyText = (newValue === '');

        if (newValue !== '' && newValue !== oldValue) {
            SearcherService.getCarsByFilter(newValue).then(function (response) {
                if (jQuery.isEmptyObject(response.data)) {
                    $scope.nullResponse = true;
                } else {
                    $scope.nullResponse = false;
                    $scope.filteredCars = response.data;
                }
            });

            //SearcherService.sendQuery(newValue);
        }

        if (newValue === '') {
            $scope.filteredCars = [];
        }
    });

    $scope.rentNow = function (car) {
        SearcherService.sendQuery($scope.searchValue, car._id);
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
