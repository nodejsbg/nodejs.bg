
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
 * @param {Object} app HTTPServer.
 * @param {Array} middlewares Middlewares for the admin.
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

  // GET /admin/users/edit/1
  app.get('/' + app.config.admin.secret + '/users/edit/:id', middlewares, function(req, res) {
    User.findOne({ _id: req.params.id }, function(err, user) {
      if (err) {
        req.flash('error', 'Потребителят не беше намерен.');
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
        req.flash('error', 'Не се получи! Опитай отново. Да знаеш, че потребителското име трябва да е уникално.');
        return res.render('admin/users/new', { user: req.body.user });
      }
      req.flash('success', 'Потребителят е добавен успешно.');
      res.redirect('/' + app.config.admin.secret + '/users');
    });

  });

  // PUT /admin/users/1
  app.put('/' + app.config.admin.secret + '/users/:id', middlewares, function(req, res) {
    User.findById(req.params.id, function(err, user) {
      user.set(req.body.user).save(function(err) {
        if (err) {
          req.flash('error', 'Не се получи! Опитай отново.');
        } else {
          req.flash('success', 'Потребителят е запазен успешно.');
        }
        res.redirect('/' + app.config.admin.secret + '/users/edit/' + req.params.id);
      });
    });
  });

  // DELETE /admin/users/1
  app.del('/' + app.config.admin.secret + '/users/:id', middlewares, function(req, res) {
    User.remove({ _id: req.params.id }, function(err, count) {
      if (count) {
        req.flash('success', 'Успешно изтриване.');
      } else {
        req.flash('error', 'Не се получи, може да е безсмъртен.');
      }
      res.redirect('/' + app.config.admin.secret + '/users');
    });
  });
  
};