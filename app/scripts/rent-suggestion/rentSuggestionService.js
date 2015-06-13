serviceModule.factory('RentSuggestionService', function ($http, AuthenticationService) {
    var BASE_REST_API_URL = 'http://localhost:3000';

    return {
        getSuggestedOffers: function () {
            return $http.get(BASE_REST_API_URL + '/suggested_offers/' + AuthenticationService.token());
        },
    };
});