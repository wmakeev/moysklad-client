// moysklad-client 0.3.0-beta.1 (bundle length 141001)
// Сборка с кодом основной библиотеки moysklad-client
//
// Vitaliy Makeev (w.makeev@gmail.com)
// https://github.com/wmakeev
// 
require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
 * getobject
 * https://github.com/cowboy/node-getobject
 *
 * Copyright (c) 2013 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 */

'use strict';

var getobject = module.exports = {};

// Split strings on dot, but only if dot isn't preceded by a backslash. Since
// JavaScript doesn't support lookbehinds, use a placeholder for "\.", split
// on dot, then replace the placeholder character with a dot.
function getParts(str) {
  return str.replace(/\\\./g, '\uffff').split('.').map(function(s) {
    return s.replace(/\uffff/g, '.');
  });
}

// Get the value of a deeply-nested property exist in an object.
getobject.get = function(obj, parts, create) {
  if (typeof parts === 'string') {
    parts = getParts(parts);
  }

  var part;
  while (typeof obj === 'object' && obj && parts.length) {
    part = parts.shift();
    if (!(part in obj) && create) {
      obj[part] = {};
    }
    obj = obj[part];
  }

  return obj;
};

// Set a deeply-nested property in an object, creating intermediary objects
// as we go.
getobject.set = function(obj, parts, value) {
  parts = getParts(parts);

  var prop = parts.pop();
  obj = getobject.get(obj, parts, true);
  if (obj && typeof obj === 'object') {
    return (obj[prop] = value);
  }
};

