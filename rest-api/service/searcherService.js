module.exports = {

    addQuery: function (query, carId) {
        var query = query.toLowerCase();
        if (queries[query] !== undefined) {
            if (queries[query]) {
                if (queries[query][carId] !== undefined) {
                    queries[query][carId]++;
                } else {
                    queries[query][carId] = 1;
                }
            }
        } else {
            queries[query] = [];
            queries[query][carId] = 1;
        }
    },
    getAll: function () {
        return queries;
    },
    filter: function (query, cars) {
        var query = query.toLowerCase();
        tempQuery = query;
        var matches = [];

        for (var i = 0; i < cars.length; i++) {
            var car = cars[i];
            if (!car.available) {
                continue;
            }
            if (car.make.toLowerCase().indexOf(query) > -1 || car.model.toLowerCase().indexOf(query) > -1 || car.engineType.toLowerCase().indexOf(query) > -1) {
                if (queries[query] !== undefined && queries[query][car._id] !== undefined) {
                    car.count = queries[query][car._id];
                } else {
                    car.count = 0;
                }
                matches.push(car);
            }
        }
        matches.sort(sortFunction);
        return matches;
    }
};

var sortFunction = function (a, b) {
    if (queries[tempQuery] !== undefined) {
        var countA = queries[tempQuery][a._id];
        var countB = queries[tempQuery][b._id];
        if (countA !== undefined || countB !== undefined) {
            if (countA > countB || countB === undefined) {
                return -1;
            }
            if (countB > countA || countA === undefined) {
                return 1;
            }
        }
        return 0;
    }
};

var queries = [];
var tempQuery = null;