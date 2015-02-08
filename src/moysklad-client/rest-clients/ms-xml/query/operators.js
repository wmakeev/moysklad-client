/**
 * operators
 * Date: 17.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
  , moment = require('moment');

function convertValue(value, serverTimezone) {

    if (typeof value === 'string' || typeof value === 'number') {
        return value;

    } else if (value instanceof Date || moment.isMoment(value)) {
        var dateMoment = moment(value);

        if (serverTimezone) dateMoment.zone(serverTimezone);
        return dateMoment.format('YYYYMMDDHHmmss');

    } else if (typeof value === 'undefined' || value === 'null') {
        throw new TypeError('Null or undefined parameter in query operator');

    } else {
        throw new TypeError('Incorrect parameter in query operator');
    }
}

var operators = {

    //
    anyOf: function () {
        var values;

        if (arguments.length == 1 && arguments[0] instanceof Array)
            values = arguments[0];

        else if (arguments.length > 0)
            values = Array.prototype.slice.call(arguments, 0);

        else
            throw new Error('anyOf: no arguments');

        return {
            type: 'QueryOperatorResult',
            filter: _.map(values, function (value) {
                return '=' + convertValue.call(this, value);
            })
        };
    },

    // TODO !!!
    between: function () {
        var values, serverTimezone;

        if (arguments.length <= 2 && arguments[0] instanceof Array) {
            values = arguments[0];
        }

        else if (arguments.length >= 2)
            values = Array.prototype.slice.call(arguments, 0);

        else
            throw new Error('between: incorrect arguments');

        return {
            type: 'QueryOperatorResult',
            filter: [ '>' + convertValue(_.min([values[0], values[1]])),
                      '<' + convertValue.call(this, _.max([values[0], values[1]])) ]
        };
    },

    //
    greaterThen: function (value, serverTimezone) {
        return {
            type: 'QueryOperatorResult',
            filter: [ '>' + convertValue(value, serverTimezone) ]
        };
    },

    //
    greaterThanOrEqualTo: function (value) {
        return {
            type: 'QueryOperatorResult',
            filter: [ '>=' + convertValue.call(this, value) ]
        };
    },

    //
    lessThan: function (value, serverTimezone) {
        return {
            type: 'QueryOperatorResult',
            filter: [ '<' + convertValue(value, serverTimezone) ]
        };
    },

    //
    lessThanOrEqualTo: function (value) {
        return {
            type: 'QueryOperatorResult',
            filter: [ '<=' + convertValue.call(this, value) ]
        };
    }

};

operators.$in  = operators.anyOf;
operators.$bt  = operators.between;
operators.$gt  = operators.greaterThen;
operators.$gte = operators.greaterThanOrEqualTo;
operators.$lt  = operators.lessThan;
operators.$lte = operators.lessThanOrEqualTo;

module.exports = operators;