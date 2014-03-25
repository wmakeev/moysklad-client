/**
 * count
 * Date: 22.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var Is = require('tools').Is;

var addPaging = function (method, args) {
    if (Is.args(args, 'number')) {
        this.setParameter(method, args[0]);
    } else if (args.length == 0) {
        return this.getParameter(method);
    } else {
        throw new Error(method + ': incorrect parameter [' + obj + '], number expected');
    }
    return this;
};

module.exports = {
    start: function () {
        return addPaging.call(this, 'start', arguments);
    },
    count: function () {
        return addPaging.call(this, 'count', arguments);
    }
};