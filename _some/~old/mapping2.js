/**
 * mapping2
 * Date: 14.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var meta = require('../../res/metadata'), //TODO Подумать над способом получения объкта метаданных
    Jsonix = require('jsonix');

var _typeName;

var model = module.exports = {
    name: 'moysklad',
    typeInfos: []
};


/*
function _makeHash(arr) {
    var hash = {};
    for (var i = 0, len_i = arr.length; i < len_i; i++) {
        hash[arr[i]] = i;
    }
    return hash;
}

var indexes = {
    propertyInfoFields: _makeHash(meta.jsonix.propertyInfoFields), // type, name, typeInfo, ..
    propertyInfoTypes:  _makeHash(meta.jsonix.propertyInfoTypes)  // attribute, element, ..
};
*/

/**
 * Возвращает тип МойСклад или Jsonix в зависимости от индекса
 * (
 * @param index
 * @returns {*}
 */
function _getTypeInfo(index) {
    _typeName = meta.types[index];
    // наименование базового типа начинается с большой буквы
    if (_typeName.charCodeAt(0) > 90) {
        return model.name + '.' + _typeName;
    } else {
        return _typeName;
    }
}

/**
 * Возвращает наименование типа или значение из словаря
 * @param valueIndex положительный индекс - тип, отрицательный - словарь
 * @returns {*}
 * @private
 */
function _getValue(valueIndex) {
    return valueIndex >= 0 ? meta.types[valueIndex] : meta.voc[-valueIndex]
}

////
// elementInfos
model.elementInfos = [];
for (var i = 0, len_i = meta.elements; i < len_i; i++) {
    _typeName = meta.types[i];
    model.elementInfos.push({
        elementName: _typeName,
        typeInfo: _getTypeInfo(i)
    });
}

var propertyInfoFieldsFactories = {
    name: function (propertyInfo, value) {
        // 0: name
        propertyInfo.name = _getValue(value);
    },
    typeInfo: function (propertyInfo, value) {
        // 1: typeInfo
        propertyInfo.typeInfo = _getTypeInfo(value);
    },
    collection: function (propertyInfo, value) {
        // 2: collection
        if (value) propertyInfo.collection = true;
    },
    elementName: function (propertyInfo, value) {
        // 3: elementName
        propertyInfo.elementName = _getValue(value);
    },
    wrapperElementName: function (propertyInfo, value) {
        // 4: wrapperElementName
        propertyInfo.wrapperElementName = _getValue(value);
    },
    elementTypeInfos: function (propertyInfo, value) {
        // 5: elementTypeInfos
        propertyInfo.elementTypeInfos = model.elementInfos;
    }
};

var propertyInfoMetadata,
    propertyInfoFieldsMetadata,
    inheritance;

// Собираем описание свойств для каждого типа
for (var type_i = 0, len_i = meta.types.length; type_i < len_i; type_i++) {
    var typeInfo = {
        type: 'classInfo',
        localName: meta.types[type_i]
    };

    // propertyInfos
    propertyInfoMetadata = meta.propertyInfos[type_i];
    if (propertyInfoMetadata) {
        typeInfo.propertyInfos = [];

        // propertyInfo
        for (var prop_j = 0, len_j = propertyInfoMetadata.length; prop_j < len_j; prop_j++) {
            var propertyInfo = {
                type: meta.jsonix.propertyInfoTypes[propertyInfoMetadata[prop_j][0]]
            };

            // propertyInfo fields
            propertyInfoFieldsMetadata = propertyInfoMetadata[prop_j][1];
            for (var field_k = 0, len_k = propertyInfoFieldsMetadata.length; field_k < len_k; field_k += 2)
                propertyInfoFieldsFactories[
                    meta.jsonix.propertyInfoFields[propertyInfoFieldsMetadata[field_k]]](
                        propertyInfo,
                        propertyInfoFieldsMetadata[field_k + 1]);

            typeInfo.propertyInfos.push(propertyInfo);
        }
    }

    // inheritance
    inheritance = meta.inheritance[type_i];
    if (inheritance) typeInfo.baseTypeInfo = _getTypeInfo(type_i);

    model.typeInfos.push(typeInfo);
}

