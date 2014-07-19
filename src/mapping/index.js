/**
 * metadata-generator
 * Date: 10.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

//TODO Провести рефракторинг. Выделить в отдельные модули (в прототип).

var _ = require('lodash')
    , DOMParser = require('xmldom').DOMParser
    , XmlToJson = require('./xmlToJson');

var model = null;

////
// Вспомогательные методы
//

/**
 * Преобразует текстовое представление XSD в удобный для дальнешей работы JSON формат
 * @returns {*}
 */
function getXsdAsObject(xsd) {
    var parser, xsdDomDocument, jsonXsd;
    parser = new DOMParser();
    xsdDomDocument = parser.parseFromString(xsd, "application/xml");
    jsonXsd = XmlToJson.ToJSON(xsdDomDocument.documentElement);

    var jsonXsdFix = require('../../res/mapping-xsd-fix.js');

    var fixXsdBlock = function (blockName) {
        _.forEach(jsonXsdFix[blockName], function (fixEl) {
            var elIndex = _.findIndex(jsonXsd[blockName], {
                '$attribute': {
                    'name': fixEl['$attribute'].name
                }
            });
            elIndex ?
                jsonXsd[blockName][elIndex] = fixEl :
                jsonXsd[blockName].push(fixEl);
        });
    };

    _.forEach([
        'xs:element',
        'xs:complexType' ], fixXsdBlock);

    //Debug
    var fs = require('fs-sync');
    fs.write(
        '../../res/MOYsklad.xsd.json',
        require('js-beautify').js_beautify(JSON.stringify(jsonXsd)));

    return jsonXsd;
}

function getTypeInfo(typeName) {
    if (!typeName) return null;

    // base type
    if (typeName.substring(0, 3) == 'xs:')
        return getSimpleTypeName(typeName);

    // enum
    if (typeName in model.enums)
        return 'String';

    // moysklad
    return model.name + '.' + typeName;
}

/**
 * Возвращает наименование простого типа
 * @param name_xsd Наименование типа используемое в XSD схеме
 * @returns {*} Соответствующее наименование для схемы модели
 */
function getSimpleTypeName(name_xsd) {
    switch (name_xsd) {
        case 'xs:base64Binary':
        case 'xs:IDREF':
        case 'xs:ID':
        case 'xs:string':
            return 'String';
        case 'xs:dateTime':
        case 'xs:double':
        case 'xs:long':
        case 'xs:int':
        case 'xs:unsignedShort':
        case 'xs:boolean':
        default:
            if (name_xsd.substring(0, 3) == 'xs:') {
                return name_xsd.charAt(3).toUpperCase() + name_xsd.substring(4);
            } else {
                throw 'Incorrect base type name [' + name_xsd + ']';
            }
    }
}

////
// Разбор XSD

// Enums
function addSimpleType(element_xsd) {
    var enumValues = {};
    _.forEach(element_xsd['xs:restriction']['xs:enumeration'], function (enumerationItem) {
        enumValues[enumerationItem.$attribute.value.toUpperCase()] = enumerationItem.$attribute.value;
    });
    model.enums[element_xsd.$attribute.name] = enumValues;
}

// Elements (global)
function addGlobalElements(elements) {
    _.forEach(elements, function (element) {
        model.elementInfos.push({
            elementName: element.$attribute.name,
            typeInfo: getTypeInfo(element.$attribute.type)
        });
    });
}

// Attributes
function addAttributes(typeInfo, attributes_xsd) {
    _.forEach((attributes_xsd instanceof Array ? attributes_xsd : [attributes_xsd]), function (attributeItem) {
        typeInfo.propertyInfos.push({
            type: 'attribute',
            name: attributeItem.$attribute.name,
            typeInfo: getTypeInfo(attributeItem.$attribute.type)
        });
    });
}

// Elements
function addElements(typeInfo, elements_xsd) {
    //TODO И проверить что генерация модели правильно обработает name вместо elmentName
    //TODO Добавить множественное окончание для массивов "s" - pluralize()?

    _.forEach(elements_xsd instanceof Array ? elements_xsd : [elements_xsd], function (element_xsd) {
        var propertyInfo = {
            type: 'element'
        };
        var el;

        // обычный элемент
        el = element_xsd.$attribute;
        propertyInfo.name = el.name || el.type || el.ref;
        if (el.maxOccurs == 'unbounded') propertyInfo.collection = true;

        //TODO Надо правильно обработать goodPrices в goodFolder
        // элемент коллекция (с вложенными элементами), напр "slots"
        if (element_xsd['xs:complexType']) {
            var el_complexType = element_xsd['xs:complexType']['xs:sequence']['xs:element'].$attribute;
            var elementName = el_complexType.name || el_complexType.ref;
            if (propertyInfo.name != elementName) propertyInfo.elementName = elementName;
            propertyInfo.collection = true;
            propertyInfo.wrapperElementName = propertyInfo.name;
            propertyInfo.typeInfo = getTypeInfo(el_complexType.type || el_complexType.ref);
        } else {
            propertyInfo.typeInfo = getTypeInfo(el.type || el.ref);
        }


        typeInfo.propertyInfos.push(propertyInfo);
    });
}

