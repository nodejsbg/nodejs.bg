
/*!
 * Nodejs.bg
 * 
 * Node.js Bulgarian User Group
 * Copyright (c) 2011 Veselin Todorov <hi@vesln.com> & Martin Lazarov <martin@lazarov.bg>
 * Licensed under the MIT License.
 */
 
// User Model.
require('../../models/user')();
var User = mongoose.model('User');

/**
 * Module exports.
 * 
 * @param {Object} app
 * @param {Array} middlewares
 */
module.exports = function(app, middlewares) {
  
  // GET /admin/users
  app.get('/' + app.config.admin.secret + '/users', middlewares, function(req, res) {
    User.find(function(err, users) {
      res.render('admin/users/index', {
        users: users
      });
    });
  });

  // GET /admin/users/new
  app.get('/' + app.config.admin.secret + '/users/new', middlewares, function(req, res) {
    res.render('admin/users/new');
  });

  // GET /admin/users/edit
  app.get('/' + app.config.admin.secret + '/users/edit/:id', middlewares, function(req, res) {
    User.findOne({ _id: req.params.id }, function(err, user) {
      if (err) {
        req.flash('error', 'Тоя не го знам.');
        return res.redirect('/' + app.config.admin.secret + '/users');
      }
      res.render('admin/users/edit', { user: user });
    });
  });

  // POST /admin/users
  app.post('/' + app.config.admin.secret + '/users', middlewares, function(req, res) {
    var user = new User(req.body.user);
    user.save(function(err) {
      if (err) {
        req.flash('error', 'Опа! Пробвай пак, че потребителското име трябва да е уникално.');
        return res.render('admin/users/new', { users: req.body.user });
      }
      req.flash('success', 'Добавихме го тоя пич.');
      res.redirect('/' + app.config.admin.secret + '/users');
    });

  });

  // PUT /admin/users/1
  app.put('/' + app.config.admin.secret + '/users/:id', middlewares, function(req, res) {

  });

  // DELETE /admin/users/1
  app.del('/' + app.config.admin.secret + '/users/:id', middlewares, function(req, res) {
    User.remove({ _id: req.params.id }, function(err, count) {
      if (count) {
        req.flash('success', 'Изтрих го тоя пич.');
      } else {
        req.flash('error', 'Не се получи, може да е безсмъртен.');
      }
      res.redirect('/' + app.config.admin.secret + '/users');
    });
  });
};