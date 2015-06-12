serviceModule.factory('SearcherService', function ($http) {
    var BASE_REST_API_URL = 'http://localhost:3000';

    return {
        sendQuery: function (query, carId) {
            return $http.post(BASE_REST_API_URL + '/add-query', {query: query, carId: carId});
        },
        getCarsByFilter: function(query) {
            return $http.get(BASE_REST_API_URL + '/get-cars-by-query/' + query);
        }
    };
});