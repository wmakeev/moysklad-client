/**
 * json-service
 * Date: 24.06.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash'), 
    callbackAdapter = require('project/callbackAdapter');

//TODO Вероятно нужно перенести этот модуль в rest-clients/json (для целостности пониманя работы модуля)

var callService = function (serviceName) {
    var that        = this,
        args        = _.toArray(arguments), 
        callback    = typeof args.slice(-1)[0] === 'function' ? args.slice(-1)[0] : null, 
        _restClient = this.getProvider('json-services'), 
        _obj        = null;

    var serviceArgs = args.slice(1, args.length - (callback ? 1 : 0));

    serviceArgs.push(function (err, data) {
        _obj = callbackAdapter(err, data.obj, callback, that.options.flowControl);
    });

    _restClient[serviceName].apply(_restClient, serviceArgs);

    return _obj;
};

[
    'stock',
    'stockForGood',
    'slot',
    'mutualSettlement',
    'mutualSettlementForCustomer'

].forEach(function (serviceName) {
    module.exports[serviceName] = function () {
        return callService.apply(this,
            [serviceName].concat(Array.prototype.slice.call(arguments, 0)));
    }
});

