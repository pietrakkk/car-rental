var utils = require('../utils');
var mongoConnection;
var carService = require('./carService');
var Rental;

function mongoConnection(connection) {
    mongoConnection = connection
    generateSchema();
}

function addRental(item) {
    Rental.create(item, function (err, response) {
        console.log(response);
    });
}

function getRentalById(id) {
    return Rental.find({_id: id});
}

function removeRental(itemId) {
    return Rental.remove({_id: itemId});
}

function getAll() {
    return Rental.find({});
}


module.exports = {
    mongoConnection: mongoConnection,
    addRental: addRental,
    getRentalById: getRentalById,
    removeRental: removeRental,
    getAll: getAll,
    Rental: Rental
};

function generateSchema() {
    var Schema = mongoConnection.Schema;

    var RentalSchema = new Schema({
        car: Object,
        startDate: Date,
        endDate: Date,
        user: Object
    });

    Rental = mongoConnection.model('rentals', RentalSchema);
}







