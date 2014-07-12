/**
 * stock
 * Date: 19.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var stampit = require('stampit');

var stockJsonClient = stampit()

    // Authable
    .enclose(require('./../../../authProviderBehavior'))

    // Methods
    //
    .methods({

        // add client methods
        stock:                          require('./methods/stock'),
        stockForGood:                   require('./methods/stock-for-good'),
        slot:                           require('./methods/slot'),
        mutualSettlement:               require('./methods/mutualSettlement').list,
        mutualSettlementForCustomer:    require('./methods/mutualSettlement').customer,

        fetch:                          require('./methods/fetch')

    });

module.exports = stockJsonClient;

//TODO Написать необходимые Enum'ы