/**
 * query.filter
 * Date: 22.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
    , Is = require('../../../../tools/index').Is;

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

    this.appendFilter = function (value) {
        if (Is.object(value)) {
            //TODO Необходимо реализовать логинку наложения условий при объединении фильров
            _filter = _.merge(_filter, value);
        } else {
            throw new TypeError('addFilter: incorrect parameter [' + value + '], object required');
        }
        return this;
    };
};