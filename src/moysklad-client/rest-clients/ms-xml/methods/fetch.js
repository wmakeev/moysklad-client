/**
 * fetch
 * Date: 27.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _                        = require('lodash'),
    clientProperties         = require('./../../client-properties'),
    fetchProviderRespHandler = require('./../providerResponseHandler'),
    endPoint                 = clientProperties.baseUrl + '/rest/ms/xml';


module.exports = function fetch (options, callback) {
    var _fetchProvider = require('project/fetch'),
        _marshaller    = require('project/marshaller').create();

    var fetchOptions = _.extend({
        // default
        contentType: 'application/xml',
        headers: {},
        async: this.options.flowControl === 'async'
    }, {
        // parameters
        method: options.method,
        url: endPoint + options.path
    });

    if (options.payload) {
        fetchOptions.payload = _marshaller.marshalString(options.payload);
    }

    if (this.isAuth()) {
        fetchOptions.headers.Authorization = this.getBasicAuthHeader();
    }

    _fetchProvider.fetch(fetchOptions, function (err, result) {
        return fetchProviderRespHandler(err, result, callback);
    });
};
