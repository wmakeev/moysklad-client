/**
 * fetch
 * Date: 27.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
    , client_properties = require('./client-properties')
    , logger = require('logger')
    , providerResponseHandler = require('./providerResponseHandler')
    , marshaller = require('./jsonixContext').marshaller
    , requestProvider = require('../../providers/default')
    , endPoint = client_properties.baseUrl + '/rest/ms/xml';



module.exports = function () {
    this.fetch = function (options, callback) {
        var _authProvider = this.getAuthProvider();

        var fetchOptions = _.extend({
            // default
            contentType: 'application/xml',
            headers: {}
        }, {
            // parameters
            method: options.method,
            url: endPoint + options.path
        });

        if (_authProvider && _authProvider.isAuth())
            fetchOptions.headers.Authorization = _authProvider.getBasicAuthHeader();

        if (options.payload)
            fetchOptions.payload = marshaller.marshalString(options.payload);

        logger.time('Fetch from service time');
        requestProvider.fetch(fetchOptions, function (err, result) {
            logger.timeEnd('Fetch from service time');
            return providerResponseHandler(err, result, callback);
        })
    }
};