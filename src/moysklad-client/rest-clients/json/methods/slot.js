/**
 * slot
 * Date: 24.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
  , moment = require('moment');

var slot = function (options, callback) {

    //TODO Callback adapter
    if (!options.storeUuid)
        throw new Error('slot: options.storeUuid not defined');

    var fetchOptions = {
        service : 'slot',
        params  : {
            storeUuid: options.storeUuid
        }
    };

    var goodUuids = (typeof options.goodUuid === 'string') ? [options.goodUuid] : options.goodUuid;

    if (goodUuids && goodUuids.length > 0) {
        //TODO Реализовать пейджинг по 50 шт
        if (goodUuids.length > 50)
            throw new Error('slot: good uuids array length more than 50 not supported now');

        fetchOptions.params.goodUuid = goodUuids;
    }

    this.fetch(fetchOptions, callback);
};

module.exports = slot;