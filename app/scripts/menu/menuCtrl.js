'use strict';

angular.module('CarRentalApp').controller('MenuCtrl', MenuCtrl);


function MenuCtrl($scope, $modal) {

    $scope.openRegisterPanel = function () {
        $modal.open({
            templateUrl: 'scripts/user/registration-form.html',
            controller: 'UserCtrl',
            backdrop: 'static'
        });
    };

    $scope.openLoginPanel = function () {
        $modal.open({
            templateUrl: 'scripts/user/login-form.html',
            controller: 'UserCtrl',
            backdrop: 'static',
            size: 'sm'
        });
    };

}