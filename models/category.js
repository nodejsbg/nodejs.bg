
/*!
 * Nodejs.bg
 * 
 * Node.js Bulgarian User Group
 * Copyright (c) 2011 Veselin Todorov <hi@vesln.com> & Martin Lazarov <martin@lazarov.bg>
 * Licensed under the MIT License.
 */

/**
 * Module dependencies.
 */
var validator = require('../lib/validator');

/**
 * Category Model.
 */
var Category = new mongoose.Schema({
  'name': { type: String, validate: [validator.validatePresenceOf, 'empty'], index: { unique: true } },
  'permlink': String
});

mongoose.model('Category', Category);

/**
 * Module exports.
 */
module.exports = mongoose.model('Category');