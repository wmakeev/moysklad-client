/**
 * addUuidsToBatch
 * Date: 29.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

function addUuidsToBatch(batchName, uuids) {
    var batch = this.uuidBatches[batchName] = (this.uuidBatches[batchName] || []);

    uuids instanceof Array ? this.uuidBatches[batchName] = batch.concat(uuids) : batch.push(uuids);
}

module.exports = addUuidsToBatch;