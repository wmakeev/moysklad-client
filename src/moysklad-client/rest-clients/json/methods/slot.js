/**
 * slot
 * Date: 24.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
    , moment = require('moment');

var slot = function (options, callback) {

    //TODO Реализовать пейджинг по 50 шт
    if (options.goodUuid.length > 50)
        throw new Error('slot: good uuids array length more than 50 not supported now');

    var fetchOptions = {
        service : 'slot',
        params  : {
            storeUuid: options.storeUuid
        }
    };

    if (options.goodUuid && options.goodUuid.length > 0)
        fetchOptions.goodUuid = _.map(options.goodUuid, function (uuid) {
            return 'goodUuid=' + uuid
        }).join('&');

    this.fetch(fetchOptions, callback);
};

module.exports = slot;