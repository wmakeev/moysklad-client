/**
 * LazyLoader
 * Date: 15.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
    , stampit = require('stampit')
    , propMap = require('./nameToTypeMap');

function getTypeOfProperty_(propertyName, entity) {
    if (propMap[propertyName])
        return propMap[propertyName];

    else if (entity.TYPE_NAME && propMap[entity.TYPE_NAME] && propMap[entity.TYPE_NAME][propertyName])
        return propMap[entity.TYPE_NAME][propertyName];

    else
        return propertyName;
}

function addUuidsToBatch_(batchName, uuids) {
    var batch = this.uuidBatches[batchName] = (this.uuidBatches[batchName] || []);
    
    uuids instanceof Array ?
        this.uuidBatches[batchName] = batch.concat(uuids) :
        batch.push(uuids);
}

function getEntities_(type, uuids, path, batchName, batches) {
    //var __debug_entityHash = _entityHash;
    //Logger.log('[getEntity_] path - %s', path);
    var client = this.client,
        entity, entities;

    if (batchName && this.uuidBatches[batchName] && this.uuidBatches[batchName].length > 0) {
        entities = client.from(type)
            .select({ uuid: client.anyOf(this.uuidBatches[batchName]) })
            .load();

        _.each(entities, function (entityItem) {
            this.entityHash[entityItem.uuid] = this.mapLazyLoader(entityItem, path, batches);
        }, this);

        this.uuidBatches[batchName] = []; // очищаем список uuid загруженных сущностей
    }

    if (typeof uuids === 'string') {
        if (!this.entityHash[uuids]) {
            entity = client.load(type, uuids);
            this.entityHash[uuids] = this.mapLazyLoader(entity, path, batches);
        }
        return this.entityHash[uuids];
        
    } else if (uuids instanceof Array) {
        // В данном случае обрабатываются только массивы идентификаторов (напр. "demandsUuid"),
        // которые загружаются через batch, поэтому, полагаем, что уже всё загружено в entityHash
        entities = _.map(uuids, function (uuid) {
            return this.entityHash[uuid];
        }, this);
        return entities;
    }
}

/**
 * Создает совойство, при обращении к которому происходит ленивая загрузка сущности(ей)
 * 
 * @param {object} entity Объект к которому привязывается свойство
 * @param {string} propertyName Имя создаваемого свойства
 * @param {string | Array.<string>} uuids Идентификатор или массив идентификаторов
 * @param {string} path Путь к текущему совойству
 * @param {Array} batches Массив определителей свойств для списка групповой загрузки
 */
function defProperty_(entity, propertyName, uuids, path, batches) {
    if (!uuids) return;

    var batchName = _.find(batches, function(batchItem) {
        //noinspection JSReferencingMutableVariableFromClosure
        //TODO !!! Нужно быть точно уверенным что в пачку могут попасть uuid только сущностей одного типа
        return path.slice(-batchItem.length) == batchItem; 
    });

    if (batchName) this.addUuidsToBatch(batchName, uuids);

    var that = this;
    Object.defineProperty(entity, propertyName, {
        get: function () {
            return that.getEntities(getTypeOfProperty_(propertyName, entity), 
                uuids, path, batchName, batches);
        },
        enumerable: true,  //TODO false ?
        configurable: false
    });
}

/**
 * Рекурсивно создает свойства согласно ссылкам на связанные объекты
 *
 * @param {object} entity Объект или узел внутри объекта
 * @param {string|null} path Путь к обрабатываемому узлу ( напр. "prop1.prop2")
 * @param {array|null=} [batches]
 * @returns {*}
 * @private
 *
 */
function mapLazyLoader_(entity, path, batches) {
    var curPath, propertyName;
    path = path || '';

    for (var key in entity) {
        if (entity[key]) {
            if (typeof key === 'string' 
                && key.substring(key.length - 4) == 'Uuid' 
                && entity.hasOwnProperty(key)) {
                
                // demandUuid -> demand
                propertyName = key.substring(0, key.length - 4);
                curPath = path + '.' + propertyName;
                
                // напр. "demandsUuid" .. то при обращении нужно загрузить все сущности по массиву идентификаторов
                if (entity[key] instanceof Array) (batches = batches || []).push(curPath);
                
                this.defProperty(entity, propertyName, entity[key], curPath, batches);
            
            } else if (typeof entity[key] === 'object' && !(entity[key] instanceof Date)) {
                if (entity instanceof Array) {
                    this.mapLazyLoader(entity[key], path, batches);

                } else if (entity.hasOwnProperty(key)) {
                    this.mapLazyLoader(entity[key], path + '.' + key, batches);
                }
            }
        }
    }
    return entity;
}

var LazyLoader = stampit()

    .state({
        entityHash: {},
        uuidBatches: {}
    })

    .methods({
        getEntities: getEntities_,
        mapLazyLoader: mapLazyLoader_,
        defProperty: defProperty_,
        addUuidsToBatch: addUuidsToBatch_
    });

var createLazyLoader = function () {
    var lazyLoader = LazyLoader.create();

    lazyLoader.client = this;

    //noinspection JSUnusedGlobalSymbols
    return {
        attach: function (obj, batches) {
            lazyLoader.mapLazyLoader(obj, obj.TYPE_NAME || typeof obj, batches);
            return this;
        }
    }
};

module.exports = createLazyLoader;