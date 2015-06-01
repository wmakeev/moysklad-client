/**
 * loadMetadata
 * Date: 31.05.15
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash'),
    callbackAdapter = require('project/tools/callbackAdapter'),
    have = require('have');

var loadMetadata = function () {
    var that = this;
    var args = have(arguments, {
        cb: 'opt function'
    });

    var metadata = {};

    this.from('embeddedEntityMetadata')
        .load(function (err, data) {
            if (err) return callbackAdapter(err, data, args.cb);

            metadata.embeddedEntityMetadataByUuid = _.indexBy(data, 'uuid');
            metadata.embeddedEntityMetadataByName = _.indexBy(data, 'name');

            metadata.attributeMetadataByUuid = _(data)
                .pluck('attributeMetadata').flatten().indexBy('uuid').value();

            that.metadata = metadata;
            callbackAdapter(null, that, args.cb);
        });

    return this;
};

module.exports = loadMetadata;