/**
 * MoyskladClient
 * Date: 11.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var getClientFactory = require('./client').getClientFactory;

module.exports = {

    createClient: function (options) {
        options = options || {
            providers: {}
        };

        var client = getClientFactory(options).create();

        // Auth
        if (!options.providers || !options.providers.auth) client.addProvider('auth', client);

        return client;
    }
};
