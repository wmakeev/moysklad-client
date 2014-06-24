/**
 * load
 * Date: 24.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var callbackAdapter = require('../../../tools/index').callbackAdapter
  , _ = require('lodash');

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
    var args = _.toArray(arguments)
      , callback = typeof args.slice(-1)[0] === 'function' ? args.slice(-1)[0] : null
      , _queryParametersList
      , _restClient = this.getProvider('ms-xml')
      , _obj = null;

    function loadPartial(paramsIndex, paging, cumulativeTotal, resultCollection, callback) {

        if (_queryParametersList[paramsIndex] && ('count' in paging ? paging.count !== 0 : true)) {
            var _params = _.extend({}, _queryParametersList[paramsIndex], paging);

            _restClient.get(type, _params, function (err, data) {
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

    //TODO Обработать [ uuid ] массив идентификаторов (преобразовать в query)

    // uuid ..
    if (typeof query == 'string') {
        var params = { uuid: query };

        // options (fileContent)
        if (args[2] && 'fileContent' in args[2])
            if (params.fileContent || args[2].fileContent)
                params.fileContent = args[2].fileContent;

        // loadPartial?

        _restClient.get(type, params, function (err, data) {
            _obj = callbackAdapter(err, data.obj, callback);
        });
    }

    // .. или query
    else if (typeof query == 'object' && 'getQueryParameters' in query) {
        //TODO Не забыть про options при написании документации
        _queryParametersList = query.getQueryParameters(this.options.filterLimit);

        var paging = {};
        if (_queryParametersList[0].start) paging.start = _queryParametersList[0].start;
        if (_queryParametersList[0].count) paging.count = _queryParametersList[0].count;

        loadPartial(0, paging, 0, [], function (err, data) {
            _obj = callbackAdapter(err, data, callback);
        });
    }

    // .. ошибка
    else {
        return callbackAdapter(new TypeError('Incorrect query parameter'), null, callback);
    }

    return _obj;
};

module.exports = load;