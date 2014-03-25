/**
 * get
 * Date: 24.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');


module.exports = function (type, params, callback) {
    var _path = '/' + this.getObjectTypeName(type);

    if (params.uuid) {
        // GET /{type}/{id}
        _path += '/' + params.uuid;
        if (params.fileContent) _path += '/?fileContent=true';

    } else {
        // GET /{type}/list
        _path += '/list';
        if (_.size(params) > 0) {
            _path += '/?' + _.map(params,function (value, key) {
                return key + '=' + encodeURIComponent(value);
            }).join('&');
        }
    }

    return this.fetch({ method: 'GET', path: _path }, callback);
};