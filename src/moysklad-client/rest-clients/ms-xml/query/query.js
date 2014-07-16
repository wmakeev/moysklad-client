/**
 * Query
 * Date: 21.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var stampit = require('stampit');


var Query = stampit()

    // Methods
    //
    .methods({
        getQueryParameters  : require('./methods/getQueryParameters'),
        start               : require('./methods/paging').start,
        skip                : require('./methods/paging').start,
        count               : require('./methods/paging').count,
        limit               : require('./methods/paging').count,
        page                : require('./methods/paging').page,
        filter              : require('./methods/filter'),
        uuids               : require('./methods/uuids'),
        fileContent         : require('./methods/fileContent'),
        select              : require('./methods/select'),
        showArchived        : require('./methods/showArchived'),
        sort                : require('./methods/sort'),
        orderBy             : require('./methods/sort'), // alias for sort
        sortMode            : require('./methods/sortMode')
    })

    // Properties
    //
    .enclose(require('./query.params.js'))  // _params
    .enclose(require('./query.filter.js')); // _filter


module.exports = Query;