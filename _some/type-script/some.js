/**
 * some
 * Date: 29.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

/**
 * @param {T} a
 * @return {T}
 * @template T
 */
identity = function (a) {
    return a;
};

/** @type {string} */ var msg = identity("hello") + identity("world"); // OK
/** @type {number} */ var sum = identity(2) + identity(2); // OK
/** @type {number} */ var sum = identity(2) + identity("2"); // Type mismatch

/**
 * A shape.
 * @interface
 * @property {string} name
 */
function Shape() {
}
Shape.prototype.draw = function () {
};

/**
 * @constructor
 * @implements {Shape}
 */
function Square() {
}
Square.prototype.draw = function () {

};

/**
 * @constructor
 */
function entity() {

}

/* JetBrains Home Page: http://www.jetbrains.com */


/**
 * Определение модели в JavaScript (своего рода "скелет" на который WebStorm привяжет описание модели из .ts)
 * Коенчно, можно сделать эмуляция наследования (как обычно), но это если в дальнейшем потребуется определять
 * является ли некий класс наследником другого и пр.
 */
var Moysklad = {
    Entity: function () {
    },
    InfoEntity: function () {
    },
    LegendEntity: function () {
    },
    Employee: function () {
    },
    createClient: function () {

    }
};


/**
 * @param {T} type      - Тип загружаемой сущности
 * @param {string} uuid - Идентификатор
 * @returns {T}         - Загруженная сущность
 * @template T          - Generic тип
 */
var load = function (type, uuid) {
    var result = new type();
    result.uuid = uuid;
    result.name = 'name';
    return result;
};

var emp;

emp = /** @type {moysklad.employee} */ load(moysklad.employee, '123-456-789');

emp.company = 'someCompany';

emp;

var client = moysklad.createClient();

var infoEntity = client.load('infoEntity', '123-456-789');
infoEntity;






















