var rentalService = require('./rentalService');

module.exports = {
    getSuggestedOffers: function (user) {
        generateSuggestedOffers(user);

        if(Object.keys(user).length > 0) {
            return suggestedOffers[user[0].token];
        } else {
            return suggestedOffers['other'];
        }
    }
};

var suggestedOffers = [];

function generateSuggestedOffers(user) {
    var rentalHistory = rentalService.getRentalHistory();
    suggestedOffers = [];

    if (Object.keys(user).length > 0) {
        var rentals = filterHistoryByUserChoice(rentalHistory, user[0].token)
        rentals = groupByCar(rentals);
        var rentalsOtherUsers = getPopularCarsForNonLoggedUser(rentalHistory);
        suggestedOffers[user[0].token] = concatenateMaps(rentals, rentalsOtherUsers);
    } else {
        suggestedOffers['other'] = getPopularCarsForNonLoggedUser(rentalHistory);
    }

    return suggestedOffers;
}

function concatenateMaps(map1, map2) {
    for(i = 0; i < map1.length; i++) {
        for(j = 0; j < map2.length; j++) {
            var car1 = map1[i];
            var car2 = map2[j];
            if(car1.id === car2.id) {
                car1.count += car2.count;
                car2.touched = true;
            }
        }
    }
    for(i = 0; i < map2.length; i++) {
        car = map2[i];
        if(car.touched === undefined) {
            map1.push(car);
        }
    }
    return sortByOrderHistory(map1);
}

function groupByCar(rentals) {
    var rentalsMap = [];
    rentals.map(function(rent) {
        if (rentalsMap[rent.car.id] === undefined) {
            var car = rent.car;
            car.count = 1;
            rentalsMap[rent.car.id] = car;
        } else {
            car = rentalsMap[rent.car.id];
            car.count += 1;
            rentalsMap[rent.car.id] = car;
        }
    });
    rentalsMap = getRidOfKeys(rentalsMap);
    return rentalsMap;
}

function filterHistoryByUserChoice(rentalHistory, userToken) {
    return rentalHistory.filter(function (item) {
        return  item.user.token === userToken;
    });
}

function getPopularCarsForNonLoggedUser(rentalHistory) {
    var hist = [];
    var copyHistory = JSON.parse(JSON.stringify(rentalHistory));
    copyHistory.map( function (rent) {
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

    return histOrdered.reverse();
}

function getRidOfKeys(hist) {
    var histWithoutKeys = [];
    var keys = Object.keys(hist);
    for (var i = 0; i < keys.length - 1; i++) {
        var record = hist[keys[i]];
        histWithoutKeys.push(record);
    }
    return histWithoutKeys;
}
