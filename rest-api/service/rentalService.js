var carService = require('./carService');

module.exports = {
    removeRental: function (rentalId) {
        var index = -1;

        for (var i = 0; i < rentals.length; i++) {
            if (rentals[i].id === rentalId) {
                index = i;
                carService.changeCarStatus(rentals[i].car.id);
                break;
            }
        }

        if (index !== -1) rentals.splice(index, 1);
    },
    addRental: function (data) {
        rentals.push(data);
    },
    getAll: function () {
        return rentals;
    }
};

var rentals = [];