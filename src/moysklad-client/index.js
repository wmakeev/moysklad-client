/**
 * MoyskladClient
 * Date: 11.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _             = require('lodash'),
    have          = require('have'),
    pkg           = require('../../package'),
    client        = require('./client'),
    logger        = require('project/logger'),
    tools         = require('project/tools'),
    fetchProvider = require('project/fetch'),
    query         = require('./rest-clients/ms-xml/query'),
    xmlClient     = require('./rest-clients/ms-xml'),
    jsonServices  = require('./rest-clients/json');


logger.info('moysklad-client v' + pkg.version);

module.exports = {

    createClient: function () {
        var args = have(arguments, {
            login   : 'optional string',
            password: 'optional string',
            options : 'optional object'
        });

        var clientInstance = client();

        if (args.options)
            _.extend(clientInstance.options, args.options);

        if (args.login && args.password)
            clientInstance.setAuth(args.login, args.password);

        var providers = {
            'fetch'         : fetchProvider,
            'marshaller'    : clientInstance.context.createMarshaller(),
            'unmarshaller'  : clientInstance.context.createUnmarshaller(),
            'logger'        : logger
        };

        xmlClientInstance = xmlClient().setProvider(providers);
        _.extend(xmlClientInstance.options, clientInstance.options);

        jsonServicesInstance = jsonServices().setProvider(providers);
        _.extend(jsonServicesInstance.options, clientInstance.options);

        clientInstance
            .setProvider('ms-xml', xmlClientInstance)
            .setProvider('json-services', jsonServicesInstance);

        return clientInstance;
    },

    createQuery: query.createQuery,

    tools: tools,
    logger: logger,
    version: pkg.version
};