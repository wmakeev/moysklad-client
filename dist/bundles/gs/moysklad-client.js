window = this;
function getLib() {
!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Bundle=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var global=typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};/**
 * @license
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modern -o ./dist/lodash.js`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
;(function() {

  /** Used as a safe reference for `undefined` in pre ES5 environments */
  var undefined;

  /** Used to pool arrays and objects used internally */
  var arrayPool = [],
      objectPool = [];

  /** Used to generate unique IDs */
  var idCounter = 0;

  /** Used to prefix keys to avoid issues with `__proto__` and properties on `Object.prototype` */
  var keyPrefix = +new Date + '';

  /** Used as the size when optimizations are enabled for large arrays */
  var largeArraySize = 75;

  /** Used as the max size of the `arrayPool` and `objectPool` */
  var maxPoolSize = 40;

  /** Used to detect and test whitespace */
  var whitespace = (
    // whitespace
    ' \t\x0B\f\xA0\ufeff' +

    // line terminators
    '\n\r\u2028\u2029' +

    // unicode category "Zs" space separators
    '\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000'
  );

  /** Used to match empty string literals in compiled template source */
  var reEmptyStringLeading = /\b__p \+= '';/g,
      reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
      reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

  /**
   * Used to match ES6 template delimiters
   * http://people.mozilla.org/~jorendorff/es6-draft.html#sec-literals-string-literals
   */
  var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

  /** Used to match regexp flags from their coerced string values */
  var reFlags = /\w*$/;

  /** Used to detected named functions */
  var reFuncName = /^\s*function[ \n\r\t]+\w/;

  /** Used to match "interpolate" template delimiters */
  var reInterpolate = /<%=([\s\S]+?)%>/g;

  /** Used to match leading whitespace and zeros to be removed */
  var reLeadingSpacesAndZeros = RegExp('^[' + whitespace + ']*0+(?=.$)');

  /** Used to ensure capturing order of template delimiters */
  var reNoMatch = /($^)/;

  /** Used to detect functions containing a `this` reference */
  var reThis = /\bthis\b/;

  /** Used to match unescaped characters in compiled string literals */
  var reUnescapedString = /['\n\r\t\u2028\u2029\\]/g;

  /** Used to assign default `context` object properties */
  var contextProps = [
    'Array', 'Boolean', 'Date', 'Function', 'Math', 'Number', 'Object',
    'RegExp', 'String', '_', 'attachEvent', 'clearTimeout', 'isFinite', 'isNaN',
    'parseInt', 'setTimeout'
  ];

  /** Used to make template sourceURLs easier to identify */
  var templateCounter = 0;

  /** `Object#toString` result shortcuts */
  var argsClass = '[object Arguments]',
      arrayClass = '[object Array]',
      boolClass = '[object Boolean]',
      dateClass = '[object Date]',
      funcClass = '[object Function]',
      numberClass = '[object Number]',
      objectClass = '[object Object]',
      regexpClass = '[object RegExp]',
      stringClass = '[object String]';

  /** Used to identify object classifications that `_.clone` supports */
  var cloneableClasses = {};
  cloneableClasses[funcClass] = false;
  cloneableClasses[argsClass] = cloneableClasses[arrayClass] =
  cloneableClasses[boolClass] = cloneableClasses[dateClass] =
  cloneableClasses[numberClass] = cloneableClasses[objectClass] =
  cloneableClasses[regexpClass] = cloneableClasses[stringClass] = true;

  /** Used as an internal `_.debounce` options object */
  var debounceOptions = {
    'leading': false,
    'maxWait': 0,
    'trailing': false
  };

  /** Used as the property descriptor for `__bindData__` */
  var descriptor = {
    'configurable': false,
    'enumerable': false,
    'value': null,
    'writable': false
  };

  /** Used to determine if values are of the language type Object */
  var objectTypes = {
    'boolean': false,
    'function': true,
    'object': true,
    'number': false,
    'string': false,
    'undefined': false
  };

  /** Used to escape characters for inclusion in compiled string literals */
  var stringEscapes = {
    '\\': '\\',
    "'": "'",
    '\n': 'n',
    '\r': 'r',
    '\t': 't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  /** Used as a reference to the global object */
  var root = (objectTypes[typeof window] && window) || this;

  /** Detect free variable `exports` */
  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

  /** Detect free variable `module` */
  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports` */
  var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;

  /** Detect free variable `global` from Node.js or Browserified code and use it as `root` */
  var freeGlobal = objectTypes[typeof global] && global;
  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
    root = freeGlobal;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * The base implementation of `_.indexOf` without support for binary searches
   * or `fromIndex` constraints.
   *
   * @private
   * @param {Array} array The array to search.
   * @param {*} value The value to search for.
   * @param {number} [fromIndex=0] The index to search from.
   * @returns {number} Returns the index of the matched value or `-1`.
   */
  function baseIndexOf(array, value, fromIndex) {
    var index = (fromIndex || 0) - 1,
        length = array ? array.length : 0;

    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }

  /**
   * An implementation of `_.contains` for cache objects that mimics the return
   * signature of `_.indexOf` by returning `0` if the value is found, else `-1`.
   *
   * @private
   * @param {Object} cache The cache object to inspect.
   * @param {*} value The value to search for.
   * @returns {number} Returns `0` if `value` is found, else `-1`.
   */
  function cacheIndexOf(cache, value) {
    var type = typeof value;
    cache = cache.cache;

    if (type == 'boolean' || value == null) {
      return cache[value] ? 0 : -1;
    }
    if (type != 'number' && type != 'string') {
      type = 'object';
    }
    var key = type == 'number' ? value : keyPrefix + value;
    cache = (cache = cache[type]) && cache[key];

    return type == 'object'
      ? (cache && baseIndexOf(cache, value) > -1 ? 0 : -1)
      : (cache ? 0 : -1);
  }

  /**
   * Adds a given value to the corresponding cache object.
   *
   * @private
   * @param {*} value The value to add to the cache.
   */
  function cachePush(value) {
    var cache = this.cache,
        type = typeof value;

    if (type == 'boolean' || value == null) {
      cache[value] = true;
    } else {
      if (type != 'number' && type != 'string') {
        type = 'object';
      }
      var key = type == 'number' ? value : keyPrefix + value,
          typeCache = cache[type] || (cache[type] = {});

      if (type == 'object') {
        (typeCache[key] || (typeCache[key] = [])).push(value);
      } else {
        typeCache[key] = true;
      }
    }
  }

  /**
   * Used by `_.max` and `_.min` as the default callback when a given
   * collection is a string value.
   *
   * @private
   * @param {string} value The character to inspect.
   * @returns {number} Returns the code unit of given character.
   */
  function charAtCallback(value) {
    return value.charCodeAt(0);
  }

  /**
   * Used by `sortBy` to compare transformed `collection` elements, stable sorting
   * them in ascending order.
   *
   * @private
   * @param {Object} a The object to compare to `b`.
   * @param {Object} b The object to compare to `a`.
   * @returns {number} Returns the sort order indicator of `1` or `-1`.
   */
  function compareAscending(a, b) {
    var ac = a.criteria,
        bc = b.criteria,
        index = -1,
        length = ac.length;

    while (++index < length) {
      var value = ac[index],
          other = bc[index];

      if (value !== other) {
        if (value > other || typeof value == 'undefined') {
          return 1;
        }
        if (value < other || typeof other == 'undefined') {
          return -1;
        }
      }
    }
    // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
    // that causes it, under certain circumstances, to return the same value for
    // `a` and `b`. See https://github.com/jashkenas/underscore/pull/1247
    //
    // This also ensures a stable sort in V8 and other engines.
    // See http://code.google.com/p/v8/issues/detail?id=90
    return a.index - b.index;
  }

  /**
   * Creates a cache object to optimize linear searches of large arrays.
   *
   * @private
   * @param {Array} [array=[]] The array to search.
   * @returns {null|Object} Returns the cache object or `null` if caching should not be used.
   */
  function createCache(array) {
    var index = -1,
        length = array.length,
        first = array[0],
        mid = array[(length / 2) | 0],
        last = array[length - 1];

    if (first && typeof first == 'object' &&
        mid && typeof mid == 'object' && last && typeof last == 'object') {
      return false;
    }
    var cache = getObject();
    cache['false'] = cache['null'] = cache['true'] = cache['undefined'] = false;

    var result = getObject();
    result.array = array;
    result.cache = cache;
    result.push = cachePush;

    while (++index < length) {
      result.push(array[index]);
    }
    return result;
  }

  /**
   * Used by `template` to escape characters for inclusion in compiled
   * string literals.
   *
   * @private
   * @param {string} match The matched character to escape.
   * @returns {string} Returns the escaped character.
   */
  function escapeStringChar(match) {
    return '\\' + stringEscapes[match];
  }

  /**
   * Gets an array from the array pool or creates a new one if the pool is empty.
   *
   * @private
   * @returns {Array} The array from the pool.
   */
  function getArray() {
    return arrayPool.pop() || [];
  }

  /**
   * Gets an object from the object pool or creates a new one if the pool is empty.
   *
   * @private
   * @returns {Object} The object from the pool.
   */
  function getObject() {
    return objectPool.pop() || {
      'array': null,
      'cache': null,
      'criteria': null,
      'false': false,
      'index': 0,
      'null': false,
      'number': null,
      'object': null,
      'push': null,
      'string': null,
      'true': false,
      'undefined': false,
      'value': null
    };
  }

  /**
   * Releases the given array back to the array pool.
   *
   * @private
   * @param {Array} [array] The array to release.
   */
  function releaseArray(array) {
    array.length = 0;
    if (arrayPool.length < maxPoolSize) {
      arrayPool.push(array);
    }
  }

  /**
   * Releases the given object back to the object pool.
   *
   * @private
   * @param {Object} [object] The object to release.
   */
  function releaseObject(object) {
    var cache = object.cache;
    if (cache) {
      releaseObject(cache);
    }
    object.array = object.cache = object.criteria = object.object = object.number = object.string = object.value = null;
    if (objectPool.length < maxPoolSize) {
      objectPool.push(object);
    }
  }

  /**
   * Slices the `collection` from the `start` index up to, but not including,
   * the `end` index.
   *
   * Note: This function is used instead of `Array#slice` to support node lists
   * in IE < 9 and to ensure dense arrays are returned.
   *
   * @private
   * @param {Array|Object|string} collection The collection to slice.
   * @param {number} start The start index.
   * @param {number} end The end index.
   * @returns {Array} Returns the new array.
   */
  function slice(array, start, end) {
    start || (start = 0);
    if (typeof end == 'undefined') {
      end = array ? array.length : 0;
    }
    var index = -1,
        length = end - start || 0,
        result = Array(length < 0 ? 0 : length);

    while (++index < length) {
      result[index] = array[start + index];
    }
    return result;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Create a new `lodash` function using the given context object.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {Object} [context=root] The context object.
   * @returns {Function} Returns the `lodash` function.
   */
  function runInContext(context) {
    // Avoid issues with some ES3 environments that attempt to use values, named
    // after built-in constructors like `Object`, for the creation of literals.
    // ES5 clears this up by stating that literals must use built-in constructors.
    // See http://es5.github.io/#x11.1.5.
    context = context ? _.defaults(root.Object(), context, _.pick(root, contextProps)) : root;

    /** Native constructor references */
    var Array = context.Array,
        Boolean = context.Boolean,
        Date = context.Date,
        Function = context.Function,
        Math = context.Math,
        Number = context.Number,
        Object = context.Object,
        RegExp = context.RegExp,
        String = context.String,
        TypeError = context.TypeError;

    /**
     * Used for `Array` method references.
     *
     * Normally `Array.prototype` would suffice, however, using an array literal
     * avoids issues in Narwhal.
     */
    var arrayRef = [];

    /** Used for native method references */
    var objectProto = Object.prototype;

    /** Used to restore the original `_` reference in `noConflict` */
    var oldDash = context._;

    /** Used to resolve the internal [[Class]] of values */
    var toString = objectProto.toString;

    /** Used to detect if a method is native */
    var reNative = RegExp('^' +
      String(toString)
        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        .replace(/toString| for [^\]]+/g, '.*?') + '$'
    );

    /** Native method shortcuts */
    var ceil = Math.ceil,
        clearTimeout = context.clearTimeout,
        floor = Math.floor,
        fnToString = Function.prototype.toString,
        getPrototypeOf = isNative(getPrototypeOf = Object.getPrototypeOf) && getPrototypeOf,
        hasOwnProperty = objectProto.hasOwnProperty,
        push = arrayRef.push,
        setTimeout = context.setTimeout,
        splice = arrayRef.splice,
        unshift = arrayRef.unshift;

    /** Used to set meta data on functions */
    var defineProperty = (function() {
      // IE 8 only accepts DOM elements
      try {
        var o = {},
            func = isNative(func = Object.defineProperty) && func,
            result = func(o, o, o) && func;
      } catch(e) { }
      return result;
    }());

    /* Native method shortcuts for methods with the same name as other `lodash` methods */
    var nativeCreate = isNative(nativeCreate = Object.create) && nativeCreate,
        nativeIsArray = isNative(nativeIsArray = Array.isArray) && nativeIsArray,
        nativeIsFinite = context.isFinite,
        nativeIsNaN = context.isNaN,
        nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys,
        nativeMax = Math.max,
        nativeMin = Math.min,
        nativeParseInt = context.parseInt,
        nativeRandom = Math.random;

    /** Used to lookup a built-in constructor by [[Class]] */
    var ctorByClass = {};
    ctorByClass[arrayClass] = Array;
    ctorByClass[boolClass] = Boolean;
    ctorByClass[dateClass] = Date;
    ctorByClass[funcClass] = Function;
    ctorByClass[objectClass] = Object;
    ctorByClass[numberClass] = Number;
    ctorByClass[regexpClass] = RegExp;
    ctorByClass[stringClass] = String;

    /*--------------------------------------------------------------------------*/

    /**
     * Creates a `lodash` object which wraps the given value to enable intuitive
     * method chaining.
     *
     * In addition to Lo-Dash methods, wrappers also have the following `Array` methods:
     * `concat`, `join`, `pop`, `push`, `reverse`, `shift`, `slice`, `sort`, `splice`,
     * and `unshift`
     *
     * Chaining is supported in custom builds as long as the `value` method is
     * implicitly or explicitly included in the build.
     *
     * The chainable wrapper functions are:
     * `after`, `assign`, `bind`, `bindAll`, `bindKey`, `chain`, `compact`,
     * `compose`, `concat`, `countBy`, `create`, `createCallback`, `curry`,
     * `debounce`, `defaults`, `defer`, `delay`, `difference`, `filter`, `flatten`,
     * `forEach`, `forEachRight`, `forIn`, `forInRight`, `forOwn`, `forOwnRight`,
     * `functions`, `groupBy`, `indexBy`, `initial`, `intersection`, `invert`,
     * `invoke`, `keys`, `map`, `max`, `memoize`, `merge`, `min`, `object`, `omit`,
     * `once`, `pairs`, `partial`, `partialRight`, `pick`, `pluck`, `pull`, `push`,
     * `range`, `reject`, `remove`, `rest`, `reverse`, `shuffle`, `slice`, `sort`,
     * `sortBy`, `splice`, `tap`, `throttle`, `times`, `toArray`, `transform`,
     * `union`, `uniq`, `unshift`, `unzip`, `values`, `where`, `without`, `wrap`,
     * and `zip`
     *
     * The non-chainable wrapper functions are:
     * `clone`, `cloneDeep`, `contains`, `escape`, `every`, `find`, `findIndex`,
     * `findKey`, `findLast`, `findLastIndex`, `findLastKey`, `has`, `identity`,
     * `indexOf`, `isArguments`, `isArray`, `isBoolean`, `isDate`, `isElement`,
     * `isEmpty`, `isEqual`, `isFinite`, `isFunction`, `isNaN`, `isNull`, `isNumber`,
     * `isObject`, `isPlainObject`, `isRegExp`, `isString`, `isUndefined`, `join`,
     * `lastIndexOf`, `mixin`, `noConflict`, `parseInt`, `pop`, `random`, `reduce`,
     * `reduceRight`, `result`, `shift`, `size`, `some`, `sortedIndex`, `runInContext`,
     * `template`, `unescape`, `uniqueId`, and `value`
     *
     * The wrapper functions `first` and `last` return wrapped values when `n` is
     * provided, otherwise they return unwrapped values.
     *
     * Explicit chaining can be enabled by using the `_.chain` method.
     *
     * @name _
     * @constructor
     * @category Chaining
     * @param {*} value The value to wrap in a `lodash` instance.
     * @returns {Object} Returns a `lodash` instance.
     * @example
     *
     * var wrapped = _([1, 2, 3]);
     *
     * // returns an unwrapped value
     * wrapped.reduce(function(sum, num) {
     *   return sum + num;
     * });
     * // => 6
     *
     * // returns a wrapped value
     * var squares = wrapped.map(function(num) {
     *   return num * num;
     * });
     *
     * _.isArray(squares);
     * // => false
     *
     * _.isArray(squares.value());
     * // => true
     */
    function lodash(value) {
      // don't wrap if already wrapped, even if wrapped by a different `lodash` constructor
      return (value && typeof value == 'object' && !isArray(value) && hasOwnProperty.call(value, '__wrapped__'))
       ? value
       : new lodashWrapper(value);
    }

    /**
     * A fast path for creating `lodash` wrapper objects.
     *
     * @private
     * @param {*} value The value to wrap in a `lodash` instance.
     * @param {boolean} chainAll A flag to enable chaining for all methods
     * @returns {Object} Returns a `lodash` instance.
     */
    function lodashWrapper(value, chainAll) {
      this.__chain__ = !!chainAll;
      this.__wrapped__ = value;
    }
    // ensure `new lodashWrapper` is an instance of `lodash`
    lodashWrapper.prototype = lodash.prototype;

    /**
     * An object used to flag environments features.
     *
     * @static
     * @memberOf _
     * @type Object
     */
    var support = lodash.support = {};

    /**
     * Detect if functions can be decompiled by `Function#toString`
     * (all but PS3 and older Opera mobile browsers & avoided in Windows 8 apps).
     *
     * @memberOf _.support
     * @type boolean
     */
    support.funcDecomp = !isNative(context.WinRTError) && reThis.test(runInContext);

    /**
     * Detect if `Function#name` is supported (all but IE).
     *
     * @memberOf _.support
     * @type boolean
     */
    support.funcNames = typeof Function.name == 'string';

    /**
     * By default, the template delimiters used by Lo-Dash are similar to those in
     * embedded Ruby (ERB). Change the following template settings to use alternative
     * delimiters.
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
      'escape': /<%-([\s\S]+?)%>/g,

      /**
       * Used to detect code to be evaluated.
       *
       * @memberOf _.templateSettings
       * @type RegExp
       */
      'evaluate': /<%([\s\S]+?)%>/g,

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

    /*--------------------------------------------------------------------------*/

    /**
     * The base implementation of `_.bind` that creates the bound function and
     * sets its meta data.
     *
     * @private
     * @param {Array} bindData The bind data array.
     * @returns {Function} Returns the new bound function.
     */
    function baseBind(bindData) {
      var func = bindData[0],
          partialArgs = bindData[2],
          thisArg = bindData[4];

      function bound() {
        // `Function#bind` spec
        // http://es5.github.io/#x15.3.4.5
        if (partialArgs) {
          // avoid `arguments` object deoptimizations by using `slice` instead
          // of `Array.prototype.slice.call` and not assigning `arguments` to a
          // variable as a ternary expression
          var args = slice(partialArgs);
          push.apply(args, arguments);
        }
        // mimic the constructor's `return` behavior
        // http://es5.github.io/#x13.2.2
        if (this instanceof bound) {
          // ensure `new bound` is an instance of `func`
          var thisBinding = baseCreate(func.prototype),
              result = func.apply(thisBinding, args || arguments);
          return isObject(result) ? result : thisBinding;
        }
        return func.apply(thisArg, args || arguments);
      }
      setBindData(bound, bindData);
      return bound;
    }

    /**
     * The base implementation of `_.clone` without argument juggling or support
     * for `thisArg` binding.
     *
     * @private
     * @param {*} value The value to clone.
     * @param {boolean} [isDeep=false] Specify a deep clone.
     * @param {Function} [callback] The function to customize cloning values.
     * @param {Array} [stackA=[]] Tracks traversed source objects.
     * @param {Array} [stackB=[]] Associates clones with source counterparts.
     * @returns {*} Returns the cloned value.
     */
    function baseClone(value, isDeep, callback, stackA, stackB) {
      if (callback) {
        var result = callback(value);
        if (typeof result != 'undefined') {
          return result;
        }
      }
      // inspect [[Class]]
      var isObj = isObject(value);
      if (isObj) {
        var className = toString.call(value);
        if (!cloneableClasses[className]) {
          return value;
        }
        var ctor = ctorByClass[className];
        switch (className) {
          case boolClass:
          case dateClass:
            return new ctor(+value);

          case numberClass:
          case stringClass:
            return new ctor(value);

          case regexpClass:
            result = ctor(value.source, reFlags.exec(value));
            result.lastIndex = value.lastIndex;
            return result;
        }
      } else {
        return value;
      }
      var isArr = isArray(value);
      if (isDeep) {
        // check for circular references and return corresponding clone
        var initedStack = !stackA;
        stackA || (stackA = getArray());
        stackB || (stackB = getArray());

        var length = stackA.length;
        while (length--) {
          if (stackA[length] == value) {
            return stackB[length];
          }
        }
        result = isArr ? ctor(value.length) : {};
      }
      else {
        result = isArr ? slice(value) : assign({}, value);
      }
      // add array properties assigned by `RegExp#exec`
      if (isArr) {
        if (hasOwnProperty.call(value, 'index')) {
          result.index = value.index;
        }
        if (hasOwnProperty.call(value, 'input')) {
          result.input = value.input;
        }
      }
      // exit for shallow clone
      if (!isDeep) {
        return result;
      }
      // add the source value to the stack of traversed objects
      // and associate it with its clone
      stackA.push(value);
      stackB.push(result);

      // recursively populate clone (susceptible to call stack limits)
      (isArr ? forEach : forOwn)(value, function(objValue, key) {
        result[key] = baseClone(objValue, isDeep, callback, stackA, stackB);
      });

      if (initedStack) {
        releaseArray(stackA);
        releaseArray(stackB);
      }
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
    function baseCreate(prototype, properties) {
      return isObject(prototype) ? nativeCreate(prototype) : {};
    }
    // fallback for browsers without `Object.create`
    if (!nativeCreate) {
      baseCreate = (function() {
        function Object() {}
        return function(prototype) {
          if (isObject(prototype)) {
            Object.prototype = prototype;
            var result = new Object;
            Object.prototype = null;
          }
          return result || context.Object();
        };
      }());
    }

    /**
     * The base implementation of `_.createCallback` without support for creating
     * "_.pluck" or "_.where" style callbacks.
     *
     * @private
     * @param {*} [func=identity] The value to convert to a callback.
     * @param {*} [thisArg] The `this` binding of the created callback.
     * @param {number} [argCount] The number of arguments the callback accepts.
     * @returns {Function} Returns a callback function.
     */
    function baseCreateCallback(func, thisArg, argCount) {
      if (typeof func != 'function') {
        return identity;
      }
      // exit early for no `thisArg` or already bound by `Function#bind`
      if (typeof thisArg == 'undefined' || !('prototype' in func)) {
        return func;
      }
      var bindData = func.__bindData__;
      if (typeof bindData == 'undefined') {
        if (support.funcNames) {
          bindData = !func.name;
        }
        bindData = bindData || !support.funcDecomp;
        if (!bindData) {
          var source = fnToString.call(func);
          if (!support.funcNames) {
            bindData = !reFuncName.test(source);
          }
          if (!bindData) {
            // checks if `func` references the `this` keyword and stores the result
            bindData = reThis.test(source);
            setBindData(func, bindData);
          }
        }
      }
      // exit early if there are no `this` references or `func` is bound
      if (bindData === false || (bindData !== true && bindData[1] & 1)) {
        return func;
      }
      switch (argCount) {
        case 1: return function(value) {
          return func.call(thisArg, value);
        };
        case 2: return function(a, b) {
          return func.call(thisArg, a, b);
        };
        case 3: return function(value, index, collection) {
          return func.call(thisArg, value, index, collection);
        };
        case 4: return function(accumulator, value, index, collection) {
          return func.call(thisArg, accumulator, value, index, collection);
        };
      }
      return bind(func, thisArg);
    }

    /**
     * The base implementation of `createWrapper` that creates the wrapper and
     * sets its meta data.
     *
     * @private
     * @param {Array} bindData The bind data array.
     * @returns {Function} Returns the new function.
     */
    function baseCreateWrapper(bindData) {
      var func = bindData[0],
          bitmask = bindData[1],
          partialArgs = bindData[2],
          partialRightArgs = bindData[3],
          thisArg = bindData[4],
          arity = bindData[5];

      var isBind = bitmask & 1,
          isBindKey = bitmask & 2,
          isCurry = bitmask & 4,
          isCurryBound = bitmask & 8,
          key = func;

      function bound() {
        var thisBinding = isBind ? thisArg : this;
        if (partialArgs) {
          var args = slice(partialArgs);
          push.apply(args, arguments);
        }
        if (partialRightArgs || isCurry) {
          args || (args = slice(arguments));
          if (partialRightArgs) {
            push.apply(args, partialRightArgs);
          }
          if (isCurry && args.length < arity) {
            bitmask |= 16 & ~32;
            return baseCreateWrapper([func, (isCurryBound ? bitmask : bitmask & ~3), args, null, thisArg, arity]);
          }
        }
        args || (args = arguments);
        if (isBindKey) {
          func = thisBinding[key];
        }
        if (this instanceof bound) {
          thisBinding = baseCreate(func.prototype);
          var result = func.apply(thisBinding, args);
          return isObject(result) ? result : thisBinding;
        }
        return func.apply(thisBinding, args);
      }
      setBindData(bound, bindData);
      return bound;
    }

    /**
     * The base implementation of `_.difference` that accepts a single array
     * of values to exclude.
     *
     * @private
     * @param {Array} array The array to process.
     * @param {Array} [values] The array of values to exclude.
     * @returns {Array} Returns a new array of filtered values.
     */
    function baseDifference(array, values) {
      var index = -1,
          indexOf = getIndexOf(),
          length = array ? array.length : 0,
          isLarge = length >= largeArraySize && indexOf === baseIndexOf,
          result = [];

      if (isLarge) {
        var cache = createCache(values);
        if (cache) {
          indexOf = cacheIndexOf;
          values = cache;
        } else {
          isLarge = false;
        }
      }
      while (++index < length) {
        var value = array[index];
        if (indexOf(values, value) < 0) {
          result.push(value);
        }
      }
      if (isLarge) {
        releaseObject(values);
      }
      return result;
    }

    /**
     * The base implementation of `_.flatten` without support for callback
     * shorthands or `thisArg` binding.
     *
     * @private
     * @param {Array} array The array to flatten.
     * @param {boolean} [isShallow=false] A flag to restrict flattening to a single level.
     * @param {boolean} [isStrict=false] A flag to restrict flattening to arrays and `arguments` objects.
     * @param {number} [fromIndex=0] The index to start from.
     * @returns {Array} Returns a new flattened array.
     */
    function baseFlatten(array, isShallow, isStrict, fromIndex) {
      var index = (fromIndex || 0) - 1,
          length = array ? array.length : 0,
          result = [];

      while (++index < length) {
        var value = array[index];

        if (value && typeof value == 'object' && typeof value.length == 'number'
            && (isArray(value) || isArguments(value))) {
          // recursively flatten arrays (susceptible to call stack limits)
          if (!isShallow) {
            value = baseFlatten(value, isShallow, isStrict);
          }
          var valIndex = -1,
              valLength = value.length,
              resIndex = result.length;

          result.length += valLength;
          while (++valIndex < valLength) {
            result[resIndex++] = value[valIndex];
          }
        } else if (!isStrict) {
          result.push(value);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.isEqual`, without support for `thisArg` binding,
     * that allows partial "_.where" style comparisons.
     *
     * @private
     * @param {*} a The value to compare.
     * @param {*} b The other value to compare.
     * @param {Function} [callback] The function to customize comparing values.
     * @param {Function} [isWhere=false] A flag to indicate performing partial comparisons.
     * @param {Array} [stackA=[]] Tracks traversed `a` objects.
     * @param {Array} [stackB=[]] Tracks traversed `b` objects.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     */
    function baseIsEqual(a, b, callback, isWhere, stackA, stackB) {
      // used to indicate that when comparing objects, `a` has at least the properties of `b`
      if (callback) {
        var result = callback(a, b);
        if (typeof result != 'undefined') {
          return !!result;
        }
      }
      // exit early for identical values
      if (a === b) {
        // treat `+0` vs. `-0` as not equal
        return a !== 0 || (1 / a == 1 / b);
      }
      var type = typeof a,
          otherType = typeof b;

      // exit early for unlike primitive values
      if (a === a &&
          !(a && objectTypes[type]) &&
          !(b && objectTypes[otherType])) {
        return false;
      }
      // exit early for `null` and `undefined` avoiding ES3's Function#call behavior
      // http://es5.github.io/#x15.3.4.4
      if (a == null || b == null) {
        return a === b;
      }
      // compare [[Class]] names
      var className = toString.call(a),
          otherClass = toString.call(b);

      if (className == argsClass) {
        className = objectClass;
      }
      if (otherClass == argsClass) {
        otherClass = objectClass;
      }
      if (className != otherClass) {
        return false;
      }
      switch (className) {
        case boolClass:
        case dateClass:
          // coerce dates and booleans to numbers, dates to milliseconds and booleans
          // to `1` or `0` treating invalid dates coerced to `NaN` as not equal
          return +a == +b;

        case numberClass:
          // treat `NaN` vs. `NaN` as equal
          return (a != +a)
            ? b != +b
            // but treat `+0` vs. `-0` as not equal
            : (a == 0 ? (1 / a == 1 / b) : a == +b);

        case regexpClass:
        case stringClass:
          // coerce regexes to strings (http://es5.github.io/#x15.10.6.4)
          // treat string primitives and their corresponding object instances as equal
          return a == String(b);
      }
      var isArr = className == arrayClass;
      if (!isArr) {
        // unwrap any `lodash` wrapped values
        var aWrapped = hasOwnProperty.call(a, '__wrapped__'),
            bWrapped = hasOwnProperty.call(b, '__wrapped__');

        if (aWrapped || bWrapped) {
          return baseIsEqual(aWrapped ? a.__wrapped__ : a, bWrapped ? b.__wrapped__ : b, callback, isWhere, stackA, stackB);
        }
        // exit for functions and DOM nodes
        if (className != objectClass) {
          return false;
        }
        // in older versions of Opera, `arguments` objects have `Array` constructors
        var ctorA = a.constructor,
            ctorB = b.constructor;

        // non `Object` object instances with different constructors are not equal
        if (ctorA != ctorB &&
              !(isFunction(ctorA) && ctorA instanceof ctorA && isFunction(ctorB) && ctorB instanceof ctorB) &&
              ('constructor' in a && 'constructor' in b)
            ) {
          return false;
        }
      }
      // assume cyclic structures are equal
      // the algorithm for detecting cyclic structures is adapted from ES 5.1
      // section 15.12.3, abstract operation `JO` (http://es5.github.io/#x15.12.3)
      var initedStack = !stackA;
      stackA || (stackA = getArray());
      stackB || (stackB = getArray());

      var length = stackA.length;
      while (length--) {
        if (stackA[length] == a) {
          return stackB[length] == b;
        }
      }
      var size = 0;
      result = true;

      // add `a` and `b` to the stack of traversed objects
      stackA.push(a);
      stackB.push(b);

      // recursively compare objects and arrays (susceptible to call stack limits)
      if (isArr) {
        // compare lengths to determine if a deep comparison is necessary
        length = a.length;
        size = b.length;
        result = size == length;

        if (result || isWhere) {
          // deep compare the contents, ignoring non-numeric properties
          while (size--) {
            var index = length,
                value = b[size];

            if (isWhere) {
              while (index--) {
                if ((result = baseIsEqual(a[index], value, callback, isWhere, stackA, stackB))) {
                  break;
                }
              }
            } else if (!(result = baseIsEqual(a[size], value, callback, isWhere, stackA, stackB))) {
              break;
            }
          }
        }
      }
      else {
        // deep compare objects using `forIn`, instead of `forOwn`, to avoid `Object.keys`
        // which, in this case, is more costly
        forIn(b, function(value, key, b) {
          if (hasOwnProperty.call(b, key)) {
            // count the number of properties.
            size++;
            // deep compare each property value.
            return (result = hasOwnProperty.call(a, key) && baseIsEqual(a[key], value, callback, isWhere, stackA, stackB));
          }
        });

        if (result && !isWhere) {
          // ensure both objects have the same number of properties
          forIn(a, function(value, key, a) {
            if (hasOwnProperty.call(a, key)) {
              // `size` will be `-1` if `a` has more properties than `b`
              return (result = --size > -1);
            }
          });
        }
      }
      stackA.pop();
      stackB.pop();

      if (initedStack) {
        releaseArray(stackA);
        releaseArray(stackB);
      }
      return result;
    }

    /**
     * The base implementation of `_.merge` without argument juggling or support
     * for `thisArg` binding.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {Function} [callback] The function to customize merging properties.
     * @param {Array} [stackA=[]] Tracks traversed source objects.
     * @param {Array} [stackB=[]] Associates values with source counterparts.
     */
    function baseMerge(object, source, callback, stackA, stackB) {
      (isArray(source) ? forEach : forOwn)(source, function(source, key) {
        var found,
            isArr,
            result = source,
            value = object[key];

        if (source && ((isArr = isArray(source)) || isPlainObject(source))) {
          // avoid merging previously merged cyclic sources
          var stackLength = stackA.length;
          while (stackLength--) {
            if ((found = stackA[stackLength] == source)) {
              value = stackB[stackLength];
              break;
            }
          }
          if (!found) {
            var isShallow;
            if (callback) {
              result = callback(value, source);
              if ((isShallow = typeof result != 'undefined')) {
                value = result;
              }
            }
            if (!isShallow) {
              value = isArr
                ? (isArray(value) ? value : [])
                : (isPlainObject(value) ? value : {});
            }
            // add `source` and associated `value` to the stack of traversed objects
            stackA.push(source);
            stackB.push(value);

            // recursively merge objects and arrays (susceptible to call stack limits)
            if (!isShallow) {
              baseMerge(value, source, callback, stackA, stackB);
            }
          }
        }
        else {
          if (callback) {
            result = callback(value, source);
            if (typeof result == 'undefined') {
              result = source;
            }
          }
          if (typeof result != 'undefined') {
            value = result;
          }
        }
        object[key] = value;
      });
    }

    /**
     * The base implementation of `_.random` without argument juggling or support
     * for returning floating-point numbers.
     *
     * @private
     * @param {number} min The minimum possible value.
     * @param {number} max The maximum possible value.
     * @returns {number} Returns a random number.
     */
    function baseRandom(min, max) {
      return min + floor(nativeRandom() * (max - min + 1));
    }

    /**
     * The base implementation of `_.uniq` without support for callback shorthands
     * or `thisArg` binding.
     *
     * @private
     * @param {Array} array The array to process.
     * @param {boolean} [isSorted=false] A flag to indicate that `array` is sorted.
     * @param {Function} [callback] The function called per iteration.
     * @returns {Array} Returns a duplicate-value-free array.
     */
    function baseUniq(array, isSorted, callback) {
      var index = -1,
          indexOf = getIndexOf(),
          length = array ? array.length : 0,
          result = [];

      var isLarge = !isSorted && length >= largeArraySize && indexOf === baseIndexOf,
          seen = (callback || isLarge) ? getArray() : result;

      if (isLarge) {
        var cache = createCache(seen);
        indexOf = cacheIndexOf;
        seen = cache;
      }
      while (++index < length) {
        var value = array[index],
            computed = callback ? callback(value, index, array) : value;

        if (isSorted
              ? !index || seen[seen.length - 1] !== computed
              : indexOf(seen, computed) < 0
            ) {
          if (callback || isLarge) {
            seen.push(computed);
          }
          result.push(value);
        }
      }
      if (isLarge) {
        releaseArray(seen.array);
        releaseObject(seen);
      } else if (callback) {
        releaseArray(seen);
      }
      return result;
    }

    /**
     * Creates a function that aggregates a collection, creating an object composed
     * of keys generated from the results of running each element of the collection
     * through a callback. The given `setter` function sets the keys and values
     * of the composed object.
     *
     * @private
     * @param {Function} setter The setter function.
     * @returns {Function} Returns the new aggregator function.
     */
    function createAggregator(setter) {
      return function(collection, callback, thisArg) {
        var result = {};
        callback = lodash.createCallback(callback, thisArg, 3);

        var index = -1,
            length = collection ? collection.length : 0;

        if (typeof length == 'number') {
          while (++index < length) {
            var value = collection[index];
            setter(result, value, callback(value, index, collection), collection);
          }
        } else {
          forOwn(collection, function(value, key, collection) {
            setter(result, value, callback(value, key, collection), collection);
          });
        }
        return result;
      };
    }

    /**
     * Creates a function that, when called, either curries or invokes `func`
     * with an optional `this` binding and partially applied arguments.
     *
     * @private
     * @param {Function|string} func The function or method name to reference.
     * @param {number} bitmask The bitmask of method flags to compose.
     *  The bitmask may be composed of the following flags:
     *  1 - `_.bind`
     *  2 - `_.bindKey`
     *  4 - `_.curry`
     *  8 - `_.curry` (bound)
     *  16 - `_.partial`
     *  32 - `_.partialRight`
     * @param {Array} [partialArgs] An array of arguments to prepend to those
     *  provided to the new function.
     * @param {Array} [partialRightArgs] An array of arguments to append to those
     *  provided to the new function.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new function.
     */
    function createWrapper(func, bitmask, partialArgs, partialRightArgs, thisArg, arity) {
      var isBind = bitmask & 1,
          isBindKey = bitmask & 2,
          isCurry = bitmask & 4,
          isCurryBound = bitmask & 8,
          isPartial = bitmask & 16,
          isPartialRight = bitmask & 32;

      if (!isBindKey && !isFunction(func)) {
        throw new TypeError;
      }
      if (isPartial && !partialArgs.length) {
        bitmask &= ~16;
        isPartial = partialArgs = false;
      }
      if (isPartialRight && !partialRightArgs.length) {
        bitmask &= ~32;
        isPartialRight = partialRightArgs = false;
      }
      var bindData = func && func.__bindData__;
      if (bindData && bindData !== true) {
        // clone `bindData`
        bindData = slice(bindData);
        if (bindData[2]) {
          bindData[2] = slice(bindData[2]);
        }
        if (bindData[3]) {
          bindData[3] = slice(bindData[3]);
        }
        // set `thisBinding` is not previously bound
        if (isBind && !(bindData[1] & 1)) {
          bindData[4] = thisArg;
        }
        // set if previously bound but not currently (subsequent curried functions)
        if (!isBind && bindData[1] & 1) {
          bitmask |= 8;
        }
        // set curried arity if not yet set
        if (isCurry && !(bindData[1] & 4)) {
          bindData[5] = arity;
        }
        // append partial left arguments
        if (isPartial) {
          push.apply(bindData[2] || (bindData[2] = []), partialArgs);
        }
        // append partial right arguments
        if (isPartialRight) {
          unshift.apply(bindData[3] || (bindData[3] = []), partialRightArgs);
        }
        // merge flags
        bindData[1] |= bitmask;
        return createWrapper.apply(null, bindData);
      }
      // fast path for `_.bind`
      var creater = (bitmask == 1 || bitmask === 17) ? baseBind : baseCreateWrapper;
      return creater([func, bitmask, partialArgs, partialRightArgs, thisArg, arity]);
    }

    /**
     * Used by `escape` to convert characters to HTML entities.
     *
     * @private
     * @param {string} match The matched character to escape.
     * @returns {string} Returns the escaped character.
     */
    function escapeHtmlChar(match) {
      return htmlEscapes[match];
    }

    /**
     * Gets the appropriate "indexOf" function. If the `_.indexOf` method is
     * customized, this method returns the custom method, otherwise it returns
     * the `baseIndexOf` function.
     *
     * @private
     * @returns {Function} Returns the "indexOf" function.
     */
    function getIndexOf() {
      var result = (result = lodash.indexOf) === indexOf ? baseIndexOf : result;
      return result;
    }

    /**
     * Checks if `value` is a native function.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is a native function, else `false`.
     */
    function isNative(value) {
      return typeof value == 'function' && reNative.test(value);
    }

    /**
     * Sets `this` binding data on a given function.
     *
     * @private
     * @param {Function} func The function to set data on.
     * @param {Array} value The data array to set.
     */
    var setBindData = !defineProperty ? noop : function(func, value) {
      descriptor.value = value;
      defineProperty(func, '__bindData__', descriptor);
    };

    /**
     * A fallback implementation of `isPlainObject` which checks if a given value
     * is an object created by the `Object` constructor, assuming objects created
     * by the `Object` constructor have no inherited enumerable properties and that
     * there are no `Object.prototype` extensions.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
     */
    function shimIsPlainObject(value) {
      var ctor,
          result;

      // avoid non Object objects, `arguments` objects, and DOM elements
      if (!(value && toString.call(value) == objectClass) ||
          (ctor = value.constructor, isFunction(ctor) && !(ctor instanceof ctor))) {
        return false;
      }
      // In most environments an object's own properties are iterated before
      // its inherited properties. If the last iterated property is an object's
      // own property then there are no inherited enumerable properties.
      forIn(value, function(value, key) {
        result = key;
      });
      return typeof result == 'undefined' || hasOwnProperty.call(value, result);
    }

    /**
     * Used by `unescape` to convert HTML entities to characters.
     *
     * @private
     * @param {string} match The matched character to unescape.
     * @returns {string} Returns the unescaped character.
     */
    function unescapeHtmlChar(match) {
      return htmlUnescapes[match];
    }

    /*--------------------------------------------------------------------------*/

    /**
     * Checks if `value` is an `arguments` object.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is an `arguments` object, else `false`.
     * @example
     *
     * (function() { return _.isArguments(arguments); })(1, 2, 3);
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */
    function isArguments(value) {
      return value && typeof value == 'object' && typeof value.length == 'number' &&
        toString.call(value) == argsClass || false;
    }

    /**
     * Checks if `value` is an array.
     *
     * @static
     * @memberOf _
     * @type Function
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is an array, else `false`.
     * @example
     *
     * (function() { return _.isArray(arguments); })();
     * // => false
     *
     * _.isArray([1, 2, 3]);
     * // => true
     */
    var isArray = nativeIsArray || function(value) {
      return value && typeof value == 'object' && typeof value.length == 'number' &&
        toString.call(value) == arrayClass || false;
    };

    /**
     * A fallback implementation of `Object.keys` which produces an array of the
     * given object's own enumerable property names.
     *
     * @private
     * @type Function
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns an array of property names.
     */
    var shimKeys = function(object) {
      var index, iterable = object, result = [];
      if (!iterable) return result;
      if (!(objectTypes[typeof object])) return result;
        for (index in iterable) {
          if (hasOwnProperty.call(iterable, index)) {
            result.push(index);
          }
        }
      return result
    };

    /**
     * Creates an array composed of the own enumerable property names of an object.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns an array of property names.
     * @example
     *
     * _.keys({ 'one': 1, 'two': 2, 'three': 3 });
     * // => ['one', 'two', 'three'] (property order is not guaranteed across environments)
     */
    var keys = !nativeKeys ? shimKeys : function(object) {
      if (!isObject(object)) {
        return [];
      }
      return nativeKeys(object);
    };

    /**
     * Used to convert characters to HTML entities:
     *
     * Though the `>` character is escaped for symmetry, characters like `>` and `/`
     * don't require escaping in HTML and have no special meaning unless they're part
     * of a tag or an unquoted attribute value.
     * http://mathiasbynens.be/notes/ambiguous-ampersands (under "semi-related fun fact")
     */
    var htmlEscapes = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };

    /** Used to convert HTML entities to characters */
    var htmlUnescapes = invert(htmlEscapes);

    /** Used to match HTML entities and HTML characters */
    var reEscapedHtml = RegExp('(' + keys(htmlUnescapes).join('|') + ')', 'g'),
        reUnescapedHtml = RegExp('[' + keys(htmlEscapes).join('') + ']', 'g');

    /*--------------------------------------------------------------------------*/

    /**
     * Assigns own enumerable properties of source object(s) to the destination
     * object. Subsequent sources will overwrite property assignments of previous
     * sources. If a callback is provided it will be executed to produce the
     * assigned values. The callback is bound to `thisArg` and invoked with two
     * arguments; (objectValue, sourceValue).
     *
     * @static
     * @memberOf _
     * @type Function
     * @alias extend
     * @category Objects
     * @param {Object} object The destination object.
     * @param {...Object} [source] The source objects.
     * @param {Function} [callback] The function to customize assigning values.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns the destination object.
     * @example
     *
     * _.assign({ 'name': 'fred' }, { 'employer': 'slate' });
     * // => { 'name': 'fred', 'employer': 'slate' }
     *
     * var defaults = _.partialRight(_.assign, function(a, b) {
     *   return typeof a == 'undefined' ? b : a;
     * });
     *
     * var object = { 'name': 'barney' };
     * defaults(object, { 'name': 'fred', 'employer': 'slate' });
     * // => { 'name': 'barney', 'employer': 'slate' }
     */
    var assign = function(object, source, guard) {
      var index, iterable = object, result = iterable;
      if (!iterable) return result;
      var args = arguments,
          argsIndex = 0,
          argsLength = typeof guard == 'number' ? 2 : args.length;
      if (argsLength > 3 && typeof args[argsLength - 2] == 'function') {
        var callback = baseCreateCallback(args[--argsLength - 1], args[argsLength--], 2);
      } else if (argsLength > 2 && typeof args[argsLength - 1] == 'function') {
        callback = args[--argsLength];
      }
      while (++argsIndex < argsLength) {
        iterable = args[argsIndex];
        if (iterable && objectTypes[typeof iterable]) {
        var ownIndex = -1,
            ownProps = objectTypes[typeof iterable] && keys(iterable),
            length = ownProps ? ownProps.length : 0;

        while (++ownIndex < length) {
          index = ownProps[ownIndex];
          result[index] = callback ? callback(result[index], iterable[index]) : iterable[index];
        }
        }
      }
      return result
    };

    /**
     * Creates a clone of `value`. If `isDeep` is `true` nested objects will also
     * be cloned, otherwise they will be assigned by reference. If a callback
     * is provided it will be executed to produce the cloned values. If the
     * callback returns `undefined` cloning will be handled by the method instead.
     * The callback is bound to `thisArg` and invoked with one argument; (value).
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to clone.
     * @param {boolean} [isDeep=false] Specify a deep clone.
     * @param {Function} [callback] The function to customize cloning values.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the cloned value.
     * @example
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36 },
     *   { 'name': 'fred',   'age': 40 }
     * ];
     *
     * var shallow = _.clone(characters);
     * shallow[0] === characters[0];
     * // => true
     *
     * var deep = _.clone(characters, true);
     * deep[0] === characters[0];
     * // => false
     *
     * _.mixin({
     *   'clone': _.partialRight(_.clone, function(value) {
     *     return _.isElement(value) ? value.cloneNode(false) : undefined;
     *   })
     * });
     *
     * var clone = _.clone(document.body);
     * clone.childNodes.length;
     * // => 0
     */
    function clone(value, isDeep, callback, thisArg) {
      // allows working with "Collections" methods without using their `index`
      // and `collection` arguments for `isDeep` and `callback`
      if (typeof isDeep != 'boolean' && isDeep != null) {
        thisArg = callback;
        callback = isDeep;
        isDeep = false;
      }
      return baseClone(value, isDeep, typeof callback == 'function' && baseCreateCallback(callback, thisArg, 1));
    }

    /**
     * Creates a deep clone of `value`. If a callback is provided it will be
     * executed to produce the cloned values. If the callback returns `undefined`
     * cloning will be handled by the method instead. The callback is bound to
     * `thisArg` and invoked with one argument; (value).
     *
     * Note: This method is loosely based on the structured clone algorithm. Functions
     * and DOM nodes are **not** cloned. The enumerable properties of `arguments` objects and
     * objects created by constructors other than `Object` are cloned to plain `Object` objects.
     * See http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to deep clone.
     * @param {Function} [callback] The function to customize cloning values.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the deep cloned value.
     * @example
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36 },
     *   { 'name': 'fred',   'age': 40 }
     * ];
     *
     * var deep = _.cloneDeep(characters);
     * deep[0] === characters[0];
     * // => false
     *
     * var view = {
     *   'label': 'docs',
     *   'node': element
     * };
     *
     * var clone = _.cloneDeep(view, function(value) {
     *   return _.isElement(value) ? value.cloneNode(true) : undefined;
     * });
     *
     * clone.node == view.node;
     * // => false
     */
    function cloneDeep(value, callback, thisArg) {
      return baseClone(value, true, typeof callback == 'function' && baseCreateCallback(callback, thisArg, 1));
    }

    /**
     * Creates an object that inherits from the given `prototype` object. If a
     * `properties` object is provided its own enumerable properties are assigned
     * to the created object.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} prototype The object to inherit from.
     * @param {Object} [properties] The properties to assign to the object.
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
     * Circle.prototype = _.create(Shape.prototype, { 'constructor': Circle });
     *
     * var circle = new Circle;
     * circle instanceof Circle;
     * // => true
     *
     * circle instanceof Shape;
     * // => true
     */
    function create(prototype, properties) {
      var result = baseCreate(prototype);
      return properties ? assign(result, properties) : result;
    }

    /**
     * Assigns own enumerable properties of source object(s) to the destination
     * object for all destination properties that resolve to `undefined`. Once a
     * property is set, additional defaults of the same property will be ignored.
     *
     * @static
     * @memberOf _
     * @type Function
     * @category Objects
     * @param {Object} object The destination object.
     * @param {...Object} [source] The source objects.
     * @param- {Object} [guard] Allows working with `_.reduce` without using its
     *  `key` and `object` arguments as sources.
     * @returns {Object} Returns the destination object.
     * @example
     *
     * var object = { 'name': 'barney' };
     * _.defaults(object, { 'name': 'fred', 'employer': 'slate' });
     * // => { 'name': 'barney', 'employer': 'slate' }
     */
    var defaults = function(object, source, guard) {
      var index, iterable = object, result = iterable;
      if (!iterable) return result;
      var args = arguments,
          argsIndex = 0,
          argsLength = typeof guard == 'number' ? 2 : args.length;
      while (++argsIndex < argsLength) {
        iterable = args[argsIndex];
        if (iterable && objectTypes[typeof iterable]) {
        var ownIndex = -1,
            ownProps = objectTypes[typeof iterable] && keys(iterable),
            length = ownProps ? ownProps.length : 0;

        while (++ownIndex < length) {
          index = ownProps[ownIndex];
          if (typeof result[index] == 'undefined') result[index] = iterable[index];
        }
        }
      }
      return result
    };

    /**
     * This method is like `_.findIndex` except that it returns the key of the
     * first element that passes the callback check, instead of the element itself.
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to search.
     * @param {Function|Object|string} [callback=identity] The function called per
     *  iteration. If a property name or object is provided it will be used to
     *  create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {string|undefined} Returns the key of the found element, else `undefined`.
     * @example
     *
     * var characters = {
     *   'barney': {  'age': 36, 'blocked': false },
     *   'fred': {    'age': 40, 'blocked': true },
     *   'pebbles': { 'age': 1,  'blocked': false }
     * };
     *
     * _.findKey(characters, function(chr) {
     *   return chr.age < 40;
     * });
     * // => 'barney' (property order is not guaranteed across environments)
     *
     * // using "_.where" callback shorthand
     * _.findKey(characters, { 'age': 1 });
     * // => 'pebbles'
     *
     * // using "_.pluck" callback shorthand
     * _.findKey(characters, 'blocked');
     * // => 'fred'
     */
    function findKey(object, callback, thisArg) {
      var result;
      callback = lodash.createCallback(callback, thisArg, 3);
      forOwn(object, function(value, key, object) {
        if (callback(value, key, object)) {
          result = key;
          return false;
        }
      });
      return result;
    }

    /**
     * This method is like `_.findKey` except that it iterates over elements
     * of a `collection` in the opposite order.
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to search.
     * @param {Function|Object|string} [callback=identity] The function called per
     *  iteration. If a property name or object is provided it will be used to
     *  create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {string|undefined} Returns the key of the found element, else `undefined`.
     * @example
     *
     * var characters = {
     *   'barney': {  'age': 36, 'blocked': true },
     *   'fred': {    'age': 40, 'blocked': false },
     *   'pebbles': { 'age': 1,  'blocked': true }
     * };
     *
     * _.findLastKey(characters, function(chr) {
     *   return chr.age < 40;
     * });
     * // => returns `pebbles`, assuming `_.findKey` returns `barney`
     *
     * // using "_.where" callback shorthand
     * _.findLastKey(characters, { 'age': 40 });
     * // => 'fred'
     *
     * // using "_.pluck" callback shorthand
     * _.findLastKey(characters, 'blocked');
     * // => 'pebbles'
     */
    function findLastKey(object, callback, thisArg) {
      var result;
      callback = lodash.createCallback(callback, thisArg, 3);
      forOwnRight(object, function(value, key, object) {
        if (callback(value, key, object)) {
          result = key;
          return false;
        }
      });
      return result;
    }

    /**
     * Iterates over own and inherited enumerable properties of an object,
     * executing the callback for each property. The callback is bound to `thisArg`
     * and invoked with three arguments; (value, key, object). Callbacks may exit
     * iteration early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @type Function
     * @category Objects
     * @param {Object} object The object to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function Shape() {
     *   this.x = 0;
     *   this.y = 0;
     * }
     *
     * Shape.prototype.move = function(x, y) {
     *   this.x += x;
     *   this.y += y;
     * };
     *
     * _.forIn(new Shape, function(value, key) {
     *   console.log(key);
     * });
     * // => logs 'x', 'y', and 'move' (property order is not guaranteed across environments)
     */
    var forIn = function(collection, callback, thisArg) {
      var index, iterable = collection, result = iterable;
      if (!iterable) return result;
      if (!objectTypes[typeof iterable]) return result;
      callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
        for (index in iterable) {
          if (callback(iterable[index], index, collection) === false) return result;
        }
      return result
    };

    /**
     * This method is like `_.forIn` except that it iterates over elements
     * of a `collection` in the opposite order.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function Shape() {
     *   this.x = 0;
     *   this.y = 0;
     * }
     *
     * Shape.prototype.move = function(x, y) {
     *   this.x += x;
     *   this.y += y;
     * };
     *
     * _.forInRight(new Shape, function(value, key) {
     *   console.log(key);
     * });
     * // => logs 'move', 'y', and 'x' assuming `_.forIn ` logs 'x', 'y', and 'move'
     */
    function forInRight(object, callback, thisArg) {
      var pairs = [];

      forIn(object, function(value, key) {
        pairs.push(key, value);
      });

      var length = pairs.length;
      callback = baseCreateCallback(callback, thisArg, 3);
      while (length--) {
        if (callback(pairs[length--], pairs[length], object) === false) {
          break;
        }
      }
      return object;
    }

    /**
     * Iterates over own enumerable properties of an object, executing the callback
     * for each property. The callback is bound to `thisArg` and invoked with three
     * arguments; (value, key, object). Callbacks may exit iteration early by
     * explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @type Function
     * @category Objects
     * @param {Object} object The object to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * _.forOwn({ '0': 'zero', '1': 'one', 'length': 2 }, function(num, key) {
     *   console.log(key);
     * });
     * // => logs '0', '1', and 'length' (property order is not guaranteed across environments)
     */
    var forOwn = function(collection, callback, thisArg) {
      var index, iterable = collection, result = iterable;
      if (!iterable) return result;
      if (!objectTypes[typeof iterable]) return result;
      callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
        var ownIndex = -1,
            ownProps = objectTypes[typeof iterable] && keys(iterable),
            length = ownProps ? ownProps.length : 0;

        while (++ownIndex < length) {
          index = ownProps[ownIndex];
          if (callback(iterable[index], index, collection) === false) return result;
        }
      return result
    };

    /**
     * This method is like `_.forOwn` except that it iterates over elements
     * of a `collection` in the opposite order.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * _.forOwnRight({ '0': 'zero', '1': 'one', 'length': 2 }, function(num, key) {
     *   console.log(key);
     * });
     * // => logs 'length', '1', and '0' assuming `_.forOwn` logs '0', '1', and 'length'
     */
    function forOwnRight(object, callback, thisArg) {
      var props = keys(object),
          length = props.length;

      callback = baseCreateCallback(callback, thisArg, 3);
      while (length--) {
        var key = props[length];
        if (callback(object[key], key, object) === false) {
          break;
        }
      }
      return object;
    }

    /**
     * Creates a sorted array of property names of all enumerable properties,
     * own and inherited, of `object` that have function values.
     *
     * @static
     * @memberOf _
     * @alias methods
     * @category Objects
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns an array of property names that have function values.
     * @example
     *
     * _.functions(_);
     * // => ['all', 'any', 'bind', 'bindAll', 'clone', 'compact', 'compose', ...]
     */
    function functions(object) {
      var result = [];
      forIn(object, function(value, key) {
        if (isFunction(value)) {
          result.push(key);
        }
      });
      return result.sort();
    }

    /**
     * Checks if the specified property name exists as a direct property of `object`,
     * instead of an inherited property.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to inspect.
     * @param {string} key The name of the property to check.
     * @returns {boolean} Returns `true` if key is a direct property, else `false`.
     * @example
     *
     * _.has({ 'a': 1, 'b': 2, 'c': 3 }, 'b');
     * // => true
     */
    function has(object, key) {
      return object ? hasOwnProperty.call(object, key) : false;
    }

    /**
     * Creates an object composed of the inverted keys and values of the given object.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to invert.
     * @returns {Object} Returns the created inverted object.
     * @example
     *
     * _.invert({ 'first': 'fred', 'second': 'barney' });
     * // => { 'fred': 'first', 'barney': 'second' }
     */
    function invert(object) {
      var index = -1,
          props = keys(object),
          length = props.length,
          result = {};

      while (++index < length) {
        var key = props[index];
        result[object[key]] = key;
      }
      return result;
    }

    /**
     * Checks if `value` is a boolean value.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is a boolean value, else `false`.
     * @example
     *
     * _.isBoolean(null);
     * // => false
     */
    function isBoolean(value) {
      return value === true || value === false ||
        value && typeof value == 'object' && toString.call(value) == boolClass || false;
    }

    /**
     * Checks if `value` is a date.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is a date, else `false`.
     * @example
     *
     * _.isDate(new Date);
     * // => true
     */
    function isDate(value) {
      return value && typeof value == 'object' && toString.call(value) == dateClass || false;
    }

    /**
     * Checks if `value` is a DOM element.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is a DOM element, else `false`.
     * @example
     *
     * _.isElement(document.body);
     * // => true
     */
    function isElement(value) {
      return value && value.nodeType === 1 || false;
    }

    /**
     * Checks if `value` is empty. Arrays, strings, or `arguments` objects with a
     * length of `0` and objects with no own enumerable properties are considered
     * "empty".
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Array|Object|string} value The value to inspect.
     * @returns {boolean} Returns `true` if the `value` is empty, else `false`.
     * @example
     *
     * _.isEmpty([1, 2, 3]);
     * // => false
     *
     * _.isEmpty({});
     * // => true
     *
     * _.isEmpty('');
     * // => true
     */
    function isEmpty(value) {
      var result = true;
      if (!value) {
        return result;
      }
      var className = toString.call(value),
          length = value.length;

      if ((className == arrayClass || className == stringClass || className == argsClass ) ||
          (className == objectClass && typeof length == 'number' && isFunction(value.splice))) {
        return !length;
      }
      forOwn(value, function() {
        return (result = false);
      });
      return result;
    }

    /**
     * Performs a deep comparison between two values to determine if they are
     * equivalent to each other. If a callback is provided it will be executed
     * to compare values. If the callback returns `undefined` comparisons will
     * be handled by the method instead. The callback is bound to `thisArg` and
     * invoked with two arguments; (a, b).
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} a The value to compare.
     * @param {*} b The other value to compare.
     * @param {Function} [callback] The function to customize comparing values.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'name': 'fred' };
     * var copy = { 'name': 'fred' };
     *
     * object == copy;
     * // => false
     *
     * _.isEqual(object, copy);
     * // => true
     *
     * var words = ['hello', 'goodbye'];
     * var otherWords = ['hi', 'goodbye'];
     *
     * _.isEqual(words, otherWords, function(a, b) {
     *   var reGreet = /^(?:hello|hi)$/i,
     *       aGreet = _.isString(a) && reGreet.test(a),
     *       bGreet = _.isString(b) && reGreet.test(b);
     *
     *   return (aGreet || bGreet) ? (aGreet == bGreet) : undefined;
     * });
     * // => true
     */
    function isEqual(a, b, callback, thisArg) {
      return baseIsEqual(a, b, typeof callback == 'function' && baseCreateCallback(callback, thisArg, 2));
    }

    /**
     * Checks if `value` is, or can be coerced to, a finite number.
     *
     * Note: This is not the same as native `isFinite` which will return true for
     * booleans and empty strings. See http://es5.github.io/#x15.1.2.5.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is finite, else `false`.
     * @example
     *
     * _.isFinite(-101);
     * // => true
     *
     * _.isFinite('10');
     * // => true
     *
     * _.isFinite(true);
     * // => false
     *
     * _.isFinite('');
     * // => false
     *
     * _.isFinite(Infinity);
     * // => false
     */
    function isFinite(value) {
      return nativeIsFinite(value) && !nativeIsNaN(parseFloat(value));
    }

    /**
     * Checks if `value` is a function.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is a function, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     */
    function isFunction(value) {
      return typeof value == 'function';
    }

    /**
     * Checks if `value` is the language type of Object.
     * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is an object, else `false`.
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
      // check if the value is the ECMAScript language type of Object
      // http://es5.github.io/#x8
      // and avoid a V8 bug
      // http://code.google.com/p/v8/issues/detail?id=2291
      return !!(value && objectTypes[typeof value]);
    }

    /**
     * Checks if `value` is `NaN`.
     *
     * Note: This is not the same as native `isNaN` which will return `true` for
     * `undefined` and other non-numeric values. See http://es5.github.io/#x15.1.2.4.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is `NaN`, else `false`.
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
      // `NaN` as a primitive is the only value that is not equal to itself
      // (perform the [[Class]] check first to avoid errors with some host objects in IE)
      return isNumber(value) && value != +value;
    }

    /**
     * Checks if `value` is `null`.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is `null`, else `false`.
     * @example
     *
     * _.isNull(null);
     * // => true
     *
     * _.isNull(undefined);
     * // => false
     */
    function isNull(value) {
      return value === null;
    }

    /**
     * Checks if `value` is a number.
     *
     * Note: `NaN` is considered a number. See http://es5.github.io/#x8.5.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is a number, else `false`.
     * @example
     *
     * _.isNumber(8.4 * 5);
     * // => true
     */
    function isNumber(value) {
      return typeof value == 'number' ||
        value && typeof value == 'object' && toString.call(value) == numberClass || false;
    }

    /**
     * Checks if `value` is an object created by the `Object` constructor.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
     * @example
     *
     * function Shape() {
     *   this.x = 0;
     *   this.y = 0;
     * }
     *
     * _.isPlainObject(new Shape);
     * // => false
     *
     * _.isPlainObject([1, 2, 3]);
     * // => false
     *
     * _.isPlainObject({ 'x': 0, 'y': 0 });
     * // => true
     */
    var isPlainObject = !getPrototypeOf ? shimIsPlainObject : function(value) {
      if (!(value && toString.call(value) == objectClass)) {
        return false;
      }
      var valueOf = value.valueOf,
          objProto = isNative(valueOf) && (objProto = getPrototypeOf(valueOf)) && getPrototypeOf(objProto);

      return objProto
        ? (value == objProto || getPrototypeOf(value) == objProto)
        : shimIsPlainObject(value);
    };

    /**
     * Checks if `value` is a regular expression.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is a regular expression, else `false`.
     * @example
     *
     * _.isRegExp(/fred/);
     * // => true
     */
    function isRegExp(value) {
      return value && typeof value == 'object' && toString.call(value) == regexpClass || false;
    }

    /**
     * Checks if `value` is a string.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is a string, else `false`.
     * @example
     *
     * _.isString('fred');
     * // => true
     */
    function isString(value) {
      return typeof value == 'string' ||
        value && typeof value == 'object' && toString.call(value) == stringClass || false;
    }

    /**
     * Checks if `value` is `undefined`.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is `undefined`, else `false`.
     * @example
     *
     * _.isUndefined(void 0);
     * // => true
     */
    function isUndefined(value) {
      return typeof value == 'undefined';
    }

    /**
     * Creates an object with the same keys as `object` and values generated by
     * running each own enumerable property of `object` through the callback.
     * The callback is bound to `thisArg` and invoked with three arguments;
     * (value, key, object).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a new object with values of the results of each `callback` execution.
     * @example
     *
     * _.mapValues({ 'a': 1, 'b': 2, 'c': 3} , function(num) { return num * 3; });
     * // => { 'a': 3, 'b': 6, 'c': 9 }
     *
     * var characters = {
     *   'fred': { 'name': 'fred', 'age': 40 },
     *   'pebbles': { 'name': 'pebbles', 'age': 1 }
     * };
     *
     * // using "_.pluck" callback shorthand
     * _.mapValues(characters, 'age');
     * // => { 'fred': 40, 'pebbles': 1 }
     */
    function mapValues(object, callback, thisArg) {
      var result = {};
      callback = lodash.createCallback(callback, thisArg, 3);

      forOwn(object, function(value, key, object) {
        result[key] = callback(value, key, object);
      });
      return result;
    }

    /**
     * Recursively merges own enumerable properties of the source object(s), that
     * don't resolve to `undefined` into the destination object. Subsequent sources
     * will overwrite property assignments of previous sources. If a callback is
     * provided it will be executed to produce the merged values of the destination
     * and source properties. If the callback returns `undefined` merging will
     * be handled by the method instead. The callback is bound to `thisArg` and
     * invoked with two arguments; (objectValue, sourceValue).
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The destination object.
     * @param {...Object} [source] The source objects.
     * @param {Function} [callback] The function to customize merging properties.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns the destination object.
     * @example
     *
     * var names = {
     *   'characters': [
     *     { 'name': 'barney' },
     *     { 'name': 'fred' }
     *   ]
     * };
     *
     * var ages = {
     *   'characters': [
     *     { 'age': 36 },
     *     { 'age': 40 }
     *   ]
     * };
     *
     * _.merge(names, ages);
     * // => { 'characters': [{ 'name': 'barney', 'age': 36 }, { 'name': 'fred', 'age': 40 }] }
     *
     * var food = {
     *   'fruits': ['apple'],
     *   'vegetables': ['beet']
     * };
     *
     * var otherFood = {
     *   'fruits': ['banana'],
     *   'vegetables': ['carrot']
     * };
     *
     * _.merge(food, otherFood, function(a, b) {
     *   return _.isArray(a) ? a.concat(b) : undefined;
     * });
     * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot] }
     */
    function merge(object) {
      var args = arguments,
          length = 2;

      if (!isObject(object)) {
        return object;
      }
      // allows working with `_.reduce` and `_.reduceRight` without using
      // their `index` and `collection` arguments
      if (typeof args[2] != 'number') {
        length = args.length;
      }
      if (length > 3 && typeof args[length - 2] == 'function') {
        var callback = baseCreateCallback(args[--length - 1], args[length--], 2);
      } else if (length > 2 && typeof args[length - 1] == 'function') {
        callback = args[--length];
      }
      var sources = slice(arguments, 1, length),
          index = -1,
          stackA = getArray(),
          stackB = getArray();

      while (++index < length) {
        baseMerge(object, sources[index], callback, stackA, stackB);
      }
      releaseArray(stackA);
      releaseArray(stackB);
      return object;
    }

    /**
     * Creates a shallow clone of `object` excluding the specified properties.
     * Property names may be specified as individual arguments or as arrays of
     * property names. If a callback is provided it will be executed for each
     * property of `object` omitting the properties the callback returns truey
     * for. The callback is bound to `thisArg` and invoked with three arguments;
     * (value, key, object).
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The source object.
     * @param {Function|...string|string[]} [callback] The properties to omit or the
     *  function called per iteration.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns an object without the omitted properties.
     * @example
     *
     * _.omit({ 'name': 'fred', 'age': 40 }, 'age');
     * // => { 'name': 'fred' }
     *
     * _.omit({ 'name': 'fred', 'age': 40 }, function(value) {
     *   return typeof value == 'number';
     * });
     * // => { 'name': 'fred' }
     */
    function omit(object, callback, thisArg) {
      var result = {};
      if (typeof callback != 'function') {
        var props = [];
        forIn(object, function(value, key) {
          props.push(key);
        });
        props = baseDifference(props, baseFlatten(arguments, true, false, 1));

        var index = -1,
            length = props.length;

        while (++index < length) {
          var key = props[index];
          result[key] = object[key];
        }
      } else {
        callback = lodash.createCallback(callback, thisArg, 3);
        forIn(object, function(value, key, object) {
          if (!callback(value, key, object)) {
            result[key] = value;
          }
        });
      }
      return result;
    }

    /**
     * Creates a two dimensional array of an object's key-value pairs,
     * i.e. `[[key1, value1], [key2, value2]]`.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns new array of key-value pairs.
     * @example
     *
     * _.pairs({ 'barney': 36, 'fred': 40 });
     * // => [['barney', 36], ['fred', 40]] (property order is not guaranteed across environments)
     */
    function pairs(object) {
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
     * Creates a shallow clone of `object` composed of the specified properties.
     * Property names may be specified as individual arguments or as arrays of
     * property names. If a callback is provided it will be executed for each
     * property of `object` picking the properties the callback returns truey
     * for. The callback is bound to `thisArg` and invoked with three arguments;
     * (value, key, object).
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The source object.
     * @param {Function|...string|string[]} [callback] The function called per
     *  iteration or property names to pick, specified as individual property
     *  names or arrays of property names.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns an object composed of the picked properties.
     * @example
     *
     * _.pick({ 'name': 'fred', '_userid': 'fred1' }, 'name');
     * // => { 'name': 'fred' }
     *
     * _.pick({ 'name': 'fred', '_userid': 'fred1' }, function(value, key) {
     *   return key.charAt(0) != '_';
     * });
     * // => { 'name': 'fred' }
     */
    function pick(object, callback, thisArg) {
      var result = {};
      if (typeof callback != 'function') {
        var index = -1,
            props = baseFlatten(arguments, true, false, 1),
            length = isObject(object) ? props.length : 0;

        while (++index < length) {
          var key = props[index];
          if (key in object) {
            result[key] = object[key];
          }
        }
      } else {
        callback = lodash.createCallback(callback, thisArg, 3);
        forIn(object, function(value, key, object) {
          if (callback(value, key, object)) {
            result[key] = value;
          }
        });
      }
      return result;
    }

    /**
     * An alternative to `_.reduce` this method transforms `object` to a new
     * `accumulator` object which is the result of running each of its own
     * enumerable properties through a callback, with each callback execution
     * potentially mutating the `accumulator` object. The callback is bound to
     * `thisArg` and invoked with four arguments; (accumulator, value, key, object).
     * Callbacks may exit iteration early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Array|Object} object The object to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [accumulator] The custom accumulator value.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the accumulated value.
     * @example
     *
     * var squares = _.transform([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], function(result, num) {
     *   num *= num;
     *   if (num % 2) {
     *     return result.push(num) < 3;
     *   }
     * });
     * // => [1, 9, 25]
     *
     * var mapped = _.transform({ 'a': 1, 'b': 2, 'c': 3 }, function(result, num, key) {
     *   result[key] = num * 3;
     * });
     * // => { 'a': 3, 'b': 6, 'c': 9 }
     */
    function transform(object, callback, accumulator, thisArg) {
      var isArr = isArray(object);
      if (accumulator == null) {
        if (isArr) {
          accumulator = [];
        } else {
          var ctor = object && object.constructor,
              proto = ctor && ctor.prototype;

          accumulator = baseCreate(proto);
        }
      }
      if (callback) {
        callback = lodash.createCallback(callback, thisArg, 4);
        (isArr ? forEach : forOwn)(object, function(value, index, object) {
          return callback(accumulator, value, index, object);
        });
      }
      return accumulator;
    }

    /**
     * Creates an array composed of the own enumerable property values of `object`.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns an array of property values.
     * @example
     *
     * _.values({ 'one': 1, 'two': 2, 'three': 3 });
     * // => [1, 2, 3] (property order is not guaranteed across environments)
     */
    function values(object) {
      var index = -1,
          props = keys(object),
          length = props.length,
          result = Array(length);

      while (++index < length) {
        result[index] = object[props[index]];
      }
      return result;
    }

    /*--------------------------------------------------------------------------*/

    /**
     * Creates an array of elements from the specified indexes, or keys, of the
     * `collection`. Indexes may be specified as individual arguments or as arrays
     * of indexes.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {...(number|number[]|string|string[])} [index] The indexes of `collection`
     *   to retrieve, specified as individual indexes or arrays of indexes.
     * @returns {Array} Returns a new array of elements corresponding to the
     *  provided indexes.
     * @example
     *
     * _.at(['a', 'b', 'c', 'd', 'e'], [0, 2, 4]);
     * // => ['a', 'c', 'e']
     *
     * _.at(['fred', 'barney', 'pebbles'], 0, 2);
     * // => ['fred', 'pebbles']
     */
    function at(collection) {
      var args = arguments,
          index = -1,
          props = baseFlatten(args, true, false, 1),
          length = (args[2] && args[2][args[1]] === collection) ? 1 : props.length,
          result = Array(length);

      while(++index < length) {
        result[index] = collection[props[index]];
      }
      return result;
    }

    /**
     * Checks if a given value is present in a collection using strict equality
     * for comparisons, i.e. `===`. If `fromIndex` is negative, it is used as the
     * offset from the end of the collection.
     *
     * @static
     * @memberOf _
     * @alias include
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {*} target The value to check for.
     * @param {number} [fromIndex=0] The index to search from.
     * @returns {boolean} Returns `true` if the `target` element is found, else `false`.
     * @example
     *
     * _.contains([1, 2, 3], 1);
     * // => true
     *
     * _.contains([1, 2, 3], 1, 2);
     * // => false
     *
     * _.contains({ 'name': 'fred', 'age': 40 }, 'fred');
     * // => true
     *
     * _.contains('pebbles', 'eb');
     * // => true
     */
    function contains(collection, target, fromIndex) {
      var index = -1,
          indexOf = getIndexOf(),
          length = collection ? collection.length : 0,
          result = false;

      fromIndex = (fromIndex < 0 ? nativeMax(0, length + fromIndex) : fromIndex) || 0;
      if (isArray(collection)) {
        result = indexOf(collection, target, fromIndex) > -1;
      } else if (typeof length == 'number') {
        result = (isString(collection) ? collection.indexOf(target, fromIndex) : indexOf(collection, target, fromIndex)) > -1;
      } else {
        forOwn(collection, function(value) {
          if (++index >= fromIndex) {
            return !(result = value === target);
          }
        });
      }
      return result;
    }

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` through the callback. The corresponding value
     * of each key is the number of times the key was returned by the callback.
     * The callback is bound to `thisArg` and invoked with three arguments;
     * (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * _.countBy([4.3, 6.1, 6.4], function(num) { return Math.floor(num); });
     * // => { '4': 1, '6': 2 }
     *
     * _.countBy([4.3, 6.1, 6.4], function(num) { return this.floor(num); }, Math);
     * // => { '4': 1, '6': 2 }
     *
     * _.countBy(['one', 'two', 'three'], 'length');
     * // => { '3': 2, '5': 1 }
     */
    var countBy = createAggregator(function(result, value, key) {
      (hasOwnProperty.call(result, key) ? result[key]++ : result[key] = 1);
    });

    /**
     * Checks if the given callback returns truey value for **all** elements of
     * a collection. The callback is bound to `thisArg` and invoked with three
     * arguments; (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @alias all
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {boolean} Returns `true` if all elements passed the callback check,
     *  else `false`.
     * @example
     *
     * _.every([true, 1, null, 'yes']);
     * // => false
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36 },
     *   { 'name': 'fred',   'age': 40 }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.every(characters, 'age');
     * // => true
     *
     * // using "_.where" callback shorthand
     * _.every(characters, { 'age': 36 });
     * // => false
     */
    function every(collection, callback, thisArg) {
      var result = true;
      callback = lodash.createCallback(callback, thisArg, 3);

      var index = -1,
          length = collection ? collection.length : 0;

      if (typeof length == 'number') {
        while (++index < length) {
          if (!(result = !!callback(collection[index], index, collection))) {
            break;
          }
        }
      } else {
        forOwn(collection, function(value, index, collection) {
          return (result = !!callback(value, index, collection));
        });
      }
      return result;
    }

    /**
     * Iterates over elements of a collection, returning an array of all elements
     * the callback returns truey for. The callback is bound to `thisArg` and
     * invoked with three arguments; (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @alias select
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a new array of elements that passed the callback check.
     * @example
     *
     * var evens = _.filter([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
     * // => [2, 4, 6]
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36, 'blocked': false },
     *   { 'name': 'fred',   'age': 40, 'blocked': true }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.filter(characters, 'blocked');
     * // => [{ 'name': 'fred', 'age': 40, 'blocked': true }]
     *
     * // using "_.where" callback shorthand
     * _.filter(characters, { 'age': 36 });
     * // => [{ 'name': 'barney', 'age': 36, 'blocked': false }]
     */
    function filter(collection, callback, thisArg) {
      var result = [];
      callback = lodash.createCallback(callback, thisArg, 3);

      var index = -1,
          length = collection ? collection.length : 0;

      if (typeof length == 'number') {
        while (++index < length) {
          var value = collection[index];
          if (callback(value, index, collection)) {
            result.push(value);
          }
        }
      } else {
        forOwn(collection, function(value, index, collection) {
          if (callback(value, index, collection)) {
            result.push(value);
          }
        });
      }
      return result;
    }

    /**
     * Iterates over elements of a collection, returning the first element that
     * the callback returns truey for. The callback is bound to `thisArg` and
     * invoked with three arguments; (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @alias detect, findWhere
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the found element, else `undefined`.
     * @example
     *
     * var characters = [
     *   { 'name': 'barney',  'age': 36, 'blocked': false },
     *   { 'name': 'fred',    'age': 40, 'blocked': true },
     *   { 'name': 'pebbles', 'age': 1,  'blocked': false }
     * ];
     *
     * _.find(characters, function(chr) {
     *   return chr.age < 40;
     * });
     * // => { 'name': 'barney', 'age': 36, 'blocked': false }
     *
     * // using "_.where" callback shorthand
     * _.find(characters, { 'age': 1 });
     * // =>  { 'name': 'pebbles', 'age': 1, 'blocked': false }
     *
     * // using "_.pluck" callback shorthand
     * _.find(characters, 'blocked');
     * // => { 'name': 'fred', 'age': 40, 'blocked': true }
     */
    function find(collection, callback, thisArg) {
      callback = lodash.createCallback(callback, thisArg, 3);

      var index = -1,
          length = collection ? collection.length : 0;

      if (typeof length == 'number') {
        while (++index < length) {
          var value = collection[index];
          if (callback(value, index, collection)) {
            return value;
          }
        }
      } else {
        var result;
        forOwn(collection, function(value, index, collection) {
          if (callback(value, index, collection)) {
            result = value;
            return false;
          }
        });
        return result;
      }
    }

    /**
     * This method is like `_.find` except that it iterates over elements
     * of a `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the found element, else `undefined`.
     * @example
     *
     * _.findLast([1, 2, 3, 4], function(num) {
     *   return num % 2 == 1;
     * });
     * // => 3
     */
    function findLast(collection, callback, thisArg) {
      var result;
      callback = lodash.createCallback(callback, thisArg, 3);
      forEachRight(collection, function(value, index, collection) {
        if (callback(value, index, collection)) {
          result = value;
          return false;
        }
      });
      return result;
    }

    /**
     * Iterates over elements of a collection, executing the callback for each
     * element. The callback is bound to `thisArg` and invoked with three arguments;
     * (value, index|key, collection). Callbacks may exit iteration early by
     * explicitly returning `false`.
     *
     * Note: As with other "Collections" methods, objects with a `length` property
     * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
     * may be used for object iteration.
     *
     * @static
     * @memberOf _
     * @alias each
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array|Object|string} Returns `collection`.
     * @example
     *
     * _([1, 2, 3]).forEach(function(num) { console.log(num); }).join(',');
     * // => logs each number and returns '1,2,3'
     *
     * _.forEach({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { console.log(num); });
     * // => logs each number and returns the object (property order is not guaranteed across environments)
     */
    function forEach(collection, callback, thisArg) {
      var index = -1,
          length = collection ? collection.length : 0;

      callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
      if (typeof length == 'number') {
        while (++index < length) {
          if (callback(collection[index], index, collection) === false) {
            break;
          }
        }
      } else {
        forOwn(collection, callback);
      }
      return collection;
    }

    /**
     * This method is like `_.forEach` except that it iterates over elements
     * of a `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @alias eachRight
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array|Object|string} Returns `collection`.
     * @example
     *
     * _([1, 2, 3]).forEachRight(function(num) { console.log(num); }).join(',');
     * // => logs each number from right to left and returns '3,2,1'
     */
    function forEachRight(collection, callback, thisArg) {
      var length = collection ? collection.length : 0;
      callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
      if (typeof length == 'number') {
        while (length--) {
          if (callback(collection[length], length, collection) === false) {
            break;
          }
        }
      } else {
        var props = keys(collection);
        length = props.length;
        forOwn(collection, function(value, key, collection) {
          key = props ? props[--length] : --length;
          return callback(collection[key], key, collection);
        });
      }
      return collection;
    }

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of a collection through the callback. The corresponding value
     * of each key is an array of the elements responsible for generating the key.
     * The callback is bound to `thisArg` and invoked with three arguments;
     * (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * _.groupBy([4.2, 6.1, 6.4], function(num) { return Math.floor(num); });
     * // => { '4': [4.2], '6': [6.1, 6.4] }
     *
     * _.groupBy([4.2, 6.1, 6.4], function(num) { return this.floor(num); }, Math);
     * // => { '4': [4.2], '6': [6.1, 6.4] }
     *
     * // using "_.pluck" callback shorthand
     * _.groupBy(['one', 'two', 'three'], 'length');
     * // => { '3': ['one', 'two'], '5': ['three'] }
     */
    var groupBy = createAggregator(function(result, value, key) {
      (hasOwnProperty.call(result, key) ? result[key] : result[key] = []).push(value);
    });

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of the collection through the given callback. The corresponding
     * value of each key is the last element responsible for generating the key.
     * The callback is bound to `thisArg` and invoked with three arguments;
     * (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * var keys = [
     *   { 'dir': 'left', 'code': 97 },
     *   { 'dir': 'right', 'code': 100 }
     * ];
     *
     * _.indexBy(keys, 'dir');
     * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
     *
     * _.indexBy(keys, function(key) { return String.fromCharCode(key.code); });
     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
     *
     * _.indexBy(characters, function(key) { this.fromCharCode(key.code); }, String);
     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
     */
    var indexBy = createAggregator(function(result, value, key) {
      result[key] = value;
    });

    /**
     * Invokes the method named by `methodName` on each element in the `collection`
     * returning an array of the results of each invoked method. Additional arguments
     * will be provided to each invoked method. If `methodName` is a function it
     * will be invoked for, and `this` bound to, each element in the `collection`.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|string} methodName The name of the method to invoke or
     *  the function invoked per iteration.
     * @param {...*} [arg] Arguments to invoke the method with.
     * @returns {Array} Returns a new array of the results of each invoked method.
     * @example
     *
     * _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
     * // => [[1, 5, 7], [1, 2, 3]]
     *
     * _.invoke([123, 456], String.prototype.split, '');
     * // => [['1', '2', '3'], ['4', '5', '6']]
     */
    function invoke(collection, methodName) {
      var args = slice(arguments, 2),
          index = -1,
          isFunc = typeof methodName == 'function',
          length = collection ? collection.length : 0,
          result = Array(typeof length == 'number' ? length : 0);

      forEach(collection, function(value) {
        result[++index] = (isFunc ? methodName : value[methodName]).apply(value, args);
      });
      return result;
    }

    /**
     * Creates an array of values by running each element in the collection
     * through the callback. The callback is bound to `thisArg` and invoked with
     * three arguments; (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @alias collect
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a new array of the results of each `callback` execution.
     * @example
     *
     * _.map([1, 2, 3], function(num) { return num * 3; });
     * // => [3, 6, 9]
     *
     * _.map({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { return num * 3; });
     * // => [3, 6, 9] (property order is not guaranteed across environments)
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36 },
     *   { 'name': 'fred',   'age': 40 }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.map(characters, 'name');
     * // => ['barney', 'fred']
     */
    function map(collection, callback, thisArg) {
      var index = -1,
          length = collection ? collection.length : 0;

      callback = lodash.createCallback(callback, thisArg, 3);
      if (typeof length == 'number') {
        var result = Array(length);
        while (++index < length) {
          result[index] = callback(collection[index], index, collection);
        }
      } else {
        result = [];
        forOwn(collection, function(value, key, collection) {
          result[++index] = callback(value, key, collection);
        });
      }
      return result;
    }

    /**
     * Retrieves the maximum value of a collection. If the collection is empty or
     * falsey `-Infinity` is returned. If a callback is provided it will be executed
     * for each value in the collection to generate the criterion by which the value
     * is ranked. The callback is bound to `thisArg` and invoked with three
     * arguments; (value, index, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the maximum value.
     * @example
     *
     * _.max([4, 2, 8, 6]);
     * // => 8
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36 },
     *   { 'name': 'fred',   'age': 40 }
     * ];
     *
     * _.max(characters, function(chr) { return chr.age; });
     * // => { 'name': 'fred', 'age': 40 };
     *
     * // using "_.pluck" callback shorthand
     * _.max(characters, 'age');
     * // => { 'name': 'fred', 'age': 40 };
     */
    function max(collection, callback, thisArg) {
      var computed = -Infinity,
          result = computed;

      // allows working with functions like `_.map` without using
      // their `index` argument as a callback
      if (typeof callback != 'function' && thisArg && thisArg[callback] === collection) {
        callback = null;
      }
      if (callback == null && isArray(collection)) {
        var index = -1,
            length = collection.length;

        while (++index < length) {
          var value = collection[index];
          if (value > result) {
            result = value;
          }
        }
      } else {
        callback = (callback == null && isString(collection))
          ? charAtCallback
          : lodash.createCallback(callback, thisArg, 3);

        forEach(collection, function(value, index, collection) {
          var current = callback(value, index, collection);
          if (current > computed) {
            computed = current;
            result = value;
          }
        });
      }
      return result;
    }

    /**
     * Retrieves the minimum value of a collection. If the collection is empty or
     * falsey `Infinity` is returned. If a callback is provided it will be executed
     * for each value in the collection to generate the criterion by which the value
     * is ranked. The callback is bound to `thisArg` and invoked with three
     * arguments; (value, index, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the minimum value.
     * @example
     *
     * _.min([4, 2, 8, 6]);
     * // => 2
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36 },
     *   { 'name': 'fred',   'age': 40 }
     * ];
     *
     * _.min(characters, function(chr) { return chr.age; });
     * // => { 'name': 'barney', 'age': 36 };
     *
     * // using "_.pluck" callback shorthand
     * _.min(characters, 'age');
     * // => { 'name': 'barney', 'age': 36 };
     */
    function min(collection, callback, thisArg) {
      var computed = Infinity,
          result = computed;

      // allows working with functions like `_.map` without using
      // their `index` argument as a callback
      if (typeof callback != 'function' && thisArg && thisArg[callback] === collection) {
        callback = null;
      }
      if (callback == null && isArray(collection)) {
        var index = -1,
            length = collection.length;

        while (++index < length) {
          var value = collection[index];
          if (value < result) {
            result = value;
          }
        }
      } else {
        callback = (callback == null && isString(collection))
          ? charAtCallback
          : lodash.createCallback(callback, thisArg, 3);

        forEach(collection, function(value, index, collection) {
          var current = callback(value, index, collection);
          if (current < computed) {
            computed = current;
            result = value;
          }
        });
      }
      return result;
    }

    /**
     * Retrieves the value of a specified property from all elements in the collection.
     *
     * @static
     * @memberOf _
     * @type Function
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {string} property The name of the property to pluck.
     * @returns {Array} Returns a new array of property values.
     * @example
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36 },
     *   { 'name': 'fred',   'age': 40 }
     * ];
     *
     * _.pluck(characters, 'name');
     * // => ['barney', 'fred']
     */
    var pluck = map;

    /**
     * Reduces a collection to a value which is the accumulated result of running
     * each element in the collection through the callback, where each successive
     * callback execution consumes the return value of the previous execution. If
     * `accumulator` is not provided the first element of the collection will be
     * used as the initial `accumulator` value. The callback is bound to `thisArg`
     * and invoked with four arguments; (accumulator, value, index|key, collection).
     *
     * @static
     * @memberOf _
     * @alias foldl, inject
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [accumulator] Initial value of the accumulator.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the accumulated value.
     * @example
     *
     * var sum = _.reduce([1, 2, 3], function(sum, num) {
     *   return sum + num;
     * });
     * // => 6
     *
     * var mapped = _.reduce({ 'a': 1, 'b': 2, 'c': 3 }, function(result, num, key) {
     *   result[key] = num * 3;
     *   return result;
     * }, {});
     * // => { 'a': 3, 'b': 6, 'c': 9 }
     */
    function reduce(collection, callback, accumulator, thisArg) {
      if (!collection) return accumulator;
      var noaccum = arguments.length < 3;
      callback = lodash.createCallback(callback, thisArg, 4);

      var index = -1,
          length = collection.length;

      if (typeof length == 'number') {
        if (noaccum) {
          accumulator = collection[++index];
        }
        while (++index < length) {
          accumulator = callback(accumulator, collection[index], index, collection);
        }
      } else {
        forOwn(collection, function(value, index, collection) {
          accumulator = noaccum
            ? (noaccum = false, value)
            : callback(accumulator, value, index, collection)
        });
      }
      return accumulator;
    }

    /**
     * This method is like `_.reduce` except that it iterates over elements
     * of a `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @alias foldr
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [accumulator] Initial value of the accumulator.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the accumulated value.
     * @example
     *
     * var list = [[0, 1], [2, 3], [4, 5]];
     * var flat = _.reduceRight(list, function(a, b) { return a.concat(b); }, []);
     * // => [4, 5, 2, 3, 0, 1]
     */
    function reduceRight(collection, callback, accumulator, thisArg) {
      var noaccum = arguments.length < 3;
      callback = lodash.createCallback(callback, thisArg, 4);
      forEachRight(collection, function(value, index, collection) {
        accumulator = noaccum
          ? (noaccum = false, value)
          : callback(accumulator, value, index, collection);
      });
      return accumulator;
    }

    /**
     * The opposite of `_.filter` this method returns the elements of a
     * collection that the callback does **not** return truey for.
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a new array of elements that failed the callback check.
     * @example
     *
     * var odds = _.reject([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
     * // => [1, 3, 5]
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36, 'blocked': false },
     *   { 'name': 'fred',   'age': 40, 'blocked': true }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.reject(characters, 'blocked');
     * // => [{ 'name': 'barney', 'age': 36, 'blocked': false }]
     *
     * // using "_.where" callback shorthand
     * _.reject(characters, { 'age': 36 });
     * // => [{ 'name': 'fred', 'age': 40, 'blocked': true }]
     */
    function reject(collection, callback, thisArg) {
      callback = lodash.createCallback(callback, thisArg, 3);
      return filter(collection, function(value, index, collection) {
        return !callback(value, index, collection);
      });
    }

    /**
     * Retrieves a random element or `n` random elements from a collection.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to sample.
     * @param {number} [n] The number of elements to sample.
     * @param- {Object} [guard] Allows working with functions like `_.map`
     *  without using their `index` arguments as `n`.
     * @returns {Array} Returns the random sample(s) of `collection`.
     * @example
     *
     * _.sample([1, 2, 3, 4]);
     * // => 2
     *
     * _.sample([1, 2, 3, 4], 2);
     * // => [3, 1]
     */
    function sample(collection, n, guard) {
      if (collection && typeof collection.length != 'number') {
        collection = values(collection);
      }
      if (n == null || guard) {
        return collection ? collection[baseRandom(0, collection.length - 1)] : undefined;
      }
      var result = shuffle(collection);
      result.length = nativeMin(nativeMax(0, n), result.length);
      return result;
    }

    /**
     * Creates an array of shuffled values, using a version of the Fisher-Yates
     * shuffle. See http://en.wikipedia.org/wiki/Fisher-Yates_shuffle.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to shuffle.
     * @returns {Array} Returns a new shuffled collection.
     * @example
     *
     * _.shuffle([1, 2, 3, 4, 5, 6]);
     * // => [4, 1, 6, 3, 5, 2]
     */
    function shuffle(collection) {
      var index = -1,
          length = collection ? collection.length : 0,
          result = Array(typeof length == 'number' ? length : 0);

      forEach(collection, function(value) {
        var rand = baseRandom(0, ++index);
        result[index] = result[rand];
        result[rand] = value;
      });
      return result;
    }

    /**
     * Gets the size of the `collection` by returning `collection.length` for arrays
     * and array-like objects or the number of own enumerable properties for objects.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to inspect.
     * @returns {number} Returns `collection.length` or number of own enumerable properties.
     * @example
     *
     * _.size([1, 2]);
     * // => 2
     *
     * _.size({ 'one': 1, 'two': 2, 'three': 3 });
     * // => 3
     *
     * _.size('pebbles');
     * // => 7
     */
    function size(collection) {
      var length = collection ? collection.length : 0;
      return typeof length == 'number' ? length : keys(collection).length;
    }

    /**
     * Checks if the callback returns a truey value for **any** element of a
     * collection. The function returns as soon as it finds a passing value and
     * does not iterate over the entire collection. The callback is bound to
     * `thisArg` and invoked with three arguments; (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @alias any
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {boolean} Returns `true` if any element passed the callback check,
     *  else `false`.
     * @example
     *
     * _.some([null, 0, 'yes', false], Boolean);
     * // => true
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36, 'blocked': false },
     *   { 'name': 'fred',   'age': 40, 'blocked': true }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.some(characters, 'blocked');
     * // => true
     *
     * // using "_.where" callback shorthand
     * _.some(characters, { 'age': 1 });
     * // => false
     */
    function some(collection, callback, thisArg) {
      var result;
      callback = lodash.createCallback(callback, thisArg, 3);

      var index = -1,
          length = collection ? collection.length : 0;

      if (typeof length == 'number') {
        while (++index < length) {
          if ((result = callback(collection[index], index, collection))) {
            break;
          }
        }
      } else {
        forOwn(collection, function(value, index, collection) {
          return !(result = callback(value, index, collection));
        });
      }
      return !!result;
    }

    /**
     * Creates an array of elements, sorted in ascending order by the results of
     * running each element in a collection through the callback. This method
     * performs a stable sort, that is, it will preserve the original sort order
     * of equal elements. The callback is bound to `thisArg` and invoked with
     * three arguments; (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an array of property names is provided for `callback` the collection
     * will be sorted by each property value.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Array|Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a new array of sorted elements.
     * @example
     *
     * _.sortBy([1, 2, 3], function(num) { return Math.sin(num); });
     * // => [3, 1, 2]
     *
     * _.sortBy([1, 2, 3], function(num) { return this.sin(num); }, Math);
     * // => [3, 1, 2]
     *
     * var characters = [
     *   { 'name': 'barney',  'age': 36 },
     *   { 'name': 'fred',    'age': 40 },
     *   { 'name': 'barney',  'age': 26 },
     *   { 'name': 'fred',    'age': 30 }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.map(_.sortBy(characters, 'age'), _.values);
     * // => [['barney', 26], ['fred', 30], ['barney', 36], ['fred', 40]]
     *
     * // sorting by multiple properties
     * _.map(_.sortBy(characters, ['name', 'age']), _.values);
     * // = > [['barney', 26], ['barney', 36], ['fred', 30], ['fred', 40]]
     */
    function sortBy(collection, callback, thisArg) {
      var index = -1,
          isArr = isArray(callback),
          length = collection ? collection.length : 0,
          result = Array(typeof length == 'number' ? length : 0);

      if (!isArr) {
        callback = lodash.createCallback(callback, thisArg, 3);
      }
      forEach(collection, function(value, key, collection) {
        var object = result[++index] = getObject();
        if (isArr) {
          object.criteria = map(callback, function(key) { return value[key]; });
        } else {
          (object.criteria = getArray())[0] = callback(value, key, collection);
        }
        object.index = index;
        object.value = value;
      });

      length = result.length;
      result.sort(compareAscending);
      while (length--) {
        var object = result[length];
        result[length] = object.value;
        if (!isArr) {
          releaseArray(object.criteria);
        }
        releaseObject(object);
      }
      return result;
    }

    /**
     * Converts the `collection` to an array.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to convert.
     * @returns {Array} Returns the new converted array.
     * @example
     *
     * (function() { return _.toArray(arguments).slice(1); })(1, 2, 3, 4);
     * // => [2, 3, 4]
     */
    function toArray(collection) {
      if (collection && typeof collection.length == 'number') {
        return slice(collection);
      }
      return values(collection);
    }

    /**
     * Performs a deep comparison of each element in a `collection` to the given
     * `properties` object, returning an array of all elements that have equivalent
     * property values.
     *
     * @static
     * @memberOf _
     * @type Function
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Object} props The object of property values to filter by.
     * @returns {Array} Returns a new array of elements that have the given properties.
     * @example
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36, 'pets': ['hoppy'] },
     *   { 'name': 'fred',   'age': 40, 'pets': ['baby puss', 'dino'] }
     * ];
     *
     * _.where(characters, { 'age': 36 });
     * // => [{ 'name': 'barney', 'age': 36, 'pets': ['hoppy'] }]
     *
     * _.where(characters, { 'pets': ['dino'] });
     * // => [{ 'name': 'fred', 'age': 40, 'pets': ['baby puss', 'dino'] }]
     */
    var where = filter;

    /*--------------------------------------------------------------------------*/

    /**
     * Creates an array with all falsey values removed. The values `false`, `null`,
     * `0`, `""`, `undefined`, and `NaN` are all falsey.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to compact.
     * @returns {Array} Returns a new array of filtered values.
     * @example
     *
     * _.compact([0, 1, false, 2, '', 3]);
     * // => [1, 2, 3]
     */
    function compact(array) {
      var index = -1,
          length = array ? array.length : 0,
          result = [];

      while (++index < length) {
        var value = array[index];
        if (value) {
          result.push(value);
        }
      }
      return result;
    }

    /**
     * Creates an array excluding all values of the provided arrays using strict
     * equality for comparisons, i.e. `===`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to process.
     * @param {...Array} [values] The arrays of values to exclude.
     * @returns {Array} Returns a new array of filtered values.
     * @example
     *
     * _.difference([1, 2, 3, 4, 5], [5, 2, 10]);
     * // => [1, 3, 4]
     */
    function difference(array) {
      return baseDifference(array, baseFlatten(arguments, true, true, 1));
    }

    /**
     * This method is like `_.find` except that it returns the index of the first
     * element that passes the callback check, instead of the element itself.
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to search.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {number} Returns the index of the found element, else `-1`.
     * @example
     *
     * var characters = [
     *   { 'name': 'barney',  'age': 36, 'blocked': false },
     *   { 'name': 'fred',    'age': 40, 'blocked': true },
     *   { 'name': 'pebbles', 'age': 1,  'blocked': false }
     * ];
     *
     * _.findIndex(characters, function(chr) {
     *   return chr.age < 20;
     * });
     * // => 2
     *
     * // using "_.where" callback shorthand
     * _.findIndex(characters, { 'age': 36 });
     * // => 0
     *
     * // using "_.pluck" callback shorthand
     * _.findIndex(characters, 'blocked');
     * // => 1
     */
    function findIndex(array, callback, thisArg) {
      var index = -1,
          length = array ? array.length : 0;

      callback = lodash.createCallback(callback, thisArg, 3);
      while (++index < length) {
        if (callback(array[index], index, array)) {
          return index;
        }
      }
      return -1;
    }

    /**
     * This method is like `_.findIndex` except that it iterates over elements
     * of a `collection` from right to left.
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to search.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {number} Returns the index of the found element, else `-1`.
     * @example
     *
     * var characters = [
     *   { 'name': 'barney',  'age': 36, 'blocked': true },
     *   { 'name': 'fred',    'age': 40, 'blocked': false },
     *   { 'name': 'pebbles', 'age': 1,  'blocked': true }
     * ];
     *
     * _.findLastIndex(characters, function(chr) {
     *   return chr.age > 30;
     * });
     * // => 1
     *
     * // using "_.where" callback shorthand
     * _.findLastIndex(characters, { 'age': 36 });
     * // => 0
     *
     * // using "_.pluck" callback shorthand
     * _.findLastIndex(characters, 'blocked');
     * // => 2
     */
    function findLastIndex(array, callback, thisArg) {
      var length = array ? array.length : 0;
      callback = lodash.createCallback(callback, thisArg, 3);
      while (length--) {
        if (callback(array[length], length, array)) {
          return length;
        }
      }
      return -1;
    }

    /**
     * Gets the first element or first `n` elements of an array. If a callback
     * is provided elements at the beginning of the array are returned as long
     * as the callback returns truey. The callback is bound to `thisArg` and
     * invoked with three arguments; (value, index, array).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @alias head, take
     * @category Arrays
     * @param {Array} array The array to query.
     * @param {Function|Object|number|string} [callback] The function called
     *  per element or the number of elements to return. If a property name or
     *  object is provided it will be used to create a "_.pluck" or "_.where"
     *  style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the first element(s) of `array`.
     * @example
     *
     * _.first([1, 2, 3]);
     * // => 1
     *
     * _.first([1, 2, 3], 2);
     * // => [1, 2]
     *
     * _.first([1, 2, 3], function(num) {
     *   return num < 3;
     * });
     * // => [1, 2]
     *
     * var characters = [
     *   { 'name': 'barney',  'blocked': true,  'employer': 'slate' },
     *   { 'name': 'fred',    'blocked': false, 'employer': 'slate' },
     *   { 'name': 'pebbles', 'blocked': true,  'employer': 'na' }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.first(characters, 'blocked');
     * // => [{ 'name': 'barney', 'blocked': true, 'employer': 'slate' }]
     *
     * // using "_.where" callback shorthand
     * _.pluck(_.first(characters, { 'employer': 'slate' }), 'name');
     * // => ['barney', 'fred']
     */
    function first(array, callback, thisArg) {
      var n = 0,
          length = array ? array.length : 0;

      if (typeof callback != 'number' && callback != null) {
        var index = -1;
        callback = lodash.createCallback(callback, thisArg, 3);
        while (++index < length && callback(array[index], index, array)) {
          n++;
        }
      } else {
        n = callback;
        if (n == null || thisArg) {
          return array ? array[0] : undefined;
        }
      }
      return slice(array, 0, nativeMin(nativeMax(0, n), length));
    }

    /**
     * Flattens a nested array (the nesting can be to any depth). If `isShallow`
     * is truey, the array will only be flattened a single level. If a callback
     * is provided each element of the array is passed through the callback before
     * flattening. The callback is bound to `thisArg` and invoked with three
     * arguments; (value, index, array).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to flatten.
     * @param {boolean} [isShallow=false] A flag to restrict flattening to a single level.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a new flattened array.
     * @example
     *
     * _.flatten([1, [2], [3, [[4]]]]);
     * // => [1, 2, 3, 4];
     *
     * _.flatten([1, [2], [3, [[4]]]], true);
     * // => [1, 2, 3, [[4]]];
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 30, 'pets': ['hoppy'] },
     *   { 'name': 'fred',   'age': 40, 'pets': ['baby puss', 'dino'] }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.flatten(characters, 'pets');
     * // => ['hoppy', 'baby puss', 'dino']
     */
    function flatten(array, isShallow, callback, thisArg) {
      // juggle arguments
      if (typeof isShallow != 'boolean' && isShallow != null) {
        thisArg = callback;
        callback = (typeof isShallow != 'function' && thisArg && thisArg[isShallow] === array) ? null : isShallow;
        isShallow = false;
      }
      if (callback != null) {
        array = map(array, callback, thisArg);
      }
      return baseFlatten(array, isShallow);
    }

    /**
     * Gets the index at which the first occurrence of `value` is found using
     * strict equality for comparisons, i.e. `===`. If the array is already sorted
     * providing `true` for `fromIndex` will run a faster binary search.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to search.
     * @param {*} value The value to search for.
     * @param {boolean|number} [fromIndex=0] The index to search from or `true`
     *  to perform a binary search on a sorted array.
     * @returns {number} Returns the index of the matched value or `-1`.
     * @example
     *
     * _.indexOf([1, 2, 3, 1, 2, 3], 2);
     * // => 1
     *
     * _.indexOf([1, 2, 3, 1, 2, 3], 2, 3);
     * // => 4
     *
     * _.indexOf([1, 1, 2, 2, 3, 3], 2, true);
     * // => 2
     */
    function indexOf(array, value, fromIndex) {
      if (typeof fromIndex == 'number') {
        var length = array ? array.length : 0;
        fromIndex = (fromIndex < 0 ? nativeMax(0, length + fromIndex) : fromIndex || 0);
      } else if (fromIndex) {
        var index = sortedIndex(array, value);
        return array[index] === value ? index : -1;
      }
      return baseIndexOf(array, value, fromIndex);
    }

    /**
     * Gets all but the last element or last `n` elements of an array. If a
     * callback is provided elements at the end of the array are excluded from
     * the result as long as the callback returns truey. The callback is bound
     * to `thisArg` and invoked with three arguments; (value, index, array).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to query.
     * @param {Function|Object|number|string} [callback=1] The function called
     *  per element or the number of elements to exclude. If a property name or
     *  object is provided it will be used to create a "_.pluck" or "_.where"
     *  style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a slice of `array`.
     * @example
     *
     * _.initial([1, 2, 3]);
     * // => [1, 2]
     *
     * _.initial([1, 2, 3], 2);
     * // => [1]
     *
     * _.initial([1, 2, 3], function(num) {
     *   return num > 1;
     * });
     * // => [1]
     *
     * var characters = [
     *   { 'name': 'barney',  'blocked': false, 'employer': 'slate' },
     *   { 'name': 'fred',    'blocked': true,  'employer': 'slate' },
     *   { 'name': 'pebbles', 'blocked': true,  'employer': 'na' }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.initial(characters, 'blocked');
     * // => [{ 'name': 'barney',  'blocked': false, 'employer': 'slate' }]
     *
     * // using "_.where" callback shorthand
     * _.pluck(_.initial(characters, { 'employer': 'na' }), 'name');
     * // => ['barney', 'fred']
     */
    function initial(array, callback, thisArg) {
      var n = 0,
          length = array ? array.length : 0;

      if (typeof callback != 'number' && callback != null) {
        var index = length;
        callback = lodash.createCallback(callback, thisArg, 3);
        while (index-- && callback(array[index], index, array)) {
          n++;
        }
      } else {
        n = (callback == null || thisArg) ? 1 : callback || n;
      }
      return slice(array, 0, nativeMin(nativeMax(0, length - n), length));
    }

    /**
     * Creates an array of unique values present in all provided arrays using
     * strict equality for comparisons, i.e. `===`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {...Array} [array] The arrays to inspect.
     * @returns {Array} Returns an array of shared values.
     * @example
     *
     * _.intersection([1, 2, 3], [5, 2, 1, 4], [2, 1]);
     * // => [1, 2]
     */
    function intersection() {
      var args = [],
          argsIndex = -1,
          argsLength = arguments.length,
          caches = getArray(),
          indexOf = getIndexOf(),
          trustIndexOf = indexOf === baseIndexOf,
          seen = getArray();

      while (++argsIndex < argsLength) {
        var value = arguments[argsIndex];
        if (isArray(value) || isArguments(value)) {
          args.push(value);
          caches.push(trustIndexOf && value.length >= largeArraySize &&
            createCache(argsIndex ? args[argsIndex] : seen));
        }
      }
      var array = args[0],
          index = -1,
          length = array ? array.length : 0,
          result = [];

      outer:
      while (++index < length) {
        var cache = caches[0];
        value = array[index];

        if ((cache ? cacheIndexOf(cache, value) : indexOf(seen, value)) < 0) {
          argsIndex = argsLength;
          (cache || seen).push(value);
          while (--argsIndex) {
            cache = caches[argsIndex];
            if ((cache ? cacheIndexOf(cache, value) : indexOf(args[argsIndex], value)) < 0) {
              continue outer;
            }
          }
          result.push(value);
        }
      }
      while (argsLength--) {
        cache = caches[argsLength];
        if (cache) {
          releaseObject(cache);
        }
      }
      releaseArray(caches);
      releaseArray(seen);
      return result;
    }

    /**
     * Gets the last element or last `n` elements of an array. If a callback is
     * provided elements at the end of the array are returned as long as the
     * callback returns truey. The callback is bound to `thisArg` and invoked
     * with three arguments; (value, index, array).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to query.
     * @param {Function|Object|number|string} [callback] The function called
     *  per element or the number of elements to return. If a property name or
     *  object is provided it will be used to create a "_.pluck" or "_.where"
     *  style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the last element(s) of `array`.
     * @example
     *
     * _.last([1, 2, 3]);
     * // => 3
     *
     * _.last([1, 2, 3], 2);
     * // => [2, 3]
     *
     * _.last([1, 2, 3], function(num) {
     *   return num > 1;
     * });
     * // => [2, 3]
     *
     * var characters = [
     *   { 'name': 'barney',  'blocked': false, 'employer': 'slate' },
     *   { 'name': 'fred',    'blocked': true,  'employer': 'slate' },
     *   { 'name': 'pebbles', 'blocked': true,  'employer': 'na' }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.pluck(_.last(characters, 'blocked'), 'name');
     * // => ['fred', 'pebbles']
     *
     * // using "_.where" callback shorthand
     * _.last(characters, { 'employer': 'na' });
     * // => [{ 'name': 'pebbles', 'blocked': true, 'employer': 'na' }]
     */
    function last(array, callback, thisArg) {
      var n = 0,
          length = array ? array.length : 0;

      if (typeof callback != 'number' && callback != null) {
        var index = length;
        callback = lodash.createCallback(callback, thisArg, 3);
        while (index-- && callback(array[index], index, array)) {
          n++;
        }
      } else {
        n = callback;
        if (n == null || thisArg) {
          return array ? array[length - 1] : undefined;
        }
      }
      return slice(array, nativeMax(0, length - n));
    }

    /**
     * Gets the index at which the last occurrence of `value` is found using strict
     * equality for comparisons, i.e. `===`. If `fromIndex` is negative, it is used
     * as the offset from the end of the collection.
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to search.
     * @param {*} value The value to search for.
     * @param {number} [fromIndex=array.length-1] The index to search from.
     * @returns {number} Returns the index of the matched value or `-1`.
     * @example
     *
     * _.lastIndexOf([1, 2, 3, 1, 2, 3], 2);
     * // => 4
     *
     * _.lastIndexOf([1, 2, 3, 1, 2, 3], 2, 3);
     * // => 1
     */
    function lastIndexOf(array, value, fromIndex) {
      var index = array ? array.length : 0;
      if (typeof fromIndex == 'number') {
        index = (fromIndex < 0 ? nativeMax(0, index + fromIndex) : nativeMin(fromIndex, index - 1)) + 1;
      }
      while (index--) {
        if (array[index] === value) {
          return index;
        }
      }
      return -1;
    }

    /**
     * Removes all provided values from the given array using strict equality for
     * comparisons, i.e. `===`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to modify.
     * @param {...*} [value] The values to remove.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [1, 2, 3, 1, 2, 3];
     * _.pull(array, 2, 3);
     * console.log(array);
     * // => [1, 1]
     */
    function pull(array) {
      var args = arguments,
          argsIndex = 0,
          argsLength = args.length,
          length = array ? array.length : 0;

      while (++argsIndex < argsLength) {
        var index = -1,
            value = args[argsIndex];
        while (++index < length) {
          if (array[index] === value) {
            splice.call(array, index--, 1);
            length--;
          }
        }
      }
      return array;
    }

    /**
     * Creates an array of numbers (positive and/or negative) progressing from
     * `start` up to but not including `end`. If `start` is less than `stop` a
     * zero-length range is created unless a negative `step` is specified.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @param {number} [step=1] The value to increment or decrement by.
     * @returns {Array} Returns a new range array.
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
      start = +start || 0;
      step = typeof step == 'number' ? step : (+step || 1);

      if (end == null) {
        end = start;
        start = 0;
      }
      // use `Array(length)` so engines like Chakra and V8 avoid slower modes
      // http://youtu.be/XAqIpGU8ZZk#t=17m25s
      var index = -1,
          length = nativeMax(0, ceil((end - start) / (step || 1))),
          result = Array(length);

      while (++index < length) {
        result[index] = start;
        start += step;
      }
      return result;
    }

    /**
     * Removes all elements from an array that the callback returns truey for
     * and returns an array of removed elements. The callback is bound to `thisArg`
     * and invoked with three arguments; (value, index, array).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to modify.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a new array of removed elements.
     * @example
     *
     * var array = [1, 2, 3, 4, 5, 6];
     * var evens = _.remove(array, function(num) { return num % 2 == 0; });
     *
     * console.log(array);
     * // => [1, 3, 5]
     *
     * console.log(evens);
     * // => [2, 4, 6]
     */
    function remove(array, callback, thisArg) {
      var index = -1,
          length = array ? array.length : 0,
          result = [];

      callback = lodash.createCallback(callback, thisArg, 3);
      while (++index < length) {
        var value = array[index];
        if (callback(value, index, array)) {
          result.push(value);
          splice.call(array, index--, 1);
          length--;
        }
      }
      return result;
    }

    /**
     * The opposite of `_.initial` this method gets all but the first element or
     * first `n` elements of an array. If a callback function is provided elements
     * at the beginning of the array are excluded from the result as long as the
     * callback returns truey. The callback is bound to `thisArg` and invoked
     * with three arguments; (value, index, array).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @alias drop, tail
     * @category Arrays
     * @param {Array} array The array to query.
     * @param {Function|Object|number|string} [callback=1] The function called
     *  per element or the number of elements to exclude. If a property name or
     *  object is provided it will be used to create a "_.pluck" or "_.where"
     *  style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a slice of `array`.
     * @example
     *
     * _.rest([1, 2, 3]);
     * // => [2, 3]
     *
     * _.rest([1, 2, 3], 2);
     * // => [3]
     *
     * _.rest([1, 2, 3], function(num) {
     *   return num < 3;
     * });
     * // => [3]
     *
     * var characters = [
     *   { 'name': 'barney',  'blocked': true,  'employer': 'slate' },
     *   { 'name': 'fred',    'blocked': false,  'employer': 'slate' },
     *   { 'name': 'pebbles', 'blocked': true, 'employer': 'na' }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.pluck(_.rest(characters, 'blocked'), 'name');
     * // => ['fred', 'pebbles']
     *
     * // using "_.where" callback shorthand
     * _.rest(characters, { 'employer': 'slate' });
     * // => [{ 'name': 'pebbles', 'blocked': true, 'employer': 'na' }]
     */
    function rest(array, callback, thisArg) {
      if (typeof callback != 'number' && callback != null) {
        var n = 0,
            index = -1,
            length = array ? array.length : 0;

        callback = lodash.createCallback(callback, thisArg, 3);
        while (++index < length && callback(array[index], index, array)) {
          n++;
        }
      } else {
        n = (callback == null || thisArg) ? 1 : nativeMax(0, callback);
      }
      return slice(array, n);
    }

    /**
     * Uses a binary search to determine the smallest index at which a value
     * should be inserted into a given sorted array in order to maintain the sort
     * order of the array. If a callback is provided it will be executed for
     * `value` and each element of `array` to compute their sort ranking. The
     * callback is bound to `thisArg` and invoked with one argument; (value).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * _.sortedIndex([20, 30, 50], 40);
     * // => 2
     *
     * // using "_.pluck" callback shorthand
     * _.sortedIndex([{ 'x': 20 }, { 'x': 30 }, { 'x': 50 }], { 'x': 40 }, 'x');
     * // => 2
     *
     * var dict = {
     *   'wordToNumber': { 'twenty': 20, 'thirty': 30, 'fourty': 40, 'fifty': 50 }
     * };
     *
     * _.sortedIndex(['twenty', 'thirty', 'fifty'], 'fourty', function(word) {
     *   return dict.wordToNumber[word];
     * });
     * // => 2
     *
     * _.sortedIndex(['twenty', 'thirty', 'fifty'], 'fourty', function(word) {
     *   return this.wordToNumber[word];
     * }, dict);
     * // => 2
     */
    function sortedIndex(array, value, callback, thisArg) {
      var low = 0,
          high = array ? array.length : low;

      // explicitly reference `identity` for better inlining in Firefox
      callback = callback ? lodash.createCallback(callback, thisArg, 1) : identity;
      value = callback(value);

      while (low < high) {
        var mid = (low + high) >>> 1;
        (callback(array[mid]) < value)
          ? low = mid + 1
          : high = mid;
      }
      return low;
    }

    /**
     * Creates an array of unique values, in order, of the provided arrays using
     * strict equality for comparisons, i.e. `===`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {...Array} [array] The arrays to inspect.
     * @returns {Array} Returns an array of combined values.
     * @example
     *
     * _.union([1, 2, 3], [5, 2, 1, 4], [2, 1]);
     * // => [1, 2, 3, 5, 4]
     */
    function union() {
      return baseUniq(baseFlatten(arguments, true, true));
    }

    /**
     * Creates a duplicate-value-free version of an array using strict equality
     * for comparisons, i.e. `===`. If the array is sorted, providing
     * `true` for `isSorted` will use a faster algorithm. If a callback is provided
     * each element of `array` is passed through the callback before uniqueness
     * is computed. The callback is bound to `thisArg` and invoked with three
     * arguments; (value, index, array).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @alias unique
     * @category Arrays
     * @param {Array} array The array to process.
     * @param {boolean} [isSorted=false] A flag to indicate that `array` is sorted.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a duplicate-value-free array.
     * @example
     *
     * _.uniq([1, 2, 1, 3, 1]);
     * // => [1, 2, 3]
     *
     * _.uniq([1, 1, 2, 2, 3], true);
     * // => [1, 2, 3]
     *
     * _.uniq(['A', 'b', 'C', 'a', 'B', 'c'], function(letter) { return letter.toLowerCase(); });
     * // => ['A', 'b', 'C']
     *
     * _.uniq([1, 2.5, 3, 1.5, 2, 3.5], function(num) { return this.floor(num); }, Math);
     * // => [1, 2.5, 3]
     *
     * // using "_.pluck" callback shorthand
     * _.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }, { 'x': 2 }]
     */
    function uniq(array, isSorted, callback, thisArg) {
      // juggle arguments
      if (typeof isSorted != 'boolean' && isSorted != null) {
        thisArg = callback;
        callback = (typeof isSorted != 'function' && thisArg && thisArg[isSorted] === array) ? null : isSorted;
        isSorted = false;
      }
      if (callback != null) {
        callback = lodash.createCallback(callback, thisArg, 3);
      }
      return baseUniq(array, isSorted, callback);
    }

    /**
     * Creates an array excluding all provided values using strict equality for
     * comparisons, i.e. `===`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to filter.
     * @param {...*} [value] The values to exclude.
     * @returns {Array} Returns a new array of filtered values.
     * @example
     *
     * _.without([1, 2, 1, 0, 3, 1, 4], 0, 1);
     * // => [2, 3, 4]
     */
    function without(array) {
      return baseDifference(array, slice(arguments, 1));
    }

    /**
     * Creates an array that is the symmetric difference of the provided arrays.
     * See http://en.wikipedia.org/wiki/Symmetric_difference.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {...Array} [array] The arrays to inspect.
     * @returns {Array} Returns an array of values.
     * @example
     *
     * _.xor([1, 2, 3], [5, 2, 1, 4]);
     * // => [3, 5, 4]
     *
     * _.xor([1, 2, 5], [2, 3, 5], [3, 4, 5]);
     * // => [1, 4, 5]
     */
    function xor() {
      var index = -1,
          length = arguments.length;

      while (++index < length) {
        var array = arguments[index];
        if (isArray(array) || isArguments(array)) {
          var result = result
            ? baseUniq(baseDifference(result, array).concat(baseDifference(array, result)))
            : array;
        }
      }
      return result || [];
    }

    /**
     * Creates an array of grouped elements, the first of which contains the first
     * elements of the given arrays, the second of which contains the second
     * elements of the given arrays, and so on.
     *
     * @static
     * @memberOf _
     * @alias unzip
     * @category Arrays
     * @param {...Array} [array] Arrays to process.
     * @returns {Array} Returns a new array of grouped elements.
     * @example
     *
     * _.zip(['fred', 'barney'], [30, 40], [true, false]);
     * // => [['fred', 30, true], ['barney', 40, false]]
     */
    function zip() {
      var array = arguments.length > 1 ? arguments : arguments[0],
          index = -1,
          length = array ? max(pluck(array, 'length')) : 0,
          result = Array(length < 0 ? 0 : length);

      while (++index < length) {
        result[index] = pluck(array, index);
      }
      return result;
    }

    /**
     * Creates an object composed from arrays of `keys` and `values`. Provide
     * either a single two dimensional array, i.e. `[[key1, value1], [key2, value2]]`
     * or two arrays, one of `keys` and one of corresponding `values`.
     *
     * @static
     * @memberOf _
     * @alias object
     * @category Arrays
     * @param {Array} keys The array of keys.
     * @param {Array} [values=[]] The array of values.
     * @returns {Object} Returns an object composed of the given keys and
     *  corresponding values.
     * @example
     *
     * _.zipObject(['fred', 'barney'], [30, 40]);
     * // => { 'fred': 30, 'barney': 40 }
     */
    function zipObject(keys, values) {
      var index = -1,
          length = keys ? keys.length : 0,
          result = {};

      if (!values && length && !isArray(keys[0])) {
        values = [];
      }
      while (++index < length) {
        var key = keys[index];
        if (values) {
          result[key] = values[index];
        } else if (key) {
          result[key[0]] = key[1];
        }
      }
      return result;
    }

    /*--------------------------------------------------------------------------*/

    /**
     * Creates a function that executes `func`, with  the `this` binding and
     * arguments of the created function, only after being called `n` times.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {number} n The number of times the function must be called before
     *  `func` is executed.
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * var saves = ['profile', 'settings'];
     *
     * var done = _.after(saves.length, function() {
     *   console.log('Done saving!');
     * });
     *
     * _.forEach(saves, function(type) {
     *   asyncSave({ 'type': type, 'complete': done });
     * });
     * // => logs 'Done saving!', after all saves have completed
     */
    function after(n, func) {
      if (!isFunction(func)) {
        throw new TypeError;
      }
      return function() {
        if (--n < 1) {
          return func.apply(this, arguments);
        }
      };
    }

    /**
     * Creates a function that, when called, invokes `func` with the `this`
     * binding of `thisArg` and prepends any additional `bind` arguments to those
     * provided to the bound function.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to bind.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {...*} [arg] Arguments to be partially applied.
     * @returns {Function} Returns the new bound function.
     * @example
     *
     * var func = function(greeting) {
     *   return greeting + ' ' + this.name;
     * };
     *
     * func = _.bind(func, { 'name': 'fred' }, 'hi');
     * func();
     * // => 'hi fred'
     */
    function bind(func, thisArg) {
      return arguments.length > 2
        ? createWrapper(func, 17, slice(arguments, 2), null, thisArg)
        : createWrapper(func, 1, null, null, thisArg);
    }

    /**
     * Binds methods of an object to the object itself, overwriting the existing
     * method. Method names may be specified as individual arguments or as arrays
     * of method names. If no method names are provided all the function properties
     * of `object` will be bound.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Object} object The object to bind and assign the bound methods to.
     * @param {...string} [methodName] The object method names to
     *  bind, specified as individual method names or arrays of method names.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var view = {
     *   'label': 'docs',
     *   'onClick': function() { console.log('clicked ' + this.label); }
     * };
     *
     * _.bindAll(view);
     * jQuery('#docs').on('click', view.onClick);
     * // => logs 'clicked docs', when the button is clicked
     */
    function bindAll(object) {
      var funcs = arguments.length > 1 ? baseFlatten(arguments, true, false, 1) : functions(object),
          index = -1,
          length = funcs.length;

      while (++index < length) {
        var key = funcs[index];
        object[key] = createWrapper(object[key], 1, null, null, object);
      }
      return object;
    }

    /**
     * Creates a function that, when called, invokes the method at `object[key]`
     * and prepends any additional `bindKey` arguments to those provided to the bound
     * function. This method differs from `_.bind` by allowing bound functions to
     * reference methods that will be redefined or don't yet exist.
     * See http://michaux.ca/articles/lazy-function-definition-pattern.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Object} object The object the method belongs to.
     * @param {string} key The key of the method.
     * @param {...*} [arg] Arguments to be partially applied.
     * @returns {Function} Returns the new bound function.
     * @example
     *
     * var object = {
     *   'name': 'fred',
     *   'greet': function(greeting) {
     *     return greeting + ' ' + this.name;
     *   }
     * };
     *
     * var func = _.bindKey(object, 'greet', 'hi');
     * func();
     * // => 'hi fred'
     *
     * object.greet = function(greeting) {
     *   return greeting + 'ya ' + this.name + '!';
     * };
     *
     * func();
     * // => 'hiya fred!'
     */
    function bindKey(object, key) {
      return arguments.length > 2
        ? createWrapper(key, 19, slice(arguments, 2), null, object)
        : createWrapper(key, 3, null, null, object);
    }

    /**
     * Creates a function that is the composition of the provided functions,
     * where each function consumes the return value of the function that follows.
     * For example, composing the functions `f()`, `g()`, and `h()` produces `f(g(h()))`.
     * Each function is executed with the `this` binding of the composed function.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {...Function} [func] Functions to compose.
     * @returns {Function} Returns the new composed function.
     * @example
     *
     * var realNameMap = {
     *   'pebbles': 'penelope'
     * };
     *
     * var format = function(name) {
     *   name = realNameMap[name.toLowerCase()] || name;
     *   return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
     * };
     *
     * var greet = function(formatted) {
     *   return 'Hiya ' + formatted + '!';
     * };
     *
     * var welcome = _.compose(greet, format);
     * welcome('pebbles');
     * // => 'Hiya Penelope!'
     */
    function compose() {
      var funcs = arguments,
          length = funcs.length;

      while (length--) {
        if (!isFunction(funcs[length])) {
          throw new TypeError;
        }
      }
      return function() {
        var args = arguments,
            length = funcs.length;

        while (length--) {
          args = [funcs[length].apply(this, args)];
        }
        return args[0];
      };
    }

    /**
     * Creates a function which accepts one or more arguments of `func` that when
     * invoked either executes `func` returning its result, if all `func` arguments
     * have been provided, or returns a function that accepts one or more of the
     * remaining `func` arguments, and so on. The arity of `func` can be specified
     * if `func.length` is not sufficient.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to curry.
     * @param {number} [arity=func.length] The arity of `func`.
     * @returns {Function} Returns the new curried function.
     * @example
     *
     * var curried = _.curry(function(a, b, c) {
     *   console.log(a + b + c);
     * });
     *
     * curried(1)(2)(3);
     * // => 6
     *
     * curried(1, 2)(3);
     * // => 6
     *
     * curried(1, 2, 3);
     * // => 6
     */
    function curry(func, arity) {
      arity = typeof arity == 'number' ? arity : (+arity || func.length);
      return createWrapper(func, 4, null, null, null, arity);
    }

    /**
     * Creates a function that will delay the execution of `func` until after
     * `wait` milliseconds have elapsed since the last time it was invoked.
     * Provide an options object to indicate that `func` should be invoked on
     * the leading and/or trailing edge of the `wait` timeout. Subsequent calls
     * to the debounced function will return the result of the last `func` call.
     *
     * Note: If `leading` and `trailing` options are `true` `func` will be called
     * on the trailing edge of the timeout only if the the debounced function is
     * invoked more than once during the `wait` timeout.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to debounce.
     * @param {number} wait The number of milliseconds to delay.
     * @param {Object} [options] The options object.
     * @param {boolean} [options.leading=false] Specify execution on the leading edge of the timeout.
     * @param {number} [options.maxWait] The maximum time `func` is allowed to be delayed before it's called.
     * @param {boolean} [options.trailing=true] Specify execution on the trailing edge of the timeout.
     * @returns {Function} Returns the new debounced function.
     * @example
     *
     * // avoid costly calculations while the window size is in flux
     * var lazyLayout = _.debounce(calculateLayout, 150);
     * jQuery(window).on('resize', lazyLayout);
     *
     * // execute `sendMail` when the click event is fired, debouncing subsequent calls
     * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
     *   'leading': true,
     *   'trailing': false
     * });
     *
     * // ensure `batchLog` is executed once after 1 second of debounced calls
     * var source = new EventSource('/stream');
     * source.addEventListener('message', _.debounce(batchLog, 250, {
     *   'maxWait': 1000
     * }, false);
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

      if (!isFunction(func)) {
        throw new TypeError;
      }
      wait = nativeMax(0, wait) || 0;
      if (options === true) {
        var leading = true;
        trailing = false;
      } else if (isObject(options)) {
        leading = options.leading;
        maxWait = 'maxWait' in options && (nativeMax(wait, options.maxWait) || 0);
        trailing = 'trailing' in options ? options.trailing : trailing;
      }
      var delayed = function() {
        var remaining = wait - (now() - stamp);
        if (remaining <= 0) {
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
      };

      var maxDelayed = function() {
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
      };

      return function() {
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
              isCalled = remaining <= 0;

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
      };
    }

    /**
     * Defers executing the `func` function until the current call stack has cleared.
     * Additional arguments will be provided to `func` when it is invoked.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to defer.
     * @param {...*} [arg] Arguments to invoke the function with.
     * @returns {number} Returns the timer id.
     * @example
     *
     * _.defer(function(text) { console.log(text); }, 'deferred');
     * // logs 'deferred' after one or more milliseconds
     */
    function defer(func) {
      if (!isFunction(func)) {
        throw new TypeError;
      }
      var args = slice(arguments, 1);
      return setTimeout(function() { func.apply(undefined, args); }, 1);
    }

    /**
     * Executes the `func` function after `wait` milliseconds. Additional arguments
     * will be provided to `func` when it is invoked.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay execution.
     * @param {...*} [arg] Arguments to invoke the function with.
     * @returns {number} Returns the timer id.
     * @example
     *
     * _.delay(function(text) { console.log(text); }, 1000, 'later');
     * // => logs 'later' after one second
     */
    function delay(func, wait) {
      if (!isFunction(func)) {
        throw new TypeError;
      }
      var args = slice(arguments, 2);
      return setTimeout(function() { func.apply(undefined, args); }, wait);
    }

    /**
     * Creates a function that memoizes the result of `func`. If `resolver` is
     * provided it will be used to determine the cache key for storing the result
     * based on the arguments provided to the memoized function. By default, the
     * first argument provided to the memoized function is used as the cache key.
     * The `func` is executed with the `this` binding of the memoized function.
     * The result cache is exposed as the `cache` property on the memoized function.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to have its output memoized.
     * @param {Function} [resolver] A function used to resolve the cache key.
     * @returns {Function} Returns the new memoizing function.
     * @example
     *
     * var fibonacci = _.memoize(function(n) {
     *   return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
     * });
     *
     * fibonacci(9)
     * // => 34
     *
     * var data = {
     *   'fred': { 'name': 'fred', 'age': 40 },
     *   'pebbles': { 'name': 'pebbles', 'age': 1 }
     * };
     *
     * // modifying the result cache
     * var get = _.memoize(function(name) { return data[name]; }, _.identity);
     * get('pebbles');
     * // => { 'name': 'pebbles', 'age': 1 }
     *
     * get.cache.pebbles.name = 'penelope';
     * get('pebbles');
     * // => { 'name': 'penelope', 'age': 1 }
     */
    function memoize(func, resolver) {
      if (!isFunction(func)) {
        throw new TypeError;
      }
      var memoized = function() {
        var cache = memoized.cache,
            key = resolver ? resolver.apply(this, arguments) : keyPrefix + arguments[0];

        return hasOwnProperty.call(cache, key)
          ? cache[key]
          : (cache[key] = func.apply(this, arguments));
      }
      memoized.cache = {};
      return memoized;
    }

    /**
     * Creates a function that is restricted to execute `func` once. Repeat calls to
     * the function will return the value of the first call. The `func` is executed
     * with the `this` binding of the created function.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * var initialize = _.once(createApplication);
     * initialize();
     * initialize();
     * // `initialize` executes `createApplication` once
     */
    function once(func) {
      var ran,
          result;

      if (!isFunction(func)) {
        throw new TypeError;
      }
      return function() {
        if (ran) {
          return result;
        }
        ran = true;
        result = func.apply(this, arguments);

        // clear the `func` variable so the function may be garbage collected
        func = null;
        return result;
      };
    }

    /**
     * Creates a function that, when called, invokes `func` with any additional
     * `partial` arguments prepended to those provided to the new function. This
     * method is similar to `_.bind` except it does **not** alter the `this` binding.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to partially apply arguments to.
     * @param {...*} [arg] Arguments to be partially applied.
     * @returns {Function} Returns the new partially applied function.
     * @example
     *
     * var greet = function(greeting, name) { return greeting + ' ' + name; };
     * var hi = _.partial(greet, 'hi');
     * hi('fred');
     * // => 'hi fred'
     */
    function partial(func) {
      return createWrapper(func, 16, slice(arguments, 1));
    }

    /**
     * This method is like `_.partial` except that `partial` arguments are
     * appended to those provided to the new function.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to partially apply arguments to.
     * @param {...*} [arg] Arguments to be partially applied.
     * @returns {Function} Returns the new partially applied function.
     * @example
     *
     * var defaultsDeep = _.partialRight(_.merge, _.defaults);
     *
     * var options = {
     *   'variable': 'data',
     *   'imports': { 'jq': $ }
     * };
     *
     * defaultsDeep(options, _.templateSettings);
     *
     * options.variable
     * // => 'data'
     *
     * options.imports
     * // => { '_': _, 'jq': $ }
     */
    function partialRight(func) {
      return createWrapper(func, 32, null, slice(arguments, 1));
    }

    /**
     * Creates a function that, when executed, will only call the `func` function
     * at most once per every `wait` milliseconds. Provide an options object to
     * indicate that `func` should be invoked on the leading and/or trailing edge
     * of the `wait` timeout. Subsequent calls to the throttled function will
     * return the result of the last `func` call.
     *
     * Note: If `leading` and `trailing` options are `true` `func` will be called
     * on the trailing edge of the timeout only if the the throttled function is
     * invoked more than once during the `wait` timeout.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to throttle.
     * @param {number} wait The number of milliseconds to throttle executions to.
     * @param {Object} [options] The options object.
     * @param {boolean} [options.leading=true] Specify execution on the leading edge of the timeout.
     * @param {boolean} [options.trailing=true] Specify execution on the trailing edge of the timeout.
     * @returns {Function} Returns the new throttled function.
     * @example
     *
     * // avoid excessively updating the position while scrolling
     * var throttled = _.throttle(updatePosition, 100);
     * jQuery(window).on('scroll', throttled);
     *
     * // execute `renewToken` when the click event is fired, but not more than once every 5 minutes
     * jQuery('.interactive').on('click', _.throttle(renewToken, 300000, {
     *   'trailing': false
     * }));
     */
    function throttle(func, wait, options) {
      var leading = true,
          trailing = true;

      if (!isFunction(func)) {
        throw new TypeError;
      }
      if (options === false) {
        leading = false;
      } else if (isObject(options)) {
        leading = 'leading' in options ? options.leading : leading;
        trailing = 'trailing' in options ? options.trailing : trailing;
      }
      debounceOptions.leading = leading;
      debounceOptions.maxWait = wait;
      debounceOptions.trailing = trailing;

      return debounce(func, wait, debounceOptions);
    }

    /**
     * Creates a function that provides `value` to the wrapper function as its
     * first argument. Additional arguments provided to the function are appended
     * to those provided to the wrapper function. The wrapper is executed with
     * the `this` binding of the created function.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {*} value The value to wrap.
     * @param {Function} wrapper The wrapper function.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var p = _.wrap(_.escape, function(func, text) {
     *   return '<p>' + func(text) + '</p>';
     * });
     *
     * p('Fred, Wilma, & Pebbles');
     * // => '<p>Fred, Wilma, &amp; Pebbles</p>'
     */
    function wrap(value, wrapper) {
      return createWrapper(wrapper, 16, [value]);
    }

    /*--------------------------------------------------------------------------*/

    /**
     * Creates a function that returns `value`.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {*} value The value to return from the new function.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var object = { 'name': 'fred' };
     * var getter = _.constant(object);
     * getter() === object;
     * // => true
     */
    function constant(value) {
      return function() {
        return value;
      };
    }

    /**
     * Produces a callback bound to an optional `thisArg`. If `func` is a property
     * name the created callback will return the property value for a given element.
     * If `func` is an object the created callback will return `true` for elements
     * that contain the equivalent object properties, otherwise it will return `false`.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {*} [func=identity] The value to convert to a callback.
     * @param {*} [thisArg] The `this` binding of the created callback.
     * @param {number} [argCount] The number of arguments the callback accepts.
     * @returns {Function} Returns a callback function.
     * @example
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36 },
     *   { 'name': 'fred',   'age': 40 }
     * ];
     *
     * // wrap to create custom callback shorthands
     * _.createCallback = _.wrap(_.createCallback, function(func, callback, thisArg) {
     *   var match = /^(.+?)__([gl]t)(.+)$/.exec(callback);
     *   return !match ? func(callback, thisArg) : function(object) {
     *     return match[2] == 'gt' ? object[match[1]] > match[3] : object[match[1]] < match[3];
     *   };
     * });
     *
     * _.filter(characters, 'age__gt38');
     * // => [{ 'name': 'fred', 'age': 40 }]
     */
    function createCallback(func, thisArg, argCount) {
      var type = typeof func;
      if (func == null || type == 'function') {
        return baseCreateCallback(func, thisArg, argCount);
      }
      // handle "_.pluck" style callback shorthands
      if (type != 'object') {
        return property(func);
      }
      var props = keys(func),
          key = props[0],
          a = func[key];

      // handle "_.where" style callback shorthands
      if (props.length == 1 && a === a && !isObject(a)) {
        // fast path the common case of providing an object with a single
        // property containing a primitive value
        return function(object) {
          var b = object[key];
          return a === b && (a !== 0 || (1 / a == 1 / b));
        };
      }
      return function(object) {
        var length = props.length,
            result = false;

        while (length--) {
          if (!(result = baseIsEqual(object[props[length]], func[props[length]], null, true))) {
            break;
          }
        }
        return result;
      };
    }

    /**
     * Converts the characters `&`, `<`, `>`, `"`, and `'` in `string` to their
     * corresponding HTML entities.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {string} string The string to escape.
     * @returns {string} Returns the escaped string.
     * @example
     *
     * _.escape('Fred, Wilma, & Pebbles');
     * // => 'Fred, Wilma, &amp; Pebbles'
     */
    function escape(string) {
      return string == null ? '' : String(string).replace(reUnescapedHtml, escapeHtmlChar);
    }

    /**
     * This method returns the first argument provided to it.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {*} value Any value.
     * @returns {*} Returns `value`.
     * @example
     *
     * var object = { 'name': 'fred' };
     * _.identity(object) === object;
     * // => true
     */
    function identity(value) {
      return value;
    }

    /**
     * Adds function properties of a source object to the destination object.
     * If `object` is a function methods will be added to its prototype as well.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {Function|Object} [object=lodash] object The destination object.
     * @param {Object} source The object of functions to add.
     * @param {Object} [options] The options object.
     * @param {boolean} [options.chain=true] Specify whether the functions added are chainable.
     * @example
     *
     * function capitalize(string) {
     *   return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
     * }
     *
     * _.mixin({ 'capitalize': capitalize });
     * _.capitalize('fred');
     * // => 'Fred'
     *
     * _('fred').capitalize().value();
     * // => 'Fred'
     *
     * _.mixin({ 'capitalize': capitalize }, { 'chain': false });
     * _('fred').capitalize();
     * // => 'Fred'
     */
    function mixin(object, source, options) {
      var chain = true,
          methodNames = source && functions(source);

      if (!source || (!options && !methodNames.length)) {
        if (options == null) {
          options = source;
        }
        ctor = lodashWrapper;
        source = object;
        object = lodash;
        methodNames = functions(source);
      }
      if (options === false) {
        chain = false;
      } else if (isObject(options) && 'chain' in options) {
        chain = options.chain;
      }
      var ctor = object,
          isFunc = isFunction(ctor);

      forEach(methodNames, function(methodName) {
        var func = object[methodName] = source[methodName];
        if (isFunc) {
          ctor.prototype[methodName] = function() {
            var chainAll = this.__chain__,
                value = this.__wrapped__,
                args = [value];

            push.apply(args, arguments);
            var result = func.apply(object, args);
            if (chain || chainAll) {
              if (value === result && isObject(result)) {
                return this;
              }
              result = new ctor(result);
              result.__chain__ = chainAll;
            }
            return result;
          };
        }
      });
    }

    /**
     * Reverts the '_' variable to its previous value and returns a reference to
     * the `lodash` function.
     *
     * @static
     * @memberOf _
     * @category Utilities
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
     * A no-operation function.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @example
     *
     * var object = { 'name': 'fred' };
     * _.noop(object) === undefined;
     * // => true
     */
    function noop() {
      // no operation performed
    }

    /**
     * Gets the number of milliseconds that have elapsed since the Unix epoch
     * (1 January 1970 00:00:00 UTC).
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @example
     *
     * var stamp = _.now();
     * _.defer(function() { console.log(_.now() - stamp); });
     * // => logs the number of milliseconds it took for the deferred function to be called
     */
    var now = isNative(now = Date.now) && now || function() {
      return new Date().getTime();
    };

    /**
     * Converts the given value into an integer of the specified radix.
     * If `radix` is `undefined` or `0` a `radix` of `10` is used unless the
     * `value` is a hexadecimal, in which case a `radix` of `16` is used.
     *
     * Note: This method avoids differences in native ES3 and ES5 `parseInt`
     * implementations. See http://es5.github.io/#E.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {string} value The value to parse.
     * @param {number} [radix] The radix used to interpret the value to parse.
     * @returns {number} Returns the new integer value.
     * @example
     *
     * _.parseInt('08');
     * // => 8
     */
    var parseInt = nativeParseInt(whitespace + '08') == 8 ? nativeParseInt : function(value, radix) {
      // Firefox < 21 and Opera < 15 follow the ES3 specified implementation of `parseInt`
      return nativeParseInt(isString(value) ? value.replace(reLeadingSpacesAndZeros, '') : value, radix || 0);
    };

    /**
     * Creates a "_.pluck" style function, which returns the `key` value of a
     * given object.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {string} key The name of the property to retrieve.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var characters = [
     *   { 'name': 'fred',   'age': 40 },
     *   { 'name': 'barney', 'age': 36 }
     * ];
     *
     * var getName = _.property('name');
     *
     * _.map(characters, getName);
     * // => ['barney', 'fred']
     *
     * _.sortBy(characters, getName);
     * // => [{ 'name': 'barney', 'age': 36 }, { 'name': 'fred',   'age': 40 }]
     */
    function property(key) {
      return function(object) {
        return object[key];
      };
    }

    /**
     * Produces a random number between `min` and `max` (inclusive). If only one
     * argument is provided a number between `0` and the given number will be
     * returned. If `floating` is truey or either `min` or `max` are floats a
     * floating-point number will be returned instead of an integer.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {number} [min=0] The minimum possible value.
     * @param {number} [max=1] The maximum possible value.
     * @param {boolean} [floating=false] Specify returning a floating-point number.
     * @returns {number} Returns a random number.
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
      var noMin = min == null,
          noMax = max == null;

      if (floating == null) {
        if (typeof min == 'boolean' && noMax) {
          floating = min;
          min = 1;
        }
        else if (!noMax && typeof max == 'boolean') {
          floating = max;
          noMax = true;
        }
      }
      if (noMin && noMax) {
        max = 1;
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
        return nativeMin(min + (rand * (max - min + parseFloat('1e-' + ((rand +'').length - 1)))), max);
      }
      return baseRandom(min, max);
    }

    /**
     * Resolves the value of property `key` on `object`. If `key` is a function
     * it will be invoked with the `this` binding of `object` and its result returned,
     * else the property value is returned. If `object` is falsey then `undefined`
     * is returned.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {Object} object The object to inspect.
     * @param {string} key The name of the property to resolve.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = {
     *   'cheese': 'crumpets',
     *   'stuff': function() {
     *     return 'nonsense';
     *   }
     * };
     *
     * _.result(object, 'cheese');
     * // => 'crumpets'
     *
     * _.result(object, 'stuff');
     * // => 'nonsense'
     */
    function result(object, key) {
      if (object) {
        var value = object[key];
        return isFunction(value) ? object[key]() : value;
      }
    }

    /**
     * A micro-templating method that handles arbitrary delimiters, preserves
     * whitespace, and correctly escapes quotes within interpolated code.
     *
     * Note: In the development build, `_.template` utilizes sourceURLs for easier
     * debugging. See http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl
     *
     * For more information on precompiling templates see:
     * http://lodash.com/custom-builds
     *
     * For more information on Chrome extension sandboxes see:
     * http://developer.chrome.com/stable/extensions/sandboxingEval.html
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {string} text The template text.
     * @param {Object} data The data object used to populate the text.
     * @param {Object} [options] The options object.
     * @param {RegExp} [options.escape] The "escape" delimiter.
     * @param {RegExp} [options.evaluate] The "evaluate" delimiter.
     * @param {Object} [options.imports] An object to import into the template as local variables.
     * @param {RegExp} [options.interpolate] The "interpolate" delimiter.
     * @param {string} [sourceURL] The sourceURL of the template's compiled source.
     * @param {string} [variable] The data object variable name.
     * @returns {Function|string} Returns a compiled function when no `data` object
     *  is given, else it returns the interpolated text.
     * @example
     *
     * // using the "interpolate" delimiter to create a compiled template
     * var compiled = _.template('hello <%= name %>');
     * compiled({ 'name': 'fred' });
     * // => 'hello fred'
     *
     * // using the "escape" delimiter to escape HTML in data property values
     * _.template('<b><%- value %></b>', { 'value': '<script>' });
     * // => '<b>&lt;script&gt;</b>'
     *
     * // using the "evaluate" delimiter to generate HTML
     * var list = '<% _.forEach(people, function(name) { %><li><%- name %></li><% }); %>';
     * _.template(list, { 'people': ['fred', 'barney'] });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // using the ES6 delimiter as an alternative to the default "interpolate" delimiter
     * _.template('hello ${ name }', { 'name': 'pebbles' });
     * // => 'hello pebbles'
     *
     * // using the internal `print` function in "evaluate" delimiters
     * _.template('<% print("hello " + name); %>!', { 'name': 'barney' });
     * // => 'hello barney!'
     *
     * // using a custom template delimiters
     * _.templateSettings = {
     *   'interpolate': /{{([\s\S]+?)}}/g
     * };
     *
     * _.template('hello {{ name }}!', { 'name': 'mustache' });
     * // => 'hello mustache!'
     *
     * // using the `imports` option to import jQuery
     * var list = '<% jq.each(people, function(name) { %><li><%- name %></li><% }); %>';
     * _.template(list, { 'people': ['fred', 'barney'] }, { 'imports': { 'jq': jQuery } });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // using the `sourceURL` option to specify a custom sourceURL for the template
     * var compiled = _.template('hello <%= name %>', null, { 'sourceURL': '/basic/greeting.jst' });
     * compiled(data);
     * // => find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector
     *
     * // using the `variable` option to ensure a with-statement isn't used in the compiled template
     * var compiled = _.template('hi <%= data.name %>!', null, { 'variable': 'data' });
     * compiled.source;
     * // => function(data) {
     *   var __t, __p = '', __e = _.escape;
     *   __p += 'hi ' + ((__t = ( data.name )) == null ? '' : __t) + '!';
     *   return __p;
     * }
     *
     * // using the `source` property to inline compiled templates for meaningful
     * // line numbers in error messages and a stack trace
     * fs.writeFileSync(path.join(cwd, 'jst.js'), '\
     *   var JST = {\
     *     "main": ' + _.template(mainText).source + '\
     *   };\
     * ');
     */
    function template(text, data, options) {
      // based on John Resig's `tmpl` implementation
      // http://ejohn.org/blog/javascript-micro-templating/
      // and Laura Doktorova's doT.js
      // https://github.com/olado/doT
      var settings = lodash.templateSettings;
      text = String(text || '');

      // avoid missing dependencies when `iteratorTemplate` is not defined
      options = defaults({}, options, settings);

      var imports = defaults({}, options.imports, settings.imports),
          importsKeys = keys(imports),
          importsValues = values(imports);

      var isEvaluating,
          index = 0,
          interpolate = options.interpolate || reNoMatch,
          source = "__p += '";

      // compile the regexp to match each delimiter
      var reDelimiters = RegExp(
        (options.escape || reNoMatch).source + '|' +
        interpolate.source + '|' +
        (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
        (options.evaluate || reNoMatch).source + '|$'
      , 'g');

      text.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
        interpolateValue || (interpolateValue = esTemplateValue);

        // escape characters that cannot be included in string literals
        source += text.slice(index, offset).replace(reUnescapedString, escapeStringChar);

        // replace delimiters with snippets
        if (escapeValue) {
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

        // the JS engine embedded in Adobe products requires returning the `match`
        // string in order to produce the correct `offset` value
        return match;
      });

      source += "';\n";

      // if `variable` is not specified, wrap a with-statement around the generated
      // code to add the data object to the top of the scope chain
      var variable = options.variable,
          hasVariable = variable;

      if (!hasVariable) {
        variable = 'obj';
        source = 'with (' + variable + ') {\n' + source + '\n}\n';
      }
      // cleanup code by stripping empty strings
      source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
        .replace(reEmptyStringMiddle, '$1')
        .replace(reEmptyStringTrailing, '$1;');

      // frame code as the function body
      source = 'function(' + variable + ') {\n' +
        (hasVariable ? '' : variable + ' || (' + variable + ' = {});\n') +
        "var __t, __p = '', __e = _.escape" +
        (isEvaluating
          ? ', __j = Array.prototype.join;\n' +
            "function print() { __p += __j.call(arguments, '') }\n"
          : ';\n'
        ) +
        source +
        'return __p\n}';

      // Use a sourceURL for easier debugging.
      // http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl
      var sourceURL = '\n/*\n//# sourceURL=' + (options.sourceURL || '/lodash/template/source[' + (templateCounter++) + ']') + '\n*/';

      try {
        var result = Function(importsKeys, 'return ' + source + sourceURL).apply(undefined, importsValues);
      } catch(e) {
        e.source = source;
        throw e;
      }
      if (data) {
        return result(data);
      }
      // provide the compiled function's source by its `toString` method, in
      // supported environments, or the `source` property as a convenience for
      // inlining compiled templates during the build process
      result.source = source;
      return result;
    }

    /**
     * Executes the callback `n` times, returning an array of the results
     * of each callback execution. The callback is bound to `thisArg` and invoked
     * with one argument; (index).
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {number} n The number of times to execute the callback.
     * @param {Function} callback The function called per iteration.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns an array of the results of each `callback` execution.
     * @example
     *
     * var diceRolls = _.times(3, _.partial(_.random, 1, 6));
     * // => [3, 6, 4]
     *
     * _.times(3, function(n) { mage.castSpell(n); });
     * // => calls `mage.castSpell(n)` three times, passing `n` of `0`, `1`, and `2` respectively
     *
     * _.times(3, function(n) { this.cast(n); }, mage);
     * // => also calls `mage.castSpell(n)` three times
     */
    function times(n, callback, thisArg) {
      n = (n = +n) > -1 ? n : 0;
      var index = -1,
          result = Array(n);

      callback = baseCreateCallback(callback, thisArg, 1);
      while (++index < n) {
        result[index] = callback(index);
      }
      return result;
    }

    /**
     * The inverse of `_.escape` this method converts the HTML entities
     * `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#39;` in `string` to their
     * corresponding characters.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {string} string The string to unescape.
     * @returns {string} Returns the unescaped string.
     * @example
     *
     * _.unescape('Fred, Barney &amp; Pebbles');
     * // => 'Fred, Barney & Pebbles'
     */
    function unescape(string) {
      return string == null ? '' : String(string).replace(reEscapedHtml, unescapeHtmlChar);
    }

    /**
     * Generates a unique ID. If `prefix` is provided the ID will be appended to it.
     *
     * @static
     * @memberOf _
     * @category Utilities
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
      return String(prefix == null ? '' : prefix) + id;
    }

    /*--------------------------------------------------------------------------*/

    /**
     * Creates a `lodash` object that wraps the given value with explicit
     * method chaining enabled.
     *
     * @static
     * @memberOf _
     * @category Chaining
     * @param {*} value The value to wrap.
     * @returns {Object} Returns the wrapper object.
     * @example
     *
     * var characters = [
     *   { 'name': 'barney',  'age': 36 },
     *   { 'name': 'fred',    'age': 40 },
     *   { 'name': 'pebbles', 'age': 1 }
     * ];
     *
     * var youngest = _.chain(characters)
     *     .sortBy('age')
     *     .map(function(chr) { return chr.name + ' is ' + chr.age; })
     *     .first()
     *     .value();
     * // => 'pebbles is 1'
     */
    function chain(value) {
      value = new lodashWrapper(value);
      value.__chain__ = true;
      return value;
    }

    /**
     * Invokes `interceptor` with the `value` as the first argument and then
     * returns `value`. The purpose of this method is to "tap into" a method
     * chain in order to perform operations on intermediate results within
     * the chain.
     *
     * @static
     * @memberOf _
     * @category Chaining
     * @param {*} value The value to provide to `interceptor`.
     * @param {Function} interceptor The function to invoke.
     * @returns {*} Returns `value`.
     * @example
     *
     * _([1, 2, 3, 4])
     *  .tap(function(array) { array.pop(); })
     *  .reverse()
     *  .value();
     * // => [3, 2, 1]
     */
    function tap(value, interceptor) {
      interceptor(value);
      return value;
    }

    /**
     * Enables explicit method chaining on the wrapper object.
     *
     * @name chain
     * @memberOf _
     * @category Chaining
     * @returns {*} Returns the wrapper object.
     * @example
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36 },
     *   { 'name': 'fred',   'age': 40 }
     * ];
     *
     * // without explicit chaining
     * _(characters).first();
     * // => { 'name': 'barney', 'age': 36 }
     *
     * // with explicit chaining
     * _(characters).chain()
     *   .first()
     *   .pick('age')
     *   .value();
     * // => { 'age': 36 }
     */
    function wrapperChain() {
      this.__chain__ = true;
      return this;
    }

    /**
     * Produces the `toString` result of the wrapped value.
     *
     * @name toString
     * @memberOf _
     * @category Chaining
     * @returns {string} Returns the string result.
     * @example
     *
     * _([1, 2, 3]).toString();
     * // => '1,2,3'
     */
    function wrapperToString() {
      return String(this.__wrapped__);
    }

    /**
     * Extracts the wrapped value.
     *
     * @name valueOf
     * @memberOf _
     * @alias value
     * @category Chaining
     * @returns {*} Returns the wrapped value.
     * @example
     *
     * _([1, 2, 3]).valueOf();
     * // => [1, 2, 3]
     */
    function wrapperValueOf() {
      return this.__wrapped__;
    }

    /*--------------------------------------------------------------------------*/

    // add functions that return wrapped values when chaining
    lodash.after = after;
    lodash.assign = assign;
    lodash.at = at;
    lodash.bind = bind;
    lodash.bindAll = bindAll;
    lodash.bindKey = bindKey;
    lodash.chain = chain;
    lodash.compact = compact;
    lodash.compose = compose;
    lodash.constant = constant;
    lodash.countBy = countBy;
    lodash.create = create;
    lodash.createCallback = createCallback;
    lodash.curry = curry;
    lodash.debounce = debounce;
    lodash.defaults = defaults;
    lodash.defer = defer;
    lodash.delay = delay;
    lodash.difference = difference;
    lodash.filter = filter;
    lodash.flatten = flatten;
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
    lodash.map = map;
    lodash.mapValues = mapValues;
    lodash.max = max;
    lodash.memoize = memoize;
    lodash.merge = merge;
    lodash.min = min;
    lodash.omit = omit;
    lodash.once = once;
    lodash.pairs = pairs;
    lodash.partial = partial;
    lodash.partialRight = partialRight;
    lodash.pick = pick;
    lodash.pluck = pluck;
    lodash.property = property;
    lodash.pull = pull;
    lodash.range = range;
    lodash.reject = reject;
    lodash.remove = remove;
    lodash.rest = rest;
    lodash.shuffle = shuffle;
    lodash.sortBy = sortBy;
    lodash.tap = tap;
    lodash.throttle = throttle;
    lodash.times = times;
    lodash.toArray = toArray;
    lodash.transform = transform;
    lodash.union = union;
    lodash.uniq = uniq;
    lodash.values = values;
    lodash.where = where;
    lodash.without = without;
    lodash.wrap = wrap;
    lodash.xor = xor;
    lodash.zip = zip;
    lodash.zipObject = zipObject;

    // add aliases
    lodash.collect = map;
    lodash.drop = rest;
    lodash.each = forEach;
    lodash.eachRight = forEachRight;
    lodash.extend = assign;
    lodash.methods = functions;
    lodash.object = zipObject;
    lodash.select = filter;
    lodash.tail = rest;
    lodash.unique = uniq;
    lodash.unzip = zip;

    // add functions to `lodash.prototype`
    mixin(lodash);

    /*--------------------------------------------------------------------------*/

    // add functions that return unwrapped values when chaining
    lodash.clone = clone;
    lodash.cloneDeep = cloneDeep;
    lodash.contains = contains;
    lodash.escape = escape;
    lodash.every = every;
    lodash.find = find;
    lodash.findIndex = findIndex;
    lodash.findKey = findKey;
    lodash.findLast = findLast;
    lodash.findLastIndex = findLastIndex;
    lodash.findLastKey = findLastKey;
    lodash.has = has;
    lodash.identity = identity;
    lodash.indexOf = indexOf;
    lodash.isArguments = isArguments;
    lodash.isArray = isArray;
    lodash.isBoolean = isBoolean;
    lodash.isDate = isDate;
    lodash.isElement = isElement;
    lodash.isEmpty = isEmpty;
    lodash.isEqual = isEqual;
    lodash.isFinite = isFinite;
    lodash.isFunction = isFunction;
    lodash.isNaN = isNaN;
    lodash.isNull = isNull;
    lodash.isNumber = isNumber;
    lodash.isObject = isObject;
    lodash.isPlainObject = isPlainObject;
    lodash.isRegExp = isRegExp;
    lodash.isString = isString;
    lodash.isUndefined = isUndefined;
    lodash.lastIndexOf = lastIndexOf;
    lodash.mixin = mixin;
    lodash.noConflict = noConflict;
    lodash.noop = noop;
    lodash.now = now;
    lodash.parseInt = parseInt;
    lodash.random = random;
    lodash.reduce = reduce;
    lodash.reduceRight = reduceRight;
    lodash.result = result;
    lodash.runInContext = runInContext;
    lodash.size = size;
    lodash.some = some;
    lodash.sortedIndex = sortedIndex;
    lodash.template = template;
    lodash.unescape = unescape;
    lodash.uniqueId = uniqueId;

    // add aliases
    lodash.all = every;
    lodash.any = some;
    lodash.detect = find;
    lodash.findWhere = find;
    lodash.foldl = reduce;
    lodash.foldr = reduceRight;
    lodash.include = contains;
    lodash.inject = reduce;

    mixin(function() {
      var source = {}
      forOwn(lodash, function(func, methodName) {
        if (!lodash.prototype[methodName]) {
          source[methodName] = func;
        }
      });
      return source;
    }(), false);

    /*--------------------------------------------------------------------------*/

    // add functions capable of returning wrapped and unwrapped values when chaining
    lodash.first = first;
    lodash.last = last;
    lodash.sample = sample;

    // add aliases
    lodash.take = first;
    lodash.head = first;

    forOwn(lodash, function(func, methodName) {
      var callbackable = methodName !== 'sample';
      if (!lodash.prototype[methodName]) {
        lodash.prototype[methodName]= function(n, guard) {
          var chainAll = this.__chain__,
              result = func(this.__wrapped__, n, guard);

          return !chainAll && (n == null || (guard && !(callbackable && typeof n == 'function')))
            ? result
            : new lodashWrapper(result, chainAll);
        };
      }
    });

    /*--------------------------------------------------------------------------*/

    /**
     * The semantic version number.
     *
     * @static
     * @memberOf _
     * @type string
     */
    lodash.VERSION = '2.4.1';

    // add "Chaining" functions to the wrapper
    lodash.prototype.chain = wrapperChain;
    lodash.prototype.toString = wrapperToString;
    lodash.prototype.value = wrapperValueOf;
    lodash.prototype.valueOf = wrapperValueOf;

    // add `Array` functions that return unwrapped values
    forEach(['join', 'pop', 'shift'], function(methodName) {
      var func = arrayRef[methodName];
      lodash.prototype[methodName] = function() {
        var chainAll = this.__chain__,
            result = func.apply(this.__wrapped__, arguments);

        return chainAll
          ? new lodashWrapper(result, chainAll)
          : result;
      };
    });

    // add `Array` functions that return the existing wrapped value
    forEach(['push', 'reverse', 'sort', 'unshift'], function(methodName) {
      var func = arrayRef[methodName];
      lodash.prototype[methodName] = function() {
        func.apply(this.__wrapped__, arguments);
        return this;
      };
    });

    // add `Array` functions that return new wrapped values
    forEach(['concat', 'slice', 'splice'], function(methodName) {
      var func = arrayRef[methodName];
      lodash.prototype[methodName] = function() {
        return new lodashWrapper(func.apply(this.__wrapped__, arguments), this.__chain__);
      };
    });

    return lodash;
  }

  /*--------------------------------------------------------------------------*/

  // expose Lo-Dash
  var _ = runInContext();

  // some AMD build optimizers like r.js check for condition patterns like the following:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // Expose Lo-Dash to the global object even when an AMD loader is present in
    // case Lo-Dash is loaded with a RequireJS shim config.
    // See http://requirejs.org/docs/api.html#config-shim
    root._ = _;

    // define as an anonymous module so, through path mapping, it can be
    // referenced as the "underscore" module
    define(function() {
      return _;
    });
  }
  // check for `exports` after `define` in case a build optimizer adds an `exports` object
  else if (freeExports && freeModule) {
    // in Node.js or RingoJS
    if (moduleExports) {
      (freeModule.exports = _)._ = _;
    }
    // in Narwhal or Rhino -require
    else {
      freeExports._ = _;
    }
  }
  else {
    // in a browser or Rhino
    root._ = _;
  }
}.call(this));

},{}],2:[function(require,module,exports){
module.exports={
    "baseUrl": "https://online.moysklad.ru/exchange"
}
},{}],3:[function(require,module,exports){
/**
 * Rest /ms/xml client
 * Date: 11.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');

var clientProperties = require('./client-properties'),
    ObjectMapping = require('../object-mapping'),
    ObjectModel = require('../object-model'),
    Tools = require('tools'),
    logger = require('logger');

var callbackAdapter = Tools.callbackAdapter;


// rest/ms/xml
exports.createClient = function () {

    var me = {},
        errorMsg;

    var accessPoint = clientProperties.baseUrl + '/rest/ms/xml',
        defaultFetchOptions = {
            contentType: 'application/xml',
            headers: {}
        };

    var requestClient = require('../providers/default'),
        Jsonix = require('jsonix');

    var context = new Jsonix.Context([ObjectMapping]);

    var unmarshaller = context.createUnmarshaller(),
        marshaller = context.createMarshaller();


    var fetchCallbackHandler = function(err, result, callback) {

        if (_.isEmpty(err)) {
            logger.log('request.url - ' + result.request.url);
            logger.log('response.contentText.length - ' + result.response.contentText.length);
            if (result.response.responseCode !== 200) {
                logger.log('Ответ сервера: ' + result.response.contentText);
                errorMsg = 'Код ответа сервера ' + result.response.responseCode + ' не корректен. Длина ответа - ' +
                    result.response.contentText.length;
                return callbackAdapter(err, result, callback);
            }

            if (result.response.contentText) {
                logger.time('[Client] Response unmarshalling');
                var data = unmarshaller.unmarshalString(result.response.contentText);
                logger.timeEnd('[Client] Response unmarshalling');
            } else {
                errorMsg = 'Пустой ответ сервера';
                return callbackAdapter(new Error(errorMsg), result, callback);
            }

            result.type = data.name.localPart;

            //TODO Разобраться где и какие ошибки могут возникать
            //TODO Этот if не сработает т.к. выше идет фильтрация по коду 200
            if (result.type == 'error') throw new Error(data.value.message);

            logger.time('[Client] ObjectModel constructors');
            if (result.type == 'collection') {
                result.obj = new ObjectModel.collection({
                    total : data.value.total,
                    start : data.value.start,
                    count : data.value.count,
                    items : _.map(data.value.items, function(item) {
                        return new ObjectModel[item.name.localPart](item.value);
                    })
                });
            } else {
                result.obj = new ObjectModel[data.name.localPart](data.value);
            }
            logger.timeEnd('[Client] ObjectModel constructors');

        }

        return callbackAdapter(err, result, callback);
    };


    me.basicAuth = function (login, password) {
        this.auth = {
            login: login,
            password: password
        };
        defaultFetchOptions.headers.Authorization = Tools.getBasicAuthHttpHeader(this.auth.login, this.auth.password);
    };


    //
    /**
     * GET /{type}/{id} | GET /{type}/list
     * @param {Object} type
     * @param {Object} params
     * @param {string} callback
     */
    me.get = function(type, params, callback){
        //TODO Проверять параметры на корректность
        var obj = new type();
        var path = '/';
        if(params.uuid) {
            // GET /{type}/{id}
            path += obj.objectType + '/' + params.uuid;
            if(params.fileContent) path += '/?fileContent=true';
        } else {
            // GET /{type}/list
            path += obj.objectType + '/list';
            //if (!params.count) params.count = 100; // limit by default count
            if (_.size(params) > 0) {
                path += '/?' + _.map(params, function (value, key) {
                    return key + '=' + encodeURIComponent(value);
                }).join('&');
            }
        }

        return requestClient.fetch(_.extend({}, defaultFetchOptions, {
            method: 'GET',
            url: accessPoint + path
        }), function (err, result) {
            fetchCallbackHandler(err, result, callback);
        });
    };


    me.put = function(obj, callback){
        var items,
            path = '/',
            xmlString,
            putObj;
        if(obj.className == 'collection') items = obj.items;
        if(obj instanceof Array) items = obj;
        if (items) {
            // PUT /{type}/list/update
            path += items[0].objectType + '/list/update';
            // place objects in collection
            putObj = new ObjectModel.collection({
                items : _.map(items, function (item) {
                    return {
                        name: new Jsonix.XML.QName(item.className),
                        value: item
                    };
                })
            });
        } else {
            // PUT /{type}
            path += obj.objectType;
            putObj = obj;
        }
        xmlString = marshaller.marshalString({
            name: {localPart: putObj.className},
            value: putObj
        });

        return requestClient.fetch(_.extend({}, defaultFetchOptions, {
            method: 'PUT',
            url: accessPoint + path,
            payload: xmlString
        }), function (err, result) {
            fetchCallbackHandler(err, result, callback);
        });
    };


    // DELETE /{type}/{id}
    me.del = function(type, id, callback){
        var path = '/' + type + '/' + id;

        return requestClient.fetch(_.extend({}, defaultFetchOptions, {
            method: 'DELETE',
            url: accessPoint + path
        }), function (err, result) {
            fetchCallbackHandler(err, result, callback);
        });
    };


    // POST /{type}/list/delete
    me.deleteList = function(type, objList, callback){
        //TODO Не реализовано
        throw 'Не реализовано';
    };

    return me;
};
},{"../object-mapping":7,"../object-model":8,"../providers/default":9,"./client-properties":2,"jsonix":"ly8u51","lodash":1,"logger":"Hbkh7e","tools":"18E3ac"}],4:[function(require,module,exports){
/**
 * Rest /mutualSettlement/xml client
 * Date: 11.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

exports.createClient = function () {
    var me = {};
    var baseUrl = 'https://online.moysklad.ru/exchange/rest/slot/json';
    var baseOptions = {
        contentType: 'application/json',
        headers: {}
    };
    var baseClient = Moysklad.Providers.getDefaultHttpRequestClient();

    var fetchCallbackHandler = function(result, callback){
        if(_.isEmpty(result.error)){
            result.type = 'slotStateReportTO';
            result.obj = JSON.parse(result.response.contentText);
        } else {
            throw new Error(result.error);
        }
        if(callback) callback(result);
        else return result;
    };

    me.basicAuth = function (login, password) {
        this.auth = {
            login: login,
            password: password
        };
        baseOptions.headers.Authorization = Tools.getBasicAuthHttpHeader(this.auth.login, this.auth.password);
    };

    me.getSlotStateReport = function(param, callback) {
        //storeId, goodIdList;
        //TODO Проверить param на корректность
        var path = '/?storeId=' + param.storeId;
        if (param.goodIdList && param.goodIdList.length > 0) {
            if (param.goodIdList.length > 50) throw new Error('Не реализовано получение остатков по списку goodIdList более 50');
            path += '&' + _.map(param.goodIdList, function (value) {
                return 'goodId=' + encodeURIComponent(value);
            }).join('&');
        }
        var resultList;
        baseOptions.method = 'GET';
        baseClient.fetch(baseUrl + path, baseOptions,
            function (result) {
                if (callback) {
                    fetchCallbackHandler(result, callback);
                } else {
                    resultList = fetchCallbackHandler(result);
                }
            }
        );
        if (!callback) return resultList;
    };

    return me;
};
},{}],5:[function(require,module,exports){
/**
 * Moysklad.Context
 * Date: 11.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var ObjectModel = require('./object-model'),
    _ = require('lodash');

var logger = require('logger');

//var Logger = new (require('../adapters/logger').GSLogger)('Client');

// Client
module.exports = function() {
    var contextUser = null;
    var contextPassword = null;
    if(arguments.length == 2 && typeof(arguments[0]) == 'string') {
        contextUser = arguments[0];
        contextPassword = arguments[1];
    } else if (arguments.length == 0) {
        //TODO: Убрать привязку к Google Script (сделано для удобства). Возможно реализовать через что-либо вроде плагина
        contextUser = UserProperties.getProperty("Moysklad.Login");
        contextPassword = UserProperties.getProperty("Moysklad.Password");
    }

    var fluentContext = function() {
        var _type = arguments[0];
        if(!(_type && _.any(ObjectModel, function(item) {return item === _type;}))) throw new Error('Context(): Не корректно указан тип контекста');

        var _client = require('./clients/rest.ms.xml').createClient();
        var _params = {};
        var _filter = [];
        //var _auth = {};

        function auth(user, password) {
            //_auth.user = user;
            //_auth.password = password;
            _client.basicAuth(user, password);
            return pub;
        }

        function filter() {
            //TODO Проверять, что параметры фильтра в комплексе адекватны
            //TODO Переделать способ передачи параметров {id:['ssdfsd','sfsdfsdf'], 'updated>':date, ...}
            //TODO Последовательность звеньев filter добавляет одноименные элементы к фильтру, а если надо заменить?
            //TODO Проверить на существование фильтруемого св-ва в объекте контекста (иначе сервер не вернет ответ)
            if(arguments.length > 1) {
                // name, value
                //TODO Реализовать обработку оператора сравнения
                var tmp = {};
                tmp[arguments[0]] = arguments[1];
                _filter.push(tmp);
            } else if (arguments.length == 1 && arguments[0] instanceof Array) {
                // [{name:value}]
                _filter = _filter.concat(arguments[0]);
            } else if (arguments.length == 0) {
                return _filter;
            } else {
                throw new Error('filter: несоответствующие входящие параметры');
            }
            return pub;
        }

        // *** selectors ***

        function start() {
            if(arguments.length == 1 && typeof(arguments[0]) == 'number') {
                _params['start'] = arguments[0];
            } else if (arguments.length == 0) {
                return _params['start'] || 0;
            } else {
                throw new Error('start: несоответствующие входящие параметры');
            }
            return pub;
        }

        function count() {
            if(arguments.length == 1 && typeof(arguments[0]) == 'number') {
                _params['count'] = arguments[0];
            } else if (arguments.length == 0) {
                return _params['count'] || Infinity;
            } else {
                throw new Error('count: несоответствующие входящие параметры');
            }
            return pub;
        }

        function sort() {
            if(arguments.length == 1 && typeof(arguments[0]) == 'string') {
                _params['sort'] = arguments[0];
            } else if (arguments.length == 2) {
                _params['sort'] = arguments[0];
                _params['sortMode'] = arguments[1];
            } else if (arguments.length == 1 && typeof(arguments[0]) == 'object') {
                _params['sort'] = arguments[0]['by'];
                if (arguments[1]) _params['sortMode'] = arguments[0]['sortMode'];
            } else if (arguments.length == 0) {
                return _params['sort'];
            } else {
                throw new Error('sort: несоответствующие входящие параметры');
            }
            return pub;
        }

        function sortMode() {
            if(arguments.length == 1 && typeof(arguments[0]) == 'string') {
                _params['sortMode'] = arguments[0];
            } else if (arguments.length == 0) {
                return _params['sortMode'];
            } else {
                throw new Error('sortMode: несоответствующие входящие параметры');
            }
            return pub;
        }

        function showArchived() {
            if(arguments.length == 1 && typeof(arguments[0]) == 'boolean') {
                _params['showArchived'] = arguments[0];
            } else if (arguments.length == 0) {
                return _params['showArchived'];
            } else {
                throw new Error('showArchived: несоответствующие входящие параметры');
            }
            return pub;
        }

        function fileContent() {
            if(arguments.length == 1 && typeof(arguments[0]) == 'boolean') {
                _params['fileContent'] = arguments[0];
            } else if (arguments.length == 0) {
                return _params['fileContent'];
            } else {
                throw new Error('fileContent: несоответствующие входящие параметры');
            }
            return pub;
        }

        function uuid() {
            //TODO Хорошо бы контролировать что кол-во в выдаче соотв. кол-ву uuid (напр. с archived)
            if(arguments.length == 1 && typeof(arguments[0]) == 'string') {
                // uuid
                if(arguments[0].length != 36) throw new Error('uuid: не корректный идентификатор - ' + arguments[0]);
                _params['uuid'] = arguments[0];
            } else if (arguments.length == 1 && arguments[0] instanceof Array) {
                // uuid Array
                _.each(arguments[0], function(item) {
                    if(item.length != 36) throw new Error('uuid: не корректный идентификатор - ' + item);
                    _filter.push({ 'uuid' : arguments[0] });
                });
            } else if (arguments.length == 0) {
                return _params['uuid'];
            } else {
                throw new Error('uuid: несоответствующие входящие параметры');
            }
            return pub;
        }

        function code() {
            throw new Error('code: не реализовано');
        }

        //TODO Почему-то не работает - http://monosnap.com/image/WzFxuGI4C9qh63BYRIIOm8ul1.png (может ошибка)
        function split() {
            if(_params.uuid) return pub;

            if(arguments.length > 0 && typeof(arguments[0]) == 'number') {
                var _splitStep = arguments[0];

                var _splitCallback;
                if(arguments.length > 1 && typeof(arguments[1]) == 'function') _splitCallback = arguments[1];

                var _maxPosition, _contextStart, _contextCount, _loadCallback;

                var _loadResult;
                var callbackUndefinedHandler = function(result) {
                    _loadResult = result;
                };

                var _resultCollection = new ObjectModel.Collection({ start: start(), count: count(), total: Infinity, items: [] });

                var loadHandler = function (err, collection) {
                    _resultCollection.items = _resultCollection.items.concat(collection.items);
                    if(_splitCallback) _splitCallback(collection);
                    start(collection.start + _splitStep);
                    if(start() < collection.total && start() < _maxPosition) {
                        var remain = _maxPosition - start();
                        if(count() > remain) count(remain);
                        load(loadHandler);
                    } else {
                        _resultCollection.start = _contextStart;
                        start(_contextStart);
                        _resultCollection.count = _contextCount;
                        count(_contextCount);
                        _resultCollection.total = collection.total;
                        _loadCallback(_resultCollection);
                    }
                };

                pub.load = function (loadCallback) {
                    //TODO Надо точно понять как в контексте распознается load, this.load, pub.load
                    _loadCallback = loadCallback || callbackUndefinedHandler;
                    _contextStart = start();
                    _contextCount = count();
                    _maxPosition = start() + count();
                    count(_splitStep);
                    load(loadHandler);
                    logger.log(' - ' + _loadResult.items.length);
                    if (!loadCallback) return _loadResult;
                };
                return pub;

            } else {
                throw new Error('split: несоответствующие входящие параметры');
            }
        }

        function load() {
            var filterItems = [];
            _.each(_filter, function(filterItem) {
                var operator = '='; // default operator
                var keys = _.keys(filterItem);
                var filterName;
                if (filterItem['operator']) {
                    // if operator - { id: '...', operator: '>' }
                    operator = filterItem['operator'];
                    filterName = _.first(_.reject(keys, function(keyItem) {  //TODO Как сделать проще?
                        return keyItem == 'operator';
                    }));
                } else {
                    // without operator - { id: '...' }
                    filterName = keys[0];
                }
                var filterValue = filterItem[filterName];
                if (filterValue instanceof Date) {
                    filterValue = moment(filterValue)
                        .add('minute', filterValue.getTimezoneOffset() + 240)
                        .format('YYYYMMDDHHmmss');
                }
                filterItems.push(filterName + operator + filterValue);
            }); // ? {'items': filterItems}

            if(filterItems.length > 0) _params.filter = filterItems.join(';');
            if(arguments.length == 1 && typeof(arguments[0]) == 'function') {
                // callback
                var loadCallback = arguments[0];
                _client.get(_type, _params, function (err, result) {
                    loadCallback(err, result.obj); //callback
                });
            } else {
                // w/o callback
                var result = _client.get(_type, _params);
                return result.obj;
            }
        }

        function first() {
            count(1);
            if(arguments.length == 1 && typeof(arguments[0]) == 'function') {
                //TODO Не реализован callback
                throw new Error('callback в first() не реализован');
            }
            var result = pub.load();
            if (result) {
                if(result.className == 'collection') {
                    if (result.items) return result.items[0];
                    else return null;
                } else {
                    return result;
                }
            }
            return null;
        }

        function total() {
            //TODO Callback
            var total = 0,
                tmpStart = this.start(),
                tmpCount = this.count();
            this.start(0).count(0);
            total = load().total;
            return total;
        }

        var pub = {
            'auth' : auth,
            'filter' : filter,
            'start' : start,
            'count' : count,
            'sort' : sort,
            'sortBy' : sort,
            'sortMode' : sortMode,
            'fileContent' : fileContent,
            //TODO 'includeDeleted': ,
            'showArchived': showArchived,
            'includeArchive': showArchived,
            'uuid' : uuid,
            'code': code,
            'load' : load,
            'first' : first,
            'total': total,
            'split': split
        };

        if(contextUser) auth(contextUser, contextPassword);
        return pub;
    };

    //TODO Временно (нужно переделать архитекнутуру контекста)
    fluentContext.from = function (className) {
        return this(ObjectModel[className]);
    };

    //TODO Сохранение массива и collection?
    fluentContext.save = function(obj, callback) {
        var client = require('./clients/rest.ms.xml').createClient();
        if(contextUser) client.basicAuth(contextUser, contextPassword);

        if (callback) {
            client.put(obj, function(err, result) {
                callback(err, result.obj);
            });
        } else {
            var result = client.put(obj);
            return result.obj;
        }
    };

    fluentContext.stock = {};
    fluentContext.stock.getSlotStateReport = function(param, callback) {
        var client = require('./clients/rest.slot.json').createClient();
        if(contextUser) client.basicAuth(contextUser, contextPassword);

        if (callback) {
            client.getSlotStateReport(param, callback);
        } else {
            var slotStateReport = client.getSlotStateReport(param);
            return slotStateReport.obj;
        }
    };

    return fluentContext;
};
},{"./clients/rest.ms.xml":3,"./clients/rest.slot.json":4,"./object-model":8,"lodash":1,"logger":"Hbkh7e"}],6:[function(require,module,exports){
/**
 * MoyskladClient
 * Date: 11.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

module.exports = {
    ObjectModel:    require('./object-model'),
    ObjectMapping:  require('./object-mapping'),
    Client:         require('./context')
};
},{"./context":5,"./object-mapping":7,"./object-model":8}],7:[function(require,module,exports){
/**
 * Moysklad.ObjectMapping
 * Date: 11.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var Jsonix = require('jsonix');

var Map = {},
    Model = Jsonix.Model,
    XSD = Jsonix.Schema.XSD,
    XML = Jsonix.XML;


/*********
 Objects
 ***********/

// abstractBarcode : entity
Map.AbstractBarcode = new Model.ClassInfo({
    name:'AbstractBarcode'
});

// abstractCashIn : financeIn
Map.AbstractCashIn = new Model.ClassInfo({
    name:'AbstractCashIn'
});

// abstractCashOut : financeOut
Map.AbstractCashOut = new Model.ClassInfo({
    name:'AbstractCashOut'
});

// abstractConnectorSetting : legendEntity
Map.AbstractConnectorSetting = new Model.ClassInfo({
    name:'AbstractConnectorSetting'
});

// abstractDemand : comingOutOperation
Map.AbstractDemand = new Model.ClassInfo({
    name:'AbstractDemand'
});

// abstractGood : goodFolder
Map.AbstractGood = new Model.ClassInfo({
    name:'AbstractGood'
});

// abstractSalesReturn : comingInOperation
Map.AbstractSalesReturn = new Model.ClassInfo({
    name:'AbstractSalesReturn'
});

// abstractShipmentOut : comingOut
Map.AbstractShipmentOut = new Model.ClassInfo({
    name:'AbstractShipmentOut'
});

// accountEntity : object
Map.AccountEntity = new Model.ClassInfo({
    name:'AccountEntity'
});

// agent : legendEntity
Map.Agent = new Model.ClassInfo({
    name:'Agent'
});

// agentAttributeValue : attributeValue
Map.AgentAttributeValue = new Model.ClassInfo({
    name:'AgentAttributeValue'
});

// agentNewsItem : infoEntity
Map.AgentNewsItem = new Model.ClassInfo({
    name:'AgentNewsItem'
});

// agentPictureDocument : document
Map.AgentPictureDocument = new Model.ClassInfo({
    name:'AgentPictureDocument'
});

// amiroConnectorSettings : operationConnectorSetting
Map.AmiroConnectorSettings = new Model.ClassInfo({
    name:'AmiroConnectorSettings'
});

// amiroCustomAttributeInfo : entity
Map.AmiroCustomAttributeInfo = new Model.ClassInfo({
    name:'AmiroCustomAttributeInfo'
});

// attachedDocument : document
Map.AttachedDocument = new Model.ClassInfo({
    name:'AttachedDocument'
});

// attachmentDocument : document
Map.AttachmentDocument = new Model.ClassInfo({
    name:'AttachmentDocument'
});

// attributeMetadata : legendEntity
Map.AttributeMetadata = new Model.ClassInfo({
    name:'AttributeMetadata'
});

// attributeValue : infoEntity
Map.AttributeValue = new Model.ClassInfo({
    name:'AttributeValue'
});

// bankAccount : object
Map.BankAccount = new Model.ClassInfo({
    name:'BankAccount'
});

// barcode : abstractBarcode
Map.Barcode = new Model.ClassInfo({
    name:'Barcode'
});

// cashIn : abstractCashIn
Map.CashIn = new Model.ClassInfo({
    name:'CashIn'
});

// cashOut : abstractCashOut
Map.CashOut = new Model.ClassInfo({
    name:'CashOut'
});

// classifier : legendEntity
Map.Classifier = new Model.ClassInfo({
    name:'Classifier'
});

// cmlConnectorSettings : operationConnectorSetting
Map.CmlConnectorSettings = new Model.ClassInfo({
    name:'CmlConnectorSettings'
});

// collection : object
Map.Collection = new Model.ClassInfo({
    name:'Collection'
});

// collectionContainer : object
Map.CollectionContainer = new Model.ClassInfo({
    name:'CollectionContainer'
});

// comingIn : stockMotion
Map.ComingIn = new Model.ClassInfo({
    name:'ComingIn'
});

// comingInOperation : stockOperation
Map.ComingInOperation = new Model.ClassInfo({
    name:'ComingInOperation'
});

// comingOut : stockMotion
Map.ComingOut = new Model.ClassInfo({
    name:'ComingOut'
});

// comingOutOperation : stockOperation
Map.ComingOutOperation = new Model.ClassInfo({
    name:'ComingOutOperation'
});

// company : agent
Map.Company = new Model.ClassInfo({
    name:'Company'
});

// consignment : legendEntity
Map.Consignment = new Model.ClassInfo({
    name:'Consignment'
});

// consignmentAttributeValue : attributeValue
Map.ConsignmentAttributeValue = new Model.ClassInfo({
    name:'ConsignmentAttributeValue'
});

// consignmentBarcode : abstractBarcode
Map.ConsignmentBarcode = new Model.ClassInfo({
    name:'ConsignmentBarcode'
});

// contact : object
Map.Contact = new Model.ClassInfo({
    name:'Contact'
});

// contactPerson : legendEntity
Map.ContactPerson = new Model.ClassInfo({
    name:'ContactPerson'
});

// contract : legendEntity
Map.Contract = new Model.ClassInfo({
    name:'Contract'
});

// contractAttributeValue : attributeValue
Map.ContractAttributeValue = new Model.ClassInfo({
    name:'ContractAttributeValue'
});

// contractDocument : attachedDocument
Map.ContractDocument = new Model.ClassInfo({
    name:'ContractDocument'
});

// country : predefinedLegendableEntity
Map.Country = new Model.ClassInfo({
    name:'Country'
});

// currency : legendEntity
Map.Currency = new Model.ClassInfo({
    name:'Currency'
});

// customEntity : legendEntity
Map.CustomEntity = new Model.ClassInfo({
    name:'CustomEntity'
});

// customEntityAttributeValue : attributeValue
Map.CustomEntityAttributeValue = new Model.ClassInfo({
    name:'CustomEntityAttributeValue'
});

// customEntityMetadata : entityMetadata
Map.CustomEntityMetadata = new Model.ClassInfo({
    name:'CustomEntityMetadata'
});

// customerOrder : order
Map.CustomerOrder = new Model.ClassInfo({
    name:'CustomerOrder'
});

// customerOrderPosition : orderPosition
Map.CustomerOrderPosition = new Model.ClassInfo({
    name:'CustomerOrderPosition'
});

// demand : abstractDemand
Map.Demand = new Model.ClassInfo({
    name:'Demand'
});

// demandExtension : operationExtension
Map.DemandExtension = new Model.ClassInfo({
    name:'DemandExtension'
});

// document : legendEntity
Map.Document = new Model.ClassInfo({
    name:'Document'
});

// documentMiniature : document
Map.DocumentMiniature = new Model.ClassInfo({
    name:'DocumentMiniature'
});

// embeddedEntityMetadata : entityMetadata
Map.EmbeddedEntityMetadata = new Model.ClassInfo({
    name:'EmbeddedEntityMetadata'
});

// employee : legendEntity
Map.Employee = new Model.ClassInfo({
    name:'Employee'
});

// employeeAttributeValue : attributeValue
Map.EmployeeAttributeValue = new Model.ClassInfo({
    name:'EmployeeAttributeValue'
});

// enter : comingInOperation
Map.Enter = new Model.ClassInfo({
    name:'Enter'
});

// enterPosition : comingIn
Map.EnterPosition = new Model.ClassInfo({
    name:'EnterPosition'
});

// entity : accountEntity
Map.Entity = new Model.ClassInfo({
    name:'Entity'
});

// entityMetadata : legendEntity
Map.EntityMetadata = new Model.ClassInfo({
    name:'EntityMetadata'
});

// entityTemplatesMetadata : templatesMetadata
Map.EntityTemplatesMetadata = new Model.ClassInfo({
    name:'EntityTemplatesMetadata'
});

// error : object
Map.Error = new Model.ClassInfo({
    name:'Error'
});

// exchangeContainer : object
Map.ExchangeContainer = new Model.ClassInfo({
    name:'ExchangeContainer'
});

// facture : operationWithPositions
Map.Facture = new Model.ClassInfo({
    name:'Facture'
});

// factureIn : facture
Map.FactureIn = new Model.ClassInfo({
    name:'FactureIn'
});

// factureOut : facture
Map.FactureOut = new Model.ClassInfo({
    name:'FactureOut'
});

// factureOutExtension : operationExtension
Map.FactureOutExtension = new Model.ClassInfo({
    name:'FactureOutExtension'
});

// feature : infoEntity
Map.Feature = new Model.ClassInfo({
    name:'Feature'
});

// featureAttributeValue : attributeValue
Map.FeatureAttributeValue = new Model.ClassInfo({
    name:'FeatureAttributeValue'
});

// finance : operation
Map.Finance = new Model.ClassInfo({
    name:'Finance'
});

// financeIn : finance
Map.FinanceIn = new Model.ClassInfo({
    name:'FinanceIn'
});

// financeOut : finance
Map.FinanceOut = new Model.ClassInfo({
    name:'FinanceOut'
});

// good : abstractGood
Map.Good = new Model.ClassInfo({
    name:'Good'
});

// goodAttributeValue : attributeValue
Map.GoodAttributeValue = new Model.ClassInfo({
    name:'GoodAttributeValue'
});

// goodFolder : classifier
Map.GoodFolder = new Model.ClassInfo({
    name:'GoodFolder'
});

// goodPack : entity
Map.GoodPack = new Model.ClassInfo({
    name:'GoodPack'
});

// goodPrices : object
Map.GoodPrices = new Model.ClassInfo({
    name:'GoodPrices'
});

// goodSlotPreference : entity
Map.GoodSlotPreference = new Model.ClassInfo({
    name:'GoodSlotPreference'
});

// gtd : legendEntity
Map.Gtd = new Model.ClassInfo({
    name:'Gtd'
});

// infoEntity : entity
Map.InfoEntity = new Model.ClassInfo({
    name:'InfoEntity'
});

// internalOrder : order
Map.InternalOrder = new Model.ClassInfo({
    name:'InternalOrder'
});

// inventory : operationWithPositions
Map.Inventory = new Model.ClassInfo({
    name:'Inventory'
});

// inventoryPosition : motion
Map.InventoryPosition = new Model.ClassInfo({
    name:'InventoryPosition'
});

// invoice : operationWithPositions
Map.Invoice = new Model.ClassInfo({
    name:'Invoice'
});

// invoiceIn : invoice
Map.InvoiceIn = new Model.ClassInfo({
    name:'InvoiceIn'
});

// invoiceOut : invoice
Map.InvoiceOut = new Model.ClassInfo({
    name:'InvoiceOut'
});

// invoicePosition : motion
Map.InvoicePosition = new Model.ClassInfo({
    name:'InvoicePosition'
});

// legendEntity : infoEntity
Map.LegendEntity = new Model.ClassInfo({
    name:'LegendEntity'
});

// loss : comingOutOperation
Map.Loss = new Model.ClassInfo({
    name:'Loss'
});

// lossPosition : comingOut
Map.LossPosition = new Model.ClassInfo({
    name:'LossPosition'
});

// material : processingPlanItem
Map.Material = new Model.ClassInfo({
    name:'Material'
});

// moneyAmount : object
Map.MoneyAmount = new Model.ClassInfo({
    name:'MoneyAmount'
});

// motion : entity
Map.Motion = new Model.ClassInfo({
    name:'Motion'
});

// move : stockOperation
Map.Move = new Model.ClassInfo({
    name:'Move'
});

// movePosition : stockMotion
Map.MovePosition = new Model.ClassInfo({
    name:'MovePosition'
});

// myCompany : company
Map.MyCompany = new Model.ClassInfo({
    name:'MyCompany'
});

// operation : legendEntity
Map.Operation = new Model.ClassInfo({
    name:'Operation'
});

// operationAttributeValue : attributeValue
Map.OperationAttributeValue = new Model.ClassInfo({
    name:'OperationAttributeValue'
});

// operationConnectorSetting : abstractConnectorSetting
Map.OperationConnectorSetting = new Model.ClassInfo({
    name:'OperationConnectorSetting'
});

// operationDocument : attachedDocument
Map.OperationDocument = new Model.ClassInfo({
    name:'OperationDocument'
});

// operationExtension : object
Map.OperationExtension = new Model.ClassInfo({
    name:'OperationExtension'
});

// operationWithPositions : operation
Map.OperationWithPositions = new Model.ClassInfo({
    name:'OperationWithPositions'
});

// order : operationWithPositions
Map.Order = new Model.ClassInfo({
    name:'Order'
});

// orderPosition : motion
Map.OrderPosition = new Model.ClassInfo({
    name:'OrderPosition'
});

// paymentIn : financeIn
Map.PaymentIn = new Model.ClassInfo({
    name:'PaymentIn'
});

// paymentOut : financeOut
Map.PaymentOut = new Model.ClassInfo({
    name:'PaymentOut'
});

// place : classifier
Map.Place = new Model.ClassInfo({
    name:'Place'
});

// placeAttributeValue : attributeValue
Map.PlaceAttributeValue = new Model.ClassInfo({
    name:'PlaceAttributeValue'
});

// predefinedLegendableEntity : legendEntity
Map.PredefinedLegendableEntity = new Model.ClassInfo({
    name:'PredefinedLegendableEntity'
});

// price : entity
Map.Price = new Model.ClassInfo({
    name:'Price'
});

// priceList : operationWithPositions
Map.PriceList = new Model.ClassInfo({
    name:'PriceList'
});

// priceListCell : entity
Map.PriceListCell = new Model.ClassInfo({
    name:'PriceListCell'
});

// priceListCellArray : object
Map.PriceListCellArray = new Model.ClassInfo({
    name:'PriceListCellArray'
});

// priceListMetadata : legendEntity
Map.PriceListMetadata = new Model.ClassInfo({
    name:'PriceListMetadata'
});

// priceListMetadataColumn : legendEntity
Map.PriceListMetadataColumn = new Model.ClassInfo({
    name:'PriceListMetadataColumn'
});

// priceListRow : motion
Map.PriceListRow = new Model.ClassInfo({
    name:'PriceListRow'
});

// priceType : infoEntity
Map.PriceType = new Model.ClassInfo({
    name:'PriceType'
});

// processing : stockOperation
Map.Processing = new Model.ClassInfo({
    name:'Processing'
});

// processingOrder : order
Map.ProcessingOrder = new Model.ClassInfo({
    name:'ProcessingOrder'
});

// processingPlan : processingPlanFolder
Map.ProcessingPlan = new Model.ClassInfo({
    name:'ProcessingPlan'
});

// processingPlanFolder : classifier
Map.ProcessingPlanFolder = new Model.ClassInfo({
    name:'ProcessingPlanFolder'
});

// processingPlanItem : entity
Map.ProcessingPlanItem = new Model.ClassInfo({
    name:'ProcessingPlanItem'
});

// processingPositionMaterial : comingOut
Map.ProcessingPositionMaterial = new Model.ClassInfo({
    name:'ProcessingPositionMaterial'
});

// processingPositionResult : comingIn
Map.ProcessingPositionResult = new Model.ClassInfo({
    name:'ProcessingPositionResult'
});

// product : processingPlanItem
Map.Product = new Model.ClassInfo({
    name:'Product'
});

// project : legendEntity
Map.Project = new Model.ClassInfo({
    name:'Project'
});

// projectAttributeValue : attributeValue
Map.ProjectAttributeValue = new Model.ClassInfo({
    name:'ProjectAttributeValue'
});

// purchaseOrder : order
Map.PurchaseOrder = new Model.ClassInfo({
    name:'PurchaseOrder'
});

// purchaseOrderPosition : orderPosition
Map.PurchaseOrderPosition = new Model.ClassInfo({
    name:'PurchaseOrderPosition'
});

// purchaseReturn : comingOutOperation
Map.PurchaseReturn = new Model.ClassInfo({
    name:'PurchaseReturn'
});

// purchaseReturnPosition : abstractShipmentOut
Map.PurchaseReturnPosition = new Model.ClassInfo({
    name:'PurchaseReturnPosition'
});

// reportTemplatesMetadata : templatesMetadata
Map.ReportTemplatesMetadata = new Model.ClassInfo({
    name:'ReportTemplatesMetadata'
});

// requisite : object
Map.Requisite = new Model.ClassInfo({
    name:'Requisite'
});

// retailCashIn : abstractCashIn
Map.RetailCashIn = new Model.ClassInfo({
    name:'RetailCashIn'
});

// retailCashOut : abstractCashOut
Map.RetailCashOut = new Model.ClassInfo({
    name:'RetailCashOut'
});

// retailDemand : abstractDemand
Map.RetailDemand = new Model.ClassInfo({
    name:'RetailDemand'
});

// retailSalesReturn : abstractSalesReturn
Map.RetailSalesReturn = new Model.ClassInfo({
    name:'RetailSalesReturn'
});

// retailStore : legendEntity
Map.RetailStore = new Model.ClassInfo({
    name:'RetailStore'
});

// salesReturn : abstractSalesReturn
Map.SalesReturn = new Model.ClassInfo({
    name:'SalesReturn'
});

// salesReturnPosition : comingIn
Map.SalesReturnPosition = new Model.ClassInfo({
    name:'SalesReturnPosition'
});

// service : abstractGood
Map.Service = new Model.ClassInfo({
    name:'Service'
});

// shareMode : legendEntity
Map.ShareMode = new Model.ClassInfo({
    name:'ShareMode'
});

// shipmentIn : comingIn
Map.ShipmentIn = new Model.ClassInfo({
    name:'ShipmentIn'
});

// shipmentOut : abstractShipmentOut
Map.ShipmentOut = new Model.ClassInfo({
    name:'ShipmentOut'
});

// skladShareMode : shareMode
Map.SkladShareMode = new Model.ClassInfo({
    name:'SkladShareMode'
});

// slot : legendEntity
Map.Slot = new Model.ClassInfo({
    name:'Slot'
});

// state : legendEntity
Map.State = new Model.ClassInfo({
    name:'State'
});

// stockMotion : motion
Map.StockMotion = new Model.ClassInfo({
    name:'StockMotion'
});

// stockOperation : operationWithPositions
Map.StockOperation = new Model.ClassInfo({
    name:'StockOperation'
});

// supply : comingInOperation
Map.Supply = new Model.ClassInfo({
    name:'Supply'
});

// template : document
Map.Template = new Model.ClassInfo({
    name:'Template'
});

// templatesMetadata : legendEntity
Map.TemplatesMetadata = new Model.ClassInfo({
    name:'TemplatesMetadata'
});

// thing : legendEntity
Map.Thing = new Model.ClassInfo({
    name:'Thing'
});

// thingAttributeValue : attributeValue
Map.ThingAttributeValue = new Model.ClassInfo({
    name:'ThingAttributeValue'
});

// unit : object
Map.Unit = new Model.ClassInfo({
    name:'Unit'
});

// uom : predefinedLegendableEntity
Map.Uom = new Model.ClassInfo({
    name:'Uom'
});

// warehouse : place
Map.Warehouse = new Model.ClassInfo({
    name:'Warehouse'
});

// workflow : legendEntity
Map.Workflow = new Model.ClassInfo({
    name:'Workflow'
});

// ymlConnectorSettings : abstractConnectorSetting
Map.YmlConnectorSettings = new Model.ClassInfo({
    name:'YmlConnectorSettings'
});



/*************
 Inheritance
 ***************/

// entity : accountEntity
Map.Entity.baseTypeInfo = Map.AccountEntity;

// abstractBarcode : entity
Map.AbstractBarcode.baseTypeInfo = Map.Entity;

// amiroCustomAttributeInfo : entity
Map.AmiroCustomAttributeInfo.baseTypeInfo = Map.Entity;

// goodPack : entity
Map.GoodPack.baseTypeInfo = Map.Entity;

// goodSlotPreference : entity
Map.GoodSlotPreference.baseTypeInfo = Map.Entity;

// infoEntity : entity
Map.InfoEntity.baseTypeInfo = Map.Entity;

// motion : entity
Map.Motion.baseTypeInfo = Map.Entity;

// price : entity
Map.Price.baseTypeInfo = Map.Entity;

// priceListCell : entity
Map.PriceListCell.baseTypeInfo = Map.Entity;

// processingPlanItem : entity
Map.ProcessingPlanItem.baseTypeInfo = Map.Entity;

// barcode : abstractBarcode
Map.Barcode.baseTypeInfo = Map.AbstractBarcode;

// consignmentBarcode : abstractBarcode
Map.ConsignmentBarcode.baseTypeInfo = Map.AbstractBarcode;

// agentNewsItem : infoEntity
Map.AgentNewsItem.baseTypeInfo = Map.InfoEntity;

// attributeValue : infoEntity
Map.AttributeValue.baseTypeInfo = Map.InfoEntity;

// feature : infoEntity
Map.Feature.baseTypeInfo = Map.InfoEntity;

// legendEntity : infoEntity
Map.LegendEntity.baseTypeInfo = Map.InfoEntity;

// priceType : infoEntity
Map.PriceType.baseTypeInfo = Map.InfoEntity;

// agentAttributeValue : attributeValue
Map.AgentAttributeValue.baseTypeInfo = Map.AttributeValue;

// consignmentAttributeValue : attributeValue
Map.ConsignmentAttributeValue.baseTypeInfo = Map.AttributeValue;

// contractAttributeValue : attributeValue
Map.ContractAttributeValue.baseTypeInfo = Map.AttributeValue;

// customEntityAttributeValue : attributeValue
Map.CustomEntityAttributeValue.baseTypeInfo = Map.AttributeValue;

// employeeAttributeValue : attributeValue
Map.EmployeeAttributeValue.baseTypeInfo = Map.AttributeValue;

// featureAttributeValue : attributeValue
Map.FeatureAttributeValue.baseTypeInfo = Map.AttributeValue;

// goodAttributeValue : attributeValue
Map.GoodAttributeValue.baseTypeInfo = Map.AttributeValue;

// operationAttributeValue : attributeValue
Map.OperationAttributeValue.baseTypeInfo = Map.AttributeValue;

// placeAttributeValue : attributeValue
Map.PlaceAttributeValue.baseTypeInfo = Map.AttributeValue;

// projectAttributeValue : attributeValue
Map.ProjectAttributeValue.baseTypeInfo = Map.AttributeValue;

// thingAttributeValue : attributeValue
Map.ThingAttributeValue.baseTypeInfo = Map.AttributeValue;

// abstractConnectorSetting : legendEntity
Map.AbstractConnectorSetting.baseTypeInfo = Map.LegendEntity;

// agent : legendEntity
Map.Agent.baseTypeInfo = Map.LegendEntity;

// attributeMetadata : legendEntity
Map.AttributeMetadata.baseTypeInfo = Map.LegendEntity;

// classifier : legendEntity
Map.Classifier.baseTypeInfo = Map.LegendEntity;

// consignment : legendEntity
Map.Consignment.baseTypeInfo = Map.LegendEntity;

// contactPerson : legendEntity
Map.ContactPerson.baseTypeInfo = Map.LegendEntity;

// contract : legendEntity
Map.Contract.baseTypeInfo = Map.LegendEntity;

// currency : legendEntity
Map.Currency.baseTypeInfo = Map.LegendEntity;

// customEntity : legendEntity
Map.CustomEntity.baseTypeInfo = Map.LegendEntity;

// document : legendEntity
Map.Document.baseTypeInfo = Map.LegendEntity;

// employee : legendEntity
Map.Employee.baseTypeInfo = Map.LegendEntity;

// entityMetadata : legendEntity
Map.EntityMetadata.baseTypeInfo = Map.LegendEntity;

// gtd : legendEntity
Map.Gtd.baseTypeInfo = Map.LegendEntity;

// operation : legendEntity
Map.Operation.baseTypeInfo = Map.LegendEntity;

// predefinedLegendableEntity : legendEntity
Map.PredefinedLegendableEntity.baseTypeInfo = Map.LegendEntity;

// priceListMetadata : legendEntity
Map.PriceListMetadata.baseTypeInfo = Map.LegendEntity;

// priceListMetadataColumn : legendEntity
Map.PriceListMetadataColumn.baseTypeInfo = Map.LegendEntity;

// project : legendEntity
Map.Project.baseTypeInfo = Map.LegendEntity;

// retailStore : legendEntity
Map.RetailStore.baseTypeInfo = Map.LegendEntity;

// shareMode : legendEntity
Map.ShareMode.baseTypeInfo = Map.LegendEntity;

// slot : legendEntity
Map.Slot.baseTypeInfo = Map.LegendEntity;

// state : legendEntity
Map.State.baseTypeInfo = Map.LegendEntity;

// templatesMetadata : legendEntity
Map.TemplatesMetadata.baseTypeInfo = Map.LegendEntity;

// thing : legendEntity
Map.Thing.baseTypeInfo = Map.LegendEntity;

// workflow : legendEntity
Map.Workflow.baseTypeInfo = Map.LegendEntity;

// operationConnectorSetting : abstractConnectorSetting
Map.OperationConnectorSetting.baseTypeInfo = Map.AbstractConnectorSetting;

// ymlConnectorSettings : abstractConnectorSetting
Map.YmlConnectorSettings.baseTypeInfo = Map.AbstractConnectorSetting;

// amiroConnectorSettings : operationConnectorSetting
Map.AmiroConnectorSettings.baseTypeInfo = Map.OperationConnectorSetting;

// cmlConnectorSettings : operationConnectorSetting
Map.CmlConnectorSettings.baseTypeInfo = Map.OperationConnectorSetting;

// company : agent
Map.Company.baseTypeInfo = Map.Agent;

// myCompany : company
Map.MyCompany.baseTypeInfo = Map.Company;

// goodFolder : classifier
Map.GoodFolder.baseTypeInfo = Map.Classifier;

// place : classifier
Map.Place.baseTypeInfo = Map.Classifier;

// processingPlanFolder : classifier
Map.ProcessingPlanFolder.baseTypeInfo = Map.Classifier;

// abstractGood : goodFolder
Map.AbstractGood.baseTypeInfo = Map.GoodFolder;

// good : abstractGood
Map.Good.baseTypeInfo = Map.AbstractGood;

// service : abstractGood
Map.Service.baseTypeInfo = Map.AbstractGood;

// warehouse : place
Map.Warehouse.baseTypeInfo = Map.Place;

// processingPlan : processingPlanFolder
Map.ProcessingPlan.baseTypeInfo = Map.ProcessingPlanFolder;

// agentPictureDocument : document
Map.AgentPictureDocument.baseTypeInfo = Map.Document;

// attachedDocument : document
Map.AttachedDocument.baseTypeInfo = Map.Document;

// attachmentDocument : document
Map.AttachmentDocument.baseTypeInfo = Map.Document;

// documentMiniature : document
Map.DocumentMiniature.baseTypeInfo = Map.Document;

// template : document
Map.Template.baseTypeInfo = Map.Document;

// contractDocument : attachedDocument
Map.ContractDocument.baseTypeInfo = Map.AttachedDocument;

// operationDocument : attachedDocument
Map.OperationDocument.baseTypeInfo = Map.AttachedDocument;

// customEntityMetadata : entityMetadata
Map.CustomEntityMetadata.baseTypeInfo = Map.EntityMetadata;

// embeddedEntityMetadata : entityMetadata
Map.EmbeddedEntityMetadata.baseTypeInfo = Map.EntityMetadata;

// finance : operation
Map.Finance.baseTypeInfo = Map.Operation;

// operationWithPositions : operation
Map.OperationWithPositions.baseTypeInfo = Map.Operation;

// financeIn : finance
Map.FinanceIn.baseTypeInfo = Map.Finance;

// financeOut : finance
Map.FinanceOut.baseTypeInfo = Map.Finance;

// abstractCashIn : financeIn
Map.AbstractCashIn.baseTypeInfo = Map.FinanceIn;

// paymentIn : financeIn
Map.PaymentIn.baseTypeInfo = Map.FinanceIn;

// cashIn : abstractCashIn
Map.CashIn.baseTypeInfo = Map.AbstractCashIn;

// retailCashIn : abstractCashIn
Map.RetailCashIn.baseTypeInfo = Map.AbstractCashIn;

// abstractCashOut : financeOut
Map.AbstractCashOut.baseTypeInfo = Map.FinanceOut;

// paymentOut : financeOut
Map.PaymentOut.baseTypeInfo = Map.FinanceOut;

// cashOut : abstractCashOut
Map.CashOut.baseTypeInfo = Map.AbstractCashOut;

// retailCashOut : abstractCashOut
Map.RetailCashOut.baseTypeInfo = Map.AbstractCashOut;

// facture : operationWithPositions
Map.Facture.baseTypeInfo = Map.OperationWithPositions;

// inventory : operationWithPositions
Map.Inventory.baseTypeInfo = Map.OperationWithPositions;

// invoice : operationWithPositions
Map.Invoice.baseTypeInfo = Map.OperationWithPositions;

// order : operationWithPositions
Map.Order.baseTypeInfo = Map.OperationWithPositions;

// priceList : operationWithPositions
Map.PriceList.baseTypeInfo = Map.OperationWithPositions;

// stockOperation : operationWithPositions
Map.StockOperation.baseTypeInfo = Map.OperationWithPositions;

// factureIn : facture
Map.FactureIn.baseTypeInfo = Map.Facture;

// factureOut : facture
Map.FactureOut.baseTypeInfo = Map.Facture;

// invoiceIn : invoice
Map.InvoiceIn.baseTypeInfo = Map.Invoice;

// invoiceOut : invoice
Map.InvoiceOut.baseTypeInfo = Map.Invoice;

// customerOrder : order
Map.CustomerOrder.baseTypeInfo = Map.Order;

// internalOrder : order
Map.InternalOrder.baseTypeInfo = Map.Order;

// processingOrder : order
Map.ProcessingOrder.baseTypeInfo = Map.Order;

// purchaseOrder : order
Map.PurchaseOrder.baseTypeInfo = Map.Order;

// comingInOperation : stockOperation
Map.ComingInOperation.baseTypeInfo = Map.StockOperation;

// comingOutOperation : stockOperation
Map.ComingOutOperation.baseTypeInfo = Map.StockOperation;

// move : stockOperation
Map.Move.baseTypeInfo = Map.StockOperation;

// processing : stockOperation
Map.Processing.baseTypeInfo = Map.StockOperation;

// abstractSalesReturn : comingInOperation
Map.AbstractSalesReturn.baseTypeInfo = Map.ComingInOperation;

// enter : comingInOperation
Map.Enter.baseTypeInfo = Map.ComingInOperation;

// supply : comingInOperation
Map.Supply.baseTypeInfo = Map.ComingInOperation;

// retailSalesReturn : abstractSalesReturn
Map.RetailSalesReturn.baseTypeInfo = Map.AbstractSalesReturn;

// salesReturn : abstractSalesReturn
Map.SalesReturn.baseTypeInfo = Map.AbstractSalesReturn;

// abstractDemand : comingOutOperation
Map.AbstractDemand.baseTypeInfo = Map.ComingOutOperation;

// loss : comingOutOperation
Map.Loss.baseTypeInfo = Map.ComingOutOperation;

// purchaseReturn : comingOutOperation
Map.PurchaseReturn.baseTypeInfo = Map.ComingOutOperation;

// demand : abstractDemand
Map.Demand.baseTypeInfo = Map.AbstractDemand;

// retailDemand : abstractDemand
Map.RetailDemand.baseTypeInfo = Map.AbstractDemand;

// country : predefinedLegendableEntity
Map.Country.baseTypeInfo = Map.PredefinedLegendableEntity;

// uom : predefinedLegendableEntity
Map.Uom.baseTypeInfo = Map.PredefinedLegendableEntity;

// skladShareMode : shareMode
Map.SkladShareMode.baseTypeInfo = Map.ShareMode;

// entityTemplatesMetadata : templatesMetadata
Map.EntityTemplatesMetadata.baseTypeInfo = Map.TemplatesMetadata;

// reportTemplatesMetadata : templatesMetadata
Map.ReportTemplatesMetadata.baseTypeInfo = Map.TemplatesMetadata;

// inventoryPosition : motion
Map.InventoryPosition.baseTypeInfo = Map.Motion;

// invoicePosition : motion
Map.InvoicePosition.baseTypeInfo = Map.Motion;

// orderPosition : motion
Map.OrderPosition.baseTypeInfo = Map.Motion;

// priceListRow : motion
Map.PriceListRow.baseTypeInfo = Map.Motion;

// stockMotion : motion
Map.StockMotion.baseTypeInfo = Map.Motion;

// customerOrderPosition : orderPosition
Map.CustomerOrderPosition.baseTypeInfo = Map.OrderPosition;

// purchaseOrderPosition : orderPosition
Map.PurchaseOrderPosition.baseTypeInfo = Map.OrderPosition;

// comingIn : stockMotion
Map.ComingIn.baseTypeInfo = Map.StockMotion;

// comingOut : stockMotion
Map.ComingOut.baseTypeInfo = Map.StockMotion;

// movePosition : stockMotion
Map.MovePosition.baseTypeInfo = Map.StockMotion;

// enterPosition : comingIn
Map.EnterPosition.baseTypeInfo = Map.ComingIn;

// processingPositionResult : comingIn
Map.ProcessingPositionResult.baseTypeInfo = Map.ComingIn;

// salesReturnPosition : comingIn
Map.SalesReturnPosition.baseTypeInfo = Map.ComingIn;

// shipmentIn : comingIn
Map.ShipmentIn.baseTypeInfo = Map.ComingIn;

// abstractShipmentOut : comingOut
Map.AbstractShipmentOut.baseTypeInfo = Map.ComingOut;

// lossPosition : comingOut
Map.LossPosition.baseTypeInfo = Map.ComingOut;

// processingPositionMaterial : comingOut
Map.ProcessingPositionMaterial.baseTypeInfo = Map.ComingOut;

// purchaseReturnPosition : abstractShipmentOut
Map.PurchaseReturnPosition.baseTypeInfo = Map.AbstractShipmentOut;

// shipmentOut : abstractShipmentOut
Map.ShipmentOut.baseTypeInfo = Map.AbstractShipmentOut;

// material : processingPlanItem
Map.Material.baseTypeInfo = Map.ProcessingPlanItem;

// product : processingPlanItem
Map.Product.baseTypeInfo = Map.ProcessingPlanItem;



/***********
 Elements
 *************/

Map.elementInfos = [
    {
        elementName: new XML.QName('agent'),
        typeInfo: Map.Agent
    },
    {
        elementName: new XML.QName('agentPictureDocument'),
        typeInfo: Map.AgentPictureDocument
    },
    {
        elementName: new XML.QName('amiroConnectorSettings'),
        typeInfo: Map.AmiroConnectorSettings
    },
    {
        elementName: new XML.QName('attachmentDocument'),
        typeInfo: Map.AttachmentDocument
    },
    {
        elementName: new XML.QName('barcode'),
        typeInfo: Map.Barcode
    },
    {
        elementName: new XML.QName('cashIn'),
        typeInfo: Map.CashIn
    },
    {
        elementName: new XML.QName('cashOut'),
        typeInfo: Map.CashOut
    },
    {
        elementName: new XML.QName('cmlConnectorSettings'),
        typeInfo: Map.CmlConnectorSettings
    },
    {
        elementName: new XML.QName('collection'),
        typeInfo: Map.Collection
    },
    {
        elementName: new XML.QName('company'),
        typeInfo: Map.Company
    },
    {
        elementName: new XML.QName('consignment'),
        typeInfo: Map.Consignment
    },
    {
        elementName: new XML.QName('consignmentBarcode'),
        typeInfo: Map.ConsignmentBarcode
    },
    {
        elementName: new XML.QName('contract'),
        typeInfo: Map.Contract
    },
    {
        elementName: new XML.QName('contractDocument'),
        typeInfo: Map.ContractDocument
    },
    {
        elementName: new XML.QName('country'),
        typeInfo: Map.Country
    },
    {
        elementName: new XML.QName('currency'),
        typeInfo: Map.Currency
    },
    {
        elementName: new XML.QName('customEntity'),
        typeInfo: Map.CustomEntity
    },
    {
        elementName: new XML.QName('customEntityMetadata'),
        typeInfo: Map.CustomEntityMetadata
    },
    {
        elementName: new XML.QName('customerOrder'),
        typeInfo: Map.CustomerOrder
    },
    {
        elementName: new XML.QName('demand'),
        typeInfo: Map.Demand
    },
    {
        elementName: new XML.QName('document'),
        typeInfo: Map.Document
    },
    {
        elementName: new XML.QName('documentMiniature'),
        typeInfo: Map.DocumentMiniature
    },
    {
        elementName: new XML.QName('embeddedEntityMetadata'),
        typeInfo: Map.EmbeddedEntityMetadata
    },
    {
        elementName: new XML.QName('employee'),
        typeInfo: Map.Employee
    },
    {
        elementName: new XML.QName('enter'),
        typeInfo: Map.Enter
    },
    {
        elementName: new XML.QName('entityTemplatesMetadata'),
        typeInfo: Map.EntityTemplatesMetadata
    },
    {
        elementName: new XML.QName('exchange'),
        typeInfo: Map.ExchangeContainer
    },
    {
        elementName: new XML.QName('factureIn'),
        typeInfo: Map.FactureIn
    },
    {
        elementName: new XML.QName('factureOut'),
        typeInfo: Map.FactureOut
    },
    {
        elementName: new XML.QName('feature'),
        typeInfo: Map.Feature
    },
    {
        elementName: new XML.QName('good'),
        typeInfo: Map.Good
    },
    {
        elementName: new XML.QName('goodFolder'),
        typeInfo: Map.GoodFolder
    },
    {
        elementName: new XML.QName('gtd'),
        typeInfo: Map.Gtd
    },
    {
        elementName: new XML.QName('internalOrder'),
        typeInfo: Map.InternalOrder
    },
    {
        elementName: new XML.QName('inventory'),
        typeInfo: Map.Inventory
    },
    {
        elementName: new XML.QName('invoiceIn'),
        typeInfo: Map.InvoiceIn
    },
    {
        elementName: new XML.QName('invoiceOut'),
        typeInfo: Map.InvoiceOut
    },
    {
        elementName: new XML.QName('loss'),
        typeInfo: Map.Loss
    },
    {
        elementName: new XML.QName('move'),
        typeInfo: Map.Move
    },
    {
        elementName: new XML.QName('myCompany'),
        typeInfo: Map.MyCompany
    },
    {
        elementName: new XML.QName('operationDocument'),
        typeInfo: Map.OperationDocument
    },
    {
        elementName: new XML.QName('paymentIn'),
        typeInfo: Map.PaymentIn
    },
    {
        elementName: new XML.QName('paymentOut'),
        typeInfo: Map.PaymentOut
    },
    {
        elementName: new XML.QName('place'),
        typeInfo: Map.Place
    },
    {
        elementName: new XML.QName('priceList'),
        typeInfo: Map.PriceList
    },
    {
        elementName: new XML.QName('priceType'),
        typeInfo: Map.PriceType
    },
    {
        elementName: new XML.QName('processing'),
        typeInfo: Map.Processing
    },
    {
        elementName: new XML.QName('processingOrder'),
        typeInfo: Map.ProcessingOrder
    },
    {
        elementName: new XML.QName('processingPlan'),
        typeInfo: Map.ProcessingPlan
    },
    {
        elementName: new XML.QName('processingPlanFolder'),
        typeInfo: Map.ProcessingPlanFolder
    },
    {
        elementName: new XML.QName('project'),
        typeInfo: Map.Project
    },
    {
        elementName: new XML.QName('purchaseOrder'),
        typeInfo: Map.PurchaseOrder
    },
    {
        elementName: new XML.QName('purchaseReturn'),
        typeInfo: Map.PurchaseReturn
    },
    {
        elementName: new XML.QName('reportTemplatesMetadata'),
        typeInfo: Map.ReportTemplatesMetadata
    },
    {
        elementName: new XML.QName('retailCashIn'),
        typeInfo: Map.RetailCashIn
    },
    {
        elementName: new XML.QName('retailCashOut'),
        typeInfo: Map.RetailCashOut
    },
    {
        elementName: new XML.QName('retailDemand'),
        typeInfo: Map.RetailDemand
    },
    {
        elementName: new XML.QName('retailSalesReturn'),
        typeInfo: Map.RetailSalesReturn
    },
    {
        elementName: new XML.QName('salesReturn'),
        typeInfo: Map.SalesReturn
    },
    {
        elementName: new XML.QName('service'),
        typeInfo: Map.Service
    },
    {
        elementName: new XML.QName('skladShareMode'),
        typeInfo: Map.SkladShareMode
    },
    {
        elementName: new XML.QName('slot'),
        typeInfo: Map.Slot
    },
    {
        elementName: new XML.QName('supply'),
        typeInfo: Map.Supply
    },
    {
        elementName: new XML.QName('template'),
        typeInfo: Map.Template
    },
    {
        elementName: new XML.QName('thing'),
        typeInfo: Map.Thing
    },
    {
        elementName: new XML.QName('uom'),
        typeInfo: Map.Uom
    },
    {
        elementName: new XML.QName('warehouse'),
        typeInfo: Map.Warehouse
    },
    {
        elementName: new XML.QName('workflow'),
        typeInfo: Map.Workflow
    },
    {
        elementName: new XML.QName('ymlConnectorSettings'),
        typeInfo: Map.YmlConnectorSettings
    },
    {
        elementName: new XML.QName('error'),
        typeInfo: Map.Error
    }
];

/************
 Properties
 **************/

// abstractBarcode : entity
Map.AbstractBarcode.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'barcode',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'barcodeType',
        typeInfo : XSD.String.INSTANCE
    })
];

// abstractCashIn : financeIn
Map.AbstractCashIn.propertyInfos = [];

// abstractCashOut : financeOut
Map.AbstractCashOut.propertyInfos = [];

// abstractConnectorSetting : legendEntity
Map.AbstractConnectorSetting.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'active',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'login',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'organizationId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'organizationUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'password',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'pollPeriod',
        typeInfo : XSD.Int.INSTANCE
    })
];

// abstractDemand : comingOutOperation
Map.AbstractDemand.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'customerOrderUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'factureUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'customerOrderId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'factureId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'invoicesOutUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('invoiceOutRef'),
        wrapperElementName : new XML.QName('invoicesOutUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'invoicesOut',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('invoiceOutRef'),
        wrapperElementName : new XML.QName('invoicesOut')
    }),
    new Model.ElementPropertyInfo({
        name : 'payments',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('financeInRef'),
        wrapperElementName : new XML.QName('payments')
    }),
    new Model.ElementPropertyInfo({
        name : 'salesPreturns',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('salesReturnRef'),
        wrapperElementName : new XML.QName('salesPreturns')
    }),
    new Model.ElementPropertyInfo({
        name : 'paymentsUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('financeInRef'),
        wrapperElementName : new XML.QName('paymentsUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'shipmentOut',
        typeInfo : Map.ShipmentOut,
        collection : true
    }),
    new Model.ElementPropertyInfo({
        name : 'salesReturnsUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('salesReturnRef'),
        wrapperElementName : new XML.QName('salesReturnsUuid')
    })
];

// abstractGood : goodFolder
Map.AbstractGood.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'minPrice',
        typeInfo : XSD.Double.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'uomUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'countryUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'supplierUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'salePrice',
        typeInfo : XSD.Double.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'saleCurrencyUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'buyCurrencyUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'buyCurrencyId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'countryId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'saleCurrencyId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'supplierId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'uomId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'barcode',
        typeInfo : Map.Barcode,
        collection : true
    }),
    new Model.ElementPropertyInfo({
        name : 'salePrices',
        typeInfo : Map.Price,
        collection : true,
        elementName : new XML.QName('price'),
        wrapperElementName : new XML.QName('salePrices')
    })
];

// abstractSalesReturn : comingInOperation
Map.AbstractSalesReturn.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'demandUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'demandId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'lossesUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('lossRef'),
        wrapperElementName : new XML.QName('lossesUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'losses',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('lossRef'),
        wrapperElementName : new XML.QName('losses')
    }),
    new Model.ElementPropertyInfo({
        name : 'payments',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('financeOutRef'),
        wrapperElementName : new XML.QName('payments')
    }),
    new Model.ElementPropertyInfo({
        name : 'paymentsUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('financeOutRef'),
        wrapperElementName : new XML.QName('paymentsUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'salesReturnPosition',
        typeInfo : Map.SalesReturnPosition,
        collection : true
    })
];

// abstractShipmentOut : comingOut
Map.AbstractShipmentOut.propertyInfos = [];

// accountEntity : object
Map.AccountEntity.propertyInfos = [
    new Model.ElementPropertyInfo({
        name : 'accountId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'accountUuid',
        typeInfo : XSD.String.INSTANCE
    })
];

// agent : legendEntity
Map.Agent.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'discount',
        typeInfo : XSD.Double.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'autoDiscount',
        typeInfo : XSD.Double.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'stateId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'discountCardNumber',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'discountCorrection',
        typeInfo : XSD.Double.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'stateUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'employeeUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'priceTypeUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'archived',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'created',
        typeInfo : XSD.DateTime.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'employeeId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'priceTypeId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'attribute',
        typeInfo : Map.AgentAttributeValue,
        collection : true
    }),
    new Model.ElementPropertyInfo({
        name : 'requisite',
        typeInfo : Map.Requisite
    }),
    new Model.ElementPropertyInfo({
        name : 'contact',
        typeInfo : Map.Contact
    }),
    new Model.ElementPropertyInfo({
        name : 'contactPerson',
        typeInfo : Map.ContactPerson,
        collection : true
    }),
    new Model.ElementPropertyInfo({
        name : 'agentNewsItem',
        typeInfo : Map.AgentNewsItem,
        collection : true
    }),
    new Model.ElementPropertyInfo({
        name : 'tags',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('tag'),
        wrapperElementName : new XML.QName('tags')
    })
];

// agentAttributeValue : attributeValue
Map.AgentAttributeValue.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'agentUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'agentId',
        typeInfo : XSD.String.INSTANCE
    })
];

// agentNewsItem : infoEntity
Map.AgentNewsItem.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'moment',
        typeInfo : XSD.DateTime.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'text',
        typeInfo : XSD.String.INSTANCE
    })
];

// agentPictureDocument : document
Map.AgentPictureDocument.propertyInfos = [];

// amiroConnectorSettings : operationConnectorSetting
Map.AmiroConnectorSettings.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'commentsColumnNum',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'customerAddressColumnNum',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'customerCodeColumnNum',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'customerEmailColumnNum',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'customerFirstNameColumnNum',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'customerLastNameColumnNum',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'customerNickColumnNum',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'customerPhoneColumnNum',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'goodIdColumnNum',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'goodNameColumnNum',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'orderDateColumnNum',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'orderIdColumnNum',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'prefixForAgent',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'prefixForGood',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'prefixForOperation',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'priceColumnNum',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'quantityColumnNum',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'shippingAmountColumnNum',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'stateColumnNum',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'taxColumnNum',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'customAttribute',
        typeInfo : Map.AmiroCustomAttributeInfo,
        collection : true
    })
];

// amiroCustomAttributeInfo : entity
Map.AmiroCustomAttributeInfo.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'columnNumber',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'name',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'settingsId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'settingsUuid',
        typeInfo : XSD.String.INSTANCE
    })
];

// attachedDocument : document
Map.AttachedDocument.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'emailedDate',
        typeInfo : XSD.DateTime.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'publicId',
        typeInfo : XSD.String.INSTANCE
    })
];

// attachmentDocument : document
Map.AttachmentDocument.propertyInfos = [];

// attributeMetadata : legendEntity
Map.AttributeMetadata.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'attrType',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'dictionaryMetadataUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'entityMetadataUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'feature',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'dictionaryMetadataId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'entityMetadataId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'position',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'required',
        typeInfo : XSD.Boolean.INSTANCE
    })
];

// attributeValue : infoEntity
Map.AttributeValue.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'metadataUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'valueText',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'valueString',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'doubleValue',
        typeInfo : XSD.Double.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'longValue',
        typeInfo : XSD.Long.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'booleanValue',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'timeValue',
        typeInfo : XSD.DateTime.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'entityValueUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'agentValueUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'goodValueUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'placeValueUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'consignmentValueUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'contractValueUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'projectValueUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'employeeValueUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'agentValueId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'consignmentValueId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'contractValueId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'employeeValueId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'entityValueId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'goodValueId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'metadataId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'placeValueId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'projectValueId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'file',
        typeInfo : Map.AttachmentDocument
    })
];

// bankAccount : object
Map.BankAccount.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'bankName',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'bankLocation',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'accountNumber',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'correspondentAccount',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'bic',
        typeInfo : XSD.String.INSTANCE
    })
];

// barcode : abstractBarcode
Map.Barcode.propertyInfos = [];

// cashIn : abstractCashIn
Map.CashIn.propertyInfos = [];

// cashOut : abstractCashOut
Map.CashOut.propertyInfos = [];

// classifier : legendEntity
Map.Classifier.propertyInfos = [];

// cmlConnectorSettings : operationConnectorSetting
Map.CmlConnectorSettings.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'features',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'goodFolderUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'goodFolderId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'priceTypeId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'stockplaceId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'priceTypeUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'shopType',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'stockActive',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'stockplaceUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'stockPollPeriod',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'syncFeatures',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'syncOrderState',
        typeInfo : XSD.Boolean.INSTANCE
    })
];

// collection : object
Map.Collection.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'total',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'start',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'count',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.ElementRefsPropertyInfo({
        name : 'items',
        collection : true,
        elementTypeInfos : [
            {
                elementName: new XML.QName('agent'),
                typeInfo: Map.Agent
            },
            {
                elementName: new XML.QName('agentPictureDocument'),
                typeInfo: Map.AgentPictureDocument
            },
            {
                elementName: new XML.QName('amiroConnectorSettings'),
                typeInfo: Map.AmiroConnectorSettings
            },
            {
                elementName: new XML.QName('attachmentDocument'),
                typeInfo: Map.AttachmentDocument
            },
            {
                elementName: new XML.QName('barcode'),
                typeInfo: Map.Barcode
            },
            {
                elementName: new XML.QName('cashIn'),
                typeInfo: Map.CashIn
            },
            {
                elementName: new XML.QName('cashOut'),
                typeInfo: Map.CashOut
            },
            {
                elementName: new XML.QName('cmlConnectorSettings'),
                typeInfo: Map.CmlConnectorSettings
            },
            {
                elementName: new XML.QName('collection'),
                typeInfo: Map.Collection
            },
            {
                elementName: new XML.QName('company'),
                typeInfo: Map.Company
            },
            {
                elementName: new XML.QName('consignment'),
                typeInfo: Map.Consignment
            },
            {
                elementName: new XML.QName('consignmentBarcode'),
                typeInfo: Map.ConsignmentBarcode
            },
            {
                elementName: new XML.QName('contract'),
                typeInfo: Map.Contract
            },
            {
                elementName: new XML.QName('contractDocument'),
                typeInfo: Map.ContractDocument
            },
            {
                elementName: new XML.QName('country'),
                typeInfo: Map.Country
            },
            {
                elementName: new XML.QName('currency'),
                typeInfo: Map.Currency
            },
            {
                elementName: new XML.QName('customEntity'),
                typeInfo: Map.CustomEntity
            },
            {
                elementName: new XML.QName('customEntityMetadata'),
                typeInfo: Map.CustomEntityMetadata
            },
            {
                elementName: new XML.QName('customerOrder'),
                typeInfo: Map.CustomerOrder
            },
            {
                elementName: new XML.QName('demand'),
                typeInfo: Map.Demand
            },
            {
                elementName: new XML.QName('document'),
                typeInfo: Map.Document
            },
            {
                elementName: new XML.QName('documentMiniature'),
                typeInfo: Map.DocumentMiniature
            },
            {
                elementName: new XML.QName('embeddedEntityMetadata'),
                typeInfo: Map.EmbeddedEntityMetadata
            },
            {
                elementName: new XML.QName('employee'),
                typeInfo: Map.Employee
            },
            {
                elementName: new XML.QName('enter'),
                typeInfo: Map.Enter
            },
            {
                elementName: new XML.QName('entityTemplatesMetadata'),
                typeInfo: Map.EntityTemplatesMetadata
            },
            {
                elementName: new XML.QName('exchange'),
                typeInfo: Map.ExchangeContainer
            },
            {
                elementName: new XML.QName('factureIn'),
                typeInfo: Map.FactureIn
            },
            {
                elementName: new XML.QName('factureOut'),
                typeInfo: Map.FactureOut
            },
            {
                elementName: new XML.QName('feature'),
                typeInfo: Map.Feature
            },
            {
                elementName: new XML.QName('good'),
                typeInfo: Map.Good
            },
            {
                elementName: new XML.QName('goodFolder'),
                typeInfo: Map.GoodFolder
            },
            {
                elementName: new XML.QName('gtd'),
                typeInfo: Map.Gtd
            },
            {
                elementName: new XML.QName('internalOrder'),
                typeInfo: Map.InternalOrder
            },
            {
                elementName: new XML.QName('inventory'),
                typeInfo: Map.Inventory
            },
            {
                elementName: new XML.QName('invoiceIn'),
                typeInfo: Map.InvoiceIn
            },
            {
                elementName: new XML.QName('invoiceOut'),
                typeInfo: Map.InvoiceOut
            },
            {
                elementName: new XML.QName('loss'),
                typeInfo: Map.Loss
            },
            {
                elementName: new XML.QName('move'),
                typeInfo: Map.Move
            },
            {
                elementName: new XML.QName('myCompany'),
                typeInfo: Map.MyCompany
            },
            {
                elementName: new XML.QName('operationDocument'),
                typeInfo: Map.OperationDocument
            },
            {
                elementName: new XML.QName('paymentIn'),
                typeInfo: Map.PaymentIn
            },
            {
                elementName: new XML.QName('paymentOut'),
                typeInfo: Map.PaymentOut
            },
            {
                elementName: new XML.QName('place'),
                typeInfo: Map.Place
            },
            {
                elementName: new XML.QName('priceList'),
                typeInfo: Map.PriceList
            },
            {
                elementName: new XML.QName('priceType'),
                typeInfo: Map.PriceType
            },
            {
                elementName: new XML.QName('processing'),
                typeInfo: Map.Processing
            },
            {
                elementName: new XML.QName('processingOrder'),
                typeInfo: Map.ProcessingOrder
            },
            {
                elementName: new XML.QName('processingPlan'),
                typeInfo: Map.ProcessingPlan
            },
            {
                elementName: new XML.QName('processingPlanFolder'),
                typeInfo: Map.ProcessingPlanFolder
            },
            {
                elementName: new XML.QName('project'),
                typeInfo: Map.Project
            },
            {
                elementName: new XML.QName('purchaseOrder'),
                typeInfo: Map.PurchaseOrder
            },
            {
                elementName: new XML.QName('purchaseReturn'),
                typeInfo: Map.PurchaseReturn
            },
            {
                elementName: new XML.QName('reportTemplatesMetadata'),
                typeInfo: Map.ReportTemplatesMetadata
            },
            {
                elementName: new XML.QName('retailCashIn'),
                typeInfo: Map.RetailCashIn
            },
            {
                elementName: new XML.QName('retailCashOut'),
                typeInfo: Map.RetailCashOut
            },
            {
                elementName: new XML.QName('retailDemand'),
                typeInfo: Map.RetailDemand
            },
            {
                elementName: new XML.QName('retailSalesReturn'),
                typeInfo: Map.RetailSalesReturn
            },
            {
                elementName: new XML.QName('salesReturn'),
                typeInfo: Map.SalesReturn
            },
            {
                elementName: new XML.QName('service'),
                typeInfo: Map.Service
            },
            {
                elementName: new XML.QName('skladShareMode'),
                typeInfo: Map.SkladShareMode
            },
            {
                elementName: new XML.QName('slot'),
                typeInfo: Map.Slot
            },
            {
                elementName: new XML.QName('supply'),
                typeInfo: Map.Supply
            },
            {
                elementName: new XML.QName('template'),
                typeInfo: Map.Template
            },
            {
                elementName: new XML.QName('thing'),
                typeInfo: Map.Thing
            },
            {
                elementName: new XML.QName('uom'),
                typeInfo: Map.Uom
            },
            {
                elementName: new XML.QName('warehouse'),
                typeInfo: Map.Warehouse
            },
            {
                elementName: new XML.QName('workflow'),
                typeInfo: Map.Workflow
            },
            {
                elementName: new XML.QName('ymlConnectorSettings'),
                typeInfo: Map.YmlConnectorSettings
            },
            {
                elementName: new XML.QName('id'),
                typeInfo: XSD.String.INSTANCE
            },
            {
                elementName: new XML.QName('uuid'),
                typeInfo: XSD.String.INSTANCE
            }
        ]
    })
];

// collectionContainer : object
Map.CollectionContainer.propertyInfos = [];

// comingIn : stockMotion
Map.ComingIn.propertyInfos = [];

// comingInOperation : stockOperation
Map.ComingInOperation.propertyInfos = [];

// comingOut : stockMotion
Map.ComingOut.propertyInfos = [];

// comingOutOperation : stockOperation
Map.ComingOutOperation.propertyInfos = [];

// company : agent
Map.Company.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'director',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'chiefAccountant',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'payerVat',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'companyType',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'sign',
        typeInfo : Map.AgentPictureDocument
    }),
    new Model.ElementPropertyInfo({
        name : 'stamp',
        typeInfo : Map.AgentPictureDocument
    })
];

// consignment : legendEntity
Map.Consignment.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'goodUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'isDefault',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'goodId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'barcode',
        typeInfo : Map.ConsignmentBarcode,
        collection : true
    }),
    new Model.ElementPropertyInfo({
        name : 'attribute',
        typeInfo : Map.ConsignmentAttributeValue,
        collection : true
    }),
    new Model.ElementPropertyInfo({
        name : 'feature',
        typeInfo : Map.Feature
    })
];

// consignmentAttributeValue : attributeValue
Map.ConsignmentAttributeValue.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'consignmentUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'consignmentId',
        typeInfo : XSD.String.INSTANCE
    })
];

// consignmentBarcode : abstractBarcode
Map.ConsignmentBarcode.propertyInfos = [];

// contact : object
Map.Contact.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'address',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'phones',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'faxes',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'mobiles',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'email',
        typeInfo : XSD.String.INSTANCE
    })
];

// contactPerson : legendEntity
Map.ContactPerson.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'email',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'phone',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'position',
        typeInfo : XSD.String.INSTANCE
    })
];

// contract : legendEntity
Map.Contract.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'agentUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'currencyUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'moment',
        typeInfo : XSD.DateTime.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'agentId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'currencyId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'ownCompanyId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'ownCompanyUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'attribute',
        typeInfo : Map.ContractAttributeValue,
        collection : true
    }),
    new Model.ElementPropertyInfo({
        name : 'document',
        typeInfo : Map.ContractDocument,
        collection : true
    }),
    new Model.ElementPropertyInfo({
        name : 'sum',
        typeInfo : Map.MoneyAmount
    })
];

// contractAttributeValue : attributeValue
Map.ContractAttributeValue.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'contractUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'contractId',
        typeInfo : XSD.String.INSTANCE
    })
];

// contractDocument : attachedDocument
Map.ContractDocument.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'contractUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'contractId',
        typeInfo : XSD.String.INSTANCE
    })
];

// country : predefinedLegendableEntity
Map.Country.propertyInfos = [];

// currency : legendEntity
Map.Currency.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'enteredRate',
        typeInfo : XSD.Double.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'invertRate',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'rate',
        typeInfo : XSD.Double.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'major',
        typeInfo : Map.Unit
    }),
    new Model.ElementPropertyInfo({
        name : 'minor',
        typeInfo : Map.Unit
    })
];

// customEntity : legendEntity
Map.CustomEntity.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'entityMetadataUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'entityMetadataId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'attribute',
        typeInfo : Map.CustomEntityAttributeValue,
        collection : true
    })
];

// customEntityAttributeValue : attributeValue
Map.CustomEntityAttributeValue.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'customEntityUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'customEntityId',
        typeInfo : XSD.String.INSTANCE
    })
];

// customEntityMetadata : entityMetadata
Map.CustomEntityMetadata.propertyInfos = [];

// customerOrder : order
Map.CustomerOrder.propertyInfos = [
    new Model.ElementPropertyInfo({
        name : 'demandsUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('demandRef'),
        wrapperElementName : new XML.QName('demandsUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'invoicesOutUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('invoiceOutRef'),
        wrapperElementName : new XML.QName('invoicesOutUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'demands',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('demandRef'),
        wrapperElementName : new XML.QName('demands')
    }),
    new Model.ElementPropertyInfo({
        name : 'invoicesOut',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('invoiceOutRef'),
        wrapperElementName : new XML.QName('invoicesOut')
    }),
    new Model.ElementPropertyInfo({
        name : 'payments',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('financeInRef'),
        wrapperElementName : new XML.QName('payments')
    }),
    new Model.ElementPropertyInfo({
        name : 'purchaseOrders',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('purchaseOrderRef'),
        wrapperElementName : new XML.QName('purchaseOrders')
    }),
    new Model.ElementPropertyInfo({
        name : 'paymentsUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('financeInRef'),
        wrapperElementName : new XML.QName('paymentsUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'customerOrderPosition',
        typeInfo : Map.CustomerOrderPosition,
        collection : true
    }),
    new Model.ElementPropertyInfo({
        name : 'purchaseOrdersUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('purchaseOrderRef'),
        wrapperElementName : new XML.QName('purchaseOrdersUuid')
    })
];

// customerOrderPosition : orderPosition
Map.CustomerOrderPosition.propertyInfos = [];

// demand : abstractDemand
Map.Demand.propertyInfos = [
    new Model.ElementPropertyInfo({
        name : 'extension',
        typeInfo : Map.DemandExtension
    })
];

// demandExtension : operationExtension
Map.DemandExtension.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'opened',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'carrierUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'loadName',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'consignorIndication',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'transportFacility',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'goodPackQuantity',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'carNumber',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'carrierId',
        typeInfo : XSD.String.INSTANCE
    })
];

// document : legendEntity
Map.Document.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'created',
        typeInfo : XSD.DateTime.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'filename',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'miniatureUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'miniatureId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'contents',
        typeInfo : XSD.String.INSTANCE
    })
];

// documentMiniature : document
Map.DocumentMiniature.propertyInfos = [];

// embeddedEntityMetadata : entityMetadata
Map.EmbeddedEntityMetadata.propertyInfos = [];

// employee : legendEntity
Map.Employee.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'city',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'email',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'fax',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'firstName',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'icqNumber',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'lastName',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'middleName',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'mobile',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'uid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'phone',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'postalAddress',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'postalCode',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'skypeName',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'attribute',
        typeInfo : Map.EmployeeAttributeValue,
        collection : true
    })
];

// employeeAttributeValue : attributeValue
Map.EmployeeAttributeValue.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'employeeUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'employeeId',
        typeInfo : XSD.String.INSTANCE
    })
];

// enter : comingInOperation
Map.Enter.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'inventoryUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'inventoryId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'enterPosition',
        typeInfo : Map.EnterPosition,
        collection : true
    })
];

// enterPosition : comingIn
Map.EnterPosition.propertyInfos = [
    new Model.ElementPropertyInfo({
        name : 'tags',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('tag'),
        wrapperElementName : new XML.QName('tags')
    })
];

// entity : accountEntity
Map.Entity.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'readMode',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'changeMode',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'groupId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'groupUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'company',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'id',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'uuid',
        typeInfo : XSD.String.INSTANCE
    })
];

// entityMetadata : legendEntity
Map.EntityMetadata.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'uniqueCode',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'codeValueType',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'independentNameGenerator',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'barcodeGen',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'barcodeGenPref',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'editOnlyByAuthor',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'noEditFromOtherPlaceSource',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'noApplicableFromOtherPlaceSource',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'noEditFromOtherPlaceTarget',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'noApplicableFromOtherPlaceTarget',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'editablePeriod',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'editableCalendarDays',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'editableWorkDays',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'editableFromDate',
        typeInfo : XSD.DateTime.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'attributeMetadata',
        typeInfo : Map.AttributeMetadata,
        collection : true
    })
];

// entityTemplatesMetadata : templatesMetadata
Map.EntityTemplatesMetadata.propertyInfos = [];

// error : object
Map.Error.propertyInfos = [
    new Model.ElementPropertyInfo({
        name : 'uid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'moment',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'message',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'stack',
        typeInfo : XSD.String.INSTANCE
    })
];

// exchangeContainer : object
Map.ExchangeContainer.propertyInfos = [
    new Model.ElementPropertyInfo({
        name : 'workflow',
        typeInfo : Map.Workflow,
        collection : true,
        wrapperElementName : new XML.QName('workflow')
    }),
    new Model.ElementPropertyInfo({
        name : 'shareModes',
        typeInfo : Map.SkladShareMode,
        collection : true,
        elementName : new XML.QName('shareMode'),
        wrapperElementName : new XML.QName('shareModes')
    }),
    new Model.ElementPropertyInfo({
        name : 'customEntityMetadata',
        typeInfo : Map.CustomEntityMetadata,
        collection : true,
        wrapperElementName : new XML.QName('customEntityMetadata')
    }),
    new Model.ElementPropertyInfo({
        name : 'embeddedEntityMetadata',
        typeInfo : Map.EmbeddedEntityMetadata,
        collection : true,
        wrapperElementName : new XML.QName('embeddedEntityMetadata')
    }),
    new Model.ElementPropertyInfo({
        name : 'entityTemplatesMetadata',
        typeInfo : Map.EntityTemplatesMetadata,
        collection : true,
        wrapperElementName : new XML.QName('entityTemplatesMetadata')
    }),
    new Model.ElementPropertyInfo({
        name : 'reportTemplatesMetadata',
        typeInfo : Map.ReportTemplatesMetadata,
        collection : true,
        wrapperElementName : new XML.QName('reportTemplatesMetadata')
    }),
    new Model.ElementPropertyInfo({
        name : 'customEntity',
        typeInfo : Map.CustomEntity,
        collection : true,
        wrapperElementName : new XML.QName('customEntity')
    }),
    new Model.ElementPropertyInfo({
        name : 'currencies',
        typeInfo : Map.Currency,
        collection : true,
        elementName : new XML.QName('currency'),
        wrapperElementName : new XML.QName('currencies')
    }),
    new Model.ElementPropertyInfo({
        name : 'country',
        typeInfo : Map.Country,
        collection : true,
        wrapperElementName : new XML.QName('country')
    }),
    new Model.ElementPropertyInfo({
        name : 'gtd',
        typeInfo : Map.Gtd,
        collection : true,
        wrapperElementName : new XML.QName('gtd')
    }),
    new Model.ElementPropertyInfo({
        name : 'uoms',
        typeInfo : Map.Uom,
        collection : true,
        elementName : new XML.QName('uom'),
        wrapperElementName : new XML.QName('uoms')
    }),
    new Model.ElementPropertyInfo({
        name : 'myCompany',
        typeInfo : Map.MyCompany,
        collection : true,
        wrapperElementName : new XML.QName('myCompany')
    }),
    new Model.ElementPropertyInfo({
        name : 'agents',
        typeInfo : Map.Agent,
        collection : true,
        elementName : new XML.QName('agent'),
        wrapperElementName : new XML.QName('agents')
    }),
    new Model.ElementPropertyInfo({
        name : 'companies',
        typeInfo : Map.Company,
        collection : true,
        elementName : new XML.QName('company'),
        wrapperElementName : new XML.QName('companies')
    }),
    new Model.ElementPropertyInfo({
        name : 'goodFolders',
        typeInfo : Map.GoodFolder,
        collection : true,
        elementName : new XML.QName('goodFolder'),
        wrapperElementName : new XML.QName('goodFolders')
    }),
    new Model.ElementPropertyInfo({
        name : 'goods',
        typeInfo : Map.Good,
        collection : true,
        elementName : new XML.QName('good'),
        wrapperElementName : new XML.QName('goods')
    }),
    new Model.ElementPropertyInfo({
        name : 'service',
        typeInfo : Map.Service,
        collection : true,
        wrapperElementName : new XML.QName('service')
    }),
    new Model.ElementPropertyInfo({
        name : 'things',
        typeInfo : Map.Thing,
        collection : true,
        elementName : new XML.QName('thing'),
        wrapperElementName : new XML.QName('things')
    }),
    new Model.ElementPropertyInfo({
        name : 'employees',
        typeInfo : Map.Employee,
        collection : true,
        elementName : new XML.QName('employee'),
        wrapperElementName : new XML.QName('employees')
    }),
    new Model.ElementPropertyInfo({
        name : 'places',
        typeInfo : Map.Place,
        collection : true,
        elementName : new XML.QName('place'),
        wrapperElementName : new XML.QName('places')
    }),
    new Model.ElementPropertyInfo({
        name : 'warehouses',
        typeInfo : Map.Warehouse,
        collection : true,
        elementName : new XML.QName('warehouse'),
        wrapperElementName : new XML.QName('warehouses')
    }),
    new Model.ElementPropertyInfo({
        name : 'project',
        typeInfo : Map.Project,
        collection : true,
        wrapperElementName : new XML.QName('project')
    }),
    new Model.ElementPropertyInfo({
        name : 'contract',
        typeInfo : Map.Contract,
        collection : true,
        wrapperElementName : new XML.QName('contract')
    }),
    new Model.ElementPropertyInfo({
        name : 'processingPlans',
        typeInfo : Map.ProcessingPlan,
        collection : true,
        elementName : new XML.QName('processingPlan'),
        wrapperElementName : new XML.QName('processingPlans')
    }),
    new Model.ElementPropertyInfo({
        name : 'features',
        typeInfo : Map.Feature,
        collection : true,
        elementName : new XML.QName('feature'),
        wrapperElementName : new XML.QName('features')
    }),
    new Model.ElementPropertyInfo({
        name : 'consignments',
        typeInfo : Map.Consignment,
        collection : true,
        elementName : new XML.QName('consignment'),
        wrapperElementName : new XML.QName('consignments')
    }),
    new Model.ElementPropertyInfo({
        name : 'priceLists',
        typeInfo : Map.PriceList,
        collection : true,
        elementName : new XML.QName('priceList'),
        wrapperElementName : new XML.QName('priceLists')
    }),
    new Model.ElementPropertyInfo({
        name : 'paymentIn',
        typeInfo : Map.PaymentIn,
        collection : true,
        wrapperElementName : new XML.QName('paymentIn')
    }),
    new Model.ElementPropertyInfo({
        name : 'paymentOut',
        typeInfo : Map.PaymentOut,
        collection : true,
        wrapperElementName : new XML.QName('paymentOut')
    }),
    new Model.ElementPropertyInfo({
        name : 'factureIn',
        typeInfo : Map.FactureIn,
        collection : true,
        wrapperElementName : new XML.QName('factureIn')
    }),
    new Model.ElementPropertyInfo({
        name : 'factureOut',
        typeInfo : Map.FactureOut,
        collection : true,
        wrapperElementName : new XML.QName('factureOut')
    }),
    new Model.ElementPropertyInfo({
        name : 'cashIn',
        typeInfo : Map.CashIn,
        collection : true,
        wrapperElementName : new XML.QName('cashIn')
    }),
    new Model.ElementPropertyInfo({
        name : 'cashOut',
        typeInfo : Map.CashOut,
        collection : true,
        wrapperElementName : new XML.QName('cashOut')
    }),
    new Model.ElementPropertyInfo({
        name : 'deliveries_demand',
        typeInfo : Map.Demand,
        collection : true,
        elementName : new XML.QName('demand'),
        wrapperElementName : new XML.QName('deliveries-demand')
    }),
    new Model.ElementPropertyInfo({
        name : 'deliveries_supply',
        typeInfo : Map.Supply,
        collection : true,
        elementName : new XML.QName('supply'),
        wrapperElementName : new XML.QName('deliveries-supply')
    }),
    new Model.ElementPropertyInfo({
        name : 'retailCashIn',
        typeInfo : Map.RetailCashIn,
        collection : true,
        wrapperElementName : new XML.QName('retailCashIn')
    }),
    new Model.ElementPropertyInfo({
        name : 'retailCashOut',
        typeInfo : Map.RetailCashOut,
        collection : true,
        wrapperElementName : new XML.QName('retailCashOut')
    }),
    new Model.ElementPropertyInfo({
        name : 'retailDemand',
        typeInfo : Map.RetailDemand,
        collection : true,
        wrapperElementName : new XML.QName('retailDemand')
    }),
    new Model.ElementPropertyInfo({
        name : 'retailSalesReturn',
        typeInfo : Map.RetailSalesReturn,
        collection : true,
        wrapperElementName : new XML.QName('retailSalesReturn')
    }),
    new Model.ElementPropertyInfo({
        name : 'inventories',
        typeInfo : Map.Inventory,
        collection : true,
        elementName : new XML.QName('inventory'),
        wrapperElementName : new XML.QName('inventories')
    }),
    new Model.ElementPropertyInfo({
        name : 'moves',
        typeInfo : Map.Move,
        collection : true,
        elementName : new XML.QName('move'),
        wrapperElementName : new XML.QName('moves')
    }),
    new Model.ElementPropertyInfo({
        name : 'losses',
        typeInfo : Map.Loss,
        collection : true,
        elementName : new XML.QName('loss'),
        wrapperElementName : new XML.QName('losses')
    }),
    new Model.ElementPropertyInfo({
        name : 'enters',
        typeInfo : Map.Enter,
        collection : true,
        elementName : new XML.QName('enter'),
        wrapperElementName : new XML.QName('enters')
    }),
    new Model.ElementPropertyInfo({
        name : 'invoicesIn',
        typeInfo : Map.InvoiceIn,
        collection : true,
        elementName : new XML.QName('invoiceIn'),
        wrapperElementName : new XML.QName('invoicesIn')
    }),
    new Model.ElementPropertyInfo({
        name : 'invoicesOut',
        typeInfo : Map.InvoiceOut,
        collection : true,
        elementName : new XML.QName('invoiceOut'),
        wrapperElementName : new XML.QName('invoicesOut')
    }),
    new Model.ElementPropertyInfo({
        name : 'salesReturns',
        typeInfo : Map.SalesReturn,
        collection : true,
        elementName : new XML.QName('salesReturn'),
        wrapperElementName : new XML.QName('salesReturns')
    }),
    new Model.ElementPropertyInfo({
        name : 'purchaseReturns',
        typeInfo : Map.PurchaseReturn,
        collection : true,
        elementName : new XML.QName('purchaseReturn'),
        wrapperElementName : new XML.QName('purchaseReturns')
    }),
    new Model.ElementPropertyInfo({
        name : 'processings',
        typeInfo : Map.Processing,
        collection : true,
        elementName : new XML.QName('processing'),
        wrapperElementName : new XML.QName('processings')
    }),
    new Model.ElementPropertyInfo({
        name : 'customerOrders',
        typeInfo : Map.CustomerOrder,
        collection : true,
        elementName : new XML.QName('customerOrder'),
        wrapperElementName : new XML.QName('customerOrders')
    }),
    new Model.ElementPropertyInfo({
        name : 'purchaseOrders',
        typeInfo : Map.PurchaseOrder,
        collection : true,
        elementName : new XML.QName('purchaseOrder'),
        wrapperElementName : new XML.QName('purchaseOrders')
    }),
    new Model.ElementPropertyInfo({
        name : 'internalOrders',
        typeInfo : Map.InternalOrder,
        collection : true,
        elementName : new XML.QName('internalOrder'),
        wrapperElementName : new XML.QName('internalOrders')
    }),
    new Model.ElementPropertyInfo({
        name : 'proccessingOrders',
        typeInfo : Map.ProcessingOrder,
        collection : true,
        elementName : new XML.QName('processingOrder'),
        wrapperElementName : new XML.QName('proccessingOrders')
    }),
    new Model.ElementPropertyInfo({
        name : 'amiroConnectors',
        typeInfo : Map.AmiroConnectorSettings,
        collection : true,
        elementName : new XML.QName('amiroConnectorSettings'),
        wrapperElementName : new XML.QName('amiroConnectors')
    }),
    new Model.ElementPropertyInfo({
        name : 'cmlConnectors',
        typeInfo : Map.CmlConnectorSettings,
        collection : true,
        elementName : new XML.QName('cmlConnectorSettings'),
        wrapperElementName : new XML.QName('cmlConnectors')
    }),
    new Model.ElementPropertyInfo({
        name : 'ymlConnectors',
        typeInfo : Map.YmlConnectorSettings,
        collection : true,
        elementName : new XML.QName('ymlConnectorSettings'),
        wrapperElementName : new XML.QName('ymlConnectors')
    })
];

// facture : operationWithPositions
Map.Facture.propertyInfos = [];

// factureIn : facture
Map.FactureIn.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'incomingDate',
        typeInfo : XSD.DateTime.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'incomingNumber',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'payments',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('financeOutRef'),
        wrapperElementName : new XML.QName('payments')
    }),
    new Model.ElementPropertyInfo({
        name : 'supplies',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('supplyRef'),
        wrapperElementName : new XML.QName('supplies')
    }),
    new Model.ElementPropertyInfo({
        name : 'paymentsUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('financeOutRef'),
        wrapperElementName : new XML.QName('paymentsUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'suppliesUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('supplyRef'),
        wrapperElementName : new XML.QName('suppliesUuid')
    })
];

// factureOut : facture
Map.FactureOut.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'paymentDate',
        typeInfo : XSD.DateTime.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'paymentNumber',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'demandsUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('demandRef'),
        wrapperElementName : new XML.QName('demandsUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'extension',
        typeInfo : Map.FactureOutExtension
    }),
    new Model.ElementPropertyInfo({
        name : 'demands',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('demandRef'),
        wrapperElementName : new XML.QName('demands')
    }),
    new Model.ElementPropertyInfo({
        name : 'payments',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('financeInRef'),
        wrapperElementName : new XML.QName('payments')
    }),
    new Model.ElementPropertyInfo({
        name : 'returns',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('purchaseReturnRef'),
        wrapperElementName : new XML.QName('returns')
    }),
    new Model.ElementPropertyInfo({
        name : 'paymentsUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('financeInRef'),
        wrapperElementName : new XML.QName('paymentsUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'returnsUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('returnRef'),
        wrapperElementName : new XML.QName('returnsUuid')
    })
];

// factureOutExtension : operationExtension
Map.FactureOutExtension.propertyInfos = [];

// feature : infoEntity
Map.Feature.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'goodId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'externalcode',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'attribute',
        typeInfo : Map.FeatureAttributeValue,
        collection : true
    })
];

// featureAttributeValue : attributeValue
Map.FeatureAttributeValue.propertyInfos = [];

// finance : operation
Map.Finance.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'paymentPurpose',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'vatSum',
        typeInfo : XSD.Double.INSTANCE
    })
];

// financeIn : finance
Map.FinanceIn.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'customerOrderUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'factureOutUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'invoiceOutUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'customerOrderId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'factureId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'invoiceOutId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'purchaseReturnId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'purchaseReturnUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'demandsUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('demandRef'),
        wrapperElementName : new XML.QName('demandsUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'demands',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('demandRef'),
        wrapperElementName : new XML.QName('demands')
    })
];

// financeOut : finance
Map.FinanceOut.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'factureInUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'invoiceInUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'factureId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'invoiceInId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'purchaseOrderId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'salesReturnId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'supplyId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'purchaseOrderUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'salesReturnUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'supplyUuid',
        typeInfo : XSD.String.INSTANCE
    })
];

// good : abstractGood
Map.Good.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'isSerialTrackable',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'buyPrice',
        typeInfo : XSD.Double.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'minimumBalance',
        typeInfo : XSD.Double.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'weight',
        typeInfo : XSD.Double.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'volume',
        typeInfo : XSD.Double.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'pack',
        typeInfo : Map.GoodPack,
        collection : true
    }),
    new Model.ElementPropertyInfo({
        name : 'preferences',
        typeInfo : Map.GoodSlotPreference,
        collection : true,
        elementName : new XML.QName('preference'),
        wrapperElementName : new XML.QName('preferences')
    })
];

// goodAttributeValue : attributeValue
Map.GoodAttributeValue.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'goodUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'goodId',
        typeInfo : XSD.String.INSTANCE
    })
];

// goodFolder : classifier
Map.GoodFolder.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'archived',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'parentId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'parentUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'productCode',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'vat',
        typeInfo : XSD.Long.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'attribute',
        typeInfo : Map.GoodAttributeValue,
        collection : true
    })
];

// goodPack : entity
Map.GoodPack.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'uomId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'quantity',
        typeInfo : XSD.Double.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'uomUuid',
        typeInfo : XSD.String.INSTANCE
    })
];

// goodPrices : object
Map.GoodPrices.propertyInfos = [
    new Model.ElementPropertyInfo({
        name : 'price',
        typeInfo : Map.Price,
        collection : true
    })
];

// goodSlotPreference : entity
Map.GoodSlotPreference.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'slotId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'slotUuid',
        typeInfo : XSD.String.INSTANCE
    })
];

// gtd : legendEntity
Map.Gtd.propertyInfos = [];

// infoEntity : entity
Map.InfoEntity.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'updated',
        typeInfo : XSD.DateTime.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'updatedBy',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'deleted',
        typeInfo : XSD.DateTime.INSTANCE
    })
];

// internalOrder : order
Map.InternalOrder.propertyInfos = [
    new Model.ElementPropertyInfo({
        name : 'purchaseOrderPosition',
        typeInfo : Map.PurchaseOrderPosition,
        collection : true
    }),
    new Model.ElementPropertyInfo({
        name : 'purchaseOrdersUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('purchaseOrderRef'),
        wrapperElementName : new XML.QName('purchaseOrdersUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'demandsUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('moveRef'),
        wrapperElementName : new XML.QName('demandsUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'demands',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('moveRef'),
        wrapperElementName : new XML.QName('demands')
    }),
    new Model.ElementPropertyInfo({
        name : 'purchaseOrders',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('purchaseOrderRef'),
        wrapperElementName : new XML.QName('purchaseOrders')
    })
];

// inventory : operationWithPositions
Map.Inventory.propertyInfos = [
    new Model.ElementPropertyInfo({
        name : 'entersUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('enterRef'),
        wrapperElementName : new XML.QName('entersUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'lossesUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('lossRef'),
        wrapperElementName : new XML.QName('lossesUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'enters',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('enterRef'),
        wrapperElementName : new XML.QName('enters')
    }),
    new Model.ElementPropertyInfo({
        name : 'losses',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('lossRef'),
        wrapperElementName : new XML.QName('losses')
    }),
    new Model.ElementPropertyInfo({
        name : 'inventoryPosition',
        typeInfo : Map.InventoryPosition,
        collection : true
    })
];

// inventoryPosition : motion
Map.InventoryPosition.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'correctionAmount',
        typeInfo : XSD.Double.INSTANCE
    })
];

// invoice : operationWithPositions
Map.Invoice.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'paymentPlannedMoment',
        typeInfo : XSD.DateTime.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'invoicePosition',
        typeInfo : Map.InvoicePosition,
        collection : true
    })
];

// invoiceIn : invoice
Map.InvoiceIn.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'incomingDate',
        typeInfo : XSD.DateTime.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'incomingNumber',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'purchaseOrderId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'purchaseOrderUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'financesOutUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('financeOutRef'),
        wrapperElementName : new XML.QName('financesOutUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'financesOut',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('financeOutRef'),
        wrapperElementName : new XML.QName('financesOut')
    }),
    new Model.ElementPropertyInfo({
        name : 'supplies',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('supplyRef'),
        wrapperElementName : new XML.QName('supplies')
    }),
    new Model.ElementPropertyInfo({
        name : 'suppliesUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('supplyRef'),
        wrapperElementName : new XML.QName('suppliesUuid')
    })
];

// invoiceOut : invoice
Map.InvoiceOut.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'customerOrderUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'customerOrderId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'demandsUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('demandRef'),
        wrapperElementName : new XML.QName('demandsUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'paymentsUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('financeInRef'),
        wrapperElementName : new XML.QName('paymentsUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'demands',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('demandRef'),
        wrapperElementName : new XML.QName('demands')
    }),
    new Model.ElementPropertyInfo({
        name : 'payments',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('financeInRef'),
        wrapperElementName : new XML.QName('payments')
    })
];

// invoicePosition : motion
Map.InvoicePosition.propertyInfos = [];

// legendEntity : infoEntity
Map.LegendEntity.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'name',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'code',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'externalcode',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'description',
        typeInfo : XSD.String.INSTANCE
    })
];

// loss : comingOutOperation
Map.Loss.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'inventoryUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'inventoryId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'salesReturnId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'salesReturnUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'lossPosition',
        typeInfo : Map.LossPosition,
        collection : true
    })
];

// lossPosition : comingOut
Map.LossPosition.propertyInfos = [
    new Model.ElementPropertyInfo({
        name : 'tags',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('tag'),
        wrapperElementName : new XML.QName('tags')
    })
];

// material : processingPlanItem
Map.Material.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'isOptional',
        typeInfo : XSD.Boolean.INSTANCE
    })
];

// moneyAmount : object
Map.MoneyAmount.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'sum',
        typeInfo : XSD.Double.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'sumInCurrency',
        typeInfo : XSD.Double.INSTANCE
    })
];

// motion : entity
Map.Motion.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'discount',
        typeInfo : XSD.Double.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'quantity',
        typeInfo : XSD.Double.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'goodPackUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'consignmentUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'goodUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'slotUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'vat',
        typeInfo : XSD.Long.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'consignmentId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'goodId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'goodPackId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'slotId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'basePrice',
        typeInfo : Map.MoneyAmount
    }),
    new Model.ElementPropertyInfo({
        name : 'price',
        typeInfo : Map.MoneyAmount
    }),
    new Model.ElementPropertyInfo({
        name : 'things',
        typeInfo : Map.Thing,
        collection : true,
        elementName : new XML.QName('thingRef'),
        wrapperElementName : new XML.QName('things')
    })
];

// move : stockOperation
Map.Move.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'internalOrderUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'internalOrderId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'movePosition',
        typeInfo : Map.MovePosition,
        collection : true
    })
];

// movePosition : stockMotion
Map.MovePosition.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'sourceSlotId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'sourceSlotUuid',
        typeInfo : XSD.String.INSTANCE
    })
];

// myCompany : company
Map.MyCompany.propertyInfos = [];

// operation : legendEntity
Map.Operation.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'stateUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'targetAgentUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'sourceAgentUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'targetStoreUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'sourceStoreUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'applicable',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'projectUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'contractUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'moment',
        typeInfo : XSD.DateTime.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'payerVat',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'retailStoreUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'currencyUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'rate',
        typeInfo : XSD.Double.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'vatIncluded',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'created',
        typeInfo : XSD.DateTime.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'createdBy',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'employeeUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'contractId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'currencyId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'projectId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'retailStoreId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'sourceAgentId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'sourceStoreId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'stateId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'targetAgentId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'targetStoreId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'attribute',
        typeInfo : Map.OperationAttributeValue,
        collection : true
    }),
    new Model.ElementPropertyInfo({
        name : 'document',
        typeInfo : Map.OperationDocument,
        collection : true
    }),
    new Model.ElementPropertyInfo({
        name : 'sum',
        typeInfo : Map.MoneyAmount
    })
];

// operationAttributeValue : attributeValue
Map.OperationAttributeValue.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'operationUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'operationId',
        typeInfo : XSD.String.INSTANCE
    })
];

// operationConnectorSetting : abstractConnectorSetting
Map.OperationConnectorSetting.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'adminDomain',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'autoReserve',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'orderplaceId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'orderplaceUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'shopDomain',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'useShopOperationName',
        typeInfo : XSD.Boolean.INSTANCE
    })
];

// operationDocument : attachedDocument
Map.OperationDocument.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'operationId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'operationUuid',
        typeInfo : XSD.String.INSTANCE
    })
];

// operationExtension : object
Map.OperationExtension.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'consigneeUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'consigneeId',
        typeInfo : XSD.String.INSTANCE
    })
];

// operationWithPositions : operation
Map.OperationWithPositions.propertyInfos = [];

// order : operationWithPositions
Map.Order.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'deliveryPlannedMoment',
        typeInfo : XSD.DateTime.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'reservedSum',
        typeInfo : XSD.Double.INSTANCE
    })
];

// orderPosition : motion
Map.OrderPosition.propertyInfos = [
    new Model.ElementPropertyInfo({
        name : 'reserve',
        typeInfo : XSD.Double.INSTANCE
    })
];

// paymentIn : financeIn
Map.PaymentIn.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'incomingDate',
        typeInfo : XSD.DateTime.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'incomingNumber',
        typeInfo : XSD.String.INSTANCE
    })
];

// paymentOut : financeOut
Map.PaymentOut.propertyInfos = [];

// place : classifier
Map.Place.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'parentUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'parentId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'contact',
        typeInfo : Map.Contact
    }),
    new Model.ElementPropertyInfo({
        name : 'attribute',
        typeInfo : Map.PlaceAttributeValue,
        collection : true
    })
];

// placeAttributeValue : attributeValue
Map.PlaceAttributeValue.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'placeUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'placeId',
        typeInfo : XSD.String.INSTANCE
    })
];

// predefinedLegendableEntity : legendEntity
Map.PredefinedLegendableEntity.propertyInfos = [];

// price : entity
Map.Price.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'currencyUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'currencyId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'priceTypeId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'priceTypeUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'value',
        typeInfo : XSD.Double.INSTANCE
    })
];

// priceList : operationWithPositions
Map.PriceList.propertyInfos = [
    new Model.ElementPropertyInfo({
        name : 'metadata',
        typeInfo : Map.PriceListMetadata
    }),
    new Model.ElementPropertyInfo({
        name : 'priceListRow',
        typeInfo : Map.PriceListRow,
        collection : true
    })
];

// priceListCell : entity
Map.PriceListCell.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'columnName',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'sum',
        typeInfo : Map.MoneyAmount
    })
];

// priceListCellArray : object
Map.PriceListCellArray.propertyInfos = [
    new Model.ElementPropertyInfo({
        name : 'item',
        typeInfo : Map.PriceListCell,
        collection : true
    })
];

// priceListMetadata : legendEntity
Map.PriceListMetadata.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'priceTypeUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'column',
        typeInfo : Map.PriceListMetadataColumn,
        collection : true
    })
];

// priceListMetadataColumn : legendEntity
Map.PriceListMetadataColumn.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'percentageDiscount',
        typeInfo : XSD.Int.INSTANCE
    })
];

// priceListRow : motion
Map.PriceListRow.propertyInfos = [
    new Model.ElementPropertyInfo({
        name : 'cell',
        typeInfo : Map.PriceListCellArray
    })
];

// priceType : infoEntity
Map.PriceType.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'index',
        typeInfo : XSD.Int.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'name',
        typeInfo : XSD.String.INSTANCE
    })
];

// processing : stockOperation
Map.Processing.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'planId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'processingOrderId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'planUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'processingOrderUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'quantity',
        typeInfo : XSD.Double.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'material',
        typeInfo : Map.ProcessingPositionMaterial,
        collection : true
    }),
    new Model.ElementPropertyInfo({
        name : 'results',
        typeInfo : Map.ProcessingPositionResult,
        collection : true,
        elementName : new XML.QName('result'),
        wrapperElementName : new XML.QName('results')
    })
];

// processingOrder : order
Map.ProcessingOrder.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'planId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'planUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'quantity',
        typeInfo : XSD.Double.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'purchaseOrderPosition',
        typeInfo : Map.CustomerOrderPosition,
        collection : true
    }),
    new Model.ElementPropertyInfo({
        name : 'processings',
        typeInfo : Map.Processing,
        collection : true,
        elementName : new XML.QName('processingRef'),
        wrapperElementName : new XML.QName('processings')
    })
];

// processingPlan : processingPlanFolder
Map.ProcessingPlan.propertyInfos = [
    new Model.ElementPropertyInfo({
        name : 'material',
        typeInfo : Map.Material,
        collection : true
    }),
    new Model.ElementPropertyInfo({
        name : 'price',
        typeInfo : Map.MoneyAmount
    }),
    new Model.ElementPropertyInfo({
        name : 'product',
        typeInfo : Map.Product,
        collection : true
    })
];

// processingPlanFolder : classifier
Map.ProcessingPlanFolder.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'parentId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'parentUuid',
        typeInfo : XSD.String.INSTANCE
    })
];

// processingPlanItem : entity
Map.ProcessingPlanItem.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'goodUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'goodId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'planId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'planUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'quantity',
        typeInfo : XSD.Double.INSTANCE
    })
];

// processingPositionMaterial : comingOut
Map.ProcessingPositionMaterial.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'planMaterialId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'planMaterialUuid',
        typeInfo : XSD.String.INSTANCE
    })
];

// processingPositionResult : comingIn
Map.ProcessingPositionResult.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'planResultId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'planResultUuid',
        typeInfo : XSD.String.INSTANCE
    })
];

// product : processingPlanItem
Map.Product.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'costShare',
        typeInfo : XSD.Double.INSTANCE
    })
];

// project : legendEntity
Map.Project.propertyInfos = [
    new Model.ElementPropertyInfo({
        name : 'attribute',
        typeInfo : Map.ProjectAttributeValue,
        collection : true
    })
];

// projectAttributeValue : attributeValue
Map.ProjectAttributeValue.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'projectUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'projectId',
        typeInfo : XSD.String.INSTANCE
    })
];

// purchaseOrder : order
Map.PurchaseOrder.propertyInfos = [
    new Model.ElementPropertyInfo({
        name : 'customerOrdersUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('customerOrderRef'),
        wrapperElementName : new XML.QName('customerOrdersUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'internalOrders',
        typeInfo : Map.InternalOrder,
        collection : true,
        elementName : new XML.QName('internalOrderRef'),
        wrapperElementName : new XML.QName('internalOrders')
    }),
    new Model.ElementPropertyInfo({
        name : 'invoicesUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('invoiceInRef'),
        wrapperElementName : new XML.QName('invoicesUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'customerOrders',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('customerOrderRef'),
        wrapperElementName : new XML.QName('customerOrders')
    }),
    new Model.ElementPropertyInfo({
        name : 'invoicesIn',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('invoiceInRef'),
        wrapperElementName : new XML.QName('invoicesIn')
    }),
    new Model.ElementPropertyInfo({
        name : 'payments',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('financeOutRef'),
        wrapperElementName : new XML.QName('payments')
    }),
    new Model.ElementPropertyInfo({
        name : 'supplies',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('supplyRef'),
        wrapperElementName : new XML.QName('supplies')
    }),
    new Model.ElementPropertyInfo({
        name : 'paymentsUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('financeOutRef'),
        wrapperElementName : new XML.QName('paymentsUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'purchaseOrderPosition',
        typeInfo : Map.PurchaseOrderPosition,
        collection : true
    }),
    new Model.ElementPropertyInfo({
        name : 'suppliesUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('supplyRef'),
        wrapperElementName : new XML.QName('suppliesUuid')
    })
];

// purchaseOrderPosition : orderPosition
Map.PurchaseOrderPosition.propertyInfos = [];

// purchaseReturn : comingOutOperation
Map.PurchaseReturn.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'factureUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'factureId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'supplyId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'supplyUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'payments',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('financeInRef'),
        wrapperElementName : new XML.QName('payments')
    }),
    new Model.ElementPropertyInfo({
        name : 'paymentsUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('financeInRef'),
        wrapperElementName : new XML.QName('paymentsUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'purchaseReturnPosition',
        typeInfo : Map.PurchaseReturnPosition,
        collection : true
    })
];

// purchaseReturnPosition : abstractShipmentOut
Map.PurchaseReturnPosition.propertyInfos = [];

// reportTemplatesMetadata : templatesMetadata
Map.ReportTemplatesMetadata.propertyInfos = [];

// requisite : object
Map.Requisite.propertyInfos = [
    new Model.ElementPropertyInfo({
        name : 'bankAccount',
        typeInfo : Map.BankAccount
    }),
    new Model.AttributePropertyInfo({
        name : 'legalTitle',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'legalAddress',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'actualAddress',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'inn',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'kpp',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'okpo',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'ogrn',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'ogrnip',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'nomerSvidetelstva',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'dataSvidetelstva',
        typeInfo : XSD.DateTime.INSTANCE
    })
];

// retailCashIn : abstractCashIn
Map.RetailCashIn.propertyInfos = [];

// retailCashOut : abstractCashOut
Map.RetailCashOut.propertyInfos = [];

// retailDemand : abstractDemand
Map.RetailDemand.propertyInfos = [];

// retailSalesReturn : abstractSalesReturn
Map.RetailSalesReturn.propertyInfos = [];

// retailStore : legendEntity
Map.RetailStore.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'active',
        typeInfo : XSD.Boolean.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'address',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'myCompanyUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'myCompanyId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'priceTypeId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'warehouseId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'priceTypeUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'warehouseUuid',
        typeInfo : XSD.String.INSTANCE
    })
];

// salesReturn : abstractSalesReturn
Map.SalesReturn.propertyInfos = [];

// salesReturnPosition : comingIn
Map.SalesReturnPosition.propertyInfos = [];

// service : abstractGood
Map.Service.propertyInfos = [];

// shareMode : legendEntity
Map.ShareMode.propertyInfos = [];

// shipmentIn : comingIn
Map.ShipmentIn.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'overhead',
        typeInfo : XSD.Double.INSTANCE
    })
];

// shipmentOut : abstractShipmentOut
Map.ShipmentOut.propertyInfos = [];

// skladShareMode : shareMode
Map.SkladShareMode.propertyInfos = [];

// slot : legendEntity
Map.Slot.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'warehouseId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'warehouseUuid',
        typeInfo : XSD.String.INSTANCE
    })
];

// state : legendEntity
Map.State.propertyInfos = [];

// stockMotion : motion
Map.StockMotion.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'countryUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'gtdUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'gtdId',
        typeInfo : XSD.String.INSTANCE
    })
];

// stockOperation : operationWithPositions
Map.StockOperation.propertyInfos = [];

// supply : comingInOperation
Map.Supply.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'factureInUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'incomingDate',
        typeInfo : XSD.DateTime.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'incomingNumber',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'factureInId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'purchaseOrderId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'overheadDistribution',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'purchaseOrderUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'invoicesInUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('invoiceInRef'),
        wrapperElementName : new XML.QName('invoicesInUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'invoicesIn',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('invoiceInRef'),
        wrapperElementName : new XML.QName('invoicesIn')
    }),
    new Model.ElementPropertyInfo({
        name : 'payments',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('financeOutRef'),
        wrapperElementName : new XML.QName('payments')
    }),
    new Model.ElementPropertyInfo({
        name : 'purchaseReturns',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('purchaseReturnRef'),
        wrapperElementName : new XML.QName('purchaseReturns')
    }),
    new Model.ElementPropertyInfo({
        name : 'overhead',
        typeInfo : Map.MoneyAmount
    }),
    new Model.ElementPropertyInfo({
        name : 'paymentsUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('financeOutRef'),
        wrapperElementName : new XML.QName('paymentsUuid')
    }),
    new Model.ElementPropertyInfo({
        name : 'shipmentIn',
        typeInfo : Map.ShipmentIn,
        collection : true
    }),
    new Model.ElementPropertyInfo({
        name : 'purchaseReturnsUuid',
        typeInfo : XSD.String.INSTANCE,
        collection : true,
        elementName : new XML.QName('purchaseReturnRef'),
        wrapperElementName : new XML.QName('purchaseReturnsUuid')
    })
];

// template : document
Map.Template.propertyInfos = [];

// templatesMetadata : legendEntity
Map.TemplatesMetadata.propertyInfos = [
    new Model.ElementPropertyInfo({
        name : 'template',
        typeInfo : Map.Template,
        collection : true
    })
];

// thing : legendEntity
Map.Thing.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'goodUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'goodId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'attribute',
        typeInfo : Map.ThingAttributeValue,
        collection : true
    })
];

// thingAttributeValue : attributeValue
Map.ThingAttributeValue.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'thingUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'thingId',
        typeInfo : XSD.String.INSTANCE
    })
];

// unit : object
Map.Unit.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 's1',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 's24',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 's5',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'sex',
        typeInfo : XSD.UnsignedShort.INSTANCE
    })
];

// uom : predefinedLegendableEntity
Map.Uom.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'type',
        typeInfo : XSD.String.INSTANCE
    })
];

// warehouse : place
Map.Warehouse.propertyInfos = [
    new Model.AttributePropertyInfo({
        name : 'agentUuid',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.AttributePropertyInfo({
        name : 'agentId',
        typeInfo : XSD.String.INSTANCE
    }),
    new Model.ElementPropertyInfo({
        name : 'slots',
        typeInfo : Map.Slot,
        collection : true,
        elementName : new XML.QName('slot'),
        wrapperElementName : new XML.QName('slots')
    })
];

// workflow : legendEntity
Map.Workflow.propertyInfos = [
    new Model.ElementPropertyInfo({
        name : 'state',
        typeInfo : Map.State,
        collection : true
    })
];

// ymlConnectorSettings : abstractConnectorSetting
Map.YmlConnectorSettings.propertyInfos = [];


module.exports = Map;
},{"jsonix":"ly8u51"}],8:[function(require,module,exports){
/**
 * Moysklad.ObjectModel
 * Date: 11.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var Tools = require('tools');

var Model = {};

Model.BaseObject = function(obj) {
    this.objectType = 'BaseObject';
    this.className = 'baseObject';
};
Model.BaseObject.prototype.initFromObject = function(obj) {
    if (obj) Tools.fillObjectProps(this, obj);
};

// enum UomType
Model.UomType = {
    mass : 'mass',
    volume : 'volume',
    piece : 'piece'
};

// enum AccessMode
Model.AccessMode = {
    NONE : 'NONE',
    SELF : 'SELF',
    PARENT : 'PARENT',
    NEIGHBOUR : 'NEIGHBOUR',
    ALL : 'ALL'
};

// enum AttributeType
Model.AttributeType = {
    STRING : 'STRING',
    LONG : 'LONG',
    TIME : 'TIME',
    ID_CUSTOM : 'ID_CUSTOM',
    FILE : 'FILE',
    DOUBLE : 'DOUBLE',
    BOOLEAN : 'BOOLEAN',
    ID_EMBEDDED : 'ID_EMBEDDED',
    TEXT : 'TEXT',
    LINK : 'LINK'
};

// enum EditablePeriodType
Model.EditablePeriodType = {
    ALL : 'ALL',
    CALENDAR_DAYS : 'CALENDAR_DAYS',
    WORK_DAYS : 'WORK_DAYS',
    DATE : 'DATE'
};

// enum BarcodeType
Model.BarcodeType = {
    EAN8 : 'EAN8',
    EAN13 : 'EAN13',
    Code128 : 'Code128'
};

// enum CompanyType
Model.CompanyType = {
    URLI : 'URLI',
    INPR : 'INPR',
    FILI : 'FILI'
};

// enum OverheadDistribution
Model.OverheadDistribution = {
    BY_PRICE : 'BY_PRICE',
    BY_WEIGHT : 'BY_WEIGHT',
    BY_VOLUME : 'BY_VOLUME'
};

// enum Type
Model.Type = {
    BITRIX : 'BITRIX',
    UMICMS : 'UMICMS',
    HOSTCMS : 'HOSTCMS',
    INSALES : 'INSALES',
    WEBASYST : 'WEBASYST',
    SIMPLA : 'SIMPLA',
    UMIRU : 'UMIRU'
};

Model.Id = function (obj) {
    if (arguments.length == 1) {
        if (typeof(obj) == 'string') return obj;
        else throw new Error('Model.Id: Не верный тип объекта (ожидалась строка)');
    }
    return '';
};

// abstractBarcode : entity
Model.AbstractBarcode = function (obj) {
    var me = new Model.Entity(obj);
    // properties
    me.barcode = null;
    me.barcodeType = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'AbstractBarcode';
    me.className = 'abstractBarcode';
    me.constructor = arguments.callee;
    return me;
};

// abstractCashIn : financeIn
Model.AbstractCashIn = function (obj) {
    var me = new Model.FinanceIn(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'AbstractCashIn';
    me.className = 'abstractCashIn';
    me.constructor = arguments.callee;
    return me;
};

// abstractCashOut : financeOut
Model.AbstractCashOut = function (obj) {
    var me = new Model.FinanceOut(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'AbstractCashOut';
    me.className = 'abstractCashOut';
    me.constructor = arguments.callee;
    return me;
};

// abstractConnectorSetting : legendEntity
Model.AbstractConnectorSetting = function (obj) {
    var me = new Model.LegendEntity(obj);
    // properties
    me.active = null;
    me.login = null;
    me.organizationId = null;
    me.organizationUuid = null;
    me.password = null;
    me.pollPeriod = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'AbstractConnectorSetting';
    me.className = 'abstractConnectorSetting';
    me.constructor = arguments.callee;
    return me;
};

// abstractDemand : comingOutOperation
Model.AbstractDemand = function (obj) {
    var me = new Model.ComingOutOperation(obj);
    // properties
    me.customerOrderUuid = null;
    me.factureUuid = null;
    me.customerOrderId = null;
    me.factureId = null;
    me.invoicesOutUuid = null;
    me.invoicesOut = null;
    me.payments = null;
    me.salesPreturns = null;
    me.paymentsUuid = null;
    me.shipmentOut = null;
    me.salesReturnsUuid = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'AbstractDemand';
    me.className = 'abstractDemand';
    me.constructor = arguments.callee;
    return me;
};

// abstractGood : goodFolder
Model.AbstractGood = function (obj) {
    var me = new Model.GoodFolder(obj);
    // properties
    me.minPrice = null;
    me.uomUuid = null;
    me.countryUuid = null;
    me.supplierUuid = null;
    me.salePrice = null;
    me.saleCurrencyUuid = null;
    me.buyCurrencyUuid = null;
    me.buyCurrencyId = null;
    me.countryId = null;
    me.saleCurrencyId = null;
    me.supplierId = null;
    me.uomId = null;
    me.barcode = null;
    me.salePrices = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'AbstractGood';
    me.className = 'abstractGood';
    me.constructor = arguments.callee;
    return me;
};

// abstractSalesReturn : comingInOperation
Model.AbstractSalesReturn = function (obj) {
    var me = new Model.ComingInOperation(obj);
    // properties
    me.demandUuid = null;
    me.demandId = null;
    me.lossesUuid = null;
    me.losses = null;
    me.payments = null;
    me.paymentsUuid = null;
    me.salesReturnPosition = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'AbstractSalesReturn';
    me.className = 'abstractSalesReturn';
    me.constructor = arguments.callee;
    return me;
};

// abstractShipmentOut : comingOut
Model.AbstractShipmentOut = function (obj) {
    var me = new Model.ComingOut(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'AbstractShipmentOut';
    me.className = 'abstractShipmentOut';
    me.constructor = arguments.callee;
    return me;
};

// accountEntity : object
Model.AccountEntity = function (obj) {
    var me = new Model.BaseObject(obj);
    // properties
    me.accountUuid = null;
    me.accountId = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'AccountEntity';
    me.className = 'accountEntity';
    me.constructor = arguments.callee;
    return me;
};

// agent : legendEntity
Model.Agent = function (obj) {
    var me = new Model.LegendEntity(obj);
    // properties
    me.discount = null;
    me.autoDiscount = null;
    me.stateId = null;
    me.discountCardNumber = null;
    me.discountCorrection = null;
    me.stateUuid = null;
    me.employeeUuid = null;
    me.priceTypeUuid = null;
    me.archived = null;
    me.created = null;
    me.employeeId = null;
    me.priceTypeId = null;
    me.attribute = null;
    me.requisite = null;
    me.contact = null;
    me.contactPerson = null;
    me.agentNewsItem = null;
    me.tags = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'Agent';
    me.className = 'agent';
    me.constructor = arguments.callee;
    return me;
};

// agentAttributeValue : attributeValue
Model.AgentAttributeValue = function (obj) {
    var me = new Model.AttributeValue(obj);
    // properties
    me.agentUuid = null;
    me.agentId = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'AgentAttributeValue';
    me.className = 'agentAttributeValue';
    me.constructor = arguments.callee;
    return me;
};

// agentNewsItem : infoEntity
Model.AgentNewsItem = function (obj) {
    var me = new Model.InfoEntity(obj);
    // properties
    me.moment = null;
    me.text = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'AgentNewsItem';
    me.className = 'agentNewsItem';
    me.constructor = arguments.callee;
    return me;
};

// agentPictureDocument : document
Model.AgentPictureDocument = function (obj) {
    var me = new Model.Document(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'AgentPictureDocument';
    me.className = 'agentPictureDocument';
    me.constructor = arguments.callee;
    return me;
};

// amiroConnectorSettings : operationConnectorSetting
Model.AmiroConnectorSettings = function (obj) {
    var me = new Model.OperationConnectorSetting(obj);
    // properties
    me.commentsColumnNum = null;
    me.customerAddressColumnNum = null;
    me.customerCodeColumnNum = null;
    me.customerEmailColumnNum = null;
    me.customerFirstNameColumnNum = null;
    me.customerLastNameColumnNum = null;
    me.customerNickColumnNum = null;
    me.customerPhoneColumnNum = null;
    me.goodIdColumnNum = null;
    me.goodNameColumnNum = null;
    me.orderDateColumnNum = null;
    me.orderIdColumnNum = null;
    me.prefixForAgent = null;
    me.prefixForGood = null;
    me.prefixForOperation = null;
    me.priceColumnNum = null;
    me.quantityColumnNum = null;
    me.shippingAmountColumnNum = null;
    me.stateColumnNum = null;
    me.taxColumnNum = null;
    me.customAttribute = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'AmiroConnectorSettings';
    me.className = 'amiroConnectorSettings';
    me.constructor = arguments.callee;
    return me;
};

// amiroCustomAttributeInfo : entity
Model.AmiroCustomAttributeInfo = function (obj) {
    var me = new Model.Entity(obj);
    // properties
    me.columnNumber = null;
    me.name = null;
    me.settingsId = null;
    me.settingsUuid = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'AmiroCustomAttributeInfo';
    me.className = 'amiroCustomAttributeInfo';
    me.constructor = arguments.callee;
    return me;
};

// attachedDocument : document
Model.AttachedDocument = function (obj) {
    var me = new Model.Document(obj);
    // properties
    me.emailedDate = null;
    me.publicId = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'AttachedDocument';
    me.className = 'attachedDocument';
    me.constructor = arguments.callee;
    return me;
};

// attachmentDocument : document
Model.AttachmentDocument = function (obj) {
    var me = new Model.Document(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'AttachmentDocument';
    me.className = 'attachmentDocument';
    me.constructor = arguments.callee;
    return me;
};

// attributeMetadata : legendEntity
Model.AttributeMetadata = function (obj) {
    var me = new Model.LegendEntity(obj);
    // properties
    me.attrType = null;
    me.dictionaryMetadataUuid = null;
    me.entityMetadataUuid = null;
    me.feature = null;
    me.dictionaryMetadataId = null;
    me.entityMetadataId = null;
    me.position = null;
    me.required = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'AttributeMetadata';
    me.className = 'attributeMetadata';
    me.constructor = arguments.callee;
    return me;
};

// attributeValue : infoEntity
Model.AttributeValue = function (obj) {
    var me = new Model.InfoEntity(obj);
    // properties
    me.metadataUuid = null;
    me.valueText = null;
    me.valueString = null;
    me.doubleValue = null;
    me.longValue = null;
    me.booleanValue = null;
    me.timeValue = null;
    me.entityValueUuid = null;
    me.agentValueUuid = null;
    me.goodValueUuid = null;
    me.placeValueUuid = null;
    me.consignmentValueUuid = null;
    me.contractValueUuid = null;
    me.projectValueUuid = null;
    me.employeeValueUuid = null;
    me.agentValueId = null;
    me.consignmentValueId = null;
    me.contractValueId = null;
    me.employeeValueId = null;
    me.entityValueId = null;
    me.goodValueId = null;
    me.metadataId = null;
    me.placeValueId = null;
    me.projectValueId = null;
    me.file = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'AttributeValue';
    me.className = 'attributeValue';
    me.constructor = arguments.callee;
    return me;
};

// bankAccount : object
Model.BankAccount = function (obj) {
    var me = new Model.BaseObject(obj);
    // properties
    me.bankName = null;
    me.bankLocation = null;
    me.accountNumber = null;
    me.correspondentAccount = null;
    me.bic = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'BankAccount';
    me.className = 'bankAccount';
    me.constructor = arguments.callee;
    return me;
};

// barcode : abstractBarcode
Model.Barcode = function (obj) {
    var me = new Model.AbstractBarcode(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'Barcode';
    me.className = 'barcode';
    me.constructor = arguments.callee;
    return me;
};

// cashIn : abstractCashIn
Model.CashIn = function (obj) {
    var me = new Model.AbstractCashIn(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'CashIn';
    me.className = 'cashIn';
    me.constructor = arguments.callee;
    return me;
};

// cashOut : abstractCashOut
Model.CashOut = function (obj) {
    var me = new Model.AbstractCashOut(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'CashOut';
    me.className = 'cashOut';
    me.constructor = arguments.callee;
    return me;
};

// classifier : legendEntity
Model.Classifier = function (obj) {
    var me = new Model.LegendEntity(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'Classifier';
    me.className = 'classifier';
    me.constructor = arguments.callee;
    return me;
};

// cmlConnectorSettings : operationConnectorSetting
Model.CmlConnectorSettings = function (obj) {
    var me = new Model.OperationConnectorSetting(obj);
    // properties
    me.features = null;
    me.goodFolderUuid = null;
    me.goodFolderId = null;
    me.priceTypeId = null;
    me.stockplaceId = null;
    me.priceTypeUuid = null;
    me.shopType = null;
    me.stockActive = null;
    me.stockplaceUuid = null;
    me.stockPollPeriod = null;
    me.syncFeatures = null;
    me.syncOrderState = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'CmlConnectorSettings';
    me.className = 'cmlConnectorSettings';
    me.constructor = arguments.callee;
    return me;
};

// collection : object
Model.Collection = function (obj) {
    var me = new Model.BaseObject(obj);
    // properties
    me.total = null;
    me.start = null;
    me.count = null;
    me.items = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'Collection';
    me.className = 'collection';
    me.constructor = arguments.callee;
    return me;
};

// collectionContainer : object
Model.CollectionContainer = function (obj) {
    var me = new Model.BaseObject(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'CollectionContainer';
    me.className = 'collectionContainer';
    me.constructor = arguments.callee;
    return me;
};

// comingIn : stockMotion
Model.ComingIn = function (obj) {
    var me = new Model.StockMotion(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'ComingIn';
    me.className = 'comingIn';
    me.constructor = arguments.callee;
    return me;
};

// comingInOperation : stockOperation
Model.ComingInOperation = function (obj) {
    var me = new Model.StockOperation(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'ComingInOperation';
    me.className = 'comingInOperation';
    me.constructor = arguments.callee;
    return me;
};

// comingOut : stockMotion
Model.ComingOut = function (obj) {
    var me = new Model.StockMotion(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'ComingOut';
    me.className = 'comingOut';
    me.constructor = arguments.callee;
    return me;
};

// comingOutOperation : stockOperation
Model.ComingOutOperation = function (obj) {
    var me = new Model.StockOperation(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'ComingOutOperation';
    me.className = 'comingOutOperation';
    me.constructor = arguments.callee;
    return me;
};

// company : agent
Model.Company = function (obj) {
    var me = new Model.Agent(obj);
    // properties
    me.director = null;
    me.chiefAccountant = null;
    me.payerVat = null;
    me.companyType = null;
    me.sign = null;
    me.stamp = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'Company';
    me.className = 'company';
    me.constructor = arguments.callee;
    return me;
};

// consignment : legendEntity
Model.Consignment = function (obj) {
    var me = new Model.LegendEntity(obj);
    // properties
    me.goodUuid = null;
    me.isDefault = null;
    me.goodId = null;
    me.barcode = null;
    me.attribute = null;
    me.feature = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'Consignment';
    me.className = 'consignment';
    me.constructor = arguments.callee;
    return me;
};

// consignmentAttributeValue : attributeValue
Model.ConsignmentAttributeValue = function (obj) {
    var me = new Model.AttributeValue(obj);
    // properties
    me.consignmentUuid = null;
    me.consignmentId = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'ConsignmentAttributeValue';
    me.className = 'consignmentAttributeValue';
    me.constructor = arguments.callee;
    return me;
};

// consignmentBarcode : abstractBarcode
Model.ConsignmentBarcode = function (obj) {
    var me = new Model.AbstractBarcode(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'ConsignmentBarcode';
    me.className = 'consignmentBarcode';
    me.constructor = arguments.callee;
    return me;
};

// contact : object
Model.Contact = function (obj) {
    var me = new Model.BaseObject(obj);
    // properties
    me.address = null;
    me.phones = null;
    me.faxes = null;
    me.mobiles = null;
    me.email = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'Contact';
    me.className = 'contact';
    me.constructor = arguments.callee;
    return me;
};

// contactPerson : legendEntity
Model.ContactPerson = function (obj) {
    var me = new Model.LegendEntity(obj);
    // properties
    me.email = null;
    me.phone = null;
    me.position = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'ContactPerson';
    me.className = 'contactPerson';
    me.constructor = arguments.callee;
    return me;
};

// contract : legendEntity
Model.Contract = function (obj) {
    var me = new Model.LegendEntity(obj);
    // properties
    me.agentUuid = null;
    me.currencyUuid = null;
    me.moment = null;
    me.agentId = null;
    me.currencyId = null;
    me.ownCompanyId = null;
    me.ownCompanyUuid = null;
    me.attribute = null;
    me.document = null;
    me.sum = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'Contract';
    me.className = 'contract';
    me.constructor = arguments.callee;
    return me;
};

// contractAttributeValue : attributeValue
Model.ContractAttributeValue = function (obj) {
    var me = new Model.AttributeValue(obj);
    // properties
    me.contractUuid = null;
    me.contractId = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'ContractAttributeValue';
    me.className = 'contractAttributeValue';
    me.constructor = arguments.callee;
    return me;
};

// contractDocument : attachedDocument
Model.ContractDocument = function (obj) {
    var me = new Model.AttachedDocument(obj);
    // properties
    me.contractUuid = null;
    me.contractId = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'ContractDocument';
    me.className = 'contractDocument';
    me.constructor = arguments.callee;
    return me;
};

// country : predefinedLegendableEntity
Model.Country = function (obj) {
    var me = new Model.PredefinedLegendableEntity(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'Country';
    me.className = 'country';
    me.constructor = arguments.callee;
    return me;
};

// currency : legendEntity
Model.Currency = function (obj) {
    var me = new Model.LegendEntity(obj);
    // properties
    me.enteredRate = null;
    me.invertRate = null;
    me.rate = null;
    me.major = null;
    me.minor = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'Currency';
    me.className = 'currency';
    me.constructor = arguments.callee;
    return me;
};

// customEntity : legendEntity
Model.CustomEntity = function (obj) {
    var me = new Model.LegendEntity(obj);
    // properties
    me.entityMetadataUuid = null;
    me.entityMetadataId = null;
    me.attribute = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'CustomEntity';
    me.className = 'customEntity';
    me.constructor = arguments.callee;
    return me;
};

// customEntityAttributeValue : attributeValue
Model.CustomEntityAttributeValue = function (obj) {
    var me = new Model.AttributeValue(obj);
    // properties
    me.customEntityUuid = null;
    me.customEntityId = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'CustomEntityAttributeValue';
    me.className = 'customEntityAttributeValue';
    me.constructor = arguments.callee;
    return me;
};

// customEntityMetadata : entityMetadata
Model.CustomEntityMetadata = function (obj) {
    var me = new Model.EntityMetadata(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'CustomEntityMetadata';
    me.className = 'customEntityMetadata';
    me.constructor = arguments.callee;
    return me;
};

// customerOrder : order
Model.CustomerOrder = function (obj) {
    var me = new Model.Order(obj);
    // properties
    me.demandsUuid = null;
    me.invoicesOutUuid = null;
    me.demands = null;
    me.invoicesOut = null;
    me.payments = null;
    me.purchaseOrders = null;
    me.paymentsUuid = null;
    me.customerOrderPosition = null;
    me.purchaseOrdersUuid = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'CustomerOrder';
    me.className = 'customerOrder';
    me.constructor = arguments.callee;
    return me;
};

// customerOrderPosition : orderPosition
Model.CustomerOrderPosition = function (obj) {
    var me = new Model.OrderPosition(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'CustomerOrderPosition';
    me.className = 'customerOrderPosition';
    me.constructor = arguments.callee;
    return me;
};

// demand : abstractDemand
Model.Demand = function (obj) {
    var me = new Model.AbstractDemand(obj);
    // properties
    me.extension = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'Demand';
    me.className = 'demand';
    me.constructor = arguments.callee;
    return me;
};

// demandExtension : operationExtension
Model.DemandExtension = function (obj) {
    var me = new Model.OperationExtension(obj);
    // properties
    me.opened = null;
    me.carrierUuid = null;
    me.loadName = null;
    me.consignorIndication = null;
    me.transportFacility = null;
    me.goodPackQuantity = null;
    me.carNumber = null;
    me.carrierId = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'DemandExtension';
    me.className = 'demandExtension';
    me.constructor = arguments.callee;
    return me;
};

// document : legendEntity
Model.Document = function (obj) {
    var me = new Model.LegendEntity(obj);
    // properties
    me.created = null;
    me.filename = null;
    me.miniatureUuid = null;
    me.miniatureId = null;
    me.contents = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'Document';
    me.className = 'document';
    me.constructor = arguments.callee;
    return me;
};

// documentMiniature : document
Model.DocumentMiniature = function (obj) {
    var me = new Model.Document(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'DocumentMiniature';
    me.className = 'documentMiniature';
    me.constructor = arguments.callee;
    return me;
};

// embeddedEntityMetadata : entityMetadata
Model.EmbeddedEntityMetadata = function (obj) {
    var me = new Model.EntityMetadata(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'EmbeddedEntityMetadata';
    me.className = 'embeddedEntityMetadata';
    me.constructor = arguments.callee;
    return me;
};

// employee : legendEntity
Model.Employee = function (obj) {
    var me = new Model.LegendEntity(obj);
    // properties
    me.city = null;
    me.email = null;
    me.fax = null;
    me.firstName = null;
    me.icqNumber = null;
    me.lastName = null;
    me.middleName = null;
    me.mobile = null;
    me.uid = null;
    me.phone = null;
    me.postalAddress = null;
    me.postalCode = null;
    me.skypeName = null;
    me.attribute = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'Employee';
    me.className = 'employee';
    me.constructor = arguments.callee;
    return me;
};

// employeeAttributeValue : attributeValue
Model.EmployeeAttributeValue = function (obj) {
    var me = new Model.AttributeValue(obj);
    // properties
    me.employeeUuid = null;
    me.employeeId = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'EmployeeAttributeValue';
    me.className = 'employeeAttributeValue';
    me.constructor = arguments.callee;
    return me;
};

// enter : comingInOperation
Model.Enter = function (obj) {
    var me = new Model.ComingInOperation(obj);
    // properties
    me.inventoryUuid = null;
    me.inventoryId = null;
    me.enterPosition = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'Enter';
    me.className = 'enter';
    me.constructor = arguments.callee;
    return me;
};

// enterPosition : comingIn
Model.EnterPosition = function (obj) {
    var me = new Model.ComingIn(obj);
    // properties
    me.tags = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'EnterPosition';
    me.className = 'enterPosition';
    me.constructor = arguments.callee;
    return me;
};

// entity : accountEntity
Model.Entity = function (obj) {
    var me = new Model.AccountEntity(obj);
    // properties
    me.readMode = null;
    me.changeMode = null;
    me.groupId = null;
    me.company = null;
    me.id = null;
    me.uuid = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'Entity';
    me.className = 'entity';
    me.constructor = arguments.callee;
    return me;
};

// entityMetadata : legendEntity
Model.EntityMetadata = function (obj) {
    var me = new Model.LegendEntity(obj);
    // properties
    me.uniqueCode = null;
    me.codeValueType = null;
    me.independentNameGenerator = null;
    me.barcodeGen = null;
    me.barcodeGenPref = null;
    me.editOnlyByAuthor = null;
    me.noEditFromOtherPlaceSource = null;
    me.noApplicableFromOtherPlaceSource = null;
    me.noEditFromOtherPlaceTarget = null;
    me.noApplicableFromOtherPlaceTarget = null;
    me.editablePeriod = null;
    me.editableCalendarDays = null;
    me.editableWorkDays = null;
    me.editableFromDate = null;
    me.attributeMetadata = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'EntityMetadata';
    me.className = 'entityMetadata';
    me.constructor = arguments.callee;
    return me;
};

// entityTemplatesMetadata : templatesMetadata
Model.EntityTemplatesMetadata = function (obj) {
    var me = new Model.TemplatesMetadata(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'EntityTemplatesMetadata';
    me.className = 'entityTemplatesMetadata';
    me.constructor = arguments.callee;
    return me;
};

// error : object
Model.Error = function (obj) {
    var me = new Model.BaseObject(obj);
    // properties
    me.uid = null;
    me.moment = null;
    me.message = null;
    me.stack = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'Error';
    me.className = 'error';
    me.constructor = arguments.callee;
    return me;
};

// exchangeContainer : object
Model.ExchangeContainer = function (obj) {
    var me = new Model.BaseObject(obj);
    // properties
    me.workflow = null;
    me.shareModes = null;
    me.customEntityMetadata = null;
    me.embeddedEntityMetadata = null;
    me.entityTemplatesMetadata = null;
    me.reportTemplatesMetadata = null;
    me.customEntity = null;
    me.currencies = null;
    me.country = null;
    me.gtd = null;
    me.uoms = null;
    me.myCompany = null;
    me.agents = null;
    me.companies = null;
    me.goodFolders = null;
    me.goods = null;
    me.service = null;
    me.things = null;
    me.employees = null;
    me.places = null;
    me.warehouses = null;
    me.project = null;
    me.contract = null;
    me.processingPlans = null;
    me.features = null;
    me.consignments = null;
    me.priceLists = null;
    me.paymentIn = null;
    me.paymentOut = null;
    me.factureIn = null;
    me.factureOut = null;
    me.cashIn = null;
    me.cashOut = null;
    me.deliveries_demand = null;
    me.deliveries_supply = null;
    me.retailCashIn = null;
    me.retailCashOut = null;
    me.retailDemand = null;
    me.retailSalesReturn = null;
    me.inventories = null;
    me.moves = null;
    me.losses = null;
    me.enters = null;
    me.invoicesIn = null;
    me.invoicesOut = null;
    me.salesReturns = null;
    me.purchaseReturns = null;
    me.processings = null;
    me.customerOrders = null;
    me.purchaseOrders = null;
    me.internalOrders = null;
    me.proccessingOrders = null;
    me.amiroConnectors = null;
    me.cmlConnectors = null;
    me.ymlConnectors = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'ExchangeContainer';
    me.className = 'exchangeContainer';
    me.constructor = arguments.callee;
    return me;
};

// facture : operationWithPositions
Model.Facture = function (obj) {
    var me = new Model.OperationWithPositions(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'Facture';
    me.className = 'facture';
    me.constructor = arguments.callee;
    return me;
};

// factureIn : facture
Model.FactureIn = function (obj) {
    var me = new Model.Facture(obj);
    // properties
    me.incomingDate = null;
    me.incomingNumber = null;
    me.payments = null;
    me.supplies = null;
    me.paymentsUuid = null;
    me.suppliesUuid = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'FactureIn';
    me.className = 'factureIn';
    me.constructor = arguments.callee;
    return me;
};

// factureOut : facture
Model.FactureOut = function (obj) {
    var me = new Model.Facture(obj);
    // properties
    me.paymentDate = null;
    me.paymentNumber = null;
    me.demandsUuid = null;
    me.extension = null;
    me.demands = null;
    me.payments = null;
    me.returns = null;
    me.paymentsUuid = null;
    me.returnsUuid = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'FactureOut';
    me.className = 'factureOut';
    me.constructor = arguments.callee;
    return me;
};

// factureOutExtension : operationExtension
Model.FactureOutExtension = function (obj) {
    var me = new Model.OperationExtension(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'FactureOutExtension';
    me.className = 'factureOutExtension';
    me.constructor = arguments.callee;
    return me;
};

// feature : infoEntity
Model.Feature = function (obj) {
    var me = new Model.InfoEntity(obj);
    // properties
    me.goodId = null;
    me.externalcode = null;
    me.attribute = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'Feature';
    me.className = 'feature';
    me.constructor = arguments.callee;
    return me;
};

// featureAttributeValue : attributeValue
Model.FeatureAttributeValue = function (obj) {
    var me = new Model.AttributeValue(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'FeatureAttributeValue';
    me.className = 'featureAttributeValue';
    me.constructor = arguments.callee;
    return me;
};

// finance : operation
Model.Finance = function (obj) {
    var me = new Model.Operation(obj);
    // properties
    me.paymentPurpose = null;
    me.vatSum = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'Finance';
    me.className = 'finance';
    me.constructor = arguments.callee;
    return me;
};

// financeIn : finance
Model.FinanceIn = function (obj) {
    var me = new Model.Finance(obj);
    // properties
    me.customerOrderUuid = null;
    me.factureOutUuid = null;
    me.invoiceOutUuid = null;
    me.customerOrderId = null;
    me.factureId = null;
    me.invoiceOutId = null;
    me.purchaseReturnId = null;
    me.purchaseReturnUuid = null;
    me.demandsUuid = null;
    me.demands = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'FinanceIn';
    me.className = 'financeIn';
    me.constructor = arguments.callee;
    return me;
};

// financeOut : finance
Model.FinanceOut = function (obj) {
    var me = new Model.Finance(obj);
    // properties
    me.factureInUuid = null;
    me.invoiceInUuid = null;
    me.factureId = null;
    me.invoiceInId = null;
    me.purchaseOrderId = null;
    me.salesReturnId = null;
    me.supplyId = null;
    me.purchaseOrderUuid = null;
    me.salesReturnUuid = null;
    me.supplyUuid = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'FinanceOut';
    me.className = 'financeOut';
    me.constructor = arguments.callee;
    return me;
};

// good : abstractGood
Model.Good = function (obj) {
    var me = new Model.AbstractGood(obj);
    // properties
    me.isSerialTrackable = null;
    me.buyPrice = null;
    me.minimumBalance = null;
    me.weight = null;
    me.volume = null;
    me.pack = null;
    me.preferences = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'Good';
    me.className = 'good';
    me.constructor = arguments.callee;
    return me;
};

// goodAttributeValue : attributeValue
Model.GoodAttributeValue = function (obj) {
    var me = new Model.AttributeValue(obj);
    // properties
    me.goodUuid = null;
    me.goodId = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'GoodAttributeValue';
    me.className = 'goodAttributeValue';
    me.constructor = arguments.callee;
    return me;
};

// goodFolder : classifier
Model.GoodFolder = function (obj) {
    var me = new Model.Classifier(obj);
    // properties
    me.archived = null;
    me.parentId = null;
    me.parentUuid = null;
    me.productCode = null;
    me.vat = null;
    me.attribute = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'GoodFolder';
    me.className = 'goodFolder';
    me.constructor = arguments.callee;
    return me;
};

// goodPack : entity
Model.GoodPack = function (obj) {
    var me = new Model.Entity(obj);
    // properties
    me.uomId = null;
    me.quantity = null;
    me.uomUuid = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'GoodPack';
    me.className = 'goodPack';
    me.constructor = arguments.callee;
    return me;
};

// goodPrices : object
Model.GoodPrices = function (obj) {
    var me = new Model.BaseObject(obj);
    // properties
    me.price = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'GoodPrices';
    me.className = 'goodPrices';
    me.constructor = arguments.callee;
    return me;
};

// goodSlotPreference : entity
Model.GoodSlotPreference = function (obj) {
    var me = new Model.Entity(obj);
    // properties
    me.slotId = null;
    me.slotUuid = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'GoodSlotPreference';
    me.className = 'goodSlotPreference';
    me.constructor = arguments.callee;
    return me;
};

// gtd : legendEntity
Model.Gtd = function (obj) {
    var me = new Model.LegendEntity(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'Gtd';
    me.className = 'gtd';
    me.constructor = arguments.callee;
    return me;
};

// infoEntity : entity
Model.InfoEntity = function (obj) {
    var me = new Model.Entity(obj);
    // properties
    me.updated = null;
    me.updatedBy = null;
    me.deleted = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'InfoEntity';
    me.className = 'infoEntity';
    me.constructor = arguments.callee;
    return me;
};

// internalOrder : order
Model.InternalOrder = function (obj) {
    var me = new Model.Order(obj);
    // properties
    me.purchaseOrderPosition = null;
    me.purchaseOrdersUuid = null;
    me.demandsUuid = null;
    me.demands = null;
    me.purchaseOrders = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'InternalOrder';
    me.className = 'internalOrder';
    me.constructor = arguments.callee;
    return me;
};

// inventory : operationWithPositions
Model.Inventory = function (obj) {
    var me = new Model.OperationWithPositions(obj);
    // properties
    me.entersUuid = null;
    me.lossesUuid = null;
    me.enters = null;
    me.losses = null;
    me.inventoryPosition = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'Inventory';
    me.className = 'inventory';
    me.constructor = arguments.callee;
    return me;
};

// inventoryPosition : motion
Model.InventoryPosition = function (obj) {
    var me = new Model.Motion(obj);
    // properties
    me.correctionAmount = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'InventoryPosition';
    me.className = 'inventoryPosition';
    me.constructor = arguments.callee;
    return me;
};

// invoice : operationWithPositions
Model.Invoice = function (obj) {
    var me = new Model.OperationWithPositions(obj);
    // properties
    me.paymentPlannedMoment = null;
    me.invoicePosition = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'Invoice';
    me.className = 'invoice';
    me.constructor = arguments.callee;
    return me;
};

// invoiceIn : invoice
Model.InvoiceIn = function (obj) {
    var me = new Model.Invoice(obj);
    // properties
    me.incomingDate = null;
    me.incomingNumber = null;
    me.purchaseOrderId = null;
    me.purchaseOrderUuid = null;
    me.financesOutUuid = null;
    me.financesOut = null;
    me.supplies = null;
    me.suppliesUuid = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'InvoiceIn';
    me.className = 'invoiceIn';
    me.constructor = arguments.callee;
    return me;
};

// invoiceOut : invoice
Model.InvoiceOut = function (obj) {
    var me = new Model.Invoice(obj);
    // properties
    me.customerOrderUuid = null;
    me.customerOrderId = null;
    me.demandsUuid = null;
    me.paymentsUuid = null;
    me.demands = null;
    me.payments = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'InvoiceOut';
    me.className = 'invoiceOut';
    me.constructor = arguments.callee;
    return me;
};

// invoicePosition : motion
Model.InvoicePosition = function (obj) {
    var me = new Model.Motion(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'InvoicePosition';
    me.className = 'invoicePosition';
    me.constructor = arguments.callee;
    return me;
};

// legendEntity : infoEntity
Model.LegendEntity = function (obj) {
    var me = new Model.InfoEntity(obj);
    // properties
    me.name = null;
    me.code = null;
    me.externalcode = null;
    me.description = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'LegendEntity';
    me.className = 'legendEntity';
    me.constructor = arguments.callee;
    return me;
};

// loss : comingOutOperation
Model.Loss = function (obj) {
    var me = new Model.ComingOutOperation(obj);
    // properties
    me.inventoryUuid = null;
    me.inventoryId = null;
    me.salesReturnId = null;
    me.salesReturnUuid = null;
    me.lossPosition = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'Loss';
    me.className = 'loss';
    me.constructor = arguments.callee;
    return me;
};

// lossPosition : comingOut
Model.LossPosition = function (obj) {
    var me = new Model.ComingOut(obj);
    // properties
    me.tags = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'LossPosition';
    me.className = 'lossPosition';
    me.constructor = arguments.callee;
    return me;
};

// material : processingPlanItem
Model.Material = function (obj) {
    var me = new Model.ProcessingPlanItem(obj);
    // properties
    me.isOptional = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'Material';
    me.className = 'material';
    me.constructor = arguments.callee;
    return me;
};

// moneyAmount : object
Model.MoneyAmount = function (obj) {
    var me = new Model.BaseObject(obj);
    // properties
    me.sum = null;
    me.sumInCurrency = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'MoneyAmount';
    me.className = 'moneyAmount';
    me.constructor = arguments.callee;
    return me;
};

// motion : entity
Model.Motion = function (obj) {
    var me = new Model.Entity(obj);
    // properties
    me.discount = null;
    me.quantity = null;
    me.goodPackUuid = null;
    me.consignmentUuid = null;
    me.goodUuid = null;
    me.slotUuid = null;
    me.vat = null;
    me.consignmentId = null;
    me.goodId = null;
    me.goodPackId = null;
    me.slotId = null;
    me.basePrice = null;
    me.price = null;
    me.things = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'Motion';
    me.className = 'motion';
    me.constructor = arguments.callee;
    return me;
};

// move : stockOperation
Model.Move = function (obj) {
    var me = new Model.StockOperation(obj);
    // properties
    me.internalOrderUuid = null;
    me.internalOrderId = null;
    me.movePosition = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'Move';
    me.className = 'move';
    me.constructor = arguments.callee;
    return me;
};

// movePosition : stockMotion
Model.MovePosition = function (obj) {
    var me = new Model.StockMotion(obj);
    // properties
    me.sourceSlotId = null;
    me.sourceSlotUuid = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'MovePosition';
    me.className = 'movePosition';
    me.constructor = arguments.callee;
    return me;
};

// myCompany : company
Model.MyCompany = function (obj) {
    var me = new Model.Company(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'MyCompany';
    me.className = 'myCompany';
    me.constructor = arguments.callee;
    return me;
};

// operation : legendEntity
Model.Operation = function (obj) {
    var me = new Model.LegendEntity(obj);
    // properties
    me.stateUuid = null;
    me.targetAgentUuid = null;
    me.sourceAgentUuid = null;
    me.targetStoreUuid = null;
    me.sourceStoreUuid = null;
    me.applicable = null;
    me.projectUuid = null;
    me.contractUuid = null;
    me.moment = null;
    me.payerVat = null;
    me.retailStoreUuid = null;
    me.currencyUuid = null;
    me.rate = null;
    me.vatIncluded = null;
    me.created = null;
    me.createdBy = null;
    me.employeeUuid = null;
    me.contractId = null;
    me.currencyId = null;
    me.projectId = null;
    me.retailStoreId = null;
    me.sourceAgentId = null;
    me.sourceStoreId = null;
    me.stateId = null;
    me.targetAgentId = null;
    me.targetStoreId = null;
    me.attribute = null;
    me.document = null;
    me.sum = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'Operation';
    me.className = 'operation';
    me.constructor = arguments.callee;
    return me;
};

// operationAttributeValue : attributeValue
Model.OperationAttributeValue = function (obj) {
    var me = new Model.AttributeValue(obj);
    // properties
    me.operationUuid = null;
    me.operationId = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'OperationAttributeValue';
    me.className = 'operationAttributeValue';
    me.constructor = arguments.callee;
    return me;
};

// operationConnectorSetting : abstractConnectorSetting
Model.OperationConnectorSetting = function (obj) {
    var me = new Model.AbstractConnectorSetting(obj);
    // properties
    me.adminDomain = null;
    me.autoReserve = null;
    me.orderplaceId = null;
    me.orderplaceUuid = null;
    me.shopDomain = null;
    me.useShopOperationName = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'OperationConnectorSetting';
    me.className = 'operationConnectorSetting';
    me.constructor = arguments.callee;
    return me;
};

// operationDocument : attachedDocument
Model.OperationDocument = function (obj) {
    var me = new Model.AttachedDocument(obj);
    // properties
    me.operationId = null;
    me.operationUuid = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'OperationDocument';
    me.className = 'operationDocument';
    me.constructor = arguments.callee;
    return me;
};

// operationExtension : object
Model.OperationExtension = function (obj) {
    var me = new Model.BaseObject(obj);
    // properties
    me.consigneeUuid = null;
    me.consigneeId = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'OperationExtension';
    me.className = 'operationExtension';
    me.constructor = arguments.callee;
    return me;
};

// operationWithPositions : operation
Model.OperationWithPositions = function (obj) {
    var me = new Model.Operation(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'OperationWithPositions';
    me.className = 'operationWithPositions';
    me.constructor = arguments.callee;
    return me;
};

// order : operationWithPositions
Model.Order = function (obj) {
    var me = new Model.OperationWithPositions(obj);
    // properties
    me.deliveryPlannedMoment = null;
    me.reservedSum = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'Order';
    me.className = 'order';
    me.constructor = arguments.callee;
    return me;
};

// orderPosition : motion
Model.OrderPosition = function (obj) {
    var me = new Model.Motion(obj);
    // properties
    me.reserve = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'OrderPosition';
    me.className = 'orderPosition';
    me.constructor = arguments.callee;
    return me;
};

// paymentIn : financeIn
Model.PaymentIn = function (obj) {
    var me = new Model.FinanceIn(obj);
    // properties
    me.incomingDate = null;
    me.incomingNumber = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'PaymentIn';
    me.className = 'paymentIn';
    me.constructor = arguments.callee;
    return me;
};

// paymentOut : financeOut
Model.PaymentOut = function (obj) {
    var me = new Model.FinanceOut(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'PaymentOut';
    me.className = 'paymentOut';
    me.constructor = arguments.callee;
    return me;
};

// place : classifier
Model.Place = function (obj) {
    var me = new Model.Classifier(obj);
    // properties
    me.parentUuid = null;
    me.parentId = null;
    me.contact = null;
    me.attribute = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'Place';
    me.className = 'place';
    me.constructor = arguments.callee;
    return me;
};

// placeAttributeValue : attributeValue
Model.PlaceAttributeValue = function (obj) {
    var me = new Model.AttributeValue(obj);
    // properties
    me.placeUuid = null;
    me.placeId = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'PlaceAttributeValue';
    me.className = 'placeAttributeValue';
    me.constructor = arguments.callee;
    return me;
};

// predefinedLegendableEntity : legendEntity
Model.PredefinedLegendableEntity = function (obj) {
    var me = new Model.LegendEntity(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'PredefinedLegendableEntity';
    me.className = 'predefinedLegendableEntity';
    me.constructor = arguments.callee;
    return me;
};

// price : entity
Model.Price = function (obj) {
    var me = new Model.Entity(obj);
    // properties
    me.currencyUuid = null;
    me.currencyId = null;
    me.priceTypeId = null;
    me.priceTypeUuid = null;
    me.value = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'Price';
    me.className = 'price';
    me.constructor = arguments.callee;
    return me;
};

// priceList : operationWithPositions
Model.PriceList = function (obj) {
    var me = new Model.OperationWithPositions(obj);
    // properties
    me.metadata = null;
    me.priceListRow = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'PriceList';
    me.className = 'priceList';
    me.constructor = arguments.callee;
    return me;
};

// priceListCell : entity
Model.PriceListCell = function (obj) {
    var me = new Model.Entity(obj);
    // properties
    me.columnName = null;
    me.sum = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'PriceListCell';
    me.className = 'priceListCell';
    me.constructor = arguments.callee;
    return me;
};

// priceListCellArray : object
Model.PriceListCellArray = function (obj) {
    var me = new Model.BaseObject(obj);
    // properties
    me.item = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'PriceListCellArray';
    me.className = 'priceListCellArray';
    me.constructor = arguments.callee;
    return me;
};

// priceListMetadata : legendEntity
Model.PriceListMetadata = function (obj) {
    var me = new Model.LegendEntity(obj);
    // properties
    me.priceTypeUuid = null;
    me.column = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'PriceListMetadata';
    me.className = 'priceListMetadata';
    me.constructor = arguments.callee;
    return me;
};

// priceListMetadataColumn : legendEntity
Model.PriceListMetadataColumn = function (obj) {
    var me = new Model.LegendEntity(obj);
    // properties
    me.percentageDiscount = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'PriceListMetadataColumn';
    me.className = 'priceListMetadataColumn';
    me.constructor = arguments.callee;
    return me;
};

// priceListRow : motion
Model.PriceListRow = function (obj) {
    var me = new Model.Motion(obj);
    // properties
    me.cell = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'PriceListRow';
    me.className = 'priceListRow';
    me.constructor = arguments.callee;
    return me;
};

// priceType : infoEntity
Model.PriceType = function (obj) {
    var me = new Model.InfoEntity(obj);
    // properties
    me.index = null;
    me.name = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'PriceType';
    me.className = 'priceType';
    me.constructor = arguments.callee;
    return me;
};

// processing : stockOperation
Model.Processing = function (obj) {
    var me = new Model.StockOperation(obj);
    // properties
    me.planId = null;
    me.processingOrderId = null;
    me.planUuid = null;
    me.processingOrderUuid = null;
    me.quantity = null;
    me.material = null;
    me.results = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'Processing';
    me.className = 'processing';
    me.constructor = arguments.callee;
    return me;
};

// processingOrder : order
Model.ProcessingOrder = function (obj) {
    var me = new Model.Order(obj);
    // properties
    me.planId = null;
    me.planUuid = null;
    me.quantity = null;
    me.purchaseOrderPosition = null;
    me.processings = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'ProcessingOrder';
    me.className = 'processingOrder';
    me.constructor = arguments.callee;
    return me;
};

// processingPlan : processingPlanFolder
Model.ProcessingPlan = function (obj) {
    var me = new Model.ProcessingPlanFolder(obj);
    // properties
    me.material = null;
    me.price = null;
    me.product = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'ProcessingPlan';
    me.className = 'processingPlan';
    me.constructor = arguments.callee;
    return me;
};

// processingPlanFolder : classifier
Model.ProcessingPlanFolder = function (obj) {
    var me = new Model.Classifier(obj);
    // properties
    me.parentId = null;
    me.parentUuid = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'ProcessingPlanFolder';
    me.className = 'processingPlanFolder';
    me.constructor = arguments.callee;
    return me;
};

// processingPlanItem : entity
Model.ProcessingPlanItem = function (obj) {
    var me = new Model.Entity(obj);
    // properties
    me.goodUuid = null;
    me.goodId = null;
    me.planId = null;
    me.planUuid = null;
    me.quantity = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'ProcessingPlanItem';
    me.className = 'processingPlanItem';
    me.constructor = arguments.callee;
    return me;
};

// processingPositionMaterial : comingOut
Model.ProcessingPositionMaterial = function (obj) {
    var me = new Model.ComingOut(obj);
    // properties
    me.planMaterialId = null;
    me.planMaterialUuid = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'ProcessingPositionMaterial';
    me.className = 'processingPositionMaterial';
    me.constructor = arguments.callee;
    return me;
};

// processingPositionResult : comingIn
Model.ProcessingPositionResult = function (obj) {
    var me = new Model.ComingIn(obj);
    // properties
    me.planResultId = null;
    me.planResultUuid = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'ProcessingPositionResult';
    me.className = 'processingPositionResult';
    me.constructor = arguments.callee;
    return me;
};

// product : processingPlanItem
Model.Product = function (obj) {
    var me = new Model.ProcessingPlanItem(obj);
    // properties
    me.costShare = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'Product';
    me.className = 'product';
    me.constructor = arguments.callee;
    return me;
};

// project : legendEntity
Model.Project = function (obj) {
    var me = new Model.LegendEntity(obj);
    // properties
    me.attribute = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'Project';
    me.className = 'project';
    me.constructor = arguments.callee;
    return me;
};

// projectAttributeValue : attributeValue
Model.ProjectAttributeValue = function (obj) {
    var me = new Model.AttributeValue(obj);
    // properties
    me.projectUuid = null;
    me.projectId = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'ProjectAttributeValue';
    me.className = 'projectAttributeValue';
    me.constructor = arguments.callee;
    return me;
};

// purchaseOrder : order
Model.PurchaseOrder = function (obj) {
    var me = new Model.Order(obj);
    // properties
    me.customerOrdersUuid = null;
    me.internalOrders = null;
    me.invoicesUuid = null;
    me.customerOrders = null;
    me.invoicesIn = null;
    me.payments = null;
    me.supplies = null;
    me.paymentsUuid = null;
    me.purchaseOrderPosition = null;
    me.suppliesUuid = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'PurchaseOrder';
    me.className = 'purchaseOrder';
    me.constructor = arguments.callee;
    return me;
};

// purchaseOrderPosition : orderPosition
Model.PurchaseOrderPosition = function (obj) {
    var me = new Model.OrderPosition(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'PurchaseOrderPosition';
    me.className = 'purchaseOrderPosition';
    me.constructor = arguments.callee;
    return me;
};

// purchaseReturn : comingOutOperation
Model.PurchaseReturn = function (obj) {
    var me = new Model.ComingOutOperation(obj);
    // properties
    me.factureUuid = null;
    me.factureId = null;
    me.supplyId = null;
    me.supplyUuid = null;
    me.payments = null;
    me.paymentsUuid = null;
    me.purchaseReturnPosition = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'PurchaseReturn';
    me.className = 'purchaseReturn';
    me.constructor = arguments.callee;
    return me;
};

// purchaseReturnPosition : abstractShipmentOut
Model.PurchaseReturnPosition = function (obj) {
    var me = new Model.AbstractShipmentOut(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'PurchaseReturnPosition';
    me.className = 'purchaseReturnPosition';
    me.constructor = arguments.callee;
    return me;
};

// reportTemplatesMetadata : templatesMetadata
Model.ReportTemplatesMetadata = function (obj) {
    var me = new Model.TemplatesMetadata(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'ReportTemplatesMetadata';
    me.className = 'reportTemplatesMetadata';
    me.constructor = arguments.callee;
    return me;
};

// requisite : object
Model.Requisite = function (obj) {
    var me = new Model.BaseObject(obj);
    // properties
    me.bankAccount = null;
    me.legalTitle = null;
    me.legalAddress = null;
    me.actualAddress = null;
    me.inn = null;
    me.kpp = null;
    me.okpo = null;
    me.ogrn = null;
    me.ogrnip = null;
    me.nomerSvidetelstva = null;
    me.dataSvidetelstva = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'Requisite';
    me.className = 'requisite';
    me.constructor = arguments.callee;
    return me;
};

// retailCashIn : abstractCashIn
Model.RetailCashIn = function (obj) {
    var me = new Model.AbstractCashIn(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'RetailCashIn';
    me.className = 'retailCashIn';
    me.constructor = arguments.callee;
    return me;
};

// retailCashOut : abstractCashOut
Model.RetailCashOut = function (obj) {
    var me = new Model.AbstractCashOut(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'RetailCashOut';
    me.className = 'retailCashOut';
    me.constructor = arguments.callee;
    return me;
};

// retailDemand : abstractDemand
Model.RetailDemand = function (obj) {
    var me = new Model.AbstractDemand(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'RetailDemand';
    me.className = 'retailDemand';
    me.constructor = arguments.callee;
    return me;
};

// retailSalesReturn : abstractSalesReturn
Model.RetailSalesReturn = function (obj) {
    var me = new Model.AbstractSalesReturn(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'RetailSalesReturn';
    me.className = 'retailSalesReturn';
    me.constructor = arguments.callee;
    return me;
};

// retailStore : legendEntity
Model.RetailStore = function (obj) {
    var me = new Model.LegendEntity(obj);
    // properties
    me.active = null;
    me.address = null;
    me.myCompanyUuid = null;
    me.myCompanyId = null;
    me.priceTypeId = null;
    me.warehouseId = null;
    me.priceTypeUuid = null;
    me.warehouseUuid = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'RetailStore';
    me.className = 'retailStore';
    me.constructor = arguments.callee;
    return me;
};

// salesReturn : abstractSalesReturn
Model.SalesReturn = function (obj) {
    var me = new Model.AbstractSalesReturn(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'SalesReturn';
    me.className = 'salesReturn';
    me.constructor = arguments.callee;
    return me;
};

// salesReturnPosition : comingIn
Model.SalesReturnPosition = function (obj) {
    var me = new Model.ComingIn(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'SalesReturnPosition';
    me.className = 'salesReturnPosition';
    me.constructor = arguments.callee;
    return me;
};

// service : abstractGood
Model.Service = function (obj) {
    var me = new Model.AbstractGood(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'Service';
    me.className = 'service';
    me.constructor = arguments.callee;
    return me;
};

// shareMode : legendEntity
Model.ShareMode = function (obj) {
    var me = new Model.LegendEntity(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'ShareMode';
    me.className = 'shareMode';
    me.constructor = arguments.callee;
    return me;
};

// shipmentIn : comingIn
Model.ShipmentIn = function (obj) {
    var me = new Model.ComingIn(obj);
    // properties
    me.overhead = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'ShipmentIn';
    me.className = 'shipmentIn';
    me.constructor = arguments.callee;
    return me;
};

// shipmentOut : abstractShipmentOut
Model.ShipmentOut = function (obj) {
    var me = new Model.AbstractShipmentOut(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'ShipmentOut';
    me.className = 'shipmentOut';
    me.constructor = arguments.callee;
    return me;
};

// skladShareMode : shareMode
Model.SkladShareMode = function (obj) {
    var me = new Model.ShareMode(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'SkladShareMode';
    me.className = 'skladShareMode';
    me.constructor = arguments.callee;
    return me;
};

// slot : legendEntity
Model.Slot = function (obj) {
    var me = new Model.LegendEntity(obj);
    // properties
    me.warehouseId = null;
    me.warehouseUuid = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'Slot';
    me.className = 'slot';
    me.constructor = arguments.callee;
    return me;
};

// state : legendEntity
Model.State = function (obj) {
    var me = new Model.LegendEntity(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'State';
    me.className = 'state';
    me.constructor = arguments.callee;
    return me;
};

// stockMotion : motion
Model.StockMotion = function (obj) {
    var me = new Model.Motion(obj);
    // properties
    me.countryUuid = null;
    me.gtdUuid = null;
    me.gtdId = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'StockMotion';
    me.className = 'stockMotion';
    me.constructor = arguments.callee;
    return me;
};

// stockOperation : operationWithPositions
Model.StockOperation = function (obj) {
    var me = new Model.OperationWithPositions(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'StockOperation';
    me.className = 'stockOperation';
    me.constructor = arguments.callee;
    return me;
};

// supply : comingInOperation
Model.Supply = function (obj) {
    var me = new Model.ComingInOperation(obj);
    // properties
    me.factureInUuid = null;
    me.incomingDate = null;
    me.incomingNumber = null;
    me.factureInId = null;
    me.purchaseOrderId = null;
    me.overheadDistribution = null;
    me.purchaseOrderUuid = null;
    me.invoicesInUuid = null;
    me.invoicesIn = null;
    me.payments = null;
    me.purchaseReturns = null;
    me.overhead = null;
    me.paymentsUuid = null;
    me.shipmentIn = null;
    me.purchaseReturnsUuid = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'Supply';
    me.className = 'supply';
    me.constructor = arguments.callee;
    return me;
};

// template : document
Model.Template = function (obj) {
    var me = new Model.Document(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'Template';
    me.className = 'template';
    me.constructor = arguments.callee;
    return me;
};

// templatesMetadata : legendEntity
Model.TemplatesMetadata = function (obj) {
    var me = new Model.LegendEntity(obj);
    // properties
    me.template = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'TemplatesMetadata';
    me.className = 'templatesMetadata';
    me.constructor = arguments.callee;
    return me;
};

// thing : legendEntity
Model.Thing = function (obj) {
    var me = new Model.LegendEntity(obj);
    // properties
    me.goodUuid = null;
    me.goodId = null;
    me.attribute = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'Thing';
    me.className = 'thing';
    me.constructor = arguments.callee;
    return me;
};

// thingAttributeValue : attributeValue
Model.ThingAttributeValue = function (obj) {
    var me = new Model.AttributeValue(obj);
    // properties
    me.thingUuid = null;
    me.thingId = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'ThingAttributeValue';
    me.className = 'thingAttributeValue';
    me.constructor = arguments.callee;
    return me;
};

// unit : object
Model.Unit = function (obj) {
    var me = new Model.BaseObject(obj);
    // properties
    me.s1 = null;
    me.s24 = null;
    me.s5 = null;
    me.sex = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'Unit';
    me.className = 'unit';
    me.constructor = arguments.callee;
    return me;
};

// uom : predefinedLegendableEntity
Model.Uom = function (obj) {
    var me = new Model.PredefinedLegendableEntity(obj);
    // properties
    me.type = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'Uom';
    me.className = 'uom';
    me.constructor = arguments.callee;
    return me;
};

// warehouse : place
Model.Warehouse = function (obj) {
    var me = new Model.Place(obj);
    // properties
    me.agentUuid = null;
    me.agentId = null;
    me.slots = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'Warehouse';
    me.className = 'warehouse';
    me.constructor = arguments.callee;
    return me;
};

// workflow : legendEntity
Model.Workflow = function (obj) {
    var me = new Model.LegendEntity(obj);
    // properties
    me.state = null;
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'Workflow';
    me.className = 'workflow';
    me.constructor = arguments.callee;
    return me;
};

// ymlConnectorSettings : abstractConnectorSetting
Model.YmlConnectorSettings = function (obj) {
    var me = new Model.AbstractConnectorSetting(obj);
    // properties
    // init
    if(obj) me.initFromObject(obj);
    me.objectType = 'YmlConnectorSettings';
    me.className = 'ymlConnectorSettings';
    me.constructor = arguments.callee;
    return me;
};

Model.Uuid = Model.Id;
Model.uuid = Model.Id;
Model.id = Model.Id;
Model.agent = Model.Agent;
Model.agentPictureDocument = Model.AgentPictureDocument;
Model.amiroConnectorSettings = Model.AmiroConnectorSettings;
Model.attachmentDocument = Model.AttachmentDocument;
Model.barcode = Model.Barcode;
Model.cashIn = Model.CashIn;
Model.cashOut = Model.CashOut;
Model.cmlConnectorSettings = Model.CmlConnectorSettings;
Model.collection = Model.Collection;
Model.company = Model.Company;
Model.consignment = Model.Consignment;
Model.consignmentBarcode = Model.ConsignmentBarcode;
Model.contract = Model.Contract;
Model.contractDocument = Model.ContractDocument;
Model.country = Model.Country;
Model.currency = Model.Currency;
Model.customEntity = Model.CustomEntity;
Model.customEntityMetadata = Model.CustomEntityMetadata;
Model.customerOrder = Model.CustomerOrder;
Model.demand = Model.Demand;
Model.document = Model.Document;
Model.documentMiniature = Model.DocumentMiniature;
Model.embeddedEntityMetadata = Model.EmbeddedEntityMetadata;
Model.employee = Model.Employee;
Model.enter = Model.Enter;
Model.entityTemplatesMetadata = Model.EntityTemplatesMetadata;
Model.exchangeContainer = Model.ExchangeContainer;
Model.factureIn = Model.FactureIn;
Model.factureOut = Model.FactureOut;
Model.feature = Model.Feature;
Model.good = Model.Good;
Model.goodFolder = Model.GoodFolder;
Model.gtd = Model.Gtd;
Model.internalOrder = Model.InternalOrder;
Model.inventory = Model.Inventory;
Model.invoiceIn = Model.InvoiceIn;
Model.invoiceOut = Model.InvoiceOut;
Model.loss = Model.Loss;
Model.move = Model.Move;
Model.myCompany = Model.MyCompany;
Model.operationDocument = Model.OperationDocument;
Model.paymentIn = Model.PaymentIn;
Model.paymentOut = Model.PaymentOut;
Model.place = Model.Place;
Model.priceList = Model.PriceList;
Model.priceType = Model.PriceType;
Model.processing = Model.Processing;
Model.processingOrder = Model.ProcessingOrder;
Model.processingPlan = Model.ProcessingPlan;
Model.processingPlanFolder = Model.ProcessingPlanFolder;
Model.project = Model.Project;
Model.purchaseOrder = Model.PurchaseOrder;
Model.purchaseReturn = Model.PurchaseReturn;
Model.reportTemplatesMetadata = Model.ReportTemplatesMetadata;
Model.retailCashIn = Model.RetailCashIn;
Model.retailCashOut = Model.RetailCashOut;
Model.retailDemand = Model.RetailDemand;
Model.retailSalesReturn = Model.RetailSalesReturn;
Model.salesReturn = Model.SalesReturn;
Model.service = Model.Service;
Model.skladShareMode = Model.SkladShareMode;
Model.slot = Model.Slot;
Model.supply = Model.Supply;
Model.template = Model.Template;
Model.thing = Model.Thing;
Model.uom = Model.Uom;
Model.warehouse = Model.Warehouse;
Model.workflow = Model.Workflow;
Model.ymlConnectorSettings = Model.YmlConnectorSettings;
Model.error = Model.Error;

module.exports = Model;
},{"tools":"18E3ac"}],9:[function(require,module,exports){
/**
 * Default Http request provider
 * Date: 11.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash'),
    logger = require('logger');


var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest,
    Tools = require('tools');

module.exports = {

    fetch: function (options, callback) {

        var _options = {
            contentType: 'application/x-www-form-urlencoded',
            headers: null,
            method: 'GET',
            async: false,
            payload: null
        };
        _options = _.extend(_options, options);

        var xmlHttpRequestClient = new XMLHttpRequest();
        xmlHttpRequestClient.open(_options.method, _options.url, _options.async);
        xmlHttpRequestClient.setRequestHeader('Content-Type', _options.contentType);
        _.forEach(_options.headers, function (value, key) {
            xmlHttpRequestClient.setRequestHeader(key, value);
        });

        var err;

        //TODO try only in sync mode!
        try {
            logger.time('[Providers] XMLHttpRequest');
            xmlHttpRequestClient.send(_options.payload);
            logger.timeEnd('[Providers] XMLHttpRequest');
        }
        catch (e) {
            err = {
                code: 'XMLHttpRequest Error',
                message: e
            };
        }


        var req = _.extend({ url: _options.url }, _options);
        var res;
        if (_.isEmpty(err)) { //TODO Нужно учесть, что ответ может быть, но с ошибкой
            var responceCode = xmlHttpRequestClient.status;
            res = {
                headers: null,
                contentText: xmlHttpRequestClient.responseText,
                //TODO Почему эта библиотека возвращает такой ответ? Это не по стандарту.
                responseCode: (typeof responceCode === 'number') ? responceCode : parseInt(responceCode.split('\n')[0]),
                responseCodeText: xmlHttpRequestClient.statusText
            };
        }

        var result = {
            response: res,
            request: req,
            error: err
        };

        return Tools.callbackAdapter(err, result, callback);

    }

};

},{"lodash":1,"logger":"Hbkh7e","tools":"18E3ac","xmlhttprequest":"UuaBEn"}],"ly8u51":[function(require,module,exports){
/**
 * Jsonix (Google Script context)
 * Date: 13.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var jsonix = require('../../../vendor/jsonix/jsonix').Jsonix;

var DOMParser           = require('xmldom/gs').DOMParser,
    XMLSerializer       = require('xmldom/gs').XMLSerializer,
    DOMImplementation   = require('xmldom/gs').DOMImplementation,
    XMLHttpRequest      = require('xmlhttprequest/gs').XMLHttpRequest;

module.exports = jsonix(DOMImplementation, XMLSerializer, DOMParser, XMLHttpRequest);
},{"../../../vendor/jsonix/jsonix":21,"xmldom/gs":"EyQ8tR","xmlhttprequest/gs":"UuaBEn"}],"jsonix":[function(require,module,exports){
module.exports=require('ly8u51');
},{}],"Hbkh7e":[function(require,module,exports){
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
},{}],"logger":[function(require,module,exports){
module.exports=require('Hbkh7e');
},{}],"tools":[function(require,module,exports){
module.exports=require('18E3ac');
},{}],"18E3ac":[function(require,module,exports){
/**
 * Common Tools (Google Script context)
 * Date: 13.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

module.exports = require('./index');

},{"./index":16}],16:[function(require,module,exports){
/**
 * Common Tools
 * Date: 11.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');

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

exports.Base64 = Base64;

exports.fillObjectProps = function (obj, src) {
    if (src) {
        for (var prop in obj) {
            if (prop in src) {
                obj[prop] = src[prop];
            }
        }
    }
};

exports.getBasicAuthHttpHeader = function (login, password) {

    // TODO Надо подумать как лучше переключать функции в зависимости от среды исполнения
    return "Basic " + Base64.encode(login + ":" + password);

};

exports.callbackAdapter = function (err, data, callback) {

    if (callback) {
        callback(err, data);
        return data;
    } else {
        if (err) {
            throw err;
        } else {
            return data;
        }
    }

};
},{"lodash":1}],"EyQ8tR":[function(require,module,exports){
/**
 * Xml DOM Google Script adapter
 * Date: 11.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');

// http://www.w3.org/TR/DOM-Level-2-Core/core
var DOM = DOM || {};

DOM.document = {};

// ExceptionCode
DOM.INDEX_SIZE_ERR = 1;
DOM.DOMSTRING_SIZE_ERR = 2;
DOM.HIERARCHY_REQUEST_ERR = 3;
DOM.WRONG_DOCUMENT_ERR = 4;
DOM.INVALID_CHARACTER_ERR = 5;
DOM.NO_DATA_ALLOWED_ERR = 6;
DOM.NO_MODIFICATION_ALLOWED_ERR = 7;
DOM.NOT_FOUND_ERR = 8;
DOM.NOT_SUPPORTED_ERR = 9;
DOM.INUSE_ATTRIBUTE_ERR = 10;
// Introduced in DOM Level 2:
DOM.INVALID_STATE_ERR = 11;
DOM.SYNTAX_ERR = 12;
DOM.INVALID_MODIFICATION_ERR = 13;
DOM.NAMESPACE_ERR = 14;
DOM.INVALID_ACCESS_ERR = 15;

DOM.DOMException = function (code) {
    return new Error('DOMException', code)
};

/**
 * A NodeList.
 * @constructor
 */
DOM.NodeList = function () {
    var me = [];
    me.item = function (index) {
        return this[index];
    };
    me.constructor = arguments.callee;
    return me;
};

/**
 * A NamedNodeMap.
 * @constructor
 */
DOM.NamedNodeMap = function () {
    var me = [];
    /**
     * @param {DOM.Node} node
     * @return {DOM.Node}
     */
    me.setNamedItem = function (node) {
        this.push(node);
    };
    /**
     * @param {number} index
     * @return {DOM.Node}
     */
    me.item = function (index) {
        return this[index];
    };
    me.constructor = arguments.callee;
    return me;
};

/**
 * A Node.
 * @constructor
 */
DOM.Node = function () {
    var me = /** @lends {DOM.Node} */ {
        ELEMENT_NODE: 1,
        ATTRIBUTE_NODE: 2,
        TEXT_NODE: 3,
        CDATA_SECTION_NODE: 4,
        ENTITY_REFERENCE_NODE: 5,
        ENTITY_NODE: 6,
        PROCESSING_INSTRUCTION_NODE: 7,
        COMMENT_NODE: 8,
        DOCUMENT_NODE: 9,
        DOCUMENT_TYPE_NODE: 10,
        DOCUMENT_FRAGMENT_NODE: 11,
        NOTATION_NODE: 12
    };

    me.nodeName = null;
    me.nodeValue = null;
    me.nodeType = null; // NodeType
    me.parentNode = null; // Node
    me.childNodes = new DOM.NodeList(); // Node
    me.firstChild = null; // Node
    me.lastChild = null; // Node
    me.previousSibling = null; // Node
    me.nextSibling = null; // Node
    me.attributes = null; // NamedNodeMap
    //TODO Если потребуется этот метод, то придется обновлять все свойства нодов в цепочке при добавлении нода в документ
    me.ownerDocument = null; // Document

    // Introduced in DOM Level 2:
    me.namespaceURI = null; // DOMString
    me.prefix = null; // DOMString
    me.localName = null; // DOMString
    /**
     * @param {DOM.Node|DOM.DocumentFragment} newChild
     * @return {DOM.Node}
     */
    me.appendChild = function (newChild) {
        if (newChild.nodeName == '#document-fragment') {
            for (var i = 0, leni = newChild.childNodes.length; i < leni; i++) {
                this.appendChild(newChild.childNodes[i]);
            }
            return newChild;
        }
        newChild.ownerDocument = this.ownerDocument;
        newChild.parentNode = this;
        var lastNodeIndex = this.childNodes.length - 1;
        if (lastNodeIndex >= 0) {
            this.childNodes[lastNodeIndex].nextSibling = newChild;
            newChild.previousSibling = this.childNodes[lastNodeIndex];
        }
        this.childNodes.push(newChild);
        this.lastChild = newChild;
        if (this.childNodes.length == 1) this.firstChild = newChild;
        return newChild;
    };
    /**
     * @return {boolean}
     */
    me.hasChildNodes = function () {
        return this.childNodes.length > 0;
    };
    me.constructor = arguments.callee;
    return me;
};

DOM.DocumentFragment = function () {
    var me = new DOM.Node();
    me.nodeName = '#document-fragment';
    me.nodeType = me.DOCUMENT_FRAGMENT_NODE;
    me.constructor = arguments.callee;
    return me;
};

/**
 * A DocumentType.
 * @constructor
 * @extends DOM.Node
 */
DOM.DocumentType = function () {
    var me = new DOM.Node();
    /**
     * @const
     * @type {string}
     */
    me.name = null;
    /**
     * @const
     * @type {DOM.NamedNodeMap}
     */
    me.entities = null;
    /**
     * @const
     * @type {NamedNodeMap}
     */
    me.notations = null;

    // Introduced in DOM Level 2:
    /**
     * @const
     * @type {string}
     */
    me.publicId = null;
    /**
     * @const
     * @type {string}
     */
    me.systemId = null;
    /**
     * @const
     * @type {string}
     */
    me.internalSubset = null;
    me.constructor = arguments.callee;
    return me;
};

/**
 * A Attr.
 * @constructor
 * @param {string} name
 * @extends DOM.Node
 */
DOM.Attr = function (name) {
    var me = new DOM.Node();
    me.nodeType = me.ATTRIBUTE_NODE;
    me.nodeName = name;
    me.localName = name;

    /**
     * @type {string}
     */
    me.name = name;
    /**
     * @type {boolean}
     */
    me.specified = true;
    //TODO value должно быть свойством и устанавливать значение nodeValue у родителя (возможны ошибки)
    /**
     * @type {string|number}
     */
    me.value = '';
    me.nodeValue = '';

    // Introduced in DOM Level 2:
    /**
     * @type {DOM.Element}
     */
    me.ownerElement = null;

    var super_appendChild = me.appendChild;
    /**
     * @override
     * @param {DOM.Text} newChild
     */
    me.appendChild = function (newChild) {
        if (newChild.nodeType != this.TEXT_NODE) {
            throw new DOM.DOMException(DOM.HIERARCHY_REQUEST_ERR);
        }
        super_appendChild.call(this, newChild);
        var resultValue = null, tmpResult = '', nodeValue;
        for (var i = 0, leni = this.childNodes.length; i < leni; i++) {
            nodeValue = this.childNodes[i].nodeValue;
            if (nodeValue) tmpResult += nodeValue;
        }
        this.value = tmpResult || resultValue;
        this.nodeValue = tmpResult || resultValue;
        this.specified = true;
        return newChild;
    };

    /**
     * Дополнительнй метод (value, нельзя реализовать как свойство)
     * @param text
     */
    me.setValue_ = function (text) {
        this.childNodes = new DOM.NamedNodeMap();
        this.appendChild(new DOM.Text(text));
    };
    me.constructor = arguments.callee;
    return me;
};

/**
 * A Element.
 * @constructor
 * @extends DOM.Node
 */
DOM.Element = function (tagName) {
    var me = new DOM.Node();
    me.nodeType = me.ELEMENT_NODE;
    me.nodeName = null;
    me.localName = null;
    me.tagName = null;
    if (tagName) {
        me.nodeName = tagName;
        me.localName = tagName;
        me.tagName = tagName;
    }
    me.attributes = new DOM.NamedNodeMap();
    me._attrIndex = {};

    var super_appendChild = me.appendChild;
    /**
     * @override
     */
    me.appendChild = function (newChild) {
        super_appendChild.call(this, newChild);
    };
    /**
     * @param {string} [name]
     * @param {string} [value]
     */
    me.setAttribute = function (name, value) {
        var newAttr = new DOM.Attr(name);
        newAttr.appendChild(new DOM.Text(value));
        this.setAttributeNode(newAttr);
    };
    /**
     * @param {DOM.Attr} newAttr
     * @return {DOM.Attr}
     */
    me.setAttributeNode = function (newAttr) {
        if (newAttr.name in (this._attrIndex)) {
            this.attributes.splice(this._attrIndex[newAttr.name], 1, [newAttr]);
        } else {
            this._attrIndex[newAttr.name] = this.attributes.push(newAttr) - 1;
        }
        newAttr.ownerElement = this;
        newAttr.ownerDocument = this.ownerDocument;
        return newAttr;
    };
    /**
     * @param {string} namespaceURI
     * @param {string} qualifiedName
     * @param {string} value
     */
    me.setAttributeNS = function (namespaceURI, qualifiedName, value) {
        this.setAttribute(qualifiedName, value);
    };
    /**
     * @param {DOM.Attr} newAttr
     * @return {DOM.Attr}
     */
    me.setAttributeNodeNS = function (newAttr) {
        return this.setAttributeNode(newAttr);
    };
    me.nodeType = me.ELEMENT_NODE;
    me.constructor = arguments.callee;
    return me;
};

/**
 * A CharacterData.
 * @param {string=} [text]
 * @returns {DOM.Node}
 * @constructor
 */
DOM.CharacterData = function (text) {
    var me = new DOM.Node();
    /**
     * @const
     * @type {number}
     */
    me.length = 0;
    me.data = null;
    me.nodeValue = null;
    if (text) {
        me.length = text.length;
        me.data = text;
        me.nodeValue = text;
    }
    /**
     * @param {number|string} arg
     */
    me.appendData = function (arg) {
        this.nodeValue ? this.nodeValue += arg : this.nodeValue = arg;
    };
    me.constructor = arguments.callee;
    return me;
};

/**
 * A Text.
 * @param {string=} [text]
 * @constructor
 * @extends DOM.CharacterData
 */
DOM.Text = function (text) {
    var me = new DOM.CharacterData(text);
    me.nodeName = '#text';
    me.nodeType = me.TEXT_NODE;
    me.constructor = arguments.callee;
    return me;
};

/**
 * A Document.
 * @constructor
 * @extends DOM.Node
 */
DOM.Document = function () {
    var me = new DOM.Node();
    me.xmlDocument = null;
    me.nodeName = '#document';
    me.doctype = null;
    me.nodeType = me.DOCUMENT_NODE;
    me.documentElement = null;

    var super_appendChild = me.appendChild;
    /**
     * @override
     */
    me.appendChild = function (newChild) {
        super_appendChild.call(this, newChild);
        //TODO Сделать проверку на возможность добавить единственный элемент (и посмотреть как устроено в document)
        this.documentElement = newChild;
    };

    /**
     * @param {string} [tagName]
     * @return {DOM.Element}
     */
    me.createElement = function (tagName) {
        return new DOM.Element(tagName);
    };
    /**
     * @return {DOM.DocumentFragment}
     */
    me.createDocumentFragment = function () {
        return new DOM.DocumentFragment();
    };
    /**
     * @param {string} data
     * @return {DOM.Text}
     */
    me.createTextNode = function (data) {
        var result = new DOM.Text(data);
        return result;
    };
    /**
     * @param {string} [name]
     * @return {DOM.Attr}
     */
    me.createAttribute = function (name) {
        return new DOM.Attr(name);
    };
    // Introduced in DOM Level 2:

    //TODO importNode (используется в Jsonix :1124) (возможно не обязателен)
    /*
     * @param {DOM.Node} [importedNode]
     * @param {boolean} [deep]
     * @return {DOM.Node}
     *
     me.importNode = function (importedNode, deep) {
     throw new Error('importNode not implemented');
     };*/

    /**
     * @param {string} [namespaceURI]
     * @param {string} [qualifiedName]
     * @return {DOM.Element}
     */
    me.createElementNS = function (namespaceURI, qualifiedName) {
        return this.createElement(qualifiedName);
    };
    me.constructor = arguments.callee;
    return me;
};

DOM.document.implementation = {};
DOM.document.implementation.createDocument = function (namespaceURI, qualifiedName, doctype) {
    return new DOM.Document();
};

/**
 * Преобразует DOM элемент в XML модель Google Script
 * @param {*|DOM.Element|HTMLElement} element
 * @returns {*}
 */
DOM.convertElementDomToGs = function (element) {
    var name = element.nodeName;
    var result;
    var children = [];
    _(element.attributes)
        .forEach(function (item) {
            var elemItem = Xml.attribute(item.nodeName, item.nodeValue); //new XmlAttribute(new XmlName(item.nodeName), item.nodeValue);
            children.push(elemItem);
        });
    if (element.childNodes.length == 1 && element.childNodes[0].nodeType == 3) {
        // Текстовый элемент
        // Logger.log('DOM.gs 753: %s', element.childNodes[0]);
        children.push(element.childNodes[0].nodeValue); //.toString()); //TODO Проверить это место выдает ошибку (nodeValue == null) на загрузке (см. импорт Кассовых расходов)
    } else if (element.childNodes.length > 0) {
        // Преобразуем дочерние элементы
        _(element.childNodes)
            .select(function (item) {
                return item.nodeType == 1
            })
            .forEach(function (item) {
                children.push(DOM.convertElementDomToGs(item));
            });
    }
    result = Xml.element(element.nodeName, children); //new XmlElement(new XmlName(element.nodeName), children);

    return result;
};

/**
 * Преобразует XML element из модели Google Script в DOM
 * @param {XmlElement} xmlElement
 * @param {*} domDocument Если true, то преобразование идет в JavaScript DOM
 * @returns {*|DOM.Element|HTMLElement}
 */
DOM.convertElementGsToDom = function (xmlElement) {
    var doc = DOM.document.implementation.createDocument('', '', null);
    var element = doc.createElement(xmlElement.getName().getLocalName());
    // Добавляем аттрибуты
    _(xmlElement.getAttributes())
        .forEach(function (attr) {
            var domAttr = doc.createAttribute(attr.getName().getLocalName());
            domAttr.appendChild(doc.createTextNode(attr.getValue()));
            element.setAttributeNode(domAttr);
        });
    // Добавляем элементы
    var xmlElements = xmlElement.getElements();
    if (xmlElements.length > 0) {
        _(xmlElements)
            .forEach(function (elem) {
                var domElem = DOM.convertElementGsToDom(elem);
                element.appendChild(domElem);
            });
    } else if (xmlElement.getText()) {
        // Текстовый элемент
        var domText = doc.createTextNode(xmlElement.getText());
        element.appendChild(domText);
    }
    return element;
};

DOM.convertDocumentGsToDom = function (xmlDocument) {
    var doc = DOM.document.implementation.createDocument('', '', null);
    var docElement = DOM.convertElementGsToDom(xmlDocument.getElement());
    doc.appendChild(docElement);
    return doc;
};



// Exports
//

exports.DOMImplementation = function () {
    this.createDocument = function (namespaceURI, qualifiedName, doctype) {
        return new DOM.Document();
    };
};

/**
 * Представляет контейнер для методов преобразования из текста в Xml объект
 * @param {*} domDocument
 * @constructor
 */
exports.DOMParser = function () {
    this.parseFromString = function (text) {
        //Logger.log('Dom.gs 816: ' + text);
        var xmlDoc = Xml.parse(text);
        var domDoc = DOM.convertDocumentGsToDom(xmlDoc);
        return domDoc;
    };
};

exports.XMLSerializer = function () {
    this.serializeToString = function (node) {
        var elementNode = node.nodeType == node.DOCUMENT_NODE ?
            node.documentElement :
            node;
        var gsElement = DOM.convertElementDomToGs(elementNode);
        var result = gsElement.toXmlString();
        return result;
    };
};

},{"lodash":1}],"xmldom":[function(require,module,exports){
module.exports=require('EyQ8tR');
},{}],"xmlhttprequest":[function(require,module,exports){
module.exports=require('UuaBEn');
},{}],"UuaBEn":[function(require,module,exports){
/**
 * XmlHttpRequest Google Script adapter
 * Date: 11.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

module.exports.XMLHttpRequest = function () {
    var _options = {
        muteHttpExceptions: true
    };
    var _url = null;
    var _async = false;

    // Обработчик событий
    this.onreadystatechange = function () {};

    // Состояние
    this.UNSENT = 0; // Не послан
    this.OPENED = 1; // Открыт
    this.HEADERS_RECEIVED = 2; // Заголовки получены
    this.LOADING = 3; // Загрузка
    this.DONE = 4; // Завершено
    this.readyState = this.UNSENT;

    // Ответ
    this.responseText = null;
    this.responseXML = null;
    this.status = null;

    /**
     * Open
     * @param {string} method
     * @param {string} url
     * @param {boolean=} [async]
     * @param {string=} [user]
     * @param {string=} [password]
     */
    this.open = function (method, url, async, user, password) {
        //TODO Можно ли здесь вызывать ошибку через throw?
        if (url.length > 8000) throw 'Exceeded the maximum length of the request url (8kb)';
        _url = url;
        _async = async != 'undefined' ? async : false;
        _options.method = method;
        if (user) {
            this.setRequestHeader('Authorization', "Basic " + Utilities.base64Encode(user + ":" + password));
        }
        this.readyState = this.OPENED;
        this.onreadystatechange();
    };
    /**
     * Send
     * @param {?} data DOMString | Document | empty
     */
    this.send = function (data) {
        if(this.readySate != this.OPEND) throw new Error('XMLHttpRequest.Send: INVALID_STATE_ERR');
        if(data) {
            _options.payload = data;
            _options.contentType = _options.contentType || 'application/xml; charset=utf-8';
        }
        var response = UrlFetchApp.fetch(_url, _options);
        this.status = response.getResponseCode();
        this.responseText = response.getContentText();
        this.readyState = this.DONE;
        this.onreadystatechange();
    };
    /**
     * SetRequestHeader
     * @param {string} header
     * @param {string} value
     */
    this.setRequestHeader = function (header, value) {
        if (!_options.headers) _options.headers = {};
        _options.headers[header] = value;
    };
};

},{}],21:[function(require,module,exports){
/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

function _factory(DOMImplementation, XMLSerializer, DOMParser, XMLHttpRequest) {

    var document = { implementation: new DOMImplementation() }

    var Jsonix = {
        singleFile : true
    };

    // mvv:
    var window = {};

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

            // mvv: Google Script fix
            //TODO mvv: global const
            /*if (ENV_BROWSER) {
                var sourceIsEvt = typeof window.Event == "function" && source instanceof window.Event;

                if (!sourceIsEvt && source.hasOwnProperty && source.hasOwnProperty('toString')) {
                    destination.toString = source.toString;
                }
            }*/
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
        for ( var i = 0, len = arguments.length; i < len; ++i) {
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


    Jsonix.XML = {};



    Jsonix.DOM = {
        createDocument : function() {

            if (document.implementation && document.implementation.createDocument) {
                return document.implementation.createDocument('', '', null);
            } else {
                var doc = new ActiveXObject('MSXML2.DOMDocument');
                return doc;
            }
        },
        serialize : function(node) {
            Jsonix.Util.Ensure.ensureExists(node);

            if (typeof XMLSerializer !== 'undefined') {
                return (new XMLSerializer()).serializeToString(node);
            } else if (Jsonix.Util.Type.exists(node.xml)) {
                return node.xml;
            } else {
                throw 'Could not serialize the node, neither XMLSerializer nor the [xml] property were found.';
            }
        },
        parse : function(text) {
            Jsonix.Util.Ensure.ensureExists(text);
            if (typeof DOMParser != 'undefined') {
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

            request.issue(url, function(transport) {
                var result;
                if (Jsonix.Util.Type.exists(transport.responseXML) && Jsonix.Util.Type.exists(transport.responseXML.documentElement)) {
                    result = transport.responseXML;
                } else if (Jsonix.Util.Type.isString(transport.responseText)) {
                    result = Jsonix.DOM.parse(transport.responseText);
                } else {
                    throw 'Response does not have valid [responseXML] or [responseText].';
                }
                callback(result);

            }, function(transport) {
                throw 'Could not retrieve XML from URL [' + url + '].';

            }, options);
        }
    };

    Jsonix.Request = Jsonix.Class({
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
        }

        ],
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

            var method = Jsonix.Util.Type.isString(options.method) ? options.method : 'GET';
            var async = Jsonix.Util.Type.isBoolean(options.async) ? options.async : true;
            var proxy = Jsonix.Util.Type.isString(options.proxy) ? options.proxy : Jsonix.Request.PROXY;

            var user = Jsonix.Util.Type.isString(options.user) ? options.user : null;
            var password = Jsonix.Util.Type.isString(options.password) ? options.password : null;

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
                        transport.setRequestHeader(header, options.headers[header]);
                    }
                }
            }

            var data = Jsonix.Util.Type.exists(options.data) ? options.data : null;
            if (!async) {
                transport.send(data);
                this.handleTransport(transport, onSuccess, onFailure);
            } else {
                var that = this;

                transport.onreadystatechange = function() {
                    that.handleTransport(transport, onSuccess, onFailure);
                };

                window.setTimeout(function() {
                    transport.send(data);
                }, 0);
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
                    return transport;
                } catch (e) {
                    // TODO log
                }
            }
            throw 'Could not create XML HTTP transport.';
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
        }
    };

    Jsonix.Util.NumberUtils = {
        isInteger : function(value) {
            return Jsonix.Util.Type.isNumber(value) && ((value % 1) === 0);
        }
    };

    Jsonix.Util.StringUtils = {
        trim : function(str) {
            Jsonix.Util.Ensure.ensureString(str);
            return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        },
        isEmpty : function(str) {
            return Jsonix.Util.StringUtils.trim(str).length === 0;
        },
        isBlank : function(str) {
            return !Jsonix.Util.Type.exists(str) || Jsonix.Util.StringUtils.trim(str).length === 0;
        },
        isNotBlank : function(str) {
            return Jsonix.Util.Type.isString(str) && Jsonix.Util.StringUtils.trim(str).length !== 0;
        },
        whitespaceCharacters: '\u0009\u000A\u000B\u000C\u000D \u0085\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u2028\u2029\u202F\u205F\u3000',
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
                throw 'Argument [' + value + '] must be a boolean.';
            }
        },
        ensureString : function(value) {
            if (!Jsonix.Util.Type.isString(value)) {
                throw 'Argument [' + value + '] must be a string.';
            }
        },
        ensureNumber : function(value) {
            if (!Jsonix.Util.Type.isNumber(value)) {
                throw 'Argument [' + value + '] must be a number.';
            }
        },
        ensureNumberOrNaN : function(value) {
            if (!Jsonix.Util.Type.isNumberOrNaN(value)) {
                throw 'Argument [' + value + '] must be a number or NaN.';
            }
        },
        ensureInteger : function(value) {
            if (!Jsonix.Util.Type.isNumber(value)) {
                throw 'Argument must be an integer, but it is not a number.';
            } else if (!Jsonix.Util.NumberUtils.isInteger(value)) {
                throw 'Argument [' + value + '] must be an integer.';
            }
        },
        ensureDate : function(value) {
            if (!(value instanceof Date)) {
                throw 'Argument [' + value + '] must be a date.';
            }
        },
        ensureObject : function(value) {
            if (!Jsonix.Util.Type.isObject(value)) {
                throw 'Argument [' + value + '] must be an object.';
            }
        },
        ensureArray : function(value) {
            if (!Jsonix.Util.Type.isArray(value)) {
                throw 'Argument [' + value + '] must be an array.';
            }
        },
        ensureFunction : function(value) {
            if (!Jsonix.Util.Type.isFunction(value)) {
                throw 'Argument [' + value + '] must be a function.';
            }
        },
        ensureExists : function(value) {
            if (!Jsonix.Util.Type.exists(value)) {
                throw 'Argument [' + value + '] does not exist.';
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
    Jsonix.XML.QName.fromString = function(qNameAsString) {
        var leftBracket = qNameAsString.indexOf('{');
        var rightBracket = qNameAsString.lastIndexOf('}');
        var namespaceURI;
        var prefixedName;
        if ((leftBracket === 0) && (rightBracket > 0) && (rightBracket < qNameAsString.length)) {
            namespaceURI = qNameAsString.substring(1, rightBracket);
            prefixedName = qNameAsString.substring(rightBracket + 1);
        } else {
            namespaceURI = '';
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
        return new Jsonix.XML.QName(namespaceURI, localPart, prefix);
    };
    Jsonix.XML.QName.fromObject = function(object) {
        Jsonix.Util.Ensure.ensureObject(object);
        if (Jsonix.Util.Type.isString(object.CLASS_NAME) && object.CLASS_NAME === 'Jsonix.XML.QName') {
            return object;
        }
        Jsonix.Util.Ensure.ensureString(object.localPart);
        var namespaceURI = Jsonix.Util.Type.isString(object.namespaceURI) ? object.namespaceURI : '';
        var localPart = object.localPart;
        var prefix = Jsonix.Util.Type.isString(object.prefix) ? object.prefix : '';
        return new Jsonix.XML.QName(namespaceURI, localPart, prefix);
    };
    Jsonix.XML.QName.key = function(namespaceURI, localPart) {
        Jsonix.Util.Ensure.ensureString(localPart);
        if (Jsonix.Util.StringUtils.isNotBlank(namespaceURI)) {
            return '{' + namespaceURI + '}' + localPart;
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
                    throw 'Invalid year [' + data.year + '].';
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
                    throw 'Invalid month [' + data.month + '].';
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
                    throw 'Invalid day [' + data.day + '].';
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
                    throw 'Invalid hour [' + data.hour + '].';
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
                    throw 'Invalid minute [' + data.minute + '].';
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
                    throw 'Invalid second [' + data.second + '].';
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
                    throw 'Invalid fractional second [' + data.fractionalSecond + '].';
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
                        throw 'Invalid timezone [' + data.timezone + '].';
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
        eventType : null,
        initialize : function(node) {
            Jsonix.Util.Ensure.ensureExists(node);
            this.root = node;
        },
        hasNext : function() {
            // No current node, we've not started yet
            if (this.node === null) {
                return true;
            } else if (this.node === this.root) {
                // Root node is document, last event type is END_DOCUMENT
                if (this.node.nodeType === 9 && this.eventType === 8) {
                    return false;
                }
                // Root node is element, last event type is END_ELEMENT
                else if (this.node.nodeType === 1 && this.eventType === 2) {
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
                if (Jsonix.Util.Type.exists(this.node.documentElement)) {
                    return this.enter(this.node.documentElement);
                } else {
                    return this.leave(this.node);
                }
            } else if (this.eventType === 1) {
                if (Jsonix.Util.Type.exists(this.node.firstChild)) {
                    return this.enter(this.node.firstChild);
                } else {
                    return this.leave(this.node);
                }
            } else if (this.eventType === 2) {
                if (Jsonix.Util.Type.exists(this.node.nextSibling)) {
                    return this.enter(this.node.nextSibling);
                } else {
                    return this.leave(this.node);
                }
            } else {
                return this.leave(this.node);
            }
        },
        enter : function(node) {
            var nodeType = node.nodeType;
            // Document node
            if (nodeType === 1) {
                this.node = node;
                // START_ELEMENT
                this.eventType = 1;
                return this.eventType;
            } else if (nodeType === 2) {
                this.node = node;
                // ATTRIBUTE
                this.eventType = 10;
                return this.eventType;
            } else if (nodeType === 3) {
                this.node = node;
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
                this.node = node;
                // CDATA
                this.eventType = 12;
                return this.eventType;
            } else if (nodeType === 5) {
                // ENTITY_REFERENCE_NODE = 5
                this.node = node;
                // ENTITY_REFERENCE
                this.eventType = 9;
                return this.eventType;
            } else if (nodeType === 6) {
                this.node = node;
                // ENTITY_DECLARATION
                this.eventType = 15;
                return this.eventType;
            } else if (nodeType === 7) {
                this.node = node;
                // PROCESSING_INSTRUCTION
                this.eventType = 3;
                return this.eventType;
            } else if (nodeType === 8) {
                this.node = node;
                // COMMENT
                this.eventType = 5;
                return this.eventType;
            } else if (nodeType === 9) {
                this.node = node;
                // START_DOCUMENT
                this.eventType = 7;
                return this.eventType;
            } else if (nodeType === 10) {
                this.node = node;
                // DTD
                this.eventType = 12;
                return this.eventType;
            } else if (nodeType === 12) {
                this.node = node;
                // NOTATION_DECLARATION
                this.eventType = 14;
                return this.eventType;
            } else {
                // DOCUMENT_FRAGMENT_NODE = 11
                throw "Node type [" + nodeType + '] is not supported.';
            }
        },
        leave : function(node) {
            if (node.nodeType === 9) {
                if (this.eventType == 8) {
                    throw "Invalid state.";
                } else {
                    this.node = node;
                    // END_ELEMENT
                    this.eventType = 8;
                    return this.eventType;
                }
            } else if (node.nodeType === 1) {
                if (this.eventType == 2) {
                    if (Jsonix.Util.Type.exists(node.nextSibling)) {
                        return this.enter(node.nextSibling);
                    }
                } else {
                    this.node = node;
                    // END_ELEMENT
                    this.eventType = 2;
                    return this.eventType;
                }
            }

            if (Jsonix.Util.Type.exists(node.nextSibling)) {
                return this.enter(node.nextSibling);
            } else {
                var parentNode = node.parentNode;
                this.node = parentNode;
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
                throw 'Expected start or end tag.';
            }
            return et;

        },
        getElementText : function() {
            if (this.eventType != 1) {
                throw "Parser must be on START_ELEMENT to read next text.";
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
                    throw "Unexpected end of document when reading element text content.";
                } else if (et === 1) {
                    // End element
                    // TODO location
                    throw "Element text content may not contain START_ELEMENT.";
                } else {
                    // TODO location
                    throw ("Unexpected event type [" + et + "].");
                }
                et = this.next();
            }
            return content;
        },
        getAttributeCount : function() {
            var attributes;
            if (this.eventType === 1) {
                attributes = this.node.attributes;
            } else if (this.eventType === 10) {
                attributes = this.node.parentNode.attributes;
            } else {
                throw "Number of attributes can only be retrieved for START_ELEMENT or ATTRIBUTE.";
            }
            return attributes.length;
        },
        getAttributeName : function(index) {
            var attributes;
            if (this.eventType === 1) {
                attributes = this.node.attributes;
            } else if (this.eventType === 10) {
                attributes = this.node.parentNode.attributes;
            } else {
                throw "Number of attributes can only be retrieved for START_ELEMENT or ATTRIBUTE.";
            }
            if (index < 0 || index >= attributes.length) {
                throw "Invalid attribute index [" + index + "].";
            }
            var attribute = attributes[index];


            if (Jsonix.Util.Type.isString(attribute.namespaceURI)) {
                return new Jsonix.XML.QName(attribute.namespaceURI, attribute.nodeName);
            } else {
                return new Jsonix.XML.QName(attribute.nodeName);
            }
        },
        getAttributeValue : function(index) {
            var attributes;
            if (this.eventType === 1) {
                attributes = this.node.attributes;
            } else if (this.eventType === 10) {
                attributes = this.node.parentNode.attributes;
            } else {
                throw "Number of attributes can only be retrieved for START_ELEMENT or ATTRIBUTE.";
            }
            if (index < 0 || index >= attributes.length) {
                throw "Invalid attribute index [" + index + "].";
            }
            var attribute = attributes[index];
            return attribute.nodeValue;
        },
        getElement : function() {
            if (this.eventType === 1 || this.eventType === 2) {
                // Go to the END_ELEMENT
                this.eventType = 2;
                return this.node;
            } else {
                throw "Parser must be on START_ELEMENT or END_ELEMENT to return current element.";
            }
        },
        CLASS_NAME : "Jsonix.XML.Input"

    });

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
        node : null,
        nodes : null,
        xmldom : null,
        namespacePrefixes : null,
        namespacePrefixIndex : 0,
        initialize : function(options) {
            if (window.ActiveXObject) {
                this.xmldom = new ActiveXObject("Microsoft.XMLDOM");
            } else {
                this.xmldom = null;
            }
            this.nodes = [];
            this.namespacePrefixes = {
                '' : ''
            };
            if (Jsonix.Util.Type.isObject(options)) {
                if (Jsonix.Util.Type.isObject(options.namespacePrefixes)) {
                    for ( var name in options.namespacePrefixes) {
                        if (options.namespacePrefixes.hasOwnProperty(name)) {
                            this.namespacePrefixes[name] = options.namespacePrefixes[name];
                        }
                    }
                }
            }
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
            Jsonix.Util.Ensure.ensureString(name.localPart);

            var namespaceURI = Jsonix.Util.Type.isString(name.namespaceURI) ? name.namespaceURI : '';
            var localPart = name.localPart;
            var prefix = Jsonix.Util.StringUtils.isNotBlank(name.prefix) ? name.prefix : this.getPrefix(namespaceURI);

            var qualifiedName = (prefix === '' ? localPart : prefix + ':' + localPart);

            var element;
            if (Jsonix.Util.Type.isFunction(this.document.createElementNS))	{
                element = this.document.createElementNS(namespaceURI, qualifiedName);
            }
            else if (this.xmldom) {
                element = this.xmldom.createNode(1, qualifiedName, namespaceURI);

            } else {
                throw "Could not create an element node.";
            }
            this.peek().appendChild(element);
            return this.push(element);
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
                throw "Could not create an text node.";
            }
            this.peek().appendChild(node);
            return node;

        },
        writeAttribute : function(name, value) {
            Jsonix.Util.Ensure.ensureObject(name);
            Jsonix.Util.Ensure.ensureString(name.localPart);
            Jsonix.Util.Ensure.ensureString(value);

            var namespaceURI = Jsonix.Util.Type.isString(name.namespaceURI) ? name.namespaceURI : '';
            var localPart = name.localPart;
            var prefix = Jsonix.Util.StringUtils.isNotBlank(name.prefix) ? name.prefix : this.getPrefix(namespaceURI);

            var qualifiedName = (prefix === '' ? localPart : prefix + ':' + localPart);

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
                    } else {
                        throw "setAttributeNS not implemented";
                    }
                }
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
            return node;
        },
        peek : function() {
            return this.nodes[this.nodes.length - 1];
        },
        pop : function() {
            var result = this.nodes.pop();
            return result;
        },
        getPrefix : function(namespaceURI) {
            var p = this.namespacePrefixes[namespaceURI];
            if (Jsonix.Util.Type.exists(p)) {
                return p;
            } else {
                p = 'p' + (this.namespacePrefixIndex++);
                this.namespacePrefixes[namespaceURI] = p;
                return p;
            }

        },
        CLASS_NAME : "Jsonix.XML.Output"

    });

    Jsonix.Schema.XSD = {};
    Jsonix.Schema.XSD.NAMESPACE_URI = 'http://www.w3.org/2001/XMLSchema';
    Jsonix.Schema.XSD.PREFIX = 'xsd';
    Jsonix.Schema.XSD.qname = function(localPart) {
        Jsonix.Util.Ensure.ensureString(localPart);
        return new Jsonix.XML.QName(Jsonix.Schema.XSD.NAMESPACE_URI, localPart,
            Jsonix.Schema.XSD.PREFIX);
    };


    Jsonix.Schema.XSD.AnyType = Jsonix.Class({
        typeName : Jsonix.Schema.XSD.qname('anyType'),
        initialize : function() {
        },
        isInstance : function(value) {
            throw 'Abstract method [isInstance].';
        },
        CLASS_NAME : 'Jsonix.Schema.XSD.AnyType'
    });
    Jsonix.Schema.XSD.AnyType.INSTANCE = new Jsonix.Schema.XSD.AnyType();

    Jsonix.Schema.XSD.AnySimpleType = Jsonix.Class(Jsonix.Schema.XSD.AnyType, {
        typeName : Jsonix.Schema.XSD.qname('anySimpleType'),
        simpleType : true,
        print : function(value) {
            throw new Error('Abstract method [print].');
        },
        parse : function(text) {
            throw new Error('Abstract method [parse].');
        },
        unmarshal : function(context, input) {
            var text = input.getElementText();
            if (Jsonix.Util.StringUtils.isNotBlank(text)) {
                return this.parse(text);
            } else {
                return null;
            }
        },
        marshal : function(context, value, output) {
            if (Jsonix.Util.Type.exists(value)) {
                output.writeCharacters(this.print(value));
            }
        },
        CLASS_NAME : 'Jsonix.Schema.XSD.AnySimpleType'
    });


    Jsonix.Schema.XSD.List = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
        typeName : null,
        typeInfo : null,
        separator : ' ',
        trimmedSeparator : Jsonix.Util.StringUtils.whitespaceCharacters,
        simpleType : true,
        initialize : function(typeInfo, typeName, separator) {
            Jsonix.Util.Ensure.ensureObject(typeInfo);
            // TODO Ensure correct argument
            this.typeInfo = typeInfo;

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

            var trimmedSeparator = Jsonix.Util.StringUtils.trim(this.separator);
            if (trimmedSeparator.length === 0) {
                this.trimmedSeparator = Jsonix.Util.StringUtils.whitespaceCharacters;
            } else {
                this.trimmedSeparator = trimmedSeparator;
            }
        },
        print : function(value) {
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
                result = result + this.typeInfo.print(value[index]);
            }
            return result;
        },
        parse : function(text) {
            Jsonix.Util.Ensure.ensureString(text);
            var items = Jsonix.Util.StringUtils.splitBySeparatorChars(text, this.trimmedSeparator);
            var result = [];
            for ( var index = 0; index < items.length; index++) {
                result.push(this.typeInfo.parse(Jsonix.Util.StringUtils.trim(items[index])));
            }
            return result;
        },
        CLASS_NAME : 'Jsonix.Schema.XSD.List'
    });


    Jsonix.Schema.XSD.String = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
        typeName : Jsonix.Schema.XSD.qname('string'),
        print : function(value) {
            Jsonix.Util.Ensure.ensureString(value);
            return value;
        },
        parse : function(text) {
            Jsonix.Util.Ensure.ensureString(text);
            return text;
        },
        isInstance : function(value) {
            return Jsonix.Util.Type.isString(value);
        },
        CLASS_NAME : 'Jsonix.Schema.XSD.String'
    });
    Jsonix.Schema.XSD.String.INSTANCE = new Jsonix.Schema.XSD.String();
    Jsonix.Schema.XSD.String.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
        Jsonix.Schema.XSD.String.INSTANCE);

    Jsonix.Schema.XSD.Strings = Jsonix.Class(Jsonix.Schema.XSD.List, {
        initialize : function() {
            Jsonix.Schema.XSD.List.prototype.initialize.apply(this, [ Jsonix.Schema.XSD.String.INSTANCE, Jsonix.Schema.XSD.qname('strings'), ' ' ]);
        },
        // TODO Constraints
        CLASS_NAME : 'Jsonix.Schema.XSD.Strings'
    });
    Jsonix.Schema.XSD.Strings.INSTANCE = new Jsonix.Schema.XSD.Strings();

    Jsonix.Schema.XSD.NormalizedString = Jsonix.Class(Jsonix.Schema.XSD.String, {
        typeName : Jsonix.Schema.XSD.qname('normalizedString'),
        // TODO Constraints
        CLASS_NAME : 'Jsonix.Schema.XSD.NormalizedString'
    });
    Jsonix.Schema.XSD.NormalizedString.INSTANCE = new Jsonix.Schema.XSD.NormalizedString();
    Jsonix.Schema.XSD.NormalizedString.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.NormalizedString.INSTANCE);

    Jsonix.Schema.XSD.Token = Jsonix.Class(Jsonix.Schema.XSD.NormalizedString, {
        typeName : Jsonix.Schema.XSD.qname('token'),
        // TODO Constraints
        CLASS_NAME : 'Jsonix.Schema.XSD.Token'
    });
    Jsonix.Schema.XSD.Token.INSTANCE = new Jsonix.Schema.XSD.Token();
    Jsonix.Schema.XSD.Token.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Token.INSTANCE);

    Jsonix.Schema.XSD.Language = Jsonix.Class(Jsonix.Schema.XSD.Token, {
        typeName : Jsonix.Schema.XSD.qname('language'),
        // TODO Constraints
        CLASS_NAME : 'Jsonix.Schema.XSD.Language'
    });
    Jsonix.Schema.XSD.Language.INSTANCE = new Jsonix.Schema.XSD.Language();
    Jsonix.Schema.XSD.Language.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Language.INSTANCE);

    Jsonix.Schema.XSD.Name = Jsonix.Class(Jsonix.Schema.XSD.Token, {
        typeName : Jsonix.Schema.XSD.qname('Name'),
        // TODO Constraints
        CLASS_NAME : 'Jsonix.Schema.XSD.Name'
    });
    Jsonix.Schema.XSD.Name.INSTANCE = new Jsonix.Schema.XSD.Name();
    Jsonix.Schema.XSD.Name.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Name.INSTANCE);

    Jsonix.Schema.XSD.NCName = Jsonix.Class(Jsonix.Schema.XSD.Name, {
        typeName : Jsonix.Schema.XSD.qname('NCName'),
        // TODO Constraints
        CLASS_NAME : 'Jsonix.Schema.XSD.NCName'
    });
    Jsonix.Schema.XSD.NCName.INSTANCE = new Jsonix.Schema.XSD.NCName();
    Jsonix.Schema.XSD.NCName.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.NCName.INSTANCE);

    Jsonix.Schema.XSD.NMToken = Jsonix.Class(Jsonix.Schema.XSD.Token, {
        typeName : Jsonix.Schema.XSD.qname('NMTOKEN'),
        // TODO Constraints
        CLASS_NAME : 'Jsonix.Schema.XSD.NMToken'
    });
    Jsonix.Schema.XSD.NMToken.INSTANCE = new Jsonix.Schema.XSD.NMToken();

    Jsonix.Schema.XSD.NMTokens = Jsonix.Class(Jsonix.Schema.XSD.List, {
        initialize : function() {
            Jsonix.Schema.XSD.List.prototype.initialize.apply(this, [ Jsonix.Schema.XSD.NMToken.INSTANCE, Jsonix.Schema.XSD.qname('NMTOKEN'), ' ' ]);
        },
        // TODO Constraints
        CLASS_NAME : 'Jsonix.Schema.XSD.NMTokens'
    });
    Jsonix.Schema.XSD.NMTokens.INSTANCE = new Jsonix.Schema.XSD.NMTokens();

    Jsonix.Schema.XSD.Boolean = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
        typeName : Jsonix.Schema.XSD.qname('boolean'),
        print : function(value) {
            Jsonix.Util.Ensure.ensureBoolean(value);
            return value ? 'true' : 'false';
        },
        parse : function(text) {
            Jsonix.Util.Ensure.ensureString(text);
            if (text === 'true' || text === '1') {
                return true;
            } else if (text === 'false' || text === '0') {
                return false;
            } else {
                throw "Either [true], [1], [0] or [false] expected as boolean value.";
            }
        },
        isInstance : function(value) {
            return Jsonix.Util.Type.isBoolean(value);
        },
        CLASS_NAME : 'Jsonix.Schema.XSD.Boolean'
    });
    Jsonix.Schema.XSD.Boolean.INSTANCE = new Jsonix.Schema.XSD.Boolean();
    Jsonix.Schema.XSD.Boolean.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Boolean.INSTANCE);

    Jsonix.Schema.XSD.Base64Binary = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
        typeName : Jsonix.Schema.XSD.qname('base64Binary'),
        CLASS_NAME : 'Jsonix.Schema.XSD.Base64Binary'
    });
    Jsonix.Schema.XSD.Base64Binary.INSTANCE = new Jsonix.Schema.XSD.Base64Binary();
    Jsonix.Schema.XSD.Base64Binary.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
        Jsonix.Schema.XSD.Base64Binary.INSTANCE);

    Jsonix.Schema.XSD.HexBinary = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
        typeName : Jsonix.Schema.XSD.qname('hexBinary'),
        CLASS_NAME : 'Jsonix.Schema.XSD.HexBinary'
    });
    Jsonix.Schema.XSD.HexBinary.INSTANCE = new Jsonix.Schema.XSD.HexBinary();
    Jsonix.Schema.XSD.HexBinary.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
        Jsonix.Schema.XSD.HexBinary.INSTANCE);

    Jsonix.Schema.XSD.Number = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
        typeName : Jsonix.Schema.XSD.qname('number'),
        print : function(value) {
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
        parse : function(text) {
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
        isInstance : function(value) {
            return Jsonix.Util.Type.isNumberOrNaN(value);
        },
        CLASS_NAME : 'Jsonix.Schema.XSD.Number'
    });
    Jsonix.Schema.XSD.Number.INSTANCE = new Jsonix.Schema.XSD.Number();
    Jsonix.Schema.XSD.Number.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Number.INSTANCE);

    Jsonix.Schema.XSD.Float = Jsonix.Class(Jsonix.Schema.XSD.Number, {
        typeName : Jsonix.Schema.XSD.qname('float'),
        isInstance : function(value) {
            return Jsonix.Util.Type.isNaN(value) || value === -Infinity || value === Infinity || (Jsonix.Util.Type.isNumber(value) && value >= this.MIN_VALUE && value <= this.MAX_VALUE);
        },
        MIN_VALUE : -3.4028235e+38,
        MAX_VALUE : 3.4028235e+38,
        CLASS_NAME : 'Jsonix.Schema.XSD.Float'
    });
    Jsonix.Schema.XSD.Float.INSTANCE = new Jsonix.Schema.XSD.Float();
    Jsonix.Schema.XSD.Float.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Float.INSTANCE);

    Jsonix.Schema.XSD.Decimal = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
        typeName : Jsonix.Schema.XSD.qname('decimal'),
        print : function(value) {
            Jsonix.Util.Ensure.ensureNumber(value);
            var text = String(value);
            return text;
        },
        parse : function(text) {
            Jsonix.Util.Ensure.ensureString(text);
            var value = Number(text);
            Jsonix.Util.Ensure.ensureNumber(value);
            return value;
        },
        isInstance : function(value) {
            return Jsonix.Util.Type.isNumber(value);
        },
        CLASS_NAME : 'Jsonix.Schema.XSD.Decimal'
    });
    Jsonix.Schema.XSD.Decimal.INSTANCE = new Jsonix.Schema.XSD.Decimal();
    Jsonix.Schema.XSD.Decimal.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Decimal.INSTANCE);

    Jsonix.Schema.XSD.Integer = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
        typeName : Jsonix.Schema.XSD.qname('integer'),
        print : function(value) {
            Jsonix.Util.Ensure.ensureInteger(value);
            var text = String(value);
            return text;
        },
        parse : function(text) {
            Jsonix.Util.Ensure.ensureString(text);
            var value = Number(text);
            Jsonix.Util.Ensure.ensureInteger(value);
            return value;
        },
        isInstance : function(value) {
            return Jsonix.Util.NumberUtils.isInteger(value) && value >= this.MIN_VALUE && value <= this.MAX_VALUE;
        },
        MIN_VALUE : -9223372036854775808,
        MAX_VALUE : 9223372036854775807,
        CLASS_NAME : 'Jsonix.Schema.XSD.Integer'
    });
    Jsonix.Schema.XSD.Integer.INSTANCE = new Jsonix.Schema.XSD.Integer();
    Jsonix.Schema.XSD.Integer.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Integer.INSTANCE);

    Jsonix.Schema.XSD.NonPositiveInteger = Jsonix.Class(Jsonix.Schema.XSD.Integer, {
        typeName : Jsonix.Schema.XSD.qname('nonPositiveInteger'),
        MIN_VALUE: -9223372036854775808,
        MAX_VALUE: 0,
        CLASS_NAME : 'Jsonix.Schema.XSD.NonPositiveInteger'
    });
    Jsonix.Schema.XSD.NonPositiveInteger.INSTANCE = new Jsonix.Schema.XSD.NonPositiveInteger();
    Jsonix.Schema.XSD.NonPositiveInteger.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
        Jsonix.Schema.XSD.NonPositiveInteger.INSTANCE);

    Jsonix.Schema.XSD.NegativeInteger = Jsonix.Class(Jsonix.Schema.XSD.NonPositiveInteger, {
        typeName : Jsonix.Schema.XSD.qname('negativeInteger'),
        MIN_VALUE: -9223372036854775808,
        MAX_VALUE: -1,
        CLASS_NAME : 'Jsonix.Schema.XSD.NegativeInteger'
    });
    Jsonix.Schema.XSD.NegativeInteger.INSTANCE = new Jsonix.Schema.XSD.NegativeInteger();
    Jsonix.Schema.XSD.NegativeInteger.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
        Jsonix.Schema.XSD.NegativeInteger.INSTANCE);

    Jsonix.Schema.XSD.Long = Jsonix.Class(Jsonix.Schema.XSD.Integer, {
        typeName : Jsonix.Schema.XSD.qname('long'),
        MIN_VALUE : -9223372036854775808,
        MAX_VALUE : 9223372036854775807,
        CLASS_NAME : 'Jsonix.Schema.XSD.Long'
    });
    Jsonix.Schema.XSD.Long.INSTANCE = new Jsonix.Schema.XSD.Long();
    Jsonix.Schema.XSD.Long.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Long.INSTANCE);

    Jsonix.Schema.XSD.Int = Jsonix.Class(Jsonix.Schema.XSD.Long, {
        typeName : Jsonix.Schema.XSD.qname('int'),
        MIN_VALUE : -2147483648,
        MAX_VALUE : 2147483647,
        CLASS_NAME : 'Jsonix.Schema.XSD.Int'
    });
    Jsonix.Schema.XSD.Int.INSTANCE = new Jsonix.Schema.XSD.Int();
    Jsonix.Schema.XSD.Int.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
        Jsonix.Schema.XSD.Int.INSTANCE);

    Jsonix.Schema.XSD.Short = Jsonix.Class(Jsonix.Schema.XSD.Int, {
        typeName : Jsonix.Schema.XSD.qname('short'),
        MIN_VALUE : -32768,
        MAX_VALUE : 32767,
        CLASS_NAME : 'Jsonix.Schema.XSD.Short'
    });
    Jsonix.Schema.XSD.Short.INSTANCE = new Jsonix.Schema.XSD.Short();
    Jsonix.Schema.XSD.Short.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Short.INSTANCE);

    Jsonix.Schema.XSD.Byte = Jsonix.Class(Jsonix.Schema.XSD.Short, {
        typeName : Jsonix.Schema.XSD.qname('byte'),
        MIN_VALUE : -128,
        MAX_VALUE : 127,
        CLASS_NAME : 'Jsonix.Schema.XSD.Byte'
    });
    Jsonix.Schema.XSD.Byte.INSTANCE = new Jsonix.Schema.XSD.Byte();
    Jsonix.Schema.XSD.Byte.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Byte.INSTANCE);

    Jsonix.Schema.XSD.NonNegativeInteger = Jsonix.Class(Jsonix.Schema.XSD.Integer, {
        typeName : Jsonix.Schema.XSD.qname('nonNegativeInteger'),
        MIN_VALUE: 0,
        MAX_VALUE: 9223372036854775807,
        CLASS_NAME : 'Jsonix.Schema.XSD.NonNegativeInteger'
    });
    Jsonix.Schema.XSD.NonNegativeInteger.INSTANCE = new Jsonix.Schema.XSD.NonNegativeInteger();
    Jsonix.Schema.XSD.NonNegativeInteger.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
        Jsonix.Schema.XSD.NonNegativeInteger.INSTANCE);

    Jsonix.Schema.XSD.UnsignedLong = Jsonix.Class(Jsonix.Schema.XSD.NonNegativeInteger, {
        typeName : Jsonix.Schema.XSD.qname('unsignedLong'),
        MIN_VALUE : 0,
        MAX_VALUE : 18446744073709551615,
        CLASS_NAME : 'Jsonix.Schema.XSD.UnsignedLong'
    });
    Jsonix.Schema.XSD.UnsignedLong.INSTANCE = new Jsonix.Schema.XSD.UnsignedLong();
    Jsonix.Schema.XSD.UnsignedLong.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.UnsignedLong.INSTANCE);

    Jsonix.Schema.XSD.UnsignedInt = Jsonix.Class(Jsonix.Schema.XSD.UnsignedLong, {
        typeName : Jsonix.Schema.XSD.qname('unsignedInt'),
        MIN_VALUE : 0,
        MAX_VALUE : 4294967295,
        CLASS_NAME : 'Jsonix.Schema.XSD.UnsignedInt'
    });
    Jsonix.Schema.XSD.UnsignedInt.INSTANCE = new Jsonix.Schema.XSD.UnsignedInt();
    Jsonix.Schema.XSD.UnsignedInt.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.UnsignedInt.INSTANCE);

    Jsonix.Schema.XSD.UnsignedShort = Jsonix.Class(Jsonix.Schema.XSD.UnsignedInt, {
        typeName : Jsonix.Schema.XSD.qname('unsignedShort'),
        MIN_VALUE : 0,
        MAX_VALUE : 65535,
        CLASS_NAME : 'Jsonix.Schema.XSD.UnsignedShort'
    });
    Jsonix.Schema.XSD.UnsignedShort.INSTANCE = new Jsonix.Schema.XSD.UnsignedShort();
    Jsonix.Schema.XSD.UnsignedShort.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.UnsignedShort.INSTANCE);

    Jsonix.Schema.XSD.UnsignedByte = Jsonix.Class(Jsonix.Schema.XSD.UnsignedShort, {
        typeName : Jsonix.Schema.XSD.qname('unsignedByte'),
        MIN_VALUE : 0,
        MAX_VALUE : 255,
        CLASS_NAME : 'Jsonix.Schema.XSD.UnsignedByte'
    });
    Jsonix.Schema.XSD.UnsignedByte.INSTANCE = new Jsonix.Schema.XSD.UnsignedByte();
    Jsonix.Schema.XSD.UnsignedByte.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.UnsignedByte.INSTANCE);

    Jsonix.Schema.XSD.PositiveInteger = Jsonix.Class(Jsonix.Schema.XSD.NonNegativeInteger, {
        typeName : Jsonix.Schema.XSD.qname('positiveInteger'),
        MIN_VALUE : 1,
        MAX_VALUE : 9223372036854775807,
        CLASS_NAME : 'Jsonix.Schema.XSD.PositiveInteger'
    });
    Jsonix.Schema.XSD.PositiveInteger.INSTANCE = new Jsonix.Schema.XSD.PositiveInteger();
    Jsonix.Schema.XSD.PositiveInteger.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.PositiveInteger.INSTANCE);

    Jsonix.Schema.XSD.Double = Jsonix.Class(Jsonix.Schema.XSD.Number, {
        typeName : Jsonix.Schema.XSD.qname('double'),
        isInstance : function(value) {
            return Jsonix.Util.Type.isNaN(value) || value === -Infinity || value === Infinity || (Jsonix.Util.Type.isNumber(value) && value >= this.MIN_VALUE && value <= this.MAX_VALUE);
        },
        MIN_VALUE : -1.7976931348623157e+308,
        MAX_VALUE : 1.7976931348623157e+308,
        CLASS_NAME : 'Jsonix.Schema.XSD.Double'
    });
    Jsonix.Schema.XSD.Double.INSTANCE = new Jsonix.Schema.XSD.Double();
    Jsonix.Schema.XSD.Double.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Double.INSTANCE);

    Jsonix.Schema.XSD.AnyURI = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
        typeName : Jsonix.Schema.XSD.qname('anyURI'),
        print : function(value) {
            Jsonix.Util.Ensure.ensureString(value);
            return value;
        },
        parse : function(text) {
            Jsonix.Util.Ensure.ensureString(text);
            return text;
        },
        isInstance : function(value) {
            return Jsonix.Util.Type.isString(value);
        },
        CLASS_NAME : 'Jsonix.Schema.XSD.AnyURI'
    });
    Jsonix.Schema.XSD.AnyURI.INSTANCE = new Jsonix.Schema.XSD.AnyURI();
    Jsonix.Schema.XSD.AnyURI.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.AnyURI.INSTANCE);

    Jsonix.Schema.XSD.QName = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
        typeName : Jsonix.Schema.XSD.qname('QName'),
        CLASS_NAME : 'Jsonix.Schema.XSD.QName'
    });
    Jsonix.Schema.XSD.QName.INSTANCE = new Jsonix.Schema.XSD.QName();
    Jsonix.Schema.XSD.QName.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
        Jsonix.Schema.XSD.QName.INSTANCE);

    Jsonix.Schema.XSD.Calendar = Jsonix
        .Class(
        Jsonix.Schema.XSD.AnySimpleType,
        {
            typeName : Jsonix.Schema.XSD.qname('calendar'),
            parse : function(text) {
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
                    throw 'Value [' + text + '] does not match dateTime, date or time patterns.';
                }
            },
            parseDateTime : function(text) {
                Jsonix.Util.Ensure.ensureString(text);
                var negative = (text.charAt(0) === '-');
                var sign = negative ? -1 : 1;

                var dateTimeWithTimeZone = negative ? text.substring(1) : text;

                if (dateTimeWithTimeZone.length < 19 || dateTimeWithTimeZone.charAt(4) !== '-' || dateTimeWithTimeZone.charAt(7) !== '-' || dateTimeWithTimeZone.charAt(10) !== 'T' || dateTimeWithTimeZone.charAt(13) !== ':' || dateTimeWithTimeZone.charAt(16) !== ':') {
                    throw 'Date time string [' + dateTimeWithTimeZone + '] must be a string in format [\'-\'? yyyy \'-\' mm \'-\' dd \'T\' hh \':\' mm \':\' ss (\'.\' s+)? (zzzzzz)?].';
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
                    throw 'Date string [' + text + '] must be 10 characters long.';
                }

                if (text.charAt(4) !== '-' || text.charAt(7) !== '-') {
                    throw 'Date string [' + text + '] must be a string in format [yyyy \'-\' mm \'-\' ss ].';
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
                    throw 'Time string [' + timeString + '] must be a string in format [hh \':\' mm \':\' ss (\'.\' s+)?].';
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
                        throw 'Time zone must be an empty string, \'Z\' or a string in format [(\'+\' | \'-\') hh \':\' mm].';
                    }
                    var signString = text.charAt(0);
                    var sign;
                    if (signString === '+') {
                        sign = 1;
                    } else if (signString === '-') {
                        sign = -1;
                    } else {
                        throw 'First character of the time zone [' + text + '] must be \'+\' or \'-\'.';
                    }
                    var hour = this.parseHour(text.substring(1, 3));
                    var minute = this.parseMinute(text.substring(4, 6));
                    return sign * (hour * 60 + minute);
                }

            },
            parseYear : function(text) {
                Jsonix.Util.Ensure.ensureString(text);
                if (text.length !== 4) {
                    throw 'Year [' + text + '] must be a four-digit number.';
                }
                var year = Number(text);
                // TODO message
                Jsonix.Util.Ensure.ensureInteger(year);
                return year;
            },
            parseMonth : function(text) {
                Jsonix.Util.Ensure.ensureString(text);
                if (text.length !== 2) {
                    throw 'Month [' + text + '] must be a two-digit number.';
                }
                var month = Number(text);
                // TODO message
                Jsonix.Util.Ensure.ensureInteger(month);
                return month;
            },
            parseDay : function(text) {
                Jsonix.Util.Ensure.ensureString(text);
                if (text.length !== 2) {
                    throw 'Day [' + text + '] must be a two-digit number.';
                }
                var day = Number(text);
                // TODO message
                Jsonix.Util.Ensure.ensureInteger(day);
                return day;
            },
            parseHour : function(text) {
                Jsonix.Util.Ensure.ensureString(text);
                if (text.length !== 2) {
                    throw 'Hour [' + text + '] must be a two-digit number.';
                }
                var hour = Number(text);
                // TODO message
                Jsonix.Util.Ensure.ensureInteger(hour);
                return hour;
            },
            parseMinute : function(text) {
                Jsonix.Util.Ensure.ensureString(text);
                if (text.length !== 2) {
                    throw 'Minute [' + text + '] must be a two-digit number.';
                }
                var minute = Number(text);
                // TODO message
                Jsonix.Util.Ensure.ensureInteger(minute);
                return minute;
            },
            parseSecond : function(text) {
                Jsonix.Util.Ensure.ensureString(text);
                if (text.length !== 2) {
                    throw 'Second [' + text + '] must be a two-digit number.';
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
            print : function(value) {
                Jsonix.Util.Ensure.ensureObject(value);
                if (Jsonix.Util.NumberUtils.isInteger(value.year) && Jsonix.Util.NumberUtils.isInteger(value.month) && Jsonix.Util.NumberUtils.isInteger(value.day) && Jsonix.Util.NumberUtils.isInteger(value.hour) && Jsonix.Util.NumberUtils.isInteger(value.minute) && Jsonix.Util.NumberUtils
                    .isInteger(value.second)) {
                    return this.printDateTime(value);
                } else if (Jsonix.Util.NumberUtils.isInteger(value.year) && Jsonix.Util.NumberUtils.isInteger(value.month) && Jsonix.Util.NumberUtils.isInteger(value.day)) {
                    return this.printDate(value);
                } else if (Jsonix.Util.NumberUtils.isInteger(value.hour) && Jsonix.Util.NumberUtils.isInteger(value.minute) && Jsonix.Util.NumberUtils.isInteger(value.second)) {
                    return this.printTime(value);
                } else {
                    throw 'Value [' + value + '] is not recognized as dateTime, date or time.';
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
                            result = '+';
                        } else if (sign < 0) {
                            result = '-';
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
                    throw 'Fractional second [' + value + '] must be between 0 and 1.';
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
                    throw 'Length [' + value + '] must be positive.';
                }
                if (value < 0) {
                    throw 'Value [' + value + '] must not be negative.';
                }
                if (value >= Math.pow(10, length)) {
                    throw 'Value [' + value + '] must be less than [' + Math.pow(10, length) + '].';
                }
                var result = String(value);
                for ( var i = result.length; i < length; i++) {
                    result = '0' + result;
                }
                return result;
            },
            isInstance : function(value) {
                return Jsonix.Util.Type.isObject(value) && ((Jsonix.Util.NumberUtils.isInteger(value.year) && Jsonix.Util.NumberUtils.isInteger(value.month) && Jsonix.Util.NumberUtils.isInteger(value.day)) || (Jsonix.Util.NumberUtils.isInteger(value.hour) && Jsonix.Util.NumberUtils.isInteger(value.minute) && Jsonix.Util.NumberUtils
                    .isInteger(value.second)));
            },
            CLASS_NAME : 'Jsonix.Schema.XSD.Calendar'
        });
    Jsonix.Schema.XSD.Calendar.INSTANCE = new Jsonix.Schema.XSD.Calendar();
    Jsonix.Schema.XSD.Calendar.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Calendar.INSTANCE);

    Jsonix.Schema.XSD.Duration = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
        typeName : Jsonix.Schema.XSD.qname('duration'),
        CLASS_NAME : 'Jsonix.Schema.XSD.Duration'
    });
    Jsonix.Schema.XSD.Duration.INSTANCE = new Jsonix.Schema.XSD.Duration();
    Jsonix.Schema.XSD.Duration.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
        Jsonix.Schema.XSD.Duration.INSTANCE);

    Jsonix.Schema.XSD.DateTime = Jsonix.Class(Jsonix.Schema.XSD.Calendar, {
        typeName : Jsonix.Schema.XSD.qname('dateTime'),
        parse : function(value) {
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

            //mvv: timeZone		
            if (Jsonix.Util.NumberUtils.isInteger(calendar.timezone)) {
                // mvv: 
                // return new Date(date.getTime() - (60000 * date.getTimezoneOffset()) + (calendar.timezone * 60000));
                return new Date(date.getTime() - (60000 * date.getTimezoneOffset()) - (calendar.timezone * 60000));
            } else {
                return date;
            }
        },
        print : function(value) {
            Jsonix.Util.Ensure.ensureDate(value);
            return this.printDateTime(new Jsonix.XML.Calendar({
                year : value.getFullYear(),
                month : value.getMonth() + 1,
                day : value.getDate(),
                hour : value.getHours(),
                minute : value.getMinutes(),
                second : value.getSeconds(),
                fractionalSecond : (value.getMilliseconds() / 1000),
                timezone: -value.getTimezoneOffset() // mvv: added
            }));
        },
        isInstance : function(value) {
            return Jsonix.Util.Type.isDate(value);
        },
        CLASS_NAME : 'Jsonix.Schema.XSD.DateTime'
    });
    Jsonix.Schema.XSD.DateTime.INSTANCE = new Jsonix.Schema.XSD.DateTime();
    Jsonix.Schema.XSD.DateTime.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.DateTime.INSTANCE);

    Jsonix.Schema.XSD.Time = Jsonix.Class(Jsonix.Schema.XSD.Calendar, {
        typeName : Jsonix.Schema.XSD.qname('time'),
        parse : function(value) {
            var calendar = this.parseTime(value);
            //		
            if (Jsonix.Util.NumberUtils.isInteger(calendar.timezone)) {
                var date = new Date(70, 0, 1, calendar.hour, calendar.minute, calendar.second);
                if (Jsonix.Util.Type.isNumber(calendar.fractionalSecond)) {
                    date.setMilliseconds(Math.floor(1000 * calendar.fractionalSecond));
                }

                var time = date.getTime() - (calendar.timezone * 60000);
                return new Date(time - (60000 * date.getTimezoneOffset()));

            } else {
                var result = new Date(70, 0, 1, calendar.hour, calendar.minute, calendar.second);
                if (Jsonix.Util.Type.isNumber(calendar.fractionalSecond)) {
                    result.setMilliseconds(Math.floor(1000 * calendar.fractionalSecond));
                }
                return result;
            }
        },
        print : function(value) {
            Jsonix.Util.Ensure.ensureDate(value);
            var time = value.getTime();
            if (time <= -86400000 && time >= 86400000) {
                throw 'Invalid time [' + value + '].';
            }
            if (time >= 0) {
                return this.printTime(new Jsonix.XML.Calendar({
                    hour : value.getHours(),
                    minute : value.getMinutes(),
                    second : value.getSeconds(),
                    fractionalSecond : (value.getMilliseconds() / 1000)
                }));
            } else {
                var timezoneOffsetHours = Math.ceil(-time / 3600000);
                return this.printTime(new Jsonix.XML.Calendar({
                    hour : (value.getUTCHours() + timezoneOffsetHours) % 24,
                    minute : value.getUTCMinutes(),
                    second : value.getUTCSeconds(),
                    fractionalSecond : (value.getUTCMilliseconds() / 1000),
                    timezone : timezoneOffsetHours * 60
                }));
            }
        },
        isInstance : function(value) {
            return Jsonix.Util.Type.isDate(value) && value.getTime() > -86400000 && value.getTime() < 86400000;
        },
        CLASS_NAME : 'Jsonix.Schema.XSD.Time'
    });
    Jsonix.Schema.XSD.Time.INSTANCE = new Jsonix.Schema.XSD.Time();
    Jsonix.Schema.XSD.Time.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Time.INSTANCE);

    Jsonix.Schema.XSD.Date = Jsonix.Class(Jsonix.Schema.XSD.Calendar, {
        typeName : Jsonix.Schema.XSD.qname('date'),
        parse : function(value) {
            var calendar = this.parseDate(value);
            //		
            if (Jsonix.Util.NumberUtils.isInteger(calendar.timezone)) {
                var date = new Date();
                date.setFullYear(calendar.year);
                date.setMonth(calendar.month - 1);
                date.setDate(calendar.day);
                date.setHours(0);
                date.setMinutes(0);
                date.setSeconds(0);
                date.setMilliseconds(0);
                return new Date(date.getTime() - (60000 * date.getTimezoneOffset()) + (calendar.timezone * 60000));
            } else {
                var result = new Date();
                result.setFullYear(calendar.year);
                result.setMonth(calendar.month - 1);
                result.setDate(calendar.day);
                result.setHours(0);
                result.setMinutes(0);
                result.setSeconds(0);
                result.setMilliseconds(0);
                return result;
            }
        },
        print : function(value) {
            Jsonix.Util.Ensure.ensureDate(value);
            var localDate = new Date(value.getTime());
            localDate.setHours(0);
            localDate.setMinutes(0);
            localDate.setSeconds(0);
            localDate.setMilliseconds(0);

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
                        timezone : Math.floor(timezoneOffset / (60000))
                    }));
                } else {
                    var nextDay = new Date(value.getTime() + 86400000);
                    return this.printDate(new Jsonix.XML.Calendar({
                        year : nextDay.getFullYear(),
                        month : nextDay.getMonth() + 1,
                        day : nextDay.getDate(),
                        timezone : (Math.floor(timezoneOffset / (60000)) - 1440)
                    }));
                }
            }
        },
        isInstance : function(value) {
            return Jsonix.Util.Type.isDate(value);
        },
        CLASS_NAME : 'Jsonix.Schema.XSD.Date'
    });
    Jsonix.Schema.XSD.Date.INSTANCE = new Jsonix.Schema.XSD.Date();
    Jsonix.Schema.XSD.Date.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Date.INSTANCE);

    Jsonix.Schema.XSD.GYearMonth = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
        typeName : Jsonix.Schema.XSD.qname('gYearMonth'),
        CLASS_NAME : 'Jsonix.Schema.XSD.GYearMonth'
    });
    Jsonix.Schema.XSD.GYearMonth.INSTANCE = new Jsonix.Schema.XSD.GYearMonth();
    Jsonix.Schema.XSD.GYearMonth.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
        Jsonix.Schema.XSD.GYearMonth.INSTANCE);

    Jsonix.Schema.XSD.GYear = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
        typeName : Jsonix.Schema.XSD.qname('gYear'),
        CLASS_NAME : 'Jsonix.Schema.XSD.GYear'
    });
    Jsonix.Schema.XSD.GYear.INSTANCE = new Jsonix.Schema.XSD.GYear();
    Jsonix.Schema.XSD.GYear.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
        Jsonix.Schema.XSD.GYear.INSTANCE);

    Jsonix.Schema.XSD.GMonthDay = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
        typeName : Jsonix.Schema.XSD.qname('gMonthDay'),
        CLASS_NAME : 'Jsonix.Schema.XSD.GMonthDay'
    });
    Jsonix.Schema.XSD.GMonthDay.INSTANCE = new Jsonix.Schema.XSD.GMonthDay();
    Jsonix.Schema.XSD.GMonthDay.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
        Jsonix.Schema.XSD.GMonthDay.INSTANCE);

    Jsonix.Schema.XSD.GDay = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
        typeName : Jsonix.Schema.XSD.qname('gDay'),
        CLASS_NAME : 'Jsonix.Schema.XSD.GDay'
    });
    Jsonix.Schema.XSD.GDay.INSTANCE = new Jsonix.Schema.XSD.GDay();
    Jsonix.Schema.XSD.GDay.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
        Jsonix.Schema.XSD.GDay.INSTANCE);

    Jsonix.Schema.XSD.GMonth = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
        typeName : Jsonix.Schema.XSD.qname('gMonth'),
        CLASS_NAME : 'Jsonix.Schema.XSD.GMonth'
    });
    Jsonix.Schema.XSD.GMonth.INSTANCE = new Jsonix.Schema.XSD.GMonth();
    Jsonix.Schema.XSD.GMonth.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
        Jsonix.Schema.XSD.GMonth.INSTANCE);

    Jsonix.Model.ClassInfo = Jsonix.Class({
        name : null,
        baseTypeInfo : null,
        properties : null,
        structure : null,
        defaultElementNamespaceURI : '',
        defaultAttributeNamespaceURI : '',
        initialize : function(options) {
            Jsonix.Util.Ensure.ensureObject(options);
            Jsonix.Util.Ensure.ensureString(options.name);
            this.name = options.name;
            if (Jsonix.Util.Type.isString(options.defaultElementNamespaceURI)) {
                this.defaultElementNamespaceURI = options.defaultElementNamespaceURI;
            }
            if (Jsonix.Util.Type.isString(options.defaultAttributeNamespaceURI)) {
                this.defaultAttributeNamespaceURI = options.defaultAttributeNamespaceURI;
            }
            if (Jsonix.Util.Type.exists(options.baseTypeInfo)) {
                Jsonix.Util.Ensure.ensureObject(options.baseTypeInfo);
                this.baseTypeInfo = options.baseTypeInfo;
            }
            this.properties = [];
            if (Jsonix.Util.Type.exists(options.propertyInfos)) {
                Jsonix.Util.Ensure.ensureArray(options.propertyInfos);
                for ( var index = 0; index < options.propertyInfos.length; index++) {
                    this.properties[index] = options.propertyInfos[index];
                }
            }
        },
        destroy : function() {
        },
        build : function(context) {
            if (this.structure !== null) {
                return;
            }
            var structure = {
                elements : null,
                attributes : {},
                anyAttribute : null,
                value : null,
                any : null
            };
            /* [ mvv: Не сериализует в рекурсии родительские свойства (не ясно почему так сделано). Перенесено чуть ниже в buildStructure.
             if (Jsonix.Util.Type.exists(this.baseTypeInfo)) {
             this.baseTypeInfo.buildStructure(context, structure);
             }
             ] */
            this.buildStructure(context, structure);
            this.structure = structure;
        },
        buildStructure : function(context, structure) {
            // [ mvv: Перенесен кусок кода из build (см. выше)
            if (Jsonix.Util.Type.exists(this.baseTypeInfo)) {
                this.baseTypeInfo.buildStructure(context, structure);
            }
            // ]
            for ( var index = 0; index < this.properties.length; index++) {
                var propertyInfo = this.properties[index];
                propertyInfo.buildStructure(context, structure);
            }
        },
        unmarshal : function(context, input) {
            this.build(context);
            var result = {};

            if (input.eventType !== 1) {
                throw "Parser must be on START_ELEMENT to read a class info.";
            }

            // Read attributes
            if (Jsonix.Util.Type.exists(this.structure.attributes)) {
                var attributeCount = input.getAttributeCount();
                if (attributeCount !== 0) {
                    for ( var index = 0; index < attributeCount; index++) {
                        var attributeName = input.getAttributeName(index);
                        var attributeKey = attributeName.key;
                        if (Jsonix.Util.Type.exists(this.structure.attributes[attributeKey])) {

                            var attributePropertyInfo = this.structure.attributes[attributeKey];
                            this.unmarshalProperty(context, input, attributePropertyInfo, result);
                        }
                    }
                }
            }
            // Read any attribute
            if (Jsonix.Util.Type.exists(this.structure.anyAttribute)) {
                var propertyInfo = this.structure.anyAttribute;
                this.unmarshalProperty(context, input, propertyInfo, result);
            }
            // Read elements
            if (Jsonix.Util.Type.exists(this.structure.elements)) {

                var et = input.next();
                while (et !== Jsonix.XML.Input.END_ELEMENT) {
                    if (et === Jsonix.XML.Input.START_ELEMENT) {
                        // New sub-element starts
                        var elementName = input.getName();
                        var elementKey = elementName.key;
                        if (Jsonix.Util.Type.exists(this.structure.elements[elementKey])) {
                            var elementPropertyInfo = this.structure.elements[elementKey];
                            this.unmarshalProperty(context, input, elementPropertyInfo, result);
                        } else if (Jsonix.Util.Type.exists(this.structure.any)) {
                            // TODO Refactor

                            var anyPropertyInfo = this.structure.any;
                            this.unmarshalProperty(context, input, anyPropertyInfo, result);
                        } else {
                            // TODO report a validation error that element
                            // is not expected
                            throw 'Unexpected element [' + elementKey + '].';
                        }
                    } else if ((et === Jsonix.XML.Input.CHARACTERS || et === Jsonix.XML.Input.CDATA || et === Jsonix.XML.Input.ENTITY_REFERENCE) && Jsonix.Util.Type.exists(this.structure.mixed)) {
                        // Characters and structure has a mixed property
                        var mixedPropertyInfo = this.structure.mixed;
                        this.unmarshalProperty(context, input, mixedPropertyInfo, result);
                    } else if (et === Jsonix.XML.Input.SPACE || et === Jsonix.XML.Input.COMMENT || et === Jsonix.XML.Input.PROCESSING_INSTRUCTION) {
                        // Ignore
                    } else {
                        throw "Illegal state: unexpected event type [" + et + "].";
                    }
                    et = input.next();
                }
            } else if (Jsonix.Util.Type.exists(this.structure.value)) {
                var valuePropertyInfo = this.structure.value;
                this.unmarshalProperty(context, input, valuePropertyInfo, result);
            } else {
                // Just skip everything
                input.nextTag();
            }
            if (input.eventType !== 2) {
                throw "Illegal state: must be END_ELEMENT.";
            }
            return result;
        },
        unmarshalProperty : function(context, input, propertyInfo, result) {
            var propertyValue = propertyInfo.unmarshal(context, this, input);
            propertyInfo.setProperty(result, propertyValue);
        },
        marshal : function(context, value, output) {
            // TODO This must be reworked
            if (Jsonix.Util.Type.exists(this.baseTypeInfo)) {
                this.baseTypeInfo.marshal(context, value, output);
            }
            for ( var index = 0; index < this.properties.length; index++) {
                var propertyInfo = this.properties[index];
                var propertyValue = value[propertyInfo.name];
                if (Jsonix.Util.Type.exists(propertyValue)) {
                    propertyInfo.marshal(context, this, propertyValue, output);
                }
            }
        },
        isInstance : function(value) {
            return Jsonix.Util.Type.isObject(value) && Jsonix.Util.Type.isString(value.TYPE_NAME) && value.TYPE_NAME === this.name;
        },
        b : function(baseTypeInfo) {
            Jsonix.Util.Ensure.ensureObject(baseTypeInfo);
            this.baseTypeInfo = baseTypeInfo;
            return this;
        },
        ps : function() {
            return this;
        },
        addProperty : function(property) {
            this.properties.push(property);
            return this;
        },
        aa : function(options) {
            this.addDefaultNamespaces(options);
            return this.addProperty(new Jsonix.Model.AnyAttributePropertyInfo(options));
        },
        ae : function(options) {
            this.addDefaultNamespaces(options);
            return this.addProperty(new Jsonix.Model.AnyElementPropertyInfo(options));
        },
        a : function(options) {
            this.addDefaultNamespaces(options);
            return this.addProperty(new Jsonix.Model.AttributePropertyInfo(options));
        },
        em : function(options) {
            this.addDefaultNamespaces(options);
            return this.addProperty(new Jsonix.Model.ElementMapPropertyInfo(options));
        },
        e : function(options) {
            this.addDefaultNamespaces(options);
            return this.addProperty(new Jsonix.Model.ElementPropertyInfo(options));
        },
        es : function(options) {
            this.addDefaultNamespaces(options);
            return this.addProperty(new Jsonix.Model.ElementsPropertyInfo(options));
        },
        er : function(options) {
            this.addDefaultNamespaces(options);
            return this.addProperty(new Jsonix.Model.ElementRefPropertyInfo(options));
        },
        ers : function(options) {
            this.addDefaultNamespaces(options);
            return this.addProperty(new Jsonix.Model.ElementRefsPropertyInfo(options));
        },
        v : function(options) {
            this.addDefaultNamespaces(options);
            return this.addProperty(new Jsonix.Model.ValuePropertyInfo(options));
        },
        addDefaultNamespaces : function(options) {
            if (Jsonix.Util.Type.isObject(options)) {
                if (!Jsonix.Util.Type.isString(options.defaultElementNamespaceURI)) {
                    options.defaultElementNamespaceURI = this.defaultElementNamespaceURI;
                }
                if (!Jsonix.Util.Type.isString(options.defaultAttributeNamespaceURI)) {
                    options.defaultAttributeNamespaceURI = this.defaultAttributeNamespaceURI;
                }
            }
        },
        CLASS_NAME : 'Jsonix.Model.ClassInfo'
    });

    Jsonix.Model.PropertyInfo = Jsonix.Class({
        name : null,
        collection : false,
        defaultElementNamespaceURI : '',
        defaultAttributeNamespaceURI : '',
        initialize : function(options) {
            Jsonix.Util.Ensure.ensureObject(options);
            Jsonix.Util.Ensure.ensureString(options.name);
            this.name = options.name;
            if (Jsonix.Util.Type.isString(options.defaultElementNamespaceURI)) {
                this.defaultElementNamespaceURI = options.defaultElementNamespaceURI;
            }
            if (Jsonix.Util.Type.isString(options.defaultAttributeNamespaceURI)) {
                this.defaultAttributeNamespaceURI = options.defaultAttributeNamespaceURI;
            }
            if (Jsonix.Util.Type.isBoolean(options.collection)) {
                this.collection = options.collection;
            } else {
                this.collection = false;
            }
        },
        buildStructure : function(context, structure) {
            throw "Abstract method [buildStructure].";
        },
        setProperty : function(object, value) {
            if (Jsonix.Util.Type.exists(value)) {
                if (this.collection) {
                    Jsonix.Util.Ensure.ensureArray(value, 'Collection property requires an array value.');
                    if (!Jsonix.Util.Type.exists(object[this.name])) {
                        object[this.name] = [];
                    }
                    for ( var index = 0; index < value.length; index++) {
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
        initialize : function(options) {
            Jsonix.Util.Ensure.ensureObject(options);
            Jsonix.Model.PropertyInfo.prototype.initialize.apply(this, [ options ]);
        },
        unmarshal : function(context, scope, input) {
            var attributeCount = input.getAttributeCount();
            if (attributeCount === 0) {
                return null;
            } else {
                var result = {};
                for ( var index = 0; index < attributeCount; index++) {
                    var attributeName = input.getAttributeName(index);
                    var attributeValue = input.getAttributeValue(index);
                    if (Jsonix.Util.Type.isString(attributeValue)) {
                        result[attributeName.key] = attributeValue;
                    }
                }
                return result;
            }
        },
        marshal : function(context, scope, value, output) {
            if (!Jsonix.Util.Type.isObject(value)) {
                // Nothing to do
                return;
            }
            for ( var attributeName in value) {
                if (value.hasOwnProperty(attributeName)) {
                    var attributeValue = value[attributeName];
                    if (Jsonix.Util.Type.isString(attributeValue)) {
                        output.writeAttribute(Jsonix.XML.QName.fromString(attributeName), attributeValue);
                    }
                }
            }

        },
        buildStructure : function(context, structure) {
            Jsonix.Util.Ensure.ensureObject(structure);
            // if (Jsonix.Util.Type.exists(structure.anyAttribute))
            // {
            // // TODO better exception
            // throw "The structure already defines an any attribute
            // property.";
            // } else
            // {
            structure.anyAttribute = this;
            // }
        },
        CLASS_NAME : 'Jsonix.Model.AnyAttributePropertyInfo'
    });


    Jsonix.Model.SingleTypePropertyInfo = Jsonix.Class(Jsonix.Model.PropertyInfo, {
        typeInfo : Jsonix.Schema.XSD.String.INSTANCE,
        initialize : function(options) {
            Jsonix.Util.Ensure.ensureObject(options);
            Jsonix.Model.PropertyInfo.prototype.initialize.apply(this, [ options ]);
            // TODO Ensure correct argument
            if (Jsonix.Util.Type.exists(options.typeInfo)) {
                Jsonix.Util.Ensure.ensureObject(options.typeInfo);
                Jsonix.Util.Ensure.ensureFunction(options.typeInfo.parse);
                Jsonix.Util.Ensure.ensureFunction(options.typeInfo.print);
                this.typeInfo = options.typeInfo;
            }
        },
        parse : function(context, scope, value) {
            return this.typeInfo.parse(value);
        },
        print : function(context, scope, value) {
            return this.typeInfo.print(value);
        },
        CLASS_NAME : 'Jsonix.Model.SingleTypePropertyInfo'
    });


    Jsonix.Model.AttributePropertyInfo = Jsonix.Class(Jsonix.Model.SingleTypePropertyInfo, {
        attributeName : null,
        initialize : function(options) {
            Jsonix.Util.Ensure.ensureObject(options);
            Jsonix.Model.SingleTypePropertyInfo.prototype.initialize.apply(this, [ options ]);
            // TODO Ensure correct argument
            if (Jsonix.Util.Type.isObject(options.attributeName)) {
                Jsonix.Util.Ensure.ensureString(options.attributeName.localPart, 'Attribute name must contain a string property [localPart].');
                this.attributeName = Jsonix.XML.QName.fromObject(options.attributeName);
            } else if (Jsonix.Util.Type.isString(options.attributeName)) {
                this.attributeName = new Jsonix.XML.QName(this.defaultAttributeNamespaceURI, options.attributeName);
            } else {
                this.attributeName = new Jsonix.XML.QName(this.defaultAttributeNamespaceURI, this.name);
            }
        },
        unmarshal : function(context, scope, input) {
            var attributeCount = input.getAttributeCount();
            var result = null;
            for ( var index = 0; index < attributeCount; index++) {
                var attributeName = input.getAttributeName(index);
                if (this.attributeName.key === attributeName.key) {
                    var attributeValue = input.getAttributeValue(index);
                    if (Jsonix.Util.Type.isString(attributeValue)) {
                        result = this.parse(context, scope, attributeValue);
                    }
                }
            }
            return result;
        },
        marshal : function(context, scope, value, output) {
            if (Jsonix.Util.Type.exists(value)) {
                output.writeAttribute(this.attributeName, this.print(context, scope, value));
            }

        },
        buildStructure : function(context, structure) {
            Jsonix.Util.Ensure.ensureObject(structure);
            Jsonix.Util.Ensure.ensureObject(structure.attributes);
            var key = this.attributeName.key;
            // if (Jsonix.Util.Type.exists(structure.attributes[key])) {
            // // TODO better exception
            // throw "The structure already defines an attribute for the key
            // ["
            // + key + "].";
            // } else
            // {
            structure.attributes[key] = this;
            // }
        },
        CLASS_NAME : 'Jsonix.Model.AttributePropertyInfo'
    });


    Jsonix.Model.ValuePropertyInfo = Jsonix.Class(Jsonix.Model.SingleTypePropertyInfo, {
        initialize : function(options) {
            Jsonix.Util.Ensure.ensureObject(options);
            Jsonix.Model.SingleTypePropertyInfo.prototype.initialize.apply(this, [ options ]);
        },
        unmarshal : function(context, scope, input) {
            var text = input.getElementText();
            if (Jsonix.Util.StringUtils.isNotBlank(text)) {
                return this.parse(context, scope, text);
            } else {
                return null;
            }
        },
        marshal : function(context, scope, value, output) {
            if (!Jsonix.Util.Type.exists(value)) {
                return;
            }
            output.writeCharacters(this.print(context, scope, value));
        },
        buildStructure : function(context, structure) {
            Jsonix.Util.Ensure.ensureObject(structure);
            // if (Jsonix.Util.Type.exists(structure.value)) {
            // // TODO better exception
            // throw "The structure already defines a value
            // property.";
            // } else
            if (Jsonix.Util.Type.exists(structure.elements)) {
                // TODO better exception
                throw "The structure already defines element mappings, it cannot define a value property.";
            } else {
                structure.value = this;
            }
        },
        CLASS_NAME : 'Jsonix.Model.ValuePropertyInfo'
    });


    Jsonix.Model.AbstractElementsPropertyInfo = Jsonix.Class(Jsonix.Model.PropertyInfo, {
        wrapperElementName : null,
        initialize : function(options) {
            Jsonix.Util.Ensure.ensureObject(options);
            Jsonix.Model.PropertyInfo.prototype.initialize.apply(this, [ options ]);
            // TODO Ensure correct argument
            if (Jsonix.Util.Type.isObject(options.wrapperElementName)) {
                Jsonix.Util.Ensure.ensureString(options.wrapperElementName.localPart, 'Wrapper element name must contain a string property [localPart].');
                this.wrapperElementName = Jsonix.XML.QName.fromObject(options.wrapperElementName);
            } else if (Jsonix.Util.Type.isString(options.wrapperElementName)) {
                this.wrapperElementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, options.wrapperElementName);
            } else {
                this.wrapperElementName = null;
            }
        },
        unmarshal : function(context, scope, input) {
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
                        throw "Value already set.";
                    }
                }
            };

            if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
                this.unmarshalWrapperElement(context, input, callback);
            } else {
                this.unmarshalElement(context, input, callback);
            }
            return result;
        },
        unmarshalWrapperElement : function(context, input, callback) {
            var et = input.next();
            while (et !== Jsonix.XML.Input.END_ELEMENT) {
                // New sub-element starts
                if (et === Jsonix.XML.Input.START_ELEMENT) {
                    this.unmarshalElement(context, input, callback);
                } else if (et === Jsonix.XML.Input.SPACE || et === Jsonix.XML.Input.COMMENT || et === Jsonix.XML.Input.PROCESSING_INSTRUCTION) {
                    // Skip whitespace
                } else {
                    // TODO ignore comments, processing
                    // instructions
                    throw "Illegal state: unexpected event type [" + et + "].";
                }
                et = input.next();
            }
        },
        unmarshalElement : function(context, input, callback) {
            throw "Abstract method [unmarshalElement].";
        },
        marshal : function(context, scope, value, output) {

            if (!Jsonix.Util.Type.exists(value)) {
                // Do nothing
                return;
            }

            if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
                output.writeStartElement(this.wrapperElementName);
            }

            if (!this.collection) {
                this.marshalElement(context, value, output);
            } else {
                Jsonix.Util.Ensure.ensureArray(value);
                // TODO Exception if not array
                for ( var index = 0; index < value.length; index++) {
                    var item = value[index];
                    // TODO Exception if item does not exist
                    this.marshalElement(context, item, output);
                }
            }

            if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
                output.writeEndElement();
            }
        },
        marshalElement : function(context, value, output) {
            throw "Abstract method [marshalElement].";
        },
        marshalElementTypeInfo : function(context, value, elementName, typeInfo, output) {
            output.writeStartElement(elementName);
            typeInfo.marshal(context, value, output);
            output.writeEndElement();
        },
        buildStructure : function(context, structure) {
            Jsonix.Util.Ensure.ensureObject(structure);
            if (Jsonix.Util.Type.exists(structure.value)) {
                // TODO better exception
                throw "The structure already defines a value property.";
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
            throw "Abstract method [buildStructureElements].";
        },
        CLASS_NAME : 'Jsonix.Model.AbstractElementsPropertyInfo'
    });


    Jsonix.Model.ElementPropertyInfo = Jsonix.Class(Jsonix.Model.AbstractElementsPropertyInfo, {
        typeInfo : Jsonix.Schema.XSD.String.INSTANCE,
        elementName : null,
        initialize : function(options) {
            Jsonix.Util.Ensure.ensureObject(options);
            Jsonix.Model.AbstractElementsPropertyInfo.prototype.initialize.apply(this, [ options ]);
            // TODO Ensure correct argument
            if (Jsonix.Util.Type.exists(options.typeInfo)) {
                Jsonix.Util.Ensure.ensureObject(options.typeInfo);
                this.typeInfo = options.typeInfo;
            }
            // TODO Ensure correct argument
            if (Jsonix.Util.Type.isObject(options.elementName)) {
                this.elementName = Jsonix.XML.QName.fromObject(options.elementName);
            } else if (Jsonix.Util.Type.isString(options.elementName)) {
                this.elementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, options.elementName);
            } else {
                this.elementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, this.name);
            }
        },
        unmarshalElement : function(context, input, callback) {
            return callback(this.typeInfo.unmarshal(context, input));
        },
        marshalElement : function(context, value, output) {
            this.marshalElementTypeInfo(context, value, this.elementName, this.typeInfo, output);
        },
        buildStructureElements : function(context, structure) {
            structure.elements[this.elementName.key] = this;
        },
        CLASS_NAME : 'Jsonix.Model.ElementPropertyInfo'
    });


    Jsonix.Model.ElementsPropertyInfo = Jsonix.Class(Jsonix.Model.AbstractElementsPropertyInfo, {
        elementTypeInfos : null,
        elementTypeInfosMap : null,
        initialize : function(options) {
            Jsonix.Util.Ensure.ensureObject(options);
            Jsonix.Model.AbstractElementsPropertyInfo.prototype.initialize.apply(this, [ options ]);
            // TODO Ensure correct arguments
            Jsonix.Util.Ensure.ensureArray(options.elementTypeInfos);
            this.elementTypeInfos = options.elementTypeInfos;
            this.elementTypeInfosMap = {};
            for ( var index = 0; index < this.elementTypeInfos.length; index++) {
                var elementTypeInfo = this.elementTypeInfos[index];
                Jsonix.Util.Ensure.ensureObject(elementTypeInfo);
                if (Jsonix.Util.Type.isObject(elementTypeInfo.elementName)) {
                    Jsonix.Util.Ensure.ensureString(elementTypeInfo.elementName.localPart, 'Element name must contain a string property [localPart].');
                    elementTypeInfo.elementName = Jsonix.XML.QName.fromObject(elementTypeInfo.elementName);
                } else {
                    Jsonix.Util.Ensure.ensureString(elementTypeInfo.elementName);
                    elementTypeInfo.elementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, elementTypeInfo.elementName);
                }
                this.elementTypeInfosMap[elementTypeInfo.elementName.key] = elementTypeInfo.typeInfo;
            }
        },
        unmarshalElement : function(context, input, callback) {
            // TODO make sure it's the right event type
            var elementName = input.getName();
            var key = elementName.key;
            var typeInfo = this.elementTypeInfosMap[key];
            if (Jsonix.Util.Type.exists(typeInfo)) {
                return callback(typeInfo.unmarshal(context, input));
            }
            // TODO better exception
            throw "Element [" + key + "] is not known in this context";
        },
        marshalElement : function(context, value, output) {
            for ( var index = 0; index < this.elementTypeInfos.length; index++) {
                var elementTypeInfo = this.elementTypeInfos[index];
                var typeInfo = elementTypeInfo.typeInfo;
                if (typeInfo.isInstance(value)) {
                    var elementName = elementTypeInfo.elementName;
                    this.marshalElementTypeInfo(context, value, elementName, typeInfo, output);
                    return;
                }
            }
            throw "Could not find an element with type info supporting the value [" + value + "].";
        },
        buildStructureElements : function(context, structure) {
            for ( var index = 0; index < this.elementTypeInfos.length; index++) {
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
        initialize : function(options) {
            Jsonix.Util.Ensure.ensureObject(options);
            Jsonix.Model.AbstractElementsPropertyInfo.prototype.initialize.apply(this, [ options ]);
            // TODO Ensure correct argument
            Jsonix.Util.Ensure.ensureObject(options.key);
            this.key = options.key;
            Jsonix.Util.Ensure.ensureObject(options.value);
            this.value = options.value;
            // TODO Ensure correct argument
            if (Jsonix.Util.Type.isObject(options.elementName)) {
                Jsonix.Util.Ensure.ensureString(options.elementName.localPart, 'Element name must contain a string property [localPart].');
                this.elementName = Jsonix.XML.QName.fromObject(options.elementName);
            } else if (Jsonix.Util.Type.isString(options.elementName)) {
                this.elementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, options.elementName);
            } else {
                this.elementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, this.name);
            }
            this.entryTypeInfo = new Jsonix.Model.ClassInfo({
                name : "",
                properties : [ this.key, this.value ]
            });

        },
        unmarshalWrapperElement : function(context, input) {
            var result = Jsonix.Model.AbstractElementsPropertyInfo.prototype.unmarshalWrapperElement.apply(this, arguments);
        },
        unmarshal : function(context, scope, input) {
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
                                    throw "Value already set.";
                                }
                            }
                        }
                    }
                }
            };

            if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
                this.unmarshalWrapperElement(context, input, callback);
            } else {
                this.unmarshalElement(context, input, callback);
            }
            return result;
        },
        unmarshalElement : function(context, input, callback) {
            var entry = this.entryTypeInfo.unmarshal(context, input);
            var result = {};
            if (!!entry[this.key.name]) {
                result[entry[this.key.name]] = entry[this.value.name];
            }
            return callback(result);
        },
        marshal : function(context, scope, value, output) {

            if (!Jsonix.Util.Type.exists(value)) {
                // Do nothing
                return;
            }

            if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
                output.writeStartElement(this.wrapperElementName);
            }

            this.marshalElement(context, value, output);

            if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
                output.writeEndElement();
            }
        },
        marshalElement : function(context, value, output) {
            if (!!value) {
                for ( var attributeName in value) {
                    if (value.hasOwnProperty(attributeName)) {
                        var attributeValue = value[attributeName];
                        if (!this.collection) {
                            var singleEntry = {};
                            singleEntry[this.key.name] = attributeName;
                            singleEntry[this.value.name] = attributeValue;
                            output.writeStartElement(this.elementName);
                            this.entryTypeInfo.marshal(context, singleEntry, output);
                            output.writeEndElement();

                        } else {
                            for ( var index = 0; index < attributeValue.length; index++) {
                                var collectionEntry = {};
                                collectionEntry[this.key.name] = attributeName;
                                collectionEntry[this.value.name] = attributeValue[index];
                                output.writeStartElement(this.elementName);
                                this.entryTypeInfo.marshal(context, collectionEntry, output);
                                output.writeEndElement();
                            }
                        }
                    }
                }
            }
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

                            for ( var index = 0; index < attributeValue.length; index++) {
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


    Jsonix.Model.AbstractElementRefsPropertyInfo = Jsonix.Class(Jsonix.Model.PropertyInfo, {
        wrapperElementName : null,
        mixed : false,
        // TODO
        initialize : function(options) {
            Jsonix.Util.Ensure.ensureObject(options, 'Options argument must be an object.');
            Jsonix.Model.PropertyInfo.prototype.initialize.apply(this, [ options ]);
            if (Jsonix.Util.Type.isObject(options.wrapperElementName)) {
                Jsonix.Util.Ensure.ensureString(options.wrapperElementName.localPart, 'Wrapper element name must contain a string property [localPart].');
                this.wrapperElementName = Jsonix.XML.QName.fromObject(options.wrapperElementName);
            } else if (Jsonix.Util.Type.isString(options.wrapperElementName)) {
                this.wrapperElementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, options.wrapperElementName);
            } else {
                this.wrapperElementName = null;
            }
            if (Jsonix.Util.Type.isBoolean(options.mixed)) {
                this.mixed = options.mixed;
            } else {
                this.mixed = false;
            }
        },
        unmarshal : function(context, scope, input) {
            var et = input.eventType;

            if (et === Jsonix.XML.Input.START_ELEMENT) {
                if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
                    return this.unmarshalWrapperElement(context, scope, input);
                } else {
                    return this.unmarshalElement(context, scope, input);
                }
            } else if (this.mixed && (et === Jsonix.XML.Input.CHARACTERS || et === Jsonix.XML.Input.CDATA || et === Jsonix.XML.Input.ENTITY_REFERENCE)) {
                var value = input.getText();
                if (this.collection) {
                    return [ value ];

                } else {
                    return value;
                }
            } else if (et === Jsonix.XML.Input.SPACE || et === Jsonix.XML.Input.COMMENT || et === Jsonix.XML.Input.PROCESSING_INSTRUCTION) {
                // Skip whitespace
            } else {
                // TODO better exception
                throw "Illegal state: unexpected event type [" + et + "].";
            }
        },
        unmarshalWrapperElement : function(context, scope, input) {
            var result = null;
            var et = input.next();
            while (et !== Jsonix.XML.Input.END_ELEMENT) {
                if (et === Jsonix.XML.Input.START_ELEMENT) {
                    var name = input.getName();
                    var value = this.unmarshalElement(context, scope, input);
                    if (this.collection) {
                        if (result === null) {
                            result = [];
                        }
                        for ( var index = 0; index < value.length; index++) {
                            result.push(value[index]);
                        }

                    } else {
                        if (result === null) {
                            result = value;
                        } else {
                            // TODO Report validation error
                            throw "Value already set.";
                        }
                    }
                } else
                // Characters
                if (this.mixed && (et === Jsonix.XML.Input.CHARACTERS || et === Jsonix.XML.Input.CDATA || et === Jsonix.XML.Input.ENTITY_REFERENCE)) {
                    var text = input.getText();
                    if (this.collection) {
                        if (result === null) {
                            result = [];
                        }
                        result.push(text);
                    } else {
                        if (result === null) {
                            result = text;
                        } else {
                            // TODO Report validation error
                            throw "Value already set.";
                        }
                    }
                } else if (et === Jsonix.XML.Input.SPACE || et === Jsonix.XML.Input.COMMENT || et === Jsonix.XML.Input.PROCESSING_INSTRUCTION) {
                    // Skip whitespace
                } else {
                    throw "Illegal state: unexpected event type [" + et + "].";
                }
                et = input.next();
            }
            return result;
        },
        unmarshalElement : function(context, scope, input) {
            var name = input.getName();
            var typeInfo = this.getElementTypeInfo(context, scope, name);
            var value = {
                name : input.getName(),
                value : typeInfo.unmarshal(context, input)
            };
            if (this.collection) {
                return [ value ];
            } else {
                return value;
            }
        },
        marshal : function(context, scope, value, output) {

            if (Jsonix.Util.Type.exists(value)) {
                if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
                    output.writeStartElement(this.wrapperElementName);
                }

                if (!this.collection) {
                    this.marshalItem(context, scope, value, output);
                } else {
                    Jsonix.Util.Ensure.ensureArray(value, 'Collection property requires an array value.');
                    for ( var index = 0; index < value.length; index++) {
                        var item = value[index];
                        this.marshalItem(context, scope, item, output);
                    }
                }

                if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
                    output.writeEndElement();
                }
            }

        },
        marshalItem : function(context, scope, value, output) {

            if (Jsonix.Util.Type.isString(value)) {
                if (!this.mixed) {
                    // TODO
                    throw "Property is not mixed, can't handle string values.";
                } else {
                    output.writeCharacters(value);
                }
            } else if (Jsonix.Util.Type.isObject(value)) {
                this.marshalElement(context, scope, value, output);

            } else {
                if (this.mixed) {
                    throw "Unsupported content type, either objects or strings are supported.";
                } else {
                    throw "Unsupported content type, only objects are supported.";
                }
            }

        },
        marshalElement : function(context, scope, value, output) {
            var elementName = Jsonix.XML.QName.fromObject(value.name);
            var typeInfo = this.getElementTypeInfo(context, scope, elementName);
            return this.marshalElementTypeInfo(context, value, elementName, typeInfo, output);
        },
        marshalElementTypeInfo : function(context, value, elementName, typeInfo, output) {
            output.writeStartElement(elementName);
            if (Jsonix.Util.Type.exists(value.value)) {
                typeInfo.marshal(context, value.value, output);
            }
            output.writeEndElement();

        },
        getElementTypeInfo : function(context, scope, elementName) {
            var propertyElementTypeInfo = this.getPropertyElementTypeInfo(elementName);
            if (Jsonix.Util.Type.exists(propertyElementTypeInfo)) {
                return propertyElementTypeInfo.typeInfo;
            } else {
                var contextElementTypeInfo = context.getElementInfo(elementName, scope);
                if (Jsonix.Util.Type.exists(contextElementTypeInfo)) {
                    return contextElementTypeInfo.typeInfo;
                } else {
                    throw "Element [" + elementName.key + "] is not known in this context.";
                }
            }

        },
        getPropertyElementTypeInfo : function(elementName) {
            throw "Abstract method [getPropertyElementTypeInfo].";
        },
        buildStructure : function(context, structure) {
            Jsonix.Util.Ensure.ensureObject(structure);
            if (Jsonix.Util.Type.exists(structure.value)) {
                // TODO better exception
                throw "The structure already defines a value property.";
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
            // throw "The structure already defines an element for
            // the key ["
            // + key + "].";
            // } else
            // {
            // structure.elements[key] = this;
            // }

            if (this.mixed && !Jsonix.Util.Type.exists(this.wrapperElementName)) {
                // if (Jsonix.Util.Type.exists(structure.mixed)) {
                // // TODO better exception
                // throw "The structure already defines the mixed
                // property.";
                // } else
                // {
                structure.mixed = this;
                // }
            }
        },
        buildStructureElements : function(context, structure) {
            throw "Abstract method [buildStructureElements].";
        },
        buildStructureElementTypeInfos : function(context, structure, elementTypeInfo) {
            structure.elements[elementTypeInfo.elementName.key] = this;
            var substitutionMembers = context.getSubstitutionMembers(elementTypeInfo.elementName);
            if (Jsonix.Util.Type.isArray(substitutionMembers)) {
                for ( var jndex = 0; jndex < substitutionMembers.length; jndex++) {
                    var substitutionElementInfo = substitutionMembers[jndex];
                    this.buildStructureElementTypeInfos(context, structure, substitutionElementInfo);
                }

            }
        },
        CLASS_NAME : 'Jsonix.Model.ElementRefPropertyInfo'
    });


    Jsonix.Model.ElementRefPropertyInfo = Jsonix.Class(Jsonix.Model.AbstractElementRefsPropertyInfo, {
        typeInfo : Jsonix.Schema.XSD.String.INSTANCE,
        elementName : null,
        initialize : function(options) {
            Jsonix.Util.Ensure.ensureObject(options);
            Jsonix.Model.AbstractElementRefsPropertyInfo.prototype.initialize.apply(this, [ options ]);
            // TODO Ensure correct argument
            if (Jsonix.Util.Type.exists(options.typeInfo)) {
                Jsonix.Util.Ensure.ensureObject(options.typeInfo);
                this.typeInfo = options.typeInfo;
            }
            // TODO Ensure correct argument
            if (Jsonix.Util.Type.isObject(options.elementName)) {
                this.elementName = Jsonix.XML.QName.fromObject(options.elementName);
            } else if (Jsonix.Util.Type.isString(options.elementName)) {
                this.elementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, options.elementName);
            } else {
                this.elementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, this.name);
            }
        },
        getPropertyElementTypeInfo : function(elementName) {
            Jsonix.Util.Ensure.ensureObject(elementName);
            Jsonix.Util.Ensure.ensureString(elementName.localPart);
            var name = Jsonix.XML.QName.fromObject(elementName);

            if (name.key === this.elementName.key) {
                return this;
            } else {
                return null;
            }
        },
        buildStructureElements : function(context, structure) {
            this.buildStructureElementTypeInfos(context, structure, this);
        },
        CLASS_NAME : 'Jsonix.Model.ElementRefPropertyInfo'
    });


    Jsonix.Model.ElementRefsPropertyInfo = Jsonix.Class(Jsonix.Model.AbstractElementRefsPropertyInfo, {
        elementTypeInfos : null,
        elementTypeInfosMap : null,
        initialize : function(options) {
            Jsonix.Util.Ensure.ensureObject(options);
            Jsonix.Model.AbstractElementRefsPropertyInfo.prototype.initialize.apply(this, [ options ]);
            // TODO Ensure correct arguments
            Jsonix.Util.Ensure.ensureArray(options.elementTypeInfos);
            this.elementTypeInfos = options.elementTypeInfos;
            this.elementTypeInfosMap = {};
            for ( var index = 0; index < this.elementTypeInfos.length; index++) {
                var elementTypeInfo = this.elementTypeInfos[index];
                Jsonix.Util.Ensure.ensureObject(elementTypeInfo);
                if (Jsonix.Util.Type.isObject(elementTypeInfo.elementName)) {
                    Jsonix.Util.Ensure.ensureString(elementTypeInfo.elementName.localPart, 'Element name must contain a string property [localPart].');
                    elementTypeInfo.elementName = Jsonix.XML.QName.fromObject(elementTypeInfo.elementName);
                } else {
                    Jsonix.Util.Ensure.ensureString(elementTypeInfo.elementName);
                    elementTypeInfo.elementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, elementTypeInfo.elementName);
                }
                this.elementTypeInfosMap[elementTypeInfo.elementName.key] = elementTypeInfo.typeInfo;
            }
        },
        getPropertyElementTypeInfo : function(elementName) {
            Jsonix.Util.Ensure.ensureObject(elementName);
            Jsonix.Util.Ensure.ensureString(elementName.localPart);
            var name = Jsonix.XML.QName.fromObject(elementName);

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
        buildStructureElements : function(context, structure) {
            for ( var index = 0; index < this.elementTypeInfos.length; index++) {
                var elementTypeInfo = this.elementTypeInfos[index];
                this.buildStructureElementTypeInfos(context, structure, elementTypeInfo);
            }
        },
        CLASS_NAME : 'Jsonix.Model.ElementRefsPropertyInfo'
    });


    Jsonix.Model.AnyElementPropertyInfo = Jsonix.Class(Jsonix.Model.PropertyInfo, {
        allowDom : true,
        allowTypedObject : true,
        mixed : true,
        initialize : function(options) {
            Jsonix.Util.Ensure.ensureObject(options);
            Jsonix.Model.PropertyInfo.prototype.initialize.apply(this, [ options ]);
            if (Jsonix.Util.Type.isBoolean(options.allowDom)) {
                this.allowDom = options.allowDom;
            } else {
                this.allowDom = true;
            }
            if (Jsonix.Util.Type.isBoolean(options.allowTypedObject)) {
                this.allowTypedObject = options.allowTypedObject;
            } else {
                this.allowTypedObject = true;
            }
            if (Jsonix.Util.Type.isBoolean(options.mixed)) {
                this.mixed = options.mixed;
            } else {
                this.mixed = true;
            }
        },
        unmarshal : function(context, scope, input) {
            var et = input.eventType;

            if (et === Jsonix.XML.Input.START_ELEMENT) {
                return this.unmarshalElement(context, scope, input);
            } else if (this.mixed && (et === 4 || et === 12 || et === 9)) {
                var value = input.getText();
                if (this.collection) {
                    return [ value ];

                } else {
                    return value;
                }
            } else if (this.mixed && (et === Jsonix.XML.Input.SPACE)) {
                // Whitespace
                return null;
            } else if (et === Jsonix.XML.Input.COMMENT || et === Jsonix.XML.Input.PROCESSING_INSTRUCTION) {
                return null;

            } else {
                // TODO better exception
                throw "Illegal state: unexpected event type [" + et + "].";

            }
        },
        unmarshalElement : function(context, scope, input) {

            var name = input.getName();
            var value;

            if (this.allowTypedObject && Jsonix.Util.Type.exists(context.getElementInfo(name, scope))) {
                // TODO optimize
                var elementDeclaration = context.getElementInfo(name, scope);
                var typeInfo = elementDeclaration.typeInfo;
                var adapter = Jsonix.Model.Adapter.getAdapter(elementDeclaration);
                value = {
                    name : name,
                    value : adapter.unmarshal(context, input, typeInfo)
                };
            } else if (this.allowDom) {
                value = input.getElement();
            } else {
                // TODO better exception
                throw "Element [" + name.toString() + "] is not known in this context and property does not allow DOM.";
            }
            if (this.collection) {
                return [ value ];
            } else {
                return value;
            }
        },
        marshal : function(context, scope, value, output) {
            if (!Jsonix.Util.Type.exists(value)) {
                return;
            }
            if (!this.collection) {
                this.marshalItem(context, value, output);
            } else {
                Jsonix.Util.Ensure.ensureArray(value);
                for ( var index = 0; index < value.length; index++) {
                    this.marshalItem(context, value[index], output);
                }
            }
        },
        marshalItem : function(context, value, output) {
            if (this.mixed && Jsonix.Util.Type.isString(value)) {
                // Mixed
                output.writeCharacters(value);
            } else if (this.allowDom && Jsonix.Util.Type.exists(value.nodeType)) {
                // DOM node
                output.writeNode(value);

            } else {
                // Typed object
                var name = Jsonix.XML.QName.fromObject(value.name);
                if (this.allowTypedObject && Jsonix.Util.Type.exists(context.getElementInfo(name))) {
                    var elementDeclaration = context.getElementInfo(name);
                    var typeInfo = elementDeclaration.typeInfo;
                    var adapter = Jsonix.Model.Adapter.getAdapter(elementDeclaration);
                    output.writeStartElement(name);
                    adapter.marshal(context, value.value, output, typeInfo);
                    output.writeEndElement();
                } else {
                    // TODO better exception
                    throw "Element [" + name.toString() + "] is not known in this context";
                }
            }
        },
        buildStructure : function(context, structure) {
            Jsonix.Util.Ensure.ensureObject(structure);
            if (Jsonix.Util.Type.exists(structure.value)) {
                // TODO better exception
                throw "The structure already defines a value property.";
            } else if (!Jsonix.Util.Type.exists(structure.elements)) {
                structure.elements = {};
            }

            if ((this.allowDom || this.allowTypedObject)) {
                // if (Jsonix.Util.Type.exists(structure.any)) {
                // // TODO better exception
                // throw "The structure already defines the any
                // property.";
                // } else
                // {
                structure.any = this;
                // }
            }
            if (this.mixed) {
                // if (Jsonix.Util.Type.exists(structure.mixed)) {
                // // TODO better exception
                // throw "The structure already defines the mixed
                // property.";
                // } else
                // {
                structure.mixed = this;
                // }
            }
        },
        CLASS_NAME : 'Jsonix.Model.AnyElementPropertyInfo'
    });


    Jsonix.Model.Adapter = Jsonix.Class({
        initialize : function() {
        },
        unmarshal: function(context, input, typeInfo)
        {
            return typeInfo.unmarshal(context, input);
        },
        marshal: function(context, value, output, typeInfo)
        {
            typeInfo.marshal(context, value, output);
        },
        CLASS_NAME : "Jsonix.Model.Adapter"
    });
    Jsonix.Model.Adapter.INSTANCE = new Jsonix.Model.Adapter();
    Jsonix.Model.Adapter.getAdapter = function (elementInfo)
    {
        Jsonix.Util.Ensure.ensureObject(elementInfo);
        Jsonix.Util.Ensure.ensureObject(elementInfo.typeInfo);
        return Jsonix.Util.Type.exists(elementInfo.adapter) ? elementInfo.adapter : Jsonix.Model.Adapter.INSTANCE;
    };

    Jsonix.Context = Jsonix.Class({
        elementInfos : null,
        properties : null,
        substitutionMembersMap : null,
        scopedElementInfosMap : null,
        initialize : function(schemas, properties) {

            this.elementInfos = [];
            this.properties = {
                namespacePrefixes : {}
            };
            Jsonix.Util.Ensure.ensureArray(schemas);
            for ( var index = 0; index < schemas.length; index++) {
                var schema = schemas[index];
                Jsonix.Util.Ensure.ensureArray(schema.elementInfos);
                for ( var kndex = 0; kndex < schema.elementInfos.length; kndex++) {

                    var kElementInfo = schema.elementInfos[kndex];
                    this.elementInfos.push(kElementInfo);
                    if (Jsonix.Util.Type.exists(kElementInfo.substitutionHead)) {
                        if (Jsonix.Util.Type.isObject(kElementInfo.substitutionHead)) {
                            kElementInfo.substitutionHead = Jsonix.XML.QName.fromObject(kElementInfo.substitutionHead);
                        } else {
                            Jsonix.Util.Ensure.ensureString(kElementInfo.substitutionHead);
                            kElementInfo.substitutionHead = new Jsonix.XML.QName(schema.defaultElementNamespaceURI, kElementInfo.substitutionHead);
                        }
                    }
                }
            }

            if (Jsonix.Util.Type.isObject(properties)) {
                if (Jsonix.Util.Type.isObject(properties.namespacePrefixes)) {
                    this.properties.namespacePrefixes = properties.namespacePrefixes;
                }
            }

            this.substitutionMembersMap = {};
            this.scopedElementInfosMap = {};

            for ( var jndex = 0; jndex < this.elementInfos.length; jndex++) {
                var elementInfo = this.elementInfos[jndex];

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
                    scopeKey = elementInfo.scope.name;
                } else {
                    scopeKey = '##global';
                }

                var scopedElementInfos = this.scopedElementInfosMap[scopeKey];

                if (!Jsonix.Util.Type.isObject(scopedElementInfos)) {
                    scopedElementInfos = {};
                    this.scopedElementInfosMap[scopeKey] = scopedElementInfos;
                }
                scopedElementInfos[elementInfo.elementName.key] = elementInfo;
            }
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
            // throw "Element [" + name.key
            // + "] could not be found in the given context.";
        },
        getSubstitutionMembers : function(name) {
            return this.substitutionMembersMap[Jsonix.XML.QName.fromObject(name).key];
        },
        createMarshaller : function() {
            return new Jsonix.Context.Marshaller(this);
        },
        createUnmarshaller : function() {
            return new Jsonix.Context.Unmarshaller(this);
        },
        CLASS_NAME : 'Jsonix.Context'
    });

    Jsonix.Context.Marshaller = Jsonix.Class({
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
                namespacePrefixes : this.context.propertyInfos.namespacePrefixes
            });

            var doc = output.writeStartDocument();

            this.marshalElementNode(value, output);

            output.writeEndDocument();

            return doc;

        },
        marshalElementNode : function(value, output) {

            Jsonix.Util.Ensure.ensureObject(value);
            Jsonix.Util.Ensure.ensureObject(value.name);
            Jsonix.Util.Ensure.ensureString(value.name.localPart);
            Jsonix.Util.Ensure.ensureExists(value.value);

            var name = Jsonix.XML.QName.fromObject(value.name);

            var elementDeclaration = this.context.getElementInfo(name);
            if (!Jsonix.Util.Type.exists(elementDeclaration)) {
                throw 'Could not find element declaration for the element [' + name.key + '].';
            }
            Jsonix.Util.Ensure.ensureObject(elementDeclaration.typeInfo);
            var typeInfo = elementDeclaration.typeInfo;
            var element = output.writeStartElement(value.name);
            var adapter = Jsonix.Model.Adapter.getAdapter(elementDeclaration);
            adapter.marshal(this.context, value.value, output, typeInfo);
            output.writeEndElement();
            return element;

        },
        CLASS_NAME : 'Jsonix.Context.Marshaller'
    });

    Jsonix.Context.Unmarshaller = Jsonix.Class({
        context : null,
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
        unmarshalDocument : function(doc) {
            var input = new Jsonix.XML.Input(doc);

            var result = null;
            input.nextTag();
            return this.unmarshalElementNode(input);

        },
        unmarshalElementNode : function(input) {
            if (input.eventType != 1) {
                throw "Parser must be on START_ELEMENT to read next text.";
            }

            var result = null;
            var name = Jsonix.XML.QName.fromObject(input.getName());

            var elementDeclaration = this.context.getElementInfo(name);
            if (!Jsonix.Util.Type.exists(elementDeclaration)) {
                throw 'Could not find element declaration for the element [' + name.key + '].';
            }
            Jsonix.Util.Ensure.ensureObject(elementDeclaration.typeInfo);
            var typeInfo = elementDeclaration.typeInfo;
            var adapter = Jsonix.Model.Adapter.getAdapter(elementDeclaration);
            var value = adapter.unmarshal(this.context, input, typeInfo);
            result = {
                name : name,
                value : value
            };

            return result;

        },
        CLASS_NAME : 'Jsonix.Context.Unmarshaller'
    });

    return Jsonix;
}


module.exports.Jsonix = _factory;

},{}]},{},[6])
(6)
});

  return window.Bundle;
}