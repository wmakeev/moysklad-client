/**
 * uuids
 * Date: 17.06.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var uuids = function (uuids) {
    var filterObj = {};
    filterObj['uuid'] = uuids;
    filterObj['showArchived'] = true;

    this.appendFilter(filterObj);

    return this;
};

module.exports = uuids;