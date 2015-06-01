function init() {
    // script


// moysklad-client 0.3.0-beta.1 (bundle length 896371)
// Сборка библиотеки moysklad-client для браузера
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

},{"util/":7}],3:[function(require,module,exports){
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
(function (process){
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

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require("JkpR2F"))
},{"JkpR2F":5}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],7:[function(require,module,exports){
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
},{"./support/isBuffer":6,"JkpR2F":5,"inherits":3}],8:[function(require,module,exports){

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


},{"assert":2,"util":7}],9:[function(require,module,exports){
var _jsonix_factory = function(_jsonix_xmldom, _jsonix_xmlhttprequest, _jsonix_fs)
{
	// Complete Jsonix script is included below 
var Jsonix = {
	singleFile : true
};
Jsonix.Util = {};

Jsonix.Util.extend = function(destination, source) {
	destination = destination || {};
	if (source) {
		/*jslint forin: true */
		for ( var property in source) {
			var value = source[property];
			if (value !== undefined) {
				destination[property] = value;
			}
		}

		/**
		 * IE doesn't include the toString property when iterating over an
		 * object's properties with the for(property in object) syntax.
		 * Explicitly check if the source has its own toString property.
		 */

		/*
		 * FF/Windows < 2.0.0.13 reports "Illegal operation on WrappedNative
		 * prototype object" when calling hawOwnProperty if the source object is
		 * an instance of window.Event.
		 */

		// REWORK
		// Node.js
		sourceIsEvt = typeof window !== 'undefined' && window !== null && typeof window.Event === "function" && source instanceof window.Event;

		if (!sourceIsEvt && source.hasOwnProperty && source.hasOwnProperty('toString')) {
			destination.toString = source.toString;
		}
	}
	return destination;
};
Jsonix.Class = function() {
	var Class = function() {
		this.initialize.apply(this, arguments);
	};
	var extended = {};
	var empty = function() {
	};
	var parent, initialize, Type;
	for (var i = 0, len = arguments.length; i < len; ++i) {
		Type = arguments[i];
		if (typeof Type == "function") {
			// make the class passed as the first argument the superclass
			if (i === 0 && len > 1) {
				initialize = Type.prototype.initialize;
				// replace the initialize method with an empty function,
				// because we do not want to create a real instance here
				Type.prototype.initialize = empty;
				// the line below makes sure that the new class has a
				// superclass
				extended = new Type();
				// restore the original initialize method
				if (initialize === undefined) {
					delete Type.prototype.initialize;
				} else {
					Type.prototype.initialize = initialize;
				}
			}
			// get the prototype of the superclass
			parent = Type.prototype;
		} else {
			// in this case we're extending with the prototype
			parent = Type;
		}
		Jsonix.Util.extend(extended, parent);
	}
	Class.prototype = extended;
	return Class;
};

Jsonix.XML = {
		XMLNS_NS : 'http://www.w3.org/2000/xmlns/',
		XMLNS_P : 'xmlns'
};


Jsonix.DOM = {
	isDomImplementationAvailable : function () {
		if (typeof _jsonix_xmldom !== 'undefined')
		{
			return true;
		} else if (typeof document !== 'undefined' && Jsonix.Util.Type.exists(document.implementation) && Jsonix.Util.Type.isFunction(document.implementation.createDocument)) {
			return true;
		} else {
			return false;
		}
	},
	createDocument : function() {
		// REWORK
		// Node.js
		if (typeof _jsonix_xmldom !== 'undefined')
		{
			return new (_jsonix_xmldom.DOMImplementation)().createDocument();
		} else if (typeof document !== 'undefined' && Jsonix.Util.Type.exists(document.implementation) && Jsonix.Util.Type.isFunction(document.implementation.createDocument)) {
			return document.implementation.createDocument('', '', null);
		} else if (typeof ActiveXObject !== 'undefined') {
			return new ActiveXObject('MSXML2.DOMDocument');
		} else {
			throw new Error('Error created the DOM document.');
		}
	},
	serialize : function(node) {
		Jsonix.Util.Ensure.ensureExists(node);
		// REWORK
		// Node.js
		if (typeof _jsonix_xmldom !== 'undefined')
		{
			return (new (_jsonix_xmldom).XMLSerializer()).serializeToString(node);
		} else if (Jsonix.Util.Type.exists(XMLSerializer)) {
			return (new XMLSerializer()).serializeToString(node);
		} else if (Jsonix.Util.Type.exists(node.xml)) {
			return node.xml;
		} else {
			throw new Error('Could not serialize the node, neither XMLSerializer nor the [xml] property were found.');
		}
	},
	parse : function(text) {
		Jsonix.Util.Ensure.ensureExists(text);
		if (typeof _jsonix_xmldom !== 'undefined')
		{
			return (new (_jsonix_xmldom).DOMParser()).parseFromString(text, 'application/xml');
		} else if (typeof DOMParser != 'undefined') {
			return (new DOMParser()).parseFromString(text, 'application/xml');
		} else if (typeof ActiveXObject != 'undefined') {
			var doc = Jsonix.DOM.createDocument('', '');
			doc.loadXML(text);
			return doc;
		} else {
			var url = 'data:text/xml;charset=utf-8,' + encodeURIComponent(text);
			var request = new XMLHttpRequest();
			request.open('GET', url, false);
			if (request.overrideMimeType) {
				request.overrideMimeType("text/xml");
			}
			request.send(null);
			return request.responseXML;
		}
	},
	load : function(url, callback, options) {

		var request = Jsonix.Request.INSTANCE;

		request.issue(
						url,
						function(transport) {
							var result;
							if (Jsonix.Util.Type.exists(transport.responseXML) && Jsonix.Util.Type.exists(transport.responseXML.documentElement)) {
								result = transport.responseXML;
							} else if (Jsonix.Util.Type.isString(transport.responseText)) {
								result = Jsonix.DOM.parse(transport.responseText);
							} else {
								throw new Error('Response does not have valid [responseXML] or [responseText].');
							}
							callback(result);

						}, function(transport) {
							throw new Error('Could not retrieve XML from URL [' + url	+ '].');

						}, options);
	},
	xlinkFixRequired : null,
	isXlinkFixRequired : function ()
	{
		if (Jsonix.DOM.xlinkFixRequired === null)
		{
			if (typeof navigator === 'undefined')
			{
				Jsonix.DOM.xlinkFixRequired = false;
			}
			else if (!!navigator.userAgent && (/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)))
			{
				var doc = Jsonix.DOM.createDocument();
				var el = doc.createElement('test');
				el.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'urn:test');
				doc.appendChild(el);
				var testString = Jsonix.DOM.serialize(doc);
				Jsonix.DOM.xlinkFixRequired = (testString.indexOf('xmlns:xlink') === -1);
			}
			else
			{
				Jsonix.DOM.xlinkFixRequired = false;
			}
		}
		return Jsonix.DOM.xlinkFixRequired;
	}
};
Jsonix.Request = Jsonix
		.Class({
			// REWORK
			factories : [ function() {
				return new XMLHttpRequest();
			}, function() {
				return new ActiveXObject('Msxml2.XMLHTTP');
			}, function() {
				return new ActiveXObject("Msxml2.XMLHTTP.6.0");
			}, function() {
				return new ActiveXObject("Msxml2.XMLHTTP.3.0");
			}, function() {
				return new ActiveXObject('Microsoft.XMLHTTP');
			}, function() {
				// Node.js
				if (typeof _jsonix_xmlhttprequest !== 'undefined')
				{
					var XMLHttpRequest = _jsonix_xmlhttprequest.XMLHttpRequest;
					return new XMLHttpRequest();
				}
				else
				{
					return null;
				}
			}],
			initialize : function() {
			},
			issue : function(url, onSuccess, onFailure, options) {
				Jsonix.Util.Ensure.ensureString(url);
				if (Jsonix.Util.Type.exists(onSuccess)) {
					Jsonix.Util.Ensure.ensureFunction(onSuccess);
				} else {
					onSuccess = function() {
					};
				}
				if (Jsonix.Util.Type.exists(onFailure)) {
					Jsonix.Util.Ensure.ensureFunction(onFailure);
				} else {
					onFailure = function() {
					};
				}
				if (Jsonix.Util.Type.exists(options)) {
					Jsonix.Util.Ensure.ensureObject(options);
				} else {
					options = {};
				}

				var transport = this.createTransport();

				var method = Jsonix.Util.Type.isString(options.method) ? options.method
						: 'GET';
				var async = Jsonix.Util.Type.isBoolean(options.async) ? options.async
						: true;
				var proxy = Jsonix.Util.Type.isString(options.proxy) ? options.proxy
						: Jsonix.Request.PROXY;

				var user = Jsonix.Util.Type.isString(options.user) ? options.user
						: null;
				var password = Jsonix.Util.Type.isString(options.password) ? options.password
						: null;

				if (Jsonix.Util.Type.isString(proxy) && (url.indexOf("http") === 0)) {
					url = proxy + encodeURIComponent(url);
				}

				if (Jsonix.Util.Type.isString(user)) {
					transport.open(method, url, async, user, password);
				} else {
					transport.open(method, url, async);
				}

				if (Jsonix.Util.Type.isObject(options.headers)) {

					for ( var header in options.headers) {
						if (options.headers.hasOwnProperty(header)) {
							transport.setRequestHeader(header,
									options.headers[header]);
						}
					}
				}

				var data = Jsonix.Util.Type.exists(options.data) ? options.data
						: null;
				if (!async) {
					transport.send(data);
					this.handleTransport(transport, onSuccess, onFailure);
				} else {
					var that = this;
					if (typeof window !== 'undefined') {

						transport.onreadystatechange = function() {
							that.handleTransport(transport, onSuccess,
									onFailure);
						};

						window.setTimeout(function() {
							transport.send(data);
						}, 0);
					} else {

						transport.onreadystatechange = function() {
							that.handleTransport(transport, onSuccess, onFailure);
						};
						transport.send(data);
					}
				}
				return transport;

			},
			handleTransport : function(transport, onSuccess, onFailure) {
				if (transport.readyState == 4) {
					if (!transport.status || (transport.status >= 200 && transport.status < 300)) {
						onSuccess(transport);
					}
					if (transport.status && (transport.status < 200 || transport.status >= 300)) {
						onFailure(transport);
					}
				}
			},
			createTransport : function() {
				for ( var index = 0, length = this.factories.length; index < length; index++) {
					try {
						var transport = this.factories[index]();
						if (transport !== null) {
							return transport;
						}
					} catch (e) {
						// TODO log
					}
				}
				throw new Error('Could not create XML HTTP transport.');
			},
			CLASS_NAME : 'Jsonix.Request'
		});
Jsonix.Request.INSTANCE = new Jsonix.Request();
Jsonix.Request.PROXY = null;
Jsonix.Schema = {};
Jsonix.Model = {};
Jsonix.Util.Type = {
	exists : function(value) {
		return (typeof value !== 'undefined' && value !== null);
	},
	isUndefined : function(value) {
		return typeof value === 'undefined';
	},
	isString : function(value) {
		return typeof value === 'string';
	},
	isBoolean : function(value) {
		return typeof value === 'boolean';
	},
	isObject : function(value) {
		return typeof value === 'object';
	},
	isFunction : function(value) {
		return typeof value === 'function';
	},
	isNumber : function(value) {
		return (typeof value === 'number') && !isNaN(value);
	},
	isNumberOrNaN : function(value) {
		return (value === +value) || (Object.prototype.toString.call(value) === '[object Number]');
	},
	isNaN : function(value) {
		return Jsonix.Util.Type.isNumberOrNaN(value) && isNaN(value);
	},
	isArray : function(value) {
		// return value instanceof Array;
		return !!(value && value.concat && value.unshift && !value.callee);
	},
	isDate : function(value) {
		return !!(value && value.getTimezoneOffset && value.setUTCFullYear);
	},
	isRegExp : function(value) {
		return !!(value && value.test && value.exec && (value.ignoreCase || value.ignoreCase === false));
	},
	isEqual : function(a, b, report) {
		var doReport = Jsonix.Util.Type.isFunction(report);
		// TODO rework
		var _range = function(start, stop, step) {
			var args = slice.call(arguments);
			var solo = args.length <= 1;
			var start_ = solo ? 0 : args[0];
			var stop_ = solo ? args[0] : args[1];
			var step_ = args[2] || 1;
			var len = Math.max(Math.ceil((stop_ - start_) / step_), 0);
			var idx = 0;
			var range = new Array(len);
			while (idx < len) {
				range[idx++] = start_;
				start_ += step_;
			}
			return range;
		};

		var _keys = Object.keys || function(obj) {
			if (Jsonix.Util.Type.isArray(obj)) {
				return _range(0, obj.length);
			}
			var keys = [];
			for ( var key in obj) {
				if (obj.hasOwnProperty(key)) {
					keys[keys.length] = key;
				}
			}
			return keys;
		};

		// Check object identity.
		if (a === b) {
			return true;
		}

		// Check if both are NaNs
		if (Jsonix.Util.Type.isNaN(a) && Jsonix.Util.Type.isNaN(b)) {
			return true;
		}
		// Different types?
		var atype = typeof a;
		var btype = typeof b;
		if (atype != btype) {
			if (doReport) {
				report('Types differ [' + atype + '], [' + btype + '].');
			}
			return false;
		}
		// Basic equality test (watch out for coercions).
		if (a == b) {
			return true;
		}
		// One is falsy and the other truthy.
		if ((!a && b) || (a && !b)) {
			if (doReport) {
				report('One is falsy, the other is truthy.');
			}
			return false;
		}
		// Check dates' integer values.
		if (Jsonix.Util.Type.isDate(a) && Jsonix.Util.Type.isDate(b)) {
			return a.getTime() === b.getTime();
		}
		// Both are NaN?
		if (Jsonix.Util.Type.isNaN(a) && Jsonix.Util.Type.isNaN(b)) {
			return false;
		}
		// Compare regular expressions.
		if (Jsonix.Util.Type.isRegExp(a) && Jsonix.Util.Type.isRegExp(b)) {
			return a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline;
		}
		// If a is not an object by this point, we can't handle it.
		if (atype !== 'object') {
			return false;
		}
		// Check for different array lengths before comparing contents.
		if (a.length && (a.length !== b.length)) {
			if (doReport) {
					report('Lengths differ.');
					report('A.length=' + a.length);
					report('B.length=' + b.length);
			}
			return false;
		}
		// Nothing else worked, deep compare the contents.
		var aKeys = _keys(a);
		var bKeys = _keys(b);
		// Different object sizes?
		if (aKeys.length != bKeys.length) {
			if (doReport) {
				report('Different number of properties [' + aKeys.length + '], [' + bKeys.length + '].');
			}
			for ( var andex = 0; andex < aKeys.length; andex++) {
				if (doReport) {
					report('A [' + aKeys[andex] + ']=' + a[aKeys[andex]]);
				}
			}
			for ( var bndex = 0; bndex < bKeys.length; bndex++) {
				if (doReport) {
					report('B [' + bKeys[bndex] + ']=' + b[bKeys[bndex]]);
				}
			}
			return false;
		}
		// Recursive comparison of contents.
		for (var kndex = 0; kndex < aKeys.length; kndex++) {
			var key = aKeys[kndex];
			if (!(key in b) || !Jsonix.Util.Type.isEqual(a[key], b[key], report)) {
				if (doReport) {
					report('One of the properties differ.');
					report('Key: [' + key + '].');
					report('Left: [' + a[key] + '].');
					report('Right: [' + b[key] + '].');
				}
				return false;
			}
		}
		return true;
	},
	cloneObject : function (source, target)
	{
		target = target || {};
		for (var p in source)
		{
			if (source.hasOwnProperty(p))
			{
				target[p] = source[p];
			}
		}
		return target;
	},
	defaultValue : function()
	{
		var args = arguments;
		if (args.length === 0)
		{
			return undefined;
		}
		else
		{
			var defaultValue = args[args.length - 1];
			var typeOfDefaultValue = typeof defaultValue;
			for (var index = 0; index < args.length - 1; index++)
			{
				var candidateValue = args[index];
				if (typeof candidateValue === typeOfDefaultValue)
				{
					return candidateValue;
				}
			}
			return defaultValue;
			
		}
	}
};
Jsonix.Util.NumberUtils = {
	isInteger : function(value) {
		return Jsonix.Util.Type.isNumber(value) && ((value % 1) === 0);
	}
};
Jsonix.Util.StringUtils = {
	trim : (!!String.prototype.trim) ?
	function(str) {
		Jsonix.Util.Ensure.ensureString(str);
		return str.trim();
	} :
	function(str) {
		Jsonix.Util.Ensure.ensureString(str);
		return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	},
	/* isEmpty : function(str) {
		var wcm = Jsonix.Util.StringUtils.whitespaceCharactersMap;
		for (var index = 0; index < str.length; index++)
		{
			if (!wcm[str[index]])
			{
				return false;
			}
		}
		return true;
	}, */
	isEmpty : function(str) {
		var length = str.length;
		if (!length) {
			return true;
		}
		for (var index = 0; index < length; index++)
		{
			var c = str[index];
			if (c === ' ')
			{
				// skip
			}
			else if (c > '\u000D' && c < '\u0085')
			{
				return false;
			}
			else if (c < '\u00A0')
			{
				if (c < '\u0009')
				{
					return false;
				}
				else if (c > '\u0085')
				{
					return false;
				}
			}
			else if (c > '\u00A0')
			{
				if (c < '\u2028')
				{
					if (c < '\u180E')
					{
						if (c < '\u1680')
						{
							return false;
						}
						else if(c > '\u1680')
						{
							return false;
						}
					}
					else if (c > '\u180E')
					{
						if (c < '\u2000')
						{
							return false;
						}
						else if (c > '\u200A')
						{
							return false;
						}
					}
				}
				else if (c > '\u2029')
				{
					if (c < '\u205F')
					{
						if (c < '\u202F')
						{
							return false;
						}
						else if (c > '\u202F')
						{
							return false;
						}
					}
					else if (c > '\u205F')
					{
						if (c < '\u3000')
						{
							return false;
						}
						else if (c > '\u3000')
						{
							return false;
						}
					}
				}
			}
		}
		return true;
	},
	isNotBlank : function(str) {
		return Jsonix.Util.Type.isString(str) && !Jsonix.Util.StringUtils.isEmpty(str);
	},
	whitespaceCharacters: '\u0009\u000A\u000B\u000C\u000D \u0085\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u2028\u2029\u202F\u205F\u3000',
	whitespaceCharactersMap: {
		'\u0009' : true,
		'\u000A' : true,
		'\u000B' : true,
		'\u000C' : true,
		'\u000D' : true,
		' ' : true,
		'\u0085' : true,
		'\u00A0' : true,
		'\u1680' : true,
		'\u180E' : true,
		'\u2000' : true,
		'\u2001' : true,
		'\u2002' : true,
		'\u2003' : true,
		'\u2004' : true,
		'\u2005' : true,
		'\u2006' : true,
		'\u2007' : true,
		'\u2008' : true,
		'\u2009' : true,
		'\u200A' : true,
		'\u2028' : true,
		'\u2029' : true,
		'\u202F' : true,
		'\u205F' : true,
		'\u3000' : true
	},
	splitBySeparatorChars : function(str, separatorChars) {
		Jsonix.Util.Ensure.ensureString(str);
		Jsonix.Util.Ensure.ensureString(separatorChars);
		var len = str.length;
		if (len === 0) {
			return [];
		}
		if (separatorChars.length === 1)
		{
			return str.split(separatorChars);
		}
		else
		{
			var list = [];
			var sizePlus1 = 1;
			var i = 0;
			var start = 0;
			var match = false;
			var lastMatch = false;
			var max = -1;
			var preserveAllTokens = false;
			// standard case
				while (i < len) {
						if (separatorChars.indexOf(str.charAt(i)) >= 0) {
								if (match || preserveAllTokens) {
										lastMatch = true;
										if (sizePlus1++ == max) {
												i = len;
												lastMatch = false;
										}
										list.push(str.substring(start, i));
										match = false;
								}
								start = ++i;
								continue;
						}
						lastMatch = false;
						match = true;
						i++;
				}
				if (match || (preserveAllTokens && lastMatch)) {
					list.push(str.substring(start, i));
			}
			return list;
		}
	}
};
Jsonix.Util.Ensure = {
	ensureBoolean : function(value) {
		if (!Jsonix.Util.Type.isBoolean(value)) {
			throw new Error('Argument [' + value + '] must be a boolean.');
		}
	},
	ensureString : function(value) {
		if (!Jsonix.Util.Type.isString(value)) {
			throw new Error('Argument [' + value + '] must be a string.');
		}
	},
	ensureNumber : function(value) {
		if (!Jsonix.Util.Type.isNumber(value)) {
			throw new Error('Argument [' + value + '] must be a number.');
		}
	},
	ensureNumberOrNaN : function(value) {
		if (!Jsonix.Util.Type.isNumberOrNaN(value)) {
			throw new Error('Argument [' + value + '] must be a number or NaN.');
		}
	},
	ensureInteger : function(value) {
		if (!Jsonix.Util.Type.isNumber(value)) {
			throw new Error('Argument must be an integer, but it is not a number.');
		} else if (!Jsonix.Util.NumberUtils.isInteger(value)) {
			throw new Error('Argument [' + value + '] must be an integer.');
		}
	},
	ensureDate : function(value) {
		if (!(value instanceof Date)) {
			throw new Error('Argument [' + value + '] must be a date.');
		}
	},
	ensureObject : function(value) {
		if (!Jsonix.Util.Type.isObject(value)) {
			throw new Error('Argument [' + value + '] must be an object.');
		}
	},
	ensureArray : function(value) {
		if (!Jsonix.Util.Type.isArray(value)) {
			throw new Error('Argument [' + value + '] must be an array.');
		}
	},
	ensureFunction : function(value) {
		if (!Jsonix.Util.Type.isFunction(value)) {
			throw new Error('Argument [' + value + '] must be a function.');
		}
	},
	ensureExists : function(value) {
		if (!Jsonix.Util.Type.exists(value)) {
			throw new Error('Argument [' + value + '] does not exist.');
		}
	}
};
Jsonix.XML.QName = Jsonix.Class({
	key : null,
	namespaceURI : null,
	localPart : null,
	prefix : null,
	string : null,
	initialize : function(one, two, three) {
		var namespaceURI;
		var localPart;
		var prefix;
		var key;
		var string;

		if (!Jsonix.Util.Type.exists(two)) {
			namespaceURI = '';
			localPart = one;
			prefix = '';
		} else if (!Jsonix.Util.Type.exists(three)) {
			namespaceURI = Jsonix.Util.Type.exists(one) ? one : '';
			localPart = two;
			var colonPosition = two.indexOf(':');
			if (colonPosition > 0 && colonPosition < two.length) {
				prefix = two.substring(0, colonPosition);
				localPart = two.substring(colonPosition + 1);
			} else {
				prefix = '';
				localPart = two;
			}
		} else {
			namespaceURI = Jsonix.Util.Type.exists(one) ? one : '';
			localPart = two;
			prefix = Jsonix.Util.Type.exists(three) ? three : '';
		}
		this.namespaceURI = namespaceURI;
		this.localPart = localPart;
		this.prefix = prefix;

		this.key = (namespaceURI !== '' ? ('{' + namespaceURI + '}') : '') + localPart;
		this.string = (namespaceURI !== '' ? ('{' + namespaceURI + '}') : '') + (prefix !== '' ? (prefix + ':') : '') + localPart;
	},
	toString : function() {
		return this.string;
	},
	// foo:bar
	toCanonicalString: function(namespaceContext) {
		var canonicalPrefix = namespaceContext ? namespaceContext.getPrefix(this.namespaceURI, this.prefix) : this.prefix;
		return this.prefix + (this.prefix === '' ? '' : ':') + this.localPart;
	},
	clone : function() {
		return new Jsonix.XML.QName(this.namespaceURI, this.localPart, this.prefix);
	},
	equals : function(that) {
		if (!that) {
			return false;
		} else {
			return (this.namespaceURI == that.namespaceURI) && (this.localPart == that.localPart);
		}

	},
	CLASS_NAME : "Jsonix.XML.QName"
});
Jsonix.XML.QName.fromString = function(qNameAsString, namespaceContext, defaultNamespaceURI) {
	var leftBracket = qNameAsString.indexOf('{');
	var rightBracket = qNameAsString.lastIndexOf('}');
	var namespaceURI;
	var prefixedName;
	if ((leftBracket === 0) && (rightBracket > 0) && (rightBracket < qNameAsString.length)) {
		namespaceURI = qNameAsString.substring(1, rightBracket);
		prefixedName = qNameAsString.substring(rightBracket + 1);
	} else {
		namespaceURI = null;
		prefixedName = qNameAsString;
	}
	var colonPosition = prefixedName.indexOf(':');
	var prefix;
	var localPart;
	if (colonPosition > 0 && colonPosition < prefixedName.length) {
		prefix = prefixedName.substring(0, colonPosition);
		localPart = prefixedName.substring(colonPosition + 1);
	} else {
		prefix = '';
		localPart = prefixedName;
	}
	// If namespace URI was not set and we have a namespace context, try to find the namespace URI via this context
	if (namespaceURI === null && namespaceContext)
	{
		namespaceURI = namespaceContext.getNamespaceURI(prefix);
	}
	// If we don't have a namespace URI, assume '' by default
	// TODO document the assumption
	if (!Jsonix.Util.Type.isString(namespaceURI))
	{
		namespaceURI = defaultNamespaceURI || '';
	}
	return new Jsonix.XML.QName(namespaceURI, localPart, prefix);
};
Jsonix.XML.QName.fromObject = function(object) {
	Jsonix.Util.Ensure.ensureObject(object);
	if (object instanceof Jsonix.XML.QName || (Jsonix.Util.Type.isString(object.CLASS_NAME) && object.CLASS_NAME === 'Jsonix.XML.QName')) {
		return object;
	}
	var localPart = object.localPart||object.lp||null;
	Jsonix.Util.Ensure.ensureString(localPart);
	var namespaceURI = object.namespaceURI||object.ns||'';
	var prefix = object.prefix||object.p||'';
	return new Jsonix.XML.QName(namespaceURI, localPart, prefix);
};
Jsonix.XML.QName.fromObjectOrString = function(value, namespaceContext, defaultNamespaceURI) {
	if (Jsonix.Util.Type.isString(value))
	{
		return Jsonix.XML.QName.fromString(value, namespaceContext, defaultNamespaceURI);
	}
	else
	{
		return Jsonix.XML.QName.fromObject(value);
	}
};
Jsonix.XML.QName.key = function(namespaceURI, localPart) {
	Jsonix.Util.Ensure.ensureString(localPart);
	if (namespaceURI) {
		var colonPosition = localPart.indexOf(':');
		if (colonPosition > 0 && colonPosition < localPart.length) {
			localName = localPart.substring(colonPosition + 1);
		} else {
			localName = localPart;
		}
		return '{' + namespaceURI + '}' + localName;
	} else {
		return localPart;
	}
};
Jsonix.XML.Calendar = Jsonix.Class({
	year : NaN,
	month : NaN,
	day : NaN,
	hour : NaN,
	minute : NaN,
	second : NaN,
	fractionalSecond : NaN,
	timezone : NaN,
	initialize : function(data) {
		Jsonix.Util.Ensure.ensureObject(data);
		// Year
		if (Jsonix.Util.Type.exists(data.year)) {
			Jsonix.Util.Ensure.ensureInteger(data.year);
			if (data.year >= -9999 && data.year <= 9999) {
				this.year = data.year;
			} else {
				throw new Error('Invalid year [' + data.year + '].');
			}

		} else {
			this.year = NaN;
		}
		// Month
		if (Jsonix.Util.Type.exists(data.month)) {
			Jsonix.Util.Ensure.ensureInteger(data.month);
			if (data.month >= 1 && data.month <= 12) {
				this.month = data.month;
			} else {
				throw new Error('Invalid month [' + data.month + '].');
			}

		} else {
			this.month = NaN;
		}
		// Day
		if (Jsonix.Util.Type.exists(data.day)) {
			Jsonix.Util.Ensure.ensureInteger(data.day);
			if (data.day >= 1 && data.day <= 31) {
				this.day = data.day;
			} else {
				throw new Error('Invalid day [' + data.day + '].');
			}

		} else {
			this.day = NaN;
		}
		// Hour
		if (Jsonix.Util.Type.exists(data.hour)) {
			Jsonix.Util.Ensure.ensureInteger(data.hour);
			if (data.hour >= 0 && data.hour <= 23) {
				this.hour = data.hour;
			} else {
				throw new Error('Invalid hour [' + data.hour + '].');
			}

		} else {
			this.hour = NaN;
		}
		// Minute
		if (Jsonix.Util.Type.exists(data.minute)) {
			Jsonix.Util.Ensure.ensureInteger(data.minute);
			if (data.minute >= 0 && data.minute <= 59) {
				this.minute = data.minute;
			} else {
				throw new Error('Invalid minute [' + data.minute + '].');
			}

		} else {
			this.minute = NaN;
		}
		// Second
		if (Jsonix.Util.Type.exists(data.second)) {
			Jsonix.Util.Ensure.ensureInteger(data.second);
			if (data.second >= 0 && data.second <= 59) {
				this.second = data.second;
			} else {
				throw new Error('Invalid second [' + data.second + '].');
			}

		} else {
			this.second = NaN;
		}
		// Fractional second
		if (Jsonix.Util.Type.exists(data.fractionalSecond)) {
			Jsonix.Util.Ensure.ensureNumber(data.fractionalSecond);
			if (data.fractionalSecond >= 0 && data.fractionalSecond < 1) {
				this.fractionalSecond = data.fractionalSecond;
			} else {
				throw new Error('Invalid fractional second [' + data.fractionalSecond + '].');
			}

		} else {
			this.fractionalSecond = NaN;
		}
		// Timezone
		if (Jsonix.Util.Type.exists(data.timezone)) {
			if (Jsonix.Util.Type.isNaN(data.timezone)) {
				this.timezone = NaN;
			} else {
				Jsonix.Util.Ensure.ensureInteger(data.timezone);
				if (data.timezone >= -1440 && data.timezone < 1440) {
					this.timezone = data.timezone;
				} else {
					throw new Error('Invalid timezone [' + data.timezone + '].');
				}
			}
		} else {
			this.timezone = NaN;
		}
	},
	CLASS_NAME : "Jsonix.XML.Calendar"
});
Jsonix.XML.Calendar.fromObject = function(object) {
	Jsonix.Util.Ensure.ensureObject(object);
	if (Jsonix.Util.Type.isString(object.CLASS_NAME) && object.CLASS_NAME === 'Jsonix.XML.Calendar') {
		return object;
	}
	return new Jsonix.XML.Calendar(object);
};
Jsonix.XML.Input = Jsonix.Class({
	root : null,
	node : null,
	attributes : null,
	eventType : null,
	pns : null,
	initialize : function(node) {
		Jsonix.Util.Ensure.ensureExists(node);
		this.root = node;
		var rootPnsItem =
		{
			'' : ''
		};
		rootPnsItem[Jsonix.XML.XMLNS_P] = Jsonix.XML.XMLNS_NS;
		this.pns = [rootPnsItem];
	},
	hasNext : function() {
		// No current node, we've not started yet
		if (this.node === null) {
			return true;
		} else if (this.node === this.root) {
			var nodeType = this.node.nodeType;
			// Root node is document, last event type is END_DOCUMENT
			if (nodeType === 9 && this.eventType === 8) {
				return false;
			}
			// Root node is element, last event type is END_ELEMENT
			else if (nodeType === 1 && this.eventType === 2) {
				return false;
			} else {
				return true;
			}
		} else {
			return true;
		}
	},
	next : function() {
		if (this.eventType === null) {
			return this.enter(this.root);
		}
		// START_DOCUMENT
		if (this.eventType === 7) {
			var documentElement = this.node.documentElement;
			if (documentElement) {
				return this.enter(documentElement);
			} else {
				return this.leave(this.node);
			}
		} else if (this.eventType === 1) {
			var firstChild = this.node.firstChild;
			if (firstChild) {
				return this.enter(firstChild);
			} else {
				return this.leave(this.node);
			}
		} else if (this.eventType === 2) {
			var nextSibling = this.node.nextSibling;
			if (nextSibling) {
				return this.enter(nextSibling);
			} else {
				return this.leave(this.node);
			}
		} else {
			return this.leave(this.node);
		}
	},
	enter : function(node) {
		var nodeType = node.nodeType;
		this.node = node;
		this.attributes = null;
		// Document node
		if (nodeType === 1) {
			// START_ELEMENT
			this.eventType = 1;
			this.pushNS(node);
			return this.eventType;
		} else if (nodeType === 2) {
			// ATTRIBUTE
			this.eventType = 10;
			return this.eventType;
		} else if (nodeType === 3) {
			var nodeValue = node.nodeValue;
			if (Jsonix.Util.StringUtils.isEmpty(nodeValue)) {
				// SPACE
				this.eventType = 6;
			} else {
				// CHARACTERS
				this.eventType = 4;
			}
			return this.eventType;
		} else if (nodeType === 4) {
			// CDATA
			this.eventType = 12;
			return this.eventType;
		} else if (nodeType === 5) {
			// ENTITY_REFERENCE_NODE = 5
			// ENTITY_REFERENCE
			this.eventType = 9;
			return this.eventType;
		} else if (nodeType === 6) {
			// ENTITY_DECLARATION
			this.eventType = 15;
			return this.eventType;
		} else if (nodeType === 7) {
			// PROCESSING_INSTRUCTION
			this.eventType = 3;
			return this.eventType;
		} else if (nodeType === 8) {
			// COMMENT
			this.eventType = 5;
			return this.eventType;
		} else if (nodeType === 9) {
			// START_DOCUMENT
			this.eventType = 7;
			return this.eventType;
		} else if (nodeType === 10) {
			// DTD
			this.eventType = 12;
			return this.eventType;
		} else if (nodeType === 12) {
			// NOTATION_DECLARATION
			this.eventType = 14;
			return this.eventType;
		} else {
			// DOCUMENT_FRAGMENT_NODE = 11
			throw new Error("Node type [" + nodeType + '] is not supported.');
		}
	},
	leave : function(node) {
		if (node.nodeType === 9) {
			if (this.eventType == 8) {
				throw new Error("Invalid state.");
			} else {
				this.node = node;
				this.attributes = null;
				// END_ELEMENT
				this.eventType = 8;
				return this.eventType;
			}
		} else if (node.nodeType === 1) {
			if (this.eventType == 2) {
				var nextSibling = node.nextSibling;
				if (nextSibling) {
					return this.enter(nextSibling);
				}
			} else {
				this.node = node;
				this.attributes = null;
				// END_ELEMENT
				this.eventType = 2;
				this.popNS();
				return this.eventType;
			}
		}

		var nextSibling1 = node.nextSibling;
		if (nextSibling1) {
			return this.enter(nextSibling1);
		} else {
			var parentNode = node.parentNode;
			this.node = parentNode;
			this.attributes = null;
			if (parentNode.nodeType === 9) {
				this.eventType = 8;
			} else {
				this.eventType = 2;
			}
			return this.eventType;
		}
	},
	getName : function() {
		var node = this.node;
		if (Jsonix.Util.Type.isString(node.nodeName)) {
			if (Jsonix.Util.Type.isString(node.namespaceURI)) {
				return new Jsonix.XML.QName(node.namespaceURI, node.nodeName);
			} else {
				return new Jsonix.XML.QName(node.nodeName);
			}
		} else {
			return null;
		}
	},
	getNameKey : function() {
		var node = this.node;
		if (Jsonix.Util.Type.isString(node.nodeName)) {
			return Jsonix.XML.QName.key(node.namespaceURI, node.nodeName);
		} else {
			return null;
		}
	},
	getText : function() {
		return this.node.nodeValue;
	},
	nextTag : function() {
		var et = this.next();
		// TODO isWhiteSpace
		while (et === 7 || et === 4 || et === 12 || et === 6 || et === 3 || et === 5) {
			et = this.next();
		}
		if (et !== 1 && et !== 2) {
			// TODO location
			throw new Error('Expected start or end tag.');
		}
		return et;
	},
	skipElement : function() {
		if (this.eventType !== Jsonix.XML.Input.START_ELEMENT) {
			throw new Error("Parser must be on START_ELEMENT to skip element.");
		}
		var numberOfOpenTags = 1;
		var et;
		do {
			et = this.nextTag();
		    numberOfOpenTags += (et === Jsonix.XML.Input.START_ELEMENT) ? 1 : -1;
		  } while (numberOfOpenTags > 0);
		return et;
	},	
	getElementText : function() {
		if (this.eventType != 1) {
			throw new Error("Parser must be on START_ELEMENT to read next text.");
		}
		var et = this.next();
		var content = '';
		while (et !== 2) {
			if (et === 4 || et === 12 || et === 6 || et === 9) {
				content = content + this.getText();
			} else if (et === 3 || et === 5) {
				// Skip PI or comment
			} else if (et === 8) {
				// End document
				throw new Error("Unexpected end of document when reading element text content.");
			} else if (et === 1) {
				// End element
				// TODO location
				throw new Error("Element text content may not contain START_ELEMENT.");
			} else {
				// TODO location
				throw new Error("Unexpected event type [" + et + "].");
			}
			et = this.next();
		}
		return content;
	},
	retrieveElement : function () {
		var element;
		if (this.eventType === 1) {
			element = this.node;
		} else if (this.eventType === 10) {
			element = this.node.parentNode;
		} else {
			throw new Error("Element can only be retrieved for START_ELEMENT or ATTRIBUTE nodes.");
		}
		return element;
	},
	retrieveAttributes : function () {
		var attributes;
		if (this.attributes)
		{
			attributes = this.attributes;
		} else if (this.eventType === 1) {
			attributes = this.node.attributes;
			this.attributes = attributes;
		} else if (this.eventType === 10) {
			attributes = this.node.parentNode.attributes;
			this.attributes = attributes;
		} else {
			throw new Error("Attributes can only be retrieved for START_ELEMENT or ATTRIBUTE nodes.");
		}
		return attributes;
	},
	getAttributeCount : function() {
		var attributes = this.retrieveAttributes();
		return attributes.length;
	},
	getAttributeName : function(index) {
		var attributes = this.retrieveAttributes();
		if (index < 0 || index >= attributes.length) {
			throw new Error("Invalid attribute index [" + index + "].");
		}
		var attribute = attributes[index];
		if (Jsonix.Util.Type.isString(attribute.namespaceURI)) {
			return new Jsonix.XML.QName(attribute.namespaceURI, attribute.nodeName);
		} else {
			return new Jsonix.XML.QName(attribute.nodeName);
		}
	},
	getAttributeNameKey : function(index) {
		var attributes = this.retrieveAttributes();
		if (index < 0 || index >= attributes.length) {
			throw new Error("Invalid attribute index [" + index + "].");
		}
		var attribute = attributes[index];

		return Jsonix.XML.QName.key(attribute.namespaceURI, attribute.nodeName);
	},
	getAttributeValue : function(index) {
		var attributes = this.retrieveAttributes();
		if (index < 0 || index >= attributes.length) {
			throw new Error("Invalid attribute index [" + index + "].");
		}
		var attribute = attributes[index];
		return attribute.value;
	},
	getAttributeValueNS : null,
	getAttributeValueNSViaElement : function(namespaceURI, localPart) {
		var element = this.retrieveElement();
		return element.getAttributeNS(namespaceURI, localPart);
	},
	getAttributeValueNSViaAttribute : function(namespaceURI, localPart) {
		var attributeNode = this.getAttributeNodeNS(namespaceURI, localPart);
		if (Jsonix.Util.Type.exists(attributeNode)) {
			return attributeNode.nodeValue;
		}
		else
		{
			return null;
		}
	},
	getAttributeNodeNS : null,
	getAttributeNodeNSViaElement : function(namespaceURI, localPart) {
		var element = this.retrieveElement();
		return element.getAttributeNodeNS(namespaceURI, localPart);
	},
	getAttributeNodeNSViaAttributes : function(namespaceURI, localPart) {
		var attributeNode = null;
		var attributes = this.retrieveAttributes();
		var potentialNode, fullName;
		for (var i = 0, len = attributes.length; i < len; ++i) {
			potentialNode = attributes[i];
			if (potentialNode.namespaceURI === namespaceURI) {
				fullName = (potentialNode.prefix) ? (potentialNode.prefix + ':' + localPart) : localPart;
				if (fullName === potentialNode.nodeName) {
					attributeNode = potentialNode;
					break;
				}
			}
		}
		return attributeNode;
	},
	getElement : function() {
		if (this.eventType === 1 || this.eventType === 2) {
			// Go to the END_ELEMENT
			this.eventType = 2;
			return this.node;
		} else {
			throw new Error("Parser must be on START_ELEMENT or END_ELEMENT to return current element.");
		}
	},
	pushNS : function (node) {
		var pindex = this.pns.length - 1;
		var parentPnsItem = this.pns[pindex];
		var pnsItem = Jsonix.Util.Type.isObject(parentPnsItem) ? pindex : parentPnsItem;
		this.pns.push(pnsItem);
		pindex++;
		var reference = true;
		if (node.attributes)
		{
			var attributes = node.attributes;
			var alength = attributes.length;
			if (alength > 0)
			{
				// If given node has attributes
				for (var aindex = 0; aindex < alength; aindex++)
				{
					var attribute = attributes[aindex];
					var attributeName = attribute.nodeName;
					var p = null;
					var ns = null;
					var isNS = false;
					if (attributeName === 'xmlns')
					{
						p = '';
						ns = attribute.value;
						isNS = true;
					}
					else if (attributeName.substring(0, 6) === 'xmlns:')
					{
						p = attributeName.substring(6);
						ns = attribute.value;
						isNS = true;
					}
					// Attribute is a namespace declaration
					if (isNS)
					{
						if (reference)
						{
							pnsItem = Jsonix.Util.Type.cloneObject(this.pns[pnsItem], {});
							this.pns[pindex] = pnsItem;
							reference = false;
						}
						pnsItem[p] = ns;
					}
				}
			}
		}		
	},
	popNS : function () {
		this.pns.pop();
	},
	getNamespaceURI : function (p) {
		var pindex = this.pns.length - 1;
		var pnsItem = this.pns[pindex];
		pnsItem = Jsonix.Util.Type.isObject(pnsItem) ? pnsItem : this.pns[pnsItem];
		return pnsItem[p];
	},
	CLASS_NAME : "Jsonix.XML.Input"

});

Jsonix.XML.Input.prototype.getAttributeValueNS = (Jsonix.DOM.isDomImplementationAvailable()) ? Jsonix.XML.Input.prototype.getAttributeValueNSViaElement : Jsonix.XML.Input.prototype.getAttributeValueNSViaAttribute;
Jsonix.XML.Input.prototype.getAttributeNodeNS = (Jsonix.DOM.isDomImplementationAvailable()) ? Jsonix.XML.Input.prototype.getAttributeNodeNSViaElement : Jsonix.XML.Input.prototype.getAttributeNodeNSViaAttributes;

Jsonix.XML.Input.START_ELEMENT = 1;
Jsonix.XML.Input.END_ELEMENT = 2;
Jsonix.XML.Input.PROCESSING_INSTRUCTION = 3;
Jsonix.XML.Input.CHARACTERS = 4;
Jsonix.XML.Input.COMMENT = 5;
Jsonix.XML.Input.SPACE = 6;
Jsonix.XML.Input.START_DOCUMENT = 7;
Jsonix.XML.Input.END_DOCUMENT = 8;
Jsonix.XML.Input.ENTITY_REFERENCE = 9;
Jsonix.XML.Input.ATTRIBUTE = 10;
Jsonix.XML.Input.DTD = 11;
Jsonix.XML.Input.CDATA = 12;
Jsonix.XML.Input.NAMESPACE = 13;
Jsonix.XML.Input.NOTATION_DECLARATION = 14;
Jsonix.XML.Input.ENTITY_DECLARATION = 15;

Jsonix.XML.Output = Jsonix.Class({
	document : null,
	documentElement : null,
	node : null,
	nodes : null,
	nsp : null,
	pns : null,
	namespacePrefixIndex : 0,
	xmldom : null,
	initialize : function(options) {
		// REWORK
		if (typeof ActiveXObject !== 'undefined') {
			this.xmldom = new ActiveXObject("Microsoft.XMLDOM");
		} else {
			this.xmldom = null;
		}
		this.nodes = [];
		var rootNspItem =
		{
			'' : ''
		};
		rootNspItem[Jsonix.XML.XMLNS_NS] = Jsonix.XML.XMLNS_P;
		if (Jsonix.Util.Type.isObject(options)) {
			if (Jsonix.Util.Type.isObject(options.namespacePrefixes)) {
				Jsonix.Util.Type.cloneObject(options.namespacePrefixes, rootNspItem);
			}
		}
		this.nsp = [rootNspItem];
		var rootPnsItem =
		{
			'' : ''
		};
		rootPnsItem[Jsonix.XML.XMLNS_P] = Jsonix.XML.XMLNS_NS;
		this.pns = [rootPnsItem];
	},
	destroy : function() {
		this.xmldom = null;
	},
	writeStartDocument : function() {
		// TODO Check
		var doc = Jsonix.DOM.createDocument();
		this.document = doc;
		return this.push(doc);
	},
	writeEndDocument : function() {
		return this.pop();

	},
	writeStartElement : function(name) {
		Jsonix.Util.Ensure.ensureObject(name);
		var localPart = name.localPart || name.lp || null;
		Jsonix.Util.Ensure.ensureString(localPart);
		var ns = name.namespaceURI || name.ns || null;
		var namespaceURI = Jsonix.Util.Type.isString(ns) ? ns : '';

		var p = name.prefix || name.p;
		var prefix = this.getPrefix(namespaceURI, p);

		var qualifiedName = (!prefix ? localPart : prefix + ':' + localPart);

		var element;
		if (Jsonix.Util.Type.isFunction(this.document.createElementNS))	{
			element = this.document.createElementNS(namespaceURI, qualifiedName);
		}
		else if (this.xmldom) {
			element = this.xmldom.createNode(1, qualifiedName, namespaceURI);

		} else {
			throw new Error("Could not create an element node.");
		}
		this.peek().appendChild(element);
		this.push(element);
		this.declareNamespace(namespaceURI, prefix);
		if (this.documentElement === null)
		{
			this.documentElement = element;
			this.declareNamespaces();
		}
		return element;
	},
	writeEndElement : function() {
		return this.pop();
	},
	writeCharacters : function(text) {
		var node;
		if (Jsonix.Util.Type.isFunction(this.document.createTextNode))	{
			node = this.document.createTextNode(text);
		}
		else if (this.xmldom) {
			node = this.xmldom.createTextNode(text);
		} else {
			throw new Error("Could not create a text node.");
		}
		this.peek().appendChild(node);
		return node;

	},
	writeAttribute : function(name, value) {
		Jsonix.Util.Ensure.ensureString(value);
		Jsonix.Util.Ensure.ensureObject(name);
		var localPart = name.localPart || name.lp || null;
		Jsonix.Util.Ensure.ensureString(localPart);
		var ns = name.namespaceURI || name.ns || null;
		var namespaceURI = Jsonix.Util.Type.isString(ns) ? ns : '';
		var p = name.prefix || name.p || null;
		var prefix = this.getPrefix(namespaceURI, p);

		var qualifiedName = (!prefix ? localPart : prefix + ':' + localPart);

		var node = this.peek();

		if (namespaceURI === '') {
			node.setAttribute(qualifiedName, value);
		} else {
			if (node.setAttributeNS) {
				node.setAttributeNS(namespaceURI, qualifiedName, value);
			} else {
				if (this.xmldom) {
					var attribute = this.document.createNode(2, qualifiedName, namespaceURI);
					attribute.nodeValue = value;
					node.setAttributeNode(attribute);
				}
				else if (namespaceURI === Jsonix.XML.XMLNS_NS)
				{
					// XMLNS namespace may be processed unqualified
					node.setAttribute(qualifiedName, value);
				}
				else
				{
					throw new Error("The [setAttributeNS] method is not implemented");
				}
			}
			this.declareNamespace(namespaceURI, prefix);
		}
		
	},
	writeNode : function(node) {
		var importedNode;
		if (Jsonix.Util.Type.exists(this.document.importNode)) {
			importedNode = this.document.importNode(node, true);
		} else {
			importedNode = node;
		}
		this.peek().appendChild(importedNode);
		return importedNode;
	},
	push : function(node) {
		this.nodes.push(node);
		this.pushNS();
		return node;
	},
	peek : function() {
		return this.nodes[this.nodes.length - 1];
	},
	pop : function() {
		this.popNS();
		var result = this.nodes.pop();
		return result;
	},
	pushNS : function ()
	{
		var nindex = this.nsp.length - 1;
		var pindex = this.pns.length - 1;
		var parentNspItem = this.nsp[nindex];
		var parentPnsItem = this.pns[pindex];
		var nspItem = Jsonix.Util.Type.isObject(parentNspItem) ? nindex : parentNspItem;
		var pnsItem = Jsonix.Util.Type.isObject(parentPnsItem) ? pindex : parentPnsItem;
		this.nsp.push(nspItem);
		this.pns.push(pnsItem);
	},
	popNS : function ()
	{
		this.nsp.pop();
		this.pns.pop();
	},
	declareNamespaces : function ()
	{
		var index = this.nsp.length - 1;
		var nspItem = this.nsp[index];
		nspItem = Jsonix.Util.Type.isNumber(nspItem) ? this.nsp[nspItem] : nspItem;
		var ns, p;
		for (ns in nspItem)
		{
			if (nspItem.hasOwnProperty(ns))
			{
				p = nspItem[ns];
				this.declareNamespace(ns, p);
			}
		}
	},
	declareNamespace : function (ns, p)
	{
		var index = this.pns.length - 1;
		var pnsItem = this.pns[index];
		var reference;
		if (Jsonix.Util.Type.isNumber(pnsItem))
		{
			// Resolve the reference
			reference = true;
			pnsItem = this.pns[pnsItem];
		}
		else
		{
			reference = false;
		}
		// If this prefix is mapped to a different namespace and must be redeclared
		if (pnsItem[p] !== ns)
		{
			if (p === '')
			{
				this.writeAttribute({lp : Jsonix.XML.XMLNS_P}, ns);
			}
			else
			{
				this.writeAttribute({ns : Jsonix.XML.XMLNS_NS, lp : p, p : Jsonix.XML.XMLNS_P}, ns);
			}
			if (reference)
			{
				// If this was a reference, clone it and replace the reference
				pnsItem = Jsonix.Util.Type.cloneObject(pnsItem, {});
				this.pns[index] = pnsItem;
			}
			pnsItem[p] = ns;
		}
	},
	getPrefix : function (ns, p)
	{
		var index = this.nsp.length - 1;
		var nspItem = this.nsp[index];
		var reference;
		if (Jsonix.Util.Type.isNumber(nspItem))
		{
			// This is a reference, the item is the index of the parent item
			reference = true;
			nspItem = this.nsp[nspItem];
		}
		else
		{
			reference = false;
		}
		if (Jsonix.Util.Type.isString(p))
		{
			var oldp = nspItem[ns];
			// If prefix is already declared and equals the proposed prefix 
			if (p === oldp)
			{
				// Nothing to do
			}
			else
			{
				// If this was a reference, we have to clone it now
				if (reference)
				{
					nspItem = Jsonix.Util.Type.cloneObject(nspItem, {});
					this.nsp[index] = nspItem;
				}
				nspItem[ns] = p;
			}
		}
		else
		{
			p = nspItem[ns];
			if (!Jsonix.Util.Type.exists(p)) {
				p = 'p' + (this.namespacePrefixIndex++);
				// If this was a reference, we have to clone it now
				if (reference)
				{
					nspItem = Jsonix.Util.Type.cloneObject(nspItem, {});
					this.nsp[index] = nspItem;
				}
				nspItem[ns] = p;
			}
		}
		return p;
	},
	getNamespaceURI : function (p) {
		var pindex = this.pns.length - 1;
		var pnsItem = this.pns[pindex];
		pnsItem = Jsonix.Util.Type.isObject(pnsItem) ? pnsItem : this.pns[pnsItem];
		return pnsItem[p];
	},
	CLASS_NAME : "Jsonix.XML.Output"
});
Jsonix.Mapping = {};
Jsonix.Mapping.Style = Jsonix.Class({
	marshaller : null,
	unmarshaller : null,
	module : null,
	elementInfo : null,
	classInfo : null,
	enumLeafInfo : null,
	anyAttributePropertyInfo : null,
	anyElementPropertyInfo : null,
	attributePropertyInfo : null,
	elementMapPropertyInfo : null,
	elementPropertyInfo : null,
	elementsPropertyInfo : null,
	elementRefPropertyInfo : null,
	elementRefsPropertyInfo : null,
	valuePropertyInfo : null,
	initialize : function() {
	},
	CLASS_NAME : 'Jsonix.Mapping.Style'
});

Jsonix.Mapping.Style.STYLES = {};
Jsonix.Mapping.Styled = Jsonix.Class({
	mappingStyle : null,
	initialize : function(options) {
		if (Jsonix.Util.Type.exists(options)) {
			Jsonix.Util.Ensure.ensureObject(options);
			if (Jsonix.Util.Type.isString(options.mappingStyle)) {
				var mappingStyle = Jsonix.Mapping.Style.STYLES[options.mappingStyle];
				if (!mappingStyle) {
					throw new Error("Mapping style [" + options.mappingStyle + "] is not known.");
				}
				this.mappingStyle = mappingStyle;
			} else if (Jsonix.Util.Type.isObject(options.mappingStyle)) {
				this.mappingStyle = options.mappingStyle;
			}
		}
		if (!this.mappingStyle) {
			this.mappingStyle = Jsonix.Mapping.Style.STYLES.standard;
		}
	},
	CLASS_NAME : 'Jsonix.Mapping.Styled'
});
Jsonix.Binding = {};
Jsonix.Binding.Marshalls = {
};

Jsonix.Binding.Marshalls.Element = Jsonix.Class({
	marshalElement : function(value, context, output, scope) {
		var elementValue = this.convertToTypedNamedValue(value, context, output, scope);
		var declaredTypeInfo = elementValue.typeInfo;
		var typeInfo = declaredTypeInfo;
		if (Jsonix.Util.Type.exists(declaredTypeInfo)) {
			output.writeStartElement(elementValue.name);
			if (Jsonix.Util.Type.exists(elementValue.value)) {
				if (context.supportXsiType) {
					var actualTypeInfo = context.getTypeInfoByValue(elementValue.value);
					if (actualTypeInfo && actualTypeInfo.typeName && declaredTypeInfo !== actualTypeInfo) {
						typeInfo = actualTypeInfo;
						var xsiTypeName = actualTypeInfo.typeName;
						var xsiType = Jsonix.Schema.XSD.QName.INSTANCE.print(xsiTypeName, context, output, scope);
						output.writeAttribute(Jsonix.Schema.XSI.TYPE_QNAME, xsiType);
					}
				}
				typeInfo.marshal(elementValue.value, context, output, scope);
			}
			output.writeEndElement();
		} else {
			throw new Error("Element [" + elementValue.name.key + "] is not known in this context.");
		}
	},
	getTypeInfoByElementName : function(name, context, scope) {
		var elementInfo = context.getElementInfo(name, scope);
		if (Jsonix.Util.Type.exists(elementInfo)) {
			return elementInfo.typeInfo;
		} else {
			return undefined;
		}
	}
});
Jsonix.Binding.Marshalls.Element.AsElementRef = Jsonix.Class({
	convertToTypedNamedValue : function(value, context, output, scope) {
		Jsonix.Util.Ensure.ensureObject(value);
		var elementValue = this.convertToNamedValue(value, context, output, scope);
		return {
			name : elementValue.name,
			value : elementValue.value,
			typeInfo : this.getTypeInfoByElementName(elementValue.name, context, scope)
		};
	},
	convertToNamedValue : function(elementValue, context, output, scope) {
		var name;
		var value;
		if (Jsonix.Util.Type.exists(elementValue.name) && !Jsonix.Util.Type.isUndefined(elementValue.value)) {
			name = Jsonix.XML.QName.fromObjectOrString(elementValue.name, context);
			value = Jsonix.Util.Type.exists(elementValue.value) ? elementValue.value : null;
			return {
				name : name,
				value : value
			};
		} else {
			for ( var propertyName in elementValue) {
				if (elementValue.hasOwnProperty(propertyName)) {
					name = Jsonix.XML.QName.fromObjectOrString(propertyName, context);
					value = elementValue[propertyName];
					return {
						name : name,
						value : value
					};
				}
			}
		}
		throw new Error("Invalid element value [" + elementValue + "]. Element values must either have {name:'myElementName', value: elementValue} or {myElementName:elementValue} structure.");
	}
});

Jsonix.Binding.Unmarshalls = {
};

Jsonix.Binding.Unmarshalls.WrapperElement = Jsonix.Class({
	mixed : false,
	unmarshalWrapperElement : function(context, input, scope, callback) {
		var et = input.next();
		while (et !== Jsonix.XML.Input.END_ELEMENT) {
			if (et === Jsonix.XML.Input.START_ELEMENT) {
				this.unmarshalElement(context, input, scope, callback);
			} else
			// Characters
			if (this.mixed && (et === Jsonix.XML.Input.CHARACTERS || et === Jsonix.XML.Input.CDATA || et === Jsonix.XML.Input.ENTITY_REFERENCE)) {
				callback(input.getText());
			} else if (et === Jsonix.XML.Input.SPACE || et === Jsonix.XML.Input.COMMENT || et === Jsonix.XML.Input.PROCESSING_INSTRUCTION) {
				// Skip whitespace
			} else {
				throw new Error("Illegal state: unexpected event type [" + et + "].");
			}
			et = input.next();
		}
	}
});

Jsonix.Binding.Unmarshalls.Element = Jsonix.Class({
	allowTypedObject : true,
	allowDom : false,
	unmarshalElement : function(context, input, scope, callback) {
		if (input.eventType != 1) {
			throw new Error("Parser must be on START_ELEMENT to read next element.");
		}
		var typeInfo = this.getTypeInfoByInputElement(context, input, scope);
		var name = input.getName();
		var elementValue;
		if (this.allowTypedObject && Jsonix.Util.Type.exists(typeInfo)) {
			var value = typeInfo.unmarshal(context, input, scope);
			var typedNamedValue = {
				name : name,
				value : value,
				typeInfo : typeInfo
			};
			elementValue = this.convertFromTypedNamedValue(typedNamedValue, context, input, scope);
		} else if (this.allowDom) {
			elementValue = input.getElement();
		} else {
			// TODO better exception
			throw new Error("Element [" + name.toString() + "] is not known in this context and property does not allow DOM.");
		}
		callback(elementValue);
	},
	getTypeInfoByInputElement : function(context, input, scope) {
		var xsiTypeInfo = null;
		if (context.supportXsiType) {
			var xsiType = input.getAttributeValueNS(Jsonix.Schema.XSI.NAMESPACE_URI, Jsonix.Schema.XSI.TYPE);
			if (Jsonix.Util.StringUtils.isNotBlank(xsiType)) {
				var xsiTypeName = Jsonix.Schema.XSD.QName.INSTANCE.parse(xsiType, context, input, scope);
				xsiTypeInfo = context.getTypeInfoByTypeNameKey(xsiTypeName.key);
			}
		}
		var name = input.getName();
		var typeInfo = xsiTypeInfo ? xsiTypeInfo : this.getTypeInfoByElementName(name, context, scope);
		return typeInfo;
	},
	getTypeInfoByElementName : function(name, context, scope) {
		var elementInfo = context.getElementInfo(name, scope);
		if (Jsonix.Util.Type.exists(elementInfo)) {
			return elementInfo.typeInfo;
		} else {
			return undefined;
		}
	}
});

Jsonix.Binding.Unmarshalls.Element.AsElementRef = Jsonix.Class({
	convertFromTypedNamedValue : function(typedNamedValue, context, input, scope) {
		return {
			name : typedNamedValue.name,
			value : typedNamedValue.value
		};
	}
});

Jsonix.Binding.Unmarshalls.Element.AsSimplifiedElementRef = Jsonix.Class({
	convertFromTypedNamedValue : function(typedNamedValue, context, input, scope) {
		var propertyName = typedNamedValue.name.toCanonicalString(context);
		var value = {};
		value[propertyName] = typedNamedValue.value;
		return value;
	}
});
Jsonix.Binding.Marshaller = Jsonix.Class(Jsonix.Binding.Marshalls.Element, Jsonix.Binding.Marshalls.Element.AsElementRef, {
	context : null,
	initialize : function(context) {
		Jsonix.Util.Ensure.ensureObject(context);
		this.context = context;
	},
	marshalString : function(value) {
		var doc = this.marshalDocument(value);
		var text = Jsonix.DOM.serialize(doc);
		return text;
	},
	marshalDocument : function(value) {
		var output = new Jsonix.XML.Output({
			namespacePrefixes : this.context.namespacePrefixes
		});

		var doc = output.writeStartDocument();
		this.marshalElement(value, this.context, output, undefined);
		output.writeEndDocument();
		return doc;
	},
	CLASS_NAME : 'Jsonix.Binding.Marshaller'
});
Jsonix.Binding.Marshaller.Simplified = Jsonix.Class(Jsonix.Binding.Marshaller, {
	CLASS_NAME : 'Jsonix.Binding.Marshaller.Simplified'
});
Jsonix.Binding.Unmarshaller = Jsonix.Class(Jsonix.Binding.Unmarshalls.Element, Jsonix.Binding.Unmarshalls.Element.AsElementRef, {
	context : null,
	allowTypedObject : true,
	allowDom : false,
	initialize : function(context) {
		Jsonix.Util.Ensure.ensureObject(context);
		this.context = context;
	},
	unmarshalString : function(text) {
		Jsonix.Util.Ensure.ensureString(text);
		var doc = Jsonix.DOM.parse(text);
		return this.unmarshalDocument(doc);
	},
	unmarshalURL : function(url, callback, options) {
		Jsonix.Util.Ensure.ensureString(url);
		Jsonix.Util.Ensure.ensureFunction(callback);
		if (Jsonix.Util.Type.exists(options)) {
			Jsonix.Util.Ensure.ensureObject(options);
		}
		that = this;
		Jsonix.DOM.load(url, function(doc) {
			callback(that.unmarshalDocument(doc));
		}, options);
	},
	unmarshalFile : function(fileName, callback, options) {
		if (typeof _jsonix_fs === 'undefined') {
			throw new Error("File unmarshalling is only available in environments which support file systems.");
		}
		Jsonix.Util.Ensure.ensureString(fileName);
		Jsonix.Util.Ensure.ensureFunction(callback);
		if (Jsonix.Util.Type.exists(options)) {
			Jsonix.Util.Ensure.ensureObject(options);
		}
		that = this;
		var fs = _jsonix_fs;
		fs.readFile(fileName, options, function(err, data) {
			if (err) {
				throw err;
			} else {
				var text = data.toString();
				var doc = Jsonix.DOM.parse(text);
				callback(that.unmarshalDocument(doc));
			}
		});
	},
	unmarshalDocument : function(doc, scope) {
		var input = new Jsonix.XML.Input(doc);
		var result = null;
		var callback = function(_result) {
			result = _result;
		};
		input.nextTag();
		this.unmarshalElement(this.context, input, scope, callback);
		return result;

	},
	CLASS_NAME : 'Jsonix.Binding.Unmarshaller'
});
Jsonix.Binding.Unmarshaller.Simplified = Jsonix.Class(Jsonix.Binding.Unmarshaller, Jsonix.Binding.Unmarshalls.Element.AsSimplifiedElementRef, {
	CLASS_NAME : 'Jsonix.Binding.Unmarshaller.Simplified'
});
Jsonix.Model.TypeInfo = Jsonix.Class({
	name : null,
	baseTypeInfo : null,
	initialize : function() {
	},
	isBasedOn : function(typeInfo) {
		var currentTypeInfo = this;
		while (currentTypeInfo) {
			if (typeInfo === currentTypeInfo) {
				return true;
			}
			currentTypeInfo = currentTypeInfo.baseTypeInfo;
		}
		return false;
	},
	CLASS_NAME : 'Jsonix.Model.TypeInfo'
});
Jsonix.Model.ClassInfo = Jsonix
		.Class(Jsonix.Model.TypeInfo, Jsonix.Mapping.Styled, {
			name : null,
			localName : null,
			typeName : null,
			instanceFactory : null,
			properties : null,
			structure : null,
			targetNamespace : '',
			defaultElementNamespaceURI : '',
			defaultAttributeNamespaceURI : '',
			built : false,
			initialize : function(mapping, options) {
				Jsonix.Model.TypeInfo.prototype.initialize.apply(this, []);
				Jsonix.Mapping.Styled.prototype.initialize.apply(this, [options]);
				Jsonix.Util.Ensure.ensureObject(mapping);
				var n = mapping.name||mapping.n||undefined;
				Jsonix.Util.Ensure.ensureString(n);
				this.name = n;
				
				var ln = mapping.localName||mapping.ln||null;
				this.localName = ln;

				var dens = mapping.defaultElementNamespaceURI||mapping.dens||mapping.targetNamespace||mapping.tns||'';
				this.defaultElementNamespaceURI = dens;
				
				var tns =  mapping.targetNamespace||mapping.tns||mapping.defaultElementNamespaceURI||mapping.dens||this.defaultElementNamespaceURI;
				this.targetNamespace = tns;

				var dans = mapping.defaultAttributeNamespaceURI||mapping.dans||'';
				this.defaultAttributeNamespaceURI = dans;
				
				var bti = mapping.baseTypeInfo||mapping.bti||null;
				this.baseTypeInfo = bti;
				
				var inF = mapping.instanceFactory||mapping.inF||undefined;
				if (Jsonix.Util.Type.exists(inF)) {
					// TODO: should we support instanceFactory as functions?
					// For the pure JSON configuration?
					Jsonix.Util.Ensure.ensureFunction(inF);
					this.instanceFactory = inF;
				}
				
				var tn = mapping.typeName||mapping.tn||undefined;
				
				if (Jsonix.Util.Type.exists(tn))
				{
					if (Jsonix.Util.Type.isString(tn))
					{
						this.typeName = new Jsonix.XML.QName(this.targetNamespace, tn);
					}
					else {
						this.typeName = Jsonix.XML.QName.fromObject(tn);
					}
				}
				else if (Jsonix.Util.Type.exists(ln))
				{
					this.typeName = new Jsonix.XML.QName(tns, ln);
				}
				
				this.properties = [];
				var ps = mapping.propertyInfos||mapping.ps||[];
				Jsonix.Util.Ensure.ensureArray(ps);
				for ( var index = 0; index < ps.length; index++) {
					this.p(ps[index]);
				}				
			},
			// Obsolete
			destroy : function() {
			},
			build : function(context, module) {
				if (!this.built) {
					this.baseTypeInfo = context.resolveTypeInfo(this.baseTypeInfo, module);
					if (Jsonix.Util.Type.exists(this.baseTypeInfo)) {
						this.baseTypeInfo.build(context, module);
					}

					// Build properties in this context
					for ( var index = 0; index < this.properties.length; index++) {
						var propertyInfo = this.properties[index];
						propertyInfo.build(context, module);
					}

					// Build the structure
					var structure = {
						elements : null,
						attributes : {},
						anyAttribute : null,
						value : null,
						any : null
					};
					this.buildStructure(context, structure);
					this.structure = structure;
				}
			},
			buildStructure : function(context, structure) {
				if (Jsonix.Util.Type.exists(this.baseTypeInfo)) {
					this.baseTypeInfo.buildStructure(context, structure);
				}
				for ( var index = 0; index < this.properties.length; index++) {
					var propertyInfo = this.properties[index];
					propertyInfo.buildStructure(context, structure);
				}
			},
			unmarshal : function(context, input) {
				this.build(context);
				var result;
				
				if (this.instanceFactory) {
					result = new this.instanceFactory();
				}
				else
				{
					result = { TYPE_NAME : this.name }; 
				}
				
				if (input.eventType !== 1) {
					throw new Error("Parser must be on START_ELEMENT to read a class info.");
				}

				// Read attributes
				if (Jsonix.Util.Type.exists(this.structure.attributes)) {
					var attributeCount = input.getAttributeCount();
					if (attributeCount !== 0) {
						for ( var index = 0; index < attributeCount; index++) {
							var attributeNameKey = input
									.getAttributeNameKey(index);
							if (Jsonix.Util.Type
									.exists(this.structure.attributes[attributeNameKey])) {
								var attributeValue = input
										.getAttributeValue(index);
								if (Jsonix.Util.Type.isString(attributeValue)) {
									var attributePropertyInfo = this.structure.attributes[attributeNameKey];
									this.unmarshalPropertyValue(context, input,
											attributePropertyInfo, result,
											attributeValue);
								}
							}
						}
					}
				}
				// Read any attribute
				if (Jsonix.Util.Type.exists(this.structure.anyAttribute)) {
					var propertyInfo = this.structure.anyAttribute;
					this
							.unmarshalProperty(context, input, propertyInfo,
									result);
				}
				// Read elements
				if (Jsonix.Util.Type.exists(this.structure.elements)) {

					var et = input.next();
					while (et !== Jsonix.XML.Input.END_ELEMENT) {
						if (et === Jsonix.XML.Input.START_ELEMENT) {
							// New sub-element starts
							var elementNameKey = input.getNameKey();
							if (Jsonix.Util.Type
									.exists(this.structure.elements[elementNameKey])) {
								var elementPropertyInfo = this.structure.elements[elementNameKey];
								this.unmarshalProperty(context, input,
										elementPropertyInfo, result);
							} else if (Jsonix.Util.Type
									.exists(this.structure.any)) {
								// TODO Refactor

								var anyPropertyInfo = this.structure.any;
								this.unmarshalProperty(context, input,
										anyPropertyInfo, result);
							} else {
								// TODO optionally report a validation error that the element is not expected
								et = input.skipElement();
							}
						} else if ((et === Jsonix.XML.Input.CHARACTERS || et === Jsonix.XML.Input.CDATA || et === Jsonix.XML.Input.ENTITY_REFERENCE)) {
							if (Jsonix.Util.Type.exists(this.structure.mixed))
							{
								// Characters and structure has a mixed property
								var mixedPropertyInfo = this.structure.mixed;
								this.unmarshalProperty(context, input,
										mixedPropertyInfo, result);
							}
						} else if (et === Jsonix.XML.Input.SPACE || et === Jsonix.XML.Input.COMMENT	|| et === Jsonix.XML.Input.PROCESSING_INSTRUCTION) {
							// Ignore
						} else {
							throw new Error("Illegal state: unexpected event type [" + et	+ "].");
						}
						et = input.next();
					}
				} else if (Jsonix.Util.Type.exists(this.structure.value)) {
					var valuePropertyInfo = this.structure.value;
					this.unmarshalProperty(context, input, valuePropertyInfo,
							result);
				} else {
					// Just skip everything
					input.nextTag();
				}
				if (input.eventType !== 2) {
					throw new Error("Illegal state: must be END_ELEMENT.");
				}
				return result;
			},
			unmarshalProperty : function(context, input, propertyInfo, result) {
				var propertyValue = propertyInfo
						.unmarshal(context, input, this);
				propertyInfo.setProperty(result, propertyValue);
			},
			unmarshalPropertyValue : function(context, input, propertyInfo,
					result, value) {
				var propertyValue = propertyInfo.unmarshalValue(value, context, input, this);
				propertyInfo.setProperty(result, propertyValue);
			},
			marshal : function(value, context, output, scope) {
				if (this.isMarshallable(value, context, scope))
				{
					// TODO This must be reworked
					if (Jsonix.Util.Type.exists(this.baseTypeInfo)) {
						this.baseTypeInfo.marshal(value, context, output);
					}
					for ( var index = 0; index < this.properties.length; index++) {
						var propertyInfo = this.properties[index];
						var propertyValue = value[propertyInfo.name];
						if (Jsonix.Util.Type.exists(propertyValue)) {
							propertyInfo.marshal(propertyValue, context, output, this);
						}
					}
				}
				else
				{
					// Otherwise if there is just one property, use this property to marshal
					if (this.structure.value)
					{
						var valuePropertyInfo = this.structure.value;
						valuePropertyInfo.marshal(value, context, output, this);
					}
					else if (this.properties.length === 1)
					{
						var singlePropertyInfo = this.properties[0];
						singlePropertyInfo.marshal(value, context, output, this);
					}
					else
					{
						// TODO throw an error
						throw new Error("The passed value [" + value + "] is not an object and there is no single suitable property to marshal it.");
					}
				}
			},
			// Checks if the value is marshallable
			isMarshallable : function(value, context, scope) {
				return this.isInstance(value, context, scope) || (Jsonix.Util.Type.isObject(value) && !Jsonix.Util.Type.isArray(value));
			},
			isInstance : function(value, context, scope) {
				if (this.instanceFactory) {
					return value instanceof this.instanceFactory;
				}
				else {
					return Jsonix.Util.Type.isObject(value) && Jsonix.Util.Type.isString(value.TYPE_NAME) && value.TYPE_NAME === this.name;
				}
			},

			// Obsolete, left for backwards compatibility
			b : function(baseTypeInfo) {
				Jsonix.Util.Ensure.ensureObject(baseTypeInfo);
				this.baseTypeInfo = baseTypeInfo;
				return this;
			},
			// Obsolete, left for backwards compatibility
			ps : function() {
				return this;
			},
			p : function(mapping) {
				Jsonix.Util.Ensure.ensureObject(mapping);
				// If mapping is an instance of the property class
				if (mapping instanceof Jsonix.Model.PropertyInfo) {
					this.addProperty(mapping);
				}
				// Else create it via generic mapping configuration
				else {
					mapping = Jsonix.Util.Type.cloneObject(mapping);
					var type = mapping.type||mapping.t||'element';
					// Locate the creator function
					if (Jsonix.Util.Type
							.isFunction(this.propertyInfoCreators[type])) {
						var propertyInfoCreator = this.propertyInfoCreators[type];
						// Call the creator function
						propertyInfoCreator.call(this, mapping);
					} else {
						throw new Error("Unknown property info type [" + type + "].");
					}
				}
			},
			aa : function(mapping) {
				this.addDefaultNamespaces(mapping);
				return this
						.addProperty(new this.mappingStyle.anyAttributePropertyInfo(
								mapping, {
									mappingStyle : this.mappingStyle
								}));
			},
			ae : function(mapping) {
				this.addDefaultNamespaces(mapping);
				return this
						.addProperty(new this.mappingStyle.anyElementPropertyInfo(
								mapping, {
									mappingStyle : this.mappingStyle
								}));
			},
			a : function(mapping) {
				this.addDefaultNamespaces(mapping);
				return this.addProperty(new this.mappingStyle.attributePropertyInfo(
						mapping, {
							mappingStyle : this.mappingStyle
						}));
			},
			em : function(mapping) {
				this.addDefaultNamespaces(mapping);
				return this
						.addProperty(new this.mappingStyle.elementMapPropertyInfo(
								mapping, {
									mappingStyle : this.mappingStyle
								}));
			},
			e : function(mapping) {
				this.addDefaultNamespaces(mapping);
				return this.addProperty(new this.mappingStyle.elementPropertyInfo(
						mapping, {
							mappingStyle : this.mappingStyle
						}));
			},
			es : function(mapping) {
				this.addDefaultNamespaces(mapping);
				return this.addProperty(new this.mappingStyle.elementsPropertyInfo(
						mapping, {
							mappingStyle : this.mappingStyle
						}));
			},
			er : function(mapping) {
				this.addDefaultNamespaces(mapping);
				return this
						.addProperty(new this.mappingStyle.elementRefPropertyInfo(
								mapping, {
									mappingStyle : this.mappingStyle
								}));
			},
			ers : function(mapping) {
				this.addDefaultNamespaces(mapping);
				return this
						.addProperty(new this.mappingStyle.elementRefsPropertyInfo(
								mapping, {
									mappingStyle : this.mappingStyle
								}));
			},
			v : function(mapping) {
				this.addDefaultNamespaces(mapping);
				return this.addProperty(new this.mappingStyle.valuePropertyInfo(
						mapping, {
							mappingStyle : this.mappingStyle
						}));
			},
			addDefaultNamespaces : function(mapping) {
				if (Jsonix.Util.Type.isObject(mapping)) {
					if (!Jsonix.Util.Type
							.isString(mapping.defaultElementNamespaceURI)) {
						mapping.defaultElementNamespaceURI = this.defaultElementNamespaceURI;
					}
					if (!Jsonix.Util.Type
							.isString(mapping.defaultAttributeNamespaceURI)) {
						mapping.defaultAttributeNamespaceURI = this.defaultAttributeNamespaceURI;
					}
				}
			},
			addProperty : function(property) {
				this.properties.push(property);
				return this;
			},
			CLASS_NAME : 'Jsonix.Model.ClassInfo'
		});
Jsonix.Model.ClassInfo.prototype.propertyInfoCreators = {
	"aa" : Jsonix.Model.ClassInfo.prototype.aa,
	"anyAttribute" : Jsonix.Model.ClassInfo.prototype.aa,
	"ae" : Jsonix.Model.ClassInfo.prototype.ae,
	"anyElement" : Jsonix.Model.ClassInfo.prototype.ae,
	"a" : Jsonix.Model.ClassInfo.prototype.a,
	"attribute" : Jsonix.Model.ClassInfo.prototype.a,
	"em" : Jsonix.Model.ClassInfo.prototype.em,
	"elementMap" : Jsonix.Model.ClassInfo.prototype.em,
	"e" : Jsonix.Model.ClassInfo.prototype.e,
	"element" : Jsonix.Model.ClassInfo.prototype.e,
	"es" : Jsonix.Model.ClassInfo.prototype.es,
	"elements" : Jsonix.Model.ClassInfo.prototype.es,
	"er" : Jsonix.Model.ClassInfo.prototype.er,
	"elementRef" : Jsonix.Model.ClassInfo.prototype.er,
	"ers" : Jsonix.Model.ClassInfo.prototype.ers,
	"elementRefs" : Jsonix.Model.ClassInfo.prototype.ers,
	"v" : Jsonix.Model.ClassInfo.prototype.v,
	"value" : Jsonix.Model.ClassInfo.prototype.v
};
Jsonix.Model.EnumLeafInfo = Jsonix.Class(Jsonix.Model.TypeInfo, {
	name : null,
	baseTypeInfo : 'String',
	entries : null,
	keys : null,
	values : null,
	built : false,
	initialize : function(mapping) {
		Jsonix.Model.TypeInfo.prototype.initialize.apply(this, []);
		Jsonix.Util.Ensure.ensureObject(mapping);
		
		var n = mapping.name||mapping.n||undefined;
		Jsonix.Util.Ensure.ensureString(n);
		this.name = n;
		
		var bti = mapping.baseTypeInfo||mapping.bti||'String';
		this.baseTypeInfo = bti;
		
		var vs = mapping.values||mapping.vs||undefined;
		Jsonix.Util.Ensure.ensureExists(vs);
		if (!(Jsonix.Util.Type.isObject(vs) || Jsonix.Util.Type.isArray(vs))) {
			throw new Error('Enum values must be either an array or an object.');
		}
		else
		{
			this.entries = vs;
		}		
	},
	build : function(context, module) {
		if (!this.built) {
			this.baseTypeInfo = context.resolveTypeInfo(this.baseTypeInfo, module);
			this.baseTypeInfo.build(context, module);
			var items = this.entries;
			var entries = {};
			var keys = [];
			var values = [];
			var index = 0;
			var key;
			var value;
			// If values is an array, process individual items
			if (Jsonix.Util.Type.isArray(items))
			{
				// Build properties in this context
				for (index = 0; index < items.length; index++) {
					value = items[index];
					if (Jsonix.Util.Type.isString(value)) {
						key = value;
						if (!(Jsonix.Util.Type.isFunction(this.baseTypeInfo.parse)))
						{
							throw new Error('Enum value is provided as string but the base type ['+this.baseTypeInfo.name+'] of the enum info [' + this.name + '] does not implement the parse method.');
						}
						// Using null as input since input is not available
						value = this.baseTypeInfo.parse(value, context, null, this);
					}
					else
					{
						if (this.baseTypeInfo.isInstance(value, context, this))
						{
							if (!(Jsonix.Util.Type.isFunction(this.baseTypeInfo.print)))
							{
								throw new Error('The base type ['+this.baseTypeInfo.name+'] of the enum info [' + this.name + '] does not implement the print method, unable to produce the enum key as string.');
							}
							// Using null as output since output is not available at this moment
							key = this.baseTypeInfo.print(value, context, null, this);
						}
						else
						{
							throw new Error('Enum value [' + value + '] is not an instance of the enum base type [' + this.baseTypeInfo.name + '].');
						}
					}
					entries[key] = value;
					keys[index] = key;
					values[index] = value;
				}
			}
			else if (Jsonix.Util.Type.isObject(items))
			{
				for (key in items) {
					if (items.hasOwnProperty(key)) {
						value = items[key];
						if (Jsonix.Util.Type.isString(value)) {
							if (!(Jsonix.Util.Type.isFunction(this.baseTypeInfo.parse)))
							{
								throw new Error('Enum value is provided as string but the base type ['+this.baseTypeInfo.name+'] of the enum info [' + this.name + '] does not implement the parse method.');
							}
							// Using null as input since input is not available
							value = this.baseTypeInfo.parse(value, context, null, this);
						}
						else
						{
							if (!this.baseTypeInfo.isInstance(value, context, this))
							{
								throw new Error('Enum value [' + value + '] is not an instance of the enum base type [' + this.baseTypeInfo.name + '].');
							}
						}
						entries[key] = value;
						keys[index] = key;
						values[index] = value;
						index++;
					}
				}
			}
			else {
				throw new Error('Enum values must be either an array or an object.');
			}
			this.entries = entries;
			this.keys = keys;
			this.values = values;
			this.built = true;
		}
	},
	unmarshal : function(context, input, scope) {
		var text = input.getElementText();
		return this.parse(text, context, input, scope);
	},
	marshal : function(value, context, output, scope) {
		if (Jsonix.Util.Type.exists(value)) {
			output.writeCharacters(this.reprint(value, context, output, scope));
		}
	},
	reprint : function(value, context, output, scope) {
		if (Jsonix.Util.Type.isString(value) && !this.isInstance(value, context, scope)) {
			// Using null as input since input is not available
			return this.print(this.parse(value, context, null, scope), context, output, scope);
		} else {
			return this.print(value, context, output, scope);
		}
	},
	print : function(value, context, output, scope) {
		for (var index = 0; index < this.values.length; index++)
		{
			if (this.values[index] === value)
			{
				return this.keys[index];
			}
		}
		throw new Error('Value [' + value + '] is invalid for the enum type [' + this.name + '].');
	},
	parse : function(text, context, input, scope) {
		Jsonix.Util.Ensure.ensureString(text);
		if (this.entries.hasOwnProperty(text))
		{
			return this.entries[text];
		}
		else
		{
			throw new Error('Value [' + text + '] is invalid for the enum type [' + this.name + '].');
		}
	},
	isInstance : function(value, context, scope) {
		for (var index = 0; index < this.values.length; index++)
		{
			if (this.values[index] === value)
			{
				return true;
			}
		}
		return false;
	},
	CLASS_NAME : 'Jsonix.Model.EnumLeafInfo'
});
Jsonix.Model.ElementInfo = Jsonix.Class({
	elementName : null,
	typeInfo : null,
	substitutionHead : null,
	scope : null,
	built : false,
	initialize : function(mapping) {
		Jsonix.Util.Ensure.ensureObject(mapping);
		
		var dens = mapping.defaultElementNamespaceURI||mapping.dens||'';
		this.defaultElementNamespaceURI = dens;
		
		var en = mapping.elementName || mapping.en||undefined;
		if (Jsonix.Util.Type.isObject(en)) {
			this.elementName = Jsonix.XML.QName.fromObject(en);
		} else {
			Jsonix.Util.Ensure.ensureString(en);
			this.elementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, en);
		}
		
		var ti = mapping.typeInfo||mapping.ti||'String';
		this.typeInfo = ti;
		
		var sh = mapping.substitutionHead||mapping.sh||null;
		this.substitutionHead = sh;
		
		var sc = mapping.scope||mapping.sc||null;
		this.scope = sc;
	},
	build : function(context, module) {
		// If element info is not yet built
		if (!this.built) {
			this.typeInfo = context.resolveTypeInfo(this.typeInfo, module);
			this.scope = context.resolveTypeInfo(this.scope, module);
			this.built = true;
		}
	},
	CLASS_NAME : 'Jsonix.Model.ElementInfo'
});
Jsonix.Model.PropertyInfo = Jsonix.Class({
	name : null,
	collection : false,
	targetNamespace : '',
	defaultElementNamespaceURI : '',
	defaultAttributeNamespaceURI : '',
	built : false,
	initialize : function(mapping) {
		Jsonix.Util.Ensure.ensureObject(mapping);
		var n = mapping.name || mapping.n || undefined;
		Jsonix.Util.Ensure.ensureString(n);
		this.name = n;
		var dens = mapping.defaultElementNamespaceURI || mapping.dens || mapping.targetNamespace || mapping.tns || '';
		this.defaultElementNamespaceURI = dens;
		var tns = mapping.targetNamespace || mapping.tns || mapping.defaultElementNamespaceURI || mapping.dens || this.defaultElementNamespaceURI;
		this.targetNamespace = tns;
		var dans = mapping.defaultAttributeNamespaceURI || mapping.dans || '';
		this.defaultAttributeNamespaceURI = dans;
		var col = mapping.collection || mapping.col || false;
		this.collection = col;
	},
	build : function(context, module) {
		if (!this.built) {
			this.doBuild(context, module);
			this.built = true;
		}
	},
	doBuild : function(context, module) {
		throw new Error("Abstract method [doBuild].");
	},
	buildStructure : function(context, structure) {
		throw new Error("Abstract method [buildStructure].");
	},
	setProperty : function(object, value) {
		if (Jsonix.Util.Type.exists(value)) {
			if (this.collection) {
				Jsonix.Util.Ensure.ensureArray(value, 'Collection property requires an array value.');
				if (!Jsonix.Util.Type.exists(object[this.name])) {
					object[this.name] = [];
				}
				for (var index = 0; index < value.length; index++) {
					object[this.name].push(value[index]);
				}

			} else {
				object[this.name] = value;
			}
		}
	},
	CLASS_NAME : 'Jsonix.Model.PropertyInfo'
});
Jsonix.Model.AnyAttributePropertyInfo = Jsonix.Class(Jsonix.Model.PropertyInfo, {
	initialize : function(mapping) {
		Jsonix.Util.Ensure.ensureObject(mapping);
		Jsonix.Model.PropertyInfo.prototype.initialize.apply(this, [ mapping ]);
	},
	unmarshal : function(context, input, scope) {
		var attributeCount = input.getAttributeCount();
		if (attributeCount === 0) {
			return null;
		} else {
			var result = {};
			for ( var index = 0; index < attributeCount; index++) {
				var value = input.getAttributeValue(index);
				if (Jsonix.Util.Type.isString(value)) {
					var propertyName = this.convertFromAttributeName(input.getAttributeName(index), context, input, scope);
					result[propertyName] = value;
				}
			}
			return result;
		}
	},
	marshal : function(value, context, output, scope) {
		if (!Jsonix.Util.Type.isObject(value)) {
			// Nothing to do
			return;
		}
		for ( var propertyName in value) {
			if (value.hasOwnProperty(propertyName)) {
				var propertyValue = value[propertyName];
				if (Jsonix.Util.Type.isString(propertyValue)) {
					var attributeName = this.convertToAttributeName(propertyName, context, output, scope);
					output.writeAttribute(attributeName, propertyValue);
				}
			}
		}
	},
	convertFromAttributeName : function(attributeName, context, input, scope) {
		return attributeName.key;
	},
	convertToAttributeName : function(propertyName, context, output, scope) {
		return Jsonix.XML.QName.fromObjectOrString(propertyName, context);
	},
	doBuild : function(context, module)	{
		// Nothing to do
	},
	buildStructure : function(context, structure) {
		Jsonix.Util.Ensure.ensureObject(structure);
		// if (Jsonix.Util.Type.exists(structure.anyAttribute))
		// {
		// // TODO better exception
		// throw new Error("The structure already defines an any attribute
		// property.");
		// } else
		// {
		structure.anyAttribute = this;
		// }
	},
	CLASS_NAME : 'Jsonix.Model.AnyAttributePropertyInfo'
});
Jsonix.Model.AnyAttributePropertyInfo.Simplified = Jsonix.Class(Jsonix.Model.AnyAttributePropertyInfo, {
	convertFromAttributeName : function(attributeName, context, input, scope)
	{
		return attributeName.toCanonicalString(context);
	}
});

Jsonix.Model.SingleTypePropertyInfo = Jsonix.Class(Jsonix.Model.PropertyInfo, {
	typeInfo : 'String',
	initialize : function(mapping) {
		Jsonix.Util.Ensure.ensureObject(mapping);
		Jsonix.Model.PropertyInfo.prototype.initialize.apply(this, [ mapping ]);
		var ti = mapping.typeInfo || mapping.ti || 'String';
		this.typeInfo = ti;
	},
	doBuild : function(context, module) {
		this.typeInfo = context.resolveTypeInfo(this.typeInfo, module);
	},
	unmarshalValue : function(value, context, input, scope) {
		return this.parse(value, context, input, scope);
	},
	parse : function(value, context, input, scope) {
		return this.typeInfo.parse(value, context, input, scope);
	},
	print : function(value, context, output, scope) {
		return this.typeInfo.reprint(value, context, output, scope);
	},
	CLASS_NAME : 'Jsonix.Model.SingleTypePropertyInfo'
});

Jsonix.Model.AttributePropertyInfo = Jsonix.Class(Jsonix.Model.SingleTypePropertyInfo, {
	attributeName : null,
	initialize : function(mapping) {
		Jsonix.Util.Ensure.ensureObject(mapping);
		Jsonix.Model.SingleTypePropertyInfo.prototype.initialize.apply(this, [ mapping ]);
		var an = mapping.attributeName||mapping.an||undefined;
		if (Jsonix.Util.Type.isObject(an)) {
			this.attributeName = Jsonix.XML.QName.fromObject(an);
		} else if (Jsonix.Util.Type.isString(an)) {
			this.attributeName = new Jsonix.XML.QName(this.defaultAttributeNamespaceURI, an);
		} else {
			this.attributeName = new Jsonix.XML.QName(this.defaultAttributeNamespaceURI, this.name);
		}
	},
	unmarshal : function(context, input, scope) {
		var attributeCount = input.getAttributeCount();
		var result = null;
		for ( var index = 0; index < attributeCount; index++) {
			var attributeNameKey = input.getAttributeNameKey(index);
			if (this.attributeName.key === attributeNameKey) {
				var attributeValue = input.getAttributeValue(index);
				if (Jsonix.Util.Type.isString(attributeValue)) {
					result = this.unmarshalValue(attributeValue, context, input, scope);
				}
			}
		}
		return result;
	},
	marshal : function(value, context, output, scope) {
		if (Jsonix.Util.Type.exists(value)) {
			output.writeAttribute(this.attributeName, this.print(value, context, output, scope));
		}

	},
	buildStructure : function(context, structure) {
		Jsonix.Util.Ensure.ensureObject(structure);
		Jsonix.Util.Ensure.ensureObject(structure.attributes);
		var key = this.attributeName.key;
		// if (Jsonix.Util.Type.exists(structure.attributes[key])) {
		// // TODO better exception
		// throw new Error("The structure already defines an attribute for the key
		// ["
		// + key + "].");
		// } else
		// {
		structure.attributes[key] = this;
		// }
	},
	CLASS_NAME : 'Jsonix.Model.AttributePropertyInfo'
});

Jsonix.Model.ValuePropertyInfo = Jsonix.Class(Jsonix.Model.SingleTypePropertyInfo, {
	initialize : function(mapping) {
		Jsonix.Util.Ensure.ensureObject(mapping);
		Jsonix.Model.SingleTypePropertyInfo.prototype.initialize.apply(this, [ mapping ]);
	},
	unmarshal : function(context, input, scope) {
		var text = input.getElementText();
		return this.unmarshalValue(text, context, input, scope);
	},
	marshal : function(value, context, output, scope) {
		if (!Jsonix.Util.Type.exists(value)) {
			return;
		}
		output.writeCharacters(this.print(value, context, output, scope));
	},
	buildStructure : function(context, structure) {
		Jsonix.Util.Ensure.ensureObject(structure);
		// if (Jsonix.Util.Type.exists(structure.value)) {
		// // TODO better exception
		// throw new Error("The structure already defines a value
		// property.");
		// } else
		if (Jsonix.Util.Type.exists(structure.elements)) {
			// TODO better exception
			throw new Error("The structure already defines element mappings, it cannot define a value property.");
		} else {
			structure.value = this;
		}
	},
	CLASS_NAME : 'Jsonix.Model.ValuePropertyInfo'
});

Jsonix.Model.AbstractElementsPropertyInfo = Jsonix.Class(Jsonix.Binding.Unmarshalls.Element, Jsonix.Binding.Unmarshalls.WrapperElement, Jsonix.Model.PropertyInfo, {
	wrapperElementName : null,
	allowDom : false,
	allowTypedObject : true,
	mixed : false,
	initialize : function(mapping) {
		Jsonix.Util.Ensure.ensureObject(mapping);
		Jsonix.Model.PropertyInfo.prototype.initialize.apply(this, [ mapping ]);
		var wen = mapping.wrapperElementName||mapping.wen||undefined;
		if (Jsonix.Util.Type.isObject(wen)) {
			this.wrapperElementName = Jsonix.XML.QName.fromObject(wen);
		} else if (Jsonix.Util.Type.isString(wen)) {
			this.wrapperElementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, wen);
		} else {
			this.wrapperElementName = null;
		}
	},
	unmarshal : function(context, input, scope) {
		var result = null;
		var that = this;
		var callback = function(value) {
			if (that.collection) {
				if (result === null) {
					result = [];
				}
				result.push(value);

			} else {
				if (result === null) {
					result = value;
				} else {
					// TODO Report validation error
					throw new Error("Value already set.");
				}
			}
		};

		if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
			this.unmarshalWrapperElement(context, input, scope, callback);
		} else {
			this.unmarshalElement(context, input, scope, callback);
		}
		return result;
	},
	marshal : function(value, context, output, scope) {

		if (!Jsonix.Util.Type.exists(value)) {
			// Do nothing
			return;
		}

		if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
			output.writeStartElement(this.wrapperElementName);
		}

		if (!this.collection) {
			this.marshalElement(value, context, output, scope);
		} else {
			Jsonix.Util.Ensure.ensureArray(value);
			// TODO Exception if not array
			for ( var index = 0; index < value.length; index++) {
				var item = value[index];
				// TODO Exception if item does not exist
				this.marshalElement(item, context, output, scope);
			}
		}

		if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
			output.writeEndElement();
		}
	},
	convertFromTypedNamedValue : function(elementValue, context, input, scope) {
		return elementValue.value;
	},
	buildStructure : function(context, structure) {
		Jsonix.Util.Ensure.ensureObject(structure);
		if (Jsonix.Util.Type.exists(structure.value)) {
			// TODO better exception
			throw new Error("The structure already defines a value property.");
		} else if (!Jsonix.Util.Type.exists(structure.elements)) {
			structure.elements = {};
		}

		if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
			structure.elements[this.wrapperElementName.key] = this;
		} else {
			this.buildStructureElements(context, structure);
		}
	},
	buildStructureElements : function(context, structure) {
		throw new Error("Abstract method [buildStructureElements].");
	},
	CLASS_NAME : 'Jsonix.Model.AbstractElementsPropertyInfo'
});

Jsonix.Model.ElementPropertyInfo = Jsonix.Class(Jsonix.Model.AbstractElementsPropertyInfo, Jsonix.Binding.Marshalls.Element, {
	typeInfo : 'String',
	elementName : null,
	initialize : function(mapping) {
		Jsonix.Util.Ensure.ensureObject(mapping);
		Jsonix.Model.AbstractElementsPropertyInfo.prototype.initialize.apply(this, [ mapping ]);
		var ti = mapping.typeInfo || mapping.ti || 'String';
		if (Jsonix.Util.Type.isObject(ti)) {
			this.typeInfo = ti;
		} else {
			Jsonix.Util.Ensure.ensureString(ti);
			this.typeInfo = ti;
		}
		var en = mapping.elementName || mapping.en || undefined;
		if (Jsonix.Util.Type.isObject(en)) {
			this.elementName = Jsonix.XML.QName.fromObject(en);
		} else if (Jsonix.Util.Type.isString(en)) {
			this.elementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, en);
		} else {
			this.elementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, this.name);
		}
	},
	getTypeInfoByElementName : function(elementName, context, scope) {
		return this.typeInfo;
	},
	convertToTypedNamedValue : function(value, context, output, scope) {
		return {
			name : this.elementName,
			value : value,
			typeInfo : this.typeInfo
		};
	},
	doBuild : function(context, module) {
		this.typeInfo = context.resolveTypeInfo(this.typeInfo, module);
	},
	buildStructureElements : function(context, structure) {
		structure.elements[this.elementName.key] = this;
	},
	CLASS_NAME : 'Jsonix.Model.ElementPropertyInfo'
});

Jsonix.Model.ElementsPropertyInfo = Jsonix.Class(Jsonix.Model.AbstractElementsPropertyInfo, Jsonix.Binding.Marshalls.Element, {
	elementTypeInfos : null,
	elementTypeInfosMap : null,
	initialize : function(mapping) {
		Jsonix.Util.Ensure.ensureObject(mapping);
		Jsonix.Model.AbstractElementsPropertyInfo.prototype.initialize.apply(this, [ mapping ]);
		var etis = mapping.elementTypeInfos || mapping.etis || [];
		Jsonix.Util.Ensure.ensureArray(etis);
		this.elementTypeInfos = [];
		for (var index = 0; index < etis.length; index++) {
			this.elementTypeInfos[index] = Jsonix.Util.Type.cloneObject(etis[index]);
		}
	},
	getTypeInfoByElementName : function(elementName, context, scope) {
		return this.elementTypeInfosMap[elementName.key];
	},
	convertToTypedNamedValue : function(value, context, output, scope) {
		for (var index = 0; index < this.elementTypeInfos.length; index++) {
			var elementTypeInfo = this.elementTypeInfos[index];
			var typeInfo = elementTypeInfo.typeInfo;
			if (typeInfo.isInstance(value, context, scope)) {
				var elementName = elementTypeInfo.elementName;
				return {
					name : elementName,
					value : value,
					typeInfo : typeInfo
				};
			}
		}
		// If xsi:type is supported
		if (context.supportXsiType) {
			// Find the actual type
			var actualTypeInfo = context.getTypeInfoByValue(value);
			if (actualTypeInfo && actualTypeInfo.typeName) {
				for (var jndex = 0; jndex < this.elementTypeInfos.length; jndex++) {
					var eti = this.elementTypeInfos[jndex];
					var ti = eti.typeInfo;
					// TODO Can be optimized
					// Find an element type info which has a type info that is a
					// supertype of the actual type info
					if (actualTypeInfo.isBasedOn(ti)) {
						var en = eti.elementName;
						return {
							name : en,
							value : value,
							typeInfo : ti
						};
					}
				}
			}
		}
		// TODO harmonize error handling. See also marshallElement. Error must
		// only be on one place.
		throw new Error("Could not find an element with type info supporting the value [" + value + "].");
	},
	doBuild : function(context, module) {
		this.elementTypeInfosMap = {};
		var etiti, etien;
		for (var index = 0; index < this.elementTypeInfos.length; index++) {
			var elementTypeInfo = this.elementTypeInfos[index];
			Jsonix.Util.Ensure.ensureObject(elementTypeInfo);
			etiti = elementTypeInfo.typeInfo || elementTypeInfo.ti || 'String';
			elementTypeInfo.typeInfo = context.resolveTypeInfo(etiti, module);
			etien = elementTypeInfo.elementName || elementTypeInfo.en || undefined;
			elementTypeInfo.elementName = Jsonix.XML.QName.fromObjectOrString(etien, context, this.defaultElementNamespaceURI);
			this.elementTypeInfosMap[elementTypeInfo.elementName.key] = elementTypeInfo.typeInfo;
		}
	},
	buildStructureElements : function(context, structure) {
		for (var index = 0; index < this.elementTypeInfos.length; index++) {
			var elementTypeInfo = this.elementTypeInfos[index];
			structure.elements[elementTypeInfo.elementName.key] = this;
		}
	},
	CLASS_NAME : 'Jsonix.Model.ElementsPropertyInfo'
});

Jsonix.Model.ElementMapPropertyInfo = Jsonix.Class(Jsonix.Model.AbstractElementsPropertyInfo, {
	elementName : null,
	key : null,
	value : null,
	entryTypeInfo : null,
	initialize : function(mapping) {
		Jsonix.Util.Ensure.ensureObject(mapping);
		Jsonix.Model.AbstractElementsPropertyInfo.prototype.initialize.apply(this, [ mapping ]);
		// TODO Ensure correct argument
		var k = mapping.key || mapping.k || undefined;
		Jsonix.Util.Ensure.ensureObject(k);
		var v = mapping.value || mapping.v || undefined;
		Jsonix.Util.Ensure.ensureObject(v);
		// TODO Ensure correct argument
		var en = mapping.elementName || mapping.en || undefined;
		if (Jsonix.Util.Type.isObject(en)) {
			this.elementName = Jsonix.XML.QName.fromObject(en);
		} else if (Jsonix.Util.Type.isString(en)) {
			this.elementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, en);
		} else {
			this.elementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, this.name);
		}
		this.entryTypeInfo = new Jsonix.Model.ClassInfo({
			name : 'Map<' + k.name + ',' + v.name + '>',
			propertyInfos : [ k, v ]
		});

	},
	unmarshal : function(context, input, scope) {
		var result = null;
		var that = this;
		var callback = function(value) {

			if (Jsonix.Util.Type.exists(value)) {
				Jsonix.Util.Ensure.ensureObject(value, 'Map property requires an object.');
				if (!Jsonix.Util.Type.exists(result)) {
					result = {};
				}
				for ( var attributeName in value) {
					if (value.hasOwnProperty(attributeName)) {
						var attributeValue = value[attributeName];
						if (that.collection) {
							if (!Jsonix.Util.Type.exists(result[attributeName])) {
								result[attributeName] = [];
							}
							result[attributeName].push(attributeValue);
						} else {
							if (!Jsonix.Util.Type.exists(result[attributeName])) {
								result[attributeName] = attributeValue;
							} else {
								// TODO Report validation error
								throw new Error("Value was already set.");
							}
						}
					}
				}
			}
		};

		if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
			this.unmarshalWrapperElement(context, input, scope, callback);
		} else {
			this.unmarshalElement(context, input, scope, callback);
		}
		return result;
	},
	getTypeInfoByInputElement : function(context, input, scope) {
		return this.entryTypeInfo;
	},
	convertFromTypedNamedValue : function(elementValue, context, input, scope) {
		var entry = elementValue.value;
		var result = {};
		if (Jsonix.Util.Type.isString(entry[this.key.name])) {
			result[entry[this.key.name]] = entry[this.value.name];
		}
		return result;
	},
	marshal : function(value, context, output, scope) {

		if (!Jsonix.Util.Type.exists(value)) {
			// Do nothing
			return;
		}

		if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
			output.writeStartElement(this.wrapperElementName);
		}

		this.marshalElement(value, context, output, scope);

		if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
			output.writeEndElement();
		}
	},
	marshalElement : function(value, context, output, scope) {
		if (!!value) {
			for ( var attributeName in value) {
				if (value.hasOwnProperty(attributeName)) {
					var attributeValue = value[attributeName];
					if (!this.collection) {
						var singleEntry = {};
						singleEntry[this.key.name] = attributeName;
						singleEntry[this.value.name] = attributeValue;
						output.writeStartElement(this.elementName);
						this.entryTypeInfo.marshal(singleEntry, context, output, scope);
						output.writeEndElement();

					} else {
						for (var index = 0; index < attributeValue.length; index++) {
							var collectionEntry = {};
							collectionEntry[this.key.name] = attributeName;
							collectionEntry[this.value.name] = attributeValue[index];
							output.writeStartElement(this.elementName);
							this.entryTypeInfo.marshal(collectionEntry, context, output, scope);
							output.writeEndElement();
						}
					}
				}
			}
		}
	},
	doBuild : function(context, module) {
		this.entryTypeInfo.build(context, module);
		// TODO get property by name
		this.key = this.entryTypeInfo.properties[0];
		this.value = this.entryTypeInfo.properties[1];
	},
	buildStructureElements : function(context, structure) {
		structure.elements[this.elementName.key] = this;
	},
	setProperty : function(object, value) {
		if (Jsonix.Util.Type.exists(value)) {
			Jsonix.Util.Ensure.ensureObject(value, 'Map property requires an object.');
			if (!Jsonix.Util.Type.exists(object[this.name])) {
				object[this.name] = {};
			}
			var map = object[this.name];
			for ( var attributeName in value) {
				if (value.hasOwnProperty(attributeName)) {
					var attributeValue = value[attributeName];
					if (this.collection) {
						if (!Jsonix.Util.Type.exists(map[attributeName])) {
							map[attributeName] = [];
						}

						for (var index = 0; index < attributeValue.length; index++) {
							map[attributeName].push(attributeValue[index]);
						}
					} else {
						map[attributeName] = attributeValue;
					}
				}
			}
		}
	},
	CLASS_NAME : 'Jsonix.Model.ElementMapPropertyInfo'
});

Jsonix.Model.AbstractElementRefsPropertyInfo = Jsonix.Class(Jsonix.Binding.Marshalls.Element, Jsonix.Binding.Marshalls.Element.AsElementRef, Jsonix.Binding.Unmarshalls.Element, Jsonix.Binding.Unmarshalls.WrapperElement, Jsonix.Binding.Unmarshalls.Element.AsElementRef, Jsonix.Model.PropertyInfo, {
	wrapperElementName : null,
	allowDom : true,
	allowTypedObject : true,
	mixed : true,
	initialize : function(mapping) {
		Jsonix.Util.Ensure.ensureObject(mapping, 'Mapping must be an object.');
		Jsonix.Model.PropertyInfo.prototype.initialize.apply(this, [ mapping ]);
		var wen = mapping.wrapperElementName || mapping.wen || undefined;
		if (Jsonix.Util.Type.isObject(wen)) {
			this.wrapperElementName = Jsonix.XML.QName.fromObject(wen);
		} else if (Jsonix.Util.Type.isString(wen)) {
			this.wrapperElementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, wen);
		} else {
			this.wrapperElementName = null;
		}
		var dom = Jsonix.Util.Type.defaultValue(mapping.allowDom, mapping.dom, true);
		var typed = Jsonix.Util.Type.defaultValue(mapping.allowTypedObject, mapping.typed, true);
		var mx = Jsonix.Util.Type.defaultValue(mapping.mixed, mapping.mx, true);
		this.allowDom = dom;
		this.allowTypedObject = typed;
		this.mixed = mx;
	},
	unmarshal : function(context, input, scope) {
		var result = null;
		var that = this;
		var callback = function(value) {
			if (that.collection) {
				if (result === null) {
					result = [];
				}
				result.push(value);

			} else {
				if (result === null) {
					result = value;
				} else {
					// TODO Report validation error
					throw new Error("Value already set.");
				}
			}
		};

		var et = input.eventType;
		if (et === Jsonix.XML.Input.START_ELEMENT) {
			if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
				this.unmarshalWrapperElement(context, input, scope, callback);
			} else {
				this.unmarshalElement(context, input, scope, callback);
			}
		} else if (this.mixed && (et === Jsonix.XML.Input.CHARACTERS || et === Jsonix.XML.Input.CDATA || et === Jsonix.XML.Input.ENTITY_REFERENCE)) {
			callback(input.getText());
		} else if (et === Jsonix.XML.Input.SPACE || et === Jsonix.XML.Input.COMMENT || et === Jsonix.XML.Input.PROCESSING_INSTRUCTION) {
			// Skip whitespace
		} else {
			// TODO better exception
			throw new Error("Illegal state: unexpected event type [" + et + "].");
		}
		return result;
	},
	marshal : function(value, context, output, scope) {

		if (Jsonix.Util.Type.exists(value)) {
			if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
				output.writeStartElement(this.wrapperElementName);
			}

			if (!this.collection) {
				this.marshalItem(value, context, output, scope);
			} else {
				Jsonix.Util.Ensure.ensureArray(value, 'Collection property requires an array value.');
				for (var index = 0; index < value.length; index++) {
					var item = value[index];
					this.marshalItem(item, context, output, scope);
				}
			}

			if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
				output.writeEndElement();
			}
		}

	},
	marshalItem : function(value, context, output, scope) {
		if (Jsonix.Util.Type.isString(value)) {
			if (!this.mixed) {
				// TODO
				throw new Error("Property is not mixed, can't handle string values.");
			} else {
				output.writeCharacters(value);
			}
		} else if (this.allowDom && Jsonix.Util.Type.exists(value.nodeType)) {
			// DOM node
			output.writeNode(value);
		} else if (Jsonix.Util.Type.isObject(value)) {
			this.marshalElement(value, context, output, scope);

		} else {
			if (this.mixed) {
				throw new Error("Unsupported content type, either objects or strings are supported.");
			} else {
				throw new Error("Unsupported content type, only objects are supported.");
			}
		}

	},
	getTypeInfoByElementName : function(elementName, context, scope) {
		var propertyElementTypeInfo = this.getPropertyElementTypeInfo(elementName, context);
		if (Jsonix.Util.Type.exists(propertyElementTypeInfo)) {
			return propertyElementTypeInfo.typeInfo;
		} else {
			var contextElementTypeInfo = context.getElementInfo(elementName, scope);
			if (Jsonix.Util.Type.exists(contextElementTypeInfo)) {
				return contextElementTypeInfo.typeInfo;
			} else {
				return undefined;
			}
		}
	},
	getPropertyElementTypeInfo : function(elementName, context) {
		throw new Error("Abstract method [getPropertyElementTypeInfo].");
	},
	buildStructure : function(context, structure) {
		Jsonix.Util.Ensure.ensureObject(structure);
		if (Jsonix.Util.Type.exists(structure.value)) {
			// TODO better exception
			throw new Error("The structure already defines a value property.");
		} else if (!Jsonix.Util.Type.exists(structure.elements)) {
			structure.elements = {};
		}

		if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
			structure.elements[this.wrapperElementName.key] = this;
		} else {
			this.buildStructureElements(context, structure);
		}

		// if (Jsonix.Util.Type.exists(structure.elements[key]))
		// {
		// // TODO better exception
		// throw new Error("The structure already defines an element for
		// the key ["
		// + key + "].");
		// } else
		// {
		// structure.elements[key] = this;
		// }

		if ((this.allowDom || this.allowTypedObject)) {
			structure.any = this;
		}
		if (this.mixed && !Jsonix.Util.Type.exists(this.wrapperElementName)) {
			// if (Jsonix.Util.Type.exists(structure.mixed)) {
			// // TODO better exception
			// throw new Error("The structure already defines the mixed
			// property.");
			// } else
			// {
			structure.mixed = this;
			// }
		}
	},
	buildStructureElements : function(context, structure) {
		throw new Error("Abstract method [buildStructureElements].");
	},
	buildStructureElementTypeInfos : function(context, structure, elementTypeInfo) {
		structure.elements[elementTypeInfo.elementName.key] = this;
		var substitutionMembers = context.getSubstitutionMembers(elementTypeInfo.elementName);
		if (Jsonix.Util.Type.isArray(substitutionMembers)) {
			for (var jndex = 0; jndex < substitutionMembers.length; jndex++) {
				var substitutionElementInfo = substitutionMembers[jndex];
				this.buildStructureElementTypeInfos(context, structure, substitutionElementInfo);
			}

		}
	},
	CLASS_NAME : 'Jsonix.Model.AbstractElementRefsPropertyInfo'
});
Jsonix.Model.ElementRefPropertyInfo = Jsonix.Class(Jsonix.Model.AbstractElementRefsPropertyInfo, {
	typeInfo : 'String',
	elementName : null,
	initialize : function(mapping) {
		Jsonix.Util.Ensure.ensureObject(mapping);
		Jsonix.Model.AbstractElementRefsPropertyInfo.prototype.initialize.apply(this, [ mapping ]);
		// TODO Ensure correct argument
		var ti = mapping.typeInfo || mapping.ti || 'String';
		if (Jsonix.Util.Type.isObject(ti)) {
			this.typeInfo = ti;
		} else {
			Jsonix.Util.Ensure.ensureString(ti);
			this.typeInfo = ti;
		}
		var en = mapping.elementName || mapping.en || undefined;
		if (Jsonix.Util.Type.isObject(en)) {
			this.elementName = Jsonix.XML.QName.fromObject(en);
		} else if (Jsonix.Util.Type.isString(en)) {
			this.elementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, en);
		} else {
			this.elementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, this.name);
		}
	},
	getPropertyElementTypeInfo : function(elementName, context) {
		var name = Jsonix.XML.QName.fromObjectOrString(elementName, context);

		if (name.key === this.elementName.key) {
			return this;
		} else {
			return null;
		}
	},
	doBuild : function(context, module) {
		this.typeInfo = context.resolveTypeInfo(this.typeInfo, module);
	},
	buildStructureElements : function(context, structure) {
		this.buildStructureElementTypeInfos(context, structure, this);
	},
	CLASS_NAME : 'Jsonix.Model.ElementRefPropertyInfo'
});
Jsonix.Model.ElementRefPropertyInfo.Simplified = Jsonix.Class(Jsonix.Model.ElementRefPropertyInfo, Jsonix.Binding.Unmarshalls.Element.AsSimplifiedElementRef, {
	CLASS_NAME : 'Jsonix.Model.ElementRefPropertyInfo.Simplified'
});
Jsonix.Model.ElementRefsPropertyInfo = Jsonix.Class(Jsonix.Model.AbstractElementRefsPropertyInfo, {
	elementTypeInfos : null,
	elementTypeInfosMap : null,
	initialize : function(mapping) {
		Jsonix.Util.Ensure.ensureObject(mapping);
		Jsonix.Model.AbstractElementRefsPropertyInfo.prototype.initialize.apply(this, [ mapping ]);
		// TODO Ensure correct arguments
		var etis = mapping.elementTypeInfos || mapping.etis || [];
		Jsonix.Util.Ensure.ensureArray(etis);
		this.elementTypeInfos = [];
		for (var index = 0; index < etis.length; index++)
		{
			this.elementTypeInfos[index] = Jsonix.Util.Type.cloneObject(etis[index]);
		}
	},
	getPropertyElementTypeInfo : function(elementName, context) {
		var name = Jsonix.XML.QName.fromObjectOrString(elementName, context);

		var typeInfo = this.elementTypeInfosMap[name.key];
		if (Jsonix.Util.Type.exists(typeInfo)) {
			return {
				elementName : name,
				typeInfo : typeInfo
			};
		} else {
			return null;
		}
	},
	doBuild : function(context, module) {
		this.elementTypeInfosMap = {};
		var etiti, etien;
		for (var index = 0; index < this.elementTypeInfos.length; index++) {
			var elementTypeInfo = this.elementTypeInfos[index];
			Jsonix.Util.Ensure.ensureObject(elementTypeInfo);
			etiti = elementTypeInfo.typeInfo || elementTypeInfo.ti || 'String';
			elementTypeInfo.typeInfo = context.resolveTypeInfo(etiti, module);
			etien = elementTypeInfo.elementName || elementTypeInfo.en || undefined;
			elementTypeInfo.elementName = Jsonix.XML.QName.fromObjectOrString(etien, context, this.defaultElementNamespaceURI);
			this.elementTypeInfosMap[elementTypeInfo.elementName.key] = elementTypeInfo.typeInfo;
		}
	},
	buildStructureElements : function(context, structure) {
		for (var index = 0; index < this.elementTypeInfos.length; index++) {
			var elementTypeInfo = this.elementTypeInfos[index];
			this.buildStructureElementTypeInfos(context, structure, elementTypeInfo);
		}
	},
	CLASS_NAME : 'Jsonix.Model.ElementRefsPropertyInfo'
});
Jsonix.Model.ElementRefsPropertyInfo.Simplified = Jsonix.Class(Jsonix.Model.ElementRefsPropertyInfo, Jsonix.Binding.Unmarshalls.Element.AsSimplifiedElementRef, {
	CLASS_NAME : 'Jsonix.Model.ElementRefsPropertyInfo.Simplified'
});

Jsonix.Model.AnyElementPropertyInfo = Jsonix.Class(Jsonix.Binding.Marshalls.Element, Jsonix.Binding.Marshalls.Element.AsElementRef, Jsonix.Binding.Unmarshalls.Element, Jsonix.Binding.Unmarshalls.Element.AsElementRef, Jsonix.Model.PropertyInfo, {
	allowDom : true,
	allowTypedObject : true,
	mixed : true,
	initialize : function(mapping) {
		Jsonix.Util.Ensure.ensureObject(mapping);
		Jsonix.Model.PropertyInfo.prototype.initialize.apply(this, [ mapping ]);
		var dom = Jsonix.Util.Type.defaultValue(mapping.allowDom, mapping.dom, true);
		var typed = Jsonix.Util.Type.defaultValue(mapping.allowTypedObject, mapping.typed, true);
		var mx = Jsonix.Util.Type.defaultValue(mapping.mixed, mapping.mx, true);
		this.allowDom = dom;
		this.allowTypedObject = typed;
		this.mixed = mx;
	},
	unmarshal : function(context, input, scope) {
		var result = null;
		var that = this;
		var callback = function(value) {
			if (that.collection) {
				if (result === null) {
					result = [];
				}
				result.push(value);

			} else {
				if (result === null) {
					result = value;
				} else {
					// TODO Report validation error
					throw new Error("Value already set.");
				}
			}
		};

		var et = input.eventType;
		if (et === Jsonix.XML.Input.START_ELEMENT) {
			this.unmarshalElement(context, input, scope, callback);
		} else if (this.mixed && (et === Jsonix.XML.Input.CHARACTERS || et === Jsonix.XML.Input.CDATA || et === Jsonix.XML.Input.ENTITY_REFERENCE)) {
			callback(input.getText());
		} else if (this.mixed && (et === Jsonix.XML.Input.SPACE)) {
			// Whitespace
			// return null;
		} else if (et === Jsonix.XML.Input.COMMENT || et === Jsonix.XML.Input.PROCESSING_INSTRUCTION) {
			// return null;
		} else {
			// TODO better exception
			throw new Error("Illegal state: unexpected event type [" + et + "].");
		}

		return result;
	},
	marshal : function(value, context, output, scope) {
		if (!Jsonix.Util.Type.exists(value)) {
			return;
		}
		if (!this.collection) {
			this.marshalItem(value, context, output, scope);
		} else {
			Jsonix.Util.Ensure.ensureArray(value);
			for (var index = 0; index < value.length; index++) {
				this.marshalItem(value[index], context, output, scope);
			}
		}
	},
	marshalItem : function(value, context, output, scope) {
		if (this.mixed && Jsonix.Util.Type.isString(value)) {
			// Mixed
			output.writeCharacters(value);
		} else if (this.allowDom && Jsonix.Util.Type.exists(value.nodeType)) {
			// DOM node
			output.writeNode(value);

		} else {
			if (this.allowTypedObject) {
				this.marshalElement(value, context, output, scope);
			}
		}
	},
	doBuild : function(context, module) {
		// Nothing to do
	},
	buildStructure : function(context, structure) {
		Jsonix.Util.Ensure.ensureObject(structure);
		if (Jsonix.Util.Type.exists(structure.value)) {
			// TODO better exception
			throw new Error("The structure already defines a value property.");
		} else if (!Jsonix.Util.Type.exists(structure.elements)) {
			structure.elements = {};
		}

		if ((this.allowDom || this.allowTypedObject)) {
			// if (Jsonix.Util.Type.exists(structure.any)) {
			// // TODO better exception
			// throw new Error("The structure already defines the any
			// property.");
			// } else
			// {
			structure.any = this;
			// }
		}
		if (this.mixed) {
			// if (Jsonix.Util.Type.exists(structure.mixed)) {
			// // TODO better exception
			// throw new Error("The structure already defines the mixed
			// property.");
			// } else
			// {
			structure.mixed = this;
			// }
		}
	},
	CLASS_NAME : 'Jsonix.Model.AnyElementPropertyInfo'
});
Jsonix.Model.AnyElementPropertyInfo.Simplified = Jsonix.Class(Jsonix.Model.AnyElementPropertyInfo, Jsonix.Binding.Unmarshalls.Element.AsSimplifiedElementRef, {
	CLASS_NAME : 'Jsonix.Model.AnyElementPropertyInfo.Simplified'
});
Jsonix.Model.Module = Jsonix.Class(Jsonix.Mapping.Styled, {
	name : null,
	typeInfos : null,
	elementInfos : null,
	targetNamespace : '',
	defaultElementNamespaceURI : '',
	defaultAttributeNamespaceURI : '',
	initialize : function(mapping, options) {
		Jsonix.Mapping.Styled.prototype.initialize.apply(this, [ options ]);
		this.typeInfos = [];
		this.elementInfos = [];
		if (typeof mapping !== 'undefined') {
			Jsonix.Util.Ensure.ensureObject(mapping);
			var n = mapping.name || mapping.n || null;
			this.name = n;
			var dens = mapping.defaultElementNamespaceURI || mapping.dens || mapping.targetNamespace || mapping.tns || '';
			this.defaultElementNamespaceURI = dens;
			var tns = mapping.targetNamespace || mapping.tns || mapping.defaultElementNamespaceURI || mapping.dens || this.defaultElementNamespaceURI;
			this.targetNamespace = tns;
			var dans = mapping.defaultAttributeNamespaceURI || mapping.dans || '';
			this.defaultAttributeNamespaceURI = dans;
			// Initialize type infos
			var tis = mapping.typeInfos || mapping.tis || [];
			this.initializeTypeInfos(tis);

			// Backwards compatibility: class infos can also be defined
			// as properties of the schema, for instance Schema.MyType
			for ( var typeInfoName in mapping) {
				if (mapping.hasOwnProperty(typeInfoName)) {
					if (mapping[typeInfoName] instanceof this.mappingStyle.classInfo) {
						this.typeInfos.push(mapping[typeInfoName]);
					}
				}
			}
			var eis = mapping.elementInfos || mapping.eis || [];
			// Initialize element infos
			this.initializeElementInfos(eis);
		}
	},
	initializeTypeInfos : function(typeInfoMappings) {
		Jsonix.Util.Ensure.ensureArray(typeInfoMappings);
		var index, typeInfoMapping, typeInfo;
		for (index = 0; index < typeInfoMappings.length; index++) {
			typeInfoMapping = typeInfoMappings[index];
			typeInfo = this.createTypeInfo(typeInfoMapping);
			this.typeInfos.push(typeInfo);
		}
	},
	initializeElementInfos : function(elementInfoMappings) {
		Jsonix.Util.Ensure.ensureArray(elementInfoMappings);
		var index, elementInfoMapping, elementInfo;
		for (index = 0; index < elementInfoMappings.length; index++) {
			elementInfoMapping = elementInfoMappings[index];
			elementInfo = this.createElementInfo(elementInfoMapping);
			this.elementInfos.push(elementInfo);
		}
	},
	createTypeInfo : function(mapping) {
		Jsonix.Util.Ensure.ensureObject(mapping);
		var typeInfo;
		// If mapping is already a type info, do nothing
		if (mapping instanceof Jsonix.Model.TypeInfo) {
			typeInfo = mapping;
		}
		// Else create it via generic mapping configuration
		else {
			mapping = Jsonix.Util.Type.cloneObject(mapping);
			var type = mapping.type || mapping.t || 'classInfo';
			// Locate the creator function
			if (Jsonix.Util.Type.isFunction(this.typeInfoCreators[type])) {
				var typeInfoCreator = this.typeInfoCreators[type];
				// Call the creator function
				typeInfo = typeInfoCreator.call(this, mapping);
			} else {
				throw new Error("Unknown type info type [" + type + "].");
			}
		}
		return typeInfo;
	},
	initializeNames : function(mapping) {
		var ln = mapping.localName || mapping.ln || null;
		mapping.localName = ln;
		var n = mapping.name || mapping.n || null;
		mapping.name = n;
		// Calculate both name as well as localName
		// name is provided
		if (Jsonix.Util.Type.isString(mapping.name)) {
			// Obsolete code below
			// // localName is not provided
			// if (!Jsonix.Util.Type.isString(mapping.localName)) {
			// // But module name is provided
			// if (Jsonix.Util.Type.isString(this.name)) {
			// // If name starts with module name, use second part
			// // as local name
			// if (mapping.name.indexOf(this.name + '.') === 0) {
			// mapping.localName = mapping.name
			// .substring(this.name.length + 1);
			// }
			// // Else use name as local name
			// else {
			// mapping.localName = mapping.name;
			// }
			// }
			// // Module name is not provided, use name as local name
			// else {
			// mapping.localName = mapping.name;
			// }
			// }
			if (mapping.name.length > 0 && mapping.name.charAt(0) === '.' && Jsonix.Util.Type.isString(this.name)) {
				mapping.name = this.name + mapping.name;
			}
		}
		// name is not provided but local name is provided
		else if (Jsonix.Util.Type.isString(ln)) {
			// Module name is provided
			if (Jsonix.Util.Type.isString(this.name)) {
				mapping.name = this.name + '.' + ln;
			}
			// Module name is not provided
			else {
				mapping.name = ln;
			}
		} else {
			throw new Error("Neither [name/n] nor [localName/ln] was provided for the class info.");
		}
	},
	createClassInfo : function(mapping) {
		Jsonix.Util.Ensure.ensureObject(mapping);
		var dens = mapping.defaultElementNamespaceURI || mapping.dens || this.defaultElementNamespaceURI;
		mapping.defaultElementNamespaceURI = dens;
		var tns = mapping.targetNamespace || mapping.tns || this.targetNamespace;
		mapping.targetNamespace = tns;
		var dans = mapping.defaultAttributeNamespaceURI || mapping.dans || this.defaultAttributeNamespaceURI;
		mapping.defaultAttributeNamespaceURI = dans;
		this.initializeNames(mapping);
		// Now both name an local name are initialized
		var classInfo = new this.mappingStyle.classInfo(mapping, {
			mappingStyle : this.mappingStyle
		});
		return classInfo;
	},
	createEnumLeafInfo : function(mapping) {
		Jsonix.Util.Ensure.ensureObject(mapping);
		this.initializeNames(mapping);
		// Now both name an local name are initialized
		var enumLeafInfo = new this.mappingStyle.enumLeafInfo(mapping, {
			mappingStyle : this.mappingStyle
		});
		return enumLeafInfo;
	},
	createList : function(mapping) {
		Jsonix.Util.Ensure.ensureObject(mapping);
		var ti = mapping.baseTypeInfo || mapping.typeInfo || mapping.bti || mapping.ti || 'String';
		var tn = mapping.typeName || mapping.tn || null;

		if (Jsonix.Util.Type.exists(tn)) {
			if (Jsonix.Util.Type.isString(tn)) {
				tn = new Jsonix.XML.QName(this.targetNamespace, tn);
			} else {
				tn = Jsonix.XML.QName.fromObject(tn);
			}
		}
		var s = mapping.separator || mapping.sep || ' ';
		Jsonix.Util.Ensure.ensureExists(ti);
		return new Jsonix.Schema.XSD.List(ti, tn, s);
	},
	createElementInfo : function(mapping) {
		Jsonix.Util.Ensure.ensureObject(mapping);
		mapping = Jsonix.Util.Type.cloneObject(mapping);

		var dens = mapping.defaultElementNamespaceURI || mapping.dens || this.defaultElementNamespaceURI;
		mapping.defaultElementNamespaceURI = dens;
		var en = mapping.elementName || mapping.en || undefined;
		Jsonix.Util.Ensure.ensureExists(en);

		var ti = mapping.typeInfo || mapping.ti || 'String';
		Jsonix.Util.Ensure.ensureExists(ti);

		mapping.typeInfo = ti;
		if (Jsonix.Util.Type.isObject(en)) {
			mapping.elementName = Jsonix.XML.QName.fromObject(en);
		} else if (Jsonix.Util.Type.isString(en)) {
			mapping.elementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, en);
		} else {
			throw new Error('Element info [' + mapping + '] must provide an element name.');
		}

		var sh = mapping.substitutionHead || mapping.sh || null;
		if (Jsonix.Util.Type.exists(sh)) {
			if (Jsonix.Util.Type.isObject(sh)) {
				mapping.substitutionHead = Jsonix.XML.QName.fromObject(sh);
			} else {
				Jsonix.Util.Ensure.ensureString(sh);
				mapping.substitutionHead = new Jsonix.XML.QName(this.defaultElementNamespaceURI, sh);
			}
		}

		var elementInfo = new this.mappingStyle.elementInfo(mapping, {
			mappingStyle : this.mappingStyle
		});
		return elementInfo;
	},
	registerTypeInfos : function(context) {
		for (var index = 0; index < this.typeInfos.length; index++) {
			var typeInfo = this.typeInfos[index];
			context.registerTypeInfo(typeInfo, this);
		}
	},
	buildTypeInfos : function(context) {
		for (var index = 0; index < this.typeInfos.length; index++) {
			var typeInfo = this.typeInfos[index];
			typeInfo.build(context, this);
		}
	},
	registerElementInfos : function(context) {
		for (var index = 0; index < this.elementInfos.length; index++) {
			var elementInfo = this.elementInfos[index];
			context.registerElementInfo(elementInfo, this);
		}
	},
	buildElementInfos : function(context) {
		for (var index = 0; index < this.elementInfos.length; index++) {
			var elementInfo = this.elementInfos[index];
			elementInfo.build(context, this);
		}
	},
	// Obsolete, retained for backwards compatibility
	cs : function() {
		return this;
	},
	// Obsolete, retained for backwards compatibility
	es : function() {
		return this;
	},
	CLASS_NAME : 'Jsonix.Model.Module'
});
Jsonix.Model.Module.prototype.typeInfoCreators = {
	"classInfo" : Jsonix.Model.Module.prototype.createClassInfo,
	"c" : Jsonix.Model.Module.prototype.createClassInfo,
	"enumInfo" : Jsonix.Model.Module.prototype.createEnumLeafInfo,
	"enum" : Jsonix.Model.Module.prototype.createEnumLeafInfo,
	"list" : Jsonix.Model.Module.prototype.createList,
	"l" : Jsonix.Model.Module.prototype.createList
};
Jsonix.Mapping.Style.Standard = Jsonix.Class(Jsonix.Mapping.Style, {
	marshaller : Jsonix.Binding.Marshaller,
	unmarshaller : Jsonix.Binding.Unmarshaller,
	module : Jsonix.Model.Module,
	elementInfo : Jsonix.Model.ElementInfo,
	classInfo : Jsonix.Model.ClassInfo,
	enumLeafInfo : Jsonix.Model.EnumLeafInfo,
	anyAttributePropertyInfo : Jsonix.Model.AnyAttributePropertyInfo,
	anyElementPropertyInfo : Jsonix.Model.AnyElementPropertyInfo,
	attributePropertyInfo : Jsonix.Model.AttributePropertyInfo,
	elementMapPropertyInfo : Jsonix.Model.ElementMapPropertyInfo,
	elementPropertyInfo : Jsonix.Model.ElementPropertyInfo,
	elementsPropertyInfo : Jsonix.Model.ElementsPropertyInfo,
	elementRefPropertyInfo : Jsonix.Model.ElementRefPropertyInfo,
	elementRefsPropertyInfo : Jsonix.Model.ElementRefsPropertyInfo,
	valuePropertyInfo : Jsonix.Model.ValuePropertyInfo,
	initialize : function() {
		Jsonix.Mapping.Style.prototype.initialize.apply(this);
	},
	CLASS_NAME : 'Jsonix.Mapping.Style.Standard'
});
Jsonix.Mapping.Style.STYLES.standard = new Jsonix.Mapping.Style.Standard();

Jsonix.Mapping.Style.Simplified = Jsonix.Class(Jsonix.Mapping.Style, {
	marshaller : Jsonix.Binding.Marshaller.Simplified,
	unmarshaller : Jsonix.Binding.Unmarshaller.Simplified,
	module : Jsonix.Model.Module,
	elementInfo : Jsonix.Model.ElementInfo,
	classInfo : Jsonix.Model.ClassInfo,
	enumLeafInfo : Jsonix.Model.EnumLeafInfo,
	anyAttributePropertyInfo : Jsonix.Model.AnyAttributePropertyInfo.Simplified,
	anyElementPropertyInfo : Jsonix.Model.AnyElementPropertyInfo.Simplified,
	attributePropertyInfo : Jsonix.Model.AttributePropertyInfo,
	elementMapPropertyInfo : Jsonix.Model.ElementMapPropertyInfo,
	elementPropertyInfo : Jsonix.Model.ElementPropertyInfo,
	elementsPropertyInfo : Jsonix.Model.ElementsPropertyInfo,
	elementRefPropertyInfo : Jsonix.Model.ElementRefPropertyInfo.Simplified,
	elementRefsPropertyInfo : Jsonix.Model.ElementRefsPropertyInfo.Simplified,
	valuePropertyInfo : Jsonix.Model.ValuePropertyInfo,
	initialize : function() {
		Jsonix.Mapping.Style.prototype.initialize.apply(this);
	},
	CLASS_NAME : 'Jsonix.Mapping.Style.Simplified'
});
Jsonix.Mapping.Style.STYLES.simplified = new Jsonix.Mapping.Style.Simplified();

Jsonix.Schema.XSD = {};
Jsonix.Schema.XSD.NAMESPACE_URI = 'http://www.w3.org/2001/XMLSchema';
Jsonix.Schema.XSD.PREFIX = 'xsd';
Jsonix.Schema.XSD.qname = function(localPart) {
	Jsonix.Util.Ensure.ensureString(localPart);
	return new Jsonix.XML.QName(Jsonix.Schema.XSD.NAMESPACE_URI, localPart,
			Jsonix.Schema.XSD.PREFIX);
};

Jsonix.Schema.XSD.AnyType = Jsonix.Class(Jsonix.Model.ClassInfo, {
	typeName : Jsonix.Schema.XSD.qname('anyType'),
	initialize : function() {
		Jsonix.Model.ClassInfo.prototype.initialize.call(this, {
			name : 'AnyType',
			propertyInfos : [ {
				type : 'anyAttribute',
				name : 'attributes'
			}, {
				type : 'anyElement',
				name : 'content',
				collection : true
			} ]
		});
	},
	CLASS_NAME : 'Jsonix.Schema.XSD.AnyType'
});
Jsonix.Schema.XSD.AnyType.INSTANCE = new Jsonix.Schema.XSD.AnyType();
Jsonix.Schema.XSD.AnySimpleType = Jsonix.Class(Jsonix.Model.TypeInfo, {
	name : 'AnySimpleType',
	typeName : Jsonix.Schema.XSD.qname('anySimpleType'),
	initialize : function() {
		Jsonix.Model.TypeInfo.prototype.initialize.apply(this, []);
	},	
	print : function(value, context, output, scope) {
		throw new Error('Abstract method [print].');
	},
	parse : function(text, context, input, scope) {
		throw new Error('Abstract method [parse].');
	},
	reprint : function(value, context, output, scope) {
		// Only reprint when the value is a string but not an instance
		if (Jsonix.Util.Type.isString(value) && !this.isInstance(value, context, scope)) {
			// Using null as input as input is not available
			return this.print(this.parse(value, context, null, scope), context, output, scope);
		}
		else
		{
			return this.print(value, context, output, scope);
		}
	},
	unmarshal : function(context, input, scope) {
		var text = input.getElementText();
		if (Jsonix.Util.StringUtils.isNotBlank(text)) {
			return this.parse(text, context, input, scope);
		}
		else
		{
			return null;
		}
	},
	marshal : function(value, context, output, scope) {
		if (Jsonix.Util.Type.exists(value)) {
			output.writeCharacters(this.reprint(value, context, output, scope));
		}
	},
	build: function(context, module)
	{
		// Nothing to do
	},
	CLASS_NAME : 'Jsonix.Schema.XSD.AnySimpleType'
});

Jsonix.Schema.XSD.List = Jsonix
		.Class(
				Jsonix.Schema.XSD.AnySimpleType,
				{
					name : null,
					typeName : null,
					typeInfo : null,
					separator : ' ',
					trimmedSeparator : Jsonix.Util.StringUtils.whitespaceCharacters,
					simpleType : true,
					built : false,
					initialize : function(typeInfo, typeName, separator) {
						Jsonix.Util.Ensure.ensureExists(typeInfo);
						// TODO Ensure correct argument
						this.typeInfo = typeInfo;
						if (!Jsonix.Util.Type.exists(this.name)) {
							this.name = typeInfo.name + "*";
						}
						if (Jsonix.Util.Type.exists(typeName)) {
							// TODO Ensure correct argument
							this.typeName = typeName;
						}

						if (Jsonix.Util.Type.isString(separator)) {
							// TODO Ensure correct argument
							this.separator = separator;
						} else {
							this.separator = ' ';
						}

						var trimmedSeparator = Jsonix.Util.StringUtils
								.trim(this.separator);
						if (trimmedSeparator.length === 0) {
							this.trimmedSeparator = Jsonix.Util.StringUtils.whitespaceCharacters;
						} else {
							this.trimmedSeparator = trimmedSeparator;
						}
					},
					build : function(context, module) {
						if (!this.built) {
							this.typeInfo = context.resolveTypeInfo(this.typeInfo, module);
							this.built = true;
						}
					},
					print : function(value, context, output, scope) {
						if (!Jsonix.Util.Type.exists(value)) {
							return null;
						}
						// TODO Exception if not an array
						Jsonix.Util.Ensure.ensureArray(value);
						var result = '';
						for ( var index = 0; index < value.length; index++) {
							if (index > 0) {
								result = result + this.separator;
							}
							result = result + this.typeInfo.reprint(value[index], context, output, scope);
						}
						return result;
					},
					parse : function(text, context, input, scope) {
						Jsonix.Util.Ensure.ensureString(text);
						var items = Jsonix.Util.StringUtils
								.splitBySeparatorChars(text,
										this.trimmedSeparator);
						var result = [];
						for ( var index = 0; index < items.length; index++) {
							result.push(this.typeInfo
									.parse(Jsonix.Util.StringUtils.trim(items[index]), context, input, scope));
						}
						return result;
					},
					// TODO isInstance?
					CLASS_NAME : 'Jsonix.Schema.XSD.List'
				});

Jsonix.Schema.XSD.String = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
	name : 'String',
	typeName : Jsonix.Schema.XSD.qname('string'),
	unmarshal : function(context, input, scope) {
		var text = input.getElementText();
		return this.parse(text, context, input, scope);
	},
	print : function(value, context, output, scope) {
		Jsonix.Util.Ensure.ensureString(value);
		return value;
	},
	parse : function(text, context, input, scope) {
		Jsonix.Util.Ensure.ensureString(text);
		return text;
	},
	isInstance : function(value, context, scope) {
		return Jsonix.Util.Type.isString(value);
	},
	CLASS_NAME : 'Jsonix.Schema.XSD.String'
});
Jsonix.Schema.XSD.String.INSTANCE = new Jsonix.Schema.XSD.String();
Jsonix.Schema.XSD.String.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.String.INSTANCE);
Jsonix.Schema.XSD.Strings = Jsonix.Class(Jsonix.Schema.XSD.List, {
	name : 'Strings',
	initialize : function() {
		Jsonix.Schema.XSD.List.prototype.initialize.apply(this, [ Jsonix.Schema.XSD.String.INSTANCE, Jsonix.Schema.XSD.qname('strings'), ' ' ]);
	},
	// TODO Constraints
	CLASS_NAME : 'Jsonix.Schema.XSD.Strings'
});
Jsonix.Schema.XSD.Strings.INSTANCE = new Jsonix.Schema.XSD.Strings();
Jsonix.Schema.XSD.NormalizedString = Jsonix.Class(Jsonix.Schema.XSD.String, {
	name : 'NormalizedString',
	typeName : Jsonix.Schema.XSD.qname('normalizedString'),
	// TODO Constraints
	CLASS_NAME : 'Jsonix.Schema.XSD.NormalizedString'
});
Jsonix.Schema.XSD.NormalizedString.INSTANCE = new Jsonix.Schema.XSD.NormalizedString();
Jsonix.Schema.XSD.NormalizedString.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.NormalizedString.INSTANCE);
Jsonix.Schema.XSD.Token = Jsonix.Class(Jsonix.Schema.XSD.NormalizedString, {
	name : 'Token',
	typeName : Jsonix.Schema.XSD.qname('token'),
	// TODO Constraints
	CLASS_NAME : 'Jsonix.Schema.XSD.Token'
});
Jsonix.Schema.XSD.Token.INSTANCE = new Jsonix.Schema.XSD.Token();
Jsonix.Schema.XSD.Token.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Token.INSTANCE);
Jsonix.Schema.XSD.Language = Jsonix.Class(Jsonix.Schema.XSD.Token, {
	name : 'Language',
	typeName : Jsonix.Schema.XSD.qname('language'),
	// TODO Constraints
	CLASS_NAME : 'Jsonix.Schema.XSD.Language'
});
Jsonix.Schema.XSD.Language.INSTANCE = new Jsonix.Schema.XSD.Language();
Jsonix.Schema.XSD.Language.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Language.INSTANCE);
Jsonix.Schema.XSD.Name = Jsonix.Class(Jsonix.Schema.XSD.Token, {
	name : 'Name',
	typeName : Jsonix.Schema.XSD.qname('Name'),
	// TODO Constraints
	CLASS_NAME : 'Jsonix.Schema.XSD.Name'
});
Jsonix.Schema.XSD.Name.INSTANCE = new Jsonix.Schema.XSD.Name();
Jsonix.Schema.XSD.Name.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Name.INSTANCE);
Jsonix.Schema.XSD.NCName = Jsonix.Class(Jsonix.Schema.XSD.Name, {
	name : 'NCName',
	typeName : Jsonix.Schema.XSD.qname('NCName'),
	// TODO Constraints
	CLASS_NAME : 'Jsonix.Schema.XSD.NCName'
});
Jsonix.Schema.XSD.NCName.INSTANCE = new Jsonix.Schema.XSD.NCName();
Jsonix.Schema.XSD.NCName.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.NCName.INSTANCE);
Jsonix.Schema.XSD.NMToken = Jsonix.Class(Jsonix.Schema.XSD.Token, {
	name : 'NMToken',
	typeName : Jsonix.Schema.XSD.qname('NMTOKEN'),
	// TODO Constraints
	CLASS_NAME : 'Jsonix.Schema.XSD.NMToken'
});
Jsonix.Schema.XSD.NMToken.INSTANCE = new Jsonix.Schema.XSD.NMToken();
Jsonix.Schema.XSD.NMTokens = Jsonix.Class(Jsonix.Schema.XSD.List, {
	name : 'NMTokens',
	initialize : function() {
		Jsonix.Schema.XSD.List.prototype.initialize.apply(this, [ Jsonix.Schema.XSD.NMToken.INSTANCE, Jsonix.Schema.XSD.qname('NMTOKEN'), ' ' ]);
	},
	// TODO Constraints
	CLASS_NAME : 'Jsonix.Schema.XSD.NMTokens'
});
Jsonix.Schema.XSD.NMTokens.INSTANCE = new Jsonix.Schema.XSD.NMTokens();
Jsonix.Schema.XSD.Boolean = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
	name : 'Boolean',
	typeName : Jsonix.Schema.XSD.qname('boolean'),
	print : function(value, context, output, scope) {
		Jsonix.Util.Ensure.ensureBoolean(value);
		return value ? 'true' : 'false';
	},
	parse : function(text, context, input, scope) {
		Jsonix.Util.Ensure.ensureString(text);
		if (text === 'true' || text === '1') {
			return true;
		} else if (text === 'false' || text === '0') {
			return false;
		} else {
			throw new Error("Either [true], [1], [0] or [false] expected as boolean value.");
		}
	},
	isInstance : function(value, context, scope) {
		return Jsonix.Util.Type.isBoolean(value);
	},
	CLASS_NAME : 'Jsonix.Schema.XSD.Boolean'
});
Jsonix.Schema.XSD.Boolean.INSTANCE = new Jsonix.Schema.XSD.Boolean();
Jsonix.Schema.XSD.Boolean.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Boolean.INSTANCE);
Jsonix.Schema.XSD.Base64Binary = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
	name : 'Base64Binary',
	typeName : Jsonix.Schema.XSD.qname('base64Binary'),
	charToByte : {},
	byteToChar : [],
	initialize : function() {
		Jsonix.Schema.XSD.AnySimpleType.prototype.initialize.apply(this);
		// Initialize charToByte and byteToChar table for fast
		// lookups
		var charTable = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		for (var i = 0; i < charTable.length; i++) {
			var _char = charTable.charAt(i);
			var _byte = charTable.charCodeAt(i);
			this.byteToChar[i] = _char;
			this.charToByte[_char] = i;
		}
	},
	print : function(value, context, output, scope) {
		Jsonix.Util.Ensure.ensureArray(value);
		return this.encode(value);
	},

	parse : function(text, context, input, scope) {
		Jsonix.Util.Ensure.ensureString(text);
		return this.decode(text);
	},
	encode : function(uarray) {
		var output = "";
		var byte0;
		var byte1;
		var byte2;
		var char0;
		var char1;
		var char2;
		var char3;
		var i = 0;
		var j = 0;
		var length = uarray.length;

		for (i = 0; i < length; i += 3) {
			byte0 = uarray[i] & 0xFF;
			char0 = this.byteToChar[byte0 >> 2];

			if (i + 1 < length) {
				byte1 = uarray[i + 1] & 0xFF;
				char1 = this.byteToChar[((byte0 & 0x03) << 4) | (byte1 >> 4)];
				if (i + 2 < length) {
					byte2 = uarray[i + 2] & 0xFF;
					char2 = this.byteToChar[((byte1 & 0x0F) << 2) | (byte2 >> 6)];
					char3 = this.byteToChar[byte2 & 0x3F];
				} else {
					char2 = this.byteToChar[(byte1 & 0x0F) << 2];
					char3 = "=";
				}
			} else {
				char1 = this.byteToChar[(byte0 & 0x03) << 4];
				char2 = "=";
				char3 = "=";
			}
			output = output + char0 + char1 + char2 + char3;
		}
		return output;
	},
	decode : function(text) {

		input = text.replace(/[^A-Za-z0-9\+\/\=]/g, "");

		var length = (input.length / 4) * 3;
		if (input.charAt(input.length - 1) === "=") {
			length--;
		}
		if (input.charAt(input.length - 2) === "=") {
			length--;
		}

		var uarray = new Array(length);

		var byte0;
		var byte1;
		var byte2;
		var char0;
		var char1;
		var char2;
		var char3;
		var i = 0;
		var j = 0;

		for (i = 0; i < length; i += 3) {
			// get the 3 octects in 4 ascii chars
			char0 = this.charToByte[input.charAt(j++)];
			char1 = this.charToByte[input.charAt(j++)];
			char2 = this.charToByte[input.charAt(j++)];
			char3 = this.charToByte[input.charAt(j++)];

			byte0 = (char0 << 2) | (char1 >> 4);
			byte1 = ((char1 & 0x0F) << 4) | (char2 >> 2);
			byte2 = ((char2 & 0x03) << 6) | char3;

			uarray[i] = byte0;
			if (char2 != 64) {
				uarray[i + 1] = byte1;
			}
			if (char3 != 64) {
				uarray[i + 2] = byte2;
			}
		}
		return uarray;
	},
	isInstance : function(value, context, scope) {
		return Jsonix.Util.Type.isArray(value);
	},
	CLASS_NAME : 'Jsonix.Schema.XSD.Base64Binary'
});
Jsonix.Schema.XSD.Base64Binary.INSTANCE = new Jsonix.Schema.XSD.Base64Binary();
Jsonix.Schema.XSD.Base64Binary.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Base64Binary.INSTANCE);
Jsonix.Schema.XSD.HexBinary = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
	name : 'HexBinary',
	typeName : Jsonix.Schema.XSD.qname('hexBinary'),
	charToQuartet : {},
	byteToDuplet : [],
	initialize : function() {
		Jsonix.Schema.XSD.AnySimpleType.prototype.initialize.apply(this);
		var charTableUpperCase = "0123456789ABCDEF";
		var charTableLowerCase = charTableUpperCase.toLowerCase();
		var i;
		for (i = 0; i < 16; i++) {
			this.charToQuartet[charTableUpperCase.charAt(i)] = i;
			if (i >= 0xA) {
				this.charToQuartet[charTableLowerCase.charAt(i)] = i;
			}
		}
		for (i = 0; i < 256; i++) {
			this.byteToDuplet[i] =
			//
			charTableUpperCase[i >> 4] + charTableUpperCase[i & 0xF];
		}
	},
	print : function(value, context, output, scope) {
		Jsonix.Util.Ensure.ensureArray(value);
		return this.encode(value);
	},

	parse : function(text, context, input, scope) {
		Jsonix.Util.Ensure.ensureString(text);
		return this.decode(text);
	},
	encode : function(uarray) {
		var output = "";
		for ( var i = 0; i < uarray.length; i++) {
			output = output + this.byteToDuplet[uarray[i] & 0xFF];
		}
		return output;
	},
	decode : function(text) {
		var input = text.replace(/[^A-Fa-f0-9]/g, "");
		// Round by two
		var length = input.length >> 1;
		var uarray = new Array(length);
		for ( var i = 0; i < length; i++) {
			var char0 = input.charAt(2 * i);
			var char1 = input.charAt(2 * i + 1);
			uarray[i] = this.charToQuartet[char0] << 4
					| this.charToQuartet[char1];
		}
		return uarray;
	},
	isInstance : function(value, context, scope) {
		return Jsonix.Util.Type.isArray(value);
	},
	CLASS_NAME : 'Jsonix.Schema.XSD.HexBinary'
});
Jsonix.Schema.XSD.HexBinary.INSTANCE = new Jsonix.Schema.XSD.HexBinary();
Jsonix.Schema.XSD.HexBinary.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.HexBinary.INSTANCE);
Jsonix.Schema.XSD.Number = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
	name : 'Number',
	typeName : Jsonix.Schema.XSD.qname('number'),
	print : function(value, context, output, scope) {
		Jsonix.Util.Ensure.ensureNumberOrNaN(value);
		if (Jsonix.Util.Type.isNaN(value)) {
			return 'NaN';
		} else if (value === Infinity) {
			return 'INF';
		} else if (value === -Infinity) {
			return '-INF';
		} else {
			var text = String(value);
			return text;
		}
	},
	parse : function(text, context, input, scope) {
		Jsonix.Util.Ensure.ensureString(text);
		if (text === '-INF') {
			return -Infinity;
		} else if (text === 'INF') {
			return Infinity;
		} else if (text === 'NaN') {
			return NaN;
		} else {
			var value = Number(text);
			Jsonix.Util.Ensure.ensureNumber(value);
			return value;
		}
	},
	isInstance : function(value, context, scope) {
		return Jsonix.Util.Type.isNumberOrNaN(value);
	},
	CLASS_NAME : 'Jsonix.Schema.XSD.Number'
});
Jsonix.Schema.XSD.Number.INSTANCE = new Jsonix.Schema.XSD.Number();
Jsonix.Schema.XSD.Number.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Number.INSTANCE);
Jsonix.Schema.XSD.Float = Jsonix.Class(Jsonix.Schema.XSD.Number, {
	name : 'Float',
	typeName : Jsonix.Schema.XSD.qname('float'),
	isInstance : function(value, context, scope) {
		return Jsonix.Util.Type.isNaN(value) || value === -Infinity || value === Infinity || (Jsonix.Util.Type.isNumber(value) && value >= this.MIN_VALUE && value <= this.MAX_VALUE);
	},
	MIN_VALUE : -3.4028235e+38,
	MAX_VALUE : 3.4028235e+38,
	CLASS_NAME : 'Jsonix.Schema.XSD.Float'
});
Jsonix.Schema.XSD.Float.INSTANCE = new Jsonix.Schema.XSD.Float();
Jsonix.Schema.XSD.Float.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Float.INSTANCE);
Jsonix.Schema.XSD.Decimal = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
	name : 'Decimal',
	typeName : Jsonix.Schema.XSD.qname('decimal'),
	print : function(value, context, output, scope) {
		Jsonix.Util.Ensure.ensureNumber(value);
		var text = String(value);
		return text;
	},
	parse : function(text, context, input, scope) {
		Jsonix.Util.Ensure.ensureString(text);
		var value = Number(text);
		Jsonix.Util.Ensure.ensureNumber(value);
		return value;
	},
	isInstance : function(value, context, scope) {
		return Jsonix.Util.Type.isNumber(value);
	},
	CLASS_NAME : 'Jsonix.Schema.XSD.Decimal'
});
Jsonix.Schema.XSD.Decimal.INSTANCE = new Jsonix.Schema.XSD.Decimal();
Jsonix.Schema.XSD.Decimal.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Decimal.INSTANCE);
Jsonix.Schema.XSD.Integer = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
	name : 'Integer',
	typeName : Jsonix.Schema.XSD.qname('integer'),
	print : function(value, context, output, scope) {
		Jsonix.Util.Ensure.ensureInteger(value);
		var text = String(value);
		return text;
	},
	parse : function(text, context, input, scope) {
		Jsonix.Util.Ensure.ensureString(text);
		var value = Number(text);
		Jsonix.Util.Ensure.ensureInteger(value);
		return value;
	},
	isInstance : function(value, context, scope) {
		return Jsonix.Util.NumberUtils.isInteger(value) && value >= this.MIN_VALUE && value <= this.MAX_VALUE;
	},
	MIN_VALUE : -9223372036854775808,
	MAX_VALUE : 9223372036854775807,
	CLASS_NAME : 'Jsonix.Schema.XSD.Integer'
});
Jsonix.Schema.XSD.Integer.INSTANCE = new Jsonix.Schema.XSD.Integer();
Jsonix.Schema.XSD.Integer.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Integer.INSTANCE);
Jsonix.Schema.XSD.NonPositiveInteger = Jsonix.Class(Jsonix.Schema.XSD.Integer, {
	name : 'NonPositiveInteger',
	typeName : Jsonix.Schema.XSD.qname('nonPositiveInteger'),
	MIN_VALUE: -9223372036854775808,
	MAX_VALUE: 0,
	CLASS_NAME : 'Jsonix.Schema.XSD.NonPositiveInteger'
});
Jsonix.Schema.XSD.NonPositiveInteger.INSTANCE = new Jsonix.Schema.XSD.NonPositiveInteger();
Jsonix.Schema.XSD.NonPositiveInteger.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.NonPositiveInteger.INSTANCE);
Jsonix.Schema.XSD.NegativeInteger = Jsonix.Class(Jsonix.Schema.XSD.NonPositiveInteger, {
	name : 'NegativeInteger',
	typeName : Jsonix.Schema.XSD.qname('negativeInteger'),
	MIN_VALUE: -9223372036854775808,
	MAX_VALUE: -1,
	CLASS_NAME : 'Jsonix.Schema.XSD.NegativeInteger'
});
Jsonix.Schema.XSD.NegativeInteger.INSTANCE = new Jsonix.Schema.XSD.NegativeInteger();
Jsonix.Schema.XSD.NegativeInteger.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.NegativeInteger.INSTANCE);
Jsonix.Schema.XSD.Long = Jsonix.Class(Jsonix.Schema.XSD.Integer, {
	name : 'Long',
	typeName : Jsonix.Schema.XSD.qname('long'),
	MIN_VALUE : -9223372036854775808,
	MAX_VALUE : 9223372036854775807,
	CLASS_NAME : 'Jsonix.Schema.XSD.Long'
});
Jsonix.Schema.XSD.Long.INSTANCE = new Jsonix.Schema.XSD.Long();
Jsonix.Schema.XSD.Long.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.Long.INSTANCE);
Jsonix.Schema.XSD.Int = Jsonix.Class(Jsonix.Schema.XSD.Long, {
	name : 'Int',
	typeName : Jsonix.Schema.XSD.qname('int'),
	MIN_VALUE : -2147483648,
	MAX_VALUE : 2147483647,
	CLASS_NAME : 'Jsonix.Schema.XSD.Int'
});
Jsonix.Schema.XSD.Int.INSTANCE = new Jsonix.Schema.XSD.Int();
Jsonix.Schema.XSD.Int.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.Int.INSTANCE);
Jsonix.Schema.XSD.Short = Jsonix.Class(Jsonix.Schema.XSD.Int, {
	name : 'Short',
	typeName : Jsonix.Schema.XSD.qname('short'),
	MIN_VALUE : -32768,
	MAX_VALUE : 32767,
	CLASS_NAME : 'Jsonix.Schema.XSD.Short'
});
Jsonix.Schema.XSD.Short.INSTANCE = new Jsonix.Schema.XSD.Short();
Jsonix.Schema.XSD.Short.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Short.INSTANCE);
Jsonix.Schema.XSD.Byte = Jsonix.Class(Jsonix.Schema.XSD.Short, {
	name : 'Byte',
	typeName : Jsonix.Schema.XSD.qname('byte'),
	MIN_VALUE : -128,
	MAX_VALUE : 127,
	CLASS_NAME : 'Jsonix.Schema.XSD.Byte'
});
Jsonix.Schema.XSD.Byte.INSTANCE = new Jsonix.Schema.XSD.Byte();
Jsonix.Schema.XSD.Byte.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Byte.INSTANCE);
Jsonix.Schema.XSD.NonNegativeInteger = Jsonix.Class(Jsonix.Schema.XSD.Integer, {
	name : 'NonNegativeInteger',
	typeName : Jsonix.Schema.XSD.qname('nonNegativeInteger'),
	MIN_VALUE: 0,
	MAX_VALUE: 9223372036854775807,
	CLASS_NAME : 'Jsonix.Schema.XSD.NonNegativeInteger'
});
Jsonix.Schema.XSD.NonNegativeInteger.INSTANCE = new Jsonix.Schema.XSD.NonNegativeInteger();
Jsonix.Schema.XSD.NonNegativeInteger.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.NonNegativeInteger.INSTANCE);
Jsonix.Schema.XSD.UnsignedLong = Jsonix.Class(Jsonix.Schema.XSD.NonNegativeInteger, {
	name : 'UnsignedLong',
	typeName : Jsonix.Schema.XSD.qname('unsignedLong'),
	MIN_VALUE : 0,
	MAX_VALUE : 18446744073709551615,
	CLASS_NAME : 'Jsonix.Schema.XSD.UnsignedLong'
});
Jsonix.Schema.XSD.UnsignedLong.INSTANCE = new Jsonix.Schema.XSD.UnsignedLong();
Jsonix.Schema.XSD.UnsignedLong.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.UnsignedLong.INSTANCE);
Jsonix.Schema.XSD.UnsignedInt = Jsonix.Class(Jsonix.Schema.XSD.UnsignedLong, {
	name : 'UnsignedInt',
	typeName : Jsonix.Schema.XSD.qname('unsignedInt'),
	MIN_VALUE : 0,
	MAX_VALUE : 4294967295,
	CLASS_NAME : 'Jsonix.Schema.XSD.UnsignedInt'
});
Jsonix.Schema.XSD.UnsignedInt.INSTANCE = new Jsonix.Schema.XSD.UnsignedInt();
Jsonix.Schema.XSD.UnsignedInt.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.UnsignedInt.INSTANCE);
Jsonix.Schema.XSD.UnsignedShort = Jsonix.Class(Jsonix.Schema.XSD.UnsignedInt, {
	name : 'UnsignedShort',
	typeName : Jsonix.Schema.XSD.qname('unsignedShort'),
	MIN_VALUE : 0,
	MAX_VALUE : 65535,
	CLASS_NAME : 'Jsonix.Schema.XSD.UnsignedShort'
});
Jsonix.Schema.XSD.UnsignedShort.INSTANCE = new Jsonix.Schema.XSD.UnsignedShort();
Jsonix.Schema.XSD.UnsignedShort.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.UnsignedShort.INSTANCE);
Jsonix.Schema.XSD.UnsignedByte = Jsonix.Class(Jsonix.Schema.XSD.UnsignedShort, {
	name : 'UnsignedByte',
	typeName : Jsonix.Schema.XSD.qname('unsignedByte'),
	MIN_VALUE : 0,
	MAX_VALUE : 255,
	CLASS_NAME : 'Jsonix.Schema.XSD.UnsignedByte'
});
Jsonix.Schema.XSD.UnsignedByte.INSTANCE = new Jsonix.Schema.XSD.UnsignedByte();
Jsonix.Schema.XSD.UnsignedByte.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.UnsignedByte.INSTANCE);
Jsonix.Schema.XSD.PositiveInteger = Jsonix.Class(Jsonix.Schema.XSD.NonNegativeInteger, {
	name : 'PositiveInteger',
	typeName : Jsonix.Schema.XSD.qname('positiveInteger'),
	MIN_VALUE : 1,
	MAX_VALUE : 9223372036854775807,
	CLASS_NAME : 'Jsonix.Schema.XSD.PositiveInteger'
});
Jsonix.Schema.XSD.PositiveInteger.INSTANCE = new Jsonix.Schema.XSD.PositiveInteger();
Jsonix.Schema.XSD.PositiveInteger.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.PositiveInteger.INSTANCE);
Jsonix.Schema.XSD.Double = Jsonix.Class(Jsonix.Schema.XSD.Number, {
	name : 'Double',
	typeName : Jsonix.Schema.XSD.qname('double'),
	isInstance : function(value, context, scope) {
		return Jsonix.Util.Type.isNaN(value) || value === -Infinity || value === Infinity || (Jsonix.Util.Type.isNumber(value) && value >= this.MIN_VALUE && value <= this.MAX_VALUE);
	},
	MIN_VALUE : -1.7976931348623157e+308,
	MAX_VALUE : 1.7976931348623157e+308,
	CLASS_NAME : 'Jsonix.Schema.XSD.Double'
});
Jsonix.Schema.XSD.Double.INSTANCE = new Jsonix.Schema.XSD.Double();
Jsonix.Schema.XSD.Double.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Double.INSTANCE);
Jsonix.Schema.XSD.AnyURI = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
	name : 'AnyURI',
	typeName : Jsonix.Schema.XSD.qname('anyURI'),
	print : function(value, context, output, scope) {
		Jsonix.Util.Ensure.ensureString(value);
		return value;
	},
	parse : function(text, context, input, scope) {
		Jsonix.Util.Ensure.ensureString(text);
		return text;
	},
	isInstance : function(value, context, scope) {
		return Jsonix.Util.Type.isString(value);
	},
	CLASS_NAME : 'Jsonix.Schema.XSD.AnyURI'
});
Jsonix.Schema.XSD.AnyURI.INSTANCE = new Jsonix.Schema.XSD.AnyURI();
Jsonix.Schema.XSD.AnyURI.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.AnyURI.INSTANCE);
Jsonix.Schema.XSD.QName = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
	name : 'QName',
	typeName : Jsonix.Schema.XSD.qname('QName'),
	print : function(value, context, output, scope) {
		var qName = Jsonix.XML.QName.fromObject(value);
		var prefix;
		var localPart = qName.localPart;
		if (output) {
			// If QName does not provide the prefix, let it be generated
			prefix = output.getPrefix(qName.namespaceURI, qName.prefix||null);
			output.declareNamespace(qName.namespaceURI, prefix);
		} else {
			prefix = qName.prefix;
		}
		return !prefix ? localPart : (prefix + ':' + localPart);
	},
	parse : function(value, context, input, scope) {
		Jsonix.Util.Ensure.ensureString(value);
		value = Jsonix.Util.StringUtils.trim(value);
		var prefix;
		var localPart;
		var colonPosition = value.indexOf(':');
		if (colonPosition === -1) {
			prefix = '';
			localPart = value;
		} else if (colonPosition > 0 && colonPosition < (value.length - 1)) {
			prefix = value.substring(0, colonPosition);
			localPart = value.substring(colonPosition + 1);
		} else {
			throw new Error('Invalid QName [' + value + '].');
		}
		var namespaceContext = input || context || null;
		if (!namespaceContext)
		{
			return value;
		}
		else
		{
			var namespaceURI = namespaceContext.getNamespaceURI(prefix);
			if (Jsonix.Util.Type.isString(namespaceURI))
			{
				return new Jsonix.XML.QName(namespaceURI, localPart, prefix);
			}
			else
			{
				throw new Error('Prefix [' + prefix + '] of the QName [' + value + '] is not bound in this context.');
			}
		}
	},
	isInstance : function(value, context, scope) {
		return (value instanceof Jsonix.XML.QName) || (Jsonix.Util.Type.isObject(value) && Jsonix.Util.Type.isString(value.localPart || value.lp));
	},
	CLASS_NAME : 'Jsonix.Schema.XSD.QName'
});
Jsonix.Schema.XSD.QName.INSTANCE = new Jsonix.Schema.XSD.QName();
Jsonix.Schema.XSD.QName.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.QName.INSTANCE);
Jsonix.Schema.XSD.Calendar = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
	name : 'Calendar',
	typeName : Jsonix.Schema.XSD.qname('calendar'),
	parse : function(text, context, input, scope) {
		Jsonix.Util.Ensure.ensureString(text);
		var negative = (text.charAt(0) === '-');
		var sign = negative ? -1 : 1;
		var data = negative ? text.substring(1) : text;

		// Detect pattern

		var result;
		if (data.length >= 19 && data.charAt(4) === '-' && data.charAt(7) === '-' && data.charAt(10) === 'T' && data.charAt(13) === ':' && data.charAt(16) === ':') {
			return this.parseDateTime(text);
		} else if (data.length >= 10 && data.charAt(4) === '-' && data.charAt(7) === '-') {
			return this.parseDate(text);
		} else if (data.length >= 8 && data.charAt(2) === ':' && data.charAt(5) === ':') {
			return this.parseTime(text);
		} else {
			throw new Error('Value [' + text + '] does not match dateTime, date or time patterns.');
		}
	},
	parseDateTime : function(text) {
		Jsonix.Util.Ensure.ensureString(text);
		var negative = (text.charAt(0) === '-');
		var sign = negative ? -1 : 1;

		var dateTimeWithTimeZone = negative ? text.substring(1) : text;

		if (dateTimeWithTimeZone.length < 19 || dateTimeWithTimeZone.charAt(4) !== '-' || dateTimeWithTimeZone.charAt(7) !== '-' || dateTimeWithTimeZone.charAt(10) !== 'T'	|| dateTimeWithTimeZone.charAt(13) !== ':' || dateTimeWithTimeZone.charAt(16) !== ':') {
			throw new Error('Date time string [' + dateTimeWithTimeZone + '] must be a string in format [\'-\'? yyyy \'-\' mm \'-\' dd \'T\' hh \':\' mm \':\' ss (\'.\' s+)? (zzzzzz)?].');
		}

		var timeZoneIndex;
		var plusIndex = dateTimeWithTimeZone.indexOf('+', 19);
		if (plusIndex >= 0) {
			timeZoneIndex = plusIndex;
		} else {
			var minusIndex = dateTimeWithTimeZone.indexOf('-', 19);
			if (minusIndex >= 0) {
				timeZoneIndex = minusIndex;
			} else {
				var zIndex = dateTimeWithTimeZone.indexOf('Z', 19);
				if (zIndex >= 0) {
					timeZoneIndex = zIndex;
				} else {
					timeZoneIndex = dateTimeWithTimeZone.length;
				}
			}
		}

		var validTimeZoneIndex = timeZoneIndex > 0 && timeZoneIndex < dateTimeWithTimeZone.length;

		var dateString = dateTimeWithTimeZone.substring(0, 10);
		var timeString = validTimeZoneIndex ? dateTimeWithTimeZone.substring(11, timeZoneIndex) : dateTimeWithTimeZone.substring(11);
		var timeZoneString = validTimeZoneIndex ? dateTimeWithTimeZone.substring(timeZoneIndex) : '';
		var date = this.parseDateString(dateString);
		var time = this.parseTimeString(timeString);
		var timezone = this.parseTimeZoneString(timeZoneString);

		return Jsonix.XML.Calendar.fromObject({
			year : sign * date.year,
			month : date.month,
			day : date.day,
			hour : time.hour,
			minute : time.minute,
			second : time.second,
			fractionalSecond : time.fractionalSecond,
			timezone : timezone
		});

	},
	parseDate : function(text) {
		Jsonix.Util.Ensure.ensureString(text);

		var negative = (text.charAt(0) === '-');
		var sign = negative ? -1 : 1;

		var dateWithTimeZone = negative ? text.substring(1) : text;

		var timeZoneIndex;
		var plusIndex = dateWithTimeZone.indexOf('+', 10);
		if (plusIndex >= 0) {
			timeZoneIndex = plusIndex;
		} else {
			var minusIndex = dateWithTimeZone.indexOf('-', 10);
			if (minusIndex >= 0) {
				timeZoneIndex = minusIndex;
			} else {
				var zIndex = dateWithTimeZone.indexOf('Z', 10);
				if (zIndex >= 0) {
					timeZoneIndex = zIndex;
				} else {
					timeZoneIndex = dateWithTimeZone.length;
				}
			}
		}
		var validTimeZoneIndex = timeZoneIndex > 0 && timeZoneIndex < dateWithTimeZone.length;
		var dateString = validTimeZoneIndex ? dateWithTimeZone.substring(0, timeZoneIndex) : dateWithTimeZone;

		var date = this.parseDateString(dateString);
		var timeZoneString = validTimeZoneIndex ? text.substring(timeZoneIndex) : '';
		var timezone = this.parseTimeZoneString(timeZoneString);

		return Jsonix.XML.Calendar.fromObject({
			year : sign * date.year,
			month : date.month,
			day : date.day,
			timezone : timezone
		});

	},
	parseTime : function(text) {
		Jsonix.Util.Ensure.ensureString(text);
		var timeZoneIndex;
		var plusIndex = text.indexOf('+', 7);
		if (plusIndex >= 0) {
			timeZoneIndex = plusIndex;
		} else {
			var minusIndex = text.indexOf('-', 7);
			if (minusIndex >= 0) {
				timeZoneIndex = minusIndex;
			} else {
				var zIndex = text.indexOf('Z', 7);
				if (zIndex >= 0) {
					timeZoneIndex = zIndex;
				} else {
					timeZoneIndex = text.length;
				}
			}
		}

		var validTimeZoneIndex = timeZoneIndex > 0 && timeZoneIndex < text.length;
		var timeString = validTimeZoneIndex ? text.substring(0, timeZoneIndex) : text;

		var time = this.parseTimeString(timeString);
		var timeZoneString = validTimeZoneIndex ? text.substring(timeZoneIndex) : '';
		var timezone = this.parseTimeZoneString(timeZoneString);

		return Jsonix.XML.Calendar.fromObject({
			hour : time.hour,
			minute : time.minute,
			second : time.second,
			fractionalSecond : time.fractionalSecond,
			timezone : timezone
		});

	},
	parseDateString : function(text) {
		Jsonix.Util.Ensure.ensureString(text);
		if (text.length !== 10) {
			throw new Error('Date string [' + text + '] must be 10 characters long.');
		}

		if (text.charAt(4) !== '-' || text.charAt(7) !== '-') {
			throw new Error('Date string [' + text + '] must be a string in format [yyyy \'-\' mm \'-\' ss ].');
		}

		var year = this.parseYear(text.substring(0, 4));
		var month = this.parseMonth(text.substring(5, 7));
		var day = this.parseDay(text.substring(8, 10));

		return {
			year : year,
			month : month,
			day : day
		};
	},
	parseTimeString : function(timeString) {
		Jsonix.Util.Ensure.ensureString(timeString);
		if (timeString.length < 8 || timeString.charAt(2) !== ':' || timeString.charAt(5) !== ':') {
			throw new Error('Time string [' + timeString + '] must be a string in format [hh \':\' mm \':\' ss (\'.\' s+)?].');
		}
		var hourString = timeString.substring(0, 2);
		var minuteString = timeString.substring(3, 5);
		var secondString = timeString.substring(6, 8);
		var fractionalSecondString = timeString.length >= 9 ? timeString.substring(8) : '';
		var hour = this.parseHour(hourString);
		var minute = this.parseHour(minuteString);
		var second = this.parseSecond(secondString);
		var fractionalSecond = this.parseFractionalSecond(fractionalSecondString);
		return {
			hour : hour,
			minute : minute,
			second : second,
			fractionalSecond : fractionalSecond
		};

	},
	parseTimeZoneString : function(text) {
		// (('+' | '-') hh ':' mm) | 'Z'
		Jsonix.Util.Ensure.ensureString(text);
		if (text === '') {
			return NaN;
		} else if (text === 'Z') {
			return 0;
		} else {
			if (text.length !== 6) {
				throw new Error('Time zone must be an empty string, \'Z\' or a string in format [(\'+\' | \'-\') hh \':\' mm].');
			}
			var signString = text.charAt(0);
			var sign;
			if (signString === '+') {
				sign = 1;
			} else if (signString === '-') {
				sign = -1;
			} else {
				throw new Error('First character of the time zone [' + text + '] must be \'+\' or \'-\'.');
			}
			var hour = this.parseHour(text.substring(1, 3));
			var minute = this.parseMinute(text.substring(4, 6));
			return -1 * sign * (hour * 60 + minute);
		}

	},
	parseYear : function(text) {
		Jsonix.Util.Ensure.ensureString(text);
		if (text.length !== 4) {
			throw new Error('Year [' + text + '] must be a four-digit number.');
		}
		var year = Number(text);
		// TODO message
		Jsonix.Util.Ensure.ensureInteger(year);
		return year;
	},
	parseMonth : function(text) {
		Jsonix.Util.Ensure.ensureString(text);
		if (text.length !== 2) {
			throw new Error('Month [' + text + '] must be a two-digit number.');
		}
		var month = Number(text);
		// TODO message
		Jsonix.Util.Ensure.ensureInteger(month);
		return month;
	},
	parseDay : function(text) {
		Jsonix.Util.Ensure.ensureString(text);
		if (text.length !== 2) {
			throw new Error('Day [' + text + '] must be a two-digit number.');
		}
		var day = Number(text);
		// TODO message
		Jsonix.Util.Ensure.ensureInteger(day);
		return day;
	},
	parseHour : function(text) {
		Jsonix.Util.Ensure.ensureString(text);
		if (text.length !== 2) {
			throw new Error('Hour [' + text + '] must be a two-digit number.');
		}
		var hour = Number(text);
		// TODO message
		Jsonix.Util.Ensure.ensureInteger(hour);
		return hour;
	},
	parseMinute : function(text) {
		Jsonix.Util.Ensure.ensureString(text);
		if (text.length !== 2) {
			throw new Error('Minute [' + text + '] must be a two-digit number.');
		}
		var minute = Number(text);
		// TODO message
		Jsonix.Util.Ensure.ensureInteger(minute);
		return minute;
	},
	parseSecond : function(text) {
		Jsonix.Util.Ensure.ensureString(text);
		if (text.length !== 2) {
			throw new Error('Second [' + text + '] must be a two-digit number.');
		}
		var second = Number(text);
		// TODO message
		Jsonix.Util.Ensure.ensureNumber(second);
		return second;
	},
	parseFractionalSecond : function(text) {
		Jsonix.Util.Ensure.ensureString(text);
		if (text === '') {
			return 0;
		} else {
			var fractionalSecond = Number(text);
			// TODO message
			Jsonix.Util.Ensure.ensureNumber(fractionalSecond);
			return fractionalSecond;
		}
	},
	print : function(value, context, output, scope) {
		Jsonix.Util.Ensure.ensureObject(value);
		if (Jsonix.Util.NumberUtils.isInteger(value.year) && Jsonix.Util.NumberUtils.isInteger(value.month) && Jsonix.Util.NumberUtils.isInteger(value.day)	&& Jsonix.Util.NumberUtils.isInteger(value.hour) && Jsonix.Util.NumberUtils.isInteger(value.minute) && Jsonix.Util.NumberUtils.isInteger(value.second)) {
			return this.printDateTime(value);
		} else if (Jsonix.Util.NumberUtils.isInteger(value.year) && Jsonix.Util.NumberUtils.isInteger(value.month) && Jsonix.Util.NumberUtils.isInteger(value.day)) {
			return this.printDate(value);
		} else if (Jsonix.Util.NumberUtils.isInteger(value.hour) && Jsonix.Util.NumberUtils.isInteger(value.minute) && Jsonix.Util.NumberUtils.isInteger(value.second)) {
			return this.printTime(value);
		} else {
			throw new Error('Value [' + value + '] is not recognized as dateTime, date or time.');
		}
	},
	printDateTime : function(value) {
		Jsonix.Util.Ensure.ensureObject(value);
		Jsonix.Util.Ensure.ensureInteger(value.year);
		Jsonix.Util.Ensure.ensureInteger(value.month);
		Jsonix.Util.Ensure.ensureInteger(value.day);
		Jsonix.Util.Ensure.ensureInteger(value.hour);
		Jsonix.Util.Ensure.ensureInteger(value.minute);
		Jsonix.Util.Ensure.ensureNumber(value.second);
		if (Jsonix.Util.Type.exists(value.fractionalString)) {
			Jsonix.Util.Ensure.ensureNumber(value.fractionalString);
		}
		if (Jsonix.Util.Type.exists(value.timezone) && !Jsonix.Util.Type.isNaN(value.timezone)) {
			Jsonix.Util.Ensure.ensureInteger(value.timezone);
		}
		var result = this.printDateString(value);
		result = result + 'T';
		result = result + this.printTimeString(value);
		if (Jsonix.Util.Type.exists(value.timezone)) {
			result = result + this.printTimeZoneString(value.timezone);
		}
		return result;
	},
	printDate : function(value) {
		Jsonix.Util.Ensure.ensureObject(value);
		Jsonix.Util.Ensure.ensureNumber(value.year);
		Jsonix.Util.Ensure.ensureNumber(value.month);
		Jsonix.Util.Ensure.ensureNumber(value.day);
		if (Jsonix.Util.Type.exists(value.timezone) && !Jsonix.Util.Type.isNaN(value.timezone)) {
			Jsonix.Util.Ensure.ensureInteger(value.timezone);
		}
		var result = this.printDateString(value);
		if (Jsonix.Util.Type.exists(value.timezone)) {
			result = result + this.printTimeZoneString(value.timezone);
		}
		return result;
	},
	printTime : function(value) {
		Jsonix.Util.Ensure.ensureObject(value);
		Jsonix.Util.Ensure.ensureNumber(value.hour);
		Jsonix.Util.Ensure.ensureNumber(value.minute);
		Jsonix.Util.Ensure.ensureNumber(value.second);
		if (Jsonix.Util.Type.exists(value.fractionalString)) {
			Jsonix.Util.Ensure.ensureNumber(value.fractionalString);
		}
		if (Jsonix.Util.Type.exists(value.timezone) && !Jsonix.Util.Type.isNaN(value.timezone)) {
			Jsonix.Util.Ensure.ensureInteger(value.timezone);
		}

		var result = this.printTimeString(value);
		if (Jsonix.Util.Type.exists(value.timezone)) {
			result = result + this.printTimeZoneString(value.timezone);
		}
		return result;
	},
	printDateString : function(value) {
		Jsonix.Util.Ensure.ensureObject(value);
		Jsonix.Util.Ensure.ensureInteger(value.year);
		Jsonix.Util.Ensure.ensureInteger(value.month);
		Jsonix.Util.Ensure.ensureInteger(value.day);
		return (value.year < 0 ? ('-' + this.printYear(-value.year)) : this.printYear(value.year)) + '-' + this.printMonth(value.month) + '-' + this.printDay(value.day);
	},
	printTimeString : function(value) {
		Jsonix.Util.Ensure.ensureObject(value);
		Jsonix.Util.Ensure.ensureInteger(value.hour);
		Jsonix.Util.Ensure.ensureInteger(value.minute);
		Jsonix.Util.Ensure.ensureInteger(value.second);
		if (Jsonix.Util.Type.exists(value.fractionalSecond)) {
			Jsonix.Util.Ensure.ensureNumber(value.fractionalSecond);
		}
		var result = this.printHour(value.hour);
		result = result + ':';
		result = result + this.printMinute(value.minute);
		result = result + ':';
		result = result + this.printSecond(value.second);
		if (Jsonix.Util.Type.exists(value.fractionalSecond)) {
			result = result + this.printFractionalSecond(value.fractionalSecond);
		}
		return result;
	},
	printTimeZoneString : function(value) {
		if (!Jsonix.Util.Type.exists(value) || Jsonix.Util.Type.isNaN(value)) {
			return '';
		} else {
			Jsonix.Util.Ensure.ensureInteger(value);

			var sign = value < 0 ? -1 : (value > 0 ? 1 : 0);
			var data = value * sign;
			var minute = data % 60;
			var hour = Math.floor(data / 60);

			var result;
			if (sign === 0) {
				return 'Z';
			} else {
				if (sign > 0) {
					result = '-';
				} else if (sign < 0) {
					result = '+';
				}
				result = result + this.printHour(hour);
				result = result + ':';
				result = result + this.printMinute(minute);
				return result;
			}
		}
	},
	printYear : function(value) {
		return this.printInteger(value, 4);
	},
	printMonth : function(value) {
		return this.printInteger(value, 2);
	},
	printDay : function(value) {
		return this.printInteger(value, 2);
	},
	printHour : function(value) {
		return this.printInteger(value, 2);
	},
	printMinute : function(value) {
		return this.printInteger(value, 2);
	},
	printSecond : function(value) {
		return this.printInteger(value, 2);
	},
	printFractionalSecond : function(value) {
		Jsonix.Util.Ensure.ensureNumber(value);
		if (value < 0 || value >= 1) {
			throw new Error('Fractional second [' + value + '] must be between 0 and 1.');
		} else if (value === 0) {
			return '';
		} else {
			var string = String(value);
			var dotIndex = string.indexOf('.');
			if (dotIndex < 0) {
				return '';
			} else {
				return string.substring(dotIndex);
			}
		}
	},
	printInteger : function(value, length) {
		Jsonix.Util.Ensure.ensureInteger(value);
		Jsonix.Util.Ensure.ensureInteger(length);
		if (length <= 0) {
			throw new Error('Length [' + value + '] must be positive.');
		}
		if (value < 0) {
			throw new Error('Value [' + value + '] must not be negative.');
		}
		if (value >= Math.pow(10, length)) {
			throw new Error('Value [' + value + '] must be less than [' + Math.pow(10, length) + '].');
		}
		var result = String(value);
		for (var i = result.length; i < length; i++) {
			result = '0' + result;
		}
		return result;
	},
	isInstance : function(value, context, scope) {
		return Jsonix.Util.Type.isObject(value)	&& ((Jsonix.Util.NumberUtils.isInteger(value.year) && Jsonix.Util.NumberUtils.isInteger(value.month) && Jsonix.Util.NumberUtils.isInteger(value.day)) || (Jsonix.Util.NumberUtils.isInteger(value.hour) && Jsonix.Util.NumberUtils.isInteger(value.minute) && Jsonix.Util.NumberUtils.isInteger(value.second)));
	},
	CLASS_NAME : 'Jsonix.Schema.XSD.Calendar'
});

Jsonix.Schema.XSD.Calendar.YEAR_PATTERN = "-?([1-9][0-9]*)?((?!(0000))[0-9]{4})";
Jsonix.Schema.XSD.Calendar.TIMEZONE_PATTERN = "Z|[\\-\\+][0-9][0-9]:[0-5][0-9]";
Jsonix.Schema.XSD.Calendar.GYEAR_PATTERN = "(" + Jsonix.Schema.XSD.Calendar.YEAR_PATTERN + ")" + "(" + Jsonix.Schema.XSD.Calendar.TIMEZONE_PATTERN + ")?";

Jsonix.Schema.XSD.Calendar.INSTANCE = new Jsonix.Schema.XSD.Calendar();
Jsonix.Schema.XSD.Calendar.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Calendar.INSTANCE);
Jsonix.Schema.XSD.Duration = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
	name : 'Duration',
	typeName : Jsonix.Schema.XSD.qname('duration'),
	CLASS_NAME : 'Jsonix.Schema.XSD.Duration'
});
Jsonix.Schema.XSD.Duration.INSTANCE = new Jsonix.Schema.XSD.Duration();
Jsonix.Schema.XSD.Duration.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.Duration.INSTANCE);
Jsonix.Schema.XSD.DateTime = Jsonix.Class(Jsonix.Schema.XSD.Calendar, {
	name : 'DateTime',
	typeName : Jsonix.Schema.XSD.qname('dateTime'),
	parse : function(value, context, input, scope) {
		var calendar = this.parseDateTime(value);
		var date = new Date();
		date.setFullYear(calendar.year);
		date.setMonth(calendar.month - 1);
		date.setDate(calendar.day);
		date.setHours(calendar.hour);
		date.setMinutes(calendar.minute);
		date.setSeconds(calendar.second);
		if (Jsonix.Util.Type.isNumber(calendar.fractionalSecond)) {
			date.setMilliseconds(Math.floor(1000 * calendar.fractionalSecond));
		}
		var timezoneOffset;
		var unknownTimezone;
		var localTimezoneOffset = date.getTimezoneOffset();
		if (Jsonix.Util.NumberUtils.isInteger(calendar.timezone))
		{
			timezoneOffset = calendar.timezone;
			unknownTimezone = false;
		}
		else
		{
			// Unknown timezone
			timezoneOffset = localTimezoneOffset;
			unknownTimezone = true;
		}
		//
		var result = new Date(date.getTime() + (60000 * (timezoneOffset - localTimezoneOffset)));
		if (unknownTimezone)
		{
			// null denotes "unknown timezone"
			result.originalTimezoneOffset = null;
		}
		else
		{
			result.originalTimezoneOffset = timezoneOffset;
		}
		return result;
	},
	print : function(value, context, output, scope) {
		Jsonix.Util.Ensure.ensureDate(value);
		var timezoneOffset;
		var localTimezoneOffset = value.getTimezoneOffset();
		var correctedValue;
		// If original time zone was unknown, print the given value without
		// the timezone
		if (value.originalTimezoneOffset === null)
		{
			return this.printDateTime(new Jsonix.XML.Calendar({
				year : value.getFullYear(),
				month : value.getMonth() + 1,
				day : value.getDate(),
				hour : value.getHours(),
				minute : value.getMinutes(),
				second : value.getSeconds(),
				fractionalSecond : (value.getMilliseconds() / 1000)
			}));
		}
		else
		{
			// If original timezone was known, correct and print the value with the timezone
			if (Jsonix.Util.NumberUtils.isInteger(value.originalTimezoneOffset))
			{
				timezoneOffset = value.originalTimezoneOffset;
				correctedValue = new Date(value.getTime() - (60000 * (timezoneOffset - localTimezoneOffset)));
			}
			// If original timezone was not specified, do not correct and use the local time zone
			else
			{
				timezoneOffset = localTimezoneOffset;
				correctedValue = value;
			}
			return this.printDateTime(new Jsonix.XML.Calendar({
				year : correctedValue.getFullYear(),
				month : correctedValue.getMonth() + 1,
				day : correctedValue.getDate(),
				hour : correctedValue.getHours(),
				minute : correctedValue.getMinutes(),
				second : correctedValue.getSeconds(),
				fractionalSecond : (correctedValue.getMilliseconds() / 1000),
				timezone: timezoneOffset
			}));
		}
	},
	isInstance : function(value, context, scope) {
		return Jsonix.Util.Type.isDate(value);
	},
	CLASS_NAME : 'Jsonix.Schema.XSD.DateTime'
});
Jsonix.Schema.XSD.DateTime.INSTANCE = new Jsonix.Schema.XSD.DateTime();
Jsonix.Schema.XSD.DateTime.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.DateTime.INSTANCE);

Jsonix.Schema.XSD.Time = Jsonix.Class(Jsonix.Schema.XSD.Calendar, {
	name : 'Time',
	typeName : Jsonix.Schema.XSD.qname('time'),
	parse : function(value, context, input, scope) {
		var calendar = this.parseTime(value);
		var date = new Date();
		date.setFullYear(1970);
		date.setMonth(0);
		date.setDate(1);
		date.setHours(calendar.hour);
		date.setMinutes(calendar.minute);
		date.setSeconds(calendar.second);
		if (Jsonix.Util.Type.isNumber(calendar.fractionalSecond)) {
			date.setMilliseconds(Math.floor(1000 * calendar.fractionalSecond));
		}
		var timezoneOffset;
		var unknownTimezone;
		var localTimezoneOffset = date.getTimezoneOffset();
		if (Jsonix.Util.NumberUtils.isInteger(calendar.timezone))
		{
			timezoneOffset = calendar.timezone;
			unknownTimezone = false;
		}
		else
		{
			// Unknown timezone
			timezoneOffset = localTimezoneOffset;
			unknownTimezone = true;
		}
		//
		var result = new Date(date.getTime() + (60000 * (timezoneOffset - localTimezoneOffset)));
		if (unknownTimezone)
		{
			// null denotes "unknown timezone"
			result.originalTimezoneOffset = null;
		}
		else
		{
			result.originalTimezoneOffset = timezoneOffset;
		}
		return result;
	},
	print : function(value, context, output, scope) {
		Jsonix.Util.Ensure.ensureDate(value);
		var time = value.getTime();
		if (time <= -86400000 && time >= 86400000) {
			throw new Error('Invalid time [' + value + '].');
		}
		// Original timezone was unknown, just use current time, no timezone
		if (value.originalTimezoneOffset === null)
		{
			return this.printTime(new Jsonix.XML.Calendar({
				hour : value.getHours(),
				minute : value.getMinutes(),
				second : value.getSeconds(),
				fractionalSecond : (value.getMilliseconds() / 1000)
			}));
		}
		else
		{
			var correctedValue;
			var timezoneOffset;
			var localTimezoneOffset = value.getTimezoneOffset();
			if (Jsonix.Util.NumberUtils.isInteger(value.originalTimezoneOffset))
			{
				timezoneOffset = value.originalTimezoneOffset;
				correctedValue = new Date(value.getTime() - (60000 * (timezoneOffset - localTimezoneOffset)));
			}
			else
			{
				timezoneOffset = localTimezoneOffset;
				correctedValue = value;
			}
			var correctedTime = correctedValue.getTime();
			if (correctedTime >= 0) {
				return this.printTime(new Jsonix.XML.Calendar({
					hour : correctedValue.getHours(),
					minute : correctedValue.getMinutes(),
					second : correctedValue.getSeconds(),
					fractionalSecond : (correctedValue.getMilliseconds() / 1000),
					timezone: timezoneOffset
				}));
			} else {
				var timezoneOffsetHours = Math.ceil(-correctedTime / 3600000);
				return this.printTime(new Jsonix.XML.Calendar({
					hour : (correctedValue.getHours() + timezoneOffsetHours + timezoneOffset / 60 ) % 24,
					minute : correctedValue.getMinutes(),
					second : correctedValue.getSeconds(),
					fractionalSecond : (correctedValue.getMilliseconds() / 1000),
					timezone : - timezoneOffsetHours * 60
				}));
			}
		}
	},
	isInstance : function(value, context, scope) {
		return Jsonix.Util.Type.isDate(value) && value.getTime() > -86400000 && value.getTime() < 86400000;
	},
	CLASS_NAME : 'Jsonix.Schema.XSD.Time'
});
Jsonix.Schema.XSD.Time.INSTANCE = new Jsonix.Schema.XSD.Time();
Jsonix.Schema.XSD.Time.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Time.INSTANCE);
Jsonix.Schema.XSD.Date = Jsonix.Class(Jsonix.Schema.XSD.Calendar, {
	name : 'Date',
	typeName : Jsonix.Schema.XSD.qname('date'),
	parse : function(value, context, input, scope) {
		var calendar = this.parseDate(value);
		var date = new Date();
		date.setFullYear(calendar.year);
		date.setMonth(calendar.month - 1);
		date.setDate(calendar.day);
		date.setHours(0);
		date.setMinutes(0);
		date.setSeconds(0);
		date.setMilliseconds(0);
		if (Jsonix.Util.Type.isNumber(calendar.fractionalSecond)) {
			date.setMilliseconds(Math.floor(1000 * calendar.fractionalSecond));
		}
		var timezoneOffset;
		var unknownTimezone;
		var localTimezoneOffset = date.getTimezoneOffset();
		if (Jsonix.Util.NumberUtils.isInteger(calendar.timezone))
		{
			timezoneOffset = calendar.timezone;
			unknownTimezone = false;
		}
		else
		{
			// Unknown timezone
			timezoneOffset = localTimezoneOffset;
			unknownTimezone = true;
		}
		//
		var result = new Date(date.getTime() + (60000 * (timezoneOffset - localTimezoneOffset)));
		if (unknownTimezone)
		{
			// null denotes "unknown timezone"
			result.originalTimezoneOffset = null;
		}
		else
		{
			result.originalTimezoneOffset = timezoneOffset;
		}
		return result;
	},
	print : function(value, context, output, scope) {
		Jsonix.Util.Ensure.ensureDate(value);
		var localDate = new Date(value.getTime());
		localDate.setHours(0);
		localDate.setMinutes(0);
		localDate.setSeconds(0);
		localDate.setMilliseconds(0);
		
		// Original timezone is unknown
		if (value.originalTimezoneOffset === null)
		{
			return this.printDate(new Jsonix.XML.Calendar({
				year : value.getFullYear(),
				month : value.getMonth() + 1,
				day : value.getDate()
			}));
		}
		else
		{
			// If original timezone was known, correct and print the value with the timezone
			if (Jsonix.Util.NumberUtils.isInteger(value.originalTimezoneOffset))
			{
				var correctedValue = new Date(value.getTime() - (60000 * (value.originalTimezoneOffset - value.getTimezoneOffset())));
				return this.printDate(new Jsonix.XML.Calendar({
					year : correctedValue.getFullYear(),
					month : correctedValue.getMonth() + 1,
					day : correctedValue.getDate(),
					timezone : value.originalTimezoneOffset
				}));
			}
			// If original timezone was not specified, do not correct and use the local time zone
			else
			{
				// We assume that the difference between the date value and local midnight
				// should be interpreted as a timezone offset.
				// In case there's no difference, we assume default/unknown timezone
				var localTimezoneOffset = value.getTime() - localDate.getTime();
				if (localTimezoneOffset === 0) {
					return this.printDate(new Jsonix.XML.Calendar({
						year : value.getFullYear(),
						month : value.getMonth() + 1,
						day : value.getDate()
					}));
				} else {
					var timezoneOffset = localTimezoneOffset + (60000 * value.getTimezoneOffset());
					if (timezoneOffset <= 43200000) {
						return this.printDate(new Jsonix.XML.Calendar({
							year : value.getFullYear(),
							month : value.getMonth() + 1,
							day : value.getDate(),
							timezone : Math.floor(timezoneOffset / 60000)
						}));
					} else {
						var nextDay = new Date(value.getTime() + 86400000);
						return this.printDate(new Jsonix.XML.Calendar({
							year : nextDay.getFullYear(),
							month : nextDay.getMonth() + 1,
							day : nextDay.getDate(),
							timezone : (Math.floor(timezoneOffset / 60000) - 1440)
						}));
					}
				}
			}
		}
	},
	isInstance : function(value, context, scope) {
		return Jsonix.Util.Type.isDate(value);
	},
	CLASS_NAME : 'Jsonix.Schema.XSD.Date'
});
Jsonix.Schema.XSD.Date.INSTANCE = new Jsonix.Schema.XSD.Date();
Jsonix.Schema.XSD.Date.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Date.INSTANCE);
Jsonix.Schema.XSD.GYearMonth = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
	name : 'GYearMonth',
	typeName : Jsonix.Schema.XSD.qname('gYearMonth'),
	CLASS_NAME : 'Jsonix.Schema.XSD.GYearMonth'
});
Jsonix.Schema.XSD.GYearMonth.INSTANCE = new Jsonix.Schema.XSD.GYearMonth();
Jsonix.Schema.XSD.GYearMonth.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.GYearMonth.INSTANCE);
// REVIEW AV: GYear extends Calendar
Jsonix.Schema.XSD.GYear = Jsonix.Class(Jsonix.Schema.XSD.Calendar, {
	name : 'GYear',
	typeName : Jsonix.Schema.XSD.qname('gYear'),
	// TODO: find appropriate place for the regex (e.g.
	// Jsonix.XML.Calendar.regex ?)
	// REVIEW AV: I've first moved as constants to the Calendar 

	parse : function(value, context, input, scope) {
		var returnValue = this.splitGYear(value);
		returnValue.toString = function() {
			return "EmptyXMLElement. Call embedded 'year' or 'timezone' property";
		};

		return returnValue;
	},

	/**
	 * @param {string}
	 *            year datetype in ISO 8601 format
	 * @returns {object} pair of date, timestamp properties as a number
	 * @throws {Error}
	 *             if the datetype is not valid
	 * 
	 */
	splitGYear : function(value) {

		var gYearExpression = new RegExp("^" + Jsonix.Schema.XSD.Calendar.GYEAR_PATTERN + "$");
		var results = value.match(gYearExpression);

		// TODO: underscored functions and properties are for testing proposes
		// only. Must be vanished in the min.js

		if (results !== null) {
			var splitedGYear = {
				// REVIEW AV: Decimal radix
				year : parseInt(results[1], 10),
				_timezone : results[5],
				timezone : this.parseTimeZoneString(results[5])
			// TODO: parseTimeZoneString() function exists also in CALENDAR
			// but inverts the sign, why?
			};

			return splitedGYear;
		}

		throw new Error('Value [' + value + '] doesn\'t match the gYear pattern.');
	},

	parseTimeZoneString : function(text) {
		if (text === "Z" || !Jsonix.Util.Type.exists(text)) {
			return 0;
		}

		var splittedTimeZoneChunks = text.split(":");
		return - (parseInt(splittedTimeZoneChunks[0], 10) * 60 + parseInt(splittedTimeZoneChunks[1], 10));
	},

	// TODO: underscored functions and properties are for testing proposes only.
	// Must be vanished in the min.js

	_validateGYear : function(value) {
		var gYearExpression = new RegExp("^" + Jsonix.Schema.XSD.Calendar.GYEAR_PATTERN + "$");

		if (!gYearExpression.test(value)) {
			throw new Error('Value [' + value + '] doesn\'t match the gYear pattern.');
		}
	},

	_validateYear : function(value) {
		var yearExpression = new RegExp("^" + Jsonix.Schema.XSD.Calendar.YEAR_PATTERN + "$");

		if (!yearExpression.test(value)) {
			throw new Error('Value [' + value + '] doesn\'t match the year pattern.');
		}
	},

	_validateTimeZone : function(value) {
		var timeZoneExpression = new RegExp("^" + Jsonix.Schema.XSD.Calendar.TIMEZONE_PATTERN + "$");

		if (!timeZoneExpression.test(value)) {
			throw new Error('Value [' + value + '] doesn\'t match the time zone pattern.');
		}
	},
	CLASS_NAME : 'Jsonix.Schema.XSD.GYear'
});
Jsonix.Schema.XSD.GYear.INSTANCE = new Jsonix.Schema.XSD.GYear();
Jsonix.Schema.XSD.GYear.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.GYear.INSTANCE);
Jsonix.Schema.XSD.GMonthDay = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
	name : 'GMonthDay',
	typeName : Jsonix.Schema.XSD.qname('gMonthDay'),
	CLASS_NAME : 'Jsonix.Schema.XSD.GMonthDay'
});
Jsonix.Schema.XSD.GMonthDay.INSTANCE = new Jsonix.Schema.XSD.GMonthDay();
Jsonix.Schema.XSD.GMonthDay.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.GMonthDay.INSTANCE);
Jsonix.Schema.XSD.GDay = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
	name : 'GDay',
	typeName : Jsonix.Schema.XSD.qname('gDay'),
	CLASS_NAME : 'Jsonix.Schema.XSD.GDay'
});
Jsonix.Schema.XSD.GDay.INSTANCE = new Jsonix.Schema.XSD.GDay();
Jsonix.Schema.XSD.GDay.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.GDay.INSTANCE);
Jsonix.Schema.XSD.GMonth = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
	name : 'GMonth',
	typeName : Jsonix.Schema.XSD.qname('gMonth'),
	CLASS_NAME : 'Jsonix.Schema.XSD.GMonth'
});
Jsonix.Schema.XSD.GMonth.INSTANCE = new Jsonix.Schema.XSD.GMonth();
Jsonix.Schema.XSD.GMonth.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.GMonth.INSTANCE);
Jsonix.Schema.XSD.ID = Jsonix.Class(Jsonix.Schema.XSD.String, {
	name : 'ID',
	typeName : Jsonix.Schema.XSD.qname('ID'),
	CLASS_NAME : 'Jsonix.Schema.XSD.ID'
});
Jsonix.Schema.XSD.ID.INSTANCE = new Jsonix.Schema.XSD.ID();
Jsonix.Schema.XSD.ID.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.ID.INSTANCE);
Jsonix.Schema.XSD.IDREF = Jsonix.Class(Jsonix.Schema.XSD.String, {
	name : 'IDREF',
	typeName : Jsonix.Schema.XSD.qname('IDREF'),
	CLASS_NAME : 'Jsonix.Schema.XSD.IDREF'
});
Jsonix.Schema.XSD.IDREF.INSTANCE = new Jsonix.Schema.XSD.IDREF();
Jsonix.Schema.XSD.IDREF.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.IDREF.INSTANCE);
Jsonix.Schema.XSD.IDREFS = Jsonix.Class(Jsonix.Schema.XSD.List, {
	name : 'IDREFS',
	initialize : function() {
		Jsonix.Schema.XSD.List.prototype.initialize.apply(this, [ Jsonix.Schema.XSD.IDREF.INSTANCE, Jsonix.Schema.XSD.qname('IDREFS'), ' ' ]);
	},
	// TODO Constraints
	CLASS_NAME : 'Jsonix.Schema.XSD.IDREFS'
});
Jsonix.Schema.XSD.IDREFS.INSTANCE = new Jsonix.Schema.XSD.IDREFS();
Jsonix.Schema.XSI = {};
Jsonix.Schema.XSI.NAMESPACE_URI = 'http://www.w3.org/2001/XMLSchema-instance';
Jsonix.Schema.XSI.PREFIX = 'xsi';
Jsonix.Schema.XSI.TYPE = 'type';
Jsonix.Schema.XSI.NIL = 'nil';
Jsonix.Schema.XSI.qname = function(localPart) {
	Jsonix.Util.Ensure.ensureString(localPart);
	return new Jsonix.XML.QName(Jsonix.Schema.XSI.NAMESPACE_URI, localPart,
			Jsonix.Schema.XSI.PREFIX);
};
Jsonix.Schema.XSI.TYPE_QNAME = Jsonix.Schema.XSI.qname(Jsonix.Schema.XSI.TYPE);

Jsonix.Context = Jsonix
		.Class(Jsonix.Mapping.Styled, {
			modules : [],
			typeInfos : null,
			typeNameKeyToTypeInfo : null,
			elementInfos : null,
			options : null,
			substitutionMembersMap : null,
			scopedElementInfosMap : null,
			supportXsiType : true,
			initialize : function(mappings, options) {
				Jsonix.Mapping.Styled.prototype.initialize.apply(this, [options]);
				this.modules = [];
				this.elementInfos = [];
				this.typeInfos = {};
				this.typeNameKeyToTypeInfo = {};
				this.registerBuiltinTypeInfos();
				this.namespacePrefixes = {};
				this.prefixNamespaces = {};
				this.substitutionMembersMap = {};
				this.scopedElementInfosMap = {};

				// Initialize options
				if (Jsonix.Util.Type.exists(options)) {
					Jsonix.Util.Ensure.ensureObject(options);
					if (Jsonix.Util.Type
							.isObject(options.namespacePrefixes)) {
						this.namespacePrefixes = 
							Jsonix.Util.Type.cloneObject(options.namespacePrefixes, {});
					}
					if (Jsonix.Util.Type
							.isBoolean(options.supportXsiType)) {
						this.supportXsiType = options.supportXsiType; 
					}
				}
				
				// Initialize prefix/namespace mapping
				for (var ns in this.namespacePrefixes)
				{
					if (this.namespacePrefixes.hasOwnProperty(ns))
					{
						p = this.namespacePrefixes[ns];
						this.prefixNamespaces[p] = ns;
					}
				}
				// Initialize modules
				if (Jsonix.Util.Type.exists(mappings)) {
					Jsonix.Util.Ensure.ensureArray(mappings);
					// Initialize modules
					var index, mapping, module;
					for (index = 0; index < mappings.length; index++) {
						mapping = mappings[index];
						module = this.createModule(mapping);
						this.modules[index] = module;
					}
				}
				this.processModules();
			},
			createModule : function(mapping) {
				var module;
				if (mapping instanceof this.mappingStyle.module) {
					module = mapping;
				} else {
					mapping = Jsonix.Util.Type.cloneObject(mapping);
					module = new this.mappingStyle.module(mapping, 
					{
						mappingStyle : this.mappingStyle
					});
				}
				return module;
			},
			registerBuiltinTypeInfos : function() {
				for ( var index = 0; index < this.builtinTypeInfos.length; index++) {
					this.registerTypeInfo(this.builtinTypeInfos[index]);
				}
			},
			processModules : function() {
				var index, module;
				for (index = 0; index < this.modules.length; index++) {
					module = this.modules[index];
					module.registerTypeInfos(this);
				}
				for (index = 0; index < this.modules.length; index++) {
					module = this.modules[index];
					module.buildTypeInfos(this);
				}
				for (index = 0; index < this.modules.length; index++) {
					module = this.modules[index];
					module.registerElementInfos(this);
				}
				for (index = 0; index < this.modules.length; index++) {
					module = this.modules[index];
					module.buildElementInfos(this);
				}
			},
			registerTypeInfo : function(typeInfo) {
				Jsonix.Util.Ensure.ensureObject(typeInfo);
				var n = typeInfo.name||typeInfo.n||null;
				Jsonix.Util.Ensure.ensureString(n);
				this.typeInfos[n] = typeInfo;
				if (typeInfo.typeName && typeInfo.typeName.key)
				{
					this.typeNameKeyToTypeInfo[typeInfo.typeName.key] = typeInfo;
				}
			},
			resolveTypeInfo : function(mapping, module) {
				if (!Jsonix.Util.Type.exists(mapping)) {
					return null;
				} else if (mapping instanceof Jsonix.Model.TypeInfo) {
					return mapping;
				} else if (Jsonix.Util.Type.isString(mapping)) {
					var typeInfoName;
					// If mapping starts with '.' consider it to be a local type name in this module
					if (mapping.length > 0 && mapping.charAt(0) === '.')
					{
						var n = module.name || module.n || undefined;
						Jsonix.Util.Ensure.ensureObject(module, 'Type info mapping can only be resolved if module is provided.');
						Jsonix.Util.Ensure.ensureString(n, 'Type info mapping can only be resolved if module name is provided.');
						typeInfoName = n + mapping;
					}
					else
					{
						typeInfoName = mapping;
					}
					if (!this.typeInfos[typeInfoName]) {
						throw new Error('Type info [' + typeInfoName + '] is not known in this context.');
					} else {
						return this.typeInfos[typeInfoName];
					}
				} else {
					Jsonix.Util.Ensure.ensureObject(module, 'Type info mapping can only be resolved if module is provided.');
					var typeInfo = module.createTypeInfo(mapping);
					typeInfo.build(this, module);
					return typeInfo;
				}
			},
			registerElementInfo : function(elementInfo, module) {
				Jsonix.Util.Ensure.ensureObject(elementInfo);
				this.elementInfos.push(elementInfo);

				if (Jsonix.Util.Type.exists(elementInfo.substitutionHead)) {
					var substitutionHead = elementInfo.substitutionHead;
					var substitutionHeadKey = substitutionHead.key;
					var substitutionMembers = this.substitutionMembersMap[substitutionHeadKey];

					if (!Jsonix.Util.Type.isArray(substitutionMembers)) {
						substitutionMembers = [];
						this.substitutionMembersMap[substitutionHeadKey] = substitutionMembers;
					}
					substitutionMembers.push(elementInfo);
				}

				var scopeKey;
				if (Jsonix.Util.Type.exists(elementInfo.scope)) {
					scopeKey = this.resolveTypeInfo(elementInfo.scope, module).name;
				} else {
					scopeKey = '##global';
				}

				var scopedElementInfos = this.scopedElementInfosMap[scopeKey];

				if (!Jsonix.Util.Type.isObject(scopedElementInfos)) {
					scopedElementInfos = {};
					this.scopedElementInfosMap[scopeKey] = scopedElementInfos;
				}
				scopedElementInfos[elementInfo.elementName.key] = elementInfo;

			},
			getTypeInfoByValue : function(value)
			{
				if (!Jsonix.Util.Type.exists(value))
				{
					return undefined;
				}
				if (Jsonix.Util.Type.isObject(value))
				{
					var typeName = value.TYPE_NAME;
					if (Jsonix.Util.Type.isString(typeName))
					{
						var typeInfoByName = this.getTypeInfoByName(typeName);
						if (typeInfoByName)
						{
							return typeInfoByName;
						}
					}
				}
				return undefined;
			},
			// TODO public API
			getTypeInfoByName : function(name) {
				return this.typeInfos[name];
			},
			getTypeInfoByTypeName : function(typeName) {
				var tn = Jsonix.XML.QName.fromObjectOrString(typeName, this);
				return this.typeNameKeyToTypeInfo[tn.key];
			},
			getTypeInfoByTypeNameKey : function(typeNameKey) {
				return this.typeNameKeyToTypeInfo[typeNameKey];
			},
			getElementInfo : function(name, scope) {
				if (Jsonix.Util.Type.exists(scope)) {
					var scopeKey = scope.name;
					var scopedElementInfos = this.scopedElementInfosMap[scopeKey];
					if (Jsonix.Util.Type.exists(scopedElementInfos)) {
						var scopedElementInfo = scopedElementInfos[name.key];
						if (Jsonix.Util.Type.exists(scopedElementInfo)) {
							return scopedElementInfo;
						}
					}
				}

				var globalScopeKey = '##global';
				var globalScopedElementInfos = this.scopedElementInfosMap[globalScopeKey];
				if (Jsonix.Util.Type.exists(globalScopedElementInfos)) {
					var globalScopedElementInfo = globalScopedElementInfos[name.key];
					if (Jsonix.Util.Type.exists(globalScopedElementInfo)) {
						return globalScopedElementInfo;
					}
				}
				return null;
				//
				// throw new Error("Element [" + name.key
				// + "] could not be found in the given context.");
			},
			getSubstitutionMembers : function(name) {
				return this.substitutionMembersMap[Jsonix.XML.QName
						.fromObject(name).key];
			},
			createMarshaller : function() {
				return new this.mappingStyle.marshaller(this);
			},
			createUnmarshaller : function() {
				return new this.mappingStyle.unmarshaller(this);
			},
			getNamespaceURI : function(prefix) {
				Jsonix.Util.Ensure.ensureString(prefix);
				return this.prefixNamespaces[prefix];
			},
			getPrefix : function(namespaceURI, defaultPrefix) {
				Jsonix.Util.Ensure.ensureString(namespaceURI);
				var prefix = this.namespacePrefixes[namespaceURI];
				if (Jsonix.Util.Type.isString(prefix))
				{
					return prefix;
				}
				else
				{
					return defaultPrefix;
				}
			},
			/**
			 * Builtin type infos.
			 */
			builtinTypeInfos : [
			        Jsonix.Schema.XSD.AnyType.INSTANCE,
					Jsonix.Schema.XSD.AnyURI.INSTANCE,
					Jsonix.Schema.XSD.Base64Binary.INSTANCE,
					Jsonix.Schema.XSD.Boolean.INSTANCE,
					Jsonix.Schema.XSD.Byte.INSTANCE,
					Jsonix.Schema.XSD.Calendar.INSTANCE,
					Jsonix.Schema.XSD.Date.INSTANCE,
					Jsonix.Schema.XSD.DateTime.INSTANCE,
					Jsonix.Schema.XSD.Decimal.INSTANCE,
					Jsonix.Schema.XSD.Double.INSTANCE,
					Jsonix.Schema.XSD.Duration.INSTANCE,
					Jsonix.Schema.XSD.Float.INSTANCE,
					Jsonix.Schema.XSD.GDay.INSTANCE,
					Jsonix.Schema.XSD.GMonth.INSTANCE,
					Jsonix.Schema.XSD.GMonthDay.INSTANCE,
					Jsonix.Schema.XSD.GYear.INSTANCE,
					Jsonix.Schema.XSD.GYearMonth.INSTANCE,
					Jsonix.Schema.XSD.HexBinary.INSTANCE,
					Jsonix.Schema.XSD.ID.INSTANCE,
					Jsonix.Schema.XSD.IDREF.INSTANCE,
					Jsonix.Schema.XSD.IDREFS.INSTANCE,
					Jsonix.Schema.XSD.Int.INSTANCE,
					Jsonix.Schema.XSD.Integer.INSTANCE,
					Jsonix.Schema.XSD.Language.INSTANCE,
					Jsonix.Schema.XSD.Long.INSTANCE,
					Jsonix.Schema.XSD.Name.INSTANCE,
					Jsonix.Schema.XSD.NCName.INSTANCE,
					Jsonix.Schema.XSD.NegativeInteger.INSTANCE,
					Jsonix.Schema.XSD.NMToken.INSTANCE,
					Jsonix.Schema.XSD.NMTokens.INSTANCE,
					Jsonix.Schema.XSD.NonNegativeInteger.INSTANCE,
					Jsonix.Schema.XSD.NonPositiveInteger.INSTANCE,
					Jsonix.Schema.XSD.NormalizedString.INSTANCE,
					Jsonix.Schema.XSD.Number.INSTANCE,
					Jsonix.Schema.XSD.PositiveInteger.INSTANCE,
					Jsonix.Schema.XSD.QName.INSTANCE,
					Jsonix.Schema.XSD.Short.INSTANCE,
					Jsonix.Schema.XSD.String.INSTANCE,
					Jsonix.Schema.XSD.Strings.INSTANCE,
					Jsonix.Schema.XSD.Time.INSTANCE,
					Jsonix.Schema.XSD.Token.INSTANCE,
					Jsonix.Schema.XSD.UnsignedByte.INSTANCE,
					Jsonix.Schema.XSD.UnsignedInt.INSTANCE,
					Jsonix.Schema.XSD.UnsignedLong.INSTANCE,
					Jsonix.Schema.XSD.UnsignedShort.INSTANCE ],
			CLASS_NAME : 'Jsonix.Context'
		});
	// Complete Jsonix script is included above
	return { Jsonix: Jsonix };
};

// If the require function exists ...
if (typeof require === 'function') {
	// ... but the define function does not exists
	if (typeof define !== 'function') {
		// Load the define function via amdefine
		var define = require('amdefine')(module);
		// If we're not in browser
		if (typeof window === 'undefined')
		{
			// Require xmldom, xmlhttprequest and fs
			define(["xmldom", "xmlhttprequest", "fs"], _jsonix_factory);
		}
		else
		{
			// We're probably in browser, maybe browserify
			// Do not require xmldom, xmlhttprequest as they'r provided by the browser
			// Do not require fs since file system is not available anyway
			define([], _jsonix_factory);
		}
	}
	else {
		// Otherwise assume we're in the browser/RequireJS environment
		// Load the module without xmldom and xmlhttprequests dependencies
		define([], _jsonix_factory);
	}
}
// If the require function does not exists, we're not in Node.js and therefore in browser environment
else
{
	// Just call the factory and set Jsonix as global.
	var Jsonix = _jsonix_factory().Jsonix;
}

},{"amdefine":10}],10:[function(require,module,exports){
(function (process,__filename){
/** vim: et:ts=4:sw=4:sts=4
 * @license amdefine 0.1.0 Copyright (c) 2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/amdefine for details
 */

/*jslint node: true */
/*global module, process */
'use strict';

/**
 * Creates a define for node.
 * @param {Object} module the "module" object that is defined by Node for the
 * current module.
 * @param {Function} [requireFn]. Node's require function for the current module.
 * It only needs to be passed in Node versions before 0.5, when module.require
 * did not exist.
 * @returns {Function} a define function that is usable for the current node
 * module.
 */
function amdefine(module, requireFn) {
    'use strict';
    var defineCache = {},
        loaderCache = {},
        alreadyCalled = false,
        path = require('path'),
        makeRequire, stringRequire;

    /**
     * Trims the . and .. from an array of path segments.
     * It will keep a leading path segment if a .. will become
     * the first path segment, to help with module name lookups,
     * which act like paths, but can be remapped. But the end result,
     * all paths that use this function should look normalized.
     * NOTE: this method MODIFIES the input array.
     * @param {Array} ary the array of path segments.
     */
    function trimDots(ary) {
        var i, part;
        for (i = 0; ary[i]; i+= 1) {
            part = ary[i];
            if (part === '.') {
                ary.splice(i, 1);
                i -= 1;
            } else if (part === '..') {
                if (i === 1 && (ary[2] === '..' || ary[0] === '..')) {
                    //End of the line. Keep at least one non-dot
                    //path segment at the front so it can be mapped
                    //correctly to disk. Otherwise, there is likely
                    //no path mapping for a path starting with '..'.
                    //This can still fail, but catches the most reasonable
                    //uses of ..
                    break;
                } else if (i > 0) {
                    ary.splice(i - 1, 2);
                    i -= 2;
                }
            }
        }
    }

    function normalize(name, baseName) {
        var baseParts;

        //Adjust any relative paths.
        if (name && name.charAt(0) === '.') {
            //If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            if (baseName) {
                baseParts = baseName.split('/');
                baseParts = baseParts.slice(0, baseParts.length - 1);
                baseParts = baseParts.concat(name.split('/'));
                trimDots(baseParts);
                name = baseParts.join('/');
            }
        }

        return name;
    }

    /**
     * Create the normalize() function passed to a loader plugin's
     * normalize method.
     */
    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(id) {
        function load(value) {
            loaderCache[id] = value;
        }

        load.fromText = function (id, text) {
            //This one is difficult because the text can/probably uses
            //define, and any relative paths and requires should be relative
            //to that id was it would be found on disk. But this would require
            //bootstrapping a module/require fairly deeply from node core.
            //Not sure how best to go about that yet.
            throw new Error('amdefine does not implement load.fromText');
        };

        return load;
    }

    makeRequire = function (systemRequire, exports, module, relId) {
        function amdRequire(deps, callback) {
            if (typeof deps === 'string') {
                //Synchronous, single module require('')
                return stringRequire(systemRequire, exports, module, deps, relId);
            } else {
                //Array of dependencies with a callback.

                //Convert the dependencies to modules.
                deps = deps.map(function (depName) {
                    return stringRequire(systemRequire, exports, module, depName, relId);
                });

                //Wait for next tick to call back the require call.
                process.nextTick(function () {
                    callback.apply(null, deps);
                });
            }
        }

        amdRequire.toUrl = function (filePath) {
            if (filePath.indexOf('.') === 0) {
                return normalize(filePath, path.dirname(module.filename));
            } else {
                return filePath;
            }
        };

        return amdRequire;
    };

    //Favor explicit value, passed in if the module wants to support Node 0.4.
    requireFn = requireFn || function req() {
        return module.require.apply(module, arguments);
    };

    function runFactory(id, deps, factory) {
        var r, e, m, result;

        if (id) {
            e = loaderCache[id] = {};
            m = {
                id: id,
                uri: __filename,
                exports: e
            };
            r = makeRequire(requireFn, e, m, id);
        } else {
            //Only support one define call per file
            if (alreadyCalled) {
                throw new Error('amdefine with no module ID cannot be called more than once per file.');
            }
            alreadyCalled = true;

            //Use the real variables from node
            //Use module.exports for exports, since
            //the exports in here is amdefine exports.
            e = module.exports;
            m = module;
            r = makeRequire(requireFn, e, m, module.id);
        }

        //If there are dependencies, they are strings, so need
        //to convert them to dependency values.
        if (deps) {
            deps = deps.map(function (depName) {
                return r(depName);
            });
        }

        //Call the factory with the right dependencies.
        if (typeof factory === 'function') {
            result = factory.apply(m.exports, deps);
        } else {
            result = factory;
        }

        if (result !== undefined) {
            m.exports = result;
            if (id) {
                loaderCache[id] = m.exports;
            }
        }
    }

    stringRequire = function (systemRequire, exports, module, id, relId) {
        //Split the ID by a ! so that
        var index = id.indexOf('!'),
            originalId = id,
            prefix, plugin;

        if (index === -1) {
            id = normalize(id, relId);

            //Straight module lookup. If it is one of the special dependencies,
            //deal with it, otherwise, delegate to node.
            if (id === 'require') {
                return makeRequire(systemRequire, exports, module, relId);
            } else if (id === 'exports') {
                return exports;
            } else if (id === 'module') {
                return module;
            } else if (loaderCache.hasOwnProperty(id)) {
                return loaderCache[id];
            } else if (defineCache[id]) {
                runFactory.apply(null, defineCache[id]);
                return loaderCache[id];
            } else {
                if(systemRequire) {
                    return systemRequire(originalId);
                } else {
                    throw new Error('No module with ID: ' + id);
                }
            }
        } else {
            //There is a plugin in play.
            prefix = id.substring(0, index);
            id = id.substring(index + 1, id.length);

            plugin = stringRequire(systemRequire, exports, module, prefix, relId);

            if (plugin.normalize) {
                id = plugin.normalize(id, makeNormalize(relId));
            } else {
                //Normalize the ID normally.
                id = normalize(id, relId);
            }

            if (loaderCache[id]) {
                return loaderCache[id];
            } else {
                plugin.load(id, makeRequire(systemRequire, exports, module, relId), makeLoad(id), {});

                return loaderCache[id];
            }
        }
    };

    //Create a define function specific to the module asking for amdefine.
    function define(id, deps, factory) {
        if (Array.isArray(id)) {
            factory = deps;
            deps = id;
            id = undefined;
        } else if (typeof id !== 'string') {
            factory = id;
            id = deps = undefined;
        }

        if (deps && !Array.isArray(deps)) {
            factory = deps;
            deps = undefined;
        }

        if (!deps) {
            deps = ['require', 'exports', 'module'];
        }

        //Set up properties for this module. If an ID, then use
        //internal cache. If no ID, then use the external variables
        //for this node module.
        if (id) {
            //Put the module in deep freeze until there is a
            //require call for it.
            defineCache[id] = [id, deps, factory];
        } else {
            runFactory(id, deps, factory);
        }
    }

    //define.require, which has access to all the values in the
    //cache. Useful for AMD modules that all have IDs in the file,
    //but need to finally export a value to node based on one of those
    //IDs.
    define.require = function (id) {
        if (loaderCache[id]) {
            return loaderCache[id];
        }

        if (defineCache[id]) {
            runFactory.apply(null, defineCache[id]);
            return loaderCache[id];
        }
    };

    define.amd = {};

    return define;
}

module.exports = amdefine;

}).call(this,require("JkpR2F"),"/node_modules/jsonix/node_modules/amdefine/amdefine.js")
},{"JkpR2F":5,"path":4}],11:[function(require,module,exports){
(function (global){
/**
 * @license
 * lodash 3.9.3 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern -d -o ./index.js`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
;(function() {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /** Used as the semantic version number. */
  var VERSION = '3.9.3';

  /** Used to compose bitmasks for wrapper metadata. */
  var BIND_FLAG = 1,
      BIND_KEY_FLAG = 2,
      CURRY_BOUND_FLAG = 4,
      CURRY_FLAG = 8,
      CURRY_RIGHT_FLAG = 16,
      PARTIAL_FLAG = 32,
      PARTIAL_RIGHT_FLAG = 64,
      ARY_FLAG = 128,
      REARG_FLAG = 256;

  /** Used as default options for `_.trunc`. */
  var DEFAULT_TRUNC_LENGTH = 30,
      DEFAULT_TRUNC_OMISSION = '...';

  /** Used to detect when a function becomes hot. */
  var HOT_COUNT = 150,
      HOT_SPAN = 16;

  /** Used to indicate the type of lazy iteratees. */
  var LAZY_DROP_WHILE_FLAG = 0,
      LAZY_FILTER_FLAG = 1,
      LAZY_MAP_FLAG = 2;

  /** Used as the `TypeError` message for "Functions" methods. */
  var FUNC_ERROR_TEXT = 'Expected a function';

  /** Used as the internal argument placeholder. */
  var PLACEHOLDER = '__lodash_placeholder__';

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]',
      arrayTag = '[object Array]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      funcTag = '[object Function]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      objectTag = '[object Object]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      weakMapTag = '[object WeakMap]';

  var arrayBufferTag = '[object ArrayBuffer]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';

  /** Used to match empty string literals in compiled template source. */
  var reEmptyStringLeading = /\b__p \+= '';/g,
      reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
      reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

  /** Used to match HTML entities and HTML characters. */
  var reEscapedHtml = /&(?:amp|lt|gt|quot|#39|#96);/g,
      reUnescapedHtml = /[&<>"'`]/g,
      reHasEscapedHtml = RegExp(reEscapedHtml.source),
      reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

  /** Used to match template delimiters. */
  var reEscape = /<%-([\s\S]+?)%>/g,
      reEvaluate = /<%([\s\S]+?)%>/g,
      reInterpolate = /<%=([\s\S]+?)%>/g;

  /** Used to match property names within property paths. */
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
      reIsPlainProp = /^\w*$/,
      rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;

  /**
   * Used to match `RegExp` [special characters](http://www.regular-expressions.info/characters.html#special).
   * In addition to special characters the forward slash is escaped to allow for
   * easier `eval` use and `Function` compilation.
   */
  var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
      reHasRegExpChars = RegExp(reRegExpChars.source);

  /** Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks). */
  var reComboMark = /[\u0300-\u036f\ufe20-\ufe23]/g;

  /** Used to match backslashes in property paths. */
  var reEscapeChar = /\\(\\)?/g;

  /** Used to match [ES template delimiters](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-template-literal-lexical-components). */
  var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

  /** Used to match `RegExp` flags from their coerced string values. */
  var reFlags = /\w*$/;

  /** Used to detect hexadecimal string values. */
  var reHasHexPrefix = /^0[xX]/;

  /** Used to detect host constructors (Safari > 5). */
  var reIsHostCtor = /^\[object .+?Constructor\]$/;

  /** Used to detect unsigned integer values. */
  var reIsUint = /^\d+$/;

  /** Used to match latin-1 supplementary letters (excluding mathematical operators). */
  var reLatin1 = /[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g;

  /** Used to ensure capturing order of template delimiters. */
  var reNoMatch = /($^)/;

  /** Used to match unescaped characters in compiled string literals. */
  var reUnescapedString = /['\n\r\u2028\u2029\\]/g;

  /** Used to match words to create compound words. */
  var reWords = (function() {
    var upper = '[A-Z\\xc0-\\xd6\\xd8-\\xde]',
        lower = '[a-z\\xdf-\\xf6\\xf8-\\xff]+';

    return RegExp(upper + '+(?=' + upper + lower + ')|' + upper + '?' + lower + '|' + upper + '+|[0-9]+', 'g');
  }());

  /** Used to detect and test for whitespace. */
  var whitespace = (
    // Basic whitespace characters.
    ' \t\x0b\f\xa0\ufeff' +

    // Line terminators.
    '\n\r\u2028\u2029' +

    // Unicode category "Zs" space separators.
    '\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000'
  );

  /** Used to assign default `context` object properties. */
  var contextProps = [
    'Array', 'ArrayBuffer', 'Date', 'Error', 'Float32Array', 'Float64Array',
    'Function', 'Int8Array', 'Int16Array', 'Int32Array', 'Math', 'Number',
    'Object', 'RegExp', 'Set', 'String', '_', 'clearTimeout', 'document',
    'isFinite', 'parseFloat', 'parseInt', 'setTimeout', 'TypeError', 'Uint8Array',
    'Uint8ClampedArray', 'Uint16Array', 'Uint32Array', 'WeakMap', 'window'
  ];

  /** Used to make template sourceURLs easier to identify. */
  var templateCounter = -1;

  /** Used to identify `toStringTag` values of typed arrays. */
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
  typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
  typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
  typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
  typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
  typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
  typedArrayTags[dateTag] = typedArrayTags[errorTag] =
  typedArrayTags[funcTag] = typedArrayTags[mapTag] =
  typedArrayTags[numberTag] = typedArrayTags[objectTag] =
  typedArrayTags[regexpTag] = typedArrayTags[setTag] =
  typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

  /** Used to identify `toStringTag` values supported by `_.clone`. */
  var cloneableTags = {};
  cloneableTags[argsTag] = cloneableTags[arrayTag] =
  cloneableTags[arrayBufferTag] = cloneableTags[boolTag] =
  cloneableTags[dateTag] = cloneableTags[float32Tag] =
  cloneableTags[float64Tag] = cloneableTags[int8Tag] =
  cloneableTags[int16Tag] = cloneableTags[int32Tag] =
  cloneableTags[numberTag] = cloneableTags[objectTag] =
  cloneableTags[regexpTag] = cloneableTags[stringTag] =
  cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
  cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
  cloneableTags[errorTag] = cloneableTags[funcTag] =
  cloneableTags[mapTag] = cloneableTags[setTag] =
  cloneableTags[weakMapTag] = false;

  /** Used as an internal `_.debounce` options object by `_.throttle`. */
  var debounceOptions = {
    'leading': false,
    'maxWait': 0,
    'trailing': false
  };

  /** Used to map latin-1 supplementary letters to basic latin letters. */
  var deburredLetters = {
    '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
    '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
    '\xc7': 'C',  '\xe7': 'c',
    '\xd0': 'D',  '\xf0': 'd',
    '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
    '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
    '\xcC': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
    '\xeC': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
    '\xd1': 'N',  '\xf1': 'n',
    '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
    '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
    '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
    '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
    '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
    '\xc6': 'Ae', '\xe6': 'ae',
    '\xde': 'Th', '\xfe': 'th',
    '\xdf': 'ss'
  };

  /** Used to map characters to HTML entities. */
  var htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '`': '&#96;'
  };

  /** Used to map HTML entities to characters. */
  var htmlUnescapes = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&#96;': '`'
  };

  /** Used to determine if values are of the language type `Object`. */
  var objectTypes = {
    'function': true,
    'object': true
  };

  /** Used to escape characters for inclusion in compiled string literals. */
  var stringEscapes = {
    '\\': '\\',
    "'": "'",
    '\n': 'n',
    '\r': 'r',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  /** Detect free variable `exports`. */
  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = freeExports && freeModule && typeof global == 'object' && global && global.Object && global;

  /** Detect free variable `self`. */
  var freeSelf = objectTypes[typeof self] && self && self.Object && self;

  /** Detect free variable `window`. */
  var freeWindow = objectTypes[typeof window] && window && window.Object && window;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;

  /**
   * Used as a reference to the global object.
   *
   * The `this` value is used if it's the global object to avoid Greasemonkey's
   * restricted `window` object, otherwise the `window` object is used.
   */
  var root = freeGlobal || ((freeWindow !== (this && this.window)) && freeWindow) || freeSelf || this;

  /*--------------------------------------------------------------------------*/

  /**
   * The base implementation of `compareAscending` which compares values and
   * sorts them in ascending order without guaranteeing a stable sort.
   *
   * @private
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {number} Returns the sort order indicator for `value`.
   */
  function baseCompareAscending(value, other) {
    if (value !== other) {
      var valIsNull = value === null,
          valIsUndef = value === undefined,
          valIsReflexive = value === value;

      var othIsNull = other === null,
          othIsUndef = other === undefined,
          othIsReflexive = other === other;

      if ((value > other && !othIsNull) || !valIsReflexive ||
          (valIsNull && !othIsUndef && othIsReflexive) ||
          (valIsUndef && othIsReflexive)) {
        return 1;
      }
      if ((value < other && !valIsNull) || !othIsReflexive ||
          (othIsNull && !valIsUndef && valIsReflexive) ||
          (othIsUndef && valIsReflexive)) {
        return -1;
      }
    }
    return 0;
  }

  /**
   * The base implementation of `_.findIndex` and `_.findLastIndex` without
   * support for callback shorthands and `this` binding.
   *
   * @private
   * @param {Array} array The array to search.
   * @param {Function} predicate The function invoked per iteration.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseFindIndex(array, predicate, fromRight) {
    var length = array.length,
        index = fromRight ? length : -1;

    while ((fromRight ? index-- : ++index < length)) {
      if (predicate(array[index], index, array)) {
        return index;
      }
    }
    return -1;
  }

  /**
   * The base implementation of `_.indexOf` without support for binary searches.
   *
   * @private
   * @param {Array} array The array to search.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseIndexOf(array, value, fromIndex) {
    if (value !== value) {
      return indexOfNaN(array, fromIndex);
    }
    var index = fromIndex - 1,
        length = array.length;

    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }

  /**
   * The base implementation of `_.isFunction` without support for environments
   * with incorrect `typeof` results.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
   */
  function baseIsFunction(value) {
    // Avoid a Chakra JIT bug in compatibility modes of IE 11.
    // See https://github.com/jashkenas/underscore/issues/1621 for more details.
    return typeof value == 'function' || false;
  }

  /**
   * Converts `value` to a string if it's not one. An empty string is returned
   * for `null` or `undefined` values.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
   */
  function baseToString(value) {
    if (typeof value == 'string') {
      return value;
    }
    return value == null ? '' : (value + '');
  }

  /**
   * Used by `_.trim` and `_.trimLeft` to get the index of the first character
   * of `string` that is not found in `chars`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @param {string} chars The characters to find.
   * @returns {number} Returns the index of the first character not found in `chars`.
   */
  function charsLeftIndex(string, chars) {
    var index = -1,
        length = string.length;

    while (++index < length && chars.indexOf(string.charAt(index)) > -1) {}
    return index;
  }

  /**
   * Used by `_.trim` and `_.trimRight` to get the index of the last character
   * of `string` that is not found in `chars`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @param {string} chars The characters to find.
   * @returns {number} Returns the index of the last character not found in `chars`.
   */
  function charsRightIndex(string, chars) {
    var index = string.length;

    while (index-- && chars.indexOf(string.charAt(index)) > -1) {}
    return index;
  }

  /**
   * Used by `_.sortBy` to compare transformed elements of a collection and stable
   * sort them in ascending order.
   *
   * @private
   * @param {Object} object The object to compare to `other`.
   * @param {Object} other The object to compare to `object`.
   * @returns {number} Returns the sort order indicator for `object`.
   */
  function compareAscending(object, other) {
    return baseCompareAscending(object.criteria, other.criteria) || (object.index - other.index);
  }

  /**
   * Used by `_.sortByOrder` to compare multiple properties of each element
   * in a collection and stable sort them in the following order:
   *
   * If `orders` is unspecified, sort in ascending order for all properties.
   * Otherwise, for each property, sort in ascending order if its corresponding value in
   * orders is true, and descending order if false.
   *
   * @private
   * @param {Object} object The object to compare to `other`.
   * @param {Object} other The object to compare to `object`.
   * @param {boolean[]} orders The order to sort by for each property.
   * @returns {number} Returns the sort order indicator for `object`.
   */
  function compareMultiple(object, other, orders) {
    var index = -1,
        objCriteria = object.criteria,
        othCriteria = other.criteria,
        length = objCriteria.length,
        ordersLength = orders.length;

    while (++index < length) {
      var result = baseCompareAscending(objCriteria[index], othCriteria[index]);
      if (result) {
        if (index >= ordersLength) {
          return result;
        }
        return result * (orders[index] ? 1 : -1);
      }
    }
    // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
    // that causes it, under certain circumstances, to provide the same value for
    // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
    // for more details.
    //
    // This also ensures a stable sort in V8 and other engines.
    // See https://code.google.com/p/v8/issues/detail?id=90 for more details.
    return object.index - other.index;
  }

  /**
   * Used by `_.deburr` to convert latin-1 supplementary letters to basic latin letters.
   *
   * @private
   * @param {string} letter The matched letter to deburr.
   * @returns {string} Returns the deburred letter.
   */
  function deburrLetter(letter) {
    return deburredLetters[letter];
  }

  /**
   * Used by `_.escape` to convert characters to HTML entities.
   *
   * @private
   * @param {string} chr The matched character to escape.
   * @returns {string} Returns the escaped character.
   */
  function escapeHtmlChar(chr) {
    return htmlEscapes[chr];
  }

  /**
   * Used by `_.template` to escape characters for inclusion in compiled
   * string literals.
   *
   * @private
   * @param {string} chr The matched character to escape.
   * @returns {string} Returns the escaped character.
   */
  function escapeStringChar(chr) {
    return '\\' + stringEscapes[chr];
  }

  /**
   * Gets the index at which the first occurrence of `NaN` is found in `array`.
   *
   * @private
   * @param {Array} array The array to search.
   * @param {number} fromIndex The index to search from.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {number} Returns the index of the matched `NaN`, else `-1`.
   */
  function indexOfNaN(array, fromIndex, fromRight) {
    var length = array.length,
        index = fromIndex + (fromRight ? 0 : -1);

    while ((fromRight ? index-- : ++index < length)) {
      var other = array[index];
      if (other !== other) {
        return index;
      }
    }
    return -1;
  }

  /**
   * Checks if `value` is object-like.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   */
  function isObjectLike(value) {
    return !!value && typeof value == 'object';
  }

  /**
   * Used by `trimmedLeftIndex` and `trimmedRightIndex` to determine if a
   * character code is whitespace.
   *
   * @private
   * @param {number} charCode The character code to inspect.
   * @returns {boolean} Returns `true` if `charCode` is whitespace, else `false`.
   */
  function isSpace(charCode) {
    return ((charCode <= 160 && (charCode >= 9 && charCode <= 13) || charCode == 32 || charCode == 160) || charCode == 5760 || charCode == 6158 ||
      (charCode >= 8192 && (charCode <= 8202 || charCode == 8232 || charCode == 8233 || charCode == 8239 || charCode == 8287 || charCode == 12288 || charCode == 65279)));
  }

  /**
   * Replaces all `placeholder` elements in `array` with an internal placeholder
   * and returns an array of their indexes.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {*} placeholder The placeholder to replace.
   * @returns {Array} Returns the new array of placeholder indexes.
   */
  function replaceHolders(array, placeholder) {
    var index = -1,
        length = array.length,
        resIndex = -1,
        result = [];

    while (++index < length) {
      if (array[index] === placeholder) {
        array[index] = PLACEHOLDER;
        result[++resIndex] = index;
      }
    }
    return result;
  }

  /**
   * An implementation of `_.uniq` optimized for sorted arrays without support
   * for callback shorthands and `this` binding.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Function} [iteratee] The function invoked per iteration.
   * @returns {Array} Returns the new duplicate-value-free array.
   */
  function sortedUniq(array, iteratee) {
    var seen,
        index = -1,
        length = array.length,
        resIndex = -1,
        result = [];

    while (++index < length) {
      var value = array[index],
          computed = iteratee ? iteratee(value, index, array) : value;

      if (!index || seen !== computed) {
        seen = computed;
        result[++resIndex] = value;
      }
    }
    return result;
  }

  /**
   * Used by `_.trim` and `_.trimLeft` to get the index of the first non-whitespace
   * character of `string`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {number} Returns the index of the first non-whitespace character.
   */
  function trimmedLeftIndex(string) {
    var index = -1,
        length = string.length;

    while (++index < length && isSpace(string.charCodeAt(index))) {}
    return index;
  }

  /**
   * Used by `_.trim` and `_.trimRight` to get the index of the last non-whitespace
   * character of `string`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {number} Returns the index of the last non-whitespace character.
   */
  function trimmedRightIndex(string) {
    var index = string.length;

    while (index-- && isSpace(string.charCodeAt(index))) {}
    return index;
  }

  /**
   * Used by `_.unescape` to convert HTML entities to characters.
   *
   * @private
   * @param {string} chr The matched character to unescape.
   * @returns {string} Returns the unescaped character.
   */
  function unescapeHtmlChar(chr) {
    return htmlUnescapes[chr];
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Create a new pristine `lodash` function using the given `context` object.
   *
   * @static
   * @memberOf _
   * @category Utility
   * @param {Object} [context=root] The context object.
   * @returns {Function} Returns a new `lodash` function.
   * @example
   *
   * _.mixin({ 'foo': _.constant('foo') });
   *
   * var lodash = _.runInContext();
   * lodash.mixin({ 'bar': lodash.constant('bar') });
   *
   * _.isFunction(_.foo);
   * // => true
   * _.isFunction(_.bar);
   * // => false
   *
   * lodash.isFunction(lodash.foo);
   * // => false
   * lodash.isFunction(lodash.bar);
   * // => true
   *
   * // using `context` to mock `Date#getTime` use in `_.now`
   * var mock = _.runInContext({
   *   'Date': function() {
   *     return { 'getTime': getTimeMock };
   *   }
   * });
   *
   * // or creating a suped-up `defer` in Node.js
   * var defer = _.runInContext({ 'setTimeout': setImmediate }).defer;
   */
  function runInContext(context) {
    // Avoid issues with some ES3 environments that attempt to use values, named
    // after built-in constructors like `Object`, for the creation of literals.
    // ES5 clears this up by stating that literals must use built-in constructors.
    // See https://es5.github.io/#x11.1.5 for more details.
    context = context ? _.defaults(root.Object(), context, _.pick(root, contextProps)) : root;

    /** Native constructor references. */
    var Array = context.Array,
        Date = context.Date,
        Error = context.Error,
        Function = context.Function,
        Math = context.Math,
        Number = context.Number,
        Object = context.Object,
        RegExp = context.RegExp,
        String = context.String,
        TypeError = context.TypeError;

    /** Used for native method references. */
    var arrayProto = Array.prototype,
        objectProto = Object.prototype,
        stringProto = String.prototype;

    /** Used to detect DOM support. */
    var document = (document = context.window) ? document.document : null;

    /** Used to resolve the decompiled source of functions. */
    var fnToString = Function.prototype.toString;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;

    /** Used to generate unique IDs. */
    var idCounter = 0;

    /**
     * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
     * of values.
     */
    var objToString = objectProto.toString;

    /** Used to restore the original `_` reference in `_.noConflict`. */
    var oldDash = context._;

    /** Used to detect if a method is native. */
    var reIsNative = RegExp('^' +
      escapeRegExp(fnToString.call(hasOwnProperty))
      .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
    );

    /** Native method references. */
    var ArrayBuffer = getNative(context, 'ArrayBuffer'),
        bufferSlice = getNative(ArrayBuffer && new ArrayBuffer(0), 'slice'),
        ceil = Math.ceil,
        clearTimeout = context.clearTimeout,
        floor = Math.floor,
        getPrototypeOf = getNative(Object, 'getPrototypeOf'),
        parseFloat = context.parseFloat,
        push = arrayProto.push,
        Set = getNative(context, 'Set'),
        setTimeout = context.setTimeout,
        splice = arrayProto.splice,
        Uint8Array = getNative(context, 'Uint8Array'),
        WeakMap = getNative(context, 'WeakMap');

    /** Used to clone array buffers. */
    var Float64Array = (function() {
      // Safari 5 errors when using an array buffer to initialize a typed array
      // where the array buffer's `byteLength` is not a multiple of the typed
      // array's `BYTES_PER_ELEMENT`.
      try {
        var func = getNative(context, 'Float64Array'),
            result = new func(new ArrayBuffer(10), 0, 1) && func;
      } catch(e) {}
      return result || null;
    }());

    /* Native method references for those with the same name as other `lodash` methods. */
    var nativeCreate = getNative(Object, 'create'),
        nativeIsArray = getNative(Array, 'isArray'),
        nativeIsFinite = context.isFinite,
        nativeKeys = getNative(Object, 'keys'),
        nativeMax = Math.max,
        nativeMin = Math.min,
        nativeNow = getNative(Date, 'now'),
        nativeNumIsFinite = getNative(Number, 'isFinite'),
        nativeParseInt = context.parseInt,
        nativeRandom = Math.random;

    /** Used as references for `-Infinity` and `Infinity`. */
    var NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY,
        POSITIVE_INFINITY = Number.POSITIVE_INFINITY;

    /** Used as references for the maximum length and index of an array. */
    var MAX_ARRAY_LENGTH = 4294967295,
        MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1,
        HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;

    /** Used as the size, in bytes, of each `Float64Array` element. */
    var FLOAT64_BYTES_PER_ELEMENT = Float64Array ? Float64Array.BYTES_PER_ELEMENT : 0;

    /**
     * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
     * of an array-like value.
     */
    var MAX_SAFE_INTEGER = 9007199254740991;

    /** Used to store function metadata. */
    var metaMap = WeakMap && new WeakMap;

    /** Used to lookup unminified function names. */
    var realNames = {};

    /*------------------------------------------------------------------------*/

    /**
     * Creates a `lodash` object which wraps `value` to enable implicit chaining.
     * Methods that operate on and return arrays, collections, and functions can
     * be chained together. Methods that return a boolean or single value will
     * automatically end the chain returning the unwrapped value. Explicit chaining
     * may be enabled using `_.chain`. The execution of chained methods is lazy,
     * that is, execution is deferred until `_#value` is implicitly or explicitly
     * called.
     *
     * Lazy evaluation allows several methods to support shortcut fusion. Shortcut
     * fusion is an optimization that merges iteratees to avoid creating intermediate
     * arrays and reduce the number of iteratee executions.
     *
     * Chaining is supported in custom builds as long as the `_#value` method is
     * directly or indirectly included in the build.
     *
     * In addition to lodash methods, wrappers have `Array` and `String` methods.
     *
     * The wrapper `Array` methods are:
     * `concat`, `join`, `pop`, `push`, `reverse`, `shift`, `slice`, `sort`,
     * `splice`, and `unshift`
     *
     * The wrapper `String` methods are:
     * `replace` and `split`
     *
     * The wrapper methods that support shortcut fusion are:
     * `compact`, `drop`, `dropRight`, `dropRightWhile`, `dropWhile`, `filter`,
     * `first`, `initial`, `last`, `map`, `pluck`, `reject`, `rest`, `reverse`,
     * `slice`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, `toArray`,
     * and `where`
     *
     * The chainable wrapper methods are:
     * `after`, `ary`, `assign`, `at`, `before`, `bind`, `bindAll`, `bindKey`,
     * `callback`, `chain`, `chunk`, `commit`, `compact`, `concat`, `constant`,
     * `countBy`, `create`, `curry`, `debounce`, `defaults`, `defer`, `delay`,
     * `difference`, `drop`, `dropRight`, `dropRightWhile`, `dropWhile`, `fill`,
     * `filter`, `flatten`, `flattenDeep`, `flow`, `flowRight`, `forEach`,
     * `forEachRight`, `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `functions`,
     * `groupBy`, `indexBy`, `initial`, `intersection`, `invert`, `invoke`, `keys`,
     * `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
     * `memoize`, `merge`, `method`, `methodOf`, `mixin`, `negate`, `omit`, `once`,
     * `pairs`, `partial`, `partialRight`, `partition`, `pick`, `plant`, `pluck`,
     * `property`, `propertyOf`, `pull`, `pullAt`, `push`, `range`, `rearg`,
     * `reject`, `remove`, `rest`, `restParam`, `reverse`, `set`, `shuffle`,
     * `slice`, `sort`, `sortBy`, `sortByAll`, `sortByOrder`, `splice`, `spread`,
     * `take`, `takeRight`, `takeRightWhile`, `takeWhile`, `tap`, `throttle`,
     * `thru`, `times`, `toArray`, `toPlainObject`, `transform`, `union`, `uniq`,
     * `unshift`, `unzip`, `unzipWith`, `values`, `valuesIn`, `where`, `without`,
     * `wrap`, `xor`, `zip`, `zipObject`, `zipWith`
     *
     * The wrapper methods that are **not** chainable by default are:
     * `add`, `attempt`, `camelCase`, `capitalize`, `clone`, `cloneDeep`, `deburr`,
     * `endsWith`, `escape`, `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`,
     * `findLast`, `findLastIndex`, `findLastKey`, `findWhere`, `first`, `get`,
     * `gt`, `gte`, `has`, `identity`, `includes`, `indexOf`, `inRange`, `isArguments`,
     * `isArray`, `isBoolean`, `isDate`, `isElement`, `isEmpty`, `isEqual`, `isError`,
     * `isFinite` `isFunction`, `isMatch`, `isNative`, `isNaN`, `isNull`, `isNumber`,
     * `isObject`, `isPlainObject`, `isRegExp`, `isString`, `isUndefined`,
     * `isTypedArray`, `join`, `kebabCase`, `last`, `lastIndexOf`, `lt`, `lte`,
     * `max`, `min`, `noConflict`, `noop`, `now`, `pad`, `padLeft`, `padRight`,
     * `parseInt`, `pop`, `random`, `reduce`, `reduceRight`, `repeat`, `result`,
     * `runInContext`, `shift`, `size`, `snakeCase`, `some`, `sortedIndex`,
     * `sortedLastIndex`, `startCase`, `startsWith`, `sum`, `template`, `trim`,
     * `trimLeft`, `trimRight`, `trunc`, `unescape`, `uniqueId`, `value`, and `words`
     *
     * The wrapper method `sample` will return a wrapped value when `n` is provided,
     * otherwise an unwrapped value is returned.
     *
     * @name _
     * @constructor
     * @category Chain
     * @param {*} value The value to wrap in a `lodash` instance.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var wrapped = _([1, 2, 3]);
     *
     * // returns an unwrapped value
     * wrapped.reduce(function(total, n) {
     *   return total + n;
     * });
     * // => 6
     *
     * // returns a wrapped value
     * var squares = wrapped.map(function(n) {
     *   return n * n;
     * });
     *
     * _.isArray(squares);
     * // => false
     *
     * _.isArray(squares.value());
     * // => true
     */
    function lodash(value) {
      if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
        if (value instanceof LodashWrapper) {
          return value;
        }
        if (hasOwnProperty.call(value, '__chain__') && hasOwnProperty.call(value, '__wrapped__')) {
          return wrapperClone(value);
        }
      }
      return new LodashWrapper(value);
    }

    /**
     * The function whose prototype all chaining wrappers inherit from.
     *
     * @private
     */
    function baseLodash() {
      // No operation performed.
    }

    /**
     * The base constructor for creating `lodash` wrapper objects.
     *
     * @private
     * @param {*} value The value to wrap.
     * @param {boolean} [chainAll] Enable chaining for all wrapper methods.
     * @param {Array} [actions=[]] Actions to peform to resolve the unwrapped value.
     */
    function LodashWrapper(value, chainAll, actions) {
      this.__wrapped__ = value;
      this.__actions__ = actions || [];
      this.__chain__ = !!chainAll;
    }

    /**
     * An object environment feature flags.
     *
     * @static
     * @memberOf _
     * @type Object
     */
    var support = lodash.support = {};

    (function(x) {
      var Ctor = function() { this.x = x; },
          object = { '0': x, 'length': x },
          props = [];

      Ctor.prototype = { 'valueOf': x, 'y': x };
      for (var key in new Ctor) { props.push(key); }

      /**
       * Detect if the DOM is supported.
       *
       * @memberOf _.support
       * @type boolean
       */
      try {
        support.dom = document.createDocumentFragment().nodeType === 11;
      } catch(e) {
        support.dom = false;
      }
    }(1, 0));

    /**
     * By default, the template delimiters used by lodash are like those in
     * embedded Ruby (ERB). Change the following template settings to use
     * alternative delimiters.
     *
     * @static
     * @memberOf _
     * @type Object
     */
    lodash.templateSettings = {

      /**
       * Used to detect `data` property values to be HTML-escaped.
       *
       * @memberOf _.templateSettings
       * @type RegExp
       */
      'escape': reEscape,

      /**
       * Used to detect code to be evaluated.
       *
       * @memberOf _.templateSettings
       * @type RegExp
       */
      'evaluate': reEvaluate,

      /**
       * Used to detect `data` property values to inject.
       *
       * @memberOf _.templateSettings
       * @type RegExp
       */
      'interpolate': reInterpolate,

      /**
       * Used to reference the data object in the template text.
       *
       * @memberOf _.templateSettings
       * @type string
       */
      'variable': '',

      /**
       * Used to import variables into the compiled template.
       *
       * @memberOf _.templateSettings
       * @type Object
       */
      'imports': {

        /**
         * A reference to the `lodash` function.
         *
         * @memberOf _.templateSettings.imports
         * @type Function
         */
        '_': lodash
      }
    };

    /*------------------------------------------------------------------------*/

    /**
     * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
     *
     * @private
     * @param {*} value The value to wrap.
     */
    function LazyWrapper(value) {
      this.__wrapped__ = value;
      this.__actions__ = null;
      this.__dir__ = 1;
      this.__dropCount__ = 0;
      this.__filtered__ = false;
      this.__iteratees__ = null;
      this.__takeCount__ = POSITIVE_INFINITY;
      this.__views__ = null;
    }

    /**
     * Creates a clone of the lazy wrapper object.
     *
     * @private
     * @name clone
     * @memberOf LazyWrapper
     * @returns {Object} Returns the cloned `LazyWrapper` object.
     */
    function lazyClone() {
      var actions = this.__actions__,
          iteratees = this.__iteratees__,
          views = this.__views__,
          result = new LazyWrapper(this.__wrapped__);

      result.__actions__ = actions ? arrayCopy(actions) : null;
      result.__dir__ = this.__dir__;
      result.__filtered__ = this.__filtered__;
      result.__iteratees__ = iteratees ? arrayCopy(iteratees) : null;
      result.__takeCount__ = this.__takeCount__;
      result.__views__ = views ? arrayCopy(views) : null;
      return result;
    }

    /**
     * Reverses the direction of lazy iteration.
     *
     * @private
     * @name reverse
     * @memberOf LazyWrapper
     * @returns {Object} Returns the new reversed `LazyWrapper` object.
     */
    function lazyReverse() {
      if (this.__filtered__) {
        var result = new LazyWrapper(this);
        result.__dir__ = -1;
        result.__filtered__ = true;
      } else {
        result = this.clone();
        result.__dir__ *= -1;
      }
      return result;
    }

    /**
     * Extracts the unwrapped value from its lazy wrapper.
     *
     * @private
     * @name value
     * @memberOf LazyWrapper
     * @returns {*} Returns the unwrapped value.
     */
    function lazyValue() {
      var array = this.__wrapped__.value();
      if (!isArray(array)) {
        return baseWrapperValue(array, this.__actions__);
      }
      var dir = this.__dir__,
          isRight = dir < 0,
          view = getView(0, array.length, this.__views__),
          start = view.start,
          end = view.end,
          length = end - start,
          index = isRight ? end : (start - 1),
          takeCount = nativeMin(length, this.__takeCount__),
          iteratees = this.__iteratees__,
          iterLength = iteratees ? iteratees.length : 0,
          resIndex = 0,
          result = [];

      outer:
      while (length-- && resIndex < takeCount) {
        index += dir;

        var iterIndex = -1,
            value = array[index];

        while (++iterIndex < iterLength) {
          var data = iteratees[iterIndex],
              iteratee = data.iteratee,
              type = data.type;

          if (type == LAZY_DROP_WHILE_FLAG) {
            if (data.done && (isRight ? (index > data.index) : (index < data.index))) {
              data.count = 0;
              data.done = false;
            }
            data.index = index;
            if (!data.done) {
              var limit = data.limit;
              if (!(data.done = limit > -1 ? (data.count++ >= limit) : !iteratee(value))) {
                continue outer;
              }
            }
          } else {
            var computed = iteratee(value);
            if (type == LAZY_MAP_FLAG) {
              value = computed;
            } else if (!computed) {
              if (type == LAZY_FILTER_FLAG) {
                continue outer;
              } else {
                break outer;
              }
            }
          }
        }
        result[resIndex++] = value;
      }
      return result;
    }

    /*------------------------------------------------------------------------*/

    /**
     * Creates a cache object to store key/value pairs.
     *
     * @private
     * @static
     * @name Cache
     * @memberOf _.memoize
     */
    function MapCache() {
      this.__data__ = {};
    }

    /**
     * Removes `key` and its value from the cache.
     *
     * @private
     * @name delete
     * @memberOf _.memoize.Cache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed successfully, else `false`.
     */
    function mapDelete(key) {
      return this.has(key) && delete this.__data__[key];
    }

    /**
     * Gets the cached value for `key`.
     *
     * @private
     * @name get
     * @memberOf _.memoize.Cache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the cached value.
     */
    function mapGet(key) {
      return key == '__proto__' ? undefined : this.__data__[key];
    }

    /**
     * Checks if a cached value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf _.memoize.Cache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function mapHas(key) {
      return key != '__proto__' && hasOwnProperty.call(this.__data__, key);
    }

    /**
     * Sets `value` to `key` of the cache.
     *
     * @private
     * @name set
     * @memberOf _.memoize.Cache
     * @param {string} key The key of the value to cache.
     * @param {*} value The value to cache.
     * @returns {Object} Returns the cache object.
     */
    function mapSet(key, value) {
      if (key != '__proto__') {
        this.__data__[key] = value;
      }
      return this;
    }

    /*------------------------------------------------------------------------*/

    /**
     *
     * Creates a cache object to store unique values.
     *
     * @private
     * @param {Array} [values] The values to cache.
     */
    function SetCache(values) {
      var length = values ? values.length : 0;

      this.data = { 'hash': nativeCreate(null), 'set': new Set };
      while (length--) {
        this.push(values[length]);
      }
    }

    /**
     * Checks if `value` is in `cache` mimicking the return signature of
     * `_.indexOf` by returning `0` if the value is found, else `-1`.
     *
     * @private
     * @param {Object} cache The cache to search.
     * @param {*} value The value to search for.
     * @returns {number} Returns `0` if `value` is found, else `-1`.
     */
    function cacheIndexOf(cache, value) {
      var data = cache.data,
          result = (typeof value == 'string' || isObject(value)) ? data.set.has(value) : data.hash[value];

      return result ? 0 : -1;
    }

    /**
     * Adds `value` to the cache.
     *
     * @private
     * @name push
     * @memberOf SetCache
     * @param {*} value The value to cache.
     */
    function cachePush(value) {
      var data = this.data;
      if (typeof value == 'string' || isObject(value)) {
        data.set.add(value);
      } else {
        data.hash[value] = true;
      }
    }

    /*------------------------------------------------------------------------*/

    /**
     * Copies the values of `source` to `array`.
     *
     * @private
     * @param {Array} source The array to copy values from.
     * @param {Array} [array=[]] The array to copy values to.
     * @returns {Array} Returns `array`.
     */
    function arrayCopy(source, array) {
      var index = -1,
          length = source.length;

      array || (array = Array(length));
      while (++index < length) {
        array[index] = source[index];
      }
      return array;
    }

    /**
     * A specialized version of `_.forEach` for arrays without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns `array`.
     */
    function arrayEach(array, iteratee) {
      var index = -1,
          length = array.length;

      while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
          break;
        }
      }
      return array;
    }

    /**
     * A specialized version of `_.forEachRight` for arrays without support for
     * callback shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns `array`.
     */
    function arrayEachRight(array, iteratee) {
      var length = array.length;

      while (length--) {
        if (iteratee(array[length], length, array) === false) {
          break;
        }
      }
      return array;
    }

    /**
     * A specialized version of `_.every` for arrays without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if all elements pass the predicate check,
     *  else `false`.
     */
    function arrayEvery(array, predicate) {
      var index = -1,
          length = array.length;

      while (++index < length) {
        if (!predicate(array[index], index, array)) {
          return false;
        }
      }
      return true;
    }

    /**
     * A specialized version of `baseExtremum` for arrays which invokes `iteratee`
     * with one argument: (value).
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} comparator The function used to compare values.
     * @param {*} exValue The initial extremum value.
     * @returns {*} Returns the extremum value.
     */
    function arrayExtremum(array, iteratee, comparator, exValue) {
      var index = -1,
          length = array.length,
          computed = exValue,
          result = computed;

      while (++index < length) {
        var value = array[index],
            current = +iteratee(value);

        if (comparator(current, computed)) {
          computed = current;
          result = value;
        }
      }
      return result;
    }

    /**
     * A specialized version of `_.filter` for arrays without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     */
    function arrayFilter(array, predicate) {
      var index = -1,
          length = array.length,
          resIndex = -1,
          result = [];

      while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
          result[++resIndex] = value;
        }
      }
      return result;
    }

    /**
     * A specialized version of `_.map` for arrays without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     */
    function arrayMap(array, iteratee) {
      var index = -1,
          length = array.length,
          result = Array(length);

      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }

    /**
     * A specialized version of `_.reduce` for arrays without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @param {boolean} [initFromArray] Specify using the first element of `array`
     *  as the initial value.
     * @returns {*} Returns the accumulated value.
     */
    function arrayReduce(array, iteratee, accumulator, initFromArray) {
      var index = -1,
          length = array.length;

      if (initFromArray && length) {
        accumulator = array[++index];
      }
      while (++index < length) {
        accumulator = iteratee(accumulator, array[index], index, array);
      }
      return accumulator;
    }

    /**
     * A specialized version of `_.reduceRight` for arrays without support for
     * callback shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @param {boolean} [initFromArray] Specify using the last element of `array`
     *  as the initial value.
     * @returns {*} Returns the accumulated value.
     */
    function arrayReduceRight(array, iteratee, accumulator, initFromArray) {
      var length = array.length;
      if (initFromArray && length) {
        accumulator = array[--length];
      }
      while (length--) {
        accumulator = iteratee(accumulator, array[length], length, array);
      }
      return accumulator;
    }

    /**
     * A specialized version of `_.some` for arrays without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     */
    function arraySome(array, predicate) {
      var index = -1,
          length = array.length;

      while (++index < length) {
        if (predicate(array[index], index, array)) {
          return true;
        }
      }
      return false;
    }

    /**
     * A specialized version of `_.sum` for arrays without support for iteratees.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @returns {number} Returns the sum.
     */
    function arraySum(array) {
      var length = array.length,
          result = 0;

      while (length--) {
        result += +array[length] || 0;
      }
      return result;
    }

    /**
     * Used by `_.defaults` to customize its `_.assign` use.
     *
     * @private
     * @param {*} objectValue The destination object property value.
     * @param {*} sourceValue The source object property value.
     * @returns {*} Returns the value to assign to the destination object.
     */
    function assignDefaults(objectValue, sourceValue) {
      return objectValue === undefined ? sourceValue : objectValue;
    }

    /**
     * Used by `_.template` to customize its `_.assign` use.
     *
     * **Note:** This function is like `assignDefaults` except that it ignores
     * inherited property values when checking if a property is `undefined`.
     *
     * @private
     * @param {*} objectValue The destination object property value.
     * @param {*} sourceValue The source object property value.
     * @param {string} key The key associated with the object and source values.
     * @param {Object} object The destination object.
     * @returns {*} Returns the value to assign to the destination object.
     */
    function assignOwnDefaults(objectValue, sourceValue, key, object) {
      return (objectValue === undefined || !hasOwnProperty.call(object, key))
        ? sourceValue
        : objectValue;
    }

    /**
     * A specialized version of `_.assign` for customizing assigned values without
     * support for argument juggling, multiple sources, and `this` binding `customizer`
     * functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {Function} customizer The function to customize assigned values.
     * @returns {Object} Returns `object`.
     */
    function assignWith(object, source, customizer) {
      var index = -1,
          props = keys(source),
          length = props.length;

      while (++index < length) {
        var key = props[index],
            value = object[key],
            result = customizer(value, source[key], key, object, source);

        if ((result === result ? (result !== value) : (value === value)) ||
            (value === undefined && !(key in object))) {
          object[key] = result;
        }
      }
      return object;
    }

    /**
     * The base implementation of `_.assign` without support for argument juggling,
     * multiple sources, and `customizer` functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @returns {Object} Returns `object`.
     */
    function baseAssign(object, source) {
      return source == null
        ? object
        : baseCopy(source, keys(source), object);
    }

    /**
     * The base implementation of `_.at` without support for string collections
     * and individual key arguments.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {number[]|string[]} props The property names or indexes of elements to pick.
     * @returns {Array} Returns the new array of picked elements.
     */
    function baseAt(collection, props) {
      var index = -1,
          isNil = collection == null,
          isArr = !isNil && isArrayLike(collection),
          length = isArr ? collection.length : 0,
          propsLength = props.length,
          result = Array(propsLength);

      while(++index < propsLength) {
        var key = props[index];
        if (isArr) {
          result[index] = isIndex(key, length) ? collection[key] : undefined;
        } else {
          result[index] = isNil ? undefined : collection[key];
        }
      }
      return result;
    }

    /**
     * Copies properties of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy properties from.
     * @param {Array} props The property names to copy.
     * @param {Object} [object={}] The object to copy properties to.
     * @returns {Object} Returns `object`.
     */
    function baseCopy(source, props, object) {
      object || (object = {});

      var index = -1,
          length = props.length;

      while (++index < length) {
        var key = props[index];
        object[key] = source[key];
      }
      return object;
    }

    /**
     * The base implementation of `_.callback` which supports specifying the
     * number of arguments to provide to `func`.
     *
     * @private
     * @param {*} [func=_.identity] The value to convert to a callback.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {number} [argCount] The number of arguments to provide to `func`.
     * @returns {Function} Returns the callback.
     */
    function baseCallback(func, thisArg, argCount) {
      var type = typeof func;
      if (type == 'function') {
        return thisArg === undefined
          ? func
          : bindCallback(func, thisArg, argCount);
      }
      if (func == null) {
        return identity;
      }
      if (type == 'object') {
        return baseMatches(func);
      }
      return thisArg === undefined
        ? property(func)
        : baseMatchesProperty(func, thisArg);
    }

    /**
     * The base implementation of `_.clone` without support for argument juggling
     * and `this` binding `customizer` functions.
     *
     * @private
     * @param {*} value The value to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @param {Function} [customizer] The function to customize cloning values.
     * @param {string} [key] The key of `value`.
     * @param {Object} [object] The object `value` belongs to.
     * @param {Array} [stackA=[]] Tracks traversed source objects.
     * @param {Array} [stackB=[]] Associates clones with source counterparts.
     * @returns {*} Returns the cloned value.
     */
    function baseClone(value, isDeep, customizer, key, object, stackA, stackB) {
      var result;
      if (customizer) {
        result = object ? customizer(value, key, object) : customizer(value);
      }
      if (result !== undefined) {
        return result;
      }
      if (!isObject(value)) {
        return value;
      }
      var isArr = isArray(value);
      if (isArr) {
        result = initCloneArray(value);
        if (!isDeep) {
          return arrayCopy(value, result);
        }
      } else {
        var tag = objToString.call(value),
            isFunc = tag == funcTag;

        if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
          result = initCloneObject(isFunc ? {} : value);
          if (!isDeep) {
            return baseAssign(result, value);
          }
        } else {
          return cloneableTags[tag]
            ? initCloneByTag(value, tag, isDeep)
            : (object ? value : {});
        }
      }
      // Check for circular references and return corresponding clone.
      stackA || (stackA = []);
      stackB || (stackB = []);

      var length = stackA.length;
      while (length--) {
        if (stackA[length] == value) {
          return stackB[length];
        }
      }
      // Add the source value to the stack of traversed objects and associate it with its clone.
      stackA.push(value);
      stackB.push(result);

      // Recursively populate clone (susceptible to call stack limits).
      (isArr ? arrayEach : baseForOwn)(value, function(subValue, key) {
        result[key] = baseClone(subValue, isDeep, customizer, key, value, stackA, stackB);
      });
      return result;
    }

    /**
     * The base implementation of `_.create` without support for assigning
     * properties to the created object.
     *
     * @private
     * @param {Object} prototype The object to inherit from.
     * @returns {Object} Returns the new object.
     */
    var baseCreate = (function() {
      function object() {}
      return function(prototype) {
        if (isObject(prototype)) {
          object.prototype = prototype;
          var result = new object;
          object.prototype = null;
        }
        return result || {};
      };
    }());

    /**
     * The base implementation of `_.delay` and `_.defer` which accepts an index
     * of where to slice the arguments to provide to `func`.
     *
     * @private
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay invocation.
     * @param {Object} args The arguments provide to `func`.
     * @returns {number} Returns the timer id.
     */
    function baseDelay(func, wait, args) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      return setTimeout(function() { func.apply(undefined, args); }, wait);
    }

    /**
     * The base implementation of `_.difference` which accepts a single array
     * of values to exclude.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Array} values The values to exclude.
     * @returns {Array} Returns the new array of filtered values.
     */
    function baseDifference(array, values) {
      var length = array ? array.length : 0,
          result = [];

      if (!length) {
        return result;
      }
      var index = -1,
          indexOf = getIndexOf(),
          isCommon = indexOf == baseIndexOf,
          cache = (isCommon && values.length >= 200) ? createCache(values) : null,
          valuesLength = values.length;

      if (cache) {
        indexOf = cacheIndexOf;
        isCommon = false;
        values = cache;
      }
      outer:
      while (++index < length) {
        var value = array[index];

        if (isCommon && value === value) {
          var valuesIndex = valuesLength;
          while (valuesIndex--) {
            if (values[valuesIndex] === value) {
              continue outer;
            }
          }
          result.push(value);
        }
        else if (indexOf(values, value, 0) < 0) {
          result.push(value);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.forEach` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array|Object|string} Returns `collection`.
     */
    var baseEach = createBaseEach(baseForOwn);

    /**
     * The base implementation of `_.forEachRight` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array|Object|string} Returns `collection`.
     */
    var baseEachRight = createBaseEach(baseForOwnRight, true);

    /**
     * The base implementation of `_.every` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if all elements pass the predicate check,
     *  else `false`
     */
    function baseEvery(collection, predicate) {
      var result = true;
      baseEach(collection, function(value, index, collection) {
        result = !!predicate(value, index, collection);
        return result;
      });
      return result;
    }

    /**
     * Gets the extremum value of `collection` invoking `iteratee` for each value
     * in `collection` to generate the criterion by which the value is ranked.
     * The `iteratee` is invoked with three arguments: (value, index|key, collection).
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} comparator The function used to compare values.
     * @param {*} exValue The initial extremum value.
     * @returns {*} Returns the extremum value.
     */
    function baseExtremum(collection, iteratee, comparator, exValue) {
      var computed = exValue,
          result = computed;

      baseEach(collection, function(value, index, collection) {
        var current = +iteratee(value, index, collection);
        if (comparator(current, computed) || (current === exValue && current === result)) {
          computed = current;
          result = value;
        }
      });
      return result;
    }

    /**
     * The base implementation of `_.fill` without an iteratee call guard.
     *
     * @private
     * @param {Array} array The array to fill.
     * @param {*} value The value to fill `array` with.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns `array`.
     */
    function baseFill(array, value, start, end) {
      var length = array.length;

      start = start == null ? 0 : (+start || 0);
      if (start < 0) {
        start = -start > length ? 0 : (length + start);
      }
      end = (end === undefined || end > length) ? length : (+end || 0);
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : (end >>> 0);
      start >>>= 0;

      while (start < length) {
        array[start++] = value;
      }
      return array;
    }

    /**
     * The base implementation of `_.filter` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     */
    function baseFilter(collection, predicate) {
      var result = [];
      baseEach(collection, function(value, index, collection) {
        if (predicate(value, index, collection)) {
          result.push(value);
        }
      });
      return result;
    }

    /**
     * The base implementation of `_.find`, `_.findLast`, `_.findKey`, and `_.findLastKey`,
     * without support for callback shorthands and `this` binding, which iterates
     * over `collection` using the provided `eachFunc`.
     *
     * @private
     * @param {Array|Object|string} collection The collection to search.
     * @param {Function} predicate The function invoked per iteration.
     * @param {Function} eachFunc The function to iterate over `collection`.
     * @param {boolean} [retKey] Specify returning the key of the found element
     *  instead of the element itself.
     * @returns {*} Returns the found element or its key, else `undefined`.
     */
    function baseFind(collection, predicate, eachFunc, retKey) {
      var result;
      eachFunc(collection, function(value, key, collection) {
        if (predicate(value, key, collection)) {
          result = retKey ? key : value;
          return false;
        }
      });
      return result;
    }

    /**
     * The base implementation of `_.flatten` with added support for restricting
     * flattening and specifying the start index.
     *
     * @private
     * @param {Array} array The array to flatten.
     * @param {boolean} [isDeep] Specify a deep flatten.
     * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
     * @returns {Array} Returns the new flattened array.
     */
    function baseFlatten(array, isDeep, isStrict) {
      var index = -1,
          length = array.length,
          resIndex = -1,
          result = [];

      while (++index < length) {
        var value = array[index];
        if (isObjectLike(value) && isArrayLike(value) &&
            (isStrict || isArray(value) || isArguments(value))) {
          if (isDeep) {
            // Recursively flatten arrays (susceptible to call stack limits).
            value = baseFlatten(value, isDeep, isStrict);
          }
          var valIndex = -1,
              valLength = value.length;

          while (++valIndex < valLength) {
            result[++resIndex] = value[valIndex];
          }
        } else if (!isStrict) {
          result[++resIndex] = value;
        }
      }
      return result;
    }

    /**
     * The base implementation of `baseForIn` and `baseForOwn` which iterates
     * over `object` properties returned by `keysFunc` invoking `iteratee` for
     * each property. Iteratee functions may exit iteration early by explicitly
     * returning `false`.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @returns {Object} Returns `object`.
     */
    var baseFor = createBaseFor();

    /**
     * This function is like `baseFor` except that it iterates over properties
     * in the opposite order.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @returns {Object} Returns `object`.
     */
    var baseForRight = createBaseFor(true);

    /**
     * The base implementation of `_.forIn` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */
    function baseForIn(object, iteratee) {
      return baseFor(object, iteratee, keysIn);
    }

    /**
     * The base implementation of `_.forOwn` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */
    function baseForOwn(object, iteratee) {
      return baseFor(object, iteratee, keys);
    }

    /**
     * The base implementation of `_.forOwnRight` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */
    function baseForOwnRight(object, iteratee) {
      return baseForRight(object, iteratee, keys);
    }

    /**
     * The base implementation of `_.functions` which creates an array of
     * `object` function property names filtered from those provided.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Array} props The property names to filter.
     * @returns {Array} Returns the new array of filtered property names.
     */
    function baseFunctions(object, props) {
      var index = -1,
          length = props.length,
          resIndex = -1,
          result = [];

      while (++index < length) {
        var key = props[index];
        if (isFunction(object[key])) {
          result[++resIndex] = key;
        }
      }
      return result;
    }

    /**
     * The base implementation of `get` without support for string paths
     * and default values.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array} path The path of the property to get.
     * @param {string} [pathKey] The key representation of path.
     * @returns {*} Returns the resolved value.
     */
    function baseGet(object, path, pathKey) {
      if (object == null) {
        return;
      }
      if (pathKey !== undefined && pathKey in toObject(object)) {
        path = [pathKey];
      }
      var index = 0,
          length = path.length;

      while (object != null && index < length) {
        object = object[path[index++]];
      }
      return (index && index == length) ? object : undefined;
    }

    /**
     * The base implementation of `_.isEqual` without support for `this` binding
     * `customizer` functions.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @param {Function} [customizer] The function to customize comparing values.
     * @param {boolean} [isLoose] Specify performing partial comparisons.
     * @param {Array} [stackA] Tracks traversed `value` objects.
     * @param {Array} [stackB] Tracks traversed `other` objects.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     */
    function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
      if (value === other) {
        return true;
      }
      if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
        return value !== value && other !== other;
      }
      return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
    }

    /**
     * A specialized version of `baseIsEqual` for arrays and objects which performs
     * deep comparisons and tracks traversed objects enabling objects with circular
     * references to be compared.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Function} [customizer] The function to customize comparing objects.
     * @param {boolean} [isLoose] Specify performing partial comparisons.
     * @param {Array} [stackA=[]] Tracks traversed `value` objects.
     * @param {Array} [stackB=[]] Tracks traversed `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
      var objIsArr = isArray(object),
          othIsArr = isArray(other),
          objTag = arrayTag,
          othTag = arrayTag;

      if (!objIsArr) {
        objTag = objToString.call(object);
        if (objTag == argsTag) {
          objTag = objectTag;
        } else if (objTag != objectTag) {
          objIsArr = isTypedArray(object);
        }
      }
      if (!othIsArr) {
        othTag = objToString.call(other);
        if (othTag == argsTag) {
          othTag = objectTag;
        } else if (othTag != objectTag) {
          othIsArr = isTypedArray(other);
        }
      }
      var objIsObj = objTag == objectTag,
          othIsObj = othTag == objectTag,
          isSameTag = objTag == othTag;

      if (isSameTag && !(objIsArr || objIsObj)) {
        return equalByTag(object, other, objTag);
      }
      if (!isLoose) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
            othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

        if (objIsWrapped || othIsWrapped) {
          return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
        }
      }
      if (!isSameTag) {
        return false;
      }
      // Assume cyclic values are equal.
      // For more information on detecting circular references see https://es5.github.io/#JO.
      stackA || (stackA = []);
      stackB || (stackB = []);

      var length = stackA.length;
      while (length--) {
        if (stackA[length] == object) {
          return stackB[length] == other;
        }
      }
      // Add `object` and `other` to the stack of traversed objects.
      stackA.push(object);
      stackB.push(other);

      var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);

      stackA.pop();
      stackB.pop();

      return result;
    }

    /**
     * The base implementation of `_.isMatch` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Array} matchData The propery names, values, and compare flags to match.
     * @param {Function} [customizer] The function to customize comparing objects.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     */
    function baseIsMatch(object, matchData, customizer) {
      var index = matchData.length,
          length = index,
          noCustomizer = !customizer;

      if (object == null) {
        return !length;
      }
      object = toObject(object);
      while (index--) {
        var data = matchData[index];
        if ((noCustomizer && data[2])
              ? data[1] !== object[data[0]]
              : !(data[0] in object)
            ) {
          return false;
        }
      }
      while (++index < length) {
        data = matchData[index];
        var key = data[0],
            objValue = object[key],
            srcValue = data[1];

        if (noCustomizer && data[2]) {
          if (objValue === undefined && !(key in object)) {
            return false;
          }
        } else {
          var result = customizer ? customizer(objValue, srcValue, key) : undefined;
          if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, true) : result)) {
            return false;
          }
        }
      }
      return true;
    }

    /**
     * The base implementation of `_.map` without support for callback shorthands
     * and `this` binding.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     */
    function baseMap(collection, iteratee) {
      var index = -1,
          result = isArrayLike(collection) ? Array(collection.length) : [];

      baseEach(collection, function(value, key, collection) {
        result[++index] = iteratee(value, key, collection);
      });
      return result;
    }

    /**
     * The base implementation of `_.matches` which does not clone `source`.
     *
     * @private
     * @param {Object} source The object of property values to match.
     * @returns {Function} Returns the new function.
     */
    function baseMatches(source) {
      var matchData = getMatchData(source);
      if (matchData.length == 1 && matchData[0][2]) {
        var key = matchData[0][0],
            value = matchData[0][1];

        return function(object) {
          if (object == null) {
            return false;
          }
          return object[key] === value && (value !== undefined || (key in toObject(object)));
        };
      }
      return function(object) {
        return baseIsMatch(object, matchData);
      };
    }

    /**
     * The base implementation of `_.matchesProperty` which does not clone `srcValue`.
     *
     * @private
     * @param {string} path The path of the property to get.
     * @param {*} srcValue The value to compare.
     * @returns {Function} Returns the new function.
     */
    function baseMatchesProperty(path, srcValue) {
      var isArr = isArray(path),
          isCommon = isKey(path) && isStrictComparable(srcValue),
          pathKey = (path + '');

      path = toPath(path);
      return function(object) {
        if (object == null) {
          return false;
        }
        var key = pathKey;
        object = toObject(object);
        if ((isArr || !isCommon) && !(key in object)) {
          object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
          if (object == null) {
            return false;
          }
          key = last(path);
          object = toObject(object);
        }
        return object[key] === srcValue
          ? (srcValue !== undefined || (key in object))
          : baseIsEqual(srcValue, object[key], undefined, true);
      };
    }

    /**
     * The base implementation of `_.merge` without support for argument juggling,
     * multiple sources, and `this` binding `customizer` functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {Function} [customizer] The function to customize merging properties.
     * @param {Array} [stackA=[]] Tracks traversed source objects.
     * @param {Array} [stackB=[]] Associates values with source counterparts.
     * @returns {Object} Returns `object`.
     */
    function baseMerge(object, source, customizer, stackA, stackB) {
      if (!isObject(object)) {
        return object;
      }
      var isSrcArr = isArrayLike(source) && (isArray(source) || isTypedArray(source)),
          props = isSrcArr ? null : keys(source);

      arrayEach(props || source, function(srcValue, key) {
        if (props) {
          key = srcValue;
          srcValue = source[key];
        }
        if (isObjectLike(srcValue)) {
          stackA || (stackA = []);
          stackB || (stackB = []);
          baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
        }
        else {
          var value = object[key],
              result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
              isCommon = result === undefined;

          if (isCommon) {
            result = srcValue;
          }
          if ((result !== undefined || (isSrcArr && !(key in object))) &&
              (isCommon || (result === result ? (result !== value) : (value === value)))) {
            object[key] = result;
          }
        }
      });
      return object;
    }

    /**
     * A specialized version of `baseMerge` for arrays and objects which performs
     * deep merges and tracks traversed objects enabling objects with circular
     * references to be merged.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {string} key The key of the value to merge.
     * @param {Function} mergeFunc The function to merge values.
     * @param {Function} [customizer] The function to customize merging properties.
     * @param {Array} [stackA=[]] Tracks traversed source objects.
     * @param {Array} [stackB=[]] Associates values with source counterparts.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
      var length = stackA.length,
          srcValue = source[key];

      while (length--) {
        if (stackA[length] == srcValue) {
          object[key] = stackB[length];
          return;
        }
      }
      var value = object[key],
          result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
          isCommon = result === undefined;

      if (isCommon) {
        result = srcValue;
        if (isArrayLike(srcValue) && (isArray(srcValue) || isTypedArray(srcValue))) {
          result = isArray(value)
            ? value
            : (isArrayLike(value) ? arrayCopy(value) : []);
        }
        else if (isPlainObject(srcValue) || isArguments(srcValue)) {
          result = isArguments(value)
            ? toPlainObject(value)
            : (isPlainObject(value) ? value : {});
        }
        else {
          isCommon = false;
        }
      }
      // Add the source value to the stack of traversed objects and associate
      // it with its merged value.
      stackA.push(srcValue);
      stackB.push(result);

      if (isCommon) {
        // Recursively merge objects and arrays (susceptible to call stack limits).
        object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
      } else if (result === result ? (result !== value) : (value === value)) {
        object[key] = result;
      }
    }

    /**
     * The base implementation of `_.property` without support for deep paths.
     *
     * @private
     * @param {string} key The key of the property to get.
     * @returns {Function} Returns the new function.
     */
    function baseProperty(key) {
      return function(object) {
        return object == null ? undefined : object[key];
      };
    }

    /**
     * A specialized version of `baseProperty` which supports deep paths.
     *
     * @private
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new function.
     */
    function basePropertyDeep(path) {
      var pathKey = (path + '');
      path = toPath(path);
      return function(object) {
        return baseGet(object, path, pathKey);
      };
    }

    /**
     * The base implementation of `_.pullAt` without support for individual
     * index arguments and capturing the removed elements.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {number[]} indexes The indexes of elements to remove.
     * @returns {Array} Returns `array`.
     */
    function basePullAt(array, indexes) {
      var length = array ? indexes.length : 0;
      while (length--) {
        var index = indexes[length];
        if (index != previous && isIndex(index)) {
          var previous = index;
          splice.call(array, index, 1);
        }
      }
      return array;
    }

    /**
     * The base implementation of `_.random` without support for argument juggling
     * and returning floating-point numbers.
     *
     * @private
     * @param {number} min The minimum possible value.
     * @param {number} max The maximum possible value.
     * @returns {number} Returns the random number.
     */
    function baseRandom(min, max) {
      return min + floor(nativeRandom() * (max - min + 1));
    }

    /**
     * The base implementation of `_.reduce` and `_.reduceRight` without support
     * for callback shorthands and `this` binding, which iterates over `collection`
     * using the provided `eachFunc`.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {*} accumulator The initial value.
     * @param {boolean} initFromCollection Specify using the first or last element
     *  of `collection` as the initial value.
     * @param {Function} eachFunc The function to iterate over `collection`.
     * @returns {*} Returns the accumulated value.
     */
    function baseReduce(collection, iteratee, accumulator, initFromCollection, eachFunc) {
      eachFunc(collection, function(value, index, collection) {
        accumulator = initFromCollection
          ? (initFromCollection = false, value)
          : iteratee(accumulator, value, index, collection);
      });
      return accumulator;
    }

    /**
     * The base implementation of `setData` without support for hot loop detection.
     *
     * @private
     * @param {Function} func The function to associate metadata with.
     * @param {*} data The metadata.
     * @returns {Function} Returns `func`.
     */
    var baseSetData = !metaMap ? identity : function(func, data) {
      metaMap.set(func, data);
      return func;
    };

    /**
     * The base implementation of `_.slice` without an iteratee call guard.
     *
     * @private
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the slice of `array`.
     */
    function baseSlice(array, start, end) {
      var index = -1,
          length = array.length;

      start = start == null ? 0 : (+start || 0);
      if (start < 0) {
        start = -start > length ? 0 : (length + start);
      }
      end = (end === undefined || end > length) ? length : (+end || 0);
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : ((end - start) >>> 0);
      start >>>= 0;

      var result = Array(length);
      while (++index < length) {
        result[index] = array[index + start];
      }
      return result;
    }

    /**
     * The base implementation of `_.some` without support for callback shorthands
     * and `this` binding.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     */
    function baseSome(collection, predicate) {
      var result;

      baseEach(collection, function(value, index, collection) {
        result = predicate(value, index, collection);
        return !result;
      });
      return !!result;
    }

    /**
     * The base implementation of `_.sortBy` which uses `comparer` to define
     * the sort order of `array` and replaces criteria objects with their
     * corresponding values.
     *
     * @private
     * @param {Array} array The array to sort.
     * @param {Function} comparer The function to define sort order.
     * @returns {Array} Returns `array`.
     */
    function baseSortBy(array, comparer) {
      var length = array.length;

      array.sort(comparer);
      while (length--) {
        array[length] = array[length].value;
      }
      return array;
    }

    /**
     * The base implementation of `_.sortByOrder` without param guards.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
     * @param {boolean[]} orders The sort orders of `iteratees`.
     * @returns {Array} Returns the new sorted array.
     */
    function baseSortByOrder(collection, iteratees, orders) {
      var callback = getCallback(),
          index = -1;

      iteratees = arrayMap(iteratees, function(iteratee) { return callback(iteratee); });

      var result = baseMap(collection, function(value) {
        var criteria = arrayMap(iteratees, function(iteratee) { return iteratee(value); });
        return { 'criteria': criteria, 'index': ++index, 'value': value };
      });

      return baseSortBy(result, function(object, other) {
        return compareMultiple(object, other, orders);
      });
    }

    /**
     * The base implementation of `_.sum` without support for callback shorthands
     * and `this` binding.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {number} Returns the sum.
     */
    function baseSum(collection, iteratee) {
      var result = 0;
      baseEach(collection, function(value, index, collection) {
        result += +iteratee(value, index, collection) || 0;
      });
      return result;
    }

    /**
     * The base implementation of `_.uniq` without support for callback shorthands
     * and `this` binding.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee] The function invoked per iteration.
     * @returns {Array} Returns the new duplicate-value-free array.
     */
    function baseUniq(array, iteratee) {
      var index = -1,
          indexOf = getIndexOf(),
          length = array.length,
          isCommon = indexOf == baseIndexOf,
          isLarge = isCommon && length >= 200,
          seen = isLarge ? createCache() : null,
          result = [];

      if (seen) {
        indexOf = cacheIndexOf;
        isCommon = false;
      } else {
        isLarge = false;
        seen = iteratee ? [] : result;
      }
      outer:
      while (++index < length) {
        var value = array[index],
            computed = iteratee ? iteratee(value, index, array) : value;

        if (isCommon && value === value) {
          var seenIndex = seen.length;
          while (seenIndex--) {
            if (seen[seenIndex] === computed) {
              continue outer;
            }
          }
          if (iteratee) {
            seen.push(computed);
          }
          result.push(value);
        }
        else if (indexOf(seen, computed, 0) < 0) {
          if (iteratee || isLarge) {
            seen.push(computed);
          }
          result.push(value);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.values` and `_.valuesIn` which creates an
     * array of `object` property values corresponding to the property names
     * of `props`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array} props The property names to get values for.
     * @returns {Object} Returns the array of property values.
     */
    function baseValues(object, props) {
      var index = -1,
          length = props.length,
          result = Array(length);

      while (++index < length) {
        result[index] = object[props[index]];
      }
      return result;
    }

    /**
     * The base implementation of `_.dropRightWhile`, `_.dropWhile`, `_.takeRightWhile`,
     * and `_.takeWhile` without support for callback shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to query.
     * @param {Function} predicate The function invoked per iteration.
     * @param {boolean} [isDrop] Specify dropping elements instead of taking them.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Array} Returns the slice of `array`.
     */
    function baseWhile(array, predicate, isDrop, fromRight) {
      var length = array.length,
          index = fromRight ? length : -1;

      while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {}
      return isDrop
        ? baseSlice(array, (fromRight ? 0 : index), (fromRight ? index + 1 : length))
        : baseSlice(array, (fromRight ? index + 1 : 0), (fromRight ? length : index));
    }

    /**
     * The base implementation of `wrapperValue` which returns the result of
     * performing a sequence of actions on the unwrapped `value`, where each
     * successive action is supplied the return value of the previous.
     *
     * @private
     * @param {*} value The unwrapped value.
     * @param {Array} actions Actions to peform to resolve the unwrapped value.
     * @returns {*} Returns the resolved value.
     */
    function baseWrapperValue(value, actions) {
      var result = value;
      if (result instanceof LazyWrapper) {
        result = result.value();
      }
      var index = -1,
          length = actions.length;

      while (++index < length) {
        var args = [result],
            action = actions[index];

        push.apply(args, action.args);
        result = action.func.apply(action.thisArg, args);
      }
      return result;
    }

    /**
     * Performs a binary search of `array` to determine the index at which `value`
     * should be inserted into `array` in order to maintain its sort order.
     *
     * @private
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {boolean} [retHighest] Specify returning the highest qualified index.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     */
    function binaryIndex(array, value, retHighest) {
      var low = 0,
          high = array ? array.length : low;

      if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
        while (low < high) {
          var mid = (low + high) >>> 1,
              computed = array[mid];

          if ((retHighest ? (computed <= value) : (computed < value)) && computed !== null) {
            low = mid + 1;
          } else {
            high = mid;
          }
        }
        return high;
      }
      return binaryIndexBy(array, value, identity, retHighest);
    }

    /**
     * This function is like `binaryIndex` except that it invokes `iteratee` for
     * `value` and each element of `array` to compute their sort ranking. The
     * iteratee is invoked with one argument; (value).
     *
     * @private
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {boolean} [retHighest] Specify returning the highest qualified index.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     */
    function binaryIndexBy(array, value, iteratee, retHighest) {
      value = iteratee(value);

      var low = 0,
          high = array ? array.length : 0,
          valIsNaN = value !== value,
          valIsNull = value === null,
          valIsUndef = value === undefined;

      while (low < high) {
        var mid = floor((low + high) / 2),
            computed = iteratee(array[mid]),
            isDef = computed !== undefined,
            isReflexive = computed === computed;

        if (valIsNaN) {
          var setLow = isReflexive || retHighest;
        } else if (valIsNull) {
          setLow = isReflexive && isDef && (retHighest || computed != null);
        } else if (valIsUndef) {
          setLow = isReflexive && (retHighest || isDef);
        } else if (computed == null) {
          setLow = false;
        } else {
          setLow = retHighest ? (computed <= value) : (computed < value);
        }
        if (setLow) {
          low = mid + 1;
        } else {
          high = mid;
        }
      }
      return nativeMin(high, MAX_ARRAY_INDEX);
    }

    /**
     * A specialized version of `baseCallback` which only supports `this` binding
     * and specifying the number of arguments to provide to `func`.
     *
     * @private
     * @param {Function} func The function to bind.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {number} [argCount] The number of arguments to provide to `func`.
     * @returns {Function} Returns the callback.
     */
    function bindCallback(func, thisArg, argCount) {
      if (typeof func != 'function') {
        return identity;
      }
      if (thisArg === undefined) {
        return func;
      }
      switch (argCount) {
        case 1: return function(value) {
          return func.call(thisArg, value);
        };
        case 3: return function(value, index, collection) {
          return func.call(thisArg, value, index, collection);
        };
        case 4: return function(accumulator, value, index, collection) {
          return func.call(thisArg, accumulator, value, index, collection);
        };
        case 5: return function(value, other, key, object, source) {
          return func.call(thisArg, value, other, key, object, source);
        };
      }
      return function() {
        return func.apply(thisArg, arguments);
      };
    }

    /**
     * Creates a clone of the given array buffer.
     *
     * @private
     * @param {ArrayBuffer} buffer The array buffer to clone.
     * @returns {ArrayBuffer} Returns the cloned array buffer.
     */
    function bufferClone(buffer) {
      return bufferSlice.call(buffer, 0);
    }
    if (!bufferSlice) {
      // PhantomJS has `ArrayBuffer` and `Uint8Array` but not `Float64Array`.
      bufferClone = !(ArrayBuffer && Uint8Array) ? constant(null) : function(buffer) {
        var byteLength = buffer.byteLength,
            floatLength = Float64Array ? floor(byteLength / FLOAT64_BYTES_PER_ELEMENT) : 0,
            offset = floatLength * FLOAT64_BYTES_PER_ELEMENT,
            result = new ArrayBuffer(byteLength);

        if (floatLength) {
          var view = new Float64Array(result, 0, floatLength);
          view.set(new Float64Array(buffer, 0, floatLength));
        }
        if (byteLength != offset) {
          view = new Uint8Array(result, offset);
          view.set(new Uint8Array(buffer, offset));
        }
        return result;
      };
    }

    /**
     * Creates an array that is the composition of partially applied arguments,
     * placeholders, and provided arguments into a single array of arguments.
     *
     * @private
     * @param {Array|Object} args The provided arguments.
     * @param {Array} partials The arguments to prepend to those provided.
     * @param {Array} holders The `partials` placeholder indexes.
     * @returns {Array} Returns the new array of composed arguments.
     */
    function composeArgs(args, partials, holders) {
      var holdersLength = holders.length,
          argsIndex = -1,
          argsLength = nativeMax(args.length - holdersLength, 0),
          leftIndex = -1,
          leftLength = partials.length,
          result = Array(argsLength + leftLength);

      while (++leftIndex < leftLength) {
        result[leftIndex] = partials[leftIndex];
      }
      while (++argsIndex < holdersLength) {
        result[holders[argsIndex]] = args[argsIndex];
      }
      while (argsLength--) {
        result[leftIndex++] = args[argsIndex++];
      }
      return result;
    }

    /**
     * This function is like `composeArgs` except that the arguments composition
     * is tailored for `_.partialRight`.
     *
     * @private
     * @param {Array|Object} args The provided arguments.
     * @param {Array} partials The arguments to append to those provided.
     * @param {Array} holders The `partials` placeholder indexes.
     * @returns {Array} Returns the new array of composed arguments.
     */
    function composeArgsRight(args, partials, holders) {
      var holdersIndex = -1,
          holdersLength = holders.length,
          argsIndex = -1,
          argsLength = nativeMax(args.length - holdersLength, 0),
          rightIndex = -1,
          rightLength = partials.length,
          result = Array(argsLength + rightLength);

      while (++argsIndex < argsLength) {
        result[argsIndex] = args[argsIndex];
      }
      var offset = argsIndex;
      while (++rightIndex < rightLength) {
        result[offset + rightIndex] = partials[rightIndex];
      }
      while (++holdersIndex < holdersLength) {
        result[offset + holders[holdersIndex]] = args[argsIndex++];
      }
      return result;
    }

    /**
     * Creates a function that aggregates a collection, creating an accumulator
     * object composed from the results of running each element in the collection
     * through an iteratee.
     *
     * **Note:** This function is used to create `_.countBy`, `_.groupBy`, `_.indexBy`,
     * and `_.partition`.
     *
     * @private
     * @param {Function} setter The function to set keys and values of the accumulator object.
     * @param {Function} [initializer] The function to initialize the accumulator object.
     * @returns {Function} Returns the new aggregator function.
     */
    function createAggregator(setter, initializer) {
      return function(collection, iteratee, thisArg) {
        var result = initializer ? initializer() : {};
        iteratee = getCallback(iteratee, thisArg, 3);

        if (isArray(collection)) {
          var index = -1,
              length = collection.length;

          while (++index < length) {
            var value = collection[index];
            setter(result, value, iteratee(value, index, collection), collection);
          }
        } else {
          baseEach(collection, function(value, key, collection) {
            setter(result, value, iteratee(value, key, collection), collection);
          });
        }
        return result;
      };
    }

    /**
     * Creates a function that assigns properties of source object(s) to a given
     * destination object.
     *
     * **Note:** This function is used to create `_.assign`, `_.defaults`, and `_.merge`.
     *
     * @private
     * @param {Function} assigner The function to assign values.
     * @returns {Function} Returns the new assigner function.
     */
    function createAssigner(assigner) {
      return restParam(function(object, sources) {
        var index = -1,
            length = object == null ? 0 : sources.length,
            customizer = length > 2 ? sources[length - 2] : undefined,
            guard = length > 2 ? sources[2] : undefined,
            thisArg = length > 1 ? sources[length - 1] : undefined;

        if (typeof customizer == 'function') {
          customizer = bindCallback(customizer, thisArg, 5);
          length -= 2;
        } else {
          customizer = typeof thisArg == 'function' ? thisArg : undefined;
          length -= (customizer ? 1 : 0);
        }
        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          customizer = length < 3 ? undefined : customizer;
          length = 1;
        }
        while (++index < length) {
          var source = sources[index];
          if (source) {
            assigner(object, source, customizer);
          }
        }
        return object;
      });
    }

    /**
     * Creates a `baseEach` or `baseEachRight` function.
     *
     * @private
     * @param {Function} eachFunc The function to iterate over a collection.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */
    function createBaseEach(eachFunc, fromRight) {
      return function(collection, iteratee) {
        var length = collection ? getLength(collection) : 0;
        if (!isLength(length)) {
          return eachFunc(collection, iteratee);
        }
        var index = fromRight ? length : -1,
            iterable = toObject(collection);

        while ((fromRight ? index-- : ++index < length)) {
          if (iteratee(iterable[index], index, iterable) === false) {
            break;
          }
        }
        return collection;
      };
    }

    /**
     * Creates a base function for `_.forIn` or `_.forInRight`.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */
    function createBaseFor(fromRight) {
      return function(object, iteratee, keysFunc) {
        var iterable = toObject(object),
            props = keysFunc(object),
            length = props.length,
            index = fromRight ? length : -1;

        while ((fromRight ? index-- : ++index < length)) {
          var key = props[index];
          if (iteratee(iterable[key], key, iterable) === false) {
            break;
          }
        }
        return object;
      };
    }

    /**
     * Creates a function that wraps `func` and invokes it with the `this`
     * binding of `thisArg`.
     *
     * @private
     * @param {Function} func The function to bind.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @returns {Function} Returns the new bound function.
     */
    function createBindWrapper(func, thisArg) {
      var Ctor = createCtorWrapper(func);

      function wrapper() {
        var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
        return fn.apply(thisArg, arguments);
      }
      return wrapper;
    }

    /**
     * Creates a `Set` cache object to optimize linear searches of large arrays.
     *
     * @private
     * @param {Array} [values] The values to cache.
     * @returns {null|Object} Returns the new cache object if `Set` is supported, else `null`.
     */
    var createCache = !(nativeCreate && Set) ? constant(null) : function(values) {
      return new SetCache(values);
    };

    /**
     * Creates a function that produces compound words out of the words in a
     * given string.
     *
     * @private
     * @param {Function} callback The function to combine each word.
     * @returns {Function} Returns the new compounder function.
     */
    function createCompounder(callback) {
      return function(string) {
        var index = -1,
            array = words(deburr(string)),
            length = array.length,
            result = '';

        while (++index < length) {
          result = callback(result, array[index], index);
        }
        return result;
      };
    }

    /**
     * Creates a function that produces an instance of `Ctor` regardless of
     * whether it was invoked as part of a `new` expression or by `call` or `apply`.
     *
     * @private
     * @param {Function} Ctor The constructor to wrap.
     * @returns {Function} Returns the new wrapped function.
     */
    function createCtorWrapper(Ctor) {
      return function() {
        // Use a `switch` statement to work with class constructors.
        // See https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ecmascript-function-objects-call-thisargument-argumentslist
        // for more details.
        var args = arguments;
        switch (args.length) {
          case 0: return new Ctor;
          case 1: return new Ctor(args[0]);
          case 2: return new Ctor(args[0], args[1]);
          case 3: return new Ctor(args[0], args[1], args[2]);
          case 4: return new Ctor(args[0], args[1], args[2], args[3]);
          case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
        }
        var thisBinding = baseCreate(Ctor.prototype),
            result = Ctor.apply(thisBinding, args);

        // Mimic the constructor's `return` behavior.
        // See https://es5.github.io/#x13.2.2 for more details.
        return isObject(result) ? result : thisBinding;
      };
    }

    /**
     * Creates a `_.curry` or `_.curryRight` function.
     *
     * @private
     * @param {boolean} flag The curry bit flag.
     * @returns {Function} Returns the new curry function.
     */
    function createCurry(flag) {
      function curryFunc(func, arity, guard) {
        if (guard && isIterateeCall(func, arity, guard)) {
          arity = null;
        }
        var result = createWrapper(func, flag, null, null, null, null, null, arity);
        result.placeholder = curryFunc.placeholder;
        return result;
      }
      return curryFunc;
    }

    /**
     * Creates a `_.max` or `_.min` function.
     *
     * @private
     * @param {Function} comparator The function used to compare values.
     * @param {*} exValue The initial extremum value.
     * @returns {Function} Returns the new extremum function.
     */
    function createExtremum(comparator, exValue) {
      return function(collection, iteratee, thisArg) {
        if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
          iteratee = null;
        }
        iteratee = getCallback(iteratee, thisArg, 3);
        if (iteratee.length == 1) {
          collection = toIterable(collection);
          var result = arrayExtremum(collection, iteratee, comparator, exValue);
          if (!(collection.length && result === exValue)) {
            return result;
          }
        }
        return baseExtremum(collection, iteratee, comparator, exValue);
      };
    }

    /**
     * Creates a `_.find` or `_.findLast` function.
     *
     * @private
     * @param {Function} eachFunc The function to iterate over a collection.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new find function.
     */
    function createFind(eachFunc, fromRight) {
      return function(collection, predicate, thisArg) {
        predicate = getCallback(predicate, thisArg, 3);
        if (isArray(collection)) {
          var index = baseFindIndex(collection, predicate, fromRight);
          return index > -1 ? collection[index] : undefined;
        }
        return baseFind(collection, predicate, eachFunc);
      };
    }

    /**
     * Creates a `_.findIndex` or `_.findLastIndex` function.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new find function.
     */
    function createFindIndex(fromRight) {
      return function(array, predicate, thisArg) {
        if (!(array && array.length)) {
          return -1;
        }
        predicate = getCallback(predicate, thisArg, 3);
        return baseFindIndex(array, predicate, fromRight);
      };
    }

    /**
     * Creates a `_.findKey` or `_.findLastKey` function.
     *
     * @private
     * @param {Function} objectFunc The function to iterate over an object.
     * @returns {Function} Returns the new find function.
     */
    function createFindKey(objectFunc) {
      return function(object, predicate, thisArg) {
        predicate = getCallback(predicate, thisArg, 3);
        return baseFind(object, predicate, objectFunc, true);
      };
    }

    /**
     * Creates a `_.flow` or `_.flowRight` function.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new flow function.
     */
    function createFlow(fromRight) {
      return function() {
        var wrapper,
            length = arguments.length,
            index = fromRight ? length : -1,
            leftIndex = 0,
            funcs = Array(length);

        while ((fromRight ? index-- : ++index < length)) {
          var func = funcs[leftIndex++] = arguments[index];
          if (typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          if (!wrapper && LodashWrapper.prototype.thru && getFuncName(func) == 'wrapper') {
            wrapper = new LodashWrapper([]);
          }
        }
        index = wrapper ? -1 : length;
        while (++index < length) {
          func = funcs[index];

          var funcName = getFuncName(func),
              data = funcName == 'wrapper' ? getData(func) : null;

          if (data && isLaziable(data[0]) && data[1] == (ARY_FLAG | CURRY_FLAG | PARTIAL_FLAG | REARG_FLAG) && !data[4].length && data[9] == 1) {
            wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
          } else {
            wrapper = (func.length == 1 && isLaziable(func)) ? wrapper[funcName]() : wrapper.thru(func);
          }
        }
        return function() {
          var args = arguments;
          if (wrapper && args.length == 1 && isArray(args[0])) {
            return wrapper.plant(args[0]).value();
          }
          var index = 0,
              result = length ? funcs[index].apply(this, args) : args[0];

          while (++index < length) {
            result = funcs[index].call(this, result);
          }
          return result;
        };
      };
    }

    /**
     * Creates a function for `_.forEach` or `_.forEachRight`.
     *
     * @private
     * @param {Function} arrayFunc The function to iterate over an array.
     * @param {Function} eachFunc The function to iterate over a collection.
     * @returns {Function} Returns the new each function.
     */
    function createForEach(arrayFunc, eachFunc) {
      return function(collection, iteratee, thisArg) {
        return (typeof iteratee == 'function' && thisArg === undefined && isArray(collection))
          ? arrayFunc(collection, iteratee)
          : eachFunc(collection, bindCallback(iteratee, thisArg, 3));
      };
    }

    /**
     * Creates a function for `_.forIn` or `_.forInRight`.
     *
     * @private
     * @param {Function} objectFunc The function to iterate over an object.
     * @returns {Function} Returns the new each function.
     */
    function createForIn(objectFunc) {
      return function(object, iteratee, thisArg) {
        if (typeof iteratee != 'function' || thisArg !== undefined) {
          iteratee = bindCallback(iteratee, thisArg, 3);
        }
        return objectFunc(object, iteratee, keysIn);
      };
    }

    /**
     * Creates a function for `_.forOwn` or `_.forOwnRight`.
     *
     * @private
     * @param {Function} objectFunc The function to iterate over an object.
     * @returns {Function} Returns the new each function.
     */
    function createForOwn(objectFunc) {
      return function(object, iteratee, thisArg) {
        if (typeof iteratee != 'function' || thisArg !== undefined) {
          iteratee = bindCallback(iteratee, thisArg, 3);
        }
        return objectFunc(object, iteratee);
      };
    }

    /**
     * Creates a function for `_.mapKeys` or `_.mapValues`.
     *
     * @private
     * @param {boolean} [isMapKeys] Specify mapping keys instead of values.
     * @returns {Function} Returns the new map function.
     */
    function createObjectMapper(isMapKeys) {
      return function(object, iteratee, thisArg) {
        var result = {};
        iteratee = getCallback(iteratee, thisArg, 3);

        baseForOwn(object, function(value, key, object) {
          var mapped = iteratee(value, key, object);
          key = isMapKeys ? mapped : key;
          value = isMapKeys ? value : mapped;
          result[key] = value;
        });
        return result;
      };
    }

    /**
     * Creates a function for `_.padLeft` or `_.padRight`.
     *
     * @private
     * @param {boolean} [fromRight] Specify padding from the right.
     * @returns {Function} Returns the new pad function.
     */
    function createPadDir(fromRight) {
      return function(string, length, chars) {
        string = baseToString(string);
        return (fromRight ? string : '') + createPadding(string, length, chars) + (fromRight ? '' : string);
      };
    }

    /**
     * Creates a `_.partial` or `_.partialRight` function.
     *
     * @private
     * @param {boolean} flag The partial bit flag.
     * @returns {Function} Returns the new partial function.
     */
    function createPartial(flag) {
      var partialFunc = restParam(function(func, partials) {
        var holders = replaceHolders(partials, partialFunc.placeholder);
        return createWrapper(func, flag, null, partials, holders);
      });
      return partialFunc;
    }

    /**
     * Creates a function for `_.reduce` or `_.reduceRight`.
     *
     * @private
     * @param {Function} arrayFunc The function to iterate over an array.
     * @param {Function} eachFunc The function to iterate over a collection.
     * @returns {Function} Returns the new each function.
     */
    function createReduce(arrayFunc, eachFunc) {
      return function(collection, iteratee, accumulator, thisArg) {
        var initFromArray = arguments.length < 3;
        return (typeof iteratee == 'function' && thisArg === undefined && isArray(collection))
          ? arrayFunc(collection, iteratee, accumulator, initFromArray)
          : baseReduce(collection, getCallback(iteratee, thisArg, 4), accumulator, initFromArray, eachFunc);
      };
    }

    /**
     * Creates a function that wraps `func` and invokes it with optional `this`
     * binding of, partial application, and currying.
     *
     * @private
     * @param {Function|string} func The function or method name to reference.
     * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {Array} [partials] The arguments to prepend to those provided to the new function.
     * @param {Array} [holders] The `partials` placeholder indexes.
     * @param {Array} [partialsRight] The arguments to append to those provided to the new function.
     * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
     * @param {Array} [argPos] The argument positions of the new function.
     * @param {number} [ary] The arity cap of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createHybridWrapper(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
      var isAry = bitmask & ARY_FLAG,
          isBind = bitmask & BIND_FLAG,
          isBindKey = bitmask & BIND_KEY_FLAG,
          isCurry = bitmask & CURRY_FLAG,
          isCurryBound = bitmask & CURRY_BOUND_FLAG,
          isCurryRight = bitmask & CURRY_RIGHT_FLAG,
          Ctor = isBindKey ? null : createCtorWrapper(func);

      function wrapper() {
        // Avoid `arguments` object use disqualifying optimizations by
        // converting it to an array before providing it to other functions.
        var length = arguments.length,
            index = length,
            args = Array(length);

        while (index--) {
          args[index] = arguments[index];
        }
        if (partials) {
          args = composeArgs(args, partials, holders);
        }
        if (partialsRight) {
          args = composeArgsRight(args, partialsRight, holdersRight);
        }
        if (isCurry || isCurryRight) {
          var placeholder = wrapper.placeholder,
              argsHolders = replaceHolders(args, placeholder);

          length -= argsHolders.length;
          if (length < arity) {
            var newArgPos = argPos ? arrayCopy(argPos) : null,
                newArity = nativeMax(arity - length, 0),
                newsHolders = isCurry ? argsHolders : null,
                newHoldersRight = isCurry ? null : argsHolders,
                newPartials = isCurry ? args : null,
                newPartialsRight = isCurry ? null : args;

            bitmask |= (isCurry ? PARTIAL_FLAG : PARTIAL_RIGHT_FLAG);
            bitmask &= ~(isCurry ? PARTIAL_RIGHT_FLAG : PARTIAL_FLAG);

            if (!isCurryBound) {
              bitmask &= ~(BIND_FLAG | BIND_KEY_FLAG);
            }
            var newData = [func, bitmask, thisArg, newPartials, newsHolders, newPartialsRight, newHoldersRight, newArgPos, ary, newArity],
                result = createHybridWrapper.apply(undefined, newData);

            if (isLaziable(func)) {
              setData(result, newData);
            }
            result.placeholder = placeholder;
            return result;
          }
        }
        var thisBinding = isBind ? thisArg : this,
            fn = isBindKey ? thisBinding[func] : func;

        if (argPos) {
          args = reorder(args, argPos);
        }
        if (isAry && ary < args.length) {
          args.length = ary;
        }
        if (this && this !== root && this instanceof wrapper) {
          fn = Ctor || createCtorWrapper(func);
        }
        return fn.apply(thisBinding, args);
      }
      return wrapper;
    }

    /**
     * Creates the padding required for `string` based on the given `length`.
     * The `chars` string is truncated if the number of characters exceeds `length`.
     *
     * @private
     * @param {string} string The string to create padding for.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the pad for `string`.
     */
    function createPadding(string, length, chars) {
      var strLength = string.length;
      length = +length;

      if (strLength >= length || !nativeIsFinite(length)) {
        return '';
      }
      var padLength = length - strLength;
      chars = chars == null ? ' ' : (chars + '');
      return repeat(chars, ceil(padLength / chars.length)).slice(0, padLength);
    }

    /**
     * Creates a function that wraps `func` and invokes it with the optional `this`
     * binding of `thisArg` and the `partials` prepended to those provided to
     * the wrapper.
     *
     * @private
     * @param {Function} func The function to partially apply arguments to.
     * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {Array} partials The arguments to prepend to those provided to the new function.
     * @returns {Function} Returns the new bound function.
     */
    function createPartialWrapper(func, bitmask, thisArg, partials) {
      var isBind = bitmask & BIND_FLAG,
          Ctor = createCtorWrapper(func);

      function wrapper() {
        // Avoid `arguments` object use disqualifying optimizations by
        // converting it to an array before providing it `func`.
        var argsIndex = -1,
            argsLength = arguments.length,
            leftIndex = -1,
            leftLength = partials.length,
            args = Array(argsLength + leftLength);

        while (++leftIndex < leftLength) {
          args[leftIndex] = partials[leftIndex];
        }
        while (argsLength--) {
          args[leftIndex++] = arguments[++argsIndex];
        }
        var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
        return fn.apply(isBind ? thisArg : this, args);
      }
      return wrapper;
    }

    /**
     * Creates a `_.sortedIndex` or `_.sortedLastIndex` function.
     *
     * @private
     * @param {boolean} [retHighest] Specify returning the highest qualified index.
     * @returns {Function} Returns the new index function.
     */
    function createSortedIndex(retHighest) {
      return function(array, value, iteratee, thisArg) {
        var callback = getCallback(iteratee);
        return (iteratee == null && callback === baseCallback)
          ? binaryIndex(array, value, retHighest)
          : binaryIndexBy(array, value, callback(iteratee, thisArg, 1), retHighest);
      };
    }

    /**
     * Creates a function that either curries or invokes `func` with optional
     * `this` binding and partially applied arguments.
     *
     * @private
     * @param {Function|string} func The function or method name to reference.
     * @param {number} bitmask The bitmask of flags.
     *  The bitmask may be composed of the following flags:
     *     1 - `_.bind`
     *     2 - `_.bindKey`
     *     4 - `_.curry` or `_.curryRight` of a bound function
     *     8 - `_.curry`
     *    16 - `_.curryRight`
     *    32 - `_.partial`
     *    64 - `_.partialRight`
     *   128 - `_.rearg`
     *   256 - `_.ary`
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {Array} [partials] The arguments to be partially applied.
     * @param {Array} [holders] The `partials` placeholder indexes.
     * @param {Array} [argPos] The argument positions of the new function.
     * @param {number} [ary] The arity cap of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createWrapper(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
      var isBindKey = bitmask & BIND_KEY_FLAG;
      if (!isBindKey && typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var length = partials ? partials.length : 0;
      if (!length) {
        bitmask &= ~(PARTIAL_FLAG | PARTIAL_RIGHT_FLAG);
        partials = holders = null;
      }
      length -= (holders ? holders.length : 0);
      if (bitmask & PARTIAL_RIGHT_FLAG) {
        var partialsRight = partials,
            holdersRight = holders;

        partials = holders = null;
      }
      var data = isBindKey ? null : getData(func),
          newData = [func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity];

      if (data) {
        mergeData(newData, data);
        bitmask = newData[1];
        arity = newData[9];
      }
      newData[9] = arity == null
        ? (isBindKey ? 0 : func.length)
        : (nativeMax(arity - length, 0) || 0);

      if (bitmask == BIND_FLAG) {
        var result = createBindWrapper(newData[0], newData[2]);
      } else if ((bitmask == PARTIAL_FLAG || bitmask == (BIND_FLAG | PARTIAL_FLAG)) && !newData[4].length) {
        result = createPartialWrapper.apply(undefined, newData);
      } else {
        result = createHybridWrapper.apply(undefined, newData);
      }
      var setter = data ? baseSetData : setData;
      return setter(result, newData);
    }

    /**
     * A specialized version of `baseIsEqualDeep` for arrays with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Array} array The array to compare.
     * @param {Array} other The other array to compare.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Function} [customizer] The function to customize comparing arrays.
     * @param {boolean} [isLoose] Specify performing partial comparisons.
     * @param {Array} [stackA] Tracks traversed `value` objects.
     * @param {Array} [stackB] Tracks traversed `other` objects.
     * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
     */
    function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
      var index = -1,
          arrLength = array.length,
          othLength = other.length;

      if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
        return false;
      }
      // Ignore non-index properties.
      while (++index < arrLength) {
        var arrValue = array[index],
            othValue = other[index],
            result = customizer ? customizer(isLoose ? othValue : arrValue, isLoose ? arrValue : othValue, index) : undefined;

        if (result !== undefined) {
          if (result) {
            continue;
          }
          return false;
        }
        // Recursively compare arrays (susceptible to call stack limits).
        if (isLoose) {
          if (!arraySome(other, function(othValue) {
                return arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
              })) {
            return false;
          }
        } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB))) {
          return false;
        }
      }
      return true;
    }

    /**
     * A specialized version of `baseIsEqualDeep` for comparing objects of
     * the same `toStringTag`.
     *
     * **Note:** This function only supports comparing values with tags of
     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
     *
     * @private
     * @param {Object} value The object to compare.
     * @param {Object} other The other object to compare.
     * @param {string} tag The `toStringTag` of the objects to compare.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function equalByTag(object, other, tag) {
      switch (tag) {
        case boolTag:
        case dateTag:
          // Coerce dates and booleans to numbers, dates to milliseconds and booleans
          // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
          return +object == +other;

        case errorTag:
          return object.name == other.name && object.message == other.message;

        case numberTag:
          // Treat `NaN` vs. `NaN` as equal.
          return (object != +object)
            ? other != +other
            : object == +other;

        case regexpTag:
        case stringTag:
          // Coerce regexes to strings and treat strings primitives and string
          // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
          return object == (other + '');
      }
      return false;
    }

    /**
     * A specialized version of `baseIsEqualDeep` for objects with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Function} [customizer] The function to customize comparing values.
     * @param {boolean} [isLoose] Specify performing partial comparisons.
     * @param {Array} [stackA] Tracks traversed `value` objects.
     * @param {Array} [stackB] Tracks traversed `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
      var objProps = keys(object),
          objLength = objProps.length,
          othProps = keys(other),
          othLength = othProps.length;

      if (objLength != othLength && !isLoose) {
        return false;
      }
      var index = objLength;
      while (index--) {
        var key = objProps[index];
        if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
          return false;
        }
      }
      var skipCtor = isLoose;
      while (++index < objLength) {
        key = objProps[index];
        var objValue = object[key],
            othValue = other[key],
            result = customizer ? customizer(isLoose ? othValue : objValue, isLoose? objValue : othValue, key) : undefined;

        // Recursively compare objects (susceptible to call stack limits).
        if (!(result === undefined ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
          return false;
        }
        skipCtor || (skipCtor = key == 'constructor');
      }
      if (!skipCtor) {
        var objCtor = object.constructor,
            othCtor = other.constructor;

        // Non `Object` object instances with different constructors are not equal.
        if (objCtor != othCtor &&
            ('constructor' in object && 'constructor' in other) &&
            !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
              typeof othCtor == 'function' && othCtor instanceof othCtor)) {
          return false;
        }
      }
      return true;
    }

    /**
     * Gets the appropriate "callback" function. If the `_.callback` method is
     * customized this function returns the custom method, otherwise it returns
     * the `baseCallback` function. If arguments are provided the chosen function
     * is invoked with them and its result is returned.
     *
     * @private
     * @returns {Function} Returns the chosen function or its result.
     */
    function getCallback(func, thisArg, argCount) {
      var result = lodash.callback || callback;
      result = result === callback ? baseCallback : result;
      return argCount ? result(func, thisArg, argCount) : result;
    }

    /**
     * Gets metadata for `func`.
     *
     * @private
     * @param {Function} func The function to query.
     * @returns {*} Returns the metadata for `func`.
     */
    var getData = !metaMap ? noop : function(func) {
      return metaMap.get(func);
    };

    /**
     * Gets the name of `func`.
     *
     * @private
     * @param {Function} func The function to query.
     * @returns {string} Returns the function name.
     */
    function getFuncName(func) {
      var result = func.name,
          array = realNames[result],
          length = array ? array.length : 0;

      while (length--) {
        var data = array[length],
            otherFunc = data.func;
        if (otherFunc == null || otherFunc == func) {
          return data.name;
        }
      }
      return result;
    }

    /**
     * Gets the appropriate "indexOf" function. If the `_.indexOf` method is
     * customized this function returns the custom method, otherwise it returns
     * the `baseIndexOf` function. If arguments are provided the chosen function
     * is invoked with them and its result is returned.
     *
     * @private
     * @returns {Function|number} Returns the chosen function or its result.
     */
    function getIndexOf(collection, target, fromIndex) {
      var result = lodash.indexOf || indexOf;
      result = result === indexOf ? baseIndexOf : result;
      return collection ? result(collection, target, fromIndex) : result;
    }

    /**
     * Gets the "length" property value of `object`.
     *
     * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
     * that affects Safari on at least iOS 8.1-8.3 ARM64.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {*} Returns the "length" value.
     */
    var getLength = baseProperty('length');

    /**
     * Gets the propery names, values, and compare flags of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the match data of `object`.
     */
    function getMatchData(object) {
      var result = pairs(object),
          length = result.length;

      while (length--) {
        result[length][2] = isStrictComparable(result[length][1]);
      }
      return result;
    }

    /**
     * Gets the native function at `key` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the method to get.
     * @returns {*} Returns the function if it's native, else `undefined`.
     */
    function getNative(object, key) {
      var value = object == null ? undefined : object[key];
      return isNative(value) ? value : undefined;
    }

    /**
     * Gets the view, applying any `transforms` to the `start` and `end` positions.
     *
     * @private
     * @param {number} start The start of the view.
     * @param {number} end The end of the view.
     * @param {Array} [transforms] The transformations to apply to the view.
     * @returns {Object} Returns an object containing the `start` and `end`
     *  positions of the view.
     */
    function getView(start, end, transforms) {
      var index = -1,
          length = transforms ? transforms.length : 0;

      while (++index < length) {
        var data = transforms[index],
            size = data.size;

        switch (data.type) {
          case 'drop':      start += size; break;
          case 'dropRight': end -= size; break;
          case 'take':      end = nativeMin(end, start + size); break;
          case 'takeRight': start = nativeMax(start, end - size); break;
        }
      }
      return { 'start': start, 'end': end };
    }

    /**
     * Initializes an array clone.
     *
     * @private
     * @param {Array} array The array to clone.
     * @returns {Array} Returns the initialized clone.
     */
    function initCloneArray(array) {
      var length = array.length,
          result = new array.constructor(length);

      // Add array properties assigned by `RegExp#exec`.
      if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
        result.index = array.index;
        result.input = array.input;
      }
      return result;
    }

    /**
     * Initializes an object clone.
     *
     * @private
     * @param {Object} object The object to clone.
     * @returns {Object} Returns the initialized clone.
     */
    function initCloneObject(object) {
      var Ctor = object.constructor;
      if (!(typeof Ctor == 'function' && Ctor instanceof Ctor)) {
        Ctor = Object;
      }
      return new Ctor;
    }

    /**
     * Initializes an object clone based on its `toStringTag`.
     *
     * **Note:** This function only supports cloning values with tags of
     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
     *
     * @private
     * @param {Object} object The object to clone.
     * @param {string} tag The `toStringTag` of the object to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the initialized clone.
     */
    function initCloneByTag(object, tag, isDeep) {
      var Ctor = object.constructor;
      switch (tag) {
        case arrayBufferTag:
          return bufferClone(object);

        case boolTag:
        case dateTag:
          return new Ctor(+object);

        case float32Tag: case float64Tag:
        case int8Tag: case int16Tag: case int32Tag:
        case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
          var buffer = object.buffer;
          return new Ctor(isDeep ? bufferClone(buffer) : buffer, object.byteOffset, object.length);

        case numberTag:
        case stringTag:
          return new Ctor(object);

        case regexpTag:
          var result = new Ctor(object.source, reFlags.exec(object));
          result.lastIndex = object.lastIndex;
      }
      return result;
    }

    /**
     * Invokes the method at `path` on `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the method to invoke.
     * @param {Array} args The arguments to invoke the method with.
     * @returns {*} Returns the result of the invoked method.
     */
    function invokePath(object, path, args) {
      if (object != null && !isKey(path, object)) {
        path = toPath(path);
        object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
        path = last(path);
      }
      var func = object == null ? object : object[path];
      return func == null ? undefined : func.apply(object, args);
    }

    /**
     * Checks if `value` is array-like.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
     */
    function isArrayLike(value) {
      return value != null && isLength(getLength(value));
    }

    /**
     * Checks if `value` is a valid array-like index.
     *
     * @private
     * @param {*} value The value to check.
     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
     */
    function isIndex(value, length) {
      value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
      length = length == null ? MAX_SAFE_INTEGER : length;
      return value > -1 && value % 1 == 0 && value < length;
    }

    /**
     * Checks if the provided arguments are from an iteratee call.
     *
     * @private
     * @param {*} value The potential iteratee value argument.
     * @param {*} index The potential iteratee index or key argument.
     * @param {*} object The potential iteratee object argument.
     * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
     */
    function isIterateeCall(value, index, object) {
      if (!isObject(object)) {
        return false;
      }
      var type = typeof index;
      if (type == 'number'
          ? (isArrayLike(object) && isIndex(index, object.length))
          : (type == 'string' && index in object)) {
        var other = object[index];
        return value === value ? (value === other) : (other !== other);
      }
      return false;
    }

    /**
     * Checks if `value` is a property name and not a property path.
     *
     * @private
     * @param {*} value The value to check.
     * @param {Object} [object] The object to query keys on.
     * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
     */
    function isKey(value, object) {
      var type = typeof value;
      if ((type == 'string' && reIsPlainProp.test(value)) || type == 'number') {
        return true;
      }
      if (isArray(value)) {
        return false;
      }
      var result = !reIsDeepProp.test(value);
      return result || (object != null && value in toObject(object));
    }

    /**
     * Checks if `func` has a lazy counterpart.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` has a lazy counterpart, else `false`.
     */
    function isLaziable(func) {
      var funcName = getFuncName(func);
      if (!(funcName in LazyWrapper.prototype)) {
        return false;
      }
      var other = lodash[funcName];
      if (func === other) {
        return true;
      }
      var data = getData(other);
      return !!data && func === data[0];
    }

    /**
     * Checks if `value` is a valid array-like length.
     *
     * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
     */
    function isLength(value) {
      return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }

    /**
     * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` if suitable for strict
     *  equality comparisons, else `false`.
     */
    function isStrictComparable(value) {
      return value === value && !isObject(value);
    }

    /**
     * Merges the function metadata of `source` into `data`.
     *
     * Merging metadata reduces the number of wrappers required to invoke a function.
     * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
     * may be applied regardless of execution order. Methods like `_.ary` and `_.rearg`
     * augment function arguments, making the order in which they are executed important,
     * preventing the merging of metadata. However, we make an exception for a safe
     * common case where curried functions have `_.ary` and or `_.rearg` applied.
     *
     * @private
     * @param {Array} data The destination metadata.
     * @param {Array} source The source metadata.
     * @returns {Array} Returns `data`.
     */
    function mergeData(data, source) {
      var bitmask = data[1],
          srcBitmask = source[1],
          newBitmask = bitmask | srcBitmask,
          isCommon = newBitmask < ARY_FLAG;

      var isCombo =
        (srcBitmask == ARY_FLAG && bitmask == CURRY_FLAG) ||
        (srcBitmask == ARY_FLAG && bitmask == REARG_FLAG && data[7].length <= source[8]) ||
        (srcBitmask == (ARY_FLAG | REARG_FLAG) && bitmask == CURRY_FLAG);

      // Exit early if metadata can't be merged.
      if (!(isCommon || isCombo)) {
        return data;
      }
      // Use source `thisArg` if available.
      if (srcBitmask & BIND_FLAG) {
        data[2] = source[2];
        // Set when currying a bound function.
        newBitmask |= (bitmask & BIND_FLAG) ? 0 : CURRY_BOUND_FLAG;
      }
      // Compose partial arguments.
      var value = source[3];
      if (value) {
        var partials = data[3];
        data[3] = partials ? composeArgs(partials, value, source[4]) : arrayCopy(value);
        data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : arrayCopy(source[4]);
      }
      // Compose partial right arguments.
      value = source[5];
      if (value) {
        partials = data[5];
        data[5] = partials ? composeArgsRight(partials, value, source[6]) : arrayCopy(value);
        data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : arrayCopy(source[6]);
      }
      // Use source `argPos` if available.
      value = source[7];
      if (value) {
        data[7] = arrayCopy(value);
      }
      // Use source `ary` if it's smaller.
      if (srcBitmask & ARY_FLAG) {
        data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
      }
      // Use source `arity` if one is not provided.
      if (data[9] == null) {
        data[9] = source[9];
      }
      // Use source `func` and merge bitmasks.
      data[0] = source[0];
      data[1] = newBitmask;

      return data;
    }

    /**
     * A specialized version of `_.pick` which picks `object` properties specified
     * by `props`.
     *
     * @private
     * @param {Object} object The source object.
     * @param {string[]} props The property names to pick.
     * @returns {Object} Returns the new object.
     */
    function pickByArray(object, props) {
      object = toObject(object);

      var index = -1,
          length = props.length,
          result = {};

      while (++index < length) {
        var key = props[index];
        if (key in object) {
          result[key] = object[key];
        }
      }
      return result;
    }

    /**
     * A specialized version of `_.pick` which picks `object` properties `predicate`
     * returns truthy for.
     *
     * @private
     * @param {Object} object The source object.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {Object} Returns the new object.
     */
    function pickByCallback(object, predicate) {
      var result = {};
      baseForIn(object, function(value, key, object) {
        if (predicate(value, key, object)) {
          result[key] = value;
        }
      });
      return result;
    }

    /**
     * Reorder `array` according to the specified indexes where the element at
     * the first index is assigned as the first element, the element at
     * the second index is assigned as the second element, and so on.
     *
     * @private
     * @param {Array} array The array to reorder.
     * @param {Array} indexes The arranged array indexes.
     * @returns {Array} Returns `array`.
     */
    function reorder(array, indexes) {
      var arrLength = array.length,
          length = nativeMin(indexes.length, arrLength),
          oldArray = arrayCopy(array);

      while (length--) {
        var index = indexes[length];
        array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
      }
      return array;
    }

    /**
     * Sets metadata for `func`.
     *
     * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
     * period of time, it will trip its breaker and transition to an identity function
     * to avoid garbage collection pauses in V8. See [V8 issue 2070](https://code.google.com/p/v8/issues/detail?id=2070)
     * for more details.
     *
     * @private
     * @param {Function} func The function to associate metadata with.
     * @param {*} data The metadata.
     * @returns {Function} Returns `func`.
     */
    var setData = (function() {
      var count = 0,
          lastCalled = 0;

      return function(key, value) {
        var stamp = now(),
            remaining = HOT_SPAN - (stamp - lastCalled);

        lastCalled = stamp;
        if (remaining > 0) {
          if (++count >= HOT_COUNT) {
            return key;
          }
        } else {
          count = 0;
        }
        return baseSetData(key, value);
      };
    }());

    /**
     * A fallback implementation of `_.isPlainObject` which checks if `value`
     * is an object created by the `Object` constructor or has a `[[Prototype]]`
     * of `null`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
     */
    function shimIsPlainObject(value) {
      var Ctor,
          support = lodash.support;

      // Exit early for non `Object` objects.
      if (!(isObjectLike(value) && objToString.call(value) == objectTag) ||
          (!hasOwnProperty.call(value, 'constructor') &&
            (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor)))) {
        return false;
      }
      // IE < 9 iterates inherited properties before own properties. If the first
      // iterated property is an object's own property then there are no inherited
      // enumerable properties.
      var result;
      // In most environments an object's own properties are iterated before
      // its inherited properties. If the last iterated property is an object's
      // own property then there are no inherited enumerable properties.
      baseForIn(value, function(subValue, key) {
        result = key;
      });
      return result === undefined || hasOwnProperty.call(value, result);
    }

    /**
     * A fallback implementation of `Object.keys` which creates an array of the
     * own enumerable property names of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function shimKeys(object) {
      var props = keysIn(object),
          propsLength = props.length,
          length = propsLength && object.length;

      var allowIndexes = !!length && isLength(length) &&
        (isArray(object) || isArguments(object));

      var index = -1,
          result = [];

      while (++index < propsLength) {
        var key = props[index];
        if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * Converts `value` to an array-like object if it's not one.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {Array|Object} Returns the array-like object.
     */
    function toIterable(value) {
      if (value == null) {
        return [];
      }
      if (!isArrayLike(value)) {
        return values(value);
      }
      return isObject(value) ? value : Object(value);
    }

    /**
     * Converts `value` to an object if it's not one.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {Object} Returns the object.
     */
    function toObject(value) {
      return isObject(value) ? value : Object(value);
    }

    /**
     * Converts `value` to property path array if it's not one.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {Array} Returns the property path array.
     */
    function toPath(value) {
      if (isArray(value)) {
        return value;
      }
      var result = [];
      baseToString(value).replace(rePropName, function(match, number, quote, string) {
        result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
      });
      return result;
    }

    /**
     * Creates a clone of `wrapper`.
     *
     * @private
     * @param {Object} wrapper The wrapper to clone.
     * @returns {Object} Returns the cloned wrapper.
     */
    function wrapperClone(wrapper) {
      return wrapper instanceof LazyWrapper
        ? wrapper.clone()
        : new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__, arrayCopy(wrapper.__actions__));
    }

    /*------------------------------------------------------------------------*/

    /**
     * Creates an array of elements split into groups the length of `size`.
     * If `collection` can't be split evenly, the final chunk will be the remaining
     * elements.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to process.
     * @param {number} [size=1] The length of each chunk.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Array} Returns the new array containing chunks.
     * @example
     *
     * _.chunk(['a', 'b', 'c', 'd'], 2);
     * // => [['a', 'b'], ['c', 'd']]
     *
     * _.chunk(['a', 'b', 'c', 'd'], 3);
     * // => [['a', 'b', 'c'], ['d']]
     */
    function chunk(array, size, guard) {
      if (guard ? isIterateeCall(array, size, guard) : size == null) {
        size = 1;
      } else {
        size = nativeMax(+size || 1, 1);
      }
      var index = 0,
          length = array ? array.length : 0,
          resIndex = -1,
          result = Array(ceil(length / size));

      while (index < length) {
        result[++resIndex] = baseSlice(array, index, (index += size));
      }
      return result;
    }

    /**
     * Creates an array with all falsey values removed. The values `false`, `null`,
     * `0`, `""`, `undefined`, and `NaN` are falsey.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to compact.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.compact([0, 1, false, 2, '', 3]);
     * // => [1, 2, 3]
     */
    function compact(array) {
      var index = -1,
          length = array ? array.length : 0,
          resIndex = -1,
          result = [];

      while (++index < length) {
        var value = array[index];
        if (value) {
          result[++resIndex] = value;
        }
      }
      return result;
    }

    /**
     * Creates an array of unique `array` values not included in the other
     * provided arrays using [`SameValueZero`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
     * for equality comparisons.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...Array} [values] The arrays of values to exclude.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.difference([1, 2, 3], [4, 2]);
     * // => [1, 3]
     */
    var difference = restParam(function(array, values) {
      return isArrayLike(array)
        ? baseDifference(array, baseFlatten(values, false, true))
        : [];
    });

    /**
     * Creates a slice of `array` with `n` elements dropped from the beginning.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to drop.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.drop([1, 2, 3]);
     * // => [2, 3]
     *
     * _.drop([1, 2, 3], 2);
     * // => [3]
     *
     * _.drop([1, 2, 3], 5);
     * // => []
     *
     * _.drop([1, 2, 3], 0);
     * // => [1, 2, 3]
     */
    function drop(array, n, guard) {
      var length = array ? array.length : 0;
      if (!length) {
        return [];
      }
      if (guard ? isIterateeCall(array, n, guard) : n == null) {
        n = 1;
      }
      return baseSlice(array, n < 0 ? 0 : n);
    }

    /**
     * Creates a slice of `array` with `n` elements dropped from the end.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to drop.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.dropRight([1, 2, 3]);
     * // => [1, 2]
     *
     * _.dropRight([1, 2, 3], 2);
     * // => [1]
     *
     * _.dropRight([1, 2, 3], 5);
     * // => []
     *
     * _.dropRight([1, 2, 3], 0);
     * // => [1, 2, 3]
     */
    function dropRight(array, n, guard) {
      var length = array ? array.length : 0;
      if (!length) {
        return [];
      }
      if (guard ? isIterateeCall(array, n, guard) : n == null) {
        n = 1;
      }
      n = length - (+n || 0);
      return baseSlice(array, 0, n < 0 ? 0 : n);
    }

    /**
     * Creates a slice of `array` excluding elements dropped from the end.
     * Elements are dropped until `predicate` returns falsey. The predicate is
     * bound to `thisArg` and invoked with three arguments: (value, index, array).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that match the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.dropRightWhile([1, 2, 3], function(n) {
     *   return n > 1;
     * });
     * // => [1]
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.pluck(_.dropRightWhile(users, { 'user': 'pebbles', 'active': false }), 'user');
     * // => ['barney', 'fred']
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.pluck(_.dropRightWhile(users, 'active', false), 'user');
     * // => ['barney']
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.dropRightWhile(users, 'active'), 'user');
     * // => ['barney', 'fred', 'pebbles']
     */
    function dropRightWhile(array, predicate, thisArg) {
      return (array && array.length)
        ? baseWhile(array, getCallback(predicate, thisArg, 3), true, true)
        : [];
    }

    /**
     * Creates a slice of `array` excluding elements dropped from the beginning.
     * Elements are dropped until `predicate` returns falsey. The predicate is
     * bound to `thisArg` and invoked with three arguments: (value, index, array).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.dropWhile([1, 2, 3], function(n) {
     *   return n < 3;
     * });
     * // => [3]
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.pluck(_.dropWhile(users, { 'user': 'barney', 'active': false }), 'user');
     * // => ['fred', 'pebbles']
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.pluck(_.dropWhile(users, 'active', false), 'user');
     * // => ['pebbles']
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.dropWhile(users, 'active'), 'user');
     * // => ['barney', 'fred', 'pebbles']
     */
    function dropWhile(array, predicate, thisArg) {
      return (array && array.length)
        ? baseWhile(array, getCallback(predicate, thisArg, 3), true)
        : [];
    }

    /**
     * Fills elements of `array` with `value` from `start` up to, but not
     * including, `end`.
     *
     * **Note:** This method mutates `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to fill.
     * @param {*} value The value to fill `array` with.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [1, 2, 3];
     *
     * _.fill(array, 'a');
     * console.log(array);
     * // => ['a', 'a', 'a']
     *
     * _.fill(Array(3), 2);
     * // => [2, 2, 2]
     *
     * _.fill([4, 6, 8], '*', 1, 2);
     * // => [4, '*', 8]
     */
    function fill(array, value, start, end) {
      var length = array ? array.length : 0;
      if (!length) {
        return [];
      }
      if (start && typeof start != 'number' && isIterateeCall(array, value, start)) {
        start = 0;
        end = length;
      }
      return baseFill(array, value, start, end);
    }

    /**
     * This method is like `_.find` except that it returns the index of the first
     * element `predicate` returns truthy for instead of the element itself.
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to search.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {number} Returns the index of the found element, else `-1`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * _.findIndex(users, function(chr) {
     *   return chr.user == 'barney';
     * });
     * // => 0
     *
     * // using the `_.matches` callback shorthand
     * _.findIndex(users, { 'user': 'fred', 'active': false });
     * // => 1
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.findIndex(users, 'active', false);
     * // => 0
     *
     * // using the `_.property` callback shorthand
     * _.findIndex(users, 'active');
     * // => 2
     */
    var findIndex = createFindIndex();

    /**
     * This method is like `_.findIndex` except that it iterates over elements
     * of `collection` from right to left.
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to search.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {number} Returns the index of the found element, else `-1`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * _.findLastIndex(users, function(chr) {
     *   return chr.user == 'pebbles';
     * });
     * // => 2
     *
     * // using the `_.matches` callback shorthand
     * _.findLastIndex(users, { 'user': 'barney', 'active': true });
     * // => 0
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.findLastIndex(users, 'active', false);
     * // => 2
     *
     * // using the `_.property` callback shorthand
     * _.findLastIndex(users, 'active');
     * // => 0
     */
    var findLastIndex = createFindIndex(true);

    /**
     * Gets the first element of `array`.
     *
     * @static
     * @memberOf _
     * @alias head
     * @category Array
     * @param {Array} array The array to query.
     * @returns {*} Returns the first element of `array`.
     * @example
     *
     * _.first([1, 2, 3]);
     * // => 1
     *
     * _.first([]);
     * // => undefined
     */
    function first(array) {
      return array ? array[0] : undefined;
    }

    /**
     * Flattens a nested array. If `isDeep` is `true` the array is recursively
     * flattened, otherwise it is only flattened a single level.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to flatten.
     * @param {boolean} [isDeep] Specify a deep flatten.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * _.flatten([1, [2, 3, [4]]]);
     * // => [1, 2, 3, [4]]
     *
     * // using `isDeep`
     * _.flatten([1, [2, 3, [4]]], true);
     * // => [1, 2, 3, 4]
     */
    function flatten(array, isDeep, guard) {
      var length = array ? array.length : 0;
      if (guard && isIterateeCall(array, isDeep, guard)) {
        isDeep = false;
      }
      return length ? baseFlatten(array, isDeep) : [];
    }

    /**
     * Recursively flattens a nested array.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to recursively flatten.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * _.flattenDeep([1, [2, 3, [4]]]);
     * // => [1, 2, 3, 4]
     */
    function flattenDeep(array) {
      var length = array ? array.length : 0;
      return length ? baseFlatten(array, true) : [];
    }

    /**
     * Gets the index at which the first occurrence of `value` is found in `array`
     * using [`SameValueZero`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
     * for equality comparisons. If `fromIndex` is negative, it is used as the offset
     * from the end of `array`. If `array` is sorted providing `true` for `fromIndex`
     * performs a faster binary search.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to search.
     * @param {*} value The value to search for.
     * @param {boolean|number} [fromIndex=0] The index to search from or `true`
     *  to perform a binary search on a sorted array.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.indexOf([1, 2, 1, 2], 2);
     * // => 1
     *
     * // using `fromIndex`
     * _.indexOf([1, 2, 1, 2], 2, 2);
     * // => 3
     *
     * // performing a binary search
     * _.indexOf([1, 1, 2, 2], 2, true);
     * // => 2
     */
    function indexOf(array, value, fromIndex) {
      var length = array ? array.length : 0;
      if (!length) {
        return -1;
      }
      if (typeof fromIndex == 'number') {
        fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : fromIndex;
      } else if (fromIndex) {
        var index = binaryIndex(array, value),
            other = array[index];

        if (value === value ? (value === other) : (other !== other)) {
          return index;
        }
        return -1;
      }
      return baseIndexOf(array, value, fromIndex || 0);
    }

    /**
     * Gets all but the last element of `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.initial([1, 2, 3]);
     * // => [1, 2]
     */
    function initial(array) {
      return dropRight(array, 1);
    }

    /**
     * Creates an array of unique values that are included in all of the provided
     * arrays using [`SameValueZero`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
     * for equality comparisons.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of shared values.
     * @example
     * _.intersection([1, 2], [4, 2], [2, 1]);
     * // => [2]
     */
    var intersection = restParam(function(arrays) {
      var othLength = arrays.length,
          othIndex = othLength,
          caches = Array(length),
          indexOf = getIndexOf(),
          isCommon = indexOf == baseIndexOf,
          result = [];

      while (othIndex--) {
        var value = arrays[othIndex] = isArrayLike(value = arrays[othIndex]) ? value : [];
        caches[othIndex] = (isCommon && value.length >= 120) ? createCache(othIndex && value) : null;
      }
      var array = arrays[0],
          index = -1,
          length = array ? array.length : 0,
          seen = caches[0];

      outer:
      while (++index < length) {
        value = array[index];
        if ((seen ? cacheIndexOf(seen, value) : indexOf(result, value, 0)) < 0) {
          var othIndex = othLength;
          while (--othIndex) {
            var cache = caches[othIndex];
            if ((cache ? cacheIndexOf(cache, value) : indexOf(arrays[othIndex], value, 0)) < 0) {
              continue outer;
            }
          }
          if (seen) {
            seen.push(value);
          }
          result.push(value);
        }
      }
      return result;
    });

    /**
     * Gets the last element of `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @returns {*} Returns the last element of `array`.
     * @example
     *
     * _.last([1, 2, 3]);
     * // => 3
     */
    function last(array) {
      var length = array ? array.length : 0;
      return length ? array[length - 1] : undefined;
    }

    /**
     * This method is like `_.indexOf` except that it iterates over elements of
     * `array` from right to left.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to search.
     * @param {*} value The value to search for.
     * @param {boolean|number} [fromIndex=array.length-1] The index to search from
     *  or `true` to perform a binary search on a sorted array.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.lastIndexOf([1, 2, 1, 2], 2);
     * // => 3
     *
     * // using `fromIndex`
     * _.lastIndexOf([1, 2, 1, 2], 2, 2);
     * // => 1
     *
     * // performing a binary search
     * _.lastIndexOf([1, 1, 2, 2], 2, true);
     * // => 3
     */
    function lastIndexOf(array, value, fromIndex) {
      var length = array ? array.length : 0;
      if (!length) {
        return -1;
      }
      var index = length;
      if (typeof fromIndex == 'number') {
        index = (fromIndex < 0 ? nativeMax(length + fromIndex, 0) : nativeMin(fromIndex || 0, length - 1)) + 1;
      } else if (fromIndex) {
        index = binaryIndex(array, value, true) - 1;
        var other = array[index];
        if (value === value ? (value === other) : (other !== other)) {
          return index;
        }
        return -1;
      }
      if (value !== value) {
        return indexOfNaN(array, index, true);
      }
      while (index--) {
        if (array[index] === value) {
          return index;
        }
      }
      return -1;
    }

    /**
     * Removes all provided values from `array` using
     * [`SameValueZero`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
     * for equality comparisons.
     *
     * **Note:** Unlike `_.without`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to modify.
     * @param {...*} [values] The values to remove.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [1, 2, 3, 1, 2, 3];
     *
     * _.pull(array, 2, 3);
     * console.log(array);
     * // => [1, 1]
     */
    function pull() {
      var args = arguments,
          array = args[0];

      if (!(array && array.length)) {
        return array;
      }
      var index = 0,
          indexOf = getIndexOf(),
          length = args.length;

      while (++index < length) {
        var fromIndex = 0,
            value = args[index];

        while ((fromIndex = indexOf(array, value, fromIndex)) > -1) {
          splice.call(array, fromIndex, 1);
        }
      }
      return array;
    }

    /**
     * Removes elements from `array` corresponding to the given indexes and returns
     * an array of the removed elements. Indexes may be specified as an array of
     * indexes or as individual arguments.
     *
     * **Note:** Unlike `_.at`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to modify.
     * @param {...(number|number[])} [indexes] The indexes of elements to remove,
     *  specified as individual indexes or arrays of indexes.
     * @returns {Array} Returns the new array of removed elements.
     * @example
     *
     * var array = [5, 10, 15, 20];
     * var evens = _.pullAt(array, 1, 3);
     *
     * console.log(array);
     * // => [5, 15]
     *
     * console.log(evens);
     * // => [10, 20]
     */
    var pullAt = restParam(function(array, indexes) {
      indexes = baseFlatten(indexes);

      var result = baseAt(array, indexes);
      basePullAt(array, indexes.sort(baseCompareAscending));
      return result;
    });

    /**
     * Removes all elements from `array` that `predicate` returns truthy for
     * and returns an array of the removed elements. The predicate is bound to
     * `thisArg` and invoked with three arguments: (value, index, array).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * **Note:** Unlike `_.filter`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the new array of removed elements.
     * @example
     *
     * var array = [1, 2, 3, 4];
     * var evens = _.remove(array, function(n) {
     *   return n % 2 == 0;
     * });
     *
     * console.log(array);
     * // => [1, 3]
     *
     * console.log(evens);
     * // => [2, 4]
     */
    function remove(array, predicate, thisArg) {
      var result = [];
      if (!(array && array.length)) {
        return result;
      }
      var index = -1,
          indexes = [],
          length = array.length;

      predicate = getCallback(predicate, thisArg, 3);
      while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
          result.push(value);
          indexes.push(index);
        }
      }
      basePullAt(array, indexes);
      return result;
    }

    /**
     * Gets all but the first element of `array`.
     *
     * @static
     * @memberOf _
     * @alias tail
     * @category Array
     * @param {Array} array The array to query.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.rest([1, 2, 3]);
     * // => [2, 3]
     */
    function rest(array) {
      return drop(array, 1);
    }

    /**
     * Creates a slice of `array` from `start` up to, but not including, `end`.
     *
     * **Note:** This method is used instead of `Array#slice` to support node
     * lists in IE < 9 and to ensure dense arrays are returned.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the slice of `array`.
     */
    function slice(array, start, end) {
      var length = array ? array.length : 0;
      if (!length) {
        return [];
      }
      if (end && typeof end != 'number' && isIterateeCall(array, start, end)) {
        start = 0;
        end = length;
      }
      return baseSlice(array, start, end);
    }

    /**
     * Uses a binary search to determine the lowest index at which `value` should
     * be inserted into `array` in order to maintain its sort order. If an iteratee
     * function is provided it is invoked for `value` and each element of `array`
     * to compute their sort ranking. The iteratee is bound to `thisArg` and
     * invoked with one argument; (value).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * _.sortedIndex([30, 50], 40);
     * // => 1
     *
     * _.sortedIndex([4, 4, 5, 5], 5);
     * // => 2
     *
     * var dict = { 'data': { 'thirty': 30, 'forty': 40, 'fifty': 50 } };
     *
     * // using an iteratee function
     * _.sortedIndex(['thirty', 'fifty'], 'forty', function(word) {
     *   return this.data[word];
     * }, dict);
     * // => 1
     *
     * // using the `_.property` callback shorthand
     * _.sortedIndex([{ 'x': 30 }, { 'x': 50 }], { 'x': 40 }, 'x');
     * // => 1
     */
    var sortedIndex = createSortedIndex();

    /**
     * This method is like `_.sortedIndex` except that it returns the highest
     * index at which `value` should be inserted into `array` in order to
     * maintain its sort order.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * _.sortedLastIndex([4, 4, 5, 5], 5);
     * // => 4
     */
    var sortedLastIndex = createSortedIndex(true);

    /**
     * Creates a slice of `array` with `n` elements taken from the beginning.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to take.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.take([1, 2, 3]);
     * // => [1]
     *
     * _.take([1, 2, 3], 2);
     * // => [1, 2]
     *
     * _.take([1, 2, 3], 5);
     * // => [1, 2, 3]
     *
     * _.take([1, 2, 3], 0);
     * // => []
     */
    function take(array, n, guard) {
      var length = array ? array.length : 0;
      if (!length) {
        return [];
      }
      if (guard ? isIterateeCall(array, n, guard) : n == null) {
        n = 1;
      }
      return baseSlice(array, 0, n < 0 ? 0 : n);
    }

    /**
     * Creates a slice of `array` with `n` elements taken from the end.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to take.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.takeRight([1, 2, 3]);
     * // => [3]
     *
     * _.takeRight([1, 2, 3], 2);
     * // => [2, 3]
     *
     * _.takeRight([1, 2, 3], 5);
     * // => [1, 2, 3]
     *
     * _.takeRight([1, 2, 3], 0);
     * // => []
     */
    function takeRight(array, n, guard) {
      var length = array ? array.length : 0;
      if (!length) {
        return [];
      }
      if (guard ? isIterateeCall(array, n, guard) : n == null) {
        n = 1;
      }
      n = length - (+n || 0);
      return baseSlice(array, n < 0 ? 0 : n);
    }

    /**
     * Creates a slice of `array` with elements taken from the end. Elements are
     * taken until `predicate` returns falsey. The predicate is bound to `thisArg`
     * and invoked with three arguments: (value, index, array).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.takeRightWhile([1, 2, 3], function(n) {
     *   return n > 1;
     * });
     * // => [2, 3]
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.pluck(_.takeRightWhile(users, { 'user': 'pebbles', 'active': false }), 'user');
     * // => ['pebbles']
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.pluck(_.takeRightWhile(users, 'active', false), 'user');
     * // => ['fred', 'pebbles']
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.takeRightWhile(users, 'active'), 'user');
     * // => []
     */
    function takeRightWhile(array, predicate, thisArg) {
      return (array && array.length)
        ? baseWhile(array, getCallback(predicate, thisArg, 3), false, true)
        : [];
    }

    /**
     * Creates a slice of `array` with elements taken from the beginning. Elements
     * are taken until `predicate` returns falsey. The predicate is bound to
     * `thisArg` and invoked with three arguments: (value, index, array).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.takeWhile([1, 2, 3], function(n) {
     *   return n < 3;
     * });
     * // => [1, 2]
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false},
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.pluck(_.takeWhile(users, { 'user': 'barney', 'active': false }), 'user');
     * // => ['barney']
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.pluck(_.takeWhile(users, 'active', false), 'user');
     * // => ['barney', 'fred']
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.takeWhile(users, 'active'), 'user');
     * // => []
     */
    function takeWhile(array, predicate, thisArg) {
      return (array && array.length)
        ? baseWhile(array, getCallback(predicate, thisArg, 3))
        : [];
    }

    /**
     * Creates an array of unique values, in order, from all of the provided arrays
     * using [`SameValueZero`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
     * for equality comparisons.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of combined values.
     * @example
     *
     * _.union([1, 2], [4, 2], [2, 1]);
     * // => [1, 2, 4]
     */
    var union = restParam(function(arrays) {
      return baseUniq(baseFlatten(arrays, false, true));
    });

    /**
     * Creates a duplicate-free version of an array, using
     * [`SameValueZero`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
     * for equality comparisons, in which only the first occurence of each element
     * is kept. Providing `true` for `isSorted` performs a faster search algorithm
     * for sorted arrays. If an iteratee function is provided it is invoked for
     * each element in the array to generate the criterion by which uniqueness
     * is computed. The `iteratee` is bound to `thisArg` and invoked with three
     * arguments: (value, index, array).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @alias unique
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {boolean} [isSorted] Specify the array is sorted.
     * @param {Function|Object|string} [iteratee] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array} Returns the new duplicate-value-free array.
     * @example
     *
     * _.uniq([2, 1, 2]);
     * // => [2, 1]
     *
     * // using `isSorted`
     * _.uniq([1, 1, 2], true);
     * // => [1, 2]
     *
     * // using an iteratee function
     * _.uniq([1, 2.5, 1.5, 2], function(n) {
     *   return this.floor(n);
     * }, Math);
     * // => [1, 2.5]
     *
     * // using the `_.property` callback shorthand
     * _.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }, { 'x': 2 }]
     */
    function uniq(array, isSorted, iteratee, thisArg) {
      var length = array ? array.length : 0;
      if (!length) {
        return [];
      }
      if (isSorted != null && typeof isSorted != 'boolean') {
        thisArg = iteratee;
        iteratee = isIterateeCall(array, isSorted, thisArg) ? null : isSorted;
        isSorted = false;
      }
      var callback = getCallback();
      if (!(iteratee == null && callback === baseCallback)) {
        iteratee = callback(iteratee, thisArg, 3);
      }
      return (isSorted && getIndexOf() == baseIndexOf)
        ? sortedUniq(array, iteratee)
        : baseUniq(array, iteratee);
    }

    /**
     * This method is like `_.zip` except that it accepts an array of grouped
     * elements and creates an array regrouping the elements to their pre-zip
     * configuration.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array of grouped elements to process.
     * @returns {Array} Returns the new array of regrouped elements.
     * @example
     *
     * var zipped = _.zip(['fred', 'barney'], [30, 40], [true, false]);
     * // => [['fred', 30, true], ['barney', 40, false]]
     *
     * _.unzip(zipped);
     * // => [['fred', 'barney'], [30, 40], [true, false]]
     */
    function unzip(array) {
      if (!(array && array.length)) {
        return [];
      }
      var index = -1,
          length = 0;

      array = arrayFilter(array, function(group) {
        if (isArrayLike(group)) {
          length = nativeMax(group.length, length);
          return true;
        }
      });
      var result = Array(length);
      while (++index < length) {
        result[index] = arrayMap(array, baseProperty(index));
      }
      return result;
    }

    /**
     * This method is like `_.unzip` except that it accepts an iteratee to specify
     * how regrouped values should be combined. The `iteratee` is bound to `thisArg`
     * and invoked with four arguments: (accumulator, value, index, group).
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array of grouped elements to process.
     * @param {Function} [iteratee] The function to combine regrouped values.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array} Returns the new array of regrouped elements.
     * @example
     *
     * var zipped = _.zip([1, 2], [10, 20], [100, 200]);
     * // => [[1, 10, 100], [2, 20, 200]]
     *
     * _.unzipWith(zipped, _.add);
     * // => [3, 30, 300]
     */
    function unzipWith(array, iteratee, thisArg) {
      var length = array ? array.length : 0;
      if (!length) {
        return [];
      }
      var result = unzip(array);
      if (iteratee == null) {
        return result;
      }
      iteratee = bindCallback(iteratee, thisArg, 4);
      return arrayMap(result, function(group) {
        return arrayReduce(group, iteratee, undefined, true);
      });
    }

    /**
     * Creates an array excluding all provided values using
     * [`SameValueZero`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
     * for equality comparisons.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to filter.
     * @param {...*} [values] The values to exclude.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.without([1, 2, 1, 3], 1, 2);
     * // => [3]
     */
    var without = restParam(function(array, values) {
      return isArrayLike(array)
        ? baseDifference(array, values)
        : [];
    });

    /**
     * Creates an array of unique values that is the [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
     * of the provided arrays.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of values.
     * @example
     *
     * _.xor([1, 2], [4, 2]);
     * // => [1, 4]
     */
    function xor() {
      var index = -1,
          length = arguments.length;

      while (++index < length) {
        var array = arguments[index];
        if (isArrayLike(array)) {
          var result = result
            ? baseDifference(result, array).concat(baseDifference(array, result))
            : array;
        }
      }
      return result ? baseUniq(result) : [];
    }

    /**
     * Creates an array of grouped elements, the first of which contains the first
     * elements of the given arrays, the second of which contains the second elements
     * of the given arrays, and so on.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {...Array} [arrays] The arrays to process.
     * @returns {Array} Returns the new array of grouped elements.
     * @example
     *
     * _.zip(['fred', 'barney'], [30, 40], [true, false]);
     * // => [['fred', 30, true], ['barney', 40, false]]
     */
    var zip = restParam(unzip);

    /**
     * The inverse of `_.pairs`; this method returns an object composed from arrays
     * of property names and values. Provide either a single two dimensional array,
     * e.g. `[[key1, value1], [key2, value2]]` or two arrays, one of property names
     * and one of corresponding values.
     *
     * @static
     * @memberOf _
     * @alias object
     * @category Array
     * @param {Array} props The property names.
     * @param {Array} [values=[]] The property values.
     * @returns {Object} Returns the new object.
     * @example
     *
     * _.zipObject([['fred', 30], ['barney', 40]]);
     * // => { 'fred': 30, 'barney': 40 }
     *
     * _.zipObject(['fred', 'barney'], [30, 40]);
     * // => { 'fred': 30, 'barney': 40 }
     */
    function zipObject(props, values) {
      var index = -1,
          length = props ? props.length : 0,
          result = {};

      if (length && !values && !isArray(props[0])) {
        values = [];
      }
      while (++index < length) {
        var key = props[index];
        if (values) {
          result[key] = values[index];
        } else if (key) {
          result[key[0]] = key[1];
        }
      }
      return result;
    }

    /**
     * This method is like `_.zip` except that it accepts an iteratee to specify
     * how grouped values should be combined. The `iteratee` is bound to `thisArg`
     * and invoked with four arguments: (accumulator, value, index, group).
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {...Array} [arrays] The arrays to process.
     * @param {Function} [iteratee] The function to combine grouped values.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array} Returns the new array of grouped elements.
     * @example
     *
     * _.zipWith([1, 2], [10, 20], [100, 200], _.add);
     * // => [111, 222]
     */
    var zipWith = restParam(function(arrays) {
      var length = arrays.length,
          iteratee = length > 2 ? arrays[length - 2] : undefined,
          thisArg = length > 1 ? arrays[length - 1] : undefined;

      if (length > 2 && typeof iteratee == 'function') {
        length -= 2;
      } else {
        iteratee = (length > 1 && typeof thisArg == 'function') ? (--length, thisArg) : undefined;
        thisArg = undefined;
      }
      arrays.length = length;
      return unzipWith(arrays, iteratee, thisArg);
    });

    /*------------------------------------------------------------------------*/

    /**
     * Creates a `lodash` object that wraps `value` with explicit method
     * chaining enabled.
     *
     * @static
     * @memberOf _
     * @category Chain
     * @param {*} value The value to wrap.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36 },
     *   { 'user': 'fred',    'age': 40 },
     *   { 'user': 'pebbles', 'age': 1 }
     * ];
     *
     * var youngest = _.chain(users)
     *   .sortBy('age')
     *   .map(function(chr) {
     *     return chr.user + ' is ' + chr.age;
     *   })
     *   .first()
     *   .value();
     * // => 'pebbles is 1'
     */
    function chain(value) {
      var result = lodash(value);
      result.__chain__ = true;
      return result;
    }

    /**
     * This method invokes `interceptor` and returns `value`. The interceptor is
     * bound to `thisArg` and invoked with one argument; (value). The purpose of
     * this method is to "tap into" a method chain in order to perform operations
     * on intermediate results within the chain.
     *
     * @static
     * @memberOf _
     * @category Chain
     * @param {*} value The value to provide to `interceptor`.
     * @param {Function} interceptor The function to invoke.
     * @param {*} [thisArg] The `this` binding of `interceptor`.
     * @returns {*} Returns `value`.
     * @example
     *
     * _([1, 2, 3])
     *  .tap(function(array) {
     *    array.pop();
     *  })
     *  .reverse()
     *  .value();
     * // => [2, 1]
     */
    function tap(value, interceptor, thisArg) {
      interceptor.call(thisArg, value);
      return value;
    }

    /**
     * This method is like `_.tap` except that it returns the result of `interceptor`.
     *
     * @static
     * @memberOf _
     * @category Chain
     * @param {*} value The value to provide to `interceptor`.
     * @param {Function} interceptor The function to invoke.
     * @param {*} [thisArg] The `this` binding of `interceptor`.
     * @returns {*} Returns the result of `interceptor`.
     * @example
     *
     * _('  abc  ')
     *  .chain()
     *  .trim()
     *  .thru(function(value) {
     *    return [value];
     *  })
     *  .value();
     * // => ['abc']
     */
    function thru(value, interceptor, thisArg) {
      return interceptor.call(thisArg, value);
    }

    /**
     * Enables explicit method chaining on the wrapper object.
     *
     * @name chain
     * @memberOf _
     * @category Chain
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 }
     * ];
     *
     * // without explicit chaining
     * _(users).first();
     * // => { 'user': 'barney', 'age': 36 }
     *
     * // with explicit chaining
     * _(users).chain()
     *   .first()
     *   .pick('user')
     *   .value();
     * // => { 'user': 'barney' }
     */
    function wrapperChain() {
      return chain(this);
    }

    /**
     * Executes the chained sequence and returns the wrapped result.
     *
     * @name commit
     * @memberOf _
     * @category Chain
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var array = [1, 2];
     * var wrapper = _(array).push(3);
     *
     * console.log(array);
     * // => [1, 2]
     *
     * wrapper = wrapper.commit();
     * console.log(array);
     * // => [1, 2, 3]
     *
     * wrapper.last();
     * // => 3
     *
     * console.log(array);
     * // => [1, 2, 3]
     */
    function wrapperCommit() {
      return new LodashWrapper(this.value(), this.__chain__);
    }

    /**
     * Creates a clone of the chained sequence planting `value` as the wrapped value.
     *
     * @name plant
     * @memberOf _
     * @category Chain
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var array = [1, 2];
     * var wrapper = _(array).map(function(value) {
     *   return Math.pow(value, 2);
     * });
     *
     * var other = [3, 4];
     * var otherWrapper = wrapper.plant(other);
     *
     * otherWrapper.value();
     * // => [9, 16]
     *
     * wrapper.value();
     * // => [1, 4]
     */
    function wrapperPlant(value) {
      var result,
          parent = this;

      while (parent instanceof baseLodash) {
        var clone = wrapperClone(parent);
        if (result) {
          previous.__wrapped__ = clone;
        } else {
          result = clone;
        }
        var previous = clone;
        parent = parent.__wrapped__;
      }
      previous.__wrapped__ = value;
      return result;
    }

    /**
     * Reverses the wrapped array so the first element becomes the last, the
     * second element becomes the second to last, and so on.
     *
     * **Note:** This method mutates the wrapped array.
     *
     * @name reverse
     * @memberOf _
     * @category Chain
     * @returns {Object} Returns the new reversed `lodash` wrapper instance.
     * @example
     *
     * var array = [1, 2, 3];
     *
     * _(array).reverse().value()
     * // => [3, 2, 1]
     *
     * console.log(array);
     * // => [3, 2, 1]
     */
    function wrapperReverse() {
      var value = this.__wrapped__;
      if (value instanceof LazyWrapper) {
        if (this.__actions__.length) {
          value = new LazyWrapper(this);
        }
        return new LodashWrapper(value.reverse(), this.__chain__);
      }
      return this.thru(function(value) {
        return value.reverse();
      });
    }

    /**
     * Produces the result of coercing the unwrapped value to a string.
     *
     * @name toString
     * @memberOf _
     * @category Chain
     * @returns {string} Returns the coerced string value.
     * @example
     *
     * _([1, 2, 3]).toString();
     * // => '1,2,3'
     */
    function wrapperToString() {
      return (this.value() + '');
    }

    /**
     * Executes the chained sequence to extract the unwrapped value.
     *
     * @name value
     * @memberOf _
     * @alias run, toJSON, valueOf
     * @category Chain
     * @returns {*} Returns the resolved unwrapped value.
     * @example
     *
     * _([1, 2, 3]).value();
     * // => [1, 2, 3]
     */
    function wrapperValue() {
      return baseWrapperValue(this.__wrapped__, this.__actions__);
    }

    /*------------------------------------------------------------------------*/

    /**
     * Creates an array of elements corresponding to the given keys, or indexes,
     * of `collection`. Keys may be specified as individual arguments or as arrays
     * of keys.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {...(number|number[]|string|string[])} [props] The property names
     *  or indexes of elements to pick, specified individually or in arrays.
     * @returns {Array} Returns the new array of picked elements.
     * @example
     *
     * _.at(['a', 'b', 'c'], [0, 2]);
     * // => ['a', 'c']
     *
     * _.at(['barney', 'fred', 'pebbles'], 0, 2);
     * // => ['barney', 'pebbles']
     */
    var at = restParam(function(collection, props) {
      return baseAt(collection, baseFlatten(props));
    });

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` through `iteratee`. The corresponding value
     * of each key is the number of times the key was returned by `iteratee`.
     * The `iteratee` is bound to `thisArg` and invoked with three arguments:
     * (value, index|key, collection).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * _.countBy([4.3, 6.1, 6.4], function(n) {
     *   return Math.floor(n);
     * });
     * // => { '4': 1, '6': 2 }
     *
     * _.countBy([4.3, 6.1, 6.4], function(n) {
     *   return this.floor(n);
     * }, Math);
     * // => { '4': 1, '6': 2 }
     *
     * _.countBy(['one', 'two', 'three'], 'length');
     * // => { '3': 2, '5': 1 }
     */
    var countBy = createAggregator(function(result, value, key) {
      hasOwnProperty.call(result, key) ? ++result[key] : (result[key] = 1);
    });

    /**
     * Checks if `predicate` returns truthy for **all** elements of `collection`.
     * The predicate is bound to `thisArg` and invoked with three arguments:
     * (value, index|key, collection).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @alias all
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {boolean} Returns `true` if all elements pass the predicate check,
     *  else `false`.
     * @example
     *
     * _.every([true, 1, null, 'yes'], Boolean);
     * // => false
     *
     * var users = [
     *   { 'user': 'barney', 'active': false },
     *   { 'user': 'fred',   'active': false }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.every(users, { 'user': 'barney', 'active': false });
     * // => false
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.every(users, 'active', false);
     * // => true
     *
     * // using the `_.property` callback shorthand
     * _.every(users, 'active');
     * // => false
     */
    function every(collection, predicate, thisArg) {
      var func = isArray(collection) ? arrayEvery : baseEvery;
      if (thisArg && isIterateeCall(collection, predicate, thisArg)) {
        predicate = null;
      }
      if (typeof predicate != 'function' || thisArg !== undefined) {
        predicate = getCallback(predicate, thisArg, 3);
      }
      return func(collection, predicate);
    }

    /**
     * Iterates over elements of `collection`, returning an array of all elements
     * `predicate` returns truthy for. The predicate is bound to `thisArg` and
     * invoked with three arguments: (value, index|key, collection).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @alias select
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the new filtered array.
     * @example
     *
     * _.filter([4, 5, 6], function(n) {
     *   return n % 2 == 0;
     * });
     * // => [4, 6]
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': true },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.pluck(_.filter(users, { 'age': 36, 'active': true }), 'user');
     * // => ['barney']
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.pluck(_.filter(users, 'active', false), 'user');
     * // => ['fred']
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.filter(users, 'active'), 'user');
     * // => ['barney']
     */
    function filter(collection, predicate, thisArg) {
      var func = isArray(collection) ? arrayFilter : baseFilter;
      predicate = getCallback(predicate, thisArg, 3);
      return func(collection, predicate);
    }

    /**
     * Iterates over elements of `collection`, returning the first element
     * `predicate` returns truthy for. The predicate is bound to `thisArg` and
     * invoked with three arguments: (value, index|key, collection).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @alias detect
     * @category Collection
     * @param {Array|Object|string} collection The collection to search.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {*} Returns the matched element, else `undefined`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36, 'active': true },
     *   { 'user': 'fred',    'age': 40, 'active': false },
     *   { 'user': 'pebbles', 'age': 1,  'active': true }
     * ];
     *
     * _.result(_.find(users, function(chr) {
     *   return chr.age < 40;
     * }), 'user');
     * // => 'barney'
     *
     * // using the `_.matches` callback shorthand
     * _.result(_.find(users, { 'age': 1, 'active': true }), 'user');
     * // => 'pebbles'
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.result(_.find(users, 'active', false), 'user');
     * // => 'fred'
     *
     * // using the `_.property` callback shorthand
     * _.result(_.find(users, 'active'), 'user');
     * // => 'barney'
     */
    var find = createFind(baseEach);

    /**
     * This method is like `_.find` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to search.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {*} Returns the matched element, else `undefined`.
     * @example
     *
     * _.findLast([1, 2, 3, 4], function(n) {
     *   return n % 2 == 1;
     * });
     * // => 3
     */
    var findLast = createFind(baseEachRight, true);

    /**
     * Performs a deep comparison between each element in `collection` and the
     * source object, returning the first element that has equivalent property
     * values.
     *
     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
     * numbers, `Object` objects, regexes, and strings. Objects are compared by
     * their own, not inherited, enumerable properties. For comparing a single
     * own or inherited property value see `_.matchesProperty`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to search.
     * @param {Object} source The object of property values to match.
     * @returns {*} Returns the matched element, else `undefined`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': true },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * _.result(_.findWhere(users, { 'age': 36, 'active': true }), 'user');
     * // => 'barney'
     *
     * _.result(_.findWhere(users, { 'age': 40, 'active': false }), 'user');
     * // => 'fred'
     */
    function findWhere(collection, source) {
      return find(collection, baseMatches(source));
    }

    /**
     * Iterates over elements of `collection` invoking `iteratee` for each element.
     * The `iteratee` is bound to `thisArg` and invoked with three arguments:
     * (value, index|key, collection). Iteratee functions may exit iteration early
     * by explicitly returning `false`.
     *
     * **Note:** As with other "Collections" methods, objects with a "length" property
     * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
     * may be used for object iteration.
     *
     * @static
     * @memberOf _
     * @alias each
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array|Object|string} Returns `collection`.
     * @example
     *
     * _([1, 2]).forEach(function(n) {
     *   console.log(n);
     * }).value();
     * // => logs each value from left to right and returns the array
     *
     * _.forEach({ 'a': 1, 'b': 2 }, function(n, key) {
     *   console.log(n, key);
     * });
     * // => logs each value-key pair and returns the object (iteration order is not guaranteed)
     */
    var forEach = createForEach(arrayEach, baseEach);

    /**
     * This method is like `_.forEach` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @alias eachRight
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array|Object|string} Returns `collection`.
     * @example
     *
     * _([1, 2]).forEachRight(function(n) {
     *   console.log(n);
     * }).value();
     * // => logs each value from right to left and returns the array
     */
    var forEachRight = createForEach(arrayEachRight, baseEachRight);

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` through `iteratee`. The corresponding value
     * of each key is an array of the elements responsible for generating the key.
     * The `iteratee` is bound to `thisArg` and invoked with three arguments:
     * (value, index|key, collection).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * _.groupBy([4.2, 6.1, 6.4], function(n) {
     *   return Math.floor(n);
     * });
     * // => { '4': [4.2], '6': [6.1, 6.4] }
     *
     * _.groupBy([4.2, 6.1, 6.4], function(n) {
     *   return this.floor(n);
     * }, Math);
     * // => { '4': [4.2], '6': [6.1, 6.4] }
     *
     * // using the `_.property` callback shorthand
     * _.groupBy(['one', 'two', 'three'], 'length');
     * // => { '3': ['one', 'two'], '5': ['three'] }
     */
    var groupBy = createAggregator(function(result, value, key) {
      if (hasOwnProperty.call(result, key)) {
        result[key].push(value);
      } else {
        result[key] = [value];
      }
    });

    /**
     * Checks if `value` is in `collection` using
     * [`SameValueZero`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
     * for equality comparisons. If `fromIndex` is negative, it is used as the offset
     * from the end of `collection`.
     *
     * @static
     * @memberOf _
     * @alias contains, include
     * @category Collection
     * @param {Array|Object|string} collection The collection to search.
     * @param {*} target The value to search for.
     * @param {number} [fromIndex=0] The index to search from.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.reduce`.
     * @returns {boolean} Returns `true` if a matching element is found, else `false`.
     * @example
     *
     * _.includes([1, 2, 3], 1);
     * // => true
     *
     * _.includes([1, 2, 3], 1, 2);
     * // => false
     *
     * _.includes({ 'user': 'fred', 'age': 40 }, 'fred');
     * // => true
     *
     * _.includes('pebbles', 'eb');
     * // => true
     */
    function includes(collection, target, fromIndex, guard) {
      var length = collection ? getLength(collection) : 0;
      if (!isLength(length)) {
        collection = values(collection);
        length = collection.length;
      }
      if (!length) {
        return false;
      }
      if (typeof fromIndex != 'number' || (guard && isIterateeCall(target, fromIndex, guard))) {
        fromIndex = 0;
      } else {
        fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : (fromIndex || 0);
      }
      return (typeof collection == 'string' || !isArray(collection) && isString(collection))
        ? (fromIndex < length && collection.indexOf(target, fromIndex) > -1)
        : (getIndexOf(collection, target, fromIndex) > -1);
    }

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` through `iteratee`. The corresponding value
     * of each key is the last element responsible for generating the key. The
     * iteratee function is bound to `thisArg` and invoked with three arguments:
     * (value, index|key, collection).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * var keyData = [
     *   { 'dir': 'left', 'code': 97 },
     *   { 'dir': 'right', 'code': 100 }
     * ];
     *
     * _.indexBy(keyData, 'dir');
     * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
     *
     * _.indexBy(keyData, function(object) {
     *   return String.fromCharCode(object.code);
     * });
     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
     *
     * _.indexBy(keyData, function(object) {
     *   return this.fromCharCode(object.code);
     * }, String);
     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
     */
    var indexBy = createAggregator(function(result, value, key) {
      result[key] = value;
    });

    /**
     * Invokes the method at `path` of each element in `collection`, returning
     * an array of the results of each invoked method. Any additional arguments
     * are provided to each invoked method. If `methodName` is a function it is
     * invoked for, and `this` bound to, each element in `collection`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Array|Function|string} path The path of the method to invoke or
     *  the function invoked per iteration.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {Array} Returns the array of results.
     * @example
     *
     * _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
     * // => [[1, 5, 7], [1, 2, 3]]
     *
     * _.invoke([123, 456], String.prototype.split, '');
     * // => [['1', '2', '3'], ['4', '5', '6']]
     */
    var invoke = restParam(function(collection, path, args) {
      var index = -1,
          isFunc = typeof path == 'function',
          isProp = isKey(path),
          result = isArrayLike(collection) ? Array(collection.length) : [];

      baseEach(collection, function(value) {
        var func = isFunc ? path : ((isProp && value != null) ? value[path] : null);
        result[++index] = func ? func.apply(value, args) : invokePath(value, path, args);
      });
      return result;
    });

    /**
     * Creates an array of values by running each element in `collection` through
     * `iteratee`. The `iteratee` is bound to `thisArg` and invoked with three
     * arguments: (value, index|key, collection).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * Many lodash methods are guarded to work as iteratees for methods like
     * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
     *
     * The guarded methods are:
     * `ary`, `callback`, `chunk`, `clone`, `create`, `curry`, `curryRight`,
     * `drop`, `dropRight`, `every`, `fill`, `flatten`, `invert`, `max`, `min`,
     * `parseInt`, `slice`, `sortBy`, `take`, `takeRight`, `template`, `trim`,
     * `trimLeft`, `trimRight`, `trunc`, `random`, `range`, `sample`, `some`,
     * `sum`, `uniq`, and `words`
     *
     * @static
     * @memberOf _
     * @alias collect
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array} Returns the new mapped array.
     * @example
     *
     * function timesThree(n) {
     *   return n * 3;
     * }
     *
     * _.map([1, 2], timesThree);
     * // => [3, 6]
     *
     * _.map({ 'a': 1, 'b': 2 }, timesThree);
     * // => [3, 6] (iteration order is not guaranteed)
     *
     * var users = [
     *   { 'user': 'barney' },
     *   { 'user': 'fred' }
     * ];
     *
     * // using the `_.property` callback shorthand
     * _.map(users, 'user');
     * // => ['barney', 'fred']
     */
    function map(collection, iteratee, thisArg) {
      var func = isArray(collection) ? arrayMap : baseMap;
      iteratee = getCallback(iteratee, thisArg, 3);
      return func(collection, iteratee);
    }

    /**
     * Creates an array of elements split into two groups, the first of which
     * contains elements `predicate` returns truthy for, while the second of which
     * contains elements `predicate` returns falsey for. The predicate is bound
     * to `thisArg` and invoked with three arguments: (value, index|key, collection).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the array of grouped elements.
     * @example
     *
     * _.partition([1, 2, 3], function(n) {
     *   return n % 2;
     * });
     * // => [[1, 3], [2]]
     *
     * _.partition([1.2, 2.3, 3.4], function(n) {
     *   return this.floor(n) % 2;
     * }, Math);
     * // => [[1.2, 3.4], [2.3]]
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36, 'active': false },
     *   { 'user': 'fred',    'age': 40, 'active': true },
     *   { 'user': 'pebbles', 'age': 1,  'active': false }
     * ];
     *
     * var mapper = function(array) {
     *   return _.pluck(array, 'user');
     * };
     *
     * // using the `_.matches` callback shorthand
     * _.map(_.partition(users, { 'age': 1, 'active': false }), mapper);
     * // => [['pebbles'], ['barney', 'fred']]
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.map(_.partition(users, 'active', false), mapper);
     * // => [['barney', 'pebbles'], ['fred']]
     *
     * // using the `_.property` callback shorthand
     * _.map(_.partition(users, 'active'), mapper);
     * // => [['fred'], ['barney', 'pebbles']]
     */
    var partition = createAggregator(function(result, value, key) {
      result[key ? 0 : 1].push(value);
    }, function() { return [[], []]; });

    /**
     * Gets the property value of `path` from all elements in `collection`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Array|string} path The path of the property to pluck.
     * @returns {Array} Returns the property values.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 }
     * ];
     *
     * _.pluck(users, 'user');
     * // => ['barney', 'fred']
     *
     * var userIndex = _.indexBy(users, 'user');
     * _.pluck(userIndex, 'age');
     * // => [36, 40] (iteration order is not guaranteed)
     */
    function pluck(collection, path) {
      return map(collection, property(path));
    }

    /**
     * Reduces `collection` to a value which is the accumulated result of running
     * each element in `collection` through `iteratee`, where each successive
     * invocation is supplied the return value of the previous. If `accumulator`
     * is not provided the first element of `collection` is used as the initial
     * value. The `iteratee` is bound to `thisArg` and invoked with four arguments:
     * (accumulator, value, index|key, collection).
     *
     * Many lodash methods are guarded to work as iteratees for methods like
     * `_.reduce`, `_.reduceRight`, and `_.transform`.
     *
     * The guarded methods are:
     * `assign`, `defaults`, `includes`, `merge`, `sortByAll`, and `sortByOrder`
     *
     * @static
     * @memberOf _
     * @alias foldl, inject
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {*} Returns the accumulated value.
     * @example
     *
     * _.reduce([1, 2], function(total, n) {
     *   return total + n;
     * });
     * // => 3
     *
     * _.reduce({ 'a': 1, 'b': 2 }, function(result, n, key) {
     *   result[key] = n * 3;
     *   return result;
     * }, {});
     * // => { 'a': 3, 'b': 6 } (iteration order is not guaranteed)
     */
    var reduce = createReduce(arrayReduce, baseEach);

    /**
     * This method is like `_.reduce` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @alias foldr
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {*} Returns the accumulated value.
     * @example
     *
     * var array = [[0, 1], [2, 3], [4, 5]];
     *
     * _.reduceRight(array, function(flattened, other) {
     *   return flattened.concat(other);
     * }, []);
     * // => [4, 5, 2, 3, 0, 1]
     */
    var reduceRight = createReduce(arrayReduceRight, baseEachRight);

    /**
     * The opposite of `_.filter`; this method returns the elements of `collection`
     * that `predicate` does **not** return truthy for.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the new filtered array.
     * @example
     *
     * _.reject([1, 2, 3, 4], function(n) {
     *   return n % 2 == 0;
     * });
     * // => [1, 3]
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': false },
     *   { 'user': 'fred',   'age': 40, 'active': true }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.pluck(_.reject(users, { 'age': 40, 'active': true }), 'user');
     * // => ['barney']
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.pluck(_.reject(users, 'active', false), 'user');
     * // => ['fred']
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.reject(users, 'active'), 'user');
     * // => ['barney']
     */
    function reject(collection, predicate, thisArg) {
      var func = isArray(collection) ? arrayFilter : baseFilter;
      predicate = getCallback(predicate, thisArg, 3);
      return func(collection, function(value, index, collection) {
        return !predicate(value, index, collection);
      });
    }

    /**
     * Gets a random element or `n` random elements from a collection.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to sample.
     * @param {number} [n] The number of elements to sample.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {*} Returns the random sample(s).
     * @example
     *
     * _.sample([1, 2, 3, 4]);
     * // => 2
     *
     * _.sample([1, 2, 3, 4], 2);
     * // => [3, 1]
     */
    function sample(collection, n, guard) {
      if (guard ? isIterateeCall(collection, n, guard) : n == null) {
        collection = toIterable(collection);
        var length = collection.length;
        return length > 0 ? collection[baseRandom(0, length - 1)] : undefined;
      }
      var index = -1,
          result = toArray(collection),
          length = result.length,
          lastIndex = length - 1;

      n = nativeMin(n < 0 ? 0 : (+n || 0), length);
      while (++index < n) {
        var rand = baseRandom(index, lastIndex),
            value = result[rand];

        result[rand] = result[index];
        result[index] = value;
      }
      result.length = n;
      return result;
    }

    /**
     * Creates an array of shuffled values, using a version of the
     * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to shuffle.
     * @returns {Array} Returns the new shuffled array.
     * @example
     *
     * _.shuffle([1, 2, 3, 4]);
     * // => [4, 1, 3, 2]
     */
    function shuffle(collection) {
      return sample(collection, POSITIVE_INFINITY);
    }

    /**
     * Gets the size of `collection` by returning its length for array-like
     * values or the number of own enumerable properties for objects.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to inspect.
     * @returns {number} Returns the size of `collection`.
     * @example
     *
     * _.size([1, 2, 3]);
     * // => 3
     *
     * _.size({ 'a': 1, 'b': 2 });
     * // => 2
     *
     * _.size('pebbles');
     * // => 7
     */
    function size(collection) {
      var length = collection ? getLength(collection) : 0;
      return isLength(length) ? length : keys(collection).length;
    }

    /**
     * Checks if `predicate` returns truthy for **any** element of `collection`.
     * The function returns as soon as it finds a passing value and does not iterate
     * over the entire collection. The predicate is bound to `thisArg` and invoked
     * with three arguments: (value, index|key, collection).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @alias any
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     * @example
     *
     * _.some([null, 0, 'yes', false], Boolean);
     * // => true
     *
     * var users = [
     *   { 'user': 'barney', 'active': true },
     *   { 'user': 'fred',   'active': false }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.some(users, { 'user': 'barney', 'active': false });
     * // => false
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.some(users, 'active', false);
     * // => true
     *
     * // using the `_.property` callback shorthand
     * _.some(users, 'active');
     * // => true
     */
    function some(collection, predicate, thisArg) {
      var func = isArray(collection) ? arraySome : baseSome;
      if (thisArg && isIterateeCall(collection, predicate, thisArg)) {
        predicate = null;
      }
      if (typeof predicate != 'function' || thisArg !== undefined) {
        predicate = getCallback(predicate, thisArg, 3);
      }
      return func(collection, predicate);
    }

    /**
     * Creates an array of elements, sorted in ascending order by the results of
     * running each element in a collection through `iteratee`. This method performs
     * a stable sort, that is, it preserves the original sort order of equal elements.
     * The `iteratee` is bound to `thisArg` and invoked with three arguments:
     * (value, index|key, collection).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array} Returns the new sorted array.
     * @example
     *
     * _.sortBy([1, 2, 3], function(n) {
     *   return Math.sin(n);
     * });
     * // => [3, 1, 2]
     *
     * _.sortBy([1, 2, 3], function(n) {
     *   return this.sin(n);
     * }, Math);
     * // => [3, 1, 2]
     *
     * var users = [
     *   { 'user': 'fred' },
     *   { 'user': 'pebbles' },
     *   { 'user': 'barney' }
     * ];
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.sortBy(users, 'user'), 'user');
     * // => ['barney', 'fred', 'pebbles']
     */
    function sortBy(collection, iteratee, thisArg) {
      if (collection == null) {
        return [];
      }
      if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
        iteratee = null;
      }
      var index = -1;
      iteratee = getCallback(iteratee, thisArg, 3);

      var result = baseMap(collection, function(value, key, collection) {
        return { 'criteria': iteratee(value, key, collection), 'index': ++index, 'value': value };
      });
      return baseSortBy(result, compareAscending);
    }

    /**
     * This method is like `_.sortBy` except that it can sort by multiple iteratees
     * or property names.
     *
     * If a property name is provided for an iteratee the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If an object is provided for an iteratee the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {...(Function|Function[]|Object|Object[]|string|string[])} iteratees
     *  The iteratees to sort by, specified as individual values or arrays of values.
     * @returns {Array} Returns the new sorted array.
     * @example
     *
     * var users = [
     *   { 'user': 'fred',   'age': 48 },
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 42 },
     *   { 'user': 'barney', 'age': 34 }
     * ];
     *
     * _.map(_.sortByAll(users, ['user', 'age']), _.values);
     * // => [['barney', 34], ['barney', 36], ['fred', 42], ['fred', 48]]
     *
     * _.map(_.sortByAll(users, 'user', function(chr) {
     *   return Math.floor(chr.age / 10);
     * }), _.values);
     * // => [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]
     */
    var sortByAll = restParam(function(collection, iteratees) {
      if (collection == null) {
        return [];
      }
      var guard = iteratees[2];
      if (guard && isIterateeCall(iteratees[0], iteratees[1], guard)) {
        iteratees.length = 1;
      }
      return baseSortByOrder(collection, baseFlatten(iteratees), []);
    });

    /**
     * This method is like `_.sortByAll` except that it allows specifying the
     * sort orders of the iteratees to sort by. A truthy value in `orders` will
     * sort the corresponding property name in ascending order while a falsey
     * value will sort it in descending order.
     *
     * If a property name is provided for an iteratee the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If an object is provided for an iteratee the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
     * @param {boolean[]} orders The sort orders of `iteratees`.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.reduce`.
     * @returns {Array} Returns the new sorted array.
     * @example
     *
     * var users = [
     *   { 'user': 'fred',   'age': 48 },
     *   { 'user': 'barney', 'age': 34 },
     *   { 'user': 'fred',   'age': 42 },
     *   { 'user': 'barney', 'age': 36 }
     * ];
     *
     * // sort by `user` in ascending order and by `age` in descending order
     * _.map(_.sortByOrder(users, ['user', 'age'], [true, false]), _.values);
     * // => [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]
     */
    function sortByOrder(collection, iteratees, orders, guard) {
      if (collection == null) {
        return [];
      }
      if (guard && isIterateeCall(iteratees, orders, guard)) {
        orders = null;
      }
      if (!isArray(iteratees)) {
        iteratees = iteratees == null ? [] : [iteratees];
      }
      if (!isArray(orders)) {
        orders = orders == null ? [] : [orders];
      }
      return baseSortByOrder(collection, iteratees, orders);
    }

    /**
     * Performs a deep comparison between each element in `collection` and the
     * source object, returning an array of all elements that have equivalent
     * property values.
     *
     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
     * numbers, `Object` objects, regexes, and strings. Objects are compared by
     * their own, not inherited, enumerable properties. For comparing a single
     * own or inherited property value see `_.matchesProperty`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to search.
     * @param {Object} source The object of property values to match.
     * @returns {Array} Returns the new filtered array.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': false, 'pets': ['hoppy'] },
     *   { 'user': 'fred',   'age': 40, 'active': true, 'pets': ['baby puss', 'dino'] }
     * ];
     *
     * _.pluck(_.where(users, { 'age': 36, 'active': false }), 'user');
     * // => ['barney']
     *
     * _.pluck(_.where(users, { 'pets': ['dino'] }), 'user');
     * // => ['fred']
     */
    function where(collection, source) {
      return filter(collection, baseMatches(source));
    }

    /*------------------------------------------------------------------------*/

    /**
     * Gets the number of milliseconds that have elapsed since the Unix epoch
     * (1 January 1970 00:00:00 UTC).
     *
     * @static
     * @memberOf _
     * @category Date
     * @example
     *
     * _.defer(function(stamp) {
     *   console.log(_.now() - stamp);
     * }, _.now());
     * // => logs the number of milliseconds it took for the deferred function to be invoked
     */
    var now = nativeNow || function() {
      return new Date().getTime();
    };

    /*------------------------------------------------------------------------*/

    /**
     * The opposite of `_.before`; this method creates a function that invokes
     * `func` once it is called `n` or more times.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {number} n The number of calls before `func` is invoked.
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * var saves = ['profile', 'settings'];
     *
     * var done = _.after(saves.length, function() {
     *   console.log('done saving!');
     * });
     *
     * _.forEach(saves, function(type) {
     *   asyncSave({ 'type': type, 'complete': done });
     * });
     * // => logs 'done saving!' after the two async saves have completed
     */
    function after(n, func) {
      if (typeof func != 'function') {
        if (typeof n == 'function') {
          var temp = n;
          n = func;
          func = temp;
        } else {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
      }
      n = nativeIsFinite(n = +n) ? n : 0;
      return function() {
        if (--n < 1) {
          return func.apply(this, arguments);
        }
      };
    }

    /**
     * Creates a function that accepts up to `n` arguments ignoring any
     * additional arguments.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to cap arguments for.
     * @param {number} [n=func.length] The arity cap.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Function} Returns the new function.
     * @example
     *
     * _.map(['6', '8', '10'], _.ary(parseInt, 1));
     * // => [6, 8, 10]
     */
    function ary(func, n, guard) {
      if (guard && isIterateeCall(func, n, guard)) {
        n = null;
      }
      n = (func && n == null) ? func.length : nativeMax(+n || 0, 0);
      return createWrapper(func, ARY_FLAG, null, null, null, null, n);
    }

    /**
     * Creates a function that invokes `func`, with the `this` binding and arguments
     * of the created function, while it is called less than `n` times. Subsequent
     * calls to the created function return the result of the last `func` invocation.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {number} n The number of calls at which `func` is no longer invoked.
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * jQuery('#add').on('click', _.before(5, addContactToList));
     * // => allows adding up to 4 contacts to the list
     */
    function before(n, func) {
      var result;
      if (typeof func != 'function') {
        if (typeof n == 'function') {
          var temp = n;
          n = func;
          func = temp;
        } else {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
      }
      return function() {
        if (--n > 0) {
          result = func.apply(this, arguments);
        }
        if (n <= 1) {
          func = null;
        }
        return result;
      };
    }

    /**
     * Creates a function that invokes `func` with the `this` binding of `thisArg`
     * and prepends any additional `_.bind` arguments to those provided to the
     * bound function.
     *
     * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
     * may be used as a placeholder for partially applied arguments.
     *
     * **Note:** Unlike native `Function#bind` this method does not set the "length"
     * property of bound functions.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to bind.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new bound function.
     * @example
     *
     * var greet = function(greeting, punctuation) {
     *   return greeting + ' ' + this.user + punctuation;
     * };
     *
     * var object = { 'user': 'fred' };
     *
     * var bound = _.bind(greet, object, 'hi');
     * bound('!');
     * // => 'hi fred!'
     *
     * // using placeholders
     * var bound = _.bind(greet, object, _, '!');
     * bound('hi');
     * // => 'hi fred!'
     */
    var bind = restParam(function(func, thisArg, partials) {
      var bitmask = BIND_FLAG;
      if (partials.length) {
        var holders = replaceHolders(partials, bind.placeholder);
        bitmask |= PARTIAL_FLAG;
      }
      return createWrapper(func, bitmask, thisArg, partials, holders);
    });

    /**
     * Binds methods of an object to the object itself, overwriting the existing
     * method. Method names may be specified as individual arguments or as arrays
     * of method names. If no method names are provided all enumerable function
     * properties, own and inherited, of `object` are bound.
     *
     * **Note:** This method does not set the "length" property of bound functions.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Object} object The object to bind and assign the bound methods to.
     * @param {...(string|string[])} [methodNames] The object method names to bind,
     *  specified as individual method names or arrays of method names.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var view = {
     *   'label': 'docs',
     *   'onClick': function() {
     *     console.log('clicked ' + this.label);
     *   }
     * };
     *
     * _.bindAll(view);
     * jQuery('#docs').on('click', view.onClick);
     * // => logs 'clicked docs' when the element is clicked
     */
    var bindAll = restParam(function(object, methodNames) {
      methodNames = methodNames.length ? baseFlatten(methodNames) : functions(object);

      var index = -1,
          length = methodNames.length;

      while (++index < length) {
        var key = methodNames[index];
        object[key] = createWrapper(object[key], BIND_FLAG, object);
      }
      return object;
    });

    /**
     * Creates a function that invokes the method at `object[key]` and prepends
     * any additional `_.bindKey` arguments to those provided to the bound function.
     *
     * This method differs from `_.bind` by allowing bound functions to reference
     * methods that may be redefined or don't yet exist.
     * See [Peter Michaux's article](http://peter.michaux.ca/articles/lazy-function-definition-pattern)
     * for more details.
     *
     * The `_.bindKey.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Object} object The object the method belongs to.
     * @param {string} key The key of the method.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new bound function.
     * @example
     *
     * var object = {
     *   'user': 'fred',
     *   'greet': function(greeting, punctuation) {
     *     return greeting + ' ' + this.user + punctuation;
     *   }
     * };
     *
     * var bound = _.bindKey(object, 'greet', 'hi');
     * bound('!');
     * // => 'hi fred!'
     *
     * object.greet = function(greeting, punctuation) {
     *   return greeting + 'ya ' + this.user + punctuation;
     * };
     *
     * bound('!');
     * // => 'hiya fred!'
     *
     * // using placeholders
     * var bound = _.bindKey(object, 'greet', _, '!');
     * bound('hi');
     * // => 'hiya fred!'
     */
    var bindKey = restParam(function(object, key, partials) {
      var bitmask = BIND_FLAG | BIND_KEY_FLAG;
      if (partials.length) {
        var holders = replaceHolders(partials, bindKey.placeholder);
        bitmask |= PARTIAL_FLAG;
      }
      return createWrapper(key, bitmask, object, partials, holders);
    });

    /**
     * Creates a function that accepts one or more arguments of `func` that when
     * called either invokes `func` returning its result, if all `func` arguments
     * have been provided, or returns a function that accepts one or more of the
     * remaining `func` arguments, and so on. The arity of `func` may be specified
     * if `func.length` is not sufficient.
     *
     * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
     * may be used as a placeholder for provided arguments.
     *
     * **Note:** This method does not set the "length" property of curried functions.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to curry.
     * @param {number} [arity=func.length] The arity of `func`.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Function} Returns the new curried function.
     * @example
     *
     * var abc = function(a, b, c) {
     *   return [a, b, c];
     * };
     *
     * var curried = _.curry(abc);
     *
     * curried(1)(2)(3);
     * // => [1, 2, 3]
     *
     * curried(1, 2)(3);
     * // => [1, 2, 3]
     *
     * curried(1, 2, 3);
     * // => [1, 2, 3]
     *
     * // using placeholders
     * curried(1)(_, 3)(2);
     * // => [1, 2, 3]
     */
    var curry = createCurry(CURRY_FLAG);

    /**
     * This method is like `_.curry` except that arguments are applied to `func`
     * in the manner of `_.partialRight` instead of `_.partial`.
     *
     * The `_.curryRight.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for provided arguments.
     *
     * **Note:** This method does not set the "length" property of curried functions.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to curry.
     * @param {number} [arity=func.length] The arity of `func`.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Function} Returns the new curried function.
     * @example
     *
     * var abc = function(a, b, c) {
     *   return [a, b, c];
     * };
     *
     * var curried = _.curryRight(abc);
     *
     * curried(3)(2)(1);
     * // => [1, 2, 3]
     *
     * curried(2, 3)(1);
     * // => [1, 2, 3]
     *
     * curried(1, 2, 3);
     * // => [1, 2, 3]
     *
     * // using placeholders
     * curried(3)(1, _)(2);
     * // => [1, 2, 3]
     */
    var curryRight = createCurry(CURRY_RIGHT_FLAG);

    /**
     * Creates a debounced function that delays invoking `func` until after `wait`
     * milliseconds have elapsed since the last time the debounced function was
     * invoked. The debounced function comes with a `cancel` method to cancel
     * delayed invocations. Provide an options object to indicate that `func`
     * should be invoked on the leading and/or trailing edge of the `wait` timeout.
     * Subsequent calls to the debounced function return the result of the last
     * `func` invocation.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
     * on the trailing edge of the timeout only if the the debounced function is
     * invoked more than once during the `wait` timeout.
     *
     * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
     * for details over the differences between `_.debounce` and `_.throttle`.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to debounce.
     * @param {number} [wait=0] The number of milliseconds to delay.
     * @param {Object} [options] The options object.
     * @param {boolean} [options.leading=false] Specify invoking on the leading
     *  edge of the timeout.
     * @param {number} [options.maxWait] The maximum time `func` is allowed to be
     *  delayed before it is invoked.
     * @param {boolean} [options.trailing=true] Specify invoking on the trailing
     *  edge of the timeout.
     * @returns {Function} Returns the new debounced function.
     * @example
     *
     * // avoid costly calculations while the window size is in flux
     * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
     *
     * // invoke `sendMail` when the click event is fired, debouncing subsequent calls
     * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
     *   'leading': true,
     *   'trailing': false
     * }));
     *
     * // ensure `batchLog` is invoked once after 1 second of debounced calls
     * var source = new EventSource('/stream');
     * jQuery(source).on('message', _.debounce(batchLog, 250, {
     *   'maxWait': 1000
     * }));
     *
     * // cancel a debounced call
     * var todoChanges = _.debounce(batchLog, 1000);
     * Object.observe(models.todo, todoChanges);
     *
     * Object.observe(models, function(changes) {
     *   if (_.find(changes, { 'user': 'todo', 'type': 'delete'})) {
     *     todoChanges.cancel();
     *   }
     * }, ['delete']);
     *
     * // ...at some point `models.todo` is changed
     * models.todo.completed = true;
     *
     * // ...before 1 second has passed `models.todo` is deleted
     * // which cancels the debounced `todoChanges` call
     * delete models.todo;
     */
    function debounce(func, wait, options) {
      var args,
          maxTimeoutId,
          result,
          stamp,
          thisArg,
          timeoutId,
          trailingCall,
          lastCalled = 0,
          maxWait = false,
          trailing = true;

      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      wait = wait < 0 ? 0 : (+wait || 0);
      if (options === true) {
        var leading = true;
        trailing = false;
      } else if (isObject(options)) {
        leading = options.leading;
        maxWait = 'maxWait' in options && nativeMax(+options.maxWait || 0, wait);
        trailing = 'trailing' in options ? options.trailing : trailing;
      }

      function cancel() {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        if (maxTimeoutId) {
          clearTimeout(maxTimeoutId);
        }
        maxTimeoutId = timeoutId = trailingCall = undefined;
      }

      function delayed() {
        var remaining = wait - (now() - stamp);
        if (remaining <= 0 || remaining > wait) {
          if (maxTimeoutId) {
            clearTimeout(maxTimeoutId);
          }
          var isCalled = trailingCall;
          maxTimeoutId = timeoutId = trailingCall = undefined;
          if (isCalled) {
            lastCalled = now();
            result = func.apply(thisArg, args);
            if (!timeoutId && !maxTimeoutId) {
              args = thisArg = null;
            }
          }
        } else {
          timeoutId = setTimeout(delayed, remaining);
        }
      }

      function maxDelayed() {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        maxTimeoutId = timeoutId = trailingCall = undefined;
        if (trailing || (maxWait !== wait)) {
          lastCalled = now();
          result = func.apply(thisArg, args);
          if (!timeoutId && !maxTimeoutId) {
            args = thisArg = null;
          }
        }
      }

      function debounced() {
        args = arguments;
        stamp = now();
        thisArg = this;
        trailingCall = trailing && (timeoutId || !leading);

        if (maxWait === false) {
          var leadingCall = leading && !timeoutId;
        } else {
          if (!maxTimeoutId && !leading) {
            lastCalled = stamp;
          }
          var remaining = maxWait - (stamp - lastCalled),
              isCalled = remaining <= 0 || remaining > maxWait;

          if (isCalled) {
            if (maxTimeoutId) {
              maxTimeoutId = clearTimeout(maxTimeoutId);
            }
            lastCalled = stamp;
            result = func.apply(thisArg, args);
          }
          else if (!maxTimeoutId) {
            maxTimeoutId = setTimeout(maxDelayed, remaining);
          }
        }
        if (isCalled && timeoutId) {
          timeoutId = clearTimeout(timeoutId);
        }
        else if (!timeoutId && wait !== maxWait) {
          timeoutId = setTimeout(delayed, wait);
        }
        if (leadingCall) {
          isCalled = true;
          result = func.apply(thisArg, args);
        }
        if (isCalled && !timeoutId && !maxTimeoutId) {
          args = thisArg = null;
        }
        return result;
      }
      debounced.cancel = cancel;
      return debounced;
    }

    /**
     * Defers invoking the `func` until the current call stack has cleared. Any
     * additional arguments are provided to `func` when it is invoked.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to defer.
     * @param {...*} [args] The arguments to invoke the function with.
     * @returns {number} Returns the timer id.
     * @example
     *
     * _.defer(function(text) {
     *   console.log(text);
     * }, 'deferred');
     * // logs 'deferred' after one or more milliseconds
     */
    var defer = restParam(function(func, args) {
      return baseDelay(func, 1, args);
    });

    /**
     * Invokes `func` after `wait` milliseconds. Any additional arguments are
     * provided to `func` when it is invoked.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay invocation.
     * @param {...*} [args] The arguments to invoke the function with.
     * @returns {number} Returns the timer id.
     * @example
     *
     * _.delay(function(text) {
     *   console.log(text);
     * }, 1000, 'later');
     * // => logs 'later' after one second
     */
    var delay = restParam(function(func, wait, args) {
      return baseDelay(func, wait, args);
    });

    /**
     * Creates a function that returns the result of invoking the provided
     * functions with the `this` binding of the created function, where each
     * successive invocation is supplied the return value of the previous.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {...Function} [funcs] Functions to invoke.
     * @returns {Function} Returns the new function.
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var addSquare = _.flow(_.add, square);
     * addSquare(1, 2);
     * // => 9
     */
    var flow = createFlow();

    /**
     * This method is like `_.flow` except that it creates a function that
     * invokes the provided functions from right to left.
     *
     * @static
     * @memberOf _
     * @alias backflow, compose
     * @category Function
     * @param {...Function} [funcs] Functions to invoke.
     * @returns {Function} Returns the new function.
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var addSquare = _.flowRight(square, _.add);
     * addSquare(1, 2);
     * // => 9
     */
    var flowRight = createFlow(true);

    /**
     * Creates a function that memoizes the result of `func`. If `resolver` is
     * provided it determines the cache key for storing the result based on the
     * arguments provided to the memoized function. By default, the first argument
     * provided to the memoized function is coerced to a string and used as the
     * cache key. The `func` is invoked with the `this` binding of the memoized
     * function.
     *
     * **Note:** The cache is exposed as the `cache` property on the memoized
     * function. Its creation may be customized by replacing the `_.memoize.Cache`
     * constructor with one whose instances implement the [`Map`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-properties-of-the-map-prototype-object)
     * method interface of `get`, `has`, and `set`.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to have its output memoized.
     * @param {Function} [resolver] The function to resolve the cache key.
     * @returns {Function} Returns the new memoizing function.
     * @example
     *
     * var upperCase = _.memoize(function(string) {
     *   return string.toUpperCase();
     * });
     *
     * upperCase('fred');
     * // => 'FRED'
     *
     * // modifying the result cache
     * upperCase.cache.set('fred', 'BARNEY');
     * upperCase('fred');
     * // => 'BARNEY'
     *
     * // replacing `_.memoize.Cache`
     * var object = { 'user': 'fred' };
     * var other = { 'user': 'barney' };
     * var identity = _.memoize(_.identity);
     *
     * identity(object);
     * // => { 'user': 'fred' }
     * identity(other);
     * // => { 'user': 'fred' }
     *
     * _.memoize.Cache = WeakMap;
     * var identity = _.memoize(_.identity);
     *
     * identity(object);
     * // => { 'user': 'fred' }
     * identity(other);
     * // => { 'user': 'barney' }
     */
    function memoize(func, resolver) {
      if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var memoized = function() {
        var args = arguments,
            key = resolver ? resolver.apply(this, args) : args[0],
            cache = memoized.cache;

        if (cache.has(key)) {
          return cache.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result);
        return result;
      };
      memoized.cache = new memoize.Cache;
      return memoized;
    }

    /**
     * Creates a function that negates the result of the predicate `func`. The
     * `func` predicate is invoked with the `this` binding and arguments of the
     * created function.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} predicate The predicate to negate.
     * @returns {Function} Returns the new function.
     * @example
     *
     * function isEven(n) {
     *   return n % 2 == 0;
     * }
     *
     * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
     * // => [1, 3, 5]
     */
    function negate(predicate) {
      if (typeof predicate != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      return function() {
        return !predicate.apply(this, arguments);
      };
    }

    /**
     * Creates a function that is restricted to invoking `func` once. Repeat calls
     * to the function return the value of the first call. The `func` is invoked
     * with the `this` binding and arguments of the created function.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * var initialize = _.once(createApplication);
     * initialize();
     * initialize();
     * // `initialize` invokes `createApplication` once
     */
    function once(func) {
      return before(2, func);
    }

    /**
     * Creates a function that invokes `func` with `partial` arguments prepended
     * to those provided to the new function. This method is like `_.bind` except
     * it does **not** alter the `this` binding.
     *
     * The `_.partial.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * **Note:** This method does not set the "length" property of partially
     * applied functions.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to partially apply arguments to.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new partially applied function.
     * @example
     *
     * var greet = function(greeting, name) {
     *   return greeting + ' ' + name;
     * };
     *
     * var sayHelloTo = _.partial(greet, 'hello');
     * sayHelloTo('fred');
     * // => 'hello fred'
     *
     * // using placeholders
     * var greetFred = _.partial(greet, _, 'fred');
     * greetFred('hi');
     * // => 'hi fred'
     */
    var partial = createPartial(PARTIAL_FLAG);

    /**
     * This method is like `_.partial` except that partially applied arguments
     * are appended to those provided to the new function.
     *
     * The `_.partialRight.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * **Note:** This method does not set the "length" property of partially
     * applied functions.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to partially apply arguments to.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new partially applied function.
     * @example
     *
     * var greet = function(greeting, name) {
     *   return greeting + ' ' + name;
     * };
     *
     * var greetFred = _.partialRight(greet, 'fred');
     * greetFred('hi');
     * // => 'hi fred'
     *
     * // using placeholders
     * var sayHelloTo = _.partialRight(greet, 'hello', _);
     * sayHelloTo('fred');
     * // => 'hello fred'
     */
    var partialRight = createPartial(PARTIAL_RIGHT_FLAG);

    /**
     * Creates a function that invokes `func` with arguments arranged according
     * to the specified indexes where the argument value at the first index is
     * provided as the first argument, the argument value at the second index is
     * provided as the second argument, and so on.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to rearrange arguments for.
     * @param {...(number|number[])} indexes The arranged argument indexes,
     *  specified as individual indexes or arrays of indexes.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var rearged = _.rearg(function(a, b, c) {
     *   return [a, b, c];
     * }, 2, 0, 1);
     *
     * rearged('b', 'c', 'a')
     * // => ['a', 'b', 'c']
     *
     * var map = _.rearg(_.map, [1, 0]);
     * map(function(n) {
     *   return n * 3;
     * }, [1, 2, 3]);
     * // => [3, 6, 9]
     */
    var rearg = restParam(function(func, indexes) {
      return createWrapper(func, REARG_FLAG, null, null, null, baseFlatten(indexes));
    });

    /**
     * Creates a function that invokes `func` with the `this` binding of the
     * created function and arguments from `start` and beyond provided as an array.
     *
     * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var say = _.restParam(function(what, names) {
     *   return what + ' ' + _.initial(names).join(', ') +
     *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
     * });
     *
     * say('hello', 'fred', 'barney', 'pebbles');
     * // => 'hello fred, barney, & pebbles'
     */
    function restParam(func, start) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
      return function() {
        var args = arguments,
            index = -1,
            length = nativeMax(args.length - start, 0),
            rest = Array(length);

        while (++index < length) {
          rest[index] = args[start + index];
        }
        switch (start) {
          case 0: return func.call(this, rest);
          case 1: return func.call(this, args[0], rest);
          case 2: return func.call(this, args[0], args[1], rest);
        }
        var otherArgs = Array(start + 1);
        index = -1;
        while (++index < start) {
          otherArgs[index] = args[index];
        }
        otherArgs[start] = rest;
        return func.apply(this, otherArgs);
      };
    }

    /**
     * Creates a function that invokes `func` with the `this` binding of the created
     * function and an array of arguments much like [`Function#apply`](https://es5.github.io/#x15.3.4.3).
     *
     * **Note:** This method is based on the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator).
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to spread arguments over.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var say = _.spread(function(who, what) {
     *   return who + ' says ' + what;
     * });
     *
     * say(['fred', 'hello']);
     * // => 'fred says hello'
     *
     * // with a Promise
     * var numbers = Promise.all([
     *   Promise.resolve(40),
     *   Promise.resolve(36)
     * ]);
     *
     * numbers.then(_.spread(function(x, y) {
     *   return x + y;
     * }));
     * // => a Promise of 76
     */
    function spread(func) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      return function(array) {
        return func.apply(this, array);
      };
    }

    /**
     * Creates a throttled function that only invokes `func` at most once per
     * every `wait` milliseconds. The throttled function comes with a `cancel`
     * method to cancel delayed invocations. Provide an options object to indicate
     * that `func` should be invoked on the leading and/or trailing edge of the
     * `wait` timeout. Subsequent calls to the throttled function return the
     * result of the last `func` call.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
     * on the trailing edge of the timeout only if the the throttled function is
     * invoked more than once during the `wait` timeout.
     *
     * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
     * for details over the differences between `_.throttle` and `_.debounce`.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to throttle.
     * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
     * @param {Object} [options] The options object.
     * @param {boolean} [options.leading=true] Specify invoking on the leading
     *  edge of the timeout.
     * @param {boolean} [options.trailing=true] Specify invoking on the trailing
     *  edge of the timeout.
     * @returns {Function} Returns the new throttled function.
     * @example
     *
     * // avoid excessively updating the position while scrolling
     * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
     *
     * // invoke `renewToken` when the click event is fired, but not more than once every 5 minutes
     * jQuery('.interactive').on('click', _.throttle(renewToken, 300000, {
     *   'trailing': false
     * }));
     *
     * // cancel a trailing throttled call
     * jQuery(window).on('popstate', throttled.cancel);
     */
    function throttle(func, wait, options) {
      var leading = true,
          trailing = true;

      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      if (options === false) {
        leading = false;
      } else if (isObject(options)) {
        leading = 'leading' in options ? !!options.leading : leading;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
      }
      debounceOptions.leading = leading;
      debounceOptions.maxWait = +wait;
      debounceOptions.trailing = trailing;
      return debounce(func, wait, debounceOptions);
    }

    /**
     * Creates a function that provides `value` to the wrapper function as its
     * first argument. Any additional arguments provided to the function are
     * appended to those provided to the wrapper function. The wrapper is invoked
     * with the `this` binding of the created function.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {*} value The value to wrap.
     * @param {Function} wrapper The wrapper function.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var p = _.wrap(_.escape, function(func, text) {
     *   return '<p>' + func(text) + '</p>';
     * });
     *
     * p('fred, barney, & pebbles');
     * // => '<p>fred, barney, &amp; pebbles</p>'
     */
    function wrap(value, wrapper) {
      wrapper = wrapper == null ? identity : wrapper;
      return createWrapper(wrapper, PARTIAL_FLAG, null, [value], []);
    }

    /*------------------------------------------------------------------------*/

    /**
     * Creates a clone of `value`. If `isDeep` is `true` nested objects are cloned,
     * otherwise they are assigned by reference. If `customizer` is provided it is
     * invoked to produce the cloned values. If `customizer` returns `undefined`
     * cloning is handled by the method instead. The `customizer` is bound to
     * `thisArg` and invoked with two argument; (value [, index|key, object]).
     *
     * **Note:** This method is loosely based on the
     * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
     * The enumerable properties of `arguments` objects and objects created by
     * constructors other than `Object` are cloned to plain `Object` objects. An
     * empty object is returned for uncloneable values such as functions, DOM nodes,
     * Maps, Sets, and WeakMaps.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @param {Function} [customizer] The function to customize cloning values.
     * @param {*} [thisArg] The `this` binding of `customizer`.
     * @returns {*} Returns the cloned value.
     * @example
     *
     * var users = [
     *   { 'user': 'barney' },
     *   { 'user': 'fred' }
     * ];
     *
     * var shallow = _.clone(users);
     * shallow[0] === users[0];
     * // => true
     *
     * var deep = _.clone(users, true);
     * deep[0] === users[0];
     * // => false
     *
     * // using a customizer callback
     * var el = _.clone(document.body, function(value) {
     *   if (_.isElement(value)) {
     *     return value.cloneNode(false);
     *   }
     * });
     *
     * el === document.body
     * // => false
     * el.nodeName
     * // => BODY
     * el.childNodes.length;
     * // => 0
     */
    function clone(value, isDeep, customizer, thisArg) {
      if (isDeep && typeof isDeep != 'boolean' && isIterateeCall(value, isDeep, customizer)) {
        isDeep = false;
      }
      else if (typeof isDeep == 'function') {
        thisArg = customizer;
        customizer = isDeep;
        isDeep = false;
      }
      return typeof customizer == 'function'
        ? baseClone(value, isDeep, bindCallback(customizer, thisArg, 1))
        : baseClone(value, isDeep);
    }

    /**
     * Creates a deep clone of `value`. If `customizer` is provided it is invoked
     * to produce the cloned values. If `customizer` returns `undefined` cloning
     * is handled by the method instead. The `customizer` is bound to `thisArg`
     * and invoked with two argument; (value [, index|key, object]).
     *
     * **Note:** This method is loosely based on the
     * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
     * The enumerable properties of `arguments` objects and objects created by
     * constructors other than `Object` are cloned to plain `Object` objects. An
     * empty object is returned for uncloneable values such as functions, DOM nodes,
     * Maps, Sets, and WeakMaps.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to deep clone.
     * @param {Function} [customizer] The function to customize cloning values.
     * @param {*} [thisArg] The `this` binding of `customizer`.
     * @returns {*} Returns the deep cloned value.
     * @example
     *
     * var users = [
     *   { 'user': 'barney' },
     *   { 'user': 'fred' }
     * ];
     *
     * var deep = _.cloneDeep(users);
     * deep[0] === users[0];
     * // => false
     *
     * // using a customizer callback
     * var el = _.cloneDeep(document.body, function(value) {
     *   if (_.isElement(value)) {
     *     return value.cloneNode(true);
     *   }
     * });
     *
     * el === document.body
     * // => false
     * el.nodeName
     * // => BODY
     * el.childNodes.length;
     * // => 20
     */
    function cloneDeep(value, customizer, thisArg) {
      return typeof customizer == 'function'
        ? baseClone(value, true, bindCallback(customizer, thisArg, 1))
        : baseClone(value, true);
    }

    /**
     * Checks if `value` is greater than `other`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is greater than `other`, else `false`.
     * @example
     *
     * _.gt(3, 1);
     * // => true
     *
     * _.gt(3, 3);
     * // => false
     *
     * _.gt(1, 3);
     * // => false
     */
    function gt(value, other) {
      return value > other;
    }

    /**
     * Checks if `value` is greater than or equal to `other`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is greater than or equal to `other`, else `false`.
     * @example
     *
     * _.gte(3, 1);
     * // => true
     *
     * _.gte(3, 3);
     * // => true
     *
     * _.gte(1, 3);
     * // => false
     */
    function gte(value, other) {
      return value >= other;
    }

    /**
     * Checks if `value` is classified as an `arguments` object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isArguments(function() { return arguments; }());
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */
    function isArguments(value) {
      return isObjectLike(value) && isArrayLike(value) && objToString.call(value) == argsTag;
    }

    /**
     * Checks if `value` is classified as an `Array` object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isArray([1, 2, 3]);
     * // => true
     *
     * _.isArray(function() { return arguments; }());
     * // => false
     */
    var isArray = nativeIsArray || function(value) {
      return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
    };

    /**
     * Checks if `value` is classified as a boolean primitive or object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isBoolean(false);
     * // => true
     *
     * _.isBoolean(null);
     * // => false
     */
    function isBoolean(value) {
      return value === true || value === false || (isObjectLike(value) && objToString.call(value) == boolTag);
    }

    /**
     * Checks if `value` is classified as a `Date` object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isDate(new Date);
     * // => true
     *
     * _.isDate('Mon April 23 2012');
     * // => false
     */
    function isDate(value) {
      return isObjectLike(value) && objToString.call(value) == dateTag;
    }

    /**
     * Checks if `value` is a DOM element.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
     * @example
     *
     * _.isElement(document.body);
     * // => true
     *
     * _.isElement('<body>');
     * // => false
     */
    function isElement(value) {
      return !!value && value.nodeType === 1 && isObjectLike(value) &&
        (objToString.call(value).indexOf('Element') > -1);
    }
    // Fallback for environments without DOM support.
    if (!support.dom) {
      isElement = function(value) {
        return !!value && value.nodeType === 1 && isObjectLike(value) && !isPlainObject(value);
      };
    }

    /**
     * Checks if `value` is empty. A value is considered empty unless it is an
     * `arguments` object, array, string, or jQuery-like collection with a length
     * greater than `0` or an object with own enumerable properties.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {Array|Object|string} value The value to inspect.
     * @returns {boolean} Returns `true` if `value` is empty, else `false`.
     * @example
     *
     * _.isEmpty(null);
     * // => true
     *
     * _.isEmpty(true);
     * // => true
     *
     * _.isEmpty(1);
     * // => true
     *
     * _.isEmpty([1, 2, 3]);
     * // => false
     *
     * _.isEmpty({ 'a': 1 });
     * // => false
     */
    function isEmpty(value) {
      if (value == null) {
        return true;
      }
      if (isArrayLike(value) && (isArray(value) || isString(value) || isArguments(value) ||
          (isObjectLike(value) && isFunction(value.splice)))) {
        return !value.length;
      }
      return !keys(value).length;
    }

    /**
     * Performs a deep comparison between two values to determine if they are
     * equivalent. If `customizer` is provided it is invoked to compare values.
     * If `customizer` returns `undefined` comparisons are handled by the method
     * instead. The `customizer` is bound to `thisArg` and invoked with three
     * arguments: (value, other [, index|key]).
     *
     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
     * numbers, `Object` objects, regexes, and strings. Objects are compared by
     * their own, not inherited, enumerable properties. Functions and DOM nodes
     * are **not** supported. Provide a customizer function to extend support
     * for comparing other values.
     *
     * @static
     * @memberOf _
     * @alias eq
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @param {Function} [customizer] The function to customize value comparisons.
     * @param {*} [thisArg] The `this` binding of `customizer`.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'user': 'fred' };
     * var other = { 'user': 'fred' };
     *
     * object == other;
     * // => false
     *
     * _.isEqual(object, other);
     * // => true
     *
     * // using a customizer callback
     * var array = ['hello', 'goodbye'];
     * var other = ['hi', 'goodbye'];
     *
     * _.isEqual(array, other, function(value, other) {
     *   if (_.every([value, other], RegExp.prototype.test, /^h(?:i|ello)$/)) {
     *     return true;
     *   }
     * });
     * // => true
     */
    function isEqual(value, other, customizer, thisArg) {
      customizer = typeof customizer == 'function' ? bindCallback(customizer, thisArg, 3) : undefined;
      var result = customizer ? customizer(value, other) : undefined;
      return  result === undefined ? baseIsEqual(value, other, customizer) : !!result;
    }

    /**
     * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
     * `SyntaxError`, `TypeError`, or `URIError` object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
     * @example
     *
     * _.isError(new Error);
     * // => true
     *
     * _.isError(Error);
     * // => false
     */
    function isError(value) {
      return isObjectLike(value) && typeof value.message == 'string' && objToString.call(value) == errorTag;
    }

    /**
     * Checks if `value` is a finite primitive number.
     *
     * **Note:** This method is based on [`Number.isFinite`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.isfinite).
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
     * @example
     *
     * _.isFinite(10);
     * // => true
     *
     * _.isFinite('10');
     * // => false
     *
     * _.isFinite(true);
     * // => false
     *
     * _.isFinite(Object(10));
     * // => false
     *
     * _.isFinite(Infinity);
     * // => false
     */
    var isFinite = nativeNumIsFinite || function(value) {
      return typeof value == 'number' && nativeIsFinite(value);
    };

    /**
     * Checks if `value` is classified as a `Function` object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     *
     * _.isFunction(/abc/);
     * // => false
     */
    var isFunction = !(baseIsFunction(/x/) || (Uint8Array && !baseIsFunction(Uint8Array))) ? baseIsFunction : function(value) {
      // The use of `Object#toString` avoids issues with the `typeof` operator
      // in older versions of Chrome and Safari which return 'function' for regexes
      // and Safari 8 equivalents which return 'object' for typed array constructors.
      return objToString.call(value) == funcTag;
    };

    /**
     * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
     * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(1);
     * // => false
     */
    function isObject(value) {
      // Avoid a V8 JIT bug in Chrome 19-20.
      // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
      var type = typeof value;
      return !!value && (type == 'object' || type == 'function');
    }

    /**
     * Performs a deep comparison between `object` and `source` to determine if
     * `object` contains equivalent property values. If `customizer` is provided
     * it is invoked to compare values. If `customizer` returns `undefined`
     * comparisons are handled by the method instead. The `customizer` is bound
     * to `thisArg` and invoked with three arguments: (value, other, index|key).
     *
     * **Note:** This method supports comparing properties of arrays, booleans,
     * `Date` objects, numbers, `Object` objects, regexes, and strings. Functions
     * and DOM nodes are **not** supported. Provide a customizer function to extend
     * support for comparing other values.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property values to match.
     * @param {Function} [customizer] The function to customize value comparisons.
     * @param {*} [thisArg] The `this` binding of `customizer`.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     * @example
     *
     * var object = { 'user': 'fred', 'age': 40 };
     *
     * _.isMatch(object, { 'age': 40 });
     * // => true
     *
     * _.isMatch(object, { 'age': 36 });
     * // => false
     *
     * // using a customizer callback
     * var object = { 'greeting': 'hello' };
     * var source = { 'greeting': 'hi' };
     *
     * _.isMatch(object, source, function(value, other) {
     *   return _.every([value, other], RegExp.prototype.test, /^h(?:i|ello)$/) || undefined;
     * });
     * // => true
     */
    function isMatch(object, source, customizer, thisArg) {
      customizer = typeof customizer == 'function' ? bindCallback(customizer, thisArg, 3) : undefined;
      return baseIsMatch(object, getMatchData(source), customizer);
    }

    /**
     * Checks if `value` is `NaN`.
     *
     * **Note:** This method is not the same as [`isNaN`](https://es5.github.io/#x15.1.2.4)
     * which returns `true` for `undefined` and other non-numeric values.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
     * @example
     *
     * _.isNaN(NaN);
     * // => true
     *
     * _.isNaN(new Number(NaN));
     * // => true
     *
     * isNaN(undefined);
     * // => true
     *
     * _.isNaN(undefined);
     * // => false
     */
    function isNaN(value) {
      // An `NaN` primitive is the only value that is not equal to itself.
      // Perform the `toStringTag` check first to avoid errors with some host objects in IE.
      return isNumber(value) && value != +value;
    }

    /**
     * Checks if `value` is a native function.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
     * @example
     *
     * _.isNative(Array.prototype.push);
     * // => true
     *
     * _.isNative(_);
     * // => false
     */
    function isNative(value) {
      if (value == null) {
        return false;
      }
      if (objToString.call(value) == funcTag) {
        return reIsNative.test(fnToString.call(value));
      }
      return isObjectLike(value) && reIsHostCtor.test(value);
    }

    /**
     * Checks if `value` is `null`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
     * @example
     *
     * _.isNull(null);
     * // => true
     *
     * _.isNull(void 0);
     * // => false
     */
    function isNull(value) {
      return value === null;
    }

    /**
     * Checks if `value` is classified as a `Number` primitive or object.
     *
     * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are classified
     * as numbers, use the `_.isFinite` method.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isNumber(8.4);
     * // => true
     *
     * _.isNumber(NaN);
     * // => true
     *
     * _.isNumber('8.4');
     * // => false
     */
    function isNumber(value) {
      return typeof value == 'number' || (isObjectLike(value) && objToString.call(value) == numberTag);
    }

    /**
     * Checks if `value` is a plain object, that is, an object created by the
     * `Object` constructor or one with a `[[Prototype]]` of `null`.
     *
     * **Note:** This method assumes objects created by the `Object` constructor
     * have no inherited enumerable properties.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * _.isPlainObject(new Foo);
     * // => false
     *
     * _.isPlainObject([1, 2, 3]);
     * // => false
     *
     * _.isPlainObject({ 'x': 0, 'y': 0 });
     * // => true
     *
     * _.isPlainObject(Object.create(null));
     * // => true
     */
    var isPlainObject = !getPrototypeOf ? shimIsPlainObject : function(value) {
      if (!(value && objToString.call(value) == objectTag)) {
        return false;
      }
      var valueOf = getNative(value, 'valueOf'),
          objProto = valueOf && (objProto = getPrototypeOf(valueOf)) && getPrototypeOf(objProto);

      return objProto
        ? (value == objProto || getPrototypeOf(value) == objProto)
        : shimIsPlainObject(value);
    };

    /**
     * Checks if `value` is classified as a `RegExp` object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isRegExp(/abc/);
     * // => true
     *
     * _.isRegExp('/abc/');
     * // => false
     */
    function isRegExp(value) {
      return isObjectLike(value) && objToString.call(value) == regexpTag;
    }

    /**
     * Checks if `value` is classified as a `String` primitive or object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isString('abc');
     * // => true
     *
     * _.isString(1);
     * // => false
     */
    function isString(value) {
      return typeof value == 'string' || (isObjectLike(value) && objToString.call(value) == stringTag);
    }

    /**
     * Checks if `value` is classified as a typed array.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isTypedArray(new Uint8Array);
     * // => true
     *
     * _.isTypedArray([]);
     * // => false
     */
    function isTypedArray(value) {
      return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
    }

    /**
     * Checks if `value` is `undefined`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
     * @example
     *
     * _.isUndefined(void 0);
     * // => true
     *
     * _.isUndefined(null);
     * // => false
     */
    function isUndefined(value) {
      return value === undefined;
    }

    /**
     * Checks if `value` is less than `other`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is less than `other`, else `false`.
     * @example
     *
     * _.lt(1, 3);
     * // => true
     *
     * _.lt(3, 3);
     * // => false
     *
     * _.lt(3, 1);
     * // => false
     */
    function lt(value, other) {
      return value < other;
    }

    /**
     * Checks if `value` is less than or equal to `other`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is less than or equal to `other`, else `false`.
     * @example
     *
     * _.lte(1, 3);
     * // => true
     *
     * _.lte(3, 3);
     * // => true
     *
     * _.lte(3, 1);
     * // => false
     */
    function lte(value, other) {
      return value <= other;
    }

    /**
     * Converts `value` to an array.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {Array} Returns the converted array.
     * @example
     *
     * (function() {
     *   return _.toArray(arguments).slice(1);
     * }(1, 2, 3));
     * // => [2, 3]
     */
    function toArray(value) {
      var length = value ? getLength(value) : 0;
      if (!isLength(length)) {
        return values(value);
      }
      if (!length) {
        return [];
      }
      return arrayCopy(value);
    }

    /**
     * Converts `value` to a plain object flattening inherited enumerable
     * properties of `value` to own properties of the plain object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {Object} Returns the converted plain object.
     * @example
     *
     * function Foo() {
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.assign({ 'a': 1 }, new Foo);
     * // => { 'a': 1, 'b': 2 }
     *
     * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
     * // => { 'a': 1, 'b': 2, 'c': 3 }
     */
    function toPlainObject(value) {
      return baseCopy(value, keysIn(value));
    }

    /*------------------------------------------------------------------------*/

    /**
     * Assigns own enumerable properties of source object(s) to the destination
     * object. Subsequent sources overwrite property assignments of previous sources.
     * If `customizer` is provided it is invoked to produce the assigned values.
     * The `customizer` is bound to `thisArg` and invoked with five arguments:
     * (objectValue, sourceValue, key, object, source).
     *
     * **Note:** This method mutates `object` and is based on
     * [`Object.assign`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign).
     *
     * @static
     * @memberOf _
     * @alias extend
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @param {Function} [customizer] The function to customize assigned values.
     * @param {*} [thisArg] The `this` binding of `customizer`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * _.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
     * // => { 'user': 'fred', 'age': 40 }
     *
     * // using a customizer callback
     * var defaults = _.partialRight(_.assign, function(value, other) {
     *   return _.isUndefined(value) ? other : value;
     * });
     *
     * defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
     * // => { 'user': 'barney', 'age': 36 }
     */
    var assign = createAssigner(function(object, source, customizer) {
      return customizer
        ? assignWith(object, source, customizer)
        : baseAssign(object, source);
    });

    /**
     * Creates an object that inherits from the given `prototype` object. If a
     * `properties` object is provided its own enumerable properties are assigned
     * to the created object.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} prototype The object to inherit from.
     * @param {Object} [properties] The properties to assign to the object.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Object} Returns the new object.
     * @example
     *
     * function Shape() {
     *   this.x = 0;
     *   this.y = 0;
     * }
     *
     * function Circle() {
     *   Shape.call(this);
     * }
     *
     * Circle.prototype = _.create(Shape.prototype, {
     *   'constructor': Circle
     * });
     *
     * var circle = new Circle;
     * circle instanceof Circle;
     * // => true
     *
     * circle instanceof Shape;
     * // => true
     */
    function create(prototype, properties, guard) {
      var result = baseCreate(prototype);
      if (guard && isIterateeCall(prototype, properties, guard)) {
        properties = null;
      }
      return properties ? baseAssign(result, properties) : result;
    }

    /**
     * Assigns own enumerable properties of source object(s) to the destination
     * object for all destination properties that resolve to `undefined`. Once a
     * property is set, additional values of the same property are ignored.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @example
     *
     * _.defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
     * // => { 'user': 'barney', 'age': 36 }
     */
    var defaults = restParam(function(args) {
      var object = args[0];
      if (object == null) {
        return object;
      }
      args.push(assignDefaults);
      return assign.apply(undefined, args);
    });

    /**
     * This method is like `_.find` except that it returns the key of the first
     * element `predicate` returns truthy for instead of the element itself.
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to search.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {string|undefined} Returns the key of the matched element, else `undefined`.
     * @example
     *
     * var users = {
     *   'barney':  { 'age': 36, 'active': true },
     *   'fred':    { 'age': 40, 'active': false },
     *   'pebbles': { 'age': 1,  'active': true }
     * };
     *
     * _.findKey(users, function(chr) {
     *   return chr.age < 40;
     * });
     * // => 'barney' (iteration order is not guaranteed)
     *
     * // using the `_.matches` callback shorthand
     * _.findKey(users, { 'age': 1, 'active': true });
     * // => 'pebbles'
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.findKey(users, 'active', false);
     * // => 'fred'
     *
     * // using the `_.property` callback shorthand
     * _.findKey(users, 'active');
     * // => 'barney'
     */
    var findKey = createFindKey(baseForOwn);

    /**
     * This method is like `_.findKey` except that it iterates over elements of
     * a collection in the opposite order.
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to search.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {string|undefined} Returns the key of the matched element, else `undefined`.
     * @example
     *
     * var users = {
     *   'barney':  { 'age': 36, 'active': true },
     *   'fred':    { 'age': 40, 'active': false },
     *   'pebbles': { 'age': 1,  'active': true }
     * };
     *
     * _.findLastKey(users, function(chr) {
     *   return chr.age < 40;
     * });
     * // => returns `pebbles` assuming `_.findKey` returns `barney`
     *
     * // using the `_.matches` callback shorthand
     * _.findLastKey(users, { 'age': 36, 'active': true });
     * // => 'barney'
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.findLastKey(users, 'active', false);
     * // => 'fred'
     *
     * // using the `_.property` callback shorthand
     * _.findLastKey(users, 'active');
     * // => 'pebbles'
     */
    var findLastKey = createFindKey(baseForOwnRight);

    /**
     * Iterates over own and inherited enumerable properties of an object invoking
     * `iteratee` for each property. The `iteratee` is bound to `thisArg` and invoked
     * with three arguments: (value, key, object). Iteratee functions may exit
     * iteration early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forIn(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => logs 'a', 'b', and 'c' (iteration order is not guaranteed)
     */
    var forIn = createForIn(baseFor);

    /**
     * This method is like `_.forIn` except that it iterates over properties of
     * `object` in the opposite order.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forInRight(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => logs 'c', 'b', and 'a' assuming `_.forIn ` logs 'a', 'b', and 'c'
     */
    var forInRight = createForIn(baseForRight);

    /**
     * Iterates over own enumerable properties of an object invoking `iteratee`
     * for each property. The `iteratee` is bound to `thisArg` and invoked with
     * three arguments: (value, key, object). Iteratee functions may exit iteration
     * early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forOwn(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => logs 'a' and 'b' (iteration order is not guaranteed)
     */
    var forOwn = createForOwn(baseForOwn);

    /**
     * This method is like `_.forOwn` except that it iterates over properties of
     * `object` in the opposite order.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forOwnRight(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => logs 'b' and 'a' assuming `_.forOwn` logs 'a' and 'b'
     */
    var forOwnRight = createForOwn(baseForOwnRight);

    /**
     * Creates an array of function property names from all enumerable properties,
     * own and inherited, of `object`.
     *
     * @static
     * @memberOf _
     * @alias methods
     * @category Object
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns the new array of property names.
     * @example
     *
     * _.functions(_);
     * // => ['after', 'ary', 'assign', ...]
     */
    function functions(object) {
      return baseFunctions(object, keysIn(object));
    }

    /**
     * Gets the property value at `path` of `object`. If the resolved value is
     * `undefined` the `defaultValue` is used in its place.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.get(object, 'a[0].b.c');
     * // => 3
     *
     * _.get(object, ['a', '0', 'b', 'c']);
     * // => 3
     *
     * _.get(object, 'a.b.c', 'default');
     * // => 'default'
     */
    function get(object, path, defaultValue) {
      var result = object == null ? undefined : baseGet(object, toPath(path), path + '');
      return result === undefined ? defaultValue : result;
    }

    /**
     * Checks if `path` is a direct property.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @returns {boolean} Returns `true` if `path` is a direct property, else `false`.
     * @example
     *
     * var object = { 'a': { 'b': { 'c': 3 } } };
     *
     * _.has(object, 'a');
     * // => true
     *
     * _.has(object, 'a.b.c');
     * // => true
     *
     * _.has(object, ['a', 'b', 'c']);
     * // => true
     */
    function has(object, path) {
      if (object == null) {
        return false;
      }
      var result = hasOwnProperty.call(object, path);
      if (!result && !isKey(path)) {
        path = toPath(path);
        object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
        if (object == null) {
          return false;
        }
        path = last(path);
        result = hasOwnProperty.call(object, path);
      }
      return result || (isLength(object.length) && isIndex(path, object.length) &&
        (isArray(object) || isArguments(object)));
    }

    /**
     * Creates an object composed of the inverted keys and values of `object`.
     * If `object` contains duplicate values, subsequent values overwrite property
     * assignments of previous values unless `multiValue` is `true`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to invert.
     * @param {boolean} [multiValue] Allow multiple values per key.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Object} Returns the new inverted object.
     * @example
     *
     * var object = { 'a': 1, 'b': 2, 'c': 1 };
     *
     * _.invert(object);
     * // => { '1': 'c', '2': 'b' }
     *
     * // with `multiValue`
     * _.invert(object, true);
     * // => { '1': ['a', 'c'], '2': ['b'] }
     */
    function invert(object, multiValue, guard) {
      if (guard && isIterateeCall(object, multiValue, guard)) {
        multiValue = null;
      }
      var index = -1,
          props = keys(object),
          length = props.length,
          result = {};

      while (++index < length) {
        var key = props[index],
            value = object[key];

        if (multiValue) {
          if (hasOwnProperty.call(result, value)) {
            result[value].push(key);
          } else {
            result[value] = [key];
          }
        }
        else {
          result[value] = key;
        }
      }
      return result;
    }

    /**
     * Creates an array of the own enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects. See the
     * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.keys)
     * for more details.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keys(new Foo);
     * // => ['a', 'b'] (iteration order is not guaranteed)
     *
     * _.keys('hi');
     * // => ['0', '1']
     */
    var keys = !nativeKeys ? shimKeys : function(object) {
      var Ctor = object == null ? null : object.constructor;
      if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
          (typeof object != 'function' && isArrayLike(object))) {
        return shimKeys(object);
      }
      return isObject(object) ? nativeKeys(object) : [];
    };

    /**
     * Creates an array of the own and inherited enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keysIn(new Foo);
     * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
     */
    function keysIn(object) {
      if (object == null) {
        return [];
      }
      if (!isObject(object)) {
        object = Object(object);
      }
      var length = object.length;
      length = (length && isLength(length) &&
        (isArray(object) || isArguments(object)) && length) || 0;

      var Ctor = object.constructor,
          index = -1,
          isProto = typeof Ctor == 'function' && Ctor.prototype === object,
          result = Array(length),
          skipIndexes = length > 0;

      while (++index < length) {
        result[index] = (index + '');
      }
      for (var key in object) {
        if (!(skipIndexes && isIndex(key, length)) &&
            !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * The opposite of `_.mapValues`; this method creates an object with the
     * same values as `object` and keys generated by running each own enumerable
     * property of `object` through `iteratee`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns the new mapped object.
     * @example
     *
     * _.mapKeys({ 'a': 1, 'b': 2 }, function(value, key) {
     *   return key + value;
     * });
     * // => { 'a1': 1, 'b2': 2 }
     */
    var mapKeys = createObjectMapper(true);

    /**
     * Creates an object with the same keys as `object` and values generated by
     * running each own enumerable property of `object` through `iteratee`. The
     * iteratee function is bound to `thisArg` and invoked with three arguments:
     * (value, key, object).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns the new mapped object.
     * @example
     *
     * _.mapValues({ 'a': 1, 'b': 2 }, function(n) {
     *   return n * 3;
     * });
     * // => { 'a': 3, 'b': 6 }
     *
     * var users = {
     *   'fred':    { 'user': 'fred',    'age': 40 },
     *   'pebbles': { 'user': 'pebbles', 'age': 1 }
     * };
     *
     * // using the `_.property` callback shorthand
     * _.mapValues(users, 'age');
     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
     */
    var mapValues = createObjectMapper();

    /**
     * Recursively merges own enumerable properties of the source object(s), that
     * don't resolve to `undefined` into the destination object. Subsequent sources
     * overwrite property assignments of previous sources. If `customizer` is
     * provided it is invoked to produce the merged values of the destination and
     * source properties. If `customizer` returns `undefined` merging is handled
     * by the method instead. The `customizer` is bound to `thisArg` and invoked
     * with five arguments: (objectValue, sourceValue, key, object, source).
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @param {Function} [customizer] The function to customize assigned values.
     * @param {*} [thisArg] The `this` binding of `customizer`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var users = {
     *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
     * };
     *
     * var ages = {
     *   'data': [{ 'age': 36 }, { 'age': 40 }]
     * };
     *
     * _.merge(users, ages);
     * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
     *
     * // using a customizer callback
     * var object = {
     *   'fruits': ['apple'],
     *   'vegetables': ['beet']
     * };
     *
     * var other = {
     *   'fruits': ['banana'],
     *   'vegetables': ['carrot']
     * };
     *
     * _.merge(object, other, function(a, b) {
     *   if (_.isArray(a)) {
     *     return a.concat(b);
     *   }
     * });
     * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }
     */
    var merge = createAssigner(baseMerge);

    /**
     * The opposite of `_.pick`; this method creates an object composed of the
     * own and inherited enumerable properties of `object` that are not omitted.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The source object.
     * @param {Function|...(string|string[])} [predicate] The function invoked per
     *  iteration or property names to omit, specified as individual property
     *  names or arrays of property names.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'user': 'fred', 'age': 40 };
     *
     * _.omit(object, 'age');
     * // => { 'user': 'fred' }
     *
     * _.omit(object, _.isNumber);
     * // => { 'user': 'fred' }
     */
    var omit = restParam(function(object, props) {
      if (object == null) {
        return {};
      }
      if (typeof props[0] != 'function') {
        var props = arrayMap(baseFlatten(props), String);
        return pickByArray(object, baseDifference(keysIn(object), props));
      }
      var predicate = bindCallback(props[0], props[1], 3);
      return pickByCallback(object, function(value, key, object) {
        return !predicate(value, key, object);
      });
    });

    /**
     * Creates a two dimensional array of the key-value pairs for `object`,
     * e.g. `[[key1, value1], [key2, value2]]`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the new array of key-value pairs.
     * @example
     *
     * _.pairs({ 'barney': 36, 'fred': 40 });
     * // => [['barney', 36], ['fred', 40]] (iteration order is not guaranteed)
     */
    function pairs(object) {
      object = toObject(object);

      var index = -1,
          props = keys(object),
          length = props.length,
          result = Array(length);

      while (++index < length) {
        var key = props[index];
        result[index] = [key, object[key]];
      }
      return result;
    }

    /**
     * Creates an object composed of the picked `object` properties. Property
     * names may be specified as individual arguments or as arrays of property
     * names. If `predicate` is provided it is invoked for each property of `object`
     * picking the properties `predicate` returns truthy for. The predicate is
     * bound to `thisArg` and invoked with three arguments: (value, key, object).
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The source object.
     * @param {Function|...(string|string[])} [predicate] The function invoked per
     *  iteration or property names to pick, specified as individual property
     *  names or arrays of property names.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'user': 'fred', 'age': 40 };
     *
     * _.pick(object, 'user');
     * // => { 'user': 'fred' }
     *
     * _.pick(object, _.isString);
     * // => { 'user': 'fred' }
     */
    var pick = restParam(function(object, props) {
      if (object == null) {
        return {};
      }
      return typeof props[0] == 'function'
        ? pickByCallback(object, bindCallback(props[0], props[1], 3))
        : pickByArray(object, baseFlatten(props));
    });

    /**
     * This method is like `_.get` except that if the resolved value is a function
     * it is invoked with the `this` binding of its parent object and its result
     * is returned.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to resolve.
     * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
     *
     * _.result(object, 'a[0].b.c1');
     * // => 3
     *
     * _.result(object, 'a[0].b.c2');
     * // => 4
     *
     * _.result(object, 'a.b.c', 'default');
     * // => 'default'
     *
     * _.result(object, 'a.b.c', _.constant('default'));
     * // => 'default'
     */
    function result(object, path, defaultValue) {
      var result = object == null ? undefined : object[path];
      if (result === undefined) {
        if (object != null && !isKey(path, object)) {
          path = toPath(path);
          object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
          result = object == null ? undefined : object[last(path)];
        }
        result = result === undefined ? defaultValue : result;
      }
      return isFunction(result) ? result.call(object) : result;
    }

    /**
     * Sets the property value of `path` on `object`. If a portion of `path`
     * does not exist it is created.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to augment.
     * @param {Array|string} path The path of the property to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.set(object, 'a[0].b.c', 4);
     * console.log(object.a[0].b.c);
     * // => 4
     *
     * _.set(object, 'x[0].y.z', 5);
     * console.log(object.x[0].y.z);
     * // => 5
     */
    function set(object, path, value) {
      if (object == null) {
        return object;
      }
      var pathKey = (path + '');
      path = (object[pathKey] != null || isKey(path, object)) ? [pathKey] : toPath(path);

      var index = -1,
          length = path.length,
          lastIndex = length - 1,
          nested = object;

      while (nested != null && ++index < length) {
        var key = path[index];
        if (isObject(nested)) {
          if (index == lastIndex) {
            nested[key] = value;
          } else if (nested[key] == null) {
            nested[key] = isIndex(path[index + 1]) ? [] : {};
          }
        }
        nested = nested[key];
      }
      return object;
    }

    /**
     * An alternative to `_.reduce`; this method transforms `object` to a new
     * `accumulator` object which is the result of running each of its own enumerable
     * properties through `iteratee`, with each invocation potentially mutating
     * the `accumulator` object. The `iteratee` is bound to `thisArg` and invoked
     * with four arguments: (accumulator, value, key, object). Iteratee functions
     * may exit iteration early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Array|Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The custom accumulator value.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {*} Returns the accumulated value.
     * @example
     *
     * _.transform([2, 3, 4], function(result, n) {
     *   result.push(n *= n);
     *   return n % 2 == 0;
     * });
     * // => [4, 9]
     *
     * _.transform({ 'a': 1, 'b': 2 }, function(result, n, key) {
     *   result[key] = n * 3;
     * });
     * // => { 'a': 3, 'b': 6 }
     */
    function transform(object, iteratee, accumulator, thisArg) {
      var isArr = isArray(object) || isTypedArray(object);
      iteratee = getCallback(iteratee, thisArg, 4);

      if (accumulator == null) {
        if (isArr || isObject(object)) {
          var Ctor = object.constructor;
          if (isArr) {
            accumulator = isArray(object) ? new Ctor : [];
          } else {
            accumulator = baseCreate(isFunction(Ctor) ? Ctor.prototype : null);
          }
        } else {
          accumulator = {};
        }
      }
      (isArr ? arrayEach : baseForOwn)(object, function(value, index, object) {
        return iteratee(accumulator, value, index, object);
      });
      return accumulator;
    }

    /**
     * Creates an array of the own enumerable property values of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property values.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.values(new Foo);
     * // => [1, 2] (iteration order is not guaranteed)
     *
     * _.values('hi');
     * // => ['h', 'i']
     */
    function values(object) {
      return baseValues(object, keys(object));
    }

    /**
     * Creates an array of the own and inherited enumerable property values
     * of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property values.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.valuesIn(new Foo);
     * // => [1, 2, 3] (iteration order is not guaranteed)
     */
    function valuesIn(object) {
      return baseValues(object, keysIn(object));
    }

    /*------------------------------------------------------------------------*/

    /**
     * Checks if `n` is between `start` and up to but not including, `end`. If
     * `end` is not specified it is set to `start` with `start` then set to `0`.
     *
     * @static
     * @memberOf _
     * @category Number
     * @param {number} n The number to check.
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @returns {boolean} Returns `true` if `n` is in the range, else `false`.
     * @example
     *
     * _.inRange(3, 2, 4);
     * // => true
     *
     * _.inRange(4, 8);
     * // => true
     *
     * _.inRange(4, 2);
     * // => false
     *
     * _.inRange(2, 2);
     * // => false
     *
     * _.inRange(1.2, 2);
     * // => true
     *
     * _.inRange(5.2, 4);
     * // => false
     */
    function inRange(value, start, end) {
      start = +start || 0;
      if (typeof end === 'undefined') {
        end = start;
        start = 0;
      } else {
        end = +end || 0;
      }
      return value >= nativeMin(start, end) && value < nativeMax(start, end);
    }

    /**
     * Produces a random number between `min` and `max` (inclusive). If only one
     * argument is provided a number between `0` and the given number is returned.
     * If `floating` is `true`, or either `min` or `max` are floats, a floating-point
     * number is returned instead of an integer.
     *
     * @static
     * @memberOf _
     * @category Number
     * @param {number} [min=0] The minimum possible value.
     * @param {number} [max=1] The maximum possible value.
     * @param {boolean} [floating] Specify returning a floating-point number.
     * @returns {number} Returns the random number.
     * @example
     *
     * _.random(0, 5);
     * // => an integer between 0 and 5
     *
     * _.random(5);
     * // => also an integer between 0 and 5
     *
     * _.random(5, true);
     * // => a floating-point number between 0 and 5
     *
     * _.random(1.2, 5.2);
     * // => a floating-point number between 1.2 and 5.2
     */
    function random(min, max, floating) {
      if (floating && isIterateeCall(min, max, floating)) {
        max = floating = null;
      }
      var noMin = min == null,
          noMax = max == null;

      if (floating == null) {
        if (noMax && typeof min == 'boolean') {
          floating = min;
          min = 1;
        }
        else if (typeof max == 'boolean') {
          floating = max;
          noMax = true;
        }
      }
      if (noMin && noMax) {
        max = 1;
        noMax = false;
      }
      min = +min || 0;
      if (noMax) {
        max = min;
        min = 0;
      } else {
        max = +max || 0;
      }
      if (floating || min % 1 || max % 1) {
        var rand = nativeRandom();
        return nativeMin(min + (rand * (max - min + parseFloat('1e-' + ((rand + '').length - 1)))), max);
      }
      return baseRandom(min, max);
    }

    /*------------------------------------------------------------------------*/

    /**
     * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the camel cased string.
     * @example
     *
     * _.camelCase('Foo Bar');
     * // => 'fooBar'
     *
     * _.camelCase('--foo-bar');
     * // => 'fooBar'
     *
     * _.camelCase('__foo_bar__');
     * // => 'fooBar'
     */
    var camelCase = createCompounder(function(result, word, index) {
      word = word.toLowerCase();
      return result + (index ? (word.charAt(0).toUpperCase() + word.slice(1)) : word);
    });

    /**
     * Capitalizes the first character of `string`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to capitalize.
     * @returns {string} Returns the capitalized string.
     * @example
     *
     * _.capitalize('fred');
     * // => 'Fred'
     */
    function capitalize(string) {
      string = baseToString(string);
      return string && (string.charAt(0).toUpperCase() + string.slice(1));
    }

    /**
     * Deburrs `string` by converting [latin-1 supplementary letters](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
     * to basic latin letters and removing [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to deburr.
     * @returns {string} Returns the deburred string.
     * @example
     *
     * _.deburr('déjà vu');
     * // => 'deja vu'
     */
    function deburr(string) {
      string = baseToString(string);
      return string && string.replace(reLatin1, deburrLetter).replace(reComboMark, '');
    }

    /**
     * Checks if `string` ends with the given target string.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to search.
     * @param {string} [target] The string to search for.
     * @param {number} [position=string.length] The position to search from.
     * @returns {boolean} Returns `true` if `string` ends with `target`, else `false`.
     * @example
     *
     * _.endsWith('abc', 'c');
     * // => true
     *
     * _.endsWith('abc', 'b');
     * // => false
     *
     * _.endsWith('abc', 'b', 2);
     * // => true
     */
    function endsWith(string, target, position) {
      string = baseToString(string);
      target = (target + '');

      var length = string.length;
      position = position === undefined
        ? length
        : nativeMin(position < 0 ? 0 : (+position || 0), length);

      position -= target.length;
      return position >= 0 && string.indexOf(target, position) == position;
    }

    /**
     * Converts the characters "&", "<", ">", '"', "'", and "\`", in `string` to
     * their corresponding HTML entities.
     *
     * **Note:** No other characters are escaped. To escape additional characters
     * use a third-party library like [_he_](https://mths.be/he).
     *
     * Though the ">" character is escaped for symmetry, characters like
     * ">" and "/" don't need escaping in HTML and have no special meaning
     * unless they're part of a tag or unquoted attribute value.
     * See [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
     * (under "semi-related fun fact") for more details.
     *
     * Backticks are escaped because in Internet Explorer < 9, they can break out
     * of attribute values or HTML comments. See [#59](https://html5sec.org/#59),
     * [#102](https://html5sec.org/#102), [#108](https://html5sec.org/#108), and
     * [#133](https://html5sec.org/#133) of the [HTML5 Security Cheatsheet](https://html5sec.org/)
     * for more details.
     *
     * When working with HTML you should always [quote attribute values](http://wonko.com/post/html-escaping)
     * to reduce XSS vectors.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to escape.
     * @returns {string} Returns the escaped string.
     * @example
     *
     * _.escape('fred, barney, & pebbles');
     * // => 'fred, barney, &amp; pebbles'
     */
    function escape(string) {
      // Reset `lastIndex` because in IE < 9 `String#replace` does not.
      string = baseToString(string);
      return (string && reHasUnescapedHtml.test(string))
        ? string.replace(reUnescapedHtml, escapeHtmlChar)
        : string;
    }

    /**
     * Escapes the `RegExp` special characters "\", "/", "^", "$", ".", "|", "?",
     * "*", "+", "(", ")", "[", "]", "{" and "}" in `string`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to escape.
     * @returns {string} Returns the escaped string.
     * @example
     *
     * _.escapeRegExp('[lodash](https://lodash.com/)');
     * // => '\[lodash\]\(https:\/\/lodash\.com\/\)'
     */
    function escapeRegExp(string) {
      string = baseToString(string);
      return (string && reHasRegExpChars.test(string))
        ? string.replace(reRegExpChars, '\\$&')
        : string;
    }

    /**
     * Converts `string` to [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the kebab cased string.
     * @example
     *
     * _.kebabCase('Foo Bar');
     * // => 'foo-bar'
     *
     * _.kebabCase('fooBar');
     * // => 'foo-bar'
     *
     * _.kebabCase('__foo_bar__');
     * // => 'foo-bar'
     */
    var kebabCase = createCompounder(function(result, word, index) {
      return result + (index ? '-' : '') + word.toLowerCase();
    });

    /**
     * Pads `string` on the left and right sides if it's shorter than `length`.
     * Padding characters are truncated if they can't be evenly divided by `length`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.pad('abc', 8);
     * // => '  abc   '
     *
     * _.pad('abc', 8, '_-');
     * // => '_-abc_-_'
     *
     * _.pad('abc', 3);
     * // => 'abc'
     */
    function pad(string, length, chars) {
      string = baseToString(string);
      length = +length;

      var strLength = string.length;
      if (strLength >= length || !nativeIsFinite(length)) {
        return string;
      }
      var mid = (length - strLength) / 2,
          leftLength = floor(mid),
          rightLength = ceil(mid);

      chars = createPadding('', rightLength, chars);
      return chars.slice(0, leftLength) + string + chars;
    }

    /**
     * Pads `string` on the left side if it's shorter than `length`. Padding
     * characters are truncated if they exceed `length`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.padLeft('abc', 6);
     * // => '   abc'
     *
     * _.padLeft('abc', 6, '_-');
     * // => '_-_abc'
     *
     * _.padLeft('abc', 3);
     * // => 'abc'
     */
    var padLeft = createPadDir();

    /**
     * Pads `string` on the right side if it's shorter than `length`. Padding
     * characters are truncated if they exceed `length`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.padRight('abc', 6);
     * // => 'abc   '
     *
     * _.padRight('abc', 6, '_-');
     * // => 'abc_-_'
     *
     * _.padRight('abc', 3);
     * // => 'abc'
     */
    var padRight = createPadDir(true);

    /**
     * Converts `string` to an integer of the specified radix. If `radix` is
     * `undefined` or `0`, a `radix` of `10` is used unless `value` is a hexadecimal,
     * in which case a `radix` of `16` is used.
     *
     * **Note:** This method aligns with the [ES5 implementation](https://es5.github.io/#E)
     * of `parseInt`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} string The string to convert.
     * @param {number} [radix] The radix to interpret `value` by.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.parseInt('08');
     * // => 8
     *
     * _.map(['6', '08', '10'], _.parseInt);
     * // => [6, 8, 10]
     */
    function parseInt(string, radix, guard) {
      if (guard && isIterateeCall(string, radix, guard)) {
        radix = 0;
      }
      return nativeParseInt(string, radix);
    }
    // Fallback for environments with pre-ES5 implementations.
    if (nativeParseInt(whitespace + '08') != 8) {
      parseInt = function(string, radix, guard) {
        // Firefox < 21 and Opera < 15 follow ES3 for `parseInt`.
        // Chrome fails to trim leading <BOM> whitespace characters.
        // See https://code.google.com/p/v8/issues/detail?id=3109 for more details.
        if (guard ? isIterateeCall(string, radix, guard) : radix == null) {
          radix = 0;
        } else if (radix) {
          radix = +radix;
        }
        string = trim(string);
        return nativeParseInt(string, radix || (reHasHexPrefix.test(string) ? 16 : 10));
      };
    }

    /**
     * Repeats the given string `n` times.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to repeat.
     * @param {number} [n=0] The number of times to repeat the string.
     * @returns {string} Returns the repeated string.
     * @example
     *
     * _.repeat('*', 3);
     * // => '***'
     *
     * _.repeat('abc', 2);
     * // => 'abcabc'
     *
     * _.repeat('abc', 0);
     * // => ''
     */
    function repeat(string, n) {
      var result = '';
      string = baseToString(string);
      n = +n;
      if (n < 1 || !string || !nativeIsFinite(n)) {
        return result;
      }
      // Leverage the exponentiation by squaring algorithm for a faster repeat.
      // See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.
      do {
        if (n % 2) {
          result += string;
        }
        n = floor(n / 2);
        string += string;
      } while (n);

      return result;
    }

    /**
     * Converts `string` to [snake case](https://en.wikipedia.org/wiki/Snake_case).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the snake cased string.
     * @example
     *
     * _.snakeCase('Foo Bar');
     * // => 'foo_bar'
     *
     * _.snakeCase('fooBar');
     * // => 'foo_bar'
     *
     * _.snakeCase('--foo-bar');
     * // => 'foo_bar'
     */
    var snakeCase = createCompounder(function(result, word, index) {
      return result + (index ? '_' : '') + word.toLowerCase();
    });

    /**
     * Converts `string` to [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the start cased string.
     * @example
     *
     * _.startCase('--foo-bar');
     * // => 'Foo Bar'
     *
     * _.startCase('fooBar');
     * // => 'Foo Bar'
     *
     * _.startCase('__foo_bar__');
     * // => 'Foo Bar'
     */
    var startCase = createCompounder(function(result, word, index) {
      return result + (index ? ' ' : '') + (word.charAt(0).toUpperCase() + word.slice(1));
    });

    /**
     * Checks if `string` starts with the given target string.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to search.
     * @param {string} [target] The string to search for.
     * @param {number} [position=0] The position to search from.
     * @returns {boolean} Returns `true` if `string` starts with `target`, else `false`.
     * @example
     *
     * _.startsWith('abc', 'a');
     * // => true
     *
     * _.startsWith('abc', 'b');
     * // => false
     *
     * _.startsWith('abc', 'b', 1);
     * // => true
     */
    function startsWith(string, target, position) {
      string = baseToString(string);
      position = position == null
        ? 0
        : nativeMin(position < 0 ? 0 : (+position || 0), string.length);

      return string.lastIndexOf(target, position) == position;
    }

    /**
     * Creates a compiled template function that can interpolate data properties
     * in "interpolate" delimiters, HTML-escape interpolated data properties in
     * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
     * properties may be accessed as free variables in the template. If a setting
     * object is provided it takes precedence over `_.templateSettings` values.
     *
     * **Note:** In the development build `_.template` utilizes
     * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
     * for easier debugging.
     *
     * For more information on precompiling templates see
     * [lodash's custom builds documentation](https://lodash.com/custom-builds).
     *
     * For more information on Chrome extension sandboxes see
     * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The template string.
     * @param {Object} [options] The options object.
     * @param {RegExp} [options.escape] The HTML "escape" delimiter.
     * @param {RegExp} [options.evaluate] The "evaluate" delimiter.
     * @param {Object} [options.imports] An object to import into the template as free variables.
     * @param {RegExp} [options.interpolate] The "interpolate" delimiter.
     * @param {string} [options.sourceURL] The sourceURL of the template's compiled source.
     * @param {string} [options.variable] The data object variable name.
     * @param- {Object} [otherOptions] Enables the legacy `options` param signature.
     * @returns {Function} Returns the compiled template function.
     * @example
     *
     * // using the "interpolate" delimiter to create a compiled template
     * var compiled = _.template('hello <%= user %>!');
     * compiled({ 'user': 'fred' });
     * // => 'hello fred!'
     *
     * // using the HTML "escape" delimiter to escape data property values
     * var compiled = _.template('<b><%- value %></b>');
     * compiled({ 'value': '<script>' });
     * // => '<b>&lt;script&gt;</b>'
     *
     * // using the "evaluate" delimiter to execute JavaScript and generate HTML
     * var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
     * compiled({ 'users': ['fred', 'barney'] });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // using the internal `print` function in "evaluate" delimiters
     * var compiled = _.template('<% print("hello " + user); %>!');
     * compiled({ 'user': 'barney' });
     * // => 'hello barney!'
     *
     * // using the ES delimiter as an alternative to the default "interpolate" delimiter
     * var compiled = _.template('hello ${ user }!');
     * compiled({ 'user': 'pebbles' });
     * // => 'hello pebbles!'
     *
     * // using custom template delimiters
     * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
     * var compiled = _.template('hello {{ user }}!');
     * compiled({ 'user': 'mustache' });
     * // => 'hello mustache!'
     *
     * // using backslashes to treat delimiters as plain text
     * var compiled = _.template('<%= "\\<%- value %\\>" %>');
     * compiled({ 'value': 'ignored' });
     * // => '<%- value %>'
     *
     * // using the `imports` option to import `jQuery` as `jq`
     * var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
     * var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
     * compiled({ 'users': ['fred', 'barney'] });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // using the `sourceURL` option to specify a custom sourceURL for the template
     * var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
     * compiled(data);
     * // => find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector
     *
     * // using the `variable` option to ensure a with-statement isn't used in the compiled template
     * var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
     * compiled.source;
     * // => function(data) {
     * //   var __t, __p = '';
     * //   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
     * //   return __p;
     * // }
     *
     * // using the `source` property to inline compiled templates for meaningful
     * // line numbers in error messages and a stack trace
     * fs.writeFileSync(path.join(cwd, 'jst.js'), '\
     *   var JST = {\
     *     "main": ' + _.template(mainText).source + '\
     *   };\
     * ');
     */
    function template(string, options, otherOptions) {
      // Based on John Resig's `tmpl` implementation (http://ejohn.org/blog/javascript-micro-templating/)
      // and Laura Doktorova's doT.js (https://github.com/olado/doT).
      var settings = lodash.templateSettings;

      if (otherOptions && isIterateeCall(string, options, otherOptions)) {
        options = otherOptions = null;
      }
      string = baseToString(string);
      options = assignWith(baseAssign({}, otherOptions || options), settings, assignOwnDefaults);

      var imports = assignWith(baseAssign({}, options.imports), settings.imports, assignOwnDefaults),
          importsKeys = keys(imports),
          importsValues = baseValues(imports, importsKeys);

      var isEscaping,
          isEvaluating,
          index = 0,
          interpolate = options.interpolate || reNoMatch,
          source = "__p += '";

      // Compile the regexp to match each delimiter.
      var reDelimiters = RegExp(
        (options.escape || reNoMatch).source + '|' +
        interpolate.source + '|' +
        (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
        (options.evaluate || reNoMatch).source + '|$'
      , 'g');

      // Use a sourceURL for easier debugging.
      var sourceURL = '//# sourceURL=' +
        ('sourceURL' in options
          ? options.sourceURL
          : ('lodash.templateSources[' + (++templateCounter) + ']')
        ) + '\n';

      string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
        interpolateValue || (interpolateValue = esTemplateValue);

        // Escape characters that can't be included in string literals.
        source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);

        // Replace delimiters with snippets.
        if (escapeValue) {
          isEscaping = true;
          source += "' +\n__e(" + escapeValue + ") +\n'";
        }
        if (evaluateValue) {
          isEvaluating = true;
          source += "';\n" + evaluateValue + ";\n__p += '";
        }
        if (interpolateValue) {
          source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
        }
        index = offset + match.length;

        // The JS engine embedded in Adobe products requires returning the `match`
        // string in order to produce the correct `offset` value.
        return match;
      });

      source += "';\n";

      // If `variable` is not specified wrap a with-statement around the generated
      // code to add the data object to the top of the scope chain.
      var variable = options.variable;
      if (!variable) {
        source = 'with (obj) {\n' + source + '\n}\n';
      }
      // Cleanup code by stripping empty strings.
      source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
        .replace(reEmptyStringMiddle, '$1')
        .replace(reEmptyStringTrailing, '$1;');

      // Frame code as the function body.
      source = 'function(' + (variable || 'obj') + ') {\n' +
        (variable
          ? ''
          : 'obj || (obj = {});\n'
        ) +
        "var __t, __p = ''" +
        (isEscaping
           ? ', __e = _.escape'
           : ''
        ) +
        (isEvaluating
          ? ', __j = Array.prototype.join;\n' +
            "function print() { __p += __j.call(arguments, '') }\n"
          : ';\n'
        ) +
        source +
        'return __p\n}';

      var result = attempt(function() {
        return Function(importsKeys, sourceURL + 'return ' + source).apply(undefined, importsValues);
      });

      // Provide the compiled function's source by its `toString` method or
      // the `source` property as a convenience for inlining compiled templates.
      result.source = source;
      if (isError(result)) {
        throw result;
      }
      return result;
    }

    /**
     * Removes leading and trailing whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trim('  abc  ');
     * // => 'abc'
     *
     * _.trim('-_-abc-_-', '_-');
     * // => 'abc'
     *
     * _.map(['  foo  ', '  bar  '], _.trim);
     * // => ['foo', 'bar']
     */
    function trim(string, chars, guard) {
      var value = string;
      string = baseToString(string);
      if (!string) {
        return string;
      }
      if (guard ? isIterateeCall(value, chars, guard) : chars == null) {
        return string.slice(trimmedLeftIndex(string), trimmedRightIndex(string) + 1);
      }
      chars = (chars + '');
      return string.slice(charsLeftIndex(string, chars), charsRightIndex(string, chars) + 1);
    }

    /**
     * Removes leading whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trimLeft('  abc  ');
     * // => 'abc  '
     *
     * _.trimLeft('-_-abc-_-', '_-');
     * // => 'abc-_-'
     */
    function trimLeft(string, chars, guard) {
      var value = string;
      string = baseToString(string);
      if (!string) {
        return string;
      }
      if (guard ? isIterateeCall(value, chars, guard) : chars == null) {
        return string.slice(trimmedLeftIndex(string));
      }
      return string.slice(charsLeftIndex(string, (chars + '')));
    }

    /**
     * Removes trailing whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trimRight('  abc  ');
     * // => '  abc'
     *
     * _.trimRight('-_-abc-_-', '_-');
     * // => '-_-abc'
     */
    function trimRight(string, chars, guard) {
      var value = string;
      string = baseToString(string);
      if (!string) {
        return string;
      }
      if (guard ? isIterateeCall(value, chars, guard) : chars == null) {
        return string.slice(0, trimmedRightIndex(string) + 1);
      }
      return string.slice(0, charsRightIndex(string, (chars + '')) + 1);
    }

    /**
     * Truncates `string` if it's longer than the given maximum string length.
     * The last characters of the truncated string are replaced with the omission
     * string which defaults to "...".
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to truncate.
     * @param {Object|number} [options] The options object or maximum string length.
     * @param {number} [options.length=30] The maximum string length.
     * @param {string} [options.omission='...'] The string to indicate text is omitted.
     * @param {RegExp|string} [options.separator] The separator pattern to truncate to.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {string} Returns the truncated string.
     * @example
     *
     * _.trunc('hi-diddly-ho there, neighborino');
     * // => 'hi-diddly-ho there, neighbo...'
     *
     * _.trunc('hi-diddly-ho there, neighborino', 24);
     * // => 'hi-diddly-ho there, n...'
     *
     * _.trunc('hi-diddly-ho there, neighborino', {
     *   'length': 24,
     *   'separator': ' '
     * });
     * // => 'hi-diddly-ho there,...'
     *
     * _.trunc('hi-diddly-ho there, neighborino', {
     *   'length': 24,
     *   'separator': /,? +/
     * });
     * // => 'hi-diddly-ho there...'
     *
     * _.trunc('hi-diddly-ho there, neighborino', {
     *   'omission': ' [...]'
     * });
     * // => 'hi-diddly-ho there, neig [...]'
     */
    function trunc(string, options, guard) {
      if (guard && isIterateeCall(string, options, guard)) {
        options = null;
      }
      var length = DEFAULT_TRUNC_LENGTH,
          omission = DEFAULT_TRUNC_OMISSION;

      if (options != null) {
        if (isObject(options)) {
          var separator = 'separator' in options ? options.separator : separator;
          length = 'length' in options ? (+options.length || 0) : length;
          omission = 'omission' in options ? baseToString(options.omission) : omission;
        } else {
          length = +options || 0;
        }
      }
      string = baseToString(string);
      if (length >= string.length) {
        return string;
      }
      var end = length - omission.length;
      if (end < 1) {
        return omission;
      }
      var result = string.slice(0, end);
      if (separator == null) {
        return result + omission;
      }
      if (isRegExp(separator)) {
        if (string.slice(end).search(separator)) {
          var match,
              newEnd,
              substring = string.slice(0, end);

          if (!separator.global) {
            separator = RegExp(separator.source, (reFlags.exec(separator) || '') + 'g');
          }
          separator.lastIndex = 0;
          while ((match = separator.exec(substring))) {
            newEnd = match.index;
          }
          result = result.slice(0, newEnd == null ? end : newEnd);
        }
      } else if (string.indexOf(separator, end) != end) {
        var index = result.lastIndexOf(separator);
        if (index > -1) {
          result = result.slice(0, index);
        }
      }
      return result + omission;
    }

    /**
     * The inverse of `_.escape`; this method converts the HTML entities
     * `&amp;`, `&lt;`, `&gt;`, `&quot;`, `&#39;`, and `&#96;` in `string` to their
     * corresponding characters.
     *
     * **Note:** No other HTML entities are unescaped. To unescape additional HTML
     * entities use a third-party library like [_he_](https://mths.be/he).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to unescape.
     * @returns {string} Returns the unescaped string.
     * @example
     *
     * _.unescape('fred, barney, &amp; pebbles');
     * // => 'fred, barney, & pebbles'
     */
    function unescape(string) {
      string = baseToString(string);
      return (string && reHasEscapedHtml.test(string))
        ? string.replace(reEscapedHtml, unescapeHtmlChar)
        : string;
    }

    /**
     * Splits `string` into an array of its words.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to inspect.
     * @param {RegExp|string} [pattern] The pattern to match words.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Array} Returns the words of `string`.
     * @example
     *
     * _.words('fred, barney, & pebbles');
     * // => ['fred', 'barney', 'pebbles']
     *
     * _.words('fred, barney, & pebbles', /[^, ]+/g);
     * // => ['fred', 'barney', '&', 'pebbles']
     */
    function words(string, pattern, guard) {
      if (guard && isIterateeCall(string, pattern, guard)) {
        pattern = null;
      }
      string = baseToString(string);
      return string.match(pattern || reWords) || [];
    }

    /*------------------------------------------------------------------------*/

    /**
     * Attempts to invoke `func`, returning either the result or the caught error
     * object. Any additional arguments are provided to `func` when it is invoked.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Function} func The function to attempt.
     * @returns {*} Returns the `func` result or error object.
     * @example
     *
     * // avoid throwing errors for invalid selectors
     * var elements = _.attempt(function(selector) {
     *   return document.querySelectorAll(selector);
     * }, '>_>');
     *
     * if (_.isError(elements)) {
     *   elements = [];
     * }
     */
    var attempt = restParam(function(func, args) {
      try {
        return func.apply(undefined, args);
      } catch(e) {
        return isError(e) ? e : new Error(e);
      }
    });

    /**
     * Creates a function that invokes `func` with the `this` binding of `thisArg`
     * and arguments of the created function. If `func` is a property name the
     * created callback returns the property value for a given element. If `func`
     * is an object the created callback returns `true` for elements that contain
     * the equivalent object properties, otherwise it returns `false`.
     *
     * @static
     * @memberOf _
     * @alias iteratee
     * @category Utility
     * @param {*} [func=_.identity] The value to convert to a callback.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Function} Returns the callback.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 }
     * ];
     *
     * // wrap to create custom callback shorthands
     * _.callback = _.wrap(_.callback, function(callback, func, thisArg) {
     *   var match = /^(.+?)__([gl]t)(.+)$/.exec(func);
     *   if (!match) {
     *     return callback(func, thisArg);
     *   }
     *   return function(object) {
     *     return match[2] == 'gt'
     *       ? object[match[1]] > match[3]
     *       : object[match[1]] < match[3];
     *   };
     * });
     *
     * _.filter(users, 'age__gt36');
     * // => [{ 'user': 'fred', 'age': 40 }]
     */
    function callback(func, thisArg, guard) {
      if (guard && isIterateeCall(func, thisArg, guard)) {
        thisArg = null;
      }
      return isObjectLike(func)
        ? matches(func)
        : baseCallback(func, thisArg);
    }

    /**
     * Creates a function that returns `value`.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {*} value The value to return from the new function.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var object = { 'user': 'fred' };
     * var getter = _.constant(object);
     *
     * getter() === object;
     * // => true
     */
    function constant(value) {
      return function() {
        return value;
      };
    }

    /**
     * This method returns the first argument provided to it.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {*} value Any value.
     * @returns {*} Returns `value`.
     * @example
     *
     * var object = { 'user': 'fred' };
     *
     * _.identity(object) === object;
     * // => true
     */
    function identity(value) {
      return value;
    }

    /**
     * Creates a function that performs a deep comparison between a given object
     * and `source`, returning `true` if the given object has equivalent property
     * values, else `false`.
     *
     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
     * numbers, `Object` objects, regexes, and strings. Objects are compared by
     * their own, not inherited, enumerable properties. For comparing a single
     * own or inherited property value see `_.matchesProperty`.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Object} source The object of property values to match.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': true },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * _.filter(users, _.matches({ 'age': 40, 'active': false }));
     * // => [{ 'user': 'fred', 'age': 40, 'active': false }]
     */
    function matches(source) {
      return baseMatches(baseClone(source, true));
    }

    /**
     * Creates a function that compares the property value of `path` on a given
     * object to `value`.
     *
     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
     * numbers, `Object` objects, regexes, and strings. Objects are compared by
     * their own, not inherited, enumerable properties.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Array|string} path The path of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var users = [
     *   { 'user': 'barney' },
     *   { 'user': 'fred' }
     * ];
     *
     * _.find(users, _.matchesProperty('user', 'fred'));
     * // => { 'user': 'fred' }
     */
    function matchesProperty(path, srcValue) {
      return baseMatchesProperty(path, baseClone(srcValue, true));
    }

    /**
     * Creates a function that invokes the method at `path` on a given object.
     * Any additional arguments are provided to the invoked method.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Array|string} path The path of the method to invoke.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var objects = [
     *   { 'a': { 'b': { 'c': _.constant(2) } } },
     *   { 'a': { 'b': { 'c': _.constant(1) } } }
     * ];
     *
     * _.map(objects, _.method('a.b.c'));
     * // => [2, 1]
     *
     * _.invoke(_.sortBy(objects, _.method(['a', 'b', 'c'])), 'a.b.c');
     * // => [1, 2]
     */
    var method = restParam(function(path, args) {
      return function(object) {
        return invokePath(object, path, args);
      };
    });

    /**
     * The opposite of `_.method`; this method creates a function that invokes
     * the method at a given path on `object`. Any additional arguments are
     * provided to the invoked method.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Object} object The object to query.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var array = _.times(3, _.constant),
     *     object = { 'a': array, 'b': array, 'c': array };
     *
     * _.map(['a[2]', 'c[0]'], _.methodOf(object));
     * // => [2, 0]
     *
     * _.map([['a', '2'], ['c', '0']], _.methodOf(object));
     * // => [2, 0]
     */
    var methodOf = restParam(function(object, args) {
      return function(path) {
        return invokePath(object, path, args);
      };
    });

    /**
     * Adds all own enumerable function properties of a source object to the
     * destination object. If `object` is a function then methods are added to
     * its prototype as well.
     *
     * **Note:** Use `_.runInContext` to create a pristine `lodash` function to
     * avoid conflicts caused by modifying the original.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Function|Object} [object=lodash] The destination object.
     * @param {Object} source The object of functions to add.
     * @param {Object} [options] The options object.
     * @param {boolean} [options.chain=true] Specify whether the functions added
     *  are chainable.
     * @returns {Function|Object} Returns `object`.
     * @example
     *
     * function vowels(string) {
     *   return _.filter(string, function(v) {
     *     return /[aeiou]/i.test(v);
     *   });
     * }
     *
     * _.mixin({ 'vowels': vowels });
     * _.vowels('fred');
     * // => ['e']
     *
     * _('fred').vowels().value();
     * // => ['e']
     *
     * _.mixin({ 'vowels': vowels }, { 'chain': false });
     * _('fred').vowels();
     * // => ['e']
     */
    function mixin(object, source, options) {
      if (options == null) {
        var isObj = isObject(source),
            props = isObj ? keys(source) : null,
            methodNames = (props && props.length) ? baseFunctions(source, props) : null;

        if (!(methodNames ? methodNames.length : isObj)) {
          methodNames = false;
          options = source;
          source = object;
          object = this;
        }
      }
      if (!methodNames) {
        methodNames = baseFunctions(source, keys(source));
      }
      var chain = true,
          index = -1,
          isFunc = isFunction(object),
          length = methodNames.length;

      if (options === false) {
        chain = false;
      } else if (isObject(options) && 'chain' in options) {
        chain = options.chain;
      }
      while (++index < length) {
        var methodName = methodNames[index],
            func = source[methodName];

        object[methodName] = func;
        if (isFunc) {
          object.prototype[methodName] = (function(func) {
            return function() {
              var chainAll = this.__chain__;
              if (chain || chainAll) {
                var result = object(this.__wrapped__),
                    actions = result.__actions__ = arrayCopy(this.__actions__);

                actions.push({ 'func': func, 'args': arguments, 'thisArg': object });
                result.__chain__ = chainAll;
                return result;
              }
              var args = [this.value()];
              push.apply(args, arguments);
              return func.apply(object, args);
            };
          }(func));
        }
      }
      return object;
    }

    /**
     * Reverts the `_` variable to its previous value and returns a reference to
     * the `lodash` function.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @returns {Function} Returns the `lodash` function.
     * @example
     *
     * var lodash = _.noConflict();
     */
    function noConflict() {
      context._ = oldDash;
      return this;
    }

    /**
     * A no-operation function that returns `undefined` regardless of the
     * arguments it receives.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @example
     *
     * var object = { 'user': 'fred' };
     *
     * _.noop(object) === undefined;
     * // => true
     */
    function noop() {
      // No operation performed.
    }

    /**
     * Creates a function that returns the property value at `path` on a
     * given object.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var objects = [
     *   { 'a': { 'b': { 'c': 2 } } },
     *   { 'a': { 'b': { 'c': 1 } } }
     * ];
     *
     * _.map(objects, _.property('a.b.c'));
     * // => [2, 1]
     *
     * _.pluck(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
     * // => [1, 2]
     */
    function property(path) {
      return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
    }

    /**
     * The opposite of `_.property`; this method creates a function that returns
     * the property value at a given path on `object`.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Object} object The object to query.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var array = [0, 1, 2],
     *     object = { 'a': array, 'b': array, 'c': array };
     *
     * _.map(['a[2]', 'c[0]'], _.propertyOf(object));
     * // => [2, 0]
     *
     * _.map([['a', '2'], ['c', '0']], _.propertyOf(object));
     * // => [2, 0]
     */
    function propertyOf(object) {
      return function(path) {
        return baseGet(object, toPath(path), path + '');
      };
    }

    /**
     * Creates an array of numbers (positive and/or negative) progressing from
     * `start` up to, but not including, `end`. If `end` is not specified it is
     * set to `start` with `start` then set to `0`. If `end` is less than `start`
     * a zero-length range is created unless a negative `step` is specified.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @param {number} [step=1] The value to increment or decrement by.
     * @returns {Array} Returns the new array of numbers.
     * @example
     *
     * _.range(4);
     * // => [0, 1, 2, 3]
     *
     * _.range(1, 5);
     * // => [1, 2, 3, 4]
     *
     * _.range(0, 20, 5);
     * // => [0, 5, 10, 15]
     *
     * _.range(0, -4, -1);
     * // => [0, -1, -2, -3]
     *
     * _.range(1, 4, 0);
     * // => [1, 1, 1]
     *
     * _.range(0);
     * // => []
     */
    function range(start, end, step) {
      if (step && isIterateeCall(start, end, step)) {
        end = step = null;
      }
      start = +start || 0;
      step = step == null ? 1 : (+step || 0);

      if (end == null) {
        end = start;
        start = 0;
      } else {
        end = +end || 0;
      }
      // Use `Array(length)` so engines like Chakra and V8 avoid slower modes.
      // See https://youtu.be/XAqIpGU8ZZk#t=17m25s for more details.
      var index = -1,
          length = nativeMax(ceil((end - start) / (step || 1)), 0),
          result = Array(length);

      while (++index < length) {
        result[index] = start;
        start += step;
      }
      return result;
    }

    /**
     * Invokes the iteratee function `n` times, returning an array of the results
     * of each invocation. The `iteratee` is bound to `thisArg` and invoked with
     * one argument; (index).
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {number} n The number of times to invoke `iteratee`.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array} Returns the array of results.
     * @example
     *
     * var diceRolls = _.times(3, _.partial(_.random, 1, 6, false));
     * // => [3, 6, 4]
     *
     * _.times(3, function(n) {
     *   mage.castSpell(n);
     * });
     * // => invokes `mage.castSpell(n)` three times with `n` of `0`, `1`, and `2`
     *
     * _.times(3, function(n) {
     *   this.cast(n);
     * }, mage);
     * // => also invokes `mage.castSpell(n)` three times
     */
    function times(n, iteratee, thisArg) {
      n = floor(n);

      // Exit early to avoid a JSC JIT bug in Safari 8
      // where `Array(0)` is treated as `Array(1)`.
      if (n < 1 || !nativeIsFinite(n)) {
        return [];
      }
      var index = -1,
          result = Array(nativeMin(n, MAX_ARRAY_LENGTH));

      iteratee = bindCallback(iteratee, thisArg, 1);
      while (++index < n) {
        if (index < MAX_ARRAY_LENGTH) {
          result[index] = iteratee(index);
        } else {
          iteratee(index);
        }
      }
      return result;
    }

    /**
     * Generates a unique ID. If `prefix` is provided the ID is appended to it.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {string} [prefix] The value to prefix the ID with.
     * @returns {string} Returns the unique ID.
     * @example
     *
     * _.uniqueId('contact_');
     * // => 'contact_104'
     *
     * _.uniqueId();
     * // => '105'
     */
    function uniqueId(prefix) {
      var id = ++idCounter;
      return baseToString(prefix) + id;
    }

    /*------------------------------------------------------------------------*/

    /**
     * Adds two numbers.
     *
     * @static
     * @memberOf _
     * @category Math
     * @param {number} augend The first number to add.
     * @param {number} addend The second number to add.
     * @returns {number} Returns the sum.
     * @example
     *
     * _.add(6, 4);
     * // => 10
     */
    function add(augend, addend) {
      return (+augend || 0) + (+addend || 0);
    }

    /**
     * Gets the maximum value of `collection`. If `collection` is empty or falsey
     * `-Infinity` is returned. If an iteratee function is provided it is invoked
     * for each value in `collection` to generate the criterion by which the value
     * is ranked. The `iteratee` is bound to `thisArg` and invoked with three
     * arguments: (value, index, collection).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Math
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {*} Returns the maximum value.
     * @example
     *
     * _.max([4, 2, 8, 6]);
     * // => 8
     *
     * _.max([]);
     * // => -Infinity
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 }
     * ];
     *
     * _.max(users, function(chr) {
     *   return chr.age;
     * });
     * // => { 'user': 'fred', 'age': 40 }
     *
     * // using the `_.property` callback shorthand
     * _.max(users, 'age');
     * // => { 'user': 'fred', 'age': 40 }
     */
    var max = createExtremum(gt, NEGATIVE_INFINITY);

    /**
     * Gets the minimum value of `collection`. If `collection` is empty or falsey
     * `Infinity` is returned. If an iteratee function is provided it is invoked
     * for each value in `collection` to generate the criterion by which the value
     * is ranked. The `iteratee` is bound to `thisArg` and invoked with three
     * arguments: (value, index, collection).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Math
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {*} Returns the minimum value.
     * @example
     *
     * _.min([4, 2, 8, 6]);
     * // => 2
     *
     * _.min([]);
     * // => Infinity
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 }
     * ];
     *
     * _.min(users, function(chr) {
     *   return chr.age;
     * });
     * // => { 'user': 'barney', 'age': 36 }
     *
     * // using the `_.property` callback shorthand
     * _.min(users, 'age');
     * // => { 'user': 'barney', 'age': 36 }
     */
    var min = createExtremum(lt, POSITIVE_INFINITY);

    /**
     * Gets the sum of the values in `collection`.
     *
     * @static
     * @memberOf _
     * @category Math
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {number} Returns the sum.
     * @example
     *
     * _.sum([4, 6]);
     * // => 10
     *
     * _.sum({ 'a': 4, 'b': 6 });
     * // => 10
     *
     * var objects = [
     *   { 'n': 4 },
     *   { 'n': 6 }
     * ];
     *
     * _.sum(objects, function(object) {
     *   return object.n;
     * });
     * // => 10
     *
     * // using the `_.property` callback shorthand
     * _.sum(objects, 'n');
     * // => 10
     */
    function sum(collection, iteratee, thisArg) {
      if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
        iteratee = null;
      }
      var callback = getCallback(),
          noIteratee = iteratee == null;

      if (!(noIteratee && callback === baseCallback)) {
        noIteratee = false;
        iteratee = callback(iteratee, thisArg, 3);
      }
      return noIteratee
        ? arraySum(isArray(collection) ? collection : toIterable(collection))
        : baseSum(collection, iteratee);
    }

    /*------------------------------------------------------------------------*/

    // Ensure wrappers are instances of `baseLodash`.
    lodash.prototype = baseLodash.prototype;

    LodashWrapper.prototype = baseCreate(baseLodash.prototype);
    LodashWrapper.prototype.constructor = LodashWrapper;

    LazyWrapper.prototype = baseCreate(baseLodash.prototype);
    LazyWrapper.prototype.constructor = LazyWrapper;

    // Add functions to the `Map` cache.
    MapCache.prototype['delete'] = mapDelete;
    MapCache.prototype.get = mapGet;
    MapCache.prototype.has = mapHas;
    MapCache.prototype.set = mapSet;

    // Add functions to the `Set` cache.
    SetCache.prototype.push = cachePush;

    // Assign cache to `_.memoize`.
    memoize.Cache = MapCache;

    // Add functions that return wrapped values when chaining.
    lodash.after = after;
    lodash.ary = ary;
    lodash.assign = assign;
    lodash.at = at;
    lodash.before = before;
    lodash.bind = bind;
    lodash.bindAll = bindAll;
    lodash.bindKey = bindKey;
    lodash.callback = callback;
    lodash.chain = chain;
    lodash.chunk = chunk;
    lodash.compact = compact;
    lodash.constant = constant;
    lodash.countBy = countBy;
    lodash.create = create;
    lodash.curry = curry;
    lodash.curryRight = curryRight;
    lodash.debounce = debounce;
    lodash.defaults = defaults;
    lodash.defer = defer;
    lodash.delay = delay;
    lodash.difference = difference;
    lodash.drop = drop;
    lodash.dropRight = dropRight;
    lodash.dropRightWhile = dropRightWhile;
    lodash.dropWhile = dropWhile;
    lodash.fill = fill;
    lodash.filter = filter;
    lodash.flatten = flatten;
    lodash.flattenDeep = flattenDeep;
    lodash.flow = flow;
    lodash.flowRight = flowRight;
    lodash.forEach = forEach;
    lodash.forEachRight = forEachRight;
    lodash.forIn = forIn;
    lodash.forInRight = forInRight;
    lodash.forOwn = forOwn;
    lodash.forOwnRight = forOwnRight;
    lodash.functions = functions;
    lodash.groupBy = groupBy;
    lodash.indexBy = indexBy;
    lodash.initial = initial;
    lodash.intersection = intersection;
    lodash.invert = invert;
    lodash.invoke = invoke;
    lodash.keys = keys;
    lodash.keysIn = keysIn;
    lodash.map = map;
    lodash.mapKeys = mapKeys;
    lodash.mapValues = mapValues;
    lodash.matches = matches;
    lodash.matchesProperty = matchesProperty;
    lodash.memoize = memoize;
    lodash.merge = merge;
    lodash.method = method;
    lodash.methodOf = methodOf;
    lodash.mixin = mixin;
    lodash.negate = negate;
    lodash.omit = omit;
    lodash.once = once;
    lodash.pairs = pairs;
    lodash.partial = partial;
    lodash.partialRight = partialRight;
    lodash.partition = partition;
    lodash.pick = pick;
    lodash.pluck = pluck;
    lodash.property = property;
    lodash.propertyOf = propertyOf;
    lodash.pull = pull;
    lodash.pullAt = pullAt;
    lodash.range = range;
    lodash.rearg = rearg;
    lodash.reject = reject;
    lodash.remove = remove;
    lodash.rest = rest;
    lodash.restParam = restParam;
    lodash.set = set;
    lodash.shuffle = shuffle;
    lodash.slice = slice;
    lodash.sortBy = sortBy;
    lodash.sortByAll = sortByAll;
    lodash.sortByOrder = sortByOrder;
    lodash.spread = spread;
    lodash.take = take;
    lodash.takeRight = takeRight;
    lodash.takeRightWhile = takeRightWhile;
    lodash.takeWhile = takeWhile;
    lodash.tap = tap;
    lodash.throttle = throttle;
    lodash.thru = thru;
    lodash.times = times;
    lodash.toArray = toArray;
    lodash.toPlainObject = toPlainObject;
    lodash.transform = transform;
    lodash.union = union;
    lodash.uniq = uniq;
    lodash.unzip = unzip;
    lodash.unzipWith = unzipWith;
    lodash.values = values;
    lodash.valuesIn = valuesIn;
    lodash.where = where;
    lodash.without = without;
    lodash.wrap = wrap;
    lodash.xor = xor;
    lodash.zip = zip;
    lodash.zipObject = zipObject;
    lodash.zipWith = zipWith;

    // Add aliases.
    lodash.backflow = flowRight;
    lodash.collect = map;
    lodash.compose = flowRight;
    lodash.each = forEach;
    lodash.eachRight = forEachRight;
    lodash.extend = assign;
    lodash.iteratee = callback;
    lodash.methods = functions;
    lodash.object = zipObject;
    lodash.select = filter;
    lodash.tail = rest;
    lodash.unique = uniq;

    // Add functions to `lodash.prototype`.
    mixin(lodash, lodash);

    /*------------------------------------------------------------------------*/

    // Add functions that return unwrapped values when chaining.
    lodash.add = add;
    lodash.attempt = attempt;
    lodash.camelCase = camelCase;
    lodash.capitalize = capitalize;
    lodash.clone = clone;
    lodash.cloneDeep = cloneDeep;
    lodash.deburr = deburr;
    lodash.endsWith = endsWith;
    lodash.escape = escape;
    lodash.escapeRegExp = escapeRegExp;
    lodash.every = every;
    lodash.find = find;
    lodash.findIndex = findIndex;
    lodash.findKey = findKey;
    lodash.findLast = findLast;
    lodash.findLastIndex = findLastIndex;
    lodash.findLastKey = findLastKey;
    lodash.findWhere = findWhere;
    lodash.first = first;
    lodash.get = get;
    lodash.gt = gt;
    lodash.gte = gte;
    lodash.has = has;
    lodash.identity = identity;
    lodash.includes = includes;
    lodash.indexOf = indexOf;
    lodash.inRange = inRange;
    lodash.isArguments = isArguments;
    lodash.isArray = isArray;
    lodash.isBoolean = isBoolean;
    lodash.isDate = isDate;
    lodash.isElement = isElement;
    lodash.isEmpty = isEmpty;
    lodash.isEqual = isEqual;
    lodash.isError = isError;
    lodash.isFinite = isFinite;
    lodash.isFunction = isFunction;
    lodash.isMatch = isMatch;
    lodash.isNaN = isNaN;
    lodash.isNative = isNative;
    lodash.isNull = isNull;
    lodash.isNumber = isNumber;
    lodash.isObject = isObject;
    lodash.isPlainObject = isPlainObject;
    lodash.isRegExp = isRegExp;
    lodash.isString = isString;
    lodash.isTypedArray = isTypedArray;
    lodash.isUndefined = isUndefined;
    lodash.kebabCase = kebabCase;
    lodash.last = last;
    lodash.lastIndexOf = lastIndexOf;
    lodash.lt = lt;
    lodash.lte = lte;
    lodash.max = max;
    lodash.min = min;
    lodash.noConflict = noConflict;
    lodash.noop = noop;
    lodash.now = now;
    lodash.pad = pad;
    lodash.padLeft = padLeft;
    lodash.padRight = padRight;
    lodash.parseInt = parseInt;
    lodash.random = random;
    lodash.reduce = reduce;
    lodash.reduceRight = reduceRight;
    lodash.repeat = repeat;
    lodash.result = result;
    lodash.runInContext = runInContext;
    lodash.size = size;
    lodash.snakeCase = snakeCase;
    lodash.some = some;
    lodash.sortedIndex = sortedIndex;
    lodash.sortedLastIndex = sortedLastIndex;
    lodash.startCase = startCase;
    lodash.startsWith = startsWith;
    lodash.sum = sum;
    lodash.template = template;
    lodash.trim = trim;
    lodash.trimLeft = trimLeft;
    lodash.trimRight = trimRight;
    lodash.trunc = trunc;
    lodash.unescape = unescape;
    lodash.uniqueId = uniqueId;
    lodash.words = words;

    // Add aliases.
    lodash.all = every;
    lodash.any = some;
    lodash.contains = includes;
    lodash.eq = isEqual;
    lodash.detect = find;
    lodash.foldl = reduce;
    lodash.foldr = reduceRight;
    lodash.head = first;
    lodash.include = includes;
    lodash.inject = reduce;

    mixin(lodash, (function() {
      var source = {};
      baseForOwn(lodash, function(func, methodName) {
        if (!lodash.prototype[methodName]) {
          source[methodName] = func;
        }
      });
      return source;
    }()), false);

    /*------------------------------------------------------------------------*/

    // Add functions capable of returning wrapped and unwrapped values when chaining.
    lodash.sample = sample;

    lodash.prototype.sample = function(n) {
      if (!this.__chain__ && n == null) {
        return sample(this.value());
      }
      return this.thru(function(value) {
        return sample(value, n);
      });
    };

    /*------------------------------------------------------------------------*/

    /**
     * The semantic version number.
     *
     * @static
     * @memberOf _
     * @type string
     */
    lodash.VERSION = VERSION;

    // Assign default placeholders.
    arrayEach(['bind', 'bindKey', 'curry', 'curryRight', 'partial', 'partialRight'], function(methodName) {
      lodash[methodName].placeholder = lodash;
    });

    // Add `LazyWrapper` methods that accept an `iteratee` value.
    arrayEach(['dropWhile', 'filter', 'map', 'takeWhile'], function(methodName, type) {
      var isFilter = type != LAZY_MAP_FLAG,
          isDropWhile = type == LAZY_DROP_WHILE_FLAG;

      LazyWrapper.prototype[methodName] = function(iteratee, thisArg) {
        var filtered = this.__filtered__,
            result = (filtered && isDropWhile) ? new LazyWrapper(this) : this.clone(),
            iteratees = result.__iteratees__ || (result.__iteratees__ = []);

        iteratees.push({
          'done': false,
          'count': 0,
          'index': 0,
          'iteratee': getCallback(iteratee, thisArg, 1),
          'limit': -1,
          'type': type
        });

        result.__filtered__ = filtered || isFilter;
        return result;
      };
    });

    // Add `LazyWrapper` methods for `_.drop` and `_.take` variants.
    arrayEach(['drop', 'take'], function(methodName, index) {
      var whileName = methodName + 'While';

      LazyWrapper.prototype[methodName] = function(n) {
        var filtered = this.__filtered__,
            result = (filtered && !index) ? this.dropWhile() : this.clone();

        n = n == null ? 1 : nativeMax(floor(n) || 0, 0);
        if (filtered) {
          if (index) {
            result.__takeCount__ = nativeMin(result.__takeCount__, n);
          } else {
            last(result.__iteratees__).limit = n;
          }
        } else {
          var views = result.__views__ || (result.__views__ = []);
          views.push({ 'size': n, 'type': methodName + (result.__dir__ < 0 ? 'Right' : '') });
        }
        return result;
      };

      LazyWrapper.prototype[methodName + 'Right'] = function(n) {
        return this.reverse()[methodName](n).reverse();
      };

      LazyWrapper.prototype[methodName + 'RightWhile'] = function(predicate, thisArg) {
        return this.reverse()[whileName](predicate, thisArg).reverse();
      };
    });

    // Add `LazyWrapper` methods for `_.first` and `_.last`.
    arrayEach(['first', 'last'], function(methodName, index) {
      var takeName = 'take' + (index ? 'Right' : '');

      LazyWrapper.prototype[methodName] = function() {
        return this[takeName](1).value()[0];
      };
    });

    // Add `LazyWrapper` methods for `_.initial` and `_.rest`.
    arrayEach(['initial', 'rest'], function(methodName, index) {
      var dropName = 'drop' + (index ? '' : 'Right');

      LazyWrapper.prototype[methodName] = function() {
        return this[dropName](1);
      };
    });

    // Add `LazyWrapper` methods for `_.pluck` and `_.where`.
    arrayEach(['pluck', 'where'], function(methodName, index) {
      var operationName = index ? 'filter' : 'map',
          createCallback = index ? baseMatches : property;

      LazyWrapper.prototype[methodName] = function(value) {
        return this[operationName](createCallback(value));
      };
    });

    LazyWrapper.prototype.compact = function() {
      return this.filter(identity);
    };

    LazyWrapper.prototype.reject = function(predicate, thisArg) {
      predicate = getCallback(predicate, thisArg, 1);
      return this.filter(function(value) {
        return !predicate(value);
      });
    };

    LazyWrapper.prototype.slice = function(start, end) {
      start = start == null ? 0 : (+start || 0);

      var result = this;
      if (start < 0) {
        result = this.takeRight(-start);
      } else if (start) {
        result = this.drop(start);
      }
      if (end !== undefined) {
        end = (+end || 0);
        result = end < 0 ? result.dropRight(-end) : result.take(end - start);
      }
      return result;
    };

    LazyWrapper.prototype.toArray = function() {
      return this.drop(0);
    };

    // Add `LazyWrapper` methods to `lodash.prototype`.
    baseForOwn(LazyWrapper.prototype, function(func, methodName) {
      var lodashFunc = lodash[methodName];
      if (!lodashFunc) {
        return;
      }
      var checkIteratee = /^(?:filter|map|reject)|While$/.test(methodName),
          retUnwrapped = /^(?:first|last)$/.test(methodName);

      lodash.prototype[methodName] = function() {
        var args = arguments,
            chainAll = this.__chain__,
            value = this.__wrapped__,
            isHybrid = !!this.__actions__.length,
            isLazy = value instanceof LazyWrapper,
            iteratee = args[0],
            useLazy = isLazy || isArray(value);

        if (useLazy && checkIteratee && typeof iteratee == 'function' && iteratee.length != 1) {
          // avoid lazy use if the iteratee has a "length" value other than `1`
          isLazy = useLazy = false;
        }
        var onlyLazy = isLazy && !isHybrid;
        if (retUnwrapped && !chainAll) {
          return onlyLazy
            ? func.call(value)
            : lodashFunc.call(lodash, this.value());
        }
        var interceptor = function(value) {
          var otherArgs = [value];
          push.apply(otherArgs, args);
          return lodashFunc.apply(lodash, otherArgs);
        };
        if (useLazy) {
          var wrapper = onlyLazy ? value : new LazyWrapper(this),
              result = func.apply(wrapper, args);

          if (!retUnwrapped && (isHybrid || result.__actions__)) {
            var actions = result.__actions__ || (result.__actions__ = []);
            actions.push({ 'func': thru, 'args': [interceptor], 'thisArg': lodash });
          }
          return new LodashWrapper(result, chainAll);
        }
        return this.thru(interceptor);
      };
    });

    // Add `Array` and `String` methods to `lodash.prototype`.
    arrayEach(['concat', 'join', 'pop', 'push', 'replace', 'shift', 'sort', 'splice', 'split', 'unshift'], function(methodName) {
      var func = (/^(?:replace|split)$/.test(methodName) ? stringProto : arrayProto)[methodName],
          chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru',
          retUnwrapped = /^(?:join|pop|replace|shift)$/.test(methodName);

      lodash.prototype[methodName] = function() {
        var args = arguments;
        if (retUnwrapped && !this.__chain__) {
          return func.apply(this.value(), args);
        }
        return this[chainName](function(value) {
          return func.apply(value, args);
        });
      };
    });

    // Map minified function names to their real names.
    baseForOwn(LazyWrapper.prototype, function(func, methodName) {
      var lodashFunc = lodash[methodName];
      if (lodashFunc) {
        var key = lodashFunc.name,
            names = realNames[key] || (realNames[key] = []);

        names.push({ 'name': methodName, 'func': lodashFunc });
      }
    });

    realNames[createHybridWrapper(null, BIND_KEY_FLAG).name] = [{ 'name': 'wrapper', 'func': null }];

    // Add functions to the lazy wrapper.
    LazyWrapper.prototype.clone = lazyClone;
    LazyWrapper.prototype.reverse = lazyReverse;
    LazyWrapper.prototype.value = lazyValue;

    // Add chaining functions to the `lodash` wrapper.
    lodash.prototype.chain = wrapperChain;
    lodash.prototype.commit = wrapperCommit;
    lodash.prototype.plant = wrapperPlant;
    lodash.prototype.reverse = wrapperReverse;
    lodash.prototype.toString = wrapperToString;
    lodash.prototype.run = lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;

    // Add function aliases to the `lodash` wrapper.
    lodash.prototype.collect = lodash.prototype.map;
    lodash.prototype.head = lodash.prototype.first;
    lodash.prototype.select = lodash.prototype.filter;
    lodash.prototype.tail = lodash.prototype.rest;

    return lodash;
  }

  /*--------------------------------------------------------------------------*/

  // Export lodash.
  var _ = runInContext();

  // Some AMD build optimizers like r.js check for condition patterns like the following:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // Expose lodash to the global object when an AMD loader is present to avoid
    // errors in cases where lodash is loaded by a script tag and not intended
    // as an AMD module. See http://requirejs.org/docs/errors.html#mismatch for
    // more details.
    root._ = _;

    // Define as an anonymous module so, through path mapping, it can be
    // referenced as the "underscore" module.
    define(function() {
      return _;
    });
  }
  // Check for `exports` after `define` in case a build optimizer adds an `exports` object.
  else if (freeExports && freeModule) {
    // Export for Node.js or RingoJS.
    if (moduleExports) {
      (freeModule.exports = _)._ = _;
    }
    // Export for Rhino with CommonJS support.
    else {
      freeExports._ = _;
    }
  }
  else {
    // Export for a browser or Rhino.
    root._ = _;
  }
}.call(this));

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],"moment":[function(require,module,exports){
module.exports=require('2V8r5n');
},{}],"2V8r5n":[function(require,module,exports){
//! moment.js
//! version : 2.5.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
(function(a){function b(a,b){return function(c){return i(a.call(this,c),b)}}function c(a,b){return function(c){return this.lang().ordinal(a.call(this,c),b)}}function d(){}function e(a){u(a),g(this,a)}function f(a){var b=o(a),c=b.year||0,d=b.month||0,e=b.week||0,f=b.day||0,g=b.hour||0,h=b.minute||0,i=b.second||0,j=b.millisecond||0;this._milliseconds=+j+1e3*i+6e4*h+36e5*g,this._days=+f+7*e,this._months=+d+12*c,this._data={},this._bubble()}function g(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return b.hasOwnProperty("toString")&&(a.toString=b.toString),b.hasOwnProperty("valueOf")&&(a.valueOf=b.valueOf),a}function h(a){return 0>a?Math.ceil(a):Math.floor(a)}function i(a,b,c){for(var d=Math.abs(a)+"",e=a>=0;d.length<b;)d="0"+d;return(e?c?"+":"":"-")+d}function j(a,b,c,d){var e,f,g=b._milliseconds,h=b._days,i=b._months;g&&a._d.setTime(+a._d+g*c),(h||i)&&(e=a.minute(),f=a.hour()),h&&a.date(a.date()+h*c),i&&a.month(a.month()+i*c),g&&!d&&cb.updateOffset(a),(h||i)&&(a.minute(e),a.hour(f))}function k(a){return"[object Array]"===Object.prototype.toString.call(a)}function l(a){return"[object Date]"===Object.prototype.toString.call(a)||a instanceof Date}function m(a,b,c){var d,e=Math.min(a.length,b.length),f=Math.abs(a.length-b.length),g=0;for(d=0;e>d;d++)(c&&a[d]!==b[d]||!c&&q(a[d])!==q(b[d]))&&g++;return g+f}function n(a){if(a){var b=a.toLowerCase().replace(/(.)s$/,"$1");a=Qb[a]||Rb[b]||b}return a}function o(a){var b,c,d={};for(c in a)a.hasOwnProperty(c)&&(b=n(c),b&&(d[b]=a[c]));return d}function p(b){var c,d;if(0===b.indexOf("week"))c=7,d="day";else{if(0!==b.indexOf("month"))return;c=12,d="month"}cb[b]=function(e,f){var g,h,i=cb.fn._lang[b],j=[];if("number"==typeof e&&(f=e,e=a),h=function(a){var b=cb().utc().set(d,a);return i.call(cb.fn._lang,b,e||"")},null!=f)return h(f);for(g=0;c>g;g++)j.push(h(g));return j}}function q(a){var b=+a,c=0;return 0!==b&&isFinite(b)&&(c=b>=0?Math.floor(b):Math.ceil(b)),c}function r(a,b){return new Date(Date.UTC(a,b+1,0)).getUTCDate()}function s(a){return t(a)?366:365}function t(a){return a%4===0&&a%100!==0||a%400===0}function u(a){var b;a._a&&-2===a._pf.overflow&&(b=a._a[ib]<0||a._a[ib]>11?ib:a._a[jb]<1||a._a[jb]>r(a._a[hb],a._a[ib])?jb:a._a[kb]<0||a._a[kb]>23?kb:a._a[lb]<0||a._a[lb]>59?lb:a._a[mb]<0||a._a[mb]>59?mb:a._a[nb]<0||a._a[nb]>999?nb:-1,a._pf._overflowDayOfYear&&(hb>b||b>jb)&&(b=jb),a._pf.overflow=b)}function v(a){a._pf={empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1}}function w(a){return null==a._isValid&&(a._isValid=!isNaN(a._d.getTime())&&a._pf.overflow<0&&!a._pf.empty&&!a._pf.invalidMonth&&!a._pf.nullInput&&!a._pf.invalidFormat&&!a._pf.userInvalidated,a._strict&&(a._isValid=a._isValid&&0===a._pf.charsLeftOver&&0===a._pf.unusedTokens.length)),a._isValid}function x(a){return a?a.toLowerCase().replace("_","-"):a}function y(a,b){return b._isUTC?cb(a).zone(b._offset||0):cb(a).local()}function z(a,b){return b.abbr=a,ob[a]||(ob[a]=new d),ob[a].set(b),ob[a]}function A(a){delete ob[a]}function B(a){var b,c,d,e,f=0,g=function(a){if(!ob[a]&&pb)try{require("./lang/"+a)}catch(b){}return ob[a]};if(!a)return cb.fn._lang;if(!k(a)){if(c=g(a))return c;a=[a]}for(;f<a.length;){for(e=x(a[f]).split("-"),b=e.length,d=x(a[f+1]),d=d?d.split("-"):null;b>0;){if(c=g(e.slice(0,b).join("-")))return c;if(d&&d.length>=b&&m(e,d,!0)>=b-1)break;b--}f++}return cb.fn._lang}function C(a){return a.match(/\[[\s\S]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function D(a){var b,c,d=a.match(tb);for(b=0,c=d.length;c>b;b++)d[b]=Vb[d[b]]?Vb[d[b]]:C(d[b]);return function(e){var f="";for(b=0;c>b;b++)f+=d[b]instanceof Function?d[b].call(e,a):d[b];return f}}function E(a,b){return a.isValid()?(b=F(b,a.lang()),Sb[b]||(Sb[b]=D(b)),Sb[b](a)):a.lang().invalidDate()}function F(a,b){function c(a){return b.longDateFormat(a)||a}var d=5;for(ub.lastIndex=0;d>=0&&ub.test(a);)a=a.replace(ub,c),ub.lastIndex=0,d-=1;return a}function G(a,b){var c,d=b._strict;switch(a){case"DDDD":return Gb;case"YYYY":case"GGGG":case"gggg":return d?Hb:xb;case"YYYYYY":case"YYYYY":case"GGGGG":case"ggggg":return d?Ib:yb;case"S":if(d)return Eb;case"SS":if(d)return Fb;case"SSS":case"DDD":return d?Gb:wb;case"MMM":case"MMMM":case"dd":case"ddd":case"dddd":return Ab;case"a":case"A":return B(b._l)._meridiemParse;case"X":return Db;case"Z":case"ZZ":return Bb;case"T":return Cb;case"SSSS":return zb;case"MM":case"DD":case"YY":case"GG":case"gg":case"HH":case"hh":case"mm":case"ss":case"ww":case"WW":return d?Fb:vb;case"M":case"D":case"d":case"H":case"h":case"m":case"s":case"w":case"W":case"e":case"E":return d?Eb:vb;default:return c=new RegExp(O(N(a.replace("\\","")),"i"))}}function H(a){a=a||"";var b=a.match(Bb)||[],c=b[b.length-1]||[],d=(c+"").match(Nb)||["-",0,0],e=+(60*d[1])+q(d[2]);return"+"===d[0]?-e:e}function I(a,b,c){var d,e=c._a;switch(a){case"M":case"MM":null!=b&&(e[ib]=q(b)-1);break;case"MMM":case"MMMM":d=B(c._l).monthsParse(b),null!=d?e[ib]=d:c._pf.invalidMonth=b;break;case"D":case"DD":null!=b&&(e[jb]=q(b));break;case"DDD":case"DDDD":null!=b&&(c._dayOfYear=q(b));break;case"YY":e[hb]=q(b)+(q(b)>68?1900:2e3);break;case"YYYY":case"YYYYY":case"YYYYYY":e[hb]=q(b);break;case"a":case"A":c._isPm=B(c._l).isPM(b);break;case"H":case"HH":case"h":case"hh":e[kb]=q(b);break;case"m":case"mm":e[lb]=q(b);break;case"s":case"ss":e[mb]=q(b);break;case"S":case"SS":case"SSS":case"SSSS":e[nb]=q(1e3*("0."+b));break;case"X":c._d=new Date(1e3*parseFloat(b));break;case"Z":case"ZZ":c._useUTC=!0,c._tzm=H(b);break;case"w":case"ww":case"W":case"WW":case"d":case"dd":case"ddd":case"dddd":case"e":case"E":a=a.substr(0,1);case"gg":case"gggg":case"GG":case"GGGG":case"GGGGG":a=a.substr(0,2),b&&(c._w=c._w||{},c._w[a]=b)}}function J(a){var b,c,d,e,f,g,h,i,j,k,l=[];if(!a._d){for(d=L(a),a._w&&null==a._a[jb]&&null==a._a[ib]&&(f=function(b){var c=parseInt(b,10);return b?b.length<3?c>68?1900+c:2e3+c:c:null==a._a[hb]?cb().weekYear():a._a[hb]},g=a._w,null!=g.GG||null!=g.W||null!=g.E?h=Y(f(g.GG),g.W||1,g.E,4,1):(i=B(a._l),j=null!=g.d?U(g.d,i):null!=g.e?parseInt(g.e,10)+i._week.dow:0,k=parseInt(g.w,10)||1,null!=g.d&&j<i._week.dow&&k++,h=Y(f(g.gg),k,j,i._week.doy,i._week.dow)),a._a[hb]=h.year,a._dayOfYear=h.dayOfYear),a._dayOfYear&&(e=null==a._a[hb]?d[hb]:a._a[hb],a._dayOfYear>s(e)&&(a._pf._overflowDayOfYear=!0),c=T(e,0,a._dayOfYear),a._a[ib]=c.getUTCMonth(),a._a[jb]=c.getUTCDate()),b=0;3>b&&null==a._a[b];++b)a._a[b]=l[b]=d[b];for(;7>b;b++)a._a[b]=l[b]=null==a._a[b]?2===b?1:0:a._a[b];l[kb]+=q((a._tzm||0)/60),l[lb]+=q((a._tzm||0)%60),a._d=(a._useUTC?T:S).apply(null,l)}}function K(a){var b;a._d||(b=o(a._i),a._a=[b.year,b.month,b.day,b.hour,b.minute,b.second,b.millisecond],J(a))}function L(a){var b=new Date;return a._useUTC?[b.getUTCFullYear(),b.getUTCMonth(),b.getUTCDate()]:[b.getFullYear(),b.getMonth(),b.getDate()]}function M(a){a._a=[],a._pf.empty=!0;var b,c,d,e,f,g=B(a._l),h=""+a._i,i=h.length,j=0;for(d=F(a._f,g).match(tb)||[],b=0;b<d.length;b++)e=d[b],c=(h.match(G(e,a))||[])[0],c&&(f=h.substr(0,h.indexOf(c)),f.length>0&&a._pf.unusedInput.push(f),h=h.slice(h.indexOf(c)+c.length),j+=c.length),Vb[e]?(c?a._pf.empty=!1:a._pf.unusedTokens.push(e),I(e,c,a)):a._strict&&!c&&a._pf.unusedTokens.push(e);a._pf.charsLeftOver=i-j,h.length>0&&a._pf.unusedInput.push(h),a._isPm&&a._a[kb]<12&&(a._a[kb]+=12),a._isPm===!1&&12===a._a[kb]&&(a._a[kb]=0),J(a),u(a)}function N(a){return a.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(a,b,c,d,e){return b||c||d||e})}function O(a){return a.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function P(a){var b,c,d,e,f;if(0===a._f.length)return a._pf.invalidFormat=!0,a._d=new Date(0/0),void 0;for(e=0;e<a._f.length;e++)f=0,b=g({},a),v(b),b._f=a._f[e],M(b),w(b)&&(f+=b._pf.charsLeftOver,f+=10*b._pf.unusedTokens.length,b._pf.score=f,(null==d||d>f)&&(d=f,c=b));g(a,c||b)}function Q(a){var b,c=a._i,d=Jb.exec(c);if(d){for(a._pf.iso=!0,b=4;b>0;b--)if(d[b]){a._f=Lb[b-1]+(d[6]||" ");break}for(b=0;4>b;b++)if(Mb[b][1].exec(c)){a._f+=Mb[b][0];break}c.match(Bb)&&(a._f+="Z"),M(a)}else a._d=new Date(c)}function R(b){var c=b._i,d=qb.exec(c);c===a?b._d=new Date:d?b._d=new Date(+d[1]):"string"==typeof c?Q(b):k(c)?(b._a=c.slice(0),J(b)):l(c)?b._d=new Date(+c):"object"==typeof c?K(b):b._d=new Date(c)}function S(a,b,c,d,e,f,g){var h=new Date(a,b,c,d,e,f,g);return 1970>a&&h.setFullYear(a),h}function T(a){var b=new Date(Date.UTC.apply(null,arguments));return 1970>a&&b.setUTCFullYear(a),b}function U(a,b){if("string"==typeof a)if(isNaN(a)){if(a=b.weekdaysParse(a),"number"!=typeof a)return null}else a=parseInt(a,10);return a}function V(a,b,c,d,e){return e.relativeTime(b||1,!!c,a,d)}function W(a,b,c){var d=gb(Math.abs(a)/1e3),e=gb(d/60),f=gb(e/60),g=gb(f/24),h=gb(g/365),i=45>d&&["s",d]||1===e&&["m"]||45>e&&["mm",e]||1===f&&["h"]||22>f&&["hh",f]||1===g&&["d"]||25>=g&&["dd",g]||45>=g&&["M"]||345>g&&["MM",gb(g/30)]||1===h&&["y"]||["yy",h];return i[2]=b,i[3]=a>0,i[4]=c,V.apply({},i)}function X(a,b,c){var d,e=c-b,f=c-a.day();return f>e&&(f-=7),e-7>f&&(f+=7),d=cb(a).add("d",f),{week:Math.ceil(d.dayOfYear()/7),year:d.year()}}function Y(a,b,c,d,e){var f,g,h=new Date(i(a,6,!0)+"-01-01").getUTCDay();return c=null!=c?c:e,f=e-h+(h>d?7:0),g=7*(b-1)+(c-e)+f+1,{year:g>0?a:a-1,dayOfYear:g>0?g:s(a-1)+g}}function Z(a){var b=a._i,c=a._f;return"undefined"==typeof a._pf&&v(a),null===b?cb.invalid({nullInput:!0}):("string"==typeof b&&(a._i=b=B().preparse(b)),cb.isMoment(b)?(a=g({},b),a._d=new Date(+b._d)):c?k(c)?P(a):M(a):R(a),new e(a))}function $(a,b){cb.fn[a]=cb.fn[a+"s"]=function(a){var c=this._isUTC?"UTC":"";return null!=a?(this._d["set"+c+b](a),cb.updateOffset(this),this):this._d["get"+c+b]()}}function _(a){cb.duration.fn[a]=function(){return this._data[a]}}function ab(a,b){cb.duration.fn["as"+a]=function(){return+this/b}}function bb(a){var b=!1,c=cb;"undefined"==typeof ender&&(a?(fb.moment=function(){return!b&&console&&console.warn&&(b=!0,console.warn("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.")),c.apply(null,arguments)},g(fb.moment,c)):fb.moment=cb)}for(var cb,db,eb="2.5.0",fb=this,gb=Math.round,hb=0,ib=1,jb=2,kb=3,lb=4,mb=5,nb=6,ob={},pb="undefined"!=typeof module&&module.exports&&"undefined"!=typeof require,qb=/^\/?Date\((\-?\d+)/i,rb=/(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,sb=/^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,tb=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g,ub=/(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,vb=/\d\d?/,wb=/\d{1,3}/,xb=/\d{1,4}/,yb=/[+\-]?\d{1,6}/,zb=/\d+/,Ab=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,Bb=/Z|[\+\-]\d\d:?\d\d/gi,Cb=/T/i,Db=/[\+\-]?\d+(\.\d{1,3})?/,Eb=/\d/,Fb=/\d\d/,Gb=/\d{3}/,Hb=/\d{4}/,Ib=/[+\-]?\d{6}/,Jb=/^\s*\d{4}-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,Kb="YYYY-MM-DDTHH:mm:ssZ",Lb=["YYYY-MM-DD","GGGG-[W]WW","GGGG-[W]WW-E","YYYY-DDD"],Mb=[["HH:mm:ss.SSSS",/(T| )\d\d:\d\d:\d\d\.\d{1,3}/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],Nb=/([\+\-]|\d\d)/gi,Ob="Date|Hours|Minutes|Seconds|Milliseconds".split("|"),Pb={Milliseconds:1,Seconds:1e3,Minutes:6e4,Hours:36e5,Days:864e5,Months:2592e6,Years:31536e6},Qb={ms:"millisecond",s:"second",m:"minute",h:"hour",d:"day",D:"date",w:"week",W:"isoWeek",M:"month",y:"year",DDD:"dayOfYear",e:"weekday",E:"isoWeekday",gg:"weekYear",GG:"isoWeekYear"},Rb={dayofyear:"dayOfYear",isoweekday:"isoWeekday",isoweek:"isoWeek",weekyear:"weekYear",isoweekyear:"isoWeekYear"},Sb={},Tb="DDD w W M D d".split(" "),Ub="M D H h m s w W".split(" "),Vb={M:function(){return this.month()+1},MMM:function(a){return this.lang().monthsShort(this,a)},MMMM:function(a){return this.lang().months(this,a)},D:function(){return this.date()},DDD:function(){return this.dayOfYear()},d:function(){return this.day()},dd:function(a){return this.lang().weekdaysMin(this,a)},ddd:function(a){return this.lang().weekdaysShort(this,a)},dddd:function(a){return this.lang().weekdays(this,a)},w:function(){return this.week()},W:function(){return this.isoWeek()},YY:function(){return i(this.year()%100,2)},YYYY:function(){return i(this.year(),4)},YYYYY:function(){return i(this.year(),5)},YYYYYY:function(){var a=this.year(),b=a>=0?"+":"-";return b+i(Math.abs(a),6)},gg:function(){return i(this.weekYear()%100,2)},gggg:function(){return this.weekYear()},ggggg:function(){return i(this.weekYear(),5)},GG:function(){return i(this.isoWeekYear()%100,2)},GGGG:function(){return this.isoWeekYear()},GGGGG:function(){return i(this.isoWeekYear(),5)},e:function(){return this.weekday()},E:function(){return this.isoWeekday()},a:function(){return this.lang().meridiem(this.hours(),this.minutes(),!0)},A:function(){return this.lang().meridiem(this.hours(),this.minutes(),!1)},H:function(){return this.hours()},h:function(){return this.hours()%12||12},m:function(){return this.minutes()},s:function(){return this.seconds()},S:function(){return q(this.milliseconds()/100)},SS:function(){return i(q(this.milliseconds()/10),2)},SSS:function(){return i(this.milliseconds(),3)},SSSS:function(){return i(this.milliseconds(),3)},Z:function(){var a=-this.zone(),b="+";return 0>a&&(a=-a,b="-"),b+i(q(a/60),2)+":"+i(q(a)%60,2)},ZZ:function(){var a=-this.zone(),b="+";return 0>a&&(a=-a,b="-"),b+i(q(a/60),2)+i(q(a)%60,2)},z:function(){return this.zoneAbbr()},zz:function(){return this.zoneName()},X:function(){return this.unix()},Q:function(){return this.quarter()}},Wb=["months","monthsShort","weekdays","weekdaysShort","weekdaysMin"];Tb.length;)db=Tb.pop(),Vb[db+"o"]=c(Vb[db],db);for(;Ub.length;)db=Ub.pop(),Vb[db+db]=b(Vb[db],2);for(Vb.DDDD=b(Vb.DDD,3),g(d.prototype,{set:function(a){var b,c;for(c in a)b=a[c],"function"==typeof b?this[c]=b:this["_"+c]=b},_months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),months:function(a){return this._months[a.month()]},_monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),monthsShort:function(a){return this._monthsShort[a.month()]},monthsParse:function(a){var b,c,d;for(this._monthsParse||(this._monthsParse=[]),b=0;12>b;b++)if(this._monthsParse[b]||(c=cb.utc([2e3,b]),d="^"+this.months(c,"")+"|^"+this.monthsShort(c,""),this._monthsParse[b]=new RegExp(d.replace(".",""),"i")),this._monthsParse[b].test(a))return b},_weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdays:function(a){return this._weekdays[a.day()]},_weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysShort:function(a){return this._weekdaysShort[a.day()]},_weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),weekdaysMin:function(a){return this._weekdaysMin[a.day()]},weekdaysParse:function(a){var b,c,d;for(this._weekdaysParse||(this._weekdaysParse=[]),b=0;7>b;b++)if(this._weekdaysParse[b]||(c=cb([2e3,1]).day(b),d="^"+this.weekdays(c,"")+"|^"+this.weekdaysShort(c,"")+"|^"+this.weekdaysMin(c,""),this._weekdaysParse[b]=new RegExp(d.replace(".",""),"i")),this._weekdaysParse[b].test(a))return b},_longDateFormat:{LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D YYYY",LLL:"MMMM D YYYY LT",LLLL:"dddd, MMMM D YYYY LT"},longDateFormat:function(a){var b=this._longDateFormat[a];return!b&&this._longDateFormat[a.toUpperCase()]&&(b=this._longDateFormat[a.toUpperCase()].replace(/MMMM|MM|DD|dddd/g,function(a){return a.slice(1)}),this._longDateFormat[a]=b),b},isPM:function(a){return"p"===(a+"").toLowerCase().charAt(0)},_meridiemParse:/[ap]\.?m?\.?/i,meridiem:function(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"},_calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},calendar:function(a,b){var c=this._calendar[a];return"function"==typeof c?c.apply(b):c},_relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},relativeTime:function(a,b,c,d){var e=this._relativeTime[c];return"function"==typeof e?e(a,b,c,d):e.replace(/%d/i,a)},pastFuture:function(a,b){var c=this._relativeTime[a>0?"future":"past"];return"function"==typeof c?c(b):c.replace(/%s/i,b)},ordinal:function(a){return this._ordinal.replace("%d",a)},_ordinal:"%d",preparse:function(a){return a},postformat:function(a){return a},week:function(a){return X(a,this._week.dow,this._week.doy).week},_week:{dow:0,doy:6},_invalidDate:"Invalid date",invalidDate:function(){return this._invalidDate}}),cb=function(b,c,d,e){return"boolean"==typeof d&&(e=d,d=a),Z({_i:b,_f:c,_l:d,_strict:e,_isUTC:!1})},cb.utc=function(b,c,d,e){var f;return"boolean"==typeof d&&(e=d,d=a),f=Z({_useUTC:!0,_isUTC:!0,_l:d,_i:b,_f:c,_strict:e}).utc()},cb.unix=function(a){return cb(1e3*a)},cb.duration=function(a,b){var c,d,e,g=a,h=null;return cb.isDuration(a)?g={ms:a._milliseconds,d:a._days,M:a._months}:"number"==typeof a?(g={},b?g[b]=a:g.milliseconds=a):(h=rb.exec(a))?(c="-"===h[1]?-1:1,g={y:0,d:q(h[jb])*c,h:q(h[kb])*c,m:q(h[lb])*c,s:q(h[mb])*c,ms:q(h[nb])*c}):(h=sb.exec(a))&&(c="-"===h[1]?-1:1,e=function(a){var b=a&&parseFloat(a.replace(",","."));return(isNaN(b)?0:b)*c},g={y:e(h[2]),M:e(h[3]),d:e(h[4]),h:e(h[5]),m:e(h[6]),s:e(h[7]),w:e(h[8])}),d=new f(g),cb.isDuration(a)&&a.hasOwnProperty("_lang")&&(d._lang=a._lang),d},cb.version=eb,cb.defaultFormat=Kb,cb.updateOffset=function(){},cb.lang=function(a,b){var c;return a?(b?z(x(a),b):null===b?(A(a),a="en"):ob[a]||B(a),c=cb.duration.fn._lang=cb.fn._lang=B(a),c._abbr):cb.fn._lang._abbr},cb.langData=function(a){return a&&a._lang&&a._lang._abbr&&(a=a._lang._abbr),B(a)},cb.isMoment=function(a){return a instanceof e},cb.isDuration=function(a){return a instanceof f},db=Wb.length-1;db>=0;--db)p(Wb[db]);for(cb.normalizeUnits=function(a){return n(a)},cb.invalid=function(a){var b=cb.utc(0/0);return null!=a?g(b._pf,a):b._pf.userInvalidated=!0,b},cb.parseZone=function(a){return cb(a).parseZone()},g(cb.fn=e.prototype,{clone:function(){return cb(this)},valueOf:function(){return+this._d+6e4*(this._offset||0)},unix:function(){return Math.floor(+this/1e3)},toString:function(){return this.clone().lang("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},toDate:function(){return this._offset?new Date(+this):this._d},toISOString:function(){var a=cb(this).utc();return 0<a.year()&&a.year()<=9999?E(a,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):E(a,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")},toArray:function(){var a=this;return[a.year(),a.month(),a.date(),a.hours(),a.minutes(),a.seconds(),a.milliseconds()]},isValid:function(){return w(this)},isDSTShifted:function(){return this._a?this.isValid()&&m(this._a,(this._isUTC?cb.utc(this._a):cb(this._a)).toArray())>0:!1},parsingFlags:function(){return g({},this._pf)},invalidAt:function(){return this._pf.overflow},utc:function(){return this.zone(0)},local:function(){return this.zone(0),this._isUTC=!1,this},format:function(a){var b=E(this,a||cb.defaultFormat);return this.lang().postformat(b)},add:function(a,b){var c;return c="string"==typeof a?cb.duration(+b,a):cb.duration(a,b),j(this,c,1),this},subtract:function(a,b){var c;return c="string"==typeof a?cb.duration(+b,a):cb.duration(a,b),j(this,c,-1),this},diff:function(a,b,c){var d,e,f=y(a,this),g=6e4*(this.zone()-f.zone());return b=n(b),"year"===b||"month"===b?(d=432e5*(this.daysInMonth()+f.daysInMonth()),e=12*(this.year()-f.year())+(this.month()-f.month()),e+=(this-cb(this).startOf("month")-(f-cb(f).startOf("month")))/d,e-=6e4*(this.zone()-cb(this).startOf("month").zone()-(f.zone()-cb(f).startOf("month").zone()))/d,"year"===b&&(e/=12)):(d=this-f,e="second"===b?d/1e3:"minute"===b?d/6e4:"hour"===b?d/36e5:"day"===b?(d-g)/864e5:"week"===b?(d-g)/6048e5:d),c?e:h(e)},from:function(a,b){return cb.duration(this.diff(a)).lang(this.lang()._abbr).humanize(!b)},fromNow:function(a){return this.from(cb(),a)},calendar:function(){var a=y(cb(),this).startOf("day"),b=this.diff(a,"days",!0),c=-6>b?"sameElse":-1>b?"lastWeek":0>b?"lastDay":1>b?"sameDay":2>b?"nextDay":7>b?"nextWeek":"sameElse";return this.format(this.lang().calendar(c,this))},isLeapYear:function(){return t(this.year())},isDST:function(){return this.zone()<this.clone().month(0).zone()||this.zone()<this.clone().month(5).zone()},day:function(a){var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=a?(a=U(a,this.lang()),this.add({d:a-b})):b},month:function(a){var b,c=this._isUTC?"UTC":"";return null!=a?"string"==typeof a&&(a=this.lang().monthsParse(a),"number"!=typeof a)?this:(b=this.date(),this.date(1),this._d["set"+c+"Month"](a),this.date(Math.min(b,this.daysInMonth())),cb.updateOffset(this),this):this._d["get"+c+"Month"]()},startOf:function(a){switch(a=n(a)){case"year":this.month(0);case"month":this.date(1);case"week":case"isoWeek":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===a?this.weekday(0):"isoWeek"===a&&this.isoWeekday(1),this},endOf:function(a){return a=n(a),this.startOf(a).add("isoWeek"===a?"week":a,1).subtract("ms",1)},isAfter:function(a,b){return b="undefined"!=typeof b?b:"millisecond",+this.clone().startOf(b)>+cb(a).startOf(b)},isBefore:function(a,b){return b="undefined"!=typeof b?b:"millisecond",+this.clone().startOf(b)<+cb(a).startOf(b)},isSame:function(a,b){return b=b||"ms",+this.clone().startOf(b)===+y(a,this).startOf(b)},min:function(a){return a=cb.apply(null,arguments),this>a?this:a},max:function(a){return a=cb.apply(null,arguments),a>this?this:a},zone:function(a){var b=this._offset||0;return null==a?this._isUTC?b:this._d.getTimezoneOffset():("string"==typeof a&&(a=H(a)),Math.abs(a)<16&&(a=60*a),this._offset=a,this._isUTC=!0,b!==a&&j(this,cb.duration(b-a,"m"),1,!0),this)},zoneAbbr:function(){return this._isUTC?"UTC":""},zoneName:function(){return this._isUTC?"Coordinated Universal Time":""},parseZone:function(){return this._tzm?this.zone(this._tzm):"string"==typeof this._i&&this.zone(this._i),this},hasAlignedHourOffset:function(a){return a=a?cb(a).zone():0,(this.zone()-a)%60===0},daysInMonth:function(){return r(this.year(),this.month())},dayOfYear:function(a){var b=gb((cb(this).startOf("day")-cb(this).startOf("year"))/864e5)+1;return null==a?b:this.add("d",a-b)},quarter:function(){return Math.ceil((this.month()+1)/3)},weekYear:function(a){var b=X(this,this.lang()._week.dow,this.lang()._week.doy).year;return null==a?b:this.add("y",a-b)},isoWeekYear:function(a){var b=X(this,1,4).year;return null==a?b:this.add("y",a-b)},week:function(a){var b=this.lang().week(this);return null==a?b:this.add("d",7*(a-b))},isoWeek:function(a){var b=X(this,1,4).week;return null==a?b:this.add("d",7*(a-b))},weekday:function(a){var b=(this.day()+7-this.lang()._week.dow)%7;return null==a?b:this.add("d",a-b)},isoWeekday:function(a){return null==a?this.day()||7:this.day(this.day()%7?a:a-7)},get:function(a){return a=n(a),this[a]()},set:function(a,b){return a=n(a),"function"==typeof this[a]&&this[a](b),this},lang:function(b){return b===a?this._lang:(this._lang=B(b),this)}}),db=0;db<Ob.length;db++)$(Ob[db].toLowerCase().replace(/s$/,""),Ob[db]);$("year","FullYear"),cb.fn.days=cb.fn.day,cb.fn.months=cb.fn.month,cb.fn.weeks=cb.fn.week,cb.fn.isoWeeks=cb.fn.isoWeek,cb.fn.toJSON=cb.fn.toISOString,g(cb.duration.fn=f.prototype,{_bubble:function(){var a,b,c,d,e=this._milliseconds,f=this._days,g=this._months,i=this._data;i.milliseconds=e%1e3,a=h(e/1e3),i.seconds=a%60,b=h(a/60),i.minutes=b%60,c=h(b/60),i.hours=c%24,f+=h(c/24),i.days=f%30,g+=h(f/30),i.months=g%12,d=h(g/12),i.years=d},weeks:function(){return h(this.days()/7)},valueOf:function(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*q(this._months/12)},humanize:function(a){var b=+this,c=W(b,!a,this.lang());return a&&(c=this.lang().pastFuture(b,c)),this.lang().postformat(c)},add:function(a,b){var c=cb.duration(a,b);return this._milliseconds+=c._milliseconds,this._days+=c._days,this._months+=c._months,this._bubble(),this},subtract:function(a,b){var c=cb.duration(a,b);return this._milliseconds-=c._milliseconds,this._days-=c._days,this._months-=c._months,this._bubble(),this},get:function(a){return a=n(a),this[a.toLowerCase()+"s"]()},as:function(a){return a=n(a),this["as"+a.charAt(0).toUpperCase()+a.slice(1)+"s"]()},lang:cb.fn.lang,toIsoString:function(){var a=Math.abs(this.years()),b=Math.abs(this.months()),c=Math.abs(this.days()),d=Math.abs(this.hours()),e=Math.abs(this.minutes()),f=Math.abs(this.seconds()+this.milliseconds()/1e3);return this.asSeconds()?(this.asSeconds()<0?"-":"")+"P"+(a?a+"Y":"")+(b?b+"M":"")+(c?c+"D":"")+(d||e||f?"T":"")+(d?d+"H":"")+(e?e+"M":"")+(f?f+"S":""):"P0D"}});for(db in Pb)Pb.hasOwnProperty(db)&&(ab(db,Pb[db]),_(db.toLowerCase()));ab("Weeks",6048e5),cb.duration.fn.asMonths=function(){return(+this-31536e6*this.years())/2592e6+12*this.years()},cb.lang("en",{ordinal:function(a){var b=a%10,c=1===q(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),pb?(module.exports=cb,bb(!0)):"function"==typeof define&&define.amd?define("moment",function(b,c,d){return d.config&&d.config()&&d.config().noGlobal!==!0&&bb(d.config().noGlobal===a),cb}):bb()}).call(this);
},{}],"stampit":[function(require,module,exports){
module.exports=require('gaBrea');
},{}],"gaBrea":[function(require,module,exports){
(function (global){
!function(a){if("object"==typeof exports)module.exports=a();else if("function"==typeof define&&define.amd)define(a);else{var b;"undefined"!=typeof window?b=window:"undefined"!=typeof global?b=global:"undefined"!=typeof self&&(b=self),b.stampit=a()}}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);throw new Error("Cannot find module '"+g+"'")}var j=c[g]={exports:{}};b[g][0].call(j.exports,function(a){var c=b[g][1][a];return e(c?c:a)},j,j.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b){function c(a,b){this[b]=a}var d=a("mout/object/forIn");b.exports=function(a){for(var b,e=0,f=arguments.length;++e<f;)b=arguments[e],null!=b&&d(b,c,a);return a}},{"mout/object/forIn":14}],2:[function(a,b){function c(a,b,c){if(null!=a)for(var d=-1,e=a.length;++d<e&&b.call(c,a[d],d,a)!==!1;);}b.exports=c},{}],3:[function(a,b){function c(a,b,c){b=d(b,c);var e=[];if(null==a)return e;for(var f=-1,g=a.length;++f<g;)e[f]=b(a[f],f,a);return e}var d=(a("./forEach"),a("../function/makeIterator_"));b.exports=c},{"../function/makeIterator_":4,"./forEach":2}],4:[function(a,b){function c(a,b){switch(typeof a){case"object":return null!=a?function(b){return e(b,a)}:a;case"string":case"number":return d(a);case"function":return"undefined"==typeof b?a:function(c,d,e){return a.call(b,c,d,e)};default:return a}}var d=a("./prop"),e=a("../object/deepMatches");b.exports=c},{"../object/deepMatches":13,"./prop":5}],5:[function(a,b){function c(a){return function(b){return b[a]}}b.exports=c},{}],6:[function(a,b){function c(a){switch(h(a)){case"Object":return d(a);case"Array":return g(a);case"RegExp":return e(a);case"Date":return f(a);default:return a}}function d(a){return i(a)?j({},a):a}function e(a){var b="";return b+=a.multiline?"m":"",b+=a.global?"g":"",b+=a.ignorecase?"i":"",new RegExp(a.source,b)}function f(a){return new Date(+a)}function g(a){return a.slice()}var h=a("./kindOf"),i=a("./isPlainObject"),j=a("../object/mixIn");b.exports=c},{"../object/mixIn":18,"./isPlainObject":11,"./kindOf":12}],7:[function(a,b){function c(a,b){switch(h(a)){case"Object":return d(a,b);case"Array":return e(a,b);default:return f(a)}}function d(a,b){if(i(a)){var d={};return g(a,function(a,d){this[d]=c(a,b)},d),d}return b?b(a):a}function e(a,b){for(var d=[],e=-1,f=a.length;++e<f;)d[e]=c(a[e],b);return d}var f=a("./clone"),g=a("../object/forOwn"),h=a("./kindOf"),i=a("./isPlainObject");b.exports=c},{"../object/forOwn":15,"./clone":6,"./isPlainObject":11,"./kindOf":12}],8:[function(a,b){var c=a("./isKind"),d=Array.isArray||function(a){return c(a,"Array")};b.exports=d},{"./isKind":9}],9:[function(a,b){function c(a,b){return d(a)===b}var d=a("./kindOf");b.exports=c},{"./kindOf":12}],10:[function(a,b){function c(a){return d(a,"Object")}var d=a("./isKind");b.exports=c},{"./isKind":9}],11:[function(a,b){function c(a){return!!a&&"object"==typeof a&&a.constructor===Object}b.exports=c},{}],12:[function(a,b){function c(a){return null===a?"Null":a===d?"Undefined":e.exec(f.call(a))[1]}var d,e=/^\[object (.*)\]$/,f=Object.prototype.toString;b.exports=c},{}],13:[function(a,b){function c(a,b){for(var c=-1,d=a.length;++c<d;)if(f(a[c],b))return!0;return!1}function d(a,b){for(var d=-1,e=b.length;++d<e;)if(!c(a,b[d]))return!1;return!0}function e(a,b){var c=!0;return g(b,function(b,d){return f(a[d],b)?void 0:c=!1}),c}function f(a,b){return a&&"object"==typeof a?h(a)&&h(b)?d(a,b):e(a,b):a===b}var g=a("./forOwn"),h=a("../lang/isArray");b.exports=f},{"../lang/isArray":8,"./forOwn":15}],14:[function(a,b){function c(){g=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],f=!0;for(var a in{toString:null})f=!1}function d(a,b,d){var h,i=0;null==f&&c();for(h in a)if(e(b,a,h,d)===!1)break;if(f)for(;(h=g[i++])&&(a[h]===Object.prototype[h]||e(b,a,h,d)!==!1););}function e(a,b,c,d){return a.call(d,b[c],c,b)}var f,g;b.exports=d},{}],15:[function(a,b){function c(a,b,c){e(a,function(e,f){return d(a,f)?b.call(c,a[f],f,a):void 0})}var d=a("./hasOwn"),e=a("./forIn");b.exports=c},{"./forIn":14,"./hasOwn":16}],16:[function(a,b){function c(a,b){return Object.prototype.hasOwnProperty.call(a,b)}b.exports=c},{}],17:[function(a,b){function c(){var a,b,g,h,i=1;for(h=e(arguments[0]);g=arguments[i++];)for(a in g)d(g,a)&&(b=g[a],h[a]=f(b)&&f(h[a])?c(h[a],b):e(b));return h}var d=a("./hasOwn"),e=a("../lang/deepClone"),f=a("../lang/isObject");b.exports=c},{"../lang/deepClone":7,"../lang/isObject":10,"./hasOwn":16}],18:[function(a,b){function c(a){for(var b,c=0,f=arguments.length;++c<f;)b=arguments[c],null!=b&&e(b,d,a);return a}function d(a,b){this[b]=a}var e=a("./forOwn");b.exports=c},{"./forOwn":15}],19:[function(a,b){"use strict";var c,d,e,f,g,h,i=a("mout/array/forEach"),j=a("mout/object/mixIn"),k=a("mout/object/merge"),l=a("mout/array/map"),m=a("mout/object/forOwn"),n=a("./mixinchain.js"),o=[].slice;c=function(a){function b(){}if(arguments.length>1)throw new Error("Object.create implementation only accepts the first parameter.");return b.prototype=a,new b},Array.isArray||(Array.isArray=function(a){return"[object Array]"===Object.prototype.toString.call(a)}),d=function(a){if("function"==typeof a)return l(o.call(arguments),function(a){return"function"==typeof a?a:void 0});if("object"==typeof a){var b=[];return i(o.call(arguments),function(a){m(a,function(a){b.push(a)})}),b}return Array.isArray(a)?o.call(a):[]},e=function(a,b,e){var g={methods:a||{},state:b,enclose:d(e)},h=function(a){var b=k({},g.state),d=j(c(g.methods||{}),b,a),e=g.enclose,f=o.call(arguments,1);return i(e,function(a){"function"==typeof a&&(d=a.apply(d,f)||d)}),d};return j(h,{create:h,fixed:g,methods:function(){var a=g.methods||{},b=[a].concat(o.call(arguments));return g.methods=n.apply(this,b),this},state:function(){var a=g.state||{},b=[a].concat(o.call(arguments));return g.state=j.apply(this,b),this},enclose:function(){return g.enclose=g.enclose.concat(d.apply(null,arguments)),this},compose:function(a){var b=Array.isArray(a)?a:o.call(arguments);return b=[this].concat(b),f(b)}})},f=function(a){a=Array.isArray(a)?a:o.call(arguments);var b=e(),c=b.fixed;return i(a,function(a){a&&a.fixed&&(a.fixed.methods&&(c.methods=n(c.methods,a.fixed.methods)),a.fixed.state&&(c.state=j(c.state||{},a.fixed.state)),a.fixed.enclose&&(c.enclose=c.enclose.concat(a.fixed.enclose)))}),b},g=function(a){return"function"==typeof a&&"object"==typeof a.fixed&&"function"==typeof a.methods&&"function"==typeof a.state&&"function"==typeof a.enclose},h=function(a){return e().methods(a.prototype).enclose(a)},b.exports=j(e,{compose:f,extend:j,mixIn:j,isStamp:g,convertConstructor:h})},{"./mixinchain.js":1,"mout/array/forEach":2,"mout/array/map":3,"mout/object/forOwn":15,"mout/object/merge":17,"mout/object/mixIn":18}]},{},[19])(19)});
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
module.exports={"name":"moysklad","enums":{"uomType":{"MASS":"mass","VOLUME":"volume","PIECE":"piece"},"accessMode":{"NONE":"NONE","SELF":"SELF","PARENT":"PARENT","NEIGHBOUR":"NEIGHBOUR","ALL":"ALL"},"companyType":{"URLI":"URLI","INPR":"INPR","FILI":"FILI"},"attributeType":{"STRING":"STRING","LONG":"LONG","TIME":"TIME","ID_CUSTOM":"ID_CUSTOM","FILE":"FILE","DOUBLE":"DOUBLE","BOOLEAN":"BOOLEAN","ID_EMBEDDED":"ID_EMBEDDED","TEXT":"TEXT","LINK":"LINK"},"editablePeriodType":{"ALL":"ALL","CALENDAR_DAYS":"CALENDAR_DAYS","WORK_DAYS":"WORK_DAYS","DATE":"DATE"},"barcodeType":{"EAN8":"EAN8","EAN13":"EAN13","CODE128":"Code128"},"contractType":{"SALES":"Sales","COMMISSION":"Commission"},"rewardType":{"PERCENTOFSALES":"PercentOfSales","NONE":"None"},"overheadDistribution":{"BY_PRICE":"BY_PRICE","BY_WEIGHT":"BY_WEIGHT","BY_VOLUME":"BY_VOLUME"},"cmlType":{"BITRIX":"BITRIX","UMICMS":"UMICMS","HOSTCMS":"HOSTCMS","INSALES":"INSALES","WEBASYST":"WEBASYST","SIMPLA":"SIMPLA","UMIRU":"UMIRU","PRESTASHOP":"PRESTASHOP","SITEEDIT":"SITEEDIT","BITRIXSMB":"BITRIXSMB","FASTSALES":"FASTSALES","MAGENTO":"MAGENTO","DIAFAN":"DIAFAN","SHOPIUM":"SHOPIUM","VIRTUEMART":"VIRTUEMART","ADVANTSHOP":"ADVANTSHOP","AGORAPLATFORM":"AGORAPLATFORM","CSCART":"CSCART","WEBASYST5":"WEBASYST5","GENERIC_CML":"GENERIC_CML"}},"elementInfos":[{"elementName":"agent","typeInfo":"moysklad.agent"},{"elementName":"agentPictureDocument","typeInfo":"moysklad.agentPictureDocument"},{"elementName":"amiroConnectorSettings","typeInfo":"moysklad.amiroConnectorSettings"},{"elementName":"attachmentDocument","typeInfo":"moysklad.attachmentDocument"},{"elementName":"barcode","typeInfo":"moysklad.barcode"},{"elementName":"cashIn","typeInfo":"moysklad.cashIn"},{"elementName":"cashOut","typeInfo":"moysklad.cashOut"},{"elementName":"cashier","typeInfo":"moysklad.cashier"},{"elementName":"cmlConnectorSettings","typeInfo":"moysklad.cmlConnectorSettings"},{"elementName":"collection","typeInfo":"moysklad.collection"},{"elementName":"commissionReportIn","typeInfo":"moysklad.commissionReportIn"},{"elementName":"commissionReportInPosition","typeInfo":"moysklad.commissionReportInPosition"},{"elementName":"commissionReportOut","typeInfo":"moysklad.commissionReportOut"},{"elementName":"commissionReportOutPosition","typeInfo":"moysklad.commissionReportOutPosition"},{"elementName":"company","typeInfo":"moysklad.company"},{"elementName":"consignment","typeInfo":"moysklad.consignment"},{"elementName":"consignmentBarcode","typeInfo":"moysklad.consignmentBarcode"},{"elementName":"contract","typeInfo":"moysklad.contract"},{"elementName":"contractDocument","typeInfo":"moysklad.contractDocument"},{"elementName":"country","typeInfo":"moysklad.country"},{"elementName":"currency","typeInfo":"moysklad.currency"},{"elementName":"customEntity","typeInfo":"moysklad.customEntity"},{"elementName":"customEntityMetadata","typeInfo":"moysklad.customEntityMetadata"},{"elementName":"customerOrder","typeInfo":"moysklad.customerOrder"},{"elementName":"demand","typeInfo":"moysklad.demand"},{"elementName":"document","typeInfo":"moysklad.document"},{"elementName":"documentMiniature","typeInfo":"moysklad.documentMiniature"},{"elementName":"embeddedEntityMetadata","typeInfo":"moysklad.embeddedEntityMetadata"},{"elementName":"employee","typeInfo":"moysklad.employee"},{"elementName":"enter","typeInfo":"moysklad.enter"},{"elementName":"entityTemplatesMetadata","typeInfo":"moysklad.entityTemplatesMetadata"},{"elementName":"exchange","typeInfo":"moysklad.exchangeContainer"},{"elementName":"expenseItem","typeInfo":"moysklad.expenseItem"},{"elementName":"factureIn","typeInfo":"moysklad.factureIn"},{"elementName":"factureOut","typeInfo":"moysklad.factureOut"},{"elementName":"feature","typeInfo":"moysklad.feature"},{"elementName":"featureBarcode","typeInfo":"moysklad.featureBarcode"},{"elementName":"good","typeInfo":"moysklad.good"},{"elementName":"goodFolder","typeInfo":"moysklad.goodFolder"},{"elementName":"goodImage","typeInfo":"moysklad.goodImage"},{"elementName":"group","typeInfo":"moysklad.group"},{"elementName":"gtd","typeInfo":"moysklad.gtd"},{"elementName":"internalOrder","typeInfo":"moysklad.internalOrder"},{"elementName":"inventory","typeInfo":"moysklad.inventory"},{"elementName":"invoiceIn","typeInfo":"moysklad.invoiceIn"},{"elementName":"invoiceOut","typeInfo":"moysklad.invoiceOut"},{"elementName":"loss","typeInfo":"moysklad.loss"},{"elementName":"move","typeInfo":"moysklad.move"},{"elementName":"myCompany","typeInfo":"moysklad.myCompany"},{"elementName":"operationDocument","typeInfo":"moysklad.operationDocument"},{"elementName":"paymentIn","typeInfo":"moysklad.paymentIn"},{"elementName":"paymentOut","typeInfo":"moysklad.paymentOut"},{"elementName":"priceList","typeInfo":"moysklad.priceList"},{"elementName":"priceType","typeInfo":"moysklad.priceType"},{"elementName":"processing","typeInfo":"moysklad.processing"},{"elementName":"processingOrder","typeInfo":"moysklad.processingOrder"},{"elementName":"processingPlan","typeInfo":"moysklad.processingPlan"},{"elementName":"processingPlanFolder","typeInfo":"moysklad.processingPlanFolder"},{"elementName":"project","typeInfo":"moysklad.project"},{"elementName":"purchaseOrder","typeInfo":"moysklad.purchaseOrder"},{"elementName":"purchaseReturn","typeInfo":"moysklad.purchaseReturn"},{"elementName":"reportTemplatesMetadata","typeInfo":"moysklad.reportTemplatesMetadata"},{"elementName":"retailCashIn","typeInfo":"moysklad.retailCashIn"},{"elementName":"retailCashOut","typeInfo":"moysklad.retailCashOut"},{"elementName":"retailDemand","typeInfo":"moysklad.retailDemand"},{"elementName":"retailSalesReturn","typeInfo":"moysklad.retailSalesReturn"},{"elementName":"retailStore","typeInfo":"moysklad.retailStore"},{"elementName":"salesReturn","typeInfo":"moysklad.salesReturn"},{"elementName":"service","typeInfo":"moysklad.service"},{"elementName":"slot","typeInfo":"moysklad.slot"},{"elementName":"supply","typeInfo":"moysklad.supply"},{"elementName":"template","typeInfo":"moysklad.template"},{"elementName":"thing","typeInfo":"moysklad.thing"},{"elementName":"tinyImage","typeInfo":"moysklad.tinyImage"},{"elementName":"uom","typeInfo":"moysklad.uom"},{"elementName":"warehouse","typeInfo":"moysklad.warehouse"},{"elementName":"workflow","typeInfo":"moysklad.workflow"},{"elementName":"ymlConnectorSettings","typeInfo":"moysklad.ymlConnectorSettings"},{"elementName":"collection","typeInfo":"moysklad.collection"},{"elementName":"uuid","typeInfo":"String"},{"elementName":"id","typeInfo":"String"},{"elementName":"error","typeInfo":"moysklad.error"}],"typeInfos":[{"type":"classInfo","localName":"collectionContainer","propertyInfos":[{"type":"anyElement","name":"items","collection":true}]},{"type":"classInfo","localName":"uom","propertyInfos":[{"type":"attribute","name":"type","typeInfo":"String"}],"baseTypeInfo":"moysklad.predefinedLegendEntity"},{"type":"classInfo","localName":"predefinedLegendEntity","propertyInfos":[{"type":"attribute","name":"favourite","typeInfo":"Boolean"}],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"legendEntity","propertyInfos":[{"type":"attribute","name":"name","typeInfo":"String"},{"type":"element","name":"code","typeInfo":"String"},{"type":"element","name":"externalcode","typeInfo":"String"},{"type":"element","name":"description","typeInfo":"String"}],"baseTypeInfo":"moysklad.infoEntity"},{"type":"classInfo","localName":"infoEntity","propertyInfos":[{"type":"attribute","name":"updated","typeInfo":"DateTime"},{"type":"attribute","name":"updatedBy","typeInfo":"String"},{"type":"element","name":"deleted","typeInfo":"DateTime"}],"baseTypeInfo":"moysklad.entity"},{"type":"classInfo","localName":"entity","propertyInfos":[{"type":"attribute","name":"readMode","typeInfo":"String"},{"type":"attribute","name":"changeMode","typeInfo":"String"},{"type":"element","name":"groupUuid","typeInfo":"String"},{"type":"element","name":"ownerUid","typeInfo":"String"},{"type":"element","name":"shared","typeInfo":"Boolean"}],"baseTypeInfo":"moysklad.accountEntity"},{"type":"classInfo","localName":"accountEntity","propertyInfos":[{"type":"element","name":"accountUuid","typeInfo":"String"},{"type":"element","name":"accountId","typeInfo":"String"},{"type":"element","name":"uuid","typeInfo":"String"}]},{"type":"classInfo","localName":"exchangeContainer","propertyInfos":[{"type":"element","name":"commissionReportIn","collection":true,"wrapperElementName":"commissionReportIn","typeInfo":"moysklad.commissionReportIn"},{"type":"element","name":"commissionReportOut","collection":true,"wrapperElementName":"commissionReportOut","typeInfo":"moysklad.commissionReportOut"},{"type":"element","name":"workflow","collection":true,"wrapperElementName":"workflow","typeInfo":"moysklad.workflow"},{"type":"element","name":"customEntityMetadata","collection":true,"wrapperElementName":"customEntityMetadata","typeInfo":"moysklad.customEntityMetadata"},{"type":"element","name":"embeddedEntityMetadata","collection":true,"wrapperElementName":"embeddedEntityMetadata","typeInfo":"moysklad.embeddedEntityMetadata"},{"type":"element","name":"entityTemplatesMetadata","collection":true,"wrapperElementName":"entityTemplatesMetadata","typeInfo":"moysklad.entityTemplatesMetadata"},{"type":"element","name":"reportTemplatesMetadata","collection":true,"wrapperElementName":"reportTemplatesMetadata","typeInfo":"moysklad.reportTemplatesMetadata"},{"type":"element","name":"customEntity","collection":true,"wrapperElementName":"customEntity","typeInfo":"moysklad.customEntity"},{"type":"element","name":"currencies","elementName":"currency","collection":true,"wrapperElementName":"currencies","typeInfo":"moysklad.currency"},{"type":"element","name":"country","collection":true,"wrapperElementName":"country","typeInfo":"moysklad.country"},{"type":"element","name":"gtd","collection":true,"wrapperElementName":"gtd","typeInfo":"moysklad.gtd"},{"type":"element","name":"uoms","elementName":"uom","collection":true,"wrapperElementName":"uoms","typeInfo":"moysklad.uom"},{"type":"element","name":"myCompany","collection":true,"wrapperElementName":"myCompany","typeInfo":"moysklad.myCompany"},{"type":"element","name":"agents","elementName":"agent","collection":true,"wrapperElementName":"agents","typeInfo":"moysklad.agent"},{"type":"element","name":"companies","elementName":"company","collection":true,"wrapperElementName":"companies","typeInfo":"moysklad.company"},{"type":"element","name":"goodFolders","elementName":"goodFolder","collection":true,"wrapperElementName":"goodFolders","typeInfo":"moysklad.goodFolder"},{"type":"element","name":"goods","elementName":"good","collection":true,"wrapperElementName":"goods","typeInfo":"moysklad.good"},{"type":"element","name":"service","collection":true,"wrapperElementName":"service","typeInfo":"moysklad.service"},{"type":"element","name":"things","elementName":"thing","collection":true,"wrapperElementName":"things","typeInfo":"moysklad.thing"},{"type":"element","name":"employees","elementName":"employee","collection":true,"wrapperElementName":"employees","typeInfo":"moysklad.employee"},{"type":"element","name":"warehouses","elementName":"warehouse","collection":true,"wrapperElementName":"warehouses","typeInfo":"moysklad.warehouse"},{"type":"element","name":"project","collection":true,"wrapperElementName":"project","typeInfo":"moysklad.project"},{"type":"element","name":"contract","collection":true,"wrapperElementName":"contract","typeInfo":"moysklad.contract"},{"type":"element","name":"processingPlans","elementName":"processingPlan","collection":true,"wrapperElementName":"processingPlans","typeInfo":"moysklad.processingPlan"},{"type":"element","name":"features","elementName":"feature","collection":true,"wrapperElementName":"features","typeInfo":"moysklad.feature"},{"type":"element","name":"consignments","elementName":"consignment","collection":true,"wrapperElementName":"consignments","typeInfo":"moysklad.consignment"},{"type":"element","name":"priceLists","elementName":"priceList","collection":true,"wrapperElementName":"priceLists","typeInfo":"moysklad.priceList"},{"type":"element","name":"paymentIn","collection":true,"wrapperElementName":"paymentIn","typeInfo":"moysklad.paymentIn"},{"type":"element","name":"paymentOut","collection":true,"wrapperElementName":"paymentOut","typeInfo":"moysklad.paymentOut"},{"type":"element","name":"factureIn","collection":true,"wrapperElementName":"factureIn","typeInfo":"moysklad.factureIn"},{"type":"element","name":"factureOut","collection":true,"wrapperElementName":"factureOut","typeInfo":"moysklad.factureOut"},{"type":"element","name":"cashIn","collection":true,"wrapperElementName":"cashIn","typeInfo":"moysklad.cashIn"},{"type":"element","name":"cashOut","collection":true,"wrapperElementName":"cashOut","typeInfo":"moysklad.cashOut"},{"type":"element","name":"deliveries-demand","elementName":"demand","collection":true,"wrapperElementName":"deliveries-demand","typeInfo":"moysklad.demand"},{"type":"element","name":"deliveries-supply","elementName":"supply","collection":true,"wrapperElementName":"deliveries-supply","typeInfo":"moysklad.supply"},{"type":"element","name":"retailCashIn","collection":true,"wrapperElementName":"retailCashIn","typeInfo":"moysklad.retailCashIn"},{"type":"element","name":"retailCashOut","collection":true,"wrapperElementName":"retailCashOut","typeInfo":"moysklad.retailCashOut"},{"type":"element","name":"retailDemand","collection":true,"wrapperElementName":"retailDemand","typeInfo":"moysklad.retailDemand"},{"type":"element","name":"retailSalesReturn","collection":true,"wrapperElementName":"retailSalesReturn","typeInfo":"moysklad.retailSalesReturn"},{"type":"element","name":"inventories","elementName":"inventory","collection":true,"wrapperElementName":"inventories","typeInfo":"moysklad.inventory"},{"type":"element","name":"moves","elementName":"move","collection":true,"wrapperElementName":"moves","typeInfo":"moysklad.move"},{"type":"element","name":"losses","elementName":"loss","collection":true,"wrapperElementName":"losses","typeInfo":"moysklad.loss"},{"type":"element","name":"enters","elementName":"enter","collection":true,"wrapperElementName":"enters","typeInfo":"moysklad.enter"},{"type":"element","name":"invoicesIn","elementName":"invoiceIn","collection":true,"wrapperElementName":"invoicesIn","typeInfo":"moysklad.invoiceIn"},{"type":"element","name":"invoicesOut","elementName":"invoiceOut","collection":true,"wrapperElementName":"invoicesOut","typeInfo":"moysklad.invoiceOut"},{"type":"element","name":"salesReturns","elementName":"salesReturn","collection":true,"wrapperElementName":"salesReturns","typeInfo":"moysklad.salesReturn"},{"type":"element","name":"purchaseReturns","elementName":"purchaseReturn","collection":true,"wrapperElementName":"purchaseReturns","typeInfo":"moysklad.purchaseReturn"},{"type":"element","name":"processings","elementName":"processing","collection":true,"wrapperElementName":"processings","typeInfo":"moysklad.processing"},{"type":"element","name":"customerOrders","elementName":"customerOrder","collection":true,"wrapperElementName":"customerOrders","typeInfo":"moysklad.customerOrder"},{"type":"element","name":"purchaseOrders","elementName":"purchaseOrder","collection":true,"wrapperElementName":"purchaseOrders","typeInfo":"moysklad.purchaseOrder"},{"type":"element","name":"internalOrders","elementName":"internalOrder","collection":true,"wrapperElementName":"internalOrders","typeInfo":"moysklad.internalOrder"},{"type":"element","name":"proccessingOrders","elementName":"processingOrder","collection":true,"wrapperElementName":"proccessingOrders","typeInfo":"moysklad.processingOrder"},{"type":"element","name":"amiroConnectors","elementName":"amiroConnectorSettings","collection":true,"wrapperElementName":"amiroConnectors","typeInfo":"moysklad.amiroConnectorSettings"},{"type":"element","name":"cmlConnectors","elementName":"cmlConnectorSettings","collection":true,"wrapperElementName":"cmlConnectors","typeInfo":"moysklad.cmlConnectorSettings"},{"type":"element","name":"ymlConnectors","elementName":"ymlConnectorSettings","collection":true,"wrapperElementName":"ymlConnectors","typeInfo":"moysklad.ymlConnectorSettings"}]},{"type":"classInfo","localName":"commissionReportIn","propertyInfos":[{"type":"attribute","name":"incomingDate","typeInfo":"DateTime"},{"type":"attribute","name":"incomingNumber","typeInfo":"String"},{"type":"element","name":"paymentsUuid","elementName":"financeInRef","collection":true,"wrapperElementName":"paymentsUuid","typeInfo":"String"},{"type":"element","name":"commissionReportInPositions","collection":true,"typeInfo":"moysklad.commissionReportInPosition"}],"baseTypeInfo":"moysklad.commissionReport"},{"type":"classInfo","localName":"commissionReport","propertyInfos":[{"type":"attribute","name":"endCommissionPeriod","typeInfo":"DateTime"},{"type":"attribute","name":"rewardPercent","typeInfo":"Double"},{"type":"attribute","name":"rewardType","typeInfo":"String"},{"type":"attribute","name":"startCommissionPeriod","typeInfo":"DateTime"}],"baseTypeInfo":"moysklad.operationWithPositions"},{"type":"classInfo","localName":"operationWithPositions","propertyInfos":[],"baseTypeInfo":"moysklad.operation"},{"type":"classInfo","localName":"operation","propertyInfos":[{"type":"attribute","name":"stateUuid","typeInfo":"String"},{"type":"attribute","name":"targetAgentUuid","typeInfo":"String"},{"type":"attribute","name":"sourceAgentUuid","typeInfo":"String"},{"type":"attribute","name":"targetStoreUuid","typeInfo":"String"},{"type":"attribute","name":"sourceStoreUuid","typeInfo":"String"},{"type":"attribute","name":"applicable","typeInfo":"Boolean"},{"type":"attribute","name":"projectUuid","typeInfo":"String"},{"type":"attribute","name":"contractUuid","typeInfo":"String"},{"type":"attribute","name":"moment","typeInfo":"DateTime"},{"type":"attribute","name":"targetAccountUuid","typeInfo":"String"},{"type":"attribute","name":"sourceAccountUuid","typeInfo":"String"},{"type":"attribute","name":"payerVat","typeInfo":"Boolean"},{"type":"attribute","name":"retailStoreUuid","typeInfo":"String"},{"type":"attribute","name":"currencyUuid","typeInfo":"String"},{"type":"attribute","name":"rate","typeInfo":"Double"},{"type":"attribute","name":"vatIncluded","typeInfo":"Boolean"},{"type":"attribute","name":"created","typeInfo":"DateTime"},{"type":"attribute","name":"createdBy","typeInfo":"String"},{"type":"element","name":"attribute","collection":true,"typeInfo":"moysklad.operationAttributeValue"},{"type":"element","name":"document","collection":true,"typeInfo":"moysklad.operationDocument"},{"type":"element","name":"sum","typeInfo":"moysklad.moneyAmount"}],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"financeIn","propertyInfos":[{"type":"attribute","name":"commissionReportUuid","typeInfo":"String"},{"type":"attribute","name":"customerOrderUuid","typeInfo":"String"},{"type":"attribute","name":"factureOutUuid","typeInfo":"String"},{"type":"attribute","name":"invoiceOutUuid","typeInfo":"String"},{"type":"attribute","name":"purchaseReturnUuid","typeInfo":"String"},{"type":"element","name":"demandsUuid","elementName":"demandRef","collection":true,"wrapperElementName":"demandsUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.finance"},{"type":"classInfo","localName":"finance","propertyInfos":[{"type":"attribute","name":"expenseItemUuid","typeInfo":"String"},{"type":"attribute","name":"incomingDate","typeInfo":"DateTime"},{"type":"attribute","name":"incomingNumber","typeInfo":"String"},{"type":"attribute","name":"paymentPurpose","typeInfo":"String"},{"type":"attribute","name":"vatSum","typeInfo":"Double"}],"baseTypeInfo":"moysklad.operation"},{"type":"classInfo","localName":"customerOrder","propertyInfos":[{"type":"element","name":"demandsUuid","elementName":"demandRef","collection":true,"wrapperElementName":"demandsUuid","typeInfo":"String"},{"type":"element","name":"invoicesOutUuid","elementName":"invoiceOutRef","collection":true,"wrapperElementName":"invoicesOutUuid","typeInfo":"String"},{"type":"element","name":"paymentsUuid","elementName":"financeInRef","collection":true,"wrapperElementName":"paymentsUuid","typeInfo":"String"},{"type":"element","name":"customerOrderPosition","collection":true,"typeInfo":"moysklad.customerOrderPosition"},{"type":"element","name":"purchaseOrdersUuid","elementName":"purchaseOrderRef","collection":true,"wrapperElementName":"purchaseOrdersUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.order"},{"type":"classInfo","localName":"order","propertyInfos":[{"type":"attribute","name":"deliveryPlannedMoment","typeInfo":"DateTime"},{"type":"attribute","name":"reservedSum","typeInfo":"Double"}],"baseTypeInfo":"moysklad.operationWithPositions"},{"type":"classInfo","localName":"abstractDemand","propertyInfos":[{"type":"attribute","name":"customerOrderUuid","typeInfo":"String"},{"type":"attribute","name":"factureUuid","typeInfo":"String"},{"type":"element","name":"invoicesOutUuid","elementName":"invoiceOutRef","collection":true,"wrapperElementName":"invoicesOutUuid","typeInfo":"String"},{"type":"element","name":"paymentsUuid","elementName":"financeInRef","collection":true,"wrapperElementName":"paymentsUuid","typeInfo":"String"},{"type":"element","name":"shipmentOut","collection":true,"typeInfo":"moysklad.shipmentOut"}],"baseTypeInfo":"moysklad.comingOutOperation"},{"type":"classInfo","localName":"comingOutOperation","propertyInfos":[],"baseTypeInfo":"moysklad.stockOperation"},{"type":"classInfo","localName":"stockOperation","propertyInfos":[],"baseTypeInfo":"moysklad.operationWithPositions"},{"type":"classInfo","localName":"factureOut","propertyInfos":[{"type":"attribute","name":"paymentDate","typeInfo":"DateTime"},{"type":"attribute","name":"paymentNumber","typeInfo":"String"},{"type":"element","name":"demandsUuid","elementName":"demandRef","collection":true,"wrapperElementName":"demandsUuid","typeInfo":"String"},{"type":"element","name":"extension","typeInfo":"moysklad.factureOutExtension"},{"type":"element","name":"paymentsUuid","elementName":"financeInRef","collection":true,"wrapperElementName":"paymentsUuid","typeInfo":"String"},{"type":"element","name":"returnsUuid","elementName":"returnRef","collection":true,"wrapperElementName":"returnsUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.facture"},{"type":"classInfo","localName":"facture","propertyInfos":[],"baseTypeInfo":"moysklad.operationWithPositions"},{"type":"classInfo","localName":"factureOutExtension","propertyInfos":[],"baseTypeInfo":"moysklad.operationExtension"},{"type":"classInfo","localName":"operationExtension","propertyInfos":[{"type":"attribute","name":"consigneeUuid","typeInfo":"String"}]},{"type":"classInfo","localName":"company","propertyInfos":[{"type":"attribute","name":"director","typeInfo":"String"},{"type":"attribute","name":"chiefAccountant","typeInfo":"String"},{"type":"attribute","name":"payerVat","typeInfo":"Boolean"},{"type":"attribute","name":"companyType","typeInfo":"String"},{"type":"element","name":"sign","typeInfo":"moysklad.agentPictureDocument"},{"type":"element","name":"stamp","typeInfo":"moysklad.agentPictureDocument"}],"baseTypeInfo":"moysklad.agent"},{"type":"classInfo","localName":"agent","propertyInfos":[{"type":"attribute","name":"discount","typeInfo":"Double"},{"type":"attribute","name":"autoDiscount","typeInfo":"Double"},{"type":"attribute","name":"discountCardNumber","typeInfo":"String"},{"type":"attribute","name":"discountCorrection","typeInfo":"Double"},{"type":"attribute","name":"stateUuid","typeInfo":"String"},{"type":"attribute","name":"priceTypeUuid","typeInfo":"String"},{"type":"attribute","name":"archived","typeInfo":"Boolean"},{"type":"attribute","name":"created","typeInfo":"DateTime"},{"type":"element","name":"attribute","collection":true,"typeInfo":"moysklad.agentAttributeValue"},{"type":"element","name":"requisite","typeInfo":"moysklad.requisite"},{"type":"element","name":"bankAccount","collection":true,"typeInfo":"moysklad.agentAccount"},{"type":"element","name":"contact","typeInfo":"moysklad.contact"},{"type":"element","name":"contactPerson","collection":true,"typeInfo":"moysklad.contactPerson"},{"type":"element","name":"agentNewsItem","collection":true,"typeInfo":"moysklad.agentNewsItem"},{"type":"element","name":"tags","elementName":"tag","collection":true,"wrapperElementName":"tags","typeInfo":"String"}],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"agentPictureDocument","propertyInfos":[],"baseTypeInfo":"moysklad.attachableDocument"},{"type":"classInfo","localName":"attachableDocument","propertyInfos":[],"baseTypeInfo":"moysklad.document"},{"type":"classInfo","localName":"document","propertyInfos":[{"type":"attribute","name":"created","typeInfo":"DateTime"},{"type":"attribute","name":"filename","typeInfo":"String"},{"type":"attribute","name":"miniatureUuid","typeInfo":"String"},{"type":"element","name":"contents","typeInfo":"String"}],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"documentMiniature","propertyInfos":[],"baseTypeInfo":"moysklad.document"},{"type":"classInfo","localName":"agentAttributeValue","propertyInfos":[{"type":"attribute","name":"agentUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.attributeValue"},{"type":"classInfo","localName":"attributeValue","propertyInfos":[{"type":"attribute","name":"metadataUuid","typeInfo":"String"},{"type":"attribute","name":"valueText","typeInfo":"String"},{"type":"attribute","name":"valueString","typeInfo":"String"},{"type":"attribute","name":"doubleValue","typeInfo":"Double"},{"type":"attribute","name":"longValue","typeInfo":"Long"},{"type":"attribute","name":"booleanValue","typeInfo":"Boolean"},{"type":"attribute","name":"timeValue","typeInfo":"DateTime"},{"type":"attribute","name":"entityValueUuid","typeInfo":"String"},{"type":"attribute","name":"agentValueUuid","typeInfo":"String"},{"type":"attribute","name":"goodValueUuid","typeInfo":"String"},{"type":"attribute","name":"placeValueUuid","typeInfo":"String"},{"type":"attribute","name":"consignmentValueUuid","typeInfo":"String"},{"type":"attribute","name":"contractValueUuid","typeInfo":"String"},{"type":"attribute","name":"projectValueUuid","typeInfo":"String"},{"type":"attribute","name":"employeeValueUuid","typeInfo":"String"},{"type":"element","name":"file","typeInfo":"moysklad.attachmentDocument"}],"baseTypeInfo":"moysklad.infoEntity"},{"type":"classInfo","localName":"attributeMetadata","propertyInfos":[{"type":"attribute","name":"attrType","typeInfo":"String"},{"type":"attribute","name":"dictionaryMetadataUuid","typeInfo":"String"},{"type":"attribute","name":"entityMetadataUuid","typeInfo":"String"},{"type":"attribute","name":"feature","typeInfo":"Boolean"},{"type":"attribute","name":"position","typeInfo":"Int"},{"type":"attribute","name":"required","typeInfo":"Boolean"}],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"entityMetadata","propertyInfos":[{"type":"attribute","name":"uniqueCode","typeInfo":"Boolean"},{"type":"attribute","name":"codeValueType","typeInfo":"Int"},{"type":"attribute","name":"independentNameGenerator","typeInfo":"Boolean"},{"type":"attribute","name":"partialReserve","typeInfo":"Boolean"},{"type":"attribute","name":"noEditFromOtherPlaceSource","typeInfo":"Boolean"},{"type":"attribute","name":"noApplicableFromOtherPlaceSource","typeInfo":"Boolean"},{"type":"attribute","name":"noEditFromOtherPlaceTarget","typeInfo":"Boolean"},{"type":"attribute","name":"noApplicableFromOtherPlaceTarget","typeInfo":"Boolean"},{"type":"attribute","name":"editablePeriod","typeInfo":"String"},{"type":"attribute","name":"editableCalendarDays","typeInfo":"Int"},{"type":"attribute","name":"editableWorkDays","typeInfo":"Int"},{"type":"attribute","name":"editableFromDate","typeInfo":"DateTime"},{"type":"element","name":"attributeMetadata","collection":true,"typeInfo":"moysklad.attributeMetadata"}],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"customEntity","propertyInfos":[{"type":"attribute","name":"entityMetadataUuid","typeInfo":"String"},{"type":"element","name":"attribute","collection":true,"typeInfo":"moysklad.customEntityAttributeValue"}],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"customEntityMetadata","propertyInfos":[],"baseTypeInfo":"moysklad.entityMetadata"},{"type":"classInfo","localName":"customEntityAttributeValue","propertyInfos":[{"type":"attribute","name":"customEntityUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.attributeValue"},{"type":"classInfo","localName":"attachmentDocument","propertyInfos":[],"baseTypeInfo":"moysklad.attachableDocument"},{"type":"classInfo","localName":"goodFolder","propertyInfos":[{"type":"attribute","name":"archived","typeInfo":"Boolean"},{"type":"attribute","name":"parentUuid","typeInfo":"String"},{"type":"attribute","name":"productCode","typeInfo":"String"},{"type":"attribute","name":"vat","typeInfo":"Long"},{"type":"element","name":"attribute","collection":true,"typeInfo":"moysklad.goodAttributeValue"}],"baseTypeInfo":"moysklad.classifier"},{"type":"classInfo","localName":"classifier","propertyInfos":[],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"goodAttributeValue","propertyInfos":[{"type":"attribute","name":"goodUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.attributeValue"},{"type":"classInfo","localName":"warehouse","propertyInfos":[{"type":"attribute","name":"archived","typeInfo":"Boolean"},{"type":"attribute","name":"parentUuid","typeInfo":"String"},{"type":"element","name":"attribute","collection":true,"typeInfo":"moysklad.placeAttributeValue"},{"type":"element","name":"contact","typeInfo":"moysklad.contact"},{"type":"element","name":"slots","elementName":"slot","collection":true,"wrapperElementName":"slots","typeInfo":"moysklad.slot"}],"baseTypeInfo":"moysklad.classifier"},{"type":"classInfo","localName":"placeAttributeValue","propertyInfos":[{"type":"attribute","name":"placeUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.attributeValue"},{"type":"classInfo","localName":"contact","propertyInfos":[{"type":"attribute","name":"address","typeInfo":"String"},{"type":"attribute","name":"phones","typeInfo":"String"},{"type":"attribute","name":"faxes","typeInfo":"String"},{"type":"attribute","name":"mobiles","typeInfo":"String"},{"type":"attribute","name":"email","typeInfo":"String"}]},{"type":"classInfo","localName":"slot","propertyInfos":[{"type":"attribute","name":"warehouseUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"consignment","propertyInfos":[{"type":"attribute","name":"goodUuid","typeInfo":"String"},{"type":"attribute","name":"isDefault","typeInfo":"Boolean"},{"type":"element","name":"barcode","collection":true,"typeInfo":"moysklad.consignmentBarcode"},{"type":"element","name":"attribute","collection":true,"typeInfo":"moysklad.consignmentAttributeValue"},{"type":"element","name":"feature","typeInfo":"moysklad.feature"}],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"consignmentBarcode","propertyInfos":[],"baseTypeInfo":"moysklad.abstractBarcode"},{"type":"classInfo","localName":"abstractBarcode","propertyInfos":[{"type":"attribute","name":"barcode","typeInfo":"String"},{"type":"attribute","name":"barcodeType","typeInfo":"String"}],"baseTypeInfo":"moysklad.entity"},{"type":"classInfo","localName":"consignmentAttributeValue","propertyInfos":[{"type":"attribute","name":"consignmentUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.attributeValue"},{"type":"classInfo","localName":"feature","propertyInfos":[{"type":"attribute","name":"archived","typeInfo":"Boolean"},{"type":"attribute","name":"goodUuid","typeInfo":"String"},{"type":"element","name":"attribute","collection":true,"typeInfo":"moysklad.featureAttributeValue"},{"type":"element","name":"barcode","collection":true,"typeInfo":"moysklad.featureBarcode"}],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"featureAttributeValue","propertyInfos":[],"baseTypeInfo":"moysklad.attributeValue"},{"type":"classInfo","localName":"featureBarcode","propertyInfos":[],"baseTypeInfo":"moysklad.abstractBarcode"},{"type":"classInfo","localName":"good","propertyInfos":[{"type":"attribute","name":"isSerialTrackable","typeInfo":"Boolean"},{"type":"attribute","name":"buyPrice","typeInfo":"Double"},{"type":"attribute","name":"minimumBalance","typeInfo":"Double"},{"type":"attribute","name":"weight","typeInfo":"Double"},{"type":"attribute","name":"volume","typeInfo":"Double"},{"type":"element","name":"pack","collection":true,"typeInfo":"moysklad.goodPack"},{"type":"element","name":"preferences","elementName":"preference","collection":true,"wrapperElementName":"preferences","typeInfo":"moysklad.goodSlotPreference"},{"type":"element","name":"images","elementName":"image","collection":true,"wrapperElementName":"images","typeInfo":"moysklad.goodImage"}],"baseTypeInfo":"moysklad.abstractGood"},{"type":"classInfo","localName":"abstractGood","propertyInfos":[{"type":"attribute","name":"minPrice","typeInfo":"Double"},{"type":"attribute","name":"uomUuid","typeInfo":"String"},{"type":"attribute","name":"countryUuid","typeInfo":"String"},{"type":"attribute","name":"supplierUuid","typeInfo":"String"},{"type":"attribute","name":"salePrice","typeInfo":"Double"},{"type":"attribute","name":"saleCurrencyUuid","typeInfo":"String"},{"type":"attribute","name":"buyCurrencyUuid","typeInfo":"String"},{"type":"element","name":"barcode","collection":true,"typeInfo":"moysklad.barcode"},{"type":"element","name":"salePrices","elementName":"price","collection":true,"wrapperElementName":"salePrices","typeInfo":"moysklad.price"}],"baseTypeInfo":"moysklad.goodFolder"},{"type":"classInfo","localName":"goodPack","propertyInfos":[{"type":"attribute","name":"quantity","typeInfo":"Double"},{"type":"attribute","name":"uomUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.entity"},{"type":"classInfo","localName":"goodSlotPreference","propertyInfos":[{"type":"attribute","name":"slotUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.entity"},{"type":"classInfo","localName":"goodImage","propertyInfos":[{"type":"attribute","name":"tinyUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.attachableDocument"},{"type":"classInfo","localName":"tinyImage","propertyInfos":[],"baseTypeInfo":"moysklad.document"},{"type":"classInfo","localName":"country","propertyInfos":[],"baseTypeInfo":"moysklad.predefinedLegendEntity"},{"type":"classInfo","localName":"currency","propertyInfos":[{"type":"attribute","name":"enteredRate","typeInfo":"Double"},{"type":"attribute","name":"invertRate","typeInfo":"Boolean"},{"type":"attribute","name":"rate","typeInfo":"Double"},{"type":"element","name":"major","typeInfo":"moysklad.unit"},{"type":"element","name":"minor","typeInfo":"moysklad.unit"}],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"unit","propertyInfos":[{"type":"attribute","name":"s1","typeInfo":"String"},{"type":"attribute","name":"s24","typeInfo":"String"},{"type":"attribute","name":"s5","typeInfo":"String"},{"type":"attribute","name":"sex","typeInfo":"UnsignedShort"}]},{"type":"classInfo","localName":"barcode","propertyInfos":[],"baseTypeInfo":"moysklad.abstractBarcode"},{"type":"classInfo","localName":"goodPrices","propertyInfos":[{"type":"element","name":"price","collection":true,"typeInfo":"moysklad.price"}]},{"type":"classInfo","localName":"price","propertyInfos":[{"type":"attribute","name":"currencyUuid","typeInfo":"String"},{"type":"attribute","name":"priceTypeUuid","typeInfo":"String"},{"type":"attribute","name":"value","typeInfo":"Double"}],"baseTypeInfo":"moysklad.entity"},{"type":"classInfo","localName":"priceType","propertyInfos":[{"type":"attribute","name":"index","typeInfo":"Int"},{"type":"attribute","name":"name","typeInfo":"String"}],"baseTypeInfo":"moysklad.infoEntity"},{"type":"classInfo","localName":"contract","propertyInfos":[{"type":"attribute","name":"agentUuid","typeInfo":"String"},{"type":"attribute","name":"agentAccountUuid","typeInfo":"String"},{"type":"attribute","name":"archived","typeInfo":"Boolean"},{"type":"attribute","name":"contractType","typeInfo":"String"},{"type":"attribute","name":"currencyUuid","typeInfo":"String"},{"type":"attribute","name":"moment","typeInfo":"DateTime"},{"type":"attribute","name":"ownCompanyUuid","typeInfo":"String"},{"type":"attribute","name":"ownCompanyAccountUuid","typeInfo":"String"},{"type":"attribute","name":"rewardPercent","typeInfo":"Double"},{"type":"attribute","name":"rewardType","typeInfo":"String"},{"type":"element","name":"attribute","collection":true,"typeInfo":"moysklad.contractAttributeValue"},{"type":"element","name":"document","collection":true,"typeInfo":"moysklad.contractDocument"},{"type":"element","name":"sum","typeInfo":"moysklad.moneyAmount"}],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"agentAccount","propertyInfos":[{"type":"attribute","name":"accountNumber","typeInfo":"String"},{"type":"attribute","name":"bankLocation","typeInfo":"String"},{"type":"attribute","name":"bankName","typeInfo":"String"},{"type":"attribute","name":"bic","typeInfo":"String"},{"type":"attribute","name":"correspondentAccount","typeInfo":"String"},{"type":"attribute","name":"isDefault","typeInfo":"Boolean"}],"baseTypeInfo":"moysklad.infoEntity"},{"type":"classInfo","localName":"contractAttributeValue","propertyInfos":[{"type":"attribute","name":"contractUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.attributeValue"},{"type":"classInfo","localName":"contractDocument","propertyInfos":[{"type":"attribute","name":"contractUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.printedDocument"},{"type":"classInfo","localName":"printedDocument","propertyInfos":[{"type":"attribute","name":"emailedDate","typeInfo":"DateTime"},{"type":"attribute","name":"publicId","typeInfo":"String"}],"baseTypeInfo":"moysklad.document"},{"type":"classInfo","localName":"moneyAmount","propertyInfos":[{"type":"attribute","name":"sum","typeInfo":"Double"},{"type":"attribute","name":"sumInCurrency","typeInfo":"Double"}]},{"type":"classInfo","localName":"project","propertyInfos":[{"type":"attribute","name":"archived","typeInfo":"Boolean"},{"type":"element","name":"attribute","collection":true,"typeInfo":"moysklad.projectAttributeValue"}],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"projectAttributeValue","propertyInfos":[{"type":"attribute","name":"projectUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.attributeValue"},{"type":"classInfo","localName":"employee","propertyInfos":[{"type":"attribute","name":"archived","typeInfo":"Boolean"},{"type":"attribute","name":"city","typeInfo":"String"},{"type":"attribute","name":"email","typeInfo":"String"},{"type":"attribute","name":"fax","typeInfo":"String"},{"type":"attribute","name":"firstName","typeInfo":"String"},{"type":"attribute","name":"icqNumber","typeInfo":"String"},{"type":"attribute","name":"lastName","typeInfo":"String"},{"type":"attribute","name":"middleName","typeInfo":"String"},{"type":"attribute","name":"mobile","typeInfo":"String"},{"type":"attribute","name":"phone","typeInfo":"String"},{"type":"attribute","name":"postalAddress","typeInfo":"String"},{"type":"attribute","name":"postalCode","typeInfo":"String"},{"type":"attribute","name":"pzInternalNumber","typeInfo":"String"},{"type":"attribute","name":"skypeName","typeInfo":"String"},{"type":"attribute","name":"uid","typeInfo":"String"},{"type":"element","name":"attribute","collection":true,"typeInfo":"moysklad.employeeAttributeValue"}],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"employeeAttributeValue","propertyInfos":[{"type":"attribute","name":"employeeUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.attributeValue"},{"type":"classInfo","localName":"requisite","propertyInfos":[{"type":"element","name":"bankAccount","typeInfo":"moysklad.agentAccount"},{"type":"attribute","name":"legalTitle","typeInfo":"String"},{"type":"attribute","name":"legalAddress","typeInfo":"String"},{"type":"attribute","name":"actualAddress","typeInfo":"String"},{"type":"attribute","name":"inn","typeInfo":"String"},{"type":"attribute","name":"kpp","typeInfo":"String"},{"type":"attribute","name":"okpo","typeInfo":"String"},{"type":"attribute","name":"ogrn","typeInfo":"String"},{"type":"attribute","name":"ogrnip","typeInfo":"String"},{"type":"attribute","name":"nomerSvidetelstva","typeInfo":"String"},{"type":"attribute","name":"dataSvidetelstva","typeInfo":"DateTime"}]},{"type":"classInfo","localName":"contactPerson","propertyInfos":[{"type":"attribute","name":"email","typeInfo":"String"},{"type":"attribute","name":"phone","typeInfo":"String"},{"type":"attribute","name":"position","typeInfo":"String"}],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"agentNewsItem","propertyInfos":[{"type":"attribute","name":"moment","typeInfo":"DateTime"},{"type":"element","name":"text","typeInfo":"String"}],"baseTypeInfo":"moysklad.infoEntity"},{"type":"classInfo","localName":"state","propertyInfos":[],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"purchaseReturn","propertyInfos":[{"type":"attribute","name":"factureUuid","typeInfo":"String"},{"type":"attribute","name":"supplyUuid","typeInfo":"String"},{"type":"element","name":"paymentsUuid","elementName":"financeInRef","collection":true,"wrapperElementName":"paymentsUuid","typeInfo":"String"},{"type":"element","name":"purchaseReturnPosition","collection":true,"typeInfo":"moysklad.purchaseReturnPosition"}],"baseTypeInfo":"moysklad.comingOutOperation"},{"type":"classInfo","localName":"purchaseReturnPosition","propertyInfos":[],"baseTypeInfo":"moysklad.abstractShipmentOut"},{"type":"classInfo","localName":"abstractShipmentOut","propertyInfos":[],"baseTypeInfo":"moysklad.comingOut"},{"type":"classInfo","localName":"comingOut","propertyInfos":[],"baseTypeInfo":"moysklad.stockMotion"},{"type":"classInfo","localName":"stockMotion","propertyInfos":[{"type":"attribute","name":"countryUuid","typeInfo":"String"},{"type":"attribute","name":"gtdUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.motion"},{"type":"classInfo","localName":"motion","propertyInfos":[{"type":"attribute","name":"discount","typeInfo":"Double"},{"type":"attribute","name":"quantity","typeInfo":"Double"},{"type":"attribute","name":"goodPackUuid","typeInfo":"String"},{"type":"attribute","name":"consignmentUuid","typeInfo":"String"},{"type":"attribute","name":"goodUuid","typeInfo":"String"},{"type":"attribute","name":"slotUuid","typeInfo":"String"},{"type":"attribute","name":"vat","typeInfo":"Long"},{"type":"element","name":"basePrice","typeInfo":"moysklad.moneyAmount"},{"type":"element","name":"price","typeInfo":"moysklad.moneyAmount"},{"type":"element","name":"things","elementName":"thingRef","collection":true,"wrapperElementName":"things","typeInfo":"moysklad.thing"}],"baseTypeInfo":"moysklad.entity"},{"type":"classInfo","localName":"gtd","propertyInfos":[],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"thing","propertyInfos":[{"type":"attribute","name":"goodUuid","typeInfo":"String"},{"type":"element","name":"attribute","collection":true,"typeInfo":"moysklad.thingAttributeValue"}],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"thingAttributeValue","propertyInfos":[{"type":"attribute","name":"thingUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.attributeValue"},{"type":"classInfo","localName":"supply","propertyInfos":[{"type":"attribute","name":"factureInUuid","typeInfo":"String"},{"type":"attribute","name":"incomingDate","typeInfo":"DateTime"},{"type":"attribute","name":"incomingNumber","typeInfo":"String"},{"type":"attribute","name":"overheadDistribution","typeInfo":"String"},{"type":"attribute","name":"purchaseOrderUuid","typeInfo":"String"},{"type":"element","name":"invoicesInUuid","elementName":"invoiceInRef","collection":true,"wrapperElementName":"invoicesInUuid","typeInfo":"String"},{"type":"element","name":"overhead","typeInfo":"moysklad.moneyAmount"},{"type":"element","name":"paymentsUuid","elementName":"financeOutRef","collection":true,"wrapperElementName":"paymentsUuid","typeInfo":"String"},{"type":"element","name":"shipmentIn","collection":true,"typeInfo":"moysklad.shipmentIn"},{"type":"element","name":"purchaseReturnsUuid","elementName":"purchaseReturnRef","collection":true,"wrapperElementName":"purchaseReturnsUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.comingInOperation"},{"type":"classInfo","localName":"comingInOperation","propertyInfos":[],"baseTypeInfo":"moysklad.stockOperation"},{"type":"classInfo","localName":"factureIn","propertyInfos":[{"type":"attribute","name":"incomingDate","typeInfo":"DateTime"},{"type":"attribute","name":"incomingNumber","typeInfo":"String"},{"type":"element","name":"paymentsUuid","elementName":"financeOutRef","collection":true,"wrapperElementName":"paymentsUuid","typeInfo":"String"},{"type":"element","name":"suppliesUuid","elementName":"supplyRef","collection":true,"wrapperElementName":"suppliesUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.facture"},{"type":"classInfo","localName":"financeOut","propertyInfos":[{"type":"attribute","name":"commissionreportoutUuid","typeInfo":"String"},{"type":"attribute","name":"factureInUuid","typeInfo":"String"},{"type":"attribute","name":"invoiceInUuid","typeInfo":"String"},{"type":"attribute","name":"purchaseOrderUuid","typeInfo":"String"},{"type":"attribute","name":"salesReturnUuid","typeInfo":"String"},{"type":"attribute","name":"supplyUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.finance"},{"type":"classInfo","localName":"commissionReportOut","propertyInfos":[{"type":"element","name":"paymentsUuid","elementName":"financeOutRef","collection":true,"wrapperElementName":"paymentsUuid","typeInfo":"String"},{"type":"element","name":"commissionReportOutPositions","collection":true,"typeInfo":"moysklad.commissionReportOutPosition"}],"baseTypeInfo":"moysklad.commissionReport"},{"type":"classInfo","localName":"commissionReportOutPosition","propertyInfos":[],"baseTypeInfo":"moysklad.commissionReportPosition"},{"type":"classInfo","localName":"commissionReportPosition","propertyInfos":[{"type":"element","name":"reward","typeInfo":"moysklad.moneyAmount"}],"baseTypeInfo":"moysklad.motion"},{"type":"classInfo","localName":"operationAttributeValue","propertyInfos":[{"type":"attribute","name":"operationUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.attributeValue"},{"type":"classInfo","localName":"operationDocument","propertyInfos":[{"type":"attribute","name":"operationUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.printedDocument"},{"type":"classInfo","localName":"retailStore","propertyInfos":[{"type":"attribute","name":"active","typeInfo":"Boolean"},{"type":"attribute","name":"address","typeInfo":"String"},{"type":"attribute","name":"controlCashierChoice","typeInfo":"Boolean"},{"type":"attribute","name":"controlShippingStock","typeInfo":"Boolean"},{"type":"attribute","name":"demandPrefix","typeInfo":"String"},{"type":"attribute","name":"enableDiscount","typeInfo":"Boolean"},{"type":"attribute","name":"maxDiscount","typeInfo":"Double"},{"type":"attribute","name":"myCompanyUuid","typeInfo":"String"},{"type":"attribute","name":"priceTypeUuid","typeInfo":"String"},{"type":"attribute","name":"warehouseUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"myCompany","propertyInfos":[],"baseTypeInfo":"moysklad.company"},{"type":"classInfo","localName":"invoiceIn","propertyInfos":[{"type":"attribute","name":"incomingDate","typeInfo":"DateTime"},{"type":"attribute","name":"incomingNumber","typeInfo":"String"},{"type":"attribute","name":"purchaseOrderUuid","typeInfo":"String"},{"type":"element","name":"financesOutUuid","elementName":"financeOutRef","collection":true,"wrapperElementName":"financesOutUuid","typeInfo":"String"},{"type":"element","name":"suppliesUuid","elementName":"supplyRef","collection":true,"wrapperElementName":"suppliesUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.invoice"},{"type":"classInfo","localName":"invoice","propertyInfos":[{"type":"attribute","name":"paymentPlannedMoment","typeInfo":"DateTime"},{"type":"element","name":"invoicePosition","collection":true,"typeInfo":"moysklad.invoicePosition"}],"baseTypeInfo":"moysklad.operationWithPositions"},{"type":"classInfo","localName":"purchaseOrder","propertyInfos":[{"type":"element","name":"customerOrdersUuid","elementName":"customerOrderRef","collection":true,"wrapperElementName":"customerOrdersUuid","typeInfo":"String"},{"type":"element","name":"internalOrders","elementName":"internalOrderRef","collection":true,"wrapperElementName":"internalOrders","typeInfo":"moysklad.internalOrder"},{"type":"element","name":"invoicesUuid","elementName":"invoiceInRef","collection":true,"wrapperElementName":"invoicesUuid","typeInfo":"String"},{"type":"element","name":"paymentsUuid","elementName":"financeOutRef","collection":true,"wrapperElementName":"paymentsUuid","typeInfo":"String"},{"type":"element","name":"purchaseOrderPosition","collection":true,"typeInfo":"moysklad.purchaseOrderPosition"},{"type":"element","name":"suppliesUuid","elementName":"supplyRef","collection":true,"wrapperElementName":"suppliesUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.order"},{"type":"classInfo","localName":"internalOrder","propertyInfos":[{"type":"element","name":"purchaseOrderPosition","collection":true,"typeInfo":"moysklad.purchaseOrderPosition"},{"type":"element","name":"purchaseOrdersUuid","elementName":"purchaseOrderRef","collection":true,"wrapperElementName":"purchaseOrdersUuid","typeInfo":"String"},{"type":"element","name":"demandsUuid","elementName":"moveRef","collection":true,"wrapperElementName":"demandsUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.order"},{"type":"classInfo","localName":"purchaseOrderPosition","propertyInfos":[],"baseTypeInfo":"moysklad.orderPosition"},{"type":"classInfo","localName":"orderPosition","propertyInfos":[{"type":"element","name":"reserve","typeInfo":"Double"}],"baseTypeInfo":"moysklad.motion"},{"type":"classInfo","localName":"move","propertyInfos":[{"type":"attribute","name":"internalOrderUuid","typeInfo":"String"},{"type":"element","name":"movePosition","collection":true,"typeInfo":"moysklad.movePosition"}],"baseTypeInfo":"moysklad.stockOperation"},{"type":"classInfo","localName":"movePosition","propertyInfos":[{"type":"attribute","name":"sourceSlotUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.stockMotion"},{"type":"classInfo","localName":"invoicePosition","propertyInfos":[],"baseTypeInfo":"moysklad.motion"},{"type":"classInfo","localName":"abstractSalesReturn","propertyInfos":[{"type":"element","name":"lossesUuid","elementName":"lossRef","collection":true,"wrapperElementName":"lossesUuid","typeInfo":"String"},{"type":"element","name":"paymentsUuid","elementName":"financeOutRef","collection":true,"wrapperElementName":"paymentsUuid","typeInfo":"String"},{"type":"element","name":"salesReturnPosition","collection":true,"typeInfo":"moysklad.salesReturnPosition"}],"baseTypeInfo":"moysklad.comingInOperation"},{"type":"classInfo","localName":"loss","propertyInfos":[{"type":"attribute","name":"inventoryUuid","typeInfo":"String"},{"type":"attribute","name":"salesReturnUuid","typeInfo":"String"},{"type":"element","name":"lossPosition","collection":true,"typeInfo":"moysklad.lossPosition"}],"baseTypeInfo":"moysklad.comingOutOperation"},{"type":"classInfo","localName":"inventory","propertyInfos":[{"type":"element","name":"entersUuid","elementName":"enterRef","collection":true,"wrapperElementName":"entersUuid","typeInfo":"String"},{"type":"element","name":"lossesUuid","elementName":"lossRef","collection":true,"wrapperElementName":"lossesUuid","typeInfo":"String"},{"type":"element","name":"inventoryPosition","collection":true,"typeInfo":"moysklad.inventoryPosition"}],"baseTypeInfo":"moysklad.operationWithPositions"},{"type":"classInfo","localName":"enter","propertyInfos":[{"type":"attribute","name":"inventoryUuid","typeInfo":"String"},{"type":"element","name":"enterPosition","collection":true,"typeInfo":"moysklad.enterPosition"}],"baseTypeInfo":"moysklad.comingInOperation"},{"type":"classInfo","localName":"enterPosition","propertyInfos":[{"type":"element","name":"tags","elementName":"tag","collection":true,"wrapperElementName":"tags","typeInfo":"String"}],"baseTypeInfo":"moysklad.comingIn"},{"type":"classInfo","localName":"comingIn","propertyInfos":[],"baseTypeInfo":"moysklad.stockMotion"},{"type":"classInfo","localName":"inventoryPosition","propertyInfos":[{"type":"attribute","name":"correctionAmount","typeInfo":"Double"}],"baseTypeInfo":"moysklad.motion"},{"type":"classInfo","localName":"lossPosition","propertyInfos":[{"type":"element","name":"tags","elementName":"tag","collection":true,"wrapperElementName":"tags","typeInfo":"String"}],"baseTypeInfo":"moysklad.comingOut"},{"type":"classInfo","localName":"salesReturnPosition","propertyInfos":[],"baseTypeInfo":"moysklad.comingIn"},{"type":"classInfo","localName":"expenseItem","propertyInfos":[],"baseTypeInfo":"moysklad.predefinedLegendEntity"},{"type":"classInfo","localName":"shipmentIn","propertyInfos":[{"type":"attribute","name":"overhead","typeInfo":"Double"}],"baseTypeInfo":"moysklad.comingIn"},{"type":"classInfo","localName":"invoiceOut","propertyInfos":[{"type":"attribute","name":"customerOrderUuid","typeInfo":"String"},{"type":"element","name":"demandsUuid","elementName":"demandRef","collection":true,"wrapperElementName":"demandsUuid","typeInfo":"String"},{"type":"element","name":"paymentsUuid","elementName":"financeInRef","collection":true,"wrapperElementName":"paymentsUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.invoice"},{"type":"classInfo","localName":"shipmentOut","propertyInfos":[],"baseTypeInfo":"moysklad.abstractShipmentOut"},{"type":"classInfo","localName":"customerOrderPosition","propertyInfos":[],"baseTypeInfo":"moysklad.orderPosition"},{"type":"classInfo","localName":"commissionReportInPosition","propertyInfos":[],"baseTypeInfo":"moysklad.commissionReportPosition"},{"type":"classInfo","localName":"workflow","propertyInfos":[{"type":"element","name":"state","collection":true,"typeInfo":"moysklad.state"}],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"embeddedEntityMetadata","propertyInfos":[],"baseTypeInfo":"moysklad.entityMetadata"},{"type":"classInfo","localName":"entityTemplatesMetadata","propertyInfos":[],"baseTypeInfo":"moysklad.templatesMetadata"},{"type":"classInfo","localName":"templatesMetadata","propertyInfos":[{"type":"element","name":"template","collection":true,"typeInfo":"moysklad.template"}],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"template","propertyInfos":[],"baseTypeInfo":"moysklad.document"},{"type":"classInfo","localName":"reportTemplatesMetadata","propertyInfos":[],"baseTypeInfo":"moysklad.templatesMetadata"},{"type":"classInfo","localName":"service","propertyInfos":[],"baseTypeInfo":"moysklad.abstractGood"},{"type":"classInfo","localName":"processingPlan","propertyInfos":[{"type":"element","name":"material","collection":true,"typeInfo":"moysklad.material"},{"type":"element","name":"price","typeInfo":"moysklad.moneyAmount"},{"type":"element","name":"product","collection":true,"typeInfo":"moysklad.product"}],"baseTypeInfo":"moysklad.processingPlanFolder"},{"type":"classInfo","localName":"processingPlanFolder","propertyInfos":[{"type":"attribute","name":"parentUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.classifier"},{"type":"classInfo","localName":"material","propertyInfos":[{"type":"attribute","name":"isOptional","typeInfo":"Boolean"}],"baseTypeInfo":"moysklad.processingPlanItem"},{"type":"classInfo","localName":"processingPlanItem","propertyInfos":[{"type":"attribute","name":"goodUuid","typeInfo":"String"},{"type":"attribute","name":"planUuid","typeInfo":"String"},{"type":"attribute","name":"quantity","typeInfo":"Double"}],"baseTypeInfo":"moysklad.entity"},{"type":"classInfo","localName":"product","propertyInfos":[{"type":"attribute","name":"costShare","typeInfo":"Double"}],"baseTypeInfo":"moysklad.processingPlanItem"},{"type":"classInfo","localName":"priceList","propertyInfos":[{"type":"element","name":"metadata","typeInfo":"moysklad.priceListMetadata"},{"type":"element","name":"priceListRow","collection":true,"typeInfo":"moysklad.priceListRow"}],"baseTypeInfo":"moysklad.operationWithPositions"},{"type":"classInfo","localName":"priceListMetadata","propertyInfos":[{"type":"attribute","name":"priceTypeUuid","typeInfo":"String"},{"type":"element","name":"column","collection":true,"typeInfo":"moysklad.priceListMetadataColumn"}],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"priceListMetadataColumn","propertyInfos":[{"type":"attribute","name":"percentageDiscount","typeInfo":"Int"}],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"priceListRow","propertyInfos":[{"type":"element","name":"cell","collection":true,"typeInfo":"moysklad.priceListCell"}],"baseTypeInfo":"moysklad.motion"},{"type":"classInfo","localName":"priceListCell","propertyInfos":[{"type":"attribute","name":"columnName","typeInfo":"String"},{"type":"element","name":"sum","typeInfo":"moysklad.moneyAmount"}],"baseTypeInfo":"moysklad.entity"},{"type":"classInfo","localName":"paymentIn","propertyInfos":[],"baseTypeInfo":"moysklad.financeIn"},{"type":"classInfo","localName":"paymentOut","propertyInfos":[],"baseTypeInfo":"moysklad.financeOut"},{"type":"classInfo","localName":"cashIn","propertyInfos":[],"baseTypeInfo":"moysklad.abstractCashIn"},{"type":"classInfo","localName":"abstractCashIn","propertyInfos":[],"baseTypeInfo":"moysklad.financeIn"},{"type":"classInfo","localName":"cashOut","propertyInfos":[],"baseTypeInfo":"moysklad.abstractCashOut"},{"type":"classInfo","localName":"abstractCashOut","propertyInfos":[],"baseTypeInfo":"moysklad.financeOut"},{"type":"classInfo","localName":"demand","propertyInfos":[{"type":"element","name":"extension","typeInfo":"moysklad.demandExtension"},{"type":"element","name":"salesReturnsUuid","elementName":"salesReturnRef","collection":true,"wrapperElementName":"salesReturnsUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.abstractDemand"},{"type":"classInfo","localName":"demandExtension","propertyInfos":[{"type":"attribute","name":"opened","typeInfo":"Boolean"},{"type":"attribute","name":"carrierUuid","typeInfo":"String"},{"type":"attribute","name":"loadName","typeInfo":"String"},{"type":"attribute","name":"consignorIndication","typeInfo":"String"},{"type":"attribute","name":"transportFacility","typeInfo":"String"},{"type":"attribute","name":"goodPackQuantity","typeInfo":"Int"},{"type":"attribute","name":"carNumber","typeInfo":"String"}],"baseTypeInfo":"moysklad.operationExtension"},{"type":"classInfo","localName":"salesReturn","propertyInfos":[{"type":"attribute","name":"demandUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.abstractSalesReturn"},{"type":"classInfo","localName":"retailCashIn","propertyInfos":[],"baseTypeInfo":"moysklad.abstractCashIn"},{"type":"classInfo","localName":"retailCashOut","propertyInfos":[],"baseTypeInfo":"moysklad.abstractCashOut"},{"type":"classInfo","localName":"retailDemand","propertyInfos":[{"type":"attribute","name":"nonCash","typeInfo":"Boolean"},{"type":"element","name":"salesReturnsUuid","elementName":"salesReturnRef","collection":true,"wrapperElementName":"salesReturnsUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.abstractDemand"},{"type":"classInfo","localName":"retailSalesReturn","propertyInfos":[{"type":"attribute","name":"demandUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.abstractSalesReturn"},{"type":"classInfo","localName":"processing","propertyInfos":[{"type":"attribute","name":"planUuid","typeInfo":"String"},{"type":"attribute","name":"processingOrderUuid","typeInfo":"String"},{"type":"attribute","name":"processingSum","typeInfo":"Double"},{"type":"attribute","name":"quantity","typeInfo":"Double"},{"type":"element","name":"material","collection":true,"typeInfo":"moysklad.processingPositionMaterial"},{"type":"element","name":"results","elementName":"result","collection":true,"wrapperElementName":"results","typeInfo":"moysklad.processingPositionResult"}],"baseTypeInfo":"moysklad.stockOperation"},{"type":"classInfo","localName":"processingPositionMaterial","propertyInfos":[{"type":"attribute","name":"planMaterialUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.comingOut"},{"type":"classInfo","localName":"processingOrder","propertyInfos":[{"type":"attribute","name":"planUuid","typeInfo":"String"},{"type":"attribute","name":"quantity","typeInfo":"Double"},{"type":"element","name":"purchaseOrderPosition","collection":true,"typeInfo":"moysklad.customerOrderPosition"},{"type":"element","name":"processings","elementName":"processingRef","collection":true,"wrapperElementName":"processings","typeInfo":"moysklad.processing"}],"baseTypeInfo":"moysklad.order"},{"type":"classInfo","localName":"processingPositionResult","propertyInfos":[{"type":"attribute","name":"planResultUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.comingIn"},{"type":"classInfo","localName":"amiroConnectorSettings","propertyInfos":[{"type":"attribute","name":"commentsColumnNum","typeInfo":"Int"},{"type":"attribute","name":"customerAddressColumnNum","typeInfo":"Int"},{"type":"attribute","name":"customerCodeColumnNum","typeInfo":"Int"},{"type":"attribute","name":"customerEmailColumnNum","typeInfo":"Int"},{"type":"attribute","name":"customerFirstNameColumnNum","typeInfo":"Int"},{"type":"attribute","name":"customerLastNameColumnNum","typeInfo":"Int"},{"type":"attribute","name":"customerNickColumnNum","typeInfo":"Int"},{"type":"attribute","name":"customerPhoneColumnNum","typeInfo":"Int"},{"type":"attribute","name":"goodIdColumnNum","typeInfo":"Int"},{"type":"attribute","name":"goodNameColumnNum","typeInfo":"Int"},{"type":"attribute","name":"orderDateColumnNum","typeInfo":"Int"},{"type":"attribute","name":"orderIdColumnNum","typeInfo":"Int"},{"type":"attribute","name":"prefixForAgent","typeInfo":"Boolean"},{"type":"attribute","name":"prefixForGood","typeInfo":"Boolean"},{"type":"attribute","name":"prefixForOperation","typeInfo":"Boolean"},{"type":"attribute","name":"priceColumnNum","typeInfo":"Int"},{"type":"attribute","name":"quantityColumnNum","typeInfo":"Int"},{"type":"attribute","name":"shippingAmountColumnNum","typeInfo":"Int"},{"type":"attribute","name":"stateColumnNum","typeInfo":"Int"},{"type":"attribute","name":"taxColumnNum","typeInfo":"Int"},{"type":"element","name":"customAttribute","collection":true,"typeInfo":"moysklad.amiroCustomAttributeInfo"}],"baseTypeInfo":"moysklad.operationConnectorSetting"},{"type":"classInfo","localName":"operationConnectorSetting","propertyInfos":[{"type":"attribute","name":"adminDomain","typeInfo":"String"},{"type":"attribute","name":"autoReserve","typeInfo":"Boolean"},{"type":"attribute","name":"orderplaceUuid","typeInfo":"String"},{"type":"attribute","name":"shopDomain","typeInfo":"String"},{"type":"attribute","name":"syncFeatures","typeInfo":"Boolean"},{"type":"attribute","name":"useShopOperationName","typeInfo":"Boolean"}],"baseTypeInfo":"moysklad.abstractConnectorSetting"},{"type":"classInfo","localName":"abstractConnectorSetting","propertyInfos":[{"type":"attribute","name":"active","typeInfo":"Boolean"},{"type":"attribute","name":"login","typeInfo":"String"},{"type":"attribute","name":"organizationUuid","typeInfo":"String"},{"type":"attribute","name":"password","typeInfo":"String"},{"type":"attribute","name":"pollPeriod","typeInfo":"Int"}],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"amiroCustomAttributeInfo","propertyInfos":[{"type":"attribute","name":"columnNumber","typeInfo":"Int"},{"type":"attribute","name":"name","typeInfo":"String"},{"type":"attribute","name":"settingsUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.entity"},{"type":"classInfo","localName":"cmlConnectorSettings","propertyInfos":[{"type":"attribute","name":"features","typeInfo":"Boolean"},{"type":"attribute","name":"goodFolderUuid","typeInfo":"String"},{"type":"attribute","name":"priceTypeUuid","typeInfo":"String"},{"type":"attribute","name":"shopType","typeInfo":"String"},{"type":"attribute","name":"stockActive","typeInfo":"Boolean"},{"type":"attribute","name":"stockplaceUuid","typeInfo":"String"},{"type":"attribute","name":"stockPollPeriod","typeInfo":"Int"},{"type":"attribute","name":"syncOrderState","typeInfo":"Boolean"}],"baseTypeInfo":"moysklad.operationConnectorSetting"},{"type":"classInfo","localName":"ymlConnectorSettings","propertyInfos":[],"baseTypeInfo":"moysklad.abstractConnectorSetting"},{"type":"classInfo","localName":"cashier","propertyInfos":[{"type":"attribute","name":"createAndPrintRetailCashOut","typeInfo":"Boolean"},{"type":"attribute","name":"employeeUuid","typeInfo":"String"},{"type":"attribute","name":"printCheck","typeInfo":"Boolean"},{"type":"attribute","name":"printCheckFR","typeInfo":"Boolean"},{"type":"attribute","name":"retailStoreUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.entity"},{"type":"classInfo","localName":"group","propertyInfos":[{"type":"element","name":"uuid","typeInfo":"String"},{"type":"element","name":"accountUuid","typeInfo":"String"},{"type":"attribute","name":"name","typeInfo":"String"}]},{"type":"classInfo","localName":"error","propertyInfos":[{"type":"element","name":"uid","typeInfo":"String"},{"type":"element","name":"moment","typeInfo":"String"},{"type":"element","name":"message","typeInfo":"String"},{"type":"element","name":"stack","typeInfo":"String"}]},{"type":"classInfo","localName":"collection","propertyInfos":[{"type":"attribute","name":"total","typeInfo":"Int"},{"type":"attribute","name":"start","typeInfo":"Int"},{"type":"attribute","name":"count","typeInfo":"Int"}],"baseTypeInfo":"moysklad.collectionContainer"},{"type":"classInfo","localName":"abstractGood","propertyInfos":[{"type":"attribute","name":"minPrice","typeInfo":"Double"},{"type":"attribute","name":"uomUuid","typeInfo":"String"},{"type":"attribute","name":"countryUuid","typeInfo":"String"},{"type":"attribute","name":"supplierUuid","typeInfo":"String"},{"type":"attribute","name":"salePrice","typeInfo":"Double"},{"type":"attribute","name":"saleCurrencyUuid","typeInfo":"String"},{"type":"attribute","name":"buyCurrencyUuid","typeInfo":"String"},{"type":"element","name":"barcode","collection":true,"typeInfo":"moysklad.barcode"},{"type":"element","name":"salePrices","elementName":"price","collection":true,"wrapperElementName":"salePrices","typeInfo":"moysklad.price"}],"baseTypeInfo":"moysklad.goodFolder"}]}
},{}],18:[function(require,module,exports){
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
},{"./../rest-clients/ms-xml/query":55,"./../rest-clients/ms-xml/query/operators":65,"./lazy-loader":28,"./methods/chain":32,"./methods/first":33,"./methods/from":34,"./methods/json-service":35,"./methods/load":36,"./methods/loadMetadata":37,"./methods/save":38,"./methods/total":39,"./model-builder":40,"lodash":11,"project/behaviors/authProviderBehavior":69,"project/behaviors/providerAccessorBehavior":70,"stampit":"gaBrea"}],19:[function(require,module,exports){
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
},{"lodash":11,"stampit":"gaBrea"}],20:[function(require,module,exports){
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
},{"lodash":11}],21:[function(require,module,exports){


module.exports = {
    
    slot:       require('./slot'),
    state:      require('./state'),
    payments:   require('./__entitiesArray')

};
},{"./__entitiesArray":20,"./slot":22,"./state":23}],22:[function(require,module,exports){
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
},{"lodash":11}],23:[function(require,module,exports){
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
},{"lodash":11,"project/tools":97}],24:[function(require,module,exports){
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
},{"lodash":11}],25:[function(require,module,exports){
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
},{"lodash":11,"stampit":"gaBrea"}],26:[function(require,module,exports){
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
},{"./customFetch":21,"lodash":11}],27:[function(require,module,exports){
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
},{"./nameToTypeMap":30}],28:[function(require,module,exports){
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
},{"./batch":19,"./defProperty":24,"./entityHash":25,"./getEntities":26,"./getTypeOfProperty":27,"./mapLazyLoader":29,"lodash":11,"stampit":"gaBrea"}],29:[function(require,module,exports){
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
},{"lodash":11,"project/tools":97}],30:[function(require,module,exports){
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
},{}],31:[function(require,module,exports){
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
},{"lodash":11,"stampit":"gaBrea"}],32:[function(require,module,exports){
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
},{"lodash":11,"project/tools/callbackAdapter":85}],33:[function(require,module,exports){
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
},{"lodash":11,"project/tools/callbackAdapter":85}],34:[function(require,module,exports){
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
},{"./../../rest-clients/ms-xml/query/index":55,"lodash":11}],35:[function(require,module,exports){
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


},{"lodash":11,"project/tools/callbackAdapter":85}],36:[function(require,module,exports){
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
},{"have":8,"lodash":11,"project/tools/callbackAdapter":85}],37:[function(require,module,exports){
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
},{"have":8,"lodash":11,"project/tools/callbackAdapter":85}],38:[function(require,module,exports){
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
},{"lodash":11,"project/tools/callbackAdapter":85}],39:[function(require,module,exports){
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
},{"../../../tools/index":101,"lodash":11}],40:[function(require,module,exports){
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
},{"../../../res/mapping":17,"./mapping":31,"project/jsonix":75,"project/model-extensions":78,"project/tools/getUriTypeName":94}],"1wiUUs":[function(require,module,exports){
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
},{"../../package":16,"./client":18,"./rest-clients/json":43,"./rest-clients/ms-xml":49,"./rest-clients/ms-xml/query":55,"have":8,"lodash":11,"project/fetch":"Q962xy","project/logger":"37nxtW","project/tools":97}],"moysklad-client":[function(require,module,exports){
module.exports=require('1wiUUs');
},{}],43:[function(require,module,exports){
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
},{"./methods/fetch":44,"./methods/mutualSettlement":45,"./methods/responseHandler":46,"./methods/slot":47,"./methods/stock":48,"project/behaviors/authProviderBehavior":69,"project/behaviors/providerAccessorBehavior":70,"stampit":"gaBrea"}],44:[function(require,module,exports){
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
},{"lodash":11,"moment":"2V8r5n"}],45:[function(require,module,exports){
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
},{"lodash":11,"moment":"2V8r5n"}],46:[function(require,module,exports){
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
},{"lodash":11,"project/logger":"37nxtW","project/tools/callbackAdapter":85}],47:[function(require,module,exports){
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
},{"lodash":11,"moment":"2V8r5n"}],48:[function(require,module,exports){
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
},{"lodash":11,"moment":"2V8r5n"}],49:[function(require,module,exports){
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
},{"./methods/del":50,"./methods/fetch":51,"./methods/get":52,"./methods/put":53,"./methods/responseHandler":54,"project/behaviors/authProviderBehavior":69,"project/behaviors/providerAccessorBehavior":70,"stampit":"gaBrea"}],50:[function(require,module,exports){
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
},{"lodash":11,"project/tools":97}],51:[function(require,module,exports){
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
},{"lodash":11}],52:[function(require,module,exports){
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
},{"lodash":11,"project/tools":97}],53:[function(require,module,exports){
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
},{"lodash":11,"project/tools":97}],54:[function(require,module,exports){
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
},{"lodash":11,"project/tools/callbackAdapter":85}],55:[function(require,module,exports){
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


},{"./query":67}],56:[function(require,module,exports){
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
},{"../../../../../tools/index":101}],57:[function(require,module,exports){
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
},{}],58:[function(require,module,exports){
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
},{"../../../../../tools/index":101,"../operators":65,"lodash":11,"moment":"2V8r5n"}],59:[function(require,module,exports){
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
},{"../../../../../tools/index":101}],60:[function(require,module,exports){
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
},{"../../../../../tools/index":101}],61:[function(require,module,exports){
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

},{"../../../../../tools/index":101}],62:[function(require,module,exports){
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

},{"../../../../../tools/index":101}],63:[function(require,module,exports){
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

},{"../../../../../tools/index":101}],64:[function(require,module,exports){
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
},{}],65:[function(require,module,exports){
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
},{"lodash":11,"moment":"2V8r5n"}],66:[function(require,module,exports){
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
},{"../../../../tools/index":101,"lodash":11}],67:[function(require,module,exports){
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
},{"./methods/fileContent":56,"./methods/filter":57,"./methods/getQueryParameters":58,"./methods/paging":59,"./methods/select":60,"./methods/showArchived":61,"./methods/sort":62,"./methods/sortMode":63,"./methods/uuids":64,"./query.filter.js":66,"./query.params.js":68,"stampit":"gaBrea"}],68:[function(require,module,exports){
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
},{"../../../../tools":101,"lodash":11}],69:[function(require,module,exports){
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
},{"./../../../tools/index":101,"project/default-auth":"rUG5Il","project/logger":"37nxtW"}],70:[function(require,module,exports){
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
},{"have":8,"lodash":11}],"project/default-auth":[function(require,module,exports){
module.exports=require('rUG5Il');
},{}],"rUG5Il":[function(require,module,exports){
/**
 * default browser auth (dummy)
 * Date: 23.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

module.exports = null;
},{}],"project/fetch":[function(require,module,exports){
module.exports=require('Q962xy');
},{}],"Q962xy":[function(require,module,exports){
/**
 * Default Http request provider factory
 * Date: 11.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _               = require('lodash'),
    log             = require('project/logger'),
    callbackAdapter = require('project/tools/callbackAdapter');

var fetch = {

    fetch: function (options, callback) {

        var _options = {
            contentType: 'application/x-www-form-urlencoded',
            method: 'GET'
        };
        _.extend(_options, options);

        var xhr = new XMLHttpRequest()
          , response;

        xhr.open(_options.method, _options.url, !!_options.async);
        xhr.setRequestHeader('Content-Type', _options.contentType);

        _.forOwn(_options.headers, function (value, key) {
            xhr.setRequestHeader(key, value);
        });

        // Show request info
        log.info([
            'http',
            _options.method,
            _options.url
        ].join(' '));

        var getResult = function () {
            response = {
                headers: null,
                contentText: xhr.responseText,
                contentXml: xhr.responseXML,
                responseCode: (typeof xhr.status === 'number') ? xhr.status : parseInt(xhr.status.split('\n')[0]),
                responseCodeText: xhr.statusText
            };

            var result = {
                response: response,
                request: _options
            };

            log.info([
                'http',
                response.responseCode,
                _options.url,
                (new Date() - startTime) + 'ms ' + response.contentText.length + 'b'
            ].join(' '));

            return result;
        };

        var startTime = new Date();

        if (!!_options.async) {
            if (!callback) throw new Error('fetch: callback must be defined in async mode');
            xhr.onreadystatechange = function () {
                if (xhr.readyState != 4) return;
                callback(null, getResult());
            };
            xhr.send(_options.payload);

        } else {
            xhr.send(_options.payload);
            return callbackAdapter(null, getResult(), callback);
        }
    }
};


module.exports = fetch;
},{"lodash":11,"project/logger":"37nxtW","project/tools/callbackAdapter":85}],75:[function(require,module,exports){
/**
 * Jsonix (node.js context)
 * Date: 13.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */


module.exports = require('jsonix'); //require('../../../../vendor/jsonix');
},{"jsonix":9}],"project/logger":[function(require,module,exports){
module.exports=require('37nxtW');
},{}],"37nxtW":[function(require,module,exports){
/**
 * Logger (Browser context)
 * Date: 11.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var consoleLog = console.log,
    profilers = {};

function log(msg) {
    consoleLog.apply(console, arguments);
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
},{}],78:[function(require,module,exports){
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


},{"./moysklad/__common":79,"./moysklad/abstractGood":80,"./moysklad/accountEntity":81,"./moysklad/attributeValue":82,"./moysklad/operationWithPositions":83,"./moysklad/order":84,"lodash":11}],79:[function(require,module,exports){
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
},{"lodash":11,"project/tools":97}],80:[function(require,module,exports){
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
},{"project/tools":97}],81:[function(require,module,exports){
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
},{"project/tools":97}],82:[function(require,module,exports){
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
},{"lodash":11,"project/tools":97}],83:[function(require,module,exports){
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
},{"project/tools":97}],84:[function(require,module,exports){
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
},{"lodash":11,"project/tools/getPositions":90}],85:[function(require,module,exports){
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

},{}],86:[function(require,module,exports){
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
},{"lodash":11}],87:[function(require,module,exports){
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
},{}],88:[function(require,module,exports){
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
},{"./../../../../../../vendor/moneytostr":102}],89:[function(require,module,exports){
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
},{"lodash":11}],90:[function(require,module,exports){
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
},{"lodash":11}],91:[function(require,module,exports){
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
},{"lodash":11}],92:[function(require,module,exports){
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
},{"lodash":11}],93:[function(require,module,exports){
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
},{"getobject":1}],94:[function(require,module,exports){
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
},{}],95:[function(require,module,exports){
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
},{"lodash":11,"project/tools/isUuid":98}],96:[function(require,module,exports){
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
},{"lodash":11,"project/tools/isUuid":98}],97:[function(require,module,exports){
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
},{"./clone":86,"./description":87,"./format/moneytostr":88,"./getAttr":89,"./getPositions":90,"./getPrice":91,"./getPriceValue":92,"./getProperty":93,"./getUriTypeName":94,"./hasAttr":95,"./hasPrice":96,"./isUuid":98}],98:[function(require,module,exports){
/**
 * isUuid
 * Date: 28.05.15
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

const UUID_REGEX = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;

module.exports = function (value) {
    return UUID_REGEX.test(value);
}
},{}],"xmldom":[function(require,module,exports){
module.exports=require('JFUvMs');
},{}],"JFUvMs":[function(require,module,exports){
/**
 * browser
 * Date: 02.07.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

module.exports = {
    DOMParser: DOMParser,

    DOMImplementation: function() {
        this.createDocument = function () {
            return document.implementation.createDocument('', '', null);
        };
        return this;
    },

    XMLSerializer: XMLSerializer
};
},{}],101:[function(require,module,exports){
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
},{"lodash":11}],102:[function(require,module,exports){
/*
 * Copyright 2013 Valentyn Kolesnikov
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var currencyList =
{
    "CurrencyList": {
        "language": { "-value": "UKR" },
        "UKR": {
            "item": [
                {
                    "-value": "0",
                    "-text": "нуль"
                },
                {
                    "-value": "1000_10",
                    "-text": "тисяч,мільйонів,мільярдів,трильйонів"
                },
                {
                    "-value": "1000_1",
                    "-text": "тисяча,мільйон,мільярд,трильйон"
                },
                {
                    "-value": "1000_234",
                    "-text": "тисячі,мільйона,мільярда,трильйона"
                },
                {
                    "-value": "1000_5",
                    "-text": "тисяч,мільйонів,мільярдів,трильйонів"
                },
                {
                    "-value": "10_19",
                    "-text": "десять,одинадцять,дванадцять,тринадцять,чотирнадцять,п’ятнадцять,шiстнадцять,сiмнадцять,вiсiмнадцять,дев'ятнадцять"
                },
                {
                    "-value": "1",
                    "-text": "одна,один,один,одна"
                },
                {
                    "-value": "2",
                    "-text": "дві,два,два,дві"
                },
                {
                    "-value": "3_9",
                    "-text": "три,чотири,п’ять,шість,сім,вісім,дев’ять"
                },
                {
                    "-value": "100_900",
                    "-text": "сто ,двісті ,триста ,чотириста ,п’ятсот ,шістсот ,сімсот ,вісімсот ,дев’ятсот "
                },
                {
                    "-value": "20_90",
                    "-text": "двадцять ,тридцять ,сорок ,п’ятдесят ,шістдесят ,сімдесят ,вісімдесят ,дев’яносто "
                },
                {
                    "-value": "pdv",
                    "-text": "в т.ч. ПДВ "
                },
                {
                    "-value": "pdv_value",
                    "-text": "20"
                }
            ]
        },
        "RUS": {
            "item": [
                {
                    "-value": "0",
                    "-text": "ноль"
                },
                {
                    "-value": "1000_10",
                    "-text": "тысяч,миллионов,миллиардов,триллионов"
                },
                {
                    "-value": "1000_1",
                    "-text": "тысяча,миллион,миллиард,триллион"
                },
                {
                    "-value": "1000_234",
                    "-text": "тысячи,миллиона,миллиарда,триллиона"
                },
                {
                    "-value": "1000_5",
                    "-text": "тысяч,миллионов,миллиардов,триллионов"
                },
                {
                    "-value": "10_19",
                    "-text": "десять,одиннадцать,двенадцать,тринадцать,четырнадцать,пятнадцать,шестнадцать,семнадцать,восемнадцать,девятнадцать"
                },
                {
                    "-value": "1",
                    "-text": "одна,один,один,одна"
                },
                {
                    "-value": "2",
                    "-text": "две,два,два,две"
                },
                {
                    "-value": "3_9",
                    "-text": "три,четыре,пять,шесть,семь,восемь,девять"
                },
                {
                    "-value": "100_900",
                    "-text": "сто ,двести ,триста ,четыреста ,пятьсот ,шестьсот ,семьсот ,восемьсот ,девятьсот "
                },
                {
                    "-value": "20_90",
                    "-text": "двадцать ,тридцать ,сорок ,пятьдесят ,шестьдесят ,семьдесят ,восемьдесят ,девяносто "
                },
                {
                    "-value": "pdv",
                    "-text": "в т.ч. НДС "
                },
                {
                    "-value": "pdv_value",
                    "-text": "18"
                }
            ]
        },
        "ENG": {
            "item": [
                {
                    "-value": "0",
                    "-text": "zero"
                },
                {
                    "-value": "1000_10",
                    "-text": "thousand,million,billion,trillion"
                },
                {
                    "-value": "1000_1",
                    "-text": "thousand,million,billion,trillion"
                },
                {
                    "-value": "1000_234",
                    "-text": "thousand,million,billion,trillion"
                },
                {
                    "-value": "1000_5",
                    "-text": "thousand,million,billion,trillion"
                },
                {
                    "-value": "10_19",
                    "-text": "ten,eleven,twelve,thirteen,fourteen,fifteen,sixteen,seventeen,eighteen,nineteen"
                },
                {
                    "-value": "1",
                    "-text": "one,one,one,one"
                },
                {
                    "-value": "2",
                    "-text": "two,two,two,two"
                },
                {
                    "-value": "3_9",
                    "-text": "three,four,five,six,seven,eight,nine"
                },
                {
                    "-value": "100_900",
                    "-text": "one hundred ,two hundred ,three hundred ,four hundred ,five hundred ,six hundred ,seven hundred ,eight hundred ,nine hundred "
                },
                {
                    "-value": "20_90",
                    "-text": "twenty-,thirty-,forty-,fifty-,sixty-,seventy-,eighty-,ninety-"
                },
                {
                    "-value": "pdv",
                    "-text": "including VAT "
                },
                {
                    "-value": "pdv_value",
                    "-text": "10"
                }
            ]
        },
        "RUR": [
            {
                "-CurrID": "810",
                "-CurrName": "Российские рубли",
                "-language": "RUS",
                "-RubOneUnit": "рубль",
                "-RubTwoUnit": "рубля",
                "-RubFiveUnit": "рублей",
                "-RubSex": "M",
                "-RubShortUnit": "руб.",
                "-KopOneUnit": "копейка",
                "-KopTwoUnit": "копейки",
                "-KopFiveUnit": "копеек",
                "-KopSex": "F"
            },
            {
                "-CurrID": "810",
                "-CurrName": "Российские рубли",
                "-language": "UKR",
                "-RubOneUnit": "рубль",
                "-RubTwoUnit": "рублі",
                "-RubFiveUnit": "рублів",
                "-RubSex": "M",
                "-RubShortUnit": "руб.",
                "-KopOneUnit": "копійка",
                "-KopTwoUnit": "копійки",
                "-KopFiveUnit": "копійок",
                "-KopSex": "F"
            },
            {
                "-CurrID": "810",
                "-CurrName": "Российские рубли",
                "-language": "ENG",
                "-RubOneUnit": "ruble",
                "-RubTwoUnit": "rubles",
                "-RubFiveUnit": "rubles",
                "-RubSex": "M",
                "-RubShortUnit": "RUR.",
                "-KopOneUnit": "kopeck",
                "-KopTwoUnit": "kopecks",
                "-KopFiveUnit": "kopecks",
                "-KopSex": "M"
            }
        ],
        "UAH": [
            {
                "-CurrID": "980",
                "-CurrName": "Украинскі гривні",
                "-language": "RUS",
                "-RubOneUnit": "гривня",
                "-RubTwoUnit": "гривни",
                "-RubFiveUnit": "гривень",
                "-RubSex": "F",
                "-RubShortUnit": "грн.",
                "-KopOneUnit": "копейка",
                "-KopTwoUnit": "копейки",
                "-KopFiveUnit": "копеек",
                "-KopSex": "F"
            },
            {
                "-CurrID": "980",
                "-CurrName": "Украинскі гривні",
                "-language": "UKR",
                "-RubOneUnit": "гривня",
                "-RubTwoUnit": "гривні",
                "-RubFiveUnit": "гривень",
                "-RubSex": "F",
                "-RubShortUnit": "грн.",
                "-KopOneUnit": "копійка",
                "-KopTwoUnit": "копійки",
                "-KopFiveUnit": "копійок",
                "-KopSex": "F"
            },
            {
                "-CurrID": "980",
                "-CurrName": "Украинскі гривні",
                "-language": "ENG",
                "-RubOneUnit": "hryvnia",
                "-RubTwoUnit": "hryvnias",
                "-RubFiveUnit": "hryvnias",
                "-RubSex": "M",
                "-RubShortUnit": "UAH.",
                "-KopOneUnit": "kopeck",
                "-KopTwoUnit": "kopecks",
                "-KopFiveUnit": "kopecks",
                "-KopSex": "M"
            }
        ],
        "USD": [
            {
                "-CurrID": "840",
                "-CurrName": "Долари США",
                "-language": "RUS",
                "-RubOneUnit": "доллар",
                "-RubTwoUnit": "доллара",
                "-RubFiveUnit": "долларов",
                "-RubSex": "M",
                "-RubShortUnit": "дол.",
                "-KopOneUnit": "цент",
                "-KopTwoUnit": "цена",
                "-KopFiveUnit": "центов",
                "-KopSex": "M"
            },
            {
                "-CurrID": "840",
                "-CurrName": "Долари США",
                "-language": "UKR",
                "-RubOneUnit": "долар",
                "-RubTwoUnit": "долара",
                "-RubFiveUnit": "доларів",
                "-RubSex": "M",
                "-RubShortUnit": "дол.",
                "-KopOneUnit": "цент",
                "-KopTwoUnit": "цена",
                "-KopFiveUnit": "центів",
                "-KopSex": "M"
            },
            {
                "-CurrID": "840",
                "-CurrName": "Долари США",
                "-language": "ENG",
                "-RubOneUnit": "dollar",
                "-RubTwoUnit": "dollars",
                "-RubFiveUnit": "dollars",
                "-RubSex": "M",
                "-RubShortUnit": "USD.",
                "-KopOneUnit": "cent",
                "-KopTwoUnit": "cents",
                "-KopFiveUnit": "cents",
                "-KopSex": "M"
            }
        ],
        "PER10": [
            {
                "-CurrID": "556",
                "-CurrName": "Вiдсотки з десятими частинами",
                "-language": "RUS",
                "-RubOneUnit": "целая,",
                "-RubTwoUnit": "целых,",
                "-RubFiveUnit": "целых,",
                "-RubSex": "F",
                "-KopOneUnit": "десятая процента",
                "-KopTwoUnit": "десятых процента",
                "-KopFiveUnit": "десятых процента",
                "-KopSex": "F"
            },
            {
                "-CurrID": "556",
                "-CurrName": "Вiдсотки з десятими частинами",
                "-language": "UKR",
                "-RubOneUnit": "ціла,",
                "-RubTwoUnit": "цілих,",
                "-RubFiveUnit": "цілих,",
                "-RubSex": "F",
                "-KopOneUnit": "десята відсотка",
                "-KopTwoUnit": "десятих відсотка",
                "-KopFiveUnit": "десятих відсотка",
                "-KopSex": "F"
            },
            {
                "-CurrID": "560",
                "-CurrName": "Вiдсотки з десятими частинами",
                "-language": "ENG",
                "-RubOneUnit": ",",
                "-RubTwoUnit": "integers,",
                "-RubFiveUnit": "integers,",
                "-RubSex": "F",
                "-KopOneUnit": "tenth of one percent",
                "-KopTwoUnit": "tenth of one percent",
                "-KopFiveUnit": "tenth of one percent",
                "-KopSex": "F"
            }
        ],
        "PER100": [
            {
                "-CurrID": "557",
                "-CurrName": "Вiдсотки з сотими частинами",
                "-language": "RUS",
                "-RubOneUnit": "целая,",
                "-RubTwoUnit": "целых,",
                "-RubFiveUnit": "целых,",
                "-RubSex": "F",
                "-KopOneUnit": "сотая процента",
                "-KopTwoUnit": "сотых процента",
                "-KopFiveUnit": "сотых процента",
                "-KopSex": "F"
            },
            {
                "-CurrID": "557",
                "-CurrName": "Вiдсотки з сотими частинами",
                "-language": "UKR",
                "-RubOneUnit": "ціла,",
                "-RubTwoUnit": "цілих,",
                "-RubFiveUnit": "цілих,",
                "-RubSex": "F",
                "-KopOneUnit": "сота відсотка",
                "-KopTwoUnit": "сотих відсотка",
                "-KopFiveUnit": "сотих відсотка",
                "-KopSex": "F"
            },
            {
                "-CurrID": "561",
                "-CurrName": "Вiдсотки з сотими частинами",
                "-language": "ENG",
                "-RubOneUnit": ",",
                "-RubTwoUnit": "integers,",
                "-RubFiveUnit": "integers,",
                "-RubSex": "F",
                "-KopOneUnit": "hundred percent",
                "-KopTwoUnit": "hundredth of percent",
                "-KopFiveUnit": "hundredth of percent",
                "-KopSex": "F"
            }
        ],
        "PER1000": [
            {
                "-CurrID": "558",
                "-CurrName": "Вiдсотки з тисячними частинами",
                "-language": "RUS",
                "-RubOneUnit": "целая,",
                "-RubTwoUnit": "целых,",
                "-RubFiveUnit": "целых,",
                "-RubSex": "F",
                "-KopOneUnit": "тысячная процента",
                "-KopTwoUnit": "тысячных процента",
                "-KopFiveUnit": "тысячных процента",
                "-KopSex": "F"
            },
            {
                "-CurrID": "558",
                "-CurrName": "Вiдсотки з тисячними частинами",
                "-language": "UKR",
                "-RubOneUnit": "ціла,",
                "-RubTwoUnit": "цілих,",
                "-RubFiveUnit": "цілих,",
                "-RubSex": "F",
                "-KopOneUnit": "тисячна відсотка",
                "-KopTwoUnit": "тисячних відсотка",
                "-KopFiveUnit": "тисячних відсотка",
                "-KopSex": "F"
            },
            {
                "-CurrID": "562",
                "-CurrName": "Вiдсотки з тисячними частинами",
                "-language": "ENG",
                "-RubOneUnit": ",",
                "-RubTwoUnit": "integers,",
                "-RubFiveUnit": "integers,",
                "-RubSex": "F",
                "-KopOneUnit": "thousandth of percent",
                "-KopTwoUnit": "thousandths of percent",
                "-KopFiveUnit": "thousandths of percent",
                "-KopSex": "F"
            }
        ],
        "PER10000": [
            {
                "-CurrID": "559",
                "-CurrName": "Вiдсотки з десяти тисячними частинами",
                "-language": "RUS",
                "-RubOneUnit": "целая,",
                "-RubTwoUnit": "целых,",
                "-RubFiveUnit": "целых,",
                "-RubSex": "F",
                "-KopOneUnit": "десятитысячная процента",
                "-KopTwoUnit": "десятитысячные процента",
                "-KopFiveUnit": "десятитысячных процента",
                "-KopSex": "F"
            },
            {
                "-CurrID": "559",
                "-CurrName": "Вiдсотки з десяти тисячними частинами",
                "-language": "UKR",
                "-RubOneUnit": "ціла,",
                "-RubTwoUnit": "цілих,",
                "-RubFiveUnit": "цілих,",
                "-RubSex": "F",
                "-KopOneUnit": "десятитисячна відсотка",
                "-KopTwoUnit": "десятитисячних відсотка",
                "-KopFiveUnit": "десятитисячних відсотка",
                "-KopSex": "M"
            },
            {
                "-CurrID": "563",
                "-CurrName": "Вiдсотки з десяти тисячними частинами",
                "-language": "ENG",
                "-RubOneUnit": ",",
                "-RubTwoUnit": "integers,",
                "-RubFiveUnit": "integers,",
                "-RubSex": "F",
                "-KopOneUnit": "ten percent",
                "-KopTwoUnit": "ten-percent",
                "-KopFiveUnit": "ten-percent",
                "-KopSex": "F"
            }
        ]
    }
};
/**
 * Converts numbers to symbols.
 *
 * @author Valentyn V Kolesnikov
 * @version $Revision$ $Date$
 */

/** Currency. */
var Currency = (function () {
    function Currency() {
    }
    Currency.UAH = 'UAH';

    Currency.RUR = 'RUR';

    Currency.USD = 'USD';

    Currency.PER10 = 'PER10';

    Currency.PER100 = 'PER100';

    Currency.PER1000 = 'PER1000';

    Currency.PER10000 = 'PER10000';
    return Currency;
})();

/** Language. */
var Language = (function () {
    function Language() {
    }
    Language.RUS = 'RUS';

    Language.UKR = 'UKR';

    Language.ENG = 'ENG';
    return Language;
})();

/** Pennies. */
var Pennies = (function () {
    function Pennies() {
    }
    Pennies.NUMBER = 'NUMBER';

    Pennies.TEXT = 'TEXT';
    return Pennies;
})();

var StringBuilder = (function () {
    function StringBuilder() {
        this._buffer = [];
    }
    StringBuilder.prototype.append = function (text) {
        this._buffer[this._buffer.length] = text;
        return this;
    };

    StringBuilder.prototype.insert = function (index, text) {
        this._buffer.splice(index, 0, text);
        return this;
    };

    StringBuilder.prototype.length = function () {
        return this.toString().length;
    };

    StringBuilder.prototype.deleteCharAt = function (index) {
        var str = this.toString();
        this._buffer = [];
        this.append(str.substring(0, index));
        return this;
    };

    StringBuilder.prototype.toString = function () {
        return this._buffer.join("");
    };
    return StringBuilder;
})();

var MoneyToStr = (function () {
    MoneyToStr.NUM0 = 0;
    MoneyToStr.NUM1 = 1;
    MoneyToStr.NUM2 = 2;
    MoneyToStr.NUM3 = 3;
    MoneyToStr.NUM4 = 4;
    MoneyToStr.NUM5 = 5;
    MoneyToStr.NUM6 = 6;
    MoneyToStr.NUM7 = 7;
    MoneyToStr.NUM8 = 8;
    MoneyToStr.NUM9 = 9;
    MoneyToStr.NUM10 = 10;
    MoneyToStr.NUM11 = 11;
    MoneyToStr.NUM14 = 14;
    MoneyToStr.NUM100 = 100;
    MoneyToStr.NUM1000 = 1000;
    MoneyToStr.NUM10000 = 10000;
    MoneyToStr.INDEX_0 = 0;
    MoneyToStr.INDEX_1 = 1;
    MoneyToStr.INDEX_2 = 2;
    MoneyToStr.INDEX_3 = 3;

    MoneyToStr.percentToStr = function (amount, lang) {
        if (amount == null) {
            throw new Error("amount is null");
        }
        if (lang == null) {
            throw new Error("lang is null");
        }
        var intPart = parseInt(amount);
        var fractPart = 0;
        var result;
        if (amount == parseInt(amount)) {
            result = new MoneyToStr(Currency.PER10, lang, Pennies.TEXT).convert(amount, 0);
        } else if ((amount * MoneyToStr.NUM10).toFixed(4) == parseInt(amount * MoneyToStr.NUM10)) {
            fractPart = Math.round((amount - intPart) * MoneyToStr.NUM10);
            result = new MoneyToStr(Currency.PER10, lang, Pennies.TEXT).convert(intPart, fractPart);
        } else if ((amount * MoneyToStr.NUM100).toFixed(4) == parseInt(amount * MoneyToStr.NUM100)) {
            fractPart = Math.round((amount - intPart) * MoneyToStr.NUM100);
            result = new MoneyToStr(Currency.PER100, lang, Pennies.TEXT).convert(intPart, fractPart);
        } else if ((amount * MoneyToStr.NUM1000).toFixed(4) == parseInt(amount * MoneyToStr.NUM1000)) {
            fractPart = Math.round((amount - intPart) * MoneyToStr.NUM1000);
            result = new MoneyToStr(Currency.PER1000, lang, Pennies.TEXT).convert(intPart, fractPart);
        } else {
            fractPart = Math.round((amount - intPart) * MoneyToStr.NUM10000);
            result = new MoneyToStr(Currency.PER10000, lang, Pennies.TEXT).convert(intPart, fractPart);
        }
        return result;
    }

    function MoneyToStr(currency, language, pennies) {
        this.currency = currency;
        this.language = language;
        this.pennies = pennies;
        var languageElement = language;
        var items = currencyList['CurrencyList'][languageElement]['item'];
        this.messages = {};
        for (var index in items) {
            var languageItem = items[index];
            if (languageItem["-text"]) {
                this.messages[languageItem["-value"]] = languageItem["-text"].split(",");
            }
        }
        var currencyItem = currencyList['CurrencyList'][currency]
        var theISOElement = null;
        for (var index in currencyItem) {
            if (currencyItem[index]["-language"] == language) {
                theISOElement = currencyItem[index];
                break;
            }
        }
        if (theISOElement == null) {
            throw new Error("Currency not found " + currency);
        }
        this.rubOneUnit = theISOElement["-RubOneUnit"];
        this.rubTwoUnit = theISOElement["-RubTwoUnit"];
        this.rubFiveUnit = theISOElement["-RubFiveUnit"];
        this.kopOneUnit = theISOElement["-KopOneUnit"];
        this.kopTwoUnit = theISOElement["-KopTwoUnit"];
        this.kopFiveUnit = theISOElement["-KopFiveUnit"];
        this.rubSex = theISOElement["-RubSex"];
        this.kopSex = theISOElement["-KopSex"];
        this.rubShortUnit = theISOElement["-RubShortUnit"];
    }

    /**
     * Converts double value to the text description.
     *
     * @param theMoney
     *            the amount of money in format major.minor
     * @return the string description of money value
     */
    MoneyToStr.prototype.convertValue = function (theMoney) {
        if (typeof theMoney === undefined || theMoney == null) {
            throw new Error("theMoney is null");
        }
        var intPart = parseInt(theMoney);
        var fractPart = Math.round((theMoney - intPart) * MoneyToStr.NUM100);
        if (this.currency == Currency.PER1000) {
            fractPart = Math.round((theMoney - intPart) * MoneyToStr.NUM1000);
        }
        return this.convert(intPart, fractPart);
    }

    /**
     * Converts number to currency. Usage: MoneyToStr moneyToStr = new MoneyToStr("UAH"); String result =
     * moneyToStr.convert(123D); Expected: result = сто двадцять три гривні 00 копійок
     *
     * @param theMoney
     *            the amount of money major currency
     * @param theKopeiki
     *            the amount of money minor currency
     * @return the string description of money value
     */
    MoneyToStr.prototype.convert = function (theMoney, theKopeiki) {
        if (typeof theMoney === undefined || theMoney == null) {
            throw new Error("theMoney is null");
        }
        if (typeof theKopeiki === undefined || theKopeiki == null) {
            throw new Error("theKopeiki is null");
        }
        var money2str = new StringBuilder();
        var triadNum = 0;
        var theTriad = 0;
        var intPart = theMoney;
        if (intPart == 0) {
            money2str.append(this.messages["0"][0] + " ");
        }
        do {
            theTriad = parseInt(intPart % MoneyToStr.NUM1000);
            money2str.insert(0, this.triad2Word(theTriad, triadNum, this.rubSex));
            if (triadNum == 0) {
                var range10 = parseInt((theTriad % MoneyToStr.NUM100) / MoneyToStr.NUM10);
                var range = parseInt(theTriad % MoneyToStr.NUM10);
                if (range10 == MoneyToStr.NUM1) {
                    money2str.append(this.rubFiveUnit);
                } else {
                    switch (range) {
                        case MoneyToStr.NUM1:
                            money2str.append(this.rubOneUnit);
                            break;
                        case MoneyToStr.NUM2:
                        case MoneyToStr.NUM3:
                        case MoneyToStr.NUM4:
                            money2str.append(this.rubTwoUnit);
                            break;
                        default:
                            money2str.append(this.rubFiveUnit);
                            break;
                    }
                }
            }
            intPart = parseInt(intPart / MoneyToStr.NUM1000);
            triadNum++;
        } while (intPart > 0);

        if (this.pennies == Pennies.TEXT) {
            money2str.append(this.language == Language.ENG ? " and " : " ").append(theKopeiki == 0 ? this.messages["0"][0] + " " : this.triad2Word(theKopeiki, 0, this.kopSex));
        } else {
            money2str.append(" " + (theKopeiki < 10 ? "0" + theKopeiki : theKopeiki) + " ");
        }
        if (theKopeiki >= MoneyToStr.NUM11 && theKopeiki <= MoneyToStr.NUM14) {
            money2str.append(this.kopFiveUnit);
        } else {
            switch (parseInt(theKopeiki % MoneyToStr.NUM10)) {
                case MoneyToStr.NUM1:
                    money2str.append(this.kopOneUnit);
                    break;
                case MoneyToStr.NUM2:
                case MoneyToStr.NUM3:
                case MoneyToStr.NUM4:
                    money2str.append(this.kopTwoUnit);
                    break;
                default:
                    money2str.append(this.kopFiveUnit);
                    break;
            }
        }
        return money2str.toString().trim();
    }

    MoneyToStr.prototype.triad2Word = function (triad, triadNum, sex) {
        var triadWord = new StringBuilder();

        if (triad == 0) {
            return "";
        }

        var range = this.check1(triad, triadWord);
        if (this.language == Language.ENG && triadWord.length() > 0 && triad % MoneyToStr.NUM10 == 0) {
            triadWord.deleteCharAt(triadWord.length() - 1);
            triadWord.append(" ");
        }

        var range10 = range;
        range = parseInt(triad % MoneyToStr.NUM10);
        this.check2(triadNum, sex, triadWord, triad, range10);
        switch (triadNum) {
            case MoneyToStr.NUM0:
                break;
            case MoneyToStr.NUM1:
            case MoneyToStr.NUM2:
            case MoneyToStr.NUM3:
            case MoneyToStr.NUM4:
                if (range10 == MoneyToStr.NUM1) {
                    triadWord.append(this.messages["1000_10"][triadNum - 1] + " ");
                } else {
                    switch (range) {
                        case MoneyToStr.NUM1:
                            triadWord.append(this.messages["1000_1"][triadNum - 1] + " ");
                            break;
                        case MoneyToStr.NUM2:
                        case MoneyToStr.NUM3:
                        case MoneyToStr.NUM4:
                            triadWord.append(this.messages["1000_234"][triadNum - 1] + " ");
                            break;
                        default:
                            triadWord.append(this.messages["1000_5"][triadNum - 1] + " ");
                            break;
                    }
                }
                break;
            default:
                triadWord.append("??? ");
                break;
        }
        return triadWord.toString();
    }

    /**
     * @param triadNum the triad num
     * @param sex the sex
     * @param triadWord the triad word
     * @param triad the triad
     * @param range10 the range 10
     */
    MoneyToStr.prototype.check2 = function (triadNum, sex, triadWord, triad, range10) {
        var range = parseInt(triad % MoneyToStr.NUM10);
        if (range10 == 1) {
            triadWord.append(this.messages["10_19"][range] + " ");
        } else {
            switch (range) {
                case MoneyToStr.NUM1:
                    if (triadNum == MoneyToStr.NUM1) {
                        triadWord.append(this.messages["1"][MoneyToStr.INDEX_0] + " ");
                    } else if (triadNum == MoneyToStr.NUM2 || triadNum == MoneyToStr.NUM3 || triadNum == MoneyToStr.NUM4) {
                        triadWord.append(this.messages["1"][MoneyToStr.INDEX_1] + " ");
                    } else if ("M" == sex) {
                        triadWord.append(this.messages["1"][MoneyToStr.INDEX_2] + " ");
                    } else if ("F" == sex) {
                        triadWord.append(this.messages["1"][MoneyToStr.INDEX_3] + " ");
                    }
                    break;
                case MoneyToStr.NUM2:
                    if (triadNum == MoneyToStr.NUM1) {
                        triadWord.append(this.messages["2"][MoneyToStr.INDEX_0] + " ");
                    } else if (triadNum == MoneyToStr.NUM2 || triadNum == MoneyToStr.NUM3 || triadNum == MoneyToStr.NUM4) {
                        triadWord.append(this.messages["2"][MoneyToStr.INDEX_1] + " ");
                    } else if ("M" == sex) {
                        triadWord.append(this.messages["2"][MoneyToStr.INDEX_2] + " ");
                    } else if ("F" == sex) {
                        triadWord.append(this.messages["2"][MoneyToStr.INDEX_3] + " ");
                    }
                    break;
                case MoneyToStr.NUM3:
                case MoneyToStr.NUM4:
                case MoneyToStr.NUM5:
                case MoneyToStr.NUM6:
                case MoneyToStr.NUM7:
                case MoneyToStr.NUM8:
                case MoneyToStr.NUM9:
                    triadWord.append(["", "", ""].concat(this.messages["3_9"])[range] + " ");
                    break;
                default:
                    break;
            }
        }
    }

    /**
     * @param triad the triad
     * @param triadWord the triad word
     * @return the range
     */
    MoneyToStr.prototype.check1 = function (triad, triadWord) {
        var range = parseInt(triad / MoneyToStr.NUM100);
        triadWord.append([""].concat(this.messages["100_900"])[range]);

        range = parseInt((triad % MoneyToStr.NUM100) / MoneyToStr.NUM10);
        triadWord.append(["", ""].concat(this.messages["20_90"])[range]);
        return range;
    }

    MoneyToStr.prototype.getMessages = function() {
        return this.messages;
    }

    MoneyToStr.prototype.getRubShortUnit = function() {
        return this.rubShortUnit;
    }

    return MoneyToStr;
})();

//TODO Удалить лишние языки (генерация из данных валюты МойСклад)
module.exports = {
    MoneyToStr: MoneyToStr,
    Pennies: Pennies,
    Language: Language,
    Currency: Currency
};
},{}]},{},["1wiUUs"]);

    return {
        start: function(taist, entryPoint) {}
    };
}