// Does a deeply-nested property exist in an object?
getobject.exists = function(obj, parts) {
  parts = getParts(parts);

  var prop = parts.pop();
  obj = getobject.get(obj, parts);

  return typeof obj === 'object' && obj && prop in obj;
};

},{}],2:[function(require,module,exports){
// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// when used in node, this will actually load the util module we depend on
// versus loading the builtin util module as happens otherwise
// this is a bug in node module loading as far as I am concerned
var util = require('util/');

var pSlice = Array.prototype.slice;
var hasOwn = Object.prototype.hasOwnProperty;

// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  }
  else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = stackStartFunction.name;
      var idx = out.indexOf('\n' + fn_name);
      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function replacer(key, value) {
  if (util.isUndefined(value)) {
    return '' + value;
  }
  if (util.isNumber(value) && (isNaN(value) || !isFinite(value))) {
    return value.toString();
  }
  if (util.isFunction(value) || util.isRegExp(value)) {
    return value.toString();
  }
  return value;
}

function truncate(s, n) {
  if (util.isString(s)) {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}

function getMessage(self) {
  return truncate(JSON.stringify(self.actual, replacer), 128) + ' ' +
         self.operator + ' ' +
         truncate(JSON.stringify(self.expected, replacer), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

function _deepEqual(actual, expected) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (util.isBuffer(actual) && util.isBuffer(expected)) {
    if (actual.length != expected.length) return false;

    for (var i = 0; i < actual.length; i++) {
      if (actual[i] !== expected[i]) return false;
    }

    return true;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!util.isObject(actual) && !util.isObject(expected)) {
    return actual == expected;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b) {
  if (util.isNullOrUndefined(a) || util.isNullOrUndefined(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b);
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b),
        key, i;
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key])) return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  } else if (actual instanceof expected) {
    return true;
  } else if (expected.call({}, actual) === true) {
    return true;
  }

  return false;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (util.isString(expected)) {
    message = expected;
    expected = null;
  }

  try {
    block();
  } catch (e) {
    actual = e;
  }

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  if (!shouldThrow && expectedException(actual, expected)) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws.apply(this, [true].concat(pSlice.call(arguments)));
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/message) {
  _throws.apply(this, [false].concat(pSlice.call(arguments)));
};

assert.ifError = function(err) { if (err) {throw err;}};

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};

},{"util/":6}],3:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],4:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],5:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],6:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require("JkpR2F"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":5,"JkpR2F":4,"inherits":3}],7:[function(require,module,exports){

// have.js - Main have.js exports
module.exports = (function(undefined) {

  var assert = require('assert')
    , fmt    = require('util').format
    , log    = function() { } // require('util').log; // disabled
    ;

  var ARR_RX = /^(.+) a(rr(ay)?)?$/i
    , OR_RX  = /^(.+) or (.+)$/i
    , OPT_RX = /^opt(ional)? (.+)$/i;

  // core recursive check
  function ensure(argName, argType, value, check) {
    var memberType = null
      , valid      = true
      , reason     = null
      , match      = null
      , i          = 0;

    function softAssert(cond, reason_) { if (!(valid = cond)) reason = reason_; }
    function logMatch() { log(match[0]); }

    if (match = argType.match(OPT_RX)) {
      logMatch();
      memberType = match[2];

      ensure(argName, memberType, value, softAssert);

      // optional is consumed if it match or a null/undefined is given.
      return valid ||
        value === null ||
        value === undefined;
    }

    if (match = argType.match(OR_RX)) {
      logMatch();
      memberType = match[1];
      ensure(argName, memberType, value, softAssert);

      if (valid) return true;
      valid = true; // reset previous softAssert

      memberType = match[2];
      ensure(argName, memberType, value, softAssert);

      check(valid, fmt("%s argument is neither a %s nor %s",
        argName, match[1], match[2]));
      return true;
    }

    if (match = argType.match(ARR_RX)) {
      logMatch();
      ensure(argName, 'array', value, softAssert);

      if (!valid) {
        check(false, reason);
        return false;
      }

      memberType = match[1];
      for (i = 0; i < value.length; i++) {
        ensure(argName, memberType, value[i], softAssert);

        if (!valid) {
          check(false, fmt("%s element is falsy or not a %s", argName, memberType));
          return false;
        }
      }

      return true;
    }

    // atom types
    log(argType);
    switch(argType) {

      // basic types
      case 's': case 'str': case 'string':
        valid = typeof value === 'string'; break;

      case 'n': case 'num': case 'number':
        valid = typeof value === 'number'; break;

      case 'b': case 'bool': case 'boolean':
        valid = typeof value === 'boolean'; break;

      case 'f': case 'fun': case 'func': case 'function':
        valid = typeof value === 'function'; break;

      case 'a': case 'arr': case 'array':
        valid = value instanceof Array; break;

      case 'o': case 'obj': case 'object':
        valid = value && typeof value === 'object'; break;

      // built-in types
      case 'r': case 'rx': case 'regex': case 'regexp':
        valid = value && value instanceof RegExp; break;

      case 'd': case 'date': // TODO: case 't': case 'time': case 'datetime': // ?
        valid = value && value instanceof Date; break;

      default:
        valid = false; break;
    }

    check(valid, fmt("%s argument is not %s", argName, argType));
    return true;
  }

  // exports
  function have(args, schema) {
    if (!(args && typeof args === 'object' && 'length' in args))
      throw new Error('have() called with invalid arguments list');
    if (!(schema && typeof schema === 'object'))
      throw new Error('have() called with invalid schema object');

    var idx     = 0
      , argName = null
      , parsedArgs = { };

    for (argName in schema) {
      if (ensure(argName, schema[argName], args[idx], assert)) {
          parsedArgs[argName] = args[idx];
          idx++;
      }
    }

    return parsedArgs;
  };

  // configuration
  have.assert = function(assert_) {
    return (assert_ === undefined) ? assert : (assert = assert_);
  };

  return have;

})();


},{"assert":2,"util":6}],8:[function(require,module,exports){
module.exports={
  "name": "moysklad-client",
  "version": "0.3.0-beta.1",
  "author": {
    "name": "Vitaliy Makeev",
    "email": "w.makeev@gmail.com",
    "url": "https://github.com/wmakeev"
  },
  "description": "JavaScript клиент для API сервиса МойСклад.",
  "license": "MIT",
  "main": "./src/moysklad-client/index.js",
  "scripts": {
    "test": "mocha"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/wmakeev/moysklad-client.git"
  },
  "bugs": {
    "url": "https://github.com/wmakeev/moysklad-client/issues"
  },
  "keywords": [
    "moysklad",
    "warehouse",
    "wms",
    "crm",
    "client",
    "api"
  ],
  "devDependencies": {
    "browserify": "^4.1.5",
    "chai": "^2.3.0",
    "fs-sync": "~0.2.4",
    "grunt": "^0.4.5",
    "grunt-browserify": "^2.1.0",
    "grunt-contrib-concat": "^0.4.0",
    "grunt-contrib-copy": "^0.5.0",
    "grunt-webmake": "^0.1.2",
    "js-beautify": "~1.4.2",
    "rewire": "^2.1.0",
    "sinon": "^1.10.3"
  },
  "dependencies": {
    "colors": "0.6.2",
    "common-node": "0.10.15",
    "getobject": "^0.1.0",
    "have": "0.3.0",
    "jsonix": "^2.2.1",
    "lodash": "^3.9.3",
    "moment": "2.5.0",
    "request": "2.37.0",
    "stampit": "1.1.0",
    "tracer": "0.6.1",
    "xmldom": "0.1.17"
  }
}

},{}],9:[function(require,module,exports){
/**
 * Client
 * Date: 25.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _                         = require('lodash'),
    stampit                   = require('stampit'),
    Query                     = require('./../rest-clients/ms-xml/query'),
    operators                 = require('./../rest-clients/ms-xml/query/operators'),
    authProviderBehavior      = require('project/behaviors/authProviderBehavior'),
    providerAccessorBehavior  = require('project/behaviors/providerAccessorBehavior'),
    modelBuilder              = require('./model-builder');

/**
 * @lends Client.prototype
 */
var clientMethods = {
    // Ms
    from  : require('./methods/from'),
    load  : require('./methods/load'),
    chain : require('./methods/chain'),
    first : require('./methods/first'),
    total : require('./methods/total'),
    save  : require('./methods/save'),

    // Query
    createQuery: Query.createQuery,

    // LazyLoader
    createLazyLoader:   require('./lazy-loader'),

    loadMetadata: require('./methods/loadMetadata')
};

var jsonServiceMethods = require('./methods/json-service');

/**
 * @class Client
 */
var Client = stampit()

    // Options
    .state({
        options: {
            filterLimit: 50,
            flowControl: 'sync',
            baseUrl: 'https://online.moysklad.ru/exchange',
            allowNotFilterOperators: false
        },

        sortMode: {
            ASC: 'asc',
            DESC: 'desc'
        }
    })

    // Auth
    .enclose(authProviderBehavior)

    // Providers accessor
    .enclose(providerAccessorBehavior)

    // Providers accessor
    .enclose(modelBuilder)

    // Methods
    .methods(clientMethods)
    .methods(jsonServiceMethods)
    .methods(operators);

module.exports = Client;
},{"./../rest-clients/ms-xml/query":46,"./../rest-clients/ms-xml/query/operators":56,"./lazy-loader":19,"./methods/chain":23,"./methods/first":24,"./methods/from":25,"./methods/json-service":26,"./methods/load":27,"./methods/loadMetadata":28,"./methods/save":29,"./methods/total":30,"./model-builder":31,"project/behaviors/authProviderBehavior":60,"project/behaviors/providerAccessorBehavior":61,"stampit":"gaBrea"}],10:[function(require,module,exports){
/**
 * batch
 * Date: 13.05.2014
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
    , stampit = require('stampit');


function batch () {

    var that = this,
        _batches = {};

    this.batch = {

        addUuids: function (batchName, uuids) {
            var curBatch = this.get(batchName);

            if (curBatch) {
                _.forEach(that.entityHash.filterNotExist(uuids), function (uuid) {
                    //TODO Перебор по массиву идет два раза. Можно оптимизировать.
                    if (_.indexOf(curBatch, uuid, true) == -1) {
                        curBatch.splice(_.sortedIndex(curBatch, uuid), 0, uuid);
                    }
                });
            }

            return this;
        },

        take: function (batchName) {
            if (_batches[batchName]) {
                var batch = _batches[batchName];
                _batches[batchName] = null;
                return batch;
            } else {
                return null;
            }
        },

        get: function (name) {
            if (arguments.length === 0)
                return _batches;

            if (_batches[name])
                return _batches[name];
            else
                return (_batches[name] = []);
        },

        isExsist: function (batchName) {
            return (_batches[batchName] && _batches[batchName].length > 0);
        }
    }

}

module.exports = batch;
},{"stampit":"gaBrea"}],11:[function(require,module,exports){
/**
 * slot
 * Date: 29.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');

function fetchPayments(type, uuids, containerEntity) {
    var client = this.client;

    // ...
    throw new Error('fetchPayments not implemented')

}

module.exports = fetchPayments;
},{}],12:[function(require,module,exports){


module.exports = {
    
    slot:       require('./slot'),
    state:      require('./state'),
    payments:   require('./__entitiesArray')

};
},{"./__entitiesArray":11,"./slot":13,"./state":14}],13:[function(require,module,exports){
/**
 * slot
 * Date: 29.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');

function fetchSlots(type, uuids, path, batchName, batches, containerEntity) {
    var client = this.client,
        that = this;
    
    var query = client.from('warehouse');
    
    var warehouseUuid = (type == 'sourceSlot' ?
        containerEntity.sourceStoreUuid :
        containerEntity.targetStoreUuid);
    
    var warehouses = warehouseUuid ?
        [client.load('warehouse', warehouseUuid)] :
        client.from('warehouse').load();
    
    var slots = _.reduce(warehouses, function(slots, warehouse) {
        that.entityHash.add(this.mapLazyLoader(warehouse, path, batches, warehouse));
        if (warehouse.slots) slots = slots.concat(warehouse.slots);
        return slots;
    }, []);
    
    if (typeof uuids === 'string') {
        //TODO Добавляем без привязки LazyLoader'а (не критично для slot)
        that.entityHash.add(slots);
        return that.entityHash.get(uuids);
    }
    else if (uuids instanceof Array) {
        // Возвращаем все ячейки (выше они будут добавелны в Hash и привязан LazyLoader)
        // TODO Нужно учитывать, что фактически возвращаем не то, что запрошено 
        return slots;
    }
}

module.exports = fetchSlots;
},{}],14:[function(require,module,exports){
/**
 * state
 * Date: 14.06.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
  , tools = require('project/tools');


function fetchState(type, uuids, path, batchName, batches, containerEntity) {
    var client = this.client,
        that = this;

    var query = client.from('workflow');

    if (containerEntity)
        query.filter('name', tools.getUriTypeName(containerEntity));

    var workflowCollection = query.load();

    var states = _.reduce(workflowCollection, function(states, workflow) {
        that.entityHash.add(workflow);
        if (workflow.state) states = states.concat(workflow.state);
        return states;
    }, []);

    if (typeof uuids === 'string') {
        //Добавляем без привязки LazyLoader'а (не критично для slot)
        that.entityHash.add(states); // Массив с одним элементом
        return that.entityHash.get(uuids);
    }
    else if (uuids instanceof Array) {
        // Нужно учитывать, что фактически возвращаем не то, что запрошено
        return states;
    }

}

module.exports = fetchState;
},{"project/tools":88}],15:[function(require,module,exports){
/**
 * defProperty
 * Date: 29.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');


/**
 * Создает совойство, при обращении к которому происходит ленивая загрузка сущности(ей)
 * 
 * @param {object} entity Объект к которому привязывается свойство
 * @param {string} propertyName Имя создаваемого свойства
 * @param {string | Array.<string>} uuids Идентификатор или массив идентификаторов
 * @param {string} path Путь к текущему совойству
 * @param {Array} batches Массив определителей свойств для списка групповой загрузки
 * @param {object} containerEntity Базовый объект МойСклад (напр. CustomerOrder) который содержит текущее свойство propertyName
 */
function defProperty (entity, propertyName, uuids, path, batches, containerEntity) {
    if (!uuids) return;

    var batchName = _.find(batches, function(batchItem) {
        //noinspection JSReferencingMutableVariableFromClosure
        //TODO Нужно быть точно уверенным что в пачку могут попасть uuid только сущностей одного типа
        return path.slice(-batchItem.length) == batchItem; 
    });

    if (batchName) this.batch.addUuids(batchName, uuids);

    var that = this;
    //TODO Функционал getTypeOfProperty нужно перемесить в customFetch?
    //TODO Возможно получение Demands решить аналогично через customFetch, а не через batch
    Object.defineProperty(entity, propertyName, {
        get: function () {
            var type = that.getTypeOfProperty(propertyName, entity);
            return that.getEntities(type, uuids, path, batchName, batches, containerEntity);
        },
        enumerable: false,
        configurable: true
    });
}

module.exports = defProperty;
},{}],16:[function(require,module,exports){
/**
 * entityHash
 * Date: 13.05.2014
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
    , stampit = require('stampit');


function entityHash () {

    var _entityHash = {};

    this.entityHash = {

        add: function (entities) {
            if (entities instanceof Array) {
                return _.map(entities, function (entity) {
                    return _entityHash[entity.uuid] = entity;
                });

            } else {
                return _entityHash[entities.uuid] = entities;
            }
        },

        get: function (uuids) {
            if (uuids instanceof Array) {
                return _.map(uuids, function (uuid) {
                    //Не проверяем на отсутствие сущности в Hash
                    return _entityHash[uuid];
                });

            } else {
                return _entityHash[uuids];
            }
        },

        exist: function (uuid) {
            //TODO Если будет необходимость, то возможно реализовать вариант проверки по массиву uuid
            return !!_entityHash[uuid];
        },

        getHash: function () {
            return _entityHash;
        },

        filterNotExist: function (uuids) {
            if (uuids instanceof Array) {
                return _.filter(uuids, function (uuid) {
                    //Не проверяем на отсутствие сущности в Hash
                    return !_entityHash[uuid];
                });
            } else {
                return _entityHash[uuids] ? [] : [uuids];
            }
        }
    };

}

module.exports = entityHash;
},{"stampit":"gaBrea"}],17:[function(require,module,exports){
/**
 * getEntities
 * Date: 29.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
  , customFetch = require('./customFetch');


function getEntities (type, uuids, path, batchName, batches, containerEntity) {
    var client = this.client,
        entity, entities;

    var that = this;

    // Используем альтернативный способ получения сущностей (напр. для Slot)
    if (type in customFetch) {
        return customFetch[type].apply(this, arguments);

    } else {

        if (this.batch.isExsist(batchName)) {

            var batchUuids = this.entityHash.filterNotExist(this.batch.take(batchName));

            if (batchUuids.length > 0) {

                if (batchUuids.length == 1) {
                    // Загружаем без фильтра (возможно, так быстрее)
                    entities = [client.load(type, batchUuids[0], { fileContent: this.fileContent })];

                } else {
                    entities = client.from(type)
                        .uuids(batchUuids)
                        .load({ fileContent: this.fileContent });
                }

                _.forEach(entities, function (entityItem) {
                    that.entityHash.add(
                        that.mapLazyLoader(entityItem, path, batches, entityItem)
                    );
                });
            }
        }

        if (typeof uuids === 'string' && !this.entityHash.exist(uuids)) {
            entity = client.load(type, uuids, { fileContent: this.fileContent });
            return this.entityHash.add(this.mapLazyLoader(entity, path, batches, entity));
        }

        // В данном случае обрабатываются только единичные сущности или массивы идентификаторов
        // (напр. "demandsUuid"), которые загружаются через batch.
        // Поэтому, полагаем, что всё что нужно уже присутствует в entityHash.
        return this.entityHash.get(uuids);
    }
}

module.exports = getEntities;
},{"./customFetch":12}],18:[function(require,module,exports){
/**
 * getTypeOfProperty
 * Date: 29.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var propMap = require('./nameToTypeMap');


function getTypeOfProperty(propertyName, entity) {
    // entityValue (пользовательский атрибут)
    if (propertyName.slice(-5) == 'Value') {
        propertyName = propertyName.substring(0, propertyName.length - 5);
        if (propertyName === 'entity') propertyName = 'customEntity'
    }

    if (propMap[propertyName])
        return propMap[propertyName];

    else if (entity.TYPE_NAME && propMap[entity.TYPE_NAME] && propMap[entity.TYPE_NAME][propertyName])
        return propMap[entity.TYPE_NAME][propertyName];

    else
        return 'moysklad.' + propertyName;
}

module.exports = getTypeOfProperty;
},{"./nameToTypeMap":21}],19:[function(require,module,exports){
/**
 * LazyLoader
 * Date: 15.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
  , stampit = require('stampit');


var LazyLoader = stampit()

    .state({
        fileContent: false
    })

    .enclose(require('./batch'))

    .enclose(require('./entityHash'))

    .methods({
        getEntities:        require('./getEntities'),
        getTypeOfProperty:  require('./getTypeOfProperty'),
        mapLazyLoader:      require('./mapLazyLoader'),
        defProperty:        require('./defProperty')
    });

var createLazyLoader = function () {
    var lazyLoader = LazyLoader
        //.state({ client: this }) // не корректно
        .create();

    lazyLoader.client = this;
    
    //noinspection JSUnusedGlobalSymbols
    return {
        attach: function (obj, batches) {

            if (typeof obj !== 'object')
                throw new Error('attach: obj argument must be an object');

            if (typeof batches === 'string') batches = [batches];

            batches = batches || [];

            lazyLoader.mapLazyLoader(
                obj,                                            // Сущность в корой будет созданы "ленивые" свойства на основе uuid связей
                obj.TYPE_NAME || 'object',                      // Путь к текущему элементу
                batches,                                        // Определители свойств коллекций, для которых необходима пакетная загрузка
                (obj.TYPE_NAME && !(obj instanceof Array)) ?    // Сущность контейнер/containerEntity (текущий объект)
                    obj :
                    null
            );

            return this;
        },

        fileContent: function (obj) {
            if (obj) lazyLoader.fileContent = !!obj;

            return this;
        }
    }
};

module.exports = createLazyLoader;
},{"./batch":10,"./defProperty":15,"./entityHash":16,"./getEntities":17,"./getTypeOfProperty":18,"./mapLazyLoader":20,"stampit":"gaBrea"}],20:[function(require,module,exports){
/**
 * mapLazyLoader
 * Date: 29.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
  , tools = require('project/tools');


/**
 * Рекурсивно создает свойства согласно ссылкам на связанные объекты
 *
 * @param {object} entity Объект или узел внутри объекта
 * @param {string|null} path Путь к обрабатываемому узлу ( напр. "prop1.prop2")
 * @param {array|null} batches
 * @param {object} containerEntity Базовый объект МойСклад (напр. CustomerOrder) который содержит текущее свойство propertyName
 * @returns {*}
 * @private
 *
 */
function mapLazyLoader (entity, path, batches, containerEntity) {
    var curPath, propertyName;
    path = path || '';

    //TODO Перепроверить логику обхода гарфа объекта
    for (var key in entity) {
        var subEntity = entity[key];

        if (subEntity && entity.hasOwnProperty(key) && !(subEntity instanceof Date)) {

            // строка идентификатор или массив идентификаторов [name]Uuid, напр. ".goodUuid", ".demandsUuid[]"
            if (isNaN(key) && key.slice(-4) == 'Uuid') {

                // demandsUuid -> demands
                propertyName = key.substring(0, key.length - 4);
                curPath = path + '.' + propertyName;

                // если напр. "demandsUuid"
                // то при обращении нужно загрузить все сущности по массиву идентификаторов
                if (subEntity instanceof Array) {
                    (batches = batches || []).push(curPath);
                }

                this.defProperty(entity, propertyName, subEntity, curPath, batches, containerEntity);
            }

            // массив
            else if (subEntity instanceof Array) {
                entity instanceof Array ?
                    // [[]] - вложенный массив
                    this.mapLazyLoader(subEntity, path + '.object', batches, containerEntity) :
                    // свойство массив, напр. ".customerOrderPosition[]"
                    this.mapLazyLoader(subEntity, path, batches, containerEntity);
            }

            // объект
            else if (typeof subEntity === 'object') {
                var typeName = subEntity.TYPE_NAME ? subEntity.TYPE_NAME.split('.')[1] : null;
                this.mapLazyLoader(subEntity,
                        path + '.' + (typeName || 'object'), batches,
                        containerEntity || (subEntity.TYPE_NAME ? subEntity : null));
            }

        }
    }
    return entity;
}

module.exports = mapLazyLoader;
},{"project/tools":88}],21:[function(require,module,exports){
module.exports={
  "moysklad.accountEntity": {
    "sourceSlot": "moysklad.slot",
    "sourceStore": "moysklad.warehouse",
    "targetStore": "moysklad.warehouse",
    "place": "moysklad.warehouse",
    "demands": "moysklad.demand",
    "invoicesOut": "moysklad.invoice",
    "supplier": "moysklad.company",
    "entity": "moysklad.customEntity"
  },

  "moysklad.customerOrder": {
    "sourceAgent": "moysklad.company",
    "targetAgent": "moysklad.myCompany"
  },

  "moysklad.invoiceOut": {
    "sourceAgent": "moysklad.myCompany",
    "targetAgent": "moysklad.company"
  },

  "moysklad.contract": {
    "ownCompany": "moysklad.myCompany"
  }
}
},{}],22:[function(require,module,exports){
/**
 * object mapping data factory
 * Date: 14.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

//TODO mapping объект, по хорошему, должен возвращатся внутри массива, т.к. возможно несколько пространств имен
// .. но так, как пока не предвидится что-то кроме "moysklad", оставим так.

var _          = require('lodash'),
    stampit    = require('stampit');


exports.getMapping = function (options) {
    var map           = _.cloneDeep(options.map);
    var client        = options.client;
    var extensions    = options.extensions;

    var stampExtender = extensions.getStampExtender(map, client);

    var namespace = map.name;
    var typeInfos = _.indexBy(map.typeInfos, 'localName');

    var typeStamps = {};

    var getTypeStamp = function (typeInfo) {
        var localName = typeInfo.localName;

        if (typeStamps[localName]) {
            return typeStamps[localName];

        } else {
            var typeStamp = stampit().state({
                    TYPE_NAME: namespace + '.' + localName
                });

            typeStamp = stampExtender(localName, typeStamp);

            if (typeInfo.baseTypeInfo) {
                var baseTypeName = typeInfo.baseTypeInfo.split('.')[1];
                var baseTypeStamp = getTypeStamp(typeInfos[baseTypeName]);
                typeStamp = baseTypeStamp.compose(typeStamp);
            }

            typeStamps[localName] = typeStamp;

            return typeStamp;
        }
    };

    //TODO Задать в опциях возможность отключать привязку instanceFactory к typeInfo
    _.forOwn(typeInfos, function (typeInfo) {
        var typeStamp = getTypeStamp(typeInfo);
        if (typeStamp) typeInfo.instanceFactory = typeStamp;
    });

    return map;
};
},{"stampit":"gaBrea"}],23:[function(require,module,exports){
/**
 * chain
 * Date: 25.06.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _               = require('lodash'),
    callbackAdapter = require('project/tools/callbackAdapter');

var chain = function () {
    return _.chain(this.load.apply(this, arguments));
};

module.exports = chain;
},{"project/tools/callbackAdapter":76}],24:[function(require,module,exports){
/**
 * first
 * Date: 14.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _               = require('lodash'),
    callbackAdapter = require('project/tools/callbackAdapter');

/**
 * First. Возвращает первую сущность из списка сущностей согласно запросу.
 *
 * @param {String} type Тип сущности
 * @param {Object} query Объект запроса для фильтрации сущностей
 * @param {Function=} callback
 * @returns {Object}
 */
var first = function (type, query, callback) {
    //TODO Ensure
    var _restClient = this.getProvider('ms-xml'),
        _obj = null,
        _queryParametersList;

    function _firstFromParts (paramsIndex, callback) {
        var _params = _queryParametersList[paramsIndex];

        if (_params && ('count' in _params ? _params.count !== 0 : true)) {

            _restClient.get(type, _.extend({}, _params, { count: 1 }), function (err, data) {
                if (err) return callback(err);

                if (data.obj.length > 0) {
                    return callback(null, data.obj[0]);

                } else {
                    _firstFromParts(++paramsIndex, callback)
                }
            });

        } else {
            return callback(null, null);
        }
    }

    // query
    if (typeof query == 'object' && 'getQueryParameters' in query) {
        _queryParametersList = query.getQueryParameters(this.options.filterLimit);
    }

    //TODO Ничего не мешеает использовать first без query
    // .. ошибка
    else {
        return callbackAdapter(new TypeError('Incorrect query parameter'), null, callback);
    }

    _firstFromParts(0, function (err, data) {
        _obj = callbackAdapter(err, data, callback);
    });

    return _obj;
};

module.exports = first;
},{"project/tools/callbackAdapter":76}],25:[function(require,module,exports){
/**
 * from
 * Date: 23.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
  , Query = require('./../../rest-clients/ms-xml/query/index').Query;

//TODO Оформить синонимы как подмассив
var bindingMethods = [ 'load', 'first', 'total', 'chain' ];

/**
 * Возвращает запрос привязанный к указанному типу сущности.
 * Используется для более лаконичной записи зароса ввиде цепочки методов.
 *
 * @param type
 */
var from = function (type) {
    //TODO Ensure

    Query.enclose(function () {
        this.getType = function () {
            return type;
        };
    });

    var that = this;

    // set client methods to query (i.e. query.load)
    _.each(bindingMethods, function (methodName) {
        Query.enclose(function () {
            this[methodName] = function () {
                var args = Array.prototype.slice.call(arguments, 0);
                return that[methodName].apply(that, [type, this].concat(args));
            }
        });
    });

    return Query.create();
};

module.exports = from;
},{"./../../rest-clients/ms-xml/query/index":46}],26:[function(require,module,exports){
/**
 * json-service
 * Date: 24.06.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _               = require('lodash'),
    callbackAdapter = require('project/tools/callbackAdapter');

//TODO Вероятно нужно перенести этот модуль в rest-clients/json (для целостности пониманя работы модуля)

var callService = function (serviceName) {
    var args        = _.toArray(arguments)
      , callback    = typeof args.slice(-1)[0] === 'function' ? args.slice(-1)[0] : null
      , _restClient = this.getProvider('json-services')
      , _obj        = null;

    var serviceArgs = args.slice(1, args.length - (callback ? 1 : 0));

    serviceArgs.push(function (err, data) {
        _obj = callbackAdapter(err, data.obj, callback);
    });

    _restClient[serviceName].apply(_restClient, serviceArgs);

    return _obj;
};

[
    'stock',
    'stockForGood',
    'slot',
    'mutualSettlement',
    'mutualSettlementForCustomer'

].forEach(function (serviceName) {
    module.exports[serviceName] = function () {
        return callService.apply(this,
            [serviceName].concat(Array.prototype.slice.call(arguments, 0)));
    }
});


},{"project/tools/callbackAdapter":76}],27:[function(require,module,exports){
/**
 * load
 * Date: 24.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _               = require('lodash'),
    have            = require('have'),
    callbackAdapter = require('project/tools/callbackAdapter');

//noinspection JSValidateJSDoc,JSCommentMatchesSignature
/**
 * Load. Получает сущность по идентификатору или список сущностей согласно запросу.
 *
 * @param {String} type Тип сущности
 * @param {String|Object} query Идентификатор сущности или запрос для фильтрации
 * @param {Boolean=} [options.fileContent] Опции
 * @param {Function=} [callback]
 * @returns {Object|Object[]}
 */
var load = function (type, query) {
    //TODO Ensure
    var args        = _.toArray(arguments)
      , callback    = typeof args.slice(-1)[0] === 'function' ? args.slice(-1)[0] : null
      , options     = typeof args[2] === 'object' ? args[2] : {}
      , restClient  = this.getProvider('ms-xml')
      , queryParametersList
      , obj;

    function loadPartial(paramsIndex, paging, cumulativeTotal, resultCollection, callback) {

        if (queryParametersList[paramsIndex] && ('count' in paging ? paging.count !== 0 : true)) {
            var _params = _.extend({}, queryParametersList[paramsIndex], paging);

            restClient.get(type, _params, function (err, data) {
                if (err) return callback(err);

                var _collection = data.obj,
                    _length     = _collection.length,
                    _total      = _collection.total;

                if (paging.start) paging.start - _total > 0 ?
                    paging.start -= _total :
                    paging.start = 0;

                if (paging.count) paging.count - _length > 0 ?
                    paging.count -= _length :
                    paging.count = 0;

                cumulativeTotal += _total;
                resultCollection = resultCollection.concat(_collection);

                loadPartial(++paramsIndex, paging, cumulativeTotal, resultCollection, callback);
            });

        } else {
            //TODO Уточнить
            resultCollection.total = cumulativeTotal; // -1 когда нет данных о total
            callback(null, resultCollection);
        }
    }

    if (query instanceof Array)
        query = this.createQuery({}, options).uuids(query);

    // uuid ..
    if (typeof query == 'string') {
        var params = { uuid: query };

        if (options.fileContent) params.fileContent = true;

        restClient.get(type, params, function (err, data) {
            obj = callbackAdapter(err, data.obj, callback);
        });
    }

    // .. или query
    else if (typeof query == 'object' && 'getQueryParameters' in query) {
        //TODO Не забыть про options при написании документации
        queryParametersList = query.getQueryParameters(this.options.filterLimit);

        var paging = {};
        if (queryParametersList[0].start) paging.start = queryParametersList[0].start;
        if (queryParametersList[0].count) paging.count = queryParametersList[0].count;

        loadPartial(0, paging, 0, [], function (err, data) {
            obj = callbackAdapter(err, data, callback);
        });
    }

    // .. ошибка
    else {
        return callbackAdapter(new TypeError('Incorrect uuid or query parameter'), null, callback);
    }

    return obj;
};

module.exports = load;
},{"have":7,"project/tools/callbackAdapter":76}],28:[function(require,module,exports){
/**
 * loadMetadata
 * Date: 31.05.15
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash'),
    callbackAdapter = require('project/tools/callbackAdapter'),
    have = require('have');

var loadMetadata = function () {
    var that = this;
    var args = have(arguments, {
        cb: 'opt function'
    });

    var metadata = {};

    this.from('embeddedEntityMetadata')
        .load(function (err, data) {
            if (err) return callbackAdapter(err, data, args.cb);

            metadata.embeddedEntityMetadataByUuid = _.indexBy(data, 'uuid');
            metadata.embeddedEntityMetadataByName = _.indexBy(data, 'name');

            metadata.attributeMetadataByUuid = _(data)
                .pluck('attributeMetadata').flatten().indexBy('uuid').value();

            that.metadata = metadata;
            callbackAdapter(null, that, args.cb);
        });

    return this;
};

module.exports = loadMetadata;
},{"have":7,"project/tools/callbackAdapter":76}],29:[function(require,module,exports){
/**
 * save
 * Date: 15.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _               = require('lodash')
  , callbackAdapter = require('project/tools/callbackAdapter');

//TODO Ограничение на кол-во сохраняемых объектов в коллекции (проверить)

/**
 * Save. Сохраняет сущность или список сущностей.
 *
 * @param {String} [type] Тип сущности (если не указан производится попытка получить тип из свойства объекта TYPE_NAME)
 * @param {Object} ent Сущность или список сущностей
 * @param {Function=} callback
 * @returns {Object} Созданная/сохраненная сущность
 */
var save = function () {
    //TODO Ensure
    var args        = _.toArray(arguments)
      , callback    = typeof args.slice(-1)[0] === 'function' ? args.slice(-1)[0] : null;

    var restClient  = this.getProvider('ms-xml'),
        obj = null;

    var putArgs = args.slice(0, args.length);

    putArgs.push(function (err, data) {
        obj = callbackAdapter(err, data.obj, callback);
    });

    restClient.put.apply(restClient, putArgs);

    return obj;
};

module.exports = save;
},{"project/tools/callbackAdapter":76}],30:[function(require,module,exports){
/**
 * total
 * Date: 14.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _               = require('lodash')
  , callbackAdapter = require('../../../tools/index').callbackAdapter;

/**
 *
 * @param {String} type Тип сущности
 * @param {Object} query Объект запроса для фильтрации сущностей
 * @param {Function=} callback
 * @returns {Number}
 */
var total = function (type, query, callback) {
    //TODO Ensure
    var _restClient = this.getProvider('ms-xml'),
        _total = null,
        _queryParametersList;

    function _totalFromParts(paramsIndex, cumulativeTotal, callback) {

        if (_queryParametersList[paramsIndex]) {
            var _params = _.extend({}, _queryParametersList[paramsIndex], { count: 0 });

            _restClient.get(type, _params, function (err, data) {
                if (err) return callback(err);

                cumulativeTotal += data.obj.total;

                _totalFromParts(++paramsIndex, cumulativeTotal, callback);
            });

        } else {
            callback(null, cumulativeTotal);
        }
    }

    // query
    if (typeof query == 'object' && 'getQueryParameters' in query) {
        _queryParametersList = query.getQueryParameters();

        _totalFromParts(0, 0, function (err, data) {
            _total = callbackAdapter(err, data, callback);
        });
    }

    // .. error
    else {
        return callbackAdapter(new TypeError('Incorrect query parameter'), null, callback);
    }

    return _total;
};

module.exports = total;
},{"../../../tools/index":90}],31:[function(require,module,exports){
/**
 * model-builder
 * Date: 18.05.15
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var map                 = require('../../../res/mapping'),
    mapping             = require('./mapping'),
    Jsonix              = require('project/jsonix').Jsonix,
    extensions          = require('project/model-extensions'),
    getUriTypeName  = require('project/tools/getUriTypeName');


var modelBuilder = function () {
    var client = this;

    // Получаем копию модели с привязанными конструкторами сущностей агрегатов
    var _map = mapping.getMapping({
        map         : map,
        client      : client,
        extensions  : extensions
    });

    var context = client.context = new Jsonix.Context([_map]);

    // Создаем ссылки на конструкторы сущностей в объекте клиента
    for (var key in context.typeInfos) {
        if (context.typeInfos.hasOwnProperty(key)) {
            var namespace    = key.split('.')[0];
            var typeInfoName = key.split('.')[1]; // moysklad.customerOrder -> customerOrder
            if (namespace === _map.name) {
                var typeInfo = context.typeInfos[key];
                if (typeInfo.instanceFactory) {

                    // Привязываем методы в прототип агрегатов
                    if (context.scopedElementInfosMap['##global'].hasOwnProperty(typeInfoName)) {
                        typeInfo.instanceFactory = typeInfo.instanceFactory.methods({

                        })
                    }

                    var className = getUriTypeName(typeInfo.localName);
                    client[className] = typeInfo.instanceFactory;
                }
            }

        }
    }

};

module.exports = modelBuilder;
},{"../../../res/mapping":"xUxYGE","./mapping":22,"project/jsonix":66,"project/model-extensions":69,"project/tools/getUriTypeName":85}],"1wiUUs":[function(require,module,exports){
/**
 * MoyskladClient
 * Date: 11.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _             = require('lodash'),
    have          = require('have'),
    pkg           = require('../../package'),
    client        = require('./client'),
    logger        = require('project/logger'),
    tools         = require('project/tools'),
    fetchProvider = require('project/fetch'),
    query         = require('./rest-clients/ms-xml/query'),
    xmlClient     = require('./rest-clients/ms-xml'),
    jsonServices  = require('./rest-clients/json');


logger.info('moysklad-client v' + pkg.version);

module.exports = {

    createClient: function () {
        var args = have(arguments, {
            login   : 'optional string',
            password: 'optional string',
            options : 'optional object'
        });

        var clientInstance = client();

        if (args.options)
            _.extend(clientInstance.options, args.options);

        if (args.login && args.password)
            clientInstance.setAuth(args.login, args.password);

        var providers = {
            'fetch'         : fetchProvider,
            'marshaller'    : clientInstance.context.createMarshaller(),
            'unmarshaller'  : clientInstance.context.createUnmarshaller(),
            'logger'        : logger
        };

        xmlClientInstance = xmlClient().setProvider(providers);
        _.extend(xmlClientInstance.options, clientInstance.options);

        jsonServicesInstance = jsonServices().setProvider(providers);
        _.extend(jsonServicesInstance.options, clientInstance.options);

        clientInstance
            .setProvider('ms-xml', xmlClientInstance)
            .setProvider('json-services', jsonServicesInstance);

        return clientInstance;
    },

    createQuery: query.createQuery,

    tools: tools,
    logger: logger,
    version: pkg.version
};
},{"../../package":8,"./client":9,"./rest-clients/json":34,"./rest-clients/ms-xml":40,"./rest-clients/ms-xml/query":46,"have":7,"project/fetch":"hhHkL+","project/logger":"Z19TnT","project/tools":88}],"moysklad-client":[function(require,module,exports){
module.exports=require('1wiUUs');
},{}],34:[function(require,module,exports){
/**
 * stock
 * Date: 19.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var stampit                  = require('stampit'),
    authProviderBehavior     = require('project/behaviors/authProviderBehavior'),
    providerAccessorBehavior = require('project/behaviors/providerAccessorBehavior');

var stockJsonClient = stampit()

    .state({ options: {} })

    // Authable
    .enclose(authProviderBehavior)

    // Provider accessor
    .enclose(providerAccessorBehavior)

    // Methods
    //
    .methods({

        // add client methods
        stock                       : require('./methods/stock'),
        slot                        : require('./methods/slot'),
        mutualSettlement            : require('./methods/mutualSettlement').list,
        mutualSettlementForCustomer : require('./methods/mutualSettlement').customer,

        fetch                       : require('./methods/fetch'),
        responseHandler             : require('./methods/responseHandler')
    });

module.exports = stockJsonClient;

//TODO Написать необходимые Enum'ы
},{"./methods/fetch":35,"./methods/mutualSettlement":36,"./methods/responseHandler":37,"./methods/slot":38,"./methods/stock":39,"project/behaviors/authProviderBehavior":60,"project/behaviors/providerAccessorBehavior":61,"stampit":"gaBrea"}],35:[function(require,module,exports){
/**
 * fetch
 * Date: 19.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _       = require('lodash'),
    moment  = require('moment');

var fetch = function (options, callback) {
    var that = this;

    var fetchProvider = this.getProvider('fetch'),
        query;

    if (options.params) {
        query = _.reduce(options.params, function (result, value, key) {
            var itemValues = value instanceof Array ? value : [value];

            _.forEach(itemValues, function (itemValue) {
                if (itemValue instanceof Date || moment.isMoment(itemValue))
                    itemValue = moment(itemValue).format('YYYYMMDDHHmmss');

                result.push(key + '=' + encodeURIComponent(itemValue));
            });

            return result;
        }, []).join('&');

        query = query ? '/?' + query : null;
    }

    var fetchOptions = _.extend({
        // default
        contentType: 'application/json',
        headers: {},
        async: this.options.flowControl === 'async'
    }, {
        // parameters
        method: 'GET',
        url: this.options.baseUrl
            + '/rest/' + options.service + '/json'
            + (options.path || '') + (query || '')
    });

    if (this.isAuth())
        fetchOptions.headers.Authorization = this.getBasicAuthHeader();

    fetchProvider.fetch(fetchOptions, function (err, result) {
        return that.responseHandler(err, result, callback);
    });
};

module.exports = fetch;
},{"moment":"2V8r5n"}],36:[function(require,module,exports){
/**
 * mutualSettlement
 * Date: 24.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
  , moment = require('moment');

var list = function () {

    var args        = _.toArray(arguments)
      , options     = (typeof args[0] === 'object') ? args[0] : null
      , callback;

    var lastArg = args.slice(-1)[0];
    if (typeof lastArg === 'function')
        callback = lastArg;
    else
        throw new Error('callback not defined');

    var fetchOptions = {
        service : 'mutualSettlement',
        path    : '/list',
        params  : options
    };

    this.fetch(fetchOptions, callback);
};

var customer = function (customerUuid) {

    var args        = _.toArray(arguments)
      , options     = (typeof args[1] === 'object') ? args[0] : null
      , callback;

    var lastArg = args.slice(-1)[0];
    if (typeof lastArg === 'function')
        callback = lastArg;
    else
        throw new Error('callback not defined');

    var fetchOptions = {
        service : 'mutualSettlement',
        path    : '/customer/' + customerUuid,
        params  : options
    };

    this.fetch(fetchOptions, callback);
};

module.exports = {
    list    : list,
    customer: customer
};
},{"moment":"2V8r5n"}],37:[function(require,module,exports){
/**
 * providerResponseHandler
 * Date: 23.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _               = require('lodash'),
    callbackAdapter = require('project/tools/callbackAdapter');

//TODO Часть кода providerResponseHandler'ов не оправданно дублируется .. >
var providerResponseHandler = function (err, result, callback) {
    var _log = require('project/logger');

    // .. этот кусок общий для всех
    if (!err) {

        switch (result.response.responseCode) {

            //TODO Прописать все ошибки stock сервисов
            //TODO Есть ли общие для всех ошибки (нужно ли выделять)?

            // ошибка пришла ввиде XML сериализуем и обработаем ниже
            case 500:
                return callbackAdapter(
                    new Error('Server error 500'), result, callback);

            // ошибка авторизации
            case 401:
                return callbackAdapter(
                    new Error('Request requires HTTP authentication'), result, callback);

            // корректный ответ сервера (работаем с ним дальше)
            case 200:
                break;

            // любой другой код ответа - ошибка
            default:
                //TODO ??? Надо парсить Html ответа и выделять описание ошибки
                _log.log('Ответ сервера: \n' + result.response.contentText);
                return callbackAdapter(
                    new Error('Server response error ' + result.response.responseCode), result, callback);
        }

        if (result.response.contentText.length > 0) {
            result.obj = JSON.parse(result.response.contentText);
        }
    }

    return callbackAdapter(err, result, callback);
};

module.exports = providerResponseHandler;
},{"project/logger":"Z19TnT","project/tools/callbackAdapter":76}],38:[function(require,module,exports){
/**
 * slot
 * Date: 24.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
  , moment = require('moment');

var slot = function (options, callback) {

    //TODO Callback adapter
    if (!options.storeUuid)
        throw new Error('slot: options.storeUuid not defined');

    var fetchOptions = {
        service : 'slot',
        params  : {
            storeUuid: options.storeUuid
        }
    };

    var goodUuids = (typeof options.goodUuid === 'string') ? [options.goodUuid] : options.goodUuid;

    if (goodUuids && goodUuids.length > 0) {
        //TODO Реализовать пейджинг по 50 шт
        if (goodUuids.length > 50)
            throw new Error('slot: good uuids array length more than 50 not supported now');

        fetchOptions.params.goodUuid = goodUuids;
    }

    this.fetch(fetchOptions, callback);
};

module.exports = slot;
},{"moment":"2V8r5n"}],39:[function(require,module,exports){
/**
 * stock
 * Date: 24.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
    , moment = require('moment');

var stock = function (options, callback) {

    var fetchOptions = {
        service : 'stock',
        params  : options
    };

    this.fetch(fetchOptions, callback);
};

module.exports = stock;
},{"moment":"2V8r5n"}],40:[function(require,module,exports){
/**
 * index
 * Date: 24.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var stampit                  = require('stampit'),
    authProviderBehavior     = require('project/behaviors/authProviderBehavior'),
    providerAccessorBehavior = require('project/behaviors/providerAccessorBehavior');

var msXmlClient = stampit()

    .state({ options: {} })

    // Authable
    .enclose(authProviderBehavior)

    // Provider accessor
    .enclose(providerAccessorBehavior)

    // Methods
    .methods({

        // add client methods
        get             : require('./methods/get'),
        put             : require('./methods/put'),
        del             : require('./methods/del'),
        fetch           : require('./methods/fetch'),
        responseHandler : require('./methods/responseHandler')

    });

module.exports = msXmlClient;
},{"./methods/del":41,"./methods/fetch":42,"./methods/get":43,"./methods/put":44,"./methods/responseHandler":45,"project/behaviors/authProviderBehavior":60,"project/behaviors/providerAccessorBehavior":61,"stampit":"gaBrea"}],41:[function(require,module,exports){
/**
 * del
 * Date: 24.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _       = require('lodash'),
    tools   = require('project/tools');


module.exports = function (type, data, callback) {
    var _fetchOptions = {
            path: '/' + tools.getUriTypeName(type)
        };

    if (data instanceof Array) {
        // POST /{type}/list/delete
        _fetchOptions.path += '/list/delete';
        _fetchOptions.method = 'POST';

        _fetchOptions.payload = {
            name: {
                localPart: 'collection'
            },
            value: {
                items: _.map(data, function (item) {
                    return {
                        name: {
                            localPart: 'String'
                        },
                        value: item
                    };
                })
            }
        };

    } else {
        // PUT /{type}/{id}
        _fetchOptions.path += '/' + data;
        _fetchOptions.method = 'DELETE';

    }

    this.fetch(_fetchOptions, callback);
};
},{"project/tools":88}],42:[function(require,module,exports){
/**
 * fetch
 * Date: 27.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');

var fetch = function (options, callback) {
    var that = this;

    var fetchProvider  = this.getProvider('fetch')
      , marshaller     = this.getProvider('marshaller')
      , log            = this.getProvider('logger');

    var fetchOptions = _.extend({
        // default
        contentType: 'application/xml',
        headers: {},
        async: this.options.flowControl === 'async'
    }, {
        // parameters
        method: options.method,
        url: that.options.baseUrl + '/rest/ms/xml' + options.path
    });

    if (this.isAuth())
        fetchOptions.headers.Authorization = this.getBasicAuthHeader();

    if (options.payload)
        fetchOptions.payload = marshaller.marshalString(options.payload);

    fetchProvider.fetch(fetchOptions, function (err, result) {
        return that.responseHandler(err, result, callback);
    });
};

module.exports = fetch;
},{}],43:[function(require,module,exports){
/**
 * get
 * Date: 24.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _       = require('lodash'),
    tools   = require('project/tools');

module.exports = function (type, params, callback) {
    var _path = '/' + tools.getUriTypeName(type);

    if (params.uuid && typeof params.uuid === 'string') {
        // GET /{type}/{id}
        _path += '/' + params.uuid;
        if (params.fileContent) _path += '/?fileContent=true';

    } else {
        // GET /{type}/list
        _path += '/list';
        if (Object.keys(params).length > 0) {
            _path += '/?' + _.map(params, function (value, key) {
                return key + '=' + encodeURIComponent(value);
            }).join('&');
        }
    }

    this.fetch({ method: 'GET', path: _path }, callback);
};
},{"project/tools":88}],44:[function(require,module,exports){
/**
 * put
 * Date: 24.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _       = require('lodash'),
    tools   = require('project/tools');

/**
 *
 * @param {String} [type] Тип сущности (если не указан производится попытка получить тип из свойства объекта TYPE_NAME)
 * @param {Object|Array.<Object>} data
 * @param {Function} callback
 */
var put = function () {
    //TODO Ensure
    var args            = _.toArray(arguments)
      , type            = typeof args[0] == 'string' && typeof args[1] == 'object' ? args[0] : null
      , data            = type ? args[1] : args[0]
      , callback        = typeof args.slice(-1)[0] === 'function' ? args.slice(-1)[0] : null
      ;

    if (!type) {
        if (data.TYPE_NAME) {
            type = data.TYPE_NAME;
        } else if ((data instanceof Array) && data.length > 0) {
            type = data[0].TYPE_NAME;
        }
    }

    if (type && type.indexOf('.') != -1)
        type = type.split('.')[1]; // moysklad.{type}

    var _fetchOptions = {
        method: 'PUT',
        path: '/' + tools.getUriTypeName(type),
        payload: {
            name: {}
        }
    };

    if (data instanceof Array) {
        // PUT /{type} + /list/update

        _fetchOptions.path += '/list/update';

        _fetchOptions.payload = {
            name: {
                localPart: 'collection'
            },
            value: {
                items: _.map(data, function (item) {
                    //TODO Ensure localPart type
                    return {
                        name: {
                            //TODO Нужна ли выбрка или подставить то, что выведено выше
                            localPart: type ? type : item.TYPE_NAME.split('.')[1]
                        },
                        value: item
                    };
                })
            }
        };

    } else if (typeof data == 'object') {
        // PUT /{type}
        _fetchOptions.payload = {
            name: {
                localPart: type ? type : data.TYPE_NAME.split('.')[1]
            },
            value: data
        };
        //TODO Ensure localPart type
        if (!_fetchOptions.payload.name.localPart)
            return callback(new TypeError('Type information not specified'));

    } else {
        return callback(new TypeError('Incorrect data parameter'));
    }

    this.fetch(_fetchOptions, callback);
};

module.exports = put;
},{"project/tools":88}],45:[function(require,module,exports){
/**
 * providerResponseHandler
 * Date: 23.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _               = require('lodash'),
    callbackAdapter = require('project/tools/callbackAdapter');


var providerResponseHandler = function (err, result, callback) {
    var data;

    var log            = this.getProvider('logger'),
        unmarshaller   = this.getProvider('unmarshaller');

    if (!err) {

        switch (result.response.responseCode) {

            // ошибка пришла ввиде XML сериализуем и обработаем ниже
            case 500:
                break;

            // ошибка авторизации
            case 401:
                return callbackAdapter(
                    new Error('Request requires HTTP authentication'), result, callback);

            // корректный ответ сервера (работаем с ним дальше)
            case 200:
                break;

            // любой другой код ответа - ошибка
            default:
                //TODO Надо парсить Html ответа и выделять описание ошибки
                log.log('Server response: \n' + result.response.contentText);
                return callbackAdapter(
                    new Error('Server response error ' + result.response.responseCode), result, callback);
        }

        if (result.response.contentText.length > 0) {

            //_log.time('Response unmarshalling time');

            data = result.response.contentXml ?
                unmarshaller.unmarshalDocument(result.response.contentXml) :
                unmarshaller.unmarshalString(result.response.contentText);

            //_log.timeEnd('Response unmarshalling time');

            result.type = data.name.localPart;

            if (result.type == 'error') return callbackAdapter(new Error(data.value.message));

            if (result.type == 'collection') {
                result.obj = _.pluck(data.value.items, 'value');
                _.extend(result.obj, {
                    total:      data.value.total,
                    start:      data.value.start,
                    count:      data.value.count,
                    TYPE_NAME:  data.value.TYPE_NAME
                });
            } else {
                result.obj = data.value;
            }
        }
    }

    return callbackAdapter(err, result, callback);
};

module.exports = providerResponseHandler;
},{"project/tools/callbackAdapter":76}],46:[function(require,module,exports){
/**
 * index
 * Date: 22.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var Query = require('./query');

module.exports = {

    createQuery: function (queryObj, options) {
        return Query.create(null, queryObj, options);
    },

    Query: Query
};


},{"./query":58}],47:[function(require,module,exports){
/**
 * fileContent
 * Date: 22.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var Is = require('../../../../../tools/index').Is;

var fileContent = function () {
    if (arguments.length == 0) {
        return this.getParameter('fileContent');

    } else {
        this.setParameter('fileContent', !!arguments[0]);
    }
    return this;
};

module.exports = fileContent;
},{"../../../../../tools/index":90}],48:[function(require,module,exports){
/**
 * Created by mvv on 17.05.14.
 */

var filter = function (key, value) {
    var filterObj = {};
    filterObj[key] = value;
    this.appendFilter(filterObj);

    return this;
};

module.exports = filter;
},{}],49:[function(require,module,exports){
/**
 * getQueryParameters
 * Date: 22.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _           = require('lodash')
  , moment      = require('moment')
  , Ensure      = require('../../../../../tools/index').Ensure
  , operators   = require('../operators');

//TODO Описать параметры и скорректировать наименование
/**
 *  Сворачивает фильтр в объект ключ-значение
 */
function _flattenFilter(obj, path, filter) {

    filter = filter || {};

    _.forOwn(obj, function (value, key) {
        var curPath = (path ? path + '.' : '') + key;

        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            filter[curPath] = [ '=' + value ];

        } else if (value instanceof Array) {
            filter[curPath] = _.map(value, function (item) { return '=' + item; });

        } else if (value instanceof Date) {
            filter[curPath] = [ '=' + moment(value).format('YYYYMMDDHHmmss') ];

        } else if (moment.isMoment(value)) {
            filter[curPath] = [ '=' + value.format('YYYYMMDDHHmmss') ];

        } else if (value.type === 'QueryOperatorResult' && value.filter) {
            filter[curPath] = value.filter;

        } else if (value instanceof Object) {
            var keys = _.keys(value);

            if (keys.length == 0)
                throw new TypeError('Empty key value [' + curPath + '] in filter object.');

            if (keys[0].substring(0, 1) == '$') {
                filter[curPath] = [];

                _.forEach(keys, function (key) {
                    var operator = operators[key];
                    if (typeof operator !== 'function')
                        throw new TypeError('Incorrect operator [' + key + '] in filter object [' + curPath + ']');

                    filter[curPath] = filter[curPath].concat(operator(value[key]).filter);
                });

            } else {

                _flattenFilter(value, curPath, filter);
            }

        } else {
            throw new TypeError('Incorrect key value [' + curPath + '] in filter object.');
        }
    });

    return filter;
}

function _splitFiltersAccordingLimit(filters, limit) {
    var splitedFilters = [];

    _.forEach(filters, function (filter) {
        _.forOwn(filter, function (filterValues, filterKey) {
            if (filterValues.length > limit) {
                var start = 0,
                    filterParts = [];

                while (start < filterValues.length) {
                    filterParts.push(filterValues.slice(start, start + limit));
                    start += limit;
                }

                _.forEach(filterParts, function (filterPart) {
                    var clonedFilter = _.clone(filter);
                    clonedFilter[filterKey] = filterPart;
                    splitedFilters.push(clonedFilter);
                });

                return false;
            }
        });
    });

    return splitedFilters.length > 0 ? _splitFiltersAccordingLimit(splitedFilters, limit) : filters;
}


/**
 * Возвращает параметры для формирования строки запроса текущего Query
 * @returns {{}}
 */
var getQueryParameters = function (filterLimit) {
    //TODO Проверка входного значения
    filterLimit = filterLimit > 0 ? filterLimit : 50;

    var queryParams = this.getParameters(),
        queryParamsVariations = [],
        flattenedFilter,
        flattenedFilterVariations;

    flattenedFilter = _flattenFilter(this.getFilter());
    flattenedFilterVariations = _splitFiltersAccordingLimit([ flattenedFilter ], filterLimit);

    _.forEach(flattenedFilterVariations, function (filter) {
        var filterItems = [];
        _.forOwn(filter, function (filterValues, filterKey) {
            _.forEach(filterValues, function (filterValue) {
                filterItems.push(filterKey + filterValue);
            })
        });

        var clonedParams = _.clone(queryParams);
        if (filterItems.length > 0) clonedParams.filter = filterItems.join(';');
        queryParamsVariations.push(clonedParams);
    });

    return queryParamsVariations;
};

module.exports = getQueryParameters;
},{"../../../../../tools/index":90,"../operators":56,"moment":"2V8r5n"}],50:[function(require,module,exports){
/**
 * count
 * Date: 22.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var Is = require('../../../../../tools/index').Is;

var addPaging = function (method, args) {
    if (Is.args(args, 'number')) {
        this.setParameter(method, args[0]);
    } else if (args.length == 0) {
        return this.getParameter(method);
    } else {
        throw new Error(method + ': incorrect parameter [' + obj + '], number expected');
    }
    return this;
};

module.exports = {

    start: function () {
        return addPaging.call(this, 'start', arguments);
    },

    count: function () {
        return addPaging.call(this, 'count', arguments);
    },

    page: function (number, size) {
        this.start((number - 1) * size).count(size);
    }

};
},{"../../../../../tools/index":90}],51:[function(require,module,exports){
/**
 * select
 * Date: 21.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var Is = require('../../../../../tools/index').Is;

module.exports = function () {

    // Query
    if ('getFilter' in  arguments[0]) {
        this.appendFilter(arguments[0].getFilter());
        return this;

    // Object
    } else if (Is.args(arguments, Object)) {
        this.appendFilter(arguments[0]);
        return this;

    // null
    } else if (arguments.length == 1 && arguments[0] === null) {
        this.resetFilter();
        return this;

    } else if (arguments.length == 0) {
        return this.getFilter();
    }

    throw new TypeError('filter: incorrect parameter');
};
},{"../../../../../tools/index":90}],52:[function(require,module,exports){
/**
 * showArchived
 * Date: 22.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var Is = require('../../../../../tools/index').Is;

module.exports = function () {

    if (Is.args(arguments, 'boolean')) {
        this.setParameter('showArchived', arguments[0]);

    } else if (arguments.length == 0) {
        return this.getParameter('showArchived');

    } else {
        throw new Error('showArchived: incorrect parameters ' + obj.toString());
    }

    return this;
};

},{"../../../../../tools/index":90}],53:[function(require,module,exports){
/**
 * sort
 * Date: 22.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var Is = require('../../../../../tools/index').Is;

module.exports = function () {

    if (Is.args(arguments, 'string')) {
        this.setParameter('sort', arguments[0]);

    } else if (Is.args(arguments, 'string', 'string')) {
        this.setParameters({
            sort: arguments[0],
            sortMode: arguments[1]
        });

    } else if (arguments.length == 0) {
        return this.getParameter('sort');

    } else {
        throw new Error('sort: incorrect parameters ' + obj);
    }

    return this;
};

},{"../../../../../tools/index":90}],54:[function(require,module,exports){
/**
 * sortMode
 * Date: 22.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var Is = require('../../../../../tools/index').Is;

module.exports = function () {

    if (Is.args(arguments, 'string')) {
        this.setParameter('sortMode', arguments[0]);

    } else if (arguments.length == 0) {
        return this.getParameter('sortMode');

    } else {
        throw new Error('sortMode: incorrect parameters ' + obj);
    }

    return this;
};

},{"../../../../../tools/index":90}],55:[function(require,module,exports){
/**
 * uuids
 * Date: 17.06.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var uuids = function (uuids) {

    if (uuids instanceof Array && uuids.length > 0) {
        var filterObj = {};
        filterObj['uuid'] = uuids;
        filterObj['showArchived'] = true;

        this.appendFilter(filterObj);
    } else {

        throw new Error('uuids: incorrect or empty array parameter')
    }

    return this;
};

module.exports = uuids;
},{}],56:[function(require,module,exports){
/**
 * operators
 * Date: 17.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
  , moment = require('moment');

function convertValue(value) {

    //TODO Подумать правильно ли я проверяю типы?
    if (typeof value === 'string' || typeof value === 'number') {
        return value;

    /*} else if (value instanceof Array) {
        return value;*/

    } else if (value instanceof Date) {
        return moment(value).format('YYYYMMDDHHmmss');

    } else if (moment.isMoment(value)) {
        return value.format('YYYYMMDDHHmmss');

    } else if (typeof value === 'undefined' || value === 'null') {
        throw new TypeError('Null or undefined parameter in query operator');

    } else {
        throw new TypeError('Incorrect parameter in query operator');
    }
}

