/**
 * client
 * Date: 26.05.15
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var clientStamp = require('../../src/moysklad-client/client');

describe('client', function () {

    beforeEach(function () {
        this.client = clientStamp();
    });

    it('should have properties', function () {

        _.forEach([
            // client
            'from',
            'load',
            'chain',
            'first',
            'total',
            'save',

            // json service
            'stock',
            'stockForGood',
            'slot',
            'mutualSettlement',
            'mutualSettlementForCustomer',

            // operators
            'anyOf',
            '$in',
            'between',
            '$bt',
            'greaterThen',
            '$gt',
            'greaterThanOrEqualTo',
            '$gte',
            'lessThan',
            '$lt',
            'lessThanOrEqualTo',
            '$lte',

            // other
            'createQuery',
            'createLazyLoader',
            'loadMetadata',
            'options',
            'sortMode'

        ], function (prop) {
            assert.ok(this.client[prop], 'client must have property [' + prop + ']');
        }, this);

    });

    it('should have auth provider behavior', function () {

        expect(this.client).to.contain.all.keys(
            'setAuth',
            'getAuth',
            'getBasicAuthHeader',
            'isAuth'
        );

    });

    it('should have provider accessor behavior', function () {

        expect(this.client).to.contain.all.keys(
            'getProvider',
            'setProvider'
        );

    });

    it('should have classes constructor properties', function () {

        expect(this.client).to.contain.all.keys(
            'context',
            'AccountEntity',
            'CustomerOrder'
        );

    });

    describe('entities', function () {

        describe('constructors properties', function () {

            it('should to be defined', function () {
                var client = this.client;

                var CustomerOrder =
                        client.context.typeInfos['moysklad.customerOrder'].instanceFactory;

                expect(client.CustomerOrder)
                    .to.be.ok
                    .and.equal(CustomerOrder);

                assert.ok(client.AccountEntity, 'AccountEntity to be ok');
            });

            it('should create entities instances', function () {
                var client = this.client;

                var customerOrder = client.CustomerOrder({
                    name: 'foo-order'
                });

                assert.ok(customerOrder, 'Instance of CustomerOrder to be ok');

                expect(customerOrder.TYPE_NAME)
                    .equal('moysklad.customerOrder');

                expect(customerOrder.name)
                    .equal('foo-order');

                expect(customerOrder.getType)
                    .to.be.a('function');

                expect(customerOrder.getType()).to.equal(customerOrder.TYPE_NAME);
            });

        });

        describe('instances', function () {

            it('should have extended properties', function () {
                var client = this.client;

                var accountEntity = client.AccountEntity();
                var customerOrder = client.CustomerOrder();

                // AccountEntity properties
                expect(accountEntity).to.have.property('getType');
                expect(customerOrder).to.have.property('getType');

                // Aggregate only properties
                expect(accountEntity).to.have.not.property('save');
                expect(customerOrder).to.have.property('save');

            });

        });

    });

    describe('methods', function () {

        beforeEach(function () {
            //this.client
            //    .setProvider('ms-xml', msXmlClient)
            //    .setProvider('json-services', jsonServices);
        });

        describe('load', function () {

            it('should load entity by uuid', function () {
                //var order = this.client.load('customerOrder', 'uuid');

            })

        })

    })

});