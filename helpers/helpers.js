
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
var helpers = require('express-helpers');

/**
 * Module exports
 * 
 * @param {Object} app
 */
module.exports = function(app) {
  
  app.helpers({
    link_to: helpers.link_to,
    secret: app.config.admin.secret
  }); 

};