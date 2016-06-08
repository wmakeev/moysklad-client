/**
 * getTypeOfProperty
 * Date: 29.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var propMap = require('./nameToTypeMap');


function getTypeOfProperty(propertyName, entity) {

    if (entity.TYPE_NAME && propMap[entity.TYPE_NAME] && propMap[entity.TYPE_NAME][propertyName]) {
        return propMap[entity.TYPE_NAME][propertyName];
    }

    if (propMap[propertyName]) {
        return propMap[propertyName];
    }

    return propertyName;
}

module.exports = getTypeOfProperty;
