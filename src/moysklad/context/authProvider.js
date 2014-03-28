/**
 * auth
 * Date: 23.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var getBasicAuthHttpHeader = require('tools').getBasicAuthHttpHeader;

module.exports = function () {
    var _auth;

    this.setAuth = function (login, password) {
        _auth = {
            login: login,
            password: password
        }
        return this;
    };

    this.getBasicAuthHeader = function () {
        if (_auth) {
            return getBasicAuthHttpHeader(_auth.login, _auth.password);
        } else {
            return null;
        }
    };

    this.isAuth = function () {
        return !!_auth && !!_auth.login && !!_auth.password;
    };
}