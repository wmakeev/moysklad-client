/**
 * optionsAccessBehavior
 * Date: 13.08.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');

module.exports = function () {
    this.options = {};

    this.get = function (name) {
        return this.options[name];
    };

    this.set = function () {

        if (arguments.length == 2) {
            this.options[arguments[0]] = arguments[1];

        } else if (typeof arguments[0] === 'object') {
            _.forOwn(arguments[0], function (value, key) {
                this.options[key] = value;
            }, this)

        } else {
            throw new Error('Incorrect options');
        }
        return this;
    };
};