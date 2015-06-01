/**
 * model-builder
 * Date: 18.05.15
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var map                 = require('../../../res/mapping'),
    mapping             = require('./mapping'),
    Jsonix              = require('project/jsonix').Jsonix,
    extensions          = require('project/model-extensions'),
    getUriTypeName  = require('project/tools/getUriTypeName');


var modelBuilder = function () {
    var client = this;

    // Получаем копию модели с привязанными конструкторами сущностей агрегатов
    var _map = mapping.getMapping({
        map         : map,
        client      : client,
        extensions  : extensions
    });

    var context = client.context = new Jsonix.Context([_map]);

    // Создаем ссылки на конструкторы сущностей в объекте клиента
    for (var key in context.typeInfos) {
        if (context.typeInfos.hasOwnProperty(key)) {
            var namespace    = key.split('.')[0];
            var typeInfoName = key.split('.')[1]; // moysklad.customerOrder -> customerOrder
            if (namespace === _map.name) {
                var typeInfo = context.typeInfos[key];
                if (typeInfo.instanceFactory) {

                    // Привязываем методы в прототип агрегатов
                    if (context.scopedElementInfosMap['##global'].hasOwnProperty(typeInfoName)) {
                        typeInfo.instanceFactory = typeInfo.instanceFactory.methods({

                        })
                    }

                    var className = getUriTypeName(typeInfo.localName);
                    client[className] = typeInfo.instanceFactory;
                }
            }

        }
    }

};

module.exports = modelBuilder;