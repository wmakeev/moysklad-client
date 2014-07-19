/**
 * client
 * Date: 16.07.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var should = require('should');
var moysklad = require('../..');

var load = require('../../src/moysklad-client/client/methods/load');

describe('client', function () {

    var client = moysklad.createClient();

    it('should have properties', function(){
        moysklad.should.have.properties([
            'createClient',
            'tools'
        ]);
    });

    describe('load', function () {

        var loadContext = {
            getProvider: function (providerName) {
                return {
                    get: function () {
                        console.log(arguments);
                    }
                };
            }
        };

        before(function () {
            this.load ;
        })

    })
});