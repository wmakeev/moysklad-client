/**
 * uuids
 * Date: 17.06.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var uuids = function (uuids) {

    if (uuids instanceof Array && uuids.length > 0) {
        var filterObj = {};
        filterObj['uuid'] = uuids;
        filterObj['showArchived'] = true;

        this.appendFilter(filterObj);
    } else {

        throw new Error('uuids: incorrect or empty array parameter')
    }

    return this;
};

module.exports = uuids;