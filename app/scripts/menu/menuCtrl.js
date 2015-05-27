'use strict';

angular.module('CarRentalApp').controller('MenuCtrl', MenuCtrl);


function MenuCtrl($scope, $modal, UserService, AuthenticationService, $window) {

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

    $scope.isLoggedIn = function () {
        return AuthenticationService.isLoggedIn();
    };

    $scope.logOut = function () {
        UserService.logOut({token: $window.sessionStorage.token}).then(
            function (response) {
                delete $window.sessionStorage.auth;
            },
            function (response) {
                alertify.error("Rest api unavailable!");
            });
    };
}