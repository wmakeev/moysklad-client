/**
 * MoyskladClient
 * Date: 11.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var clientStamp = require('./client'),
    query  = require('./rest-clients/ms-xml/query'),
    tools  = require('project/tools'),
    logger = require('project/logger'),
    Auth   = require('project/auth'),
    pkg    = require('../../package');

var xmlClientStamp = require('../rest-clients/ms-xml'),
    jsonServicesClientStamp = require('../rest-clients/json');

logger.info('moysklad-client v' + pkg.version);

module.exports = {

    createClient: function (login, password) {
        var auth = new Auth(login, password);

        var client = clientStamp();
        client.setAuthStore(auth);

        var xmlClient = xmlClientStamp();
        xmlClient.setAuthStore(auth);
        xmlClient.setProvider('logger', logger);
        xmlClient.options = client.options;

        var jsonServicesClient = jsonServicesClientStamp();
        jsonServicesClient.setAuthStore(auth);
        jsonServicesClient.setProvider('logger', logger);
        jsonServicesClient.options = client.options;

        client.setProvider('ms-xml', xmlClient);
        client.setProvider('json-services', jsonServicesClient);
        client.setProvider('logger', logger);

        return client;
    },

    createQuery: query.createQuery,
    tools: tools,
    logger: logger,
    version: pkg.version
};
