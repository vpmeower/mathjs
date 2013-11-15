module.exports = function (math) {
  var util = require('../../util/index'),

      Complex = require('../../type/Complex'),
      Unit = require('../../type/Unit'),
      Matrix = require('../../type/Matrix'),

      array = util.array,
      isNumber = util.number.isNumber,
      isBoolean = util.boolean.isBoolean,
      isString = util.string.isString,
      isComplex = Complex.isComplex,
      isUnit = Unit.isUnit;

  /**
   * Calculate the size of a matrix or scalar
   *
   *     size(x)
   *
   * @param {Boolean | Number | Complex | Unit | String | Array | Matrix} x
   * @return {Array | Matrix} res
   */
  math.size = function size (x) {
    if (arguments.length != 1) {
      throw new util.error.ArgumentsError('size', arguments.length, 1);
    }

    var asArray = (math.options.matrix.defaultType === 'array');

    if (isNumber(x) || isComplex(x) || isUnit(x) || isBoolean(x) || x == null) {
      return asArray ? [] : new Matrix([]);
    }

    if (isString(x)) {
      return asArray ? [x.length] : new Matrix([x.length]);
    }

    if (Array.isArray(x)) {
      return array.size(x);
    }

    if (x instanceof Matrix) {
      return new Matrix(x.size());
    }

    if (x.valueOf() !== x) {
      // fallback on the objects primitive value
      return size(x.valueOf());
    }

    throw new util.error.UnsupportedTypeError('size', x);
  };
};