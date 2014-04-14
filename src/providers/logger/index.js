/**
 * Logger (node.js context)
 * Date: 11.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

//TODO Изменить шаблоны вывода лога и добавить цвет

var logger = require('tracer').console();

logger.time = function (name) {
    console.time(name);
};

logger.timeEnd = function (name) {
    console.timeEnd(name);
};

module.exports = function () {
    return logger;
};