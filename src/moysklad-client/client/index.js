/**
 * Client
 * Date: 25.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
    , stampit = require('stampit')
    , from = require('./from')
    , load = require('./load')
    , createFetch = require('../../tools/fetch')
    , authProvider = require('./authProvider')
    , restClientsAccessor = require('./restClientsAccessor')
    , msXmlClient =  require('../rest_clients/ms-xml')
    , providersAccessor = require('./providersAccessor');

/**
 * @class
 * @augments RestClientsAccessor
 */
var Client = stampit()

    // Auth
    .enclose(authProvider)

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

    //TODO Этот метод выглядит несколько сумбурно. Понятен ли этот код?
    /**
     * @param {{
     *     providers: Object=
     * }} options Client options
     * @returns {Client}
     */
    createClient: function (options) {
        options = options || { providers: {

        } };

        var providers = options.providers;

        // Ms XML client
        providers.msxml = msXmlClient
            .enclose(providersAccessor(options))
            .create();

        // Logger
        if (!providers.logger)
            providers.logger = require('../providers/logger');

        // XML DOM
        if (!providers.xmldom)
            providers.xmldom = require('xmldom');

        // Fetch & XMLHttpRequest
        if (!providers.fetch) {
            if (!providers.xmlhttprequest) {
                providers.fetch = createFetch(require('xmlhttprequest').XMLHttpRequest);
            } else {
                providers.fetch = createFetch(providers.xmlhttprequest.XMLHttpRequest);
            }
        }
        
        // XML JSON procession
        if (!providers.marshaller || !providers.unmarshaller) {
            var jsonixContext = require('../jsonix/context');

            if (!providers.marshaller)
                providers.marshaller = jsonixContext.marshaller;

            if (!providers.unmarshaller)
                providers.unmarshaller = jsonixContext.unmarshaller;
        }

        var client = Client
            //.enclose(restClientsAccessor(options))
            .enclose(providersAccessor(options))
            .create();

        // Auth
        if (!providers.auth)
            providers.auth = client;

        return client;
    }

};