/**
 * Client
 * Date: 25.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _                        = require('lodash'),
    stampit                  = require('stampit'),
    Query                    = require('./../rest-clients/ms-xml/query'),
    operators                = require('./../rest-clients/ms-xml/query/operators'),
    authProviderBehavior     = require('./../../authProviderBehavior'),
    providerAccessorBehavior = require('./../../providerAccessorBehavior'),
    env                      = require('project/env'),
    envTypes                 = require('project/envTypes');

var clientMethods = {
    // Ms
    from: require('./methods/from'),
    load: require('./methods/load'),
    chain: require('./methods/chain'),
    first: require('./methods/first'),
    total: require('./methods/total'),
    save: require('./methods/save'),
    del: require('./methods/del'),
    // Query
    createQuery: Query.createQuery,

    // LazyLoader
    createLazyLoader: require('./lazy-loader')
};

var jsonServiceMethods = require('./methods/json-service');

/**
 * @class Client
 */
var Client = stampit()

// Options
    .state({
        options: {
            filterLimit: env === envTypes.GOOGLE_SCRIPT ? 30 : 50,
            flowControl: env === envTypes.NODE ? 'async' : 'sync'
        },

        sortMode: {
            ASC: 'asc',
            DESC: 'desc'
        }
    })

    // Auth
    .enclose(authProviderBehavior)

    // Providers accessor
    .enclose(providerAccessorBehavior)

    // Methods
    //
    .methods(clientMethods)
    .methods(jsonServiceMethods)
    .methods(operators);

module.exports = Client;
