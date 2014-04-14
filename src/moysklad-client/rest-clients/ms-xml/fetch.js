/**
 * fetch
 * Date: 27.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
    , client_properties = require('./client-properties')
    , fetchProviderRespHandler = require('./providerResponseHandler')
    , endPoint = client_properties.baseUrl + '/rest/ms/xml';


module.exports = function () {

    // override prototype method
    this.fetch = function (options, callback) {
        var that = this;

        var _authProvider = this.getProvider('auth'),
            _fetchProvider = this.getProvider('fetch'),
            _marshaller = this.getProvider('marshaller'),
            _log = this.getProvider('logger');

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
            fetchOptions.payload = _marshaller.marshalString(options.payload);

        _log.time('Fetch from service time');
        _fetchProvider.fetch(fetchOptions, function (err, result) {
            _log.timeEnd('Fetch from service time');
            //TODO Может быть сделать bind? ...
            //TODO Внути мне нужен логгер. Как получить к нему доступ? Хорошее ли это решение?
            return fetchProviderRespHandler.call(that, err, result, callback);
        })
    }
};