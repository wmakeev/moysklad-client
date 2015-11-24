var should = require('should');
var util = require('util');

var Queue = require('../../src/node_modules/project/fetch/queue');

describe('Queue', function() {

    it('should to be function', function () {
        Queue.should.be.type('function')
    });

    it('should have instance methods', function () {
        var queue = new Queue();
        queue.should.have.property('addTask');
        should(queue.timeout).eql(250);
        should(queue.parallelTaskCount).eql(2);
    });

    it('should process async task', function (done) {
        var queue = new Queue();
        var task = function (cb) {
            setTimeout(function () {
                cb(null, 123)
            }, 1)
        };
        queue.addTask(task, function (err, data) {
            should(data).eql(123);
            done()
        })
    });

    it('should process sync task', function () {
        var queue = new Queue({
            async: false
        });

        var task = function (cb) {
            cb(null, 123)
        };

        var res;
        queue.addTask(task, function (err, data) {
            res = data;
        });

        should(res).eql(123);
    });

    it('should process sync task (w/o callback)', function () {
        var queue = new Queue({
            async: false
        });

        var task = function (cb) {
            cb(null, 123)
        };

        var res = queue.addTask(task, undefined);

        should(res).eql(123);
    });

    it('should process async tasks', function (done) {
        var queue = new Queue({
            timeout: 100
        });

        var startTime = 0;

        var timeLog = [];

        var task1 = function (cb) {
            should(startTime).eql(0);
            startTime = (+new Date());
            timeLog.push({ elapsed: 0, action: 'task1' });
            setTimeout(function () {
                cb(null, 'task1-ok')
            }, 400)
        };

        var task2 = function (cb) {
            timeLog.push({ elapsed: (+new Date()) - startTime, action: 'task2' });
            setTimeout(function () {
                cb(null, 'task2-ok')
            }, 100)
        };

        var task3 = function (cb) {
            timeLog.push({ elapsed: (+new Date()) - startTime, action: 'task3' });
            setTimeout(function () {
                cb(null, 'task3-ok')
            }, 250)
        };

        var task4 = function (cb) {
            timeLog.push({ elapsed: (+new Date()) - startTime, action: 'task4' });
            setTimeout(function () {
                cb(null, 'task4-ok')
            }, 200)
        };

        var noopCalls = 0;
        var noop = function () { noopCalls++ };

        queue.addTask(task1, noop);
        queue.addTask(task2, noop);
        queue.addTask(task3, noop);

        setTimeout(function () {
            queue.addTask(task4, noop);
        }, 150);

        setTimeout(function () {
            // console.log('timeLog', util.inspect(timeLog));
            // console.log(util.inspect(queue));
            should(timeLog.length).eql(4);

            // task 1
            timeLog[0].action.should.eql('task1');

            // task 2
            timeLog[1].action.should.eql('task2');
            timeLog[1].elapsed.should.be.within(100, 120);

            // task 3
            timeLog[2].action.should.eql('task3');
            timeLog[2].elapsed.should.be.within(200, 220);

            // task 4
            timeLog[3].action.should.eql('task4');
            timeLog[3].elapsed.should.be.within(400, 420);

            noopCalls.should.eql(4);

            done()
        }, 800)
    });

});
