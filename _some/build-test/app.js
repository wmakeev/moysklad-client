/**
 * main
 * Date: 11.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var logger = require('logger'),
    loggerNode = require('logger/node'),
    loggerGS = require('logger/gs');

    //sub = require('./sub/sub-file');

logger('call logger');
loggerNode('call loggerNode');
loggerGS('call loggerGS');
//sub.subAction('sub module');

