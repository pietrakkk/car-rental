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

function updateCar(id, changes) {
    return Car.update({_id: id}, changes);
}

function carById(id) {
    return Car.find({_id: id});
}

function getCarImgUrl(img) {
    return Car.find({mainImgUrl: img});
}

module.exports = {
    getCarById: carById,
    getAll: getAll,
    updateCar: updateCar,
    mongoConnection: mongoConnection,
    getCarImgUrl: getCarImgUrl
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

function addCarFixtures() {

    var body_types = ['sedan', 'combi', 'hatch-back', 'pick-up'];

    var cars = [
        {
            make: 'Peugeot',
            model: '205',
            mainImgUrl: '205.jpg',
            engineType: 'Diesel',
            capacity: '1.9',
            motorPower: '64',
            price: 120,
            bodyType: body_types[2],
            available: true,
            detailImgs: [],
            year: 1992
        },
        {
            make: 'Skoda',
            model: 'Roomster',
            engineType: 'Gas',
            capacity: '1.6',
            price: 150,
            motorPower: 101,
            bodyType: body_types[2],
            available: true,
            mainImgUrl: 'roomster.jpg',
            detailImgs: [],
            year: 2005
        },
        {
            make: 'Fiat',
            model: 'Sedici',
            engineType: 'Petrol',
            capacity: '1.6',
            motorPower: 120,
            price: 120,
            bodyType: body_types[2],
            available: true,
            mainImgUrl: 'sedici.jpg',
            detailImgs: [],
            year: 2007
        },
        {
            make: 'Toyota',
            model: 'Yaris',
            engineType: 'Petrol',
            capacity: '1.3',
            motorPower: 70,
            price: 100,
            bodyType: body_types[2],
            available: true,
            mainImgUrl: 'yaris.jpg',
            detailImgs: [],
            year: 2013
        },
        {
            make: 'Audi',
            model: 'A4',
            engineType: 'Petrol',
            capacity: '1.3',
            price: 170,
            motorPower: 75,
            bodyType: body_types[0],
            available: true,
            mainImgUrl: 'a4.jpg',
            detailImgs: []
        },
        {
            make: 'Lada',
            model: 'Samara',
            engineType: 'Petrol',
            capacity: '1.0',
            price: 80,
            motorPower: 40,
            bodyType: body_types[2],
            available: true,
            mainImgUrl: 'samara.jpg',
            detailImgs: [],
            year: 1986
        },
        {
            make: 'Renault',
            model: 'Megane',
            engineType: 'Petrol',
            capacity: '2.0',
            price: 130,
            motorPower: 140,
            bodyType: body_types[1],
            available: true,
            mainImgUrl: 'megane.jpg',
            detailImgs: [],
            year: 2010
        },
        {
            make: 'Daewoo',
            model: 'Nubira',
            engineType: 'Petrol',
            capacity: '1.6',
            price: 130,
            motorPower: 106,
            available: true,
            mainImgUrl: 'nubira.jpg',
            detailImgs: [],
            year: 2000,
            bodyType: body_types[0]
        },
        {
            make: 'Volvo',
            model: 'S40',
            engineType: 'Diesel',
            capacity: '2.0',
            price: 140,
            motorPower: 160,
            available: true,
            mainImgUrl: 's40.jpg',
            detailImgs: [],
            year: 2015
        }
    ];

    cars.forEach(function (item) {
        var car = new Car(item);

        car.save(function (err, user) {
            if (err) return console.error(err);
        });
    });
}


