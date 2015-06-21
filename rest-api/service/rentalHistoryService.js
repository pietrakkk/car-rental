var mongoConnection;
var RentalHistory;
var mongoConnection;

function addItem(item) {
    RentalHistory.create(item, function (err, response) {
        console.log(response);
    });
}


function mongoConnection(connection) {
    mongoConnection = connection;
    generateSchema();
    //generateRentalHistory();
}

function getAll() {
    return RentalHistory.find();
}

module.exports = {
    addItem: addItem,
    mongoConnection: mongoConnection,
    getAll: getAll,
    RentalHistory: RentalHistory
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