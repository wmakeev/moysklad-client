/**
 * Rest /ms/xml client
 * Date: 11.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');

var clientProperties = require('./client-properties'),
    Tools = require('tools'),
    logger = require('logger');

var callbackAdapter = Tools.callbackAdapter;


// rest/ms/xml
exports.createClient = function () {

    var me = {};

    var accessPoint = clientProperties.baseUrl + '/rest/ms/xml',
        defaultFetchOptions = {
            contentType: 'application/xml',
            headers: {}
        };

    var requestClient = require('../../providers/default'),
        Jsonix = require('jsonix');

    var context = new Jsonix.Context([ObjectMapping]);

    var unmarshaller = context.createUnmarshaller(),
        marshaller = context.createMarshaller();

    /**
     * Обработчик данных полученных с сервера
     * @param err
     * @param result {{
     *     response: {
     *         headers: Object,
     *         contentText: String,
     *         responseCode: Number,
     *         responseCodeText: String
     *     },
     *     request: {
     *         contentType: String,
     *         headers: Object,
     *         method: String,
     *         async: Boolean,
     *         url: String,
     *         payload: Object
     *     },
     *     error: Error
     * }}
     * @param callback
     * @returns {*}
     */
    var fetchCallbackHandler = function(err, result, callback) {

        if (_.isEmpty(err)) {
            logger.log('request.url - ' + result.request.url);
            logger.log('response.responseCode - ' + result.response.responseCode);
            logger.log('response.contentText.length - ' + result.response.contentText.length);
            switch (result.response.responseCode) {
                case 500:
                    // ошибка пришла ввиде XML сериализуем и обработаем далее
                    break;
                case 200:
                    // корректный ответ сервера
                    break;
                default:
                    // код ошибки
                    //TODO Надо парсить Html ответа и выделять описание ошибки
                    logger.log('Ответ сервера: \n' + result.response.contentText); //Debug log
                    return callbackAdapter(err, result, callback);
            }

            if (result.response.contentText) {
                logger.time('Response unmarshalling time');
                var data = unmarshaller.unmarshalString(result.response.contentText);
                logger.timeEnd('Response unmarshalling time');
            } else {
                return callbackAdapter(new Error('Server response is empty'), result, callback);
            }

            //TODO localPart - это не тип, а наименование XML элемента. Критично ли это?
            // для удобства доступа к наименованию типа в дальнейшем
            result.type = data.name.localPart;

            if (result.type == 'error') return callbackAdapter(new Error(data.value));

            //TODO Насколько правильно жеско прописывать обработку типа collection? ...
            //TODO ... надо более внимательно посмотреть Jsonix
            //TODO Можно определить необходимость преобразования найдя тип в модели, но нужно ли это делать только ради collection?
            if (result.type == 'collection') {
                result.obj = _.pluck(data.value.items, 'value');
                _.extend(result.obj, {
                    total : data.value.total,
                    start : data.value.start,
                    count : data.value.count
                });
            } else {
                result.obj = data.value;
            }
        }

        return callbackAdapter(err, result, callback);
    };


    me.basicAuth = function (login, password) {
        this.auth = {
            login: login,
            password: password
        };
        defaultFetchOptions.headers.Authorization = Tools.getBasicAuthHttpHeader(this.auth.login, this.auth.password);
    };


    //
    /**
     * GET /{type}/{id} | GET /{type}/list
     * @param {Object} type
     * @param {Object} params
     * @param {string} callback
     */
    me.get = function(type, params, callback){
        //TODO Проверять параметры на корректность
        var obj = new type();
        var path = '/';
        if(params.uuid) {
            // GET /{type}/{id}
            path += obj.objectType + '/' + params.uuid;
            if(params.fileContent) path += '/?fileContent=true';
        } else {
            // GET /{type}/list
            path += obj.objectType + '/list';
            //if (!params.count) params.count = 100; // limit by default count
            if (_.size(params) > 0) {
                path += '/?' + _.map(params, function (value, key) {
                    return key + '=' + encodeURIComponent(value);
                }).join('&');
            }
        }

        return requestClient.fetch(_.extend({}, defaultFetchOptions, {
            method: 'GET',
            url: accessPoint + path
        }), function (err, result) {
            fetchCallbackHandler(err, result, callback);
        });
    };


    me.put = function(obj, callback){
        var items,
            path = '/',
            xmlString,
            putObj;
        if(obj.className == 'collection') items = obj.items;
        if(obj instanceof Array) items = obj;
        if (items) {
            // PUT /{type}/list/update
            path += items[0].objectType + '/list/update';
            // place objects in collection
            putObj = new ObjectModel.collection({
                items : _.map(items, function (item) {
                    return {
                        name: new Jsonix.XML.QName(item.className),
                        value: item
                    };
                })
            });
        } else {
            // PUT /{type}
            path += obj.objectType;
            putObj = obj;
        }
        xmlString = marshaller.marshalString({
            name: {localPart: putObj.className},
            value: putObj
        });

        return requestClient.fetch(_.extend({}, defaultFetchOptions, {
            method: 'PUT',
            url: accessPoint + path,
            payload: xmlString
        }), function (err, result) {
            fetchCallbackHandler(err, result, callback);
        });
    };


    // DELETE /{type}/{id}
    me.del = function(type, id, callback){
        var path = '/' + type + '/' + id;

        return requestClient.fetch(_.extend({}, defaultFetchOptions, {
            method: 'DELETE',
            url: accessPoint + path
        }), function (err, result) {
            fetchCallbackHandler(err, result, callback);
        });
    };


    // POST /{type}/list/delete
    me.deleteList = function(type, objList, callback){
        //TODO Не реализовано
        throw 'Не реализовано';
    };

    return me;
};