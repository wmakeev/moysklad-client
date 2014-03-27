/**
 * authable
 * Date: 27.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

module.exports = function () {
    var _authProvider;

    this.getAuthProvider = function () {
        return _authProvider;
    };

    this.setAuthProvider = function (provider) {
        if (provider) _authProvider = provider;
    };
}