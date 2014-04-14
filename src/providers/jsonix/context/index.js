/**
 * Context
 * Date: 28.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

module.exports = function () {
    var map     = this.getProvider('mapping'),
        Jsonix  = this.getProvider('jsonix').Jsonix;

    return new Jsonix.Context([map]);
};