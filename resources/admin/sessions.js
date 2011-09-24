
/*!
 * Nodejs.bg
 * 
 * Node.js Bulgarian User Group
 * Copyright (c) 2011 Veselin Todorov <hi@vesln.com> & Martin Lazarov <martin@lazarov.bg>
 * Licensed under the MIT License.
 */
 
 // User Model.
var User = require('../../models/user');

/**
 * Module exports.
 * 
 * @param {Object} app
 * @param {Array} middlewares
 */
module.exports = function(app, middlewares) {
  
  // Login screen.
  app.get('/' + app.config.admin.secret, function(req, res) {
    res.render('admin/sessions/new.jade');
  });
  
  // Authenticate.
  app.post('/sessions', function(req, res) {
    var user = req.body.user;

    User.findOne({ username: user.username }, function(err, result) {
      // Checks username and passwords.
      if (!result || !result.authenticate(user.password)) {
        req.flash('error', 'Опа. Не те познавам.');

        return res.redirect('/' + app.config.admin.secret);
      }

      // Saves logged user id.
      req.session.userId = result._id;

      // Redirects to dashboard.
      res.redirect('/' + app.config.admin.secret +'/posts');
    });
  });

  // Logout.
  app.del('/' + app.config.admin.secret + '/sessions', middlewares, function(req, res) {
    delete req.session.userId;
    req.flash('success', 'До скоро!');
    res.redirect('/' + app.config.admin.secret);
  });
  
};