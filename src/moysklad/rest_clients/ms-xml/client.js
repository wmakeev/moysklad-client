/**
 * client
 * Date: 22.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var stampit = require('stampit')
    , client_properties = require('client_properties')
    , providerResponseHandler = require('./providerResponseHandler')
    , marshaller = require('jsonix').marshaller
    ;

var requestProvider = require('../../providers/default'),
    endPoint = '/rest/ms/xml' + client_properties.baseUrl;

module.exports = stampit()

    // State
    //
    .state({})

    // Properties
    //

    // Fetch
    .enclose(function () {

        var _authProvider;

        this.fetch = function (options, callback) {

            requestProvider.fetch(stampit.extend({
                // default
                contentType: 'application/xml',
                headers: this.isAuth() ? {
                    Authorization: _authProvider.getBasicAuthHeader() } : null
            }, {
                // parameters
                method: options.method,
                url: endPoint + options.path,
                payload: marshaller.marshalString(options.payload)
            }), function (err, result) {
                return providerResponseHandler(err, result, callback);
            })
        }

        // Нужно иметь одну точку получения реквизитов авторизации для всех клиентов,
        // поэтому подмещивать auth в client не удобно. С другой стороны нужно передать
        // возможность получить авторизацию из вне.
        this.setAuthProvider = function (provider) {
            _authProvider = provider;
        }
    })

    // Methods
    //
    .methods({
        get: require('./get'),
        put: require('./put'),
        del: require('./del'),
        // Tools
        getObjectTypeName: function (className) {
            return className.charAt(0).toUpperCase() + className.substring(1);
        }
    });