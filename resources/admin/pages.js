
/*!
 * Nodejs.bg
 * 
 * Node.js Bulgarian User Group
 * Copyright (c) 2011 Veselin Todorov <hi@vesln.com> & Martin Lazarov <martin@lazarov.bg>
 * Licensed under the MIT License.
 */
 
// Page Model.
require('../../models/page')();
var Page = mongoose.model('Page');

/**
 * Module exports.
 * 
 * @param {Object} app
 * @param {Array} middlewares
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
        req.flash('error', 'Опа. Нещо тая страничка липсва.');
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
        req.flash('error', 'Опа! Пробвай пак.');
        return res.render('admin/pages/new', { page: req.body.page });
      }
      req.flash('success', 'Добавихме нова страничка.');
      res.redirect('/' + app.config.admin.secret + '/pages');
    });
  });

  // PUT /admin/pages/1
  app.put('/' + app.config.admin.secret + '/pages/:id', middlewares, function(req, res) {
    Page.update({ _id:  req.params.id}, req.body.page, function(err, count) {
      // Nothing found?
      if (err || !count) {
        req.flash('error', 'Не я намерих тая.');
        return res.render('admin/pages');
      }
      req.flash('success', 'Разцепихме я тая страничка.');
      res.redirect('/' + app.config.admin.secret + '/pages/edit/' + req.params.id);
    });
  });

  // DELETE /admin/pages/1
  app.del('/' + app.config.admin.secret + '/pages/:id', middlewares, function(req, res) {
    Page.remove({ _id: req.params.id }, function(err, count) {
      if (count) {
        req.flash('success', 'Изтрих я.');
      } else {
        req.flash('error', 'Не се получи.');
      }
      res.redirect('/' + app.config.admin.secret + '/pages');
    });
  });
  
};