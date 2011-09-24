
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
 * Page Model.
 */
var Page = new mongoose.Schema({
 'name': { type: String, validate: [validator.validatePresenceOf, 'empty'] },
 'content': String
});

// Defines the model.
mongoose.model('Page', Page);

/**
 * Module exports.
 */
module.exports = mongoose.model('Page');