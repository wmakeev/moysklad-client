/**
 * fetch
 * Date: 27.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _                           = require('lodash')
  , client_properties           = require('./../../client-properties')
  , fetchProviderRespHandler    = require('./../providerResponseHandler')
  , endPoint                    = client_properties.baseUrl + '/rest/ms/xml';


var fetch = function (options, callback) {
    var that = this;

    var _fetchProvider  = require('project/fetch')
      , _marshaller     = require('project/marshaller').create()
      , _log            = require('project/logger');

    var fetchOptions = _.extend({
        // default
        contentType: 'application/xml',
        headers: {}
    }, {
        // parameters
        method: options.method,
        url: endPoint + options.path
    });

    if (this.isAuth())
        fetchOptions.headers.Authorization = this.getBasicAuthHeader();

    if (options.payload)
        fetchOptions.payload = _marshaller.marshalString(options.payload);

    _log.time('Fetch from service time');
    _fetchProvider.fetch(fetchOptions, function (err, result) {
        _log.timeEnd('Fetch from service time');
        return fetchProviderRespHandler(err, result, callback);
    });
};

module.exports = fetch;