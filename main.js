if (!process.env.MOYSKLAD_LOGIN) require('./auth');

var client = require("./src/moysklad-client").createClient();

/**
 * Создаем заказ покупателя
 */
function createCutomerOrder() {
    console.log('== Создание документа ==');
    
    var newOrder = {
        
    }
}


var moysklad_test = function() {
    
    var order = client.load('customerOrder', '342486ed-cea1-11e3-99e9-002590a28eca');
    console.log('Order name: ' + order.name);
    
    client.createLazyLoader().attach(order, ['good']);
    console.log('Position Consignment: ' + order.customerOrderPosition[0].consignment.name);
    console.log('Position Good: ' + order.customerOrderPosition[0].good.name);
    console.log('Linked sourceAgent: ' + order.sourceAgent.name);
    console.log('Linked Demand: ' + order.demands[0].name);
    console.log('Linked Demand: ' + order.demands[0].name);
};

var context_test = function() {
    
    var test = client.instanceOf({ TYPE_NAME: 'moysklad.customerOrder' }, 'entity');
    
    console.log(test);
}

moysklad_test();
//context_test();