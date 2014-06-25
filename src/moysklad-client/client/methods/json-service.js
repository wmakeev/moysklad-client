/**
 * json-service
 * Date: 24.06.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
    , callbackAdapter = require('../../../tools/index').callbackAdapter;


var callService = function () {
    var args        = _.toArray(arguments)
      , callback    = typeof args.slice(-1)[0] === 'function' ? args.slice(-1)[0] : null
      , serviceName = args[0]
      , options     = typeof args[1] === 'object' ? args[1] : {}
      , _restClient = this.getProvider('json-services')
      , _obj        = null;

    _restClient[serviceName](options, function (err, data) {
        _obj = callbackAdapter(err, data.obj, callback);
    });

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

