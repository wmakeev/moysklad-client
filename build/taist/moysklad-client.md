# **moysklad-client**

[![NPM](https://nodei.co/npm/moysklad-client.png?downloads=true&stars=true)](https://nodei.co/npm/moysklad-client/)

**JavaScript клиент для работы с API SaaS сервиса** [МойСклад](http://moysklad.ru).

> **ВНИМАНИЕ!**
> Библиотека находится на стадии становления и пока не покрыта тестами, поэтому будьте осторожны при использовании функционала обновления данных, т.к. есть вероятность наличия ошибок.

> **Приветствуются** любые предложения касательно интерфейса и расширения функциональности библиотеки.

> Информацию об ошибках, вопросы и предложениях просьба оставлять в раздле [Issues](https://github.com/wmakeev/moysklad-client/issues?state=open)


## Пример использования

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

// Привязываем ленивую загрузку, после чего можно будет обращаться к связанным сущностям, напр. order.sourceAgent.name
client.createLazyLoader().attach(order);

// Клиент оформивший заказ
var agent = order.sourceAgent;

console.log('Лучший клиент 2013 года - ' + agent.name);
console.log('оформил заказ на сумму ' + order.sum.sum / 100 + ' руб.');

// Давйте сделаем хорошему клиенту скидку 3%!
agent.discount = 3;

// Сохраним контрагента с измененной скидкой в МойСклад
client.save(agent);
```

## Установка

1. Активируем аддон и обновляем страницу МойСклад

2. Открываем консоль и получаем в переменную точку доступа к API
    ```
    var client = require('moysklad-client').createClient();
    ```

3. Получаем данные из МойСклад
    ```
    client.from('customerOrder').sort('moment', 'desc').first()
    ```

## Документация
Полная документация представлена [в разделе Wiki](https://github.com/wmakeev/moysklad-client/wiki)
