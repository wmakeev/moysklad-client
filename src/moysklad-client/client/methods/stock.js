/**
 * stock
 * Date: 19.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
  , callbackAdapter = require('../../../tools/index').callbackAdapter;


var stock = function () {
    var args        = _.toArray(arguments)
      , callback    = typeof args.slice(-1)[0] === 'function' ? args.slice(-1)[0] : null
      , options     = typeof args[0] === 'object' ? args[0] : {}
      , _restClient = this.getProvider('json-services')
      , _obj        = null;

    _restClient.stock(options, function (err, data) {
        _obj = callbackAdapter(err, data.obj, callback);
    });

    return _obj;
};

module.exports = stock;