var operators = {

    //
    anyOf: function () {
        var values;

        if (arguments.length == 1 && arguments[0] instanceof Array)
            values = arguments[0];

        else if (arguments.length > 0)
            values = Array.prototype.slice.call(arguments, 0);

        else
            throw new Error('anyOf: no argumets');

        return {
            type: 'QueryOperatorResult',
            filter: _.map(values, function (value) {
                return '=' + convertValue(value);
            })
        };
    },

    //
    between: function (value1, value2) {
        return {
            type: 'QueryOperatorResult',
            filter: [ '>' + convertValue(value1), '<' + convertValue(value2) ]
        };
    },

    //
    greaterThen: function (value) {
        return {
            type: 'QueryOperatorResult',
            filter: [ '>' + convertValue(value) ]
        };
    },

    //
    greaterThanOrEqualTo: function (value) {
        return {
            type: 'QueryOperatorResult',
            filter: [ '>=' + convertValue(value) ]
        };
    },

    //
    lessThan: function (value) {
        return {
            type: 'QueryOperatorResult',
            filter: [ '<' + convertValue(value) ]
        };
    },

    //
    lessThanOrEqualTo: function (value) {
        return {
            type: 'QueryOperatorResult',
            filter: [ '<=' + convertValue(value) ]
        };
    }

};

