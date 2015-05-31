angular.module('carRentalServices').factory('AuthenticationService', function ($window) {
    var userRole = '';
    var authenticationData = {
        isLoggedIn: function () {
            return angular.isDefined($window.localStorage.token);
        },
        isAdmin: function () {
            return $window.localStorage.role === 'admin';
        },
        setUserSession: function (sessionData) {
            $window.localStorage.token = sessionData.token;
            $window.localStorage.logged_as = sessionData.logged_as;
            $window.localStorage.role = sessionData.role;
        },
        removeUserSession: function () {
            delete $window.localStorage.token;
            delete $window.localStorage.logged_as;
            delete $window.localStorage.role;
        },
        logged_as: function(){
            return $window.localStorage.logged_as;
        },
        token: function(){
            return $window.localStorage.token;
        },
        userDetails: {}
    };

    return authenticationData;
});