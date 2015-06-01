/**
 * tools
 * Date: 28.05.15
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var tools = require('../../src/node_modules/project/tools');

// entity
var clone       = tools.clone;
var hasAttr     = tools.hasAttr;
var hasPrice    = tools.hasPrice;
//var instanceOf  = tools.instanceOf;

// tools
var isUuid      = tools.isUuid;
var getProperty = tools.getProperty;


describe('tools', function () {

    describe('entity', function () {

        describe('clone', function () {

            beforeEach(function () {
                this.obj = {
                    name: 'order',
                    updated: new Date,
                    uuid: '123-456-789',
                    positions: [
                        { name: 'pos-1', operationUuid: '234-567-890' },
                        { name: 'pos-2' }
                    ],
                    field: {
                        subField: 'content',
                        uuid: '567-890-345'
                    }
                };
            });

            it('should clone object', function () {

                expect(clone(this.obj)).to.be.eql({
                    name: 'order',
                    positions: [
                        { name: 'pos-1' },
                        { name: 'pos-2' }
                    ],
                    field: {
                        subField: 'content'
                    }
                });

            });

            it('should not mutate source object', function () {
                var cloned = clone(this.obj);

                expect(this.obj).to.contain.keys('uuid');
                expect(this.obj.field).to.contain.keys('uuid');
            });

        });

        describe('hasAttr', function () {

            it('should test entity for attribute exist', function () {
                var entity = {
                    name: 'name',
                    attribute: [
                        {
                            metadataUuid: '5f6e3b38-043f-11e5-7a07-673d0033e823'
                        },
                        {
                            metadataUuid: '5f6e3b38-043f-11e5-7a07-673d0033e824'
                        }
                    ]
                };

                assert.ok(hasAttr(entity, '5f6e3b38-043f-11e5-7a07-673d0033e824'));
                assert.notOk(hasAttr(entity, '5f6e3b38-043f-11e5-7a07-673d0033e825'));

                //TODO test exeptions
            });

        });

        describe('hasPrice', function () {

            it('should test entity for price exist', function () {
                var entity = {
                    name: 'name',
                    salePrices: [
                        {
                            priceTypeUuid: '5f6e3b38-043f-11e5-7a07-673d0033e823'
                        },
                        {
                            priceTypeUuid: '5f6e3b38-043f-11e5-7a07-673d0033e824'
                        }
                    ]
                };

                assert.ok(hasPrice(entity, '5f6e3b38-043f-11e5-7a07-673d0033e824'));
                assert.notOk(hasPrice(entity, '5f6e3b38-043f-11e5-7a07-673d0033e825'));

                //TODO test exeptions
            });

        });

        //describe('instanceOf', function () {
        //
        //    it('should test entity is instance of', function () {
        //        assert.ok(instanceOf('customerOrder', 'order'));
        //        assert.ok(instanceOf('moysklad.customerOrder', 'order'));
        //        //TODO assert.ok(instanceOf(client.Order(), 'entity'));
        //        assert.notOk(instanceOf('order', 'moysklad.demand'));
        //    });
        //
        //});

    });

    describe('isUuid', function () {

        it('should test for uuid', function () {
            var uuid = '5f6e3b38-043f-11e5-7a07-673d0033e823';
            var not_uuid = 'this_is_not_uuid';

            assert.ok(isUuid(uuid));
            assert.notOk(isUuid(not_uuid));
        });

    });

    describe('getProperty', function () {

        it('should return property value for path', function () {

            var obj = {
                a: 'a',
                b: {
                    c: 'c'
                }
            };

            expect(getProperty(obj, 'a')).to.be.equal(obj.a);
            expect(getProperty(obj, 'b.c')).to.be.equal(obj.b.c);

            assert.isUndefined(getProperty(obj, 'b.x'));
            assert.isUndefined(obj.b.x);

            expect(getProperty(obj, 'b.x', 'foo')).to.be.equal('foo');
            assert.isUndefined(obj.b.x);

            expect(getProperty(obj, 'b.x', 'foo', true)).to.be.equal('foo');
            expect(obj.b.x).to.be.equal('foo');

        });

    })
});
