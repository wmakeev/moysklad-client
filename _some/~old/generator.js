/**
 * metadata-generator
 * Date: 10.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

//TODO Провести рефракторинг. Выделить в отдельные модули (в прототип).

var _ = require('lodash'),
    DOMParser = require('xmldom').DOMParser,
    XmlToJson = require('./xmlToJson');


var metadata = null,
    propertyFields;

var jsonix = {
    propertyInfoTypes: [
        "attribute", "element", "elementRef", "anyElement"
    ],
    propertyInfoFields: [
        "name", "typeInfo", "collection",
        "elementName", "wrapperElementName", "elementTypeInfos",
        "allowDom", "allowTypedObject", "mixed"
    ]
};

// Представление метаданных ввиде объектов (конвертируется из массивов)
var metaIndex = {
    types: {},
    enums: {},
    voc: {},
    jsonixPropertyInfoTypes: {},
    jsonixPropInfoFields: {}
};
_.each(jsonix.propertyInfoTypes, function (prop, index) {
    metaIndex.jsonixPropertyInfoTypes[prop] = index;
});
_.each(jsonix.propertyInfoFields, function (prop, index) {
    metaIndex.jsonixPropInfoFields[prop] = index;
});

////
// Вспомогательные методы
//

/**
 * Преобразует текстовое представление XSD в удобный для дальнешей работы JSON формат
 * @returns {*}
 */
function getXsdObj(xsd) {
    var parser, xsdDomDocument, jsonXsd;
    parser = new DOMParser();
    xsdDomDocument = parser.parseFromString(xsd, "application/xml");
    jsonXsd = XmlToJson.ToJSON(xsdDomDocument.documentElement);
    return jsonXsd;
}

/**
 * Преобразование className -> ClassName
 * @param className
 * @returns {*}
 */
function getObjectTypeName(className) {
    return className.charAt(0).toUpperCase() + className.substring(1);
}

function addType(typeName) {
    metadata.types.push(typeName);
    return (metaIndex.types[typeName] = metadata.types.length - 1);
}

/**
 * Возвращает индекс типа данных МойСклад (в метаданных)
 * @param typeName
 * @returns {*}
 */
function getTypeIndex(typeName) {
    if (typeName in metaIndex.types) {
        return metaIndex.types[typeName];
    } else {
        if (!typeName) return null;

        // base type
        if (typeName.substring(0, 3) == 'xs:')
            return getBaseTypeIndex(typeName);

        // enum
        if (typeName in metaIndex.enums)
            return getTypeIndex('String');

        // unknown type
        return addType(typeName);
    }
}

function addVoc(value) {
    metadata.voc.push(value);
    return (metaIndex.voc[value] = metadata.voc.length - 1);
}

function getVocIndex(value) {
    if (value in metaIndex.voc) {
        return -metaIndex.voc[value];
    } else {
        return -addVoc(value);
    }
}

/**
 * Возвращает индекс базового типа (в метаданных)
 * @param typeName Наименования типа с большой буквы (напр. "String")
 * @returns {*}
 */
function getBaseTypeIndex(typeName) {
    switch (typeName) {
        case 'xs:base64Binary':
        case 'xs:IDREF':
        case 'xs:ID':
        case 'xs:string':
            return getTypeIndex('String');
        case 'xs:dateTime':
        case 'xs:double':
        case 'xs:long':
        case 'xs:int':
        case 'xs:unsignedShort':
        case 'xs:boolean':
            return getTypeIndex(typeName.charAt(3).toUpperCase() + typeName.substring(4));
        default:
            throw 'Unknown base type [' + typeName + ']';
    }
}

function addSimpleType(simpleType) {
    var enumItem = [ simpleType.$attribute.name, []];
    _.each(simpleType['xs:restriction']['xs:enumeration'], function (enumerationItem) {
        enumItem[1].push(enumerationItem.$attribute.value);
    });
    metadata.enums.push(enumItem);
    metaIndex.enums[enumItem[0]] = metadata.enums.length - 1;
}

////
// Методы разбора XSD элементов

/**
 * Добавляет типы доступных через REST XML API элементов
 * @param elements
 */
function addElementsTypes(elements) {
    _.each(elements, function (element) {
        getTypeIndex(element.$attribute.type);
    });
    // указываем кол-во элементов (номер полследнего элемента), т.к. далее будут добавлятся остальные типы
    metadata.elements = elements.length;
}

function addXmlAttributes(obj, attributes) {
    _.each((attributes instanceof Array ? attributes : [attributes]),
        function (attributeItem) {
            obj.push([
                metaIndex.jsonixPropertyInfoTypes['attribute'],
                [
                    metaIndex.jsonixPropInfoFields['name'],
                    metaIndex.types[attributeItem.$attribute.name] || getVocIndex(attributeItem.$attribute.name),

                    metaIndex.jsonixPropInfoFields['typeInfo'],
                    getTypeIndex(attributeItem.$attribute.type)
                ]
            ]);
        });
}

