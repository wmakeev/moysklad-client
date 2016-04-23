'use strict'

var fs = require('fs')
var path = require('path')
var nock = require('nock')
var shouldHaveMethods = require('./tools').shouldHaveMethods

var config = require('./config')
var moysklad = require('..')

var CUSTOMER_ORDER_UUID = 'e1e1bac9-0206-11e6-7a69-93a70001c261'
var CUSTOMER_ORDER_XML = fs.readFileSync(
    path.resolve(__dirname, `./res/xml/entities/customerOrder/${CUSTOMER_ORDER_UUID}.xml`))

module.exports = function (t) {
    var client = moysklad.createClient('login', 'password')

    t.ok(client, 'should be defined')

    t.test('client should have methods', t => {
        shouldHaveMethods(t, 'client', client)([
            'load', 'save'
        ])
        t.end()
    })

    var xmlEndpoint = nock(config.XML_ENDPOINT)

    t.test('client.load', t => {
        t.throws(function () {
            client.load()
        }, /Incorrect uuid or query parameter/, 'should throw with no arguments')

        var customerOrderByUuidGet = xmlEndpoint.get(`/CustomerOrder/${CUSTOMER_ORDER_UUID}`)

        t.test('client.load by uuid', t => {
            customerOrderByUuidGet.reply(200)

            client.load('customerOrder', CUSTOMER_ORDER_UUID, (err, res) => {
                if (err) {
                    t.end(err)
                } else {
                    t.ok(res)
                    t.end()
                }
            })
        })
    })
    t.end()
}
