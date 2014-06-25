/**
 * stock
 * Date: 19.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
  , moment = require('moment')
  , client_properties = require('./../../client-properties')
  , fetchProviderRespHandler = require('./../providerResponseHandler')
  , endPoint = client_properties.baseUrl + '/rest';

//TODO Этот метод во многом повторяет аналогичный fetch из ms-xml (вероятно нужно объединить в один)
var fetch = function (options, callback) {

    var _fetchProvider = require('project/fetch'),
        _log = require('project/logger'),
        query;

    if (options.params) {
        query = '/?' + _.map(options.params, function (value, key) {
            if (value instanceof Date || moment.isMoment(value))
                value = moment(value).format('YYYYMMDDHHmmss');

            return key + '=' + encodeURIComponent(value);
        }).join('&');
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

    _log.time('Fetch from ' + options.service + ' service time');
    _fetchProvider.fetch(fetchOptions, function (err, result) {
        _log.timeEnd('Fetch from ' + options.service + ' service time');
        return fetchProviderRespHandler(err, result, callback);
    });

};

module.exports = fetch;