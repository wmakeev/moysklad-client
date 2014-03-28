/**
 * context
 * Date: 22.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var stampit = require('stampit');


module.exports = stampit()

    // Auth
    .enclose(require('./authProvider'))

    // Rest client accessor
    //
    .enclose(require('./restClientsAccessor'))

    // Methods
    //
    .methods({

        // Ms
        from: require('./from'),
        load: require('./load'),

        // Stock
        //stockByGood: require('...'),
        //stockByConsignment: require('...'),
        //stockForGood: require('...'),
        //slotReport: require('...'),

        // MutualSettlement
        //mutualSettlement: require('...'),
        //customerMutualSettlement: require('...')

    });