/**
 * object mapping data factory
 * Date: 14.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

//TODO mapping объект, по хорошему, должен возвращатся внутри массива, т.к. возможно несколько пространств имен
// .. но так, как пока не предвидится что-то кроме "moysklad", оставим так.

var _          = require('lodash'),
    stampit    = require('stampit');


exports.getMapping = function (options) {
    var map           = _.cloneDeep(options.map);
    var client        = options.client;
    var extensions    = options.extensions;

    var stampExtender = extensions.getStampExtender(map, client);

    var namespace = map.name;
    var typeInfos = _.indexBy(map.typeInfos, 'localName');

    var typeStamps = {};

    var getTypeStamp = function (typeInfo) {
        var localName = typeInfo.localName;

        if (typeStamps[localName]) {
            return typeStamps[localName];

        } else {
            var typeStamp = stampit().state({
                    TYPE_NAME: namespace + '.' + localName
                });

            typeStamp = stampExtender(localName, typeStamp);

            if (typeInfo.baseTypeInfo) {
                var baseTypeName = typeInfo.baseTypeInfo.split('.')[1];
                var baseTypeStamp = getTypeStamp(typeInfos[baseTypeName]);
                typeStamp = baseTypeStamp.compose(typeStamp);
            }

            typeStamps[localName] = typeStamp;

            return typeStamp;
        }
    };

    //TODO Задать в опциях возможность отключать привязку instanceFactory к typeInfo
    _.forOwn(typeInfos, function (typeInfo) {
        var typeStamp = getTypeStamp(typeInfo);
        if (typeStamp) typeInfo.instanceFactory = typeStamp;
    });

    return map;
};