var http = require('http');
var express = require('express');
var app = express();
var fileStream = require('fs');
var userService = require('./service/userService');
var carService = require('./service/carService');
var rentalService = require('./service/rentalService');
var searcherService = require('./service/searcherService');
var utils = require('./utils');
var CONSTANTS = require('./constants');

app.use(express.bodyParser());


app.post(CONSTANTS.URL.SIGN_IN, function (req, res) {
    console.log(req.url);
    var credentials = req.body;

    if (userService.userExists(credentials)) {
        var token = utils.generateString(30);

        var user = userService.setUserToken(credentials.email, token);
        res.send({token: token, logged_as: user.email, role: user.role});
        return;
    }
    res.send(401, {});
});

app.post(CONSTANTS.URL.LOG_OUT, function (req, res) {
    console.log(req.url);
    var token = req.body;
    userService.removeToken(token);
    res.send({});
});


app.post(CONSTANTS.URL.REGISTER, function (req, res) {
    console.log(req.url);
    var registrationData = req.body;

    if (!userService.checkUserExists(registrationData)) {
        registrationData.id = utils.generateString(10);
        registrationData.role = 'user';
        userService.addUser(registrationData);
        res.send({message: 'Account successfuly created!'});
        return;
    }
    res.send(409, {message: 'This email already exists'});
});


app.get(CONSTANTS.URL.USER_BY_ID, function (req, res) {
    console.log(req.url);

    var user = userService.getUserDetails(req.params.token);

    if (user.length > 0) {
        res.send(200, {
            name: user[0].name,
            surname: user[0].surname,
            email: user[0].email
        });
        return;
    }
    res.send(404, {});
});


app.get(CONSTANTS.URL.USER_BY_ID, function (req, res) {
    console.log(req.url);

    var user = userService.getUserDetails(req.params.token);

    if (user.length > 0) {
        res.send(200, {
            name: user[0].name,
            surname: user[0].surname,
            email: user[0].email
        });
        return;
    }
    res.send(404, {});
});


app.get(CONSTANTS.URL.CARS, function (req, res) {
    console.log(req.url);

    res.send(200, carService.getAll());
});


app.get(CONSTANTS.URL.CAR_IMG, function (req, res) {
    console.log(req.url);

    var imgUrl = req.params.imgUrl;

    var carExists = carService.getAll().some(function (car) {
        return car.mainImgUrl === imgUrl;
    });

    if (carExists) {
        var img = fileStream.readFileSync(__dirname + '/images/' + imgUrl);
        res.end(img);
        return;
    }

    res.end(404, {message: 'Image not found'});
});


app.post(CONSTANTS.URL.RENT_NOW, function (req, res) {
    console.log(req.url);
    var rentalData = req.body;

    if (userService.checkToken(rentalData.token)) {
        var car = carService.getCarById(rentalData.rent.car.id)[0];
        var rentUser = userService.getUserDetails(rentalData.token);

        if (car && car.available) {

            var rentaltoAdd = {
                id: utils.generateString(14),
                car: car,
                startDate: rentalData.rent.startDate,
                endDate: rentalData.rent.endDate,
                user: rentUser[0]
            };

            rentalService.addRental(rentaltoAdd);

            car.available = false;
            res.send(200, {message: 'Reservation made!'});
            return;
        } else {
            res.send(405, {message: "Car probably unavailable!"});
            return;
        }
    }
    res.send(403);
});


app.get(CONSTANTS.URL.RENTALS, function (req, res) {
    console.log(req.url);
    var token = req.params.token;

    if (userService.checkToken(token) && userService.isAdmin(token)) {
        res.send(200, rentalService.getAll());
        return;
    }
    res.send(401);
});


app.delete(CONSTANTS.URL.DELETE_RENTAL, function (req, res) {
    var token = req.params.token;

    if (userService.checkToken(token) && userService.isAdmin(token)) {
        rentalService.removeRental(req.params.rentId);
        res.send(200, {});
        return;
    }
    res.send(401);
});

app.post(CONSTANTS.URL.ADD_QUERY, function (req, res) {
    console.log(req.url);
    var query = req.body.query;
    var carId = req.body.carId;

    searcherService.addQuery(query, carId);

    res.send(200, {message: 'Query Added!'});
    return;
});

app.get(CONSTANTS.URL.FILTER_CARS, function (req, res) {
    console.log(req.url);
    var query = req.params.query;
    var cars = searcherService.filter(query);
    res.send(200, cars);
    return;
});


app.listen(3000);