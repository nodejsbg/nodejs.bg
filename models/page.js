
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
 * Module exports.
 */
module.exports = function() {

  /**
   * Page Model.
   */
  var Page = new mongoose.Schema({
    'name': { type: String, validate: [validator.validatePresenceOf, 'empty'], index: { unique: true } },
    'content': String
  });

  mongoose.model('Page', Page);
  
};