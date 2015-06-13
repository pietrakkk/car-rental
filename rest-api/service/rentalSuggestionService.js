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
    suggestedOffers = [];

    if (Object.keys(user).length > 0) {
        suggestedOffers.push(filterHistoryByUserChoice(rentalHistory, user.token));
        suggestedOffers.push(filterHistoryByOther(user));
    } else {
        suggestedOffers = getPopularCarsForNonLoggedUser(rentalHistory);
    }

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

function getPopularCarsForNonLoggedUser(rentalHistory) {
    var hist = [];
    rentalHistory.map( function (rent) {
        if (hist[rent.car.id] !== undefined) {
            car = hist[rent.car.id];
            car.count++;
            hist[rent.car.id] = car;
        } else {
            var car = rent.car;
            car.count = 1;
            hist[rent.car.id] = car;
        }
    });
    hist = sortByOrderHistory(hist);
    hist = getRidOfKeys(hist);
    hist.reverse();
    return hist;
}

function sortByOrderHistory(hist) {
    var histOrdered = hist;
    var keys = Object.keys(histOrdered);
    var swapped;
    do {
        swapped = false;
        for (i = 0; i < keys.length - 1; i++) {
            var record = histOrdered[keys[i]];
            var next = histOrdered[keys[i + 1]];
            var temp;
            if (record.count > next.count) {
                temp = record;
                histOrdered[keys[i]] = next;
                histOrdered[keys[i + 1]] = temp;
                swapped = true;
            }
        }
    } while(swapped);

    return histOrdered;
}

function getRidOfKeys(hist) {
    var histWithoutKeys = [];
    var keys = Object.keys(hist);
    for (i = 0; i < keys.length - 1; i++) {
        var record = hist[keys[i]];
        histWithoutKeys.push(record);
    }
    return histWithoutKeys;
}

