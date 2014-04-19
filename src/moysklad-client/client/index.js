/**
 * Client
 * Date: 25.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _                           = require('lodash')
    , stampit                   = require('stampit')
    , Query                     = require('./../rest-clients/ms-xml/query')
    , operators                 = require('./../rest-clients/ms-xml/query/operators')
    , authProviderBehavior      = require('./authProviderBehavior')
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
    createLazyLoader: require('./lazy-loader')
};

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
    .methods(clientMethods)
    .methods(operators);

module.exports = {

    getClientFactory: function (options) {
        options = _.defaults(options, {
            providers: {},
            filterLimit: 50,
            allowNotFilterOperators: false
        });

        Client
            .state({ options: _.omit(options, 'providers') })
            .enclose(providerAccessorBehavior(options.providers));

        return Client;
    }
};