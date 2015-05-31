'use strict';

angular.module('CarRentalApp').controller('RentCtrl', CarListCtrl);


function CarListCtrl($scope, CarListService, $route, $location, $modalInstance) {
    $scope.rent = {
        car: CarListService.currentRentCar,
        startDate: new Date(),
        endDate: new Date(),
        totalPrice: 0
    };

    $scope.dateFormat = 'dd-MMMM-yyyy';
    $scope.daysCount = 0;


    $scope.register = function () {
        if (!$scope.isValidDate()) {
            $scope.rent_form.$invalid = true;
            return;
        }
        $scope.rent_form.$invalid = false;

        CarListService.rentNow($scope.rent).then(
            function (response) {
                $location.path('/car-list');
                alertify.success(response.data.message);
                $route.reload();
            },
            function (response) {
                if (response.status === 403) {
                    alertify.error("Please singn in!");
                } else if (response.status === 405) {
                    alertify.error(response.data.message);
                    $route.reload();
                    $location.path('/car-list');
                }
            });
        $modalInstance.close();
    };

    $scope.cancel = function(){
        $modalInstance.close();
    };

    $scope.toggleMin = function () {
        $scope.minDate = $scope.minDate ? null : new Date();
    };

    $scope.isValidDate = function () {
        if ($scope.rent.startDate < $scope.rent.endDate) {
            $scope.rent_form.$invalid = false;
        } else {
            $scope.rent_form.$invalid = true;
        }

        return $scope.rent.startDate < $scope.rent.endDate;
    };

    $scope.toggleMin();


    $scope.open = function ($event, field) {
        $event.preventDefault();
        $event.stopPropagation();

        if (field === 'startDate') {
            $scope.startDateOpened = true;
        } else {
            $scope.endDateOpened = true;
        }
    };


    $scope.calculateDaysCount = function () {
        var oneDay = 24 * 60 * 60 * 1000;
        return Math.round(Math.abs(($scope.rent.endDate.getTime() - $scope.rent.startDate.getTime()) / (oneDay)));
    }

}