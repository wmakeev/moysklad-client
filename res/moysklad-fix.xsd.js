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
        //TODO Возможно ли это предусмотреть стандартным меппингом Jsonix?
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