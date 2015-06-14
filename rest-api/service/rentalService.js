var carService = require('./carService');
var userService = require('./userService');
var utils = require('../utils');


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
        rentalHistory.push(data);
    },
    getAll: function () {
        return rentals;
    },
    getRentalHistory: function () {
        return rentalHistory.filter(function(item){
            return item.car.available === true;
        });
    }

};

var rentals = [];
var rentalHistory = [];


function generateRentalHistory() {
    var cars = carService.getAll();
    var users = userService.getAll();
    var randomCarNumber = 0;
    var randomUserNumber = 0;

    for (var i = 0; i < 30; i++) {
        randomCarNumber = Math.floor((Math.random() * 7));
        randomUserNumber = Math.floor((Math.random() * 4));

        rentalHistory.push(
            {
                id: utils.generateString(14),
                car: cars[randomCarNumber],
                startDate: new Date(),
                endDate: new Date(),
                user: users[randomUserNumber]
            }
        );
    }
}

generateRentalHistory();