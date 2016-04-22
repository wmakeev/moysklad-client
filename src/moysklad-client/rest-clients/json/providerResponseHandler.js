var _ = require('lodash');

//TODO Часть кода providerResponseHandler'ов не оправданно дублируется .. >
var providerResponseHandler = function (err, result, callback) {
    var _log = require('project/logger');

    // .. этот кусок общий для всех
    if (!err) {
        switch (result.response.responseCode) {

            //TODO Прописать все ошибки stock сервисов
            //TODO Есть ли общие для всех ошибки (нужно ли выделять)?

            // ошибка пришла ввиде XML сериализуем и обработаем ниже
            case 500:
                return callback(
                    new Error('Server error 500'), result);

            // ошибка авторизации
            case 401:
                return callback(
                    new Error('Request requires HTTP authentication'), result);

            // корректный ответ сервера (работаем с ним дальше)
            case 200:
                break;

            // любой другой код ответа - ошибка
            default:
                //TODO ??? Надо парсить Html ответа и выделять описание ошибки
                _log.log('Server response: \n' + result.response.contentText);
                return callback(
                    new Error('Server response error ' + result.response.responseCode), result);
        }

        if (result.response.contentText.length > 0) {
            result.obj = JSON.parse(result.response.contentText);
        }
    }

    return callback(err, result);
};

module.exports = providerResponseHandler;