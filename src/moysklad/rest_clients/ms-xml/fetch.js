/**
 * fetch
 * Date: 27.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var mixIn = require('mout/mixIn')
    , client_properties = require('client_properties')
    , providerResponseHandler = require('./providerResponseHandler')
    , marshaller = require('jsonix').marshaller;

var requestProvider = require('../../providers/default'),
    endPoint = '/rest/ms/xml' + client_properties.baseUrl;


module.exports = function () {
    this.fetch = function (options, callback) {
        var _authProvider = this.getAuthProvider();

        requestProvider.fetch(mixIn({
            // default
            contentType: 'application/xml',
            headers: 'isAuth' in _authProvider && _authProvider.isAuth() ? {
                Authorization: _authProvider.getBasicAuthHeader() } : {}
        }, {
            // parameters
            method: options.method,
            url: endPoint + options.path,
            payload: marshaller.marshalString(options.payload)
        }), function (err, result) {
            return providerResponseHandler(err, result, callback);
        })
    }
};