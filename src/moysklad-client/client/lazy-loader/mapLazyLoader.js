/**
 * mapLazyLoader
 * Date: 29.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');


/**
 * Рекурсивно создает свойства согласно ссылкам на связанные объекты
 *
 * @param {object} entity Объект или узел внутри объекта
 * @param {string|null} path Путь к обрабатываемому узлу ( напр. "prop1.prop2")
 * @param {array|null} batches
 * @param {object} containerEntity Базовый объект МойСклад (напр. CustomerOrder) который содержит текущее свойство propertyName
 * @returns {*}
 * @private
 *
 */
function mapLazyLoader (entity, path, batches, containerEntity) {
    var curPath, propertyName;
    path = path || '';

    for (var key in entity) {
        if (entity[key]) {
            if (typeof key === 'string' 
                && key.substring(key.length - 4) == 'Uuid' 
                && entity.hasOwnProperty(key)) {
                
                // demandsUuid -> demands
                propertyName = key.substring(0, key.length - 4);
                curPath = path + '.' + propertyName;
                
                // напр. "demandsUuid" .. то при обращении нужно загрузить все сущности по массиву идентификаторов
                if (entity[key] instanceof Array) {
                    (batches = batches || []).push(curPath);
                }
                
                this.defProperty(entity, propertyName, entity[key], curPath, batches, containerEntity);
            
            } else if (typeof entity[key] === 'object' && !(entity[key] instanceof Date)) {
                if (entity instanceof Array) {
                    this.mapLazyLoader(entity[key], path, batches, containerEntity);

                } else if (entity.hasOwnProperty(key)) {
                    this.mapLazyLoader(entity[key], path + '.' + key, batches, containerEntity);
                }
            }
        }
    }
    return entity;
}

module.exports = mapLazyLoader;