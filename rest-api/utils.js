module.exports = {
    generateString: function (size) {
        var token = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < size; i++)
            token += possible.charAt(Math.floor(Math.random() * possible.length));

        return token;
    }
};