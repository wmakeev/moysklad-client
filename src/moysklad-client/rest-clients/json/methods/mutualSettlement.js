/**
 * mutualSettlement
 * Date: 24.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
    , moment = require('moment');

var list = function (options, callback) {

    var fetchOptions = {
        service : 'mutualSettlement',
        path    : '/list',
        params  : options
    };

    this.fetch(fetchOptions, callback);
};

var customer = function (options, callback) {
    var fetchOptions = {
        service : 'mutualSettlement',
        path    : '/customer' + '/' + options.customerUuid,
        params  : _.omit(options, 'customerUuid')
    };

    this.fetch(fetchOptions, callback);
};

module.exports = {
    list    : list,
    customer: customer
};