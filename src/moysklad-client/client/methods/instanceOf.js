/**
 * instanceOf
 * Date: 29.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
    , typeInfos;


var typeInfosScopeMap = {};

var getType = function(typeName) {
    if (!typeInfosScopeMap[typeName]) {
        var type = _.find(typeInfos, { localName: typeName })
        if (type) {
            typeInfosScopeMap[typeName] = type;
            if (type.baseTypeInfo) {
                type.baseTypeInfo = getType(type.baseTypeInfo.split('.')[1])
            }
        }
    }
    return typeInfosScopeMap[typeName];
};

var isInstanceOf = function (entityType, superType) {
    var type = getType(entityType);
    if (type) 
        return type.localName == superType ?
            true :
            (type.baseTypeInfo ? isInstanceOf(type.baseTypeInfo.localName, superType) : false);
    else 
        return false;
};

/**
 *
 * @param {Object | String} entity
 * @param {String} typeName
 */
var instanceOf = function (entity, typeName) {
    typeInfos = typeInfos || require('project/mapping').typeInfos;

    var entityType = entity.TYPE_NAME ? entity.TYPE_NAME : entity;

    if (typeof entityType === 'string') {
        // moysklad.{type}
        entityType = entityType.indexOf('.') != -1 ?
            entityType.split('.')[1] : entityType;

        return isInstanceOf(entityType, typeName);
    }

    return null;
};

module.exports = instanceOf;