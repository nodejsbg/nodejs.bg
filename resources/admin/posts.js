
/*!
 * Nodejs.bg
 * 
 * Node.js Bulgarian User Group
 * Copyright (c) 2011 Veselin Todorov <hi@vesln.com> & Martin Lazarov <martin@lazarov.bg>
 * Licensed under the MIT License.
 */
 
// Post Model.
var Post = require('../../models/post');

// Category Model.
var Category = require('../../models/category');

// User Model.
var User = require('../../models/user');

/**
 * Module exports.
 * 
 * @param {Object} app HTTPServer.
 * @param {Array} middlewares Middlewares for the admin.
 */
module.exports = function(app, middlewares) {

  // GET /admin/posts
  app.get('/' + app.config.admin.secret + '/posts', middlewares, function(req, res) {
    Post.find()
      .sort('created_at', 'descending')
      .populate('user_id')
      .run(function(err, posts) {
        res.render('admin/posts/index', {
          posts: posts
        });
    });
  });

  // GET /admin/posts/new
  app.get('/' + app.config.admin.secret + '/posts/new', middlewares, function(req, res) {
    Category.find({}, function(err, categories) {
      res.render('admin/posts/new', { categories: categories });
    });
  });

  // GET /admin/posts/edit/1
  app.get('/' + app.config.admin.secret + '/posts/edit/:id', middlewares, function(req, res) {
    Post.findOne({ _id: req.params.id }, function(err, post) {
      if (err) {
        req.flash('error', 'Публикацията не беше намерена.');
        return res.redirect('/' + app.config.admin.secret + '/posts');
      }
      Category.find({}, function(err, categories) {
        res.render('admin/posts/edit', { post: post, categories: categories });
      });
    });
  });

  // POST /admin/posts
  app.post('/' + app.config.admin.secret + '/posts', middlewares, function(req, res) {
    var post = new Post(req.body.post);
    post.user_id = req.session.userId;
    
    post.save(function(err) {
      if (err) {
        req.flash('error', 'Не се получи! Опитай отново.');
        Category.find({}, function(err, categories) {
          res.render('admin/posts/new', { 
            post: req.body.post, 
            categories: categories 
          });
        });
        return;
      }
      req.flash('success', 'Публикацията е добавена успешно.');
      res.redirect('/' + app.config.admin.secret + '/posts');
    });
  });

  // PUT /admin/posts/1
  app.put('/' + app.config.admin.secret + '/posts/:id', middlewares, function(req, res) {
    Post.findById(req.params.id, function(err, post) {
      post.set(req.body.post).save(function(err) {
        if (err) {
          req.flash('error', 'Не се получи! Опитай отново.');
        } else {
          req.flash('success', 'Публикацията е запазена успешно.');
        }
        res.redirect('/' + app.config.admin.secret + '/posts/edit/' + req.params.id);
      });
    });
  });

  // DELETE /admin/posts/1
  app.del('/' + app.config.admin.secret + '/posts/:id', middlewares, function(req, res) {
    Post.remove({ _id: req.params.id }, function(err, count) {
      if (count) {
        req.flash('success', 'Успешно изтриване.');
      } else {
        req.flash('error', 'Не се получи! Опитай отново.');
      }
      res.redirect('/' + app.config.admin.secret + '/posts');
    });
  });
  
};