'use strict'

var shouldHaveMethods = require('./tools').shouldHaveMethods
var shouldHaveProps = require('./tools').shouldHaveProps

var moysklad = require('..')

module.exports = function (t) {
    t.ok(moysklad, 'should be defined')
    
    t.test('moysklad should have methods', function (t) {
        shouldHaveMethods(t, 'moysklad', moysklad)([
            'createClient'
        ])
        shouldHaveProps(t, 'moysklad', moysklad)([
            'tools'
        ])
        t.end()
    })
    
    t.end()
}
