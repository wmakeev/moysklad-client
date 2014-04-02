/**
 * some3
 * Date: 30.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call

var Nums = {};

/**
 * @class
 * @constructor
 */
var One = function () {
    /**
     * @type string
     */
    this.a = 'a';
    /**
     * @type string
     */
    this.a2 = 'a';
};
Nums.One = One;

/**
 * @class
 * @constructor
 * @extends {One}
 */
var Two = function () {
    //One.call(this);
    /**
     * @type string
     */
    this.b = 'b';
    /**
     * @type string
     */
    this.b2 = 'a';
};
Nums.Two = Two;

/**
 * @class
 * @constructor
 * @extends {Two}
 */
var Three = function () {
    //Two.call(this);
    /**
     * @type string
     */
    this.c = 'c';
    /**
     * @type string
     */
    this.c2 = 'a';
};
Nums.Three = Three;


var num = new Nums.Three();

//TODO тоже не очень автокомплит (всё разбросано)
num.;