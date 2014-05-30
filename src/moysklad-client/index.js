/**
 * MoyskladClient
 * Date: 11.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var client = require('./client');

module.exports = {

    createClient: function () {
        return client.apply(this, [null].concat(Array.prototype.slice.call(arguments, 0)));
    }
};