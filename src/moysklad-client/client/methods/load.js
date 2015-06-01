/**
 * load
 * Date: 24.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _               = require('lodash'),
    have            = require('have'),
    callbackAdapter = require('project/tools/callbackAdapter');

//noinspection JSValidateJSDoc,JSCommentMatchesSignature
/**
 * Load. Получает сущность по идентификатору или список сущностей согласно запросу.
 *
 * @param {String} type Тип сущности
 * @param {String|Object} query Идентификатор сущности или запрос для фильтрации
 * @param {Boolean=} [options.fileContent] Опции
 * @param {Function=} [callback]
 * @returns {Object|Object[]}
 */
var load = function (type, query) {
    //TODO Ensure
    var args        = _.toArray(arguments)
      , callback    = typeof args.slice(-1)[0] === 'function' ? args.slice(-1)[0] : null
      , options     = typeof args[2] === 'object' ? args[2] : {}
      , restClient  = this.getProvider('ms-xml')
      , queryParametersList
      , obj;

    function loadPartial(paramsIndex, paging, cumulativeTotal, resultCollection, callback) {

        if (queryParametersList[paramsIndex] && ('count' in paging ? paging.count !== 0 : true)) {
            var _params = _.extend({}, queryParametersList[paramsIndex], paging);

            restClient.get(type, _params, function (err, data) {
                if (err) return callback(err);

                var _collection = data.obj,
                    _length     = _collection.length,
                    _total      = _collection.total;

                if (paging.start) paging.start - _total > 0 ?
                    paging.start -= _total :
                    paging.start = 0;

                if (paging.count) paging.count - _length > 0 ?
                    paging.count -= _length :
                    paging.count = 0;

                cumulativeTotal += _total;
                resultCollection = resultCollection.concat(_collection);

                loadPartial(++paramsIndex, paging, cumulativeTotal, resultCollection, callback);
            });

        } else {
            //TODO Уточнить
            resultCollection.total = cumulativeTotal; // -1 когда нет данных о total
            callback(null, resultCollection);
        }
    }

    if (query instanceof Array)
        query = this.createQuery({}, options).uuids(query);

    // uuid ..
    if (typeof query == 'string') {
        var params = { uuid: query };

        if (options.fileContent) params.fileContent = true;

        restClient.get(type, params, function (err, data) {
            obj = callbackAdapter(err, data.obj, callback);
        });
    }

    // .. или query
    else if (typeof query == 'object' && 'getQueryParameters' in query) {
        //TODO Не забыть про options при написании документации
        queryParametersList = query.getQueryParameters(this.options.filterLimit);

        var paging = {};
        if (queryParametersList[0].start) paging.start = queryParametersList[0].start;
        if (queryParametersList[0].count) paging.count = queryParametersList[0].count;

        loadPartial(0, paging, 0, [], function (err, data) {
            obj = callbackAdapter(err, data, callback);
        });
    }

    // .. ошибка
    else {
        return callbackAdapter(new TypeError('Incorrect uuid or query parameter'), null, callback);
    }

    return obj;
};

module.exports = load;