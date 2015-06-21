var http = require('http');
var express = require('express');
var app = express();
var fileStream = require('fs');
var userService = require('./service/userService');
var carService = require('./service/carService');
var rentalService = require('./service/rentalService');
var rentalHistoryService = require('./service/rentalHistoryService');
var searcherService = require('./service/searcherService');
var utils = require('./utils');
var rentalSuggestionService = require('./service/rentalSuggestionService');
var CONSTANTS = require('./constants');
var mongoose = require('mongoose');

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
rentalService.mongoConnection(mongoose);

app.use(express.bodyParser());


app.post(CONSTANTS.URL.SIGN_IN, function (req, res) {
    console.log(req.url);
    var credentials = req.body;

    userService.authenticate(credentials, res).then(function (response) {
        if (response.length > 0) {

            response[0].token = utils.generateString(30);
            userService.updateUser(response[0]);

            res.send({token: response[0].token, logged_as: response[0].email, role: response[0].role});
            return;
        }
        res.send(401, {});
    });
});

app.post(CONSTANTS.URL.LOG_OUT, function (req, res) {
    console.log(req.url);
    var token = req.body.token;

    userService.removeToken(token).then(function (response) {
        if (response[0]) {
            response[0].token = '';
            userService.updateUser(response[0]);
        }
        res.send(200, {});
    }, function (error) {
        res.send(500, error);
    });
});


app.post(CONSTANTS.URL.REGISTER, function (req, res) {
    console.log(req.url);
    var registrationData = req.body;

    userService.checkUserExists(registrationData, res).then(function (response) {
        if (response.length === 0) {

            userService.addUser(registrationData);
            res.send({message: 'Account successfuly created!'});
            return;
        }
        res.send(409, {message: 'This email already exists'});
    }, function (error) {
        res.send(500, error);
    });
});


app.get(CONSTANTS.URL.USER_BY_ID, function (req, res) {
    console.log(req.url);

    userService.getUserDetails(req.params.token, res).then(function (response) {
        if (response.length > 0) {
            res.send(200, {
                name: response[0].name,
                surname: response[0].surname,
                email: response[0].email
            });
            return;
        }
        res.send(404, {});
    }, function (error) {
        res.send(500, error);
    });
});


app.get(CONSTANTS.URL.CARS, function (req, res) {
    console.log(req.url);

    carService.getAll().then(function (response) {
        res.send(200, response);
    }, function (error) {
        res.send(500, error);
    });
});


app.get(CONSTANTS.URL.CAR_IMG, function (req, res) {
    console.log(req.url);

    var imgUrl = req.params.imgUrl;

    carService.getCarImgUrl(imgUrl).then(function (response) {
        if (response.length > 0) {
            var img = fileStream.readFileSync(__dirname + '/images/' + response[0].mainImgUrl);
            res.end(img);
        }

        res.end(404, {message: 'Image not found'});
    }, function (error) {
        res.send(500, error);
    });
});


app.post(CONSTANTS.URL.RENT_NOW, function (req, res) {
    console.log(req.url);
    var rentalData = req.body;

    userService.checkToken(rentalData.token).then(function (response) {
        console.log('Token checked');
        carService.getCarById(rentalData.rent.car._id).then(function (response) {
            var car = response[0];

            if (car && car.available) {
                userService.getUserDetails(rentalData.token).then(function (response) {

                    if (response.length > 0) {
                        var user = response[0];
                        var rentaltoAdd = {
                            car: car,
                            startDate: rentalData.rent.startDate,
                            endDate: rentalData.rent.endDate,
                            user: user
                        };
                        rentalService.addRental(rentaltoAdd);
                        rentalHistoryService.addItem(rentaltoAdd);

                        var carChanges = {
                            available: false
                        };

                        carService.updateCar(car._id, carChanges).then(function (response) {
                            res.send(200, {message: 'Reservation made!'});
                        });
                    } else {
                        res.send(401, {});
                    }
                });
            } else {
                res.send(405, {message: 'Car probably unavailable'});
            }
        });
    }, function (err) {
        res.send(500, err);
    });
});


app.get(CONSTANTS.URL.RENTALS, function (req, res) {
    console.log(req.url);
    var token = req.params.token;

    userService.checkToken(token).then(function (response) {
        if (response.length > 0) {
            rentalService.getAll().then(function (response) {
                res.send(200, response);
            });
            return;
        }
        res.send(401);
    });
});


app.delete(CONSTANTS.URL.DELETE_RENTAL, function (req, res) {
    var token = req.params.token;

    userService.isAdmin(token).then(function (response) {
        console.log(response);
        if (response.length > 0) {
            rentalService.getRentalById(req.params.rentId).then(function (response) {
                var rental = response[0];
                rentalService.removeRental(rental._id).then(function (response) {

                    carService.updateCar(rental.car._id, {available: true}).then(function (response) {
                        console.log(response);
                        res.send(200, {});
                    });
                });
            });
        } else {
            res.send(401);
        }
    }, function (err) {
        res.send(500, err);
    });
});

app.post(CONSTANTS.URL.ADD_QUERY, function (req, res) {
    console.log(req.url);
    var query = req.body.query;
    var carId = req.body.carId;

    searcherService.addQuery(query, carId);
    res.send(200, {message: 'Query Added!'});
});

app.get(CONSTANTS.URL.FILTER_CARS, function (req, res) {
    console.log(req.url);
    var query = req.params.query;

    carService.getAll().then(function (response) {
        var matches = searcherService.filter(query, response);
        res.send(200, matches);
    });
});


app.get(CONSTANTS.URL.SUGGESTED_OFFERS, function (req, res) {
    var token = req.params.token;

    if (token) {
        userService.getUserDetails(token).then(function (response) {
            var user = response;
            rentalHistoryService.getAll().then(function (response) {
                var result = rentalSuggestionService.getSuggestedOffers(user, response);
                res.send(200, result);
            });
        });
    }
});

app.listen(3000);