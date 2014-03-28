/**
 * getQueryParameters
 * Date: 22.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
    , Is = require('tools').Is;

//TODO Описать параметры и скорректировать наименование
/**
 *  Сворачивает фильтр в объект ключ-значение
 */
function _flattenFilter(obj, path, filter) {

    if (!filter) filter = {};

    _.forOwn(obj, function (value, key) {

        var curPath = (path ? path + '.' : '') + key;

        if (typeof value === 'string' || typeof value === 'number') {
            filter[curPath] = [ '=' + value ];

        } else if (value instanceof Array) {
            filter[curPath] = _.map(value, function (item) {
                return '=' + item;
            });

        } else if (value instanceof Date) {
            filter[curPath] = [ '=' + moment(value).format('YYYYMMDDHHmmss') ];

        } else if (moment.isMoment(value)) {
            filter[curPath] = [ '=' + value.format('YYYYMMDDHHmmss') ];

        } else if (value.type === 'QueryOperator') {
            filter[curPath] = value.getFilter();

        } else if (value instanceof Object) {
            _flattenFilter(value, curPath, filter);

        } else {
            throw new TypeError('Incorrect key value ' + curPath + ' in filter object.');
        }
    });

    return filter;
}

/**
 * Возвращает параметры для формирования строки запроса текущего Query
 * @returns {{}}
 */
module.exports = function () {
    var queryParams = {},
        filterItems = [];

    _.extend(queryParams, this.getParameters());

    _.forOwn(_flattenFilter(this.getFilter()), function (filterValues, filterKey) {
        _.each(filterValues, function (filterValue) {
            filterItems.push(filterKey + filterValue);
        })
    });

    if (filterItems.length > 0) queryParams.filter = filterItems.join(';');
    return queryParams;
};