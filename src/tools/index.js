/**
 * Common Tools
 * Date: 11.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');

//TODO Разнести по отдельным модулям

const UUID_REGEX = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;

var Base64 = {

    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    //метод для кодировки в base64 на javascript
    encode: function (input) {
        var Base64 = this;
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = Base64._utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }
        return output;
    },

    //метод для раскодировки из base64
    decode: function (input) {
        var Base64 = this;
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = Base64._utf8_decode(output);
        return output;
    },

    // метод для кодировки в utf8
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;

    },

    //метод для раскодировки из urf8
    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c, c2, c3; // mvv: c1 not used
        c = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }

};

exports.fetch = require('./../providers/fetch');

exports.Base64 = Base64;

exports.getBasicAuthHttpHeader = function (login, password) {

    // TODO Надо подумать как лучше переключать функции в зависимости от среды исполнения
    return "Basic " + Base64.encode(login + ":" + password);

};

exports.callbackAdapter = require('./callbackAdapter');

exports.Is = {
    'args': function () {
        var args = arguments[0],
            condition = Array.prototype.slice.call(arguments, -(arguments.length - 1));

        if (args.length == condition.length) {
            for (var i = 0, l = args.length; i < l; i++) {
                if (typeof condition[i] === 'string') {
                    if (typeof args[i] !== condition[i]) return false;

                } else if (condition[i] && condition[i].isMoment && typeof condition[i].isMoment === 'function') {
                    if (!condition[i].isMoment(args[i])) return false;

                } else {
                    if (!(args[i] instanceof condition[i])) return false;
                }
            }
            return true;
        }
        return false;
    },
    'exists': function (value) {
        return (typeof value !== 'undefined' && value !== null);
    },
    'object': function (value) {
        return typeof value === 'object';
    },
    'numberNotNaN': function (value) {
        return (typeof value === 'number') && !isNaN(value);
    },
    'integer': function (value) {
        return _.isNumber(value) && ((value % 1) === 0);
    },
    'uuid': function (value) {
        return UUID_REGEX.test(value);
    }
};

//TODO Сформировать эту структуру динамически
exports.Ensure = {
    'ensure': function (value, message, test, callback) {
        var isTest = test(value);
        if (!isTest) {
            var err = new Error(message.replace('%value', value, 'gi'));
            if (_.isFunction(callback)) callback(err);
            else throw err;
        }
        return isTest;
    },
    'boolean': function (value) {
        if (_.isString(arguments[1])) {
            return this.ensure(value, arguments[1], _.isBoolean, arguments[2]);
        } else {
            return this.ensure(value, 'Argument [%value] must be a boolean.', _.isBoolean, arguments[1]);
        }
    },
    'string': function (value) {
        if (_.isString(arguments[1])) {
            return this.ensure(value, arguments[1], _.isString, arguments[2]);
        } else {
            return this.ensure(value, 'Argument [%value] must be a string.', _.isString, arguments[1]);
        }
    },
    'uuid': function (value) {
        if (_.isString(arguments[1])) {
            return this.ensure(value, arguments[1], exports.Is.uuid, arguments[2]);
        } else {
            return this.ensure(value, 'Argument [%value] must be uuid format.', exports.Is.uuid, arguments[1]);
        }
    },
    'numberNotNaN': function (value) {
        if (_.isString(arguments[1])) {
            return this.ensure(value, arguments[1], exports.Is.numberNotNaN, arguments[2]);
        } else {
            return this.ensure(value, 'Argument [%value] must be a number (not NaN).', exports.Is.numberNotNaN, arguments[1]);
        }
    },
    'numberOrNaN': function (value) {
        if (_.isString(arguments[1])) {
            return this.ensure(value, arguments[1], _.isNumber, arguments[2]);
        } else {
            return this.ensure(value, 'Argument [%value] must be a number or NaN.', _.isNumber, arguments[1]);
        }
    },
    'integer': function (value) {
        if (_.isString(arguments[1])) {
            return this.ensure(value, arguments[1], exports.Is.integer, arguments[2]);
        } else {
            return this.ensure(value, 'Argument [%value] must be an integer.', exports.Is.integer, arguments[1]);
        }
    },
    'date': function (value) {
        if (_.isString(arguments[1])) {
            return this.ensure(value, arguments[1], _.isDate, arguments[2]);
        } else {
            return this.ensure(value, 'Argument [%value] must be a date.', _.isDate, arguments[1]);
        }
    },
    'object': function (value) {
        if (_.isString(arguments[1])) {
            return this.ensure(value, arguments[1], exports.Is.object, arguments[2]);
        } else {
            return this.ensure(value, 'Argument [%value] must be an object.', exports.Is.object, arguments[1]);
        }
    },
    'array': function (value) {
        if (_.isString(arguments[1])) {
            return this.ensure(value, arguments[1], _.isArray, arguments[2]);
        } else {
            return this.ensure(value, 'Argument [%value] must be an array.', _.isArray, arguments[1]);
        }
    },
    'function': function (value) {
        if (_.isString(arguments[1])) {
            return this.ensure(value, arguments[1], _.isFunction, arguments[2]);
        } else {
            return this.ensure(value, 'Argument [%value] must be a function.', _.isFunction, arguments[1]);
        }
    },
    'exists': function (value) {
        if (_.isString(arguments[1])) {
            return this.ensure(value, arguments[1], exports.Is.exists, arguments[2]);
        } else {
            return this.ensure(value, 'Argument does not exist.', exports.Is.exists, arguments[1]);
        }
    }
};