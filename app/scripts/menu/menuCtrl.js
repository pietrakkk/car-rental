'use strict';

angular.module('CarRentalApp').controller('MenuCtrl', MenuCtrl);


function MenuCtrl($scope, $modal, UserService, AuthenticationService, $window, $location, $rootScope) {
    var BASE_URL = 'http://localhost:9000/#';
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

     $scope.isAdmin = function () {
        return AuthenticationService.isAdmin();
    };

    $scope.logOut = function () {
        UserService.logOut({token: $window.localStorage.token}).then(
            function (response) {
                AuthenticationService.removeUserSession();
                $location.path('/');
            },
            function (response) {
                alertify.error("Rest api unavailable!");
            });
    };

    //TODO: move to app run
    $rootScope.$on('$locationChangeStart', function (event, next){
        var RENTAL_URL = BASE_URL + '/rentals';

        if(next === RENTAL_URL && !AuthenticationService.isAdmin()){
            alertify.error('You haven\'t access for this page');
             event.preventDefault();
        }
    });
}
