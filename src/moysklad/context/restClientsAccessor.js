/**
 * restClientsAccessor
 * Date: 27.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var factoryesHash = {
    msXml: require('../rest_clients/ms-xml')
};

module.exports = function () {
    var _clients = {};

    var that = this;

    this.getRestClient = function (name) {

        if (!_clients[name] && factoryesHash[name]) {
            var client = factoryesHash[name].createClient();
            client.setAuthProvider(that);
            _clients[name] = client;
        }

        return _clients[name];
    };
}
