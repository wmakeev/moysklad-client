/**
 * total
 * Date: 14.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _               = require('lodash')
  , callbackAdapter = require('../../../tools/index').callbackAdapter;

/**
 *
 * @param {String} type Тип сущности
 * @param {Object} query Объект запроса для фильтрации сущностей
 * @param {Function=} callback
 * @returns {Number}
 */
var total = function (type, query, callback) {
    //TODO Ensure
    var restClient = this.getProvider('ms-xml'),
        total = null,
        queryParametersList;

    function _totalFromParts(paramsIndex, cumulativeTotal, callback) {

        if (queryParametersList[paramsIndex]) {
            var _params = _.extend({}, queryParametersList[paramsIndex], { count: 0, start: 0 });

            restClient.load(type, _params, function (err, data) {
                if (err) return callback(err);

                cumulativeTotal += data.obj.total;

                _totalFromParts(++paramsIndex, cumulativeTotal, callback);
            });

        } else {
            callback(null, cumulativeTotal);
        }
    }

    // query
    if (typeof query == 'object' && 'getQueryParameters' in query) {
        queryParametersList = query.getQueryParameters(this.options);

        _totalFromParts(0, 0, function (err, data) {
            total = callbackAdapter(err, data, callback);
        });
    }

    // .. error
    else {
        return callbackAdapter(new TypeError('Incorrect query parameter'), null, callback);
    }

    return total;
};

module.exports = total;