/**
 * LazyLoader
 * Date: 15.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
  , stampit = require('stampit');


var LazyLoader = stampit()

    .state({
        entityHash: {},
        uuidBatches: {}
    })

    .methods({
        getEntities:        require('./getEntities'),
        fetchEntities:      require('./fetchEntities'),
        getTypeOfProperty:  require('./getTypeOfProperty'),
        mapLazyLoader:      require('./mapLazyLoader'),
        defProperty:        require('./defProperty'),
        addUuidsToBatch:    require('./addUuidsToBatch'),
        addToHash:          require('./addToHash')
    });

var createLazyLoader = function () {
    var lazyLoader = LazyLoader
        .state({ client: this })
        .create();

    //noinspection JSUnusedGlobalSymbols
    return {
        attach: function (obj, batches) {
            //TODO Если передается массив или коллекция, то нужно привязать LazyLoader ..
            // .. отдельно для каждого элемента, иначе не верно будет передан параметр containerEntity
            lazyLoader.mapLazyLoader(
                obj,                            // Сущность в корой будет созданы "ленивые" свойства на основе uuid связей
                obj.TYPE_NAME || typeof obj,    // Тип сущности
                batches,                        // Определители свойств коллекций, для которых необъодима пакетная загрузка
                obj.TYPE_NAME ? obj : null);    // Сущность контейнер/containerEntity (текущий объект) //TODO См. примечание выше
            return obj;
        }
    }
};

module.exports = createLazyLoader;