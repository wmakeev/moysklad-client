/**
 * context
 * Date: 22.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var stampit = require('stampit')
    , from = require('./from')
    , load = require('./load')
    , authProvider = require('./authProvider')
    , restClientsAccessor = require('./restClientsAccessor');

/**
 * @class
 * @augments RestClientsAccessor
 * @augments AuthProvider
 */
var Context = stampit()

    // Auth
    .enclose(authProvider)

    // Rest client accessor (RestClientsAccessor)
    //
    .enclose(restClientsAccessor)

    // Methods
    //
    .methods(
    /**
     * @lends Context.prototype
     */
    {

        // Ms
        from: from,
        load: load

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