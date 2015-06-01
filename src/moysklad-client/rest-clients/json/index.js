/**
 * stock
 * Date: 19.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var stampit                  = require('stampit'),
    authProviderBehavior     = require('project/behaviors/authProviderBehavior'),
    providerAccessorBehavior = require('project/behaviors/providerAccessorBehavior');

var stockJsonClient = stampit()

    .state({ options: {} })

    // Authable
    .enclose(authProviderBehavior)

    // Provider accessor
    .enclose(providerAccessorBehavior)

    // Methods
    //
    .methods({

        // add client methods
        stock                       : require('./methods/stock'),
        slot                        : require('./methods/slot'),
        mutualSettlement            : require('./methods/mutualSettlement').list,
        mutualSettlementForCustomer : require('./methods/mutualSettlement').customer,

        fetch                       : require('./methods/fetch'),
        responseHandler             : require('./methods/responseHandler')
    });

module.exports = stockJsonClient;

//TODO Написать необходимые Enum'ы