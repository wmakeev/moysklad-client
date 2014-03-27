/**
 * from
 * Date: 23.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var forEach = require('mout/array/forEach')
    , Query = require('.').factory;

//TODO Оформить синонимы как подмассив
var bindingMethods = [ 'load', 'first', 'total' ];


module.exports = function (type) {
    //TODO Ensure

    Query.enclose(function () {
        this.getType = function () {
            return type;
        }
    });

    var that = this;

    // set client methods to query - query.load()
    forEach(bindingMethods, function (methodName) {
        Query.enclose(function () {
            this[methodName] = function () {
                var args = Array.prototype.slice(arguments);
                return (that[methodName]).apply(that, [type, this].concat(args));
            }
        });
    });

    return Query.create();
};