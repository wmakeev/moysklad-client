// moysklad-client 0.2.2-9 (bundle length 129436)
// Сборка данных описывающих объектную модель сервиса МойСклад
//
// Vitaliy Makeev (w.makeev@gmail.com)
// https://github.com/wmakeev
// 
require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"o2tvoA":[function(require,module,exports){

module.exports = {

    "xs:element": [

        // Меняем структуру наследованя коллекции
        {
            "$attribute": {
                "name": "collection",
                "type": "collection"
            },
            "$count": 0,
            "$value": ""
        },

        // Добавляем элемент uuid
        {
            "$attribute": {
                "name": "uuid",
                "type": "xs:string"
            },
            "$count": 0,
            "$value": ""
        },

        // Добавляем элемент id (возвращается в коллекции)
        {
            "$attribute": {
                "name": "id",
                "type": "xs:string"
            },
            "$count": 0,
            "$value": ""
        },

        // Добавляем элемент error
        {
            "$attribute": {
                "name": "error",
                "type": "error"
            },
            "$count": 0,
            "$value": ""
        }
    ],

    "xs:complexType": [

        // Добавляем описание класса Error
        {
            "$attribute": {
                "name": "error"
            },
            "$count": 1,
            "$value": "",
            "xs:sequence": {
                "$attribute": {

                },
                "$count": 1,
                "$value": "",
                "xs:element": [
                    {
                        "$attribute": {
                            "minOccurs": "0",
                            "name": "uid",
                            "type": "xs:string"
                        },
                        "$count": 0,
                        "$value": ""
                    },
                    {
                        "$attribute": {
                            "minOccurs": "0",
                            "name": "moment",
                            "type": "xs:string"
                        },
                        "$count": 0,
                        "$value": ""
                    },
                    {
                        "$attribute": {
                            "minOccurs": "0",
                            "name": "message",
                            "type": "xs:string"
                        },
                        "$count": 0,
                        "$value": ""
                    },
                    {
                        "$attribute": {
                            "minOccurs": "0",
                            "name": "stack",
                            "type": "xs:string"
                        },
                        "$count": 0,
                        "$value": ""
                    }
                ]
            }
        },

        // Добавляем описание класса Collection внесены поля total, start, count
        {
            "$attribute": {
                "name": "collection"
            },
            "$count": 1,
            "$value": "",
            "xs:complexContent": {
                "$attribute": {

                },
                "$count": 1,
                "$value": "",
                "xs:extension": {
                    "$attribute": {
                        "base": "collectionContainer"
                    },
                    "$count": 2,
                    "$value": "",
                    "xs:sequence": {
                        "$attribute": {

                        },
                        "$count": 0,
                        "$value": ""
                    },
                    "xs:attribute": [
                        {
                            "$attribute": {
                                "name": "total",
                                "type": "xs:int"
                            },
                            "$count": 0,
                            "$value": ""
                        },
                        {
                            "$attribute": {
                                "name": "start",
                                "type": "xs:int"
                            },
                            "$count": 0,
                            "$value": ""
                        },
                        {
                            "$attribute": {
                                "name": "count",
                                "type": "xs:int"
                            },
                            "$count": 0,
                            "$value": ""
                        }
                    ]
                }
            }
        },

        // Обновляем класс AbstractGood
        // Возникла сложность с представлением коллекции salePrices -
        // вложенные элементы price сериализуются как массив salePrices.price[]
        // TODO Возможно ли это предусмотреть стандартным меппингом Jsonix?
        {
            "$attribute": {
                "abstract": "true",
                "name": "abstractGood"
            },
            "$count": 1,
            "$value": "",
            "xs:complexContent": {
                "$attribute": {

                },
                "$count": 1,
                "$value": "",
                "xs:extension": {
                    "$attribute": {
                        "base": "goodFolder"
                    },
                    "$count": 2,
                    "$value": "",
                    "xs:sequence": {
                        "$attribute": {

                        },
                        "$count": 1,
                        "$value": "",
                        "xs:element": [
                            {
                                "$attribute": {
                                    "maxOccurs": "unbounded",
                                    "minOccurs": "0",
                                    "ref": "barcode"
                                },
                                "$count": 0,
                                "$value": ""
                            },
                            {
                                "$attribute": {
                                    "minOccurs": "0",
                                    "name": "salePrices"
                                },
                                "$count": 1,
                                "$value": "",
                                "xs:complexType": {
                                    "$attribute": {

                                    },
                                    "$count": 1,
                                    "$value": "",
                                    "xs:sequence": {
                                        "$attribute": {

                                        },
                                        "$count": 1,
                                        "$value": "",
                                        "xs:element": {
                                            "$attribute": {
                                                "maxOccurs": "unbounded",
                                                "minOccurs": "0",
                                                "name": "price",
                                                "type": "price"
                                            },
                                            "$count": 0,
                                            "$value": ""
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    "xs:attribute": [
                        {
                            "$attribute": {
                                "name": "minPrice",
                                "type": "xs:double",
                                "use": "required"
                            },
                            "$count": 0,
                            "$value": ""
                        },
                        {
                            "$attribute": {
                                "name": "uomUuid",
                                "type": "xs:IDREF"
                            },
                            "$count": 0,
                            "$value": ""
                        },
                        {
                            "$attribute": {
                                "name": "countryUuid",
                                "type": "xs:IDREF"
                            },
                            "$count": 0,
                            "$value": ""
                        },
                        {
                            "$attribute": {
                                "name": "supplierUuid",
                                "type": "xs:IDREF"
                            },
                            "$count": 0,
                            "$value": ""
                        },
                        {
                            "$attribute": {
                                "name": "salePrice",
                                "type": "xs:double"
                            },
                            "$count": 0,
                            "$value": ""
                        },
                        {
                            "$attribute": {
                                "name": "saleCurrencyUuid",
                                "type": "xs:IDREF"
                            },
                            "$count": 0,
                            "$value": ""
                        },
                        {
                            "$attribute": {
                                "name": "buyCurrencyUuid",
                                "type": "xs:IDREF"
                            },
                            "$count": 0,
                            "$value": ""
                        }
                    ]
                }
            }
        }
    ]
};

//module.exports = xsdFix;
},{}],"./res/mapping-xsd-fix":[function(require,module,exports){
module.exports=require('o2tvoA');
},{}],"./res/mapping":[function(require,module,exports){
module.exports=require('xUxYGE');
},{}],"xUxYGE":[function(require,module,exports){
module.exports={"name": "moysklad", "enums": {
    "uomType": {
        "MASS": "mass",
        "VOLUME": "volume",
        "PIECE": "piece"
    },
    "accessMode": {
        "NONE": "NONE",
        "SELF": "SELF",
        "PARENT": "PARENT",
        "NEIGHBOUR": "NEIGHBOUR",
        "ALL": "ALL"
    },
    "attributeType": {
        "STRING": "STRING",
        "LONG": "LONG",
        "TIME": "TIME",
        "ID_CUSTOM": "ID_CUSTOM",
        "FILE": "FILE",
        "DOUBLE": "DOUBLE",
        "BOOLEAN": "BOOLEAN",
        "ID_EMBEDDED": "ID_EMBEDDED",
        "TEXT": "TEXT",
        "LINK": "LINK"
    },
    "editablePeriodType": {
        "ALL": "ALL",
        "CALENDAR_DAYS": "CALENDAR_DAYS",
        "WORK_DAYS": "WORK_DAYS",
        "DATE": "DATE"
    },
    "barcodeType": {
        "EAN8": "EAN8",
        "EAN13": "EAN13",
        "CODE128": "Code128"
    },
    "companyType": {
        "URLI": "URLI",
        "INPR": "INPR",
        "FILI": "FILI"
    },
    "overheadDistribution": {
        "BY_PRICE": "BY_PRICE",
        "BY_WEIGHT": "BY_WEIGHT",
        "BY_VOLUME": "BY_VOLUME"
    },
    "cmlType": {
        "BITRIX": "BITRIX",
        "UMICMS": "UMICMS",
        "HOSTCMS": "HOSTCMS",
        "INSALES": "INSALES",
        "WEBASYST": "WEBASYST",
        "SIMPLA": "SIMPLA",
        "UMIRU": "UMIRU",
        "PRESTASHOP": "PRESTASHOP",
        "SITEEDIT": "SITEEDIT",
        "BITRIXSMB": "BITRIXSMB",
        "FASTSALES": "FASTSALES",
        "MAGENTO": "MAGENTO",
        "DIAFAN": "DIAFAN",
        "SHOPIUM": "SHOPIUM",
        "VIRTUEMART": "VIRTUEMART",
        "ADVANTSHOP": "ADVANTSHOP",
        "RUXONCMS": "RUXONCMS",
        "AGORAPLATFORM": "AGORAPLATFORM"
    }
}, "elementInfos": [
    {
        "elementName": "agent",
        "typeInfo": "moysklad.agent"
    },
    {
        "elementName": "agentPictureDocument",
        "typeInfo": "moysklad.agentPictureDocument"
    },
    {
        "elementName": "amiroConnectorSettings",
        "typeInfo": "moysklad.amiroConnectorSettings"
    },
    {
        "elementName": "attachmentDocument",
        "typeInfo": "moysklad.attachmentDocument"
    },
    {
        "elementName": "barcode",
        "typeInfo": "moysklad.barcode"
    },
    {
        "elementName": "cashIn",
        "typeInfo": "moysklad.cashIn"
    },
    {
        "elementName": "cashOut",
        "typeInfo": "moysklad.cashOut"
    },
    {
        "elementName": "cmlConnectorSettings",
        "typeInfo": "moysklad.cmlConnectorSettings"
    },
    {
        "elementName": "collection",
        "typeInfo": "moysklad.collection"
    },
    {
        "elementName": "company",
        "typeInfo": "moysklad.company"
    },
    {
        "elementName": "consignment",
        "typeInfo": "moysklad.consignment"
    },
    {
        "elementName": "consignmentBarcode",
        "typeInfo": "moysklad.consignmentBarcode"
    },
    {
        "elementName": "contract",
        "typeInfo": "moysklad.contract"
    },
    {
        "elementName": "contractDocument",
        "typeInfo": "moysklad.contractDocument"
    },
    {
        "elementName": "country",
        "typeInfo": "moysklad.country"
    },
    {
        "elementName": "currency",
        "typeInfo": "moysklad.currency"
    },
    {
        "elementName": "customEntity",
        "typeInfo": "moysklad.customEntity"
    },
    {
        "elementName": "customEntityMetadata",
        "typeInfo": "moysklad.customEntityMetadata"
    },
    {
        "elementName": "customerOrder",
        "typeInfo": "moysklad.customerOrder"
    },
    {
        "elementName": "demand",
        "typeInfo": "moysklad.demand"
    },
    {
        "elementName": "document",
        "typeInfo": "moysklad.document"
    },
    {
        "elementName": "documentMiniature",
        "typeInfo": "moysklad.documentMiniature"
    },
    {
        "elementName": "embeddedEntityMetadata",
        "typeInfo": "moysklad.embeddedEntityMetadata"
    },
    {
        "elementName": "employee",
        "typeInfo": "moysklad.employee"
    },
    {
        "elementName": "enter",
        "typeInfo": "moysklad.enter"
    },
    {
        "elementName": "entityTemplatesMetadata",
        "typeInfo": "moysklad.entityTemplatesMetadata"
    },
    {
        "elementName": "exchange",
        "typeInfo": "moysklad.exchangeContainer"
    },
    {
        "elementName": "factureIn",
        "typeInfo": "moysklad.factureIn"
    },
    {
        "elementName": "factureOut",
        "typeInfo": "moysklad.factureOut"
    },
    {
        "elementName": "feature",
        "typeInfo": "moysklad.feature"
    },
    {
        "elementName": "featureBarcode",
        "typeInfo": "moysklad.featureBarcode"
    },
    {
        "elementName": "good",
        "typeInfo": "moysklad.good"
    },
    {
        "elementName": "goodFolder",
        "typeInfo": "moysklad.goodFolder"
    },
    {
        "elementName": "goodImage",
        "typeInfo": "moysklad.goodImage"
    },
    {
        "elementName": "gtd",
        "typeInfo": "moysklad.gtd"
    },
    {
        "elementName": "internalOrder",
        "typeInfo": "moysklad.internalOrder"
    },
    {
        "elementName": "inventory",
        "typeInfo": "moysklad.inventory"
    },
    {
        "elementName": "invoiceIn",
        "typeInfo": "moysklad.invoiceIn"
    },
    {
        "elementName": "invoiceOut",
        "typeInfo": "moysklad.invoiceOut"
    },
    {
        "elementName": "loss",
        "typeInfo": "moysklad.loss"
    },
    {
        "elementName": "move",
        "typeInfo": "moysklad.move"
    },
    {
        "elementName": "myCompany",
        "typeInfo": "moysklad.myCompany"
    },
    {
        "elementName": "operationDocument",
        "typeInfo": "moysklad.operationDocument"
    },
    {
        "elementName": "paymentIn",
        "typeInfo": "moysklad.paymentIn"
    },
    {
        "elementName": "paymentOut",
        "typeInfo": "moysklad.paymentOut"
    },
    {
        "elementName": "priceList",
        "typeInfo": "moysklad.priceList"
    },
    {
        "elementName": "priceType",
        "typeInfo": "moysklad.priceType"
    },
    {
        "elementName": "processing",
        "typeInfo": "moysklad.processing"
    },
    {
        "elementName": "processingOrder",
        "typeInfo": "moysklad.processingOrder"
    },
    {
        "elementName": "processingPlan",
        "typeInfo": "moysklad.processingPlan"
    },
    {
        "elementName": "processingPlanFolder",
        "typeInfo": "moysklad.processingPlanFolder"
    },
    {
        "elementName": "project",
        "typeInfo": "moysklad.project"
    },
    {
        "elementName": "purchaseOrder",
        "typeInfo": "moysklad.purchaseOrder"
    },
    {
        "elementName": "purchaseReturn",
        "typeInfo": "moysklad.purchaseReturn"
    },
    {
        "elementName": "reportTemplatesMetadata",
        "typeInfo": "moysklad.reportTemplatesMetadata"
    },
    {
        "elementName": "retailCashIn",
        "typeInfo": "moysklad.retailCashIn"
    },
    {
        "elementName": "retailCashOut",
        "typeInfo": "moysklad.retailCashOut"
    },
    {
        "elementName": "retailDemand",
        "typeInfo": "moysklad.retailDemand"
    },
    {
        "elementName": "retailSalesReturn",
        "typeInfo": "moysklad.retailSalesReturn"
    },
    {
        "elementName": "salesReturn",
        "typeInfo": "moysklad.salesReturn"
    },
    {
        "elementName": "service",
        "typeInfo": "moysklad.service"
    },
    {
        "elementName": "skladShareMode",
        "typeInfo": "moysklad.skladShareMode"
    },
    {
        "elementName": "slot",
        "typeInfo": "moysklad.slot"
    },
    {
        "elementName": "supply",
        "typeInfo": "moysklad.supply"
    },
    {
        "elementName": "template",
        "typeInfo": "moysklad.template"
    },
    {
        "elementName": "thing",
        "typeInfo": "moysklad.thing"
    },
    {
        "elementName": "tinyImage",
        "typeInfo": "moysklad.tinyImage"
    },
    {
        "elementName": "uom",
        "typeInfo": "moysklad.uom"
    },
    {
        "elementName": "warehouse",
        "typeInfo": "moysklad.warehouse"
    },
    {
        "elementName": "workflow",
        "typeInfo": "moysklad.workflow"
    },
    {
        "elementName": "ymlConnectorSettings",
        "typeInfo": "moysklad.ymlConnectorSettings"
    },
    {
        "elementName": "collection",
        "typeInfo": "moysklad.collection"
    },
    {
        "elementName": "uuid",
        "typeInfo": "String"
    },
    {
        "elementName": "id",
        "typeInfo": "String"
    },
    {
        "elementName": "error",
        "typeInfo": "moysklad.error"
    }
], "typeInfos": [
    {
        "type": "classInfo",
        "localName": "service",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.abstractGood"
    },
    {
        "type": "classInfo",
        "localName": "abstractGood",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "minPrice",
                "typeInfo": "Double"
            },
            {
                "type": "attribute",
                "name": "uomUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "countryUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "supplierUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "salePrice",
                "typeInfo": "Double"
            },
            {
                "type": "attribute",
                "name": "saleCurrencyUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "buyCurrencyUuid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "barcode",
                "collection": true,
                "typeInfo": "moysklad.barcode"
            },
            {
                "type": "element",
                "name": "salePrices",
                "elementName": "price",
                "collection": true,
                "wrapperElementName": "salePrices",
                "typeInfo": "moysklad.price"
            }
        ],
        "baseTypeInfo": "moysklad.goodFolder"
    },
    {
        "type": "classInfo",
        "localName": "goodFolder",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "archived",
                "typeInfo": "Boolean"
            },
            {
                "type": "attribute",
                "name": "parentUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "productCode",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "vat",
                "typeInfo": "Long"
            },
            {
                "type": "element",
                "name": "attribute",
                "collection": true,
                "typeInfo": "moysklad.goodAttributeValue"
            }
        ],
        "baseTypeInfo": "moysklad.classifier"
    },
    {
        "type": "classInfo",
        "localName": "classifier",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.legendEntity"
    },
    {
        "type": "classInfo",
        "localName": "legendEntity",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "name",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "code",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "externalcode",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "description",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.infoEntity"
    },
    {
        "type": "classInfo",
        "localName": "infoEntity",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "updated",
                "typeInfo": "DateTime"
            },
            {
                "type": "attribute",
                "name": "updatedBy",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "deleted",
                "typeInfo": "DateTime"
            }
        ],
        "baseTypeInfo": "moysklad.entity"
    },
    {
        "type": "classInfo",
        "localName": "entity",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "readMode",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "changeMode",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "groupUuid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "groupId",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.accountEntity"
    },
    {
        "type": "classInfo",
        "localName": "accountEntity",
        "propertyInfos": [
            {
                "type": "element",
                "name": "accountUuid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "accountId",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "uuid",
                "typeInfo": "String"
            }
        ]
    },
    {
        "type": "classInfo",
        "localName": "uom",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "type",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.predefinedLegendableEntity"
    },
    {
        "type": "classInfo",
        "localName": "predefinedLegendableEntity",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.legendEntity"
    },
    {
        "type": "classInfo",
        "localName": "country",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.predefinedLegendableEntity"
    },
    {
        "type": "classInfo",
        "localName": "agent",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "discount",
                "typeInfo": "Double"
            },
            {
                "type": "attribute",
                "name": "autoDiscount",
                "typeInfo": "Double"
            },
            {
                "type": "attribute",
                "name": "discountCardNumber",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "discountCorrection",
                "typeInfo": "Double"
            },
            {
                "type": "attribute",
                "name": "stateUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "employeeUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "priceTypeUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "archived",
                "typeInfo": "Boolean"
            },
            {
                "type": "attribute",
                "name": "created",
                "typeInfo": "DateTime"
            },
            {
                "type": "element",
                "name": "attribute",
                "collection": true,
                "typeInfo": "moysklad.agentAttributeValue"
            },
            {
                "type": "element",
                "name": "requisite",
                "typeInfo": "moysklad.requisite"
            },
            {
                "type": "element",
                "name": "bankAccount",
                "collection": true,
                "typeInfo": "moysklad.agentAccount"
            },
            {
                "type": "element",
                "name": "contact",
                "typeInfo": "moysklad.contact"
            },
            {
                "type": "element",
                "name": "contactPerson",
                "collection": true,
                "typeInfo": "moysklad.contactPerson"
            },
            {
                "type": "element",
                "name": "agentNewsItem",
                "collection": true,
                "typeInfo": "moysklad.agentNewsItem"
            },
            {
                "type": "element",
                "name": "tags",
                "elementName": "tag",
                "collection": true,
                "wrapperElementName": "tags",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.legendEntity"
    },
    {
        "type": "classInfo",
        "localName": "agentAttributeValue",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "agentUuid",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.attributeValue"
    },
    {
        "type": "classInfo",
        "localName": "attributeValue",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "metadataUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "valueText",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "valueString",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "doubleValue",
                "typeInfo": "Double"
            },
            {
                "type": "attribute",
                "name": "longValue",
                "typeInfo": "Long"
            },
            {
                "type": "attribute",
                "name": "booleanValue",
                "typeInfo": "Boolean"
            },
            {
                "type": "attribute",
                "name": "timeValue",
                "typeInfo": "DateTime"
            },
            {
                "type": "attribute",
                "name": "entityValueUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "agentValueUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "goodValueUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "placeValueUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "consignmentValueUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "contractValueUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "projectValueUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "employeeValueUuid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "file",
                "typeInfo": "moysklad.attachmentDocument"
            }
        ],
        "baseTypeInfo": "moysklad.infoEntity"
    },
    {
        "type": "classInfo",
        "localName": "attributeMetadata",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "attrType",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "dictionaryMetadataUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "entityMetadataUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "feature",
                "typeInfo": "Boolean"
            },
            {
                "type": "attribute",
                "name": "position",
                "typeInfo": "Int"
            },
            {
                "type": "attribute",
                "name": "required",
                "typeInfo": "Boolean"
            }
        ],
        "baseTypeInfo": "moysklad.legendEntity"
    },
    {
        "type": "classInfo",
        "localName": "entityMetadata",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "uniqueCode",
                "typeInfo": "Boolean"
            },
            {
                "type": "attribute",
                "name": "codeValueType",
                "typeInfo": "Int"
            },
            {
                "type": "attribute",
                "name": "independentNameGenerator",
                "typeInfo": "Boolean"
            },
            {
                "type": "attribute",
                "name": "editOnlyByAuthor",
                "typeInfo": "Boolean"
            },
            {
                "type": "attribute",
                "name": "noEditFromOtherPlaceSource",
                "typeInfo": "Boolean"
            },
            {
                "type": "attribute",
                "name": "noApplicableFromOtherPlaceSource",
                "typeInfo": "Boolean"
            },
            {
                "type": "attribute",
                "name": "noEditFromOtherPlaceTarget",
                "typeInfo": "Boolean"
            },
            {
                "type": "attribute",
                "name": "noApplicableFromOtherPlaceTarget",
                "typeInfo": "Boolean"
            },
            {
                "type": "attribute",
                "name": "editablePeriod",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "editableCalendarDays",
                "typeInfo": "Int"
            },
            {
                "type": "attribute",
                "name": "editableWorkDays",
                "typeInfo": "Int"
            },
            {
                "type": "attribute",
                "name": "editableFromDate",
                "typeInfo": "DateTime"
            },
            {
                "type": "element",
                "name": "attributeMetadata",
                "collection": true,
                "typeInfo": "moysklad.attributeMetadata"
            }
        ],
        "baseTypeInfo": "moysklad.legendEntity"
    },
    {
        "type": "classInfo",
        "localName": "customEntity",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "entityMetadataUuid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "attribute",
                "collection": true,
                "typeInfo": "moysklad.customEntityAttributeValue"
            }
        ],
        "baseTypeInfo": "moysklad.legendEntity"
    },
    {
        "type": "classInfo",
        "localName": "customEntityMetadata",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.entityMetadata"
    },
    {
        "type": "classInfo",
        "localName": "customEntityAttributeValue",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "customEntityUuid",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.attributeValue"
    },
    {
        "type": "classInfo",
        "localName": "attachmentDocument",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.attachableDocument"
    },
    {
        "type": "classInfo",
        "localName": "attachableDocument",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.document"
    },
    {
        "type": "classInfo",
        "localName": "document",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "created",
                "typeInfo": "DateTime"
            },
            {
                "type": "attribute",
                "name": "filename",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "miniatureUuid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "contents",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.legendEntity"
    },
    {
        "type": "classInfo",
        "localName": "documentMiniature",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.document"
    },
    {
        "type": "classInfo",
        "localName": "goodAttributeValue",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "goodUuid",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.attributeValue"
    },
    {
        "type": "classInfo",
        "localName": "warehouse",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "agentUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "parentUuid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "attribute",
                "collection": true,
                "typeInfo": "moysklad.placeAttributeValue"
            },
            {
                "type": "element",
                "name": "contact",
                "typeInfo": "moysklad.contact"
            },
            {
                "type": "element",
                "name": "slots",
                "elementName": "slot",
                "collection": true,
                "wrapperElementName": "slots",
                "typeInfo": "moysklad.slot"
            }
        ],
        "baseTypeInfo": "moysklad.classifier"
    },
    {
        "type": "classInfo",
        "localName": "placeAttributeValue",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "placeUuid",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.attributeValue"
    },
    {
        "type": "classInfo",
        "localName": "contact",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "address",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "phones",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "faxes",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "mobiles",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "email",
                "typeInfo": "String"
            }
        ]
    },
    {
        "type": "classInfo",
        "localName": "slot",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "warehouseUuid",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.legendEntity"
    },
    {
        "type": "classInfo",
        "localName": "consignment",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "goodUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "isDefault",
                "typeInfo": "Boolean"
            },
            {
                "type": "element",
                "name": "barcode",
                "collection": true,
                "typeInfo": "moysklad.consignmentBarcode"
            },
            {
                "type": "element",
                "name": "attribute",
                "collection": true,
                "typeInfo": "moysklad.consignmentAttributeValue"
            },
            {
                "type": "element",
                "name": "feature",
                "typeInfo": "moysklad.feature"
            }
        ],
        "baseTypeInfo": "moysklad.legendEntity"
    },
    {
        "type": "classInfo",
        "localName": "consignmentBarcode",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.abstractBarcode"
    },
    {
        "type": "classInfo",
        "localName": "abstractBarcode",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "barcode",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "barcodeType",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.entity"
    },
    {
        "type": "classInfo",
        "localName": "consignmentAttributeValue",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "consignmentUuid",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.attributeValue"
    },
    {
        "type": "classInfo",
        "localName": "feature",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "archived",
                "typeInfo": "Boolean"
            },
            {
                "type": "attribute",
                "name": "goodUuid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "attribute",
                "collection": true,
                "typeInfo": "moysklad.featureAttributeValue"
            },
            {
                "type": "element",
                "name": "barcode",
                "collection": true,
                "typeInfo": "moysklad.featureBarcode"
            }
        ],
        "baseTypeInfo": "moysklad.legendEntity"
    },
    {
        "type": "classInfo",
        "localName": "featureAttributeValue",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.attributeValue"
    },
    {
        "type": "classInfo",
        "localName": "featureBarcode",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.abstractBarcode"
    },
    {
        "type": "classInfo",
        "localName": "good",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "isSerialTrackable",
                "typeInfo": "Boolean"
            },
            {
                "type": "attribute",
                "name": "buyPrice",
                "typeInfo": "Double"
            },
            {
                "type": "attribute",
                "name": "minimumBalance",
                "typeInfo": "Double"
            },
            {
                "type": "attribute",
                "name": "weight",
                "typeInfo": "Double"
            },
            {
                "type": "attribute",
                "name": "volume",
                "typeInfo": "Double"
            },
            {
                "type": "element",
                "name": "pack",
                "collection": true,
                "typeInfo": "moysklad.goodPack"
            },
            {
                "type": "element",
                "name": "preferences",
                "elementName": "preference",
                "collection": true,
                "wrapperElementName": "preferences",
                "typeInfo": "moysklad.goodSlotPreference"
            },
            {
                "type": "element",
                "name": "images",
                "elementName": "image",
                "collection": true,
                "wrapperElementName": "images",
                "typeInfo": "moysklad.goodImage"
            }
        ],
        "baseTypeInfo": "moysklad.abstractGood"
    },
    {
        "type": "classInfo",
        "localName": "goodPack",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "quantity",
                "typeInfo": "Double"
            },
            {
                "type": "attribute",
                "name": "uomUuid",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.entity"
    },
    {
        "type": "classInfo",
        "localName": "goodSlotPreference",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "slotUuid",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.entity"
    },
    {
        "type": "classInfo",
        "localName": "goodImage",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "tinyUuid",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.attachableDocument"
    },
    {
        "type": "classInfo",
        "localName": "tinyImage",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.document"
    },
    {
        "type": "classInfo",
        "localName": "contract",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "agentUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "currencyUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "moment",
                "typeInfo": "DateTime"
            },
            {
                "type": "attribute",
                "name": "ownCompanyUuid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "attribute",
                "collection": true,
                "typeInfo": "moysklad.contractAttributeValue"
            },
            {
                "type": "element",
                "name": "document",
                "collection": true,
                "typeInfo": "moysklad.contractDocument"
            },
            {
                "type": "element",
                "name": "sum",
                "typeInfo": "moysklad.moneyAmount"
            }
        ],
        "baseTypeInfo": "moysklad.legendEntity"
    },
    {
        "type": "classInfo",
        "localName": "contractAttributeValue",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "contractUuid",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.attributeValue"
    },
    {
        "type": "classInfo",
        "localName": "currency",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "enteredRate",
                "typeInfo": "Double"
            },
            {
                "type": "attribute",
                "name": "invertRate",
                "typeInfo": "Boolean"
            },
            {
                "type": "attribute",
                "name": "rate",
                "typeInfo": "Double"
            },
            {
                "type": "element",
                "name": "major",
                "typeInfo": "moysklad.unit"
            },
            {
                "type": "element",
                "name": "minor",
                "typeInfo": "moysklad.unit"
            }
        ],
        "baseTypeInfo": "moysklad.legendEntity"
    },
    {
        "type": "classInfo",
        "localName": "unit",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "s1",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "s24",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "s5",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "sex",
                "typeInfo": "UnsignedShort"
            }
        ]
    },
    {
        "type": "classInfo",
        "localName": "contractDocument",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "contractUuid",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.printedDocument"
    },
    {
        "type": "classInfo",
        "localName": "printedDocument",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "emailedDate",
                "typeInfo": "DateTime"
            },
            {
                "type": "attribute",
                "name": "publicId",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.document"
    },
    {
        "type": "classInfo",
        "localName": "moneyAmount",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "sum",
                "typeInfo": "Double"
            },
            {
                "type": "attribute",
                "name": "sumInCurrency",
                "typeInfo": "Double"
            }
        ]
    },
    {
        "type": "classInfo",
        "localName": "project",
        "propertyInfos": [
            {
                "type": "element",
                "name": "attribute",
                "collection": true,
                "typeInfo": "moysklad.projectAttributeValue"
            }
        ],
        "baseTypeInfo": "moysklad.legendEntity"
    },
    {
        "type": "classInfo",
        "localName": "projectAttributeValue",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "projectUuid",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.attributeValue"
    },
    {
        "type": "classInfo",
        "localName": "employee",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "city",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "email",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "fax",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "firstName",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "icqNumber",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "lastName",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "middleName",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "mobile",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "phone",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "postalAddress",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "postalCode",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "pzInternalNumber",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "skypeName",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "uid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "attribute",
                "collection": true,
                "typeInfo": "moysklad.employeeAttributeValue"
            }
        ],
        "baseTypeInfo": "moysklad.legendEntity"
    },
    {
        "type": "classInfo",
        "localName": "employeeAttributeValue",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "employeeUuid",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.attributeValue"
    },
    {
        "type": "classInfo",
        "localName": "requisite",
        "propertyInfos": [
            {
                "type": "element",
                "name": "bankAccount",
                "typeInfo": "moysklad.agentAccount"
            },
            {
                "type": "attribute",
                "name": "legalTitle",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "legalAddress",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "actualAddress",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "inn",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "kpp",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "okpo",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "ogrn",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "ogrnip",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "nomerSvidetelstva",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "dataSvidetelstva",
                "typeInfo": "DateTime"
            }
        ]
    },
    {
        "type": "classInfo",
        "localName": "agentAccount",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "accountNumber",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "bankLocation",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "bankName",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "bic",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "correspondentAccount",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "isDefault",
                "typeInfo": "Boolean"
            }
        ],
        "baseTypeInfo": "moysklad.infoEntity"
    },
    {
        "type": "classInfo",
        "localName": "contactPerson",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "email",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "phone",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "position",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.legendEntity"
    },
    {
        "type": "classInfo",
        "localName": "agentNewsItem",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "moment",
                "typeInfo": "DateTime"
            },
            {
                "type": "element",
                "name": "text",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.infoEntity"
    },
    {
        "type": "classInfo",
        "localName": "state",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.legendEntity"
    },
    {
        "type": "classInfo",
        "localName": "priceType",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "index",
                "typeInfo": "Int"
            },
            {
                "type": "attribute",
                "name": "name",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.infoEntity"
    },
    {
        "type": "classInfo",
        "localName": "barcode",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.abstractBarcode"
    },
    {
        "type": "classInfo",
        "localName": "goodPrices",
        "propertyInfos": [
            {
                "type": "element",
                "name": "price",
                "collection": true,
                "typeInfo": "moysklad.price"
            }
        ]
    },
    {
        "type": "classInfo",
        "localName": "price",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "currencyUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "priceTypeUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "value",
                "typeInfo": "Double"
            }
        ],
        "baseTypeInfo": "moysklad.entity"
    },
    {
        "type": "classInfo",
        "localName": "collectionContainer",
        "propertyInfos": [
            {
                "type": "anyElement",
                "name": "items",
                "collection": true
            }
        ]
    },
    {
        "type": "classInfo",
        "localName": "exchangeContainer",
        "propertyInfos": [
            {
                "type": "element",
                "name": "workflow",
                "collection": true,
                "wrapperElementName": "workflow",
                "typeInfo": "moysklad.workflow"
            },
            {
                "type": "element",
                "name": "shareModes",
                "elementName": "shareMode",
                "collection": true,
                "wrapperElementName": "shareModes",
                "typeInfo": "moysklad.skladShareMode"
            },
            {
                "type": "element",
                "name": "customEntityMetadata",
                "collection": true,
                "wrapperElementName": "customEntityMetadata",
                "typeInfo": "moysklad.customEntityMetadata"
            },
            {
                "type": "element",
                "name": "embeddedEntityMetadata",
                "collection": true,
                "wrapperElementName": "embeddedEntityMetadata",
                "typeInfo": "moysklad.embeddedEntityMetadata"
            },
            {
                "type": "element",
                "name": "entityTemplatesMetadata",
                "collection": true,
                "wrapperElementName": "entityTemplatesMetadata",
                "typeInfo": "moysklad.entityTemplatesMetadata"
            },
            {
                "type": "element",
                "name": "reportTemplatesMetadata",
                "collection": true,
                "wrapperElementName": "reportTemplatesMetadata",
                "typeInfo": "moysklad.reportTemplatesMetadata"
            },
            {
                "type": "element",
                "name": "customEntity",
                "collection": true,
                "wrapperElementName": "customEntity",
                "typeInfo": "moysklad.customEntity"
            },
            {
                "type": "element",
                "name": "currencies",
                "elementName": "currency",
                "collection": true,
                "wrapperElementName": "currencies",
                "typeInfo": "moysklad.currency"
            },
            {
                "type": "element",
                "name": "country",
                "collection": true,
                "wrapperElementName": "country",
                "typeInfo": "moysklad.country"
            },
            {
                "type": "element",
                "name": "gtd",
                "collection": true,
                "wrapperElementName": "gtd",
                "typeInfo": "moysklad.gtd"
            },
            {
                "type": "element",
                "name": "uoms",
                "elementName": "uom",
                "collection": true,
                "wrapperElementName": "uoms",
                "typeInfo": "moysklad.uom"
            },
            {
                "type": "element",
                "name": "myCompany",
                "collection": true,
                "wrapperElementName": "myCompany",
                "typeInfo": "moysklad.myCompany"
            },
            {
                "type": "element",
                "name": "agents",
                "elementName": "agent",
                "collection": true,
                "wrapperElementName": "agents",
                "typeInfo": "moysklad.agent"
            },
            {
                "type": "element",
                "name": "companies",
                "elementName": "company",
                "collection": true,
                "wrapperElementName": "companies",
                "typeInfo": "moysklad.company"
            },
            {
                "type": "element",
                "name": "goodFolders",
                "elementName": "goodFolder",
                "collection": true,
                "wrapperElementName": "goodFolders",
                "typeInfo": "moysklad.goodFolder"
            },
            {
                "type": "element",
                "name": "goods",
                "elementName": "good",
                "collection": true,
                "wrapperElementName": "goods",
                "typeInfo": "moysklad.good"
            },
            {
                "type": "element",
                "name": "service",
                "collection": true,
                "wrapperElementName": "service",
                "typeInfo": "moysklad.service"
            },
            {
                "type": "element",
                "name": "things",
                "elementName": "thing",
                "collection": true,
                "wrapperElementName": "things",
                "typeInfo": "moysklad.thing"
            },
            {
                "type": "element",
                "name": "employees",
                "elementName": "employee",
                "collection": true,
                "wrapperElementName": "employees",
                "typeInfo": "moysklad.employee"
            },
            {
                "type": "element",
                "name": "warehouses",
                "elementName": "warehouse",
                "collection": true,
                "wrapperElementName": "warehouses",
                "typeInfo": "moysklad.warehouse"
            },
            {
                "type": "element",
                "name": "project",
                "collection": true,
                "wrapperElementName": "project",
                "typeInfo": "moysklad.project"
            },
            {
                "type": "element",
                "name": "contract",
                "collection": true,
                "wrapperElementName": "contract",
                "typeInfo": "moysklad.contract"
            },
            {
                "type": "element",
                "name": "processingPlans",
                "elementName": "processingPlan",
                "collection": true,
                "wrapperElementName": "processingPlans",
                "typeInfo": "moysklad.processingPlan"
            },
            {
                "type": "element",
                "name": "features",
                "elementName": "feature",
                "collection": true,
                "wrapperElementName": "features",
                "typeInfo": "moysklad.feature"
            },
            {
                "type": "element",
                "name": "consignments",
                "elementName": "consignment",
                "collection": true,
                "wrapperElementName": "consignments",
                "typeInfo": "moysklad.consignment"
            },
            {
                "type": "element",
                "name": "priceLists",
                "elementName": "priceList",
                "collection": true,
                "wrapperElementName": "priceLists",
                "typeInfo": "moysklad.priceList"
            },
            {
                "type": "element",
                "name": "paymentIn",
                "collection": true,
                "wrapperElementName": "paymentIn",
                "typeInfo": "moysklad.paymentIn"
            },
            {
                "type": "element",
                "name": "paymentOut",
                "collection": true,
                "wrapperElementName": "paymentOut",
                "typeInfo": "moysklad.paymentOut"
            },
            {
                "type": "element",
                "name": "factureIn",
                "collection": true,
                "wrapperElementName": "factureIn",
                "typeInfo": "moysklad.factureIn"
            },
            {
                "type": "element",
                "name": "factureOut",
                "collection": true,
                "wrapperElementName": "factureOut",
                "typeInfo": "moysklad.factureOut"
            },
            {
                "type": "element",
                "name": "cashIn",
                "collection": true,
                "wrapperElementName": "cashIn",
                "typeInfo": "moysklad.cashIn"
            },
            {
                "type": "element",
                "name": "cashOut",
                "collection": true,
                "wrapperElementName": "cashOut",
                "typeInfo": "moysklad.cashOut"
            },
            {
                "type": "element",
                "name": "deliveries-demand",
                "elementName": "demand",
                "collection": true,
                "wrapperElementName": "deliveries-demand",
                "typeInfo": "moysklad.demand"
            },
            {
                "type": "element",
                "name": "deliveries-supply",
                "elementName": "supply",
                "collection": true,
                "wrapperElementName": "deliveries-supply",
                "typeInfo": "moysklad.supply"
            },
            {
                "type": "element",
                "name": "retailCashIn",
                "collection": true,
                "wrapperElementName": "retailCashIn",
                "typeInfo": "moysklad.retailCashIn"
            },
            {
                "type": "element",
                "name": "retailCashOut",
                "collection": true,
                "wrapperElementName": "retailCashOut",
                "typeInfo": "moysklad.retailCashOut"
            },
            {
                "type": "element",
                "name": "retailDemand",
                "collection": true,
                "wrapperElementName": "retailDemand",
                "typeInfo": "moysklad.retailDemand"
            },
            {
                "type": "element",
                "name": "retailSalesReturn",
                "collection": true,
                "wrapperElementName": "retailSalesReturn",
                "typeInfo": "moysklad.retailSalesReturn"
            },
            {
                "type": "element",
                "name": "inventories",
                "elementName": "inventory",
                "collection": true,
                "wrapperElementName": "inventories",
                "typeInfo": "moysklad.inventory"
            },
            {
                "type": "element",
                "name": "moves",
                "elementName": "move",
                "collection": true,
                "wrapperElementName": "moves",
                "typeInfo": "moysklad.move"
            },
            {
                "type": "element",
                "name": "losses",
                "elementName": "loss",
                "collection": true,
                "wrapperElementName": "losses",
                "typeInfo": "moysklad.loss"
            },
            {
                "type": "element",
                "name": "enters",
                "elementName": "enter",
                "collection": true,
                "wrapperElementName": "enters",
                "typeInfo": "moysklad.enter"
            },
            {
                "type": "element",
                "name": "invoicesIn",
                "elementName": "invoiceIn",
                "collection": true,
                "wrapperElementName": "invoicesIn",
                "typeInfo": "moysklad.invoiceIn"
            },
            {
                "type": "element",
                "name": "invoicesOut",
                "elementName": "invoiceOut",
                "collection": true,
                "wrapperElementName": "invoicesOut",
                "typeInfo": "moysklad.invoiceOut"
            },
            {
                "type": "element",
                "name": "salesReturns",
                "elementName": "salesReturn",
                "collection": true,
                "wrapperElementName": "salesReturns",
                "typeInfo": "moysklad.salesReturn"
            },
            {
                "type": "element",
                "name": "purchaseReturns",
                "elementName": "purchaseReturn",
                "collection": true,
                "wrapperElementName": "purchaseReturns",
                "typeInfo": "moysklad.purchaseReturn"
            },
            {
                "type": "element",
                "name": "processings",
                "elementName": "processing",
                "collection": true,
                "wrapperElementName": "processings",
                "typeInfo": "moysklad.processing"
            },
            {
                "type": "element",
                "name": "customerOrders",
                "elementName": "customerOrder",
                "collection": true,
                "wrapperElementName": "customerOrders",
                "typeInfo": "moysklad.customerOrder"
            },
            {
                "type": "element",
                "name": "purchaseOrders",
                "elementName": "purchaseOrder",
                "collection": true,
                "wrapperElementName": "purchaseOrders",
                "typeInfo": "moysklad.purchaseOrder"
            },
            {
                "type": "element",
                "name": "internalOrders",
                "elementName": "internalOrder",
                "collection": true,
                "wrapperElementName": "internalOrders",
                "typeInfo": "moysklad.internalOrder"
            },
            {
                "type": "element",
                "name": "proccessingOrders",
                "elementName": "processingOrder",
                "collection": true,
                "wrapperElementName": "proccessingOrders",
                "typeInfo": "moysklad.processingOrder"
            },
            {
                "type": "element",
                "name": "amiroConnectors",
                "elementName": "amiroConnectorSettings",
                "collection": true,
                "wrapperElementName": "amiroConnectors",
                "typeInfo": "moysklad.amiroConnectorSettings"
            },
            {
                "type": "element",
                "name": "cmlConnectors",
                "elementName": "cmlConnectorSettings",
                "collection": true,
                "wrapperElementName": "cmlConnectors",
                "typeInfo": "moysklad.cmlConnectorSettings"
            },
            {
                "type": "element",
                "name": "ymlConnectors",
                "elementName": "ymlConnectorSettings",
                "collection": true,
                "wrapperElementName": "ymlConnectors",
                "typeInfo": "moysklad.ymlConnectorSettings"
            }
        ]
    },
    {
        "type": "classInfo",
        "localName": "workflow",
        "propertyInfos": [
            {
                "type": "element",
                "name": "state",
                "collection": true,
                "typeInfo": "moysklad.state"
            }
        ],
        "baseTypeInfo": "moysklad.legendEntity"
    },
    {
        "type": "classInfo",
        "localName": "skladShareMode",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.shareMode"
    },
    {
        "type": "classInfo",
        "localName": "shareMode",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.legendEntity"
    },
    {
        "type": "classInfo",
        "localName": "embeddedEntityMetadata",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.entityMetadata"
    },
    {
        "type": "classInfo",
        "localName": "entityTemplatesMetadata",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.templatesMetadata"
    },
    {
        "type": "classInfo",
        "localName": "templatesMetadata",
        "propertyInfos": [
            {
                "type": "element",
                "name": "template",
                "collection": true,
                "typeInfo": "moysklad.template"
            }
        ],
        "baseTypeInfo": "moysklad.legendEntity"
    },
    {
        "type": "classInfo",
        "localName": "template",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.document"
    },
    {
        "type": "classInfo",
        "localName": "reportTemplatesMetadata",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.templatesMetadata"
    },
    {
        "type": "classInfo",
        "localName": "gtd",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.legendEntity"
    },
    {
        "type": "classInfo",
        "localName": "myCompany",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.company"
    },
    {
        "type": "classInfo",
        "localName": "company",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "director",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "chiefAccountant",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "payerVat",
                "typeInfo": "Boolean"
            },
            {
                "type": "attribute",
                "name": "companyType",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "sign",
                "typeInfo": "moysklad.agentPictureDocument"
            },
            {
                "type": "element",
                "name": "stamp",
                "typeInfo": "moysklad.agentPictureDocument"
            }
        ],
        "baseTypeInfo": "moysklad.agent"
    },
    {
        "type": "classInfo",
        "localName": "agentPictureDocument",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.attachableDocument"
    },
    {
        "type": "classInfo",
        "localName": "thing",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "goodUuid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "attribute",
                "collection": true,
                "typeInfo": "moysklad.thingAttributeValue"
            }
        ],
        "baseTypeInfo": "moysklad.legendEntity"
    },
    {
        "type": "classInfo",
        "localName": "thingAttributeValue",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "thingUuid",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.attributeValue"
    },
    {
        "type": "classInfo",
        "localName": "processingPlan",
        "propertyInfos": [
            {
                "type": "element",
                "name": "material",
                "collection": true,
                "typeInfo": "moysklad.material"
            },
            {
                "type": "element",
                "name": "price",
                "typeInfo": "moysklad.moneyAmount"
            },
            {
                "type": "element",
                "name": "product",
                "collection": true,
                "typeInfo": "moysklad.product"
            }
        ],
        "baseTypeInfo": "moysklad.processingPlanFolder"
    },
    {
        "type": "classInfo",
        "localName": "processingPlanFolder",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "parentUuid",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.classifier"
    },
    {
        "type": "classInfo",
        "localName": "material",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "isOptional",
                "typeInfo": "Boolean"
            }
        ],
        "baseTypeInfo": "moysklad.processingPlanItem"
    },
    {
        "type": "classInfo",
        "localName": "processingPlanItem",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "goodUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "planUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "quantity",
                "typeInfo": "Double"
            }
        ],
        "baseTypeInfo": "moysklad.entity"
    },
    {
        "type": "classInfo",
        "localName": "product",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "costShare",
                "typeInfo": "Double"
            }
        ],
        "baseTypeInfo": "moysklad.processingPlanItem"
    },
    {
        "type": "classInfo",
        "localName": "priceList",
        "propertyInfos": [
            {
                "type": "element",
                "name": "metadata",
                "typeInfo": "moysklad.priceListMetadata"
            },
            {
                "type": "element",
                "name": "priceListRow",
                "collection": true,
                "typeInfo": "moysklad.priceListRow"
            }
        ],
        "baseTypeInfo": "moysklad.operationWithPositions"
    },
    {
        "type": "classInfo",
        "localName": "operationWithPositions",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.operation"
    },
    {
        "type": "classInfo",
        "localName": "operation",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "stateUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "targetAgentUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "sourceAgentUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "targetStoreUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "sourceStoreUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "applicable",
                "typeInfo": "Boolean"
            },
            {
                "type": "attribute",
                "name": "projectUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "contractUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "moment",
                "typeInfo": "DateTime"
            },
            {
                "type": "attribute",
                "name": "targetAccountUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "sourceAccountUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "payerVat",
                "typeInfo": "Boolean"
            },
            {
                "type": "attribute",
                "name": "retailStoreUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "currencyUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "rate",
                "typeInfo": "Double"
            },
            {
                "type": "attribute",
                "name": "vatIncluded",
                "typeInfo": "Boolean"
            },
            {
                "type": "attribute",
                "name": "created",
                "typeInfo": "DateTime"
            },
            {
                "type": "attribute",
                "name": "createdBy",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "employeeUuid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "attribute",
                "collection": true,
                "typeInfo": "moysklad.operationAttributeValue"
            },
            {
                "type": "element",
                "name": "document",
                "collection": true,
                "typeInfo": "moysklad.operationDocument"
            },
            {
                "type": "element",
                "name": "sum",
                "typeInfo": "moysklad.moneyAmount"
            }
        ],
        "baseTypeInfo": "moysklad.legendEntity"
    },
    {
        "type": "classInfo",
        "localName": "priceListMetadata",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "priceTypeUuid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "column",
                "collection": true,
                "typeInfo": "moysklad.priceListMetadataColumn"
            }
        ],
        "baseTypeInfo": "moysklad.legendEntity"
    },
    {
        "type": "classInfo",
        "localName": "priceListMetadataColumn",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "percentageDiscount",
                "typeInfo": "Int"
            }
        ],
        "baseTypeInfo": "moysklad.legendEntity"
    },
    {
        "type": "classInfo",
        "localName": "priceListRow",
        "propertyInfos": [
            {
                "type": "element",
                "name": "cell",
                "collection": true,
                "typeInfo": "moysklad.priceListCell"
            }
        ],
        "baseTypeInfo": "moysklad.motion"
    },
    {
        "type": "classInfo",
        "localName": "motion",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "discount",
                "typeInfo": "Double"
            },
            {
                "type": "attribute",
                "name": "quantity",
                "typeInfo": "Double"
            },
            {
                "type": "attribute",
                "name": "goodPackUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "consignmentUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "goodUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "slotUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "vat",
                "typeInfo": "Long"
            },
            {
                "type": "element",
                "name": "basePrice",
                "typeInfo": "moysklad.moneyAmount"
            },
            {
                "type": "element",
                "name": "price",
                "typeInfo": "moysklad.moneyAmount"
            },
            {
                "type": "element",
                "name": "things",
                "elementName": "thingRef",
                "collection": true,
                "wrapperElementName": "things",
                "typeInfo": "moysklad.thing"
            }
        ],
        "baseTypeInfo": "moysklad.entity"
    },
    {
        "type": "classInfo",
        "localName": "priceListCell",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "columnName",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "sum",
                "typeInfo": "moysklad.moneyAmount"
            }
        ],
        "baseTypeInfo": "moysklad.entity"
    },
    {
        "type": "classInfo",
        "localName": "operationAttributeValue",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "operationUuid",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.attributeValue"
    },
    {
        "type": "classInfo",
        "localName": "operationDocument",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "operationUuid",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.printedDocument"
    },
    {
        "type": "classInfo",
        "localName": "retailStore",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "active",
                "typeInfo": "Boolean"
            },
            {
                "type": "attribute",
                "name": "address",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "myCompanyUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "priceTypeUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "warehouseUuid",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.legendEntity"
    },
    {
        "type": "classInfo",
        "localName": "paymentIn",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "incomingDate",
                "typeInfo": "DateTime"
            },
            {
                "type": "attribute",
                "name": "incomingNumber",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.financeIn"
    },
    {
        "type": "classInfo",
        "localName": "financeIn",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "customerOrderUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "factureOutUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "invoiceOutUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "purchaseReturnUuid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "demandsUuid",
                "elementName": "demandRef",
                "collection": true,
                "wrapperElementName": "demandsUuid",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.finance"
    },
    {
        "type": "classInfo",
        "localName": "finance",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "paymentPurpose",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "vatSum",
                "typeInfo": "Double"
            }
        ],
        "baseTypeInfo": "moysklad.operation"
    },
    {
        "type": "classInfo",
        "localName": "customerOrder",
        "propertyInfos": [
            {
                "type": "element",
                "name": "demandsUuid",
                "elementName": "demandRef",
                "collection": true,
                "wrapperElementName": "demandsUuid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "invoicesOutUuid",
                "elementName": "invoiceOutRef",
                "collection": true,
                "wrapperElementName": "invoicesOutUuid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "paymentsUuid",
                "elementName": "financeInRef",
                "collection": true,
                "wrapperElementName": "paymentsUuid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "customerOrderPosition",
                "collection": true,
                "typeInfo": "moysklad.customerOrderPosition"
            },
            {
                "type": "element",
                "name": "purchaseOrdersUuid",
                "elementName": "purchaseOrderRef",
                "collection": true,
                "wrapperElementName": "purchaseOrdersUuid",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.order"
    },
    {
        "type": "classInfo",
        "localName": "order",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "deliveryPlannedMoment",
                "typeInfo": "DateTime"
            },
            {
                "type": "attribute",
                "name": "reservedSum",
                "typeInfo": "Double"
            }
        ],
        "baseTypeInfo": "moysklad.operationWithPositions"
    },
    {
        "type": "classInfo",
        "localName": "abstractDemand",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "customerOrderUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "factureUuid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "invoicesOutUuid",
                "elementName": "invoiceOutRef",
                "collection": true,
                "wrapperElementName": "invoicesOutUuid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "paymentsUuid",
                "elementName": "financeInRef",
                "collection": true,
                "wrapperElementName": "paymentsUuid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "shipmentOut",
                "collection": true,
                "typeInfo": "moysklad.shipmentOut"
            },
            {
                "type": "element",
                "name": "salesReturnsUuid",
                "elementName": "salesReturnRef",
                "collection": true,
                "wrapperElementName": "salesReturnsUuid",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.comingOutOperation"
    },
    {
        "type": "classInfo",
        "localName": "comingOutOperation",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.stockOperation"
    },
    {
        "type": "classInfo",
        "localName": "stockOperation",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.operationWithPositions"
    },
    {
        "type": "classInfo",
        "localName": "factureOut",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "paymentDate",
                "typeInfo": "DateTime"
            },
            {
                "type": "attribute",
                "name": "paymentNumber",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "demandsUuid",
                "elementName": "demandRef",
                "collection": true,
                "wrapperElementName": "demandsUuid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "extension",
                "typeInfo": "moysklad.factureOutExtension"
            },
            {
                "type": "element",
                "name": "paymentsUuid",
                "elementName": "financeInRef",
                "collection": true,
                "wrapperElementName": "paymentsUuid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "returnsUuid",
                "elementName": "returnRef",
                "collection": true,
                "wrapperElementName": "returnsUuid",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.facture"
    },
    {
        "type": "classInfo",
        "localName": "facture",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.operationWithPositions"
    },
    {
        "type": "classInfo",
        "localName": "factureOutExtension",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.operationExtension"
    },
    {
        "type": "classInfo",
        "localName": "operationExtension",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "consigneeUuid",
                "typeInfo": "String"
            }
        ]
    },
    {
        "type": "classInfo",
        "localName": "purchaseReturn",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "factureUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "supplyUuid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "paymentsUuid",
                "elementName": "financeInRef",
                "collection": true,
                "wrapperElementName": "paymentsUuid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "purchaseReturnPosition",
                "collection": true,
                "typeInfo": "moysklad.purchaseReturnPosition"
            }
        ],
        "baseTypeInfo": "moysklad.comingOutOperation"
    },
    {
        "type": "classInfo",
        "localName": "purchaseReturnPosition",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.abstractShipmentOut"
    },
    {
        "type": "classInfo",
        "localName": "abstractShipmentOut",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.comingOut"
    },
    {
        "type": "classInfo",
        "localName": "comingOut",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.stockMotion"
    },
    {
        "type": "classInfo",
        "localName": "stockMotion",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "countryUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "gtdUuid",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.motion"
    },
    {
        "type": "classInfo",
        "localName": "supply",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "factureInUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "incomingDate",
                "typeInfo": "DateTime"
            },
            {
                "type": "attribute",
                "name": "incomingNumber",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "overheadDistribution",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "purchaseOrderUuid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "invoicesInUuid",
                "elementName": "invoiceInRef",
                "collection": true,
                "wrapperElementName": "invoicesInUuid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "overhead",
                "typeInfo": "moysklad.moneyAmount"
            },
            {
                "type": "element",
                "name": "paymentsUuid",
                "elementName": "financeOutRef",
                "collection": true,
                "wrapperElementName": "paymentsUuid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "shipmentIn",
                "collection": true,
                "typeInfo": "moysklad.shipmentIn"
            },
            {
                "type": "element",
                "name": "purchaseReturnsUuid",
                "elementName": "purchaseReturnRef",
                "collection": true,
                "wrapperElementName": "purchaseReturnsUuid",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.comingInOperation"
    },
    {
        "type": "classInfo",
        "localName": "comingInOperation",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.stockOperation"
    },
    {
        "type": "classInfo",
        "localName": "factureIn",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "incomingDate",
                "typeInfo": "DateTime"
            },
            {
                "type": "attribute",
                "name": "incomingNumber",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "paymentsUuid",
                "elementName": "financeOutRef",
                "collection": true,
                "wrapperElementName": "paymentsUuid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "suppliesUuid",
                "elementName": "supplyRef",
                "collection": true,
                "wrapperElementName": "suppliesUuid",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.facture"
    },
    {
        "type": "classInfo",
        "localName": "financeOut",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "factureInUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "invoiceInUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "purchaseOrderUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "salesReturnUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "supplyUuid",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.finance"
    },
    {
        "type": "classInfo",
        "localName": "invoiceIn",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "incomingDate",
                "typeInfo": "DateTime"
            },
            {
                "type": "attribute",
                "name": "incomingNumber",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "purchaseOrderUuid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "financesOutUuid",
                "elementName": "financeOutRef",
                "collection": true,
                "wrapperElementName": "financesOutUuid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "suppliesUuid",
                "elementName": "supplyRef",
                "collection": true,
                "wrapperElementName": "suppliesUuid",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.invoice"
    },
    {
        "type": "classInfo",
        "localName": "invoice",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "paymentPlannedMoment",
                "typeInfo": "DateTime"
            },
            {
                "type": "element",
                "name": "invoicePosition",
                "collection": true,
                "typeInfo": "moysklad.invoicePosition"
            }
        ],
        "baseTypeInfo": "moysklad.operationWithPositions"
    },
    {
        "type": "classInfo",
        "localName": "purchaseOrder",
        "propertyInfos": [
            {
                "type": "element",
                "name": "customerOrdersUuid",
                "elementName": "customerOrderRef",
                "collection": true,
                "wrapperElementName": "customerOrdersUuid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "internalOrders",
                "elementName": "internalOrderRef",
                "collection": true,
                "wrapperElementName": "internalOrders",
                "typeInfo": "moysklad.internalOrder"
            },
            {
                "type": "element",
                "name": "invoicesUuid",
                "elementName": "invoiceInRef",
                "collection": true,
                "wrapperElementName": "invoicesUuid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "paymentsUuid",
                "elementName": "financeOutRef",
                "collection": true,
                "wrapperElementName": "paymentsUuid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "purchaseOrderPosition",
                "collection": true,
                "typeInfo": "moysklad.purchaseOrderPosition"
            },
            {
                "type": "element",
                "name": "suppliesUuid",
                "elementName": "supplyRef",
                "collection": true,
                "wrapperElementName": "suppliesUuid",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.order"
    },
    {
        "type": "classInfo",
        "localName": "internalOrder",
        "propertyInfos": [
            {
                "type": "element",
                "name": "purchaseOrderPosition",
                "collection": true,
                "typeInfo": "moysklad.purchaseOrderPosition"
            },
            {
                "type": "element",
                "name": "purchaseOrdersUuid",
                "elementName": "purchaseOrderRef",
                "collection": true,
                "wrapperElementName": "purchaseOrdersUuid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "demandsUuid",
                "elementName": "moveRef",
                "collection": true,
                "wrapperElementName": "demandsUuid",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.order"
    },
    {
        "type": "classInfo",
        "localName": "purchaseOrderPosition",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.orderPosition"
    },
    {
        "type": "classInfo",
        "localName": "orderPosition",
        "propertyInfos": [
            {
                "type": "element",
                "name": "reserve",
                "typeInfo": "Double"
            }
        ],
        "baseTypeInfo": "moysklad.motion"
    },
    {
        "type": "classInfo",
        "localName": "move",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "internalOrderUuid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "movePosition",
                "collection": true,
                "typeInfo": "moysklad.movePosition"
            }
        ],
        "baseTypeInfo": "moysklad.stockOperation"
    },
    {
        "type": "classInfo",
        "localName": "movePosition",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "sourceSlotUuid",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.stockMotion"
    },
    {
        "type": "classInfo",
        "localName": "invoicePosition",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.motion"
    },
    {
        "type": "classInfo",
        "localName": "abstractSalesReturn",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "demandUuid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "lossesUuid",
                "elementName": "lossRef",
                "collection": true,
                "wrapperElementName": "lossesUuid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "paymentsUuid",
                "elementName": "financeOutRef",
                "collection": true,
                "wrapperElementName": "paymentsUuid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "salesReturnPosition",
                "collection": true,
                "typeInfo": "moysklad.salesReturnPosition"
            }
        ],
        "baseTypeInfo": "moysklad.comingInOperation"
    },
    {
        "type": "classInfo",
        "localName": "loss",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "inventoryUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "salesReturnUuid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "lossPosition",
                "collection": true,
                "typeInfo": "moysklad.lossPosition"
            }
        ],
        "baseTypeInfo": "moysklad.comingOutOperation"
    },
    {
        "type": "classInfo",
        "localName": "inventory",
        "propertyInfos": [
            {
                "type": "element",
                "name": "entersUuid",
                "elementName": "enterRef",
                "collection": true,
                "wrapperElementName": "entersUuid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "lossesUuid",
                "elementName": "lossRef",
                "collection": true,
                "wrapperElementName": "lossesUuid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "inventoryPosition",
                "collection": true,
                "typeInfo": "moysklad.inventoryPosition"
            }
        ],
        "baseTypeInfo": "moysklad.operationWithPositions"
    },
    {
        "type": "classInfo",
        "localName": "enter",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "inventoryUuid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "enterPosition",
                "collection": true,
                "typeInfo": "moysklad.enterPosition"
            }
        ],
        "baseTypeInfo": "moysklad.comingInOperation"
    },
    {
        "type": "classInfo",
        "localName": "enterPosition",
        "propertyInfos": [
            {
                "type": "element",
                "name": "tags",
                "elementName": "tag",
                "collection": true,
                "wrapperElementName": "tags",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.comingIn"
    },
    {
        "type": "classInfo",
        "localName": "comingIn",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.stockMotion"
    },
    {
        "type": "classInfo",
        "localName": "inventoryPosition",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "correctionAmount",
                "typeInfo": "Double"
            }
        ],
        "baseTypeInfo": "moysklad.motion"
    },
    {
        "type": "classInfo",
        "localName": "lossPosition",
        "propertyInfos": [
            {
                "type": "element",
                "name": "tags",
                "elementName": "tag",
                "collection": true,
                "wrapperElementName": "tags",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.comingOut"
    },
    {
        "type": "classInfo",
        "localName": "salesReturnPosition",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.comingIn"
    },
    {
        "type": "classInfo",
        "localName": "shipmentIn",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "overhead",
                "typeInfo": "Double"
            }
        ],
        "baseTypeInfo": "moysklad.comingIn"
    },
    {
        "type": "classInfo",
        "localName": "invoiceOut",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "customerOrderUuid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "demandsUuid",
                "elementName": "demandRef",
                "collection": true,
                "wrapperElementName": "demandsUuid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "paymentsUuid",
                "elementName": "financeInRef",
                "collection": true,
                "wrapperElementName": "paymentsUuid",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.invoice"
    },
    {
        "type": "classInfo",
        "localName": "shipmentOut",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.abstractShipmentOut"
    },
    {
        "type": "classInfo",
        "localName": "customerOrderPosition",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.orderPosition"
    },
    {
        "type": "classInfo",
        "localName": "paymentOut",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.financeOut"
    },
    {
        "type": "classInfo",
        "localName": "cashIn",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.abstractCashIn"
    },
    {
        "type": "classInfo",
        "localName": "abstractCashIn",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.financeIn"
    },
    {
        "type": "classInfo",
        "localName": "cashOut",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.abstractCashOut"
    },
    {
        "type": "classInfo",
        "localName": "abstractCashOut",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.financeOut"
    },
    {
        "type": "classInfo",
        "localName": "demand",
        "propertyInfos": [
            {
                "type": "element",
                "name": "extension",
                "typeInfo": "moysklad.demandExtension"
            }
        ],
        "baseTypeInfo": "moysklad.abstractDemand"
    },
    {
        "type": "classInfo",
        "localName": "demandExtension",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "opened",
                "typeInfo": "Boolean"
            },
            {
                "type": "attribute",
                "name": "carrierUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "loadName",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "consignorIndication",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "transportFacility",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "goodPackQuantity",
                "typeInfo": "Int"
            },
            {
                "type": "attribute",
                "name": "carNumber",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.operationExtension"
    },
    {
        "type": "classInfo",
        "localName": "retailCashIn",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.abstractCashIn"
    },
    {
        "type": "classInfo",
        "localName": "retailCashOut",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.abstractCashOut"
    },
    {
        "type": "classInfo",
        "localName": "retailDemand",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.abstractDemand"
    },
    {
        "type": "classInfo",
        "localName": "retailSalesReturn",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.abstractSalesReturn"
    },
    {
        "type": "classInfo",
        "localName": "salesReturn",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.abstractSalesReturn"
    },
    {
        "type": "classInfo",
        "localName": "processing",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "planUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "processingOrderUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "processingSum",
                "typeInfo": "Double"
            },
            {
                "type": "attribute",
                "name": "quantity",
                "typeInfo": "Double"
            },
            {
                "type": "element",
                "name": "material",
                "collection": true,
                "typeInfo": "moysklad.processingPositionMaterial"
            },
            {
                "type": "element",
                "name": "results",
                "elementName": "result",
                "collection": true,
                "wrapperElementName": "results",
                "typeInfo": "moysklad.processingPositionResult"
            }
        ],
        "baseTypeInfo": "moysklad.stockOperation"
    },
    {
        "type": "classInfo",
        "localName": "processingPositionMaterial",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "planMaterialUuid",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.comingOut"
    },
    {
        "type": "classInfo",
        "localName": "processingOrder",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "planUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "quantity",
                "typeInfo": "Double"
            },
            {
                "type": "element",
                "name": "purchaseOrderPosition",
                "collection": true,
                "typeInfo": "moysklad.customerOrderPosition"
            },
            {
                "type": "element",
                "name": "processings",
                "elementName": "processingRef",
                "collection": true,
                "wrapperElementName": "processings",
                "typeInfo": "moysklad.processing"
            }
        ],
        "baseTypeInfo": "moysklad.order"
    },
    {
        "type": "classInfo",
        "localName": "processingPositionResult",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "planResultUuid",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.comingIn"
    },
    {
        "type": "classInfo",
        "localName": "amiroConnectorSettings",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "commentsColumnNum",
                "typeInfo": "Int"
            },
            {
                "type": "attribute",
                "name": "customerAddressColumnNum",
                "typeInfo": "Int"
            },
            {
                "type": "attribute",
                "name": "customerCodeColumnNum",
                "typeInfo": "Int"
            },
            {
                "type": "attribute",
                "name": "customerEmailColumnNum",
                "typeInfo": "Int"
            },
            {
                "type": "attribute",
                "name": "customerFirstNameColumnNum",
                "typeInfo": "Int"
            },
            {
                "type": "attribute",
                "name": "customerLastNameColumnNum",
                "typeInfo": "Int"
            },
            {
                "type": "attribute",
                "name": "customerNickColumnNum",
                "typeInfo": "Int"
            },
            {
                "type": "attribute",
                "name": "customerPhoneColumnNum",
                "typeInfo": "Int"
            },
            {
                "type": "attribute",
                "name": "goodIdColumnNum",
                "typeInfo": "Int"
            },
            {
                "type": "attribute",
                "name": "goodNameColumnNum",
                "typeInfo": "Int"
            },
            {
                "type": "attribute",
                "name": "orderDateColumnNum",
                "typeInfo": "Int"
            },
            {
                "type": "attribute",
                "name": "orderIdColumnNum",
                "typeInfo": "Int"
            },
            {
                "type": "attribute",
                "name": "prefixForAgent",
                "typeInfo": "Boolean"
            },
            {
                "type": "attribute",
                "name": "prefixForGood",
                "typeInfo": "Boolean"
            },
            {
                "type": "attribute",
                "name": "prefixForOperation",
                "typeInfo": "Boolean"
            },
            {
                "type": "attribute",
                "name": "priceColumnNum",
                "typeInfo": "Int"
            },
            {
                "type": "attribute",
                "name": "quantityColumnNum",
                "typeInfo": "Int"
            },
            {
                "type": "attribute",
                "name": "shippingAmountColumnNum",
                "typeInfo": "Int"
            },
            {
                "type": "attribute",
                "name": "stateColumnNum",
                "typeInfo": "Int"
            },
            {
                "type": "attribute",
                "name": "taxColumnNum",
                "typeInfo": "Int"
            },
            {
                "type": "element",
                "name": "customAttribute",
                "collection": true,
                "typeInfo": "moysklad.amiroCustomAttributeInfo"
            }
        ],
        "baseTypeInfo": "moysklad.operationConnectorSetting"
    },
    {
        "type": "classInfo",
        "localName": "operationConnectorSetting",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "adminDomain",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "autoReserve",
                "typeInfo": "Boolean"
            },
            {
                "type": "attribute",
                "name": "orderplaceUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "shopDomain",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "syncFeatures",
                "typeInfo": "Boolean"
            },
            {
                "type": "attribute",
                "name": "useShopOperationName",
                "typeInfo": "Boolean"
            }
        ],
        "baseTypeInfo": "moysklad.abstractConnectorSetting"
    },
    {
        "type": "classInfo",
        "localName": "abstractConnectorSetting",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "active",
                "typeInfo": "Boolean"
            },
            {
                "type": "attribute",
                "name": "login",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "organizationUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "password",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "pollPeriod",
                "typeInfo": "Int"
            }
        ],
        "baseTypeInfo": "moysklad.legendEntity"
    },
    {
        "type": "classInfo",
        "localName": "amiroCustomAttributeInfo",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "columnNumber",
                "typeInfo": "Int"
            },
            {
                "type": "attribute",
                "name": "name",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "settingsUuid",
                "typeInfo": "String"
            }
        ],
        "baseTypeInfo": "moysklad.entity"
    },
    {
        "type": "classInfo",
        "localName": "cmlConnectorSettings",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "features",
                "typeInfo": "Boolean"
            },
            {
                "type": "attribute",
                "name": "goodFolderUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "priceTypeUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "shopType",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "stockActive",
                "typeInfo": "Boolean"
            },
            {
                "type": "attribute",
                "name": "stockplaceUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "stockPollPeriod",
                "typeInfo": "Int"
            },
            {
                "type": "attribute",
                "name": "syncOrderState",
                "typeInfo": "Boolean"
            }
        ],
        "baseTypeInfo": "moysklad.operationConnectorSetting"
    },
    {
        "type": "classInfo",
        "localName": "ymlConnectorSettings",
        "propertyInfos": [],
        "baseTypeInfo": "moysklad.abstractConnectorSetting"
    },
    {
        "type": "classInfo",
        "localName": "error",
        "propertyInfos": [
            {
                "type": "element",
                "name": "uid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "moment",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "message",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "stack",
                "typeInfo": "String"
            }
        ]
    },
    {
        "type": "classInfo",
        "localName": "collection",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "total",
                "typeInfo": "Int"
            },
            {
                "type": "attribute",
                "name": "start",
                "typeInfo": "Int"
            },
            {
                "type": "attribute",
                "name": "count",
                "typeInfo": "Int"
            }
        ],
        "baseTypeInfo": "moysklad.collectionContainer"
    },
    {
        "type": "classInfo",
        "localName": "abstractGood",
        "propertyInfos": [
            {
                "type": "attribute",
                "name": "minPrice",
                "typeInfo": "Double"
            },
            {
                "type": "attribute",
                "name": "uomUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "countryUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "supplierUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "salePrice",
                "typeInfo": "Double"
            },
            {
                "type": "attribute",
                "name": "saleCurrencyUuid",
                "typeInfo": "String"
            },
            {
                "type": "attribute",
                "name": "buyCurrencyUuid",
                "typeInfo": "String"
            },
            {
                "type": "element",
                "name": "barcode",
                "collection": true,
                "typeInfo": "moysklad.barcode"
            },
            {
                "type": "element",
                "name": "salePrices",
                "elementName": "price",
                "collection": true,
                "wrapperElementName": "salePrices",
                "typeInfo": "moysklad.price"
            }
        ],
        "baseTypeInfo": "moysklad.goodFolder"
    }
]}
},{}]},{},[])