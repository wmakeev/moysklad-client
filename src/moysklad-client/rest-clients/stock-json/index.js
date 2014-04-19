/**
 * stock
 * Date: 19.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var stampit = require('stampit');

var StockJsonClient = stampit()

    // State
    //
    //.state({})

    // Properties
    //

    .enclose(require('./methods/fetch'))

    // Methods
    //
    .methods({

        // add client methods
        stock: require('./methods/stock')

    });

module.exports = function (providerAccessor) {

    //TODO Думаю пока досточно просто скопировать метод без доп. абстракций
    StockJsonClient.state({
        getProvider: providerAccessor.getProvider
    });

    return StockJsonClient
};