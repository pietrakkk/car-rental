var mongoConnection;
var carService = require('./carService');
var userService = require('./userService');
var rentalService = require('./rentalService');
var RentalHistory;
var mongoConnection;

function addItem(item) {
    RentalHistory.create(item, function(err, response){
        console.log(response);
    });
}


function mongoConnection(connection) {
    mongoConnection = connection;
    generateSchema();
    //generateRentalHistory();
}

function getAll(){
    return RentalHistory.find();
}

module.exports = {
    addItem: addItem,
    mongoConnection: mongoConnection,
    getAll: getAll
};


function generateSchema() {
    var Schema = mongoConnection.Schema;

    var RentalHistorySchema = new Schema({
        car: Object,
        startDate: Date,
        endDate: Date,
        user: Object
    });

    RentalHistory = mongoConnection.model('rentalHistory', RentalHistorySchema);
}

function generateRentalHistory() {
    var cars = [];
    var users = [];

    carService.getAll().then(function (response) {
        cars = response;

        userService.getAll().then(function (response) {
            users = response;
            var randomCarNumber = 0;
            var randomUserNumber = 0;

            for (var i = 0; i < 30; i++) {
                randomCarNumber = Math.floor((Math.random() * 7));
                randomUserNumber = Math.floor((Math.random() * 4));

                var item = new RentalHistory({
                    car: cars[randomCarNumber],
                    startDate: new Date(),
                    endDate: new Date(),
                    user: users[randomUserNumber]
                });


                item.save(function (err, response) {
                    if (err) console.error(err);
                });

            }
        });

    });
}