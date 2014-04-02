/// <reference path="../../res/DefinitelyTyped/moysklad"/>


// Приведение типа any -> Moysklad.Employee
function process (name : string) {
    var result: any = {};
    result.A = name + ' processed';
    return result;
}

var processed1 = <Moysklad.Employee> process('Василий Петрович'); // вариант 1
var processed2: Moysklad.Employee = process('Василий Петрович');  // вариант 2

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



