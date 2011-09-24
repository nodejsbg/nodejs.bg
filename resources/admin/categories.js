
/*!
 * Nodejs.bg
 * 
 * Node.js Bulgarian User Group
 * Copyright (c) 2011 Veselin Todorov <hi@vesln.com> & Martin Lazarov <martin@lazarov.bg>
 * Licensed under the MIT License.
 */
 
// Category Model.
require('../../models/category')();
var Category = mongoose.model('Category');

/**
 * Module exports.
 * 
 * @param {Object} app
 * @param {Array} middlewares
 */
module.exports = function(app, middlewares) {

  // GET /admin/categories
  app.get('/' + app.config.admin.secret + '/categories', middlewares, function(req, res) {
    Category.find(function(err, categories) {
      res.render('admin/categories/index', {
        categories: categories
      });
    });
  });

  // GET /admin/categories/new
  app.get('/' + app.config.admin.secret + '/categories/new', middlewares, function(req, res) {
    res.render('admin/categories/new');
  });

  // GET /admin/categories/edit/1
  app.get('/' + app.config.admin.secret + '/categories/edit/:id', middlewares, function(req, res) {
    Category.findOne({ _id: req.params.id }, function(err, category) {
      if (err) {
        req.flash('error', 'Опа. Нещо тая категорийка липсва.');
        return res.redirect('/' + app.config.admin.secret + '/categories');
      }
      res.render('admin/categories/edit', { category: category });
    });
  });

  // POST /admin/categories
  app.post('/' + app.config.admin.secret + '/categories', middlewares, function(req, res) {
    var category = new Category(req.body.category);
    category.save(function(err) {
      if (err) {
        req.flash('error', 'Опа! Пробвай пак.');
        return res.render('admin/categories/new', { category: req.body.category });
      }
      req.flash('success', 'Добавихме нова категория.');
      res.redirect('/' + app.config.admin.secret + '/categories');
    });
  });

  // PUT /admin/categories/1
  app.put('/' + app.config.admin.secret + '/categories/:id', middlewares, function(req, res) {
    Category.findById(req.params.id, function(err, category) {
      category.set(req.body.category).save(function(err) {
        if (err) {
          req.flash('error', 'Опа! Пробвай пак.');
        } else {
          req.flash('success', 'Категорията е запазена успешно.');
        }
        res.redirect('/' + app.config.admin.secret + '/categories/edit/' + req.params.id);
      });
    });
  });

  // DELETE /admin/categories/1
  app.del('/' + app.config.admin.secret + '/categories/:id', middlewares, function(req, res) {
    Category.remove({ _id: req.params.id }, function(err, count) {
      if (count) {
        req.flash('success', 'Изтрих я.');
      } else {
        req.flash('error', 'Не се получи.');
      }
      res.redirect('/' + app.config.admin.secret + '/categories');
    });
  });
  
};