// AnyElement
function addAnyElement(typeInfo, element_xsd) {
    var propertyInfo = {
        type: 'anyElement'
    };

    var el = element_xsd.$attribute;

    if (el.namespace != '##other')
        throw new Error('Not expected namespace [' + el.namespace + ']');

    if (el.processContents == 'strict')
        propertyInfo.allowDom = false;
    else if (el.processContents == 'skip')
        propertyInfo.allowTypedObject = false;

    if (el.maxOccurs == 'unbounded') {
        propertyInfo.name = 'items';
        propertyInfo.collection = true;
    } else {
        propertyInfo.name = 'item';
    }

    //addPropInfo('mixed', false);

    typeInfo.propertyInfos.push(propertyInfo);
}

// ValueElement
function addValueElement(typeInfo, element_xsd) {
    var propertyInfo = {
        type: 'value'
    };
}


/**
 * Корректировка метаданных.
 * Необходима, т.к. часть элементов не отображается автоматически нужным образом
 * TODO В идеале, все "ручные" доработки модели должны преобразовываться автоматически
 */
function preProcessXsd(xsd_obj) {
    var xsdFix = require('../../res/mapping-xsd-fix.js');

    xsd_obj['xs:element'] = xsd_obj['xs:element'].concat(xsdFix['xs:element']);
    xsd_obj['xs:complexType'] = xsd_obj['xs:complexType'].concat(xsdFix['xs:complexType']);

    return xsd_obj;


    // fix salePrices
    /*for (var i = 0; i < model.AbstractGood.propertyInfos.length; i++) {
     if (model.AbstractGood.propertyInfos[i].name == 'salePrices') {
     model.AbstractGood.propertyInfos[i] = new Jsonix.Model.ElementPropertyInfo({
     name: 'salePrices',
     typeInfo: model.Price,
     collection: true,
     wrapperElementName: new Jsonix.XML.QName('salePrices'),
     elementName: new Jsonix.XML.QName('price')
     });
     }
     }*/

}

// Generator
function generateMetadata(xsd) {
    var xsd_obj = preProcessXsd(getXsdAsObject(xsd));

    // jsonix model
    model = {
        name: 'moysklad'
    };

    // xs:simpleType
    model.enums = {};
    _.forEach(xsd_obj['xs:simpleType'], addSimpleType);

    // xs:element
    model.elementInfos = [];
    addGlobalElements(xsd_obj['xs:element']);

    // xs:complexType
    model.typeInfos = [];
    _.forEach(xsd_obj['xs:complexType'], function (complexType) {
        var typeInfo = {
            type: 'classInfo',
            localName: complexType.$attribute.name,
            propertyInfos: []
        };

        // xs:complexContent
        if (complexType['xs:complexContent']) {

            // xs:extension
            if (complexType['xs:complexContent']['xs:extension']) {
                var extension = complexType['xs:complexContent']['xs:extension'];
                if (extension.$attribute.base) {
                    // Inheritance
                    typeInfo.baseTypeInfo = getTypeInfo(extension.$attribute.base);

                    // xs:all
                    if (extension['xs:all'] && extension['xs:all'].$count > 0)
                        addElements(typeInfo, extension['xs:all']['xs:element']);

                    // xs:attribute
                    if (extension['xs:attribute'])
                        addAttributes(typeInfo, extension['xs:attribute']);

                    // xs:sequence
                    if (extension['xs:sequence'] && extension['xs:sequence'].$count > 0)
                        addElements(typeInfo, extension['xs:sequence']['xs:element']);
                } else {
                    throw '"base" attribute in xs:extension not found';
                }
            }
        }

        // xs:sequence
        if (complexType['xs:sequence']) {
            // xs:element
            if (complexType['xs:sequence']['xs:element'])
                addElements(typeInfo, complexType['xs:sequence']['xs:element']);
            // xs:any
            if (complexType['xs:sequence']['xs:any']) {
                addAnyElement(typeInfo, complexType['xs:sequence']['xs:any'])
            }

        }

        // xs:attribute // (in <xs:complexType name="unit">)
        if (complexType['xs:attribute']) {
            addAttributes(typeInfo, complexType['xs:attribute']);
        }

        model.typeInfos.push(typeInfo);
    });

    return model;
}


module.exports = {
    generate: generateMetadata
};