/**
 * restClientsAccessor
 * Date: 27.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var factoryesHash = {
    msXml: require('../rest_clients/ms-xml')
};

/** @class */
var RestClientsAccessor = function () {
    var _clients = {};

    var that = this;

    /**
     *
     * @param name
     * @returns {*}
     */
    this.getRestClient = function (name) {

        if (!_clients[name] && factoryesHash[name]) {
            var client = factoryesHash[name].createClient();
            client.setAuthProvider(that);
            _clients[name] = client;
        }

        return _clients[name];
    };
};

module.exports = RestClientsAccessor;
