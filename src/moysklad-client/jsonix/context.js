/**
 * Context
 * Date: 28.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var map               = require('../../../res/mapping')
    , Jsonix          = require('./index').Jsonix
    , context         = new Jsonix.Context([map]);

exports.marshaller    = context.createMarshaller();   // XML to JSON
exports.unmarshaller  = context.createUnmarshaller(); // JSON to XML