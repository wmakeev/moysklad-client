/**
 * query.params
 * Date: 22.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var mixIn = require('mout/mixIn')
    , Is = require('tools').Is;

module.exports = function () {
    var _params = {};

    //TODO Проверить входные
    this.getParameter = function (name) {
        return _params[name];
    };

    this.getParameters = function () {
        return _params;
    };

    this.setParameter = function (name, value) {
        //TODO Ensure Object
        _params[name] = value;
    };

    this.setParameters = function (parameters) {
        //TODO Ensure Object
        mixIn(_params, parameters);
    }
};