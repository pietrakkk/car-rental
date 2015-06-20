var utils = require('../utils');
var mongoConnection;
var User;


function addUser(registrationData) {
    registrationData.role = 'user';

    User.create(registrationData, function (err, response) {
        console.log(response);
    });
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
    //addCarFixtures();
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

    users.forEach(function (item) {
        var user = new User(item);

        user.save(function (err, user) {
            if (err) return console.error(err);
        });
    });

    User.find(function (err, users) {
        if (err) return console.error(err);
    });
}