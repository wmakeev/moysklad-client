/**
 * fetch
 * Date: 19.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _                        = require('lodash'),
    moment                   = require('moment'),
    clientProperties         = require('./../../client-properties'),
    callbackAdapter          = require('project/callbackAdapter'),
    fetchProviderRespHandler = require('./../providerResponseHandler'),
    endPoint                 = clientProperties.baseUrl + '/rest';

module.exports = function fetch (options, callback) {
    var that = this,
        _fetchProvider = require('project/fetch'),
        queryString;

    if (options.params) {
        queryString = _.reduce(options.params, function (result, value, key) {
            var itemValues = value instanceof Array ? value : [value];

            itemValues.forEach(function (itemValue) {
                if (itemValue instanceof Date || moment.isMoment(itemValue))
                    itemValue = moment(itemValue).format('YYYYMMDDHHmmss');

                result.push(key + '=' + encodeURIComponent(itemValue));
            });

            return result;
        }, []).join('&');

        queryString = queryString ? '/?' + queryString : null;
    }

    var fetchOptions = _.extend({
        // default
        contentType: 'application/json',
        headers: {},
        async: this.options.flowControl === 'async'
    }, {
        // parameters
        method: 'GET',
        url: endPoint + '/' + options.service + '/json' + (options.path || '') + (queryString || '')
    });

    if (this.isAuth()) {
        fetchOptions.headers.Authorization = this.getBasicAuthHeader();
    }

    _fetchProvider.fetch(fetchOptions, function (err, result) {
        return fetchProviderRespHandler(err, result, callback);
    });
};
