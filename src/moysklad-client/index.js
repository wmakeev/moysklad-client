/**
 * MoyskladClient
 * Date: 11.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var Client = require('./client')
  , Query  = require('./rest-clients/ms-xml/query')
  , logger = require('project/logger')
  , pkg    = require('../../package');

logger.info('moysklad-client v' + pkg.version);

exports.createClient = function () {
    return Client.apply(null, [null].concat(Array.prototype.slice.call(arguments, 0)));
};

exports.createQuery = function () {
    return Query.apply(null, [null].concat(Array.prototype.slice.call(arguments, 0)));
};

exports.tools = require('project/tools');
exports.logger = require('project/logger');
exports.version = pkg.version;
