/**
 * index
 * Date: 24.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var stampit                  = require('stampit'),
    authProviderBehavior     = require('project/behaviors/authProviderBehavior'),
    providerAccessorBehavior = require('project/behaviors/providerAccessorBehavior');

var msXmlClient = stampit()

    .state({ options: {} })

    // Authable
    .enclose(authProviderBehavior)

    // Provider accessor
    .enclose(providerAccessorBehavior)

    // Methods
    .methods({

        // add client methods
        get             : require('./methods/get'),
        put             : require('./methods/put'),
        del             : require('./methods/del'),
        fetch           : require('./methods/fetch'),
        responseHandler : require('./methods/responseHandler')

    });

module.exports = msXmlClient;