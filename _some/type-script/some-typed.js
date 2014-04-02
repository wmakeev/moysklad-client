/// <reference path="../../res/DefinitelyTyped/moysklad"/>
// Приведение типа any -> Moysklad.Employee
function process(name) {
    var result = {};
    result.A = name + ' processed';
    return result;
}

var processed1 = process('Василий Петрович');
var processed2 = process('Василий Петрович');

console.log(processed1.A == processed2.A);

// Создание типизированного объекта
var entity = new Moysklad.Entity();
entity.A = 'company';

// Клиент
var client = new Moysklad.Client();

// http://goo.gl/BXawDl
//var infoEntity = client.load('infoEntity', '123-456-789');
var employee = client.load(Moysklad.Employee, '123-456-789');

employee;
//# sourceMappingURL=some-typed.js.map
