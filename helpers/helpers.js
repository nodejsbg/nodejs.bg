
/*!
 * Nodejs.bg
 * 
 * Node.js Bulgarian User Group
 * Copyright (c) 2011 Veselin Todorov <hi@vesln.com> & Martin Lazarov <martin@lazarov.bg>
 * Licensed under the MIT License.
 */

/**
 * Module exports.
 * 
 * @param {Object} app
 */
module.exports = function(app) {
  
  /**
   * Module dependencies.
   */
  var helpers = require('express-helpers');
  var utils = require('../lib/utils');
    
  // Register the given helpers.
  app.helpers({
    link_to: helpers.link_to,
    select_tag: helpers.select_tag,
    secret: app.config.admin.secret,
    format_date: utils.formatDate,
    strip_tags: utils.stripTags
  }); 

};