function addPropInfo(key, value) {
    propertyFields = propertyFields.concat([
        metaIndex.jsonixPropInfoFields[key],
        typeof value == 'string' ? metaIndex.types[value] || getVocIndex(value) : value
    ]);
}

// TODO Название addXmlElements не подходит? addModelElements по сути работает с теми же сущностями
function addXmlElements(obj, elements) {
    //TODO И проверить что генерация модели правильно обработает name вместо elmentName
    //TODO Добавить множественное окончание для массивов "s" - pluralize()
    propertyFields = [];

    _.each(elements instanceof Array ? elements : [elements],
        function (element) {
            propertyFields = [];

            var attr = element.$attribute,
                maxOccurs = attr.maxOccurs || 1, //minOccurs = _attr.minOccurs || 1,
                name = attr.name || attr.type || attr.ref;
            if (maxOccurs == 'unbounded') addPropInfo('collection', true);
            addPropInfo('name', name);

            //TODO Надо правильно обработать goodPrices в goodFolder
            if (element['xs:complexType']) {
                var wrappedElem = element['xs:complexType']['xs:sequence']['xs:element'].$attribute;
                addPropInfo('elementName', wrappedElem.name || wrappedElem.ref);
                addPropInfo('typeInfo', getTypeIndex(wrappedElem.type || wrappedElem.ref));
                addPropInfo('collection', true);
                addPropInfo('wrapperElementName', name);
            } else {
                addPropInfo('typeInfo', getTypeIndex(attr.type || attr.ref));
            }

            obj.push([
                metaIndex.jsonixPropertyInfoTypes['element'],
                propertyFields
            ]);
        });
}

function addXmlAnyElement(obj, element) {
    propertyFields = [];

    var attr = element.$attribute;

    if (attr.namespace != '##other')
        throw new Error('Not expected namespace [' + attr.namespace + ']');

    if (attr.processContents == 'strict')
        addPropInfo('allowDom', false);
    else if (attr.processContents == 'skip')
        addPropInfo('allowTypedObject', false);

    if (attr.maxOccurs == 'unbounded') {
        addPropInfo('name', 'items');
        addPropInfo('collection', true);
    } else {
        addPropInfo('name', 'item');
    }

    //addPropInfo('mixed', false);

    obj.push([
        metaIndex.jsonixPropertyInfoTypes['anyElement'],
        propertyFields
    ])
}

//TODO Убрать?
/*function getEntityAlias(entityType) {
    return entityType.charAt(0).toLowerCase() + entityType.substring(1);
}*/

function generateMetadata(xsd) {
    var xsdObj = getXsdObj(xsd),
        elements = [];

    console.log(JSON.stringify(xsdObj));

    metadata = {
        jsonix: jsonix,
        enums: [], // xs:simpleType
        types: [],
        voc: [],
        inheritance: [],
        elements: [], // xs:element
        propertyInfos: []
    };

    // xs:simpleType
    _.each(xsdObj['xs:simpleType'], function (simpleTypeItem) {
        addSimpleType(simpleTypeItem);
    });

    // xs:element
    addElementsTypes(xsdObj['xs:element']);

    // xs:complexType
    var properties = metadata.propertyInfos,
        inheritance = metadata.inheritance;
    _.each(xsdObj['xs:complexType'], function (complexTypeItem) {
        var typeIndex = getTypeIndex(complexTypeItem.$attribute.name),
            propertyObj = properties[typeIndex] = [];

        // xs:complexContent
        if (complexTypeItem['xs:complexContent']) {
            // xs:extension
            if (complexTypeItem['xs:complexContent']['xs:extension']) {
                var extension = complexTypeItem['xs:complexContent']['xs:extension'];
                if (extension.$attribute.base) {
                    // Inheritance
                    inheritance[typeIndex] = getTypeIndex(extension.$attribute.base);
                    // xs:all
                    if (extension['xs:all'] && extension['xs:all'].$count > 0) {
                        addXmlElements(propertyObj, extension['xs:all']['xs:element']);
                    }
                    // xs:attribute
                    if (extension['xs:attribute']) {
                        addXmlAttributes(propertyObj, extension['xs:attribute']);
                    }
                    // xs:sequence
                    if (extension['xs:sequence'] && extension['xs:sequence'].$count > 0) {
                        addXmlElements(propertyObj, extension['xs:sequence']['xs:element']);
                    }
                } else {
                    throw '"base" attribute in xs:extension not found';
                }
            }
        }

        // xs:sequence
        if (complexTypeItem['xs:sequence']) {
            // xs:element
            if (complexTypeItem['xs:sequence']['xs:element'])
                addXmlElements(propertyObj, complexTypeItem['xs:sequence']['xs:element']);
            // xs:any
            if (complexTypeItem['xs:sequence']['xs:any']) {
                addXmlAnyElement(propertyObj, complexTypeItem['xs:sequence']['xs:any'])
            }

        }

        // xs:attribute // (in <xs:complexType name="unit">)
        if (complexTypeItem['xs:attribute']) {
            addXmlAttributes(propertyObj, complexTypeItem['xs:attribute']);
        }
    });

    //postProcessMapping(); //TODO postProcessMapping temp off
    return metadata;
}

