/**
 * MoyskladClient
 * Date: 11.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var client = require('./client')
  , logger = require('project/logger');


module.exports = {

    createClient: function () {
        //logger.time('createClient');
        return client.apply(this, [null].concat(Array.prototype.slice.call(arguments, 0)));
        //logger.timeEnd('createClient');
    }
};