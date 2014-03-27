/**
 * load
 * Date: 24.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var callbackAdapter = require('tools').callbackAdapter;

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
        callback = typeof _.last(args) === 'function' ? _.last(args) : null;

    // uuid ..
    if (typeof query == 'string')
        params.uuid = query;

    // .. или query
    else if (typeof query == 'object' && 'getUrlParams' in query)
        _.extend(params, query.getUrlParams());

    // options
    if (typeof args[2] === 'object')
        _.extend(params, args[2]);

    var restClient = this.getRestClient('msXml'),
        result = null;

    restClient.get(type, params, function (err, data) {
        result = callbackAdapter(err, data, callback);
    });

    return result;
}