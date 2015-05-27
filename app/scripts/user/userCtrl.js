'use strict';

angular.module('CarRentalApp').controller('UserCtrl', UserCtrl);


function UserCtrl($scope, $modalInstance, UserService, AuthenticationService, $window) {
    $scope.user = {};
    $scope.patterns = {
        email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        name: /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]*$/,
        password: /^([a-zA-Z0-9_-]){5,}$/
    };

    $scope.submit = function () {
        if (!isPasswordTheSame()) {
            $scope.registration_form.passwordRepeatField.$error.similiar = [];
            return;
        }
        delete $scope.registration_form.passwordRepeatField.$error.similiar;
        $modalInstance.close();
        //add backend
    };

    var isPasswordTheSame = function () {
        return $scope.user.password === $scope.user.passwordRepeat;
    };

    $scope.cancel = function () {
        $modalInstance.close();
    };


    $scope.signIn = function () {
        UserService.signIn($scope.user).then(
            function (response) {
                AuthenticationService.loggedAs = response.data.logged_as;

                $window.sessionStorage.auth = {
                    token: response.data.token,
                    loggedAs: response.data.logged_as
                };
                $modalInstance.close();
                alertify.success("Successfuly signed in!");
            },
            function (response) {
                if (response.status === 401) {
                    $scope.loginForm.passwordField.$error.invalid = true;
                    return;
                }
                $modalInstance.close();
                alertify.error("Rest api unavailable!");
            });
    };
}