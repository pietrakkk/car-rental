'use strict';


serviceModule.factory('RentalsService', function ($http, AuthenticationService) {
    var BASE_REST_API_URL = 'http://localhost:3000';
    return {
        getAll: function(){
            return $http.get(BASE_REST_API_URL + '/rentals/' + AuthenticationService.token());
        },
        delete: function(rentId){
            return $http.delete(BASE_REST_API_URL + '/rentals/delete/' +  AuthenticationService.token() + '/' + rentId);
        }
    }
});