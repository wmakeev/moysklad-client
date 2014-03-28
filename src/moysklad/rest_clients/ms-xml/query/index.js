/**
 * index
 * Date: 22.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var Query = require('./query');

module.exports = {

    createQuery: function (queryObj) {
        var query = Query.create();
        return queryObj ? query : query.appendFilter(queryObj);
    },

    Query: Query
};

