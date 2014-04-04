/**
 * callbackAdapter
 * Date: 03.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var callbackAdapter = function (err, data, callback) {
    if (callback) {
        return callback(err, data);

    } else {
        if (err)
            throw err;
        else
            return data;
    }
};

module.exports = callbackAdapter;
