/**
 * sortMode
 * Date: 22.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var Is = require('../../../../tools').Is;

module.exports = function () {

    if (Is.args(arguments, 'string')) {
        this.setParameter('sortMode', arguments[0]);

    } else if (arguments.length == 0) {
        return this.getParameter('sortMode');

    } else {
        throw new Error('sortMode: incorrect parameters ' + obj);
    }

    return this;
};
