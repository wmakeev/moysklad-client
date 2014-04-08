/**
 * load
 * Date: 24.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var callbackAdapter = require('../../tools').callbackAdapter
    , _ = require('lodash');

/**
 * Load. Получает сущность по идентификатору или список сущностей согласно запросу.
 * @param {String} type Тип сущности
 * @param {String|Object} query Идентификатор сущности или запрос для фильтрации
 * @param {Boolean} [options.fileContent] Опции
 * @param {Function} [callback]
 * @returns {Object|Object[]}
 */
module.exports = function (type, query) {
    //TODO Ensure
    var args = _.toArray(arguments),
        params = {},
        callback = typeof args.slice(-1)[0] === 'function' ? args.slice(-1)[0] : null;

    // uuid ..
    if (typeof query == 'string') {
        params.uuid = query;
        // options (fileContent)
        if (typeof args[2] === 'object') _.extend(params, args[2]);
    }
    // .. или query
    else if (typeof query == 'object' && 'getQueryParameters' in query) {
        _.extend(params, query.getQueryParameters());
    }
    // .. ошибка
    else {
        return callbackAdapter(new TypeError('Incorrect query parameter'), null, callback);
    }

    var restClient = this.getProvider('msxml'),
        obj = null;

    restClient.get(type, params, function (err, data) {
        obj = callbackAdapter(err, data.obj, callback);
    });

    return obj;
};
