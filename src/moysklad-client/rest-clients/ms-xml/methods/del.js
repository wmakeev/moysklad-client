/**
 * del
 * Date: 24.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');


module.exports = function () {
    //TODO Ensure
    var args            = _.toArray(arguments)
      , type            = (typeof args[0] == 'string') && (typeof args[1] !== 'function') ? args[0] : null
      , data            = type ? args[1] : args[0]
      , callback        = typeof args.slice(-1)[0] === 'function' ? args.slice(-1)[0] : null;

    if (!type) {
        if (data.TYPE_NAME) {
            type = data.TYPE_NAME;

        } else if ((data instanceof Array) && data.length > 0) {
            type = typeof data[0] === 'string' ? data[0] : data[0].TYPE_NAME;
        }
    }

    if (type && type.indexOf('.') != -1)
        type = type.split('.')[1]; // moysklad.{type}

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
                            localPart: 'id'
                        },
                        value: typeof item === 'string' ? item : item.uuid
                    };
                })
            }
        };

    } else {
        // PUT /{type}/{id}
        _fetchOptions.path += '/' + (typeof data === 'string' ? data : data.uuid);
        _fetchOptions.method = 'DELETE';

    }

    this.fetch(_fetchOptions, callback);
};