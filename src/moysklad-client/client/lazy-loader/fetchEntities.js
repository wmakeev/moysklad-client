/**
 * fetchEntities
 * Date: 29.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
  , customFetch = require('./customFetch');


function fetchEntities (type, uuids, containerEntity) {
    var client = this.client,
        entity, entities;
        
    if (type in customFetch) {
        return customFetch[type].apply(this, arguments);
    
    } else {
        if (typeof uuids === 'string') {
            entity = client.load(type, uuids);
            return entity;
    
        }
        else if (uuids instanceof Array) {
            entities = client.from(type).select({
                uuid: client.anyOf(uuids)
            }).load();
            return entities;
        }
    }
}

module.exports = fetchEntities;