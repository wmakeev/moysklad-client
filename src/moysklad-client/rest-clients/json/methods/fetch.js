/**
 * stock
 * Date: 19.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _                           = require('lodash')
  , moment                      = require('moment')
  , fetchProviderRespHandler    = require('./../providerResponseHandler')
  , fetchProvider               = require('project/fetch');

var fetch = function (options, callback) {
    var that            = this,
        clientOptions   = this.options || {};

    var endPoint = this.options.baseUrl + '/rest'
      , query;

    if (options.params) {
        query = _.reduce(options.params, function (result, value, key) {
            var itemValues = value instanceof Array ? value : [value];

            _.forEach(itemValues, function (itemValue) {
                if (itemValue instanceof Date || moment.isMoment(itemValue)) {
                    itemValue = moment(itemValue);
                    if (clientOptions.serverTimezone) itemValue.zone(clientOptions.serverTimezone);
                    itemValue = itemValue.format('YYYYMMDDHHmmss');
                }
                result.push(key + '=' + encodeURIComponent(itemValue));
            });

            return result;
        }, []).join('&');

        query = query ? '/?' + query : null;
    }

    var fetchOptions = _.extend({
        // default
        contentType: 'application/json',
        headers: {}
    }, {
        // parameters
        method: 'GET',
        url: endPoint + '/' + options.service + '/json' + (options.path || '') + (query || '')
    });

    if (this.isAuth())
        fetchOptions.headers.Authorization = this.getBasicAuthHeader();

    fetchProvider.fetch(fetchOptions, function (err, result) {
        return fetchProviderRespHandler(err, result, callback);
    });
};

module.exports = fetch;