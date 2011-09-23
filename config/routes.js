
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
  
  // Common middlewares for admin.
  var admin = [require('../middlewares/restrict')];

  // Sessions - login, logout etc.
  require('../resources/admin/sessions')(app, admin);

  // Categories.
  require('../resources/admin/categories')(app, admin);

  // Pages.
  require('../resources/admin/pages')(app, admin);

  // Posts.
  require('../resources/admin/posts')(app, admin);

  // Users.
  require('../resources/admin/users')(app, admin);

};
