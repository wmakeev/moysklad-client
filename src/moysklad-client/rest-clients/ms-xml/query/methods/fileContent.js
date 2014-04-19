/**
 * fileContent
 * Date: 22.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var Is = require('../../../../../tools/index').Is;

module.exports = function () {
    if (Is.args(arguments, 'boolean')) {
        this.setParameter('fileContent', arguments[0]);
    } else if (arguments.length == 0) {
        return this.getParameter('fileContent');
    } else {
        throw new Error('fileContent: incorrect parameters ' + obj);
    }
    return this;
};