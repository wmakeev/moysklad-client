var _ = require('lodash')
var have = require('project/have')
var tools = require('project/tools')
var logger = require('project/logger')
var AuthStore = require('project/auth-store')
var pkg = require('../../package')

var resolverBehavior = require('project/behaviors/resolver')

var Query = require('./rest-clients/ms-xml/query')
var ClientBase = require('./client')
var MsXmlClient = require('../rest-clients/ms-xml')
var JsonClient = require('../rest-clients/json') // TODO Переименовать в json-services

var Client = ClientBase
  .init(resolverBehavior)
  .init(function (options, context) {
    var authStore = new AuthStore()

    this.addDependency({
      'logger': logger,
      'ms-xml': MsXmlClient().init(resolverBehavior).create(),
      'json-service': JsonClient().init(resolverBehavior).create(),
      'auth': authStore
    })

    if (options.login) {
      authStore.setAuth(options.login, options.password)
    }
  })

logger.info('moysklad-client v' + pkg.version)

module.exports = {
  createClient: function () {
    var args = have(arguments, [
      {},
      { login: 'string', password: 'string' },
      { options: 'object' }
    ])
    var options = {}

    if (args.options) {
      options = _.assign(options, args.options)
    }

    return Client.init(function () {
      if (args.login) {
        this.resolve('auth').setAuth(args.login, args.password)
      }
    }).create(options)
  },

  Client: Client,

  createQuery: Query.createQuery,
  tools: tools,
  logger: logger,
  version: pkg.version
}
