
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
 * @param {Object} app HTTPServer.
 */
module.exports = function(app, middlewares) {
  
  // Post model.
  var Post = require('../models/post');
  
  // Home page.
  app.get('/', middlewares, function(req, res) {
    // Current page.
    var page = parseInt(req.param('page')) || 1; 
    
    // Results per page.
    var perPage = 3; 
    
    // Total pages.
    var pages = null;
    
    Post.count({}, function(err, count) {
      pages = Math.ceil(count / perPage);
      
      Post.find({})
        .sort('created_at', -1)
        .populate('user_id')
        .populate('category_id')
        .skip((page - 1) * perPage)
        .limit(perPage)
        .run(function(err, posts) {
          res.render('posts/index', {
            posts: posts,
            count: count,
            currentPage: page,
            totalPages: pages
          });
        });
    });
  });
  
  // Post single.
  app.get('/post/:permlink', middlewares, function(req, res) {
    Post.findOne({ permlink: req.params.permlink })
    .populate('user_id')
    .populate('category_id')
    .run(function(err, post) {
      if (err || !post) {
        return res.send(404);
      }
      
      res.render('posts/view', {
        post: post
      });
    });
  });
  
};