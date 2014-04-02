/**
 * moysklad-client.jsdoc
 * Date: 30.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

/**
 * @class
 * @constructor
 */
Moysklad.Client = function () {}

/**
 * @param {T} type
 * @param {string} uuid
 * @param {{ fileContent: boolean }=} options
 * @param {Function=} callback
 * @return {T}
 * @template T
 * @memberOf Moysklad.Client.prototype
 */
var load = function (type, uuid, options, callback) {}
Moysklad.Client.prototype.load = load;

/**
 * @memberOf Moysklad
 * @return {Client}
 */
var createClient = function() {}
Moysklad.createClient = createClient;