/**
 * auth
 * Date: 23.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var getBasicAuthHttpHeader = require('./tools').getBasicAuthHttpHeader;

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
     * @returns {*}
     */
    this.getAuth = function () {

        //TODO Нужно переообдумать способ авторизации по умолчанию для различных сред ..
        // .. авторизация должна быть уникальна для каждого экземпляра клиента
        // .. посмотреть в сторону подхода Impress

        if (!_auth) {
            var credentials = this.getProvider('default-auth');
            if (credentials) {
                _auth = credentials.getAuth();
            }
        }

        return _auth;
    };

    /**
     *
     * @returns {string|null}
     */
    this.getBasicAuthHeader = function () {
        var auth = this.getAuth();

        if (auth) {
            return getBasicAuthHttpHeader(auth.login, auth.password);
        } else {
            return null;
        }
    };

    /**
     *
     * @returns {boolean}
     */
    this.isAuth = function () {
        var auth = this.getAuth();
        return !!auth && !!auth.login && !!auth.password;
    };
};

module.exports = AuthProvider;