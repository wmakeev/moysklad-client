var _ = require('lodash');

var providerResponseHandler = function (err, result, callback) {
    var data,
        _log            = require('project/logger'),
        _unmarshaller   = require('project/unmarshaller').create();

    if (!err) {

        switch (result.response.responseCode) {

            // ошибка пришла ввиде XML сериализуем и обработаем ниже
            case 500:
                break;

            // ошибка авторизации
            case 401:
                return callback(
                    new Error('Request requires HTTP authentication'), result);

            // корректный ответ сервера (работаем с ним дальше)
            case 200:
                break;

            // любой другой код ответа - ошибка
            default:
                //TODO Надо парсить Html ответа и выделять описание ошибки
                _log.log('Server response: \n' + result.response.contentText);
                return callback(
                    new Error('Server response error ' + result.response.responseCode), result);
        }

        if (result.response.contentText.length > 0) {

            //_log.time('Response unmarshalling time');

            data = result.response.contentXml ?
                _unmarshaller.unmarshalDocument(result.response.contentXml) :
                _unmarshaller.unmarshalString(result.response.contentText);

            //_log.timeEnd('Response unmarshalling time');

            result.type = data.name.localPart;

            if (result.type == 'error') return callback(new Error(data.value.message), result);

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

    return callback(err, result);
};

module.exports = providerResponseHandler;