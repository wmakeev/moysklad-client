/**
 * Default Http request provider
 * Date: 11.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var forEach = require('mout/array/forEach')
    , mixIn = require('mout/mixIn')
    , logger = require('logger')
    , callbackAdapter = require('tools').callbackAdapter;


var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

module.exports = {

    fetch: function (options, callback) {

        var _options = {
            contentType: 'application/x-www-form-urlencoded',
            headers: null,
            method: 'GET',
            async: false,
            payload: null
        };
        _options = mixIn(_options, options);

        var xhr = new XMLHttpRequest()
            , response
            , err;

        xhr.open(_options.method, _options.url, _options.async);
        xhr.setRequestHeader('Content-Type', _options.contentType);

        forEach(_options.headers, function (value, key) {
            xhr.setRequestHeader(key, value);
        });

        //TODO try only in sync mode!
        try {
            logger.time('[Providers] XMLHttpRequest');
            xhr.send(_options.payload);
            logger.timeEnd('[Providers] XMLHttpRequest');
        }
        catch (e) {
            err = {
                code: 'XMLHttpRequest Error',
                message: e
            };
        }

        if (!err) {
            var responceCode = xhr.status;
            response = {
                headers: null,
                contentText: xhr.responseText,
                contentXml: xhr.responseXML,
                //TODO Почему библиотека xmlhttprequest возвращает такой ответ? Это не по стандарту.
                responseCode: (typeof responceCode === 'number') ? responceCode : parseInt(responceCode.split('\n')[0]),
                responseCodeText: xhr.statusText
            };
        }

        var result = {
            response: response,
            request: _options,
            error: err //TODO Убрать?
        };

        return callbackAdapter(err, result, callback);
    }
};
