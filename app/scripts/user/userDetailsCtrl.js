'use strict';

angular.module('CarRentalApp').controller('UserDetailsCtrl', UserDetailsCtrl);


function UserDetailsCtrl($scope, $modal, UserService) {
    $scope.user = {};
    UserService.getById().then(function(response){
        $scope.user = response.data;
    });
}