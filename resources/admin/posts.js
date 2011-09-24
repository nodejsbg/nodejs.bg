
/*!
 * Nodejs.bg
 * 
 * Node.js Bulgarian User Group
 * Copyright (c) 2011 Veselin Todorov <hi@vesln.com> & Martin Lazarov <martin@lazarov.bg>
 * Licensed under the MIT License.
 */
 
// Post Model.
require('../../models/post')();
var Post = mongoose.model('Post');

/**
 * Module exports.
 * 
 * @param {Object} app
 * @param {Array} middlewares
 */
module.exports = function(app, middlewares) {

  // GET /admin/posts
  app.get('/' + app.config.admin.secret + '/posts', middlewares, function(req, res) {
    Post.find(function(err, posts) {
      res.render('admin/posts/index', {
        posts: posts
      });
    });
  });

  // GET /admin/posts/new
  app.get('/' + app.config.admin.secret + '/posts/new', middlewares, function(req, res) {
    res.render('admin/posts/new');
  });

  // GET /admin/posts/edit
  app.get('/' + app.config.admin.secret + '/posts/edit/:id', middlewares, function(req, res) {
    Post.findOne({ _id: req.params.id }, function(err, post) {
      if (err) {
        req.flash('error', 'Опа. Нещо тая страничка липсва.');
        return res.redirect('/' + app.config.admin.secret + '/posts');
      }
      res.render('admin/posts/edit', { post: post });
    });
  });

  // POST /admin/posts
  app.post('/' + app.config.admin.secret + '/posts', middlewares, function(req, res) {
    var post = new Post(req.body.post);
    post.save(function(err) {
      if (err) {
        req.flash('error', 'Опа! Пробвай пак.');
        return res.render('admin/posts/new', { post: req.body.post });
      }
      req.flash('success', 'Добавихме нова страничка.');
      res.redirect('/' + app.config.admin.secret + '/posts');
    });
  });

  // PUT /admin/posts/1
  app.put('/' + app.config.admin.secret + '/posts/:id', middlewares, function(req, res) {
    Post.update({ _id:  req.params.id}, req.body.post, function(err, count) {
      // Nothing found?
      if (err || !count) {
        req.flash('error', 'Не я намерих тая.');
        return res.render('admin/posts');
      }
      req.flash('success', 'Разцепихме я тая страничка.');
      res.redirect('/' + app.config.admin.secret + '/posts/edit/' + req.params.id);
    });
  });

  // DELETE /admin/posts/1
  app.del('/' + app.config.admin.secret + '/posts/:id', middlewares, function(req, res) {
    Post.remove({ _id: req.params.id }, function(err, count) {
      if (count) {
        req.flash('success', 'Изтрих я.');
      } else {
        req.flash('error', 'Не се получи.');
      }
      res.redirect('/' + app.config.admin.secret + '/posts');
    });
  });
  
};