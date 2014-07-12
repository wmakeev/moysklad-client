/**
 * MoyskladClient
 * Date: 11.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var client = require('./client')
  , query  = require('./rest-clients/ms-xml/query')
  , logger = require('project/logger');


module.exports = {

    createClient: function () {
        return client.apply(this, [null].concat(Array.prototype.slice.call(arguments, 0)));
    },

    createQuery: query.createQuery,

    tools: require('project/tools'),
    logger: require('project/logger')
};