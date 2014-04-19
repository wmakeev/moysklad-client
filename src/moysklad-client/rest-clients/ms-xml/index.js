/**
 * index
 * Date: 24.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var stampit = require('stampit');

var MsXmlClient = stampit()

    // State
    //
    //.state({})

    // Properties
    //

    // Authable
    //.enclose(require('../authable'))

    // client fetch method (override prototype method)
    .enclose(require('./methods/fetch')) //TODO Убрать?

    // Methods
    //
    .methods({

        // add client methods
        get: require('./methods/get'),
        put: require('./methods/put'),
        del: require('./methods/del'),

        // Tools
        getObjectTypeName: function (className) {
            return className.charAt(0).toUpperCase() + className.substring(1);
        }
    });

module.exports = function (providerAccessor) {

    //TODO Думаю пока досточно просто скопировать метод без доп. абстракций
    MsXmlClient.state({
        getProvider: providerAccessor.getProvider
    });

    return MsXmlClient
};