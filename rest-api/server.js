var http = require('http');
var express = require('express');
var app = express();
var fileStream = require('fs');

var URL = {
    SIGN_IN: '/login',
    LOG_OUT: '/logout',
    REGISTER: '/register',
    USER_BY_ID: '/:token/details',
    CARS: '/cars',
    CAR_BY_ID: '/:id/cars',
    CAR_IMG: '/image/:imgUrl'
};


var users = [
    {
        name: 'Łukasz',
        surname: 'Piotrkowski',
        email: 'lpiotrko@wp.pl',
        password: '12345678',
        role: 'admin',
    },
    {
        name: 'Koń',
        surname: 'Rafał',
        email: 'other@wp.pl',
        password: '1234',
        role: 'user'
    }
];


var cars = [
    {
        make: 'Peugeot',
        model: '205',
        mainImgUrl: '205.jpg',
        engineType: 'Diesel',
        motorPower: '1.9',
        price: 120,
        available: true,
        detailImgs: []
    },
    {
        make: 'Skoda',
        model: 'Roomster',
        engineType: 'Gas',
        motorPower: '1.6',
        price: 150,
        available: true,
        mainImgUrl: 'roomster.jpg',
        detailImgs: []
    },
    {
        make: 'Fiat',
        model: 'Sedici',
        engineType: 'Petrol',
        motorPower: '1.6',
        price: 120,
        available: true,
        mainImgUrl: 'sedici.jpg',
        detailImgs: []
    },
    {
        make: 'Toyota',
        model: 'Yaris',
        engineType: 'Petrol',
        motorPower: '1.3',
        price: 100,
        available: true,
        mainImgUrl: 'yaris.jpg',
        detailImgs: []
    },
    {
        make: 'Audi',
        model: 'A4',
        engineType: 'Petrol',
        motorPower: '1.3',
        price: 170,
        available: true,
        mainImgUrl: 'a4.jpg',
        detailImgs: []
    },
    {
        make: 'Lada',
        model: 'Samara',
        engineType: 'Petrol',
        motorPower: '1.0',
        price: 80,
        mainImgUrl: 'samara.jpg',
        detailImgs: []
    },
    {
        make: 'Renault',
        model: 'Megane',
        engineType: 'Petrol',
        motorPower: '2.0',
        price: 130,
        available: true,
        mainImgUrl: 'megane.jpg',
        detailImgs: []
    },
    {
        make: 'Volvo',
        model: 'S40',
        engineType: 'Diesel',
        motorPower: '2.0',
        price: 140,
        available: true,
        mainImgUrl: 's40.jpg',
        detailImgs: []
    }
];

app.use(express.bodyParser());


app.post(URL.SIGN_IN, function (req, res) {
    console.log(req.url);
    var credentials = req.body;

    if (userExists(credentials)) {
        var token = generateToken();

        var user = setUserToken(credentials.email, token);
        res.send({token: token, logged_as: user.email});
        return;
    }
    res.send(401, {});
});

app.post(URL.LOG_OUT, function (req, res) {
    console.log(req.url);
    var token = req.body;
    removeToken(token);
    res.send({});
});


app.post(URL.REGISTER, function (req, res) {
    console.log(req.url);
    var registrationData = req.body;

    if (!checkUserExists(registrationData)) {
        users.push(registrationData);
        res.send({message: 'Account successfuly created!'});
        return;
    }
    res.send(409, {message: 'This email already exists'});
});


app.get(URL.USER_BY_ID, function (req, res) {
    console.log(req.url);

    var user = getUserDetails(req.params.token);

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


app.get(URL.USER_BY_ID, function (req, res) {
    console.log(req.url);

    var user = getUserDetails(req.params.token);

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




app.get(URL.CARS, function (req, res) {
    console.log(req.url);

    res.send(200, cars);
});


app.get(URL.CAR_IMG, function (req, res) {
    console.log(req.url);

    var imgUrl = req.params.imgUrl;

    var carExists = cars.some(function(car){
        return car.mainImgUrl === imgUrl;
    });

    if(carExists){
        var img = fileStream.readFileSync(__dirname + '/images/' +imgUrl);
        res.end(img);
        return;
    }

    res.end(404, {message: 'Image not found'});
});


var userExists = function (credentials) {
    return users.some(function (item) {
        return item.email === credentials.email && item.password === credentials.password;
    });
};

var removeToken = function (token) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].token && users[i].token === token) {
            delete users[i].token;
            return;
        }
    }
};


var generateToken = function () {
    var token = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 30; i++)
        token += possible.charAt(Math.floor(Math.random() * possible.length));

    return token;
};


var setUserToken = function (email, token) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].email === email) {
            users[i].token = token;
            return users[i];
        }
    }
};


var checkUserExists = function (registrationData) {
    return users.some(function (item) {
        return item.email === registrationData.email;
    });
};

var getUserDetails = function (token) {
    return users.filter(function (item) {
        return item.token === token;
    });
};


app.listen(3000);