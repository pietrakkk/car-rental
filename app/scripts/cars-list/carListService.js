serviceModule.factory('CarListService', function ($http, AuthenticationService) {
    var BASE_REST_API_URL = 'http://localhost:3000';
    var currentRentCar = {};

    return {
        rentNow: function (rent) {
            return $http.post(BASE_REST_API_URL + '/rent-now', {rent: rent, token: AuthenticationService.token()});
        },
        getAll: function () {
            return $http.get(BASE_REST_API_URL + '/cars');
        },
        currentRentCar: currentRentCar
    };
});