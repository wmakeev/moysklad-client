/**
 * getEntities
 * Date: 29.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');

function addToHash(entities) {
    _.each(entities, function(entity) {
        this.entityHash[entity.uuid] = entity;
    }, this);
} 

module.exports = addToHash;