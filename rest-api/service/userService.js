var utils = require('../utils');
var mongoConnection;
var User;


function addUser(registrationData) {
    registrationData.role = 'user';

    User.create(registrationData, function (err, response) {
        console.log(response);
    });
}

function addUserCollection(items, callback){
    User.create(items, callback);
}

function checkUserExists(registrationData) {
    return User.find({email: registrationData.email});
}

function authenticate(credentials, res) {
    return User.find({email: credentials.email, password: credentials.password});
}

function mongoConnection(connection) {
    mongoConnection = connection;
    generateSchema();
}

function getAll() {
    return User.find({});
}

function removeToken(token) {
    return User.find({token: token});
}

function getUserDetails(token) {
    return User.find({token: token});
}

function checkToken(token) {
    return User.find({token: token});
}

function isAdmin(token) {
    return User.find({token: token, role: 'admin'});
}

//only for add/remove token
function updateUser(user) {
    User.update({_id: user._id}, {token: user.token}, function (err, response) {
        console.log(response);
    });
}


module.exports = {
    isAdmin: isAdmin,
    authenticate: authenticate,
    checkToken: checkToken,
    checkUserExists: checkUserExists,
    getUserDetails: getUserDetails,
    removeToken: removeToken,
    addUser: addUser,
    getAll: getAll,
    mongoConnection: mongoConnection,
    addUserCollection: addUserCollection,
    updateUser: updateUser
};

function generateSchema() {
    var Schema = mongoConnection.Schema;

    var UserSchema = new Schema({
        name: String,
        surname: String,
        email: String,
        password: String,
        role: String,
        token: String
    });

    User = mongoConnection.model('users', UserSchema);
}