var rentalService = require('./rentalService');

module.exports = {
    getSuggestedOffers: function (user) {
        generateSuggestedOffers(user);

        return suggestedOffers;
    }
};

var suggestedOffers = [];

function generateSuggestedOffers(user) {
    var rentalHistory = rentalService.getRentalHistory();

    if (user) {
        suggestedOffers.push(filterHistoryByUserChoice(rentalHistory, user.token));
    }
        suggestedOffers.push(filterHistoryByOther(user));

    return suggestedOffers;
}


function filterHistoryByUserChoice(rentalHistory, userToken) {
    return rentalHistory.filter(function (item) {
        return  item.user.token === userToken;
    });
}

function filterHistoryByOther(user){
    //TODO:implement filtering order by rental count and !== current signed in user
    return [];
}

generateSuggestedOffers();

