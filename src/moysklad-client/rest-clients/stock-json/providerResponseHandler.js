/**
 * providerResponseHandler
 * Date: 23.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
    , callbackAdapter = require('../../../tools').callbackAdapter;


var providerResponseHandler = function (err, result, callback) {
    //TODO Подумать. Чтобы получить логгер таким образом нужно вызывать providerResponseHandler в контексте ...
    // ... сомневаюсь в этом решении
    var _log = this.getProvider('logger');

    if (!err) {
        _log.info('request.url - ' + result.request.url);
        _log.info('response.responseCode - ' + result.response.responseCode);
        _log.info('response.contentText.length - ' + result.response.contentText.length);

        switch (result.response.responseCode) {

            //TODO Прописать все ошибки в stock сервисов

            // ошибка пришла ввиде XML сериализуем и обработаем ниже
            case 500:
                return callbackAdapter(
                    new Error('Server error 500'), result, callback);

            // ошибка авторизации
            case 401:
                return callbackAdapter(
                    new Error('Request requires HTTP authentication'), result, callback);

            // корректный ответ сервера (работаем с ним дальше)
            case 200:
                break;

            // любой другой код ответа - ошибка
            default:
                //TODO ??? Надо парсить Html ответа и выделять описание ошибки
                _log.log('Ответ сервера: \n' + result.response.contentText);
                return callbackAdapter(
                    new Error('Server response error ' + result.response.responseCode), result, callback);
        }

        if (result.response.contentText.length > 0) {
            _log.time('Response JSON parse time');

            result.obj = JSON.parse(result.response.contentText);

            _log.timeEnd('Response JSON parse time');
        }
    }

    return callbackAdapter(err, result, callback);
};

module.exports = providerResponseHandler;