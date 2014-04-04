/**
 * auth
 * Date: 23.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var getBasicAuthHttpHeader = require('../../tools').getBasicAuthHttpHeader;

/** @class */
var AuthProvider = function () {
    var _auth;

    /**
     *
     * @param login
     * @param password
     * @returns {AuthProvider|Client} <code>this</code>
     */
    this.setAuth = function (login, password) {
        _auth = {
            login: login,
            password: password
        };
        return this;
    };

    /**
     *
     * @returns {string|null}
     */
    this.getBasicAuthHeader = function () {
        if (_auth) {
            return getBasicAuthHttpHeader(_auth.login, _auth.password);
        } else {
            return null;
        }
    };

    /**
     *
     * @returns {boolean}
     */
    this.isAuth = function () {
        return !!_auth && !!_auth.login && !!_auth.password;
    };
};

module.exports = AuthProvider;