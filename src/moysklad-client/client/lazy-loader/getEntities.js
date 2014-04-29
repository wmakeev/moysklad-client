/**
 * getEntities
 * Date: 29.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');


function getEntities (type, uuids, path, batchName, batches, containerEntity) {
    var client = this.client,
        entity, entities;

    if (batchName && this.uuidBatches[batchName] && this.uuidBatches[batchName].length > 0) {
        // TODO Потенциальная проблема при batch-загрузке таких сущностей как Slot и прочих через customFetch, ..
        // где важен containerEntity
        entities = this.fetchEntities(type, this.uuidBatches[batchName], containerEntity);

        _.each(entities, function (entityItem) {
            this.entityHash[entityItem.uuid] = this.mapLazyLoader(entityItem, path, batches, entityItem);
        }, this);

        this.uuidBatches[batchName] = []; // очищаем список uuid загруженных сущностей
    }

    if (typeof uuids === 'string') {
        if (!this.entityHash[uuids]) {
            entity = this.fetchEntities(type, uuids, containerEntity);
            this.entityHash[uuids] = this.mapLazyLoader(entity, path, batches, entity);
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

module.exports = getEntities;