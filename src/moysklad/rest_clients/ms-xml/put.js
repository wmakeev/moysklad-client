/**
 * put
 * Date: 24.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');


module.exports = function (type, data, callback) {
    var _fetchOptions = {
        method: 'PUT',
        path: '/' + this.getObjectTypeName(type),
        payload: {
            name: {}
        }
    };

    if (data instanceof Array) {
        // PUT /{type} + /list/update
        _fetchOptions.path += '/list/update';

        _fetchOptions.payload = {
            name: {
                localPart: 'collection'
            },
            value: {
                items: _.map(data, function (item) {
                    return {
                        name: {
                            localPart: type
                        },
                        value: item
                    };
                })
            }
        };

    } else {
        // PUT /{type}
        _fetchOptions.payload = {
            name: {
                localPart: type
            },
            value: data
        };
    }

    this.fetch(_fetchOptions, callback);
}