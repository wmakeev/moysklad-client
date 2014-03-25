/**
 * query.filter
 * Date: 22.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require ('lodash')
    , Is = require('tools').Is;

module.exports = function () {
    var _filter = {};

    this.getFilter = function (name) {
        return _filter;
    };

    this.setFilter = function (value) {
        //TODO Ensure Object
        _filter = value;
        return this;
    };

    this.resetFilter = function () {
        _filter = {};
        return this;
    };

    //TODO Необходимо реализовать логинку наложения фильров с учетом дерева обектов
    this.appendFilter = function (value) {
        if (Is.object(value)) {
            _.extend(_filter, value);
        } else {
            throw new TypeError('addFilter: incorrect parameter [' + value + '], object required');
        }
        return this;
    };

    /*this.getFlattenFilter = function () {
     return _flattenFilter(_filter);
     }*/
};