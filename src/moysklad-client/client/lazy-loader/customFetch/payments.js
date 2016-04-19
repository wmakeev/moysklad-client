/**
 * payments
 * Date: 02.04.16
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');

function fetchPayments(type, uuids, path, batchName, batches, containerEntity) {
    if (!uuids && !uuids.length) return [];

    var client = this.client;
    var that = this;

    var payments = [];
    payments.push(client.from('paymentOut').uuids(uuids).load());
    payments.push(client.from('paymentIn').uuids(uuids).load());

    _.forEach(payments, function (payment) {
        that.entityHash.add(
            that.mapLazyLoader(payment, path, batches, entityItem)
        );
    });

    return that.entityHash.get(uuids)
}

module.exports = fetchPayments;
