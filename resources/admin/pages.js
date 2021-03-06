
/*!
 * Nodejs.bg
 * 
 * Node.js Bulgarian User Group
 * Copyright (c) 2011 Veselin Todorov <hi@vesln.com> & Martin Lazarov <martin@lazarov.bg>
 * Licensed under the MIT License.
 */
 
// Page Model.
var Page = require('../../models/page');

/**
 * Module exports.
 * 
 * @param {Object} app HTTPServer.
 * @param {Array} middlewares Middlewares for the admin.
 */
module.exports = function(app, middlewares) {

  // GET /admin/pages
  app.get('/' + app.config.admin.secret + '/pages', middlewares, function(req, res) {
    Page.find(function(err, pages) {
      res.render('admin/pages/index', {
        pages: pages
      });
    });
  });

  // GET /admin/pages/new
  app.get('/' + app.config.admin.secret + '/pages/new', middlewares, function(req, res) {
    res.render('admin/pages/new');
  });

  // GET /admin/pages/edit/1
  app.get('/' + app.config.admin.secret + '/pages/edit/:id', middlewares, function(req, res) {
    Page.findOne({ _id: req.params.id }, function(err, page) {
      if (err) {
        req.flash('error', 'Страницата не беше намерена.');
        return res.redirect('/' + app.config.admin.secret + '/pages');
      }
      res.render('admin/pages/edit', { page: page });
    });
  });

  // POST /admin/pages
  app.post('/' + app.config.admin.secret + '/pages', middlewares, function(req, res) {
    var page = new Page(req.body.page);
    page.save(function(err) {
      if (err) {
        req.flash('error', 'Не се получи! Опитай отново.');
        return res.render('admin/pages/new', { page: req.body.page });
      }
      req.flash('success', 'Страницата е добавена успешно.');
      res.redirect('/' + app.config.admin.secret + '/pages');
    });
  });

  // PUT /admin/pages/1
  app.put('/' + app.config.admin.secret + '/pages/:id', middlewares, function(req, res) {
    Page.findById(req.params.id, function(err, page) {
      page.set(req.body.page).save(function(err) {
        if (err) {
          req.flash('error', 'Не се получи! Опитай отново.');
        } else {
          req.flash('success', 'Страницата е запазена успешно.');
        }
        res.redirect('/' + app.config.admin.secret + '/pages/edit/' + req.params.id);
      });
    });
  });

  // DELETE /admin/pages/1
  app.del('/' + app.config.admin.secret + '/pages/:id', middlewares, function(req, res) {
    Page.remove({ _id: req.params.id }, function(err, count) {
      if (count) {
        req.flash('success', 'Изтрих я.');
      } else {
        req.flash('error', 'Не се получи! Опитай отново.');
      }
      res.redirect('/' + app.config.admin.secret + '/pages');
    });
  });
  
};