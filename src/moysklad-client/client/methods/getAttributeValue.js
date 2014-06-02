/**
 * getAttribute
 * Date: 01.06.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');

/**
 * Получение значения аттрибута по metadataUuid
 * (осуществляется методом перебора возможных полей без дополнительной загрузки метаданных)
 * @param entity Сущность с аттрибутами
 * @param metadataUuid Идентификатор метаданных аттрибута
 * @returns {*}
 */
var getAttributeValue = function (entity, metadataUuid) {
    var attributeValue;

    if (entity && entity.attribute) {
        var attribute = _.find(entity.attribute, { metadataUuid: metadataUuid });

        if (attribute) {
            attributeValue =
                attribute.metadataUuid
             || attribute.valueText
             || attribute.valueString
             || attribute.doubleValue
             || attribute.longValue
             || attribute.booleanValue
             || attribute.timeValue
             || attribute.entityValueUuid
             || attribute.agentValueUuid
             || attribute.goodValueUuid
             || attribute.placeValueUuid
             || attribute.consignmentValueUuid
             || attribute.contractValueUuid
             || attribute.projectValueUuid
             || attribute.employeeValueUuid;
        }
    }

    return attributeValue;
};

module.exports = getAttributeValue;