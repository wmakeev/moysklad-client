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

    // В качестве источника авторизации передан другой провайдер авторизации
    if (arguments[0] && arguments[0].getAuth) {
        _auth = arguments[0].getAuth();
    }

    // Логин и пароль переданы в параметрах
    else if (arguments.length == 2
        && typeof arguments[0] === 'string'
        && typeof arguments[1] === 'string') {

        this.setAuth(arguments[0], arguments[1]);
    }

    /**
     *
     * @returns {*}
     */
    this.getAuth = function () {

        //TODO Нужно переообдумать способ авторизации по умолчанию для различных сред ..
        // .. авторизация должна быть уникальна для каждого экземпляра клиента
        // .. посмотреть в сторону подхода Impress

        if (!_auth) {
            var credentials = require('project/default-auth');
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