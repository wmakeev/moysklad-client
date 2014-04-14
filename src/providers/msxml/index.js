/**
 * msxml
 * Date: 14.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var msXmlClient = require('./../../moysklad-client/rest-clients/ms-xml');

/**
 * @this {ProviderAccessor}
 */
module.exports = function () {

    return msXmlClient(this).create();
};