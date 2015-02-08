/**
 * index
 * Date: 24.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var stampit = require('stampit');

var msXmlClient = stampit()

    // Methods
    .methods({

        // Methods
        load  : require('./methods/load'),
        save  : require('./methods/save'),
        del   : require('./methods/del'),
        fetch : require('./methods/fetch'),

        // Tools
        getObjectTypeName: function (className) {
            if (className.indexOf('.') != -1) className = className.split('.')[1];
            return className.charAt(0).toUpperCase() + className.substring(1);
        },

        responseHandler: require('./providerResponseHandler')
    });

module.exports = msXmlClient;