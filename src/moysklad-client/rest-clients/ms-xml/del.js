/**
 * del
 * Date: 24.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');


module.exports = function (type, data, callback) {
    var _fetchOptions = {
            path: '/' + this.getObjectTypeName(type)
        };

    if (data instanceof Array) {
        // POST /{type}/list/delete
        _fetchOptions.path += '/list/delete';
        _fetchOptions.method = 'POST';

        _fetchOptions.payload = {
            name: {
                localPart: 'collection'
            },
            value: {
                items: _.map(data, function (item) {
                    return {
                        name: {
                            localPart: 'String'
                        },
                        value: item
                    };
                })
            }
        };

    } else {
        // PUT /{type}/{id}
        _fetchOptions.path += '/' + data;
        _fetchOptions.method = 'DELETE';

    }

    this.fetch(_fetchOptions, callback);
}