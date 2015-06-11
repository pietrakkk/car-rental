var utils = require('../utils');

module.exports = {

    isAdmin: function (token) {
        return users.some(function (item) {
            return item.token === token && item.role === 'admin';
        });
    },
    userExists: function (credentials) {
        return users.some(function (item) {
            return item.email === credentials.email && item.password === credentials.password;
        });
    },
    checkToken: function (token) {
        return users.some(function (user) {
            return user.token === token;
        });
    },
    setUserToken: function (email, token) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].email === email) {
                users[i].token = token;
                return users[i];
            }
        }
    },
    checkUserExists: function (registrationData) {
        return users.some(function (item) {
            return item.email === registrationData.email;
        });
    }
    ,
    getUserDetails: function (token) {
        return users.filter(function (item) {
            return item.token === token;
        });
    },
    removeToken: function (token) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].token && users[i].token === token) {
                delete users[i].token;
                return;
            }
        }
    },
    addUser: function (data) {
        users.push(data);
    }
};

var users = [
    {
        name: 'Łukasz',
        surname: 'Piotrkowski',
        email: 'lpiotrko@wp.pl',
        password: '12345678',
        role: 'admin'
    },
    {
        name: 'Koń',
        surname: 'Rafał',
        email: 'other@wp.pl',
        password: '12345',
        role: 'user'
    }
];


function generateUserIds() {
    users.forEach(function (item) {
        item.id = utils.generateString(10);
    });
}


generateUserIds();

