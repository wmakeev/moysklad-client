# moysklad-client

_moysklad-client_ - JavaScript клиент для работы с API SaaS сервиса МойСклад

## Пример использования
```javascript
var client  = require('moysklad-client').createClient(),
    _       = require('lodash');

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

