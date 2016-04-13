/**
 * Client
 * Date: 25.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _                = require('lodash'),
    stampit          = require('stampit'),
    Query            = require('./../rest-clients/ms-xml/query'),
    operators        = require('./../rest-clients/ms-xml/query/operators'),
    authBehavior     = require('./../../authBehavior'),
    providerBehavior = require('./../../providerBehavior');

/**
 * @lends Client.prototype
 */
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
            filterLimit: 50,
            allowNotFilterOperators: false,
            flowControl: 'sync'
        },

        sortMode: {
            ASC: 'asc',
            DESC: 'desc'
        }
    })

    // Auth
    .enclose(authBehavior)

    // Providers accessor
    .enclose(providerBehavior)

    // Methods
    //
    .methods(clientMethods)
    .methods(jsonServiceMethods)
    .methods(operators);

module.exports = Client;
