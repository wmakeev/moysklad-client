/**
 * entityMetadata
 * Date: 03.04.16
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash'),
    tools = require('project/tools');

function entityMetadata(type, uuids, path, batchName, batches, containerEntity) {
    var client = this.client,
        that = this;

    // EmbeddedEntity
    if (containerEntity.TYPE_NAME === 'moysklad.embeddedEntityMetadata') {
        return containerEntity;
    }

    // CustomEntity


    var query = client.from('embeddedEntityMetadata');

    if (containerEntity) {
        uriType = tools.getUriTypeName(containerEntity.TYPE_NAME);
        query = query.filter('name', uriType);
    }

    embeddedEntityMetadata = query.load();

    embeddedEntityMetadata.forEach(function (embeddedEntityMetadataItem) {
        embeddedEntityMetadataItem.attributeMetadata.forEach(function (attributeMetadataItem) {
            that.entityHash.add(
                that.mapLazyLoader(attributeMetadataItem, path, batches,
                    embeddedEntityMetadataItem));
        });
    });

    if (typeof uuids === 'string') {
        return that.entityHash.get(uuids);
    }
    else {
        throw new Error('metadata uuid expected to be string')
    }
}

module.exports = fetchSlots;


