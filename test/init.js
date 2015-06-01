/**
 * init.js
 * Date: 26.05.15
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var chai = require('chai');

//global.chai     = require('chai');
global._        = require('lodash');
global.expect   = chai.expect;
global.assert   = chai.assert;

global.moysklad = require('../src/moysklad-client/index.js');

chai.should();
