var have = require('project/have')
var CallbackAdapter = require('project/callback-adapter')

// TODO Ограничение на кол-во удаляемых объектов в коллекции (проверить)

/**
 * Delete. Удаление объектов.
 *
 * @return {Array.<string>} Список идентификаторов удаленных сущностей
 */
function del () {
  var args = have(arguments, [
    { entity: 'Entity', callback: 'opt function' },
    { entities: 'Entity array', callback: 'opt function' },
    { type: 'string', uuid: 'UUID', callback: 'opt function' },
    { type: 'string', uuids: 'UUID arr', callback: 'opt function' }
  ])

  var cb = args.callback
  var callbackAdapter = new CallbackAdapter(this.options.flowControl, cb)

  var restClient = this.getProvider('ms-xml')

  delete args.callback
  restClient.del(args, function (err, data) {
    callbackAdapter.done(err, /* TODO !!! */ data.obj)
  })

  return callbackAdapter.resolve()
}
module.exports = del
