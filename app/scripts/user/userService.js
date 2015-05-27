'use strict';

var serviceModule = angular.module('carRentalServices', []);

serviceModule.factory('AuthenticationService', function ($window) {
    var authenticationData = {
        isLoggedIn: function () {
            return angular.isDefined($window.sessionStorage.token);
        }
    };

    return authenticationData;
});

serviceModule.factory('UserService', function ($http, $window) {
    var BASE_REST_API_URL = 'http://localhost:3000';
    return {
        signIn: function (credentials) {
            return $http.post(BASE_REST_API_URL + '/login', credentials);
        },

        logOut: function (token) {
            return $http.post(BASE_REST_API_URL + '/logout', token);
        },

        register: function(registerData){
            return $http.post(BASE_REST_API_URL + '/register', registerData);
        },

        getById: function(){
            return $http.get(BASE_REST_API_URL + '/' + $window.sessionStorage.token + '/details');
        }
    }
});