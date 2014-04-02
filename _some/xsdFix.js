/**
 * xsdFix
 * Date: 13.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var collection = {
    "$attribute":{
        "abstract":"true",
        "name":"accountEntity"
    },
    "$count":1,
    "$value":"",
    "xs:sequence":{
        "$attribute":{

        },
        "$count":1,
        "$value":"",
        "xs:element":[
            {
                "$attribute":{
                    "minOccurs":"0",
                    "name":"accountUuid",
                    "type":"xs:string"
                },
                "$count":0,
                "$value":""
            },
            {
                "$attribute":{
                    "minOccurs":"0",
                    "name":"accountId",
                    "type":"xs:string"
                },
                "$count":0,
                "$value":""
            },
            {
                "$attribute":{
                    "minOccurs":"0",
                    "name":"uuid",
                    "type":"xs:ID"
                },
                "$count":0,
                "$value":""
            }
        ]
    }
};