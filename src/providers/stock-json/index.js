/**
 * stock-json
 * Date: 19.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var stockJsonClient = require('./../../moysklad-client/rest-clients/stock-json');

/**
 * @this {ProviderAccessor}
 */
module.exports = function () {

    return stockJsonClient(this).create();
};