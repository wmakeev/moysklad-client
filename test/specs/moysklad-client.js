/**
 * moysklad-client
 * Date: 16.07.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var should = require('should');
var moysklad = require('../..');

describe('moysklad-client', function(){
    it('should have properties', function(){
        moysklad.should.have.properties([
            'createClient',
            'tools'
        ]);
    })
});
