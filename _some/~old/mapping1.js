/**
 * mapping
 * Date: 11.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var metadata = require('../../res/metadata'), //TODO Подумать над способом получения объкта метаданных
    Jsonix = require('jsonix');

var typesMetadata = metadata.types, // [ [ 'agent' ], [ 'barcode' ], [ 'string', 1 ], .. ] - array with type names
    propertiesMetadata = metadata.properties,
    inheritanceMetadata = metadata.inheritance, // [ 1, null, 20, .. ]] - array with parent type indexes
    jsonixPropsTypeNames = metadata.jsonix.properties,
    jsonixPropInfoFieldsNames = metadata.jsonix.propertyInfoFields;

var index, typeName, propertyMetadata,
    classInfo = Jsonix.Model.ClassInfo,
    qName = Jsonix.XML.QName;

var map = module.exports = {};

var JSONIX_PROPERTY_INFOS = []; // [Jsonix.Model.AttributePropertyInfo, Jsonix.Model.ElementPropertyInfo];
for (i = 0, len_i = jsonixPropsTypeNames.length; i < len_i; i++) {
    JSONIX_PROPERTY_INFOS[i] = Jsonix.Model[jsonixPropsTypeNames[i]];
}

/**
 * Возвращает тип МойСклад или Jsonix в зависимости от индекса
 * @param index
 * @returns {*}
 */
function _getTypeInfo(index) {
    var value = typesMetadata[index];
    // наименование базового типа начинается с большой буквы
    if (value.charCodeAt(0) > 90) {
        return map[value];
    } else {
        return Jsonix.Schema.XSD[value].INSTANCE;
    }
}


function getValue(value) {
    return value >= 0 ? metadata.types[value] : metadata.voc[-value]
}

var JSONIX_FIELD_FACTORIES = {
    name: function (propInfo, value) {
        // 0: name
        propInfo.name = getValue(value);
    },
    typeInfo: function (propInfo, value) {
        // 1: typeInfo
        propInfo.typeInfo = _getTypeInfo(value);
    },
    collection: function (propInfo, value) {
        // 2: collection
        if (value) propInfo.collection = true;
    },
    elementName: function (propInfo, value) {
        // 3: elementName
        propInfo.elementName = new qName(getValue(value));
    },
    wrapperElementName: function (propInfo, value) {
        // 4: wrapperElementName
        propInfo.wrapperElementName = new qName(getValue(value));
    },
    elementTypeInfos: function (propInfo, value) {
        // 5: elementTypeInfos
        propInfo.elementTypeInfos = _getElementInfos();
    }
};

var JSONIX_FIELD_FACTORIES_INDEX = [];
for (var i = 0, len_i = jsonixPropInfoFieldsNames.length; i < len_i; i++) {
    JSONIX_FIELD_FACTORIES_INDEX[i] = JSONIX_FIELD_FACTORIES[jsonixPropInfoFieldsNames[i]];
}


// Objects
//

// build moysklad object classes
for (var i = 0, len_i = typesMetadata.length; i < len_i; i++) {
    typeName = typesMetadata[i];
    if (typeName.charCodeAt(0) > 90) {
        map[typeName] = new classInfo({
            name: typeName
        });
        //TODO Нужно ли добавить генерациию алиасов (код ниже) good -> Good? Думаю это лишнее.
        //TODO Или алиасы сделать в нижнем регистре (для максимальной совместимости)
    }
}
/*
 // fill aliases array 'Object' -> 'object'
 for (i = 0; i < baseTypesStartIndex; i++) {
 typeName = types[i];
 className = typeName.charAt(0).toLowerCase() + typeName.substring(1);
 classes[i] = className;
 map[className] = map[typeName];
 }
 */

// Inheritance
//
for (var i = 0, len_i = inheritanceMetadata.length; i < len_i; i++) {
    index = inheritanceMetadata[i];
    if (index !== null) map[typesMetadata[i]].baseTypeInfo = map[typesMetadata[index]];
}

// Elements
//

//TODO Не обязательно указывать элементы (надо найти способ в Jsonix для преобразования любого элемента в коллекции)
/**
 * Возвращает Jsonix структуру elementInfos для всех описанных элементов
 * @param elements
 * @returns {array}
 */
function _getElementInfos() {
    var elInfos = [],
        item;

    for (var i = 0, leni = metadata.elements; i < leni; i++) {
        item = typesMetadata[i];
        elInfos.push({
            elementName: new qName(item),
            typeInfo: map[item]
        });
    }
    return elInfos;
}
map.elementInfos = _getElementInfos();

// Properties
//

// Собираем описание свойств для каждого типа
for (var i = 0, len_i = typesMetadata.length; i < len_i; i++) {
    propertyMetadata = propertiesMetadata[i];
    // массив с описанием свойств модели должен быть определен (не null)
    if (propertyMetadata) {
        // [type].properties = [ .. ]
        var properties = map[typesMetadata[i]].properties = [];
        // each PropertyInfo in properties
        for (var j = 0, len_j = propertyMetadata.length; j < len_j; j++) {
            var jsonixPropInfoMetadata = propertyMetadata[j],
                propInfo = {},
                jsonixPropInfoPropsMetadata = jsonixPropInfoMetadata[1];
            // each property in PropertyInfo
            for (var k = 0, len_k = jsonixPropInfoPropsMetadata.length; k < len_k; k += 2)
                JSONIX_FIELD_FACTORIES_INDEX[jsonixPropInfoPropsMetadata[k]](propInfo, jsonixPropInfoPropsMetadata[k + 1]);
            // new Jsonix.Model.[PropertyInfo]({ .. })
            properties.push(new JSONIX_PROPERTY_INFOS[jsonixPropInfoMetadata[0]](propInfo));
        }
    }
}