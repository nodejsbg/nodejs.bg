
/*!
 * Nodejs.bg
 * 
 * Node.js Bulgarian User Group
 * Copyright (c) 2011 Veselin Todorov <hi@vesln.com> & Martin Lazarov <martin@lazarov.bg>
 * Licensed under the MIT License.
 */

/**
 * Module exports.
 */
module.exports = function() {
  
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

  mongoose.model('Page', Page);
  
};