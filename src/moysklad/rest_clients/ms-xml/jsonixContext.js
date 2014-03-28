/**
 * jsonixContext
 * Date: 28.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var map               = require('../../../../res/mapping')
    , Jsonix          = require('jsonix').Jsonix
    , context         = new Jsonix.Context([map]);

exports.marshaller    = context.createMarshaller();
exports.unmarshaller  = context.createUnmarshaller();