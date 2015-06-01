/**
 * fetch
 * Date: 27.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');

var fetch = function (options, callback) {
    var that = this;

    var fetchProvider  = this.getProvider('fetch')
      , marshaller     = this.getProvider('marshaller')
      , log            = this.getProvider('logger');

    var fetchOptions = _.extend({
        // default
        contentType: 'application/xml',
        headers: {},
        async: this.options.flowControl === 'async'
    }, {
        // parameters
        method: options.method,
        url: that.options.baseUrl + '/rest/ms/xml' + options.path
    });

    if (this.isAuth())
        fetchOptions.headers.Authorization = this.getBasicAuthHeader();

    if (options.payload)
        fetchOptions.payload = marshaller.marshalString(options.payload);

    fetchProvider.fetch(fetchOptions, function (err, result) {
        return that.responseHandler(err, result, callback);
    });
};

module.exports = fetch;