
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
 * @param {Object} app HTTPServer.
 */
module.exports = function(app) {
  
  var common = [require('../middlewares/layout')];
  
  // Posts.
  require('./posts')(app, common);
  
  // Pages.
  require('./pages')(app, common);
  
  // Categories.
  require('./pages')(app, common);
  
  // Admin resources.
  require('./admin')(app, common);
  
};