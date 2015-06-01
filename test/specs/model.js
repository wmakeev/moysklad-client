/**
 * model
 * Date: 28.05.15
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

describe('model', function () {

    beforeEach(function () {
        this.client = moysklad.createClient();
    });


    describe('customs', function () {

        beforeEach(function () {
            this.customerOrder = this.client.CustomerOrder();
        });

        it('should have methods', function () {
            expect(this.customerOrder).to.have.property('save');
            expect(this.customerOrder).to.have.property('getAttr');
            expect(this.customerOrder).to.have.property('hasAttr');
        });

    });

    describe('accountEntity', function () {

        beforeEach(function () {
            this.accountEntity = this.client.AccountEntity();
        });

        it('should have methods', function () {

            var accountEntity = this.accountEntity;

            expect(accountEntity).to.have.property('getType');
            expect(accountEntity).to.have.property('instanceOf');
            expect(accountEntity).to.have.property('clone');
            expect(accountEntity).to.have.property('getProperty');

        });

        describe('instanceOf', function () {

            it('should test instance of entity', function () {
                var customerOrder = this.client.CustomerOrder();
                var test = customerOrder.instanceOf('order');
                assert.ok(
                    customerOrder.instanceOf('order'),
                    'customerOrder must be instance of order');

                assert.ok(
                    customerOrder.instanceOf('moysklad.entity'),
                    'customerOrder must be instance of entity');
            });

        });

        describe('getProperty', function () {

            it('should return property value for path', function () {
                var customerOrder = this.client.CustomerOrder({
                    foo: {
                        bar: 'order'
                    }
                });
                expect(customerOrder.getProperty('foo.bar')).to.be.equal('order');
            })

        });

    });

    describe('order', function () {

        it('should have "reserve" method', function () {
            var customerOrder = this.client.CustomerOrder();
            expect(customerOrder).to.have.property('reserve');
        });

        //TODO test
    });

    describe('operationWithPositions', function () {

        it('should have "getPositions" method', function () {
            var customerOrder = this.client.CustomerOrder();
            expect(customerOrder).to.have.property('getPositions');
        });

        //TODO test
    });

    describe('abstractGood', function () {

        it('should have "getPrice" method', function () {
            var good = this.client.Good();
            expect(good).to.have.property('getPrice');
        });

        it('should have "hasPrice" method', function () {
            var good = this.client.Good();
            expect(good).to.have.property('hasPrice');
        });

        //TODO test
    });

    describe('attributeValue', function () {

        it('should have "getValue" method', function () {
            var attr = this.client.AttributeValue();
            expect(attr).to.have.property('getValue');
        });

        //TODO test
    })

});