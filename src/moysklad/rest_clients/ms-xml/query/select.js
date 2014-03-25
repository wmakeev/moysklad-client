/**
 * select
 * Date: 21.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var Is = require('tools').Is;

module.exports = function () {
    if (Is.args(arguments, Object)) {
        this.appendFilter(arguments[0]);
        return this;

    } else if (arguments.length == 1 && arguments[0] === null) {
        this.resetFilter();
        return this;

    } else if (arguments.length == 0) {
        return this.getFilter();
    }

    throw new TypeError('filter: incorrect parameter');
};