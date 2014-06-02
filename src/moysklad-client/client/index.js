/**
 * Client
 * Date: 25.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _                           = require('lodash')
    , stampit                   = require('stampit')
    , Query                     = require('./../rest-clients/ms-xml/query')
    , operators                 = require('./../rest-clients/ms-xml/query/operators')
    , authProviderBehavior      = require('./../../authProviderBehavior')
    , providerAccessorBehavior  = require('./../../providerAccessorBehavior');

/**
 * @lends Client.prototype
 */
var clientMethods = {
    // Ms
    from:   require('./methods/from'),
    load:   require('./methods/load'),
    first:  require('./methods/first'),
    total:  require('./methods/total'),
    save:   require('./methods/save'),

    // Stock
    stock:  require('./methods/stock'),
    //stockByConsignment: require('...'),
    //stockForGood: require('...'),
    //slotReport: require('...'),

    // MutualSettlement
    //mutualSettlement: require('...'),
    //customerMutualSettlement: require('...')

    // Query
    createQuery: Query.createQuery,

    // LazyLoader
    createLazyLoader:   require('./lazy-loader'),
    
    // Helpers
    instanceOf:         require('./methods/instanceOf'),
    getAttributeValue:  require('./methods/getAttributeValue'),
    getPositions:       require('./methods/getPositions')
};

/**
 * @class Client
 */
var Client = stampit()

    // Options
    .state({
        options: {
            filterLimit: 50,
            allowNotFilterOperators: false
        }
    })

    // Auth
    .enclose(authProviderBehavior)

    // Providers accessor
    .enclose(providerAccessorBehavior)

    // Rest client accessor (RestClientsAccessor)
    //
    //.enclose(restClientsAccessor)

    // Methods
    //
    .methods(clientMethods)
    .methods(operators);

module.exports = Client;