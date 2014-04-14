/**
 * marshaller factory
 * Date: 14.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

module.exports = function () {

    var context = this.getProvider('jsonix/context');

    return context.createMarshaller();   // XML to JSON
};