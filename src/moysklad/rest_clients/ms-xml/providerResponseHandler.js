/**
 * fetchCallbackHandler
 * Date: 23.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var callbackAdapter = require('tools').callbackAdapter
    , unmarshaller = require('jsonix').unmarshaller
    , logger = require('logger');


module.exports = function (err, result, callback) {
    var data;

    if (!err) {
        logger.log('request.url - ' + result.request.url);
        logger.log('response.responseCode - ' + result.response.responseCode);
        logger.log('response.contentText.length - ' + result.response.contentText.length);

        switch (result.response.responseCode) {
            case 500:
                // ошибка пришла ввиде XML сериализуем и обработаем ниже
                break;

            case 200:
                // корректный ответ сервера
                break;

            default:
                //TODO Надо парсить Html ответа и выделять описание ошибки
                logger.log('Ответ сервера: \n' + result.response.contentText);
                return callbackAdapter(
                    new Error('Server response error ' + result.response.responseCode), result, callback);
        }

        if (result.response.contentText.length > 0) {

            logger.time('Response unmarshalling time');
            data = result.response.contentXml ?
                unmarshaller.unmarshalDocument(result.response.contentXml) :
                unmarshaller.unmarshalString(result.response.contentText);
            logger.timeEnd('Response unmarshalling time');

            result.type = data.name.localPart;

            if (result.type == 'error') return callbackAdapter(new Error(data.value));

            if (result.type == 'collection') {
                result.obj = _.pluck(data.value.items, 'value');
                _.extend(result.obj, {
                    total: data.value.total,
                    start: data.value.start,
                    count: data.value.count
                });
            } else {
                result.obj = data.value;
            }
        }
    }

    return callbackAdapter(err, result, callback);
};
