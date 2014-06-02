/**
 * getPositions
 * Возвращает свойство с массивом позиций для указанного документа (полезно для унификации
 * доступа к позициям документа, т.к. для разных типов объектов наименование свойств с позициями различно)
 *
 * Date: 02.06.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
  , map = require('project/mapping');

/**
 * Возвращает свойство с массивом позиций для указанного документа
 *
 * @param entity Сущность с аттрибутами
 * @returns Array
 */
var getPositions = function (entity) {
    var that = this;

    if (that.instanceOf(entity, 'operationWithPositions')) {

        return _.find(entity, function (value, key) {
            return that.instanceOf(key, 'motion');
        })
    }

    return null;
};

module.exports = getPositions;