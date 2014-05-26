/**
 * default node auth
 * Date: 23.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

module.exports = {

    getAuth: function () {
        if (process && process.env && process.env.MOYSKLAD_LOGIN && process.env.MOYSKLAD_PASSWORD) {
            return {
                login: process.env.MOYSKLAD_LOGIN,
                password: process.env.MOYSKLAD_PASSWORD
            }
        } else {
            return null;
        }
    }

};