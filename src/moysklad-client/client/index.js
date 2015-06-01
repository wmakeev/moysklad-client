/**
 * Client
 * Date: 25.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _                         = require('lodash'),
    stampit                   = require('stampit'),
    Query                     = require('./../rest-clients/ms-xml/query'),
    operators                 = require('./../rest-clients/ms-xml/query/operators'),
    authProviderBehavior      = require('project/behaviors/authProviderBehavior'),
    providerAccessorBehavior  = require('project/behaviors/providerAccessorBehavior'),
    modelBuilder              = require('./model-builder');

/**
 * @lends Client.prototype
 */
var clientMethods = {
    // Ms
    from  : require('./methods/from'),
    load  : require('./methods/load'),
    chain : require('./methods/chain'),
    first : require('./methods/first'),
    total : require('./methods/total'),
    save  : require('./methods/save'),

    // Query
    createQuery: Query.createQuery,

    // LazyLoader
    createLazyLoader:   require('./lazy-loader'),

    loadMetadata: require('./methods/loadMetadata')
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
            flowControl: 'sync',
            baseUrl: 'https://online.moysklad.ru/exchange',
            allowNotFilterOperators: false
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

    // Providers accessor
    .enclose(modelBuilder)

    // Methods
    .methods(clientMethods)
    .methods(jsonServiceMethods)
    .methods(operators);

module.exports = Client;