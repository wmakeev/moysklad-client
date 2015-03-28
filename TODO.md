TODO
====

- Добавить `client.max` метод

 ```js
 var order = client.max('customerOrder', 'updated');
 ```

 аналогично:

 ```js
 var order = client.from('customerOrder').sortBy('updated', 'dsc').first();
 ```

 - Индивидуальный метод создания запроса для каждого типа объектов.

 ```js
 var order;

 order = client.from('customerOrder').first();

 // или
 order = client.customerOrder().first();
 ```

 - [experimental] createMapping

Привязка дополнительных функциональных методов в зависимости от типа сущности.
Воспользоваться новым функционалом Jsonix и привязывать методы в prototype.

 ```js
 // Вариант не через prototype (можно добавить вычисляемое поле, вместо функции)
 client.createMapping('order', function(entity) {
     /* Проверить резерв по всем позициям, записать в поле или создать вычисляемое свойство */;
 });
 ```

Скорее всего должен быть базовый класс с конструктором и методами прототипов.

Некоторые идеи - http://thestorefront.github.io/DataCollection.js/