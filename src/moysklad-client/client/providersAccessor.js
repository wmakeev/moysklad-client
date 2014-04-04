/**
 * providersAccessor
 * Date: 03.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

/** @class */
var ProvidersAccessor = function (providers) {

    return function () {
        var that = this;

        /**
         *
         * @param name
         * @returns {*}
         */
        this.getProvider = function (name) {

            return providers && providers[name] ?
                providers[name] :
                //TODO Динамический require!
                //TODO Размещение require в этом методе неоднозначно. Может быть нужен лишь getter для providers, где уже будут переданы провайдеры по умолчанию, если они не указаны.
                require('../providers/' + name);
        };
    };
};

module.exports = ProvidersAccessor;