/**
 * index
 * Date: 22.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var Query = require('./query');

//TODO Можно передавать параметры в конструктор. Убрать обертку для .create()

module.exports = {

    //TODO Можно передать и список других запросов для объединения в один. Почему нет.
    createQuery: function (queryObj) {
        var query = Query.create();
        return queryObj ? query.appendFilter(queryObj) : query;
    },

    Query: Query
};

