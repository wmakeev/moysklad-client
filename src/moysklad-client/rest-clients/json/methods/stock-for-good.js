/**
 * stockForGood
 * Date: 24.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');

var stockForGood = function (options, callback) {

    var fetchOptions = {
        service : 'stock-for-good',
        params  : options
    };

    this.fetch(fetchOptions, callback);
};

module.exports = stockForGood;