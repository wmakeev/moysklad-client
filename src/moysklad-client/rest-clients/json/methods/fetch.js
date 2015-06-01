/**
 * fetch
 * Date: 19.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _       = require('lodash'),
    moment  = require('moment');

var fetch = function (options, callback) {
    var that = this;

    var fetchProvider = this.getProvider('fetch'),
        query;

    if (options.params) {
        query = _.reduce(options.params, function (result, value, key) {
            var itemValues = value instanceof Array ? value : [value];

            _.forEach(itemValues, function (itemValue) {
                if (itemValue instanceof Date || moment.isMoment(itemValue))
                    itemValue = moment(itemValue).format('YYYYMMDDHHmmss');

                result.push(key + '=' + encodeURIComponent(itemValue));
            });

            return result;
        }, []).join('&');

        query = query ? '/?' + query : null;
    }

    var fetchOptions = _.extend({
        // default
        contentType: 'application/json',
        headers: {},
        async: this.options.flowControl === 'async'
    }, {
        // parameters
        method: 'GET',
        url: this.options.baseUrl
            + '/rest/' + options.service + '/json'
            + (options.path || '') + (query || '')
    });

    if (this.isAuth())
        fetchOptions.headers.Authorization = this.getBasicAuthHeader();

    fetchProvider.fetch(fetchOptions, function (err, result) {
        return that.responseHandler(err, result, callback);
    });
};

module.exports = fetch;