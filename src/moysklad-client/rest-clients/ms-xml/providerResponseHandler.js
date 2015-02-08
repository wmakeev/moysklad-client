/**
 * providerResponseHandler
 * Date: 23.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _               = require('lodash')
  , callbackAdapter = require('../../../tools').callbackAdapter;


var providerResponseHandler = function (err, result, callback) {
    var data;

    var _log        = require('project/logger'),
        _marshaller = this.getProvider('marshaller');

    if (!err) {

        switch (result.response.responseCode) {

            // ошибка пришла ввиде XML сериализуем и обработаем ниже
            case 500:
                _log.error('server error: \n' + result.response.contentText);
                if (!result.response.contentText) {
                    return callbackAdapter(
                        new Error('Server error'), result, callback);
                }
                // Если response.contentText не пуст, то вероятно там XML представление ошибки
                // которое будет обработано дальше, как обычная сущность модели МойСклад.
                // Ошибка будет вызвана далее, после десериализации сущности.
                break;

            // ошибка авторизации
            case 401:
                _log.error('server error: \n' + result.response.contentText);
                return callbackAdapter(
                    new Error('Request requires HTTP authentication'), result, callback);

            // корректный ответ сервера (работаем с ним дальше)
            case 200:
                break;

            // любой другой код ответа - ошибка
            default:
                //TODO Надо парсить Html ответа и выделять описание ошибки
                _log.error('server error: \n' + result.response.contentText);
                return callbackAdapter(
                    new Error('Server response error ' + result.response.responseCode), result, callback);
        }

        if (result.response.contentText.length > 0) {

            //_log.time('Response unmarshalling time');
            data = result.response.contentXml ?
                _marshaller.unmarshalDocument(result.response.contentXml) :
                _marshaller.unmarshalString(result.response.contentText);
            //_log.timeEnd('Response unmarshalling time');

            result.type = data.name.localPart;

            if (result.type == 'error') {
                return callbackAdapter(new Error(data.value.message));
            }

            if (result.type == 'collection') {
                result.obj = _.pluck(data.value.items, 'value');
                _.extend(result.obj, {
                    total:      data.value.total,
                    start:      data.value.start,
                    count:      data.value.count,
                    TYPE_NAME:  data.value.TYPE_NAME
                });
            } else {
                result.obj = data.value;
            }
        }
    }

    return callbackAdapter(err, result, callback);
};

module.exports = providerResponseHandler;