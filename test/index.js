'use strict'

var test = require('blue-tape')
var reporter = require('tap-spec');

// Tests
var tests = {
    'moysklad': require('./moysklad-client-test'),
    'client': require('./client-test')
}

test.createStream()
  .pipe(reporter())
  .pipe(process.stdout)
      
Object.keys(tests).forEach(function (testName) {
    test(testName, tests[testName])
})