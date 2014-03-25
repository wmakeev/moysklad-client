/**
 * Moysklad.ObjectModel
 * Date: 11.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var Map = require('./object-mapping');


var _createEntity = function (type, obj) {
    var map = Map[type];
    if (map) {
        var entity = {
            entityType: type
        };
        //TODO Поменять на обычный цикл
        _.each(map.propertyInfos, function (propertyInfo) {
            if (obj[propertyInfo.name]) {
                _process_Property(propertyInfo, obj[propertyInfo.name], entity)
            }
        })

    } else {
        throw new Error('Type [' + type + '] not found.')
    }
};


function _process_Property(propInfo, sourceProp, targetParentObj) {
    // Collection
    if (propInfo.collection) {
        if (sourceProp instanceof Array) {
            targetParentObj[propInfo.name] = [];
            _process_Collection(propInfo, sourceProp, targetParentObj[propInfo.name]);
        } else {
            throw new Error('[' + propInfo.name + '] property must be an array');
        }
    }

    // Simple type (i.e. String)
    if (propInfo.typeInfo.simpleType) {

    }

    //
}


function _process_Collection(propInfo, sourceCollection, targetCollection) {

}

var createEntity = function (type, obj) {

};

module.exports = {

};