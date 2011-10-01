
/*!
 * Nodejs.bg
 * 
 * Node.js Bulgarian User Group
 * Copyright (c) 2011 Veselin Todorov <hi@vesln.com> & Martin Lazarov <martin@lazarov.bg>
 * Licensed under the MIT License.
 */

/**
 * Utils.
 * 
 * @type {Object}
 */
var utils = {};


/**
 * Formats date.
 * 
 * @param {Object} d
 * @return {String}
 */
utils.formatDate = function(d) {
  return d.getUTCDate() + '.' + (d.getUTCMonth() + 1) + '.' + d.getUTCFullYear();
};

/**
 * Strips html tags from string.
 * 
 * @param {String} str
 * @returns {String}
 */
utils.stripTags = function(str) {
  return str.replace(/(<([^>]+)>)/ig, '');
};


/**
 * Module exports.
 */
module.exports = utils;