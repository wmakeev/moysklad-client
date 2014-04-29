/**
 * slot
 * Date: 29.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');

function fetchSlots(type, uuids, containerEntity) {
    var client = this.client;
    
    var query = client.from('warehouse');
    
    var warehouseUuid = type == 'sourceSlot' ? 
        containerEntity.sourceStoreUuid :
        containerEntity.targetStoreUuid;
    
    var warehouses = warehouseUuid ?
        [client.load('warehouse', warehouseUuid)] :
        client.from('warehouse').load();
    
    //this.addToHash(warehouses);
    
    var slots = _.reduce(warehouses, function(slots, warehouse) {
        if (warehouse.slots) slots = slots.concat(warehouse.slots);
    }, []); 
    
    //TODO Т.к. не все ячейки "выйдут наружу" из этой функции их нужно добавить в Hash
    // Для этого нужно вызывать mapLazyLoader отсюда (прокидывать параметры)
    
    if (typeof uuids === 'string') {
        //TODO Добавляем без привязки LazyLoader'а (не критично для slot)
        this.addToHash(slots);
        return this.entityHash[uuids];
    }
    else if (uuids instanceof Array) {
        // Возвращаем все ячейки (выше они будут добавелны в Hash и привязан LazyLoader)
        // TODO Нужно учитывать, что фактически возвращаем не то, что запрошено 
        return slots;
    }
}

module.exports = fetchSlots;