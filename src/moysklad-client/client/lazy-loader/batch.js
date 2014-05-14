/**
 * batch
 * Date: 13.05.2014
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
    , stampit = require('stampit');


function batch () {

    var _batches = {};

    this.batch = {

        addUuids: function (batchName, uuids) {

            _batches[batchName] = (_batches[batchName] || []);

            uuids instanceof Array ?
                _batches[batchName] = _batches[batchName].concat(uuids) :
                _batches[batchName].push(uuids);
        },

        take: function (batchName) {
            if (_batches[batchName]) {
                var batch = _.uniq(_batches[batchName]);
                _batches[batchName] = undefined;
                return batch;
            } else {
                return null;
            }
        },

        isExsist: function (batchName) {
            return (_batches[batchName] && _batches[batchName].length > 0);
        }
    }

}

module.exports = batch;