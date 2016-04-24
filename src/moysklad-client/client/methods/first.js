/**
 * first
 * Date: 14.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _               = require('lodash'),
    CallbackAdapter = require('project/callback-adapter');

/**
 * First. Возвращает первую сущность из списка сущностей согласно запросу.
 *
 * @param {String} type Тип сущности
 * @param {Object} query Объект запроса для фильтрации сущностей
 * @param {Function=} callback
 * @returns {Object}
 */
var first = function (type, query, callback) {
    //TODO Ensure
    var that = this;
    var _restClient = this.getProvider('ms-xml'),
        _obj = null,
        _queryParametersList;

    var callbackAdapter = new CallbackAdapter(that.options.flowControl, callback)

    function _firstFromParts (paramsIndex, callback) {
        var _params = _queryParametersList[paramsIndex];

        if (_params && ('count' in _params ? _params.count !== 0 : true)) {
            _restClient.get(type, _.extend({}, _params, { count: 1 }), function (err, data) {
                if (err) return callback(err);

                if (data.obj.length > 0) {
                    return callback(null, data.obj[0]);

                } else {
                    _firstFromParts(++paramsIndex, callback)
                }
            });
        } else {
            return callback(null, null);
        }
    }

    // query
    if (typeof query === 'object' && 'getQueryParameters' in query) {
        _queryParametersList = query.getQueryParameters(this.options.filterLimit);
    }

    //TODO Ничего не мешеает использовать first без query
    // .. ошибка
    else {
        return callbackAdapter(new TypeError('Incorrect query parameter'),
            null, callback, that.options.flowControl);
    }

    _firstFromParts(0, function (err, data) {
        _obj = callbackAdapter(err, data, callback, that.options.flowControl);
    });

    return _obj;
};

module.exports = first;
