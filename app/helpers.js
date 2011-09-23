
/*!
 * Nodejs.bg
 * 
 * Node.js Bulgarian User Group
 * Copyright (c) 2011 Veselin Todorov <hi@vesln.com> & Martin Lazarov <martin@lazarov.bg>
 * Licensed under the MIT License.
 */
 
var helpers = require('express-helpers');
 
module.exports = function(app) {
  
  app.helpers({
    link_to: helpers.link_to
  }); 

};