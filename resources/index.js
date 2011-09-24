
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
  
  // Admin resources.
  require('./admin')(app);
  
};