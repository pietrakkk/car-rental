module.exports = {
    URL: {
        SIGN_IN: '/login',
        LOG_OUT: '/logout',
        REGISTER: '/register',
        USER_BY_ID: '/:token/details',
        CARS: '/cars',
        CAR_BY_ID: '/:id/cars',
        CAR_IMG: '/image/:imgUrl',
        RENT_NOW: '/rent-now',
        RENTALS: '/rentals/:token',
        DELETE_RENTAL: '/rentals/delete/:token/:rentId',
        SUGGESTED_OFFERS: '/suggested_offers/:token',
        ADD_QUERY: '/add-query',
        FILTER_CARS: '/get-cars-by-query/:query'
    }
};