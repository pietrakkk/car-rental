serviceModule.factory('CarListService', function ($http, $window) {
    var BASE_REST_API_URL = 'http://localhost:3000';
    var currentRentCar = {}

    return {
        rentNow: function (rent) {
            return $http.post(BASE_REST_API_URL + '/rent-now', {rent: rent, token: $window.sessionStorage.token});
        },
        getAll: function () {
            return $http.get(BASE_REST_API_URL + '/cars');
        },
        currentRentCar: currentRentCar
    };
});