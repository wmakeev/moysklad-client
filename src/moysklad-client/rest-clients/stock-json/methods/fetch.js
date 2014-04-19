/**
 * stock
 * Date: 19.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
    , client_properties = require('./../../client-properties')
    , fetchProviderRespHandler = require('./../providerResponseHandler')
    , endPoint = client_properties.baseUrl + '/rest';

//TODO Этот метод во многом повторяет аналогичный fetch из ms-xml (вероятно нужно объединитьв один)
var fetch = function () {

    // override prototype method
    this.fetch = function (options, callback) {
        var that = this;

        var _authProvider = this.getProvider('auth'),
            _fetchProvider = this.getProvider('fetch'),
            _log = this.getProvider('logger');

        var fetchOptions = _.extend({
            // default
            contentType: 'application/json',
            headers: {}
        }, {
            // parameters
            method: 'GET',
            url: endPoint + '/' + options.service + '/json' + options.path
        });

        if (_authProvider && _authProvider.isAuth())
            fetchOptions.headers.Authorization = _authProvider.getBasicAuthHeader();

        _log.time('Fetch from ' + options.service + ' service time');
        _fetchProvider.fetch(fetchOptions, function (err, result) {
            _log.timeEnd('Fetch from ' + options.service + ' service time');
            //TODO Может быть сделать bind? ...
            //TODO Внути мне нужен логгер. Как получить к нему доступ? Хорошее ли это решение?
            return fetchProviderRespHandler.call(that, err, result, callback);
        });
    }
};

module.exports = fetch;