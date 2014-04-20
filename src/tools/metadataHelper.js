/**
 * metadataHelper
 * Date: 20.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

/**
 * Возвращает идентификатор элемента пользовательского справочника по наименованию
 * @param entityType Тип сущности к которой привязан селектор
 * @param attrName Идентификатор метаданных
 * @param entityName Наименование элемента справочника
 * @returns {string}
 */
var getCustomEntityByValue_ = function (entityType, attrName, entityName) {
    entityType = remap[entityType] || entityType;
    var cached = cache.get(entityType + attrName + entityName);
    var customEntity = cached ? Utilities.jsonParse(cached) : null;
    if (customEntity) return new Moysklad.ObjectModel.CustomEntity(customEntity);

    var metadata = this.getEmbeddedEntityMetadata(entityType);
    if (!metadata) throw 'Metadata for [' + entityType + '] not found.';
    var attributeMetadata = _.find(metadata.attributeMetadata, function (item) {
        return item.name == attrName;
    });
    if (!attributeMetadata) throw 'Attribute [' + attrName + '] not found in Entity.';
    customEntity = client
        .from('CustomEntity')
        .filter('entityMetadataUuid', attributeMetadata.dictionaryMetadataUuid)
        .filter('name', entityName)
        .load().items[0];
    if (!customEntity) throw 'Element [' + entityName + '] not found in dictionary.';
    cache.put(entityType + attrName + entityName,
        Utilities.jsonStringify(CommonTools.copyKeys({}, customEntity, [
            'uuid',
            'code',
            'externalcode',
            'name',
            'entityMetadataUuid',
            'description'
        ])), 1800);
    return customEntity;
};

var getCustomEntity_ = function (entity, attrName) {
    var entityType = remap[entity.objectType] || entity.objectType;
    var cached = cache.get(entityType + attrName);
    var customEntity = cached ? Utilities.jsonParse(cached) : null;
    if (customEntity) return new Moysklad.ObjectModel.CustomEntity(customEntity);

    var metadata = this.getEmbeddedEntityMetadata(entityType);
    if (!metadata) throw 'Metadata for [' + entityType + '] not found.';
    var attributeMetadata = _.find(metadata.attributeMetadata, function (item) {
        return item.name == attrName;
    });
    if (!attributeMetadata) throw 'Attribute [' + attrName + '] not found in Entity.';
    var attribute = _.find(entity.attribute, function (attr) {
        return attr.metadataUuid ==  attributeMetadata.uuid;
    });
    if (!attribute) return null;
    customEntity = client
        .from('CustomEntity')
        .uuid(attribute.entityValueUuid)
        .load();
    if (!customEntity) throw 'Element [' + entityName + '] not found in dictionary.';
    cache.put(entityType + attrName,
        Utilities.jsonStringify(CommonTools.copyKeys({}, customEntity, [
            'uuid',
            'code',
            'externalcode',
            'name',
            'entityMetadataUuid',
            'description'
        ])), 1800);
    return customEntity;
};



