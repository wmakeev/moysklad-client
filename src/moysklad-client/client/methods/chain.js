/**
 * chain
 * Date: 25.06.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _               = require('lodash'),
    callbackAdapter = require('project/tools/callbackAdapter');

var chain = function () {
    return _.chain(this.load.apply(this, arguments));
};

module.exports = chain;