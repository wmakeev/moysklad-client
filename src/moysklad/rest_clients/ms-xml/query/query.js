/**
 * Query
 * Date: 21.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var stampit = require('stampit');


module.exports = stampit()

    // Properties
    //
    .enclose(require('./query.params.js')) // _params
    .enclose(require('./query.filter.js')) // _filter

    // Methods
    //
    .methods({
        getQueryParameters: require('./getQueryParameters'),
        start:              require('./paging').start,
        count:              require('./paging').count,
        select:             require('./select'),
        showArchived:       require('./showArchived'),
        sort:               require('./sort'),
        sortMode:           require('./sortMode')
    });