/**
 * mapLazyLoader
 * Date: 29.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
  , tools = require('project/tools');


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

    // Список методов tools которые необходимо привязать к объекту
    //TODO Нужно ли делать через defineProperty?
    var bindingMethods = [];

    if (!(entity instanceof Array)) {
        bindingMethods.push('getProperty');
    }

    // Привязываем проверку типа
    if ('TYPE_NAME' in entity) {
        bindingMethods.push('instanceOf');
    }

    if (tools.instanceOf(entity, 'order'))
        bindingMethods.push('reserve');

    // Привязываем универсальный метод доступа к позициям документа (если применимо)
    if (tools.instanceOf(entity, 'operationWithPositions'))
        bindingMethods.push('getPositions');

    //TODO Если атрибуты не заданы entity.attribute будет не определен и привязка не произойдет ..
    //TODO .. нужно проверять по схеме, есть ли в этой сущности аттрибуты
    // Привязываем методы для работы с атрибутами
    if (entity.attribute)
        bindingMethods = bindingMethods.concat(['getAttr', 'getAttrValue']);

    if (entity.salePrices)
        bindingMethods = bindingMethods.concat(['getPrice', 'getPriceValue']);

    _.each(bindingMethods, function (propName) {
        if (!entity[propName])
            entity[propName] = tools[propName].bind(tools, entity);
    });
/*

    _.forEach(entity.attribute, function (attribute) {
        Object.defineProperty(entity, attribute.metadataUuid, {
            get: function () {

            },
            enumerable: false,
            configurable: true
        });
    });
*/

    //TODO Перепроверить логику обхода гарфа объекта
    for (var key in entity) {
        var subEntity = entity[key];

        if (subEntity && entity.hasOwnProperty(key) && !(subEntity instanceof Date)) {

            // строка идентификатор или массив идентификаторов [name]Uuid, напр. ".goodUuid", ".demandsUuid[]"
            if (isNaN(key) && key.substring(key.length - 4) == 'Uuid') {

                // demandsUuid -> demands
                propertyName = key.substring(0, key.length - 4);
                curPath = path + '.' + propertyName;

                // напр. "demandsUuid" .. то при обращении нужно загрузить все сущности по массиву идентификаторов
                if (subEntity instanceof Array) {
                    (batches = batches || []).push(curPath);
                }

                this.defProperty(entity, propertyName, subEntity, curPath, batches, containerEntity);
            }

            // массив
            else if (subEntity instanceof Array) {
                entity instanceof Array ?
                    // [[]] - вложенный массив
                    this.mapLazyLoader(subEntity, path + '.object', batches, containerEntity) :
                    // свойство массив, напр. ".customerOrderPosition[]"
                    this.mapLazyLoader(subEntity, path, batches, containerEntity);
            }

            // объект
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