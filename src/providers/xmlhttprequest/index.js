/**
 * XMLHttpRequest node factory
 * Date: 14.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var xmlhttprequest = require('xmlhttprequest');

module.exports = function () {
    return xmlhttprequest;
};