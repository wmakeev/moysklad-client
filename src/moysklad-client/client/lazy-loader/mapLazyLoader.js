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

    //TODO Нужно составить подробный алгоритм для каждого случая ..
    // .. возможно сделать два цикла по ключам объекта и по массиву

    for (var key in entity) {
        var subEntity = entity[key];

        if (subEntity && entity.hasOwnProperty(key) && !(subEntity instanceof Date)) {

            // key - имя cвойства объекта
            if (isNaN(key)) { // TODO Правильно ли сделана проверка на число?

                // ".goodUuid", ".demandsUuid[]"
                if (key.substring(key.length - 4) == 'Uuid') {

                    // demandsUuid -> demands
                    propertyName = key.substring(0, key.length - 4);
                    curPath = path + '.' + propertyName;

                    // напр. "demandsUuid" .. то при обращении нужно загрузить все сущности по массиву идентификаторов
                    if (subEntity instanceof Array) {
                        (batches = batches || []).push(curPath);
                    }

                    this.defProperty(entity, propertyName, subEntity, curPath, batches, containerEntity);
                }

                // ".customerOrderPosition[]"
                else if (subEntity instanceof Array) {
                    this.mapLazyLoader(subEntity, path, batches, containerEntity);
                }
            }

            // [[]]
            else if (subEntity instanceof Array) {
                this.mapLazyLoader(subEntity, path + '.object', batches, containerEntity);
            }

            // key - индекс объекта в массиве
            else if (typeof subEntity === 'object') {
                var typeName = subEntity.TYPE_NAME ? subEntity.TYPE_NAME.split('.')[1] : null;
                this.mapLazyLoader(subEntity,
                        path + '.' + (typeName || 'object'), batches,
                        containerEntity || (subEntity.TYPE_NAME ? subEntity : null));
            }
        }
    }
    return entity;
}

module.exports = mapLazyLoader;