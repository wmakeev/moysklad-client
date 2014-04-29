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
}

var isInstanceOf = function (entityType, superType) {
    var type = getType(entityType);
    if (type) 
        return type.localName == superType ?
            true :
            (type.baseTypeInfo ? isInstanceOf(type.baseTypeInfo.localName, superType) : false);
    else 
        return false;
}

var instanceOf = function (entity, typeName) {
    typeInfos = typeInfos || this.getProvider('mapping').typeInfos;
    
    if (entity.TYPE_NAME) {
        var entityType = entity.TYPE_NAME.split('.')[1];
    
        return isInstanceOf(entityType, typeName);
    }
    
};

module.exports = instanceOf;