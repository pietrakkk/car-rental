serviceModule.factory('CarListService', function ($http) {
    var BASE_REST_API_URL = 'http://localhost:3000';

    return {
        getAll: function(){
            return $http.get(BASE_REST_API_URL + '/cars');
        }
    };
});