function MetadataHelper(client) {
    var embeddedEntityMetadataByName = {},
        cache = CacheService.getPrivateCache();

    var remap = {
        Good: 'GoodFolder',
        Company: 'Agent'
    };

    var typeMap = {
        STRING : 'valueString',
        LONG : 'longValue',
        TIME : 'timeValue',
        FILE : 'file',
        DOUBLE : 'doubleValue',
        BOOLEAN : 'booleanValue',
        TEXT : 'valueText',
        LINK : 'valueText'
    };

    this.getEmbeddedEntityMetadata = function (type) {
        if (!embeddedEntityMetadataByName[type]) {
            var query = client
                .from('EmbeddedEntityMetadata')
                .filter('name', type);
            embeddedEntityMetadataByName[type] = query.load().items[0];
        }
        return embeddedEntityMetadataByName[type];
    };






    this.getCustomEntity = function () {
        if (arguments.length == 3) return getCustomEntityByValue_(arguments[0], arguments[1], arguments[2]);
        if (arguments.length == 2) return getCustomEntity_(arguments[0], arguments[1]);
    };

    //TODO Можно привязать к прототипу Entity
    /**
     * Предоставляет простой способ записи атрибута по его имени без использования идентификатора
     * @param entity
     * @param name
     * @param value
     */
    this.setAttribute = function (entity, name, value) {
        var entityType = remap[entity.objectType] || entity.objectType;
        var metadata = this.getEmbeddedEntityMetadata(entityType);
        if (metadata) {
            var attributeMetadata = _.find(metadata.attributeMetadata, function (item) {
                return item.name == name;
            });
            if (attributeMetadata) {
                var attribute = _.find(entity.attribute, function (attr) {
                    return attr.metadataUuid == attributeMetadata.uuid;
                });
                if (attributeMetadata.attrType == 'ID_CUSTOM') {
                    var entityValueUuid = this.getCustomEntity(entityType, attributeMetadata.name, value);
                    if (!entityValueUuid) throw 'setAttribute: Element [' + value + '] not found in dictionary.';
                    if (attribute) {
                        attribute.entityValueUuid = entityValueUuid;
                    } else {
                        entity.attribute.push({
                            metadataUuid: attributeMetadata.uuid,
                            entityValueUuid: entityValueUuid
                        });
                    }
                } else if (attributeMetadata.attrType == 'ID_EMBEDDED') {
                    // TODO Обработать в зависимости от типа справочника
                    throw 'ID_EMBEDDED not implemented';
                } else {
                    if (attribute) {
                        attribute[typeMap[attributeMetadata.attrType]] = value;
                    } else {
                        attribute = {
                            metadataUuid: attributeMetadata.uuid
                        };
                        attribute[typeMap[attributeMetadata.attrType]] = value;
                        entity.attribute.push(attribute);
                    }
                }
            } else {
                throw 'setAttribute: Metadata for attribute [' + name + '] not found.'
            }
        } else {
            throw 'setAttribute: Metadata for Type [' + entityType + '] not found.'
        }
        return this;
    };

    //TODO Всё очень не качественно нужно переделывать. Дублируется код во всех функциях.

    /**
     * Предоставляет простой способ чтения атрибута по его имени без использования идентификатора
     * @param entity
     * @param name
     */
    this.getAttribute = function (entity, name) {
        var entityType = remap[entity.objectType] || entity.objectType;
        var metadata = this.getEmbeddedEntityMetadata(entityType);
        if (metadata) {
            var attributeMetadata = _.find(metadata.attributeMetadata, function (item) {
                return item.name == name;
            });
            if (attributeMetadata) {
                var attribute = _.find(entity.attribute, function (attr) {
                    return attr.metadataUuid == attributeMetadata.uuid;
                });
                if (!attribute) throw 'Attribute [' + name + '] not found';
                if (attributeMetadata.attrType == 'ID_CUSTOM') {
                    return this.getCustomEntity(entity, name);
                } else if (attributeMetadata.attrType == 'ID_EMBEDDED') {
                    // TODO Обработать в зависимости от типа справочника
                    throw 'ID_EMBEDDED not implemented';
                } else {
                    return attribute[typeMap[attributeMetadata.attrType]]
                }
            } else {
                throw 'setAttribute: Metadata for attribute [' + name + '] not found.'
            }
        } else {
            throw 'setAttribute: Metadata for Type [' + entityType + '] not found.'
        }
    }

    // Уже реализовано в getAttribute (выше)
    /*this.findAttribute = function (entity, attrName) {
     var objectType = entity.objectType,
     metadata,
     blank = {
     entityValue: {
     name: null
     }
     };
     if (!embeddedEntityMetadata[objectType]) {
     embeddedEntityMetadata[objectType] = client
     .from('embeddedEntityMetadata')
     .filter('name', metadataForType[objectType] || objectType)
     .load().items[0];
     }
     metadata = embeddedEntityMetadata[objectType];
     if (metadata && metadata.attributeMetadata) {
     for (var i = 0, leni = metadata.attributeMetadata.length; i < leni; i++) {
     var attributeMetadata = metadata.attributeMetadata[i];
     if (attributeMetadata.name === attrName) {
     var attribute = findInArray_(entity.attribute, function (item) {
     return item.metadataUuid == attributeMetadata.uuid;
     });
     if (attribute) {
     if(attributeMetadata.attrType === 'ID_CUSTOM') {
     return { entityValue: getEntity_('customEntity', attribute.entityValueUuid) };
     } else if (attributeMetadata.attrType === 'ID_EMBEDDED') {
     throw 'ID_EMBEDDED не реализовано. Пишите на w.makeev@gmail.com, сделаю.'
     } else {
     return attribute;
     }
     }
     break;
     }
     }
     }
     return blank;
     }*/
}