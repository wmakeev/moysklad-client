/**
 * from
 * Date: 23.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
  , Query = require('./../../rest-clients/ms-xml/query/index').Query;

//TODO Оформить синонимы как подмассив
var bindingMethods = [ 'load', 'first', 'total' ];

/**
 * Возвращает запрос привязанный к указанному типу сущности.
 * Используется для более лаконичной записи зароса ввиде цепочки методов.
 *
 * @param type
 */
var from = function (type) {
    //TODO Ensure

    Query.enclose(function () {
        this.getType = function () {
            return type;
        }
    });

    var that = this;

    // set client methods to query (i.e. query.load)
    _.each(bindingMethods, function (methodName) {
        Query.enclose(function () {
            this[methodName] = function () {
                var args = Array.prototype.slice(arguments);
                return that[methodName].apply(that, [type, this].concat(args));
            }
        });
    });

    return Query.create();
};

module.exports = from;