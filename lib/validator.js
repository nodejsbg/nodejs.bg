
/*!
 * Nodejs.bg
 * 
 * Node.js Bulgarian User Group
 * Copyright (c) 2011 Veselin Todorov <hi@vesln.com> & Martin Lazarov <martin@lazarov.bg>
 * Licensed under the MIT License.
 */

/**
 * Validator.
 * 
 * @type {Object}
 */
var validator = {};

/**
 * Checks if value is empty.
 * 
 * @param {String} value
 * @returns {Boolean} true if not empty, false otherwise.
 */
validator.validatePresenceOf = function validatePresenceOf(value) {
  return !!value.replace(/^\s+|\s+$/g, '').length;
};

/**
 * Module exports.
 */
module.exports = validator;