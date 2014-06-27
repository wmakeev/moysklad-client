# moysklad-client

JavaScript клиент для работы с API SaaS сервиса [МойСклад](http://moysklad.ru).

**[идет разработка]**

----------


## Пример использования
Пример кода для синхронного режима (удобно для описания бизнес логики)
```javascript
var client  = require('moysklad-client').createClient(),

// Получаем самый большой заказ за 2013 год.
var order = client.from('customerOrder')
    .select({
        applicable: true,
        moment: client.between(new Date(2013, 0, 1), new Date(2013, 11, 31))
    })
    .orderBy('sum.sum', 'desc')
    .first();

// Привязываем ленивую загрузку, после чего можно будет обращаться к связаным сущностям
// напр. order.sourceAgent.name
client.createLazyLoader().attach(order);

// Клиент оформивший заказ
var agent = order.sourceAgent;

console.log('Лучший клиент 2013 года - ' + agent.name);
console.log('оформил заказ на сумму ' + order.sum.sum / 100 + ' руб.');

// Давйте сделаем хорошему человеку скидку 3%!
agent.discount = 3;

// Сохраним контрагента с измененной скидкой в МойСклад
client.save(agent);
```

## Применение
Библиотека разработана для Node.js. 
Настроена генерация сборок для [Google Script](http://www.google.com/script/start/) и браузера.

## Установка
### Node.js
1. Установка пакета:
    ```bash
    $ npm install moysklad-client --save-dev
    ```

2. Подключение:
    ```js
    var client = require('moysklad-client').createClient();
    ```
### Google Script
1. Подключение библиотеки:

    Ключ проекта
    ```
    MLCI59nqTVFXnUiFFdN0ODv83WiXiLvsc
    ```

2. Использование:

    ```js
    var client = MoyskladClient.createClient();
    ```

## Особенности
[особенности]

## Документация
[в разработке]
