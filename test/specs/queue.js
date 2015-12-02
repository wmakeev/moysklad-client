var should = require('should');
// var util = require('util');

var Queue = require('../../src/node_modules/project/fetch/queue');

describe('Queue', function() {

    it('should to be function', function () {
        Queue.should.be.type('function')
    });

    it('should have instance methods', function () {
        var queue = new Queue();
        queue.should.have.property('addTask');
        should(queue.requestPeriod).eql(1000);
        should(queue.requestsPerPeriod).eql(5);
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
            requestPeriod: 100,
            requestsPerPeriod: 3
        });

        var timeLog = [];

        function getAsyncTask (name, executionTime, onStart) {
            return function (cb) {
                onStart(name);
                setTimeout(function () {
                    cb(null, name)
                }, executionTime)
            };
        }

        function logger (taskName) {
            timeLog.push({ time: new Date() - startTime, action: taskName })
        }

        var noopCalls = 0;
        var noop = function () { noopCalls++ };

        var startTime = new Date();

        queue.addTask(getAsyncTask('task1', 20, logger), noop);
        queue.addTask(getAsyncTask('task2', 40, logger), noop);
        queue.addTask(getAsyncTask('task3', 130, logger), noop);
        queue.addTask(getAsyncTask('task4', 20, logger), noop);
        queue.addTask(getAsyncTask('task5', 30, logger), noop);
        queue.addTask(getAsyncTask('task6', 30, logger), noop);
        queue.addTask(getAsyncTask('task7', 70, logger), noop);
        queue.addTask(getAsyncTask('task8', 170, logger), noop);

        setTimeout(function () {
            queue.addTask(getAsyncTask('task9', 20, logger), noop)
        }, 240);

        setTimeout(function () {
            queue.addTask(getAsyncTask('task10', 20, logger), noop)
        }, 250);

        setTimeout(function () {
            queue.addTask(getAsyncTask('task11', 70, logger), noop)
        }, 260);

        setTimeout(function () {
            queue.addTask(getAsyncTask('task12', 20, logger), noop)
        }, 270);

        setTimeout(function () {
             console.log('timeLog\n', util.inspect(timeLog));
             console.log(util.inspect(queue));

            var cases = [0, 0, 20, 120, 140, 240, 250, 270, 380, 420, 510, 550];

            cases.forEach(function (time, index) {
                timeLog[index].action.should.eql('task' + (index + 1));
                timeLog[index].time.should.be.within(time, time + 20);
            });

            noopCalls.should.eql(12);

            done()
        }, 1000)
    });

});
