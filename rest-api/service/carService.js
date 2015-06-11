var utils = require('../utils');

module.exports  = {
    getCarById: function (id) {
        return cars.filter(function (item) {
            return item.id === id;
        });
    },
    changeCarStatus: function (carId) {
        var carIndex = -1;

        for (var i = 0; i < cars.length; i++) {
            if (cars[i].id === carId) {
                carIndex = i;
                break;
            }
        }
        if (carIndex !== -1) cars[carIndex].available = true;
    },
    getAll: function(){
        return cars;
    }
};


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
        available: true,
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

function generateCarIds() {
    cars.forEach(function (item) {
        item.id = utils.generateString(10);
    });
}

generateCarIds();



