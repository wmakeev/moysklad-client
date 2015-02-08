/**
 * load
 * Date: 24.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var cbAdapter = require('../../../tools/index').callbackAdapter
  , _         = require('lodash')
  , have      = require('have2');

var queryParams, restClient;

/**
 * Загружает сущности для массива запросов в queryParamsCollection.
 * Получение коллекции сущностей может быть разбито на несколько
 * независимых запросов представленных в массиве queryParamsCollection (сформирован
 * в Query).
 *
 * @param partIndex Индекс текущей части запроса
 * @param paging Настройки пейджинга. Т.к. на момент формирования параметров для каждой
 * части запроса нельзя знать кол-во записей которые будут получены, то пейджингом управляем
 * по факту получения данных в текущей функции. Иными словами, конфигурация пейджинга для
 * очередной части запроса зависит от результатов получения данных предыдущей частью запроса.
 * @param resultCollection Коллекция накапливающая записи полученные для каждой части запроса
 * @param cb
 */
function loadPart(partIndex, paging, resultCollection, cb) {
    // queryParamsCollection и restClient - переменные уровня модуля
    if (queryParams[partIndex] && ('count' in paging ? paging.count !== 0 : true)) {
        var _params = _.extend({}, queryParams[partIndex], paging);
        restClient.load(type, _params, function (err, data) {
            if (err) return cb(err);

            var _collection = data.obj
              , _length     = _collection.length
              , _total      = _collection.total;

            // Настраиваем пейджинг для следующей части запроса
            if (paging.start) paging.start - _total > 0
                ? paging.start -= _total
                : paging.start = 0;

            if (paging.count) paging.count - _length > 0
                ? paging.count -= _length
                : paging.count = 0;

            resultCollection = resultCollection.concat(_collection);
            resultCollection.total = total + _total;

            loadPart(++partIndex, paging, resultCollection, cb);
        });

    } else {
        resultCollection.total = total; // -1 когда нет данных о total
        cb(null, resultCollection);
    }
}

/**
 * Load. Получает сущность по идентификатору или список сущностей согласно запросу.
 *
 * @param {String=} type Тип сущности
 * @param {String|Array|Object} query Идентификатор сущности или запрос для фильтрации
 * @param {Boolean=} [options.fileContent] Опции
 * @param {Function=} [cb]
 * @returns {Object|Object[]}
 */
var load = function () {
    var args = have(arguments, {
        type    : 'opt str'
      , query   : 'str or str arr or obj'
      , options : 'opt obj'
      , cb      : 'opt func'
    });

    var type    = args.type
      , query   = args.query
      , options = args.options || {}
      , cb      = args.cb
      , obj     = null;

    restClient  = this.getProvider('ms-xml');

    // array ..
    if (query instanceof Array)
        query = this.createQuery({}, options).uuids(query);

    // uuid ..
    if (typeof query == 'string') {
        var params = { uuid: query };
        if (options.fileContent) params.fileContent = true;

        restClient.load(type, params, function (err, data) {
            obj = cbAdapter(err, data.obj, cb);
        });
    }

    // .. или query
    else if (typeof query == 'object' && 'getQueryParameters' in query) {
        queryParams = query.getQueryParameters(this.options);

        var paging = {};
        if (queryParams[0].start) paging.start = queryParams[0].start;
        if (queryParams[0].count) paging.count = queryParams[0].count;

        loadPart(0, paging, [], function (err, data) {
            obj = cbAdapter(err, data, cb);
        });
    }

    // .. ошибка
    else {
        return cbAdapter(new TypeError('Incorrect uuid or query parameter'), null, cb);
    }

    return obj;
};

module.exports = load;