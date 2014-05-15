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
    console.log('Linked sourceAgent: ' + order.sourceAgent.name);
    console.log('Position Consignment: ' + order.customerOrderPosition[0].consignment.name);
    console.log('Position Good: ' + order.customerOrderPosition[0].good.name);
    console.log('Linked Demand: ' + order.demands[0].name);
    console.log('Linked Demand: ' + order.demands[0].name);
};

var context_test = function() {
    
    var test = client.instanceOf({ TYPE_NAME: 'moysklad.customerOrder' }, 'entity');
    
    console.log(test);

};

var http_test = function () {
    var HttpClient = require('httpclient').HttpClient,
        tools = require('./src/tools');

    var httpClient = new HttpClient({
        method: 'PUT', //'GET',
        //url: 'https://online.moysklad.ru/exchange/rest/ms/xml/CustomerOrder/a7acd190-156d-11e3-1c9e-7054d21a8d1e'
        url: 'https://online.moysklad.ru/exchange/rest/ms/xml/CustomerOrder'
    });

    //httpClient.setHeader('Content-Type', 'application/x-www-form-urlencoded');
    httpClient.setHeader('Content-Type', 'application/xml');
    httpClient.setHeader('Authorization', tools.getBasicAuthHttpHeader(
        process.env.MOYSKLAD_LOGIN,
        process.env.MOYSKLAD_PASSWORD
    ));

    var data = httpClient
        .write('<customerOrder></customerOrder>')
        .connect().read()
        .body.read().decodeToString();

    console.log(data);
};

moysklad_test();
//context_test();

//http_test();