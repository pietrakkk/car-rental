var mongoose = require('mongoose');
var carService = require('./service/carService');
var userService = require('./service/userService');
var rentalHistoryService = require('./service/rentalHistoryService');
var CONSTANTS = require('./constants');

mongoose.connect(CONSTANTS.DB.URL + CONSTANTS.DB.NAME, function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log('Mongo connection established');
    }
});

userService.mongoConnection(mongoose);
carService.mongoConnection(mongoose);
rentalHistoryService.mongoConnection(mongoose);

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
            detailImgs: [],
            year: 2007
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

    carService.addCarCollection(cars, addCarFixturesCallback);
}

function addUserFixtures() {

    var users = [
        {
            name: 'Łukasz',
            surname: 'Piotrkowski',
            email: 'lpiotrko@wp.pl',
            password: '12345',
            role: 'admin'
        },
        {
            name: 'Błażej',
            surname: 'Błażejewski',
            email: 'blazej@wp.pl',
            password: '12345',
            role: 'user'
        },
        {
            name: 'Karol',
            surname: 'Karolkiewicz',
            email: 'karol@wp.pl',
            password: '12345',
            role: 'user'
        }, {
            name: 'Krzysztof',
            surname: 'Zasada',
            email: 'zasada@wp.pl',
            password: '12345',
            role: 'user'
        }
    ];
    userService.addUserCollection(users, addCollectionCallback);
}


function generateRentalHistory() {
    var cars = [];
    var users = [];
    var rentalHistory = [];

    carService.getAll().then(function (response) {
        cars = response;

        userService.getAll().then(function (response) {
            users = response;
            var randomCarNumber = 0;
            var randomUserNumber = 0;

            for (var i = 0; i < 30; i++) {
                randomCarNumber = Math.floor((Math.random() * cars.length));
                randomUserNumber = Math.floor((Math.random() * users.length));

                rentalHistory.push({
                    car: cars[randomCarNumber],
                    startDate: new Date(),
                    endDate: new Date(),
                    user: users[randomUserNumber]
                });
            }
            rentalHistoryService.addItem(rentalHistory);
        });
    });
}


function addCollectionCallback(err, response) {
    if (err) console.error(err);
    console.log(response);
    addCarFixtures();
}

function addCarFixturesCallback(err, response) {
    if (err) console.error(err);
    generateRentalHistory();
}

addUserFixtures();
