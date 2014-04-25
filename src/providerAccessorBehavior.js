/**
 * providerAccessor
 * Date: 03.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var requireNodeProvider = function (name) {
    return require('./providers/' + name);
};

var BUNDLED = BUNDLED || false;

// Механизм require будет отличатся в зависимости от того работает ли код в сборке или нет.
var requireProvider = BUNDLED ? require : requireNodeProvider;

/** @class */
var ProviderAccessor = function (providers) {
    providers = providers || {};

    return function () {

        this.getProvider = function (name) {

            if (!providers[name]) {
                var provider = requireProvider(name);

                if (typeof provider == 'function')
                    // factory
                    providers[name] = provider.call(this);

                else if (typeof provider == 'object')
                    providers[name] = provider;

                else
                    //TODO Нужна ли при отсутствии провайдера ошибка?
                    //throw new Error('Provider [' + name + '] not found.');
                    return null;
            }

            return providers[name];
        };

        this.addProvider = function (name, provider) {

            if (name && provider) providers[name] = provider;
            return this;
        }
    };
};

module.exports = ProviderAccessor;