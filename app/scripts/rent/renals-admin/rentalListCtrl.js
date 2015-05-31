'use strict';

angular.module('CarRentalApp').controller('RentalListCtrl', RentalListCtrl);


function RentalListCtrl($scope, RentalsService) {
    $scope.rentals = [];
    $scope.rentToDelete = {};

    var loadData = function () {
        RentalsService.getAll().then(function (response) {
            $scope.rentals = response.data;
            console.log($scope.rentals);
        }, function (response) {
            if (response.code === 401) {
                alertify.error("You are not admin!");
            }
            alertify.error("Rest service unavailable");
        });
    };

    loadData();

    RentalsService.getAll().then(function (response) {
        $scope.rentals = response.data;
        console.log($scope.rentals);
    }, function (response) {
        if (response.code === 401) {
            alertify.error("You are not admin!");
        }
        alertify.error("Rest service unavailable");
    });

    $scope.removeRent = function (rent) {
        $scope.rentToDelete = rent;
        alertify.confirm('Are you sure you want to delete rental?', removeRentSuccess, function () {
        });
    };

    var removeRentSuccess = function () {
        RentalsService.delete($scope.rentToDelete.id).then(function (response) {
            alertify.success("Rent deleted!");
            loadData();
            $scope.rentTodelete = {};
        }, function (response) {
            if (response.code === 401) {
                alertify.error("Please sign in");
            }
            alertify.error("Rest service unavailable!");
        });

    };

}
