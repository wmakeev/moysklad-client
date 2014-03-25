/**
 * index
 * Date: 25.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var Context = require('./context');

module.exports = {

    createClient: function () {
        var context = Context.create();

        return context;
    }

}