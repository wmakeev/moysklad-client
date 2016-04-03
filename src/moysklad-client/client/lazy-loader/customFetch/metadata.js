/**
 * metadata
 * Date: 03.04.16
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash'),
    tools = require('project/tools');

function metadata(type, uuids, path, batchName, batches, containerEntity) {
    var client = this.client,
        that = this,
        uriType;

    var embeddedEntityMetadata = client.from('embeddedEntityMetadata').load();

    if (containerEntity) {
        uriType = tools.getUriTypeName(containerEntity.TYPE_NAME);
        query = query.filter('name', uriType);
    }

    embeddedEntityMetadata = query.load();

    embeddedEntityMetadata.forEach(function (embeddedEntityMetadataItem) {
        that.entityHash.add(
            that.mapLazyLoader(attributeMetadataItem, path, batches, attributeMetadataItem));
        embeddedEntityMetadataItem.attributeMetadata.forEach(function (attributeMetadataItem) {
            that.entityHash.add(
                that.mapLazyLoader(attributeMetadataItem, path, batches, attributeMetadataItem));
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

