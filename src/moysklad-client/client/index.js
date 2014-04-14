/**
 * Client
 * Date: 25.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
    , stampit = require('stampit')
    , from = require('./from')
    , load = require('./load')
    , authProviderBehavior = require('./authProviderBehavior')
    , providerAccessorBehavior = require('./../../providerAccessorBehavior');

/**
 * @class Client
 */
var Client = stampit()

    // Auth
    .enclose(authProviderBehavior)

    // Rest client accessor (RestClientsAccessor)
    //
    //.enclose(restClientsAccessor)

    // Methods
    //
    .methods(
    /**
     * @lends Client.prototype
     */
    {

        // Ms
        from: from,
        load: load

        // Stock
        //stockByGood: require('...'),
        //stockByConsignment: require('...'),
        //stockForGood: require('...'),
        //slotReport: require('...'),

        // MutualSettlement
        //mutualSettlement: require('...'),
        //customerMutualSettlement: require('...')

    });

module.exports = {

    getClientFactory: function (options) {
        options = options || { providers: { } };

        Client.enclose(providerAccessorBehavior(options.providers));

        return Client;
    }
};