operators.$in   = operators.anyOf;
operators.$bt   = operators.between;
operators.$gt   = operators.greaterThen;
operators.$gte  = operators.greaterThanOrEqualTo;
operators.$lt   = operators.lessThan;
operators.$lte  = operators.lessThanOrEqualTo;

module.exports = operators;
},{"moment":"2V8r5n"}],57:[function(require,module,exports){
/**
 * query.filter
 * Date: 22.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
    , Is = require('../../../../tools/index').Is;

module.exports = function () {
    var _filter = {};

    this.getFilter = function (name) {
        return _filter;
    };

    this.setFilter = function (value) {
        //TODO Ensure Object
        _filter = value;
        return this;
    };

    this.resetFilter = function () {
        _filter = {};
        return this;
    };

    this.appendFilter = function (value) {
        if (Is.object(value)) {
            //TODO Необходимо реализовать логинку наложения условий при объединении фильров
            _filter = _.merge(_filter, value);
        } else {
            throw new TypeError('addFilter: incorrect parameter [' + value + '], object required');
        }
        return this;
    };

    if (arguments[0]) this.appendFilter(arguments[0]);
};
},{"../../../../tools/index":90}],58:[function(require,module,exports){
/**
 * Query
 * Date: 21.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var stampit = require('stampit');


var Query = stampit()

    // Methods
    //
    .methods({
        getQueryParameters  : require('./methods/getQueryParameters'),
        start               : require('./methods/paging').start,
        skip                : require('./methods/paging').start,
        count               : require('./methods/paging').count,
        limit               : require('./methods/paging').count,
        page                : require('./methods/paging').page,
        filter              : require('./methods/filter'),
        uuids               : require('./methods/uuids'),
        fileContent         : require('./methods/fileContent'),
        select              : require('./methods/select'),
        showArchived        : require('./methods/showArchived'),
        sort                : require('./methods/sort'),
        orderBy             : require('./methods/sort'), // alias for sort
        sortMode            : require('./methods/sortMode')
    })

    // Properties
    //
    .enclose(require('./query.params.js'))  // _params
    .enclose(require('./query.filter.js')); // _filter


module.exports = Query;
},{"./methods/fileContent":47,"./methods/filter":48,"./methods/getQueryParameters":49,"./methods/paging":50,"./methods/select":51,"./methods/showArchived":52,"./methods/sort":53,"./methods/sortMode":54,"./methods/uuids":55,"./query.filter.js":57,"./query.params.js":59,"stampit":"gaBrea"}],59:[function(require,module,exports){
/**
 * query.params
 * Date: 22.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
    , Is = require('../../../../tools').Is;

module.exports = function () {
    var that = this,
        _params = {};

    //TODO Проверить входные
    this.getParameter = function (name) {
        return _params[name];
    };

    this.getParameters = function () {
        return _params;
    };

    this.setParameter = function (name, value) {
        //TODO Ensure Object
        _params[name] = value;
    };

    this.setParameters = function (parameters) {
        //TODO Ensure Object
        _.extend(_params, parameters);
    };

    if (arguments[1]) {
        _.forOwn(arguments[1], function (value, key) {
            if (typeof that[key] === 'function') {
                that[key](value);
            }
        });
    }
};
},{"../../../../tools":90}],60:[function(require,module,exports){
/**
 * auth
 * Date: 23.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var getBasicAuthHttpHeader = require('./../../../tools/index').getBasicAuthHttpHeader;

var logger = require('project/logger');

/** @class */
var AuthProvider = function (provider) {
    var _auth = {
        login: null,
        password: null
    };

    /**
     * 
     * @param login
     * @param password
     * @returns {AuthProvider|Client} <code>this</code>
     */
    this.setAuth = function (login, password) {
        _auth.login = login;
        _auth.password = password;

        return this;
    };

    // В качестве источника авторизации передан другой провайдер авторизации
    if (provider && provider.getAuth) {
        // копируем ссылку на объект
        _auth = provider.getAuth();
    }

    // Логин и пароль переданы в параметрах
    else if (arguments.length == 2
        && typeof arguments[0] === 'string'
        && typeof arguments[1] === 'string') {

        this.setAuth(arguments[0], arguments[1]);
    }

    /**
     *
     * @returns {*}
     */
    this.getAuth = function () {

        if (!_auth.login || !_auth.password) {
            var credentials = require('project/default-auth');
            if (credentials) {
                var auth = credentials.getAuth();
                this.setAuth(auth.login, auth.password);
            }
        }

        return _auth;
    };

    /**
     *
     * @returns {string|null}
     */
    this.getBasicAuthHeader = function () {
        var auth = this.getAuth();

        if (auth) {
            return getBasicAuthHttpHeader(auth.login, auth.password);
        } else {
            return null;
        }
    };

    /**
     *
     * @returns {boolean}
     */
    this.isAuth = function () {
        var auth = this.getAuth();
        return !!auth && !!auth.login && !!auth.password;
    };
};

module.exports = AuthProvider;
},{"./../../../tools/index":90,"project/default-auth":"u3XsFq","project/logger":"Z19TnT"}],61:[function(require,module,exports){
/**
 * providerAccessor
 * Date: 03.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _    = require('lodash'),
    have = require('have');

/** @class */
var ProviderAccessor = function () {
    var _providers = {};

    this.getProvider = function (name) {
        return _providers[name];
    };

    this.setProvider = function () {
        var args = have(arguments, {
            'providers': 'opt object',
            'name': 'opt string',
            'provider': 'opt obj or func'
        });

        if (args.providers) {
            _.forOwn(args.providers, function (provider, name) {
                _providers[name] = provider;
            })

        } else if (args.name && args.provider) {
            _providers[args.name] = args.provider;

        } else throw new Error('setProvider: incorrect arguments');

        return this;
    }
};

module.exports = ProviderAccessor;
},{"have":7}],"u3XsFq":[function(require,module,exports){
/**
 * default Google Script auth
 * Date: 23.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var userProperties = PropertiesService.getUserProperties();

module.exports = {

    getAuth: function () {

        var login       = userProperties.getProperty('MOYSKLAD_LOGIN')
          , password    = userProperties.getProperty('MOYSKLAD_PASSWORD');

        if (login && password) {
            return {
                login: login,
                password: password
            }
        }

        else {
            return null;
        }
    },

    setDefaultAuth: function (login, password) {

        userProperties.setProperties({
            'MOYSKLAD_LOGIN':       login,
            'MOYSKLAD_PASSWORD':    password
        });
    }

};
},{}],"project/default-auth":[function(require,module,exports){
module.exports=require('u3XsFq');
},{}],"project/fetch":[function(require,module,exports){
module.exports=require('hhHkL+');
},{}],"hhHkL+":[function(require,module,exports){
/**
 * Google Script Http request provider factory
 * Date: 11.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _               = require('lodash'),
    log             = require('project/logger'),
    callbackAdapter = require('project/tools/callbackAdapter');

var fetch = {

    fetch: function (options, callback) {

        var _options = {
            //contentType: 'application/x-www-form-urlencoded',
            method: 'GET',
            muteHttpExceptions: true
        };
        _.extend(_options, options);

        var response, httpResponse, err;

        // Show request info
        log.info([
            'http',
            _options.method,
            _options.url
        ].join(' '));

        var startTime = new Date();

        try {
            httpResponse = UrlFetchApp.fetch(_options.url, _options);
        }
        catch (e) {
            err = e;
        }

        if (!err) {
            response = {
                headers         : httpResponse.getAllHeaders(),
                contentText     : httpResponse.getContentText(),
                responseCode    : httpResponse.getResponseCode()
            };

            // Show response info
            log.info([
                'http',
                response.responseCode,
                _options.url,
                (new Date() - startTime) + 'ms ' + response.contentText.length + 'b'
            ].join(' '));
        }

        var result = {
            response: response,
            request: _options
        };

        return callbackAdapter(err, result, callback);
    }
};

module.exports = fetch;
},{"project/logger":"Z19TnT","project/tools/callbackAdapter":76}],66:[function(require,module,exports){
/**
 * Jsonix (node.js context)
 * Date: 13.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */


module.exports = require('jsonix'); //require('../../../../vendor/jsonix');
},{"jsonix":"iROTCV"}],"project/logger":[function(require,module,exports){
module.exports=require('Z19TnT');
},{}],"Z19TnT":[function(require,module,exports){
/**
 * Logger (Google Script context)
 * Date: 11.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var gsLog = Logger.log,
    profilers = {};

function log(msg) {
    gsLog.apply(Logger, arguments);
}

module.exports = {
    log: log,
    info: log,
    debug: log,
    time: function (name) {
        profilers[name] = +(new Date());
    },
    timeEnd: function (name) {
        if (profilers[name]) {
            var end = +(new Date());
            this.log(name + ': ' + ((new Date() - profilers[name])) + 'ms');
        }
    }
};
},{}],69:[function(require,module,exports){
/**
 * model-extension
 * Date: 24.05.15
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');

var extensions = {
    'moysklad.__common'                 : require('./moysklad/__common'),
    'moysklad.accountEntity'            : require('./moysklad/accountEntity'),
    'moysklad.order'                    : require('./moysklad/order'),
    'moysklad.abstractGood'             : require('./moysklad/abstractGood'),
    'moysklad.operationWithPositions'   : require('./moysklad/operationWithPositions'),
    'moysklad.attributeValue'           : require('./moysklad/attributeValue')
};

module.exports.getStampExtender = function (map, client) {

    map = {
        name        : map.name,
        enums       : map.enums,
        elementInfos: _.indexBy(map.elementInfos, 'typeInfo'),
        typeInfos   : _.indexBy(map.typeInfos, function (typeInfo) {
            return map.name + '.' + typeInfo.localName
        })
    };

    return function (localName, stamp) {
        var fullTypeName = map.name + '.' + localName;

        function applyExtension (_typeName) {
            var getExtension = extensions[_typeName];
            if (getExtension) {
                var ext = getExtension(fullTypeName, map, client);
                if (ext) {
                    if (ext.state)   stamp = stamp.state(ext.state);
                    if (ext.methods) stamp = stamp.methods(ext.methods);
                    //TODO Array of encloses
                    if (ext.enclose) stamp = stamp.enclose(ext.enclose);
                }
            }
        }

        applyExtension(fullTypeName);
        applyExtension(map.name + '.__common');

        return stamp;
    }
};


},{"./moysklad/__common":70,"./moysklad/abstractGood":71,"./moysklad/accountEntity":72,"./moysklad/attributeValue":73,"./moysklad/operationWithPositions":74,"./moysklad/order":75}],70:[function(require,module,exports){
/**
 * _common
 * Date: 27.05.15
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _       = require('lodash'),
    tools   = require('project/tools');


module.exports = function (typeName, map, client) {

    var getAttrMetadata = function (typeName, attrName) {
        if (!client.metadata) throw new Error('Metadata not loaded. Use client.loadMetadata()');

        var uriTypeName = tools.getUriTypeName(typeName);

        var embeddedEntityMetadata = client.metadata.embeddedEntityMetadataByName[uriTypeName];
        if (embeddedEntityMetadata) {
            var attributeMetadata = _.find(embeddedEntityMetadata.attributeMetadata, { name: attrName });
            if (!attributeMetadata) throw new Error('Can not find attribute metadata [' + attrName + ']');
            return attributeMetadata;

        } else throw new Error('Can not find medatata for [' + uriTypeName + '] type');
    };

    var extensions = {
        state: {},
        methods: {},
        enclose: {}
    };

    // Метод save должен быть привязан только к агрегатам
    if (map.elementInfos[typeName]) {
        extensions.methods.save = function () {
            return client.save.apply(client, [this].concat(_.toArray(arguments)));
        }
    }

    // Подключаем методы работы с атрибутами для сущностей с коллекцией "attribute"
    var typeInfo = map.typeInfos[typeName];
    if (_.find(typeInfo.propertyInfos, function (propInfo) {
            return propInfo.name === 'attribute'
                && propInfo.typeInfo.slice(-14) === 'AttributeValue';
        })) {

        extensions.methods.getAttr = function (attr, create) {
            var metadataUuid = tools.isUuid(attr)
                ? attr
                : getAttrMetadata(this.getType(), attr).uuid;

            return tools.getAttr(this, metadataUuid, create);
        };

        extensions.methods.hasAttr = function (attr) {
            var metadataUuid = tools.isUuid(attr)
                ? attr
                : getAttrMetadata(this.getType(), attr).uuid;

            return tools.hasAttr(metadataUuid);
        };

        extensions.methods.getAttrValue = function (attr) {
            var metadataUuid = tools.isUuid(attr)
                ? attr
                : getAttrMetadata(this.getType(), attr).uuid;

            var attributeValue = this.getAttr(metadataUuid);
            if (attributeValue) return attributeValue.getValue();
            return null;
        };

    }

    return extensions;
};
},{"project/tools":88}],71:[function(require,module,exports){
/**
 * abstractGood
 * Date: 28.05.15
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var tools = require('project/tools');

module.exports = function (typeName, map, client) {
    return {
        methods: {
            getPrice: function (priceTypeUuid) {
                return tools.getPositions(this, priceTypeUuid)
            },
            hasPrice: function (priceTypeUuid) {
                return tools.hasPrice(this, priceTypeUuid)
            }
        }
    }
};
},{"project/tools":88}],72:[function(require,module,exports){
/**
 * accountEntity
 * Date: 24.05.15
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var tools = require('project/tools');

var getPositions = function (entity) {
    if (entity.instanceOf('operationWithPositions')) {
        return _.find(entity, function (value, key) {
            return key.instanceOf ? key.instanceOf('motion') : false;
        })
    }
    return null;
};

module.exports = function (typeName, map, client) {

    var normalizeTypeName = function (typeName) {
        return typeName.indexOf('.') !== -1
            ? typeName
            : map.name + '.' + typeName;
    };

    var instanceOf = function (entity, baseTypeName) {
        //TODO cache
        if (!entity) throw new Error('entity not defined');
        if (!baseTypeName) throw new Error('baseEntityTypeName not defined');

        var typeName = normalizeTypeName(entity.TYPE_NAME);
        baseTypeName = normalizeTypeName(baseTypeName);

        if (typeName === baseTypeName) {
            return true;

        } else {
            var type = map.typeInfos[typeName];
            if (type) return instanceOf({ TYPE_NAME: type.baseTypeInfo }, baseTypeName)
        }

        return false;
    };

    return {
        methods: {
            getType: function () {
                return this.TYPE_NAME;
            },
            instanceOf: function (typeName) {
                return instanceOf(this, typeName);
            },
            getPositions: function () {
                return tools.getPositions(this);
            },
            getProperty: function () {
                return tools.getProperty.apply(tools, [this].concat(_.toArray(arguments)))
            },
            clone: function () {
                return tools.clone(this);
            }
        }
    }
};
},{"project/tools":88}],73:[function(require,module,exports){
/**
 * attributeValue
 * Date: 28.05.15
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');
var tools = require('project/tools');

module.exports = function (typeName, map, client) {

    var attributeFields = _(map.typeInfos['moysklad.attributeValue'].propertyInfos)
        .map('name')
        .pull('metadataUuid')
        .value();

    var attrTypeToFieldName = {
        "STRING"        : "valueString",
        "LONG"          : "longValue",
        "TIME"          : "timeValue",
        "ID_CUSTOM"     : "entityValueUuid",
        "FILE"          : "file",
        "DOUBLE"        : "doubleValue",
        "BOOLEAN"       : "booleanValue",
        "ID_EMBEDDED"   : "ID_EMBEDDED",
        "TEXT"          : "valueText",
        "LINK"          : "valueText"
    };

    var getAttrDataFieldName = function (attrValue) {
        // Метаданные загружены
        if (client.metadata) {
            var attributeMetadata = client.metadata.attributeMetadataByUuid[attrValue.metadataUuid];
            var attrType = attributeMetadata.attrType;
            if (attrType === 'ID_EMBEDDED') {
                var dictionaryMetadata = client.metadata
                    .embeddedEntityMetadataByUuid[attributeMetadata.dictionaryMetadataUuid];
                return dictionaryMetadata.name.toLowerCase() + 'ValueUuid';

            } else {
                return attrTypeToFieldName[attrType];
            }
        }
        // Метаданные не загружены
        else {
            var fieldName = _.find(attributeFields, function (fieldName) {
                return fieldName in attrValue;
            });

            if (!fieldName)
                throw new Error(
                    'Can not find attribute data field, set it manually ' +
                    'or load metadata with client.loadMetadata()');

            return fieldName;
        }
    };

    return {
        methods: {
            getValue: function () {
                var fieldName = getAttrDataFieldName(this);
                if (fieldName) return this[fieldName];
                else return null;
            },
            setValue: function (value) {
                var fieldName = getAttrDataFieldName(this);
                if (fieldName) this[fieldName] = value;
                else throw new Error(
                        'Can not find attribute data field, set it manually ' +
                        'or load metadata with client.loadMetadata()');
                return this;
            }
        }
    }
};
},{"project/tools":88}],74:[function(require,module,exports){
/**
 * operationWithPositions
 * Date: 28.05.15
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var tools = require('project/tools');

module.exports = function (typeName, map, client) {
    return {
        methods: {
            getPositions: function () {
                return tools.getPositions(this)
            }
        }
    }
};
},{"project/tools":88}],75:[function(require,module,exports){
/**
 * order
 * Date: 28.05.15
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _            = require('lodash'),
    getPositions = require('project/tools/getPositions');


module.exports = function (typeName, map, client) {
    return {
        methods: {
            reserve: function () {
                _.forEach(getPositions(this), function (position) {
                    position.reserve = position.quantity;
                });

                this.reservedSum = this.sum.sum;
            }
        }
    }
};
},{"project/tools/getPositions":81}],76:[function(require,module,exports){
/**
 * callbackAdapter
 * Date: 03.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var callbackAdapter = function (err, data, callback) {
    if (callback) {
        return callback(err, data);

    } else {
        if (err)
            throw err;
        else
            return data;
    }
};

module.exports = callbackAdapter;

},{}],77:[function(require,module,exports){
/**
 * clone
 * Date: 15.06.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');

var fieldsToDelete = [
    'createdBy',
    'updated',
    'updatedBy',
    'uuid',
    'operationUuid'
];

var resetUuid = function (value) {
    //console.log(arguments);
    if (typeof value === 'object') {
        if (_.some(fieldsToDelete, function (fieldName) {
                return fieldName in value
            })) return _.cloneDeep(_.omit(value, fieldsToDelete), resetUuid);
    }
};

/**
 * Клонирует объекты МойСклад
 * используется стандартная процедура глубокого клонирования,
 * дополнительно к этому обнуляются поля: uuid, createdBy, updated, updatedBy, operationUuid
 *
 * @param obj Клонируемый объект
 */
var clone = function (obj) {

    if (obj) {
        return _.cloneDeep(obj, resetUuid);
    }

    return null;
};

module.exports = clone;
},{}],78:[function(require,module,exports){
/**
 * description
 * Date: 16.06.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

//TODO Подумать над интерфейсом

var append = function (entity, message) {
    if (!message) return this;

    entity.description ?
        message = '\n\n' + message :
        entity.description = '';

    entity.description += message;

    return this;
};


var prepend = function (entity, message) {
    if (!message) return this;

    entity.description = entity.description ?
        message + '\n\n' + entity.description :
        message;

    return this;
};


function description (entity) {
    if (!entity) throw new Error('description: entity parameter not defined');

    var pub = {
        append: function (message) {
            return append.call(this, entity, message);
        },
        prepend: function (message) {
            return prepend.call(this, entity, message);
        },
        value: function () { return entity ? entity.description : null; }
    };

    return pub;
}

module.exports = description;
},{}],79:[function(require,module,exports){
/**
 * index
 * Date: 27.06.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var MoneyToStr = require('./../../../../../../vendor/moneytostr').MoneyToStr
  , Currency = require('./../../../../../../vendor/moneytostr').Currency
  , Language = require('./../../../../../../vendor/moneytostr').Language
  , Pennies = require('./../../../../../../vendor/moneytostr').Pennies;

var moneyToStrRUR;

module.exports = {
    //TODO Реализовать указание валюты (пока RUR)
    printAmount: function (value) {
        moneyToStrRUR = moneyToStrRUR || (new MoneyToStr(Currency.RUR, Language.RUS, Pennies.NUMBER));
        var moneyStr = moneyToStrRUR.convertValue(value);
        return moneyStr.slice(0, 1).toUpperCase() + moneyStr.slice(1);
    }
};
},{"./../../../../../../vendor/moneytostr":"sicwBz"}],80:[function(require,module,exports){
/**
 * getAttribute
 * Date: 20.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');

/**
 * Возвращает атрибут объекта.
 *
 * @param entity
 * @param metadataUuid
 * @param create
 * @returns {{}}
 */
var getAttr = function (entity, metadataUuid, create) {
    var attribute,
        that = this;

    if (entity) {
        if (entity.attribute)
            attribute = _.find(entity.attribute, { metadataUuid: metadataUuid });

        if (!attribute && create) {
            attribute = {};
            attribute.metadataUuid = metadataUuid;
            entity.attribute = entity.attribute || [];
            entity.attribute.push(attribute);
        }

        return attribute;
    }

};

module.exports = getAttr;
},{}],81:[function(require,module,exports){
/**
 * Date: 02.06.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');

/**
 * Возвращает свойство с массивом позиций для указанного документа (полезно для унификации
 * доступа к позициям документа, т.к. для разных типов объектов наименование свойств с позициями различно)
 *
 * @param entity Сущность с аттрибутами
 * @returns Array
 */
var getPositions = function (entity) {
    if (entity.instanceOf && entity.instanceOf('operationWithPositions')) {
        return _.find(entity, function (value, key) {
            return key.instanceOf ? key.instanceOf('motion') : false;
        })
    }
    return null;
};

module.exports = getPositions;
},{}],82:[function(require,module,exports){
/**
 * getPrice
 * Date: 20.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');

/**
 * Возвращает объект цены. Если цена не определена, то пустой объект уже привязанный к сущности
 *
 * @param entity
 * @param priceTypeUuid
 * @param create
 * @returns {{}}
 */
var getPrice = function (entity, priceTypeUuid, create) {

    if (entity) {
        var price = _.find(entity.salePrices, { priceTypeUuid: priceTypeUuid });

        if (!price && create) {
            price = {
                priceTypeUuid: priceTypeUuid,
                value: 0
            };
            entity.salePrices = entity.salePrices || [];
            entity.salePrices.push(price);
        }

        return price;
    }

    return null;
};

module.exports = getPrice;
},{}],83:[function(require,module,exports){
/**
 * getPriceValue
 * Date: 01.06.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');

/**
 * Получение значения цены по идентификатору типа цены
 * (осуществляется методом перебора возможных полей без дополнительной загрузки метаданных)
 * @param entity Сущность с аттрибутами
 * @param priceTypeUuid Идентификатор типа цены
 * @returns {*}
 */
var getPriceValue = function (entity, priceTypeUuid) {

    var price = _.find(entity.salePrices, { priceTypeUuid: priceTypeUuid });

    if (price) return price.value / 100;
};

module.exports = getPriceValue;
},{}],84:[function(require,module,exports){
/**
 * getProperty
 * Date: 26.06.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var getObject = require('getobject');

var getProperty = function (entity, propertyPath, defaultValue, create) {
    if (getObject.exists(entity, propertyPath)) {
        return getObject.get(entity, propertyPath);

    } else {
        if (defaultValue !== undefined) {
            if (!!create) getObject.set(entity, propertyPath, defaultValue);
            return defaultValue;
        }
    }
    return undefined;
};


module.exports = getProperty;
},{"getobject":1}],85:[function(require,module,exports){
/**
 * getTypeName
 * Date: 14.06.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

/**
 * Возвращает тип объекта с большой буквы
 * (напр. "moysklad.customerOrder" -> "CustomerOrder")
 * @param {Object|String} obj Объект МойСклад или строка наименование класса
 * @returns {String|null}
 */
var getUriTypeName = function (obj) {
    var typeName;

    if (typeof obj === 'object' && obj.TYPE_NAME)
        typeName = obj.TYPE_NAME;
    else if (typeof obj === 'string')
        typeName = obj;
    else
        throw new Error('getUriTypeName: incorrect parameter');

    if (typeName.indexOf('.') !== -1)
        typeName = typeName.split('.')[1];

    if (typeName)
        typeName = typeName.charAt(0).toUpperCase() + typeName.substring(1);

    return typeName;
};

module.exports = getUriTypeName;
},{}],86:[function(require,module,exports){
/**
 * hasAttr
 * Date: 28.05.15
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');
var isUuid = require('project/tools/isUuid');

var hasAttr = function (entity, metadataUuid) {
    var attribute,
        that = this;

    if (!entity) throw new Error('entity not defined');
    if (!isUuid(metadataUuid)) throw new Error('metadataUuid must be Uuid');

    if (entity.attribute) {
        attribute = _.find(entity.attribute, {metadataUuid: metadataUuid});
        if (attribute) return true;
    }

    return false;
};

module.exports = hasAttr;
},{"project/tools/isUuid":89}],87:[function(require,module,exports){
/**
 * hasPrice
 * Date: 28.05.15
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');
var isUuid = require('project/tools/isUuid');

var hasPrice = function (entity, priceTypeUuid) {
    var price,
        that = this;

    if (!entity) throw new Error('entity not defined');
    if (!isUuid(priceTypeUuid)) throw new Error('priceTypeUuid must be Uuid');

    if (entity.salePrices) {
        price = _.find(entity.salePrices, {priceTypeUuid: priceTypeUuid});
        if (price) return true;
    }

    return false;
};

module.exports = hasPrice;
},{"project/tools/isUuid":89}],88:[function(require,module,exports){
/**
 * index
 * Date: 14.06.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

module.exports = {

    // Entity tools
    clone                   : require('./clone'),
    getAttr                 : require('./getAttr'),
    hasAttr                 : require('./hasAttr'),
    getPrice                : require('./getPrice'),
    hasPrice                : require('./hasPrice'),
    getPositions            : require('./getPositions'),

    // Common tools
    isUuid                  : require('./isUuid'),
    getProperty             : require('./getProperty'),


    getUriTypeName          : require('./getUriTypeName'),
    //getAttrValue            : require('./getAttrValue'),
    getPriceValue           : require('./getPriceValue'),
    //instanceOf              : require('./instanceOf'),
    //reserve                 : require('./reserve'),
    description             : require('./description'),

    format: {
        printAmount         : require('./format/moneytostr').printAmount
    }

};
},{"./clone":77,"./description":78,"./format/moneytostr":79,"./getAttr":80,"./getPositions":81,"./getPrice":82,"./getPriceValue":83,"./getProperty":84,"./getUriTypeName":85,"./hasAttr":86,"./hasPrice":87,"./isUuid":89}],89:[function(require,module,exports){
/**
 * isUuid
 * Date: 28.05.15
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

const UUID_REGEX = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;

module.exports = function (value) {
    return UUID_REGEX.test(value);
}
},{}],90:[function(require,module,exports){
/**
 * Common Tools
 * Date: 11.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');

//TODO Разнести по отдельным модулям



var Base64 = {

    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    //метод для кодировки в base64 на javascript
    encode: function (input) {
        var Base64 = this;
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = Base64._utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }
        return output;
    },

    //метод для раскодировки из base64
    decode: function (input) {
        var Base64 = this;
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = Base64._utf8_decode(output);
        return output;
    },

    // метод для кодировки в utf8
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;

    },

    //метод для раскодировки из urf8
    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c, c2, c3; // mvv: c1 not used
        c = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }

};

//exports.fetch = require('project/fetch');

exports.Base64 = Base64;

exports.getBasicAuthHttpHeader = function (login, password) {

    // TODO Надо подумать как лучше переключать функции в зависимости от среды исполнения
    return "Basic " + Base64.encode(login + ":" + password);

};

exports.Is = {
    'args': function () {
        var args = arguments[0],
            condition = Array.prototype.slice.call(arguments, -(arguments.length - 1));

        if (args.length == condition.length) {
            for (var i = 0, l = args.length; i < l; i++) {
                if (typeof condition[i] === 'string') {
                    if (typeof args[i] !== condition[i]) return false;

                } else if (condition[i] && condition[i].isMoment && typeof condition[i].isMoment === 'function') {
                    if (!condition[i].isMoment(args[i])) return false;

                } else {
                    if (!(args[i] instanceof condition[i])) return false;
                }
            }
            return true;
        }
        return false;
    },
    'exists': function (value) {
        return (typeof value !== 'undefined' && value !== null);
    },
    'object': function (value) {
        return typeof value === 'object';
    },
    'numberNotNaN': function (value) {
        return (typeof value === 'number') && !isNaN(value);
    },
    'integer': function (value) {
        return _.isNumber(value) && ((value % 1) === 0);
    }
};

//TODO Сформировать эту структуру динамически
exports.Ensure = {
    'ensure': function (value, message, test, callback) {
        var isTest = test(value);
        if (!isTest) {
            var err = new Error(message.replace('%value', value, 'gi'));
            if (_.isFunction(callback)) callback(err);
            else throw err;
        }
        return isTest;
    },
    'boolean': function (value) {
        if (_.isString(arguments[1])) {
            return this.ensure(value, arguments[1], _.isBoolean, arguments[2]);
        } else {
            return this.ensure(value, 'Argument [%value] must be a boolean.', _.isBoolean, arguments[1]);
        }
    },
    'string': function (value) {
        if (_.isString(arguments[1])) {
            return this.ensure(value, arguments[1], _.isString, arguments[2]);
        } else {
            return this.ensure(value, 'Argument [%value] must be a string.', _.isString, arguments[1]);
        }
    },
    'uuid': function (value) {
        if (_.isString(arguments[1])) {
            return this.ensure(value, arguments[1], exports.Is.uuid, arguments[2]);
        } else {
            return this.ensure(value, 'Argument [%value] must be uuid format.', exports.Is.uuid, arguments[1]);
        }
    },
    'numberNotNaN': function (value) {
        if (_.isString(arguments[1])) {
            return this.ensure(value, arguments[1], exports.Is.numberNotNaN, arguments[2]);
        } else {
            return this.ensure(value, 'Argument [%value] must be a number (not NaN).', exports.Is.numberNotNaN, arguments[1]);
        }
    },
    'numberOrNaN': function (value) {
        if (_.isString(arguments[1])) {
            return this.ensure(value, arguments[1], _.isNumber, arguments[2]);
        } else {
            return this.ensure(value, 'Argument [%value] must be a number or NaN.', _.isNumber, arguments[1]);
        }
    },
    'integer': function (value) {
        if (_.isString(arguments[1])) {
            return this.ensure(value, arguments[1], exports.Is.integer, arguments[2]);
        } else {
            return this.ensure(value, 'Argument [%value] must be an integer.', exports.Is.integer, arguments[1]);
        }
    },
    'date': function (value) {
        if (_.isString(arguments[1])) {
            return this.ensure(value, arguments[1], _.isDate, arguments[2]);
        } else {
            return this.ensure(value, 'Argument [%value] must be a date.', _.isDate, arguments[1]);
        }
    },
    'object': function (value) {
        if (_.isString(arguments[1])) {
            return this.ensure(value, arguments[1], exports.Is.object, arguments[2]);
        } else {
            return this.ensure(value, 'Argument [%value] must be an object.', exports.Is.object, arguments[1]);
        }
    },
    'array': function (value) {
        if (_.isString(arguments[1])) {
            return this.ensure(value, arguments[1], _.isArray, arguments[2]);
        } else {
            return this.ensure(value, 'Argument [%value] must be an array.', _.isArray, arguments[1]);
        }
    },
    'function': function (value) {
        if (_.isString(arguments[1])) {
            return this.ensure(value, arguments[1], _.isFunction, arguments[2]);
        } else {
            return this.ensure(value, 'Argument [%value] must be a function.', _.isFunction, arguments[1]);
        }
    },
    'exists': function (value) {
        if (_.isString(arguments[1])) {
            return this.ensure(value, arguments[1], exports.Is.exists, arguments[2]);
        } else {
            return this.ensure(value, 'Argument does not exist.', exports.Is.exists, arguments[1]);
        }
    }
};
},{}]},{},["1wiUUs"]);