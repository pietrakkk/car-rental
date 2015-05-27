
angular.module('carRentalServices').factory('AuthenticationService', function ($window) {
    var authenticationData = {
        isLoggedIn: function () {
            return angular.isDefined($window.sessionStorage.token);
        },
        userDetails: {}
    };

    return authenticationData;
});