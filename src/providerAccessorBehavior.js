/**
 * providerAccessor
 * Date: 03.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _defaultProvidersCtors = {
    // Получаю модули не динамически, иначе сборщик не увидит модуль
    'ms-xml'        : require('./moysklad-client/rest-clients/ms-xml'),
    'json-services' : require('./moysklad-client/rest-clients/json'),
    'mapping'       : require('project/mapping'),
    'marshaller'    : require('project/marshaller')
};

var getProviderCtor = function (name) {
    return _defaultProvidersCtors[name];
};

/** @class */
var ProviderAccessor = function () {
    var _providers = {};

    this.getProvider = function (name) {

        if (!_providers[name]) {
            var providerCtor = getProviderCtor(name);

            //TODO Не думаю что в таком виде это хорошее решение с .create(this)
            if (typeof providerCtor == 'function')
                _providers[name] = providerCtor.create(this);

            //TODO Переделать на код ниже
            /*methods.forEach(function (methodName) {
                receiver[methodName] = function () {
                    return toProvider[methodName].apply(toProvider, arguments);
                };
            });*/

            else if (typeof providerCtor == 'object')
                _providers[name] = providerCtor;

            else
                return null;
        }

        return _providers[name];
    };

    this.getProviders = function () {
        return _providers;
    };

    this.setProvider = function (name, providerCtor) {
        if (name && provider) _defaultProvidersCtors[name] = providerCtor;
        return this;
    };

    // TODO Удалить
    /*if (arguments[0] && arguments[0].getProviders) {
        // копируем ссылку на объект
        _providers = arguments[0].getProviders();

        if (arguments[0].options)
            this.options = arguments[0].options;
    }*/
};

module.exports = ProviderAccessor;