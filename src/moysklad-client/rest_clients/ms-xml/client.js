/**
 * client
 * Date: 22.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var stampit = require('stampit');

module.exports = stampit()

    // State
    //
    .state({})

    // Properties
    //

    // Authable
    .enclose(require('../authable'))

    // Fetch
    .enclose(require('./fetch'))

    // Methods
    //
    .methods({
        get: require('./get'),
        put: require('./put'),
        del: require('./del'),
        // Tools
        getObjectTypeName: function (className) {
            return className.charAt(0).toUpperCase() + className.substring(1);
        }
    });