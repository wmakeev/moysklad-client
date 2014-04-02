/**
 * Moysklad.Context
 * Date: 11.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var ObjectModel = require('./object-model'),
    _ = require('lodash');

var logger = require('logger');

//var Logger = new (require('../adapters/logger').GSLogger)('Client');

// Client
module.exports = function() {
    var contextUser = null;
    var contextPassword = null;
    if(arguments.length == 2 && typeof(arguments[0]) == 'string') {
        contextUser = arguments[0];
        contextPassword = arguments[1];
    } else if (arguments.length == 0) {
        //TODO: Убрать привязку к Google Script (сделано для удобства). Возможно реализовать через что-либо вроде плагина
        contextUser = UserProperties.getProperty("Moysklad.Login");
        contextPassword = UserProperties.getProperty("Moysklad.Password");
    }

    var fluentContext = function() {
        var _type = arguments[0];
        if(!(_type && _.any(ObjectModel, function(item) {return item === _type;}))) throw new Error('Context(): Не корректно указан тип контекста');

        var _client = require('./rest_clients/rest.ms.xml').createClient();
        var _params = {};
        var _filter = [];
        //var _auth = {};

        function auth(user, password) {
            //_auth.user = user;
            //_auth.password = password;
            _client.basicAuth(user, password);
            return pub;
        }

        function filter() {
            //TODO Проверять, что параметры фильтра в комплексе адекватны
            //TODO Переделать способ передачи параметров {id:['ssdfsd','sfsdfsdf'], 'updated>':date, ...}
            //TODO Последовательность звеньев filter добавляет одноименные элементы к фильтру, а если надо заменить?
            //TODO Проверить на существование фильтруемого св-ва в объекте контекста (иначе сервер не вернет ответ)
            if(arguments.length > 1) {
                // name, value
                //TODO Реализовать обработку оператора сравнения
                var tmp = {};
                tmp[arguments[0]] = arguments[1];
                _filter.push(tmp);
            } else if (arguments.length == 1 && arguments[0] instanceof Array) {
                // [{name:value}]
                _filter = _filter.concat(arguments[0]);
            } else if (arguments.length == 0) {
                return _filter;
            } else {
                throw new Error('filter: несоответствующие входящие параметры');
            }
            return pub;
        }

        // *** selectors ***

        function start() {
            if(arguments.length == 1 && typeof(arguments[0]) == 'number') {
                _params['start'] = arguments[0];
            } else if (arguments.length == 0) {
                return _params['start'] || 0;
            } else {
                throw new Error('start: несоответствующие входящие параметры');
            }
            return pub;
        }

        function count() {
            if(arguments.length == 1 && typeof(arguments[0]) == 'number') {
                _params['count'] = arguments[0];
            } else if (arguments.length == 0) {
                return _params['count'] || Infinity;
            } else {
                throw new Error('count: несоответствующие входящие параметры');
            }
            return pub;
        }

        function sort() {
            if(arguments.length == 1 && typeof(arguments[0]) == 'string') {
                _params['sort'] = arguments[0];
            } else if (arguments.length == 2) {
                _params['sort'] = arguments[0];
                _params['sortMode'] = arguments[1];
            } else if (arguments.length == 1 && typeof(arguments[0]) == 'object') {
                _params['sort'] = arguments[0]['by'];
                if (arguments[1]) _params['sortMode'] = arguments[0]['sortMode'];
            } else if (arguments.length == 0) {
                return _params['sort'];
            } else {
                throw new Error('sort: несоответствующие входящие параметры');
            }
            return pub;
        }

        function sortMode() {
            if(arguments.length == 1 && typeof(arguments[0]) == 'string') {
                _params['sortMode'] = arguments[0];
            } else if (arguments.length == 0) {
                return _params['sortMode'];
            } else {
                throw new Error('sortMode: несоответствующие входящие параметры');
            }
            return pub;
        }

        function showArchived() {
            if(arguments.length == 1 && typeof(arguments[0]) == 'boolean') {
                _params['showArchived'] = arguments[0];
            } else if (arguments.length == 0) {
                return _params['showArchived'];
            } else {
                throw new Error('showArchived: несоответствующие входящие параметры');
            }
            return pub;
        }

        function fileContent() {
            if(arguments.length == 1 && typeof(arguments[0]) == 'boolean') {
                _params['fileContent'] = arguments[0];
            } else if (arguments.length == 0) {
                return _params['fileContent'];
            } else {
                throw new Error('fileContent: несоответствующие входящие параметры');
            }
            return pub;
        }

        function uuid() {
            //TODO Хорошо бы контролировать что кол-во в выдаче соотв. кол-ву uuid (напр. с archived)
            if(arguments.length == 1 && typeof(arguments[0]) == 'string') {
                // uuid
                if(arguments[0].length != 36) throw new Error('uuid: не корректный идентификатор - ' + arguments[0]);
                _params['uuid'] = arguments[0];
            } else if (arguments.length == 1 && arguments[0] instanceof Array) {
                // uuid Array
                _.each(arguments[0], function(item) {
                    if(item.length != 36) throw new Error('uuid: не корректный идентификатор - ' + item);
                    _filter.push({ 'uuid' : arguments[0] });
                });
            } else if (arguments.length == 0) {
                return _params['uuid'];
            } else {
                throw new Error('uuid: несоответствующие входящие параметры');
            }
            return pub;
        }

        function code() {
            throw new Error('code: не реализовано');
        }

        //TODO Почему-то не работает - http://monosnap.com/image/WzFxuGI4C9qh63BYRIIOm8ul1.png (может ошибка)
        function split() {
            if(_params.uuid) return pub;

            if(arguments.length > 0 && typeof(arguments[0]) == 'number') {
                var _splitStep = arguments[0];

                var _splitCallback;
                if(arguments.length > 1 && typeof(arguments[1]) == 'function') _splitCallback = arguments[1];

                var _maxPosition, _contextStart, _contextCount, _loadCallback;

                var _loadResult;
                var callbackUndefinedHandler = function(result) {
                    _loadResult = result;
                };

                var _resultCollection = new ObjectModel.Collection({ start: start(), count: count(), total: Infinity, items: [] });

                var loadHandler = function (err, collection) {
                    _resultCollection.items = _resultCollection.items.concat(collection.items);
                    if(_splitCallback) _splitCallback(collection);
                    start(collection.start + _splitStep);
                    if(start() < collection.total && start() < _maxPosition) {
                        var remain = _maxPosition - start();
                        if(count() > remain) count(remain);
                        load(loadHandler);
                    } else {
                        _resultCollection.start = _contextStart;
                        start(_contextStart);
                        _resultCollection.count = _contextCount;
                        count(_contextCount);
                        _resultCollection.total = collection.total;
                        _loadCallback(_resultCollection);
                    }
                };

                pub.load = function (loadCallback) {
                    //TODO Надо точно понять как в контексте распознается load, this.load, pub.load
                    _loadCallback = loadCallback || callbackUndefinedHandler;
                    _contextStart = start();
                    _contextCount = count();
                    _maxPosition = start() + count();
                    count(_splitStep);
                    load(loadHandler);
                    logger.log(' - ' + _loadResult.items.length);
                    if (!loadCallback) return _loadResult;
                };
                return pub;

            } else {
                throw new Error('split: несоответствующие входящие параметры');
            }
        }

        function load() {
            var filterItems = [];
            _.each(_filter, function(filterItem) {
                var operator = '='; // default operator
                var keys = _.keys(filterItem);
                var filterName;
                if (filterItem['operator']) {
                    // if operator - { id: '...', operator: '>' }
                    operator = filterItem['operator'];
                    filterName = _.first(_.reject(keys, function(keyItem) {  //TODO Как сделать проще?
                        return keyItem == 'operator';
                    }));
                } else {
                    // without operator - { id: '...' }
                    filterName = keys[0];
                }
                var filterValue = filterItem[filterName];
                if (filterValue instanceof Date) {
                    filterValue = moment(filterValue)
                        .add('minute', filterValue.getTimezoneOffset() + 240)
                        .format('YYYYMMDDHHmmss');
                }
                filterItems.push(filterName + operator + filterValue);
            }); // ? {'items': filterItems}

            if(filterItems.length > 0) _params.filter = filterItems.join(';');
            if(arguments.length == 1 && typeof(arguments[0]) == 'function') {
                // callback
                var loadCallback = arguments[0];
                _client.get(_type, _params, function (err, result) {
                    loadCallback(err, result.obj); //callback
                });
            } else {
                // w/o callback
                var result = _client.get(_type, _params);
                return result.obj;
            }
        }

        function first() {
            count(1);
            if(arguments.length == 1 && typeof(arguments[0]) == 'function') {
                //TODO Не реализован callback
                throw new Error('callback в first() не реализован');
            }
            var result = pub.load();
            if (result) {
                if(result.className == 'collection') {
                    if (result.items) return result.items[0];
                    else return null;
                } else {
                    return result;
                }
            }
            return null;
        }

        function total() {
            //TODO Callback
            var total = 0,
                tmpStart = this.start(),
                tmpCount = this.count();
            this.start(0).count(0);
            total = load().total;
            return total;
        }

        var pub = {
            'auth' : auth,
            'filter' : filter,
            'start' : start,
            'count' : count,
            'sort' : sort,
            'sortBy' : sort,
            'sortMode' : sortMode,
            'fileContent' : fileContent,
            //TODO 'includeDeleted': ,
            'showArchived': showArchived,
            'includeArchive': showArchived,
            'uuid' : uuid,
            'code': code,
            'load' : load,
            'first' : first,
            'total': total,
            'split': split
        };

        if(contextUser) auth(contextUser, contextPassword);
        return pub;
    };

    //TODO Временно (нужно переделать архитекнутуру контекста)
    fluentContext.from = function (className) {
        return this(ObjectModel[className]);
    };

    //TODO Сохранение массива и collection?
    fluentContext.save = function(obj, callback) {
        var client = require('./rest_clients/rest.ms.xml').createClient();
        if(contextUser) client.basicAuth(contextUser, contextPassword);

        if (callback) {
            client.put(obj, function(err, result) {
                callback(err, result.obj);
            });
        } else {
            var result = client.put(obj);
            return result.obj;
        }
    };

    fluentContext.stock = {};
    fluentContext.stock.getSlotStateReport = function(param, callback) {
        var client = require('./rest_clients/rest.slot.json').createClient();
        if(contextUser) client.basicAuth(contextUser, contextPassword);

        if (callback) {
            client.getSlotStateReport(param, callback);
        } else {
            var slotStateReport = client.getSlotStateReport(param);
            return slotStateReport.obj;
        }
    };

    return fluentContext;
};