/**
 * fetch
 * Date: 27.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _                 = require('lodash')
  , fetchProvider     = require('project/fetch');


var fetch = function (options, callback) {
    var that     = this
      , endPoint = this.options.baseUrl + '/rest/ms/xml';

    var _marshaller = this.getProvider('marshaller');

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

    fetchProvider.fetch(fetchOptions, function (err, result) {
        return that.responseHandler(err, result, callback);
    });
};

module.exports = fetch;