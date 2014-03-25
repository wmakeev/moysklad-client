/**
 * auth
 * Date: 23.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var getBasicAuthHttpHeader = require('tools').getBasicAuthHttpHeader;

module.exports = function () {
    var auth;

    this.setBasicAuth = function (login, password) {
        auth = {
            login: login,
            password: password
        }
    };

    this.getBasicAuthHeader = function () {
        if (auth) {
            return getBasicAuthHttpHeader(auth.login, auth.password);
        } else {
            return null;
        }
    };

    this.isAuth = function () {
        return !!auth && !!auth.login && !!auth.password;
    };
}