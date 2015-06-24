var utils = require('../utils');
var mongoConnection;
var Car;


function mongoConnection(connection) {
    mongoConnection = connection;
    generateSchema();
}

function getAll() {
    return Car.find({});
}

function addCar(item) {
    Car.create(item, function (err, response) {
        console.log(response);
    });
}

function updateCar(id, changes) {
    return Car.update({_id: id}, changes);
}

function carById(id) {
    return Car.find({_id: id});
}

function getCarImgUrl(img) {
    return Car.find({mainImgUrl: img});
}

function addCarCollection(items, callback){
    Car.create(items, callback);
}

module.exports = {
    getCarById: carById,
    getAll: getAll,
    addCar: addCar,
    updateCar: updateCar,
    mongoConnection: mongoConnection,
    addCarCollection: addCarCollection,
    getCarImgUrl: getCarImgUrl,
    Car: Car
};


function generateSchema() {
    var Schema = mongoConnection.Schema;

    var CarSchema = new Schema({
        make: String,
        model: String,
        mainImgUrl: String,
        engineType: String,
        capacity: String,
        motorPower: String,
        price: String,
        bodyType: String,
        available: Boolean,
        detailImgs: [],
        year: Number
    });

    Car = mongoConnection.model('cars', CarSchema);
    //addCarFixtures();
}



