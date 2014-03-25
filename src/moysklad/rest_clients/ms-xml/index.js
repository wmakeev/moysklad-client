/**
 * index
 * Date: 24.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var MsXmlClient = require('./client');

module.exports = {

    createClient: function () {
        return MsXmlClient.create();
    },

    factory: MsXmlClient
};