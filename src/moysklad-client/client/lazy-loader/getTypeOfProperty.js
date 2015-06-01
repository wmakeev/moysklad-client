/**
 * getTypeOfProperty
 * Date: 29.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var propMap = require('./nameToTypeMap');


function getTypeOfProperty(propertyName, entity) {
    // entityValue (пользовательский атрибут)
    if (propertyName.slice(-5) == 'Value') {
        propertyName = propertyName.substring(0, propertyName.length - 5);
        if (propertyName === 'entity') propertyName = 'customEntity'
    }

    if (propMap[propertyName])
        return propMap[propertyName];

    else if (entity.TYPE_NAME && propMap[entity.TYPE_NAME] && propMap[entity.TYPE_NAME][propertyName])
        return propMap[entity.TYPE_NAME][propertyName];

    else
        return 'moysklad.' + propertyName;
}

module.exports = getTypeOfProperty;