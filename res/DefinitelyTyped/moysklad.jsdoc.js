/**
 * moysklad-jsdoc
 * Date: 30.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

/** @namespace */
var Moysklad = {};

/**
 * @class
 * @constructor
 * @memberOf Moysklad
 */
Moysklad.Entity = function () {
    /**
     * @type string
     */
    this.A = '*';
    /**
     * @type string
     */
    this.uuid = '*';
    /**
     * @type string
     */
    this.company = '*';
};


/**
 * @class
 * @constructor
 * @extends {Entity}
 */
Moysklad.InfoEntity = function () {
    /**
     * @type string
     */
    this.B = '*';
    /**
     * @type Date
     */
    this.deleted = new Date();
    /**
     * @type Date
     */
    this.updated = new Date();
    /**
     * @type string
     */
    this.updatedBy = '*';
};

/**
 * @class
 * @constructor
 * @extends {InfoEntity}
 */
Moysklad.LegendEntity = function () {
    /**
     * @type string
     */
    this.C = '*';
    /**
     * @type string
     */
    this.code = '*';
    /**
     * @type string
     */
    this.description = '*';
    /**
     * @type string
     */
    this.externalcode = '*';
    /**
     * @type string
     */
    this.name = '*';

};

/**
 * @class
 * @constructor
 * @extends {LegendEntity}
 */
var Employee = function () {
    /**
     * @type string
     */
    this.D = '*';
    /**
     * @type Array
     */
    this.attribute = '*';
};
Moysklad.Employee = Employee;