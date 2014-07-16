# **moysklad-client**

[![NPM](https://nodei.co/npm/moysklad-client.png?downloads=true&stars=true)](https://nodei.co/npm/moysklad-client/)

**JavaScript клиент для работы с API SaaS сервиса** [МойСклад](http://moysklad.ru).

> **ВНИМАНИЕ!**
> Библиотека находится на стадии становления и пока не покрыта тестами, поэтому будьте осторожны при использовании функционала обновления данных, т.к. есть вероятность наличия ошибок.

> **Приветствуются** любые предложения касательно интерфейса и расширения функциональности библиотеки.

> Информацию об ошибках, вопросы и предложениях просьба оставлять в раздле [Issues](https://github.com/wmakeev/moysklad-client/issues?state=open)


## Пример использования
Пример кода в [синхронном режиме](/wmakeev/moysklad-client/wiki/quick-start#%D0%A1%D0%B8%D0%BD%D1%85%D1%80%D0%BE%D0%BD%D0%BD%D1%8B%D0%B9-%D1%80%D0%B5%D0%B6%D0%B8%D0%BC):
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
### Node.js
1. Установка пакета:

    ```bash
    $ npm install moysklad-client --save-dev
    ```

2. Подключение:

    ```js
    var client = require('moysklad-client').createClient();
    ```
    
Настройка библиотеки для других сред описана в разделе документации [Быстрый старт](/wmakeev/moysklad-client/wiki/quick-start)

## Особенности

- Взаимодействие с МойСклад на любой платформе и среде где может выполнятся JavaScript код.
- Поддержка синхронного (браузер, [Google Script](http://www.google.com/script/start/), [Taist](http://www.tai.st/)) и асинхронного ([node.js](http://nodejs.org/)) режима разработки.
- Поддержка всех возможностей API МойСклад.
- Реализована полная объектная модель сервиса на основе официальной [схемы данных](https://online.moysklad.ru/exchange/schema/MOYsklad.xsd).
- Описание объектной модели отделено от программного кода библиотеки, что сокращает расходы на поддержку при обновлениях МойСклад.

## Документация
Полная документация представлена [в разделе Wiki](/wmakeev/moysklad-client/wiki)
