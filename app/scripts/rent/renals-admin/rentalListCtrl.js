'use strict';

angular.module('CarRentalApp').controller('RentalListCtrl', RentalListCtrl);


function RentalListCtrl($scope, RentalsService) {
    $scope.rentals = [];
    $scope.rentToDelete = {};
    $scope.loading = false;

    var loadData = function () {
        $scope.loading = true;
        RentalsService.getAll().then(function (response) {
            $scope.rentals = response.data;
            $scope.loading = false;

        }, function (response) {
            if (response.code === 401) {
                alertify.error("You are not admin!");
            }
            alertify.error("Rest service unavailable");
            $scope.loading = false;
        });
    };

    loadData();

    RentalsService.getAll().then(function (response) {
        $scope.rentals = response.data;

    }, function (response) {
        if (response.code === 401) {
            alertify.error("You are not admin!");
        }
        alertify.error("Rest service unavailable");
    });

    $scope.removeRent = function (rent) {
        $scope.rentToDelete = rent;
        alertify.confirm('Are you sure you want to delete rental?', processRentSubmit);
    };

    var processRentSubmit = function (choose) {
        if (choose) {
            RentalsService.delete($scope.rentToDelete._id).then(function (response) {
                alertify.success("Rent deleted!");
                loadData();
                $scope.rentTodelete = {};
            }, function (response) {
                if (response.code === 401) {
                    alertify.error("Please sign in");
                    return;
                }
                alertify.error("Rest service unavailable!");
            });
        }
    };


}
