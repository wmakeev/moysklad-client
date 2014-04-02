/**
 * moysklad-jsdoc
 * Date: 30.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */


var Moysklad = {};

/**
 * @class
 * @constructor
 */
var Entity = function () {
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
Moysklad.Entity = Entity;


/**
 * @class
 * @constructor
 * @extends {Entity}
 */
var InfoEntity = function () {
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
Moysklad.InfoEntity = InfoEntity;

/**
 * @class
 * @constructor
 * @extends {InfoEntity}
 */
var LegendEntity = function () {
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
Moysklad.LegendEntity = LegendEntity;

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









var emp = new Moysklad.Employee();

//TODO По документации в текущем файле нет никакого порядка. По подключаемому файлу значительно лучше.
emp.;