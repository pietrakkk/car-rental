
angular.module('carRentalServices').factory('AuthenticationService', function ($window) {
    var userRole = '';
    var authenticationData = {
        isLoggedIn: function () {
            return angular.isDefined($window.sessionStorage.token);
        },
        isAdmin: function () {
            return this.userRole === 'admin';
        },
        userRole: userRole,
        userDetails: {}
    };

    return authenticationData;
});