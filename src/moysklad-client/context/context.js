/**
 * context
 * Date: 22.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var stampit = require('stampit');

/**
 * @class
 * @augments RestClientsAccessor
 * @augments AuthProvider
 */
var Context = stampit()

    // Auth
    .enclose(require('./authProvider'))

    // Rest client accessor (RestClientsAccessor)
    //
    .enclose(require('./restClientsAccessor'))

    // Methods
    //
    .methods(
    /**
     * @lends Context.prototype
     */
    {

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

module.exports = Context;