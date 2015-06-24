var rentalService = require('./rentalService');
var carService = require('./carService');

module.exports = {
    getSuggestedOffers: function (user, rentalHistory, allCars) {
        generateSuggestedOffers(user, rentalHistory, allCars);

        if (Object.keys(user).length > 0) {
            return suggestedOffers[user[0].token];
        } else {
            return suggestedOffers['other'];
        }
    }
};

var suggestedOffers = [];

function generateSuggestedOffers(user, rentalHistory, allCars) {
    suggestedOffers = [];
    if (typeof user[0] === 'object' && Object.keys(user[0]).length > 0) {
        var rentals = filterHistoryByUserChoice(rentalHistory, user[0].email);
        rentals = groupByCar(rentals);
        suggestedOffers[user[0].token] = semanticMatchCars(rentals, allCars);
        suggestedOffers[user[0].token] = sortCarsByRank(suggestedOffers[user[0].token]);
    } else {
        suggestedOffers['other'] = getPopularCarsForNonLoggedUser(rentalHistory);
    }
}

function semanticMatchCars(rentals, cars) {
    var matchedCars = [];
    for (var i = 0; i < cars.length; i++) {
        for (var j = 0; j < rentals.length; j++) {
            var car = JSON.parse(JSON.stringify(cars[i])); //clone car to manipulate object
            var rentalCar = rentals[j];
            car.rank = generateRankForCar(car, rentalCar);
            if(car.rank != -1) {
                matchedCars.push(car);
            }
        }
    }
    matchedCars = groupByCarId(matchedCars);
    return matchedCars;
}

function generateRankForCar(car, rentalCar){
    var rank = 10;
    if(car.model === rentalCar.model) return -1;
    rank -= subtractFromRank(rentalCar.year, car.year, 3, 2.0);

    if(car.bodyType !== rentalCar.bodyType){
        rank -= 1;
    }

    rank -= subtractFromRank(rentalCar.motorPower, car.motorPower, 15, 1);
    rank -= subtractFromRank(rentalCar.capacity, car.capacity, 0.4, 0.5);
    rank -= subtractFromRank(rentalCar.price, car.price, 20, 1);
    if(car.engineType !== rentalCar.engineType){
        rank -= 2.5;
    }

    if(car.make !== rentalCar.make){
        rank += 1.5;
    }

    rank += (rentalCar.count / 2);
    return rank;
}

function subtractFromRank(rentalCarValue, carValue, range, weight) {
    if(Math.abs(rentalCarValue - carValue) > range) {
        return weight;
    } else {
        return (Math.abs(rentalCarValue - carValue))/range * weight;
    }
}

function concatenateMaps(map1, map2) {
    for (var i = 0; i < map1.length; i++) {
        for (var j = 0; j < map2.length; j++) {
            var car1 = map1[i];
            var car2 = map2[j];
            if (car1._id === car2._id) {
                car1.count += car2.count;
                car2.touched = true;
            }
        }
    }
    for (i = 0; i < map2.length; i++) {
        var car = map2[i];
        if (car.touched === undefined) {
            map1.push(car);
        }
    }
    return sortByCountOfRentInHistory(map1);
}

function groupByCar(rentals) {
    var rentalsMap = [];
    rentals.map(function (rent) {
        if (rentalsMap[rent.car._id] === undefined) {
            var car = rent.car;
            car.count = 1;
            rentalsMap[rent.car._id] = car;
        } else {
            car = rentalsMap[rent.car._id];
            car.count += 1;
            rentalsMap[rent.car._id] = car;
        }
    });
    rentalsMap = getRidOfKeys(rentalsMap);
    return rentalsMap;
}

function groupByCarId(cars) {
    var carsMap = [];
    cars.map(function (car) {
        if (carsMap[car._id] === undefined) {
            carsMap[car._id] = car;
        } else {
            var car2 = carsMap[car._id];
            car2.rank += car.rank;
            carsMap[car._id] = car2;
        }
    });
    carsMap = getRidOfKeys(carsMap);
    return carsMap;
}

function filterHistoryByUserChoice(rentalHistory, userEmail) {
    return rentalHistory.filter(function (item) {
        return item.user.email === userEmail && item.car.available === true;
    });
}

function getPopularCarsForNonLoggedUser(rentalHistory) {
    var hist = [];
    var copyHistory = JSON.parse(JSON.stringify(rentalHistory));
    copyHistory.map(function (rent) {
            if (hist[rent.car._id] !== undefined) {
                car = hist[rent.car._id];
                car.count++;
                hist[rent.car._id] = car;
            } else {
                var car = rent.car;
                car.count = 1;
                hist[rent.car._id] = car;
            }
    });

    hist = sortByCountOfRentInHistory(hist);
    hist = getRidOfKeys(hist);
    hist.reverse();
    return hist;
}

function sortByCountOfRentInHistory(hist) {
    var histOrdered = hist;
    var keys = Object.keys(histOrdered);
    var swapped;
    do {
        swapped = false;
        for (var i = 0; i < keys.length - 1; i++) {
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
    } while (swapped);

    return histOrdered.reverse();
}

function sortCarsByRank(cars) {
    var carsOrdered = cars;
    var keys = Object.keys(carsOrdered);
    var swapped;
    do {
        swapped = false;
        for (var i = 0; i < keys.length - 1; i++) {
            var record = carsOrdered[keys[i]];
            var next = carsOrdered[keys[i + 1]];
            var temp;
            if (record.rank > next.rank) {
                temp = record;
                carsOrdered[keys[i]] = next;
                carsOrdered[keys[i + 1]] = temp;
                swapped = true;
            }
        }
    } while (swapped);

    return carsOrdered.reverse();
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
