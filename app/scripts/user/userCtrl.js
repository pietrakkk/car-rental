'use strict';

angular.module('CarRentalApp').controller('UserCtrl', UserCtrl);


function UserCtrl($scope, $modalInstance) {
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


    $scope.signIn = function(){
        $modalInstance.close();
    };
}