'use strict';


serviceModule.factory('RentalsService', function ($http, $window) {
    var BASE_REST_API_URL = 'http://localhost:3000';
    return {
        getAll: function(){
            return $http.get(BASE_REST_API_URL + '/rentals/' + $window.sessionStorage.token);
        },
        delete: function(rentId){
            return $http.delete(BASE_REST_API_URL + '/rentals/delete/' +  $window.sessionStorage.token + '/' + rentId);
        }
    }
});