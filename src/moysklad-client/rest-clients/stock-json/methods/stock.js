/**
 * stock
 * Date: 24.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
    , moment = require('moment');

var stock = function (options, callback) {
    options = options || {};

    //TODO Преобразовывать локальное время во время сервера
    if (options.moment) {
        options.moment = moment(options.moment).format('YYYYMMDDHHmmss');
    }

    //TODO Перенести формирование строки запроса в провайдер?
    if (_.keys(options).length > 0) {
        options.path = '/?' + _.map(options, function (value, key) {
            return key + '=' + encodeURIComponent(value);
        }).join('&');
    }

    options.service = 'stock';

    this.fetch(options, callback);
};

module.exports = stock;