/**
 * Корректировка метаданных.
 * Необходима, т.к. часть элементов не отображается автоматически нужным образом
 * TODO В идеале, все "ручные" доработки модели должны преобразовываться автоматически
 */
function preProcessXsdJson() {
    // add some custom fixes to result mapping

    //TODO Надо подумать как правильно средствами Jsonix формировать элементы вроде collection ...
    //TODO ... или формировать на основном этапе генерации метаданных
    // http://msdn.microsoft.com/ru-ru/library/vstudio/ms256043(v=vs.100).aspx

    // Добавляем элемент collection (списки сущностей)
    var property = metadata.propertyInfos[getTypeIndex('collection')] = [];
    var fields = metaIndex.jsonixPropInfoFields;
    // AttributePropertyInfo (total)
    property.push([
        metaIndex.jsonixPropertyInfoTypes['AttributePropertyInfo'],
        [
            fields['name'],             getVocIndex('total'),
            fields['typeInfo'],         getTypeIndex('Int')
        ]
    ]);
    // AttributePropertyInfo (start)
    property.push([
        metaIndex.jsonixPropertyInfoTypes['AttributePropertyInfo'],
        [
            fields['name'],             getVocIndex('start'),
            fields['typeInfo'],         getTypeIndex('Int')
        ]
    ]);
    // AttributePropertyInfo (count)
    property.push([
        metaIndex.jsonixPropertyInfoTypes['AttributePropertyInfo'],
        [
            fields['name'],             getVocIndex('count'),
            fields['typeInfo'],         getTypeIndex('Int')
        ]
    ]);
    // AttributePropertyInfo (items)
    property.push([
        metaIndex.jsonixPropertyInfoTypes['ElementRefsPropertyInfo'],
        [
            fields['name'],             getVocIndex('items'),
            fields['collection'],       true,
            fields['elementTypeInfos'], 'lax'
        ]
    ]);

    //TODO Add uuid type
    /*collectionElemInfo.typeInfo = metadata.Collection;
    metadata.Collection.properties = [
        new Jsonix.Model.AttributePropertyInfo({
            name: 'total',
            typeInfo: Jsonix.Schema.XSD.Int.INSTANCE
        }),
        new Jsonix.Model.AttributePropertyInfo({
            name: 'start',
            typeInfo: Jsonix.Schema.XSD.Int.INSTANCE
        }),
        new Jsonix.Model.AttributePropertyInfo({
            name: 'count',
            typeInfo: Jsonix.Schema.XSD.Int.INSTANCE
        }),
        new Jsonix.Model.ElementRefsPropertyInfo({
            name: 'items',
            collection: true,
            elementTypeInfos: _.map(metadata.elementInfos,function (elemInfo) {
                return {
                    elementName: new Jsonix.XML.QName(elemInfo.elementName.localPart),
                    typeInfo: elemInfo.typeInfo
                }
            }).concat([
                    {
                        elementName: new Jsonix.XML.QName('id'),
                        typeInfo: Jsonix.Schema.XSD.String.INSTANCE
                    },
                    {
                        elementName: new Jsonix.XML.QName('uuid'),
                        typeInfo: Jsonix.Schema.XSD.String.INSTANCE
                    }
                ])
        })
    ];*/

    // fix salePrices
    for (var i = 0; i < metadata.AbstractGood.propertyInfos.length; i++) {
        if (metadata.AbstractGood.propertyInfos[i].name == 'salePrices') {
            metadata.AbstractGood.propertyInfos[i] = new Jsonix.Model.ElementPropertyInfo({
                name: 'salePrices',
                typeInfo: metadata.Price,
                collection: true,
                wrapperElementName: new Jsonix.XML.QName('salePrices'),
                elementName: new Jsonix.XML.QName('price')
            });
        }
    }

    // fix: add Error object
    metadata.Error = new Jsonix.Model.ClassInfo({
        name: 'Error'
    });
    metadata.elementInfos.push({
        elementName: new Jsonix.XML.QName('error'),
        typeInfo: metadata.Error
    });
    metadata.Error.propertyInfos = [
        new Jsonix.Model.ElementPropertyInfo({
            name: 'uid',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE
        }),
        new Jsonix.Model.ElementPropertyInfo({
            name: 'moment',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE
        }),
        new Jsonix.Model.ElementPropertyInfo({
            name: 'message',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE
        }),
        //TODO описать более точно с учетом CDATA элементов
        new Jsonix.Model.ElementPropertyInfo({
            name: 'stack',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE
        })
    ];

    // fix ExchangeContainer properties names
    _.find(metadata.ExchangeContainer.propertyInfos,function (prop) {
        return prop.name == 'deliveries-demand';
    }).name = 'deliveries_demand';

    _.find(metadata.ExchangeContainer.propertyInfos,function (prop) {
        return prop.name == 'deliveries-supply';
    }).name = 'deliveries_supply';

}


module.exports = {
    generate: generateMetadata
};