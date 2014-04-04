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

    // client fetch method (override prototype method) //TODO Будет ли метот в прототипе уже определен на момент инициализации этоого замыкания?
    .enclose(require('./fetch'))

    // Methods
    //
    .methods({

        // add client methods
        get: require('./get'),
        put: require('./put'),
        del: require('./del'),

        // Tools
        getObjectTypeName: function (className) {
            return className.charAt(0).toUpperCase() + className.substring(1);
        }
    });

module.exports = MsXmlClient;