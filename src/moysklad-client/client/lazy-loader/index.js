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

function addUuidToBatch_(batchName, uuid) {
    (this.uuidBatches[batchName] = (this.uuidBatches[batchName] || []))
        .push(uuid);
}

function getEntity_(type, uuid, path, batchName) {
    //var __debug_entityHash = _entityHash;
    //Logger.log('[getEntity_] path - %s', path);
    var client = this.client;

    if (batchName && this.uuidBatches[batchName] && this.uuidBatches[batchName].length > 0) {
        var entities = client.from(type)
            .select({
                uuid: client.anyOf(this.uuidBatches[batchName])
            })
            .load();

        _.each(entities, function (entity) {
            this.entityHash[entity.uuid] = this.mapLazyLoader(entity, path);
        }, this);

        this.uuidBatches[batchName] = []; // очищаем список uuid загруженных сущностей
    }

    if (!this.entityHash[uuid]) {
        var entity = client.load(type, uuid);
        //TODO Нужно ли передавать batches, переданные в основную сущность?
        this.entityHash[uuid] = this.mapLazyLoader(entity, path);
    }

    return this.entityHash[uuid];
}

function defProperty_(entity, propertyName, uuid, path, batchName) {
    if (!uuid) return;

    if (batchName) this.addUuidToBatch(batchName, uuid);

    var that = this;
    Object.defineProperty(entity, propertyName, {
        get: function () {
            return that.getEntity(getTypeOfProperty_(propertyName, entity), uuid, path, batchName);
        },
        enumerable: true,  //TODO false ?
        configurable: false
    });
}

/**
 * Рекурсивно создает свойства согласно ссылкам на связанные объекты
 *
 * @param {object} entity Объект или узел внутри объекта
 * @param {string|null=} [path] Путь к обрабатываемому узлу ( напр. "prop1.prop2")
 * @param {array|null=} [batches]
 * @returns {*}
 * @private
 *
 */
function mapLazyLoader_(entity, path, batches) {
    var curPath, propertyName, curBatchName;
    path = path || '';
    //Logger.log('[mapLazyLoader_] path - %s', path);
    for (var key in entity) {
        //Logger.log('[mapLazyLoader_] key - %s', key);
        if (entity[key]) {
            if (typeof entity[key] === 'object' && !(entity[key] instanceof Date)) {

                if (entity instanceof Array) {
                    this.mapLazyLoader(entity[key], path, batches);

                } else if (entity.hasOwnProperty(key)) {
                    this.mapLazyLoader(entity[key], path + '.' + key, batches);
                }

            } else if (typeof key === 'string' && key.substring(key.length - 4) == 'Uuid') {
                propertyName = key.substring(0, key.length - 4);
                curPath = path + '.' + propertyName;
                //Logger.log('[mapLazyLoader_] curPath - %s', curPath);
                curBatchName = _.find(batches, function (batchItem) {
                    //noinspection JSReferencingMutableVariableFromClosure
                    return curPath.slice(-batchItem.length) == batchItem; //TODO !!! Нужно быть точно уверенным что в пачку могут попасть uuid только сущностей одного типа
                });

                this.defProperty(entity, propertyName, entity[key], curPath, curBatchName);
            }
        }
        //TODO Необходимо включить обработку полей demandsUuid (массивов идентификаторов и ссылок)
    }
    return entity;
}

var LazyLoader = stampit()

    .state({
        entityHash: {},
        uuidBatches: {}
    })

    .methods({
        getEntity: getEntity_,
        mapLazyLoader: mapLazyLoader_,
        defProperty: defProperty_,
        addUuidToBatch: addUuidToBatch_
    });


var createLazyLoader = function () {
    var lazyLoader = LazyLoader.create();

    lazyLoader.client = this;

    //noinspection JSUnusedGlobalSymbols
    return {
        attach: function (obj, batches) {
            lazyLoader.mapLazyLoader(obj, obj.TYPE_NAME, batches);
            return this;
        }
    }
};

module.exports = createLazyLoader;