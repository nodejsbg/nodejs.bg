
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
    
  // Register the given helpers.
  app.helpers({
    format_date: function(d) {
      return d.getUTCDate() + '.' + (d.getUTCMonth() + 1) + '.' + d.getUTCFullYear();
    },
    link_to: helpers.link_to,
    select_tag: helpers.select_tag,
    secret: app.config.admin.secret
  }); 

};